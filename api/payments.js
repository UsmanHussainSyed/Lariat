const express = require('express')
const app = express()
const axios = require('axios')

const info = console.info
const log = console.log
const error = console.error

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

app.get('/test', (req, res) => res.sendStatus(200))
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
    } catch (err) {
      // console.error(err)
      response.status(400).send(`Webhook Error= ${err.message}`)
      return
    }
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.updated': {
        const base_uri = process.env.API_BASE_URL
        if (event.data.object.metadata.downgrade) {
          log('[Webhook received]: customer.subscription.updated')

          const endpoint = base_uri.endsWith('/')
            ? `${base_uri}subscription/downgrade-plan`
            : `${base_uri}/subscription/downgrade-plan`

          const params = {
            customer_id: event.data.object.customer,
            stripe_price_id: event.data.object.items.data[0].price.id,
          }
          log(
            `[laravel-API]: ${endpoint} with params=${JSON.stringify(params)}`
          )
          await axios
            .post(endpoint, params)
            .then((r) => {
              log(`Success with ` + JSON.stringify(r.data))
            })
            .catch((e) => {
              error(`Failed with ` + e)
            })
        } else {
          // const endpoint = base_uri.endsWith('/')
          //   ? `${base_uri}subscription/update-subscription-date`
          //   : `${base_uri}/subscription/update-subscription-date`
          // axios.post(endpoint, {
          //   subscription_id: event.data.object.id,
          // })
        }
        break
      }

      case 'checkout.session.completed':
        if (event.data?.object?.metadata?.type === 'LariatToken') {
          handleEventForTokenCredit(event.data?.object)
        } else {
          handleCheckoutComplete(event.data)
        }
        break
      case 'payment_intent.succeeded':
        // event.data.object.invoice
        log('[Webhook received]: payment_intent.succeeded')
        handlePaymentIntent(event.data.object)
        break
      // case 'checkout.session.async_payment_failed':
      //   handleSessionFailure(event.data.object)
      //   break
      case 'invoice.payment_failed':
        handleInvoiceFailure(event.data.object)
        break
      case 'payment_intent.canceled':
        handlePaymentIntent(event.data.object)
        break
      case 'payment_intent.payment_failed':
        handlePaymentIntent(event.data.object)
        break
      case 'invoice.payment_succeeded':
        handleSuccessInvoice(event.data.object)
        break
      // ... handle other event types
      case 'setup_intent.succeeded': {
        console.log('[Webhook called: setup_intent.succeeded]')
        trialSetupAttached(event)
        break
      }
      case 'setup_intent.requires_action': {
        trialSetupAttached(event)
        break
      }
      default:
      // console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send()
  }
)

app.use(express.json())
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.post('/create-payment-intent', async (req, res) => {
  try {
    const {
      amount,
      currency = 'USD',
      email,
      name,
      phone,
      company,
      plan,
    } = req.body
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: { company, plan },
    })
    // console.log(customer)

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (e) {
    // console.log(e)
    res.sendStatus(500)
  }
})

app.post('/create-checkout-session2', async (req, res) => {
  const { email, name, phone, company, plan, priceId } = req.body
  const required = ['email', 'name', 'phone', 'company', 'plan', 'priceId']
  for (const field of required) {
    if (!req.body[field])
      return res
        .status(400)
        .send({ message: `Missing required parameter '${field}'` })
  }
  const customer = await stripe.customers
    .create({
      email,
      name,
      phone,
      metadata: { company, plan },
    })
    .catch((e) => {
      return res
        .status(500)
        .send(`Could not create customer for '${email}', ${e}`)
    })
  if (!customer?.id)
    return res.status(500).send(`Could not create customer for '${email}'`)
  const subscription = await stripe.subscriptions
    .create({
      customer: customer.id,
      items: [
        {
          price: priceId,
          // quantity: 1,
        },
      ],
      trial_period_days: 14,
      // trial_end: dateNow,
      // metadata: { inquiryId: req.body.inquiryId, plan, existing_user: false },
    })
    .catch((e) => {
      return res.status(500).send(`Could not create subscription ${e}`)
    })

  res.send(subscription)
})

app.post('/create-checkout-session', async (req, res) => {
  const {
    email,
    priceId,
    inquiryId,
    fullName,
    phone,
    companyName,
    plan,
    billing,
  } = req.body
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: { inquiryId, plan, existing_user: false },
    allow_promotion_codes: true,
    mode: 'subscription',
    success_url: process.env.BASE_URL.endsWith('/')
      ? `${process.env.BASE_URL}subscription/inquiry/${inquiryId}`
      : `${process.env.BASE_URL}/subscription/inquiry/${inquiryId}`,
    cancel_url: encodeURI(
      process.env.BASE_URL.endsWith('/')
        ? `${process.env.BASE_URL}subscription/${plan}?name=${fullName}&email=${email}&phone=${phone}&company=${companyName}&billing=${billing}`
        : `${process.env.BASE_URL}/subscription/${plan}?name=${fullName}&email=${email}&phone=${phone}&company=${companyName}&billing=${billing}`
    ),
  })

  res.json({ url: session.url })
})

app.post('/init-setup-intent', async (req, res) => {
  const { customer } = req.body
  if (!customer) return res.sendStatus(400)
  const intent = await stripe.setupIntents.create({
    customer,
    payment_method_types: ['card', 'us_bank_account'],
  })
  res.json({ client_secret: intent.client_secret })
})

app.post('/detach-payment', (req, res) => {
  const { id } = req.body
  if (!id) return res.sendStatus(400)
  stripe.paymentMethods
    .detach(id)
    // .then((r) => res.send(r))
    .then(() => res.sendStatus(200))
    .catch((e) => res.status(e.statusCode).send(e.raw))
})

app.get('/subscription', (req, res) => {
  const { id } = req.query
  getSubscriptionById(id)
    .then((r) => res.send(r))
    .catch((e) => res.status(400).send(e))
})
app.get('/payment-method', (req, res) => {
  const { id } = req.query
  if (!id) return res.status(400).send('Payment id is required!')
  getPaymentMethod(id)
    .then((r) => res.send(r))
    .catch((e) => res.status(400).send(e))
})
app.get('/list-invoices', (req, res) => {
  const { custId, subscriptionId } = req.query
  getInvoicesForCustomer(custId, subscriptionId)
    .then((r) => res.send(r))
    .catch((e) => res.status(400).send(e))
})

app.post('/upgrade', async (req, res) => {
  const { subscriptionId, newPriceId } = req.body
  if (!subscriptionId || !newPriceId)
    return res.status(400).send({
      message: 'Missing required parameter subscriptionId | newPriceId',
    })
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: 'always_invoice', // 'create_prorations',
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      billing_cycle_anchor: 'now',
    })
    res.send(subscription)
    // res.sendStatus(200)
  } catch (e) {
    res.status(500).send({
      message:
        'We are facing some issues at the moment. Please try again after sometime.',
    })
  }
})

app.post('/buy-tokens', async (req, res) => {
  const {
    subscriptionUserId,
    subscriptionAddonId,
    creditCount,
    price,
    customer,
    workspaceId,
  } = req.body
  if (
    !creditCount ||
    !subscriptionUserId ||
    !subscriptionAddonId ||
    !price ||
    !customer ||
    !workspaceId
  )
    return res.status(400).send({
      message:
        'Missing required parameter(s) creditCount | price | customer | workspaceId',
    })
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: req.headers.referer + '?token_credited',
      cancel_url: req.headers.referer,
      line_items: [{ price, quantity: 1 }],
      customer,
      invoice_creation: {
        enabled: true,
        invoice_data: {
          metadata: {
            type: 'LariatToken',
            priceId: price,
            customer,
            workspaceId,
            tokenCreditCount: creditCount,
            subscriptionUserId,
            subscriptionAddonId,
          },
        },
      },
      metadata: {
        type: 'LariatToken',
        priceId: price,
        customer,
        workspaceId,
        tokenCreditCount: creditCount,
        subscriptionUserId,
        subscriptionAddonId,
      },
    })
    // console.log(session)
    res.header('token-checkout-uri', session.url).end()
  } catch (e) {
    console.error(e)
    res.status(500).send({
      message:
        'We are facing some issues at the moment. Please try again after sometime.',
    })
  }
})

app.get('/list-payment-methods', (req, res) => {
  const { type, custId } = req.query
  const params = { limit: 50 }
  if (type) params.type = type
  stripe.customers
    .listPaymentMethods(custId, params)
    .then((r) => res.send(r.data))
    .catch((e) => {
      res.status(400).send(e.response)
    })
})

app.post('/mark-default-payment-method', (req, res) => {
  // eslint-disable-next-line
  const { default_source: pm, custId, subId } = req.body
  // stripe.customers
  //   .update(custId, {
  //     // default_source: pm,
  //     invoice_settings: { default_payment_method: pm },
  //   })
  stripe.subscriptions
    .update(subId, {
      // default_source: pm,
      default_payment_method: pm,
    })
    .then((r) => res.send(r))
    .catch((e) => res.status(400).send(e.response))
})

app.get('*', (req, res) => {
  res.sendStatus(404)
})

module.exports = {
  path: '/stripe',
  handler: app,
}
const handleEventForTokenCredit = (data) => {
  const { metadata, invoice } = data || {}
  const apiEndpoint = process.env.API_BASE_URL.endsWith('/')
    ? `${process.env.API_BASE_URL}subscription/buy`
    : `${process.env.API_BASE_URL}/subscription/buy`
  const params = {
    subscription_user_id: metadata?.subscriptionUserId,
    subscription_addon_id: metadata?.subscriptionAddonId,
    invoice,
  }
  console.log('calling', apiEndpoint, params)
  axios
    .post(apiEndpoint, params)
    .catch((e) => {
      error(e.response.data)
    })
    .finally(() => {
      log(`Sending invoice to customer`)
      stripe.invoices
        .sendInvoice(invoice)
        .then((invoiceObj) => {
          log('invoice sent to', invoiceObj.customer_email)
        })
        .catch((e) => {
          info('failed to send invoice to customer', e)
        })
    })
}

const handleCheckoutComplete = async (data) => {
  info('[handleCheckoutComplete]:')
  try {
    const { inquiryId } = await data.object.metadata
    if (data.object.client_reference_id) {
      const apiEndpoint = process.env.BACKAND_URL.endsWith('/')
        ? `${process.env.BACKAND_URL}admin/subscription/checkout-session-complete`
        : `${process.env.BACKAND_URL}/admin/subscription/checkout-session-complete`

      const params = {
        customer_id: data.object.customer,
        subscription_id: data.object.subscription,
        client_reference_id: data.object.client_reference_id,
      }
      await axios.get(apiEndpoint, { params }).catch((e) => {
        error(e.response.data)
      })
      return Promise.resolve({})
    }
    const endpoint = process.env.API_BASE_URL.endsWith('/')
      ? `${process.env.API_BASE_URL}subscription/inquiry/${inquiryId}/activation`
      : `${process.env.API_BASE_URL}/subscription/inquiry/${inquiryId}/activation`
    const params = {
      stripe_customer_id: data.object.customer,
      stripe_subscription_id: data.object.subscription,
    }
    info(
      `[handleCheckoutComplete][laravel-API]: calling endpoint=${endpoint} with params=${JSON.stringify(
        params
      )}`
    )
    await axios.post(endpoint, params).catch((e) => {
      error(`[handleCheckoutComplete][laravel-API]: received error`)
      error(e.response.data)
    })
  } catch (e) {
    error(`[handleCheckoutComplete]: unknown error ${e}`)
  }
}

const handlePaymentIntent = (data) => {
  info('[handlePaymentIntent]:')
  try {
    setTimeout(async () => {
      info('[handlePaymentIntent]: now retrieving payment method')
      let pm = 'Other'
      if (data.last_payment_error) {
        pm = { type: data.last_payment_error.payment_method.type }
        info(
          `[handlePaymentIntent]: found payment method type '${pm.type}' from last_payment_error`
        )
      } else if (data.payment_method) {
        info(
          '[handlePaymentIntent]: attempting to retrieve payment method from stripe for ' +
            data.payment_method
        )
        pm = await getPaymentMethod(data.payment_method)
        if (pm)
          info(
            `[handlePaymentIntent]: payment method received from stripe ${pm}`
          )
      }
      const endpoint = process.env.API_BASE_URL.endsWith('/')
        ? `${process.env.API_BASE_URL}subscription/inquiry/payment-intent`
        : `${process.env.API_BASE_URL}/subscription/inquiry/payment-intent`
      const status = data.object.status || data.status
      // status will be one of below
      // requires_payment_method
      // requires_confirmation
      // requires_action
      // processing
      // requires_capture
      // canceled
      // succeeded
      // if (status === 'canceled') status = 'cancel'
      // else if (status === 'failed') status = 'fail'
      // else if (status === 'succeeded') status = 'success'
      // else status = 'pending'

      const params = {
        stripe_payment_id: data.object.id || data.id,
        stripe_customer_id: data.object.customer || data.customer,
        payment_type: pm.type,
        payment_status: status,
      }
      info(
        `[handlePaymentIntent][laravel-API]: calling endpoint ${endpoint} with params=${JSON.stringify(
          params
        )}`
      )
      axios.post(endpoint, params).catch((e) => {
        error(
          `[handlePaymentIntent][laravel-API]: ${endpoint} failed, params=${JSON.stringify(
            params
          )}, error = `
        )
        error(e.response.data)
      })
    }, 10000)
    info(
      `[handlePaymentIntent]: waiting for about 10sec b4 retrieving payment method.. `
    )
  } catch (e) {
    error(
      `[handlePaymentIntent]: unknown error occured '${
        e.response
      }' for arg ${JSON.stringify(data)}`
    )
  }
}
// eslint-disable-next-line require-await
const handleSuccessInvoice = async (data) => {
  info('[handleSuccessInvoice]:')
  setTimeout(async () => {
    const apiEndpoint = process.env.BACKAND_URL.endsWith('/')
      ? `${process.env.BACKAND_URL}admin/subscription/customer-invoice-paid`
      : `${process.env.BACKAND_URL}/admin/subscription/customer-invoice-paid`
    console.log('apiEndpoint-handleSuccessInvoice--')
    console.log(apiEndpoint)
    await axios.get(apiEndpoint, { params: data }).catch((e) => {
      error(e.response.data)
    })
    return Promise.resolve({})
  }, 10000)
}
const getSubscriptionById = async (id) => {
  return await stripe.subscriptions.retrieve(id)
}
const getPaymentMethod = async (id) => {
  return await stripe.paymentMethods.retrieve(id)
}
const getInvoicesForCustomer = async (customer, subscription) => {
  // return await stripe.invoices.list({ limit: 100, customer, subscription })
  return await stripe.invoices.list({ limit: 100, customer })
}
const getPaymentIntent = async (pi) => await stripe.paymentIntents.retrieve(pi)

// const handleSessionFailure = async (checkoutSession) => {}
const handleInvoiceFailure = async (invoice) => {
  info(`[handleInvoiceFailure]: received invoice ${invoice}`)
  const pi = await invoice.payment_intent
  info(`[handleInvoiceFailure]: retrieving payment intent with pi = ${pi}`)
  const paymentIntent = await getPaymentIntent(pi)
  handlePaymentIntent(paymentIntent)
}

const trialSetupAttached = async (setupData) => {
  const endpoint = process.env.API_BASE_URL.endsWith('/')
    ? `${process.env.API_BASE_URL}subscription/add-payment-method`
    : `${process.env.API_BASE_URL}/subscription/add-payment-method`
  const params = {
    customer: setupData.data.object.customer,
  }
  console.log(
    `[trialSetupAttached]: setting 'invoice_settings.default_payment_method' for customer '${setupData.data.object.customer}'`
  )
  await setDefaultPayment(
    setupData.data.object.payment_method,
    setupData.data.object.customer
  ).catch(console.error)
  axios.post(endpoint, params).catch((e) => {
    error(
      `[trialSetupAttached][laravel-API]: ${endpoint} failed, params=${JSON.stringify(
        params
      )}, error = `
    )
    error(e.response.data)
  })
}

const setDefaultPayment = (source, custId) => {
  return stripe.customers.update(custId, {
    invoice_settings: { default_payment_method: source },
  })
}

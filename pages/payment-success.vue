<template>
  <div class="main">
    <SubscriptionHeader />
    <div class="lariat-plan-body customscrollbar">
      <div class="container h-100">
        <div class="sign-screen-dtable">
          <div class="sign-screen-dtable-cell">
            <div class="thank-you-payment">
              <h2>
                <svg
                  class="thank-you-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.5"
                  height="17.5"
                  viewBox="0 0 17.5 17.5"
                >
                  <g
                    id="incomplete-tasks"
                    transform="translate(422.202 87.935)"
                  >
                    <circle
                      id="Ellipse_98"
                      data-name="Ellipse 98"
                      cx="8"
                      cy="8"
                      r="8"
                      transform="translate(-421.452 -87.185)"
                      fill="#fff"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      id="Path_2644"
                      data-name="Path 2644"
                      d="M-410.074-81.508l-4.553,4.553-2.277-2.277"
                      transform="translate(0.037 0.046)"
                      fill="#fff"
                      stroke-width="1.5"
                    ></path>
                  </g>
                </svg>
                Thank you for Payment
              </h2>
              <p>An invoice is sent to your registered email id.</p>
              <p>
                Also, You will receive an account activation link on your email
                id. <br />You can set-up your password from that link and Login
                into Lariat Marketing Hub to access DAM.
              </p>
              <hr />
              <p>
                Having trouble with activation link? <a href="#">Contact Us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import SubscriptionHeader from '@/components/theme/SubscriptionHeader'

let stripe

const PAYMENT_STATUS = {
  success: 'success',
  pending: 'pending',
  failed: 'failed',
  unknown: 'unknown',
}
export default {
  components: { SubscriptionHeader },
  data() {
    return {
      paymentStatus: '',
    }
  },
  computed: {
    STRIPE_CHECKOUT_MODE() {
      return process.env.STRIPE_CHECKOUT_MODE
    },
  },
  mounted() {
    if (this.STRIPE_CHECKOUT_MODE === 'custom') this.customCheckoutHandler()
  },
  methods: {
    async customCheckoutHandler() {
      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      )
      if (!clientSecret) return this.$router.replace({ path: '/' })
      stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
      // Retrieve the PaymentIntent
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          // Inspect the PaymentIntent `status` to indicate the status of the payment
          // to your customer.
          //
          // Some payment methods will [immediately succeed or fail][0] upon
          // confirmation, while others will first enter a `processing` state.
          //
          // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
          switch (paymentIntent.status) {
            case 'succeeded':
              this.paymentStatus = PAYMENT_STATUS.success
              return this.$router.replace({ name: this.$route.name })

            case 'processing':
              this.paymentStatus = PAYMENT_STATUS.pending
              console.log('pending')
              break

            case 'requires_payment_method':
              this.paymentStatus = PAYMENT_STATUS.failed
              console.log('failed')
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              break

            default:
              this.paymentStatus = PAYMENT_STATUS.unknown
              break
          }
        })
        .catch((e) => {
          console.log(e)
          this.$router.replace({ path: '/' })
        })
    },
  },
}
</script>

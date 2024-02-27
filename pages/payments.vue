<template>
  <div class="main">
    <SubscriptionHeader />
    <div class="lariat-plan-body customscrollbar">
      <div class="container">
        <div class="row">
          <div
            class="col-md-6"
            style="justify-content: center; align-items: center"
          >
            Product description
          </div>
          <div
            class="col-md-6"
            style="justify-content: center; align-items: center"
          >
            <form id="payment-form">
              <div id="payment-element">
                <!-- stripe will inject an iframe here -->
              </div>
              <a
                class="mt-5 btn btn-big btn-icon btn-block"
                :class="{ disabled: paymentErrorMsg }"
                :disabled="paymentErrorMsg"
                @click.capture.prevent.stop="submit"
              >
                Pay Now
                <svg
                  class="lock-icon"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Lock">
                    <g id="padlock_3_" transform="translate(2.25)">
                      <path
                        id="Path_40218"
                        class="fill-color"
                        d="M6.8,0C4,0,1.7,2.2,1.7,5c0,0,0,0,0,0v2.2C0.8,7.3,0,8,0,8.9C0,9,0,9,0,9v7.3C0,17.2,0.7,18,1.6,18c0,0,0,0,0.1,0h10.1c0.9,0,1.7-0.7,1.7-1.6c0,0,0,0,0-0.1V9c0-0.9-0.7-1.7-1.6-1.7c0,0,0,0-0.1,0V5.1C11.8,2.3,9.6,0,6.8,0C6.8,0,6.8,0,6.8,0z M12.4,9v7.3c0,0.3-0.2,0.5-0.5,0.6c0,0,0,0-0.1,0H1.7c-0.3,0-0.5-0.2-0.6-0.5c0,0,0,0,0-0.1V9c0-0.3,0.2-0.5,0.5-0.6c0,0,0,0,0.1,0h10.1C12.1,8.4,12.4,8.6,12.4,9C12.4,9,12.4,9,12.4,9z M2.8,7.3V5.1c0-2.2,1.8-3.9,4-3.9c2.1,0,3.8,1.7,3.9,3.9v2.2H2.8z"
                      ></path>
                      <path
                        id="Path_40219"
                        class="fill-color"
                        d="M6.8,10.1c-0.9,0-1.7,0.7-1.7,1.6c0,0,0,0,0,0.1c0,0.7,0.4,1.4,1.1,1.6v1.2c0,0.3,0.3,0.6,0.6,0.5c0.3,0,0.5-0.2,0.5-0.5v-1.2c0.7-0.2,1.1-0.9,1.1-1.6C8.5,10.9,7.7,10.1,6.8,10.1C6.8,10.1,6.8,10.1,6.8,10.1z M6.8,12.4c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0C7.3,12.1,7.1,12.4,6.8,12.4C6.8,12.4,6.8,12.4,6.8,12.4z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </a>
              <!-- <button id="submit" @click.capture.prevent.stop="submit">Submit</button> -->
              <div v-if="paymentErrorMsg">{{ paymentErrorMsg }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import SubscriptionHeader from '@/components/theme/SubscriptionHeader'

let stripe, elements

export default {
  components: { SubscriptionHeader },
  asyncData({ params }) {
    const customerInfo = params
    return { customerInfo }
  },
  data() {
    return {
      paymentErrorMsg: '',
    }
  },
  async mounted() {
    stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    this.createPaymentIntent()
  },
  methods: {
    createPaymentIntent() {
      axios
        .post('/payments/create-payment-intent', {
          amount: 10000,
          currency: 'usd',
          email: this.customerInfo.email,
          name: this.customerInfo.name,
          phone: this.customerInfo.phone,
          company: this.customerInfo.company,
          plan: this.customerInfo.planId,
        })
        .then((r) => {
          const clientSecret = r.data.clientSecret
          elements = stripe.elements({
            clientSecret,
            appearance: { theme: 'stripe' },
          })
          const paymentElement = elements.create('payment')
          paymentElement.mount('#payment-element')
        })
        .catch((e) => {})
    },
    async submit(e) {
      e.preventDefault()
      const { error } = await stripe.confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/payment-success',
        },
      })
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        this.paymentErrorMsg = error.message
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    },
  },
}
</script>

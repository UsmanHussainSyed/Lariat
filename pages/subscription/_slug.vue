<template>
  <div class="main">
    <SubscriptionHeader />
    <div v-show="loading" class="preloader">
      <div class="loading">
        <img
          :src="require('~/assets/img/lariat-loader.svg')"
          alt=""
          class="img-responsive"
        />
      </div>
    </div>
    <div v-show="!loading" class="lariat-plan-body customscrollbar">
      <div class="container">
        <div class="row big-gutters">
          <div class="col-md-8">
            <div class="box">
              <h2 class="title mb1">Plan Details</h2>
              <div class="row">
                <div class="col-md-3">
                  <h4>Subscription</h4>
                </div>
                <div class="col-md-9">
                  <div class="radio-group">
                    <label
                      v-for="planVariant in planVariants"
                      :key="planVariant.id"
                      class="radio-label"
                      >{{ planVariant.billing_cycle | capitalize }} - ${{
                        Number(planVariant.price).toFixed(2)
                      }}
                      per
                      {{
                        planVariant.billing_cycle === 'yearly'
                          ? 'year'
                          : planVariant.billing_cycle === 'monthly'
                          ? 'month'
                          : planVariant.billing_cycle
                      }}
                      <input
                        type="radio"
                        name="plan"
                        :checked="planVariant.is_active"
                        @click="updateCurrentVariant(planVariant)"
                      />
                      <span class="radio-span"></span>
                    </label>
                  </div>
                  <p class="plan-subscription">
                    <strong>Save {{ totalSaved }}</strong> per month by getting
                    Annual Plan Subscription.
                  </p>
                </div>
              </div>
            </div>
            <div class="box mt2">
              <h2 class="title mb1">Account Information</h2>
              <div class="form">
                <div class="form-group required">
                  <label class="control-label">Full Name</label>
                  <input
                    v-model="$v.customerInfo.fullName.$model"
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder=""
                    @keyup="$v.customerInfo.fullName.$touch()"
                    @paste="$v.customerInfo.fullName.$touch()"
                  />
                  <div
                    v-if="$v.customerInfo.fullName.$error"
                    class="input-error"
                  >
                    &emsp;Please provide your full name
                  </div>
                </div>
                <div class="form-group required">
                  <label class="control-label">Email ID</label>
                  <input
                    v-model="$v.customerInfo.email.$model"
                    type="email"
                    name="email"
                    class="form-control"
                    @keyup="$v.customerInfo.email.$touch()"
                    @paste="$v.customerInfo.email.$touch()"
                  />
                  <div
                    v-if="
                      $v.customerInfo.email.$error &&
                      !$v.customerInfo.email.required
                    "
                    class="input-error"
                  >
                    &emsp;Please provide an email
                  </div>
                  <div
                    v-if="
                      $v.customerInfo.email.$error &&
                      !$v.customerInfo.email.email
                    "
                    class="input-error"
                  >
                    &emsp;Please provide a valid email
                  </div>
                </div>
                <div class="form-group required">
                  <label class="control-label">Company Name</label>
                  <input
                    v-model="$v.customerInfo.company.$model"
                    type="text"
                    name="company"
                    class="form-control"
                    @keyup="$v.customerInfo.company.$touch()"
                    @paste="$v.customerInfo.company.$touch()"
                  />
                  <div
                    v-if="$v.customerInfo.company.$error"
                    class="input-error"
                  >
                    &emsp;Please provide your company name
                  </div>
                </div>
                <div class="form-group required">
                  <label class="control-label"
                    >Phone Number (with country code)</label
                  >
                  <input
                    v-model.number="$v.customerInfo.phone.$model"
                    type="tel"
                    name="phone"
                    class="form-control"
                    @blur="validatePhone($event)"
                    @keyup="validatePhone($event)"
                    @paste="validatePhone($event)"
                  />
                  <div v-if="verifyingPhone" style="font-size: 12px">
                    <SpinLoading /> Verifying ...
                  </div>
                  <div
                    v-else-if="
                      $v.customerInfo.phone.$error ||
                      ($v.customerInfo.phone.$model && invalidPhone)
                    "
                    class="input-error"
                  >
                    &emsp;Please provide your phone number with country code
                    e.g. 4402077651182
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="box bg-lightgray">
              <h2 class="title mb1">Checkout</h2>
              <div class="paymentInfo">
                <div
                  class="d-flex align-items-center justify-content-between mt-2"
                >
                  <label
                    >{{ activeVariant.name }} -
                    {{ activeVariant.billing_cycle | capitalize }}
                    Subscription</label
                  >
                  <h5>${{ Number(activeVariant.price).toFixed(2) }}</h5>
                </div>
                <!-- <div class="d-flex align-items-center justify-content-between mt-2">
                           <label>Promotion code discount (20%)</label>
                           <h5>$1197.60</h5>
                        </div> -->
                <!-- <div class="d-flex align-items-center justify-content-between mt2 mb-4">
                           <label>Promotion Code</label>
                           <input type="text" name="promocode" class="form-control w-50" placeholder="Promotion Code">
                        </div> -->
                <!-- <div class="d-flex align-items-center justify-content-end">
                           <button type="submit" name="submit" class="btn btn-big">Apply</button>
                        </div> -->
                <hr />
                <h3>Net Amount To Pay</h3>
                <h4>
                  ${{ Number(activeVariant.price).toFixed(2) }}
                  <span
                    >per
                    {{
                      activeVariant.billing_cycle === 'yearly'
                        ? 'year'
                        : activeVariant.billing_cycle === 'monthly'
                        ? 'month'
                        : activeVariant.billing_cycle
                    }}</span
                  >
                </h4>
              </div>
            </div>
            <div class="mt2">
              <a
                href="javascript:void(0)"
                class="btn btn-big btn-block"
                :class="{ disabled: !canMakePayment }"
                :disabled="!canMakePayment"
                @click="makePayment()"
              >
                <template v-if="!paymentProcessing"
                  >Continue to Payment</template
                >
                <template v-else
                  ><img
                    :src="require('assets/img/loading.gif')"
                    alt=""
                    height="16"
                  />
                  &nbsp;initiating...
                </template>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import SubscriptionHeader from '@/components/theme/SubscriptionHeader'

export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  components: { SubscriptionHeader },
  asyncData({ query, params, $auth, redirect }) {
    if ($auth.loggedIn) {
      return redirect({
        path: '/',
      })
    }
    return redirect({
      path: `/subscription/trial/${params.slug}`,
      query,
      params,
    })
  },
  data() {
    return {
      planVariants: [],
      customerInfo: {
        fullName: '',
        email: '',
        company: '',
        phone: '',
      },
      paymentProcessing: false,
      inquiryId: null,
      loading: true,
      invalidPhone: true,
      verifyingPhone: false,
      phoneTimer: null,
    }
  },
  computed: {
    activeVariant() {
      if (!this.planVariants.length) return {}
      return this.planVariants.find((e) => e.is_active) || {}
    },
    canMakePayment() {
      return (
        !this.$v.$invalid &&
        !this.paymentProcessing &&
        !this.invalidPhone &&
        !this.verifyingPhone
      )
    },
    STRIPE_CHECKOUT_MODE() {
      return process.env.STRIPE_CHECKOUT_MODE
    },
    monthlyPrice() {
      return (
        this.planVariants.find((e) => e.billing_cycle === 'monthly')?.price || 0
      )
    },
    yearlyPrice() {
      return (
        this.planVariants.find((e) => e.billing_cycle === 'yearly')?.price || 0
      )
    },
    totalSaved() {
      return `$${Math.abs(this.yearlyPrice / 12 - this.monthlyPrice).toFixed(
        2
      )}`
    },
  },
  async mounted() {
    if (this.slug) {
      await this.$axios.$get(`subscription/${this.slug}/detail`).then((r) => {
        const billing =
          this.$route.query.billing === 'monthly' ? 'monthly' : 'yearly'
        const variants = r.data.reverse()
        variants.forEach((variant) => {
          variant.is_active = variant.billing_cycle === billing
        })
        if (!variants.find((e) => e.is_active)) variants[0].is_active = 1
        this.planVariants = variants
      })
    }
    this.loading = false
    this.customerInfo.fullName = this.$route.query.name || ''
    this.customerInfo.email = this.$route.query.email || ''
    this.customerInfo.phone = this.$route.query.phone || ''
    this.customerInfo.company = this.$route.query.company || ''
    if (this.customerInfo.phone) this.validatePhone({})
    if (Object.keys(this.$route.query || {}).length) {
      this.$router.replace({
        name: this.$route.name,
        params: this.$route.params,
        query: {},
      })
    }
  },
  methods: {
    validatePhone(e) {
      let isValid = true
      if (!e) return
      if (e.type === 'keyup') {
        isValid = '+0123456789'.split('').includes(e.key)
      }
      if (!isValid) {
        this.invalidPhone = true
        return
      }
      this.$v.customerInfo.phone.$touch()
      if (!this.$v.customerInfo.phone.$model) {
        this.invalidPhone = true
        return
      }
      if (this.verifyingPhone) {
        if (this.phoneTimer) {
          clearTimeout(this.phoneTimer)
          this.phoneTimer = null
        }
        this.phoneTimer = setTimeout(() => {
          this.validatePhone(e)
        }, 600)
        this.verifyingPhone = false
        return
      }
      this.verifyingPhone = true
      return new Promise((resolve) => {
        axios
          .post('/phone-number/verify', {
            n: this.$v.customerInfo.phone.$model,
          })
          .then(() => (this.invalidPhone = false))
          .catch(() => {
            this.invalidPhone = true
          })
          .finally(() => {
            this.verifyingPhone = false
            resolve()
          })
      })
    },
    updateCurrentVariant(variant) {
      this.planVariants.forEach((e) => (e.is_active = e.id === variant.id))
    },
    async makePayment() {
      this.$v.$touch()
      await this.validatePhone()
      if (!this.canMakePayment || this.invalidPhone) return
      const { error, inquiryId } = await this.createInquiry()
      if (error) {
        return
      }
      this.inquiryId = inquiryId
      return this.initPrebuiltStripe()
    },
    createInquiry() {
      return new Promise((resolve) => {
        this.$axios
          .$post('subscription/create-inquiry', {
            name: this.customerInfo.fullName,
            email: this.customerInfo.email,
            company_name: this.customerInfo.company,
            phone: this.customerInfo.phone,
            subscription_id: this.activeVariant.id,
            coupon_id: null,
          })
          .then((r) => {
            console.info(`inquiry received ${r.data.inquiry_id || r.data.id}`)
            resolve({ error: null, inquiryId: r.data.inquiry_id || r.data.id })
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
            resolve({ error: e })
          })
      })
    },
    initPrebuiltStripe() {
      axios
        .post('/stripe/create-checkout-session', {
          email: this.customerInfo.email,
          priceId: this.activeVariant.stripe_reference_id,
          inquiryId: this.inquiryId,
          fullName: this.customerInfo.fullName,
          phone: this.customerInfo.phone,
          companyName: this.customerInfo.company,
          plan: this.slug,
          billing: this.activeVariant.billing_cycle,
        })
        .then((r) => {
          if (window) window.location.href = r.data.url
        })
    },
  },

  validations: {
    customerInfo: {
      fullName: { required },
      email: { required, email },
      company: { required },
      phone: {
        required,
      },
    },
  },
}
</script>

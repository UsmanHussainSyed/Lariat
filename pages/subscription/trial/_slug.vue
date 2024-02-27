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
    <div v-show="!loading" class="lariat-plan-body customscrollbar p0">
      <div v-if="trialSuccess" class="container h-100">
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
                Thank you for subscribing to Lariat DAM.
              </h2>
              <p>
                You will receive an activation link shortly on your email
                address. <br />You can set up your password from that link and
                Login into Lariat Marketing Hub to access your DAM.
              </p>
              <p>We can't wait to welcome you on board!</p>
              <hr />
              <p>
                Having trouble with activation link?
                <a href="mailto:sales@marketinghub.com">Contact Us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row no-gutters h-100">
        <div class="col-md-7 trial-sec-left">
          <div class="free-trial-box left">
            <h2>Start Your Free Trial!</h2>
            <div class="d-flex align-items-center">
              <div
                v-for="planVariant in planVariants"
                :key="planVariant.id"
                class="box"
                :class="{ active: planVariant.is_active }"
              >
                <label class="radio-label">
                  <strong
                    >{{ planVariant.name }}/{{ planVariant.billing_cycle }}
                    <span
                      >${{ Number(planVariant.price).toFixed(2) }}</span
                    ></strong
                  >
                  <input
                    type="radio"
                    name="plan"
                    :checked="planVariant.is_active"
                    @click="updateCurrentVariant(planVariant)"
                  />
                  <span class="radio-span"></span>
                </label>
              </div>
            </div>
            <strong
              v-if="activeVariant.billing_cycle === 'monthly'"
              class="mb3 mt1"
              >Save {{ totalSaved }} per month by getting Yearly
              subscription.</strong
            >
            <strong v-else class="mb3 mt1">
              <svg
                id="Layer_1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
                class="check-workspace"
                style=""
                fill="#55af9c"
              >
                <g id="check-box" transform="translate(421.452 87.185)">
                  <circle
                    id="Ellipse_98"
                    cx="-412.5"
                    cy="-78.2"
                    r="9"
                    class=""
                  ></circle>
                  <path
                    id="Path_2644"
                    d="M-408.6-80.7l-5.1,5.1l-2.6-2.6"
                    class="st1"
                  ></path>
                </g></svg
              >&nbsp;You are saving {{ totalSaved }} per month with Yearly
              subscription.</strong
            >
            <p>
              Explore Lariat DAM to visualize and get experience about how it
              can help you to empower business and your brand.
            </p>
            <p>
              Easy to manage, share & download your digital assets among your
              users.
            </p>
          </div>
        </div>
        <div class="col-md-5 trial-sec-right">
          <div class="free-trial-box right">
            <h3>
              Plan -
              <strong
                >{{ (activeVariant.name || '').toUpperCase() }} /
                {{ activeVariant.billing_cycle | capitalize }}</strong
              >
            </h3>
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
              <div v-if="$v.customerInfo.fullName.$error" class="input-error">
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
                  $v.customerInfo.email.$error && !$v.customerInfo.email.email
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
                name="cname"
                class="form-control"
                @keyup="$v.customerInfo.company.$touch()"
                @paste="$v.customerInfo.company.$touch()"
              />
              <div v-if="$v.customerInfo.company.$error" class="input-error">
                &emsp;Please provide your company name
              </div>
            </div>
            <div class="form-group required">
              <label class="control-label"
                >Phone Number (with Country Code)</label
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
                &emsp;Please provide your phone number with country code e.g.
                4402077651182
              </div>
            </div>
            <div class="form-group">
              <span
                >By signing up, you agree to our
                <a
                  href="https://www.marketinghub.com/terms-condition"
                  target="_blank"
                  class="btn-link"
                  >Terms of Service.</a
                ></span
              >
            </div>
            <div class="form-group mt2">
              <button
                type="submit"
                name="submit"
                class="btn btn-big"
                :class="{ disabled: !canMakePayment }"
                :disabled="!canMakePayment"
                @click="startTrial()"
              >
                <SpinLoading v-show="creatingTrial" />
                {{ creatingTrial ? 'Please wait...' : 'Start Trial' }}
              </button>
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
    return { slug: params.slug }
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
      inquiryId: null,
      loading: true,
      invalidPhone: true,
      verifyingPhone: false,
      phoneTimer: null,
      creatingTrial: false,
      trialSuccess: false,
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
        !this.invalidPhone &&
        !this.verifyingPhone &&
        !this.creatingTrial
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
    async startTrial() {
      this.$v.$touch()
      await this.validatePhone()
      if (!this.canMakePayment || this.invalidPhone || this.creatingTrial)
        return
      const { error } = await this.createInquiry()
      return error ? null : this.initPrebuiltStripe()
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
            resolve({ error: null, inquiryId: r.data.inquiry_id || r.data.id })
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
            resolve({ error: e })
          })
      })
    },
    updateInquiry(inquiryId, custId, subId) {
      this.trialSuccess = false
      return this.$axios
        .$post('subscription/inquiry/' + inquiryId + '/activation', {
          stripe_customer_id: custId,
          stripe_subscription_id: subId,
        })
        .then((r) => {
          this.trialSuccess = true
        })
        .catch(console.log)
    },
    initPrebuiltStripe() {
      this.creatingTrial = true
      axios
        .post('/stripe/create-checkout-session2', {
          email: this.customerInfo.email,
          priceId: this.activeVariant.stripe_reference_id,
          name: this.customerInfo.fullName,
          phone: this.customerInfo.phone,
          company: this.customerInfo.company,
          plan: this.slug,
          billing: this.activeVariant.billing_cycle,
        })
        .then(async (r) => {
          const { error, inquiryId } = await this.createInquiry()
          if (error) return
          await this.updateInquiry(inquiryId, r.data.customer, r.data.id)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.creatingTrial = false
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
<style scoped>
.trial-sec-left {
  transform: translateX(4vw);
  animation: slide 0.5s ease-in-out both;
}
.trial-sec-right {
  transform: translateX(10vw);
  animation: slide2 0.5s ease-in-out both;
  opacity: 0;
}
@keyframes slide {
  from {
    transform: translateX(4vw);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slide2 {
  0% {
    transform: translateX(10vw);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

<template>
  <div class="main">
    <SubscriptionHeader />
    <div class="lariat-plan-body customscrollbar">
      <div v-if="alreadyExists" class="container h-100">
        <div class="sign-screen-dtable">
          <div class="sign-screen-dtable-cell">
            <div class="thank-you-payment">
              <h2>You are already subscribed</h2>
              <p>
                Please <nuxt-link to="/" replace>login</nuxt-link> to access
                your DAM instance.
              </p>
              <hr />
              <p>
                Having trouble with activation link?
                <a href="mailto:sales@marketinghub.com">Contact Us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="(inquiryInfo || {}).payment_status === 'success'"
        class="container h-100"
      >
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
                Having trouble with activation link?
                <a href="mailto:sales@marketinghub.com">Contact Us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="container h-100">
        <div class="sign-screen-dtable">
          <div class="sign-screen-dtable-cell">
            <div class="thank-you-payment">
              <h2>We are processing your payment</h2>
              <p>Please check back shortly.</p>
              <p>
                Once your account is confirmed and validated, you will receive
                an account activation link via the email you initially
                registered with us. <br />Please note: Payments processed
                through ACH bank transfer might take up to 3-5 days to finalize.
              </p>
              <hr />
              <p>
                Having trouble with activation link? Please
                <a href="mailto:sales@marketinghub.com">reach out to us</a> and
                we will assist in any way we can.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionHeader from '@/components/theme/SubscriptionHeader'
export default {
  components: { SubscriptionHeader },
  asyncData({ params, error, $axios, $auth, redirect }) {
    if ($auth.loggedIn) {
      return redirect({
        path: '/',
      })
    }
    if (params?.id) {
      return $axios
        .$post(`subscription/inquiry/${params.id}/detail`)
        .then(({ data }) => {
          return { inquiryInfo: data, inquiryId: params.id }
        })
        .catch((e) => {
          console.log('inquiry/id/detail ', params.id)
          console.log(JSON.stringify(e))
          try {
            const { message } = e.response.data
            if (message === 'Email id already exist.') {
              return {
                inquiryId: params.id,
                inquiryInfo: {},
                alreadyExists: true,
              }
            } else if (message === 'Inquiry not found.') {
              return error({
                status: 404,
                message: 'No such inquiry exists!',
              })
            }
            return error({
              status: 404,
            })
          } catch (e) {
            return error({
              status: 404,
            })
          }
        })
    }
    return error({
      status: 404,
      message: 'Oh, lost somewhere?',
    })
  },
  data() {
    return {
      inquiryInfo: {},
      loading: true,
      alreadyExists: false,
      inquiryId: null,
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style></style>

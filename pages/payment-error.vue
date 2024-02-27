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
                Error for Payment
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
import SubscriptionHeader from '@/components/theme/SubscriptionHeader'

export default {
  components: { SubscriptionHeader },
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="general-settings-right h-100">
    
    <div class="workspace-settings h-100 p-0 customscrollbar">
      
      <div class="account-billing-setting">
        <div v-if="trialInactive && !loading">
          
        </div>
        <template v-else>
          <div class="d-flex align-items-center">
            
           
          </div>
          
          
         
          
          
          
          <div class="box mb2 mt1">
            <div class="visa-card-info">
              <div class="d-flex align-items-center justify-content-between">
                <ContentLoader
                  v-if="loading"
                  :speed="2"
                  :animate="true"
                  :height="21"
                  :width="400"
                  :style="{
                    width: '400px',
                    height: '21px',
                    borderRadius: '3px',
                  }"
                >
                  <rect x="0" :y="0" rx="0" ry="0" width="400" height="21" />
                  />
                </ContentLoader>
                <template v-else>
                  <template
                    v-if="!(defaultPayment.brand || defaultPayment.bank)"
                  >
                    <div class="d-flex align-items-center">
                      <p class="mb0">
                        This feature only accessible from web view. <br/>Kindly open your DAM in web application.<br/>

                        app.marketinghub.com
                      </p>
                    </div>
                   
                  </template>
                  
                </template>
              </div>
            </div>
          </div>
          
          
          
         
        </template>
      </div>
    </div>
    <!-- buy token modal -->
    <div
      v-if="imageGenerationAllowed"
      id="buy-token-modal"
      class="modal fade buy-token"
    >
      <div
        class="modal-dialog bigger modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buy Token</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <svg
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div v-for="addon in addons" :key="addon.id" class="col-md-3">
                <div class="token-box">
                  <div class="tokne-icons">
                    <img
                      v-for="i in addon.imgCount"
                      :key="i"
                      :src="require('~/assets/img/dalle/token-icon.svg')"
                    />
                  </div>
                  <div class="token-price">
                    <span>{{ addon.tokens }} Tokens - ${{ addon.price }}</span>
                  </div>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-gray"
                    @click="buyToken(addon)"
                    >Buy</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cards modal -->
    <div id="payment-method" class="modal fade show" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payment Methods</h5>
            <button
              ref="cardsModalClose"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <form id="payment-form" @submit.prevent="addCard()">
              <template v-if="showAddCard">
                <div id="payment-element">
                  <div v-show="stripeElemLoaded" id="payment-element-stripe">
                    <!-- Elements will create form elements here -->
                  </div>
                  <div v-show="!stripeElemLoaded" class="spinnerWrapper">
                    <div class="spinner"></div>
                  </div>
                </div>
                <button
                  id="submit"
                  class="btn btn-big"
                  :disabled="!stripeElemLoaded"
                  :class="{ disabled: !stripeElemLoaded }"
                >
                  Submit
                </button>
                <a
                  href="javascript:void(0);"
                  class="btn btn-big btn-gray"
                  :disabled="!stripeElemLoaded"
                  :class="{ disabled: !stripeElemLoaded }"
                  @click="showAddCard = false"
                  >Cancel</a
                >
                <hr />
              </template>
              <div
                id="error-message"
                class="text-red"
                v-html="addCardError"
              >
            
            </div>
            </form>
            <div class="d-flex justify-content-end mb1">
              <a
                href="javascript:void(0);"
                class="btn"
                :disabled="showAddCard"
                :class="{ disabled: showAddCard }"
                @click="addCardDialog()"
                >Add New Method</a
              >
            </div>
            <div
              v-for="payment in subscription.payment"
              :key="payment.id"
              class="box mb1"
            >
              <!-- card -->
              <div v-if="payment.type === 'card'" class="visa-card-info">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img
                      v-if="payment.card.brand"
                      :src="
                        require(`~/assets/img/card-icon/${toLowerKebab(
                          payment.card.brand
                        )}.svg`)
                      "
                      alt=""
                    />
                    <h2>
                      <span>{{ payment.card.brand }}</span
                      >****<span>{{ payment.card.last4 }}</span>
                    </h2>
                    <span
                      v-if="isDefaultPayment(payment.id)"
                      class="plan-status alert-secondary"
                      >Default</span
                    >
                  </div>
                  <div class="d-flex align-items-center">
                    <strong
                      >Expire {{ payment.card.exp_month }}/{{
                        payment.card.exp_year
                      }}</strong
                    >
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          id="Layer_1"
                          class="menu-option-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Group_4482" transform="translate(-872 -801)">
                            <rect
                              id="Rectangle_3020"
                              x="872"
                              y="801"
                              class="fill-hide"
                              width="18"
                              height="18"
                            ></rect>
                            <g
                              id="Group_4348"
                              transform="translate(588.166 653.684)"
                            >
                              <circle
                                id="Ellipse_203"
                                class="fill-color"
                                cx="292.8"
                                cy="148.9"
                                r="1.5"
                              ></circle>
                              <circle
                                id="Ellipse_203-2"
                                class="fill-color"
                                cx="292.8"
                                cy="163.8"
                                r="1.5"
                              ></circle>
                              <circle
                                id="Ellipse_203-3"
                                class="fill-color"
                                cx="292.8"
                                cy="156.3"
                                r="1.5"
                              ></circle>
                            </g>
                          </g>
                        </svg>
                      </a>
                      <ul class="dropdown-menu" style="will-change: transform">
                        <li
                          v-tooltip="
                            isDefaultPayment(payment.id)
                              ? 'This is already your default payment method.'
                              : makingDefault
                              ? 'Please wait...'
                              : ''
                          "
                          :style="
                            isDefaultPayment(payment.id) || makingDefault
                              ? 'opacity:0.4'
                              : ''
                          "
                        >
                          <a
                            v-if="!isDefaultPayment(payment.id)"
                            href="javascript:void(0);"
                            class="dropdown-item"
                            :class="{
                              disabled: isDefaultPayment(payment.id),
                            }"
                            :disabled="
                              isDefaultPayment(payment.id) || makingDefault
                            "
                            @click="makeDefaultCard(payment.id)"
                            >Mark as Default</a
                          >
                        </li>
                        <li
                          v-tooltip="
                            isDefaultPayment(payment.id)
                              ? 'You cannot remove your default method.'
                              : subscription.payment.length < 2
                              ? 'You cannot remove the only method.'
                              : ''
                          "
                          :style="
                            isDefaultPayment(payment.id) ||
                            subscription.payment.length < 2
                              ? 'opacity:0.4'
                              : ''
                          "
                        >
                          <a
                            href="javascript:void(0);"
                            class="dropdown-item"
                            :class="{
                              disabled:
                                subscription.payment.length < 2 ||
                                isDefaultPayment(payment.id),
                            }"
                            :disabled="
                              subscription.payment.length < 2 ||
                              isDefaultPayment(payment.id)
                            "
                            @click="removeCard(payment)"
                            >Remove</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- us_bank_account -->
              <div
                v-if="payment.type === 'us_bank_account'"
                class="visa-card-info"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="require(`~/assets/img/card-icon/bank.svg`)"
                    alt=""
                  />
                  <h2>
                    <span>{{ payment.us_bank_account.bank_name }}</span
                    >****<span>{{ payment.us_bank_account.last4 }}</span>
                  </h2>
                  <span
                    v-if="isDefaultPayment(payment.id)"
                    class="plan-status alert-secondary"
                    >Default</span
                  >
                  <div class="dropdown">
                    <a
                      href="javascript:void(0);"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        id="Layer_1"
                        class="menu-option-icon h-orange"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4482" transform="translate(-872 -801)">
                          <rect
                            id="Rectangle_3020"
                            x="872"
                            y="801"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <g
                            id="Group_4348"
                            transform="translate(588.166 653.684)"
                          >
                            <circle
                              id="Ellipse_203"
                              class="fill-color"
                              cx="292.8"
                              cy="148.9"
                              r="1.5"
                            ></circle>
                            <circle
                              id="Ellipse_203-2"
                              class="fill-color"
                              cx="292.8"
                              cy="163.8"
                              r="1.5"
                            ></circle>
                            <circle
                              id="Ellipse_203-3"
                              class="fill-color"
                              cx="292.8"
                              cy="156.3"
                              r="1.5"
                            ></circle>
                          </g>
                        </g>
                      </svg>
                    </a>
                    <ul class="dropdown-menu" style="will-change: transform">
                      <li
                        v-tooltip="
                          isDefaultPayment(payment.id)
                            ? 'This is already your default method.'
                            : makingDefault
                            ? 'Please wait...'
                            : ''
                        "
                        :style="
                          isDefaultPayment(payment.id) || makingDefault
                            ? 'opacity:0.4'
                            : ''
                        "
                      >
                        <a
                          v-if="!isDefaultPayment(payment.id)"
                          href="javascript:void(0);"
                          class="dropdown-item"
                          :class="{
                            disabled: isDefaultPayment(payment.id),
                          }"
                          :disabled="
                            isDefaultPayment(payment.id) || makingDefault
                          "
                          @click="makeDefaultCard(payment.id)"
                          >Mark as Default</a
                        >
                      </li>
                      <li
                        v-tooltip="
                          isDefaultPayment(payment.id)
                            ? 'You cannot remove your default method.'
                            : subscription.payment.length < 2
                            ? 'You cannot remove the only payment method.'
                            : ''
                        "
                        :style="
                          isDefaultPayment(payment.id) ||
                          subscription.payment.length < 2
                            ? 'opacity:0.4'
                            : ''
                        "
                      >
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item"
                          :class="{
                            disabled:
                              subscription.payment.length < 2 ||
                              isDefaultPayment(payment.id),
                          }"
                          :disabled="
                            subscription.payment.length < 2 ||
                            isDefaultPayment(payment.id)
                          "
                          @click="removeCard(payment)"
                          >Remove</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!(subscription.payment || []).length"
              style="
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              No payment methods found.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cancel subscription modal -->
    <div id="cancel-subscription" class="modal fade show" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">You are canceling your DAM subscription</h5>
            <button
              ref="cancelBtn"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body cancel-subscription">
            <p class="mb2">
              We are sorry to see you go! So that we can continue to improve our
              service, please take a moment to tell us why you are canceling
              your
              <span :class="`plan-status ${(planName || '').toLowerCase()}`">{{
                planName
              }}</span>
              subscription.
            </p>
            <div class="form-group d-flex required">
              <label class="control-label">Reason</label>
              <div class="radio-group vertical">
                <label
                  v-for="reason in cancelReasons"
                  :key="reason.id"
                  class="radio-label"
                  @click="cancelReason = reason"
                  >{{ reason.text }}
                  <input
                    type="radio"
                    name="reason"
                    :value="reason.id"
                    :checked="cancelReason.id === reason.id"
                  />
                  <span class="radio-span"></span>
                </label>
              </div>
            </div>
            <div class="form-group d-flex required">
              <label class="control-label">Comment</label>
              <textarea
                v-model="cancelComment"
                cols="4"
                rows="4"
                class="form-control"
                :placeholder="'What could we have done differently to improve the experience for you?'"
                :required="true"
              ></textarea>
            </div>
            <div class="form-group">
              <h6>Please Acknowledge</h6>
              <div class="d-flex acknowledge">
                <label class="check-label">
                  <input
                    v-model="cancelAcknowledged"
                    type="checkbox"
                    name="acknowledge"
                    :checked="cancelAcknowledged"
                  />
                  <span class="check-span"></span>
                </label>
                <p>
                  Your subscription will be cancelled on your current active
                  plan end date
                  <strong>{{
                    $moment(
                      (stripeSubscriptionObj.end_at ||
                        stripeSubscriptionObj.current_period_end) * 1000
                    ).format('DD MMM YYYY')
                  }}</strong
                  >. Till that date, still you have access to your DAM account.
                  You can also claim back to restart subscription if you have
                  changed your mind. Once your subscription is cancel, you will
                  no longer able to access your DAM account.
                </p>
              </div>
            </div>
            <div class="form-group mb0">
              <div class="d-flex justify-content-center">
                <a
                  href="javascript:void(0);"
                  class="btn btn-danger btn-big"
                  :disabled="!allowedToCancel"
                  :style="
                    allowedToCancel ? '' : 'opacity:0.4;cursor:not-allowed'
                  "
                  @click="cancelSubscription()"
                >
                  <SpinLoading v-show="canceling" />
                  {{ canceling ? 'Canceling...' : 'Cancel Subscription' }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- plan change modal -->
    <plan-change-modal
      v-if="subscription"
      ref="planChangeModal"
      :subscription="subscription"
      :stripe-subscription-obj="stripeSubscriptionObj"
      @plan-changed="
        ({ newPlan, downgrading }) => {
          $auth.fetchUser()
          pendingUpdate = !downgrading
        }
      "
    />

    <!-- cancel trial modal -->
    <!-- <div id="cancel-trial" class="modal fade show" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cancel trial and deactivate account</h5>
            <button
              ref="cancelTrialModalCloseBtn"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body cancel-subscription">
            <p class="mb2">
              We are sorry to see you go! So that we can continue to improve our
              service, please take a moment to tell us why you are canceling
              your trial account.
            </p>
            <div class="form-group d-flex required">
              <label class="control-label">Reason</label>
              <div class="radio-group vertical">
                <label
                  v-for="reason in cancelReasons"
                  :key="reason.id"
                  class="radio-label"
                  @click="cancelTrialReason = reason"
                  >{{ reason.text }}
                  <input
                    type="radio"
                    name="reason"
                    :value="reason.id"
                    :checked="cancelTrialReason.id === reason.id"
                  />
                  <span class="radio-span"></span>
                </label>
              </div>
            </div>
            <div class="form-group d-flex required">
              <label class="control-label">Comment</label>
              <textarea
                v-model="cancelTrialComment"
                cols="4"
                rows="4"
                class="form-control"
                :placeholder="'What could we have done differently to improve the experience for you?'"
              ></textarea>
            </div>
            <div class="form-group">
              <h6>Please Acknowledge</h6>
              <div class="d-flex acknowledge">
                <label class="check-label">
                  <input
                    v-model="cancelTrialAcknowledged"
                    type="checkbox"
                    name="acknowledge"
                    :checked="cancelTrialAcknowledged"
                  />
                  <span class="check-span"></span>
                </label>
                <p>
                  Cancelling your trial period will lead to deactivation of your
                  current workspace account and you won't be able to access it
                  again in future. Also your stored data will be removed from
                  the server and it is irreversible.
                </p>
              </div>
            </div>
            <div class="form-group mb0">
              <div class="d-flex justify-content-center">
                <a
                  href="javascript:void(0);"
                  class="btn btn-danger btn-big m0"
                  :disabled="!allowedToCancelTrial"
                  :style="
                    allowedToCancelTrial ? '' : 'opacity:0.4;cursor:not-allowed'
                  "
                  @click="cancelTrial()"
                >
                  <SpinLoading v-show="cancelingTrial" />
                  {{
                    cancelingTrial ? 'Please wait...' : 'Deactivate Account'
                  }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- after trial cancelled successfully, show message before logging out -->
    <div
      v-if="trialCancelConfirmed"
      class="modal fade show"
      aria-hidden="true"
      :style="trialCancelConfirmed ? 'display:block' : 'display: none'"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body cancel-subscription">
            <h5 class="text-center">
              Your trial has been cancelled successfully.
            </h5>

            <div class="mt2 mb2" style="font-size: 14px">
              Please note that following data will be removed permanently from
              our server and its irreversible.
              <ul>
                <li>- Admin & Dealer records</li>
                <li>- All your public & private assets including folders</li>
                <li>- Shared & Embedded URLs</li>
                <li>- Internal & External integrations</li>
              </ul>
              <br />
              will be removed/deactivated along with this workspace from our
              servers.
            </div>
            <p class="text-center font-italic" style="font-size: 12px">
              You will be logged out in a moment automatically...
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- after token purchased -->
    <div
      v-if="tokenPurchaseConfirmed"
      class="modal fade show"
      aria-hidden="true"
      :style="tokenPurchaseConfirmed ? 'display:block' : 'display: none'"
      @click="tokenPurchaseConfirmed = false"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 justify-content-end">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="tokenPurchaseConfirmed = false"
            >
              <span aria-hidden="true">
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body cancel-subscription text-center">
            <h2>Thank You</h2>
            <p class="mt1 mb0">
              You will be receiving an email soon with the Token confirmation
              and an invoice.<br />
              After that tokens will reflect in your account. If you have any
              query regarding the Token or invoice, please contact us at
              <a href="mailto:support@marketinghub.com" class="btn-link"
                >support@marketinghub.com</a
              >
            </p>
            <p
              style="
                font-size: 12px;
                margin-top: 14px;
                opacity: 0.875;
                margin-bottom: 0 !important;
              "
            >
              Note: We will update this billing page in a few moment.
            </p>
            <a
              href="javascript:void(0)"
              class="btn btn-gray mt-4"
              @click="tokenPurchaseConfirmed = false"
              >Close</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import PlanChangeModal from '@/components/dam/Dialogs/subscription/PlanChangeModal'

export default {
  components: { ContentLoader, PlanChangeModal },
  filters: {
    capitalize(val) {
      if (!val || typeof val !== 'string') return val
      return val.charAt(0).toUpperCase() + val.substring(1)
    },
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-general-settings',
    'can-access-dam-subscription-billing',
  ],
  data() {
    return {
      subscription: {},
      canceling: false,
      showAllInvoices: false,
      makingDefault: false,
      cancelAcknowledged: false,
      cancelComment: '',
      cancelReasons: Object.freeze([
        {
          id: 1,
          text: 'Too Complex',
        },
        {
          id: 2,
          text: 'I’m closing down my business',
        },
        {
          id: 3,
          text: 'I’m moving to a different DAM platform',
        },
        {
          id: 4,
          text: 'Other',
        },
      ]),
      cancelReason: {},
      cancelTrialReason: {},
      loading: true,
      showAddCard: false,
      stripeElemLoaded: false,
      stripeCardElements: null,
      stripe: null,
      addCardError: '',
      paymentMethod: {},
      stripeSubscriptionObj: {},
      reactivating: false,
      scheduledPlanName: '',
      scheduledPlanDate: '',
      allInvoices: [],
      pendingUpdate: false,
      cancelTrialComment: '',
      cancelTrialAcknowledged: false,
      cancelingTrial: false,
      trialCancelConfirmed: false,
      tokenPurchaseConfirmed: false,
      addons: [],
      fetchingAddons: false,
    }
  },
  computed: {
    getInvoicePlanCycle() {
      return (invoice) => {
        if (!invoice?.lines?.data?.length) return '-'
        if (invoice?.metadata?.type === 'LariatToken') {
          if (invoice?.metadata?.tokenCreditCount) {
            return '+' + invoice.metadata.tokenCreditCount + ' Tokens'
          }
          return 'Token'
        }
        const latestLineItem = invoice.lines.data.slice(-1)[0]
        const plan = latestLineItem?.plan
        const price = latestLineItem?.price
        let cycle
        if (price?.type === 'one_time') cycle = ''
        else cycle = plan?.interval === 'month' ? 'monthly' : 'yearly'
        const planName = plan?.nickname || plan?.product
        return cycle ? [planName, cycle].join(', ') : planName
      }
    },
    imageGenerationAllowed() {
      return !!this.subscription.subscription?.features?.image_generation
        ?.enable
    },
    planColorBorder() {
      if (this.planName === 'Lite') return '1px solid rgb(246 213 92)'
      if (this.planName === 'Pro') return '1px solid rgb(60 174 163)'
      if (this.planName === 'Enterprise') return '1px solid rgb(23 63 95)'
      if (this.planName === 'Custom') return '1px solid rgb(62 195 231)'
      return ''
    },
    planColorBackground() {
      if (this.planName === 'Lite')
        return 'linear-gradient(to top right, rgba(246 213 92/0.3), white)'
      if (this.planName === 'Pro')
        return 'linear-gradient(to top right, rgba(60 174 163/0.3), white)'
      if (this.planName === 'Enterprise')
        return 'linear-gradient(to top right, rgba(23 63 95/0.3), white)'
      if (this.planName === 'Custom')
        return 'linear-gradient(to top right, rgba(62 195 231/0.3), white)'
      return ''
    },
    planShadow() {
      if (this.planName === 'Lite') return '0 0 30px rgba(246 213 92/0.2)'
      if (this.planName === 'Pro') return '0 0 30px rgba(60 174 163/0.2)'
      if (this.planName === 'Enterprise') return '0 0 30px rgba(23 63 95/0.2)'
      if (this.planName === 'Custom') return '0 0 30px rgba(62 195 231/0.2)'
      return ''
    },
    readableStorage() {
      return (storage) => {
        if (!storage || isNaN(parseInt(storage))) return storage
        storage = parseInt(storage)
        if (storage >= 1000) return `${storage / 1000} TB`
        return `${storage} GB`
      }
    },
    allowedToCancel() {
      if (!this.cancelReason?.id) return false
      return this.cancelComment?.length && this.cancelAcknowledged
    },
    allowedToCancelTrial() {
      if (!this.cancelTrialReason?.id) return false
      return this.cancelTrialComment?.length && this.cancelTrialAcknowledged
    },
    billingCycle() {
      return this.subscription.billing_cycle === 'yearly'
        ? 'year'
        : this.subscription.billing_cycle === 'monthly'
        ? 'month'
        : this.subscription.billing_cycle
    },
    storage() {
      return this.subscription.subscription?.features?.storage?.default_value
    },
    planName() {
      return this.subscription?.subscription?.group_name === 'enterprise'
        ? 'Enterprise'
        : this.subscription?.plan_name || ''
    },
    isCustomePlan() {
      return this.subscription?.subscription?.type === 'custom'
    },
    invoices() {
      if (!this.allInvoices?.length) return []
      return this.showAllInvoices
        ? this.allInvoices
        : this.allInvoices.slice(0, 3)
    },
    toLowerKebab() {
      return (name = '') => {
        if ((name || '').includes(' ')) {
          name = name.split(' ').join('-')
        }
        return (name || '').toLowerCase()
      }
    },
    isDefaultPayment() {
      return (pmId) => {
        return this.defaultPayment.id === pmId
      }
    },
    defaultPayment() {
      const pm =
        this.paymentMethod[this.paymentMethod.type] || this.paymentMethod.card
      if (pm) pm.id = this.paymentMethod.id
      return pm || {}
    },
    trialInactive() {
      const wp = this.$auth.user.accessibleWorkspaces.find(
        (e) => e.id === this.$route.params.workspace_id
      )
      if (wp.is_trial_account) {
        return this.subscription?.payment?.length
          ? false
          : wp.is_suspended || wp.trial_expire === 'true'
      }
      return false
    },
  },
  async mounted() {
    if (!this.$auth.user.subscription_user) {
      return this.$router.replace({
        name: 'workspace_id-workspace-settings',
        params: {
          workspaceId: this.$getWorkspaceId(),
        },
      })
    }
    await this.getSubscriptions()
    this.loading = true
    this.fetchSubscription()
    this.getAddons()
    this.fetchInvoices()
    this.cancelReason = this.cancelReasons[0]
    this.loadStripeClient()
    this.getPaymentMethods()
    this.loading = false
    setTimeout(() => {
      this.checkSuccessIntents()
      this.checkTokenCredits()
    }, 1200)
  },
  methods: {
    buyToken(addon) {
      addon.loading = true
      axios
        .post('/stripe/buy-tokens', {
          creditCount: parseInt(addon.tokens),
          price: addon.stripe_reference_id,
          customer: this.subscription.stripe_customer_id,
          workspaceId: this.$route.params.workspace_id,
          subscriptionUserId: this.subscription.id,
          subscriptionAddonId: addon.id,
        })
        .then((response) => {
          location.href = response.headers['token-checkout-uri']
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    cancelTrial() {
      if (!this.allowedToCancelTrial || this.cancelingTrial) return
      this.cancelingTrial = true
      this.$axios
        .$post('digital-assets/subscription/cancel-trial', {
          cancel_reason: this.cancelTrialReason.text,
          cancel_comment: this.cancelTrialComment,
        })
        .then(() => {
          this.$refs.cancelTrialModalCloseBtn.click()
          this.trialCancelConfirmed = true
          try {
            this.subscription.payment.forEach((e) => {
              axios.post('/stripe/detach-payment', { id: e.id })
            })
          } catch (_) {}
          setTimeout(() => {
            this.$auth.logout()
          }, 5000)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.cancelingTrial = false
        })
    },
    fetchInvoices() {
      axios
        .get(
          '/stripe/list-invoices?custId=' +
            this.subscription.stripe_customer_id +
            '&subscriptionId=' +
            this.subscription.stripe_subscription_id
        )
        .then((resp) => {
          this.allInvoices = resp.data.data
        })
    },
    fetchSubscription() {
      axios
        .get(
          '/stripe/subscription?id=' + this.subscription.stripe_subscription_id
        )
        .then((resp) => {
          this.stripeSubscriptionObj = resp.data
          this.fetchPaymentMethod(resp.data.default_payment_method)
        })
    },
    fetchPaymentMethod(id) {
      if (!id) return
      axios.get('/stripe/payment-method?id=' + id).then((resp) => {
        this.paymentMethod = resp.data
      })
    },
    checkSuccessIntents() {
      const searchParams = new URLSearchParams(window.location.search)
      const intent = searchParams.get('setup_intent')
      const clientSecret = searchParams.get('setup_intent_client_secret')
      if (intent && clientSecret) this.$refs.managePayment.click()
      if (!clientSecret) return
      this.stripe
        .retrieveSetupIntent(clientSecret)
        .then(({ setupIntent }) => {
          // Inspect the SetupIntent `status` to indicate the status of the payment
          // to customer.
          //
          // Some payment methods will [immediately succeed or fail][0] upon
          // confirmation, while others will first enter a `processing` state.
          //
          // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
          switch (setupIntent.status) {
            case 'succeeded': {
              this.$toast.global.success(
                'Success! Your payment method has been saved.'
              )
              this.$axios.$post('digital-assets/subscription/activity-log', {
                key: 'add-new-method',
              })
              break
            }

            case 'processing': {
              this.$toast.global.success(
                "Processing payment details. We'll update you when processing is complete."
              )
              break
            }

            case 'requires_payment_method': {
              this.$toast.global.error(
                'Failed to process payment details. Please try another payment method.'
              )
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              break
            }
          }
        })
        .catch((_) => {})
        .finally(() => {
          this.$router.replace({
            name: this.$route.name,
            params: this.$route.params,
          })
        })
    },
    checkTokenCredits() {
      const searchParams = new URLSearchParams(window.location.search)
      if (!searchParams.has('token_credited')) return
      this.tokenPurchaseConfirmed = true
      this.$router.replace({
        ...this.$route,
        query: {},
      })
    },
    async loadStripeClient() {
      this.stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    },
    getPaymentMethods() {
      this.subscription.payment = []
      // For other types see: https://stripe.com/docs/api/payment_methods/customer_list?lang=node#list_customer_payment_methods-type
      axios(
        '/stripe/list-payment-methods?custId=' +
          this.subscription.stripe_customer_id +
          '&type=card'
      )
        .then((r) => {
          this.subscription.payment.push(...r.data)
        })
        .catch(() => {})

      axios(
        '/stripe/list-payment-methods?custId=' +
          this.subscription.stripe_customer_id +
          '&type=us_bank_account'
      )
        .then((r) => this.subscription.payment.push(...r.data))
        .catch(() => {})
    },
    resetPaymentMethods() {
      this.showAddCard = false
      this.stripeElemLoaded = false
      this.addCardError = ''
    },
    reactivateSubscription() {
      this.reactivating = true
      this.$axios
        .$post('digital-assets/subscription/re-activate', {})
        .then(() => {
          this.$toast.global.success(
            'Your subscription has been reactivated successfully!'
          )
          this.subscription.status = 'active'
          this.reactivating = false
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    cancelSubscription() {
      if (this.canceling || !this.allowedToCancel) return
      this.canceling = true
      this.$axios
        .$post('digital-assets/subscription/cancel', {
          cancel_reason: this.cancelReason.text,
          cancel_comment: this.cancelComment,
        })
        .then(() => {
          const dt = this.$moment(
            (this.stripeSubscriptionObj.end_at ||
              this.stripeSubscriptionObj.current_period_end) * 1000
          ).format('DD MMM YYYY')
          this.$toast.global.success(
            `Your DAM subscription is scheduled to cancel on ${dt}. You can reactivate your current plan anytime before ${dt}.`
          )
          this.subscription.status = 'cancel'
          this.$refs.cancelBtn.click()
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.canceling = false
        })
    },
    getSubscriptions() {
      this.loading = true
      return new Promise((resolve) => {
        this.$axios
          .$get('digital-assets/subscription/get')
          .then(({ data }) => {
            data.payment = []
            this.subscription = data
            if (data.next_subscription_id) {
              this.scheduledPlanName = data.next_subscription_id + ''
            }
            if (data.next_billing_date) {
              this.scheduledPlanDate = data.next_billing_date
            }
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.loading = false
            resolve()
          })
      })
    },
    getAddons() {
      if (this.fetchingAddons) return
      this.fetchingAddons = true
      this.$axios
        .$get('addon/list', {
          params: {
            workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((response) => {
          this.addons = response.data
            .sort((a, b) => a.price - b.price)
            .map((e, i) => ({
              ...e,
              imgCount: i < 4 ? i + 1 : 4,
              loading: false,
            }))
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.fetchingAddons = false
        })
    },
    async addCardDialog() {
      if (this.showAddCard) return
      // https://stripe.com/docs/payments/save-and-reuse?platform=web
      // https://github.com/stripe-samples/saving-card-without-payment
      const { data } = await axios.post('/stripe/init-setup-intent', {
        customer: this.subscription.stripe_customer_id,
      })
      const options = {
        clientSecret: data.client_secret,
        // Fully customizable with appearance API.
        appearance: {
          theme: 'stripe',
          // labels: 'floating',
        },
      }
      this.showAddCard = true
      this.stripeElemLoaded = false

      this.$nextTick(() => {
        setTimeout(() => {
          this.stripeCardElements = this.stripe.elements(options)
          const paymentElement = this.stripeCardElements.create('payment')
          paymentElement.mount('#payment-element-stripe')
          setTimeout(() => (this.stripeElemLoaded = true), 2500)
        }, 500)
      })
    },
    async addCard() {
      const { error } = await this.stripe.confirmSetup({
        elements: this.stripeCardElements,
        confirmParams: {
          return_url: window.location.href,
        },
      })

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to customer (for example, payment
        // details incomplete)
        this.addCardError = error.message
      } else {
        // Customer will be redirected to `return_url`. For some payment
        // methods like iDEAL, customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    },
    makeDefaultCard(pm) {
      if (this.makingDefault) return
      this.makingDefault = true
      if (pm.startsWith('card_')) {
        this.$axios
          .$post('digital-assets/subscription/make-default-card', {
            default_source: pm,
          })
          .then(() => {
            this.$toast.global.success('Default card updated succesfully.')
            this.subscription.default_source = pm
            this.$refs.cardsModalClose.click()
            this.$axios.$post('digital-assets/subscription/activity-log', {
              key: 'make-as-default',
            })
            location.reload(true)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.makingDefault = false
          })
      } else {
        axios
          .post('/stripe/mark-default-payment-method', {
            default_source: pm,
            custId: this.subscription.stripe_customer_id,
            subId: this.subscription.stripe_subscription_id,
          })
          .then(() => {
            this.$toast.global.success('Default source updated succesfully.')
            this.subscription.default_source = pm
            this.$refs.cardsModalClose.click()
            this.$axios.$post('digital-assets/subscription/activity-log', {
              key: 'make-as-default',
            })
            location.reload(true)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.makingDefault = false
          })
      }
    },
    removeCard(card) {
      let promise
      if (card.id.startsWith('card_')) {
        promise = this.$axios.$post('digital-assets/subscription/delete-card', {
          card_id: card.id,
        })
      } else {
        promise = axios.post('/stripe/detach-payment', { id: card.id })
      }
      promise
        .then(() => {
          this.subscription.payment = this.subscription.payment.filter(
            (e) => e.id !== card.id
          )
          this.$toast.global.success('Payment method removed succesfully.')
          this.$refs.cardsModalClose.click()
          this.$axios.$post('digital-assets/subscription/activity-log', {
            key: 'remove-payment-method',
          })
          location.reload(true)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    downloadInvoice() {
      this.$axios.$post('digital-assets/subscription/activity-log', {
        key: 'download-invoice',
      })
    },
  },
}
</script>

<style scoped>
.spinnerWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 250px;
  height: 250px;
}
.spinner {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.36);
  border-left-color: transparent;
  border-right-color: transparent;
  animation: spin 1s linear infinite both;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

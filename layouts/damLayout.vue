<template>
  <div class="main" @click="closeMoreOptions">
    <div class="body-overlay"></div>

    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <template
      v-if="
        ((trialEndingSoon || trialExpired) && !paymentMethodAttached) ||
        userAlreadyCancelledTrial
      "
    >
      <div class="main-right">
        <img
          :src="require('~/assets/img/blurred-images/dam-blurred.png')"
          alt=""
        />
      </div>
    </template>
    <template v-else>
      <!-- right part  -->
      <div
        class="main-right"
        :style="backdropVisible ? 'filter:blur(3px)' : ''"
        @dragenter="onDragEvent"
        @dragstart="onDragEvent"
        @dragend="
          () => {
            if (!backdropVisible) isDropping = false
          }
        "
        @dragleave="
          () => {
            if (!backdropVisible) isDropping = false
          }
        "
      >
        <!-- Top Header -->
        <DamHeader v-if="$auth.loggedIn" />
        <!-- Main content -->
        <nuxt />
      </div>
      <upload-backdrop v-if="backdropVisible" :is-dropping.sync="isDropping" />

      <DownloadingIndicator v-if="$auth.loggedIn" />
      <NewFolderDialog
        v-if="$auth.loggedIn"
        ref="newFolderDialog"
        v-model="createFolder"
      />
      <NewCollectionDialog
        v-if="$auth.loggedIn"
        ref="newCollectionDialog"
        v-model="createCollection"
      />
      <upload-dialog />
      <v-tour
        v-if="$auth.loggedIn && showWalkThrough"
        name="myTour"
        :steps="tourSteps"
        :options="tourOptions"
        class="custom"
        :callbacks="tourCallbacks"
      ></v-tour>
    </template>

    <!-- trial ending soon modal -->
    <div
      v-if="!userAlreadyCancelledTrial && trialEndingSoon && !trialExpired"
      class="modal fade show"
      :style="
        !userAlreadyCancelledTrial && trialEndingSoon && !trialExpired
          ? 'display:block'
          : 'display:none'
      "
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Your Trial Ending Soon</h5>
            <button
              ref="cancelBtn"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="
                () => {
                  trialEndingSoon = false
                }
              "
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
            <div class="box bg-gray-light p-4 mb2 text-center">
              <p>
                Your free trial with <strong>Lariat DAM</strong> will be ending
                on
                <strong>{{
                  $moment(subscription.trial_end_date).format('DD MMM YYYY')
                }}</strong
                >. Please add payment method to your account so that you can
                enjoy using Lariat DAM without any interruption.
              </p>
              <div
                class="mt-4 d-flex align-items-center justify-content-center"
              >
                <a
                  v-if="!showAddCard"
                  href="javascript:void(0);"
                  class="btn"
                  :disabled="showAddCard"
                  :class="{ disabled: showAddCard }"
                  data-toggle="modal"
                  data-target="#paymentMethod"
                  @click="addCardDialog()"
                >
                  Add Payment Method</a
                >
              </div>
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
            </div>
            <div class="text-center">
              <p>
                If you didn't get a chance to fully try out the
                <strong>Lariat DAM</strong> and need a little more time to
                evaluate, kindly contact us at
                <a href="mailto:support@marketinghub.com" class="btn-link"
                  >support@marketinghub.com</a
                >
              </p>
              <div
                class="mt-4 d-flex align-items-center justify-content-center"
              >
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="
                    () => {
                      trialEndingSoon = false
                    }
                  "
                  >Close</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- trial expired modal -->
    <div
      v-if="
        !userAlreadyCancelledTrial && trialExpired && !paymentMethodAttached
      "
      class="modal fade show trial-modal"
      :style="
        !userAlreadyCancelledTrial && trialExpired
          ? 'display:block'
          : 'display:none'
      "
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Your Trial Has Expired</h5>
          </div>
          <div class="modal-body">
            <div class="box bg-gray-light p4 mb2 text-center">
              <p>
                Thank you for trying <strong>Lariat DAM</strong>. Your trial
                period has ended now.
              </p>
              <p>
                If you are still interested and want to continue to access,
                please add your preferred payment method.
              </p>
              <div
                class="mt-4 d-flex align-items-center justify-content-center"
              >
                <a
                  href="javascript:void(0);"
                  class="btn"
                  data-toggle="modal"
                  data-target="#paymentMethod"
                  :disabled="showAddCard"
                  :class="{ disabled: !!showAddCard }"
                  @click="addCardDialog()"
                >
                  Add Payment Method</a
                >
                <span class="ml1 mr1">OR</span>
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray"
                  data-toggle="modal"
                  @click.stop="$auth.logout()"
                >
                  Logout</a
                >
              </div>
              <form id="payment-form" class="mt-4" @submit.prevent="addCard()">
                <template v-if="showAddCard">
                  <div id="payment-element">
                    <div v-show="stripeElemLoaded" id="payment-element-stripe">
                      <!-- Elements will create form elements here -->
                    </div>
                    <div v-show="!stripeElemLoaded" class="spinnerWrapper">
                      <div class="spinner"></div>
                    </div>
                  </div>
                  <br />
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
                ></div>
              </form>
            </div>
            <div class="text-center">
              <p>
                If you didn't get any chance to fully try out
                <strong>Lariat DAM</strong> and need a little more time to
                evaluate, kindly contact us at
                <a href="mailto:support@marketinghub.com" class="btn-link"
                  >support@marketinghub.com</a
                >
              </p>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <hr />
              </div>
            </div>
            <div
              class="d-flex align-items-center"
              :class="{
                'justify-content-between': workspaces.length > 1,
                'justify-content-center': workspaces.length === 1,
              }"
            >
              <span class="text-gray">
                No Thanks!
                <a
                  href="javascript:void(0)"
                  class="btn-link"
                  data-toggle="modal"
                  data-target="#deleteTrialModal"
                  >Delete all my trial data</a
                >&nbsp;and no longer want to use this.
              </span>
              <div
                v-if="workspaces.length > 1"
                class="ml-2 dropdown more-options"
              >
                <a
                  href="javascript:void(0);"
                  data-toggle="dropdown"
                  class="btn btn-gray"
                >
                  Switch Workspace
                </a>
                <ul class="dropdown-menu">
                  <li
                    v-for="wp in workspaces.filter(
                      (e) => e.id !== $route.params.workspace_id
                    )"
                    :key="wp.id"
                    @click="onSwitchWorkspace(wp)"
                  >
                    <a class="dropdown-item"> {{ wp.name }} </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- delete trial acc. modal -->
    <div id="deleteTrialModal" class="modal fade show" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cancel Trial and Deactivate Account</h5>
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
              your trial account.
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
                  Cancelling your trial period will lead to deactivation of your
                  current workspace account and you won't be able to access it
                  again in future. Also your stored data will be removed from
                  the server and it is irreversible.
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer p0">
            <!-- <div class="form-group mb0"> -->
            <!-- <div class="d-flex justify-content-center"> -->
            <a
              href="javascript:void(0);"
              class="btn btn-danger btn-big btn-block m0"
              :disabled="!allowedToCancel"
              :style="allowedToCancel ? '' : 'opacity:0.4;cursor:not-allowed'"
              @click="cancelTrial()"
            >
              <SpinLoading v-show="cancelingTrial" />
              {{ cancelingTrial ? 'Please wait...' : 'Deactivate Account' }}</a
            >
            <!-- </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- user already cancelled trial -->
    <div
      v-if="userAlreadyCancelledTrial"
      class="modal fade show trial-modal"
      :style="userAlreadyCancelledTrial ? 'display:block' : 'display:none'"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Activate your account</h5>
          </div>
          <div class="modal-body">
            <div class="box bg-gray-light p-4 mb2 text-center">
              <p>
                Thank you for trying <strong>Lariat DAM</strong>.<template
                  v-if="isTrialAccount"
                >
                  Your trial period has ended now.</template
                >
              </p>
              <p>
                If you are still interested and want to continue to access,
                please subscribe by adding a payment method.
              </p>
              <br />
              <p>
                You will be charged against your subscribed plan -
                <strong
                  >{{ subscription.plan_name.toUpperCase() }}/{{
                    subscription.billing_cycle
                  }}</strong
                >
                for amount ${{ Number(subscription.price).toFixed(2) }}
              </p>
              <div
                class="mt-4 d-flex align-items-center justify-content-center"
              >
                <a
                  href="javascript:void(0);"
                  class="btn"
                  data-toggle="modal"
                  data-target="#paymentMethod"
                  :disabled="!!showAddCard"
                  :class="{ disabled: !!showAddCard }"
                  @click="addCardDialog()"
                >
                  Add Payment Method</a
                >
              </div>
              <form id="payment-form" @submit.prevent="addCard()">
                <template v-if="showAddCard">
                  <div v-show="stripeElemLoaded" class="row">
                    <div class="col-md-8 offset-md-2">
                      <hr />
                    </div>
                  </div>
                  <div id="payment-element">
                    <div v-show="stripeElemLoaded" id="payment-element-stripe">
                      <!-- Elements will create form elements here -->
                    </div>
                    <div v-show="!stripeElemLoaded" class="spinnerWrapper">
                      <div class="spinner"></div>
                    </div>
                  </div>
                  <div v-if="stripeElemLoaded" class="mt-4">
                    <button
                      id="submit"
                      class="btn"
                      :disabled="!stripeElemLoaded"
                      :class="{ disabled: !stripeElemLoaded }"
                    >
                      Submit
                    </button>
                    <a
                      href="javascript:void(0);"
                      class="btn btn-gray"
                      :disabled="!stripeElemLoaded"
                      :class="{ disabled: !stripeElemLoaded }"
                      @click="showAddCard = false"
                      >Cancel</a
                    >
                  </div>
                </template>
                <div
                  id="error-message"
                  class="text-red"
                  v-html="addCardError"
                ></div>
              </form>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <a
                href="javascript:void(0);"
                class="text-dark btn-link"
                data-toggle="modal"
                @click.stop="$auth.logout()"
              >
                Logout</a
              >
              <div
                v-if="workspaces.length > 1"
                class="d-flex align-items-center"
              >
                <span class="ml-3 mr-3">OR</span>
                <div class="dropdown more-options">
                  <a
                    href="javascript:void(0);"
                    data-toggle="dropdown"
                    class="btn btn-gray"
                  >
                    Switch Workspace
                  </a>
                  <ul class="dropdown-menu">
                    <li
                      v-for="wp in workspaces.filter(
                        (e) => e.id !== $route.params.workspace_id
                      )"
                      :key="wp.id"
                      @click="onSwitchWorkspace(wp)"
                    >
                      <a class="dropdown-item"> {{ wp.name }} </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import LeftMenu from '~/components/theme/global/LeftMenu'
import DamHeader from '~/components/theme/global/DamHeader'
import DownloadingIndicator from '~/components/dam/DownloadingIndicator'
import NewFolderDialog from '~/components/dam/Dialogs/NewFolderDialog'
import NewCollectionDialog from '~/components/dam/Dialogs/NewCollectionDialog'
import UploadBackdrop from '~/pages/_workspace_id/dam/miniUploadBackdrop'
import UploadDialog from '~/pages/_workspace_id/dam/miniUploadDialog'
export default {
  components: {
    LeftMenu,
    DamHeader,
    DownloadingIndicator,
    NewFolderDialog,
    NewCollectionDialog,
    UploadBackdrop,
    UploadDialog,
  },
  middleware: ['authCheck', 'check-if-suspended'],
  data() {
    return {
      isDropping: false,
      tourOptions: {
        highlight: true,
        labels: {
          buttonSkip: 'Skip',
          buttonPrevious: 'Previous',
          buttonNext: 'Next',
          buttonStop: 'Got it!',
        },
      },
      tourSteps: [
        {
          target: '#header-profile-btn',
          content: `<div class='v-step--inner'>
                      <div class='v-step--header'>MANAGE PROFILE</div>
                      <div class='v-step--body'>You can manage your organization profile & user profile from here.</div>
                    </div>`,
          params: {
            enableScrolling: false,
          },
        },
        {
          target: '#dam-front-end-btn',
          content: `<div class='v-step--inner'>
                      <div class='v-step--header'>REVIEW DEALER PORTAL Discover</div>
                      <div class='v-step--body'>Clicking on '<span class="text-white text-bold">Dam Front-end</span>' button will take you to the Dealer Portal where you can review your asset & folder hierarchy that your Dealers will see.</div>
                    </div>`,
          params: {
            enableScrolling: false,
          },
        },
        {
          target: '#header-upload-btn',
          content: `<div class='v-step--inner'>
                      <div class='v-step--header'>UPLOAD ASSET OR CREATE FOLDER</div>
                      <div class='v-step--body'>You can upload your assets or create new folders by clicking on the '<span class="text-white text-bold">+</span>' button.</div>
                    </div>`,
          params: {
            enableScrolling: false,
          },
        },
        {
          target: '#asset-overview',
          content: `<div class='v-step--inner'>
                      <div class='v-step--header'>ASSET CATEGORY VIEW</div>
                      <div class='v-step--body'>Asset category shows you how many assets you have in each category so that you can manage them easily.</div>
                    </div>`,
          params: {
            placement: 'left',
            enableScrolling: false,
          },
        },
        {
          target: '#dam-left-menu',
          content: `<div class='v-step--inner'>
                      <div class='v-step--header'>Explore More</div>
                      <div class='v-step--body'>Expanding this menu will show you more options to explore <span class="text-white text-bold">DAM</span>. If you have any query in your account kindly contact <a href='mailto:support@marketinghub.com' target='_blank' class='text-white font-bold'>support@marketinghub.com</a></div>
                    </div>`,
          params: {
            placement: 'left',
            enableScrolling: false,
          },
        },
      ],
      tourCallbacks: {
        onSkip: () => this.endTour(),
        onFinish: () => this.endTour(),
      },
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
      canceling: false,
      trialExpired: false,
      trialEndingSoon: false,
      trialDaysRemaining: 100,
      userAlreadyCancelledTrial: false,
      showAddCard: false,
      stripeElemLoaded: false,
      addCardError: '',
      stripeCustomerId: null,
      stripe: null,
      subscription: {},
      isTrialAccount: false,
      cancelingTrial: false,
    }
  },
  computed: {
    workspaces() {
      return this.$auth.user.accessibleWorkspaces || []
    },
    paymentMethodAttached() {
      return this.subscription?.payment?.length > 0
    },
    allowedToCancel() {
      if (!this.cancelReason?.id) return false
      return this.cancelComment?.length && this.cancelAcknowledged
    },
    showWalkThrough() {
      return this.$store.state.dam?.damInstance?.show_dashboard_walkThrough
    },
    backdropVisible() {
      return (
        this.isDropping &&
        ['workspace_id-dam', 'workspace_id-dam'].includes(
          this.$route.name
        ) &&
        !['archive'].includes((this.$route.hash || '#').substring(1)) &&
        !this.storageFull
      )
    },
    createFolder: {
      set(createFolder) {
        if (createFolder)
          this.$router
            .replace({
              query: { ...this.$route.query, createFolder: true },
              hash: this.$route.hash,
            })
            .catch(() => {})
        else {
          const query = { ...this.$route.query }
          delete query.createFolder
          this.$router
            .replace({
              params: this.$route.params,
              query,
              hash: this.$route.hash,
            })
            .catch(() => {})
        }
      },
      get() {
        return this.$route.query.createFolder?.toString() === 'true'
      },
    },
    createCollection: {
      set(createCollection) {
        if (createCollection)
          this.$router
            .replace({
              query: { ...this.$route.query, createCollection: true },
              hash: this.$route.hash,
            })
            .catch(() => {})
        else {
          const query = { ...this.$route.query }
          delete query.createCollection
          this.$router
            .replace({ query, hash: this.$route.hash })
            .catch(() => {})
        }
      },
      get() {
        return this.$route.query.createCollection?.toString() === 'true'
      },
    },
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
  },
  watch: {
    createFolder(createFolder) {
      if (createFolder) this.$refs.newFolderDialog.show()
      else this.$refs.newFolderDialog.hide()
    },
    createCollection(createCollection) {
      if (createCollection) this.$refs.newCollectionDialog.show()
      else this.$refs.newCollectionDialog.hide()
    },
    '$route.name': {
      handler(n) {
        this.isDropping = false
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    await this.getStripeCustomer()
    await this.loadStripeClient()
    await this.checkPaymentIntent()
    if (this.userAlreadyCancelledTrial) return this.fallbackRoute(true)
    if (this.isTrialAccount) {
      if (this.trialExpired) return this.fallbackRoute(true)
      else if (this.trialEndingSoon) return this.fallbackRoute()
    }
    this.closeTourIfNeeded()
    this.preventDrag()
    if (this.createFolder) this.$refs.newFolderDialog.show()
    else if (this.createCollection) this.$refs.newCollectionDialog.show()
    else this.$refs.newFolderDialog?.hide()

    this.getFolders()
    if (this.$route.name !== 'workspace_id-dam') return
    this.$nextTick(() => {
      setTimeout(() => {
        this.showWalkThrough &&
          this.$tours &&
          this.$tours.myTour &&
          this.$tours.myTour.start()
        this.closeTourIfNeeded()
      }, 1000)
    })
  },
  updated() {
    this.preventDrag()
  },
  methods: {
    getPaymentMethods() {
      this.subscription.payment = []
      return axios(
        '/stripe/list-payment-methods?custId=' +
          this.subscription.stripe_customer_id
      )
        .then((r) => {
          this.subscription.payment.push(...r.data)
        })
        .catch(() => {})
    },
    fallbackRoute() {
      // if (this.$route.name !== 'workspace_id-dam') {
      //   this.$router.replace({
      //     name: 'workspace_id-dam',
      //     params: { ...this.$route.params },
      //     query: {},
      //   })
      // }
    },
    checkPaymentIntent() {
      return new Promise((resolve) => {
        const searchParams = new URLSearchParams(window.location.search)
        const intent = searchParams.get('setup_intent')
        const clientSecret = searchParams.get('setup_intent_client_secret')
        if (!(clientSecret && intent && this.stripe)) {
          const query = { ...this.$route.query }
          delete query.clientSecret
          delete query.intent
          if (JSON.stringify(query) !== JSON.stringify(this.$route.query)) {
            this.$router.replace({
              name: this.$route.name,
              params: this.$route.params,
              hash: this.$route.hash,
            })
          }
          return resolve()
        }
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
                this.$axios
                  .$post('digital-assets/subscription/activity-log', {
                    key: 'add-new-method',
                  })
                  .catch((_) => {})
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
          .catch((e) => {})
          .finally(() => {
            this.$router.replace({
              name: this.$route.name,
              params: this.$route.params,
            })
            resolve()
          })
      })
    },
    getStripeCustomer() {
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(async (r) => {
          this.subscription = r.data
          this.stripeCustomerId = r.data.stripe_customer_id
          await this.getPaymentMethods()
          this.isTrialAccount = !!r.data.is_trial_account
          this.trialExpired = !!(
            this.isTrialAccount && r.data.trial_expire === 'true'
          )
          const endDate = this.$moment(r.data.trial_end_date)
          this.trialDaysRemaining = endDate.diff(Date.now(), 'days')
          this.trialEndingSoon = !!(
            this.isTrialAccount &&
            this.trialDaysRemaining >= 0 &&
            this.trialDaysRemaining < 3 &&
            !this.trialExpired
          )
          this.userAlreadyCancelledTrial =
            this.subscription.is_suspended ||
            !!(
              this.isTrialAccount &&
              this.trialExpired &&
              r.data.cancel_comment &&
              r.data.cancel_reason &&
              !this.subscription.payment?.length
            )
        })
    },
    async loadStripeClient() {
      this.stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    },
    async addCardDialog() {
      if (this.showAddCard) return
      // https://stripe.com/docs/payments/save-and-reuse?platform=web
      // https://github.com/stripe-samples/saving-card-without-payment
      const { data } = await axios.post('/stripe/init-setup-intent', {
        customer: this.stripeCustomerId,
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
    onSwitchWorkspace(wp) {
      if (this.switchingWP) return
      this.switchingWP = true
      this.$axios
        .$post('/user/update-profile', {
          default_department: wp.department_id,
          default_workspace: wp.workspace_unique_id,
          email: this.$auth.user.email,
          name: this.$auth.user.email,
          phone: this.$auth.user.phone,
          timezone: this.$auth.user.timezone,
          title: null,
          user_id: this.$auth.user.id,
        })
        .then(() => {
          this.$toast.global.success(
            'Workspace has been changed successfully. Please login for the change to take effect.'
          )
          setTimeout(() => {
            if (this.$_auth().id !== wp.id) {
              this.$setCurrentWorkspace(wp.id)
              this.$store.dispatch('dam/setBranding', {
                workspace_id: wp.id,
                isSetFavicon: true,
              })
            }
            this.$auth.fetchUser()
            this.$auth.logout()
            window.location.reload()
          }, 3000)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    cancelTrial() {
      if (this.cancelingTrial) return
      this.cancelingTrial = true
      this.$axios
        .$post('digital-assets/subscription/delete-all-data', {
          cancel_reason: this.cancelReason.text,
          cancel_comment: this.cancelComment,
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.cancelingTrial = false
          this.$auth.logout()
        })
    },
    closeTourIfNeeded() {
      if (this.$route.name !== 'workspace_id-dam') {
        this.$tours && this.$tours.myTour && this.$tours.myTour.stop()
        this.$nextTick(() => {
          document.body.classList.remove('v-tour--active')
        })
      }
    },
    endTour() {
      this.$axios
        .$post('digital-assets/subscription/update-walkthrough', {
          dashboard_walkThrough: false,
        })
        .catch(console.error)
        .finally(() => {
          this.$store.dispatch('dam/getInstances', this.$getWorkspaceId())
        })
    },
    onDragEvent(e) {
      if (!(e instanceof DragEvent)) {
        this.isDropping = false
        return
      }
      if (!e.dataTransfer?.types?.includes('Files')) {
        e.dataTransfer.clearData()
        this.isDropping = false
        return
      }
      this.isDropping = true
    },
    preventDrag() {
      const els = [
        ...document.querySelectorAll('img'),
        ...document.querySelectorAll('svg'),
        ...document.querySelectorAll('a'),
      ]
      els.forEach((e) => e.setAttribute('draggable', false))
    },
    getFolders() {
      this.$store.dispatch('dam/getFolders')
    },
    closeMoreOptions() {
      this.$bus.$emit('closeDropDown')
    },
  },
}
</script>
<style>
.v-tour.custom > .v-step {
  background: #445ea7 !important;
}
.v-tour.custom .v-step--inner {
  text-align: left !important;
}
.v-tour.custom .v-step--header {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  margin-bottom: 4px;
  text-transform: uppercase;
}
.v-tour.custom .v-step--body {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.67px;
  color: rgba(255, 255, 255, 0.775);
}
.v-tour.custom .text-white {
  color: white !important;
}
.v-tour.custom .text-bold {
  font-weight: bold !important;
}
</style>
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

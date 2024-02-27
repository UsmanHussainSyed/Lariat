<template>
  <div
    class="modal fade plan-change-modal"
    aria-modal="true"
    role="dialog"
    :class="{ show: !!modalOpen }"
    :style="modalOpen ? 'display:block' : 'display:none'"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Plan</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="hide()"
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
        <div class="modal-body change-plan">
          <!-- custom plans -->
          <template
            v-if="
              ((subscription || {}).subscription || {}).type === 'custom' ||
              ((subscription || {}).subscription || {}).group_name ===
                'enterprise'
            "
          >
            <div>
              You are already registered with the <b>Enterprise</b> plan,
              allowing you to access all features of the DAM.
            </div>
            <br />
            <div class="d-flex align-items-center justify-content-between">
              <a
                href="https://www.marketinghub.com/pricing/"
                target="_blank"
                class="btn-link"
                >Compare all plans</a
              >
            </div>
            <p class="mt1 mb0">
              Looking for something else? Please contact
              <a href="mailto:sales@marketinghub.com" class="btn-link"
                >sales@marketinghub.com</a
              >
              to customise your plan as per your needs.
            </p>
            <div
              class="d-flex align-items-center justify-content-center m-auto mt2"
            >
              <a
                href="javascript:void(0);"
                class="btn btn-gray btn-big pl3 pr3"
                data-dismiss="modal"
                @click="hide()"
                >Cancel</a
              >
            </div>
          </template>
          <!--  Step 1  -->
          <template v-else-if="step === 1">
            <div class="d-flex align-items-center justify-content-between">
              <div
                v-if="subscription.billing_cycle === 'monthly'"
                class="pricingSwitch d-flex align-items-center"
              >
                <span>Monthly</span>
                <label class="label-switch no-text">
                  <input type="checkbox" class="switch" v-model="isYearly" />
                  <span class="lable"></span>
                </label>
                <span>Yearly</span>
              </div>
              <a
                href="https://www.marketinghub.com/pricing/"
                target="_blank"
                class="btn-link"
                >Compare all plans</a
              >
            </div>
            <div class="account-billing-setting">
              <div class="monthlyPricing" v-if="!isYearly">
                <div
                  v-tooltip="
                    !downgradingAllowed(litePlanData.monthly) &&
                    currentPlan !== 'lite-monthly'
                      ? 'Cannot downgrade to this plan as your current users or admins or used storage is way more than allowed'
                      : ''
                  "
                  class="box mt1"
                  :class="{
                    active: currentPlan === 'lite-monthly',
                    selected: selectedPlan === 'lite-monthly',
                  }"
                  :style="
                    !downgradingAllowed(litePlanData.monthly) &&
                    currentPlan !== 'lite-monthly'
                      ? 'opacity:0.4;cursor:not-allowed'
                      : ''
                  "
                  @click.stop="
                    !downgradingAllowed(litePlanData.monthly)
                      ? ''
                      : onPlanSelect('lite', 'monthly')
                  "
                >
                  <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex align-items-center">
                      <span class="plan-status lite">Lite</span>
                      <h4 class="mb0 ml-2">Plan</h4>
                    </div>
                    <h2>
                      <span>$</span
                      >{{ Number(litePlanData.monthly.price).toFixed(2)
                      }}<sup>/month</sup>
                    </h2>
                  </div>
                  <div class="d-flex align-items-end justify-content-between">
                    <div>
                      <div class="plan-detail">
                        <label>Storage</label>
                        <p>
                          {{
                            humanGB(
                              (
                                (litePlanData.monthly.features || {}).storage ||
                                {}
                              ).default_value
                            )
                          }}
                        </p>
                      </div>
                      <div class="plan-detail">
                        <label>Users</label>
                        <p>
                          {{
                            ((litePlanData.monthly.features || {}).users || {})
                              .admin | capitalize
                          }}
                          {{
                            pluralize(
                              'Admin',
                              (
                                (litePlanData.monthly.features || {}).users ||
                                {}
                              ).admin,
                              'unlimited'
                            )
                          }}
                          /
                          {{
                            ((litePlanData.monthly.features || {}).users || {})
                              .users | capitalize
                          }}
                          {{
                            pluralize(
                              'User',
                              (
                                (litePlanData.monthly.features || {}).users ||
                                {}
                              ).users,
                              'unlimited'
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="currentPlan === 'lite-monthly'"
                      class="d-flex align-items-center justify-content-end"
                    >
                      <span class="plan-status alert-success">Active</span>
                    </div>
                  </div>
                </div>
                <div
                  class="box mt1"
                  :class="{
                    active: currentPlan === 'pro-monthly',
                    selected: selectedPlan === 'pro-monthly',
                  }"
                  @click.stop="onPlanSelect('pro', 'monthly')"
                >
                  <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex align-items-center">
                      <span class="plan-status pro">Pro</span>
                      <h4 class="mb0 ml-2">Plan</h4>
                    </div>
                    <h2>
                      <span>$</span
                      >{{ Number(proPlanData.monthly.price).toFixed(2)
                      }}<sup>/month</sup>
                    </h2>
                  </div>
                  <div class="d-flex align-items-end justify-content-between">
                    <div>
                      <div class="plan-detail">
                        <label>Storage</label>
                        <p>
                          {{
                            humanGB(
                              (
                                (proPlanData.monthly.features || {}).storage ||
                                {}
                              ).default_value
                            )
                          }}
                        </p>
                      </div>
                      <div class="plan-detail">
                        <label>Users</label>
                        <p>
                          {{
                            ((proPlanData.monthly.features || {}).users || {})
                              .admin | capitalize
                          }}
                          {{
                            pluralize(
                              'Admin',
                              ((proPlanData.monthly.features || {}).users || {})
                                .admin,
                              'unlimited'
                            )
                          }}
                          /
                          {{
                            ((proPlanData.monthly.features || {}).users || {})
                              .users | capitalize
                          }}
                          {{
                            pluralize(
                              'User',
                              ((proPlanData.monthly.features || {}).users || {})
                                .users,
                              'unlimited'
                            )
                          }}
                        </p>
                      </div>
                      <div class="plan-detail">
                        <label>Integration</label>
                        <p>
                          {{
                            planIntegrationsText([
                              (
                                (proPlanData.monthly.features || {})
                                  .google_drive_integration || {}
                              ).enable
                                ? 'Google Drive'
                                : '',
                              (
                                (proPlanData.monthly.features || {})
                                  .dropbox_integration || {}
                              ).enable
                                ? 'Dropbox'
                                : '',
                              (
                                (proPlanData.monthly.features || {})
                                  .box_integration || {}
                              ).enable
                                ? 'Box'
                                : '',
                            ])
                          }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="currentPlan === 'pro-monthly'"
                      class="d-flex align-items-center justify-content-end"
                    >
                      <span class="plan-status alert-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="yearlyPricing" v-if="isYearly">
                <div
                  v-tooltip="
                    !downgradingAllowed(litePlanData.yearly) &&
                    currentPlan !== 'lite-yearly'
                      ? 'Cannot downgrade to this plan as your current users or admins or used storage is way more than allowed'
                      : ''
                  "
                  class="box mt1"
                  :class="{
                    active: currentPlan === 'lite-yearly',
                    selected: selectedPlan === 'lite-yearly',
                  }"
                  :style="
                    !downgradingAllowed(litePlanData.yearly) &&
                    currentPlan !== 'lite-yearly'
                      ? 'opacity:0.4;cursor:not-allowed'
                      : ''
                  "
                  @click.stop="
                    !downgradingAllowed(litePlanData.yearly)
                      ? null
                      : onPlanSelect('lite', 'yearly')
                  "
                >
                  <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex align-items-center">
                      <span class="plan-status lite">Lite</span>
                      <h4 class="mb0 ml-2">Plan</h4>
                    </div>
                    <h2>
                      <span>$</span
                      >{{ Number(litePlanData.yearly.price).toFixed(2)
                      }}<sup>/year</sup>
                    </h2>
                  </div>
                  <div class="d-flex align-items-end justify-content-between">
                    <div>
                      <div class="plan-detail">
                        <label>Storage</label>
                        <p>
                          {{
                            humanGB(
                              (
                                (litePlanData.yearly.features || {}).storage ||
                                {}
                              ).default_value
                            )
                          }}
                        </p>
                      </div>
                      <div class="plan-detail">
                        <label>Users</label>
                        <p>
                          {{
                            ((litePlanData.yearly.features || {}).users || {})
                              .admin | capitalize
                          }}
                          {{
                            pluralize(
                              'Admin',
                              ((litePlanData.yearly.features || {}).users || {})
                                .admin,
                              'unlimited'
                            )
                          }}
                          /
                          {{
                            ((litePlanData.yearly.features || {}).users || {})
                              .users | capitalize
                          }}
                          {{
                            pluralize(
                              'User',
                              ((litePlanData.yearly.features || {}).users || {})
                                .users,
                              'unlimited'
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="currentPlan === 'lite-yearly'"
                      class="d-flex align-items-center justify-content-end"
                    >
                      <span class="plan-status alert-success">Active</span>
                    </div>
                  </div>
                </div>
                <div
                  class="box mt1"
                  :class="{
                    active: currentPlan === 'pro-yearly',
                    selected: selectedPlan === 'pro-yearly',
                  }"
                  @click.stop="onPlanSelect('pro', 'yearly')"
                >
                  <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex align-items-center">
                      <span class="plan-status pro">Pro</span>
                      <h4 class="mb0 ml-2">Plan</h4>
                    </div>
                    <h2>
                      <span>$</span
                      >{{ Number(proPlanData.yearly.price).toFixed(2)
                      }}<sup>/year</sup>
                    </h2>
                  </div>
                  <div class="d-flex align-items-end justify-content-between">
                    <div>
                      <div class="plan-detail">
                        <label>Storage</label>
                        <p v-if="proPlanData.yearly.features">
                          {{
                            humanGB(
                              (
                                (proPlanData.yearly.features || {}).storage ||
                                {}
                              ).default_value
                            )
                          }}
                        </p>
                      </div>
                      <div class="plan-detail">
                        <label>Users</label>
                        <p>
                          {{
                            ((proPlanData.yearly.features || {}).users || {})
                              .admin | capitalize
                          }}
                          {{
                            pluralize(
                              'Admin',
                              ((proPlanData.yearly.features || {}).users || {})
                                .admin,
                              'unlimited'
                            )
                          }}
                          /
                          {{
                            ((proPlanData.yearly.features || {}).users || {})
                              .users | capitalize
                          }}
                          {{
                            pluralize(
                              'User',
                              ((proPlanData.yearly.features || {}).users || {})
                                .users,
                              'unlimited'
                            )
                          }}
                        </p>
                      </div>
                      <div class="plan-detail">
                        <label>Integration</label>
                        <p>
                          {{
                            planIntegrationsText([
                              (
                                (proPlanData.yearly.features || {})
                                  .google_drive_integration || {}
                              ).enable
                                ? 'Google Drive'
                                : '',
                              (
                                (proPlanData.yearly.features || {})
                                  .dropbox_integration || {}
                              ).enable
                                ? 'Dropbox'
                                : '',
                              (
                                (proPlanData.yearly.features || {})
                                  .box_integration || {}
                              ).enable
                                ? 'Box'
                                : '',
                            ])
                          }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="currentPlan === 'pro-yearly'"
                      class="d-flex align-items-center justify-content-end"
                    >
                      <span class="plan-status alert-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="mt1 mb0">
                Looking for something else? Please contact
                <a href="mailto:sales@marketinghub.com" class="btn-link"
                  >sales@marketinghub.com</a
                >
                to customise your plan as per your needs.
              </p>
              <div
                class="d-flex align-items-center justify-content-center m-auto mt2"
              >
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray btn-big pl3 pr3"
                  data-dismiss="modal"
                  @click="hide()"
                  >Cancel</a
                >
                <a
                  href="javascript:void(0);"
                  class="btn btn-big pl3 pr3"
                  :class="{ disabled: !selectedPlan.length }"
                  :disabled="!selectedPlan.length"
                  @click.stop="selectedPlan.length ? step++ : ''"
                  >Next</a
                >
              </div>
            </div>
          </template>

          <!--  Step 2  -->
          <template v-else-if="step === 2">
            <div class="row mb2">
              <div class="col-md-6">
                <h4 class="mb-1">Your Current Plan</h4>
                <div class="box bg-gray">
                  <div class="account-billing-setting p0">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <span
                          class="plan-status"
                          :class="lowerCase(subscription.plan_name)"
                          >{{ subscription.plan_name }}</span
                        >
                      </div>
                      <h2>
                        <span>$</span>{{ Number(subscription.price).toFixed(2)
                        }}<sup>/{{ subscription.billing_cycle }}</sup>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <h4 class="mb-1">New Plan</h4>
                <div class="box bg-gray">
                  <div class="account-billing-setting p0">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <span
                          class="plan-status"
                          :class="lowerCase(newPlan.name)"
                          >{{ newPlan.name }}</span
                        >
                      </div>
                      <h2>
                        <span>$</span>{{ Number(newPlan.price).toFixed(2)
                        }}<sup>/{{ newPlan.billing_cycle }}</sup>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p>
                  Your new plan
                  <strong
                    class="plan-status"
                    :class="lowerCase(newPlan.name)"
                    >{{ newPlan.name.toUpperCase() }}</strong
                  >
                  will be activated
                  <template v-if="!downgrading">
                    immediately and you will be charged for the remaining price
                    difference from your default payment method.</template
                  >
                  <template v-else
                    >automatically on
                    <strong>{{ currentPlanEndDate }}</strong> after the end of
                    current subscription period -
                    <strong
                      >{{ currentPlanStartDate }} to
                      {{ currentPlanEndDate }}</strong
                    >.
                  </template>
                </p>
                <p class="mt1 mb2">
                  <template v-if="!downgrading"
                    >You will also receive an invoice for the same.</template
                  >
                  <template v-else
                    >Next Invoice will be generated on
                    <strong>{{ currentPlanEndDate }}</strong> with
                    <strong
                      >${{ Number(newPlan.price).toFixed(2) }}</strong
                    ></template
                  >
                </p>
                <hr />
                <div
                  class="d-flex align-items-center justify-content-center m-auto mt2"
                >
                  <a
                    href="javascript:void(0);"
                    class="btn btn-gray btn-big pl3 pr3"
                    @click.stop="step--"
                    >Back</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="btn btn-big pl3 pr3"
                    :class="{ disabled: changingPlan }"
                    @click.stop="changingPlan ? '' : upgradeDowngrade()"
                    ><SpinLoading v-show="changingPlan" />&nbsp;{{
                      changingPlan ? 'Please wait ...' : 'Confirm'
                    }}</a
                  >
                </div>
              </div>
            </div>
          </template>

          <div v-else-if="step === 3" class="text-center p2">
            <h2>Thank You</h2>
            <p v-if="downgrading" class="mt1 mb0">
              Your downgrade plan process is scheduled and it will be activated
              after the end of the current plan. If you have any queries
              regarding plan or invoice, please contact at
              <a href="mailto:support@marketinghub.com" class="btn-link"
                >support@marketinghub.com</a
              >
            </p>
            <p v-else class="mt1 mb0">
              You will be receiving an email soon with the plan confirmation and
              invoice.<br />
              After that new plan will be activated. If you have any query
              regarding plan or invoice, please contact at
              <a href="mailto:support@marketinghub.com" class="btn-link"
                >support@marketinghub.com</a
              >
            </p>
            <p
              v-if="!downgrading"
              style="
                font-size: 12px;
                margin-top: 14px;
                opacity: 0.875;
                margin-bottom: 0 !important;
              "
            >
              Note: We will update this billing page in a few moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import routeParams from '~/mixins/routeParams'

export default {
  name: 'PlanChangeModal',
  filters: {
    capitalize(val) {
      if (!val || typeof val !== 'string') return val
      return val.charAt(0).toUpperCase() + val.substring(1)
    },
  },
  mixins: [routeParams],
  props: {
    subscription: { type: Object, required: true },
    stripeSubscriptionObj: { type: Object },
  },
  data() {
    return {
      isYearly: false,
      selectedPlan: '',
      step: 1,
      litePlanData: { monthly: {}, yearly: {} },
      proPlanData: { monthly: {}, yearly: {} },
      enterprisePlanData: { monthly: {}, yearly: {} },
      modalOpen: false,
      totalUsers: 0,
      totalAdmins: 0,
      changingPlan: false,
    }
  },
  computed: {
    lowerCase() {
      return (value) => {
        if (!value || !value.length) return value
        if (
          typeof value === 'string' &&
          value.toLowerCase &&
          typeof value.toLowerCase === 'function'
        )
          return value.toLowerCase()
        return value
      }
    },
    humanGB() {
      return (val) => {
        if (!val) return ''
        if (typeof val === 'string' && val.toLowerCase() === 'unlimited')
          return 'Unlimited'
        if (isNaN(Number(val))) return ''
        val = Number(val)
        if (val >= 1000) return val / 1000 + ' TB'
        return val + ' GB'
      }
    },
    pluralize() {
      return (tag, count, alwaysPluralCount) => {
        return parseInt(count) > 1 || alwaysPluralCount === count
          ? `${tag}s`
          : tag
      }
    },
    currentPlan() {
      const planName = this.subscription.plan_name
      const period = this.subscription.billing_cycle
      return planName && period
        ? [planName, period].join('-').toLowerCase()
        : ''
    },
    currentPlanObj() {
      if (!this.currentPlan) return {}
      const [plan, cycle] = this.currentPlan.split('-')
      return plan && cycle ? this[`${plan}PlanData`][cycle] : {}
    },
    newPlan() {
      if (!this.selectedPlan) return {}
      const [plan, cycle] = this.selectedPlan.split('-')
      return this[`${plan}PlanData`][cycle]
    },
    downgrading() {
      if (
        this.subscription.billing_cycle === 'yearly' &&
        this.newPlan.billing_cycle === 'monthly'
      )
        return true
      if (this.subscription.plan_name === 'Pro' && this.newPlan.name === 'Lite')
        return true
      return false
    },
    downgradingAllowed() {
      return (targetPlan) => {
        const storageConsumed =
          this.totalUsedStorage >
          parseInt((targetPlan.features || {}).total_storage)
        const userConsumed =
          this.totalUsers >
          parseInt(((targetPlan.features || {}).users || {}).users)

        const adminConsumed =
          this.totalAdmins >
          parseInt(((targetPlan.features || {}).users || {}).admin)
        return !(storageConsumed || userConsumed || adminConsumed)
      }
    },
    totalUsedStorage() {
      return this.$store.state.dam.storage.used
    },
    planIntegrationsText() {
      return (args) => {
        return args.filter((e) => e).join(', ')
      }
    },
    currentPlanEndDate() {
      if (this.stripeSubscriptionObj?.current_period_end) {
        return this.$moment(
          this.stripeSubscriptionObj?.current_period_end * 1000
        ).format('DD MMM YYYY')
      }
      const invoices = this.subscription.invoices || []
      if (!invoices.length) return '-'
      const lastInvoice = invoices[invoices.length - 1]
      return this.$moment(lastInvoice.lines.data[0].period.end * 1000).format(
        'DD MMM YYYY'
      )
    },
    currentPlanStartDate() {
      if (this.stripeSubscriptionObj?.current_period_start) {
        return this.$moment(
          this.stripeSubscriptionObj?.current_period_start * 1000
        ).format('DD MMM YYYY')
      }
      const invoices = this.subscription.invoices || []
      if (!invoices.length) return '-'
      const lastInvoice = invoices[invoices.length - 1]
      return this.$moment(lastInvoice.lines.data[0].period.start * 1000).format(
        'DD MMM YYYY'
      )
    },
  },
  watch: {
    '$store.state.dam.damInstance': {
      handler(n) {
        if (n && n.id) {
          this.getAllUsers()
        }
      },
      deep: true,
      immediate: true,
    },
    subscription: {
      handler(n) {
        this.isYearly = n.billing_cycle === 'yearly'
        if (
          n?.subscription?.group_name &&
          !['lite', 'pro'].includes(n?.subscription?.group_name)
        ) {
          this.$axios
            .$get(`subscription/${n.subscription.group_name}/detail`)
            .then(({ data }) => {
              this.enterprisePlanData = {
                monthly: data.find((e) => e.billing_cycle === 'monthly'),
                yearly: data.find((e) => e.billing_cycle === 'yearly'),
              }
            })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getPlans()
  },
  methods: {
    getAllUsers() {
      this.$axios
        .$get('digital-assets/instance/get-user', {
          params: {
            page: 1,
            limit: 1,
            instance_id: this.$store.state.dam.damInstance.id,
            workspace_id: this.routeWorkspaceId,
            is_active: true,
          },
        })
        .then((r) => {
          this.totalUsers = r.data.total_user_count
          this.totalAdmins = r.data.total_admin_count
        })
    },
    async upgradeDowngrade() {
      if (this.changingPlan) return
      this.changingPlan = true

      const stripeUpgrade = () => {
        return new Promise((resolve, reject) => {
          return axios
            .post('/stripe/upgrade', {
              subscriptionId: this.subscription.stripe_subscription_id,
              newPriceId: this.newPlan.stripe_reference_id,
            })
            .then(resolve)
            .catch(reject)
        })
      }
      if (!this.downgrading) {
        let stripeUpdated = true
        await stripeUpgrade().catch((e) => {
          this.$toast.global.error(this.$getErrorMEssage(e))
          stripeUpdated = false
          this.changingPlan = false
        })
        if (!stripeUpdated) return
      }
      const { data: wpData } = await this.$axios
        .$get(`/view-workspace?workspace_id=${this.routeWorkspaceId}`)
        .catch(() => {})
      this.$axios
        .$post('subscription/change-user-plan', {
          user_id: this.$auth.user.id,
          workspace_id: wpData?.workspace_unique_id || this.routeWorkspaceId,
          subscription_id: this.subscription.subscription_id,
          stripe_subscription_id: this.subscription.stripe_subscription_id,
          next_price_id: this.newPlan.stripe_reference_id,
          status: this.downgrading ? 'downgrade' : 'upgrade',
        })
        .then(() => {
          this.$emit('plan-changed', {
            newPlan: this.newPlan.name,
            downgrading: this.downgrading,
          })
          this.step++
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.changingPlan = false
        })
    },
    show() {
      this.modalOpen = true
    },
    hide() {
      this.step = 1
      this.modalOpen = false
    },
    getPlans() {
      this.$axios.$get('subscription/lite/detail').then(({ data }) => {
        this.litePlanData = {
          monthly: data.find((e) => e.billing_cycle === 'monthly'),
          yearly: data.find((e) => e.billing_cycle === 'yearly'),
        }
      })
      this.$axios.$get('subscription/pro/detail').then(({ data }) => {
        this.proPlanData = {
          monthly: data.find((e) => e.billing_cycle === 'monthly'),
          yearly: data.find((e) => e.billing_cycle === 'yearly'),
        }
      })
    },
    onPlanSelect(name, cycle) {
      const plan = [name, cycle].join('-')
      if (this.currentPlan !== plan) {
        this.selectedPlan = this.selectedPlan === plan ? '' : plan
      }
    },
  },
}
</script>

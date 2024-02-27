<template>
  <div
    class="general-settings-right h-100"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        <button v-if="0" type="button" class="close" data-dismiss="alert">
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
        </button>
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >DAM Settings</nuxt-link
          >
        </li>
        <li class="active">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-product-settings',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >Product &amp; Order Settings</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-watermark-config',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >Watermark Configuration</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="workspace-settings customscrollbar position-relative">
      <div v-if="!subscriptionFetched" class="overlay">
        <div class="loader"></div>
      </div>
      <template v-else-if="!orderManagementAllowed">
        <img
          :src="
            require('~/assets/img/blurred-images/general-product-n-order-settings.png')
          "
          style="width: 100%"
        />
        <div class="common-overaly">
          <div class="common-modal">
            <div class="common-modal-header">
              <h5>Upgrade Plan</h5>
            </div>
            <div class="common-modal-body text-center">
              <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
              
            </div>
          </div>
        </div>
      </template>
      <div v-else class="p10">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mt1 mb1">
              <h5>Manage Asset Order Notification</h5>
            </div>
            <div class="form-group w-50">
              <label class="control-label">Send New Order Notification</label>
              <Select2
                v-model="selectedUser"
                :options="notificationUsers"
                placeholder="Select user"
                @input="updateNotificationUser"
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mt1 mb1">
              <h5>SKU Management</h5>
            </div>
            <div class="form-group">
              <div class="order-setting d-flex align-items-center">
                <label class="label-switch no-text">
                  <input
                    v-model="skuManagement.is_sku_automatic"
                    type="checkbox"
                    class="switch"
                    checked=""
                    :true-value="1"
                    :false-value="0"
                  />
                  <span class="lable"></span>
                </label>
                <span class="ml-2 mr-2">Automatic System Generated SKU</span>
              </div>
            </div>
            <div
              v-if="!skuManagement.is_sku_automatic"
              :class="
                skuManagement.is_sku_automatic ? 'sku_order_management' : ''
              "
            >
              <div class="form-group required">
                <label class="control-label">Workspace Abbreviation</label>
                <input
                  v-model="skuManagement.workspace_abbreviation"
                  type="text"
                  name="abbreviation"
                  class="form-control w-50"
                />
                <div
                  v-if="$v.skuManagement.workspace_abbreviation.$error"
                  class="input-error"
                >
                  <template
                    v-if="!$v.skuManagement.workspace_abbreviation.required"
                  >
                    Workspace Abbreviation is required
                  </template>
                </div>
              </div>
              <div class="form-group">
                <div class="radio-group">
                  <label class="radio-label"
                    >Prefix
                    <input
                      v-model="skuManagement.is_prefix"
                      type="radio"
                      name="work-type1"
                      :true-value="1"
                      :false-value="0"
                      value="1"
                      @click="
                        (ev) =>
                          skuManagement.is_suffix
                            ? (skuManagement.is_suffix = 0)
                            : ''
                      "
                    />
                    <span class="radio-span"></span>
                  </label>
                  <label class="radio-label"
                    >Suffix
                    <input
                      v-model="skuManagement.is_suffix"
                      type="radio"
                      name="work-type1"
                      :true-value="1"
                      :false-value="0"
                      value="1"
                      @click="
                        (ev) =>
                          skuManagement.is_prefix
                            ? (skuManagement.is_prefix = 0)
                            : ''
                      "
                    />
                    <span class="radio-span"></span>
                  </label>
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Product Number</label>
                <input
                  v-model.number="skuManagement.product_number"
                  type="text"
                  name="product-number"
                  class="form-control w-50"
                  @keypress="isNumber($event)"
                  @paste="isNumber($event)"
                />
                <div
                  v-if="$v.skuManagement.product_number.$error"
                  class="input-error"
                >
                  <template
                    v-if="
                      !$v.skuManagement.product_number.required ||
                      !$v.skuManagement.product_number.length
                    "
                  >
                    Product Number is required (Min 6, Max 10)
                  </template>
                </div>
              </div>
              <div class="form-group">
                <label class="check-label"
                  >Is Required?
                  <input
                    v-model="skuManagement.is_required"
                    type="checkbox"
                    name="hobby"
                    checked=""
                  />
                  <span class="check-span"></span>
                </label>
              </div>
              <div class="form-group">
                <div class="d-flex align-items-center">
                  <label>Example: </label>
                  <div class="bg-gray-light p-2 ml-2">
                    <strong>{{ getAbbreviation }}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group enabled">
              <button
                :class="skuManagement.is_sku_automatic"
                class="btn"
                :disabled="!isSkuChangesFound"
                @click="saveSkuSettings"
              >
                Save
              </button>
              <button
                :disabled="!isSkuChangesFound"
                class="btn btn-gray"
                @click="reset"
              >
                Cancel
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="box bg-gray-light mt1 mb1">
              <h4>How this works?</h4>
              <ul class="bullet-point">
                <li>
                  As a default, the system will generate SKUs automatically for
                  every product. Lariat uses 4 different identifiers to generate
                  automatic and unique SKU numbers based on this naming
                  convention: [Workspace Initials] - [Workspace ID][User ID] -
                  [Asset ID] <em>For example:</em> XX-00000-0000
                </li>
                <li>
                  If you disable the automatic SKU generation option and want to
                  generate each SKU manually, then you need to provide 2
                  separate identifiers: [Workspace Abbreviation] &amp; [Product
                  Number].
                </li>
                <li>
                  <strong>Workspace Abbreviation : </strong> The system requires
                  your workspace initials which you can enter in this field.
                  Example: For “Lariat Marketing Hub” - [LMH].
                </li>
                <li>
                  <strong>Product Number : </strong> The system requires a 6 to
                  10 digit number to mark the starting point for the incremental
                  product number assignment. Each time a product is added, it
                  will generate a new number in succession based on the original
                  number you place in this field and the subsequent products
                  added to the system. <em>For example:</em> 100000, 100001....
                </li>
                <li>
                  <strong>Prefix and Suffix : </strong> These allow you to
                  toggle the position of your Workspace Abbreviation (as you
                  identified). It will either be before the Product Number or
                  after the Product Number. <em>For example:</em> Prefix -
                  [LMH-100000] or Sufix - [100000-LMH].
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <!-- order id management -->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mt1 mb1">
              <h5>Order ID Management</h5>
            </div>
            <div class="form-group">
              <div class="order-setting d-flex align-items-center">
                <label class="label-switch no-text">
                  <input
                    v-model="orderidSettings.is_order_automatic"
                    type="checkbox"
                    class="switch"
                    checked=""
                    :true-value="1"
                    :false-value="0"
                  />
                  <span class="lable"></span>
                </label>
                <span class="ml-2 mr-2"
                  >Automatic System Generated Order ID</span
                >
                <!-- <i class="fa fa-question-circle"></i> -->
              </div>
            </div>
            <div
              v-if="!orderidSettings.is_order_automatic"
              :class="
                orderidSettings.is_order_automatic ? 'sku_order_management' : ''
              "
            >
              <div class="form-group required">
                <label class="control-label">Order Number</label>
                <input
                  v-model.number="orderidSettings.order_number"
                  type="text"
                  name="order-number"
                  class="form-control w-50"
                  @keypress="isNumber($event)"
                  @paste="isNumber($event)"
                />
                <div
                  v-if="$v.orderidSettings.order_number.$error"
                  class="input-error"
                >
                  <template
                    v-if="
                      !$v.orderidSettings.order_number.required ||
                      !$v.orderidSettings.order_number.length
                    "
                  >
                    Order Number is required (Min 6, Max 10)
                  </template>
                </div>
              </div>
            </div>
            <div class="form-group">
              <button
                href="javascript:void(0);"
                class="btn"
                :disabled="!isOrderChangesFound"
                @click="saveOrderidSettings"
              >
                Save
              </button>
              <button
                :disabled="!isOrderChangesFound"
                href="javascript:void(0);"
                class="btn btn-gray"
                @click="reset"
              >
                Cancel
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="box bg-gray-light mt1 mb1">
              <h4>How this works?</h4>
              <ul class="bullet-point">
                <li>
                  As a default, the system automatically generates an Order ID
                  for every newly placed order. The system uses 2 different
                  identifiers to automatically generate the Order ID: [Workspace
                  ID] &amp; [Order number].
                </li>
                <li>
                  If you disable the “<strong
                    >Automatic System Generated Order ID</strong
                  >” option and want to set the sequential order number starting
                  point, then you need to provide a 6 to 10-digit number in the
                  “<strong>Order Number</strong>” field from where it will
                  incrementally assign a number to every new order based on the
                  starting point and the subsequent orders.
                  <em>For example:</em> 100001, 100002,...”
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  and,
  numeric,
} from 'vuelidate/lib/validators'
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    Select2,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      selectedUser: '',
      notificationUsers: [],
      skuManagement: this.getSettings(),
      orderidSettings: {
        is_order_automatic: 1,
        order_number: null,
      },
      isSkuChangesFound: false,
      isOrderChangesFound: false,
      tempOrderSettings: null,
      tempSkuManagementSettings: null,
      subscriptionData: {},
      subscriptionFetched: false,
    }
  },
  computed: {
    orderManagementAllowed() {
      return (
        !this.subscriptionFetched ||
        !!this.subscriptionData?.features?.asset_order_management?.enable
      )
    },
    getAbbreviation() {
      const prefix = this.skuManagement.is_prefix || ''
      const abbr = this.skuManagement.workspace_abbreviation || ''
      const product = this.skuManagement.product_number || ''
      if (!abbr || !product) return '-'
      return prefix
        ? [abbr, product].join('-')
        : [abbr, product].reverse().join('-')
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    workspace_id() {
      return this.$route.params.workspace_id
    },
  },
  watch: {
    skuManagement: {
      handler(v, n) {
        if (
          JSON.stringify(this.skuManagement) !==
          JSON.stringify(this.tempSkuManagementSettings)
        ) {
          this.isSkuChangesFound = true
        }
      },
      deep: true,
    },
    orderidSettings: {
      handler(v, n) {
        if (
          JSON.stringify(this.orderidSettings) !==
          JSON.stringify(this.tempOrderSettings)
        ) {
          this.isOrderChangesFound = true
        }
      },
      deep: true,
    },
  },
  async mounted() {
    this.$store.dispatch('dam/getNotifications')
    this.getNotificationUserList()
    await this.fetchSubscription()
    this.getOrderSettings()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  methods: {
    fetchSubscription() {
      this.subscriptionFetched = false
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
        .finally(() => {
          this.subscriptionFetched = true
        })
    },
    getSettings() {
      return {
        is_sku_automatic: 1,
        workspace_abbreviation: null,
        product_number: null,
        is_prefix: 1,
        is_suffix: 0,
        is_required: 0,
      }
    },
    reset() {
      this.getOrderSettings(true)
      this.$v.$reset()
    },
    isNumber(evt) {
      evt = evt || window.event
      if (evt.type === 'paste') {
        if (isNaN(evt.clipboardData.getData('text'))) {
          evt.preventDefault()
          return false
        }
        return true
      }
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode >= 48 && charCode <= 57) {
        return true
      } else {
        evt.preventDefault()
        return false
      }
    },
    async getOrderSettings(isDisabled = false) {
      if (!this.orderManagementAllowed) return
      try {
        const { data } = await this.$axios.get(
          `digital-assets/order-setting/get-details`,
          {
            params: {
              url_workspace_id: this.workspace_id || this.$getWorkspaceId(),
            },
          }
        )
        if (data.data) {
          const {
            is_sku_automatic,
            is_prefix,
            is_suffix,
            is_required,
            product_number,
            workspace_abbreviation,
            order_number,
            is_order_automatic,
          } = data.data
          this.skuManagement = {
            is_sku_automatic,
            workspace_abbreviation,
            product_number,
            is_prefix,
            is_suffix,
            is_required,
          }
          this.orderidSettings = {
            is_order_automatic,
            order_number,
          }
          this.tempSkuManagementSettings = { ...this.skuManagement }
          this.tempOrderSettings = { ...this.orderidSettings }
          if (isDisabled) {
            this.isSkuChangesFound = false
            this.isOrderChangesFound = false
          }
        }
      } catch (error) {
        console.erro(error)
      }
    },
    getNotificationUserList() {
      if (!this.orderManagementAllowed) return
      this.$axios
        .$get('digital-assets/notification/new-order-admin-list', {
          params: {
            workspace_id: this.workspace_id || this.$getWorkspaceId(),
          },
        })
        .then(({ data }) => {
          this.notificationUsers = data
          this.selectedUser = data.find((e) => e.id === e.is_active)?.id
        })
        .catch(console.error)
    },
    updateNotificationUser() {
      if (!this.orderManagementAllowed) return
      this.$axios
        .$post('digital-assets/notification/add-order-admin', {
          workspace_id: this.workspace_id || this.$getWorkspaceId(),
          order_admin_id: this.selectedUser,
          instace_id: this.$route.params.instance_id,
        })
        .then(({ message }) => {
          this.$toast.success(message)
        })
        .catch(console.error)
    },
    saveSkuSettings() {
      if (!this.orderManagementAllowed) return
      if (!this.skuManagement.is_sku_automatic) {
        this.$v.skuManagement.$touch()
        if (this.$v.skuManagement.$invalid) return
      }
      this.$axios
        .$post('digital-assets/order-setting/update-product-setting', {
          ...this.skuManagement,
        })
        .then(({ message }) => {
          this.getOrderSettings()
          this.$toast.success(message)
          this.isSkuChangesFound = false
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    saveOrderidSettings() {
      if (!this.orderManagementAllowed) return
      if (!this.orderidSettings.is_order_automatic) {
        this.$v.orderidSettings.$touch()
        if (this.$v.orderidSettings.$invalid) return
      }
      this.$axios
        .$post('digital-assets/order-setting/update-order-setting', {
          ...this.orderidSettings,
        })
        .then(({ message }) => {
          this.getOrderSettings()
          this.$toast.success(message)
          this.isOrderChangesFound = false
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
  },
  validations() {
    return {
      skuManagement: {
        workspace_abbreviation: { required },
        product_number: {
          required,
          numeric,
          length: and(minLength(6), maxLength(10)),
        },
      },
      orderidSettings: {
        order_number: {
          required,
          numeric,
          length: and(minLength(6), maxLength(10)),
        },
      },
    }
  },
}
</script>

<style scoped>
.form-group.enabled {
  pointer-events: all !important;
  opacity: 1;
}
.form-group.disabled {
  pointer-events: none !important;
  opacity: 0.5;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

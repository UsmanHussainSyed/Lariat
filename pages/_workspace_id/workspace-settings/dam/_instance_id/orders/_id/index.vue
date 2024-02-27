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
      <div class="d-flex align-items-center">
        <nuxt-link
          :to="{
            name: 'workspace_id-workspace-settings-dam-instance_id-orders',
          }"
          class="back-btn mr1"
        >
          <svg
            id="Capa_1"
            class="back-long-arrow-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                class="fill-color"
                d="M492,236H68.4l70.2-69.8c7.8-7.8,7.9-20.5,0.1-28.3c-7.8-7.8-20.5-7.9-28.3-0.1L5.9,241.8c0,0,0,0,0,0c-7.8,7.8-7.8,20.5,0,28.3c0,0,0,0,0,0l104.5,104c7.8,7.8,20.5,7.8,28.3-0.1c7.8-7.8,7.8-20.5-0.1-28.3L68.4,276H492c11,0,20-9,20-20C512,245,503,236,492,236z"
              ></path>
            </g>
          </svg>
        </nuxt-link>
        <h4 class="mb0">
          Orders <strong># {{ order_id }}</strong>
        </h4>
        <span
          :class="getStatusClass(orderDetails.statusId)"
          class="plan-status ml1"
          >{{ orderDetails.status }}</span
        >
      </div>
      <div class="right-side">
        <Select2
          v-model="orderDetails.status_id"
          :options="statusList"
          placeholder="Order status"
        />
        <transition name="fade">
          <button
            v-if="showSaveStatus"
            :disabled="isStatusUpdating"
            class="btn"
            @click="updateOrderStatus"
          >
            <i v-if="isStatusUpdating" class="fa fa-circle-o-notch fa-spin"></i>
            Save Order Status
          </button>
        </transition>
        <a
          v-tooltip="
            orderDetails.invoice_status
              ? `Print Invoice`
              : ' Invoice is not generated yet. '
          "
          class="print-btn"
          :class="!orderDetails.invoice_status ? 'disabled' : ''"
          @click="orderDetails.invoice_status ? printInvoice() : ''"
          ><svg
            id="Capa_1"
            class="print-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                class="fill-color"
                d="M437,129h-14V75c0-41.4-33.6-75-75-75H164c-41.4,0-75,33.6-75,75v54H75c-41.4,0-75,33.6-75,75v120c0,41.4,33.6,75,75,75h14v68c0,24.8,20.2,45,45,45h244c24.8,0,45-20.2,45-45v-68h14c41.4,0,75-33.6,75-75V204C512,162.6,478.4,129,437,129z M119,75c0-24.8,20.2-45,45-45h184c24.8,0,45,20.2,45,45v54H119V75z M393,467c0,8.3-6.7,15-15,15H134c-8.3,0-15-6.7-15-15V319h274V467zM482,324c0,24.8-20.2,45-45,45h-14v-50h9c8.3,0,15-6.7,15-15s-6.7-15-15-15H80c-8.3,0-15,6.7-15,15s6.7,15,15,15h9v50H75c-24.8,0-45-20.2-45-45V204c0-24.8,20.2-45,45-45h362c24.8,0,45,20.2,45,45V324z"
              ></path>
              <path
                class="fill-color"
                d="M296,353h-80c-8.3,0-15,6.7-15,15s6.7,15,15,15h80c8.3,0,15-6.7,15-15S304.3,353,296,353z"
              ></path>
              <path
                class="fill-color"
                d="M296,417h-80c-8.3,0-15,6.7-15,15s6.7,15,15,15h80c8.3,0,15-6.7,15-15S304.3,417,296,417z"
              ></path>
              <path
                class="fill-color"
                d="M128,193H80c-8.3,0-15,6.7-15,15s6.7,15,15,15h48c8.3,0,15-6.7,15-15S136.3,193,128,193z"
              ></path>
            </g></svg
        ></a>
      </div>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mt1">Order Summary</h4>
        <strong
          ><span>Order Placed Date :</span>
          {{ $moment(orderDetails.created_at).format('Do MMM, YYYY') }}</strong
        >
      </div>
      <div class="common-box bg-gray h-auto mb2">
        <div class="table-list-view table-list-scrolling">
          <ul class="thead">
            <li>
              <div class="sorting flex40">
                <span>Product Name</span>
              </div>
              <div class="sorting flex30">
                <span>Qty</span>
              </div>
              <div class="sorting flex20">
                <span>QTY PRICE</span>
              </div>
              <div class="sorting flex10">
                <span>Amount</span>
              </div>
              <!-- <div class="sorting flex10">
                <span>Total</span>
              </div> -->
            </li>
          </ul>
          <div class="customscrollbar">
            <ul class="tbody">
              <li
                v-for="orderItem in orderDetails.order_item"
                :key="orderItem.id"
              >
                <div class="tb-column flex40">
                  <div class="media">
                    <div class="media-left">
                      <div class="categary-image">
                        <img
                          v-if="$isImage(orderItem.file_type)"
                          :src="orderItem.file_name"
                          alt=""
                        />
                        <img
                          v-else
                          :src="orderItem.asset_product.preview_image"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <nuxt-link
                        v-if="
                          orderItem.asset_product.is_public &&
                          !orderItem.asset_product.is_archive &&
                          !orderItem.asset_product.is_archive.is_deleted
                        "
                        class="table-a"
                        :to="{
                          name: 'workspace_id-dam-files-id',
                          params: {
                            workspace_id: $getWorkspaceId(),
                            id: orderItem.asset_id,
                          },
                        }"
                        >{{ orderItem.display_file_name }}</nuxt-link
                      >
                      <a v-else class="table-a" href="javascript:;">{{
                        orderItem.display_file_name
                      }}</a>
                    </div>
                  </div>
                </div>
                <div class="tb-column flex30">
                  <label>{{ orderItem.qty }}</label>
                </div>
                <div class="tb-column flex20">
                  <label>
                    {{
                      orderItem.base_qty +
                      ' Qty = ' +
                      getPrice(orderItem.base_price)
                    }}</label
                  >
                </div>
                <div class="tb-column flex10">
                  <label>{{ getPrice(orderItem.total_amount) }}</label>
                </div>
              </li>
              <li>
                <div class="tb-column flex90">
                  <label class="table-a">Shipping Cost</label>
                </div>
                <div class="tb-column flex10">
                  <label>{{ getPrice(shipmentSummary.shipping_amount) }}</label>
                </div>
              </li>
            </ul>
            <ul class="tfooter">
              <li class="d-flex align-items-center justify-content-center">
                <div class="flex70"></div>
                <div class="flex20 text-right pr1">
                  <label>Total Amount : </label>
                </div>
                <div class="flex10">
                  <strong>{{ getPrice(orderDetails.total_amount) }}</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h4>Shipment Summary</h4>
      <div class="box bg-gray-light mb2">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group mb0 required">
              <input
                v-model="shipmentSummary.shipping_tracking_id"
                type="text"
                name="tracking"
                class="form-control"
                placeholder="Tracking Number"
              />
              <div
                v-if="
                  $v.shipmentSummary.$error &&
                  !$v.shipmentSummary.shipping_tracking_id.required
                "
                class="input-error"
              >
                Please fill the required field
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb0 required">
              <input
                v-model="shipmentSummary.shipping_method"
                type="text"
                name="shipping-method"
                class="form-control"
                placeholder="Shipping Method"
              />
              <div
                v-if="
                  $v.shipmentSummary.$error &&
                  !$v.shipmentSummary.shipping_method.required
                "
                class="input-error"
              >
                Please fill the required field
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb0 required">
              <div class="input-price">
                <input
                  v-model="shipmentSummary.shipingCost"
                  type="text"
                  name="shipping-cost"
                  class="form-control"
                  placeholder="Shipping Cost"
                  @keypress="isNumber($event)"
                />
                <div
                  v-if="
                    $v.shipmentSummary.$error &&
                    !$v.shipmentSummary.shipingCost.required
                  "
                  class="input-error"
                >
                  Please fill the required field
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <button
              type="submit"
              name="submit"
              class="btn btn-big"
              :disabled="isUpdating || !showUpdateInvoice"
              @click="updateShipment"
            >
              <i v-if="isUpdating" class="fa fa-circle-o-notch fa-spin"></i>
              Update &amp; Send Invoice
            </button>
            <svg
              v-if="orderDetails.invoice_status"
              v-tooltip="
                orderDetails.invoice_date
                  ? 'Invoice sent on ' +
                    $moment(orderDetails.invoice_date)
                      .tz($auth.user.timezone)
                      .format('Do MMM, YYYY, h:mm a')
                  : ''
              "
              class="invoice-sent-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="17.5"
              viewBox="0 0 17.5 17.5"
            >
              <g id="incomplete-tasks" transform="translate(422.202 87.935)">
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
          </div>
        </div>
      </div>
      <div class="row mb1">
        <div class="col-md-6">
          <div class="box bg-gray-light has-relative h-100">
            <h3 class="order-title">Billing Info</h3>
            <div class="billing-info">
              <label>Dealer Name : </label>
              <strong>{{ orderDetails.user_name }}</strong>
            </div>
            <div class="billing-info">
              <label>Email : </label>
              <a :href="`mailto:${orderDetails.user_email}`">{{
                orderDetails.user_email
              }}</a>
            </div>
            <div class="billing-info">
              <label>Phone : </label>
              <a :href="`tel:${orderDetails.user_phone}`">{{
                orderDetails.user_phone
              }}</a>
            </div>
          </div>
        </div>
        <div v-if="!isLoading" class="col-md-6">
          <div class="box bg-gray-light has-relative h-100">
            <a
              v-tooltip="`Update Shipping Info`"
              href="javascript:void(0);"
              class="update-shippingInfo"
              @click="isEditing = !isEditing"
            >
              <svg
                id="Layer_1"
                class="edit-icon h-orange"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4350" transform="translate(-397.961 -147.331)">
                  <path
                    id="Path_3408"
                    class="fill-color"
                    d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                  ></path>
                  <path
                    id="Path_3409"
                    class="fill-color"
                    d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                  ></path>
                </g>
              </svg>
            </a>
            <h3 class="order-title">Shipping Info</h3>
            <div v-show="!isEditing" class="shipping-readonly">
              <div class="row">
                <div class="col-md-12">
                  <div class="shipping-info">
                    <label>Company Name : </label>
                    <strong>{{ shipmentInfo.shipping_company_name }}</strong>
                  </div>
                  <div class="shipping-info">
                    <label>Name : </label>
                    <strong>{{ shipmentInfo.shipping_user_name }}</strong>
                  </div>
                  <div class="shipping-info">
                    <label>Email : </label>
                    <a :href="`mailto:${shipmentInfo.shipping_user_email}`">{{
                      shipmentInfo.shipping_user_email
                    }}</a>
                  </div>
                  <div class="shipping-info">
                    <label>Phone : </label>
                    <a :href="`tel:${shipmentInfo.shipping_user_phone}`">{{
                      shipmentInfo.shipping_user_phone
                    }}</a>
                  </div>
                  <div class="shipping-info">
                    <label>Address : </label>
                    <strong>{{ getAddressConcat(shipmentInfo) }}</strong>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="shipping-info">
                    <label>Special Instruction : </label>
                    <p>
                      {{ orderDetails.user_note }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Edit form -->
            <div v-show="isEditing" class="shipping-editable">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Company Name</label>
                    <input
                      v-model="shipmentInfo.shipping_company_name"
                      type="text"
                      name="company-name"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.shipping_company_name.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Name</label>
                    <input
                      v-model="shipmentInfo.shipping_user_name"
                      type="text"
                      name="name"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.shipping_user_name.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Email</label>
                    <input
                      v-model="shipmentInfo.shipping_user_email"
                      type="email"
                      name="email"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.shipping_user_email.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Phone</label>
                    <input
                      v-model="shipmentInfo.shipping_user_phone"
                      type="text"
                      name="phone"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.shipping_user_phone.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Address Line 1</label>
                    <input
                      v-model="shipmentInfo.address1"
                      type="text"
                      name="address1"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.address1.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label">Address Line 2</label>
                    <input
                      v-model="shipmentInfo.address2"
                      type="text"
                      name="address2"
                      placeholder=""
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">City</label>
                    <input
                      v-model="shipmentInfo.city"
                      type="text"
                      name="city"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error && !$v.shipmentInfo.city.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">State</label>
                    <input
                      v-model="shipmentInfo.state"
                      type="text"
                      name="state"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.state.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Postal Code</label>
                    <input
                      v-model="shipmentInfo.zip_code"
                      type="text"
                      name="postal"
                      placeholder=""
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.zip_code.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group required">
                    <label class="control-label">Country</label>
                    <Select2
                      v-model="shipmentInfo.country"
                      :options="['United States', 'Canada']"
                      placeholder="Country"
                    />
                    <div
                      v-if="
                        $v.shipmentInfo.$error &&
                        !$v.shipmentInfo.country.required
                      "
                      class="input-error"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <button
                      type="submit"
                      name="submit"
                      class="btn"
                      @click="updateShipmentUserInfo"
                    >
                      Update Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- edit form end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, numeric, decimal, or } from 'vuelidate/lib/validators'
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    Select2,
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    ({ route, error }) => {
      if (!route.query.order_id) {
        error({
          statusCode: 401,
          path: route.path,
          message: 'Oops something went wrong.',
        })
      }
    },
  ],
  data() {
    return {
      orderDetails: {},
      listOrderId: this.$route.params.id,
      order_id: this.$route.query.order_id,
      isLoading: false,
      isEditing: false,
      statusList: [],
      shipmentSummary: {
        shipping_tracking_id: '',
        shipping_method: '',
        shipping_amount: null,
        shipingCost: '',
      },
      shipmentInfo: {},
      isUpdating: false,
      isStatusUpdating: false,
      showSaveStatus: false,
      showUpdateInvoice: false,
      tempShipmentSummary: null,
      statusColors: [
        {
          id: 1,
          class: 'alert-secondary',
          name: 'In-Progress',
        },
        {
          id: 2,
          class: 'alert-warning',
          name: 'Shipped',
        },
        {
          id: 3,
          class: 'alert-success',
          name: 'Delivered',
        },
        {
          id: 4,
          class: 'alert-danger',
          name: 'Cancelled',
        },
      ],
    }
  },
  computed: {
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
  },
  watch: {
    'orderDetails.status_id': {
      handler(o, n) {
        if (n && o !== n && !this.isLoading) {
          this.showSaveStatus = true
        }
      },
      deep: true,
    },
    shipmentSummary: {
      handler(o, n) {
        if (JSON.stringify(this.tempShipmentSummary) !== JSON.stringify(n)) {
          this.showUpdateInvoice = true
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch('dam/getNotifications')
    this.getOrderDetail()
    this.getOrderStatus()
  },
  methods: {
    getStatusClass(statusId) {
      const status = this.statusColors.find(
        ({ id }) => parseInt(id) === parseInt(statusId)
      )
      if (status) {
        return status.class
      }
      return ''
    },
    printInvoice() {
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Generating invoice, please wait...',
      })
      this.$axios({
        method: 'GET',
        url: 'digital-assets/invoice/generate-pdf',
        params: {
          url_workspace_id: this.$getWorkspaceId(),
          order_id: this.listOrderId,
        },
      })
        .then(({ data, message }) => {
          this.$toast.success(message)
          const link = document.createElement('a')
          link.setAttribute('target', '_blank')
          link.href = data.data.pdf_file
          link.click()
          link.remove()
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    getPrice(val) {
      let price = ''
      if (!val) return '-'
      if (val) {
        price = '$' + val
      }
      if (val % 1 === 0) {
        price += '.00'
      }
      return price
    },
    getAddressConcat(address) {
      let concat = ''
      if (address.address1) {
        concat += address.address1
      }
      if (address.address2) {
        concat += ', ' + address.address2
      }
      if (address.city) {
        concat += ', ' + address.city
      }
      if (address.state) {
        concat += ' , ' + address.state
      }
      if (address.country) {
        concat += ', ' + address.country
      }
      if (address.zip_code) {
        concat += ', ' + address.zip_code
      }
      return concat
    },
    updateOrderStatus() {
      if (!this.orderDetails.status_id) {
        this.$toast.error('Select a status first.')
        return
      }
      this.isStatusUpdating = true
      this.$axios
        .$post('digital-assets/asset-order/update-order-status', {
          status: this.orderDetails.status_id,
          order_id: this.listOrderId,
        })
        .then(({ message }) => {
          const status = this.statusList.find(
            (s) => parseInt(s.id) === parseInt(this.orderDetails.status_id)
          )
          this.orderDetails.status = status.text
          this.orderDetails.statusId = this.orderDetails.status_id
          this.showSaveStatus = false
          this.$toast.success(message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.isStatusUpdating = false
        })
    },
    updateShipment() {
      this.$v.shipmentSummary.$touch()
      if (!this.showUpdateInvoice) return
      if (this.$v.shipmentSummary.$invalid) {
        return
      }
      this.isUpdating = true
      const shipmentPayload = {
        ...this.shipmentSummary,
        shipping_amount: this.shipmentSummary.shipingCost,
      }
      delete shipmentPayload.shipingCost
      this.$axios
        .$post('digital-assets/asset-order/add-shipping-info', {
          ...shipmentPayload,
          order_id: this.listOrderId,
        })
        .then(({ message }) => {
          this.$toast.success(message)
          this.showUpdateInvoice = false
          this.getOrderDetail()
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.isUpdating = false
        })
    },
    updateShipmentUserInfo() {
      this.$v.shipmentInfo.$touch()
      if (this.$v.shipmentInfo.$invalid) {
        return
      }
      this.$axios
        .$post('digital-assets/asset-order/update-shipping-info', {
          ...this.shipmentInfo,
          order_id: this.listOrderId,
        })
        .then(({ message }) => {
          this.$toast.success(message)
          this.isEditing = false
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
    },
    getOrderStatus() {
      this.$axios
        .$get('digital-assets/asset-order/order-status')
        .then(({ data }) => {
          this.statusList = data
        })
        .catch(console.error)
    },
    getOrderDetail() {
      this.isLoading = true
      this.$axios
        .$get(`digital-assets/asset-order/detail`, {
          params: {
            url_workspace_id: this.$getWorkspaceId(),
            order_id: this.listOrderId,
          },
        })
        .then(({ data }) => {
          this.orderDetails = data
          this.orderDetails.statusId = data.status_id
          this.shipmentInfo = data.shpping_info
          this.shipmentSummary.shipping_amount = data.shipping_amount
          this.shipmentSummary.shipingCost = data.shipping_amount
          this.shipmentSummary.shipping_method = data.shipping_method
          this.shipmentSummary.shipping_tracking_id = data.shipping_tracking_id
          this.tempShipmentSummary = { ...this.shipmentSummary }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
  validations() {
    return {
      shipmentInfo: {
        shipping_company_name: {
          required,
        },
        shipping_user_name: {
          required,
        },
        shipping_user_email: {
          required,
        },
        shipping_user_phone: {
          required,
        },
        address1: {
          required,
        },
        city: {
          required,
        },
        state: {
          required,
        },
        country: {
          required,
        },
        zip_code: {
          required,
        },
      },
      shipmentSummary: {
        shipping_tracking_id: {
          required,
        },
        shipping_method: {
          required,
        },
        shipingCost: {
          required,
          priceUnit: or(numeric, decimal),
        },
      },
    }
  },
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

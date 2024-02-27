<template>
  <div
    id="manage-product"
    class="tab-pane"
    :class="{ active: activeTab, 'position-relative': true }"
  >
    <template v-if="!orderManagementAllowed">
      <img
        :src="require('~/assets/img/blurred-images/manage-product.png')"
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
    <div v-else>
      <div class="form-group">
        <div class="d-flex align-items-center">
          <label>Dealer can Order as a Product</label>
          <label class="label-switch no-text ml-1">
            <input
              v-model="productOrderDetails.canOrderProduct"
              type="checkbox"
              class="switch"
              name="order"
              @change="
                ($event) =>
                  !$event.target.checked ? disableOrderProduct() : ''
              "
            />
            <span class="lable"></span>
          </label>
        </div>
      </div>
      <template v-if="productOrderDetails.canOrderProduct">
        <div
          class="form-group w-75"
          :class="skuSettings.is_required ? 'required' : ''"
        >
          <label class="control-label">SKU</label>
          <input
            v-model.number="skuSettings.sku_number"
            type="text"
            name="sku"
            placeholder="SKU"
            class="form-control"
          />
          <div
            v-if="skuSettings.is_required && $v.skuSettings.sku_number.$error"
            class="input-error"
          >
            <span>Please fill the required field</span>
          </div>
          <div v-else-if="$v.skuSettings.sku_number.$error" class="input-error">
            <span
              >Please note SKU is optional here, still you can input a valid SKU
              number with a minimum length 6</span
            >
          </div>
        </div>
        <div class="form-group w-25 required">
          <label class="control-label"> Units per Qty </label>
          <i
            v-tooltip="
              'It defines the total Units contains into per Qty. For example, If you mention Units per Qty = 100 That means 100 units will be placed under 1 Qty Of the Product.'
            "
            class="fa fa-question-circle ml-2"
            aria-hidden="true"
            data-toggle="tooltip"
          ></i>
          <input
            v-model.number="unitPerQty"
            type="text"
            name="units"
            placeholder=""
            class="form-control"
            @keypress="isNumber($event)"
          />
          <div
            v-if="$v.unitPerQty.$error && !$v.unitPerQty.required"
            class="input-error"
          >
            <span v-if="$v.unitPerQty.numeric === false">
              Please enter number only</span
            >
            <span v-else>Please fill the required field</span>
          </div>
        </div>
        <div class="form-group required w-50">
          <label class="control-label">Pricing Option</label>
          <Select2
            v-model="selectedPricing"
            :options="pricingOptions"
            placeholder="Select Pricing Option"
          />
          <div
            v-if="$v.selectedPricing.$error && !$v.selectedPricing.required"
            class="input-error"
          >
            Please select the pricing option field
          </div>
        </div>
        <div v-if="selectedPricing === '1'" class="form-group">
          <div class="d-flex align-items-center">
            <label>Dealer can customise QTY</label>
            <label class="label-switch no-text ml-1">
              <input
                v-model="productOrderDetails.canCustomizeQuantity"
                type="checkbox"
                class="switch"
                name="customise-qty"
                value="1"
                checked=""
              />
              <span class="lable"></span>
            </label>
          </div>
        </div>
        <div v-if="selectedPricing === '1'" class="row">
          <div class="col-md-4">
            <div class="form-group required">
              <label class="control-label">Minimum Qty</label>
              <input
                v-model="productOrderDetails.minQty"
                type="text"
                name="minimum-qty"
                placeholder="Minimum Qty"
                class="form-control"
                required=""
                @keypress="isNumber($event)"
              />
              <div
                v-if="
                  $v.productOrderDetails.minQty.$error &&
                  !$v.productOrderDetails.minQty.required
                "
                class="input-error"
              >
                <span v-if="$v.productOrderDetails.minQty.numeric === false">
                  Please enter number only</span
                >
                <span v-else>Please fill the required field</span>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group required">
              <label class="control-label">Price</label>
              <div class="input-price">
                <input
                  v-model.number="productOrderDetails.price"
                  type="text"
                  name="price"
                  placeholder="0.00"
                  class="form-control"
                  required=""
                  @keypress="isNumber($event)"
                />
              </div>
              <div
                v-if="
                  $v.productOrderDetails.price.$error &&
                  !$v.productOrderDetails.price.required
                "
                class="input-error"
              >
                <span v-if="$v.productOrderDetails.price.priceUnit === false">
                  Please enter number only</span
                >
                <span v-else>Please fill the required field</span>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group required">
              <label class="control-label">Weight</label>
              <div class="input-weight">
                <input
                  v-model="productOrderDetails.weight"
                  type="text"
                  name="weight"
                  placeholder="Weight"
                  class="form-control"
                  required=""
                  @keypress="isNumber($event)"
                />
              </div>
              <div
                v-if="
                  $v.productOrderDetails.weight.$error &&
                  !$v.productOrderDetails.weight.required
                "
                class="input-error"
              >
                <span v-if="$v.productOrderDetails.weight.numeric === false">
                  Please enter number only</span
                >
                <span v-else>Please fill the required field</span>
              </div>
            </div>
          </div>
        </div>
        <template v-if="selectedPricing === '2'">
          <div
            v-for="(row, i) in $v.customizableQuantityList.$each.$iter"
            :key="i"
            class="row"
          >
            <div class="col-md-3">
              <div class="form-group required">
                <label class="control-label">Qty</label>
                <input
                  v-model="row.qty.$model"
                  type="text"
                  name="qty"
                  placeholder="Qty"
                  class="form-control"
                  @keypress="isNumber($event)"
                />
                <div
                  v-if="row.qty.$error && !row.qty.required"
                  class="input-error"
                >
                  <span v-if="row.qty.numeric === false">
                    Please enter number only</span
                  >
                  <span v-else>Please fill the required field</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group required">
                <label class="control-label">Price</label>
                <div class="input-price">
                  <input
                    v-model.number="row.price.$model"
                    type="text"
                    name="price"
                    placeholder="0.00"
                    class="form-control"
                    @keypress="isNumber($event)"
                  />
                </div>
                <div
                  v-if="row.price.$error && !row.price.required"
                  class="input-error"
                >
                  <span v-if="row.price.priceUnit === false">
                    Please enter number only</span
                  >
                  <span v-else-if="row.price.checkNull === false">
                    Please enter number greater than 0</span
                  >
                  <span v-else>Please fill the required field</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group required">
                <label class="control-label">Weight</label>
                <div class="input-weight">
                  <input
                    v-model="row.weight.$model"
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    class="form-control"
                    @keypress="isNumber($event)"
                  />
                </div>
                <div
                  v-if="row.weight.$error && !row.weight.required"
                  class="input-error"
                >
                  <span v-if="row.weight.numeric === false">
                    Please enter number only</span
                  >
                  <span v-else>Please fill the required field</span>
                </div>
              </div>
            </div>
            <div
              v-if="
                parseInt(i) === $v.customizableQuantityList.$model.length - 1
              "
              class="col-md-1"
            >
              <div class="form-group">
                <a
                  v-tooltip="'Add Field'"
                  href="javascript:void(0);"
                  class="add-field"
                  @click="addRow"
                >
                  <svg
                    id="Layer_1"
                    class="plus-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4454" transform="translate(-1005 -577.999)">
                      <path
                        id="Path_3394"
                        class="fill-color"
                        d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                      ></path>
                      <path
                        id="Path_3395"
                        class="fill-color"
                        d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                      ></path>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <div
              v-else-if="$v.customizableQuantityList.$model.length > 1"
              class="col-md-1"
            >
              <div class="form-group">
                <a
                  v-tooltip="'Remove Field'"
                  href="javascript:void(0);"
                  class="remove-field"
                  @click="() => customizableQuantityList.splice(i, 1)"
                >
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
                </a>
              </div>
            </div>
          </div>
        </template>
        <div class="form-group">
          <button type="submit" name="submit" class="btn" @click="save">
            Save
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  required,
  numeric,
  decimal,
  or,
  minLength,
} from 'vuelidate/lib/validators'
import { v4 as uuidv4 } from 'uuid'
import Select2 from '~/components/plugins/Select2'
const checkNull = (value) => value !== 0 && value !== '' && value !== null
export default {
  components: {
    Select2,
  },
  props: {
    activeTab: {
      default: false,
      type: Boolean,
    },
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      productOrderDetails: {
        sku: '',
        price: '',
        weight: '',
        minQty: '',
        canCustomizeQuantity: false,
        canOrderProduct: false,
      },
      unitPerQty: null,
      selectedPricing: '',
      customizableQuantityList: [
        {
          qty: null,
          price: null,
          weight: null,
          name: null,
          text: null,
          id: uuidv4(),
        },
      ],
      pricingOptions: [
        {
          text: 'User Can Enter Quantity',
          id: 1,
          name: 'User Can Enter Quantity',
        },
        {
          text: 'Manage Different QTY and Price',
          id: 2,
          name: 'Manage Different QTY and Price',
        },
      ],
      changesFound: false,
      dataFound: false,
      skuSettings: {
        sku_number: '',
        sku: '',
        is_required: false,
      },
    }
  },
  computed: {
    orderManagementAllowed() {
      return !!this.$auth.user.subscription_features?.asset_order_management
        ?.enable
    },
  },
  watch: {
    activeTab(v) {
      if (v) {
        this.getAssetProduct()
        this.getSkuSettings()
      }
    },
    'productOrderDetails.canOrderProduct': {
      handler(v) {
        if (
          !this.changesFound &&
          this.productOrderDetails.canOrderProduct &&
          !this.dataFound
        ) {
          this.changesFound = true
        } else if (!v) {
          this.changesFound = false
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getAssetProduct()
    this.getSkuSettings()
  },
  methods: {
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
    async getSkuSettings() {
      try {
        const { data } = await this.$axios.$get(
          'digital-assets/asset-product/generateSKUNumber',
          {
            params: {
              url_workspace_id: this.$getWorkspaceId(),
              asset_id: this.$route.params.id,
            },
          }
        )
        this.skuSettings = data
      } catch (error) {
        console.log(error)
      }
    },
    getAssetProduct() {
      this.$axios
        .$get('digital-assets/asset-product/get-asset-product', {
          params: {
            asset_id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          if (data) {
            if (data.is_product) {
              this.dataFound = true
            }
            const options = JSON.parse(data.options)
            this.productOrderDetails.sku = data.sku
            this.selectedPricing = data.pricing_option
            this.productOrderDetails.canOrderProduct = !!data.is_product
            this.unitPerQty = data.unit
            this.selectedPricing = data.pricing_option
            if (data.pricing_option === '1') {
              this.productOrderDetails.minQty = options[0].qty
              this.productOrderDetails.price = options[0].price
              this.productOrderDetails.weight = options[0].weight
              this.productOrderDetails.canCustomizeQuantity =
                !!data.is_customize
            } else if (data.pricing_option === '2') {
              this.customizableQuantityList = options
            }
          } else {
            this.reset()
          }
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    addRow() {
      this.customizableQuantityList.push({
        qty: '',
        price: '',
        weight: '',
        id: uuidv4(),
        name: '',
        text: '',
      })
    },
    reset() {
      this.productOrderDetails = {
        sku: '',
        price: '',
        weight: '',
        minQty: '',
        canCustomizeQuantity: false,
        canOrderProduct: false,
      }
      this.unitPerQty = null
      this.selectedPricing = null
      this.customizableQuantityList = [
        {
          qty: null,
          price: null,
          weight: null,
          name: null,
          text: null,
          id: uuidv4(),
        },
      ]
    },
    removeField(index) {
      this.customizableQuantityList.splice(index, 1)
    },
    disableOrderProduct() {
      if (!this.selectedPricing) return
      this.$axios
        .$post('digital-assets/asset-product/create-asset-product', {
          name: this.file.display_file_name,
          asset_id: this.$route.params.id,
          sku: this.skuSettings.sku,
          sku_number: this.skuSettings.sku_number,
          pricing_option: this.selectedPricing,
          unit: this.unitPerQty,
          selected_option:
            this.selectedPricing === '2'
              ? this.customizableQuantityList[0].id
              : null,
          minQty:
            this.selectedPricing === '1'
              ? this.productOrderDetails.minQty
              : this.customizableQuantityList[0].qty,
          minPrice:
            this.selectedPricing === '1'
              ? this.productOrderDetails.price
              : this.customizableQuantityList[0].price,
          options:
            this.selectedPricing === '1'
              ? [
                  {
                    qty: this.productOrderDetails.minQty,
                    price: this.productOrderDetails.price,
                    weight: this.productOrderDetails.weight,
                    id: uuidv4(),
                    name: '',
                    text: '',
                  },
                ]
              : this.customizableQuantityList,
          is_product: this.productOrderDetails.canOrderProduct,
          is_customize: this.productOrderDetails.canCustomizeQuantity,
        })
        .then(({ message }) => {
          this.changesFound = false
          this.reset()
          this.$v.$reset()
          this.$toast.success(message)
          this.getSkuSettings()
        })
        .catch(console.error)
    },
    save(isSubmit = false) {
      if (!isSubmit) {
        return
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$axios
        .$post('digital-assets/asset-product/create-asset-product', {
          name: this.file.display_file_name,
          asset_id: this.$route.params.id,
          sku: this.skuSettings.sku_number ? this.skuSettings.sku : '',
          sku_number: this.skuSettings.sku_number,
          pricing_option: this.selectedPricing,
          unit: this.unitPerQty,
          selected_option:
            this.selectedPricing === '2'
              ? this.customizableQuantityList[0].id
              : null,
          minQty:
            this.selectedPricing === '1'
              ? this.productOrderDetails.minQty
              : this.customizableQuantityList[0].qty,
          minPrice:
            this.selectedPricing === '1'
              ? this.productOrderDetails.price
              : this.customizableQuantityList[0].price,
          options:
            this.selectedPricing === '1'
              ? [
                  {
                    qty: this.productOrderDetails.minQty,
                    price: this.productOrderDetails.price,
                    weight: this.productOrderDetails.weight,
                    id: uuidv4(),
                    name: '',
                    text: '',
                  },
                ]
              : this.customizableQuantityList,
          is_product: this.productOrderDetails.canOrderProduct,
          is_customize: this.productOrderDetails.canCustomizeQuantity,
        })
        .then(({ data }) => {
          this.changesFound = false
          this.getAssetProduct()
          this.$toast.success('Product Successfully Updated.')
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
  },
  validations() {
    const v = {
      selectedPricing: { required },
      unitPerQty: { checkNull, numeric, required },
    }
    if (this.skuSettings.is_required) {
      Object.assign(v, {
        skuSettings: {
          sku_number: {
            required,
            minLength: minLength(6),
          },
        },
      })
    } else {
      Object.assign(v, {
        skuSettings: {
          sku_number: {
            minLength: minLength(6),
          },
        },
      })
    }
    if (this.selectedPricing === '2') {
      Object.assign(v, {
        customizableQuantityList: {
          $each: {
            qty: { checkNull, numeric, required },
            price: {
              checkNull,
              priceUnit: or(numeric, decimal),
              required,
            },
            weight: { checkNull, decimal, required },
          },
        },
      })
    } else {
      Object.assign(v, {
        productOrderDetails: {
          minQty: { checkNull, numeric, required },
          price: {
            checkNull,
            priceUnit: or(numeric, decimal),
            required,
          },
          weight: { checkNull, decimal, required },
        },
      })
    }
    return v
  },
}
</script>

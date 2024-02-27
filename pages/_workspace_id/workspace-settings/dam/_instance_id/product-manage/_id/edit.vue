<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <div class="d-flex align-items-center">
        <nuxt-link
          :to="{
            name: 'workspace_id-workspace-settings-dam-instance_id-product-manage',
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
        <h4>Update Product</h4>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="row h-100">
        <div v-if="asset" class="col-lg-4 col-md-12 h-100">
          <div
            v-if="$isVideo(asset.file_type)"
            class="product-preview video"
            :data-src="asset.video_preview"
            v-on="{
              mouseenter: playVideo,
              mouseleave: pauseVideo,
            }"
          >
            <div class="categary-image">
              <!-- <img src="img/resource-img11.jpg" alt="" /> -->
              <img
                class="preview-images preview"
                style="object-fit: contain !important"
                :src="asset.thumbnail_file"
              />
              <video
                v-if="asset.video_preview"
                ref="video"
                class="thevideo"
                :src="asset.video_preview"
                style="width: auto; height: 100%; object-fit: contain"
                muted
                loop
                preload="metadata"
                disablepictureinpicture
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <span>{{ productOrderDetails.name }}</span>
          </div>
          <div v-else class="product-preview">
            <div class="categary-image">
              <div :class="!asset.thumbnail_file ? 'icon' : ''">
                <img
                  :src="asset.thumbnail_file || getPreviewIcon(asset.file_type)"
                  alt=""
                />
              </div>
            </div>
            <span>{{ productOrderDetails.name }}</span>
          </div>
        </div>
        <div class="col-lg-8 col-md-12 h-100">
          <div class="general-settings-box customscrollbar pr10">
            <ContentLoader
              v-if="isFetching"
              :speed="1"
              :animate="true"
              :width="400"
              :height="100"
              class="px-2 normalLoader"
            >
              <rect x="0" y="-1" rx="0" ry="0" width="395" height="20" />
              <rect x="0" y="15" rx="0" ry="0" width="395" height="20" />
              <rect x="0" y="31" rx="0" ry="0" width="395" height="20" />
              <rect x="0" y="47" rx="0" ry="0" width="395" height="20" />
              <rect x="0" y="70" rx="0" ry="0" width="395" height="20" />
              <rect x="0" y="100" rx="0" ry="0" width="395" height="20" />
            </ContentLoader>
            <form v-else method="post" @submit.prevent="updateProduct">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group required">
                    <label class="control-label">Name</label>
                    <input
                      v-model="productOrderDetails.name"
                      type="text"
                      class="form-control"
                    />
                    <div
                      v-if="
                        $v.productOrderDetails &&
                        $v.productOrderDetails.name.$error &&
                        !$v.productOrderDetails.name.required
                      "
                      class="input-error"
                    >
                      <span>Please fill the required field</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div
                    class="form-group"
                    :class="skuSettings.is_required ? 'required' : ''"
                  >
                    <label class="control-label">SKU</label>
                    <input
                      v-model.number="skuSettings.sku_number"
                      type="text"
                      class="form-control"
                    />
                    <div
                      v-if="
                        skuSettings.is_required &&
                        $v.skuSettings.sku_number.$error
                      "
                      class="input-error"
                    >
                      <span>Please fill the required field</span>
                    </div>
                    <div
                      v-else-if="$v.skuSettings.sku_number.$error"
                      class="input-error"
                    >
                      <span
                        >Please note SKU is optional here, still you can input a
                        valid SKU number with a minimum length 6</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
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
                </div>
                <div class="col-sm-6">
                  <div class="form-group required">
                    <label class="control-label">Pricing Option</label>
                    <Select2
                      v-model="selectedPricing"
                      :options="pricingOptions"
                      placeholder="Select Pricing Option"
                    />
                  </div>
                </div>
                <div v-if="selectedPricing === '1'" class="col-sm-12">
                  <div class="form-group">
                    <div class="d-flex align-items-center">
                      <label>Dealer can customise QTY</label>
                      <label class="label-switch no-text ml-1">
                        <input
                          v-model="productOrderDetails.canCustomizeQuantity"
                          type="checkbox"
                          class="switch"
                          name="customise-qty"
                        />
                        <span class="lable"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div v-if="selectedPricing === '1'" class="col-sm-9">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group required">
                        <label class="control-label">Minimum Qty</label>
                        <input
                          v-model="productOrderDetails.minQty"
                          type="text"
                          name="minimum-qty"
                          placeholder="Minimum Qty"
                          class="form-control"
                          @keypress="isNumber($event)"
                        />
                        <div
                          v-if="
                            $v.productOrderDetails.minQty.$error &&
                            !$v.productOrderDetails.minQty.required
                          "
                          class="input-error"
                        >
                          <span
                            v-if="
                              $v.productOrderDetails.minQty.numeric === false
                            "
                          >
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
                            v-model="productOrderDetails.price"
                            type="text"
                            name="price"
                            placeholder="0.00"
                            class="form-control"
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
                          <span
                            v-if="
                              $v.productOrderDetails.price.numeric === false
                            "
                          >
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
                          <span
                            v-if="
                              $v.productOrderDetails.weight.numeric === false
                            "
                          >
                            Please enter number only</span
                          >
                          <span v-else>Please fill the required field</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- -->
                <template v-if="selectedPricing === '2'">
                  <div class="col-sm-9">
                    <div
                      v-for="(row, i) in $v.customizableQuantityList.$each
                        .$iter"
                      :key="row.id"
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
                            required=""
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
                              v-model="row.price.$model"
                              type="text"
                              name="price"
                              placeholder="0.00"
                              class="form-control"
                              required=""
                              @keypress="isNumber($event)"
                            />
                          </div>
                          <div
                            v-if="row.price.$error && !row.price.required"
                            class="input-error"
                          >
                            <span v-if="row.price.numeric === false">
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
                              v-model="row.weight.$model"
                              type="text"
                              name="weight"
                              placeholder="Weight"
                              class="form-control"
                              required=""
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
                          parseInt(i) ===
                          $v.customizableQuantityList.$model.length - 1
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
                              <g
                                id="Group_4454"
                                transform="translate(-1005 -577.999)"
                              >
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
                        v-else-if="
                          $v.customizableQuantityList.$model.length > 1
                        "
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
                              <g
                                id="Group_4358"
                                transform="translate(-69.745 -317.549)"
                              >
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
                  </div>
                </template>
                <div class="col-sm-12">
                  <div class="form-group mb0">
                    <button
                      type="submit"
                      name="submit"
                      class="btn"
                      :disabled="isLoading"
                    >
                      <i
                        v-if="isLoading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                      Update Product
                    </button>
                    <button
                      type="button"
                      class="btn btn-gray"
                      @click="getProductDetail"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
import { ContentLoader } from 'vue-content-loader'
import { v4 as uuidv4 } from 'uuid'
import Select2 from '~/components/plugins/Select2'
import FileType from '@/mixins/fileType.js'
const checkNull = (value) => value !== '' && value !== null
export default {
  components: {
    Select2,
    ContentLoader,
  },
  mixins: [FileType],
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
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
      customizableQuantityList: [
        {
          qty: null,
          price: null,
          weight: null,
          id: uuidv4(),
          name: '',
          text: '',
        },
      ],
      productOrderDetails: {
        file_type: '',
        name: '',
        sku: '',
        price: '',
        weight: '',
        minQty: '',
        canCustomizeQuantity: false,
        canOrderProduct: true,
      },
      selectedPricing: '',
      isLoading: false,
      isFetching: false,
      unitPerQty: '',
      asset: null,
      skuSettings: {
        sku_number: '',
        sku: '',
        is_required: false,
      },
    }
  },
  mounted() {
    this.getProductDetail()
    this.getSkuSettings()
  },
  methods: {
    playVideo() {
      const video = this.$refs.video
      if (!video) return
      this.$suppressError(() => {
        video.play()
      })
    },
    pauseVideo() {
      const video = this.$refs.video
      this.$suppressError(() => {
        this.playtime = video.currentTime
        video.pause()
      })
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
    getProductDetail() {
      this.isFetching = true
      this.$axios
        .$get('digital-assets/asset-product/get-asset-product', {
          params: {
            asset_id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.productOrderDetails.sku = data.sku
          this.productOrderDetails.file_type = data.asset.file_type
          this.productOrderDetails.name = data.asset.display_file_name.replace(
            `.${this.productOrderDetails.file_type}`,
            ''
          )
          this.asset = data.asset
          this.selectedPricing = data.pricing_option
          this.unitPerQty = data.unit

          if (data.pricing_option === '1') {
            this.productOrderDetails.minQty = JSON.parse(data.options)[0].qty
            this.productOrderDetails.price = JSON.parse(data.options)[0].price
            this.productOrderDetails.weight = JSON.parse(data.options)[0].weight
            this.productOrderDetails.canCustomizeQuantity = Boolean(
              data.is_customize
            )
          } else if (data.pricing_option === '2') {
            this.customizableQuantityList = JSON.parse(data.options)
          }
        })
        .catch(console.error)
        .finally(() => {
          this.isFetching = false
        })
    },
    updateProduct() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.isLoading = true
      this.$axios
        .$post('digital-assets/asset-product/create-asset-product', {
          asset_id: this.$route.params.id,
          sku: this.skuSettings.sku_number ? this.skuSettings.sku : '',
          sku_number: this.skuSettings.sku_number,
          pricing_option: this.selectedPricing,
          unit: this.unitPerQty,
          name:
            this.productOrderDetails.name +
            '.' +
            this.productOrderDetails.file_type,
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
          this.$toast.success(message)
          this.$router.push({
            name: 'workspace_id-workspace-settings-dam-instance_id-product-manage',
          })
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
        .finally(() => {
          this.isLoading = false
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
          name: { checkNull },
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

<style></style>

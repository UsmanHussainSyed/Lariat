<template>
  <div class="body-content-auto">
    <div class="general-settings-right h-100 w-100">
      <div class="general-settings-title fixed-btn-right">
        <!-- <h4>{{ edit ? 'Edit' : 'Add' }} Product</h4> -->
        <navigationTab :active-routes="productRoutes" />
      </div>
      <div class="workspace-settings addProduct">
        <div class="row h-100">
          <div class="col-lg-12 col-xl-4 h-100">
            <form class="h-100">
              <div class="table-list-view">
                <div class="customscrollbar no_header">
                  <div id="personal_details" class="sc_nav_section active">
                    <div class="box">
                      <div class="clearfix">
                        <div
                          class="media sc_media position-relative pull-left mb1"
                        >
                          <div class="media-body align-self-center">
                            <h5>Product Details</h5>
                          </div>
                        </div>
                        <div class="product-status pull-right">
                          <label class="label-switch">
                            <span>Is Active</span>
                            <input
                              id="detailView"
                              v-model="product.is_active"
                              type="checkbox"
                              class="switch switch-onoff"
                              name="detail-view"
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                      </div>
                      <text-field
                        v-model="product.name"
                        label="Product Name"
                        placeholder="Product Name"
                        type="text"
                        :v="$v.product.name"
                        required
                      ></text-field>
                      <div
                        v-if="categories.length || categoriesLoaded"
                        class="form-group required"
                      >
                        <label class="control-label">Category</label>
                        <SelectAndAdd
                          v-model="product.category_id"
                          :options="categories"
                          placeholder="Category"
                          :custom-event="true"
                          :custom-event-context="true"
                        />
                        <div v-if="$v.product.$error" class="input-error">
                          <div v-if="$v.product.category_id.required === false">
                            Field is required
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </div>
                          <input
                            v-model.number="product.price"
                            type="number"
                            name="Price"
                            class="form-control"
                            placeholder="Price"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <label class="check-label"
                            >Does product have SKU?
                            <input
                              v-model="productHaveSku"
                              class="moduleSelect"
                              type="checkbox"
                              data-lpignore="true"
                            />
                            <span class="check-span"></span>
                          </label>
                        </div>
                      </div>
                      <div class="form-group required">
                        <label v-if="productHaveSku" class="control-label"
                          >SKU</label
                        >
                        <input
                          v-if="productHaveSku"
                          v-model="product.sku"
                          type="text"
                          class="form-control"
                          placeholder="Sku"
                          @keyup="checkSkuExist"
                        />
                        <template v-if="productHaveSku">
                          <div v-if="skuExist" class="input-error">
                            <div>SKU Already Exist</div>
                          </div>

                          <div
                            v-else-if="$v.product.$error"
                            class="input-error"
                          >
                            <div v-if="$v.product.sku.required === false">
                              Field is required
                            </div>
                            <div v-else-if="!$v.product.sku.isSku">
                              Invalid SKU
                            </div>
                          </div>
                        </template>
                      </div>
                      <text-field
                        v-model="product.descrption"
                        label="Product Details"
                        placeholder="Product Details"
                        :textarea="true"
                        :rows="5"
                      ></text-field>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="control-label">Product Alias</label>
                          <TagInput
                            :tags="product.product_alias"
                            :is-product-tag="true"
                            @update:tags="product.product_alias = $event"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="file-upload">
                          <file-drag-and-drop
                            v-slot="{ dragEnter }"
                            accept="image/jpg,image/png,image/jpeg,image/webp"
                            @error="$toast.error('found invalid files')"
                            @input="addImage($event)"
                          >
                            <input
                              ref="productImageInput"
                              class="file-upload-input"
                              style="display: none"
                              type="file"
                              accept="image/*"
                              @change="addImage($event)"
                            />
                            <div
                              v-if="product.images.length === 0"
                              class="image-upload-wrap"
                              :class="{ dragEnter }"
                              @click="$refs.productImageInput.click()"
                            >
                              <div class="drag-text">
                                <svg
                                  id="Layer_1"
                                  class="upload-big-icon blue"
                                  style="height: 60px"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 162 162"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="Icon_feather-download"
                                    transform="translate(-3.5 -3.5)"
                                  >
                                    <path
                                      id="Path_16"
                                      class="fill-color"
                                      d="M164.5,111.2v35.6c0,9.8-8,17.8-17.8,17.8H22.3c-9.8,0-17.8-8-17.8-17.8v-35.6"
                                    ></path>
                                    <path
                                      id="Path_17"
                                      class="fill-color"
                                      d="M40.1,48.9L84.5,4.5l44.4,44.4"
                                    ></path>
                                    <path
                                      id="Path_18"
                                      class="fill-color"
                                      d="M84.5,4.5v106.7"
                                    ></path>
                                  </g>
                                </svg>

                                <h3>
                                  Drop file to upload or
                                  <a href="javascript:void(0);"
                                    ><span>browse.</span></a
                                  >
                                </h3>
                              </div>
                            </div>
                            <div
                              v-if="product.images.length"
                              class="file-upload-content d-flex"
                            >
                              <div
                                class="row upload-preview-wrapper no-gutters w-100"
                              >
                                <div
                                  v-for="(img, i) in product.images"
                                  :key="i"
                                  class="col-md-6 col-lg-6 col-xl-4"
                                >
                                  <div
                                    v-if="img === 'loading'"
                                    class="multi-upload"
                                  >
                                    <i
                                      class="fa fa-3x fa-circle-o-notch fa-spin"
                                    ></i>
                                  </div>
                                  <div v-else class="upload-preview">
                                    <img
                                      class="file-upload-image"
                                      :src="img | imgUrl"
                                      alt="your image"
                                    />
                                    <div class="preview-action">
                                      <a
                                        href="javascript:void(0);"
                                        @click="$refs.productImageInput.click()"
                                      >
                                        <EditIcon
                                          :is-active-orange="false"
                                          class="white"
                                        />
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        @click="removeImage(img)"
                                      >
                                        <svg
                                          id="Layer_1"
                                          class="delete-icon h-orange white"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          viewBox="0 0 15.3 18"
                                          xml:space="preserve"
                                        >
                                          <g
                                            id="Group_4351"
                                            transform="translate(-443.472 -147.331)"
                                          >
                                            <path
                                              id="Path_3410"
                                              class="fill-color"
                                              d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                                            ></path>
                                            <path
                                              id="Path_3411"
                                              class="fill-color"
                                              d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                                            ></path>
                                          </g>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  v-if="product.images.length < maxImages"
                                  class="col-md-6 col-lg-6 col-xl-4"
                                >
                                  <div
                                    class="upload-more"
                                    :class="{ dragEnter }"
                                    style="
                                      text-align: center;
                                      font-size: 0.8em;
                                      margin-bottom: 4px;
                                    "
                                    @click="$refs.productImageInput.click()"
                                  >
                                    Drag and drop <br />
                                    or <br />
                                    click to upload
                                  </div>
                                </div>
                              </div>
                            </div>
                          </file-drag-and-drop>
                        </div>
                      </div>
                      <div
                        v-if="$_auth().user.lead.isSuperAdmin"
                        class="form-group"
                      >
                        <a
                          href="javascript:;"
                          class="btn btn-orange btn-icon"
                          @click="newVariant()"
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
                          <span>Add Variant</span></a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="$_auth().user.lead.isSuperAdmin" class="tfooter">
                  <div class="row xs-gutters">
                    <div class="col-6">
                      <button
                        class="btn btn-block"
                        type="button"
                        :disabled="loading"
                        @click="submit()"
                      >
                        <i
                          v-if="loading"
                          class="fa fa-circle-o-notch fa-spin"
                        ></i>
                        <span>{{
                          edit ? 'Update Product' : 'Add Product'
                        }}</span>
                      </button>
                    </div>
                    <div class="col-5">
                      <button
                        class="btn btn-gray btn-block"
                        type="button"
                        @click="reset()"
                      >
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!-- edit variant card -->
          <transition name="fade">
            <div v-if="variantAction" class="workspace-setting-right">
              <div
                class="general-settings-box customscrollbar"
                data-select2-id="37"
              >
                <div class="row">
                  <div class="col-md-12">
                    <div class="media sc_media mb1">
                      <div class="media-body align-self-center">
                        <h5>
                          {{ variantAction === 'Add' ? 'Add New' : 'Update' }}
                          Variant
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group required">
                      <label class="control-label">Select Variant</label>
                      <Select2
                        v-if="variantList.length"
                        :options="variantList"
                        :value="
                          (customFieldData &&
                            customFieldData.product_variants_types_id) ||
                          (customFieldData && customFieldData.id)
                        "
                        :disabled="
                          customFieldData &&
                          customFieldData.product_variants_types_id &&
                          true
                        "
                        custom-event
                        @changeSelect2="getFieldsByVariantId"
                      />
                    </div>
                  </div>
                  <!-- Option render based on variant selection -->
                </div>
                <div v-if="variantListFields.length" class="row">
                  <div
                    v-for="(field, index) in variantListFields"
                    :key="index"
                    class="col-md-12"
                  >
                    <div class="form-group required mb-0">
                      <label class="control-label">{{ field.label }}</label>
                    </div>
                    <!-- Upload start -->
                    <div
                      v-if="field.type === 'upload' && field.attachmentData"
                      class="row xs-gutters"
                    >
                      <div
                        v-for="(images, i_index) in field.attachmentData"
                        :key="i_index"
                        class="col-md-4"
                      >
                        <input
                          :ref="field.type + i_index"
                          class="file-upload-input"
                          style="pointer-events: none"
                          type="file"
                          accept="image/*,application/pdf"
                          @change="addOptionImage($event, field, i_index)"
                        />
                        <div v-if="images.image" class="form-group">
                          <div class="multi-upload uploaded">
                            <div
                              v-if="checkBase64StringIsPdf(images.image)"
                              class="r85"
                            >
                              <div class="icon">
                                <a :href="images.image">
                                  <img
                                    :src="require('~/assets/img/file/pdf.svg')"
                                    class="img-responsive"
                                  />
                                </a>
                              </div>
                            </div>
                            <div v-else class="box image-preview p0">
                              <div class="r85">
                                <img
                                  :src="images.image"
                                  class="img-responsive"
                                />
                              </div>
                            </div>
                            <div class="preview-action">
                              <a
                                v-tooltip="'Edit Variant Image'"
                                data-toggle="tooltip"
                                @click="$refs[field.type + i_index][0].click()"
                              >
                                <svg
                                  id="Layer_1"
                                  class="edit-icon h-orange white"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 18 18"
                                  xml:space="preserve"
                                  aria-describedby="tooltip648533"
                                >
                                  <g
                                    id="Group_4350"
                                    transform="translate(-397.961 -147.331)"
                                  >
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
                              <a
                                v-tooltip="'Delete Variant Image'"
                                data-toggle="tooltip"
                                @click="removeRoow(field, i_index)"
                              >
                                <svg
                                  id="Layer_1"
                                  class="delete-icon h-orange white"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 15.3 18"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="Group_4351"
                                    transform="translate(-443.472 -147.331)"
                                  >
                                    <path
                                      id="Path_3410"
                                      class="fill-color"
                                      d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                                    ></path>
                                    <path
                                      id="Path_3411"
                                      class="fill-color"
                                      d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                                    ></path>
                                  </g>
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div>
                            <div class="form-group mt-2 mb-0">
                              <input
                                v-model="images.text"
                                type="text"
                                name="first-name"
                                class="form-control"
                                placeholder="Option Name"
                              />
                              <div
                                v-if="$v.customFieldData.$error"
                                class="input-error"
                              >
                                <div
                                  v-if="
                                    $v.customFieldData.custom_fields
                                      ? $v.customFieldData.custom_fields.fields
                                          .$each[index].attachmentData.$each[
                                          i_index
                                        ].text.$invalid
                                      : $v.customFieldData
                                          .variant_custom_field_set.$each[index]
                                          .attachmentData.$each[i_index].text
                                          .$invalid
                                  "
                                >
                                  Field is required
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- upload -->
                        <div v-else class="form-group">
                          <div class="multi-upload r85">
                            <svg
                              id="Layer_1"
                              class="upload-icon blue"
                              style="height: 20px"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                              @click="$refs[field.type + i_index][0].click()"
                            >
                              <g
                                id="Group_4436"
                                transform="translate(-375.358 -797.334)"
                              >
                                <path
                                  id="Path_3552"
                                  class="fill-color"
                                  d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                                ></path>
                                <g id="Group_4435">
                                  <path
                                    id="Path_3553"
                                    class="fill-color"
                                    d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                                  ></path>
                                  <path
                                    id="Path_3554"
                                    class="fill-color"
                                    d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>

                          <div class="form-group mt-2 mb-0">
                            <div
                              v-if="$v.customFieldData.$error"
                              class="input-error"
                            >
                              <div
                                v-if="
                                  $v.customFieldData.custom_fields
                                    ? $v.customFieldData.custom_fields.fields
                                        .$each[index].$invalid
                                    : $v.customFieldData
                                        .variant_custom_field_set.$each[index]
                                        .$invalid
                                "
                              >
                                Field is required
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- plus icon -->
                      <div class="col-md-4">
                        <div class="form-group">
                          <div class="multi-upload r85">
                            <svg
                              id="Layer_1"
                              class="plus-icon"
                              style="height: 20px"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                              @click="addRow(field)"
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-else-if="
                        field.type === 'upload' && !field.attachmentData
                      "
                      class="row xs-gutters"
                    >
                      <div class="col-md-4">
                        <div class="form-group">
                          <div class="multi-upload r85">
                            <svg
                              id="Layer_1"
                              class="plus-icon"
                              style="height: 20px"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                              @click="addRow(field)"
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Upload end -->
                    <!-- single-drop start -->
                    <div
                      v-else-if="field.type === 'single_dropdown'"
                      class="col-md-12"
                    >
                      <div class="row xs-gutters align-items-center">
                        <div class="col-md-11">
                          <div class="form-group">
                            <Select2
                              v-model="field.data"
                              :options="field.seedValue"
                            />
                            <div
                              v-if="$v.customFieldData.$error"
                              class="input-error"
                            >
                              <div
                                v-if="
                                  $v.customFieldData.custom_fields
                                    ? $v.customFieldData.custom_fields.fields
                                        .$each[index].$invalid
                                    : $v.customFieldData
                                        .variant_custom_field_set.$each[index]
                                        .$invalid
                                "
                              >
                                Field is required
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- single drop end -->
                    <!-- multi drop start -->
                    <div
                      v-else-if="field.type === 'multiple_dropdown'"
                      class="col-md-12"
                    >
                      <div class="row xs-gutters align-items-center">
                        <div class="col-md-11">
                          <div class="form-group">
                            <Select2MultipleWithoutImage
                              v-model="field.data"
                              :options="field.seedValue"
                              custom-event
                              @changeFollower="setMultiValue($event, field)"
                            />
                            <div
                              v-if="$v.customFieldData.$error"
                              class="input-error"
                            >
                              <div
                                v-if="
                                  $v.customFieldData.custom_fields
                                    ? $v.customFieldData.custom_fields.fields
                                        .$each[index].$invalid
                                    : $v.customFieldData
                                        .variant_custom_field_set.$each[index]
                                        .$invalid
                                "
                              >
                                Field is required
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- multi drop end -->
                    <!-- Text field start-->
                    <div v-else-if="field.type === 'text'" class="col-md-12">
                      <div class="row xs-gutters align-items-center">
                        <div class="col-md-11">
                          <div class="form-group">
                            <input
                              v-model="field.data"
                              type="text"
                              name=""
                              class="form-control"
                              required=""
                            />
                            <div
                              v-if="$v.customFieldData.$error"
                              class="input-error"
                            >
                              <div
                                v-if="
                                  $v.customFieldData.custom_fields
                                    ? $v.customFieldData.custom_fields.fields
                                        .$each[index].$invalid
                                    : $v.customFieldData
                                        .variant_custom_field_set.$each[index]
                                        .$invalid
                                "
                              >
                                Field is required
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Text field end-->
                    <div
                      v-else-if="field.type === 'textarea'"
                      class="col-md-12"
                    >
                      <div class="row xs-gutters align-items-center">
                        <div class="col-md-11">
                          <div class="form-group">
                            <textarea
                              v-model="field.data"
                              cols="4"
                              rows="4"
                              class="form-control"
                              required=""
                            ></textarea>
                            <div
                              v-if="$v.customFieldData.$error"
                              class="input-error"
                            >
                              <div
                                v-if="
                                  $v.customFieldData.custom_fields
                                    ? $v.customFieldData.custom_fields.fields
                                        .$each[index].$invalid
                                    : $v.customFieldData
                                        .variant_custom_field_set.$each[index]
                                        .$invalid
                                "
                              >
                                Field is required
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="field.type === 'date'" class="col-md-12">
                      <div class="row xs-gutters align-items-center">
                        <div class="col-md-11">
                          <div class="form-group">
                            <DatePicker
                              human
                              :placeholder="'Date'"
                              :start-date="field.data"
                              :class-obj="'datepicker form-control'"
                              :custom-event="true"
                              @dateChanged="updateDate(...arguments, field)"
                            />
                            <div
                              v-if="$v.customFieldData.$error"
                              class="input-error"
                            >
                              <div
                                v-if="
                                  $v.customFieldData.custom_fields
                                    ? $v.customFieldData.custom_fields.fields
                                        .$each[index].$invalid
                                    : $v.customFieldData
                                        .variant_custom_field_set.$each[index]
                                        .$invalid
                                "
                              >
                                Field is required
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row xs-gutters mt10">
                <div class="col-6">
                  <button
                    class="btn btn-block"
                    type="button"
                    @click="
                      variantAction === 'Add' ? saveVariant() : updateVariant()
                    "
                  >
                    <span>
                      {{ variantAction === 'Add' ? 'Save' : 'Update' }}
                    </span>
                  </button>
                </div>
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-gray btn-block"
                    @click="variantAction = false"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </transition>
          <!-- end of edit variant card -->
          <!-- product variant card -->
          <div
            v-if="variants.length"
            class="workspace-setting-right list-variant"
          >
            <div class="general-settings-box customscrollbar">
              <div class="row">
                <div class="col-md-12">
                  <div
                    v-for="v in variants"
                    :key="v.product_variants_types_id"
                    class="box bg-gray-light"
                  >
                    <h4>{{ v.variant_name | Capitalize }}</h4>
                    <a
                      href="javascript:void(0);"
                      class="edit-variant"
                      @click="editVariant(v)"
                    >
                      <svg
                        id="Layer_1"
                        v-tooltip="'Edit Variant'"
                        class="edit-icon h-orange"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_4350"
                          transform="translate(-397.961 -147.331)"
                        >
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
                    <div class="row xs-gutters">
                      <div
                        v-for="field in v.variant_custom_field_set"
                        :key="field.type"
                        :class="[
                          field.type === 'textarea' || field.type === 'upload'
                            ? 'col-md-12'
                            : 'col-md-6',
                        ]"
                      >
                        <div
                          v-if="field.type === 'multiple_dropdown'"
                          class="form-group"
                        >
                          <label class="control-label">{{ field.label }}</label>
                          <strong
                            v-for="fieldData in field.data"
                            :key="fieldData"
                            >{{
                              field.seedValue &&
                              field.seedValue.find((e) => e.id === fieldData)
                                .text
                            }}</strong
                          >
                        </div>
                        <div
                          v-else-if="field.type === 'single_dropdown'"
                          class="form-group"
                        >
                          <label class="control-label">{{ field.label }}</label>
                          <strong>{{
                            field.seedValue &&
                            field.seedValue.find((e) => e.id === field.data)
                              .text
                          }}</strong>
                        </div>
                        <div
                          v-else-if="field.type === 'upload'"
                          class="form-group"
                        >
                          <label class="control-label">{{
                            field.label | Capitalize
                          }}</label>
                          <div class="form-group mb0">
                            <div class="row xs-gutters">
                              <div
                                v-for="(img, i_index) in field.attachmentData"
                                :key="i_index"
                                class="col-md-4"
                              >
                                <div
                                  v-if="checkBase64StringIsPdf(img.image)"
                                  class="box image-preview p0"
                                >
                                  <div class="r85">
                                    <div class="icon">
                                      <a
                                        :href="img.image"
                                        :download="'attachment_' + i_index"
                                      >
                                        <img
                                          :src="
                                            require('~/assets/img/file/pdf.svg')
                                          "
                                          class="img-responsive"
                                        />
                                        <span v-tooltip="img.text">{{
                                          img.text
                                        }}</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div v-else class="box image-preview p0">
                                  <div class="r85">
                                    <a
                                      id="single_image"
                                      :href="img.image"
                                      data-fancybox
                                    >
                                      <img
                                        :src="img.image"
                                        class="img-responsive"
                                      />
                                    </a>
                                  </div>
                                  <span v-tooltip="img.text">{{
                                    img.text
                                  }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="form-group">
                          <label class="control-label">{{ field.label }}</label>
                          <strong>{{ field.data || '-' }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end Product variant list -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import draggable from 'vuedraggable'
import {
  required,
  minLength,
  numeric,
  alphaNum,
} from 'vuelidate/lib/validators'
// import _ from 'lodash'
import leadMixin from '~/mixins/lead.js'
import routeMixins from '~/mixins/routeMixins'
import TextField from '~/components/lead/TextField.vue'
import Select2 from '~/components/lead/Select2.vue'
import Select2MultipleWithoutImage from '~/components/plugins/Select2MultipleWithoutImage.vue'
// import Select from '~/components/lead/Select.vue'
import FileDragAndDrop from '~/components/lead/FileDragAndDrop.vue'
import SelectAndAdd from '~/components/lead/SelectAndAdd'
import { clone, _debounce, slugify } from '~/utils/helper'
import DatePicker from '~/components/plugins/DatePicker'
import navigationTab from '~/components/lead/navigation-tab'
import TagInput from '~/components/lead/TagInput'
// 0: {id: 0, field_name: "Select Field", text: "Select Field"}
// 1: {id: 6, field_name: "date", text: "Date"}
// 2: {id: 4, field_name: "multiple_dropdown", text: "Multiple Dropdown"}
// 3: {id: 3, field_name: "single_dropdown", text: "Single Dropdown"}
// 4: {id: 1, field_name: "text", text: "Text"}
// 5: {id: 2, field_name: "textarea", text: "Textarea"}
// 6: {id: 5, field_name: "upload", text: "Upload"}
export default {
  components: {
    TextField,
    Select2,
    Select2MultipleWithoutImage,
    FileDragAndDrop,
    // draggable,
    SelectAndAdd,
    // Select,
    DatePicker,
    navigationTab,
    TagInput,
  },
  mixins: [leadMixin, routeMixins],
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      skuExist: null,
      productHaveSku: false,
      // variant: this.createVariant(),
      variants: [],
      file: null,
      editData: {},
      categories: [],
      product: this.createProduct(),
      variantAction: false,
      valid: true,
      maxImages: 1,
      loading: false,
      variantList: [],
      modelYearList: [],
      categoriesLoaded: false,
      variant_names: [],
      reRender: true,
      customFieldData: null,
      variant_image: null,
    }
  },
  computed: {
    checkFieldIncludeUpload() {
      if (this.variantAction === 'Update') {
        return (
          this.customFieldData &&
          this.customFieldData?.variant_custom_field_set.some(
            (e) => e.type === 'upload'
          )
        )
      } else {
        return (
          this.customFieldData &&
          this.customFieldData?.custom_fields?.fields.some(
            (e) => e.type === 'upload'
          )
        )
      }
    },
    enableVariantDrag() {
      return this.variants.every((v) => v.variant_id)
    },
    variantListFields() {
      if (
        this.customFieldData &&
        this.customFieldData?.product_variants_types_id
      ) {
        return this.customFieldData.variant_custom_field_set
      } else if (
        this.customFieldData &&
        this.customFieldData.custom_fields?.fields.length
      ) {
        return this.customFieldData?.custom_fields?.fields
      } else {
        return []
      }
    },
    checkBase64StringIsPdf() {
      return (str) => {
        // console.log(str.split(';')[0] === 'data:application/pdf')
        if (str && str.split(';')[0] === 'data:application/pdf') return true
        return false
      }
    },
  },
  watch: {
    productHaveSku(v, n) {
      if (!this.productHaveSku) this.product.sku = ''
    },
  },
  created() {
    this.loadCategoryList()
    this.loadVariantList()
    if (this.edit) {
      this.loadProduct()
    }
  },
  beforeDestroy() {
    document.body.onfocus = null
  },
  methods: {
    async getFieldsByVariantId({ id }) {
      // lm/common/get-custom-field-set-by-type
      const { data } = await this.$axios.$get(
        'lm/common/get-custom-field-set-by-type',
        {
          params: {
            variant_type_id: id,
          },
        }
      )
      this.customFieldData = data || []
    },
    checkSkuExist() {
      _debounce(() => {
        this.$axios
          .$post(`/lm/product/sku-exist`, {
            workspace_id: this.$route.params.workspace_id,
            sku: this.product.sku,
            product_id: this.$route.params.id ? this.$route.params.id : '',
          })
          .then(({ data: { is_exist } }) => {
            this.skuExist = is_exist
            if (!this.product.sku) {
              this.skuExist = null
            }
          })
          .catch((e) => {
            this.$toast.error(this.$getErrorMessage(e))
          })
      }, 500)
    },
    loadCategoryList() {
      this.$axios
        .$get(`lm/category/list`, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((response) => {
          this.categories = response.data
          this.categoriesLoaded = true
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    loadVariantList() {
      this.$axios
        .$get(`lm/common/get-product-variant-type`, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((response) => {
          this.variant_names = response.data.variant_type
          this.variantList = response.data.variant_type
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    loadProduct() {
      this.$axios
        .$post(
          `lm/product/view?url_workspace_id=${this.$route.params.workspace_id}`,
          {
            workspace_id: this.$route.params.workspace_id,
            product_id: this.$route.params.id,
          }
        )
        .then(({ data }) => {
          this.variants = data.product_variants.map((v) => {
            return {
              product_variants_types_id: v.product_variants_types_id,
              variant_options_id: v.id,
              product_id: v.product_id,
              workspace_id: this.$route.params.workspace_id,
              is_active: v.is_active,
              variant_name: v.variant_name,
              variant_custom_field_set: v.variant_custom_field_set,
              variant_display_options: v.variant_display_options,
            }
          })
          Object.assign(this.product, data)
          if (this.product.sku) {
            this.productHaveSku = true
          }
          delete this.product.product_images
          this.product.images = data.product_images.map(() => 'loading')

          this.product.product_id = data.id
          this.product.workspace_id = this.$route.params.workspace_id
          data.product_images.forEach((i, index) => {
            const config = { responseType: 'blob' }
            axios.get(i.display_file, config).then((response) => {
              this.product.images.splice(
                index,
                1,
                new File([response.data], i.display_file_name)
              )
            })
          })
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    editVariant(editVariantData) {
      this.customFieldData = clone(editVariantData)
      this.variantAction = 'Update'
    },
    newVariant() {
      this.$v.customFieldData.$reset()
      this.customFieldData = null
      this.variantAction = 'Add'
    },
    updateVariant() {
      this.$v.customFieldData.$touch()
      if (!this.$v.customFieldData.$invalid) {
        const i = this.variants.findIndex(
          (v) =>
            v.product_variants_types_id ===
            this.customFieldData.product_variants_types_id
        )
        if (this.customFieldData.variant_display_options.isDropdown) {
          this.customFieldData.variant_custom_field_set.forEach((e) => {
            if (e.isPrimaryOption) {
              this.customFieldData.variant_display_options.options =
                this.appendVariantOption(e)
            }
          })
        }
        this.variants.splice(i, 1, this.customFieldData)
        this.variantAction = false
        this.$v.customFieldData.$reset()
      }
    },
    saveVariant() {
      this.customFieldData && this.$v.customFieldData.$touch()
      if (!this.$v.customFieldData.$invalid && this.customFieldData) {
        if (
          this.variants.length &&
          this.variants.some(
            (e) => e.product_variants_types_id === this.customFieldData.id
          )
        ) {
          this.$toast.error('Variant already exist')
        } else {
          if (
            this.customFieldData.custom_fields.variantDisplayOptions.isDropdown
          ) {
            this.customFieldData.custom_fields.fields.forEach((e) => {
              if (e.isPrimaryOption) {
                this.customFieldData.custom_fields.variantDisplayOptions.options =
                  this.appendVariantOption(e)
              }
            })
          }
          const modified = {
            is_active: true,
            product_variants_types_id: this.customFieldData?.id,
            variant_name: this.customFieldData.type_name,
            variant_custom_field_set: this.customFieldData.custom_fields.fields,
            variant_display_options:
              this.customFieldData.custom_fields.variantDisplayOptions,
          }
          if (this.edit) {
            Object.assign(modified, { variant_options_id: 0 })
            this.variants.length &&
              Object.assign(modified, {
                product_id: this.variants[0].product_id,
                workspace_id: this.$route.params.workspace_id,
              })
          }
          this.variants.push(modified)
          this.variantAction = null
          this.$v.customFieldData.$reset()
        }
      }
    },
    appendVariantOption(e) {
      let parsedText = []
      switch (e.type) {
        case 'upload':
          parsedText = e.attachmentData.map((img) => {
            return {
              text: img.text,
              name: img.text,
              id: slugify(img.text),
            }
          })
          break
        case 'multiple_dropdown':
          parsedText = e.data.map((f) => {
            return {
              text: e.seedValue.find((seed) => seed.id === f).text,
              name: e.seedValue.find((seed) => seed.id === f).text,
              id: f,
            }
          })
          break
        case 'single_dropdown':
          parsedText = [
            {
              text: e.seedValue.find((seed) => seed.id === e.data).text,
              name: e.seedValue.find((seed) => seed.id === e.data).text,
              id: e.data,
            },
          ]
          break
        default:
          break
      }
      return parsedText
    },
    submit() {
      this.$v.product.$touch()
      const url = this.edit ? 'update' : 'add'
      this.product.images = this.product.images.filter((f) => f instanceof File)

      if (this.productHaveSku && this.skuExist) {
        return
      } else if (this.$v.product.$invalid) {
        return
      }
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: this.edit
          ? 'Updating the product, please wait...'
          : 'Creating product, please wait...',
      })
      this.loading = true
      this.$axios
        .$post(`lm/product/${url}`, this.createFormData(this.product), {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((response) => {
          if (this.variants.length) {
            const data = {
              workspace_id: this.$route.params.workspace_id,
              product_id: response.data.product_id,
              variant_options: this.variants,
            }
            this.$axios
              .$post(`lm/product/variant/${url}`, data)
              .then(() => {
                this.loading = false
                this.product = this.createProduct()
                this.variants = []
                this.customFieldData = null
                this.$v.product.$reset()
                this.$v.customFieldData.$reset()
                this.$toast.success(response.message)
                this.$router.push({
                  name: 'workspace_id-workspace-settings-lm-product-manage-product-list',
                  params: { workspace_id: this.$route.params.workspace_id },
                })
              })
              .catch((e) => {
                this.loading = false
                this.$toast.error(this.$getErrorMessage(e))
              })
              .finally(() => {
                this.$store.dispatch('loading/setOverlay', {
                  isLoading: false,
                })
              })
          } else {
            this.loading = false
            this.product = this.createProduct()
            this.variants = []
            this.customFieldData = null
            this.$v.product.$reset()
            this.$v.customFieldData.$reset()
            this.$toast.success(response.message)
            this.$router.push({
              name: 'workspace_id-workspace-settings-lm-product-manage-product-list',
              params: { workspace_id: this.$route.params.workspace_id },
            })
          }
        })
        .catch((e) => {
          this.loading = false
          this.$toast.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    imgUrl(v) {
      if (v instanceof File) return URL.createObjectURL(v)
      return v
    },
    createFormData(obj) {
      // test comment
      const formData = new FormData()
      Object.keys(obj).forEach((e) => {
        if (typeof obj[e] !== 'object' && e !== 'file') {
          if (obj[e]) formData.append(e, obj[e])
        } else if (obj[e] instanceof File) {
          formData.append(e, obj[e])
        } else if (Array.isArray(obj[e])) {
          if (obj[e].length > 0) {
            obj[e].forEach((f) => {
              if (typeof f === 'object' && !(f instanceof File)) {
                Object.keys(f).forEach((k) => {
                  if (f[k]) formData.append(e + '[][' + k + ']', f[k])
                })
              } else if (f instanceof File) {
                formData.append(e + '[]', f)
              } else {
                formData.append(e + '[]', f)
              }
            })
          } else {
            formData.append(e + '[]', [])
          }
        }
      })
      return formData
    },
    addImage(e) {
      if (e.target.files.length) {
        this.product.images = [e.target.files[0]]
      }
      this.$refs.productImageInput.value = ''
    },
    removeImage(img) {
      const indx = this.product.images.findIndex((i) => i === img)
      this.product.images.splice(indx, 1)
    },
    setMultiValue(e, field) {
      if (!field.data) {
        field.data = []
      }
      field.data = e
    },
    createProduct() {
      return {
        workspace_id: this.$route.params.workspace_id,
        category_id: '',
        name: '',
        sku: '',
        model: '',
        price: '',
        descrption: '',
        is_active: true,
        product_alias: [],
        images: [],
      }
    },

    addRow(field) {
      if (!field.attachmentData) {
        field.attachmentData = []
        field.attachmentData.push({ image: null, text: '' })
      }
      this.$v.customFieldData.$touch()
      if (!this.$v.customFieldData.$invalid) {
        field.attachmentData.push({ image: null, text: '' })
      }
    },
    removeRoow(field, index) {
      field.attachmentData.splice(index, 1)
    },
    addOptionImage(e, field, index) {
      try {
        if (e.target.files.length) {
          const reader = new FileReader()
          reader.onloadend = function () {
            if (e.target.files.length) {
              field.attachmentData[index].image = reader.result
              field.data = 'xxx'
            }
          }
          reader.readAsDataURL(e.target.files[0])
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateDate(e, field) {
      field.data = e.startDate.split(' ')[0]
    },
    reset() {
      const f = confirm('Do you really want to cancel?')
      if (f) {
        this.product = this.createProduct()
        this.$router.push({
          name: 'workspace_id-workspace-settings-lm-product-manage-product-list',
          params: { workspace_id: this.$route.params.workspace_id },
        })
      }
    },
  },
  validations() {
    const fields = {
      product: {
        category_id: { required },
        name: { required },
        price: { numeric },
        images: minLength(1),
      },
      validationGroup: ['product.nested'],
    }
    if (this.productHaveSku) {
      const sku = { sku: { required, isSku: alphaNum } }
      Object.assign(fields.product, sku)
    }

    if (this.variantAction === 'Update') {
      if (this.checkFieldIncludeUpload) {
        const updateuploadVariant = {
          customFieldData: {
            variant_custom_field_set: {
              $each: {
                data: { required },
                attachmentData: {
                  $each: {
                    image: { required },
                    text: { required },
                  },
                },
              },
            },
          },
        }
        Object.assign(fields, updateuploadVariant)
      } else {
        const updateVariant = {
          customFieldData: {
            variant_custom_field_set: {
              $each: {
                data: { required },
              },
            },
          },
        }
        Object.assign(fields, updateVariant)
      }
    } else if (this.checkFieldIncludeUpload) {
      const adduploadVariant = {
        customFieldData: {
          custom_fields: {
            fields: {
              $each: {
                data: { required },
                attachmentData: {
                  $each: {
                    image: { required },
                    text: { required },
                  },
                },
              },
            },
          },
        },
      }
      Object.assign(fields, adduploadVariant)
    } else {
      const addVariant = {
        customFieldData: {
          custom_fields: {
            fields: {
              $each: {
                data: { required },
              },
            },
          },
        },
      }
      Object.assign(fields, addVariant)
    }
    return fields
  },
}
</script>
<style scoped>
/* .dragEnter {
  border-color: blue !important;
}
.multi-upload.empty:hover {
  background: rgba(0, 0, 0, 0.8);
} */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.move {
  cursor: move;
}
.fade-item {
  display: inline-block;
  margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0.9);
  /* transform: translateX(30px); */
}
</style>

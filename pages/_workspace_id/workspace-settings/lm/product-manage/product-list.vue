<template>
  <div
    class="w-100 h-100 d-flex productList lead-dashboard"
    style="position: relative"
  >
    <div class="general-settings-right h-100 w-100">
      <div class="general-settings-title fixed-btn-right">
        <navigationTab :active-routes="productRoutes" />
        <div class="right-side">
          <div class="table-filter sep-list">
            <ul>
              <li v-if="$auth.user.allow_product_import === '1'">
                <a
                  v-tooltip="`Import from Spreadsheet/CSV`"
                  data-toggle="modal"
                  data-target="#import-modal"
                >
                  <svg
                    id="Layer_1"
                    class="import-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4487" transform="translate(-1206 -320)">
                      <rect
                        id="Rectangle_3025"
                        x="1206"
                        y="320"
                        class="fill-hide"
                        width="18"
                        height="18"
                      ></rect>
                      <g id="Group_4353" transform="translate(552.445 174.823)">
                        <path
                          id="Path_3414"
                          class="fill-color"
                          d="M660.2,162.5c-1.3,0-2.3-1-2.3-2.3v-3.4c0-0.4,0.3-0.8,0.7-0.8c0.4,0,0.8,0.3,0.8,0.7c0,0,0,0,0,0.1v3.4c0,0.4,0.3,0.8,0.8,0.8h9.1c0.4,0,0.8-0.3,0.8-0.8v-12.1c0-0.4-0.3-0.8-0.8-0.8h-9.1c-0.4,0-0.8,0.3-0.8,0.8v3c0,0.4-0.3,0.8-0.7,0.8c-0.4,0-0.8-0.3-0.8-0.7c0,0,0,0,0-0.1v-3c0-1.3,1-2.3,2.3-2.3h9.1c1.3,0,2.3,1,2.3,2.3v12.1c0,1.3-1,2.3-2.3,2.3H660.2z"
                        ></path>
                        <path
                          id="Path_3415"
                          class="fill-color"
                          d="M662.9,158.3c-0.4,0-0.8-0.3-0.8-0.8c0-0.2,0.1-0.4,0.2-0.5l2.1-2.1h-10.2c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h10.2l-2.1-2.1c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l0,0l3.4,3.4c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.4,3.4C663.3,158.2,663.2,158.3,662.9,158.3z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Import
                </a>
              </li>
              <!-- <li>
                <a
                  href="javascript:void(0);"
                  data-toggle="tooltip"
                  data-original-title="Export to Spreadsheet/CSV"
                >
                  <svg
                    id="Layer_1"
                    class="export-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4488" transform="translate(-1256 -320)">
                      <rect
                        id="Rectangle_3026"
                        x="1256"
                        y="320"
                        class="fill-hide"
                        width="18"
                        height="18"
                      ></rect>
                      <g id="Group_4354" transform="translate(557.089 174.823)">
                        <path
                          id="Path_3416"
                          class="fill-color"
                          d="M708.2,162.5c1.3,0,2.3-1,2.3-2.3v-3.4c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v3.4c0,0.4-0.3,0.8-0.7,0.8h-7c-0.4,0-0.7-0.3-0.7-0.8v-12.1c0-0.4,0.3-0.8,0.7-0.8h7c0.4,0,0.7,0.3,0.7,0.8v3c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-3c0-1.3-1-2.3-2.3-2.3h-7c-1.3,0-2.3,1-2.3,2.3v12.1c0,1.3,1,2.3,2.3,2.3H708.2z"
                        ></path>
                        <path
                          id="Path_3417"
                          class="fill-color"
                          d="M712.8,158.3c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l2-2.1h-10.1c-0.4,0-0.7-0.4-0.7-0.8c0-0.4,0.3-0.7,0.7-0.7h10.1l-2-2.1c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0c0.3-0.3,0.8-0.3,1,0c0,0,0,0,0,0l3.3,3.4c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.3,3.4C713.2,158.2,713,158.3,712.8,158.3z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Export
                </a>
              </li> -->
              <li>
                <nuxt-link
                  v-if="$_auth().user.lead.isSuperAdmin"
                  class="btn btn-icon"
                  :to="{
                    name: 'workspace_id-workspace-settings-lm-products-add',
                    params: {
                      workspace_id: workspace_id,
                    },
                  }"
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
                  Add New Product</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="workspace-settings">
        <div class="common-box bg-gray h-100">
          <div class="table-list-view no-bottom-table-view">
            <ul class="thead">
              <li>
                <div
                  class="name-email sorting sortarrow flex46"
                  :class="[
                    sortData === 'name' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <div class="blank-space30"></div>
                  <span @click="toggleSortData('name')">Product Name</span>
                </div>
                <div
                  class="sorting sortarrow flex16"
                  :class="[
                    sortData === 'category_name' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="toggleSortData('category_name')">Category</span>
                </div>
                <div
                  class="sorting sortarrow flex16"
                  :class="[
                    sortData === 'sku' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="toggleSortData('sku')">SKU</span>
                </div>
                <div
                  class="sorting sortarrow flex12"
                  :class="[
                    sortData === 'is_active' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="toggleSortData('is_active')">Status</span>
                </div>
                <div
                  v-if="$_auth().user.lead.isSuperAdmin"
                  class="sorting flex10"
                >
                  <span>Action</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="(product, index) in productList" :key="product.id">
                  <div class="name-email tb-column flex46">
                    <div class="dealer-num">{{ index + 1 }}</div>
                    <div class="media">
                      <div class="media-left">
                        <div
                          :title="product.name"
                          :class="
                            product.product_image
                              ? 'profile-bg'
                              : 'profile-icon'
                          "
                          :style="{
                            'background-image': `url('${
                              product.product_image
                                ? product.product_image
                                : require('@/assets/img/icon/building.svg')
                            }')`,
                          }"
                        ></div>
                      </div>
                      <div class="media-body">
                        <div class="top-column">
                          <label>{{ product.name ? product.name : '-' }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tb-column flex16">
                    <div class="top-column">
                      {{ product.category_name ? product.category_name : '-' }}
                    </div>
                  </div>
                  <div class="tb-column flex16">
                    <div class="top-column">
                      {{ product.sku ? product.sku : '-' }}
                    </div>
                  </div>
                  <div class="tb-column flex12 text-center">
                    <div class="top-column img-text">
                      {{ product.is_active === true ? 'Active' : 'In-active' }}
                    </div>
                  </div>
                  <div class="hv-img tb-column flex10">
                    <ul v-if="$_auth().user.lead.isSuperAdmin" class="action">
                      <li>
                        <nuxt-link
                          v-tooltip="'Edit Product'"
                          class="nav-link"
                          :to="{
                            name: 'workspace_id-workspace-settings-lm-products-id-edit',
                            params: {
                              workspace_id: workspace_id,
                              id: product.id,
                            },
                          }"
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
                            aria-describedby="tooltip13562"
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
                        </nuxt-link>
                      </li>
                      <li
                        v-if="
                          $_auth().user.lead.isSuperAdmin &&
                          $auth.user.allow_deleting_products === '1'
                        "
                      >
                        <a
                          href="javascript:void(0);"
                          @click="setDeletedProduct(product.name, product.id)"
                        >
                          <svg
                            id="Layer_1"
                            class="delete-icon h-orange"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete Product"
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
                      </li>
                    </ul>
                  </div>
                </li>

                <div v-if="noProduct" class="no-data-found">
                  <div class="inner w-100">
                    <svg
                      id="Layer_1"
                      class="no-record-icon darkgray"
                      style="height: 150px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 131.3 156.8"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4457"
                        transform="translate(-190.348 -177.624)"
                      >
                        <path
                          id="Path_3564"
                          class="fill-color"
                          d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                        />
                        <path
                          id="Path_3565"
                          class="fill-color"
                          d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                        />
                      </g>
                    </svg>
                    <p>No Data Found</p>
                  </div>
                </div>
                <client-only>
                  <infinite-loading
                    :identifier="infiniteId"
                    @infinite="infiniteHandler"
                  >
                    <div slot="spinner">
                      <ContentLoader
                        :speed="1"
                        :animate="true"
                        :width="400"
                        :height="1000"
                      >
                        <rect
                          v-for="index in 10"
                          :key="index"
                          x="0"
                          :y="contentLoaderData[index]"
                          rx="0"
                          ry="0"
                          width="400"
                          height="13"
                        />
                      </ContentLoader>
                    </div>
                    <div slot="no-more"></div>
                    <div slot="no-results">
                      <div v-if="defaultNoData" class="no-data-found">
                        <div class="inner w-100">
                          <svg
                            id="Layer_1"
                            class="no-record-icon darkgray"
                            style="height: 150px"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 131.3 156.8"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4457"
                              transform="translate(-190.348 -177.624)"
                            >
                              <path
                                id="Path_3564"
                                class="fill-color"
                                d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                              />
                              <path
                                id="Path_3565"
                                class="fill-color"
                                d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                              />
                            </g>
                          </svg>
                          <p>You haven't added any Product yet!</p>
                          <nuxt-link
                            class="btn btn-icon"
                            :to="{
                              name: 'workspace_id-workspace-settings-lm-products-add',
                              params: { workspace_id: workspace_id },
                            }"
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
                            Add New</nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                  </infinite-loading>
                </client-only>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-toggle-div">
      <div class="rightClickBox">
        <div class="common-box-header">
          <h2 class="title sideShow">
            <a href="javascript:void(0);" class="RightShrink">
              <svg
                id="Layer_1"
                class="sidebar-filter-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 25 25"
                xml:space="preserve"
              >
                <g id="Group_5341" transform="translate(-641 -17422)">
                  <path
                    id="Rectangle_3372"
                    class="fill-darkgray"
                    d="M645,17422h17c2.2,0,4,1.8,4,4v17c0,2.2-1.8,4-4,4h-17c-2.2,0-4-1.8-4-4v-17C641,17423.8,642.8,17422,645,17422z"
                  ></path>
                  <path
                    id="Icon_awesome-filter"
                    class="fill-color"
                    d="M658.7,17428.8h-10.4c-0.3,0-0.5,0.2-0.5,0.5c0,0.1,0.1,0.3,0.2,0.4l4.1,4.1v4.6c0,0.2,0.1,0.3,0.2,0.4l1.8,1.2c0.2,0.2,0.6,0.1,0.7-0.1c0.1-0.1,0.1-0.2,0.1-0.3v-5.8l4.1-4.1c0.2-0.2,0.2-0.5,0-0.8C659,17428.8,658.8,17428.8,658.7,17428.8z"
                  ></path>
                </g>
              </svg>

              <span>Filter</span>
            </a>
          </h2>
          <h2 class="title sideHide">
            <a href="javascript:void(0);" class="RightShrink">
              <svg
                id="Layer_1"
                class="sidebar-filter-invert-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 25 25"
                xml:space="preserve"
              >
                <g id="Group_5340" transform="translate(-590 -17422)">
                  <path
                    id="Rectangle_3370"
                    class="fill-white"
                    d="M594,17422h17c2.2,0,4,1.8,4,4v17c0,2.2-1.8,4-4,4h-17c-2.2,0-4-1.8-4-4v-17C590,17423.8,591.8,17422,594,17422z"
                  ></path>
                  <path
                    id="Icon_awesome-filter"
                    class="fill-color"
                    d="M607.7,17428.8h-10.4c-0.3,0-0.5,0.2-0.5,0.5c0,0.1,0.1,0.3,0.2,0.4l4.1,4.1v4.6c0,0.2,0.1,0.3,0.2,0.4l1.8,1.2c0.2,0.2,0.6,0.1,0.7-0.1c0.1-0.1,0.1-0.2,0.1-0.3v-5.8l4.1-4.1c0.2-0.2,0.2-0.5,0-0.8C608,17428.8,607.8,17428.8,607.7,17428.8z"
                  ></path>
                </g>
              </svg>

              <span>Filter</span>
            </a>
          </h2>
        </div>
        <div class="tabs-view">
          <ul class="nav" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#filters"
                >Filters</a
              >
            </li>
          </ul>
          <div class="tab-content">
            <div id="filters" class="tab-pane active">
              <div class="data-filter customscrollbar">
                <div class="filter-box">
                  <h3 class="title">Status</h3>

                  <ul class="filter-list">
                    <li>
                      <label class="check-label"
                        >All
                        <input
                          v-model="isActive"
                          name="filter"
                          value="all"
                          type="radio"
                          @change="filterProduct()"
                        />
                        <span class="check-span"></span>
                      </label>
                    </li>
                    <li>
                      <label class="check-label"
                        >Active
                        <input
                          v-model="isActive"
                          name="filter"
                          value="true"
                          type="radio"
                          @change="filterProduct()"
                        />
                        <span class="check-span"></span>
                      </label>
                    </li>

                    <li>
                      <label class="check-label"
                        >In-Active
                        <input
                          v-model="isActive"
                          name="filter"
                          value="false"
                          type="radio"
                          @change="filterProduct()"
                        />
                        <span class="check-span"></span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="filter-box">
                  <h3 class="title">Products</h3>

                  <div class="form-group m0">
                    <input
                      v-model="productName"
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="Type Product Name"
                      @keyup="changeProductName()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="import-modal" class="modal fade static-modal">
      <div
        class="modal-dialog maxwidth modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Import Products</h5>
            <button type="button" class="close" @click="checkImportIsEmpty">
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
            <div class="box import-box mb2">
              <div class="col-sm-12">
                <div class="form-group">
                  <div id="import" name="import" class="file-input">
                    <input
                      ref="csvImport"
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      @change="importProductFileUpload($event)"
                    />
                    <span class="btn">Choose File</span>
                    <span class="label">{{
                      importFileName ? importFileName : 'No file selected'
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-grou mb0">
                  <button
                    href="javascript:void(0);"
                    class="btn"
                    :disabled="!importFile"
                    @click="parseFile"
                  >
                    Analyze & Preview File
                  </button>
                  <button
                    class="btn btn-gray"
                    type="button"
                    @click="downloadProductImportSampleFile"
                  >
                    Download Sample File
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="!parsing && headers.length"
              class="d-flex align-items-center mb1"
            >
              <div class="justify-content-start w-50">
                <h4 class="mb0">Preview of Import file</h4>
              </div>
              <div class="d-flex justify-content-end w-50">
                <button
                  href="javascript:void(0);"
                  class="btn"
                  :disabled="!importPayload.length"
                  @click="importHandler"
                >
                  Import
                </button>
              </div>
            </div>
            <div v-if="isInvalidImport" class="search-result mb1">
              <div class="alert alert-danger">
                Please select required fields
                <strong>{{ getRequiredFields }}</strong
                >.
              </div>
            </div>
            <div
              v-if="!parsing && headers.length"
              class="import-sheetview table-responsive"
            >
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td class="mapping_column_0">
                      <svg
                        id="Layer_1"
                        class="media-assets-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 16 16"
                        xml:space="preserve"
                      >
                        <path
                          id="Path_24"
                          class="fill-color"
                          d="M0,16V4.6h1.8V2.3l1.9,0V0H16v11.4h-1.9l0,2.3h-1.9V16L0,16z M11.1,14.7V5.9H1.2v8.7H11.1zM13,12.3V3.7H3v1h9.3v7.7H13z M14.8,10V1.3H4.9v1l9.3,0l0,7.8L14.8,10z"
                        ></path>
                      </svg>
                    </td>
                    <td
                      v-for="(i, hindex) in headers"
                      :key="hindex"
                      class="mapping_column_1"
                      :class="[checkIsIncludeRow(hindex)]"
                    >
                      <Select2
                        class="importSheet"
                        :options="databaseHeaders"
                        placeholder="Select Database Column"
                        @change="selectRow($event, hindex)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-bordered table-condensed">
                <thead>
                  <tr>
                    <th class="mapping_column_0">No</th>
                    <th
                      v-for="(h, hindex) in headers"
                      :key="hindex"
                      class="mapping_column_1"
                      :class="[checkIsIncludeRow(hindex)]"
                    >
                      {{ h }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(h, hindex) in importDryValues" :key="hindex">
                    <td class="mapping_column_0">
                      <strong>{{ hindex + 1 }}</strong>
                    </td>
                    <td
                      v-for="(i, vindex) in headers"
                      :key="vindex"
                      class="mapping_column_1"
                      :class="[checkIsIncludeRow(vindex)]"
                    >
                      {{ importDryValues[hindex][vindex] || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else-if="parsing" class="loading">parsing the file...</div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="isDeleting"
      @click:confirm-button="deleteProduct"
    >
      <template slot="header">Delete selected product</template>

      Are you sure you want to Delete
      <b>{{ selectedProduct.name }} ?</b>
    </ConfirmationDialog>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import $ from 'jquery'
import XLSX from 'xlsx'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import navigationTab from '~/components/lead/navigation-tab'
import Select2 from '~/components/lead/Select2'
import { IMPORT_ACCEPTED_TYPES } from '~/utils'
import routeMixins from '~/mixins/routeMixins'
export default {
  components: {
    ContentLoader,
    navigationTab,
    ConfirmationDialog,
    Select2,
  },
  mixins: [routeMixins],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      productList: [],
      defaultView: [],
      page: 0,
      last_page: null,
      sortData: null,
      currentSort: 'desc',
      productCount: 0,
      isActive: 'all',
      productName: '',
      selectedProduct: {
        name: '',
        deleteId: 0,
      },
      infiniteId: +new Date(),
      firstLoad: true,
      noProduct: false,
      contentLoaderData: [-1, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      defaultNoData: false,
      workspace_id: this.$route.params.workspace_id,
      isDeleting: false,
      // Dry run vars
      headers: [],
      databaseHeaders: [],
      importDryValues: [],
      selectedRow: [],
      selectedIndex: [],
      importFile: null,
      importFileName: '',
      parsing: false,
      importPayload: [],
      requiredFields: [],
      isInvalidImport: false,
    }
  },
  computed: {
    getRequiredFields() {
      const fields = this.requiredFields.map((e) => e.label)
      return fields.join(` , `)
    },
    checkIsIncludeRow() {
      return (index) => {
        if (
          this.selectedIndex.includes(index) &&
          this.selectedRow[index] !== 'xxx'
        ) {
          return 'success'
        } else if (this.selectedRow[index] === 'xxx') {
          return 'danger'
        }
        return ''
      }
    },
  },
  watch: {
    active() {
      this.filterProduct()
    },
    inActive() {
      this.filterProduct()
    },
  },
  mounted() {
    $('body').removeClass('leftpart-shrink')
    this.getLeadsImportFiedls()
  },
  methods: {
    resetImportVars() {
      this.importDryValues = []
      this.importPayload = []
      this.selectedRow = []
      this.headers = []
      this.selectedIndex = []
      this.isInvalidImport = false
    },
    importProductFileUpload(e) {
      if (e.target.files.length) {
        const rowFile = e.target.files[0]
        if (!IMPORT_ACCEPTED_TYPES.includes(rowFile.type)) {
          this.$refs.csvImport.value = ''
          this.resetImportVars()
          this.$toast.error(
            'Please select .csv, .xls or .xlsx file types only.'
          )
          return false
        }
        this.importFileName = rowFile.name
        this.importFile = rowFile
      }
    },
    getLeadsImportFiedls() {
      this.$axios
        .$post('lm/product/import-mapping-fields')
        .then(({ data }) => {
          data.headerFields.unshift({ id: 'xxx', text: 'Disabled' })
          this.requiredFields = data.requiredFields
          this.databaseHeaders = data.headerFields
        })
        .catch((e) => {
          console.log(e)
        })
    },
    checkImportIsEmpty() {
      if (this.importPayload.length || this.importFile) {
        const isConfirm = confirm(
          'Are you sure you want to discard the changes?'
        )
        if (isConfirm) {
          setTimeout(() => {
            window.$('#import-modal').modal('hide')
          }, 500)
          this.resetImportVars()
          this.$refs.csvImport.value = ''
          this.importFile = null
        }
      } else {
        window.$('#import-modal').modal('hide')
      }
    },
    checkIsValidImport() {
      if (
        this.requiredFields.every((s) =>
          this.importPayload.some((e) => s.value === e.databaseColumn)
        )
      ) {
        return true
      }
      return false
    },
    importHandler() {
      if (!this.checkIsValidImport()) {
        this.isInvalidImport = true
        return
      }
      this.isInvalidImport = false
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Importing Products, Please wait...',
      })
      const importFormData = new FormData()
      importFormData.append('file', this.importFile)
      importFormData.append('mappings', JSON.stringify(this.importPayload))
      this.$axios
        .$post('lm/product/import-with-mapping', importFormData)
        .then((data) => {
          this.$toast.success('Products Imported Successfully')
          this.filterProduct()
          this.resetImportVars()
          this.$refs.csvImport.value = ''
          this.importFile = null
          this.importFileName = ''
          window.$('#import-modal').modal('hide')
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
        .catch((err) => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    parseFile() {
      this.resetImportVars()
      this.parsing = true
      const reader = new FileReader()
      // https://www.npmjs.com/package/xlsx
      reader.onload = (e) => {
        const rowData = new Uint8Array(e.target.result)
        const workbook = XLSX.read(rowData, { type: 'array' })
        const sheetNames = workbook.SheetNames
        const sheetIndex = 1
        const parsedData = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetNames[sheetIndex - 1]],
          {
            header: 1,
          }
        )
        let headers = parsedData[0]
        parsedData.shift()
        headers = headers.map((e) => {
          return e
            .toLowerCase()
            .replace(/ /g, '_')
            .replace(/[^\w-]+/g, '')
        })
        const slicedArray = parsedData.slice(0, 5)
        this.headers = headers
        this.importDryValues = slicedArray
        // console.log(headers)
        // console.log(JSON.stringify(slicedArray))
        // console.table(slicedArray)
      }
      reader.readAsArrayBuffer(this.importFile)
      reader.addEventListener('loadend', () => {
        this.$nextTick(() => {
          this.parsing = false
        })
      })
    },
    selectRow(data, index) {
      // console.log(data, index)
      // this.selectedRow[index] = data
      this.$set(this.selectedRow, index, data)
      if (!this.selectedIndex.includes(index)) {
        this.selectedIndex.push(index)
      }
      const payload = []
      for (let i = 0; i < this.headers.length; i++) {
        if (this.selectedIndex.includes(i)) {
          payload.push({
            databaseColumn: this.selectedRow[i],
            sheetColumn: this.headers[i],
          })
        }
      }
      this.importPayload = payload
    },
    setDeletedProduct(name, id) {
      this.selectedProduct.name = name
      this.selectedProduct.deleteId = id
      this.isDeleting = true
    },
    deleteProduct() {
      this.$axios
        .$post(`lm/product/delete`, {
          product_id: this.selectedProduct.deleteId,
        })
        .then((response) => {
          this.$toast.success(response.message)
          this.changeProductName()
        })
    },
    changeProductName() {
      debounce(() => {
        this.page = 0
        this.productList = []
        this.infiniteId += 1
      }, 1500)
    },
    productNotfound() {
      if (this.defaultView.length !== 0) {
        if (this.productList.length === 0) {
          this.noProduct = true
          this.defaultNoData = false
        } else {
          this.noProduct = false
        }
      } else {
        this.defaultNoData = true
      }
    },
    filterProduct() {
      this.page = 0
      this.productList = []
      this.infiniteId += 1
    },
    infiniteHandler($state) {
      this.noProduct = false
      this.page += 1
      this.$axios
        .$post(
          `/lm/product/list`,
          { is_active: this.isActive, product_name: this.productName },
          {
            params: {
              url_workspace_id: this.$route.params.workspace_id,
              page: this.page,
              sort_value: this.sortData,
              sort_by: this.currentSort,
            },
          }
        )
        .then(({ data }) => {
          this.productCount = data.total
          this.lastPage = data.last_page
          if (data.data && data.data.length) {
            if (this.page === data.current_page) {
              this.productList.push(...data.data)
              $state.loaded()
              if (this.firstLoad) {
                this.defaultView = [...this.productList]
                this.firstLoad = false
              }
              this.productNotfound()

              if (this.lastPage === this.page) {
                $state.complete()
              }
            }
          } else {
            this.productNotfound()
            $state.complete()
          }
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    toggleSortData(data) {
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'asc'
      } else {
        this.currentSort = this.currentSort === 'asc' ? 'desc' : 'asc'
      }
      this.page = 0
      this.productList = []
      this.infiniteId += 1
    },
    downloadProductImportSampleFile() {
      const link = document.createElement('a')
      link.href = `${process.env.BACKAND_URL}/upload/import-sample-format/product-import-sample-format.xlsx`
      link.setAttribute('download', 'product-import-sample-format.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
  },
}

let timeout
function debounce(func, wait) {
  clearTimeout(timeout)
  timeout = setTimeout(func, wait)
}
</script>

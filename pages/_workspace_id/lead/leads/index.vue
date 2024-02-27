<template>
  <div class="body-content body-content-quick-view">
    <div class="resizableMain filterMain lead-dashboard">
      <dealer
        ref="dealerComponent"
        :start-date="filters.start_date || ''"
        :end-date="filters.end_date || ''"
        :dealer-filter="dealerFilter"
        @selectedId="changeMultiDealer($event)"
        @shrink="quickView.active = false"
        @multipleSelection="changeMultiDealer($event)"
      />
      <div class="resizableRight pr0">
        <div class="common-box-header">
          <h2 class="title">
            <BackIcon
              v-if="filters.new_lead || filters.not_assigned"
              style="cursor: pointer"
              @click.native="handleNewLeadView('leads')"
            />

            {{ getTitle }} - <strong>{{ totalLeads }} </strong>
          </h2>
          <div class="newAnalytics p0">
            <ul class="assetsType justify-content-end">
              <li v-if="$auth.user.allow_lead_import === '1'">
                <a
                  href="javascript:void(0);"
                  class="static-modal-link"
                  data-toggle="modal"
                  data-target="#import-modal"
                  style="display: flex; align-items: center; line-height: 1.4"
                >
                  <ImportIcon class="mr-2" />
                  Import
                </a>
              </li>
              <li>
                <a
                  v-tooltip="'Export to CSV'"
                  style="display: flex; align-items: center; line-height: 1.4"
                  @click="exportCSV()"
                >
                  <ExportIcon class="mr-2" />
                  Export
                </a>
              </li>
              <li>
                <div class="d-flex align-items-center justify-content-end">
                  <div
                    v-if="lastDate !== '-2' && lastDate !== '-1'"
                    class="report-slide gray-btn"
                  >
                    <button @click="previousTimeFrame">
                      <LeftArrowIcon />
                    </button>
                    <button @click="nextTimeFrame">
                      <RightArrowIcon />
                    </button>
                  </div>
                  <h2 v-if="lastDate !== '-1'" class="title">
                    {{ getDayTitle }} :
                    {{ $moment(dStartDate).format(DATE_FORMAT) }} -
                    {{ $moment(dEndDate).format(DATE_FORMAT) }}
                  </h2>
                  <div class="month-range-filter">
                    <Select2
                      v-model="lastDate"
                      :options="lastDateOptions"
                      placeholder="Select Day"
                      custom-event
                      @input="getDate($event)"
                    />
                  </div>
                  <div class="report-date">
                    <DateRangePicker
                      v-show="lastDate === '-2'"
                      ref="dateRangePicker"
                      :start-date.sync="filters.start_date"
                      :end-date.sync="filters.end_date"
                      placeholder="Select Date Range"
                      class="daterange"
                      human
                      custom-event
                      @dateChanged="rangeDateChanged($event)"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="common-box bg-gray">
          <div class="filter-dropdown">
            <a href="javascript:void(0);" class="filter-dropdown-toggle">
              <MenuIcon />
            </a>
            <ul class="filter-dropdown-menu">
              <li>
                <a
                  v-for="i in filterheader"
                  :key="i.name"
                  href="javascript:void(0);"
                  ><label class="check-label">
                    {{ i.name }}
                    <input
                      v-model="i.isActive"
                      type="checkbox"
                      name=""
                      checked="" /><span class="check-span"></span></label
                ></a>
              </li>
            </ul>
          </div>
          <div
            :class="{ 'show-detail': $auth.user.detail_view == 1 }"
            class="table-list-view multi-table-view table-list-scrolling leads s2"
          >
            <ul class="thead">
              <li>
                <div
                  class="favorite sorting filtericon flex2"
                  :class="[
                    sortData === 'is_favourite' && currentSort === 'DESC'
                      ? 'open'
                      : '',
                  ]"
                  @click="toggleSortData('is_favourite')"
                >
                  <span>
                    <FlagIcon />
                    <FlagIconOrange />
                  </span>
                </div>
                <div
                  class="name-email sorting sortarrow"
                  :class="[
                    sortData === 'name' && currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                    'flex17',
                  ]"
                >
                  <div class="blank-space30"></div>
                  <span
                    v-show="checkHiddenFilter('Name')"
                    @click="toggleSortData('name')"
                    >Name/Email</span
                  >
                </div>
                <div
                  class="last-activity sorting sortarrow flex9"
                  :class="[
                    sortData === 'updated_at' && currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    v-show="checkHiddenFilter('Last Activity')"
                    @click="toggleSortData('updated_at')"
                    >Last Activity</span
                  >
                </div>
                <div
                  class="created-date sorting sortarrow flex9"
                  :class="[
                    sortData === 'created_at' && currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    v-show="checkHiddenFilter('Created Date')"
                    @click="toggleSortData('created_at')"
                    >Created Date</span
                  >
                </div>
                <div class="form-title sorting flex8">
                  <span v-show="checkHiddenFilter('Form Title')"
                    >Form Title</span
                  >
                </div>
                <div class="model sorting filterarrow flex10">
                  <span v-show="checkHiddenFilter('Products')">Products</span>
                  <ul v-show="checkHiddenFilter('Products')" class="dataFilter">
                    <li v-for="item in leadFilter.leadModel" :key="item.id">
                      <label class="check-label"
                        >{{ item.name }}
                        <input
                          v-if="item.name"
                          v-model="item.isActive"
                          type="checkbox"
                          :disabled="isLoading"
                          name=""
                        />
                        <span v-if="item.name" class="check-span"></span>
                      </label>
                    </li>
                    <div
                      v-if="!leadFilter.leadModel.length"
                      class="text-center d-flex align-items-center justify-content-center"
                    >
                      <span>No filter data</span>
                    </div>
                  </ul>
                </div>
                <div class="lead-source sorting filterarrow flex8">
                  <span v-show="checkHiddenFilter('Source')">Source</span>

                  <ul v-if="checkHiddenFilter('Source')" class="dataFilter">
                    <li v-for="item in leadFilter.leadSource" :key="item.id">
                      <label class="check-label"
                        >{{ item.name }}
                        <input
                          v-model="item.isActive"
                          :disabled="isLoading"
                          type="checkbox"
                          name=""
                        />
                        <span class="check-span"></span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="dealers sorting filterarrow flex10">
                  <span v-show="checkHiddenFilter('Dealers')">Dealers</span>

                  <ul v-show="checkHiddenFilter('Dealers')" class="dataFilter">
                    <li v-for="item in leadFilter.dealer" :key="item.id">
                      <label class="check-label"
                        >{{ item.name }}
                        <input
                          v-if="item.name"
                          v-model="item.isActive"
                          :disabled="isLoading"
                          type="checkbox"
                          name=""
                        />
                        <span v-if="item.name" class="check-span"></span>
                      </label>
                    </li>
                    <div
                      v-if="!leadFilter.dealer.length"
                      class="text-center d-flex align-items-center justify-content-center"
                    >
                      <span>No filter data</span>
                    </div>
                  </ul>
                </div>
                <div class="lead-rsm sorting flex9">
                  <span v-show="checkHiddenFilter('RSMs')">RSMs</span>
                </div>
                <div class="lead-status sorting filterarrow flex8">
                  <span v-show="checkHiddenFilter('Status')"
                    >Status
                    <i
                      v-tooltip="{
                        html: true,
                        content: getHtmlContent(leadStatusOptions),
                      }"
                      class="fa fa-info-circle tip"
                      aria-hidden="true"
                      data-tip="tip-info"
                    ></i
                  ></span>

                  <ul v-show="checkHiddenFilter('Status')" class="dataFilter">
                    <li v-for="item in leadFilter.status" :key="item.id">
                      <label class="check-label"
                        >{{ item.name }}
                        <input
                          v-model="item.isActive"
                          :disabled="isLoading"
                          type="checkbox"
                          name=""
                        />
                        <span class="check-span"></span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="sorting flex10">
                  <span v-show="checkHiddenFilter('Action')">Action</span>
                </div>
              </li>
            </ul>
            <div ref="scrollContainer" class="customscrollbar no_footer">
              <ul class="tbody">
                <!-- !lead.is_read ? 'new-lead' : '', -->
                <li
                  v-for="(lead, index) in leads"
                  :key="lead.id"
                  :class="[
                    lead.products.length > 1 ? 'double-lead' : '',
                    quickView.active &&
                    quickView.data &&
                    quickView.data.id === lead.id
                      ? 'active'
                      : '',
                  ]"
                >
                  <div class="favorite tb-column flex2">
                    <a
                      v-if="lead.is_favourite"
                      href="javascript:void(0);"
                      class="fav-icon"
                      @click="addLeadFavourite(lead)"
                    >
                      <FlagIconOrange />
                    </a>

                    <a
                      v-else
                      href="javascript:void(0);"
                      class="not-fav-icon"
                      @click="addLeadFavourite(lead)"
                    >
                      <FlagIcon />
                    </a>
                  </div>
                  <div class="name-email tb-column flex17">
                    <div class="dealer-num">
                      <nuxt-link
                        class="dealer-num"
                        :to="{
                          name: 'workspace_id-lead-leads-id',
                          params: {
                            workspace_id: $_auth().id,
                            id: lead.id,
                          },
                        }"
                      >
                        {{ index + 1 }}
                      </nuxt-link>
                    </div>
                    <div>
                      <div class="top-column">
                        <label v-show="checkHiddenFilter('Name')">
                          <nuxt-link
                            :to="{
                              name: 'workspace_id-lead-leads-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: lead.id,
                              },
                            }"
                            >{{
                              lead.name && lead.name.trim() ? lead.name : '-'
                            }}</nuxt-link
                          ></label
                        >
                      </div>
                      <div class="bottom-column">
                        <span v-show="checkHiddenFilter('Name')"
                          ><nuxt-link
                            :to="{
                              name: 'workspace_id-lead-leads-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: lead.id,
                              },
                            }"
                            >{{ lead.email || '-' }}</nuxt-link
                          ></span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="last-activity tb-column flex9">
                    <div
                      v-show="checkHiddenFilter('Last Activity')"
                      class="top-column"
                    >
                      <label>
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-lead-leads-id',
                            params: {
                              workspace_id: $_auth().id,
                              id: lead.id,
                            },
                          }"
                        >
                          {{ lead.updated_at_timestamp || '-' }}
                        </nuxt-link>
                      </label>
                    </div>
                    <div
                      v-show="checkHiddenFilter('Last Activity')"
                      class="bottom-column"
                    >
                      <span>
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-lead-leads-id',
                            params: {
                              workspace_id: $_auth().id,
                              id: lead.id,
                            },
                          }"
                        >
                          {{ lead.updated_at_format || '-' }}
                        </nuxt-link>
                      </span>
                    </div>
                  </div>
                  <div class="created-date tb-column flex9">
                    <div
                      v-show="checkHiddenFilter('Created Date')"
                      class="top-column"
                    >
                      <label>{{ lead.created_at_format }}</label>
                    </div>
                  </div>
                  <div class="form-title tb-column flex8">
                    <div
                      v-show="checkHiddenFilter('Form Title')"
                      class="top-column"
                    >
                      <label>{{ lead.form_title || '-' }}</label>
                    </div>
                  </div>
                  <div
                    v-if="!checkHiddenFilter('Products')"
                    class="model tb-column flex10"
                  ></div>
                  <div v-else class="model tb-column flex10">
                    <template v-for="product in lead.products">
                      <div :key="product.product_id" class="top-column">
                        <label
                          ><nuxt-link
                            :to="{
                              name: 'workspace_id-lead-leads-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: lead.id,
                              },
                            }"
                            >{{ product.product_name || '-' }}
                          </nuxt-link>
                        </label>
                      </div>

                      <div
                        :key="product.product_id + 'bottom'"
                        class="bottom-column"
                      >
                        <span>
                          <nuxt-link
                            :to="{
                              name: 'workspace_id-lead-leads-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: lead.id,
                              },
                            }"
                          >
                            {{ product.option_name || '-' }}
                          </nuxt-link>
                        </span>
                      </div>
                    </template>
                    <div>
                      <label v-if="!lead.products.length">-</label>
                    </div>
                  </div>
                  <div class="lead-source tb-column flex8">
                    <nuxt-link
                      v-show="checkHiddenFilter('Source')"
                      :to="{
                        name: 'workspace_id-lead-leads-id',
                        params: {
                          workspace_id: $_auth().id,
                          id: lead.id,
                        },
                      }"
                    >
                      <template v-for="(product, i) in lead.products">
                        <div
                          v-if="i <= 1"
                          :key="i"
                          class="img-text"
                          :class="[i >= 0 ? 'top-column' : 'bottom-column']"
                        >
                          <PhoneIconBlue
                            v-if="product.lead_source == 'Phone'"
                          />
                          <WebIcon
                            v-else-if="product.lead_source == 'Web'"
                            custom-class="blue"
                          />
                          <EventIconBlue
                            v-else-if="product.lead_source == 'Event'"
                          />

                          <label style="cursor: pointer">{{
                            product.lead_source || '-'
                          }}</label>
                        </div>
                      </template>
                      <label v-if="!lead.products.length">-</label>
                    </nuxt-link>
                  </div>
                  <div
                    v-if="
                      lead.products &&
                      lead.products.length &&
                      checkHiddenFilter('Dealers')
                    "
                    class="dealers tb-column flex10"
                  >
                    <template v-for="product in lead.products">
                      <div :key="product.product_id + 'top'" class="top-column">
                        <label>{{ product.dealership_name || '-' }} </label>
                      </div>
                      <div
                        :key="product.product_id + 'bottom'"
                        class="bottom-column"
                      >
                        <span>{{ product.dealership_city || '-' }} </span>
                      </div>
                    </template>
                  </div>
                  <div v-else class="dealers tb-column flex10">
                    <template v-if="checkHiddenFilter('Dealers')">
                      <div class="top-column">
                        <label>-</label>
                      </div>
                      <div class="bottom-column">
                        <span>-</span>
                      </div>
                    </template>
                  </div>
                  <div
                    v-if="
                      lead.products &&
                      lead.products.length &&
                      checkHiddenFilter('RSMs')
                    "
                    class="lead-rsm tb-column flex9"
                  >
                    <template v-for="product of lead.products">
                      <div :key="product.product_id + 'top'" class="top-column">
                        <label>{{ product.rsm || '-' }} </label>
                      </div>
                    </template>
                  </div>
                  <div v-else class="lead-rsm tb-column flex9">
                    <template v-if="checkHiddenFilter('RSMs')">
                      <div class="top-column">
                        <label>-</label>
                      </div>
                      <div class="bottom-column">
                        <span>-</span>
                      </div>
                    </template>
                  </div>
                  <div
                    v-if="!checkHiddenFilter('Status')"
                    class="lead-status tb-column flex8"
                  ></div>
                  <div v-else class="lead-status tb-column flex8">
                    <template v-for="(product, i) of lead.products">
                      <div
                        v-if="i <= 1"
                        :key="product.id"
                        :class="[i >= 0 ? 'top-column' : 'bottom-column']"
                      >
                        <div
                          v-if="product.lead_status"
                          class="status-dropdown no-border"
                        >
                          <Select2WithColor
                            v-model="product.lead_status"
                            :class-obj="{ 'status-select': true }"
                            dropdown-css-class="status-select"
                            :options="leadStatusOptions"
                            :custom-event="true"
                            @optionChangeHandler="
                              changeLeadStatus(...arguments, lead, product)
                            "
                          />
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="hv-img tb-column flex10">
                    <ul
                      v-show="checkHiddenFilter('Action')"
                      class="action"
                      style="min-width: 80px"
                    >
                      <li>
                        <label
                          v-show="checkHiddenFilter('Notification')"
                          v-tooltip="'Notification'"
                          class="label-switch no-text small"
                        >
                          <input
                            v-model="lead.is_sent"
                            type="checkbox"
                            class="switch"
                            value="1"
                            checked=""
                            @change="toggleLeadActivity(lead)"
                          />
                          <span class="lable"></span>
                        </label>
                      </li>
                      <li :class="{ ml0: !checkHiddenFilter('Notification') }">
                        <a
                          v-tooltip="
                            quickView.active && quickView.data.id === lead.id
                              ? 'Quick view Close'
                              : 'Quick View'
                          "
                          :class="
                            quickView.active
                              ? 'close-quick-view'
                              : 'quick-view-open'
                          "
                          @click="activateQuickView(lead.id)"
                        >
                          <CloseQuickView
                            v-if="
                              quickView.active && quickView.data.id === lead.id
                            "
                          />
                          <OpenQuickView v-else />
                        </a>
                      </li>
                      <li>
                        <client-only>
                          <speech-recognition
                            v-slot="{ started, start, stop }"
                            v-model="annotation"
                            class="dropdown common-dropdown annotation"
                          >
                            <a
                              v-tooltip="'Annotation'"
                              class="dropdown-toggle"
                              :class="{ 'mic-active': started }"
                              data-toggle="dropdown"
                              @click="
                                () => {
                                  started ? stop() : start()
                                }
                              "
                            >
                              <AnnotationIcon />
                            </a>
                            <ul class="dropdown-menu">
                              <form>
                                <div class="form-group">
                                  <textarea
                                    v-model="annotation"
                                    class="form-control"
                                    rows="8"
                                    placeholder="Start Annotation"
                                  ></textarea>
                                </div>
                                <div class="from-group mb0">
                                  <button
                                    type="button"
                                    class="btn btn-blue btn-small"
                                    @click="
                                      addNote(annotation, lead.id)
                                      stop()
                                    "
                                  >
                                    Submit
                                  </button>

                                  <button
                                    type="button"
                                    class="btn btn-gray btn-small"
                                    @click="
                                      stop()
                                      annotation = ''
                                    "
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </ul>
                          </speech-recognition>
                        </client-only>
                      </li>
                    </ul>
                  </div>
                </li>
                <client-only>
                  <infinite-loading
                    :identifier="infiniteId"
                    @infinite="infiniteHandler"
                  >
                    <div slot="spinner">
                      <LeadListLoader />
                    </div>
                    <div slot="no-more"></div>
                    <div slot="no-results">
                      <EmptyState>
                        <div class="inner w-100">
                          <p v-if="isFiltered">No data found</p>
                          <p v-else>You haven't added any Leads yet!</p>
                          <nuxt-link
                            class="btn btn-icon"
                            :to="{
                              name: 'workspace_id-lead-leads-add',
                              params: { workspace_id: $_auth().id },
                            }"
                          >
                            <PlusIcon />
                            Add New Leads</nuxt-link
                          >
                        </div>
                      </EmptyState>
                    </div>
                  </infinite-loading>
                </client-only>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Quick view start -->
      <transition name="slide-fade">
        <QuickView
          v-if="quickView.active"
          :quick-view="quickView"
          :submitted-forms="submittedForms"
          :top-notes-data="topNotesData"
          :last-web-visits="lastWebVisits"
          :most-visited="mostVisited"
          :recent-web-visits="recentWebVisits_"
          :lead-status-options="leadStatusOptions"
          :get-email="getEmail"
          :get-phone="getPhone"
          @activateQuickView="activateQuickView"
          @onStatusChange="changeLeadStatus"
        />
      </transition>
      <!-- Quick view end -->
    </div>
    <div id="import-modal" class="modal fade static-modal">
      <div
        class="modal-dialog maxwidth modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Import Leads</h5>
            <button type="button" class="close" @click="checkImportIsEmpty">
              <span aria-hidden="true">
                <CloseIcon />
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
                      @change="importLeadFileUpload($event)"
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
                    @click="downloadLeadImportSampleFile"
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
    <!--  Switch Workspace Modal  -->
    <switchWorkspaceDialog
      ref="switchWorkspace"
      :workspace-name="switch_workspace_name"
    ></switchWorkspaceDialog>
  </div>
</template>

<script>
import $ from 'jquery'
import XLSX from 'xlsx'
import Select2WithColor from '@/components/plugins/Select2WithColor'
import Select2 from '~/components/lead/Select2'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import leadMixin from '~/mixins/lead.js'
import SpeechRecognition from '~/components/lead/SpeechRecognition'
import Dealer from '~/components/lead/Dealers'
import scrolling from '~/mixins/scrolling'
import { _debounce, checkIsEqual } from '~/utils/helper'
import switchWorkspaceDialog from '~/components/theme/project/switchWorkspaceDialog'
import AnalyticsMixins from '~/mixins/analyticsMixins'
import EmptyState from '~/components/theme/global/EmptyState'
import QuickView from '~/components/lead/QuickView.vue'
import LeadListLoader from '~/components/lead/skeletons/LeadListLoader.vue'
import { IMPORT_ACCEPTED_TYPES } from '~/utils'
import FlagIconOrange from '~/components/lead/Icons/FlagIconOrange'
import FlagIcon from '~/components/lead/Icons/FlagIcon'
import RightArrowIcon from '~/components/lead/Icons/RightArrowIcon'
import LeftArrowIcon from '~/components/lead/Icons/LeftArrowIcon'
import ExportIcon from '~/components/lead/Icons/ExportIcon'
import MenuIcon from '~/components/lead/Icons/MenuIcon'
export default {
  components: {
    FlagIconOrange,
    RightArrowIcon,
    LeftArrowIcon,
    ExportIcon,
    MenuIcon,
    FlagIcon,
    DateRangePicker,
    Select2,
    SpeechRecognition,
    Dealer,
    switchWorkspaceDialog,
    Select2WithColor,
    EmptyState,
    QuickView,
    LeadListLoader,
  },
  mixins: [leadMixin, scrolling, AnalyticsMixins],
  layout: 'leadLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-lead-module'],

  data() {
    return {
      // lead list variables
      leads: [],
      totalLeads: 0,
      lastDate: '',
      isLoading: true,
      currentPage: 0,
      lastPage: null,
      sortData: null,
      currentSort: 'DESC',
      infiniteId: new Date().getTime(),
      lastDateOptions: [
        {
          id: '-1',
          text: 'All',
        },
        {
          id: '0',
          text: 'Today',
        },
        {
          id: '6',
          text: 'Week',
        },
        {
          id: '29',
          text: '30 Days',
        },
        {
          id: '89',
          text: 'Quarter',
        },
        {
          id: '364',
          text: 'Year',
        },
        {
          id: '-2',
          text: 'Custom',
        },
      ],
      // Lead quick view
      leadStatusOptions: [],
      topNotesData: [],
      submittedForms: [],
      mostVisited: [],
      recentWebVisits_: [],
      lastWebVisits: [],
      quickView: {
        active: false,
        data: null,
        info: {},
        isLoading: false,
      },
      // Utills
      filters: {
        headerProducts: [],
        headerStatus: [],
        headerDealer: [],
        products: [],
        products_Name: [],
        dealer_name: [],
        lead_status: [],
        start_date: null,
        end_date: null,
        status: [],
        state: [],
        city: [],
        new_lead: false,
        not_assigned: false,
        dealership_ids: [],
        leadSource: [],
        leadScore: [],
      },
      leadFilter: {
        // leadScore: [],
        leadSource: [],
        leadModel: [],
        dealer: [],
        status: [],
      },
      dStartDate: this.$moment().format('YYYY-MM-DD'),
      dEndDate: this.$moment().format('YYYY-MM-DD'),
      annotation: '',
      filterheader: [
        { name: 'Name', isActive: true },
        { name: 'Last Activity', isActive: true },
        { name: 'Created Date', isActive: true },
        { name: 'Form Title', isActive: true },
        { name: 'Products', isActive: true },
        { name: 'Source', isActive: false },
        { name: 'Dealers', isActive: true },
        { name: 'RSMs', isActive: true },
        { name: 'Status', isActive: true },
        { name: 'Notification', isActive: false },
        { name: 'Action', isActive: true },
      ],
      dealerFilter: [],
      // Import variables
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
      switch_workspace_id: this.$auth.$storage.getUniversal('switchWorkspaceId')
        ? this.$auth.$storage.getUniversal('switchWorkspaceId')
        : '',
      switch_workspace_name: null,
      columnFilterLoading: false,
    }
  },
  computed: {
    getRequiredFields() {
      const fields = this.requiredFields.map((e) => e.label)
      return fields.join(' , ')
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
    checkHiddenFilter() {
      return (name) => this.filterheader.find((e) => e.name === name)?.isActive
    },
    isSuperAdmin() {
      return this.$_auth().user.lead.isSuperAdmin
    },
    getEmail() {
      return `mailto:${this.quickView.data.email}`
    },
    getPhone() {
      return `tel:${this.quickView.info.phone}`
    },
    getTitle() {
      if (this.filters.new_lead) return 'New Leads'
      else if (this.filters.not_assigned) return 'Not Assigned Leads'
      else return 'Lead Contacts'
    },
    isFiltered() {
      const f = {
        headerProducts: [],
        headerStatus: [],
        headerDealer: [],
        products: [],
        products_Name: [],
        dealer_name: [],
        lead_status: [],
        start_date: null,
        end_date: null,
        status: [],
        state: [],
        city: [],
        new_lead: false,
        not_assigned: false,
        dealership_ids: [],
        leadSource: [],
        leadScore: [],
      }
      if (JSON.stringify(f) === JSON.stringify(this.filters)) return false
      return true
    },
  },
  watch: {
    'leadFilter.dealer': {
      immediate: false,
      handler(val, newval) {
        if (checkIsEqual(val, newval) && !this.columnFilterLoading) {
          const tempData = [...this.leadFilter.dealer]
          this.filters.headerDealer = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      deep: true,
    },
    'leadFilter.leadModel': {
      immediate: false,
      handler(val, newval) {
        if (checkIsEqual(val, newval) && !this.columnFilterLoading) {
          const tempData = [...this.leadFilter.leadModel]
          this.filters.headerProducts = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      deep: true,
    },
    'leadFilter.leadSource': {
      immediate: false,
      handler(newVal, oldVal) {
        if (checkIsEqual(newVal, oldVal) && !this.columnFilterLoading) {
          const tempData = [...this.leadFilter.leadSource]
          this.filters.leadSource = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.name)
          this.handleFilterChange()
        }
      },
      deep: true,
    },
    'leadFilter.status': {
      immediate: false,
      handler(val, newval) {
        if (checkIsEqual(val, newval) && !this.columnFilterLoading) {
          const tempData = [...this.leadFilter.status]
          this.filters.headerStatus = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      deep: true,
    },
    filterheader: {
      handler() {
        window.localStorage.setItem(
          'lead_menu_filter',
          JSON.stringify(this.filterheader)
        )
      },
      deep: true,
    },
  },
  mounted() {
    this.switchWorkspaceDialogOpen()
    this.getFiltersHeader()
    this.setDateifSuperAdmin()
    this.loadJQUERY()
    $('body').removeClass('quick-view')
    $('body').removeClass('leftpart-shrink')
    $('body').removeClass('rightpart-shrink')
  },
  created() {
    this.getLeadsImportFiedls()
    this.getLeadStatus()
    this.filters.new_lead = !!this.$route.query.new_lead
    this.filters.not_assigned = !!this.$route.query.not_assigned
  },
  methods: {
    previousTimeFrame() {
      if (this.getDayTitle === 'Today') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.dStartDate
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === 'Week') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(7, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dStartDate)
          .add(6, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === '30 Days') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(30, 'days')
          .format('YYYY-MM-DD')

        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dStartDate)
          .add(29, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === 'Year') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(365, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dStartDate)
          .add(364, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === 'Quarter') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(90, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dStartDate)
          .add(89, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      this.handlerDealerFilter()
      this.handleHeaderFilter()
      this.handleFilterChange()
    },
    nextTimeFrame() {
      if (this.getDayTitle === 'Today') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.dStartDate
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === 'Week') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dEndDate)
          .add(7, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === '30 Days') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dEndDate)
          .add(30, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      if (this.getDayTitle === 'Year') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dEndDate)
          .add(365, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }

      if (this.getDayTitle === 'Quarter') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.filters.start_date = this.dStartDate
        this.dEndDate = this.$moment(this.dEndDate)
          .add(90, 'days')
          .format('YYYY-MM-DD')
        this.filters.end_date = this.dEndDate
      }
      this.handlerDealerFilter()
      this.handleHeaderFilter()
      this.handleFilterChange()
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
    switchWorkspaceDialogOpen() {
      if (this.$auth.$storage.getUniversal('switchWorkspaceId')) {
        this.getSwitchWorkspaceId()
      }
    },
    async getSwitchWorkspaceId() {
      try {
        const { data } = await this.$axios.$get(
          `/project/verify-workspace?workspace_id=${this.switch_workspace_id}`
        )
        this.switch_workspace_name = data.workspace_name
        this.$refs.switchWorkspace.show()
      } catch (e) {
        this.$auth.$storage.removeUniversal('switchWorkspaceId')
      }
    },
    loadJQUERY() {
      $('.filter-dropdown-toggle').click(function () {
        $(this).parents('.filter-dropdown').toggleClass('open')
      })
      $(document).mouseup(function (e) {
        const container = $('.filter-dropdown')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.removeClass('open')
        }
      })
    },
    toggleLeadActivity(lead) {
      this.$axios
        .post('lm/leads/add-lead-activity-permission', {
          url_workspace_id: this.$getWorkspaceId(),
          lead_id: lead.id,
          is_sent: lead.is_sent ? 1 : 0,
        })
        .then(({ data }) => {
          if (data.data.is_sent) {
            this.$toast.success(data.message)
          } else {
            this.$toast.success('Lead activity permission removed successfully')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    getLeadStatus() {
      this.$axios.$get('lm/common/list-lead-status').then((data) => {
        this.error = data && data.error
        this.leadStatusOptions = data && data.data.length && data.data
        this.leadStatusOptions = this.leadStatusOptions.map((data) =>
          Object.assign(data, {
            text: data.status_name,
            status_text_color: '#FFFFFF',
          })
        )
      })
    },
    setDateifSuperAdmin() {
      if (this.isSuperAdmin) {
        this.lastDate = '6'
        this.getDate()
      } else {
        this.lastDate = '-1'
        this.getDate()
      }
    },
    getFiltersHeader() {
      const filters = JSON.parse(
        window.localStorage.getItem('lead_menu_filter')
      )
      if (filters) {
        this.filterheader = filters
      }
    },
    handleDealerHeaderFilter() {
      this.$axios
        .$post('lm/leads/dealership-column-header', {
          url_workspace_id: this.$route.params.workspace_id,
          orderby: 'DESC',
          start_date: this.lastDate === '-1' ? 'all' : this.dStartDate,
          end_date: this.lastDate === '-1' ? 'all' : this.dEndDate,
        })
        .then(({ data }) => {
          this.dealerFilter = data.map((m) => {
            return {
              id: m.id,
              name: m.dealership_name,
              isActive: false,
            }
          })
        })
    },
    handlerDealerFilter() {
      this.handleDealerHeaderFilter()
      this.$refs?.dealerComponent.handleFilterChange()
    },
    handleHeaderFilter() {
      this.columnFilterLoading = true
      this.$axios
        .$post('lm/leads/list-column-header', {
          url_workspace_id: this.$route.params.workspace_id,
          orderby: 'DESC',
          start_date: this.filters.start_date || 'all',
          end_date: this.filters.end_date || 'all',
        })
        .then(({ data }) => {
          const modelids = Object.keys(data.model_name)
          const modelvalues = Object.values(data.model_name)
          const dealerIds = Object.keys(data.dealer_name)
          const dealerNames = Object.values(data.dealer_name)
          const models = []
          const dealers = []
          // mapping through the data and getting key value as {id:key, name:value}
          modelids.map((id, index) => {
            return (models[index] = Object.assign({
              id,
              name: modelvalues[index],
              isActive: false,
            }))
          })

          dealerIds.map((id, index) => {
            return (dealers[index] = Object.assign({
              id,
              name: dealerNames[index],
              isActive: false,
            }))
          })
          if (data.dealer_name) {
            this.leadFilter.dealer = dealers
          }
          if (data.model_name) {
            this.leadFilter.leadModel = models
          }
          // mapping through and saving them as objects [{id,name},{id,name}]
          this.leadFilter.status = data.lead_status.map((s) => {
            return {
              id: s.id,
              name: s.status_name,
              isActive: false,
            }
          })
          // eslint-disable-next-line array-callback-return
          this.leadFilter.leadSource = data.lead_source.map((score, index) => {
            return {
              name: score,
              id: Object.keys(data.lead_score)[index],
              isActive: false,
            }
          })
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
        .finally(() => {
          this.columnFilterLoading = false
        })
    },
    resetFilter() {
      this.filters.headerDealer = []
      this.filters.headerProducts = []
      this.filters.leadSource = []
      this.filters.headerStatus = []
    },
    activateQuickView(id) {
      if (
        (this.quickView.active && !id) ||
        (this.quickView.active && id === this.quickView.data.id)
      ) {
        this.quickView.active = false
        $('body').removeClass('quick-view')
        $('body').removeClass('leftpart-shrink')
        return (this.quickView.data = null)
      }
      this.quickView.isLoading = true
      this.getQuickViewData(id)
      this.quickView.data = this.leads.filter((data) => data.id === id)[0]
      this.quickView.active = true
      this.quickView.isLoading = false
      $('body').addClass('quick-view')
      $('body').addClass('leftpart-shrink')
    },
    infiniteHandler($state) {
      this.isLoading = true
      this.currentPage += 1
      const filterFormData = new FormData()
      Object.keys(this.filters).forEach((e) => {
        if (
          typeof this.filters[e] !== 'object' &&
          e !== 'file' &&
          this.filters[e]
        ) {
          filterFormData.append(e, this.filters[e])
        }
      })
      this.filters.dealership_ids.length &&
        filterFormData.append(
          'dealership_ids',
          JSON.stringify(this.filters.dealership_ids)
        )
      this.filters.headerDealer.length &&
        filterFormData.append(
          'dealership_ids',
          JSON.stringify(this.filters.headerDealer)
        )
      this.filters.headerStatus.length &&
        filterFormData.append(
          'status',
          JSON.stringify(this.filters.headerStatus)
        )
      this.filters.headerProducts.length &&
        filterFormData.append(
          'product_id',
          JSON.stringify(this.filters.headerProducts)
        )
      this.filters.products.length &&
        filterFormData.append(
          'product_id',
          JSON.stringify(this.filters.products)
        )
      this.filters.lead_status.length &&
        filterFormData.append(
          'status',
          JSON.stringify(this.filters.lead_status)
        )
      this.filters.dealer_name.length &&
        filterFormData.append(
          'dealer_name',
          JSON.stringify(this.filters.dealer_name)
        )
      this.filters.leadScore.length &&
        filterFormData.append(
          'lead_score',
          JSON.stringify(this.filters.leadScore)
        )
      this.filters.leadSource.length &&
        filterFormData.append(
          'lead_source',
          JSON.stringify(this.filters.leadSource)
        )
      this.filters.city.length &&
        filterFormData.append('city', JSON.stringify(this.filters.city))
      this.filters.state.length &&
        filterFormData.append('state', JSON.stringify(this.filters.state))
      this.$axios
        .$post('/lm/leads/list', filterFormData, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
            page: this.currentPage,
            sortvalue: this.sortData,
            orderby: this.currentSort,
          },
        })
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (this.currentPage <= 1) this.leads = []
          if (
            data.data &&
            data.data.length &&
            this.currentPage === data.current_page
          ) {
            this.leads.push(...data.data)
            $state.loaded()
            if (this.lastPage === this.currentPage) $state.complete()
          } else $state.complete()
          this.isLoading = false
          this.totalLeads = data.total
        })
        .catch((e) => {
          $state.error(e)
          this.isLoading = false
        })
    },
    exportCSV() {
      const filterFormData = new FormData()
      Object.keys(this.filters).forEach((e) => {
        if (
          typeof this.filters[e] !== 'object' &&
          e !== 'file' &&
          this.filters[e]
        ) {
          filterFormData.append(e, this.filters[e])
        }
      })
      this.filters.products.length &&
        filterFormData.append(
          'product_id',
          JSON.stringify(this.filters.products)
        )
      this.filters.lead_status.length &&
        filterFormData.append(
          'status',
          JSON.stringify(this.filters.lead_status)
        )
      this.filters.dealership_ids.length > 0 &&
        filterFormData.append(
          'dealership_ids',
          JSON.stringify(this.filters.dealership_ids)
        )
      this.$axios
        .$post('/lm/leads/export', filterFormData, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
            page: this.currentPage,
            sortvalue: this.sortData,
            orderby: this.currentSort,
            type: 'csv',
          },
        })
        .then((response) => {
          const link = document.createElement('a')
          link.href = response.data.filename
          link.setAttribute('download', 'leads.csv')
          document.body.appendChild(link)
          link.click()
        })
    },
    downloadLeadImportSampleFile() {
      const link = document.createElement('a')
      link.href = `${process.env.BACKAND_URL}/upload/import-sample-format/lead-import-sample-format.xlsx`
      link.setAttribute('download', 'lead-import-sample-format.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    toggleSortData(data) {
      if (this.isLoading) return
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'ASC'
      } else {
        this.currentSort = this.currentSort === 'ASC' ? 'DESC' : 'ASC'
      }
      this.leads = []
      this.currentPage = 0
      this.infiniteId = new Date().getTime()
    },
    changeLeadStatus(args, lead, product) {
      const changeLeadFormData = new FormData()
      changeLeadFormData.append(
        'url_workspace_id',
        this.$route.params.workspace_id
      )
      changeLeadFormData.append('lead_id', lead.id)
      product.dealership_id &&
        changeLeadFormData.append('dealership_id', product.dealership_id)
      changeLeadFormData.append('product_id', product.product_id)
      changeLeadFormData.append('lead_status', args.id)
      this.$axios
        .$post('lm/leads/update-status', changeLeadFormData)
        .then((response) => {
          if (response) {
            if (response.error.length > 0) {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            } else {
              this.$toast.success(response.message)
              const foundLead = lead.products.find(
                (p) => p.assignment_id === product.assignment_id
              )
              if (foundLead) {
                foundLead.lead_status = args.id
              }
              if (this.quickView.info && this.quickView.data) {
                const quickViewFoundLead = this.quickView.info.products.find(
                  (p) => p.assignment_id === product.assignment_id
                )
                if (quickViewFoundLead) {
                  quickViewFoundLead.lead_status = args.id
                }
              }
            }
          } else {
            this.$toast.error('Something went wrong.')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    addLeadFavourite(lead) {
      this.$axios
        .$post('lm/leads/add-lead-favourite', {
          workspace_id: this.$route.params.workspace_id,
          lead_id: lead.id,
          user_id: this.$auth.user.id,
          is_favourite: !lead.is_favourite,
        })
        .then((response) => {
          if (response) {
            if (response.error.length <= 0) {
              lead.is_favourite = !lead.is_favourite
              this.$toast.success(response.message)
            } else {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            }
          } else {
            this.$toast.error('Something went wrong.')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    // addLeadRead(lead) {
    //   this.$axios
    //     .$post('lm/leads/add-lead-read', {
    //       workspace_id: this.$route.params.workspace_id,
    //       lead_id: lead.id,
    //       user_id: this.$auth.user.id,
    //       is_read: !lead.is_read,
    //     })
    //     .then((response) => {
    //       if (response) {
    //         if (response.error.length <= 0) {
    //           lead.is_read = !lead.is_read
    //         } else {
    //           for (const err of response.error) {
    //             this.$toast.error(err)
    //           }
    //         }
    //       } else {
    //         this.$toast.error('Something went wrong.')
    //       }
    //     })
    //     .catch((err) => {
    //       this.$toast.error(this.$getErrorMessage(err))
    //     })
    // },
    addNote(note, lead_id) {
      if (!note) {
        return false
      }
      this.$axios
        .$post('/lm/leads/notes/add', {
          workspace_id: this.$route.params.workspace_id,
          lead_id,
          note,
        })
        .then((response) => {
          this.annotation = ''
          this.$toast.success(response.message)
        })
    },
    rangeDateChanged() {
      this.dStartDate = this.filters.start_date
      this.dEndDate = this.filters.end_date
      this.resetFilter()
      this.handlerDealerFilter()
      this.handleHeaderFilter()
      this.handleFilterChange()
    },
    getQuickViewData(id) {
      try {
        this.$axios.$get(`lm/leads/view?id=${id}`).then(({ data }) => {
          this.quickView.info = data && data
        })
        this.$axios
          .$post(`lm/sharpspring/get-lead-analitics`, {
            lead_id: id,
          })
          .then(({ data }) => {
            this.submittedForms = data.submitted_forms
              ? data.submitted_forms
              : []
            this.lastWebVisits = data.last_web_visit
            this.mostVisited = data.visited_pages_chart_data
              ? data.visited_pages_chart_data
              : []
            if (Array.isArray(this.mostVisited)) {
              this.recentWebVisits_ = this.mostVisited.map((e) => {
                if (isNaN(e.name) && e.name.search('http') === -1) {
                  const HTTPS = e.name.replace(`href='`, `href='https://`)
                  return HTTPS
                }
                return e.name
              })
            }
          })
        this.$axios
          .$get('/lm/leads/notes/list', {
            params: {
              workspace_id: this.$route.params.workspace_id,
              lead_id: id,
              page: 1,
            },
          })
          .then(({ data }) => {
            this.topNotesData = data.notesList.slice(0, 2)
          })
      } catch (err) {
        this.$toast.error(this.$getErrorMessage(err))
      }
    },
    handleFilterChange() {
      this.currentPage = 0
      this.leads = []
      this.infiniteId = new Date().getTime()
    },
    getDate() {
      if (this.lastDate > -1) {
        const { startDate, endDate } = this.getDateByDays(this.lastDate)
        this.filters.start_date = startDate
        this.filters.end_date = endDate
        this.dStartDate = startDate
        this.dEndDate = endDate
        this.resetFilter()
        this.handleHeaderFilter()
        this.handleFilterChange()
        this.handlerDealerFilter()
      } else if (this.lastDate === '-2') {
        this.$nextTick(() => {
          this.$refs.dateRangePicker.$el.click()
        })
      } else if (this.lastDate === '-1') {
        this.filters.start_date = null
        this.filters.end_date = null
        this.resetFilter()
        this.handleHeaderFilter()
        this.handleFilterChange()
        this.handlerDealerFilter()
      }
    },
    resetImportVars() {
      this.importDryValues = []
      this.importPayload = []
      this.selectedRow = []
      this.headers = []
      this.selectedIndex = []
      this.isInvalidImport = false
    },
    importLeadFileUpload(e) {
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
        .$post('lm/leads/get-leads-fields')
        .then(({ data }) => {
          data.headerFields.unshift({ id: 'xxx', text: 'Disabled' })
          this.databaseHeaders = data.headerFields
          this.requiredFields = data.requiredFields
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
          this.$refs.csvImport.value = ''
          this.resetImportVars()
          this.importFile = null
          this.importFileName = ''
        }
      } else {
        window.$('#import-modal').modal('hide')
      }
    },
    importHandler() {
      if (!this.checkIsValidImport()) {
        this.isInvalidImport = true
        return
      }
      this.isInvalidImport = false
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Importing leads, Please wait...',
      })
      const importFormData = new FormData()
      importFormData.append('file', this.importFile)
      importFormData.append('mappings', JSON.stringify(this.importPayload))
      this.$axios
        .$post('lm/leads/import-leads-with-mapping', importFormData)
        .then((data) => {
          this.$toast.success('Leads Imported Successfully')
          this.handleFilterChange()
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
          this.$refs.csvImport.value = ''
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
    handleNewLeadView(val) {
      this.filters.new_lead = false
      this.filters.not_assigned = false
      if (val === 'new_lead') this.filters.new_lead = true
      else if (val === 'not_assigned') this.filters.not_assigned = true
      this.handleFilterChange()
    },
    changeMultiDealer({ selectedDealer, timeOut }) {
      this.filters.dealership_ids = selectedDealer
      this.filters.products = []
      _debounce(() => {
        this.handleFilterChange()
      }, timeOut)
    },
  },
}
</script>

<style scoped>
.date-picker {
  height: 31px !important;
  width: 30px !important;
  background-color: white !important;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<style>
.dealer-dropdown .select2 {
  width: 100% !important;
}
</style>

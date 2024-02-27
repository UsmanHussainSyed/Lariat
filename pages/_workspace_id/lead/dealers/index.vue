<template>
  <div class="body-content">
    <div class="resizableMain lead-dashboard">
      <div class="resizableRight">
        <div class="common-box-header fixed-btn-right">
          <h2 class="title">
            Dealers - <strong> {{ dealerCount }} </strong>
          </h2>
          <div class="table-filter sep-list">
            <ul>
              <li
                v-if="
                  $_auth().user.lead.isSuperAdmin &&
                  $auth.user.allow_dealership_import === '1'
                "
              >
                <a
                  href="javascript:void(0);"
                  class="static-modal-link"
                  data-toggle="modal"
                  data-target="#import-modal"
                >
                  <ImportIcon />
                  Import
                </a>
              </li>
              <li>
                <a v-tooltip="'Export to CSV'" @click="exportCSV()">
                  <ExportIcon />
                  Export
                </a>
              </li>
              <li>
                <div class="search-pr">
                  <form
                    class="navbar-form search-navbar-form"
                    role="search"
                    @submit.prevent
                  >
                    <div class="input-group">
                      <button class="btn-search hidden-xs" type="submit">
                        <SearchIcon />
                      </button>
                      <input
                        id="srch-term"
                        v-model="dealerName"
                        class="form-control"
                        placeholder="Search..."
                        name="srch-term"
                        type="text"
                        @input="changeDealerName"
                        @keyup.enter="changeDealerName"
                      />
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="common-box bg-gray">
          <div
            :class="{ 'show-detail': $auth.user.detail_view == 1 }"
            class="table-list-view multi-table-view detail-view-on"
          >
            <ul class="thead">
              <li>
                <div
                  class="name-email sorting sortarrow flex22"
                  :class="[
                    sortData === 'dealership_name' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <div class="blank-space30"></div>
                  <span @click="toggleSortData('dealership_name')"
                    >Dealer/Location</span
                  >
                </div>
                <div
                  class="last-score sorting sortarrow flex16"
                  :class="[
                    sortData === 'primary_contact' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="toggleSortData('primary_contact')"
                    >Primary Contact/Designation</span
                  >
                </div>
                <div class="last-activity sorting flex14">
                  <span>RSMs</span>
                </div>
                <div class="last-activity sorting flex9">
                  <span>Category</span>
                </div>
                <div class="last-activity sorting flex9">
                  <span>Products/Models</span>
                </div>
                <div
                  class="dealers sorting sortarrow flex10"
                  :class="[
                    sortData === 'last_activity' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="toggleSortData('last_activity')"
                    >Last Activity</span
                  >
                </div>
                <div
                  class="sorting sortarrow flex10 text-center"
                  :class="[
                    sortData === 'assign_leads' && currentSort === 'desc'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="toggleSortData('assign_leads')"
                    >Lead Contacts</span
                  >
                </div>
                <div class="sorting flex10">
                  <span>Action</span>
                </div>
              </li>
            </ul>
            <div ref="scrollContainer" class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="(dealer, index) in dealerList" :key="dealer.id">
                  <div class="name-email tb-column flex22">
                    <div class="dealer-num">{{ index + 1 }}</div>
                    <div
                      v-if="dealer.dealership_logo"
                      class="profile-bg"
                      :style="{
                        backgroundImage: `url(${dealer.dealership_logo})`,
                      }"
                    ></div>
                    <div v-else class="profile-char">
                      {{
                        dealer.dealership_name.trim().charAt(0).toUpperCase()
                      }}
                    </div>
                    <div>
                      <div class="top-column">
                        <label
                          ><nuxt-link
                            :to="{
                              name: 'workspace_id-lead-dealers-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: dealer.id,
                              },
                            }"
                            >{{
                              dealer.dealership_name
                                ? dealer.dealership_name
                                : '-'
                            }}</nuxt-link
                          ></label
                        >
                      </div>
                      <div class="bottom-column">
                        <span>{{ dealer.city + ', ' + dealer.country }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="tb-column flex16">
                    <div class="top-column">
                      <label>
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-lead-dealers-id',
                            params: {
                              workspace_id: $_auth().id,
                              id: dealer.id,
                            },
                          }"
                        >
                          {{
                            dealer.primary_contact
                              ? dealer.primary_contact
                              : '-'
                          }}
                        </nuxt-link>
                      </label>
                    </div>
                    <div class="bottom-column">
                      <span>
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-lead-dealers-id',
                            params: {
                              workspace_id: $_auth().id,
                              id: dealer.id,
                            },
                          }"
                        >
                          {{
                            dealer.primary_contact_role
                              ? dealer.primary_contact_role
                              : '-'
                          }}
                        </nuxt-link>
                      </span>
                    </div>
                  </div>
                  <div class="rsm tb-column flex14">
                    <div
                      v-if="!dealer.dealership_rsm.length"
                      class="top-column"
                    >
                      <label> - </label>
                    </div>
                    <div
                      v-if="!dealer.dealership_rsm.length"
                      class="bottom-column"
                    >
                      <label> - </label>
                    </div>
                    <div
                      v-for="rsm in dealer.dealership_rsm"
                      :key="rsm.name"
                      class="bottom-column"
                    >
                      <div>
                        <label>{{ rsm.rsm_name || '-' }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="category tb-column flex9">
                    <div
                      v-if="!dealer.dealership_rsm.length"
                      class="top-column"
                    >
                      <label> - </label>
                    </div>
                    <div
                      v-if="!dealer.dealership_rsm.length"
                      class="bottom-column"
                    >
                      <label> - </label>
                    </div>
                    <div
                      v-for="(rsm, i) in dealer.dealership_rsm"
                      :key="rsm.name"
                    >
                      <span
                        class="classes"
                        :class="{
                          'bg-blue': i === 0,
                          'bg-orange': i === 1,
                        }"
                        >{{ rsm.category_name || '-' }}</span
                      >
                    </div>
                  </div>
                  <div class="assigned-products tb-column flex9">
                    <div
                      v-if="!dealer.dealership_rsm.length"
                      class="top-column"
                    >
                      <label> - </label>
                    </div>
                    <div
                      v-if="!dealer.dealership_rsm.length"
                      class="bottom-column"
                    >
                      <label> - </label>
                    </div>
                    <div v-else>
                      <div>
                        <div class="products">
                          <div class="dropdown">
                            <a
                              href="javascript:void(0);"
                              class="dropdown-toggle"
                              ><span
                                v-if="dealer.dealership_rsm.length"
                                class="bg-gray"
                                >{{
                                  dealer.dealership_rsm[0].assigned_products
                                }}</span
                              ></a
                            >
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="products">
                          <div class="dropdown">
                            <a
                              href="javascript:void(0);"
                              class="dropdown-toggle"
                              ><span
                                v-if="dealer.dealership_rsm.length > 1"
                                class="bg-gray"
                                >{{
                                  dealer.dealership_rsm[1].assigned_products
                                }}</span
                              ></a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="last-activity tb-column flex10">
                    <div class="top-column">
                      <label>{{ dealer.last_activity }}</label>
                    </div>
                  </div>
                  <div class="assigned-lead tb-column flex10 text-center">
                    <div class="top-column img-text">
                      <div class="big">
                        <LeadIcon />
                        <span>{{ dealer.assign_leads }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="hv-img tb-column flex10">
                    <ul class="action">
                      <li>
                        <nuxt-link
                          v-tooltip="'View Dealer'"
                          class="nav-link"
                          :to="{
                            name: 'workspace_id-lead-dealers-id',
                            params: {
                              workspace_id: $_auth().id,
                              id: dealer.id,
                            },
                          }"
                        >
                          <ReadIcon />
                        </nuxt-link>
                      </li>
                      <li
                        v-if="
                          $_auth().user.lead.isSuperAdmin &&
                          $auth.user.allow_deleting_dealerships === '1'
                        "
                      >
                        <a
                          href="javascript:void(0);"
                          @click="
                            setDeletedDealer(
                              dealer.dealership_name,
                              dealer.id,
                              index
                            )
                          "
                        >
                          <DeleteIcon />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <EmptyState v-if="noDealer"> <p>No Data Found</p> </EmptyState>
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
                        :height="100"
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
                      <EmptyState v-if="defaultNoData"
                        ><p>You haven't added any Dealer yet!</p>
                        <nuxt-link
                          v-if="$_auth().user.lead.isSuperAdmin"
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-lead-dealers-add',
                            params: { workspace_id: $_auth().id },
                          }"
                        >
                          <PlusIcon />

                          Add New</nuxt-link
                        ></EmptyState
                      >
                    </div>
                  </infinite-loading>
                </client-only>
              </ul>
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
            <h5 class="modal-title">Import Dealers</h5>
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
                      @change="importDealerFileUpload($event)"
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
                    @click="downloadDealershipImportSampleFile"
                  >
                    Download Sample File
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="!importLoading && headers.length"
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
              v-if="!importLoading && headers.length"
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
            <div v-else-if="importLoading" class="loading">
              Parsing the file...
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="isDeleting"
      @click:confirm-button="deleteDealership"
    >
      <template slot="header">Delete selected Dealer</template>

      Are you sure you want to Delete
      <b>{{ selectedDealer.name }} ?</b>
    </ConfirmationDialog>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import XLSX from 'xlsx'
import _ from 'lodash'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import LeadIcon from '~/components/svg/LeadIcon'
import EmptyState from '~/components/theme/global/EmptyState'
import Select2 from '~/components/lead/Select2'
import { IMPORT_ACCEPTED_TYPES } from '~/utils'
import ExportIcon from '~/components/lead/Icons/ExportIcon'

export default {
  components: {
    ExportIcon,
    LeadIcon,
    ContentLoader,
    Select2,
    ConfirmationDialog,
    EmptyState,
  },
  layout: 'leadLayout',
  middleware: ['authCheck', 'can-access-lead-module', 'can-access-dealerList'],
  data() {
    return {
      isDealerLoading: false,
      dealerList: [],
      defaultView: [],
      page: 0,
      last_page: null,
      sortData: null,
      currentSort: 'asc',
      dealerCount: 0,
      dealerName: '',
      noDealer: false,
      imageURL: null,
      infiniteId: +new Date(),
      firstLoad: true,
      contentLoaderData: [0, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      defaultNoData: false,
      isSorting: false,
      // import dependencies
      headers: [],
      databaseHeaders: [],
      importDryValues: [],
      selectedRow: [],
      selectedIndex: [],
      importFile: null,
      importFileName: '',
      importLoading: false,
      importPayload: [],
      requiredFields: [],
      isInvalidImport: false,
      // delete dealer vars
      isDeleting: false,
      selectedDealer: {
        name: '',
        dealerId: null,
        index: null,
      },
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
  created() {
    this.getDealerImportFields()
  },
  methods: {
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
    setDeletedDealer(name, id, index) {
      this.isDeleting = true
      this.selectedDealer.name = name
      this.selectedDealer.dealerId = id
      this.selectedDealer.index = index
    },
    deleteDealership() {
      this.$axios
        .$post('lm/dealership/delete', {
          dealershipId: this.selectedDealer.dealerId,
        })
        .then((res) => {
          this.$toast.success(res.message)
          this.dealerList.splice(this.selectedDealer.index, 1)
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
          // console.log(e)
        })
    },
    handleImageError(e) {
      e.target.src = `${require('@/assets/img/icon/building.svg')}`
    },
    changeDealerName: _.debounce(function () {
      this.page = 0
      this.dealerList = []
      this.infiniteId += 1
    }, 600),
    dealerNotfound() {
      if (this.defaultView.length !== 0) {
        if (this.dealerList.length === 0) {
          this.noDealer = true
          this.defaultNoData = false
        } else {
          this.noDealer = false
        }
      } else {
        this.defaultNoData = true
      }
    },
    infiniteHandler($state) {
      this.isDealerLoading = true
      this.noDealer = false
      this.page += 1
      const reqParams = {
        url_workspace_id: this.$route.params.workspace_id,
        page: this.page,
      }
      const sortVal = {
        sort_value: this.sortData,
        sort_by: this.currentSort,
      }
      if (this.isSorting) {
        Object.assign(reqParams, sortVal)
      }
      this.$axios
        .$post(
          `/lm/dealership/list`,
          {
            // product_ids: this.selectedProduct,
            dealership_name: this.dealerName,
            // start_date: this.startDate,
            // end_date: this.endDate,
          },
          {
            params: reqParams,
          }
        )
        .then(({ data }) => {
          if (data.data.length > 0) {
            this.imageURL = data.data[0].image_path
          }
          this.dealerCount = data.total
          this.lastPage = data.last_page
          if (data.data && data.data.length) {
            if (this.page === data.current_page) {
              this.dealerList.push(...data.data)
              this.dealerNotfound()

              if (this.firstLoad) {
                this.defaultView = [...this.dealerList]
                this.firstLoad = false
              }
              $state.loaded()

              if (this.lastPage === this.page) {
                $state.complete()
              }
              this.isDealerLoading = false
            }
          } else {
            this.dealerNotfound()
            $state.complete()
          }
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    resetImportVars() {
      this.importDryValues = []
      this.importPayload = []
      this.selectedRow = []
      this.headers = []
      this.selectedIndex = []
      this.isInvalidImport = false
    },
    importDealerFileUpload(e) {
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
    getDealerImportFields() {
      this.$axios
        .$post('lm/dealership/get-dealership-fields')
        .then(({ data }) => {
          data.headerFields.unshift({ id: 'xxx', text: 'Disabled' })
          this.databaseHeaders = data.headerFields
          this.requiredFields = data.requiredFields
        })
        .catch((e) => {
          console.log(e)
        })
    },
    importHandler() {
      if (!this.checkIsValidImport()) {
        this.isInvalidImport = true
        return
      }
      this.isInvalidImport = false
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Importing Dealers, Please wait...',
      })
      const importFormData = new FormData()
      importFormData.append('file', this.importFile)
      importFormData.append('mappings', JSON.stringify(this.importPayload))
      this.$axios
        .$post('lm/dealership/import-dealership-with-mapping', importFormData)
        .then((data) => {
          this.$toast.success('Dealers Imported Successfully')
          this.changeDealerName()
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
      this.importLoading = true
      const reader = new FileReader()
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
          this.importLoading = false
        })
      })
    },
    selectRow(data, index) {
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
          this.importFile = null
          this.$refs.csvImport.value = ''
          this.importFileName = ''
        }
      } else {
        window.$('#import-modal').modal('hide')
      }
    },
    exportCSV() {
      this.$axios
        .$post(
          '/lm/dealership/export',
          {
            // product_ids: this.selectedProduct,
            dealership_name: this.dealerName,
            // start_date: this.startDate,
            // end_date: this.endDate,
          },
          {
            params: {
              url_workspace_id: this.$route.params.workspace_id,
              sort_value: this.sortData,
              sort_by: this.currentSort,
              type: 'csv',
            },
          }
        )
        .then((response) => {
          const link = document.createElement('a')
          link.href = response.data.filename
          link.setAttribute('download', 'dealerships.csv')
          document.body.appendChild(link)
          link.click()
        })
    },
    downloadDealershipImportSampleFile() {
      const link = document.createElement('a')
      link.href = `${process.env.BACKAND_URL}/upload/import-sample-format/dealership-import-sample-format.xlsx`
      link.setAttribute('download', 'dealership-import-sample-format.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    toggleSortData(data) {
      if (this.isDealerLoading) return
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'desc'
      } else {
        this.currentSort = this.currentSort === 'asc' ? 'desc' : 'asc'
      }
      this.page = 0
      this.dealerList = []
      this.infiniteId += 1
      this.isSorting = true
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
</style>

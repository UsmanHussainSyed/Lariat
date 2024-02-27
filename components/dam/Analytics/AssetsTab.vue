<template>
  <div class="body-content analytics">
    <div class="common-box-header report-header">
      <div
        v-if="
          selectedTimeframeText != 'All Time' &&
          selectedTimeframeText != 'Custom Date'
        "
        class="report-slide"
      >
        <button @click="previousTimeFrame">
          <svg
            id="Layer_1"
            class="arrow-left-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4475" transform="translate(-871 -421)">
              <rect
                id="Rectangle_3013"
                x="871"
                y="421"
                class="fill-hide"
                width="18"
                height="18"
              />
              <g
                id="Icon_feather-chevron-down"
                transform="translate(581.631 103.451)"
              >
                <path
                  id="Path_3433"
                  class="fill-color"
                  d="M301.9,334.3c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l7-7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-6.5,6.5l6.5,6.5c0.3,0.3,0.3,0.8,0,1.1C302.3,334.2,302.1,334.3,301.9,334.3z"
                />
              </g>
            </g>
          </svg>
        </button>
        <button @click="nextTimeFrame">
          <svg
            id="Layer_1"
            class="arrow-right-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4476" transform="translate(-921 -421)">
              <rect
                id="Rectangle_3014"
                x="921"
                y="421"
                class="fill-hide"
                width="18"
                height="18"
              />
              <g
                id="Icon_feather-chevron-down"
                transform="translate(925.75 422.25)"
              >
                <path
                  id="Path_3433"
                  class="fill-color"
                  d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
      <h2 v-if="selectedTimeframeText != 'All Time'" class="title">
        {{ $moment(graph.dates.startDate).format(DISPLAY_DATE_FORMAT) }} -
        {{ $moment(graph.dates.endDate).format(DISPLAY_DATE_FORMAT) }}
      </h2>
      <div class="month-range-filter">
        <Select2
          v-model="selectedTimeFrameId"
          :options="timeFrame"
          :custom-event="true"
          @changeSelect2="dateChangeHandler(...arguments)"
        />
      </div>
      <div class="report-date">
        <DateRangePicker
          v-if="showCustomDate"
          :class-obj="{ daterange: true }"
          :start-date.sync="customStartDate"
          :end-date.sync="customEndDate"
          custom-event
          disable-max-date
          @dateChanged="customDateSelected($event)"
        />
      </div>
    </div>
    <div class="analytics-tabs">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            data-toggle="tab"
            class="nav-link"
            :class="{ active: displayTab === 'assets' }"
            @click.capture.stop="tabChange"
            >Assets</a
          >
        </li>
        <li class="nav-item">
          <a
            data-toggle="tab"
            class="nav-link"
            :class="{ active: displayTab === 'share-link' }"
            @click.capture.stop="displayTab = 'share-link'"
            >Shared URLs</a
          >
        </li>
      </ul>
      <div class="tab-content">
        <div
          id="assets"
          class="tab-pane"
          :class="{ active: displayTab === 'assets' }"
        >
          <div v-if="showGraph" class="assets-chars h-100">
            <div class="customscrollbar">
              <div class="row big-gutters">
                <div class="col-md-4">
                  <div v-if="graph.loading" style="height: 150px; width: 300px">
                    <content-loader
                      :width="60"
                      :height="72"
                      class="normalLoader"
                      :speed="2"
                      :animate="true"
                    >
                      <rect x="6" y="4" rx="1" ry="1" width="50" height="20" />
                    </content-loader>
                  </div>
                  <div v-else class="box text-center">
                    <div>
                      <h4>
                        Uploaded Assets
                        <i
                          v-tooltip="
                            'Total assets including versions - [' +
                            totalAssetsIncludingVersion +
                            ']'
                          "
                          class="fa fa-info-circle"
                          aria-hidden="true"
                        ></i>
                      </h4>
                      <h3>{{ totalAssets }}</h3>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div v-if="graph.loading" style="height: 150px; width: 300px">
                    <content-loader
                      :width="60"
                      :height="72"
                      class="normalLoader"
                      :speed="2"
                      :animate="true"
                    >
                      <rect x="6" y="4" rx="1" ry="1" width="50" height="20" />
                    </content-loader>
                  </div>
                  <div v-else class="box text-center">
                    <div>
                      <h4>Storage Used</h4>
                      <h3>{{ $toHumanlySize(storageUsed) }}</h3>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div v-if="graph.loading" style="height: 150px; width: 300px">
                    <content-loader
                      :width="60"
                      :height="72"
                      class="normalLoader"
                      :speed="2"
                      :animate="true"
                    >
                      <rect x="6" y="4" rx="1" ry="1" width="50" height="20" />
                    </content-loader>
                  </div>
                  <div v-else class="box text-center">
                    <div>
                      <h4>Downloads</h4>
                      <h3>{{ $toHumanlySize(totalDownloads) }}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row big-gutters mt2">
                <div class="col-md-6">
                  <div class="chat-box">
                    <a
                      class="title"
                      @click="showAll('category', 'groupByCategory')"
                      >Total Assets Grouped by Category</a
                    >
                    <Bar
                      v-if="groupBy"
                      id="group-by"
                      ref="groupBy"
                      :chart-data="groupByData"
                      :options="groupByOptions"
                      :height="350"
                    ></Bar>
                    <div v-else class="no-data">
                      <div>
                        <img
                          src="~/assets/img/graphchart-no-data.png"
                          alt=""
                          class="img-responsive img-center"
                        />
                        <span>Data not available</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="chat-box">
                    <a
                      class="title"
                      @click="showAll('download', 'downloadByAsset')"
                      >Assets Downloaded by Size</a
                    >
                    <Bar
                      v-if="assetsDownload"
                      ref="downloadBy"
                      :chart-data="assetsDownloadData"
                      :options="assetsDownloadOptions"
                      :height="350"
                    ></Bar>
                    <div v-else class="no-data">
                      <div>
                        <img
                          src="~/assets/img/graphchart-no-data.png"
                          alt=""
                          class="img-responsive img-center"
                        />
                        <span>Data not available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row big-gutters mt2">
                <div class="col-md-6">
                  <div class="chat-box">
                    <a class="title" @click="showAll('download', 'byCategory')"
                      >Assets Downloaded by Category</a
                    >
                    <Doughnut
                      v-if="categoryDownload"
                      :chart-data="categoryDownloadData"
                      :options="categoryDownloadOptions"
                      :height="420"
                    ></Doughnut>
                    <div v-else class="no-data">
                      <div>
                        <img
                          src="~/assets/img/piechart-no-data.png"
                          alt=""
                          class="img-responsive img-center"
                        />
                        <span>Data not available</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="chat-box">
                    <a class="title" @click="showAll('view', 'byCategory')"
                      >Assets Viewed by Category</a
                    >
                    <Doughnut
                      v-if="categoryView"
                      :chart-data="categoryViewData"
                      :options="categoryViewOptions"
                      :height="420"
                    ></Doughnut>
                    <div v-else class="no-data">
                      <div>
                        <img
                          src="~/assets/img/piechart-no-data.png"
                          alt=""
                          class="img-responsive img-center"
                        />
                        <span>Data not available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row big-gutters mt2">
                <div class="col-md-6">
                  <div class="chat-box">
                    <a class="title" @click="showAll('download', 'byDevice')"
                      >Assets Downloaded by Device Type</a
                    >
                    <Doughnut
                      v-if="deviceDownload"
                      :chart-data="deviceDownloadData"
                      :options="deviceDownloadOptions"
                      :height="420"
                    ></Doughnut>
                    <div v-else class="no-data">
                      <div>
                        <img
                          src="~/assets/img/piechart-no-data.png"
                          alt=""
                          class="img-responsive img-center"
                        />
                        <span>Data not available</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="chat-box">
                    <a class="title" @click="showAll('view', 'byDevice')"
                      >Assets Viewed by Device Type</a
                    >
                    <Doughnut
                      v-if="deviceTypeView"
                      :chart-data="deviceTypeViewData"
                      :options="deviceTypeViewOptions"
                      :height="420"
                    ></Doughnut>
                    <div v-else class="no-data">
                      <div>
                        <img
                          src="~/assets/img/piechart-no-data.png"
                          alt=""
                          class="img-responsive img-center"
                        />
                        <span>Data not available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!showGraph" class="assets-list-permission h-100">
            <!-- <h4 class="title">
              <a class="back" @click="backToGraph">
                <svg
                  id="Layer_1"
                  class="back-icon blue"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4468" transform="translate(-577 -181)">
                    <rect
                      id="Rectangle_3007"
                      x="577"
                      y="181"
                      class="fill-hide"
                      width="18"
                      height="18"
                    ></rect>
                    <g id="Group_4425" transform="translate(-514.168 -476.583)">
                      <path
                        id="Icon_material-backspace"
                        class="fill-color"
                        d="M1107.7,659.8h-11.3c-0.5,0-0.9,0.3-1.2,0.7l-4.1,6.1l4.1,6.1c0.3,0.4,0.7,0.7,1.2,0.7h11.3c0.8,0,1.5-0.7,1.5-1.5v-10.5C1109.2,660.5,1108.5,659.8,1107.7,659.8z"
                      ></path>
                      <g id="Group_4424">
                        <g id="Group_4422">
                          <path
                            id="Path_3527"
                            class="fill-white"
                            d="M1099.7,669.8c-0.4,0-0.7-0.3-0.7-0.8c0-0.2,0.1-0.4,0.2-0.5l5-5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.7,0,1l-5,5C1100.1,669.8,1099.9,669.8,1099.7,669.8z"
                          ></path>
                        </g>
                        <g id="Group_4423">
                          <path
                            id="Path_3528"
                            class="fill-white"
                            d="M1104.7,669.8c-0.2,0-0.4-0.1-0.5-0.2l-5-5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l5,5c0.3,0.3,0.3,0.8,0,1.1C1105.1,669.8,1104.9,669.8,1104.7,669.8L1104.7,669.8z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                Analytics
                <span>{{ breadcrumbsHeader }}</span>
              </a>
            </h4>-->
            <div class="breadcrumb-links">
              <ul>
                <li>
                  <a href="javascript:void(0);" @click="backToGraph"
                    ><svg
                      id="Layer_1"
                      class="back-icon blue mr-1"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4468" transform="translate(-577 -181)">
                        <rect
                          id="Rectangle_3007"
                          x="577"
                          y="181"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Group_4425"
                          transform="translate(-514.168 -476.583)"
                        >
                          <path
                            id="Icon_material-backspace"
                            class="fill-color"
                            d="M1107.7,659.8h-11.3c-0.5,0-0.9,0.3-1.2,0.7l-4.1,6.1l4.1,6.1c0.3,0.4,0.7,0.7,1.2,0.7h11.3c0.8,0,1.5-0.7,1.5-1.5v-10.5C1109.2,660.5,1108.5,659.8,1107.7,659.8z"
                          ></path>
                          <g id="Group_4424">
                            <g id="Group_4422">
                              <path
                                id="Path_3527"
                                class="fill-white"
                                d="M1099.7,669.8c-0.4,0-0.7-0.3-0.7-0.8c0-0.2,0.1-0.4,0.2-0.5l5-5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.7,0,1l-5,5C1100.1,669.8,1099.9,669.8,1099.7,669.8z"
                              ></path>
                            </g>
                            <g id="Group_4423">
                              <path
                                id="Path_3528"
                                class="fill-white"
                                d="M1104.7,669.8c-0.2,0-0.4-0.1-0.5-0.2l-5-5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l5,5c0.3,0.3,0.3,0.8,0,1.1C1105.1,669.8,1104.9,669.8,1104.7,669.8L1104.7,669.8z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g></svg
                    >Analytics</a
                  >
                </li>
                <li>
                  <span>{{ breadcrumbsHeader }}</span>
                </li>
              </ul>
            </div>
            <ul class="assetsType">
              <li>
                <span>Category : </span>
                <div class="search-by">
                  <Select2
                    class="select2-hidden-accessible"
                    :value="categoryBy"
                    :options="categoryList"
                    :attrs="{ minimumResultsForSearch: -1 }"
                    @input="changeCategory"
                  />
                </div>
              </li>
              <li>
                <span>Permission Type : </span>
                <div class="search-by">
                  <Select2
                    class="select2-hidden-accessible"
                    :value="permissionBy"
                    :options="permissionOptions"
                    :attrs="{ minimumResultsForSearch: -1 }"
                    @input="changePermission"
                  />
                </div>
              </li>
              <li>
                <span>All Assets :</span>
                <label>{{ allAssets }}</label>
              </li>
              <li>
                <span>Public Assets :</span>
                <label>{{ publicAssets }}</label>
              </li>
              <li>
                <span>Private Assets :</span>
                <label>{{ privateAssets }}</label>
              </li>
            </ul>
            <div class="common-box bg-gray grid-list">
              <div class="table-list-view table-list-scrolling">
                <AnalyticsListingHeader
                  key="header"
                  :reverse="sorting.toolbar.desc"
                  :sort-value.sync="sorting.toolbar.value"
                  @sort="(args) => args.forEach((arg) => sort(...arg))"
                />
                <div class="customscrollbar">
                  <div
                    v-if="loading"
                    style="margin: auto; overflow: hidden"
                    class="pb-3"
                  >
                    <ContentLoader
                      :speed="1"
                      :animate="true"
                      :width="450"
                      :height="200"
                      class="normalLoader"
                    >
                      <rect x="0" y="7" rx="4" ry="4" width="450" height="30" />
                      <rect
                        x="0"
                        y="40"
                        rx="4"
                        ry="4"
                        width="450"
                        height="30"
                      />
                      <rect
                        x="0"
                        y="73"
                        rx="4"
                        ry="4"
                        width="450"
                        height="30"
                      />
                      <rect
                        x="0"
                        y="106"
                        rx="4"
                        ry="4"
                        width="450"
                        height="30"
                      />
                    </ContentLoader>
                  </div>
                  <ul class="tbody">
                    <template v-for="{ file } in allItems">
                      <AnalyticsAsset :key="file.id" :file="file">
                      </AnalyticsAsset>
                    </template>
                    <div v-if="allItems.length === 0" class="no-data-found">
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
                        <p>No Data found</p>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SharedLinkTab :display-tab="displayTab" :dates="graph.dates" />
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'
import AnalyticsAsset from '~/components/dam/Analytics/AnalyticsAsset'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Bar from '~/components/plugins/Bar'
import Doughnut from '~/components/plugins/Doughnut'
import AnalyticsListingHeader from '~/components/dam/AssetList/AnalyticsListingHeader'
import assetSorting from '~/mixins/assetSorting'
import SharedLinkTab from '~/components/dam/Analytics/SharedLinkTab'

const groupBycategories = [
  { text: 'All', id: 'all' },
  { text: 'Audios', id: 'audio' },
  { text: 'Documents', id: 'document' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
  { text: 'Uncategorized', id: 'uncategorized' },
  { text: 'Archive', id: 'archive' },
]
const byCategories = [
  { text: 'All', id: 'all' },
  { text: 'Audios', id: 'audio' },
  { text: 'Documents', id: 'document' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
]
const byDevice = [
  { text: 'All', id: 'all' },
  { text: 'Desktop', id: 'desktop' },
  { text: 'Android', id: 'android' },
  { text: 'IOS', id: 'ios' },
]
const permissionList = [
  { text: 'All', id: 'all' },
  { text: 'Public', id: 'public' },
  { text: 'Private', id: 'private' },
]
const downloadByAsset = [
  { text: 'All', id: 'all' },
  { text: '1 Byte - 100 KB', id: '1 byte - 100 kb' },
  { text: '101 KB - 100 MB', id: '101 kb - 100 mb' },
  { text: '101 MB - 1 GB', id: '101 mb - 1 gb' },
  { text: 'More than 1 GB', id: 'more than 1 gb' },
]

export default {
  components: {
    AnalyticsAsset,
    Select2,
    ContentLoader,
    DateRangePicker,
    Bar,
    Doughnut,
    AnalyticsListingHeader,
    SharedLinkTab,
  },
  mixins: [assetSorting],
  data() {
    return {
      displayTab: 'assets',
      storageUsed: null,
      totalAssets: null,
      totalAssetsIncludingVersion: '',
      totalDownloads: null,
      groupBy: false,
      groupByData: null,
      groupByOptions: {},
      assetsDownload: false,
      assetsDownloadData: null,
      assetsDownloadOptions: {},
      categoryDownload: false,
      categoryDownloadData: null,
      categoryDownloadOptions: {},
      deviceDownload: false,
      deviceDownloadData: null,
      deviceDownloadOptions: {},
      categoryView: false,
      categoryViewData: null,
      categoryViewOptions: {},
      deviceTypeView: false,
      deviceTypeViewData: null,
      deviceTypeViewOptions: {},
      showGraph: true,
      categoryBy: null,
      permissionBy: null,
      loadCategoryList: null,
      downloadByAsset: [],
      files: [],
      loading: true,
      chartType: null,
      fromBandwidth: null,
      toBandwidth: null,
      allAssets: 0,
      publicAssets: 0,
      privateAssets: 0,
      selectedTimeFrameId: 1,
      selectedTimeframeText: 'Week',
      breadcrumbsHeader: '',

      graph: {
        loading: true,
        dates: {
          month: true,
          week: false,
          startDate: this.$moment().startOf('isoWeek'),
          endDate: this.$moment().endOf('isoWeek'),
        },
      },
      todayDate: this.$moment(),
      activeDate: this.$moment(),
      customStartDate: null,
      customEndDate: null,
      showCustomDate: false,
      SAVE_DATE_FORMAT: 'YYYY-MM-DD',
      DISPLAY_DATE_FORMAT: 'D, MMM YYYY',

      timeFrame: [
        {
          id: 1,
          text: 'Week',
        },
        {
          id: 3,
          text: 'Semi Month',
        },
        {
          id: 2,
          text: 'Month',
        },
        {
          id: 4,
          text: 'Quarter',
        },
        {
          id: 5,
          text: 'Year',
        },
        {
          id: 6,
          text: 'All Time',
        },
        {
          id: 7,
          text: 'Custom Date',
        },
      ],
    }
  },
  computed: {
    permissionOptions() {
      return permissionList
    },
    allItems() {
      return [...this.files.map((ev) => ({ file: ev }))]
    },
    categoryList() {
      let x = null
      switch (this.loadCategoryList) {
        case 'groupByCategory':
          x = groupBycategories
          break
        case 'byCategory':
          x = byCategories
          break
        case 'byDevice':
          x = byDevice
          break
        case 'downloadByAsset':
          x = downloadByAsset
          break
      }
      return x
    },
  },
  created() {
    this.getGraphData(
      this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
      this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
    )
  },
  methods: {
    tabChange() {
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
      this.displayTab = 'assets'
    },
    nextTimeFrame() {
      if (this.selectedTimeframeText === 'Week') {
        this.activeDate = this.$moment(this.activeDate).add(1, 'week')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'isoWeek'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf(
          'isoWeek'
        )
      }
      if (this.selectedTimeframeText === 'Month') {
        this.activeDate = this.$moment(this.activeDate).add(1, 'month')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'month'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf('month')
      }
      if (this.selectedTimeframeText === 'Year') {
        this.activeDate = this.$moment(this.activeDate).add(1, 'year')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'year'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf('year')
      }

      if (this.selectedTimeframeText === 'Quarter') {
        this.activeDate = this.$moment(this.activeDate).add(1, 'quarter')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'quarter'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf(
          'quarter'
        )
      }
      if (this.selectedTimeframeText === 'Semi Month') {
        const day = this.$moment(this.graph.dates.startDate).format('D')
        if (Number(day) >= 15) {
          this.graph.dates.startDate = this.$moment(this.graph.dates.endDate)
            .add(1, 'month')
            .startOf('month')
          this.graph.dates.endDate = this.$moment(
            this.graph.dates.startDate
          ).add(14, 'day')
        }
        if (Number(day) <= 15) {
          this.graph.dates.endDate = this.$moment(
            this.graph.dates.startDate
          ).endOf('month')
          this.graph.dates.startDate = this.$moment(this.graph.dates.endDate)
            .startOf('month')
            .add(15, 'day')
        }
      }
      if (this.displayTab === 'assets') {
        this.getGraphData(
          this.$moment(this.graph.dates.startDate).format(
            this.SAVE_DATE_FORMAT
          ),
          this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
        )
      }
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    previousTimeFrame() {
      if (this.selectedTimeframeText === 'Week') {
        this.activeDate = this.$moment(this.activeDate).subtract(1, 'week')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'isoWeek'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf(
          'isoWeek'
        )
      }
      if (this.selectedTimeframeText === 'Month') {
        this.activeDate = this.$moment(this.activeDate).subtract(1, 'month')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'month'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf('month')
      }
      if (this.selectedTimeframeText === 'Year') {
        this.activeDate = this.$moment(this.activeDate).subtract(1, 'year')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'year'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf('year')
      }
      if (this.selectedTimeframeText === 'Quarter') {
        this.activeDate = this.$moment(this.activeDate).subtract(1, 'quarter')
        this.graph.dates.startDate = this.$moment(this.activeDate).startOf(
          'quarter'
        )
        this.graph.dates.endDate = this.$moment(this.activeDate).endOf(
          'quarter'
        )
      }
      if (this.selectedTimeframeText === 'Semi Month') {
        const day = this.$moment(this.graph.dates.startDate).format('D')
        if (Number(day) > 15) {
          this.graph.dates.endDate = this.$moment(
            this.graph.dates.startDate
          ).subtract(day - 15, 'day')
          this.graph.dates.startDate = this.$moment(
            this.graph.dates.endDate
          ).startOf('month')
        }
        if (Number(day) <= 15) {
          this.graph.dates.endDate = this.$moment(this.graph.dates.startDate)
            .subtract(1, 'month')
            .endOf('month')
          this.graph.dates.startDate = this.$moment(this.graph.dates.endDate)
            .startOf('month')
            .add(15, 'day')
        }
      }
      if (this.displayTab === 'assets') {
        this.getGraphData(
          this.$moment(this.graph.dates.startDate).format(
            this.SAVE_DATE_FORMAT
          ),
          this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
        )
      }
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    customDateSelected(data) {
      this.graph.dates.startDate = this.customStartDate
      this.graph.dates.endDate = this.customEndDate
      if (this.displayTab === 'assets') {
        this.getGraphData(
          this.$moment(this.graph.dates.startDate).format(
            this.SAVE_DATE_FORMAT
          ),
          this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
        )
      }
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    dateChangeHandler(data) {
      this.selectedTimeframeText = data.text
      this.activeDate = this.$moment()

      if (data.text === 'Week') {
        this.graph.dates.startDate = this.$moment(this.todayDate).startOf(
          'isoWeek'
        )
        this.graph.dates.endDate = this.$moment(this.todayDate).endOf('isoWeek')
      }

      if (data.text === 'Month') {
        this.graph.dates.startDate = this.$moment(this.todayDate).startOf(
          'month'
        )
        this.graph.dates.endDate = this.$moment(this.todayDate).endOf('month')
      }

      if (data.text === 'Year') {
        this.graph.dates.startDate = this.$moment(this.todayDate).startOf(
          'year'
        )
        this.graph.dates.endDate = this.$moment(this.todayDate).endOf('year')
      }

      if (data.text === 'Quarter') {
        this.graph.dates.startDate = this.$moment(this.todayDate).startOf(
          'quarter'
        )
        this.graph.dates.endDate = this.$moment(this.todayDate).endOf('quarter')
      }

      if (data.text === 'Semi Month') {
        const day = this.$moment(this.todayDate).format('D')
        if (Number(day) > 15) {
          this.graph.dates.endDate = this.$moment(this.todayDate).endOf('month')
          this.graph.dates.startDate = this.$moment(this.graph.dates.endDate)
            .startOf('month')
            .add(15, 'day')
        }
        if (Number(day) <= 15) {
          this.graph.dates.startDate = this.$moment(this.todayDate).startOf(
            'month'
          )
          this.graph.dates.endDate = this.$moment(
            this.graph.dates.startDate
          ).add(15, 'day')
        }
      }

      if (data.text === 'Custom Date') {
        this.customStartDate = this.graph.dates.startDate
        this.customEndDate = this.graph.dates.endDate
        this.showCustomDate = true
      }
      if (this.selectedTimeframeText !== 'Custom Date') {
        this.showCustomDate = false
        if (this.displayTab === 'assets') {
          this.getGraphData(
            this.$moment(this.graph.dates.startDate).format(
              this.SAVE_DATE_FORMAT
            ),
            this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
          )
          if (this.selectedTimeframeText === 'All Time') {
            this.graph.dates.startDate = 'all'
            this.graph.dates.endDate = this.$moment(this.activeDate).format(
              this.SAVE_DATE_FORMAT
            )
          }
        }
      }
      if (this.selectedTimeframeText === 'All Time') {
        this.showCustomDate = false
        if (this.displayTab === 'share-link') {
          this.graph.dates.startDate = 'all'
          this.graph.dates.endDate = this.$moment(this.activeDate).format(
            this.SAVE_DATE_FORMAT
          )
        }
      }
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    showAll(chartType, categoryList) {
      this.permissionBy = 'all'
      this.categoryBy = 'all'
      this.chartType = chartType
      this.loadCategoryList = categoryList
      this.loadTable()
      this.showGraph = false
    },
    changeCategory(value) {
      if (value === '1 byte - 100 kb') {
        this.categoryBy = value
        this.fromBandwidth = 0
        this.toBandwidth = 102400
      } else if (value === '101 kb - 100 mb') {
        this.categoryBy = value
        this.fromBandwidth = 102400
        this.toBandwidth = 104857600
      } else if (value === '101 mb - 1 gb') {
        this.categoryBy = value
        this.fromBandwidth = 104857600
        this.toBandwidth = 1073741824
      } else if (value === 'more than 1 gb') {
        this.categoryBy = value
        this.fromBandwidth = 1073741824
        this.toBandwidth = null
      } else {
        this.categoryBy = value
      }
      this.loadTable()
    },
    changePermission(value) {
      this.permissionBy = value
      this.loadTable()
    },
    backToGraph() {
      this.showGraph = true
      this.categoryBy = null
      this.permissionBy = null
    },
    async loadTable() {
      this.loading = true
      let startDate = this.$moment(this.graph.dates.startDate).format(
        this.SAVE_DATE_FORMAT
      )
      let endDate = this.$moment(this.graph.dates.endDate).format(
        this.SAVE_DATE_FORMAT
      )
      this.allAssets = 0
      this.publicAssets = 0
      this.privateAssets = 0
      this.breadcrumbsHeader = ''
      if (this.selectedTimeframeText === 'All Time') {
        startDate = 'all'
        endDate = this.$moment(this.activeDate).format(this.SAVE_DATE_FORMAT)
      }
      const postData = {
        url_workspace_id: this.$getWorkspaceId(),
        workspace_id: this.$getWorkspaceId(),
        permission: this.permissionBy,
        category: this.categoryBy,
        start_date: startDate,
        end_date: endDate,
        by: this.chartType,
      }
      if (this.categoryBy === 'document') {
        postData.category = 'application'
      }
      if (
        Object.prototype.hasOwnProperty.call(postData, 'from_size') ||
        Object.prototype.hasOwnProperty.call(postData, 'to_size')
      ) {
        delete postData.from_size
        delete postData.to_size
      }

      if (this.loadCategoryList === 'downloadByAsset') {
        if (this.categoryBy === 'all') {
          postData.from_size = null
          postData.to_size = null
        } else {
          postData.from_size = this.fromBandwidth
          postData.to_size = this.toBandwidth
        }
      }

      if (
        this.chartType === 'category' &&
        this.loadCategoryList === 'groupByCategory'
      ) {
        this.breadcrumbsHeader = 'Total Assets Grouped by Category'
      } else if (
        this.chartType === 'download' &&
        this.loadCategoryList === 'downloadByAsset'
      ) {
        this.breadcrumbsHeader = 'Assets Downloaded by Size'
      } else if (
        this.chartType === 'download' &&
        this.loadCategoryList === 'byCategory'
      ) {
        this.breadcrumbsHeader = 'Assets Downloaded by Category'
      } else if (
        this.chartType === 'view' &&
        this.loadCategoryList === 'byCategory'
      ) {
        this.breadcrumbsHeader = 'Assets Viewed by Category'
      } else if (
        this.chartType === 'download' &&
        this.loadCategoryList === 'byDevice'
      ) {
        this.breadcrumbsHeader = 'Assets Downloaded by Device Type'
      } else if (
        this.chartType === 'view' &&
        this.loadCategoryList === 'byDevice'
      ) {
        this.breadcrumbsHeader = 'Assets Viewed by Device Type'
      }
      await this.$axios
        .$post(`digital-assets/assets-analytics-details`, postData)
        .then(({ data }) => {
          this.allAssets = data.total
          this.publicAssets = data.public
          this.privateAssets = data.private
          this.files = data.list.map(({ user, ...e }) => ({
            userName: user?.name || '-',
            ...e,
          }))
          this.files = this.files.sort(
            this.$sortBy('display_file_name', false, null, true)
          )

          this.loading = false
        })
        .catch(this.$errorToast)
    },
    graphInit({ month, week, endDate, startDate }) {
      const FORMAT = 'YYYY-MM-DD'
      const graph = { overview: {} }

      endDate = endDate || this.$moment().startOf('day').format(FORMAT)

      if (month) {
        startDate = this.$moment()
          .startOf('day')
          .subtract(1, 'month')
          .format(FORMAT)
        graph.dates = { month: true, startDate, endDate }
      } else if (week) {
        startDate = this.$moment()
          .startOf('day')
          .subtract(1, 'week')
          .format(FORMAT)
        graph.dates = { week: true, startDate, endDate }
      } else if (endDate && startDate) {
        graph.dates = { startDate, endDate, custom: true }
      }
      this.graph.dates = graph.dates
      if (this.showGraph === false) {
        this.loadTable()
      }
      this.getGraphData(startDate, endDate)
    },
    async getGraphData(startDate, endDate) {
      this.graph.loading = true

      if (this.selectedTimeframeText === 'All Time') {
        startDate = 'all'
        endDate = this.$moment(this.activeDate).format(this.SAVE_DATE_FORMAT)
      }
      await this.$axios
        .$post('digital-assets/assets-analytics', {
          workspace_id: this.$getWorkspaceId(),
          start_date: startDate,
          end_date: endDate,
        })
        .then(({ data }) => {
          this.groupBy = false
          this.assetsDownload = false
          this.categoryDownload = false
          this.deviceDownload = false
          this.categoryView = false
          this.deviceTypeView = false

          this.totalAssets = data.total_assets
          this.totalAssetsIncludingVersion = data.total_assets_including_version
          this.storageUsed = data.storage
          this.totalDownloads = data.bandwidth
          this.groupByCategory(data.group_by_category)
          this.totalAssetsDownload(data.assets_download)
          this.downloadByCategory(data.download_by_category)
          this.downloadByDeviceType(data.download_by_device_type)
          this.viewByCategory(data.view_by_category)
          this.viewByDeviceType(data.view_by_device_type)

          this.graph.loading = false
        })
        .catch(this.$errorToast)
    },
    groupByCategory(group_by_category) {
      const categoryKey = Object.keys(group_by_category)
      const categoryValue = Object.values(group_by_category)
      const privateAssetCount = []
      const publicAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (categoryValue[i].Total > 0 && this.groupBy === false) {
          this.groupBy = true
        }
        privateAssetCount.push(categoryValue[i].Private)
        publicAssetCount.push(categoryValue[i].Public)
      }
      this.groupByData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'No. of Private Assets',
            data: privateAssetCount,
            backgroundColor: '#01a1ff',
          },
          {
            label: 'No. of Public Assets',
            data: publicAssetCount,
            backgroundColor: '#61d939',
          },
        ],
      }
      this.groupByOptions = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              barPercentage: 0.5,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Count(s)',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'category'
            this.loadCategoryList = 'groupByCategory'
            this.selectedData(e)
          }
        },
      }
    },
    totalAssetsDownload(assets_download) {
      const assetsDownloadKey = Object.keys(assets_download)
      const downloadBandwidth = []
      assetsDownloadKey.map((item) => {
        switch (item) {
          case '100kb_less_than':
            downloadBandwidth.push('1 Byte - 100 KB')
            break
          case '101kb_to_100mb':
            downloadBandwidth.push('101 KB - 100 MB')
            break
          case '101mb_to_1gb':
            downloadBandwidth.push('101 MB - 1 GB')
            break
          case '1gb_to_grater_than':
            downloadBandwidth.push('More than 1 GB')
            break
          default:
            downloadBandwidth.push('New bandwidth')
        }
        return item
      })
      const assetsDownloadValue = Object.values(assets_download)
      const privateAssetCount = []
      const publicAssetCount = []
      for (let i = 0; i < assetsDownloadValue.length; i++) {
        if (
          assetsDownloadValue[i].Public > 0 &&
          this.assetsDownload === false
        ) {
          this.assetsDownload = true
        } else if (
          assetsDownloadValue[i].Private > 0 &&
          this.assetsDownload === false
        ) {
          this.assetsDownload = true
        }
        privateAssetCount.push(assetsDownloadValue[i].Private)
        publicAssetCount.push(assetsDownloadValue[i].Public)
      }
      this.assetsDownloadData = {
        labels: downloadBandwidth,
        datasets: [
          {
            label: 'No. of Private Assets including versions',
            data: privateAssetCount,
            backgroundColor: '#01a1ff',
          },
          {
            label: 'No. of Public Assets including versions',
            data: publicAssetCount,
            backgroundColor: '#61d939',
          },
        ],
      }
      this.assetsDownloadOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              barPercentage: 0.5,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Count(s)',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'download'
            this.loadCategoryList = 'downloadByAsset'
            this.selectedData(e)
          }
        },
      }
    },
    selectedData(evt) {
      let chart = null
      if (this.chartType === 'category') {
        chart = this.$refs.groupBy.$data._chart
      } else {
        chart = this.$refs.downloadBy.$data._chart
      }
      const chartIndex = chart.getElementAtEvent(evt)
      this.categoryBy = chartIndex?.[0]?._model?.label.toLowerCase()
      this.permissionBy =
        chartIndex?.[0]?._model?.datasetLabel.search('Public') > -1
          ? 'public'
          : 'private'
      if (this.loadCategoryList === 'downloadByAsset') {
        if (this.categoryBy === '1 byte - 100 kb') {
          this.fromBandwidth = 0
          this.toBandwidth = 102400
        } else if (this.categoryBy === '101 kb - 100 mb') {
          this.fromBandwidth = 102400
          this.toBandwidth = 104857600
        } else if (this.categoryBy === '101 mb - 1 gb') {
          this.fromBandwidth = 104857600
          this.toBandwidth = 1073741824
        } else if (this.categoryBy === 'more than 1 gb') {
          this.fromBandwidth = 1073741824
          this.toBandwidth = null
        }
      }
      this.showGraph = false
      this.loadTable()
    },
    downloadByCategory(download_by_category) {
      const { Total, ...download_by_category_data } = download_by_category
      const categoryKey = Object.keys(download_by_category_data)
      const categoryValue = Object.values(download_by_category_data)
      this.categoryDownload = download_by_category.Total > 0
      this.categoryDownloadData = {
        labels: categoryKey,
        datasets: [
          {
            backgroundColor: ['#02A566', '#FB3A2F', '#0086D3', '#B960FF'],
            data: categoryValue,
          },
        ],
      }
      this.categoryDownloadOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
        },
        onClick: (e, item) => {
          if (item.length) {
            this.chartType = 'download'
            this.loadCategoryList = 'byCategory'
            this.categoryBy = item?.[0]?._model?.label.toLowerCase()
            this.permissionBy = 'all'
            this.showGraph = false
            this.loadTable()
          }
        },
      }
    },
    downloadByDeviceType(download_by_device_type) {
      const { Total, ...download_device_type } = download_by_device_type
      const deviceKey = Object.keys(download_device_type)
      const deviceValue = Object.values(download_device_type)
      this.deviceDownload = download_by_device_type.Total > 0
      this.deviceDownloadData = {
        labels: deviceKey,
        datasets: [
          {
            backgroundColor: ['#2f578b', '#e7a23d', '#5d9649'],
            data: deviceValue,
          },
        ],
      }
      this.deviceDownloadOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
        onClick: (e, item) => {
          if (item.length) {
            this.chartType = 'download'
            this.loadCategoryList = 'byDevice'
            this.categoryBy = item?.[0]?._model?.label.toLowerCase()
            this.permissionBy = 'all'
            this.showGraph = false
            this.loadTable()
          }
        },
      }
    },
    viewByCategory(view_by_category) {
      const { Total, ...view_by_category_data } = view_by_category
      const categoryKey = Object.keys(view_by_category_data)
      const categoryValue = Object.values(view_by_category_data)
      this.categoryView = view_by_category.Total > 0
      this.categoryViewData = {
        labels: categoryKey,
        datasets: [
          {
            backgroundColor: ['#02A566', '#FB3A2F', '#0086D3', '#B960FF'],
            data: categoryValue,
          },
        ],
      }
      this.categoryViewOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        onClick: (e, item) => {
          if (item.length) {
            this.chartType = 'view'
            this.loadCategoryList = 'byCategory'
            this.categoryBy = item?.[0]?._model?.label.toLowerCase()
            this.permissionBy = 'all'
            this.showGraph = false
            this.loadTable()
          }
        },
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
        },
      }
    },
    viewByDeviceType(view_by_device_type) {
      const { Total, ...view_by_device_type_data } = view_by_device_type
      const deviceKey = Object.keys(view_by_device_type_data)
      const deviceValue = Object.values(view_by_device_type_data)
      this.deviceTypeView = view_by_device_type.Total > 0
      this.deviceTypeViewData = {
        labels: deviceKey,
        datasets: [
          {
            backgroundColor: ['#2f578b', '#e7a23d', '#5d9649'],
            data: deviceValue,
          },
        ],
      }
      this.deviceTypeViewOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        onClick: (e, item) => {
          if (item.length) {
            this.chartType = 'view'
            this.loadCategoryList = 'byDevice'
            this.categoryBy = item?.[0]?._model?.label.toLowerCase()
            this.permissionBy = 'all'
            this.showGraph = false
            this.loadTable()
          }
        },
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
        },
      }
    },
  },
}
</script>

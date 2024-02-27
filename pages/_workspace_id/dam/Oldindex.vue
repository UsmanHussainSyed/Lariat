<template>
  <div
    class="body-content dam-container pl0 pr0"
    :class="{ 'msg-added': (percent_50 && chartAlert) || uncategoryAlert }"
  >
    <div v-if="chartAlert && percent_50" class="success-msg pl10 pr10">
      <transition name="fade">
        <div
          class="alert alert-dismissible"
          :class="{
            'alert-warning': !percent_95,
            'alert-danger': percent_95,
          }"
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            @click="chartAlert = 0"
          >
            <span>dismiss</span>
          </button>
          <svg
            id="Layer_1"
            class="alert-icon mr-2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Upload_Failed">
              <path
                id="Subtraction_1"
                class="fill-color"
                d="M16.5,17H1.5c-0.5,0-1.1-0.3-1.3-0.8c-0.3-0.5-0.3-1.1,0-1.5L7.7,1.8C7.9,1.3,8.5,1,9,1c0.5,0,1.1,0.3,1.3,0.8l7.5,12.9c0.3,0.5,0.3,1.1,0,1.5C17.5,16.7,17,17,16.5,17z M9,13c-0.5,0-1,0.4-1,1c0,0.5,0.4,1,1,1c0.5,0,1-0.4,1-1C10,13.4,9.5,13,9,13L9,13z M9,5.8c-0.5,0-1,0.4-1,1v4c0,0.5,0.4,1,1,1c0.5,0,1-0.4,1-1v-4C10,6.2,9.5,5.8,9,5.8L9,5.8z"
              ></path>
            </g>
          </svg>
          <span v-if="percent_95"
            >Your DAM storage is almost full. You have consumed
            <strong>{{ storage_percent }}%</strong> out of
            <strong>{{ $toHumanlySize(totalStorage, 1000) }}</strong
            >.
            <a href="mailto:sales@marketinghub.com"
              >Contact out sales team to upgrade Storage.</a
            >
            <a
              href="javascript:void(0);"
              class="link"
              data-toggle="modal"
              data-target="#storageAnalytics"
              @click="updateStorage"
              >Storage Analysis</a
            ></span
          >
          <span v-else-if="percent_75"
            >You have consumed <strong>{{ storage_percent }}%</strong> of your
            DAM Storage. You can free-up space by deleting unnecessary assets.
            <a
              href="javascript:void(0);"
              class="link"
              data-toggle="modal"
              data-target="#storageAnalytics"
              @click="updateStorage"
              >Storage Analysis</a
            ></span
          >
          <span v-else-if="percent_50"
            >You have consumed <strong>{{ storage_percent }}%</strong> out of
            <strong>{{ $toHumanlySize(totalStorage, 1000) }}</strong> of your
            DAM Storage. You can delete unnecessary items to recever storage
            space.
            <a
              href="javascript:void(0);"
              class="link"
              data-toggle="modal"
              data-target="#storageAnalytics"
              @click="updateStorage"
              >Storage Analysis</a
            ></span
          >
        </div>
      </transition>
    </div>
    <div v-else-if="uncategoryAlert" class="success-msg pl10 pr10">
      <transition name="fade">
        <div class="alert alert-danger alert-dismissible">
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            @click="closeAlert"
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
          </button>
          You have uncategorized assets on your DAM instance. It won't appear to
          users until moving into a specific folder. Please
          <nuxt-link
            :to="{
              name: 'workspace_id-dam-uploaded',
              params: { workspace_id: $getWorkspaceId() },
            }"
            >click here</nuxt-link
          >
          to select the asset and move into the folder.
        </div>
      </transition>
    </div>
    <div class="body-content-left h-100">
      <div class="customscrollbar" :style="!usedStorage ? 'height:100%' : ''">
        <div class="common-box bg-gray h-auto pb-0">
          <AssetOverview
            id="asset-overview"
            :data="dashboardData || {}"
            :loading="overviewLoading"
          />
        </div>
        <div class="common-box bg-gray h-auto pb-0 category-list">
          <h4>Folders</h4>

          <FolderList :key="updateList" @selectFromPanel="selectFromDropdown" />
        </div>
      </div>
      <a
        v-if="usedStorage"
        href="javascript:void(0);"
        class="storageAnalyticsLink"
        data-toggle="modal"
        data-target="#storageAnalytics"
        @click="
          chartLoading = true
          chartdata = null
          updateStorage()
        "
      >
        <svg
          id="Layer_1"
          class="storage-analytics-icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Storage_Analytics">
            <g id="chart" transform="translate(-2.024 -1.999)">
              <path
                id="path3587"
                class="fill-color"
                d="M11,2c-5,0-9,4-9,9s4,9,9,9c5,0,9-4,9-9v0c0-0.3-0.3-0.6-0.6-0.6l0,0h-7.8V2.6C11.6,2.3,11.4,2,11,2C11,2,11,2,11,2z M10.4,3.3V11c0,0.3,0.3,0.6,0.6,0.6h0h7.7c-0.3,4.3-4,7.5-8.3,7.2s-7.5-4-7.2-8.3C3.5,6.7,6.6,3.6,10.4,3.3L10.4,3.3z"
              ></path>
              <path
                id="path3583"
                class="fill-color"
                d="M13.1,2.3L13.1,2.3c-0.3,0-0.6,0.3-0.6,0.6v6c0,0.3,0.3,0.6,0.6,0.6h6c0.3,0,0.6-0.3,0.6-0.6c0-0.1,0-0.1,0-0.2c-0.8-3.2-3.3-5.6-6.5-6.5C13.2,2.3,13.2,2.3,13.1,2.3z M13.7,3.9c2,0.8,3.6,2.4,4.4,4.4h-4.4L13.7,3.9z"
              ></path>
            </g>
          </g>
        </svg>
        Storage Analytics
      </a>
    </div>
    <div class="body-content-main customscrollbar h-100">
      <div class="overview-wrapper graph-box d-none">
        <div class="section-title d-flex">
          <h2>Overview</h2>
          <div style="flex: 1"></div>
          <div v-if="dashboardData">
            <!-- <DateRangePicker
              class="graph-date-picker"
              :class="{ active: graph.dates.custom }"
              :start-date.sync="graph.dates.startDate"
              :end-date.sync="graph.dates.endDate"
              placeholder="Date Range"
              display-format="DD-MM-YYYY"
              custom-event
              human
              @dateChanged="
                graphInit({
                  startDate: graph.dates.startDate,
                  endDate: graph.dates.endDate,
                })
              "
            ></DateRangePicker> -->
          </div>
          <div class="datepick-buttons graph-theme">
            <!-- <button
              :class="{ active: graph.dates.month }"
              @click="graphInit({ month: true })"
            >
              Month
            </button>
            <button
              :class="{ active: graph.dates.week }"
              @click="graphInit({ week: true })"
            >
              Week
            </button> -->
            <Select2
              :value="selectedTimeFrame"
              :options="timeFrame"
              :custom-event="true"
              @changeSelect2="dateChangeHandler(...arguments)"
            />
            <DateRangePicker
              v-if="selectedTimeFrame === '5'"
              ref="customDateEl"
              class="graph-date-picker"
              :class="{ active: graph.dates.custom }"
              :start-date.sync="graph.dates.startDate"
              :end-date.sync="graph.dates.endDate"
              display-format="DD-MM-YYYY"
              custom-event
              human
              @dateChanged="
                graphInit({
                  startDate: graph.dates.startDate,
                  endDate: graph.dates.endDate,
                })
              "
            ></DateRangePicker>
          </div>
        </div>
        <div style="display: flex; padding: 1rem">
          <div>
            <div v-if="graph.loading" style="width: 240px; height: 320px">
              <content-loader
                :width="60"
                :height="72"
                class="h-100 w-100 normalLoader"
                :speed="2"
                primary-color="#31343B"
                secondary-color="#0000"
              >
                <rect x="8" y="4" rx="1" ry="1" width="40" height="20" />
                <rect x="8" y="28" rx="1" ry="1" width="40" height="20" />
                <rect x="8" y="52" rx="1" ry="1" width="40" height="20" />
              </content-loader>
            </div>
            <template v-else>
              <div
                class="graph-side-box"
                :class="{ active: graph.mode === 'media_assets' }"
                @click="graphInit({ mode: 'media_assets' })"
              >
                <div class="graph-text">
                  Media assets
                  <span class="graph-icon">
                    <svg
                      id="Layer_1"
                      class="media-assets-icon white"
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
                      />
                    </svg>
                  </span>
                </div>
                <p class="graph-subtext">
                  {{ Number(graph.overview.media_assets).toLocaleString() }}
                </p>
              </div>
              <div
                class="graph-side-box"
                :class="{ active: graph.mode === 'storage' }"
                @click="graphInit({ mode: 'storage' })"
              >
                <div class="graph-text">
                  Storage
                  <span class="graph-icon">
                    <svg
                      id="Layer_1"
                      class="storage-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 26 16"
                      xml:space="preserve"
                    >
                      <path
                        id="Icon_ionic-ios-cloud-outline"
                        class="fill-color"
                        d="M14.6,1.4c1.5,0,3,0.6,4.2,1.6c1.1,1,1.8,2.4,2,3.9l0.1,0.6c0,0.3,0.3,0.5,0.5,0.6l0.6,0.1c0.7,0.1,1.4,0.5,1.9,1.1c0.5,0.6,0.8,1.3,0.8,2.1c0,0.9-0.4,1.7-1,2.3c-0.6,0.6-1.4,1-2.2,1H4.6c-0.8,0-1.7-0.4-2.2-1c-0.6-0.6-1-1.5-1-2.3c0-0.7,0.2-1.4,0.7-2c0.4-0.6,1-1,1.7-1.2l0.5-0.2c0.3-0.1,0.5-0.3,0.5-0.6l0-0.5c0-0.6,0.3-1.2,0.7-1.6C5.9,4.6,6.4,4.4,7,4.4c0.3,0,0.6,0.1,0.8,0.2l0.6,0.2c0.3,0.1,0.6,0,0.8-0.2L9.5,4C10.7,2.4,12.6,1.4,14.6,1.4 M14.6,0c-2.5,0-4.8,1.2-6.3,3.2C7.9,3.1,7.5,3,7,3C5,3,3.4,4.6,3.4,6.6C1.4,7.3,0,9.2,0,11.3c0,2.6,2.1,4.7,4.6,4.7h16.8c2.6-0.1,4.6-2.2,4.6-4.7c0-2.2-1.6-4.2-3.8-4.6C21.7,2.9,18.5,0,14.6,0L14.6,0z"
                      />
                    </svg>
                  </span>
                </div>
                <p class="graph-subtext">
                  {{ $toHumanlySize(graph.overview.storage, 1000) }}
                </p>
              </div>
              <div
                class="graph-side-box"
                :class="{ active: graph.mode === 'bandwidth' }"
                @click="graphInit({ mode: 'bandwidth' })"
              >
                <div class="graph-text">
                  Downloads
                  <span class="graph-icon">
                    <svg
                      id="Layer_1"
                      class="bandwith-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 14.7 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4376"
                        transform="translate(-495.992 -288.74)"
                      >
                        <path
                          id="Path_3458"
                          class="fill-color"
                          d="M505.9,306.7c-0.1,0-0.2,0-0.3-0.1c-0.3-0.1-0.5-0.4-0.5-0.7v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v14.6l2.7-2.7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-4.1,4.1C506.3,306.7,506.1,306.7,505.9,306.7z"
                        />
                        <path
                          id="Path_3459"
                          class="fill-color"
                          d="M500.8,306.7c-0.4,0-0.8-0.3-0.8-0.8v-14.6l-2.7,2.7c-0.3,0.3-0.8,0.3-1.1,0c-0.3-0.3-0.3-0.8,0-1.1l4.1-4.1c0.1-0.1,0.3-0.2,0.5-0.2c0.1,0,0.2,0,0.3,0.1c0.3,0.1,0.5,0.4,0.5,0.7V306C501.6,306.4,501.2,306.7,500.8,306.7C500.8,306.7,500.8,306.7,500.8,306.7z"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <p class="graph-subtext">
                  {{ $toHumanlySize(graph.overview.bandwidth, 1000) }}
                </p>
              </div>
            </template>
          </div>

          <div class="chartWidth">
            <ContentLoader
              v-if="graph.loading"
              :width="200"
              :height="78"
              :speed="2"
              style="max-height: 350px; width: 100%"
              primary-color="#31343B"
              secondary-color="#0000"
              class="normalLoader"
            >
              <rect x="4" y="22" width="20" height="50" />
              <rect x="30" y="12" width="20" height="60" />
              <rect x="54" y="6" width="20" height="66" />
              <rect x="78" y="32" width="20" height="40" />
            </ContentLoader>
            <div
              v-else-if="graph.data && graph.overview[graph.mode]"
              class="chartScrollbar"
              style="max-height: 350px; width: 100%; cursor: pointer"
            >
              <LineGraph
                :styles="{
                  'max-height': '340px',
                  height: '340px',
                  position: 'relative',
                  width: 'auto',
                }"
                :chart-data="graph.data"
                :options="graph.options"
              ></LineGraph>
            </div>
            <div v-else class="placeholder">NO DATA AVAILABLE</div>
          </div>
        </div>
        <div v-if="dashboardData" class="graph-bottom">
          <table>
            <tr>
              <td>Total assets :</td>
              <td>
                <strong>{{ dashboardData.media_assets }}</strong>
              </td>
              <td>&ensp;</td>
              <td>Total Storage :</td>
              <td>
                <strong>{{ $toHumanlySize(usedStorage, 1000) }}</strong>
                out of
                <svg
                  v-if="totalStorage === 'unlimited'"
                  id="Layer_1"
                  class="infinite-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 409 409"
                  xml:space="preserve"
                >
                  <path
                    style="fill: #a3a4a7"
                    class="fill-color"
                    d="M94.6,298.9c-25.2,0-49-9.7-66.9-27.4C9.9,253.8,0,230.2,0,205.2c0-25.1,9.9-48.6,27.8-66.4c17.9-17.7,41.6-27.4,66.9-27.4h0c25.2,0,48.9,9.7,66.8,27.4l42.9,42.4c16.1-15.9,42.9-42.4,42.9-42.4c17.9-17.7,41.6-27.4,66.8-27.4h0c52.2,0,94.7,42.1,94.7,93.7c0,25.1-9.9,48.6-27.8,66.3c-17.9,17.7-41.6,27.4-66.9,27.4c0,0,0,0,0,0c-25.2,0-48.9-9.7-66.9-27.4l-42.9-42.4c-16.1,15.9-42.9,42.4-42.9,42.4C143.6,289.2,119.9,298.9,94.6,298.9C94.7,298.9,94.7,298.9,94.6,298.9z M228.5,205l42.8,42.3c11.5,11.3,26.8,17.5,42.9,17.5h0c16.2,0,31.5-6.2,42.9-17.5c11.4-11.3,17.7-26.2,17.7-42.1c0-32.9-27.2-59.6-60.6-59.6c-16.2,0-31.4,6.2-42.9,17.6C251.7,182.5,238.1,195.9,228.5,205z M94.7,145.5L94.7,145.5c-16.3,0-31.5,6.2-43,17.5c-11.4,11.3-17.7,26.2-17.7,42.1c0,15.9,6.3,30.9,17.7,42.1c11.4,11.3,26.7,17.5,42.9,17.5h0c16.2,0,31.4-6.2,43-17.6c19.7-19.4,33.2-32.8,42.8-41.8l-42.9-42.3C126.2,151.7,110.9,145.5,94.7,145.5z"
                  /></svg><template v-else>{{
                  $toHumanlySize(totalStorage, 1000)
                }}</template>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="trending-sec resource-wrapper" :class="[`grid-${mode}`]">
        <div class="tabs-view">
          <div class="row align-items-center">
            <div class="col-md-6">
              <ul class="nav mb0" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: trendingType === 'trending' }"
                    data-toggle="tab"
                    href="#mostdownloaded"
                    @click="loadTrendingData('trending')"
                    >Most Downloaded</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-toggle="tab"
                    href="#recentuploaded"
                    :class="{ active: trendingType === 'recent_uploaded' }"
                    @click="loadTrendingData('recent_uploaded')"
                    >Recent Uploaded</a
                  >
                </li>
              </ul>
            </div>
            <div class="col-md-6 d-flex justify-content-end align-items-center">
              <div class="gried-view ml-0">
                <span
                  class="tile"
                  :class="{ 'primary-filter': mode == 'tile' }"
                  @click="changeView('tile')"
                >
                  <svg
                    id="Layer_1"
                    class="gridview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4377" transform="translate(-594.872 -288.043)">
                      <path
                        id="Path_3460"
                        class="fill-color"
                        d="M600.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,288.9,602,288,600.9,288z"
                      />
                      <path
                        id="Path_3461"
                        class="fill-color"
                        d="M610.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,288.9,612,288,610.9,288z"
                      />
                      <path
                        id="Path_3462"
                        class="fill-color"
                        d="M600.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,298.9,602,298,600.9,298z"
                      />
                      <path
                        id="Path_3463"
                        class="fill-color"
                        d="M610.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,298.9,612,298,610.9,298z"
                      />
                    </g>
                  </svg>
                </span>
                <span
                  class="list"
                  :class="{ 'primary-filter': mode == 'list' }"
                  @click="changeView('list')"
                >
                  <svg
                    id="Layer_1"
                    class="listview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4378" transform="translate(-645.53 -288.043)">
                      <path
                        id="Path_3464"
                        class="fill-color"
                        d="M648.5,289.5v1.5H647v-1.5H648.5 M648.5,288H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,288.7,649.4,288,648.5,288z"
                      />
                      <path
                        id="Path_3465"
                        class="fill-color"
                        d="M662.8,291H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,291,662.8,291L662.8,291z"
                      />
                      <path
                        id="Path_3466"
                        class="fill-color"
                        d="M648.5,296.3v1.5H647v-1.5H648.5 M648.5,294.8H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,295.5,649.4,294.8,648.5,294.8L648.5,294.8z"
                      />
                      <path
                        id="Path_3467"
                        class="fill-color"
                        d="M662.8,297.8H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,297.8,662.8,297.8L662.8,297.8z"
                      />
                      <path
                        id="Path_3468"
                        class="fill-color"
                        d="M648.5,303v1.5H647V303H648.5 M648.5,301.5H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5V303C650,302.2,649.4,301.5,648.5,301.5z"
                      />
                      <path
                        id="Path_3469"
                        class="fill-color"
                        d="M662.8,304.5H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,304.5,662.8,304.5L662.8,304.5z"
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <!-- <h2>Trending</h2> -->
          <div class="tab-content p0">
            <div id="mostdownloaded" class="tab-pane active">
              <div class="common-box bg-gray h-auto">
                <div class="table-list-view multi-table-view">
                  <div
                    v-if="loading"
                    style="margin: auto; overflow: hidden; width: 97%"
                    class="pb-3"
                  >
                    <ContentLoader
                      :speed="1"
                      :animate="true"
                      :width="450"
                      :height="200"
                      class="normalLoader"
                    >
                      <template v-if="mode === 'list'">
                        <rect
                          x="0"
                          y="7"
                          rx="4"
                          ry="4"
                          width="450"
                          height="40"
                        />
                        <rect
                          x="0"
                          y="53"
                          rx="4"
                          ry="4"
                          width="450"
                          height="40"
                        />
                        <rect
                          x="0"
                          y="99"
                          rx="4"
                          ry="4"
                          width="450"
                          height="40"
                        />
                      </template>
                      <template v-else>
                        <rect
                          x="0"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <rect
                          x="117.4"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <rect
                          x="234.9"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <rect
                          x="352.3"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <!--                        <rect
                          x="0"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />
                        <rect
                          x="114"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />
                        <rect
                          x="228"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />
                        <rect
                          x="342"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />-->
                      </template>
                    </ContentLoader>
                  </div>
                  <template v-else>
                    <TrendingListingHeader
                      key="header"
                      :assets-count="totalAssets"
                      :selected-all="selectedFiles.length === trending.length"
                      :reverse="sorting.toolbar.desc"
                      :deleting="deleting"
                      :sort-value.sync="sorting.toolbar.value"
                      @click:select-all="selectedFiles = [...trending]"
                      @click:select-none="selectNone"
                      @sort="(args) => args.forEach((arg) => sort(...arg))"
                    />
                    <ul v-if="trending.length" class="tbody">
                      <TrendingResource
                        v-for="file in trending"
                        :key="file.id"
                        :file="file"
                        :mode="mode"
                        :selected="selection[file.id]"
                        @click:selected="toggleSelection"
                        @selectedDrop="selectFromDropdown"
                        @fileNameChanged="updateFileName"
                      />
                    </ul>
                    <div
                      v-else-if="!overviewLoading"
                      class="no-data-found my-5"
                    >
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

                        <p class="text-center">
                          There are no most downloaded items.
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <div id="recentuploaded" class="tab-pane">
              <div class="common-box bg-gray h-auto">
                <div class="table-list-view multi-table-view">
                  <div
                    v-if="loading"
                    style="margin: auto; overflow: hidden; width: 97%"
                    class="pb-3"
                  >
                    <ContentLoader
                      :speed="1"
                      :animate="true"
                      :width="450"
                      :height="200"
                      class="normalLoader"
                    >
                      <template v-if="mode === 'list'">
                        <rect
                          x="0"
                          y="7"
                          rx="4"
                          ry="4"
                          width="450"
                          height="40"
                        />
                        <rect
                          x="0"
                          y="53"
                          rx="4"
                          ry="4"
                          width="450"
                          height="40"
                        />
                        <rect
                          x="0"
                          y="99"
                          rx="4"
                          ry="4"
                          width="450"
                          height="40"
                        />
                      </template>

                      <template v-else>
                        <rect
                          x="0"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <rect
                          x="117.4"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <rect
                          x="234.9"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <rect
                          x="352.3"
                          y="15"
                          rx="1"
                          ry="1"
                          width="112.4"
                          height="112.4"
                        />
                        <!-- <rect
                          x="0"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />
                        <rect
                          x="114"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />
                        <rect
                          x="228"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />
                        <rect
                          x="342"
                          y="7"
                          rx="4"
                          ry="4"
                          width="108"
                          height="108"
                        />-->
                      </template>
                    </ContentLoader>
                  </div>
                  <template v-else>
                    <TrendingListingHeader
                      key="header"
                      :assets-count="totalAssets"
                      :selected-all="selectedFiles.length === trending.length"
                      :reverse="sorting.toolbar.desc"
                      :deleting="deleting"
                      :sort-value.sync="sorting.toolbar.value"
                      @click:select-all="selectedFiles = [...trending]"
                      @click:select-none="selectNone"
                      @sort="(args) => args.forEach((arg) => sort(...arg))"
                    />
                    <ul v-if="trending.length" class="tbody">
                      <TrendingResource
                        v-for="file in trending"
                        :key="file.id"
                        :file="file"
                        :mode="mode"
                        from-home
                        :selected="selection[file.id]"
                        @click:selected="toggleSelection"
                        @selectedDrop="selectFromDropdown"
                        @fileNameChanged="updateFileName"
                      />
                    </ul>
                    <div
                      v-else-if="!overviewLoading"
                      class="no-data-found my-5"
                    >
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

                        <p class="text-center">
                          There are no recent uploaded items.
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SelectionBar
      ref="selectionbar"
      :selected-files="selectedFiles"
      :selected-all="selectedFiles.length === trending.length"
      @fromTrashMode="removeSelectedFiles"
      @deleted="removeSelectedFiles"
      @moved="moveSelectedFiles"
      @copied="updateTrendingAssetList"
      @click:select-none="selectNone"
      @click:select-all="selectedFiles = [...trending]"
      @archieve="removeArchieved"
    ></SelectionBar>
    <!--  Storage Analytics Modal  -->
    <div
      v-if="usedStorage"
      id="storageAnalytics"
      class="modal fade"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="modal-dialog large modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              Usage Summary
            </h5>
            <button
              ref="storageDialogClose"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"
                ><svg
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
                  </g></svg></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center">
              <div v-if="chartData" class="storageChart">
                <div
                  v-if="chartLoading"
                  style="position: relative; min-height: 398px"
                >
                  <div class="overlay">
                    <div class="loader"></div>
                  </div>
                </div>
                <template v-else>
                  <div
                    v-if="totalStorage !== 'unlimited'"
                    :style="{
                      textAlign: 'center',
                      color: '#172b4d',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                    }"
                  >
                    Your total plan storage -
                    {{ $toHumanlySize(totalStorage, 1000) }}
                  </div>
                  <Pie
                    ref="pie"
                    :chart-data="chartData"
                    :options="{
                      tooltips: {
                        callbacks: {
                          label: (tooltipItem, data) => {
                            const label = data.labels[tooltipItem.index]
                            const value =
                              data.datasets[tooltipItem.datasetIndex].data[
                                tooltipItem.index
                              ]
                            return [
                              ' ' +
                                label.trim() +
                                ': ' +
                                $toHumanlySize(value, 1000),
                            ]
                          },
                        },
                      },
                      hover: {
                        onHover: (event, chartElement) => {
                          event.target.style.cursor = chartElement[0]
                            ? 'pointer'
                            : 'default'
                        },
                      },
                      legend: {
                        display: false,
                      },
                    }"
                    :height="420"
                  />
                </template>
                <ul>
                  <li>
                    <h3>{{ $toHumanlySize(usedStorage, 1000) }}</h3>
                    <span>Used Storage</span>
                  </li>
                  <li>
                    <h3 v-if="availableStorage === 'unlimited'">
                      <svg
                        id="Layer_1"
                        style="height: 26px"
                        class="infinite-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 409 409"
                        xml:space="preserve"
                      >
                        <path
                          style="fill: #070e22"
                          class="fill-color"
                          d="M94.6,298.9c-25.2,0-49-9.7-66.9-27.4C9.9,253.8,0,230.2,0,205.2c0-25.1,9.9-48.6,27.8-66.4c17.9-17.7,41.6-27.4,66.9-27.4h0c25.2,0,48.9,9.7,66.8,27.4l42.9,42.4c16.1-15.9,42.9-42.4,42.9-42.4c17.9-17.7,41.6-27.4,66.8-27.4h0c52.2,0,94.7,42.1,94.7,93.7c0,25.1-9.9,48.6-27.8,66.3c-17.9,17.7-41.6,27.4-66.9,27.4c0,0,0,0,0,0c-25.2,0-48.9-9.7-66.9-27.4l-42.9-42.4c-16.1,15.9-42.9,42.4-42.9,42.4C143.6,289.2,119.9,298.9,94.6,298.9C94.7,298.9,94.7,298.9,94.6,298.9z M228.5,205l42.8,42.3c11.5,11.3,26.8,17.5,42.9,17.5h0c16.2,0,31.5-6.2,42.9-17.5c11.4-11.3,17.7-26.2,17.7-42.1c0-32.9-27.2-59.6-60.6-59.6c-16.2,0-31.4,6.2-42.9,17.6C251.7,182.5,238.1,195.9,228.5,205z M94.7,145.5L94.7,145.5c-16.3,0-31.5,6.2-43,17.5c-11.4,11.3-17.7,26.2-17.7,42.1c0,15.9,6.3,30.9,17.7,42.1c11.4,11.3,26.7,17.5,42.9,17.5h0c16.2,0,31.4-6.2,43-17.6c19.7-19.4,33.2-32.8,42.8-41.8l-42.9-42.3C126.2,151.7,110.9,145.5,94.7,145.5z"
                        />
                      </svg>
                    </h3>
                    <h3 v-else>{{ $toHumanlySize(availableStorage, 1000) }}</h3>
                    <span>Available Storage</span>
                  </li>
                </ul>
              </div>
              <div class="storageChartInfo">
                <ul>
                  <li @click="goToCategory('image')">
                    <div class="img-bg colorBox"></div>
                    <span>Images</span>
                    <span>{{ $toHumanlySize(imageStorage, 1000) }}</span>
                  </li>
                  <li @click="goToCategory('audio')">
                    <div class="aud-bg colorBox"></div>
                    <span>Audios</span>
                    <span>{{ $toHumanlySize(audioStorage, 1000) }}</span>
                  </li>
                  <li @click="goToCategory('video')">
                    <div class="vid-bg colorBox"></div>
                    <span>Videos</span>
                    <span>{{ $toHumanlySize(videoStorage) }}</span>
                  </li>
                  <li @click="goToCategory('application')">
                    <div class="doc-bg colorBox"></div>
                    <span>Documents</span>
                    <span>{{ $toHumanlySize(documentStorage, 1000) }}</span>
                  </li>
                  <!-- <li>
                    <div class="ava-bg colorBox"></div>
                    <span>Available</span>
                    <span>{{ $toHumanlySize(availableStorage) }}</span>
                  </li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <NewFolderDialog ref="dialog"></NewFolderDialog>
      <MoveFolderDialog
        v-show="resourceType !== 'folder'"
        ref="moveDialog"
        :files-to-move="resource"
        @moved="moveSelectedFiles"
      />
      <MoveFolderToFolderDialog
        ref="moveFoldersDialog"
        :files-to-move="resource"
        @moved="moveSelectedFiles"
      />
      <CopyFolderDialog
        ref="copyDialog"
        :files-to-move="resource"
        @copied="updateTrendingAssetList"
      />
      <DeleteDialog ref="deleteDialog" @button:yes="deleteFromDrop">
        Are you sure you want to delete the selected asset?
      </DeleteDialog>
    </client-only>
    <!--  Switch Workspace Modal  -->
    <switchWorkspaceDialog
      ref="switchWorkspace"
      :workspace-name="switch_workspace_name"
    ></switchWorkspaceDialog>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'
import fileSelection from '~/mixins/fileSelection'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import LineGraph from '~/components/plugins/LineGraph'
import Pie from '~/components/plugins/Pie'
import FolderList from '~/components/dam/FolderList'
import SelectionBar from '~/components/dam/SelectionBar'
import AssetOverview from '~/components/dam/AssetOverview'
import NewFolderDialog from '~/components/dam/Dialogs/NewFolderDialog'
import TrendingResource from '~/components/dam/AssetList/TrendingResource'
import TrendingListingHeader from '~/components/dam/AssetList/TrendingListingHeader'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
import CopyFolderDialog from '~/components/dam/Dialogs/CopyFolderDialog'
import MoveFolderToFolderDialog from '~/components/dam/Dialogs/MoveFolderToFolderDialog'
import switchWorkspaceDialog from '~/components/theme/switchWorkspaceDialog'

const initialSortingData = () => ({
  initialData: true,
  files: {
    field: 'display_file_name',
    reverse: false,
  },
  subFolders: {
    field: 'display_file_name',
    reverse: false,
  },
  toolbar: { value: '', desc: false },
  totalAssetCount: '12',
})

function makeFolder(array) {
  return [...array].map((folder) => ({
    ...folder,
    total_contain:
      (folder.total_assets || 0) + (folder.sub_category_count || 0),
  }))
}

export default {
  components: {
    Select2,
    ContentLoader,
    FolderList,
    NewFolderDialog,
    SelectionBar,
    TrendingResource,
    TrendingListingHeader,
    DateRangePicker,
    LineGraph,
    AssetOverview,
    DeleteDialog,
    MoveFolderDialog,
    CopyFolderDialog,
    MoveFolderToFolderDialog,
    switchWorkspaceDialog,
    Pie,
  },
  mixins: [fileSelection],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  data() {
    return {
      sorting: initialSortingData(),
      timeFrame: [
        {
          id: 1,
          text: 'Week',
          name: 'week',
        },
        {
          id: 2,
          text: 'Month',
          name: 'month',
        },
        {
          id: 3,
          text: 'Quarter',
          name: 'quarter',
        },
        {
          id: 4,
          text: 'Year',
          name: 'year',
        },
        {
          id: 5,
          text: 'Custom Date',
          name: 'custom',
        },
      ],
      selectedTimeFrame: 0,
      loading: true,
      files: [],
      deleting: false,
      trendingType: 'recent_uploaded',
      trendingData: null,
      mode: 'tile',
      overviewLoading: false,
      dashboardData: null,
      graph: {
        loading: true,
        data: null,
        fetchedData: null,
        overview: {},
        options: {
          legend: false,
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 3,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,

                  callback: function (value, _, __) {
                    if (
                      this.graph.mode === 'bandwidth' ||
                      this.graph.mode === 'storage'
                    )
                      value = this.$toHumanlyNumericSize(value)
                    else if (Math.floor(value) !== value) return

                    return value
                  }.bind(this),
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function ({ value }, data) {
                const label = Number(value || 0)

                return this.graph.mode === 'bandwidth' ||
                  this.graph.mode === 'storage'
                  ? ' ' + this.$toHumanlySize(label, 1000).trim()
                  : ' ' + label
              }.bind(this),
            },
          },
        },
        dates: {
          month: true,
          week: false,
          startDate: '',
          endDate: '',
        },
        lastConfig: {
          month: true,
        },
        mode: 'storage',
      },
      resource: [],
      resourceType: null,
      updateList: 1,
      alertData: {},
      reloadTrending: false,
      switch_workspace_id: this.$auth.$storage.getUniversal('switchWorkspaceId')
        ? this.$auth.$storage.getUniversal('switchWorkspaceId')
        : '',
      switch_workspace_name: null,
      storgeCategory: {
        Images: { color: '#02A566', value: 0, visible: true },
        Audios: { color: '#0086D3', value: 0, visible: true },
        Videos: { color: '#FB3A2F', value: 0, visible: true },
        Documents: { color: '#B960FF', value: 0, visible: true },
        Available: { color: '#EFF1F3', value: 0, visible: true },
      },
      chartData: null,
      chartAlert: 0,
      chartLoading: false,
      overviewTimer: null,
      overviewFetchedOn: Date.now(),
    }
  },
  computed: {
    percent() {
      return (a, b, c = 2) => {
        return a > b ? 100 : Number(((a / b) * 100).toFixed(c))
      }
    },
    percent_50() {
      return this.storage_percent >= 50
    },
    percent_75() {
      return this.storage_percent >= 75
    },
    percent_95() {
      return this.storage_percent >= 95
    },
    documentStorage() {
      return this.$store.state.dam.storage.document
    },
    imageStorage() {
      return this.$store.state.dam.storage.image
    },
    audioStorage() {
      return this.$store.state.dam.storage.audio
    },
    videoStorage() {
      return this.$store.state.dam.storage.video
    },
    totalStorage() {
      return this.$store.state.dam.storage.total
    },
    usedStorage() {
      return this.$store.state.dam.storage.used
    },
    availableStorage() {
      return this.$store.state.dam.storage.available
    },
    storageLabels() {
      return Object.keys(this.storgeCategory).filter(
        (e) => this.storgeCategory[e].visible
      )
    },
    storageColors() {
      return Object.keys(this.storgeCategory)
        .filter((e) => this.storgeCategory[e].visible)
        .map((e) => this.storgeCategory[e].color)
    },
    storage_percent() {
      return this.$store.state.dam.storage?.percentage
    },
    uncategoryAlert() {
      return this.alertData?.active
    },
    widthCal() {
      const startDate = this.$moment(this.graph.dates.startDate, 'YYYY-MM-DD')
      const endDate = this.$moment(this.graph.dates.endDate, 'YYYY-MM-DD')
      const monthDiff = endDate.diff(startDate, 'months')
      return monthDiff
    },
    activeSelection() {
      return this.$store.state.dam.activeSelection
    },
    trending() {
      return this.trendingData || []
    },
    totalAssets() {
      return this.trending.length
    },
  },
  watch: {
    selectedTimeFrame: {
      handler(n) {
        if (n === '5') {
          this.$nextTick(() => {
            try {
              this.$refs.customDateEl.$el.click()
            } catch (e) {}
          })
        }
      },
      deep: true,
    },
  },
  created() {
    this.getOverviewData()
  },
  mounted() {
    this.switchWorkspaceDialogOpen()
    this.loadTrendingData(
      this.$route.query?.tab === 'recent' ? 'recent_uploaded' : 'trending'
    )
    if (this.$route.query?.tab === 'recent') {
      document
        .querySelector("a[href='#recentuploaded']")
        .scrollIntoView({ behavoir: 'smooth', block: 'start' })
    }
    this.selectedTimeFrame = '2'
    this.graphInit({ month: true })
    this.updateStorage(true)
    this.$nuxt.$on('update-overview-data', () => {
      let shouldFetch = false
      if (Date.now() - this.overviewFetchedOn > 1000) {
        shouldFetch = true
      }
      if (shouldFetch) {
        this.overviewFetchedOn = Date.now()
        this.getOverviewData()
      }
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('update-overview-data')
  },
  methods: {
    apiSortValue() {
      return this.sorting.toolbar.value === 'Sort by'
        ? 'updated_at'
        : this.sorting.toolbar.value || 'updated_at'
    },
    apiSortOrder() {
      const order = this.sorting.files.reverse
      return order ? 'DESC' : 'ASC'
    },
    sort(path, field_name, _primer) {
      if (!field_name) return

      const primer = _primer || ((v) => v)
      const hasPages = this.lastPage > 1

      const toReverse = true
      this.sorting[path].reverse =
        this.sorting[path].field === field_name
          ? !this.sorting[path].reverse
          : toReverse

      this.sorting[path].field = field_name

      if (path === 'files') {
        this.sorting.toolbar.desc = this.sorting[path].reverse
      }

      if (hasPages) {
        if (path === 'subFolders') return
        return this.prefetch()
      }

      this[path] = this[path].sort(
        this.$sortBy(
          this.sorting[path].field,
          this.sorting[path].reverse,
          (x) => primer(x, this.sorting[path].reverse)
        )
      )
    },
    dateChangeHandler(data) {
      this.selectedTimeFrame = data.id
      const param = {}
      if (data.text === 'Week') param.week = true
      else if (data.text === 'Month') param.month = true
      else if (data.text === 'Quarter') param.quarter = true
      else if (data.text === 'Year') param.year = true
      else if (data.text === 'Custom Date') {
        this.graph.dates.startDate = null
        this.graph.dates.endDate = null
        return
      }
      this.graphInit(param)
    },
    switchWorkspaceDialogOpen() {
      if (this.$auth.$storage.getUniversal('switchWorkspaceId')) {
        this.getSwitchWorkspaceId()
      }
    },
    async getSwitchWorkspaceId() {
      // try {
      //   const { data } = await this.$axios.$get(
      //     `/project/verify-workspace?workspace_id=${this.switch_workspace_id}`
      //   )
      //   this.switch_workspace_name = data.workspace_name
      //   this.$refs.switchWorkspace.show()
      // } catch (e) {
      //   this.$auth.$storage.removeUniversal('switchWorkspaceId')
      // }
    },
    goToCategory(category) {
      this.$refs.storageDialogClose.click()
      this.$router.push({
        name: 'workspace_id-dam-folders',
        params: { workspace_id: this.$getWorkspaceId() },
        hash: `#${category}`,
      })
    },
    async updateStorage(initial) {
      this.chartLoading = true
      await this.$store.dispatch('dam/updateStorage')
      await this.getChartData(initial)
      this.chartLoading = false
      if (!initial || this.totalStorage === 'unlimited') return
      this.$axios.$get('digital-assets/send-storage-analytics-email')
    },
    getChartData(initial) {
      this.chartData = null
      return new Promise((resolve) => {
        this.$nextTick(() => {
          this.chartData = {
            labels: this.storageLabels,
            datasets: [
              {
                data: [
                  this.imageStorage,
                  this.audioStorage,
                  this.videoStorage,
                  this.documentStorage,
                  this.availableStorage,
                ],
                backgroundColor: this.storageColors,
                hoverOffset: 4,
              },
            ],
          }
          this.chartAlert = ~~(
            initial &&
            this.percent_50 &&
            this.totalStorage !== 'unlimited'
          )
          resolve()
        })
      })
    },
    closeAlert() {
      if (process.client) {
        const categoryAlert = JSON.parse(
          localStorage.getItem(`${this.$getWorkspaceId()}`)
        )
        categoryAlert.dismiss = true
        categoryAlert.active = false

        localStorage.setItem(
          `${this.$auth.user.workspace_id}`,
          JSON.stringify(categoryAlert)
        )
        this.alertData = categoryAlert
      }
    },
    removeArchieved() {
      if (this.trendingType === 'trending') {
        this.loadTrendingData('trending')
      } else {
        this.loadTrendingData('recent_uploaded')
      }
      this.getOverviewData()
      this.selectNone()
    },
    moveSelectedFiles(moveTo) {
      const activeSelectionList = this.activeSelection

      let movedFile = this.resourceType ? this.resource : this.selectedFiles
      const fileIds = movedFile.map(({ id }) => id)

      if (this.parentOfselected !== null && this.resource.length === 0) {
        const indexOfOwnParent = activeSelectionList.indexOf(
          this.parentOfselected
        )
        const assetIds = fileIds
        this.$store.dispatch('dam/moveAssets', { indexOfOwnParent, assetIds })
      } else {
        const assetIds = []
        assetIds.push(movedFile[0].id)
        const indexOfOwnParent = activeSelectionList.indexOf(
          movedFile[0].category_id
        )
        this.$store.dispatch('dam/moveAssets', { indexOfOwnParent, assetIds })
      }
      if (moveTo) {
        let categoryId = null
        categoryId = moveTo?.id
        const indexOfParent = activeSelectionList.indexOf(categoryId)
        const body = {
          sort_value: this.apiSortValue(),
          sort_by: this.apiSortOrder(),
          workspace_id: this.$getWorkspaceId(),
          category_id: moveTo.id,
        }
        this.$axios
          .$get(
            'digital-assets/category/view-files-with-category?' +
              this.$toQueryString(body),
            body
          )
          .then(({ data }) => {
            const subFolders = makeFolder(
              data.folder.sort(
                this.$sortBy('folder_name', false, null, true)
              ) || []
            )
            const files =
              data.category_assets.sort(
                this.$sortBy('display_file_name', false, null, true)
              ) || []

            const folders = [
              ...subFolders.map((ev) => ({ folder: ev })),
              ...files.map((ev) => ({ file: ev })),
            ]
            this.$store.dispatch('dam/updateFolderName', {
              folders,
              indexOfParent,
            })
          })
      }
      movedFile = []
      this.selectNone()
      this.getOverviewData()
    },
    updateTrendingAssetList(selectedFolderData) {
      const activeSelectionList = this.activeSelection
      selectedFolderData.map(async (item) => {
        if (
          activeSelectionList.includes(item.id) &&
          activeSelectionList.includes(item.parentId)
        ) {
          const indexOfParent = activeSelectionList.indexOf(item.id)

          const body = {
            sort_value: this.apiSortValue(),
            sort_by: this.apiSortOrder(),
            workspace_id: this.$getWorkspaceId(),
            category_id: item.id,
          }
          await this.$axios
            .$get(
              'digital-assets/category/view-files-with-category?' +
                this.$toQueryString(body),
              body
            )
            .then(({ data }) => {
              const subFolders = makeFolder(
                data.folder.sort(
                  this.$sortBy('folder_name', false, null, true)
                ) || []
              )
              const files =
                data.category_assets.sort(
                  this.$sortBy('display_file_name', false, null, true)
                ) || []

              const folders = [
                ...subFolders.map((ev) => ({ folder: ev })),
                ...files.map((ev) => ({ file: ev })),
              ]

              this.$store.dispatch('dam/updateFolderName', {
                folders,
                indexOfParent,
              })
            })
            .catch((e) => {
              const message = this.$getErrorMessage(e)
              this.$toast.global.error(message)
            })
        }
        return item
      })
      this.selectNone()
      if (this.reloadTrending) {
        this.reloadTrending = false
        this.loadTrendingData(this.trendingType)
      }
      this.getOverviewData()
    },
    selectFromDropdown(file, type, resourceType, isTrending) {
      this.resourceType = resourceType
      this.resource = [file]
      if (type === 'move') {
        this.$refs.moveDialog.show()
      } else if (type === 'moveFolder') {
        this.$refs.moveFoldersDialog.show()
      } else if (type === 'copy') {
        this.$refs.copyDialog.show()
      } else if (type === 'download') {
        this.$refs.selectionbar.downloadSelectedFile(
          this.resource,
          resourceType
        )
      } else if (type === 'delete') {
        this.$refs.deleteDialog.show()
      }
      if (isTrending) this.reloadTrending = true
    },
    deleteFromDrop() {
      const fileId = this.resource[0].file_name ? this.resource[0].id : null
      const folderId = this.resource[0].folder_name ? this.resource[0].id : null
      this.deleting = true
      this.$axios
        .$post('digital-assets/category/delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: folderId ? [folderId] : [],
          assets_ids: fileId ? [fileId] : [],
        })
        .then(({ message }) => {
          if (folderId && !fileId)
            this.$toast.global.success(`Folder deleted successfully.`)
          else if (message) this.$toast.global.success(message)

          this.$nextTick(() => {
            this.deleting = false
            this.trendingData = this.trendingData.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.selectedFiles = this.selectedFiles.filter(
              (e) => e.id !== this.resource[0].id
            )
            if (folderId) {
              this.$store.dispatch('dam/getFolders').catch(console.error)
            }
          })
        })
        .catch((e) => {
          this.deleting = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => this.getOverviewData())
    },
    updateFileName(oldFile, newName) {
      let files = JSON.parse(JSON.stringify(this.trendingData))
      files = files.map((item) => {
        if (item.id === oldFile.id) {
          item.display_file_name = newName
        }
        return item
      })
      this.trendingData = JSON.parse(JSON.stringify(files))
    },
    async loadTrendingData(data) {
      this.loading = true
      if (data) {
        this.trendingType = data
        if (data !== 'recent_uploaded') {
          const query = { ...this.$route.query }
          delete query.tab
          this.$router.push({
            name: this.$route.name,
            path: this.$route.path,
            params: this.$route.params,
            hash: this.$route.hash,
            query,
          })
        }
      }
      this.selectNone()
      await this.$axios
        .$get(`digital-assets/dashboard/trending-recent-assets`, {
          params: {
            workspace_id: this.$getWorkspaceId(),
            type: this.trendingType,
          },
        })
        .then((response) => {
          this.trendingData = response.data
          this.files = response.data
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeView(data) {
      this.mode = data
    },
    removeSelectedFiles(
      selectionOption = null,
      resourceTypes = [],
      assets = {}
    ) {
      if (resourceTypes.includes('folder')) {
        // deletion of folder from panel view
        // todo: refactor, some parts do not work
        const indexOfFolderList = 0
        const activeSelectionList = this.activeSelection
        const parentId = this.resource?.[indexOfFolderList]?.parent_id
        const indexOfParent = activeSelectionList.indexOf(parentId)
        const folderIds = this.resource.map(({ id }) => id)
        const resourcesIds = [].concat(folderIds)
        this.$store.dispatch('dam/deleteFolder', {
          resourcesIds,
          indexOfParent,
        })
        const selectedIds = this.selectedFolders.map(({ id }) => id)
        this.subFolders = this.subFolders.filter(
          ({ id }) => !selectedIds.includes(id)
        )
        this.updateList++
      }
      if (resourceTypes.includes('file')) {
        const selectedFile = this.resource ? this.resource : this.selectedFiles
        const fileIds = selectedFile.map(({ id }) => id)
        this.trendingData = this.trendingData.filter(
          ({ id }) => !fileIds.includes(id)
        )
        if (this.parentOfselected && !this.resource.length) {
          const resourcesIds = [].concat(fileIds)
          const activeSelectionList = this.activeSelection
          const parentId = this.parentOfselected
          const indexOfParent = activeSelectionList.indexOf(parentId)
          this.$store.dispatch('dam/deleteFolder', {
            resourcesIds,
            indexOfParent,
          })
        } else {
          const indexOfFolderList = 0
          const activeSelectionList = this.activeSelection
          let parentId = 0
          if (this.resourceType === 'file') {
            parentId = this.resource?.[indexOfFolderList]?.category_id
          } else {
            parentId = this.resource?.[indexOfFolderList]?.parent_id
          }
          const indexOfParent = activeSelectionList.indexOf(parentId)
          const resourceFolderIds = this.resource.map(({ id }) => id)
          const resourcesIds = [].concat(resourceFolderIds)
          this.$store.dispatch('dam/deleteFolder', {
            resourcesIds,
            indexOfParent,
          })
        }
        // end of delete assets from all views
        const selectedIds = this.selectedFiles.map(({ id }) => id)
        this.trendingData = this.trendingData.filter(
          ({ id }) => !selectedIds.includes(id)
        )
      }
      this.getOverviewData()
      this.trendingData = this.trendingData.filter(
        (e) => !(assets.fileIds || []).includes(e.id)
      )
      this.selectedFiles = this.selectedFiles.filter(
        (e) => !(assets.fileIds || []).includes(e.id)
      )
    },
    async graphInit({ mode, month, week, quarter, year, endDate, startDate }) {
      const FORMAT = 'YYYY-MM-DD'
      const graph = {}

      graph.mode = mode || this.graph.mode || 'media_assets'
      this.graph.mode = graph.mode

      endDate = endDate || this.$moment().startOf('day').format(FORMAT)

      let toFetch = true

      if (month) {
        startDate = this.$moment()
          .startOf('day')
          .subtract(29, 'days')
          .format(FORMAT)
        graph.dates = { month: true, startDate, endDate }
      } else if (week) {
        startDate = this.$moment()
          .startOf('day')
          .subtract(6, 'days')
          .format(FORMAT)
        graph.dates = { week: true, startDate, endDate }
      } else if (quarter) {
        startDate = this.$moment()
          .startOf('day')
          .subtract(89, 'days')
          .format(FORMAT)
        graph.dates = { startDate, endDate }
      } else if (year) {
        startDate = this.$moment()
          .startOf('day')
          .subtract(364, 'days')
          .format(FORMAT)
        graph.dates = { startDate, endDate }
      } else if (endDate && startDate) {
        graph.dates = { startDate, endDate, custom: true }
      } else toFetch = false

      if (toFetch) {
        this.graph.dates = graph.dates
        const data = await this.getGraphData(startDate, endDate)
        graph.fetchedData = data || this.graph.fetchedData
      } else graph.fetchedData = this.graph.fetchedData

      if (graph.fetchedData) {
        const ctx = document.createElement('canvas').getContext('2d')

        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, '#2180bc03')
        gradient.addColorStop(1, '#2180bc63')
        gradient.addColorStop(1, '#2180bcaf')

        graph.data = {
          labels: Object.keys(graph.fetchedData[graph.mode]),
          datasets: [
            {
              label: this.modeToLabel(graph.mode),
              data: Object.values(graph.fetchedData[graph.mode]),
              fillColor: gradient,
              borderColor: 'white',
              pointColor: '#fff',
              pointStrokeColor: '#ff6c23',
              pointHighlightFill: '#fff',
              pointHighlightStroke: '#ff6c23',
              borderWidth: 1,
              spanGaps: true,
            },
          ],
        }
      }

      Object.assign(this.graph, graph)
    },
    modeToLabel(key) {
      switch (key) {
        case 'media_assets':
          return 'Media Assets'
        case 'storage':
          return 'Storage'
        case 'bandwidth':
          return 'Bandwidth'
      }
    },
    async getGraphData(startDate, endDate) {
      this.graph.loading = true

      const { data } = await this.$axios
        .$post('digital-assets/dashboard/graph-data', {
          workspace_id: this.$getWorkspaceId(),
          start_date: startDate,
          end_date: endDate,
          date_type: this.timeFrame.find(
            (e) => e.id === parseInt(this.selectedTimeFrame)
          ).name,
        })
        .catch(this.$errorToast)

      this.graph.loading = false

      this.graph.overview.storage = Object.values(data.storage).reduce(
        (i, j) => i + j
      )
      this.graph.overview.media_assets = Object.values(
        data.media_assets
      ).reduce((i, j) => i + j)
      this.graph.overview.bandwidth = Object.values(data.bandwidth).reduce(
        (i, j) => i + j
      )

      return data
    },
    getOverviewData() {
      if (this.overviewLoading) {
        if (this.overviewTimer) {
          clearTimeout(this.overviewTimer)
          this.overviewTimer = null
        }
        this.overviewTimer = setTimeout(() => this.getOverviewData(), 800)
        this.overviewLoading = false
        return
      }
      this.overviewLoading = true
      this.$axios
        .$get(
          `/digital-assets/dashboard/common-data?workspace_id=${this.$getWorkspaceId()}`
        )
        .then(({ data }) => {
          const categoryAlert = JSON.parse(
            localStorage.getItem(`${this.$getWorkspaceId()}`)
          )
          if (categoryAlert !== null) {
            if (
              data.total_uncategorized > 0 &&
              categoryAlert.dismiss === false
            ) {
              categoryAlert.active = true

              localStorage.setItem(
                `${this.$auth.user.workspace_id}`,
                JSON.stringify(categoryAlert)
              )
              this.alertData = categoryAlert
            } else {
              categoryAlert.active = false

              localStorage.setItem(
                `${this.$auth.user.workspace_id}`,
                JSON.stringify(categoryAlert)
              )
              this.alertData = categoryAlert
            }
          } else if (categoryAlert === null) {
            if (data.total_uncategorized > 0) {
              const categoryAlert = {
                active: true,
                dismiss: false,
              }
              localStorage.setItem(
                `${this.$auth.user.workspace_id}`,
                JSON.stringify(categoryAlert)
              )
              this.alertData = categoryAlert
            }
          }
          this.$store.commit('dam/resetNewFolderCount')

          data.loaded = true
          this.dashboardData = data
        })
        .catch(this.$errorToast)
        .finally(() => (this.overviewLoading = false))
    },
  },
}
</script>

<style scoped>
.chartWidth {
  flex: 1;
  padding: 0px 0px 0px 1rem;
  width: calc(100% - 220px);
}
.storageChartInfo ul li {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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

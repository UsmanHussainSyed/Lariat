<template>
  <div
    class="main-search dam-search searching"
    :class="{ searching: active && (!!anySearchText || !!recentActive) }"
    style="background-color: white; border-radius: 4px"
  >
    <div class="search-by">
      <client-only>
        <Select2
          v-model="searchParams.filter"
          class="select2-hidden-accessible"
          :attrs="{ minimumResultsForSearch: -1 }"
          :options="filterOptions"
        />
      </client-only>
    </div>

    <form class="main-search-inner" @submit.prevent="search()">
      <a :disabled="!hasFilters" class="search-btn" @click="search()">
        <svg
          id="Layer_1"
          class="search-icon white"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <path
            id="Icon_ionic-ios-search"
            class="fill-color"
            d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
          />
        </svg>
      </a>

      <input
        id="main-search"
        ref="searchInput"
        v-model.trim="searchParams.search_term"
        autocomplete="off"
        type="text"
        class="form-control"
        aria-label="Text input with dropdown button"
        placeholder="Search assets"
        @keyup.esc="moreOptions = false"
        @paste="handlePaste"
        @blur="focused = false"
        @focus="focused = active = true"
        @click="getSearchHistoryData()"
      />
      <a href="javascript:void(0);" class="search-filter-btn">
        <svg
          id="Layer_1"
          class="filter-icon h-orange"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
          @click="moreOptions = !moreOptions"
        >
          <path
            id="Path_3228"
            class="fill-color"
            d="M0,9c0-0.4,0.3-0.7,0.7-0.7l0,0H4V6.6c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7c0,0,0,0,0,0v4.8c0,0.4-0.3,0.7-0.7,0.7c-0.4,0-0.7-0.3-0.7-0.7c0,0,0,0,0,0V9.7H0.7C0.3,9.7,0,9.4,0,9z M17.3,8.3H7.1C6.7,8.3,6.3,8.6,6.4,9c0,0.4,0.3,0.7,0.7,0.7h10.2C17.7,9.7,18,9.4,18,9C18,8.6,17.7,8.3,17.3,8.3C17.3,8.3,17.3,8.3,17.3,8.3L17.3,8.3z M0.7,3.9h9.2c0.4,0,0.7-0.4,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7H0.7C0.3,2.4,0,2.7,0,3.1C0,3.5,0.3,3.9,0.7,3.9C0.7,3.9,0.7,3.9,0.7,3.9z M17.3,2.4h-4.4V0.7c0-0.4-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.3-0.7,0.7v4.8c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7l0,0V3.9h4.4c0.4,0,0.7-0.3,0.7-0.7C18,2.8,17.7,2.4,17.3,2.4C17.3,2.4,17.3,2.4,17.3,2.4L17.3,2.4z M17.3,14.1H9.7c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0.1,0h7.6c0.4,0,0.7-0.3,0.7-0.7C18,14.5,17.7,14.1,17.3,14.1C17.3,14.1,17.3,14.1,17.3,14.1zM7.3,11.7c-0.4,0-0.7,0.3-0.7,0.7v1.7H0.7c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0.1,0h5.9v1.7c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7l0,0v-4.8C8.1,12,7.8,11.7,7.3,11.7C7.4,11.7,7.3,11.7,7.3,11.7L7.3,11.7z"
          />
        </svg>
      </a>
    </form>
    <div
      v-if="
        active &&
        recentActive &&
        !anySearchText &&
        searchHistoryList &&
        searchHistoryList.length
      "
      class="main-search-box customscrollbar"
    >
      <div class="search-result-section recentSearch">
        <div class="d-flex align-items-center justify-content-between">
          <div class="search-title">Recent Search Results</div>
          <a href="javascript:void(0);" class="btn-link" @click="clearHistory()"
            >Clear All</a
          >
        </div>
        <div
          v-for="searchHistory in searchHistoryList"
          :key="searchHistory.id"
          class="search-result-option"
        >
          <a @click="searchFromHistory(searchHistory.search_text)">
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <svg
                  id="Layer_1"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                  class="timer-icon"
                >
                  <g id="Group_4346" transform="translate(-115.321 -147.331)">
                    <path
                      id="Path_3396"
                      d="M124.3,165.3c-5,0-9-4-9-9s4-9,9-9s9,4,9,9C133.3,161.3,129.3,165.3,124.3,165.3z M124.3,148.9c-4.1,0-7.4,3.3-7.4,7.4s3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4C131.7,152.2,128.4,148.9,124.3,148.9z"
                      class="fill-color"
                    ></path>
                    <path
                      id="Path_3397"
                      d="M123.6,156.7l-0.1-4.7c0-0.4,0.4-0.8,0.8-0.8c0,0,0,0,0,0l0,0c0.4,0,0.8,0.4,0.8,0.8v4.1l2.7,2.6c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l0,0c-0.3,0.3-0.8,0.3-1.1,0L123.6,156.7z"
                      class="fill-color"
                    ></path>
                  </g>
                </svg>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span
                    ><span> {{ searchHistory.search_text }}</span></span
                  >
                </div>
              </div>
            </div>
          </a>
          <div
            class="recentSearch-remove"
            @click.prevent.capture.stop="removeFromHistory(searchHistory.id)"
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
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="active && !!anySearchText"
      class="main-search-box customscrollbar"
    >
      <div v-if="loading" class="main-search-loader">
        <svg
          id="Layer_1"
          class="refresh-icon fa-spin"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4491" transform="translate(-1206 -466)">
            <rect
              id="Rectangle_3030"
              x="1206"
              y="466"
              class="fill-white"
              width="18"
              height="18"
            />
            <g
              id="Icon_feather-refresh-cw"
              transform="translate(-369.921 -994.994)"
            >
              <g id="Path_3566">
                <path
                  id="Path_3569"
                  class="fill-color"
                  d="M1593.2,1469.2h-4.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h3.8v-3.8c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v4.5C1593.9,1468.9,1593.6,1469.2,1593.2,1469.2z"
                />
              </g>
              <g id="Path_3567">
                <path
                  id="Path_3570"
                  class="fill-color"
                  d="M1576.7,1476.7c-0.4,0-0.7-0.3-0.7-0.7v-4.5c0-0.4,0.3-0.7,0.7-0.7h4.5c0.4,0,0.7,0.3,0.7,0.7s-0.3,0.7-0.7,0.7h-3.8v3.8C1577.4,1476.4,1577.1,1476.7,1576.7,1476.7z"
                />
              </g>
              <g id="Path_3568">
                <path
                  id="Path_3571"
                  class="fill-color"
                  d="M1584.9,1477.5c-2,0-3.9-0.8-5.3-2.2l-3.5-3.3c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l3.5,3.3c2.3,2.4,6.2,2.4,8.5,0c0.6-0.6,1.1-1.4,1.4-2.3c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9c0,0,0,0,0,0C1590.9,1475.5,1588.1,1477.5,1584.9,1477.5L1584.9,1477.5z M1593.2,1469.2c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.3c-2.3-2.4-6.2-2.4-8.5,0c-0.6,0.6-1.1,1.4-1.4,2.3c-0.1,0.4-0.6,0.6-0.9,0.4c-0.4-0.1-0.6-0.5-0.4-0.9c1.4-3.9,5.7-5.9,9.6-4.6c1.1,0.4,2,1,2.8,1.8l3.5,3.3c0.3,0.3,0.3,0.7,0,1C1593.6,1469.1,1593.4,1469.2,1593.2,1469.2L1593.2,1469.2z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div v-else-if="noResult" class="search-result-section">
        <div class="search-result-not-found">
          <div class="search-result-structure">
            No result found for "{{ searchParams.search_term }}"
          </div>
        </div>
      </div>
      <div
        v-if="searchResult.assets && searchResult.assets.length"
        class="search-result-section"
      >
        <div class="search-title">Assets</div>
        <div
          v-for="asset in searchResult.assets"
          :key="`asset-${asset.id}`"
          class="search-result-option"
        >
          <nuxt-link
            :to="{
              name: 'workspace_id-dam-files-id',
              params: { workspace_id: $getWorkspaceId(), id: asset.id },
            }"
            target="_blank"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <div
                  class="profile-bg"
                  :style="{
                    backgroundImage: `url(
                        '${asset.thumbnail_file || asset.preview_image}'
                      )`,
                  }"
                ></div>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span>
                    <mark></mark>
                    <span
                      v-html="
                        $getSearchedMarkedText(
                          asset.display_file_name,
                          searchParams.search_term
                        )
                      "
                    ></span>
                  </span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="search-result-option">
          <div class="show-more-link">
            <a @click="searchMoreByText()">Show Results</a>
          </div>
        </div>
      </div>
      <div
        v-if="searchResult.assetsTag && searchResult.assetsTag.length"
        class="search-result-section"
      >
        <div class="search-title">Assets Using Tags</div>
        <div
          v-for="asset in searchResult.assetsTag"
          :key="`asset-tag-${asset.id}`"
          class="search-result-option"
        >
          <nuxt-link
            :to="{
              name: 'workspace_id-dam-files-id',
              params: { workspace_id: $getWorkspaceId(), id: asset.id },
            }"
            target="_blank"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <div
                  class="profile-bg"
                  title="Ambulance Lead Times"
                  :style="{
                    backgroundImage: `url(
                        '${asset.thumbnail_file || asset.preview_image}'
                      )`,
                  }"
                ></div>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span>
                    <span>{{ asset.display_file_name }}</span>
                  </span>
                </div>
                <div v-for="_tag in asset.tags" :key="_tag.id" class="tag-box">
                  <span
                    ><label
                      v-html="
                        $getSearchedMarkedText(
                          _tag.tag_name || _tag.search_tag_name,
                          searchParams.search_term,
                          'strong'
                        )
                      "
                    ></label
                  ></span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="search-result-option">
          <div class="show-more-link">
            <a href="javascript:void(0);" @click="searchMoreByTag()"
              >Show Results</a
            >
          </div>
        </div>
      </div>
      <div
        v-if="searchResult.tags && searchResult.tags.length"
        class="search-result-section"
      >
        <div class="search-title">Tags</div>
        <div class="search-result-option">
          <div class="search-result-structure-label">
            <div class="tag-box">
              <span
                v-for="tag in searchResult.tags"
                :key="`tag-${tag.id}`"
                @click="searchByTag(tag.tag_name || tag.search_tag_name)"
              >
                <label
                  v-html="
                    $getSearchedMarkedText(
                      tag.tag_name || tag.search_tag_name,
                      searchParams.search_term,
                      'strong'
                    )
                  "
                >
                </label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <portal to="dam-header-bottom">
        <div
          class="filter-menu pb-0 customscrollbar"
          :class="{ show: moreOptions }"
        >
          <div
            v-if="!advancedSearchAllowed"
            class="common-overaly has-relative"
          >
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
          <div :class="{ 'common-blur': !advancedSearchAllowed }">
            <div class="daterange-loop daterange-wrapper"></div>
            <div class="row align-items-center">
              <div class="col-md-6">
                <h4 class="m-0">Refine your search</h4>
              </div>
              <div
                class="col-md-6 d-flex justify-content-end align-items-center"
              >
                <button
                  v-if="filterItems.length"
                  class="btn btn-gray apply-btn"
                  type="button"
                  @click="reset"
                >
                  Reset
                </button>
                <button
                  type="button"
                  class="btn btn-blue apply-btn"
                  :class="{ 'btn-disable': !hasFilters }"
                  :disabled="!hasFilters"
                  @click="search()"
                >
                  Apply Filters
                </button>
                <a class="filter-close" @click="moreOptions = false">
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
                      />
                      <path
                        id="Path_3425"
                        class="fill-color"
                        d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                      />
                    </g>
                  </svg>
                </a>
              </div>
              <div :class="{ 'mt-4': filterItems.length }" class="col-md-12">
                <transition-group tag="div" name="slide-up" class="tag-add-box">
                  <span
                    v-for="filterItem in filterItems"
                    :key="filterItem.key"
                    class="added-tag"
                  >
                    <label :inner-html.prop="filterItem.name"></label>
                    <span @click="removeFilter(filterItem)">
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
                          />
                          <path
                            id="Path_3425"
                            class="fill-color"
                            d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                          />
                        </g>
                      </svg>
                    </span>
                  </span>
                </transition-group>
              </div>
            </div>
            <div class="filter-wrapper mt-3 mb-4">
              <div class="row">
                <div class="col-md-4 col-lg-3 col-xl">
                  <div class="filter-menu-inner">
                    <h5>Upload Date</h5>

                    <ul class="filter-option">
                      <li
                        v-for="date in optionDates"
                        :key="date.value"
                        class="select-field"
                      >
                        <input
                          :id="`uploaddate-${date.value}`"
                          :value="date.value"
                          type="radio"
                          :checked="searchParams.date === date.value"
                          name="uploadDate"
                          @click="selectDate"
                        />

                        <label
                          class="select-box"
                          :for="`uploaddate-${date.value}`"
                        >
                          {{ date.text }}
                        </label>
                      </li>
                      <li class="select-field">
                        <div
                          class="select-box"
                          :class="{
                            'dam-selected':
                              searchParams.start_date || searchParams.end_date,
                          }"
                        >
                          <DateRangePicker
                            ref="dateRangePicker"
                            class="daterange flatpickr-input"
                            :start-date.sync="searchParams.start_date"
                            :end-date.sync="searchParams.end_date"
                            placeholder="Custom Date Range"
                            display-format="MMM Do, YYYY"
                            custom-event
                            human
                            @dateChanged="
                              ;(searchParams.start_date ||
                                searchParams.end_date) &&
                                (searchParams.date = '')
                            "
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4 col-lg-3 col-xl">
                  <div class="filter-menu-inner">
                    <h5>Popular File Types</h5>
                    <template v-if="fileTypes.length">
                      <ul class="filter-option">
                        <li
                          v-for="type in fileTypes"
                          :key="type.id"
                          class="select-field"
                        >
                          <input
                            :id="`file-type-${type.file_type}`"
                            :value="type.file_type"
                            :checked="
                              searchParams.file_types.includes(type.file_type)
                            "
                            type="checkbox"
                            name="file-type"
                            @click="selectFileType"
                          />
                          <label
                            class="select-box"
                            :for="`file-type-${type.file_type}`"
                          >
                            <span>{{ type.file_type }}</span>
                            <span>
                              {{
                                Number(
                                  type.total_assets_count || 0
                                ).toLocaleString()
                              }}
                            </span>
                          </label>
                        </li>
                      </ul>
                    </template>
                    <ul v-else class="filter-option">
                      <li class="mt-3">
                        <span class="text-secondary">No assets available.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4 col-lg-3 col-xl-5">
                  <div class="filter-menu-inner">
                    <h5>Popular Tags</h5>
                    <div class="tag-box">
                      <span v-for="tag in popularTags" :key="tag.id">
                        <input
                          :id="`tags-${tag.tag_name}`"
                          :value="tag.tag_name"
                          type="checkbox"
                          :checked="searchParams.tags.includes(tag.tag_name)"
                          name="tags"
                          @input="addTag"
                        />
                        <label
                          class="select-box"
                          :for="`tags-${tag.tag_name || tag.search_tag_name}`"
                        >
                          {{ tag.tag_name || tag.search_tag_name }} ({{
                            Number(tag.total_tag_count || 0).toLocaleString()
                          }})
                        </label>
                      </span>
                    </div>
                    <div v-if="searchData.popular_tag_select">
                      <Multiselect
                        v-model="searchParams.other_tags"
                        multiple
                        :close-on-select="false"
                        :options="
                          searchData.popular_tag_select.map(
                            (item) => item.tag_name || tag.search_tag_name
                          )
                        "
                        placeholder="Other Tags"
                        custom-event
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-lg-3 col-xl">
                  <div class="filter-menu-inner">
                    <template v-if="searchData.orientation">
                      <h5>Orientation</h5>
                      <ul class="filter-option">
                        <li
                          v-for="orientation in orientations"
                          :key="orientation.value"
                          class="select-field"
                        >
                          <input
                            :id="`orientation-${orientation.value}`"
                            :value="orientation.value"
                            :checked="
                              searchParams.orientation === orientation.value
                            "
                            type="radio"
                            name="orientation"
                            @click="selectOrientation"
                          />
                          <label
                            class="select-box"
                            :for="`orientation-${orientation.value}`"
                          >
                            <span>{{ orientation.text }}</span>
                            <span>
                              {{
                                Number(
                                  searchData.orientation[orientation.value] || 0
                                ).toLocaleString()
                              }}
                            </span>
                          </label>
                        </li>
                      </ul>
                    </template>
                    <h5 class="mb-2">Permission</h5>
                    <Select2
                      v-model="searchParams.permission"
                      class="select"
                      :attrs="{ minimumResultsForSearch: -1 }"
                      :options="permissionOptions"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </portal>
    </client-only>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import moment from 'moment'
import Multiselect from 'vue-multiselect'
import Select2 from '~/components/plugins/Select2'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import 'vue-multiselect/dist/vue-multiselect.min.css'

const orientations = Object.freeze([
  { text: 'Horizontal', value: 'horizontal' },
  { text: 'Vertical', value: 'vertical' },
  { text: 'Square', value: 'square' },
])

const DATE_FORMAT = 'YYYY-MM-DD'

const subFromToday = (...arg) =>
  moment()
    .startOf('day')
    .subtract(...arg)
    .format(DATE_FORMAT)

const getToday = () => moment().startOf('day').format(DATE_FORMAT)

const optionDates = Object.freeze([
  { text: 'All', value: 'all', getDates: () => ['all', 'all'] },
  { text: 'Past 30 minutes', value: '30min' },
  {
    text: 'Past 24 hours',
    value: '24hr',
    getDates: () => [getToday(), subFromToday('1', 'day')],
  },
  {
    text: 'Last week',
    value: '7d',
    getDates: () => [getToday(), subFromToday('1', 'week')],
  },
  {
    text: 'Last 30 days',
    value: '30d',
    getDates: () => [getToday(), subFromToday('30', 'day')],
  },
])

const filterOptions = Object.freeze([
  { text: 'All', id: 'all' },
  { text: 'Audios', id: 'audio' },
  { text: 'Documents', id: 'application' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
])
const permissionOptions = Object.freeze([
  { text: 'All', id: 'all' },
  { text: 'Public', id: '1' },
  { text: 'Private', id: '0' },
])

function SearchParams() {
  this.exact_term = false
  this.file_types = []
  this.tags = []
  this.date = 'all'
  this.search_term = ''
  this.start_date = ''
  this.end_date = ''
  this.orientation = ''
  this.other_tags = []
  this.filter = 'all'
  this.permission = 'all'
}

export default {
  components: { Select2, DateRangePicker, Multiselect },
  data() {
    return {
      orientations,
      optionDates,
      SearchParams,
      filterOptions,
      permissionOptions,
      searchParams: this.$route.params.searchParams || new SearchParams(),
      moreOptions: false,
      //
      searchData: {},
      searchDataLoading: false,
      active: false,
      pastedText: null,
      loading: false,
      searchResult: {},
      recentActive: false,
      searchHistoryList: [],
      focused: false,
    }
  },
  computed: {
    advancedSearchAllowed() {
      return this.$auth.user.subscription_features?.advance_search_functionality
        ?.enable
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    hasFilters() {
      return !!this.filterItems.length
    },
    fileTypes() {
      return [...(this.searchData?.popular_file_type || [])]
        .filter((a) => a && a.total_assets_count >= 5)
        .sort(this.$sortBy('total_assets_count', true, this.$sortToTypedNumber))
        .slice(0, 12)
    },
    popularTags() {
      return [...(this.searchData?.popular_tag || [])]
        .filter((a) => a && a.total_tag_count >= 5)
        .sort(this.$sortBy('total_tag_count', true, this.$sortToTypedNumber))
        .slice(0, 12)
    },
    filterItems() {
      const filters = []

      if (this.searchParams.search_term)
        filters.push({
          key: 'search_term',
          type: 'search_term',
          name: `Term: <strong>${this.$escapeHtml(
            this.searchParams.search_term
          )}</strong>`,
        })

      if (this.searchParams.exact_term)
        filters.push({
          key: 'exact_term',
          type: 'exact_term',
          name: '<strong>Exact match</strong>',
        })

      if (this.searchParams.filter !== 'all') {
        const text = filterOptions.find(
          ({ id }) => id === this.searchParams.filter
        ).text

        filters.push({
          key: 'filter',
          type: 'filter',
          name: `Search in :&nbsp;<strong>${text}</strong>`,
        })
      }
      if (this.advancedSearchAllowed) {
        if (this.searchParams.date !== 'all')
          if (this.searchParams.date) {
            const text = optionDates.find(
              ({ value }) => value === this.searchParams.date
            ).text
            filters.push({
              key: 'date',
              type: 'date',
              name: `Upload Date:&nbsp;<strong>${text}</strong>`,
            })
          } else if (
            this.searchParams.start_date ||
            this.searchParams.end_date
          ) {
            if (this.$refs.dateRangePicker)
              filters.push({
                key: 'date',
                type: 'custom_date',
                name: `Upload Date:&nbsp;<strong>${this.$refs.dateRangePicker.getValueText()}</strong>`,
              })
            else if (this.$route.params.filterItems) {
              const a = this.$route.params.filterItems.find(
                ({ key }) => key === 'date'
              )
              if (a) filters.push(a)
            }
          }
        filters.push(
          ...(this.searchParams.file_types || []).map((type) => ({
            key: `ext-${type}`,
            type: 'file_types',
            name: `Ext:&nbsp;<strong>${type}</strong>`,
            value: type,
          })),
          ...(this.searchParams.tags || []).map((tag) => ({
            key: `tag-${tag}`,
            type: 'tags',
            name: `Tag:&nbsp;<strong>${tag}</strong>`,
            value: tag,
          })),
          ...(this.searchParams.other_tags || []).map((tag) => ({
            key: `tag-${tag}`,
            type: 'other_tags',
            name: `Tag:&nbsp;<strong>${tag}</strong>`,
            value: tag,
          }))
        )
      }
      if (this.searchParams.orientation && this.advancedSearchAllowed) {
        const text = orientations.find(
          ({ value }) => value === this.searchParams.orientation
        ).text

        filters.push({
          key: 'orientation',
          type: 'orientation',
          name: `Orientation: &nbsp;<strong>${text}</strong>`,
          value: this.searchParams.orientation,
        })
      }
      if (
        this.searchParams.permission !== 'all' &&
        this.advancedSearchAllowed
      ) {
        const text = permissionOptions.find(
          ({ id }) => id === this.searchParams.permission
        ).text

        filters.push({
          key: 'permission',
          type: 'permission',
          name: `Search in :&nbsp;<strong>${text}</strong>`,
        })
      }

      return filters
    },
    workspaceId() {
      return this.$route.params.workspace_id
    },
    anySearchText() {
      return (this.searchParams.search_term || this.pastedText || '').trim()
    },
    noResult() {
      const { assets, tags, assetsTag } = this.searchResult
      return (
        (!assets || !assets.length) &&
        (!tags || !tags.length) &&
        (!assetsTag || !assetsTag.length)
      )
    },
  },
  watch: {
    $route(route) {
      if (route.name !== 'workspace_id-dam') {
        window.$('body').removeClass('show-overly')
        this.moreOptions = false
        this.reset()
      }
    },
    hashParam() {
      if (!this.$route.params.searchParams)
        this.searchParams.filter = this.advancedSearchAllowed
          ? filterOptions.find(({ id }) => this.hashParam === id)?.id || 'all'
          : 'all'
    },
    '$route.query.moreOptions'(moreOptions) {
      this.moreOptions = moreOptions === true
    },
    moreOptions(moreOptions) {
      if (moreOptions) {
        this.getSearchData()
        window.$('body').addClass('show-overly')
      } else window.$('body').removeClass('show-overly')

      if (moreOptions) document.addEventListener('keyup', this.keyEvent)
      else {
        document.removeEventListener('keyup', this.keyEvent)

        const query = { ...this.$route.query }

        if (query.moreOptions) {
          delete query.moreOptions

          this.$router
            .replace({
              params: this.$route.params,
              query,
              hash: this.$route.hash,
            })
            .catch(() => {})
        }
      }
    },
    active(a) {
      if (a) {
        document.addEventListener('click', this.delayedBlured)
        document.addEventListener('contextmenu', this.delayedBlured)
      } else {
        document.removeEventListener('click', this.delayedBlured)
        document.removeEventListener('contextmenu', this.delayedBlured)
      }
    },
    'searchParams.search_term'() {
      this.active = true
      this.commonSearch()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.searchParams = this.$route.params.searchParams || new SearchParams()
      if (this.hashParam !== 'search')
        this.searchParams.filter =
          filterOptions.find(({ id }) => this.hashParam === id)?.id || 'all'
      this.active = false
    })
    this.$refs.searchInput.addEventListener(
      'keydown',
      (e) =>
        (parseInt(e.keyCode) === 9 || parseInt(e.keyCode) === 13) &&
        this.$nextTick(() => (this.active = false)),
      true
    )
    this.loadJs()
    this.getSearchData()
  },
  destroyed() {
    if (this.moreOptions) document.removeEventListener('keyup', this.keyEvent)
  },
  methods: {
    reset() {
      this.searchParams = new SearchParams()
      if (this.$route.hash === '#search') {
        this.$nextTick(() => {
          this.$router.push({
            name: 'workspace_id-dam',
            params: { workspace_id: this.$getWorkspaceId() },
          })
        })
      }
    },
    loadJs() {
      window.$('.body-overlay').click(() => {
        this.moreOptions = false
      })
    },
    getHasFilters() {
      return this.hasFilters
    },
    getRequestBody() {
      let start_date = null
      let end_date = null
      const date = this.searchParams.date

      if (!date) {
        start_date = moment(this.searchParams.start_date).format(DATE_FORMAT)
        end_date = moment(this.searchParams.end_date).format(DATE_FORMAT)
      } else if (date !== '30min') {
        const optionDate = optionDates.find(({ value }) => value === date)
        ;[end_date, start_date] = optionDate.getDates()
      }

      if (!this.advancedSearchAllowed) {
        return {
          workspace_id: this.$getWorkspaceId(),
          search_text: this.searchParams.search_term,
          type:
            this.searchParams.filter === 'all'
              ? null
              : this.searchParams.filter,
        }
      }
      return {
        workspace_id: this.$getWorkspaceId(),
        popular_file_type: [...(this.searchParams.file_types || [])],
        popular_tag: [
          ...(this.searchParams.tags || []),
          ...(this.searchParams.other_tags || []),
        ],
        search_text: this.searchParams.search_term,
        orientation: this.searchParams.orientation,
        last_minutes: date === '30min',
        type:
          this.searchParams.filter === 'all' ? null : this.searchParams.filter,
        start_date,
        end_date,
        is_public: this.searchParams.permission,
      }
    },
    search() {
      if (!this.hasFilters) return

      const routeOptions = {
        params: {
          workspace_id: this.$getWorkspaceId(),
          searchParams: this.searchParams,
          hasFilters: this.getHasFilters(),
          searchRequestBody: this.getRequestBody(),
          filterItems: this.filterItems,
          removeFilterItem: (filterItem) => {
            this.removeFilter(filterItem)
            this.$nextTick(() => {
              if (!this.hasFilters) {
                this.$router.replace({
                  name: 'workspace_id-dam',
                  params: { workspace_id: this.$getWorkspaceId() },
                })
                return
              }
              this.search()
            })
          },
        },
        hash: '#search',
        query: { searchId: Date.now() },
      }

      if (this.$route.name !== 'workspace_id-dam')
        routeOptions.name = 'workspace_id-dam'

      this.moreOptions = false

      this.$nextTick(() => this.$router.replace(routeOptions).catch(() => {}))
    },
    keyEvent(ev) {
      if (ev.key === 'Escape') this.moreOptions = false
    },
    async getSearchData() {
      this.searchDataLoading = true
      await this.$axios
        .$get(
          '/digital-assets/dashboard/all-popular-data?' +
            this.$toQueryString({ workspace_id: this.$getWorkspaceId() })
        )
        .then(({ data }) => {
          data.popular_file_type = data.popular_file_type.sort(
            ({ count }, a) => count - a.count
          )
          data.popular_tag_select = data.popular_tag_select.sort((a, b) => {
            const fa = (a.tag_name || a.search_tag_name).toLowerCase()
            const fb = (b.tag_name || b.search_tag_name).toLowerCase()

            if (fa < fb) {
              return -1
            }
            if (fa > fb) {
              return 1
            }
            return 0
          })
          this.searchData = Object.assign({}, this.searchData, data)
        })
        .catch()
      this.searchDataLoading = false
    },
    removeFilter(item) {
      switch (item.type) {
        case 'search_term':
          this.searchParams.search_term = ''
          break
        case 'exact_term':
          this.searchParams.exact_term = false
          break
        case 'filter':
        case 'date':
        case 'permission':
          this.searchParams[item.type] = 'all'
          break
        case 'orientation':
          this.searchParams.orientation = ''
          break
        case 'custom_date':
          this.searchParams.date = 'all'
          this.searchParams.start_date = ''
          this.searchParams.end_date = ''
          break
        case 'tags':
        case 'other_tags':
        case 'file_types':
          this.searchParams[item.type] = this.searchParams[item.type].filter(
            (type) => type !== item.value
          )
          break
        default:
      }
    },
    selectOrientation(ev) {
      if (ev.target.value === this.searchParams.orientation)
        this.searchParams.orientation = ''
      else this.searchParams.orientation = ev.target.value
    },
    selectDate(ev) {
      if (
        ev.target.value !== 'all' &&
        this.searchParams.date === ev.target.value
      )
        this.searchParams.date = 'all'
      else this.searchParams.date = ev.target.value

      this.searchParams.start_date = ''
      this.searchParams.end_date = ''
    },
    selectFileType(ev) {
      if (ev.target.checked) this.searchParams.file_types.push(ev.target.value)
      else
        this.searchParams.file_types = this.searchParams.file_types.filter(
          (type) => type !== ev.target.value
        )
    },
    addTag(ev) {
      if (ev.target.checked) this.searchParams.tags.push(ev.target.value)
      else
        this.searchParams.tags = this.searchParams.tags.filter(
          (tag) => tag !== ev.target.value
        )
    },
    commonSearch() {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer)
        this.searchTimer = null
      }
      const search = (
        this.searchParams.search_term ||
        this.pastedText ||
        ''
      ).trim()
      if (!search) {
        this.searchResult = {}
        this.loading = false
        return
      }

      this.loading = true

      this.searchTimer = setTimeout(() => {
        const search_text = search

        this.$axios
          .$post(`digital-assets/dashboard/common-search`, {
            url_workspace_id: this.$route.params.workspace_id,
            search_text,
            type: this.searchParams.filter,
          })
          .then(({ data }) => {
            ;(data.assetsTag || []).forEach((aTag) => {
              ;(aTag.tags || []).forEach((tag) => {
                tag.tag_name = tag.tag_name || tag.search_tag_name
              })
            })
            this.searchResult = data || {}
          })
          .finally(() => {
            this.pastedText = null
            this.$nextTick(() => (this.loading = false))
          })
      }, 250)
    },
    handlePaste(ev) {
      this.pastedText =
        ev && ev.clipboardData && ev.clipboardData.getData('text')
    },
    searchFromHistory(text) {
      this.searchParams.search_term = text
      this.$refs.searchInput.focus()
    },
    async getSearchHistoryData() {
      try {
        this.loading = true
        const { data } = await this.$axios.$post(
          `/digital-assets/dashboard/recent-search`
        )
        this.loading = false
        this.recentActive = true
        this.searchHistoryList = data
      } catch (e) {
        this.loading = false
        this.recentActive = false
      }
    },
    delayedBlured() {
      if (!this.focused)
        this.timerId = setTimeout(() => (this.active = false), 1)
    },
    searchByTag(tag) {
      this.searchParams.tags = [tag]
      this.searchParams.search_term = ''
      this.search()
    },
    searchMoreByTag() {
      this.searchParams.tags = []
      if (this.searchResult.tags && this.searchResult.tags.length) {
        this.searchResult.tags.forEach((ele) => {
          this.searchParams.tags.push(ele.tag_name || ele.search_tag_name)
        })
        this.searchParams.search_term = ''
        this.search()
      }
    },
    searchMoreByText() {
      this.searchParams.tags = []
      this.search()
    },
    async removeFromHistory(id) {
      try {
        await this.$axios.$post(
          '/digital-assets/dashboard/recent-search-remove',
          { id }
        )
        this.getSearchHistoryData()
      } catch (error) {}
    },
    async clearHistory() {
      try {
        await this.$axios.$post('/digital-assets/dashboard/recent-search-clear')
        this.searchHistoryList = []
      } catch (error) {}
    },
  },
}
</script>

<style>
.select-field input + label {
  transition: 240ms ease-out;
}
.tag-list .form-control.type-2 {
  height: 44px !important;
}
.selected-tags.popular-tags .select-field label {
  font-size: 12px;
  box-shadow: none !important;
  padding: 2px 28px 2px 4px;
}
.selected-tags.popular-tags .select-field {
  margin-bottom: 8px;
}
.selected-tags.popular-tags .select-field span {
  top: calc(50% - 5px);
  right: 12px;
  line-height: 10px;
  height: 10px;
  width: 10px;
  padding: 2px;
}
</style>

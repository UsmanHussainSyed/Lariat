<template>
  <div class="common-box-header">
    <client-only>
      <div
        v-if="hashParam == 'search' && $route.params.filterItems"
        class="filter-left"
      >
        <h5 class="mb0 mr-2">{{ assetsCount }} Assets found</h5>
        <transition-group tag="div" name="slide-right" class="popular-tags">
          <span
            v-for="filterItem in $route.params.filterItems.slice(0, 2)"
            :key="filterItem.key"
            class="added-tag"
          >
            <label :inner-html.prop="filterItem.name"></label>
            <span @click="$route.params.removeFilterItem(filterItem)">
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
            </span>
          </span>
          <div
            v-if="$route.params.filterItems.length > 2"
            key="more"
            class="more"
          >
            <strong>and</strong>
            <span class="added-tag" @click="openSearch">
              <label> {{ $route.params.filterItems.length - 2 }} more </label>
            </span>
          </div>
        </transition-group>
      </div>
      <div v-else-if="trashMode" class="filter-left">
        <nuxt-link
          class="home-icon breadcrumb-links"
          :to="{
            name: 'workspace_id-dam',
            params: { workspace_id: $getWorkspaceId() },
          }"
          ><svg
            id="Layer_1"
            class="home-icon orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 16.2 18"
            xml:space="preserve"
          >
            <g id="Group_4409" transform="translate(-871.194 -659.595)">
              <g id="Path_3470">
                <path
                  id="Path_3514"
                  class="fill-color"
                  d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                ></path>
              </g>
              <g id="Path_3471">
                <path
                  id="Path_3515"
                  class="fill-color"
                  d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                ></path>
              </g>
            </g></svg
        ></nuxt-link>
        <div class="breadcrumb-links mr-3">
          <ul>
            <li>&nbsp;</li>
            <li>
              <span>Trash</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="filter-left">
        <nuxt-link
          v-if="!hashParam"
          class="home-icon"
          :to="{
            name: 'workspace_id-dam',
            params: { workspace_id: $getWorkspaceId() },
          }"
        >
          <svg
            id="Layer_1"
            class="home-icon orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 16.2 18"
            xml:space="preserve"
          >
            <g id="Group_4409" transform="translate(-871.194 -659.595)">
              <g id="Path_3470">
                <path
                  id="Path_3514"
                  class="fill-color"
                  d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                ></path>
              </g>
              <g id="Path_3471">
                <path
                  id="Path_3515"
                  class="fill-color"
                  d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                ></path>
              </g>
            </g>
          </svg>
        </nuxt-link>
        <div v-if="!hashParam" class="breadcrumb-links mr-3">
          <ul>
            <li>&nbsp;</li>
            <li>
              <nuxt-link
                style="font-weight: bold; color: #172b4d"
                :to="{
                  name: 'workspace_id-dam',
                  params: { workspace_id: $getWorkspaceId() },
                }"
                >All Folders</nuxt-link
              >
            </li>
          </ul>
        </div>
        <nuxt-link
          v-if="breadcrumbs"
          class="home-icon breadcrumb-links"
          :to="{
            name: 'workspace_id-dam',
            params: { workspace_id: $getWorkspaceId() },
          }"
          ><svg
            id="Layer_1"
            class="home-icon orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 16.2 18"
            xml:space="preserve"
          >
            <g id="Group_4409" transform="translate(-871.194 -659.595)">
              <g id="Path_3470">
                <path
                  id="Path_3514"
                  class="fill-color"
                  d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                ></path>
              </g>
              <g id="Path_3471">
                <path
                  id="Path_3515"
                  class="fill-color"
                  d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                ></path>
              </g>
            </g></svg
        ></nuxt-link>
        <div v-if="breadcrumbs" class="breadcrumb-links mr-3">
          <ul>
            <li>&nbsp;</li>
            <li v-for="(crumb, i) in breadcrumbs" :key="i">
              <a v-if="crumb.url" @click="backFeat(crumb)"> {{ crumb.name }}</a>
              <span v-else>{{ crumb.name }}</span>
            </li>
          </ul>
        </div>
        <client-only>
          <div
            v-show="showSelect && mode !== 'columnView'"
            class="search-by ml-0"
            style="transform: translateY(1px)"
          >
            <Select2
              class="select2-hidden-accessible"
              :disabled="deleting"
              :value="hashParam"
              :options="categoriesObject"
              :attrs="{ minimumResultsForSearch: -1 }"
              @input="goToCategory"
            />
          </div>
        </client-only>
      </div>

      <div class="table-filter">
        <ul>
          <template v-if="hashParam !== 'search'">
            <template v-if="trashMode">
              <li>{{ assetsCount }} item(s)</li>

              <template v-if="!selectedCount">
                <li>
                  <button
                    type="button"
                    :disabled="
                      loader.restoring || loader.deleting || assetsCount == 0
                    "
                    :class="{
                      'btn-disable':
                        loader.restoring || loader.deleting || assetsCount == 0,
                    }"
                    class="btn btn-gray"
                    @click="$refs.restoreDialog.show()"
                  >
                    <template v-if="loader.restoring">
                      <SpinLoading />
                      Restoring...
                    </template>
                    <span v-else>Restore all</span>
                  </button>
                </li>
                <li>
                  <button
                    class="btn"
                    :class="{
                      'btn-disable':
                        loader.deleting || loader.restoring || assetsCount == 0,
                    }"
                    type="button"
                    :disabled="
                      loader.deleting || loader.restoring || assetsCount == 0
                    "
                    @click="$refs.deleteDialog.show()"
                  >
                    <template v-if="loader.deleting">
                      <SpinLoading />
                      Deleting...
                    </template>
                    <span v-else>Empty Trash</span>
                  </button>
                </li>
              </template>
            </template>
            <li v-else>
              <template v-if="subfolderCount > 0"
                >{{ subfolderCount }} Folder<template v-if="subfolderCount > 1"
                  >s</template
                ></template
              >
              <template v-if="fileCount > 0"
                >{{ fileCount }} Asset<template v-if="fileCount > 1"
                  >s</template
                ></template
              >
            </li>
            <li v-if="assetsCount > 0">
              <div class="search-by">
                <Select2
                  :value="sortingModel"
                  :disabled="deleting"
                  :options="sortingOptions"
                  :attrs="{ minimumResultsForSearch: -1 }"
                  @input="emitSortParamsArray"
                />
              </div>
            </li>
            <li v-if="assetsCount > 0">
              <div
                v-if="sortingModel !== 'Sort by'"
                style="cursor: pointer"
                @click="emitSortParamsArray()"
              >
                <svg
                  id="Layer_1"
                  :style="{
                    transform: `translateY(0px) rotate(${
                      !sortingDesc ? 180 : 0
                    }deg)`,
                  }"
                  class="big-down-arrow-icon"
                  style="max-height: 16px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 492 492"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <path
                        class="fill-color"
                        d="M442.7,268.5l-16.1-16.1c-5.1-5.1-11.8-7.9-19-7.9c-7.2,0-14.6,2.8-19.6,7.9L283.7,356V26.9C283.7,12.1,272.9,0,258,0h-22.8c-14.8,0-28.4,12.1-28.4,26.9v330.2l-104-104.7c-5.1-5.1-11.4-7.9-18.7-7.9c-7.2,0-13.8,2.8-18.8,7.9l-16,16.1c-10.5,10.5-10.4,27.6,0,38.1l177.6,177.6c5.1,5.1,11.8,7.9,19.1,7.9h0.1c7.2,0,14-2.8,19-7.9l177.5-177.6C453.2,296.1,453.2,279,442.7,268.5z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </li>
          </template>
          <li style="margin-left: 10px">
            <div class="gried-view">
              <span
                class="tile"
                :class="{ 'primary-filter': mode == 'tile' }"
                @click="$emit('update:mode', 'tile')"
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
                @click="$emit('update:mode', 'list')"
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
              <span
                v-if="
                  hashParam != 'search' &&
                  !inCategory &&
                  !trashMode &&
                  hashParam !== 'uncategorized'
                "
                class="panalview"
                :class="{ 'primary-filter': mode == 'columnView' }"
                @click="$emit('update:mode', 'columnView')"
              >
                <svg
                  id="Layer_1"
                  class="panalview-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <path
                    id="Path_3779"
                    class="fill-color"
                    d="M16.5,0h-15C0.7,0,0,0.6,0,1.5c0,0,0,0,0,0v15.1C0,17.4,0.7,18,1.5,18c0,0,0,0,0,0h15c0.8,0,1.5-0.6,1.5-1.5c0,0,0,0,0,0V1.5C18,0.6,17.3,0,16.5,0C16.5,0,16.5,0,16.5,0z M11,1.5v15H7v-15H11z M1.5,1.5h4v15h-4L1.5,1.5z M16.5,16.5h-4v-15h4V16.5z"
                  /></svg
              ></span>
            </div>
          </li>
        </ul>
      </div>

      <template v-if="trashMode">
        <DeleteDialog ref="restoreDialog" @button:yes="restoreFiles">
          Are you sure you want to restore all assets?
        </DeleteDialog>
        <DeleteDialog ref="deleteDialog" @button:yes="deleteFiles">
          Are you sure you want to permanently delete all assets?
        </DeleteDialog>
      </template>
    </client-only>
  </div>
</template>

<script>
import Select2 from '~/components/plugins/Select2'
import DeleteDialog from '~/components/plugins/DeleteDialog'
const categories = ['video', 'audio', 'image', 'application', 'archive']

export default {
  components: { Select2, DeleteDialog },
  props: {
    selectedAll: { type: Boolean, default: false },
    trashMode: { type: Boolean, default: false },
    assetsCount: { type: Number, default: 0 },
    selectedCount: { type: Number, default: 0 },
    deleting: { type: Boolean, default: false },
    mode: { type: String, default: 'row' },
    breadcrumb: { type: Object, default: null },
    sorting: { type: String, default: 'Sort by' },
    assetCount: { type: String, default: '12' },
    sortingDesc: { type: Boolean, default: false },
    fileCount: { type: Number, default: 0 },
    subfolderCount: { type: Number, default: 0 },
  },
  data() {
    return {
      showDropdown: true,
      intialCount: this.assetCount || '12',
      sortingModel: this.sorting || 'Sort by',
      loader: { restoring: false, deleting: false },
      assetCountOptions: [
        { text: '12', id: '12' },
        { text: '20', id: '20' },
        { text: '40', id: '40' },
        { text: '80', id: '80' },
        { text: '100', id: '100' },
      ],
      categoriesObject: [
        { text: 'Folders', id: '' },
        { text: 'Audios', id: 'audio' },
        { text: 'Documents', id: 'application' },
        { text: 'Images', id: 'image' },
        { text: 'Videos', id: 'video' },
        { text: 'Archived', id: 'archive' },
      ],
    }
  },
  computed: {
    isInteger() {
      return Number.isInteger(parseInt(this.hashParam))
    },
    sortingOptions() {
      return this.trashMode
        ? [
            { text: 'Name', id: 'display_file_name' },
            { text: 'Trash date', id: 'updated_at' },
            { text: 'Size', id: 'file_size' },
            { text: 'Type', id: 'file_type' },
          ]
        : [
            { text: 'Name', id: 'display_file_name' },
            { text: 'Date', id: 'updated_at' },
            ...(this.hashParam ? [{ text: 'Size', id: 'file_size' }] : []),
            { text: 'Type', id: 'file_type' },
          ]
    },
    showSelect() {
      return (
        this.showDropdown &&
        !this.trashMode &&
        !this.isFolder &&
        this.hashParam !== 'search' &&
        this.hashParam !== 'uncategorized'
      )
    },
    title() {
      if (this.trashMode) return 'Trash'

      if (!this.hashParam) return 'Folders'

      switch (this.hashParam) {
        case 'search':
          return 'Showing result of'
        case 'uncategorized':
          return 'Uncategorized Assets'
      }

      if (this.isFolder)
        return this.folder?.folder_name || this.folder?.category_name || ''

      return (
        'All ' +
        this.categoriesObject
          .find(({ id }) => this.hashParam === id)
          .text?.toLowerCase()
      )
    },
    breadcrumbs() {
      if (!this.hashParam || this.hashParam === 'search') return null

      const breadcrumbs = []

      const workspaceId = this.$getWorkspaceId()
      switch (this.hashParam) {
        case 'uncategorized':
          breadcrumbs.push({
            name: 'Uncategorized Assets',
          })
          break
        default:
          if (this.inCategory)
            breadcrumbs.push({
              name: 'All ' + this.category.text?.toLowerCase(),
            })
          else {
            const recursivePush = (item, array) => {
              if (!item) return

              array.push({
                name: item.folder_name,
                folderId: item.id,
                url:
                  item.id.toString() !== this.hashParam.toString()
                    ? {
                        name: 'workspace_id-dam',
                        params: { workspace_id: workspaceId },
                        hash: `#${item.id}`,
                      }
                    : null,
              })

              recursivePush(item.parent, array)
            }

            recursivePush(this.breadcrumb, breadcrumbs)
          }
      }

      return breadcrumbs.reverse()
    },
    inCategory() {
      return categories.includes(this.hashParam)
    },
    hashParam() {
      if (this.$route.hash === '#search') {
        this.$emit('update:mode', 'tile')
      }
      return this.$route.hash?.replace('#', '')
    },
    category() {
      return this.categoriesObject.find(({ id }) => this.hashParam === id)
    },
    isFolder() {
      return (
        !!this.hashParam && !this.inCategory && !isNaN(Number(this.hashParam))
      )
    },
  },
  watch: {
    $route() {
      this.showDropdown = false
      this.$nextTick(() => (this.showDropdown = true))
    },
    sortingModel(sortingModel) {
      this.$emit('update:sorting', sortingModel)
    },
    sorting(sorting) {
      this.sortingModel = sorting || 'Sort by'
    },
    intialCount(intialCount) {
      this.$emit('update:assetCount', intialCount)
    },
    assetCount(assetCount) {
      this.intialCount = assetCount || '12'
    },
  },
  methods: {
    backFeat(crumb) {
      this.$emit('breadCrumb', crumb.folderId)
      this.$router.push({
        name: 'workspace_id-dam',
        params: {
          workspace_id: this.$getWorkspaceId(),
        },
        query: {
          view:
            this.mode === 'columnView'
              ? 'column'
              : this.mode === 'tile'
              ? 'tile'
              : 'list',
        },
        hash: `#${crumb.folderId}`,
      })
    },
    emitSortAssetCount(data) {
      this.$emit('emitAssetCount', data)
    },
    openSearch() {
      this.$router.replace({
        params: this.$route.params,
        query: { ...this.$route.query, moreOptions: true },
        hash: this.$route.hash,
      })
    },
    restoreFiles() {
      return this.deleteFiles(true)
    },
    async deleteFiles(restore = false) {
      if (this.deleting) return

      this.$emit('update:deleting', true)
      if (restore) this.loader.restoring = true
      else this.loader.deleting = true

      await this.$axios
        .get(
          `digital-assets/category/${
            restore
              ? 'all-restore-deleted-category-with-files'
              : 'all-permanent-delete-category-with-files'
          }?` + this.$toQueryString({ workspace_id: this.$getWorkspaceId() })
        )
        .then(({ data: { message } }) => {
          this.$toast.global.success(message)
          this.$emit('removeAll')
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      if (restore) this.loader.restoring = false
      else this.loader.deleting = false

      this.$emit('update:deleting', false)
    },
    goToCategory(value) {
      this.$router.replace({
        name: 'workspace_id-dam',
        params: { workspace_id: this.$getWorkspaceId() },
        hash: value?.length ? `#${value}` : '',
        query: this.$route.query,
      })
    },
    emitSortParamsArray(value = this.sortingModel) {
      let toEmit = null

      switch (value) {
        case 'display_file_name':
          toEmit = [
            ['subFolders', 'folder_name', this.$sortToUpperCase],
            ['files', 'display_file_name', this.$sortToUpperCase],
          ]
          break
        case 'file_type':
          toEmit = [
            ['subFolders', 'total_contain', this.$sortToTypedNumber],
            ['files', 'file_type', this.$sortToUpperCase],
          ]
          break
        case 'updated_at':
          toEmit = [
            ['subFolders', 'updated_at', this.$sortToTime],
            ['files', 'updated_at', this.$sortToTime],
          ]
          break
        case 'file_size':
          toEmit = [
            ['subFolders', 'total_contain', this.$sortToTypedNumber],
            ['files', 'file_size', this.$sortToTypedNumber],
          ]
          break
        default:
          break
      }
      this.sortingModel = value

      this.$nextTick(() => {
        if (toEmit) {
          if (!this.inCategory) {
            this.$emit('sortPanel', toEmit)
          }
          this.$emit('sort', toEmit)
        }
      })
    },
  },
}
</script>

<style scoped>
.toolbar .popular-tags .select-field label {
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.082) !important;
  padding-right: 8px;
}

.custom-checkbox label.hide-select {
  padding-left: 0 !important;
  cursor: default;
}
.section-filter .select2-search.select2-search--dropdown {
  display: none;
}
.custom-checkbox label.hide-select:before {
  opacity: 0 !important;
}
.sec-title-left .custom-checkbox label .h2 {
  line-height: 1.25;
}

.gried-view span {
  filter: grayscale(1);
}
</style>

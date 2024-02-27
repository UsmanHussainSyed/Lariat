<template>
  <div class="common-box-header">
    <client-only>
      <div class="filter-left">
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

      <div class="table-filter">
        <ul>
          <li>{{ assetsCount ? `${assetsCount} item(s)` : '' }}</li>

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
          <li v-if="assetsCount > 0">
            <div class="search-by">
              <Select2
                :value="sortingModel"
                :disabled="deleting"
                :options="sortingOptions"
                :attrs="{ minimumResultsForSearch: -1 }"
                @input="onSort"
              />
            </div>
          </li>
          <li v-if="assetsCount > 0">
            <div
              v-if="sortingModel !== 'Sort by'"
              style="cursor: pointer"
              @click="onSort()"
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
            </div>
          </li>
        </ul>
      </div>

      <DeleteDialog ref="restoreDialog" @button:yes="restoreFiles">
        Are you sure you want to restore all assets?
      </DeleteDialog>
      <DeleteDialog ref="deleteDialog" @button:yes="deleteFiles">
        Are you sure you want to permanently delete all assets?
      </DeleteDialog>
    </client-only>
  </div>
</template>

<script>
import Select2 from '~/components/plugins/Select2'
import DeleteDialog from '~/components/plugins/DeleteDialog'

export default {
  components: { Select2, DeleteDialog },
  props: {
    assetsCount: { type: Number, default: 0 },
    selectedCount: { type: Number, default: 0 },
    deleting: { type: Boolean, default: false },
    mode: { type: String, default: 'row' },
    sorting: { type: String, default: 'Sort by' },
    sortingDesc: { type: Boolean, default: false },
  },
  data() {
    return {
      sortingModel: this.sorting || 'Sort by',
      loader: { restoring: false, deleting: false },
    }
  },
  computed: {
    sortingOptions() {
      return [
        { text: 'Name', id: 'display_file_name' },
        { text: 'Trash date', id: 'updated_at' },
        { text: 'Size', id: 'file_size' },
        { text: 'Type', id: 'file_type' },
      ]
    },
  },
  watch: {
    sortingModel(sortingModel) {
      this.$emit('update:sorting', sortingModel)
    },
    sorting(sorting) {
      this.sortingModel = sorting || 'Sort by'
    },
  },
  methods: {
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
          this.$emit(restore ? 'all-restored' : 'all-removed')
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      if (restore) this.loader.restoring = false
      else this.loader.deleting = false

      this.$emit('update:deleting', false)
    },
    onSort(value) {
      if (!value) {
        return this.$emit('sort', {
          descending: !this.sortingDesc,
        })
      }
      this.$emit('sort', {
        sortBy: value,
        descending: false,
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

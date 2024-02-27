<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-smtp',
              params: { workspace_id: workspace_id },
            }"
            >SMTP Settings</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-imap',
              params: { workspace_id: workspace_id },
            }"
            >IMAP Settings</nuxt-link
          >
        </li>
        <li class="active">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-email-template-list',
              params: { workspace_id: workspace_id },
            }"
            >Email Templates</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-email-template-signature',
              params: { workspace_id: workspace_id },
            }"
            >Email Signature</nuxt-link
          >
        </li>
      </ul>
      <div class="right-side">
        <div class="table-filter sep-list">
          <ul>
            <li>
              <nuxt-link
                :to="{
                  name: 'workspace_id-workspace-settings-lm-email-settings-email-template-add',
                  params: { workspace_id: workspace_id },
                }"
                class="btn btn-icon ml0"
              >
                <PlusIcon />
                Add New Email Template
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view no-bottom-table-view table-list-scrolling">
          <ul class="thead">
            <li>
              <div
                :class="[
                  'sorting',
                  'flex30',
                  searchResult.length ? 'sortarrow' : '',
                  sortingClass('title'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('title')
                  "
                  >Title</span
                >
              </div>
              <div
                :class="[
                  'sorting',
                  'flex32',
                  searchResult.length ? 'sortarrow' : '',
                  sortingClass('subject'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('subject')
                  "
                  >Subject</span
                >
              </div>
              <div
                :class="[
                  'sorting',
                  'flex15',
                  searchResult.length ? 'sortarrow' : '',
                  sortingClass('updated_at'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('updated_at')
                  "
                  >Modified Date</span
                >
              </div>
              <div
                :class="[
                  'sorting',
                  'flex15',
                  searchResult.length ? 'sortarrow' : '',
                  sortingClass('created_at'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('updated_at')
                  "
                  >Created Date</span
                >
              </div>
              <div class="sorting flex8">
                <span>Action</span>
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li v-for="template in searchResult" :key="template.id">
                <div class="tb-column flex30">
                  <div class="top-column">
                    <nuxt-link
                      :to="{
                        name: 'workspace_id-workspace-settings-lm-email-settings-email-template-id-edit',
                        params: { workspace_id: workspace_id, id: template.id },
                      }"
                      class="table-a"
                      >{{ template.title }}</nuxt-link
                    >
                  </div>
                </div>
                <div class="tb-column flex32">
                  <div class="top-column">
                    <span>{{ template.subject }}</span>
                  </div>
                </div>
                <div class="tb-column flex15">
                  <div class="top-column">
                    <span>{{ template.modified_date }}</span>
                  </div>
                </div>
                <div class="tb-column flex15">
                  <div class="top-column">
                    <span>{{ template.created_date }}</span>
                  </div>
                </div>
                <div class="tb-column flex8">
                  <ul class="action">
                    <li>
                      <nuxt-link
                        :to="{
                          name: 'workspace_id-workspace-settings-lm-email-settings-email-template-id-edit',
                          params: {
                            workspace_id: workspace_id,
                            id: template.id,
                          },
                        }"
                      >
                        <svg
                          id="Layer_1"
                          class="edit-icon h-orange"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Edit Email"
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
                    <li>
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#delete-email"
                        @click="deleteTemplate(template)"
                      >
                        <svg
                          id="Layer_1"
                          class="delete-icon h-orange"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Delete Email"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 15.3 18"
                          xml:space="preserve"
                          aria-describedby="tooltip634440"
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
              <div
                v-if="completelyLoaded && !searchResult.length"
                class="no-data-found"
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
                    <g id="Group_4457" transform="translate(-190.348 -177.624)">
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

                  <p>No data found</p>
                </div>
              </div>
              <client-only>
                <infinite-loading
                  :identifier="infiniteId"
                  @infinite="infiniteHandler"
                >
                  <div slot="spinner">
                    <ContentLoader
                      v-if="page == 1"
                      :speed="1"
                      :animate="true"
                      :width="400"
                      :height="100"
                    >
                      <rect
                        x="0"
                        y="-1"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="15"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="31"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="47"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                    </ContentLoader>
                    <div v-else class="no-data-found pb2 pt2">
                      <div class="inner w-100">
                        <p>Loading...</p>
                      </div>
                    </div>
                  </div>
                  <div slot="no-more" style="margin-top: 20px">
                    <div
                      v-if="searchResult.length"
                      class="no-data-found pb2 pt2"
                    >
                      <div class="inner w-100">
                        <p>
                          This is the end of the list, but just the beginning of
                          what’s to come!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div slot="no-results">
                    <div class="no-data-found">
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

                        <p v-if="!show_add_template_btn">No Data Found</p>
                        <p v-if="show_add_template_btn">
                          You haven't added any Email template yet!
                        </p>
                        <nuxt-link
                          v-if="show_add_template_btn"
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-workspace-settings-lm-email-settings-email-template-add',
                            params: { workspace_id: workspace_id },
                          }"
                        >
                          <PlusIcon />
                          Add New
                        </nuxt-link>
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
    <div id="delete-email" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Email Template</h5>
            <button
              v-if="!deleteLoading"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelDelete"
            >
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
          <div class="modal-body text-center">
            <p>
              Are you sure you want to delete the
              <strong>{{
                'title' in deleteTemplateData && `'${deleteTemplateData.title}'`
              }}</strong>
              Email Template with all attachments?
            </p>
            <div class="btn-group">
              <button
                :disabled="deleteLoading"
                class="btn btn-gray"
                data-dismiss="modal"
                @click="cancelDelete"
              >
                No
              </button>
              <button
                class="btn"
                :disabled="deleteLoading"
                @click="confirmDelete"
              >
                <i
                  v-if="deleteLoading"
                  class="fa fa-circle-o-notch fa-spin"
                ></i>
                {{ deleteLoading ? 'deleting..' : 'Yes' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import scrolling from '~/mixins/scrolling'

export default {
  components: { ContentLoader },
  mixins: [scrolling],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'block-access-dealerAdmin',
    'can-access-general-settings',
  ],
  data() {
    return {
      workspace_id: this.$route.params.workspace_id,
      search_term: '',
      sort_value: 'title',
      sort_by: 'ASC',
      isSortComplete: false,
      page: 1,
      lastPage: null,
      infiniteId: +new Date(),
      templates: [],
      show_add_template_btn: true,
      completelyLoaded: false,
      deleteLoading: false,
      deleteTemplateData: {},
    }
  },
  computed: {
    searchResult() {
      return this.templates
    },
  },
  methods: {
    infiniteHandler($state) {
      if (this.completelyLoaded) {
        $state.complete()
      }
      this.$axios
        .$post(`lm/email-template/get-all-templates?page=${this.page}`, {
          sortvalue: this.sort_value,
          orderby: this.sort_by,
          workspace_id: this.workspace_id,
        })
        .then(({ data }) => {
          this.lastPage = data.last_page
          this.show_add_announcement_btn = data.show_add_announcement_btn
          if (data.data && data.data.length) {
            // fix for duplicate entries
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.templates.push(...data.data)
              setTimeout(() => {
                this.tableListScrolling()
              }, 50)
              $state.loaded()
              // fix for no item message
              if (parseInt(this.lastPage) === parseInt(this.page)) {
                this.completelyLoaded = true
                $state.complete()
              } else {
                this.page += 1
              }
            } else {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        })
        .catch((e) => {
          $state.error()
          this.$toast.error(this.$getErrorMessage(e))
        })
        .finally(() => this.$nextTick(() => (this.isSortComplete = false)))
    },
    sortByColumn(column) {
      this.sort_value = column
      this.sort_by = this.sort_by === 'ASC' ? 'DESC' : 'ASC'
      this.resetFilter()
    },
    sortingClass(sortValue) {
      return {
        active: this.sort_value === sortValue && this.sort_by === 'DESC',
      }
    },
    resetFilter() {
      this.page = 1
      this.templates = []
      this.infiniteId += 1
      this.completelyLoaded = false
      this.isSortComplete = false
    },
    deleteTemplate(template) {
      this.deleteTemplateData = template
    },
    cancelDelete() {
      this.deleteTemplateData = {}
    },
    async confirmDelete() {
      try {
        this.deleteLoading = true
        await this.$axios.$post(`lm/email-template/delete`, {
          templateId: this.deleteTemplateData.id,
        })

        this.templates = this.templates.filter(
          ({ id }) => parseInt(id) !== parseInt(this.deleteTemplateData.id)
        )

        this.$toast.success('Email template successfully deleted')
        window.$('#delete-email').modal('hide')
        setTimeout(() => (this.deleteLoading = false), 1000)
        this.deleteTemplateData = {}
      } catch (e) {
        this.deleteLoading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
}
</script>

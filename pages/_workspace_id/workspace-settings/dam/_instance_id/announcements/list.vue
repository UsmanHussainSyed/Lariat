<template>
  <div
    :class="{
      'general-settings-right h-100': true,
      'search-filter': (search_term || '').trim().length,
    }"
  >
    <div class="general-settings-title">
      <h4>Announcements</h4>
      <div class="right-side">
        <Select2
          v-model="selectedAnnouncementType"
          :options="announcementListType"
          custom-event
          @changeSelect2="changeAnnouncementTypeFilter(...arguments)"
        />
        <div class="search-pr">
          <form
            class="navbar-form search-navbar-form"
            role="search"
            @submit.prevent
          >
            <div class="input-group">
              <button class="btn-search hidden-xs" type="submit">
                <svg
                  id="Layer_1"
                  class="search-icon"
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
                  ></path>
                </svg>
              </button>
              <input
                id="srch-term"
                v-model="search_term"
                :disabled="isSortComplete"
                class="form-control"
                placeholder="Search..."
                name="srch-term"
                type="text"
              />
            </div>
          </form>
        </div>
        <nuxt-link
          :to="{
            name: 'workspace_id-workspace-settings-dam-instance_id-announcements-add',
            params: $route.params,
          }"
          class="btn btn-icon"
        >
          <PlusIcon />
          Add Announcement
        </nuxt-link>
      </div>
    </div>
    <div v-if="(search_term || '').trim().length" class="search-result mb1 p20">
      <div class="alert alert-info alert-dismissible">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          @click="clearSearch"
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
        Showing results for <strong>"{{ search_term.trim() }}"</strong>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view userGroupList table-list-scrolling">
          <ul v-if="searchResult.length" class="thead">
            <li>
              <div
                :class="[
                  'flex40 sorting',
                  searchResult.length ? 'sortarrow' : '',
                  sortingClass('title'),
                ]"
                @click="
                  searchResult.length &&
                    !isSortComplete &&
                    sortByColumn('title')
                "
              >
                <span>Announcement Name</span>
              </div>
              <div class="sorting flex20">
                <span>Announcement By</span>
              </div>
              <div class="sorting flex25">
                <span>Publish for</span>
              </div>
              <div class="sorting flex25">
                <span>Status</span>
              </div>
              <div class="sorting flex10">
                <span>Actions</span>
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li
                v-for="(announcement, index) in searchResult"
                :key="announcement.id"
              >
                <div class="tb-column flex40">
                  <div class="media">
                    <div class="media-left">
                      <div class="announcement-num">{{ index + 1 }}</div>
                    </div>
                    <div class="media-body">
                      <nuxt-link
                        v-if="announcement.show_edit_btn"
                        class="table-a"
                        :to="{
                          name: 'workspace_id-workspace-settings-dam-instance_id-announcements-announcement_id-edit',
                          params: {
                            workspace_id: announcement.workspaces.workspace_id,
                            announcement_id: announcement.id,
                            instance_id: $route.params.instance_id,
                          },
                        }"
                        ><span v-tooltip="{ content: 'Click to edit' }">{{
                          announcement.title
                        }}</span>
                      </nuxt-link>
                      <nuxt-link
                        v-else
                        class="table-a"
                        :to="{
                          name: 'workspace_id-workspace-settings-dam-instance_id-announcements-announcement_id-preview',
                          params: {
                            workspace_id: announcement.workspaces.workspace_id,
                            announcement_id: announcement.id,
                            instance_id: $route.params.instance_id,
                          },
                        }"
                        ><span v-tooltip="{ content: 'Click to preview' }">{{
                          announcement.title
                        }}</span></nuxt-link
                      >
                    </div>
                  </div>
                </div>
                <div class="tb-column flex20">
                  <label>{{ announcement.publisher.name }}</label>
                </div>
                <div class="tb-column flex25">
                  <label v-if="!announcement.users_details.length">{{
                    announcement.user_type_display == 'Front End User'
                      ? 'Frontend User'
                      : announcement.user_type_display
                  }}</label>
                  <ul
                    v-if="announcement.users_details.length"
                    class="groupTeam"
                  >
                    <li
                      v-for="user in announcement.users_details.slice(
                        0,
                        userListExcerpt
                      )"
                      :key="user.id"
                    >
                      <span v-tooltip="{ content: user.name }">
                        <div
                          v-if="user.profile_image"
                          class="profile-bg"
                          :style="{
                            backgroundImage: `url(${user.display_profile_image})`,
                          }"
                        ></div>

                        <div
                          v-else
                          :class="[
                            'profile-char fl-as-imgtxt',
                            user.name[0].toLowerCase(),
                          ]"
                        >
                          {{ user.name[0] }}
                        </div>
                      </span>
                    </li>

                    <!-- for more then 10 users .-->
                    <li
                      v-if="announcement.users_details.length > userListExcerpt"
                    >
                      <div class="dropdown">
                        <a
                          href="javascript:void(0);"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          +{{
                            announcement.users_details.slice(userListExcerpt)
                              .length
                          }}
                        </a>
                        <ul class="dropdown-menu">
                          <li
                            v-for="user in announcement.users_details.slice(
                              userListExcerpt
                            )"
                            :key="user.id"
                          >
                            <a href="javascript:void(0);" class="dropdown-item">
                              <div class="media">
                                <div class="media-left">
                                  <div
                                    v-if="user.profile_image"
                                    class="profile-bg"
                                    :title="user.name"
                                    :style="{
                                      backgroundImage: `url(${user.display_profile_image})`,
                                    }"
                                  ></div>
                                  <div
                                    v-else
                                    :class="[
                                      'profile-char fl-as-imgtxt',
                                      user.name[0].toLowerCase(),
                                    ]"
                                    :title="user.name"
                                  >
                                    {{ user.name[0] }}
                                  </div>
                                </div>
                                <div class="media-body">
                                  <span>{{ user.name }}</span>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="tb-column flex25">
                  <div class="media">
                    <div class="media-left">
                      <template v-if="announcement.is_draft">
                        <DraftIcon />
                      </template>
                      <template v-else>
                        <ClockIcon v-if="announcement.is_scheduled" />
                        <PlaneIcon v-if="!announcement.is_scheduled" />
                      </template>
                    </div>
                    <div class="media-body">
                      <template v-if="announcement.is_draft">
                        <span>Draft</span>
                      </template>
                      <template v-else>
                        <span v-if="announcement.is_scheduled"
                          >Scheduled -
                          {{
                            $moment(announcement.publish_date)
                              .local()
                              .format('MMM DD, YYYY')
                          }}</span
                        >
                        <span v-if="!announcement.is_scheduled">Published</span>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="tb-column flex10">
                  <ul class="action">
                    <li>
                      <nuxt-link
                        v-if="announcement.show_edit_btn"
                        :to="{
                          name: 'workspace_id-workspace-settings-dam-instance_id-announcements-announcement_id-edit',
                          params: {
                            workspace_id: announcement.workspaces.workspace_id,
                            announcement_id: announcement.id,
                            instance_id: $route.params.instance_id,
                          },
                        }"
                      >
                        <EditIcon
                          v-tooltip="{ content: 'Edit Announcement' }"
                        />
                      </nuxt-link>
                      <nuxt-link
                        v-else
                        :to="{
                          name: 'workspace_id-workspace-settings-dam-instance_id-announcements-announcement_id-preview',
                          params: {
                            workspace_id: announcement.workspaces.workspace_id,
                            announcement_id: announcement.id,
                            instance_id: $route.params.instance_id,
                          },
                        }"
                      >
                        <OpenEyeIcon
                          v-tooltip="{ content: 'View Announcement' }"
                        />
                      </nuxt-link>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#delete-announcement"
                        @click="
                          showDeleteAnnouncementDialog({
                            id: announcement.id,
                            workspace_id: announcement.workspaces.workspace_id,
                          })
                        "
                      >
                        <DeleteIcon
                          v-tooltip="{ content: 'Delete Announcement' }"
                        />
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

                  <p>No announcements found</p>
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

                        <p v-if="!show_add_announcement_btn">No Data Found</p>
                        <p v-if="show_add_announcement_btn">
                          You haven't added any Announcement yet!
                        </p>
                        <nuxt-link
                          v-if="show_add_announcement_btn"
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-workspace-settings-dam-instance_id-announcements-add',
                            params: $route.params,
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

    <!--  Delete Announcements Modal  -->
    <div id="delete-announcement" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Announcement</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelDelete"
            >
              <span aria-hidden="true">
                <CloseIcon />
              </span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>Are you sure you want to delete the announcement?</p>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-gray"
                data-dismiss="modal"
                :disabled="deleteLoading"
                @click="cancelDelete"
              >
                No
              </button>
              <button
                type="button"
                class="btn"
                :disabled="deleteLoading"
                @click="deleteAnnouncement"
              >
                <i
                  v-if="deleteLoading"
                  class="fa fa-circle-o-notch fa-spin"
                ></i>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'
export default {
  components: { Select2, ContentLoader },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      search_term: '',
      sort_value: '',
      sort_by: 'ASC',
      isSortComplete: false,
      show_results_text: false,
      page: 1,
      lastPage: null,
      infiniteId: +new Date(),
      announcements: [],
      completelyLoaded: false,
      show_add_announcement_btn: true,
      userListExcerpt: 6,
      selectedAnnouncementType: 'all',
      announcementListType: [
        { id: 'all', text: 'All' },
        { id: 'publish', text: 'Published' },
        { id: 'is_scheduled', text: 'Scheduled' },
        { id: 'is_draft', text: 'Draft' },
      ],
      deleteLoading: false,
      deleteAnnouncementData: {},
    }
  },
  computed: {
    searchResult() {
      return this.announcements
    },
  },
  watch: {
    search_term() {
      if (this.searchTimer) clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.resetFilter()
      }, 600)
    },
  },
  methods: {
    infiniteHandler($state) {
      if (this.completelyLoaded) {
        $state.complete()
        return
      }
      this.$axios
        .$post(
          `announcement/list?page=${this.page}&sort_value=${this.sort_value}&sort_by=${this.sort_by}&search_value=${this.search_term}&publish_type=${this.selectedAnnouncementType}`,
          {
            workspace_id: this.internal_workspace_id,
            module_id: 2,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          this.show_add_announcement_btn = data.show_add_announcement_btn
          if (data.data && data.data.length) {
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.announcements.push(...data.data)
              // setTimeout(() => {
              //   this.tableListScrolling()
              // }, 50)
              $state.loaded()
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
    clearSearch() {
      this.search_term = ''
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
      this.announcements = []
      this.infiniteId += 1
      this.completelyLoaded = false
      this.isSortComplete = false
    },
    changeAnnouncementTypeFilter(data) {
      this.sort_value = ''
      this.sort_by = 'ASC'
      this.selectedAnnouncementType = data.id
      this.resetFilter()
    },
    showDeleteAnnouncementDialog(data) {
      this.deleteAnnouncementData = data
    },
    async deleteAnnouncement() {
      if (!isEmpty(this.deleteAnnouncementData)) {
        this.deleteLoading = true
        try {
          const { id, workspace_id } = this.deleteAnnouncementData
          await this.$axios.$get(
            `announcement/delete?workspace_id=${workspace_id}&announcement_id=${id}&module_id= 2`
          )

          this.announcements = this.announcements.filter(
            ({ id }) =>
              parseInt(id) !== parseInt(this.deleteAnnouncementData.id)
          )

          this.$toast.global.success('Announcement successfully deleted')
          window.$('#delete-announcement').modal('hide')
          setTimeout(() => (this.deleteLoading = false), 1000)
          this.deleteAnnouncementData = {}
        } catch (e) {
          this.deleteLoading = false
          this.$toast.error(this.$getErrorMessage(e))
        }
      } else {
        window.$('#delete-announcement').modal('hide')
        this.deleteAnnouncementData = {}
        this.$toast.error('Woops! something went wrong.')
      }
    },
    cancelDelete() {
      this.deleteAnnouncementData = {}
    },
  },
}
</script>

<style scoped></style>

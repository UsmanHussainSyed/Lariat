<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4 class="pl0">Group Networks - {{ groups.length }}</h4>
      <div v-if="$_auth().user.lead.isSuperAdmin" class="right-side">
        <nuxt-link
          :to="{
            name: 'workspace_id-workspace-settings-lm-dealer-group-network-create',
            params: {
              workspace_id: $_auth().id,
            },
          }"
          class="btn btn-icon"
        >
          <svg
            id="Layer_1"
            class="plus-icon"
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

          Add New Group Network
        </nuxt-link>
      </div>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="common-box bg-gray">
        <div
          class="table-list-view multi-table-view show-detail detail-view-on group-network-table"
        >
          <ul class="thead">
            <li>
              <div
                class="last-score sorting sortarrow flex40"
                :class="{
                  'active descending':
                    sortBy === 'group_name' && sortOrder === 'DESC',
                }"
              >
                <span @click="toggleSortData('group_name')">Group Name</span>
              </div>
              <div class="name-email sorting flex35">
                <span>Admin Name / Email</span>
              </div>
              <div class="sorting flex15">
                <span>Number of Dealers</span>
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
              <li v-for="(group, index) in groups" :key="group.id">
                <div class="group-name tb-column flex40">
                  <div class="top-column">
                    <label>{{ group.group_name }}</label>
                  </div>
                </div>
                <div class="assigned-products tb-column flex35">
                  <div class="media">
                    <div class="products">
                      <div class="dropdown">
                        <a
                          href="javascript:void(0);"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          ><span class="bg-gray">{{
                            group.user_data.length
                          }}</span></a
                        >
                        <div class="dropdown-menu">
                          <div
                            v-for="user in group.user_data"
                            :key="user.user_id"
                            class="media"
                          >
                            <div class="media-left">
                              <div
                                :class="
                                  user.display_profile_image
                                    ? 'profile-bg'
                                    : 'profile-icon'
                                "
                                title="Scott Demick"
                                :style="{
                                  'background-image': `url('${
                                    user.display_profile_image
                                      ? user.display_profile_image
                                      : require('@/assets/img/icon/building.svg')
                                  }')`,
                                }"
                              ></div>
                            </div>
                            <div class="media-right">
                              <div class="top-column">
                                <a href="#" class="table-a">{{
                                  user.user_name
                                }}</a>
                              </div>
                              <div class="bottom-column">
                                <span
                                  ><a
                                    :href="'mailto:' + user.user_email"
                                    target="_blank"
                                    >{{ user.user_email }}</a
                                  ></span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="media-left">
                      <div
                        class="profile-bg"
                        title="Scott Demick"
                        :style="{
                          'background-image': `url('${
                            group.user_data[0].display_profile_image
                              ? group.user_data[0].display_profile_image
                              : require('@/assets/img/icon/building.svg')
                          }')`,
                        }"
                      ></div>
                    </div>
                    <div class="media-right">
                      <div class="top-column">
                        <a href="javascript:;" class="table-a">
                          {{ group.user_data[0].user_name }}
                        </a>
                      </div>
                      <div class="bottom-column">
                        <span
                          ><a
                            :href="'mailto:' + group.user_data[0].user_email"
                            target="_blank"
                            >{{ group.user_data[0].user_email }}</a
                          ></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="number-of tb-column flex15">
                  <div class="top-column img-text">
                    <svg
                      id="Layer_1"
                      class="dealer-icon orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 20 16"
                      xml:space="preserve"
                    >
                      <path
                        id="Icon_awesome-store-alt"
                        class="fill-color"
                        d="M10,12H4V7H2v8c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1V7h-2V12z M19.8,4.4l-2.7-4C17,0.2,16.7,0,16.3,0H3.7C3.3,0,3,0.2,2.8,0.4l-2.7,4C-0.1,4.9,0,5.5,0.4,5.8C0.6,5.9,0.8,6,1,6h18c0.6,0,1-0.4,1-1C20,4.8,19.9,4.6,19.8,4.4L19.8,4.4z M16,15.5c0,0.3,0.2,0.5,0.5,0.5h1c0.3,0,0.5-0.2,0.5-0.5V7h-2V15.5z"
                      ></path>
                    </svg>
                    <span>{{ group.total_dealer }}</span>
                  </div>
                </div>
                <div class="tb-column flex10 text-center">
                  <ul v-if="$_auth().user.lead.isSuperAdmin" class="action">
                    <li>
                      <nuxt-link
                        v-tooltip="'Edit Group Network'"
                        :to="{
                          name: 'workspace_id-workspace-settings-lm-dealer-group-network-id-edit',
                          params: {
                            workspace_id: $_auth().id,
                            id: group.id,
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
                        @click="
                          setDeletingGroup(group.group_name, group.id, index)
                        "
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
              <div v-if="!groups.length && !isLoading" class="no-data-found">
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

                  <p>No Data Found</p>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="isDeleting"
      @click:confirm-button="deleteGroup"
    >
      <template slot="header">Delete selected Dealer Group Network</template>

      Are you sure you want to Delete
      <b>{{ selectedGroup.groupName }} ?</b>
    </ConfirmationDialog>
  </div>
</template>

<script>
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
export default {
  components: {
    ConfirmationDialog,
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      groups: [],
      sortBy: 'id',
      sortOrder: 'ASC',
      isLoading: false,
      isDeleting: false,
      selectedGroup: {
        selectedGroupId: null,
        groupName: '',
        index: null,
      },
    }
  },
  created() {
    this.loadGroups()
  },
  methods: {
    setDeletingGroup(name, id, index) {
      this.isDeleting = true
      this.selectedGroup.groupName = name
      this.selectedGroup.selectedGroupId = id
      this.selectedGroup.index = index
    },
    async deleteGroup() {
      // Delete Group Network
      try {
        const { message } = await this.$axios.$post('lm/group-network/delete', {
          group_id: this.selectedGroup.selectedGroupId,
        })
        this.groups.splice(this.selectedGroup.index, 1)
        this.$toast.success(message)
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    toggleSortData(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.sortBy = column
        this.sortOrder = 'DESC'
      }
      this.loadGroups()
    },
    loadGroups() {
      this.isLoading = true
      this.$axios
        .$post(
          'lm/group-network/list',
          {
            sortvalue: this.sortBy,
            orderby: this.sortOrder,
          },
          {
            workspace_id: this.$route.params.workspace_id,
          }
        )
        .then(({ data }) => {
          this.groups = data.data
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
  },
}
</script>

<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <!-- <template v-if="!usersEnabled">
      <img
        :src="require('~/assets/img/blurred-images/dam-users.png')"
        style="width: 100%"
      />
      <div class="common-overaly has-relative">
        <div class="common-modal">
          <div class="common-modal-header">
            <h5>Upgrade Plan</h5>
          </div>
          <div class="common-modal-body text-center">
             <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
            <div class="btn-group mt20">
              <a
                href="javascript:void(0)"
                @click.stop="
                  $router.push({
                    name: 'workspace_id-workspace-settings-account-billing',
                    params: {
                      showUpgradeModal: true,
                      workspace_id: $getWorkspaceId(),
                    },
                  })
                "
                onclick="window.open(this.href, 'chart', 'width=1225, height=770'); return false;"
                class="btn"
                >Upgrade</a
              >
            </div>
          </div>
        </div>
      </div>
    </template> -->
    <!-- <template v-else> -->
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        <button v-if="0" type="button" class="close" data-dismiss="alert">
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
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="general-settings-title">
      <h4>DAM Users</h4>
      <div class="right-side">
        <client-only>
          <Select2
            v-model="filterSelectModel"
            :attrs="{ minimumResultsForSearch: -1 }"
            :options="filterOptions"
          />
        </client-only>
        <div class="search-pr">
          <form
            class="navbar-form search-navbar-form"
            role="search"
            @submit.prevent="refresh"
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
                v-model.trim="searchTerm"
                class="form-control"
                placeholder="Search..."
                type="text"
              />
            </div>
          </form>
        </div>
        <nuxt-link
          v-tooltip="
            !canAddMoreUsers
              ? 'Please upgrade your subscription plan to add more users'
              : ''
          "
          :disabled="!canAddMoreUsers"
          :style="canAddMoreUsers ? '' : 'opacity: 0.4;cursor: not-allowed'"
          :to="
            canAddMoreUsers
              ? {
                  name: 'workspace_id-workspace-settings-dam-instance_id-users-add',
                  params: $route.params,
                }
              : {}
          "
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

          Add New User
        </nuxt-link>
      </div>
    </div>
    <div v-if="searchTerm" class="search-result mb1 p20">
      <div class="alert alert-info alert-dismissible">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          @click="searchTerm = ''"
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
        Showing results for <strong>"{{ searchTerm }}"</strong>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view small-height table-list-scrolling">
          <UserListingHeader
            v-if="searchResult.length"
            :sort-value.sync="sortValue"
            :reverse="sortReverse"
            :hide-activity="hideActivity"
            @sort="sortByColumn($event)"
          />
          <div class="customscrollbar no_footer">
            <ul v-if="searchResult.length" class="tbody">
              <UserListingItem
                v-for="user in searchResult"
                :key="user.id"
                :user="user"
                :showing-deleted="filterSelectModel == '3'"
                :hide-activity="hideActivity"
                :user-filter="filterSelectModel === '2' ? 'pending' : ''"
                @deleted="userDeleted"
              />
            </ul>
            <div
              v-if="searchTerm && !searchResult.length && !fetchingUser"
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

                <p>No users found!</p>
              </div>
            </div>
            <client-only>
              <infinite-loading :identifier="identifier" @infinite="fetchUser">
                <template #spinner>
                  <client-only>
                    <ContentLoader
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
                  </client-only>
                </template>
                <div slot="no-more" style="margin-top: 20px"></div>
                <template #no-results>
                  <div
                    v-if="!searchResult.length && !fetchingUser && !searchTerm"
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
                      <template v-if="searchTerm || filterSelectModel != 1">
                        <p>No users found!</p>
                      </template>
                      <template v-else>
                        <p>You haven't added any User yet!</p>
                        <nuxt-link
                          v-tooltip="
                            !canAddMoreUsers
                              ? 'Please upgrade your subscription plan to add more users'
                              : ''
                          "
                          class="btn btn-icon"
                          :disabled="!canAddMoreUsers"
                          :style="
                            canAddMoreUsers
                              ? ''
                              : 'opacity: 0.4;cursor: not-allowed'
                          "
                          :to="
                            canAddMoreUsers
                              ? {
                                  name: 'workspace_id-workspace-settings-dam-instance_id-users-add',
                                  params: $route.params,
                                }
                              : {}
                          "
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
                            <g
                              id="Group_4454"
                              transform="translate(-1005 -577.999)"
                            >
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
                          Add New User
                        </nuxt-link>
                      </template>
                    </div>
                  </div>
                  <div v-else></div>
                </template>
              </infinite-loading>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <!-- </template> -->
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import UserListingHeader from '~/components/dam/UserListing/UserListingHeader'
import UserListingItem from '~/components/dam/UserListing/UserListingItem'
import Select2 from '~/components/plugins/Select2'
import routeParams from '~/mixins/routeParams'

export default {
  components: { UserListingHeader, UserListingItem, Select2, ContentLoader },
  mixins: [routeParams],
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      searchTerm: '',
      filterSelectModel: 1,
      filterOptions: [
        { id: 1, text: 'Active Users' },
        { id: 2, text: 'Pending Approval' },
        { id: 3, text: 'Deactivated Users' },
      ],
      users: [],
      page: 0,
      lastPage: 1,
      fetchingUser: false,
      identifier: Date.now(),
      loading: false,
      sortValue: 'name',
      sortReverse: false,
      subscriptionData: {},
      totalInstanceUsers: 0,
    }
  },

  computed: {
    canAddMoreUsers() {
      if (!this.usersEnabled) return false
      const maxAllowedUsers = this.subscriptionData.features?.users?.users
      if ((maxAllowedUsers + '').trim().toLowerCase() === 'unlimited')
        return true
      if (this.totalInstanceUsers >= parseInt(maxAllowedUsers)) return false
      return true
    },
    usersEnabled() {
      return !!this.subscriptionData.features?.users?.enable
    },
    hideActivity() {
      if (this.filterSelectModel === 1 || this.filterSelectModel === '1')
        return false
      return true
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    routeInstanceId() {
      return this.$route.params.instance_id
    },
    routeWorkspaceId() {
      return this.$route.params.workspace_id
    },
    searchResult() {
      if (this.lastPage > 1) return this.users

      const term = this.searchTerm
      let results = this.users

      if (term) {
        try {
          const regex = this.$stringToRegex(term)

          results = this.users.filter(
            ({ name, email }) => regex.test(name) || regex.test(email)
          )
        } catch {}
      }

      return results
    },
  },
  watch: {
    searchTerm() {
      if (this.lastPage < 2) return

      if (this.searchTimer) clearTimeout(this.searchTimer)

      this.searchTimer = setTimeout(this.refresh, 400)
    },
    routeInstanceId() {
      this.refresh()
    },
    routeWorkspaceId() {
      this.refresh()
      this.fetchSubscription()
    },
    filterSelectModel() {
      this.refresh()
    },
  },
  mounted() {
    this.$store.dispatch('dam/getNotifications')
    this.fetchSubscription()
  },
  methods: {
    fetchSubscription() {
      this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
    },
    refresh() {
      this.users = []
      this.identifier += 1
      this.page = 0
      this.lastPage = 1
    },
    fetchUser($state) {
      if (this.fetchingUser) return $state.loaded()
      this.page += 1
      if (this.lastPage < this.page) return $state.complete()

      const filterSelectModel = parseInt(this.filterSelectModel)

      const body = {
        page: this.page,
        sort_value: this.sortValue,
        sort_by: this.sortReverse ? 'DESC' : 'ASC',
        workspace_id: this.routeWorkspaceId,
        instance_id: this.routeInstanceId,
        search_text: this.searchTerm,
        ...(filterSelectModel < 3
          ? { is_active: filterSelectModel === 1 }
          : { is_deleted: true }),
      }

      this.fetchingUser = true
      this.$axios
        .$get(
          `/digital-assets/instance/get-user?` + this.$toQueryString(body),
          body
        )
        .then(
          ({ data: { last_page, current_page, data, total_user_count } }) => {
            this.lastPage = last_page
            this.totalInstanceUsers = total_user_count

            if (!data.length) $state.complete()
            else if (this.page === current_page) {
              this.users = [...this.users, ...data]
              $state.loaded()
            }
          }
        )
        .catch((e) => {
          const { data } = e.response
          this.$nuxt.error({
            statusCode: data.code,
            path: this.$route.path,
            message: data.message,
          })
        })
        .finally(() => (this.fetchingUser = false))
    },
    userDeleted(user) {
      if (this.lastPage < 2)
        this.users = this.users.filter(({ id }) => id !== user.id)
      else this.refresh()

      this.$axios
        .$get(
          `/digital-assets/instance/get-user?` +
            this.$toQueryString({
              workspace_id: this.routeWorkspaceId,
              instance_id: this.routeInstanceId,
            })
        )
        .then(({ data: { total_user_count } }) => {
          this.totalInstanceUsers = total_user_count
        })
        .catch(console.error)
    },
    clearSearch() {
      this.searchTerm = ''
    },
    sortByColumn(column) {
      if (column === this.sortValue) this.sortReverse = !this.sortReverse
      else this.sortReverse = false

      this.sortValue = column

      this.refresh()
    },
  },
}
</script>

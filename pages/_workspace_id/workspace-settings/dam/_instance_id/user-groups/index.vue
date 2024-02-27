<template>
  <div
    class="general-settings-right search-filter h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!subscriptionFetched" class="overlay">
      <div class="loader"></div>
    </div>
    <template v-else-if="!userGroupEnabled">
      <img
        :src="require('~/assets/img/blurred-images/dam-user-groups.png')"
        style="width: 100%"
      />
      <div class="common-overaly">
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
    </template>
    <template v-else>
      <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
        <div class="alert alert-warning alert-dismissible">
          <button type="button" class="close" data-dismiss="alert">
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
        <h4>DAM User Groups</h4>
        <div class="right-side">
          <div class="search-pr">
            <form
              class="navbar-form search-navbar-form"
              role="search"
              @submit.prevent="onSearch"
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
                  v-model="searchModel"
                  class="form-control"
                  placeholder="Search by group name"
                  name="srch-term"
                  type="text"
                  @keyup="onSearch"
                />
              </div>
            </form>
          </div>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-user-groups-add',
              params: $route.params,
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
            Add Group
          </nuxt-link>
        </div>
      </div>
      <div v-show="searchTerm.length" class="search-result mb1 p20">
        <div class="alert alert-info alert-dismissible">
          <button
            v-tooltip="'Clear current search'"
            type="button"
            class="close"
            data-dismiss="alert"
            @click="reset()"
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
          <div class="table-list-view userGroupList table-list-scrolling">
            <ul class="thead">
              <li>
                <div
                  class="sorting sortarrow flex40"
                  :class="{ active: order === 'ASC' }"
                >
                  <span @click="sortGroups('group_name')">Group Name</span>
                </div>
                <div class="sorting flex45">
                  <span>Group Users</span>
                </div>
                <div class="sorting flex15">
                  <span>Action</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer" @scroll="onScroll">
              <ul class="tbody">
                <li
                  v-for="group in groups"
                  :key="[group.name, group.id].join('_')"
                >
                  <div class="tb-column flex40">
                    <div class="media">
                      <div class="media-left">
                        <div
                          v-if="group.display_group_icon"
                          class="profile-bg"
                          :style="`background-image: url(${group.display_group_icon})`"
                        ></div>
                        <div v-else class="profile-char">
                          {{ group.group_name.charAt(0) }}
                        </div>
                      </div>
                      <div class="media-body">
                        <nuxt-link
                          :to="{
                            params: { ...$route.params, group, id: group.id },
                            name: 'workspace_id-workspace-settings-dam-instance_id-user-groups-id-edit',
                          }"
                          class="table-a"
                          ><span v-tooltip="'View/Edit group'">{{
                            group.group_name
                          }}</span></nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                  <div class="tb-column flex45">
                    <ul class="groupTeam">
                      <li
                        v-for="user in group.users.slice(0, 7)"
                        :key="user.id"
                      >
                        <span v-tooltip="user.name">
                          <div
                            v-if="user.profile_image"
                            class="profile-bg"
                            :style="`background-image: url('${user.profile_image}')`"
                          ></div>
                          <div
                            v-else
                            class="profile-char fl-as-imgtxt"
                            :class="user.name.charAt(0).toLowerCase()"
                          >
                            {{ user.name.charAt(0) }}
                          </div>
                        </span>
                      </li>
                      <li v-show="group.users.length > 7">
                        <div class="dropdown">
                          <a
                            href="javascript:void(0);"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            +{{ group.users.length - 7 }}
                          </a>
                          <ul class="dropdown-menu">
                            <li
                              v-for="user in group.users.slice(7)"
                              :key="user.id"
                            >
                              <span class="dropdown-item">
                                <div class="media">
                                  <div v-tooltip="user.name" class="media-left">
                                    <div
                                      v-if="user.profile_image"
                                      class="profile-bg"
                                      :style="`background-image: url('${user.profile_image}')`"
                                    ></div>
                                    <div
                                      v-else
                                      class="profile-char fl-as-imgtxt"
                                      :class="user.name.charAt(0).toLowerCase()"
                                    >
                                      {{ user.name.charAt(0) }}
                                    </div>
                                  </div>
                                  <div class="media-body">
                                    <span>{{ user.name }}</span>
                                  </div>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="tb-column flex15">
                    <ul class="action">
                      <li>
                        <nuxt-link
                          :to="{
                            params: { ...$route.params, group, id: group.id },
                            name: 'workspace_id-workspace-settings-dam-instance_id-user-groups-id-edit',
                          }"
                        >
                          <svg
                            id="Layer_1"
                            v-tooltip="'Edit Group'"
                            class="edit-icon h-orange"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Edit Group"
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
                        <i
                          v-if="deleting && currentGroup.id === group.id"
                          class="fa fa-circle-o-notch fa-spin"
                        ></i>
                        <a
                          v-else
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#delete-group"
                          @click="currentGroup = group"
                        >
                          <svg
                            id="Layer_1"
                            v-tooltip="'Delete Group'"
                            class="delete-icon h-orange"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete Group"
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
                <template v-if="loadingGroups">
                  <li v-for="i in 6" :key="i">
                    <div class="tb-column flex40">
                      <div class="media">
                        <div class="media-left">
                          <ContentLoader
                            :speed="2"
                            :animate="true"
                            :height="30"
                            :width="30"
                            :style="{
                              width: '30px',
                              height: '30px',
                              borderRadius: '2px',
                            }"
                          >
                            <rect
                              x="0"
                              :y="0"
                              rx="0"
                              ry="0"
                              width="30"
                              height="30"
                            />
                            />
                          </ContentLoader>
                        </div>
                        <div class="media-body">
                          <ContentLoader
                            :speed="2"
                            :animate="true"
                            :height="16"
                            :width="200"
                            :style="{
                              width: '200px',
                              height: '16px',
                              borderRadius: '4px',
                            }"
                          >
                            <rect
                              x="0"
                              :y="0"
                              rx="0"
                              ry="0"
                              width="200"
                              height="16"
                            />
                            />
                          </ContentLoader>
                        </div>
                      </div>
                    </div>
                    <div class="tb-column flex45">
                      <ul class="groupTeam">
                        <li
                          v-for="j in Math.floor(Math.random() * 5) + 1"
                          :key="j"
                        >
                          <div class="profile-bg">
                            <ContentLoader
                              :speed="2"
                              :animate="true"
                              :height="30"
                              :width="30"
                              :style="{
                                width: '30px',
                                height: '30px',
                                borderRadius: '20px',
                              }"
                            >
                              <rect
                                x="0"
                                :y="0"
                                rx="0"
                                ry="0"
                                width="30"
                                height="30"
                              />
                              />
                            </ContentLoader>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="tb-column flex15">
                      <ul class="action">
                        <li>
                          <ContentLoader
                            :speed="2"
                            :animate="true"
                            :height="16"
                            :width="80"
                            :style="{
                              width: '80px',
                              height: '16px',
                              borderRadius: '2px',
                            }"
                          >
                            <rect
                              x="0"
                              :y="0"
                              rx="0"
                              ry="0"
                              width="80"
                              height="16"
                            />
                            />
                          </ContentLoader>
                        </li>
                      </ul>
                    </div>
                  </li>
                </template>
                <div v-else-if="!groups.length" class="no-data-found">
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
                        ></path>
                        <path
                          id="Path_3565"
                          class="fill-color"
                          d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                        ></path>
                      </g>
                    </svg>
                    <p>
                      {{
                        searchTerm
                          ? `No groups found for '${searchTerm}'`
                          : "You haven't added any Groups yet!"
                      }}
                    </p>
                    <nuxt-link
                      v-if="!searchTerm.length"
                      :to="{
                        name: 'workspace_id-workspace-settings-dam-instance_id-user-groups-add',
                        params: $route.params,
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
                      Add Group
                    </nuxt-link>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--  Delete Group Modal  -->
      <div id="delete-group" class="modal fade">
        <div
          class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Group</h5>
              <button
                ref="deleteClose"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
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
                Are you sure you want to delete
                <b>{{ currentGroup.group_name }}</b> group?
              </p>
              <div class="btn-group">
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray"
                  data-dismiss="modal"
                  @click="currentGroup = {}"
                  >No</a
                >
                <a class="btn" @click="deleteGroup()">{{
                  deleting ? 'Deleting...' : 'Yes'
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      groups: [],
      loadingGroups: true,
      page: 1,
      searchModel: '',
      searchTerm: '',
      lastPage: 1,
      total: 0,
      currentGroup: {},
      deleting: false,
      order: '',
      sortKey: '',
      searchTimer: null,
      subscriptionData: {},
      subscriptionFetched: false,
    }
  },
  computed: {
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    userGroupEnabled() {
      return (
        !this.subscriptionFetched ||
        !!this.subscriptionData?.features?.user_groups?.enable
      )
    },
  },
  async mounted() {
    this.$store.dispatch('dam/getNotifications')
    this.loadingGroups = false
    await this.fetchSubscription()
    this.listGroups()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  methods: {
    fetchSubscription() {
      this.subscriptionFetched = false
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
        .finally(() => {
          this.subscriptionFetched = true
        })
    },
    onSearch() {
      if (!this.userGroupEnabled) return
      if (this.searchModel === this.searchTerm) return
      if (this.searchTimer) clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.page = 1
        this.groups = []
        this.listGroups()
      }, 600)
    },
    reset() {
      if (!this.userGroupEnabled) return
      this.searchModel = ''
      this.page = 1
      this.groups = []
      this.order = ''
      this.sortKey = ''
      this.listGroups()
    },
    sortGroups(key) {
      if (!this.userGroupEnabled) return
      if (this.sortKey === key) {
        this.order = this.order === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.order = 'ASC'
        this.sortKey = key
      }
      this.page = 1
      this.groups = []
      this.listGroups()
    },
    onScroll(e) {
      if (!this.userGroupEnabled) return
      const el = e.target
      if (!el || this.page > this.lastPage) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 80) {
        this.listGroups()
      }
    },
    deleteGroup() {
      if (!this.userGroupEnabled) return
      if (this.deleting || !this.currentGroup?.id) return
      this.deleting = true
      this.$axios
        .$post('digital-assets/group/delete_group', {
          workspace_id: this.$route.params.workspace_id,
          group_id: this.currentGroup.id,
        })
        .then(() => {
          this.groups = this.groups.filter((e) => e.id !== this.currentGroup.id)
          this.$toast.global.success(`User group deleted successfully.`)
          this.$refs.deleteClose.click()
          if (!this.groups.length) this.listGroups()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.currentGroup = {}
          this.deleting = false
        })
    },
    listGroups() {
      if (this.page > this.lastPage) {
        this.loadingGroups = false
        return
      }
      if (!this.userGroupEnabled) return
      this.loadingGroups = true
      this.searchTerm = this.searchModel
      this.$axios
        .$get('digital-assets/group/group_list', {
          params: {
            workspace_id: this.$route.params.workspace_id,
            page: this.page,
            search_value: this.searchTerm,
            sort_by: this.order,
            sort_value: this.sortKey,
          },
        })
        .then(({ data }) => {
          const { data: groups, last_page, total } = data
          this.groups.push(...groups)
          this.lastPage = last_page
          this.total = total
          this.page += 1
        })
        .catch((e) => {
          e?.response?.data?.message !==
            'Please upgrade your plan to access this feature.' &&
            this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => (this.loadingGroups = false))
    },
  },
}
</script>

<style scoped>
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

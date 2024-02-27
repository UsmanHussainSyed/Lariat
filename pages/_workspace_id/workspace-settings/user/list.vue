<template>
  <div
    :class="{
      'general-settings-right h-100': true,
      'search-filter': (search_name || '').trim().length,
    }"
  >
    <div class="general-settings-title">
      <h4>Workspace Admins</h4>
      <div class="right-side">
        <Select2
          v-model="selectedUserType"
          :class="'select'"
          :options="userListType"
          :custom-event="true"
          :attrs="{ minimumResultsForSearch: -1 }"
          @changeSelect2="changeUserTypeFilter(...arguments)"
        ></Select2>
        <!-- <Select2
          v-model="selectedRoleType"
          :class="'select'"
          :custom-event="true"
          @changeSelect2="changeRoleTypeFilter(...arguments)"
        >
          <optgroup
            v-for="(group, name) in roleListType"
            :key="name"
            :label="group.name"
          >
            <option
              v-for="(option, index) in group.roles"
              :key="index"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </optgroup>
        </Select2> -->

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
                v-model="search_name"
                class="form-control"
                placeholder="Search..."
                name="srch-term"
                type="text"
                data-lpignore="true"
              />
            </div>
          </form>
        </div>

        <nuxt-link
          class="btn btn-icon"
          :to="{
            name: 'workspace_id-workspace-settings-user-add',
            params: { workspace_id: internal_workspace_id },
          }"
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
          Add New User</nuxt-link
        >
      </div>
    </div>
    <div v-if="(search_name || '').trim().length" class="search-result mb1 p10">
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
        Showing results for <strong>"{{ search_name.trim() }}"</strong>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view small-height table-list-scrolling">
          <ul v-if="searchResult.length" class="thead">
            <li>
              <!-- name -->
              <div
                :class="[
                  'sorting flex30',
                  searchResult.length && !isSortComplete ? 'sortarrow' : '',
                  sortingClass('name'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('name')
                  "
                  >Name</span
                >
              </div>
              <!-- email -->
              <div
                :class="[
                  'sorting flex30',
                  searchResult.length && !isSortComplete ? 'sortarrow' : '',
                  sortingClass('email'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('email')
                  "
                  >Email</span
                >
              </div>
              <!-- last login -->
              <div class="sorting flex20">
                <span>Last Login</span>
              </div>
              <!-- dam -->
              <div class="sorting flex10">
                <span>DAM</span>
              </div>
              <!-- action -->
              <div class="sorting flex10">
                <span>Actions</span>
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody list-animation">
              <li
                v-for="(user, index) in searchResult"
                :key="user.id"
                :style="`--animation-order: ${index + 1}`"
              >
                <div
                  v-if="
                    user.resend_invitation == false &&
                    userType != 'Inactive' &&
                    user.id != $auth.user.id
                  "
                  class="tb-column flex30"
                >
                  <div class="media">
                    <div class="media-left">
                      <!-- <div
                        class="profile-bg"
                        :style="{
                          'background-image': getUserImage(user),
                        }"
                      ></div> -->
                      <div
                        v-if="user.display_profile_image"
                        class="profile-bg"
                        :style="{
                          backgroundImage: `url(${user.display_profile_image})`,
                        }"
                      ></div>
                      <div
                        v-else
                        :class="[
                          'profile-char',
                          'fl-as-imgtxt',
                          user.name[0].toLowerCase(),
                        ]"
                      >
                        {{ user.name[0].toUpperCase() }}
                      </div>
                    </div>
                    <div class="media-body">
                      <nuxt-link
                        class="table-a"
                        :to="{
                          name: 'workspace_id-workspace-settings-user-userid-edit',
                          params: {
                            workspace_id: user.workspace_id,
                            userid: user.id,
                          },
                        }"
                        >{{ user.name }}</nuxt-link
                      >
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    user.resend_invitation == true && user.id != $auth.user.id
                  "
                  class="tb-column flex30"
                >
                  <div class="media">
                    <div class="media-left">
                      <!-- <div
                        class="profile-bg"
                        :style="{
                          'background-image': getUserImage(user),
                        }"
                      ></div> -->
                      <div
                        v-if="user.display_profile_image"
                        class="profile-bg"
                        :style="{
                          backgroundImage: `url(${user.display_profile_image})`,
                        }"
                      ></div>
                      <div
                        v-else
                        :class="[
                          'profile-char',
                          'fl-as-imgtxt',
                          user.name[0].toLowerCase(),
                        ]"
                      >
                        {{ user.name[0].toUpperCase() }}
                      </div>
                    </div>
                    <div class="media-body">
                      <label class="table-a">{{ user.name }}</label>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    user.resend_invitation == false &&
                    userType == 'Inactive' &&
                    user.id != $auth.user.id
                  "
                  class="tb-column flex30"
                >
                  <div class="media">
                    <div class="media-left">
                      <!-- <div
                        class="profile-bg"
                        :style="{
                          'background-image': getUserImage(user),
                        }"
                      ></div> -->
                      <div
                        v-if="user.display_profile_image"
                        class="profile-bg"
                        :style="{
                          backgroundImage: `url(${user.display_profile_image})`,
                        }"
                      ></div>
                      <div
                        v-else
                        :class="[
                          'profile-char',
                          'fl-as-imgtxt',
                          user.name[0].toLowerCase(),
                        ]"
                      >
                        {{ user.name[0].toUpperCase() }}
                      </div>
                    </div>
                    <div class="media-body">
                      <label class="table-a">{{ user.name }}</label>
                    </div>
                  </div>
                </div>
                <div v-if="user.id == $auth.user.id" class="tb-column flex30">
                  <div class="media">
                    <div class="media-left">
                      <!-- <div
                        class="profile-bg bg-gray"
                        :style="{
                          'background-image': getUserImage(user),
                        }"
                      ></div> -->
                      <div
                        v-if="user.display_profile_image"
                        class="profile-bg"
                        :style="{
                          backgroundImage: `url(${user.display_profile_image})`,
                        }"
                      ></div>
                      <div
                        v-else
                        :class="[
                          'profile-char',
                          'fl-as-imgtxt',
                          user.name[0].toLowerCase(),
                        ]"
                      >
                        {{ user.name[0].toUpperCase() }}
                      </div>
                    </div>
                    <div class="media-body">
                      <label class="table-a">{{ user.name }}</label>
                    </div>
                  </div>
                </div>
                <!-- email -->
                <div class="tb-column flex30">
                  <label>{{ user.email }}</label>
                </div>
                <!-- last login -->
                <div class="tb-column flex20">
                  <label
                    v-tooltip="
                      (user.last_login &&
                        $moment(user.last_login).format(
                          'MMM Do YYYY, h:mm a'
                        )) ||
                      '-'
                    "
                    >{{
                      (user.last_login &&
                        $moment(user.last_login).format(
                          'MMM Do YYYY, h:mm a'
                        )) ||
                      '-'
                    }}</label
                  >
                </div>
                <!-- dam role -->
                <div class="tb-column flex10">
                  <div class="media">
                    <div class="media-body">
                      <label>{{ user.dam_role }}</label>
                    </div>
                  </div>
                </div>
                <!-- action -->
                <div class="tb-column flex10">
                  <ul class="action">
                    <li
                      v-if="
                        user.resend_invitation == false &&
                        userType != 'Inactive' &&
                        user.id != $auth.user.id
                      "
                    >
                      <nuxt-link
                        :to="{
                          name: 'workspace_id-workspace-settings-user-userid-edit',
                          params: {
                            workspace_id: user.workspace_id,
                            userid: user.id,
                          },
                        }"
                      >
                        <svg
                          id="Layer_1"
                          v-tooltip="'Edit User'"
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
                    <li
                      v-if="
                        user.resend_invitation == true &&
                        userType != 'Inactive' &&
                        user.id != $auth.user.id
                      "
                    >
                      <div class="media">
                        <div class="media-left">
                          <a
                            @click="
                              resendInvitation(
                                user.id,
                                user.workspace_id,
                                index
                              )
                            "
                          >
                            <svg
                              id="Layer_1"
                              v-tooltip="'Resend Invitation'"
                              class="resend-invitation-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 12.5"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_5364"
                                transform="translate(-0.073 -0.018)"
                              >
                                <g
                                  id="Group_5364-2"
                                  transform="translate(0.073 0.018)"
                                >
                                  <g id="Group_4408" transform="translate(0 0)">
                                    <path
                                      id="Path_3512"
                                      class="fill-color"
                                      d="M8,6.7c-0.3,0-0.6-0.1-0.9-0.3l-7-5.2l0.8-1.1l7,5.2l0.2,0.1V5.4l7-5.2l0.8,1.1l-7,5.2C8.6,6.7,8.3,6.7,8,6.7z"
                                    />
                                    <path
                                      id="Path_3513"
                                      class="fill-color"
                                      d="M14.7,0H1.4C0.7,0,0,0.6,0,1.4c0,0,0,0,0,0v9.2C0,11.4,0.6,12,1.4,12c0,0,0,0,0,0h9.8c-0.5-0.4-0.8-0.8-1.1-1.3H1.4c0,0-0.1,0-0.1-0.1c0,0,0,0,0,0V1.4c0-0.1,0-0.1,0.1-0.1h13.2c0.1,0,0.1,0,0.1,0.1v3.3c0.5,0.1,0.9,0.3,1.3,0.5V1.4C16.1,0.7,15.5,0,14.7,0C14.7,0,14.7,0,14.7,0z"
                                    />
                                  </g>
                                </g>
                                <path
                                  id="Path_3807"
                                  class="fill-color"
                                  d="M17.9,7.7h-0.5c-0.3-0.8-0.9-1.5-1.6-2c-0.5-0.2-1-0.3-1.5-0.4H14c-0.2,0-0.4,0-0.6,0.1c-0.5,0.1-1.1,0.3-1.5,0.6c-0.4,0.3-0.7,0.6-0.9,1c-0.5,0.8-0.6,1.7-0.4,2.5c0.1,0.5,0.3,0.9,0.5,1.3c0.6,0.9,1.7,1.5,2.8,1.6H14c0.4,0,0.7-0.1,1.1-0.2c0.6-0.2,1.2-0.6,1.6-1.1c0-0.1,0.1-0.1,0.1-0.2l0.2-0.2c0-0.1,0.1-0.1,0-0.2c0-0.1-0.1-0.1-0.1-0.2l-0.4-0.3h-0.1c-0.1,0-0.1,0-0.2,0.1l-0.1,0.1c-0.4,0.6-1.1,1-1.8,1.1H14c-1.4,0-2.5-1.1-2.5-2.5c0,0,0,0,0-0.1c-0.1-1.4,1-2.5,2.4-2.6c0.1,0,0.1,0,0.2,0h0.4c0.9,0.1,1.6,0.6,2,1.4H16c-0.1,0-0.1,0-0.2,0.1v0.3l1,1.1c0,0.1,0.1,0.1,0.2,0.1l0,0c0.1,0,0.1,0,0.2-0.1L18,8.1c0,0,0.1-0.1,0.1-0.2C18.1,7.8,18,7.7,17.9,7.7z"
                                />
                              </g>
                            </svg>
                          </a>
                        </div>
                        <div class="media-body">
                          <a
                            v-if="user.show_revoke_btn && user.is_revoked == 0"
                            class="revokelink"
                            @click="
                              revokeUser(user.id, user.workspace_id, index)
                            "
                            >Revoke Access</a
                          >

                          <span
                            v-if="user.show_revoke_btn && user.is_revoked == 1"
                            class="revokelink"
                            >Revoke Access</span
                          >
                          <a
                            v-if="user.is_active !== 1"
                            class="revokelink"
                            data-target="#activate-user"
                            data-toggle="modal"
                            @click="
                              () => {
                                activeUser = user
                              }
                            "
                            >Activate User</a
                          >
                        </div>
                      </div>
                    </li>

                    <li
                      v-if="
                        user.resend_invitation == false &&
                        userType != 'Inactive' &&
                        user.id != $auth.user.id
                      "
                    >
                      <nuxt-link
                        :to="{
                          name: 'workspace_id-workspace-settings-user-userid-reset-password',
                          params: {
                            workspace_id: user.workspace_id,
                            userid: user.id,
                          },
                        }"
                      >
                        <svg
                          id="Layer_1"
                          v-tooltip="'Change Password'"
                          class="change-password-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 19.5 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4352"
                            transform="translate(-486.506 -147.705)"
                          >
                            <path
                              id="Path_3412"
                              class="fill-color"
                              d="M495.5,165.7c-0.1,0-0.3,0-0.4,0c-2.9-0.1-5.6-1.7-7.2-4.1c-0.6-1-1.1-2.1-1.3-3.2c-0.4-2.2,0-4.5,1.2-6.4c0.6-0.9,1.3-1.8,2.2-2.4c1.1-0.9,2.4-1.4,3.8-1.7c0.5-0.1,1.1-0.2,1.6-0.2c0.2,0,0.3,0,0.5,0c1.3,0.1,2.6,0.4,3.8,1.1c2.1,1.1,3.6,3,4.3,5.3l0,0.1h1.8l-2.4,4.3l-2.6-4.3l1.9-0.1l-0.1-0.3c-1.1-2.6-3.4-4.4-6.1-4.8c-0.4-0.1-0.8-0.1-1.2-0.1c-4.2,0-7.7,3.5-7.6,7.7c0,4.2,3.4,7.6,7.6,7.6c0.3,0,0.7,0,1-0.1c2.1-0.3,4.1-1.4,5.3-3.2l0.2-0.2l1.1,0.7l-0.4,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-1.1,1.3-2.5,2.2-4.1,2.7C497.4,165.6,496.5,165.7,495.5,165.7z"
                            />
                            <path
                              id="Path_3413"
                              class="fill-color"
                              d="M492.7,161.3c-0.5,0-0.9-0.3-0.9-0.8c0,0,0-0.1,0-0.1c0-1,0-1.9,0-2.9l0-1.2c0-0.4,0.3-0.8,0.7-0.8c0,0,0.1,0,0.1,0h0.3l-0.1-0.3c0-0.2-0.1-0.5,0-0.7c0.1-0.9,0.6-1.7,1.4-2.1c0.4-0.2,0.8-0.3,1.2-0.3c0.7,0,1.4,0.3,2,0.8c0.5,0.5,0.8,1.1,0.8,1.8l0,0.7l0.2,0c0.5,0,0.8,0.4,0.8,0.8c0,0,0,0,0,0c0,0.2,0,1.1,0,1.1l0,3c0,0.4-0.3,0.8-0.7,0.9c0,0-0.1,0-0.1,0l-2.7,0C494.7,161.3,493.7,161.3,492.7,161.3L492.7,161.3z M493.2,156.8v3.2l4.8-0.1l-0.1-3.2L493.2,156.8z M495.4,153.5c-0.7,0.1-1.2,0.6-1.2,1.4v0.7l0.2,0c0.6-0.1,2-0.1,2.4-0.1h0.2l-0.1-0.7c0-0.7-0.6-1.3-1.4-1.3C495.5,153.5,495.4,153.5,495.4,153.5z"
                            />
                          </g>
                        </svg>
                      </nuxt-link>
                    </li>
                    <li
                      v-if="
                        user.resend_invitation == false &&
                        userType != 'Inactive' &&
                        user.id != $auth.user.id
                      "
                    >
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#delete-user"
                        @click="
                          showDeleteUserDialog(user.id, user.workspace_id)
                        "
                      >
                        <svg
                          id="Layer_1"
                          v-tooltip="'Deactivate User'"
                          class="inactive-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          style="enable-background: new 0 0 18 18"
                          xml:space="preserve"
                        >
                          <g>
                            <g id="turn-off" transform="translate(-20.581)">
                              <g id="Group_39280" transform="translate(21.331)">
                                <g id="Group_39279" transform="translate(0)">
                                  <path
                                    id="Path_40169"
                                    class="fill-color"
                                    d="M11.6,2.2c-0.4-0.2-0.8,0-1,0.4c-0.2,0.4,0,0.8,0.4,1c3.4,1.5,5,5.5,3.5,8.9c-1.5,3.4-5.5,5-8.9,3.5c-3.4-1.5-5-5.5-3.5-8.9C2.7,5.5,4,4.2,5.6,3.6C5.9,3.4,6.1,3,6,2.6S5.4,2,5,2.2c0,0,0,0,0,0C0.8,4-1.1,8.9,0.7,13s6.7,6.1,10.9,4.3c4.2-1.8,6.1-6.7,4.3-10.9C15,4.5,13.5,3,11.6,2.2L11.6,2.2z"
                                  />
                                  <path
                                    id="Path_40170"
                                    class="fill-color"
                                    d="M8.2,8.2C8.7,8.2,9,7.9,9,7.5V0.8C9,0.3,8.7,0,8.2,0S7.5,0.3,7.5,0.8v6.8C7.5,7.9,7.8,8.2,8.2,8.2z"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li
                      v-if="userType == 'Inactive' && user.id != $auth.user.id"
                    >
                      <a @click="activeInvitation(user.id, user.workspace_id)">
                        <svg
                          id="Layer_1"
                          v-tooltip="'Active User'"
                          class="active-user-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 17.5 17.5"
                          xml:space="preserve"
                        >
                          <g
                            id="incomplete-tasks"
                            transform="translate(422.202 87.935)"
                          >
                            <circle
                              id="Ellipse_98"
                              class="fill-color"
                              cx="-413.5"
                              cy="-79.2"
                              r="8"
                            />
                            <path
                              id="Path_2644"
                              class="fill-color"
                              d="M-410-81.5l-4.6,4.6l-2.3-2.3"
                            />
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

                  <p>No Data Found</p>
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
                    <div v-if="users.length" class="no-data-found pb2 pt2">
                      <div class="inner w-100">
                        <p>
                          This is the end of the list, but just the beginning of
                          what’s to come!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div v-if="!users.length" slot="no-results">
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

                        <p v-if="!show_add_user_btn">No Data Found</p>

                        <p v-if="show_add_user_btn">
                          You haven't added any Users, yet!
                        </p>
                        <nuxt-link
                          v-if="show_add_user_btn"
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-workspace-settings-user-add',
                            params: { workspace_id: internal_workspace_id },
                          }"
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
    <div id="delete-user" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              Deactivate User
            </h5>
            <button
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
            <p>Are you sure you want to deactivate this user?</p>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >No</a
              >
              <a
                href="javascript:void(0);"
                class="btn"
                data-dismiss="modal"
                @click="deleteUser(getDeteleUserId)"
                >Yes</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- for support only -->
    <!-- change password to activate user -->
    <div v-if="IS_SUPPORT_PLATFORM" id="activate-user" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              Activate User
            </h5>
            <button
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
          <div class="modal-body">
            <div class="form-group required">
              <label for="" class="control-label">New Password</label>
              <input
                v-model="activeUserNewPwd"
                type="password"
                class="form-control"
              />
            </div>
            <div class="form-group required">
              <label for="" class="control-label">Re-type New Password</label>
              <input
                ref="activeUserRePwd"
                type="password"
                class="form-control"
              />
            </div>
            <div class="btn-group">
              <a
                ref="activateUserDialogCancel"
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >Cancel</a
              >
              <a href="javascript:void(0);" class="btn" @click="activateUser()"
                >Save</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'

export default {
  components: {
    ContentLoader,
    Select2,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-general-settings'],
  data() {
    return {
      activeUserNewPwd: '',
      activeUser: '',
      activatingUser: false,
      workspace_id: this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      api_internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      loading: false,
      users: [],
      page: 1,
      lastPage: null,
      getDeteleUserId: null,
      getWorkspaceId: null,
      search_name: '',
      sort_value: '',
      sort_by: '',
      selectedUserType: '1',
      userType: 'Users',
      userListType: [
        { id: 1, text: 'Active Users', name: 'Users' },
        { id: 2, text: 'Pending Approval', name: 'Pending approval' },
        { id: 3, text: 'Deactivated Users', name: 'Inactive' },
      ],
      infiniteId: +new Date(),
      isSortComplete: false,
      show_results_text: false,
      show_add_user_btn: true,
      completelyLoaded: false,
      selectedRoleType: 0,
      roleListType: [
        {
          roles: [
            {
              id: 0,
              name: 'User Type - All',
              text: 'User Type - All',
              hierarchy: '0',
            },
          ],
        },
      ],
    }
  },
  computed: {
    searchResult() {
      return this.users
    },
    IS_SUPPORT_PLATFORM() {
      return process.env.IS_SUPPORT_PLATFORM
    },
  },
  watch: {
    search_name() {
      if (this.searchTimer) clearTimeout(this.searchTimer)

      this.searchTimer = setTimeout(() => {
        this.resetUserList()
      }, 600)
    },
  },

  mounted() {
    this.getModuleWithRole()
  },
  methods: {
    activateUser() {
      if (!this.IS_SUPPORT_PLATFORM || this.activatingUser) return
      this.activatingUser = true
      if (!this.activeUserNewPwd) {
        this.activatingUser = false
        this.$toast.global.error('Enter a valid password!')
        return
      }
      if (this.activeUserNewPwd.trim().length < 6) {
        this.activatingUser = false
        this.$toast.global.error('Password should have at least 6 characters!')
        return
      }
      if (
        this.activeUserNewPwd.trim() !== this.$refs.activeUserRePwd.value.trim()
      ) {
        this.activatingUser = false
        this.$toast.global.error('Both passwords must be exactly same!')
        return
      }
      const user = this.activeUser
      this.$axios
        .$post('user/active-user', {
          workspace_id: this.$route.params.workspace_id,
          url_workspace_id: this.$route.params.workspace_id,
          user_id: user.id,
          password: this.activeUserNewPwd.trim(),
          name: user.name,
        })
        .then((r) => {
          this.$toast.global.success(r.message || 'User activated succesfully.')
          this.$refs.activateUserDialogCancel.click()
          this.activeUserNewPwd = ''
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.activatingUser = false
        })
    },
    getUserImage(user) {
      if (user.display_profile_image) {
        return ` url(${user.display_profile_image})`
      }
      if (!user.display_profile_image && user.name) {
        return ` url('https://ui-avatars.com/api/?name=${encodeURI(
          user.name
        )}&size=128&background=EFF1F3&font-size=0.5&bold=true')`
      }
    },
    async getModuleWithRole() {
      try {
        const { data } = await this.$axios.$get(
          `/user/role-module?workspace_id=${this.api_internal_workspace_id}`
        )
        this.roleListType.push(...data)
      } catch (e) {
        if (e.response) {
          const { data } = e.response
          this.$toast.error(data.message)
        } else {
          this.$toast.error(this.$getErrorMessage(e))
        }
        this.loading = false
      }
    },
    infiniteHandler($state) {
      if (this.completelyLoaded || this.isSortComplete) {
        $state.complete()
        return
      }

      this.$axios
        .$post(
          `/user/list?page=${this.page}&type=${this.userType}&sort_value=${this.sort_value}&sort_by=${this.sort_by}&search_value=${this.search_name}`,
          {
            workspace_id: this.api_internal_workspace_id,
            role_id: this.selectedRoleType,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          this.show_add_user_btn = data.show_add_user_btn

          if (data.users && data.users.length) {
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.users.push(...data.users)
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
        })
        .finally(() => this.$nextTick(() => (this.isSortComplete = false)))
    },
    showDeleteUserDialog(userId, workspaceId) {
      this.getDeteleUserId = userId
      this.getWorkspaceId = workspaceId
    },
    async deleteUser(userId) {
      try {
        const { message } = await this.$axios.$post('/user/delete-user', {
          user_id: userId,
          workspace_id: this.getWorkspaceId,
        })

        this.users = this.users.filter(
          ({ id }) => parseInt(id) !== parseInt(userId)
        )
        this.$toast.global.success(message)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      } finally {
        this.loading = false
      }
    },
    revokeUser(userId, workspaceId, index) {
      this.$axios
        .$post('user/revoke', {
          workspace_id: workspaceId,
          user_id: userId,
        })
        .then((data) => {
          this.users[index].is_revoked = data.data.is_revoked
          this.users[index].show_revoke_btn = data.data.show_revoke_btn
          this.$toast.global.success(data.message)
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
    resendInvitation(userId, workspaceId, index) {
      this.$axios
        .$post('resend-invitations', {
          workspace_id: workspaceId,
          uesr_id: userId,
        })
        .then((data) => {
          this.users[index].is_revoked = data.data.is_revoked
          this.$toast.global.success(data.message)
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
    activeInvitation(userId, workspaceId) {
      this.$axios
        .$post('user/workspace-active-user', {
          workspace_id: workspaceId,
          user_id: userId,
        })
        .then((data) => {
          this.$toast.global.success(data.message)
          this.users = this.users.filter(
            ({ id }) => parseInt(id) !== parseInt(userId)
          )
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
    resetUserList() {
      this.users = []
      this.page = 1
      this.infiniteId += 1
      this.completelyLoaded = false
      this.isSortComplete = false
    },
    searchByColumn() {
      this.sort_value = ''
      this.sort_by = ''

      this.resetUserList()
    },
    clearSearch() {
      this.search_name = ''
    },
    changeUserTypeFilter(data) {
      this.search_name = ''
      this.sort_value = ''
      this.sort_by = ''
      this.selectedRoleType = 0
      this.userType = data.name
      this.resetUserList()
    },
    changeRoleTypeFilter(data) {
      this.search_name = ''
      this.sort_value = ''
      this.sort_by = ''
      this.selectedRoleType = data.id // data.id

      this.resetUserList()
    },
    sortByColumn(column) {
      this.sort_value = column
      this.sort_by = this.sort_by === 'ASC' ? 'DESC' : 'ASC'
      this.resetUserList()
    },
    sortingClass(sortValue) {
      return {
        active: this.sort_value === sortValue && this.sort_by === 'DESC',
      }
    },
  },
}
</script>

<style scoped></style>

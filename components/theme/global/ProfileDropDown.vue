<template>
  <div class="dropdown user-dropdown">
    <a
      id="profileDropdown"
      class="dropdown-toggle"
      href="javascript:void(0);"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span>{{ $auth.user.name }}</span>

      <svg
        id="Layer_1"
        class="arrow-down-icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 18 18"
        xml:space="preserve"
      >
        <g id="Group_4477" transform="translate(-871 -467)">
          <rect
            id="Rectangle_3015"
            x="871"
            y="467"
            class="fill-hide"
            width="18"
            height="18"
          />
          <g
            id="Icon_feather-chevron-down-3"
            transform="translate(506.256 149.451)"
          >
            <path
              id="Path_3435"
              class="fill-color"
              d="M373.7,330.8c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l6.5,6.5l6.5-6.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-7,7C374.1,330.7,373.9,330.8,373.7,330.8z"
            />
          </g>
        </g>
      </svg>

      <div
        v-if="$auth.user.display_profile_image"
        class="profile-bg"
        :title="$auth.user.name"
        :style="{
          backgroundImage: `url(${$auth.user.display_profile_image})`,
        }"
      ></div>
      <div
        v-else
        :class="[
          'profile-char',
          'fl-as-imgtxt',
          'bg-gray',
          $auth.user.name[0].toLowerCase(),
        ]"
      >
        {{ $auth.user.name[0].toUpperCase() }}
      </div>
    </a>
    <span class="workID">WS ID : {{ workspaceId }}</span>
    <div class="dropdown-menu">
      <ul class="workspace-menu customscrollbar">
        <li v-for="wp in activeAccessibleWorkspaces" :key="wp.id">
          <a
            :class="{
              'dropdown-item': true,
            }"
            @click="changeWorkspace(wp)"
          >
            <svg
              id="Layer_1"
              class="workspace-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 17.5 13.9"
              xml:space="preserve"
            >
              <g id="Group_5023" transform="translate(-67.509 -979.322)">
                <g id="Rectangle_933">
                  <path
                    id="Path_3572"
                    class="fill-color"
                    d="M85,993.3H67.5v-11.2H85V993.3z M69,991.8h14.5v-8.2H69V991.8z"
                  />
                </g>
                <g id="Line_131">
                  <path
                    id="Path_3573"
                    class="fill-color"
                    d="M80.4,993.3c-0.4,0-0.8-0.3-0.8-0.8v-9.7c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v9.7C81.2,992.9,80.8,993.3,80.4,993.3z"
                  />
                </g>
                <g id="Line_132">
                  <path
                    id="Path_3574"
                    class="fill-color"
                    d="M72.1,993.3c-0.4,0-0.8-0.3-0.8-0.8v-9.7c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v9.7C72.8,992.9,72.5,993.3,72.1,993.3z"
                  />
                </g>
                <g id="Rectangle_934">
                  <path
                    id="Path_3575"
                    class="fill-color"
                    d="M80,983.6h-7.5v-4.3H80V983.6z M74,982.1h4.5v-1.3H74L74,982.1z"
                  />
                </g>
              </g>
            </svg>

            <span>{{ wp.name }}</span>
            <svg
              v-if="parseInt(auth.id) === parseInt(wp.id)"
              id="Layer_1"
              class="check-workspace"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="check-box" transform="translate(421.452 87.185)">
                <circle
                  id="Ellipse_98"
                  class="fill-color"
                  cx="-412.5"
                  cy="-78.2"
                  r="9"
                />
                <path
                  id="Path_2644"
                  class="st1"
                  d="M-408.6-80.7l-5.1,5.1l-2.6-2.6"
                />
              </g>
            </svg>
          </a>
        </li>
      </ul>
      <ul class="user-menu">
        <li v-if="$auth.user.canCreateChildWorkspace && auth.type === 'parent'">
          <nuxt-link
            class="dropdown-item"
            :to="{
              name: 'workspace_id-child-workspace-create',
              params: { workspace_id: workspaceId },
            }"
          >
            <svg
              id="Layer_1"
              class="workspace-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 17.5 13.9"
              xml:space="preserve"
            >
              <g id="Group_5023" transform="translate(-67.509 -979.322)">
                <g id="Rectangle_933">
                  <path
                    id="Path_3572"
                    class="fill-color"
                    d="M85,993.3H67.5v-11.2H85V993.3z M69,991.8h14.5v-8.2H69V991.8z"
                  />
                </g>
                <g id="Line_131">
                  <path
                    id="Path_3573"
                    class="fill-color"
                    d="M80.4,993.3c-0.4,0-0.8-0.3-0.8-0.8v-9.7c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v9.7C81.2,992.9,80.8,993.3,80.4,993.3z"
                  />
                </g>
                <g id="Line_132">
                  <path
                    id="Path_3574"
                    class="fill-color"
                    d="M72.1,993.3c-0.4,0-0.8-0.3-0.8-0.8v-9.7c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v9.7C72.8,992.9,72.5,993.3,72.1,993.3z"
                  />
                </g>
                <g id="Rectangle_934">
                  <path
                    id="Path_3575"
                    class="fill-color"
                    d="M80,983.6h-7.5v-4.3H80V983.6z M74,982.1h4.5v-1.3H74L74,982.1z"
                  />
                </g>
              </g>
            </svg>

            Create Child Workspace
          </nuxt-link>
        </li>
        <li v-if="auth.user.hasGeneralSettingsAccess">
          <nuxt-link
            class="dropdown-item"
            :to="{
              name: 'workspace_id-workspace-settings',
              params: { workspace_id: workspaceId },
            }"
          >
            <svg
              id="Layer_1"
              class="setting-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18.2 18.2"
              xml:space="preserve"
            >
              <g id="Group_5025" transform="translate(-149.964 -975.354)">
                <path
                  id="Path_3577"
                  class="fill-color"
                  d="M159,987.5c-1.7,0-3-1.4-3-3s1.4-3,3-3c1.7,0,3,1.4,3,3C162.1,986.1,160.7,987.5,159,987.5zM159,982.9c-0.8,0-1.5,0.7-1.5,1.5c0,0.8,0.7,1.5,1.5,1.5c0.8,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0C160.5,983.6,159.9,982.9,159,982.9z"
                />
                <path
                  id="Path_3578"
                  class="fill-color"
                  d="M159.1,993.5c-1.3,0-2.3-1-2.3-2.3c0-0.2-0.1-0.4-0.3-0.5c-0.1,0-0.2-0.1-0.2-0.1c-0.1,0-0.2,0-0.3,0.1c-0.8,1-2.3,1.1-3.2,0.2c-1-0.8-1.1-2.3-0.2-3.2c0.1-0.1,0.1-0.2,0.2-0.2c0.2-0.2,0.2-0.5,0-0.7c-0.1-0.1-0.2-0.1-0.3-0.1h-0.1c-1.3,0-2.3-1-2.3-2.3s1-2.3,2.3-2.3c0.3,0,0.5-0.2,0.5-0.5c0-0.1,0-0.2-0.1-0.3c-1-0.8-1.1-2.3-0.2-3.2s2.3-1.1,3.2-0.2c0.1,0.1,0.2,0.2,0.2,0.2c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.1,0,0.2,0l0.2-0.1c0.1-0.1,0.2-0.2,0.2-0.4v-0.1c0-1.3,1-2.3,2.2-2.3s2.3,1,2.3,2.2c0,0,0,0.1,0,0.1c0,0.3,0.2,0.5,0.5,0.5c0,0,0,0,0,0h0c0.1,0,0.2,0,0.3-0.1c0.8-0.9,2.3-1,3.2-0.2c0.9,0.8,1,2.2,0.2,3.2c-0.1,0.1-0.2,0.2-0.2,0.2c-0.1,0.1-0.2,0.3-0.1,0.5l0.1,0.2c0.1,0.1,0.2,0.2,0.4,0.2h0.1c1.3,0,2.3,1,2.3,2.2c0,1.3-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0c-0.2,0-0.4,0.1-0.5,0.3c-0.1,0.2,0,0.4,0.1,0.5c1,0.8,1.1,2.3,0.2,3.2c-0.4,0.5-1,0.7-1.6,0.8c-0.1,0-0.1,0-0.2,0c-0.6,0-1.1-0.2-1.5-0.6c-0.1-0.1-0.2-0.2-0.2-0.2c-0.1-0.1-0.2-0.1-0.3-0.1c-0.3,0-0.5,0.2-0.5,0.5v0.1C161.4,992.5,160.4,993.5,159.1,993.5zM156.3,989.1c1.1,0,2,0.9,2.1,2c0,0.4,0.3,0.8,0.7,0.8c0,0,0,0,0,0c0.4,0,0.7-0.3,0.7-0.7v-0.1c0-1.1,0.9-2,2-2c0.5,0,1.1,0.2,1.4,0.6c0,0,0.1,0.1,0.2,0.2c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.3c0.3-0.3,0.2-0.8-0.1-1l-0.1-0.1c-0.6-0.6-0.7-1.5-0.4-2.2c0.3-0.7,1-1.2,1.8-1.2c0.4,0,0.8-0.3,0.8-0.7c0,0,0,0,0,0c0-0.4-0.3-0.7-0.7-0.7h-0.1c-0.8,0-1.5-0.5-1.9-1.2l-0.1-0.2c-0.3-0.7-0.1-1.5,0.5-2.1c0,0,0.1-0.1,0.2-0.2c0.3-0.3,0.2-0.8-0.1-1c-0.3-0.3-0.8-0.2-1,0.1l-0.1,0.1c-0.8,0.8-2.1,0.8-2.9,0c-0.4-0.4-0.6-0.9-0.6-1.4c0-0.4-0.3-0.8-0.7-0.8c0,0,0,0,0,0c-0.4,0-0.7,0.3-0.7,0.7v0.1c0,0.8-0.5,1.5-1.2,1.9l-0.2,0.1c-0.7,0.3-1.5,0.1-2.1-0.5c0,0-0.1-0.1-0.2-0.2c-0.3-0.3-0.8-0.2-1,0.1s-0.2,0.8,0.1,1l0,0l0.1,0.1c0.8,0.8,0.8,2.2-0.1,2.9c-0.4,0.3-0.8,0.5-1.3,0.6c-0.4,0-0.8,0.3-0.8,0.7c0,0,0,0,0,0c0,0.4,0.3,0.7,0.7,0.7h0.1c1.1,0,2,0.9,2,2c0,0.5-0.2,1-0.6,1.4c0,0-0.1,0.1-0.2,0.2c-0.3,0.3-0.2,0.8,0.1,1c0.3,0.2,0.8,0.2,1-0.1l0.1-0.1C155.2,989.4,155.7,989.1,156.3,989.1z"
                />
              </g>
            </svg>

            Organization Settings
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="dropdown-item" to="/profile">
            <svg
              id="Layer_1"
              class="user-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 17.7 18"
              xml:space="preserve"
            >
              <g id="Group_4410" transform="translate(-954.8 -658.583)">
                <g id="Path_3236">
                  <path
                    id="Path_3516"
                    class="fill-color"
                    d="M971.8,676.6L971.8,676.6c-0.4,0-0.8-0.3-0.8-0.8v-1.3c0-1.8-1.5-3.3-3.3-3.3h-8.1c-1.8,0-3.3,1.5-3.3,3.3v1.3c0,0.4-0.3,0.8-0.8,0.8l0,0c-0.4,0-0.8-0.3-0.8-0.8v-1.3c0-2.7,2.2-4.8,4.8-4.8c0,0,0,0,0,0h8.1c2.7,0,4.8,2.2,4.8,4.8c0,0,0,0,0,0v1.3C972.5,676.2,972.2,676.6,971.8,676.6z"
                  />
                </g>
                <g id="Path_3237">
                  <path
                    id="Path_3517"
                    class="fill-color"
                    d="M963.7,668.2c-2.7,0-4.8-2.2-4.8-4.8c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C968.5,666.1,966.3,668.2,963.7,668.2z M963.7,660.1c-1.8,0-3.3,1.5-3.3,3.3c0,1.8,1.5,3.3,3.3,3.3c1.8,0,3.3-1.5,3.3-3.3l0,0C967,661.6,965.5,660.1,963.7,660.1C963.7,660.1,963.7,660.1,963.7,660.1L963.7,660.1z"
                  />
                </g>
              </g>
            </svg>
            User Profile
          </nuxt-link>
        </li>
        <li v-if="false">
          <nuxt-link
            class="dropdown-item"
            :to="{
              name: 'workspace_id-helpdesk-list-tickets',
              params: {
                workspace_id: workspaceId,
                client_id: $auth.user.client_id,
              },
            }"
          >
            <svg
              id="Layer_1"
              class="support-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <path
                id="Path_3579"
                class="fill-color"
                d="M9,18c-5,0-9-4-9-9c0-5,4-9,9-9s9,4,9,9c0,2.4-0.9,4.7-2.6,6.4C13.7,17.1,11.4,18,9,18zM4.2,14.8c2.8,2.3,6.8,2.3,9.5,0l-2.1-2.1c-1.6,1.2-3.8,1.2-5.4,0L4.2,14.8z M3.2,4.2C0.9,7,0.9,11,3.2,13.8l2.1-2.1c-1.2-1.6-1.2-3.8,0-5.4L3.2,4.2z M14.8,13.8c2.3-2.8,2.3-6.8,0-9.5l-2.1,2.1c1.2,1.6,1.2,3.8,0,5.4L14.8,13.8z M9,5.9C7.3,5.9,5.9,7.3,5.9,9c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1C12.1,7.3,10.7,5.9,9,5.9z M9,4.4c1,0,1.9,0.3,2.7,0.9l2.1-2.1C11,0.9,7,0.9,4.2,3.2l2.1,2.1C7.1,4.7,8,4.4,9,4.4z"
              />
            </svg>
            Support
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="dropdown-item"
            :to="{
              name: 'workspace_id-feedback',
              params: { workspace_id: workspaceId },
            }"
          >
            <FeedbackIcon />
            Submit Feedback
          </nuxt-link>
        </li>
        <li>
          <a class="dropdown-item" @click="logout">
            <svg
              id="Layer_1"
              class="logout-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g
                id="Group_4491"
                transform="translate(815.334 -375.358) rotate(90)"
              >
                <path
                  id="Path_3552"
                  class="fill-color"
                  d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                />
                <g id="Group_4435">
                  <path
                    id="Path_3553"
                    class="fill-color"
                    d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                  />
                  <path
                    id="Path_3554"
                    class="fill-color"
                    d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                  />
                </g>
              </g>
            </svg>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import currentWorkspace from '~/mixins/currentWorkspace'
import FeedbackIcon from '@/components/svg/FeedbackIcon'

export default {
  name: 'ProfileDropDown',
  components: { FeedbackIcon },
  mixins: [currentWorkspace],
  computed: {
    accessibleWorkspaces() {
      return this.$auth.user.accessibleWorkspaces
    },
    activeAccessibleWorkspaces() {
      return this.accessibleWorkspaces.filter(
        (e) =>
          !e.is_suspended &&
          (!e.is_trial_account ||
            e.trial_expire === 'false' ||
            !!e.is_payment_added)
      )
    },
  },
  methods: {
    async logout() {
      if (process.client) {
        localStorage.removeItem(`${this.workspaceId}`)
      }
      await this.$logout()
      this.$router.push('/')
    },
    getProfileImage(user) {
      if (user.display_profile_image) {
        return ` url(${user.display_profile_image})`
      }
      if (!user.display_profile_image) {
        return ` url('https://ui-avatars.com/api/?name=${encodeURI(
          user.name
        )}&size=128&background=172B4D&color=ffffff&font-size=0.45&bold=true')`
      }
    },
    changeWorkspace(wp) {
      // set current workspace
      if (this.$_auth().id !== wp.id) {
        this.$setCurrentWorkspace(wp.id)
        this.$store.dispatch('dam/setBranding', {
          workspace_id: wp.id,
          isSetFavicon: true,
        })
      }
      this.$auth.fetchUser()
      // redirect then to the appropriate dashboard
      this.auth = this.$_auth()
      return this.$router.push({
        name: this.auth.user.redirectPathName,
        params: { workspace_id: wp.id },
      })
    },
  },
}

</script>

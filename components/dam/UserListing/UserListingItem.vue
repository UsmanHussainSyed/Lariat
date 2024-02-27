<template>
  <li class="">
    <div class="tb-column flex20">
      <component
        :is="showingDeleted || !user.is_active ? 'label' : 'nuxt-link'"
        :to="{
          name: 'workspace_id-workspace-settings-dam-instance_id-users-user_id',
          params: { ...$route.params, user_id: user.id },
        }"
        class="table-a"
      >
        {{ user.name }}
      </component>
    </div>
    <div class="tb-column flex25">
      <label>{{ user.email }}</label>
    </div>
    <div v-if="!hideActivity" class="tb-column flex15">
      <label
        ><span
          v-tooltip="
            user.last_login
              ? $moment(user.last_login).format(`MMM Do 'YY, h:mm a`)
              : user.last_activity
              ? $moment(user.last_activity).format(`MMM Do 'YY, h:mm a`)
              : ''
          "
          >{{
            user.last_login
              ? $moment(user.last_login).format(`MMM Do 'YY`)
              : user.last_activity
              ? $moment(user.last_activity).format(`MMM Do 'YY`)
              : '-'
          }}</span
        ></label
      >
    </div>
    <div v-if="!hideActivity" class="tb-column flex15">
      <label
        ><span
          v-tooltip="
            user.last_activity
              ? $moment(user.last_activity).format(`MMM Do 'YY, h:mm a`)
              : ''
          "
          >{{
            user.last_activity
              ? $moment(user.last_activity).format(`MMM Do 'YY`)
              : '-'
          }}</span
        ></label
      >
    </div>
    <div v-if="!hideActivity" class="tb-column flex10">
      <a href="javascript:void(0);" @click="toggleActivity(user)">
        <svg
          id="Layer_1"
          class="read-icon h-orange"
          data-toggle="tooltip"
          title=""
          data-original-title="Activity Logs"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4485" transform="translate(-1206 -273)">
            <rect
              id="Rectangle_3023"
              x="1206"
              y="273"
              class="fill-hide"
              width="18"
              height="18"
            ></rect>
            <g id="Icon_feather-eye" transform="translate(592.345 127.486)">
              <g id="Path_3357">
                <path
                  id="Path_3359"
                  class="fill-color"
                  d="M622.7,161.3c-5.6,0-8.8-6.2-8.9-6.4c-0.1-0.2-0.1-0.5,0-0.7c0.1-0.3,3.3-6.4,8.9-6.4s8.8,6.2,8.9,6.4c0.1,0.2,0.1,0.5,0,0.7C631.4,155.1,628.3,161.3,622.7,161.3z M615.3,154.5c0.7,1.2,3.4,5.2,7.4,5.2s6.7-4,7.4-5.2c-0.7-1.2-3.4-5.2-7.4-5.2S616,153.3,615.3,154.5z"
                ></path>
              </g>
              <g id="Path_3358">
                <path
                  id="Path_3360"
                  class="fill-color"
                  d="M622.7,157.5c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3l0,0C625.7,156.2,624.3,157.5,622.7,157.5z M622.7,153c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5l0,0C624.2,153.7,623.5,153,622.7,153z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </a>
    </div>
    <div class="tb-column" :class="{ flex15: userFilter !== 'pending' }">
      <ul class="action">
        <template v-if="!showingDeleted">
          <li v-if="!user.is_active">
            <div class="media">
              <div class="media-left">
                <a @click="resendInvitation">
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
                    <g id="Group_5364" transform="translate(-0.073 -0.018)">
                      <g id="Group_5364-2" transform="translate(0.073 0.018)">
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
                  v-if="user.is_revoke == 0"
                  class="revokelink"
                  @click="revokeUser()"
                  >Revoke Access</a
                >

                <span v-if="user.is_revoke == 1" class="revokelink"
                  >Revoke Access</span
                >
                <a
                  v-if="user.is_active !== 1 && userFilter === 'pending'"
                  class="revokelink"
                  @click="showUserActiveDialog = true"
                  >Activate User</a
                >
              </div>
            </div>
          </li>
          <li v-if="!user.is_active">
            <a
              v-tooltip="'Delete Invitation Record'"
              @click="$refs.deleteInvitationDialog.show()"
            >
              <svg
                id="Layer_1"
                class="delete-icon h-orange"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 15.3 18"
                xml:space="preserve"
                aria-describedby="tooltip504547"
              >
                <g id="Group_4351" transform="translate(-443.472 -147.331)">
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
          <li v-if="user.is_active">
            <nuxt-link
              :to="{
                name: 'workspace_id-workspace-settings-dam-instance_id-users-user_id-change-password',
                params: { ...$route.params, user_id: user.id },
              }"
            >
              <svg
                id="Layer_1"
                v-tooltip="'Change Password'"
                class="change-pass-icon h-orange"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 19.5 18"
                xml:space="preserve"
              >
                <g id="Group_4352" transform="translate(-486.506 -147.705)">
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
        </template>
        <li v-if="user.is_active">
          <a @click="$refs.deleteDialog.show()">
            <svg
              v-if="showingDeleted"
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
              <g id="incomplete-tasks" transform="translate(422.202 87.935)">
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
            <svg
              v-if="!showingDeleted"
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
      </ul>
    </div>
    <DeleteDialog
      ref="deleteDialog"
      :header-text="showingDeleted ? 'Active User' : 'Deactivate User'"
      @button:yes="deleteUser"
    >
      Are you sure you want to {{ showingDeleted ? 'active' : 'deactivate' }}
      <strong>{{ user.name || user.email }}</strong> user?
    </DeleteDialog>
    <DeleteDialog
      ref="deleteInvitationDialog"
      :header-text="'Delete Invitation Record'"
      @button:yes="deleteUserInvitation"
    >
      Are you sure you want to delete the invited user?
    </DeleteDialog>
    <ActivityModal ref="activityModal" :selected-user-id="selectedUserId" />
    <!-- for support only -->
    <!-- change password to activate user -->
    <div
      v-if="IS_SUPPORT_PLATFORM"
      :class="{ visible: showUserActiveDialog }"
      class="fixed-static-dialog sm"
    >
      <div class="modal-small modal-dialog-scrollable modal-dialog-centered">
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
              @click="showUserActiveDialog = false"
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
          <div class="modal-body" style="padding: 20px">
            <div class="form-group required">
              <label for="" class="control-label">New Password</label>
              <input
                v-model="userNewPwd"
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
                @click="showUserActiveDialog = false"
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
  </li>
</template>

<script>
import DeleteDialog from '~/components/plugins/DeleteDialog.vue'
import ActivityModal from '~/components/dam/Dialogs/ActivityModal.vue'
import routeParams from '~/mixins/routeParams'

export default {
  components: { DeleteDialog, ActivityModal },
  mixins: [routeParams],
  props: {
    user: { type: Object, required: true },
    showingDeleted: { type: Boolean, required: false },
    hideActivity: Boolean,
    userFilter: { type: String, default: 'active' },
  },
  data() {
    return {
      selectedUserId: '',
      userNewPwd: '',
      activatingUser: false,
      activateDialogKey: 0,
      showUserActiveDialog: false,
    }
  },
  computed: {
    IS_SUPPORT_PLATFORM() {
      return process.env.IS_SUPPORT_PLATFORM
    },
  },
  methods: {
    activateUser() {
      if (
        !this.IS_SUPPORT_PLATFORM ||
        this.activatingUser ||
        this.user.is_active ||
        this.userFilter !== 'pending'
      )
        return
      this.activatingUser = true
      if (!this.userNewPwd) {
        this.activatingUser = false
        this.$toast.global.error('Enter a valid password!')
        return
      }
      if (this.userNewPwd.trim().length < 6) {
        this.activatingUser = false
        this.$toast.global.error('Password should have at least 6 characters!')
        return
      }
      if (this.userNewPwd.trim() !== this.$refs.activeUserRePwd.value.trim()) {
        this.activatingUser = false
        this.$toast.global.error('Both passwords must be exactly same!')
        return
      }
      this.$axios
        .$post('digital-assets/instance/dealer-activate', {
          workspace_id: this.$route.params.workspace_id,
          url_workspace_id: this.$route.params.workspace_id,
          user_id: this.user.id,
          password: this.userNewPwd.trim(),
        })
        .then((r) => {
          this.$toast.global.success(r.message || 'User activated succesfully.')
          this.$refs.activateUserDialogCancel.click()
          this.userNewPwd = ''
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.activatingUser = false
        })
    },
    toggleActivity(user) {
      this.selectedUserId = user.id
      this.$refs.activityModal.show()
    },
    async deleteUser() {
      this.deleting = true

      await this.$axios
        .$post('digital-assets/instance/delete-restore-user', {
          user_id: this.user.id,
          workspace_id: this.routeWorkspaceId,
          instance_id: this.routeInstanceId,
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.$emit('deleted', this.user)
        })
        .catch(this.$errorToast)

      this.deleting = false
    },
    async resendInvitation() {
      this.sending = true
      await this.$axios
        .$post('digital-assets/instance/user-resend-invitation', {
          workspace_id: this.routeWorkspaceId,
          instance_id: this.routeInstanceId,
          dealer_user_id: this.user.id,
        })
        .then(({ message, data }) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.user.is_revoke = data.is_revoke
          this.$toast.global.success(message)
        })
        .catch(this.$errorToast)
      this.sending = false
    },
    async revokeUser() {
      await this.$axios
        .$post('digital-assets/instance/revoke-invitation', {
          workspace_id: this.routeWorkspaceId,
          user_id: this.user.id,
        })
        .then(({ message, data }) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.user.is_revoke = data.is_revoke
          this.$toast.global.success(message)
        })
        .catch(this.$errorToast)
    },
    async deleteUserInvitation() {
      try {
        const data = await this.$axios.$post(
          '/digital-assets/instance/delete-user',
          {
            workspace_id: this.routeWorkspaceId,
            user_id: this.user.id,
          }
        )
        this.$toast.global.success(data.message)
        this.$emit('deleted', this.user)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
}
</script>

<style scoped>
.fixed-static-dialog.visible {
  display: block;
  border-radius: 4px;
  box-shadow: 0 0 1000px 1000px rgba(0, 0, 0, 0.675);
}
.fixed-static-dialog {
  position: fixed;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999;
}
.fixed-static-dialog.sm {
  max-width: 450px;
  width: 450px;
}
</style>

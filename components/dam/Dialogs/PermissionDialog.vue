<template>
  <Model
    header-text="Permissions"
    body-class="customscrollbar"
    centered
    hide-buttons
    model-footer
  >
    <div
      class="folderPermissionOption"
      :class="{ 'common-blur': !canUpdatePermission }"
    >
      <div class="form-group d-flex align-items-center">
        <label class="radio-label mr1">
          Public
          <input
            v-model="isPublic"
            type="radio"
            :value="isPublic"
            @click="changePermissionType('isPublic')"
          />
          <div class="radio-div" :class="{ active: isPublic }"></div>
        </label>
      </div>
      <div class="form-group d-flex align-items-center">
        <label class="radio-label mr1">
          Restrict From Frontend
          <input
            v-model="isFrontend"
            type="radio"
            :value="isFrontend"
            @click="changePermissionType('isFrontend')"
          />
          <div class="radio-div" :class="{ active: isFrontend }"></div>
        </label>
      </div>
      <div class="form-group d-flex align-items-center">
        <label class="radio-label w-audo">
          Restrict to Specific
          <input
            v-model="isUserGroup"
            type="radio"
            :value="isUserGroup"
            @click="changePermissionType('isUserGroup')"
          />
          <div class="radio-div" :class="{ active: isUserGroup }"></div>
        </label>
        <label class="label-switch label-switch2 no-text mr1">
          <strong>User</strong>
          <input
            v-model="permissionToGroup"
            type="checkbox"
            class="switch"
            @click="
              (e) => {
                if (isUserGroup) permissionToGroup = !permissionToGroup
                else e && e.preventDefault()
              }
            "
          />
          <span
            class="lable"
            :style="isUserGroup ? '' : 'pointer-events:none;opacity:0.4'"
          ></span>
          <strong>Group</strong>
        </label>
        <div
          v-show="isUserGroup"
          id="specificUser"
          class="inputDiv owner-dropdown owner-multiple"
        >
          <template v-if="!permissionToGroup">
            <i v-show="loadingUsers" class="fa fa-circle-o-notch fa-spin"></i>
            <Select2Multiple
              v-if="!loadingUsers"
              v-model="users"
              :dropdown-css-class="'owner-select'"
              :options="allUsers"
              :class="'select'"
              placeholder="Select users"
              custom-event
              @changeFollower="users = $event || []"
            />
          </template>
          <template v-else>
            <i v-show="loadingGroups" class="fa fa-circle-o-notch fa-spin"></i>
            <Select2Multiple
              v-if="!loadingGroups"
              v-model="groups"
              :dropdown-css-class="'owner-select'"
              :options="allGroups"
              :class="'select'"
              placeholder="Select groups"
              custom-event
              @changeFollower="groups = $event || []"
            />
          </template>
        </div>
      </div>
    </div>
    <div v-if="!canUpdatePermission" class="common-overaly">
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
    <template #footer>
      <button
        type="button"
        class="btn"
        :class="{
          'btn-disabled': disabled,
          'common-blur': !canUpdatePermission,
        }"
        :disabled="disabled || !canUpdatePermission"
        :style="disabled ? 'pointer-events:none' : ''"
        @click="updatePermission()"
      >
        <i v-show="saving" class="fa fa-circle-o-notch fa-spin"></i>
        {{ saving ? 'Saving ...' : 'Save' }}
      </button>
    </template>
  </Model>
</template>
<script>
import Model from '~/components/plugins/Model'
import Select2Multiple from '~/components/plugins/Select2Multiple'
import routeParams from '~/mixins/routeParams'
export default {
  components: { Model, Select2Multiple },
  extends: Model,
  mixins: [routeParams],
  props: {
    collectionId: { type: [String, Number], required: false, default: null },
    folderId: { type: [String, Number], required: false, default: null },
    permission: {
      type: Object,
      required: false,
      default: () => ({ value: null, type: 'public' }),
    },
  },
  data() {
    return {
      permissionToGroup: false,
      isPublic: true,
      isFrontend: false,
      isUserGroup: false,
      users: [],
      allUsers: [],
      groups: [],
      allGroups: [],
      saving: false,
      loadingUsers: true,
      loadingGroups: true,
    }
  },
  computed: {
    canUpdatePermission() {
      if (this.collectionId) {
        return !!this.$auth.user?.subscription_features
          ?.collection_permission_customisation?.enable
      }
      return !!this.$auth.user?.subscription_features
        ?.folder_permission_customisation?.enable
    },
    disabled() {
      if (!this.canUpdatePermission) return false
      if (this.saving) return true
      if (this.isUserGroup) {
        if (this.permissionToGroup) return !this.groups.length
        return !this.users.length
      }
      return false
    },
  },
  watch: {
    model(n) {
      if (n) {
        this.getUsers()
        this.getGroups()
        this.initPermissions()
      }
    },
    permission: {
      handler(n) {
        this.initPermissions()
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    initPermissions() {
      const _permission = {
        ...(this.permission || { value: null, type: null }),
      }
      if (_permission.type === 'public') {
        this.isPublic = true
        this.permissionToGroup = false
        this.isFrontend = false
        this.isUserGroup = false
        this.users = []
        this.groups = []
      } else if (_permission.type === 'user') {
        this.isPublic = false
        this.permissionToGroup = false
        if (_permission.value === 'all') {
          this.isFrontend = true
          this.isUserGroup = false
          this.users = []
          this.groups = []
        } else {
          this.isFrontend = false
          this.isUserGroup = true
          this.users = _permission.value.includes(',')
            ? _permission.value.split(',')
            : [_permission.value]
          this.groups = []
        }
      } else if (_permission.type === 'group') {
        this.isPublic = false
        this.permissionToGroup = true
        this.isFrontend = false
        this.isUserGroup = true
        this.users = []
        this.groups = _permission.value.includes(',')
          ? _permission.value.split(',')
          : [_permission.value]
      }
    },
    getUsers() {
      if (!this.canUpdatePermission) return
      this.loadingUsers = true
      this.$axios
        .$post('digital-assets/group/dam-user', {
          workspace_id: this.$getWorkspaceId(),
          instance_id: this.routeInstanceId,
        })
        .then(({ data }) => {
          this.allUsers = data.map((e) => ({
            ...e,
            text: e.name,
            display_profile_image: e.profile_image,
          }))
        })
        .catch((_) => {})
        .finally(() => (this.loadingUsers = false))
    },
    getGroups() {
      if (!this.canUpdatePermission) return
      this.loadingGroups = true
      this.$axios
        .$get('digital-assets/group/group_list', {
          params: { workspace_id: this.$getWorkspaceId() },
        })
        .then(({ data }) => {
          this.allGroups = data.data.map((e) => ({
            ...e,
            text: e.group_name,
            display_profile_image: e.display_group_icon,
            profile_image: e.display_group_icon,
          }))
        })
        .catch((_) => {})
        .finally(() => (this.loadingGroups = false))
    },
    changePermissionType(key) {
      if (!this.canUpdatePermission) return
      this.isPublic = false
      this.isFrontend = false
      this.isUserGroup = false
      this[key] = true
    },
    updatePermission() {
      if (!this.canUpdatePermission) return
      if (this.saving) return
      this.saving = true
      const params = { workspace_id: this.$getWorkspaceId() }

      if (this.collectionId) params.collection_id = this.collectionId
      else if (this.folderId) params.category_id = this.folderId

      if (this.isPublic) {
        params.permission_type = 'public'
      } else if (this.isUserGroup) {
        if (this.permissionToGroup) {
          params.permission_type = 'group'
          params.dam_user_id = this.groups.map((e) => parseInt(e))
        } else {
          params.permission_type = 'user'
          params.dam_user_id = this.users.map((e) => parseInt(e))
        }
      } else if (this.isFrontend) {
        params.permission_type = 'user'
        params.dam_user_id = 'all'
      }
      const endpoint = this.collectionId
        ? 'digital-assets/permission/collection-permission'
        : 'digital-assets/permission/folder-permission'
      this.$axios
        .$post(endpoint, params)
        .then(() => {
          this.$toast.global.success('Permissions updated successfully.')
          this.$emit('permission-updated', {
            type: params.permission_type,
            value:
              params.permission_type === 'group'
                ? this.allGroups.filter((e) =>
                    this.groups.map((g) => parseInt(g)).includes(parseInt(e.id))
                  )
                : Array.isArray(params.dam_user_id)
                ? params.dam_user_id.join(',')
                : params.dam_user_id,
          })
          this.hide()
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.saving = false
        })
    },
  },
}
</script>

<style scoped>
label.radio-label div.radio-div {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  left: 0;
  height: 16px;
  width: 16px;
  line-height: 16px;
  background-color: #ffffff;
  border: 1px solid #707070;
  border-radius: 100%;
}
label.radio-label div.radio-div:after {
  display: none;
}
label.radio-label div.radio-div.active {
  border-color: #0361cf;
}
label.radio-label div.radio-div.active:after {
  content: '';
  position: absolute;
  display: block;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #0361cf;
}
</style>

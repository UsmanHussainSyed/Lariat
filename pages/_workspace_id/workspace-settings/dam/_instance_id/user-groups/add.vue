<template>
  <div
    class="general-settings-right h-100"
    :class="{ 'warning-massage': !globalNotification }"
  >
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
      <h4>Add Group</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="workspace-setting-left addGroups">
            <div class="general-settings-box customscrollbar">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="img-upload imgwidth-input">
                      <div class="img-upload-img">
                        <!-- <span>k</span> -->
                        <div class="v-center">
                          <img :src="logo" alt="" />
                        </div>
                      </div>
                      <div class="img-upload-alt">
                        <span>Group Picture</span>
                        <small class="upload-note"
                          >Upload Square picture for best viewing
                          experience</small
                        >
                        <div class="file-select">
                          <div class="file-select-name">Edit</div>
                          <div class="file-field-box">
                            <input
                              ref="logoInput"
                              type="file"
                              name="upload"
                              accept="image/*"
                              @change="onLogoUpload"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <WorkspaceNote />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Group Name</label>
                    <input
                      v-model.lazy="$v.groupName.$model"
                      type="text"
                      class="form-control"
                    />
                    <div v-if="$v.groupName.$error" class="input-error">
                      Please enter a name for your group
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Group Users</label>
                    <div class="owner-dropdown owner-multiple">
                      <Select2Multiple
                        v-model="groupUsers"
                        :dropdown-css-class="'owner-select'"
                        :options="allUsers"
                        :class="'select'"
                        custom-event
                        @changeFollower="groupUsers = $event || []"
                      />
                      <div v-if="$v.groupUsers.$error" class="input-error">
                        Please select at least one user<template
                          v-if="groupName"
                        >
                          for <strong>{{ groupName }}</strong></template
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group mb0">
                    <button
                      :disabled="disabled"
                      class="btn"
                      :class="{
                        'btn-disable': disabled,
                      }"
                      @click="addGroup()"
                    >
                      <i
                        v-show="loading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                      {{ loading ? 'Adding...' : 'Add Group' }}
                    </button>
                    <button
                      name="cancel"
                      class="btn btn-gray"
                      @click="onCancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Select2Multiple from '~/components/plugins/Select2Multiple'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
export default {
  components: { WorkspaceNote, Select2Multiple },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      allUsers: [],
      groupName: '',
      groupUsers: [],
      loading: false,
      imageData: null,
      imageFile: null,
    }
  },
  computed: {
    disabled() {
      return this.loading || !this.groupName.length || !this.groupUsers.length
    },
    logo() {
      return this.imageData || require('~/assets/img/icon/add-user.svg')
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
  },
  mounted() {
    this.$store.dispatch('dam/getNotifications')
    this.$axios
      .$post('digital-assets/group/dam-user', {
        workspace_id: this.$route.params.workspace_id,
        instance_id: this.$route.params.instance_id,
      })
      .then(({ data }) => {
        this.allUsers = data.map((e) => ({
          ...e,
          text: e.name,
          display_profile_image: e.profile_image,
        }))
      })
  },
  methods: {
    addGroup() {
      if (this.disabled) return

      this.$v.$touch()
      if (this.$v.groupUsers.$error || this.$v.groupName.$error) return

      this.loading = true
      const { workspace_id, instance_id } = this.$route.params
      const formData = new FormData()
      formData.append('workspace_id', workspace_id)
      formData.append('group_name', this.groupName)
      formData.append('group_icon', this.imageFile)
      formData.append('instance_id', instance_id)
      this.groupUsers.forEach((e, i) =>
        formData.append('group_user[' + i + ']', e)
      )
      this.$axios
        .$post('digital-assets/group/create', formData)
        .then(() => {
          this.$toast.global.success('User group created successfully.')
          setTimeout(() => {
            this.onCancel()
          }, 800)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.loading = false
        })
    },
    onCancel() {
      this.$router.push({
        name: 'workspace_id-workspace-settings-dam-instance_id-user-groups',
        params: this.$route.params,
      })
    },
    onLogoUpload({ target: { files = [] } = {} }) {
      const file = files[0]
      const twoMb = 2097152
      if (!file) {
        this.$refs.logoInput.value = ''
        return
      }
      if (!file.type?.match('image.*')) {
        this.$toast.global.error('Please choose an image file.')
        return
      }
      if (file.size >= twoMb) {
        this.$refs.logoInput.value = ''
        this.$toast.global.error('File size should not be more than 2MB.')
        return
      }
      this.imageFile = file
      const reader = new FileReader()
      reader.onload = (e) => (this.imageData = e.target.result)
      reader.readAsDataURL(file)
      this.$refs.logoInput.value = ''
    },
  },
  validations: {
    groupName: { required, minLen: 1 },
    groupUsers: {
      required,
      minLen: 1,
    },
  },
}
</script>

<style scoped></style>

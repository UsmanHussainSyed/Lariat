<template>
  <div class="single-screen choose-work choose-email">
    <div class="sign-screen-dtable">
      <div class="sign-screen-dtable-cell">
        <div class="sign-screen-right-content cs-form-group">
          <div
            v-if="general_msg == 'Token expired'"
            class="sign-heading-text text-center signin-with-title"
          >
            <img class="logo" src="" alt="Lariat" @click="loginPage" />
            <h2>The link you followed has expired</h2>
          </div>
          <div
            v-if="
              general_msg == 'You are not Authorized person to access this URL.'
            "
            class="sign-heading-text text-center signin-with-title"
          >
            <img class="logo" src="" alt="Lariat" @click="loginPage" />
            <h4>{{ general_msg }}</h4>
          </div>
          <div
            v-if="workspaceList.length"
            class="sign-heading-text text-center signin-with-title"
          >
            <img class="logo" src="" alt="Lariat" @click="loginPage" />
            <p>Accept Project Invitation</p>
          </div>
          <div v-if="workspaceList.length > 1">
            <div class="body-text mb-25 text-center">
              <p>
                <sapn class="text-primary">{{ sender_email }}</sapn> from the
                <span class="text-primary">{{ sender_workspace }}</span> wants
                to share a project <q class="text-primary">{{ project_name }}</q
                >with you.
              </p>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <select
                    v-model="workspace_id"
                    name="workspace"
                    class="form-control select"
                  >
                    <option
                      v-for="(workspace, index) in workspaceList"
                      :key="index"
                      :value="workspace.id"
                    >
                      {{ workspace.name }}
                    </option>
                  </select>
                  <label
                    v-if="$v.workspace_id.$error && !$v.workspace_id.required"
                    class="input-error"
                    >Please select workspace</label
                  >
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </div>
                <div class="form-group">
                  <select
                    v-model="ownerId"
                    name="workspace"
                    class="form-control select"
                  >
                    <option
                      v-for="(owner, index) in ownersList"
                      :key="index"
                      :value="owner.id"
                    >
                      {{ owner.name }}
                    </option>
                  </select>
                  <label
                    v-if="$v.ownerId.$error && !$v.ownerId.required"
                    class="input-error"
                    >Please select owner</label
                  >
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div class="row mt-25">
              <div class="col-sm-12">
                <button
                  type="button"
                  :class="{
                    btn: true,
                    'btn-disable': loading,
                  }"
                  :disabled="loading"
                  @click="acceptProjectInvitation()"
                >
                  <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                  Accept Invitation
                </button>
              </div>
            </div>
          </div>
          <div v-if="workspaceList.length == 1">
            <div class="body-text mb-25 text-center">
              <p>
                <sapn class="text-primary">{{ sender_email }}</sapn> from the
                <span class="text-primary">{{ sender_workspace }}</span> wants
                to share a project <q class="text-primary">{{ project_name }}</q
                >with you.
              </p>
            </div>
            <div class="row mt-25">
              <div class="col-sm-12">
                <button
                  type="button"
                  class="btn"
                  @click="acceptProjectInvitation()"
                >
                  Accept Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const checkZero = (value) => Number(value) >= 1
export default {
  middleware: 'authCheck',
  data() {
    return {
      invitation_token: this.$route.query.invitation_token
        ? decodeURI(this.$route.query.invitation_token)
        : null,
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      workspaceList: [],
      sender_email: null,
      sender_workspace: null,
      project_name: null,
      receiver_email: null,
      project_id: null,
      ownerId: this.$auth.user.id,
      ownersList: [],
      general_msg: null,
    }
  },
  watch: {
    workspace_id(newVal, oldVal) {
      if (newVal) {
        this.ownerId = this.$auth.user.id
        this.getWorkspaceOwnerList()
      }
    },
  },
  async mounted() {
    // set project invitation token
    if (this.$auth.loggedIn) {
      try {
        const { data } = await this.$axios.$post(
          '/project/sharing/invitation-accept',
          {
            token: this.invitation_token,
          }
        )
        if (data.workspace && data.workspace.length === 1) {
          this.workspace_id = data.workspace[0].id
          this.workspaceList = data.workspace
          this.invitation_token = data.token
        }
        if (data.workspace && data.workspace.length > 1) {
          this.workspaceList = data.workspace
          this.invitation_token = data.token
        }
        this.project_id = data.project_id
        this.sender_email = data.sender_email
        this.project_name = data.project_name
        this.sender_workspace = data.sender_workspace
        this.receiver_email = data.receiver_email
        this.getWorkspaceOwnerList()
      } catch (e) {
        const { data } = e.response
        this.general_msg = data.message
        this.loading = false
      }
    }
  },
  methods: {
    loginPage() {
      this.$router.push('/')
    },
    async getWorkspaceOwnerList() {
      try {
        const { data } = await this.$axios.$get(
          `dashboard/workspace-users?workspace_id=${this.workspace_id}&shared_workspace_id=${this.workspace_id}&url_workspace_id=${this.workspace_id}`
        )
        this.ownersList = data.users
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
        this.loading = false
      }
    },
    async acceptProjectInvitation() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        const data = await this.$axios.$post(
          '/project/sharing/share-project-accept',
          {
            token: this.invitation_token,
            workspace_id: this.workspace_id,
            owner_id: this.ownerId,
            url_workspace_id: this.workspace_id,
          }
        )
        if (data.status === false) {
          this.$toast.error(data.message)
          this.loading = false
        }
        if (data.status === true) {
          this.$toast.global.success(data.message)
          this.$router.push({
            name: 'workspace_id-project-project_id',
            params: {
              workspace_id: this.workspace_id,
              project_id: this.project_id,
            },
          })
        }
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
        this.loading = false
      }
    },
  },
  validations: {
    workspace_id: { checkZero },
    ownerId: { checkZero },
  },
}
</script>

<style scoped></style>

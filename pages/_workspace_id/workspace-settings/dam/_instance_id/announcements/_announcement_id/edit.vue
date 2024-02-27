<template>
  <div class="general-settings-right h-100">
    <div class="search-result mt1 pl10 pr10">
      <div v-if="isPastDate" class="alert alert-warning alert-dismissible">
        your scheduled date is
        <strong>{{ displayFormattedDate }} </strong> which is a past date, so
        please select valid date
      </div>
    </div>
    <div class="general-settings-title">
      <h4>Edit Announcement</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="workspace-setting-left addGroups">
            <div class="general-settings-box customscrollbar">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <WorkspaceNote />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required w-75">
                    <label class="control-label">Announcement Name</label>
                    <input
                      v-model="$v.name.$model"
                      type="text"
                      class="form-control"
                    />
                    <div
                      v-if="$v.name.$error && !$v.name.required"
                      class="input-error"
                    >
                      Please enter announcement name
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Description</label>
                    <client-only>
                      <vue-editor
                        v-model="$v.description.$model"
                        :editor-toolbar="customToolbar"
                      />
                    </client-only>

                    <div
                      v-if="$v.description.$error && !$v.description.required"
                      class="input-error"
                    >
                      Please enter announcement description
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required w-50">
                    <label class="control-label">Schedule Date: </label>
                    <DatePicker
                      :class-obj="'datepicker form-control'"
                      :start-date.sync="$v.scheduledDate.$model"
                      :min-date="$moment().format('YYYY-MM-DD')"
                    />
                    <div
                      v-if="
                        $v.scheduledDate.$error && !$v.scheduledDate.required
                      "
                      class="input-error"
                    >
                      Please select the schedule date (Publish Date)
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Publish for</label>
                    <div class="radio-group">
                      <label class="radio-label">
                        All
                        <input
                          v-model="userType"
                          type="radio"
                          name="users"
                          value="all"
                        />
                        <span class="radio-span"></span>
                      </label>
                      <label class="radio-label">
                        Admin
                        <input
                          v-model="userType"
                          value="admin"
                          type="radio"
                          name="users"
                        />
                        <span class="radio-span"></span>
                      </label>
                      <label class="radio-label">
                        Frontend User
                        <input
                          v-model="userType"
                          value="front_end_user"
                          type="radio"
                          name="users"
                        />
                        <span class="radio-span"></span>
                      </label>
                      <label class="radio-label">
                        Choose specific
                        <input
                          v-model="userType"
                          type="radio"
                          value="choose_specific"
                          name="users"
                        />
                        <span class="radio-span"></span>
                      </label>
                    </div>
                    <div
                      v-if="userType == 'choose_specific'"
                      class="owner-dropdown owner-multiple mt10"
                    >
                      <Select2Multiple
                        v-model="$v.selectedUsers.$model"
                        class="owner-select"
                        :dropdown-css-class="'owner-select'"
                        :custom-event="true"
                        placeholder="Add Users"
                        :options="users"
                        @changeFollower="userChanged(...arguments)"
                      />
                    </div>
                    <div
                      v-if="
                        $v.selectedUsers.$error && !$v.selectedUsers.required
                      "
                      class="input-error"
                    >
                      Please select the users
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group mb0">
                    <template v-if="scheduledDate">
                      <button
                        v-if="isTodayDate"
                        class="btn btn-icon"
                        :disabled="isPastDate || loading"
                        @click="publish"
                      >
                        <PlaneIcon />
                        Publish Now
                      </button>
                      <button
                        v-if="!isTodayDate"
                        class="btn btn-icon"
                        :disabled="isPastDate || loading"
                        @click="scheduled"
                      >
                        <ClockIcon />
                        Scheduled at {{ displayFormattedDate }}
                      </button>
                    </template>
                    <template v-else>
                      <button
                        class="btn btn-icon"
                        :disabled="isPastDate || loading"
                        @click="publish"
                      >
                        <PlaneIcon />
                        Publish Now
                      </button>
                    </template>

                    <button
                      class="btn btn-gray btn-icon"
                      :disabled="isPastDate || loading"
                      @click="saveAsDraft"
                    >
                      <DraftIcon />
                      Save as Draft
                    </button>
                    <nuxt-link
                      :to="{
                        name: 'workspace_id-workspace-settings-dam-instance_id-announcements-list',
                        params: $route.params,
                      }"
                      class="btn btn-gray btn-icon"
                    >
                      <DeleteIcon />
                      Discard
                    </nuxt-link>
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
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import DatePicker from '~/components/plugins/DatePicker'
import Select2Multiple from '~/components/plugins/Select2Multiple'
export default {
  components: { Select2Multiple, DatePicker, WorkspaceNote },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      customToolbar: [['bold', 'italic', 'underline', 'link']],
      announcement_id: this.$route.params.announcement_id,
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      name: '',
      description: '',
      scheduledDate: '',
      selectedUsers: [],
      users: [],
      userType: 'all',
      userTypes: [
        { id: 'all', text: 'All' },
        { id: 'internal_user', text: 'Internal User' },
        { id: 'client', text: 'Client' },
        { id: 'choose_specific', text: 'Choose Specific' },
      ],
      isDrafted: 0,
      isScheduled: 0,
      loading: false,
    }
  },
  computed: {
    apiFormattedDate() {
      return this.$moment(this.scheduledDate).local().format('YYYY-MM-DD')
    },
    displayFormattedDate() {
      return this.$moment(this.scheduledDate).local().format('MMM DD, YYYY')
    },
    isTodayDate() {
      return this.$moment(this.scheduledDate).local().isSame(new Date(), 'day')
    },
    isPastDate() {
      return this.$moment(this.scheduledDate)
        .local()
        .isBefore(new Date(), 'day')
    },
    isFutureDate() {
      return this.$moment(this.scheduledDate).local().isAfter(new Date(), 'day')
    },
  },
  mounted() {
    this.getUsers()
    this.getAnnouncement()
  },
  methods: {
    async getUsers() {
      const { data } = await this.$axios.$get(
        `announcement/users?workspace_id=${this.internal_workspace_id}&module_id= 2`
      )
      this.users = data.users
    },
    userChanged(data) {
      this.selectedUsers = data === null ? [] : data
    },
    saveAsDraft() {
      this.isDrafted = 1
      this.isScheduled = 0
      this.handleSubmit()
    },
    publish() {
      this.isDrafted = 0
      this.isScheduled = 0
      this.handleSubmit()
    },
    scheduled() {
      this.isDrafted = 0
      this.isScheduled = 1
      this.handleSubmit()
    },
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        const selectedUsersData = this.users
          .filter((obj) => {
            return this.selectedUsers.find((o) => o === obj.id)
          })
          .map((obj) => ({
            id: obj.user_id,
            user_type: obj.user_type,
          }))
        await this.$axios.$post(`announcement/update`, {
          announcement_id: this.announcement_id,
          workspace_id: this.internal_workspace_id,
          title: this.name,
          description: this.description,
          publish_date: this.apiFormattedDate,
          user_type: this.userType,
          is_scheduled: this.isScheduled,
          is_draft: this.isDrafted,
          users: this.userType === 'choose_specific' ? selectedUsersData : [],
          module_id: 2,
        })
        this.loading = true
        this.$toast.global.success('Announcement has been successfully updated')
        await this.$router.push({
          name: 'workspace_id-workspace-settings-dam-instance_id-announcements-list',
          params: this.$route.params,
        })
      } catch (e) {
        this.loading = true
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async getAnnouncement() {
      try {
        const { data } = await this.$axios.$get(
          `announcement/view?workspace_id=${this.internal_workspace_id}&announcement_id=${this.announcement_id}&module_id= 2`
        )
        this.name = data.title
        this.description = data.description
        this.userType = data.user_type
        this.scheduledDate = data.publish_date
        this.selectedUsers = data.users_details.map(({ id }) => id)
      } catch (e) {
        const { data } = e.response
        if (data.code === 403) {
          return this.$router.push({
            name: 'workspace_id-workspace-settings-dam-instance_id-announcements-list',
            params: this.$route.params,
          })
        }
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations() {
    if (this.userType === 'choose_specific') {
      return {
        name: { required },
        description: { required },
        scheduledDate: { required },
        selectedUsers: { required },
      }
    } else {
      return {
        name: { required },
        description: { required },
        scheduledDate: { required },
        selectedUsers: {},
      }
    }
  },
}
</script>

<style scoped></style>

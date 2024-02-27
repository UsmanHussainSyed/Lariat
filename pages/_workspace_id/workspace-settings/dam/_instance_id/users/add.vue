<template>
  <div
    class="general-settings-right h-100"
    :class="{ 'warning-massage': !globalNotification }"
  >
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
      <h4>DAM Settings</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-6 col-md-12 h-100">
          <div class="general-settings-box customscrollbar">
            <form class="row" @submit.prevent="handleSubmit">
              <div class="col-sm-12">
                <div class="form-group">
                  <div class="img-upload imgwidth-input">
                    <div class="img-upload-img">
                      <div class="v-center">
                        <img
                          :src="
                            logo.src ||
                            require('~/assets/img/icon/add-user.svg')
                          "
                          alt
                        />
                      </div>
                    </div>
                    <div class="img-upload-alt">
                      <span>Profile Picture</span>
                      <small class="upload-note">
                        Upload square logo for best viewing experience
                      </small>
                      <label class="file-select">
                        <div class="file-select-name">
                          {{
                            logo.src
                              ? 'Change  Profile Picture'
                              : ' Upload Profile Picture'
                          }}
                        </div>
                        <div class="file-field-box">
                          <input
                            ref="file"
                            type="file"
                            name="logo"
                            :accept="$fileAcceptInputImage"
                            hidden
                            @input="logoChange"
                          />
                        </div>
                      </label>
                      <div v-if="logo.src" class="file-remove-button">
                        <a
                          @click="
                            logo = { src: null, file: null }
                            $refs.file.value = null
                          "
                        >
                          Remove
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group required">
                  <label class="control-label">Full Name</label>
                  <input
                    v-model.trim="user.name"
                    class="form-control"
                    type="text"
                    placeholder="John doe"
                  />
                  <div v-if="$v.user.name.$error" class="input-error">
                    <template v-if="!$v.user.name.required">
                      Please provide full name
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group required">
                  <label class="control-label">Email Address</label>
                  <input
                    v-model.trim="user.email"
                    class="form-control"
                    type="text"
                    autocomplete="username"
                    placeholder="johndoe@abc.com"
                  />
                  <div v-if="$v.user.email.$error" class="input-error">
                    <template v-if="!$v.user.email.required">
                      Please provide email
                    </template>
                    <template v-else-if="!$v.user.email.email">
                      Please provide a valid email address
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Phone</label>
                  <input
                    v-model.trim="user.phone"
                    class="form-control"
                    type="text"
                  />
                  <div v-if="$v.user.phone.$error" class="input-error">
                    <template v-if="!$v.user.phone.maxLength">
                      Please provide a valid phone number
                    </template>
                  </div>
                </div>
              </div>
              <!--              <div class="col-sm-12">
                <div class="form-group required">
                  <label class="control-label">Password</label>
                  <input
                    v-model.trim="user.password"
                    class="form-control"
                    autocomplete="new-password"
                    type="password"
                  />
                  <div v-if="$v.user.password.$error" class="input-error">
                    <template v-if="!$v.user.password.required">
                      Please provide password
                    </template>
                    <template v-else-if="!$v.user.password.minLength">
                      Password must be at least 6 characters
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group required">
                  <label class="control-label">Confirm password</label>
                  <input
                    v-model.trim="user.confirmPassword"
                    class="form-control"
                    autocomplete="confirm-password"
                    type="password"
                  />
                  <div
                    v-if="$v.user.confirmPassword.$error"
                    class="input-error"
                  >
                    <template v-if="!$v.user.confirmPassword.required">
                      Please provide confirm password
                    </template>
                    <template v-else-if="!$v.user.confirmPassword.sameAs">
                      Password must match with confirm password
                    </template>
                  </div>
                </div>
              </div>-->
              <div class="col-sm-12">
                <button
                  type="submit"
                  class="btn"
                  :class="{ 'btn-disable': loading }"
                  :disabled="loading"
                >
                  <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>

                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
import routeParams from '~/mixins/routeParams'

export default {
  mixins: [routeParams],
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      user: {
        name: '',
        email: '',
        phone: '',
      },
      logo: { src: null, file: null },
      loading: false,
    }
  },
  computed: {
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
  },
  mounted() {
    this.$store.dispatch('dam/getNotifications')
  },
  methods: {
    async handleSubmit() {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true

      const formData = new FormData()

      formData.append('profile_image', this.logo.file)
      formData.append('name', this.user.name)
      formData.append('email', this.user.email)
      formData.append('phone', this.user.phone)
      formData.append('workspace_id', this.routeWorkspaceId)
      formData.append('instance_id', this.routeInstanceId)

      if (this.logo.file) formData.append('logo', this.logo.file)

      await this.$axios
        .$post('digital-assets/instance/create-user', formData)
        .then(({ data, message }) => {
          this.$toast.global.success(message || data?.message)

          this.$router.push({
            name: 'workspace_id-workspace-settings-dam-instance_id-users',
            params: {
              ...this.$route.params,
            },
          })
        })
        .catch(this.$errorToast)
      this.loading = false
    },
    logoChange({ target }) {
      const minSize = 2097152 * 2 // 4 mb
      const {
        files: [file],
      } = target

      if (!file) {
        return
      }
      if (!file.type.match('image.*')) {
        this.$toast.global.error('Please choose an image file')
        return
      }

      if (file.size > minSize) {
        target.value = null
        this.$toast.global.error('File size should not be more than 4MB')
        return
      }

      const reader = new FileReader()

      reader.onload = ({ target: { result } }) => {
        this.logo = { file, src: result }
        target.value = null
      }

      reader.readAsDataURL(file)
    },
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      phone: { maxLength: maxLength(20) },
    },
  },
}
</script>

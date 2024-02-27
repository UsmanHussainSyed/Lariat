<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div v-if="!subscriptionFetched" class="overlay">
      <div class="loader"></div>
    </div>
    <template v-else>
      <div  class="common-overaly">
                          <div class="common-modal">
                            <div class="common-modal-header">
                              
                            </div>
                            <div class="common-modal-body text-center">
                              <p>
                                This feature only accessible from web view.

                                <br /> Kindly open your DAM in web application.<br/> app.marketinghub.com
                              </p>
                            </div>
                          </div>
                        </div>
      
    </template>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapGetters } from 'vuex'
import { TransitionExpand } from 'vue-transition-expand'
import 'vue-transition-expand/dist/vue-transition-expand.css'
import InternalIntegration from './internal'
import ExternalIntegration from './external'
export default {
  components: { InternalIntegration, ExternalIntegration, TransitionExpand },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      DROPBOX_CONNECT_URI:
        process.env.DROPBOX_OAUTH_URI +
        '?client_id=' +
        process.env.DROPBOX_APP_ID +
        '&response_type=code' +
        '&redirect_uri=' +
        process.env.DROPBOX_AUTH_REDIRECT +
        '&state=' +
        [this.$route.params.workspace_id, this.$route.params.instance_id].join(
          '_'
        ),
      active: '',
      addNewType: '',
      addNewSource: false,
      loading: false,
      showForm: false,
      externalIntegration: {
        name: '',
        url: '',
      },
      extIntOriginal: null,
      formKey: 0,
      subscriptionFetched: false,
      subscriptionData: {},
    }
  },
  computed: {
    ...mapGetters({
      DROPBOX_TOKEN: 'dropbox/token',
      DROPBOX_ICON: 'dropbox/icon',
      DROPBOX_USER: 'dropbox/user',
      DROPBOX_DISCONNECTED: 'dropbox/disconnected',
      DRIVE_ACCESS_TOKEN: 'drive/accessToken',
      DRIVE_REFRESH_TOKEN: 'drive/refreshToken',
      DRIVE_ICON: 'drive/icon',
      DRIVE_USER: 'drive/user',
      BOX_ACCESS_TOKEN: 'box/accessToken',
      BOX_REFRESH_TOKEN: 'box/refreshToken',
      BOX_ICON: 'box/icon',
      BOX_USER: 'box/user',
    }),
    // generate key button enable on change in external integration form
    isSame() {
      return this.$isSame(this.externalIntegration, this.extIntOriginal)
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    internalIntegrationEnabled() {
      return (
        this.dropboxEnabled ||
        this.dropboxEntEnabled ||
        this.boxEnabled ||
        this.driveEnabled
      )
    },
    externalIntegrationEnabled() {
      return !!this.subscriptionData.features.external_website_integration
        ?.enable
    },
    dropboxEnabled() {
      const features = this.subscriptionData.features
      return features.dropbox_integration?.enable
    },
    dropboxEntEnabled() {
      const features = this.subscriptionData.features
      return features.dropbox_enterprise_integration?.enable
    },
    boxEnabled() {
      const features = this.subscriptionData.features
      return features.box_integration?.enable
    },
    driveEnabled() {
      const features = this.subscriptionData.features
      return features.google_drive_integration?.enable
    },
  },
  async mounted() {
    await this.fetchSubscription()
    if (!this.internalIntegrationEnabled && this.externalIntegrationEnabled)
      this.active = 'external'
    else this.active = 'internal'
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  created() {
    // keeping the old form to compare for enabling generate key button
    this.extIntOriginal = Object.freeze({ ...this.externalIntegration })
    this.$store.dispatch('dam/getNotifications')
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
    /**
     * Initiates box integration
     */
    connectBox() {
      axios
        .get('/box/connect', {
          params: {
            workspaceId: this.$route.params.workspace_id,
            instanceId: this.$route.params.instance_id,
          },
        })
        .then((r) => {
          location.href = r.data
        })
        .catch(console.error)
    },
    /**
     * Initiates google drive integration
     */
    internalTab() {
      this.active = 'internal'
      this.showForm = false
      this.addNewType = ''
    },
    // adding new external integration
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      this.externalIntegration.workspace_id = this.$getWorkspaceId()
      await this.$axios
        .$post(`generate-app-key`, this.externalIntegration)
        .then((response) => {
          this.$toast.global.success(response.message)
          this.$refs.externalIntegration.getList()
          this.$v.$reset()
          this.externalIntegration = { name: '', url: '' }
          this.loading = false
          this.extIntOriginal = Object.freeze({ ...this.externalIntegration })
          this.showForm = false
        })
        .catch((e) => {
          const urlError = (e?.response?.data?.error?.url || [])[0]
          this.$toast.global.error(urlError || this.$getErrorMessage(e))
        })
        .finally(() => {
          this.loading = false
        })
    },
    authorize() {
      const workspace_id = this.$route.params.workspace_id
      const dam_id = this.$store.state.dam.damInstance?.id
      const uri =
        window.location.origin +
        '/driveapi/access-drive' +
        `?dam_id=${dam_id}&workspace_id=${workspace_id}`
      axios
        .get(uri)
        .then((res) => {
          if (res) {
            this.client = res.data.client
            location.href = res.data.url
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  validations: {
    externalIntegration: {
      name: {
        required,
        length: minLength(1),
      },
      url: {
        required,
        length: minLength(3),
        format(v) {
          // eslint-disable-next-line no-useless-escape
          return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gi.test(
            v
          )
        },
      },
    },
  },
}
</script>
<style scoped>
img.google_connect:hover {
  content: url('~/assets/img/google_signin_dark_focus_web.png');
}
img.google_connect:active {
  content: url('~/assets/img/google_signin_dark_pressed_web.png');
}
img.google_connect:focus {
  content: url('~/assets/img/google_signin_dark_pressed_web.png');
}
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

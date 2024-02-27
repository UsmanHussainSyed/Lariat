<template>
  <div class="body-content p0">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body bg-white choose-module">
              <p>Please Select Modules</p>
              <div class="module-box">
                <div class="row big-row justify-content-center">
                  <div class="col-md-4">
                    <div class="dflex">
                      <svg
                        id="Layer_1"
                        class="pm-icon blue"
                        style="height: 40px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_4066"
                          transform="translate(-332.715 -71.733)"
                        >
                          <path
                            id="Path_3158"
                            class="fill-color"
                            d="M349.7,73.7c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1c0.3,0,0.5,0.1,0.7,0.3c0.4,0.4,0.4,1,0,1.4C350.2,73.6,350,73.7,349.7,73.7z"
                          ></path>
                          <path
                            id="Path_3159"
                            class="fill-color"
                            d="M349.7,89.7c-0.5,0-1-0.4-1-1c0,0,0,0,0,0c0-0.5,0.4-1,1-1c0.5,0,1,0.4,1,1S350.3,89.7,349.7,89.7C349.7,89.7,349.7,89.7,349.7,89.7z"
                          ></path>
                          <path
                            id="Path_3160"
                            class="fill-color"
                            d="M341.7,89.7c-0.5,0-1-0.4-1-1v-0.3v-6.8h-6.4l-0.6,0c-0.5,0-1-0.4-1-1c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3h7.1v-6.4h0l0-0.7c0-0.5,0.4-1,1-1c0.5,0,1,0.4,1,1v7.1h7c0.3,0,0.5,0.1,0.7,0.3c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.4,0.3-0.7,0.3l-0.6,0v0h-6.4v6.9l0,0.2C342.7,89.3,342.2,89.7,341.7,89.7C341.7,89.7,341.7,89.7,341.7,89.7L341.7,89.7z"
                          ></path>
                          <path
                            id="Path_3161"
                            class="fill-color"
                            d="M333.7,73.7c-0.5,0-1-0.4-1-1s0.4-1,1-1c0.5,0,1,0.4,1,1c0,0.3-0.1,0.5-0.3,0.7C334.2,73.6,333.9,73.7,333.7,73.7z"
                          ></path>
                          <path
                            id="Path_3162"
                            class="fill-color"
                            d="M333.7,89.7c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1c0.3,0,0.5,0.1,0.7,0.3c0.4,0.4,0.4,1,0,1.4c0,0,0,0,0,0C334.2,89.6,333.9,89.7,333.7,89.7z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <label class="check-label"
                      >Projects
                      <input
                        v-model="selectedModules"
                        type="checkbox"
                        value="1"
                        data-lpignore="true"
                      />
                      <span class="check-span"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div v-if="enableButton" class="row">
                <div class="col-sm-12 text-center">
                  <button
                    type="submit"
                    :class="{
                      'cs-btn-orange btn-block': true,
                      'btn-disable': loading,
                    }"
                    :disabled="loading"
                    @click="handleSubmit"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Submit
                  </button>
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
import currentWorkspace from '~/mixins/currentWorkspace'

export default {
  mixins: [currentWorkspace],
  layout: 'projectLayout',
  middleware: ['authCheck', 'can-access-child-workspace'],
  data() {
    return {
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$auth.$storage.getCookie('currentWorkspace').id,
      loading: false,
      selectedModules: [],
    }
  },
  computed: {
    enableButton() {
      return !!this.selectedModules.length
    },
  },
  mounted() {
    this.$store.dispatch('dam/setBranding', {
      workspace_id: this.workspace_id,
      isSetFavicon: true,
    })
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        await this.$axios.$post('add-module-workspace', {
          workspace_id: this.workspace_id,
          module_id: this.selectedModules,
        })
        // Force re-fetch user using active strategy.
        await this.$auth.fetchUser()
        const workspaceId = this.$_auth().id
        // set current workspace
        workspaceId && this.$setCurrentWorkspace(workspaceId)
        return this.$router.push({
          name: this.$_auth().user.redirectPathName,
          params: { workspace_id: this.$_auth().id },
        })
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.loading = false
      }
    },
  },
}
</script>

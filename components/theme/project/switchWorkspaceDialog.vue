<template>
  <div id="switch-workspace" class="modal fade">
    <div
      class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <div class="d-flex align-items-center">
              <svg
                id="Layer_1"
                class="alert-icon orange mr-2"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                xml:space="preserve"
              >
                <path
                  class="fill-color"
                  d="M19.6,16.4L11.5,2.3c-0.3-0.6-0.9-1-1.5-1.1C9.3,1.3,8.8,1.7,8.5,2.3L0.4,16.4C-0.5,17.8,0.2,19,1.9,19h16.2
                        C19.8,19,20.5,17.8,19.6,16.4z M11,16H9v-2h2V16z M11,12H9V6h2V12z"
                />
              </svg>
              Authorization
            </div>
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
          <p>You are not authorized person to access this workspace.</p>
        </div>
        <div class="modal-footer no-border p0">
          <a
            href="javascript:void(0);"
            class="btn btn-big btn-icon"
            @click="logout"
          >
            <svg
              id="Layer_1"
              class="switch-workspace-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Switch_Workspace_2">
                <g id="enter">
                  <path
                    id="Path_40245"
                    class="fill-color"
                    d="M7.7,8.4H0.6C0.3,8.4,0,8.2,0,7.9c0-0.3,0.2-0.5,0.5-0.5h7.1c0.3,0,0.6,0.3,0.5,0.6C8.2,8.2,8,8.4,7.7,8.4z"
                  />
                  <path
                    id="Path_40246"
                    class="fill-color"
                    d="M4.9,11.2c-0.3,0-0.6-0.3-0.6-0.6c0-0.1,0.1-0.3,0.2-0.4l2.4-2.4L4.5,5.5c-0.2-0.2-0.2-0.6,0-0.8s0.6-0.2,0.8,0l2.8,2.8c0.2,0.2,0.2,0.6,0,0.8c0,0,0,0,0,0l-2.8,2.8C5.2,11.2,5,11.3,4.9,11.2z"
                  />
                  <path
                    id="Path_40247"
                    class="fill-color"
                    d="M12,18c-0.8,0-1.5-0.7-1.5-1.5V3c0-0.6,0.4-1.2,1-1.4L16,0.1c0.8-0.3,1.7,0.2,1.9,1C18,1.2,18,1.4,18,1.5V15c0,0.6-0.4,1.2-1,1.4l-4.5,1.5C12.3,18,12.2,18,12,18L12,18z M16.5,1.1c0,0-0.1,0-0.1,0l-4.5,1.5c-0.2,0.1-0.3,0.2-0.3,0.4v13.5c0,0.2,0.2,0.4,0.4,0.4c0,0,0.1,0,0.1,0l4.5-1.5c0.2-0.1,0.3-0.2,0.3-0.4V1.5C16.9,1.3,16.7,1.1,16.5,1.1C16.5,1.1,16.5,1.1,16.5,1.1L16.5,1.1z"
                  />
                  <path
                    id="Path_40248"
                    class="fill-color"
                    d="M6.6,3.8C6.3,3.7,6,3.5,6,3.2V2.1C6,0.9,6.9,0,8.1,0h8.4c0.3,0,0.6,0.3,0.5,0.6c0,0.3-0.2,0.5-0.5,0.5H8.1c-0.5,0-0.9,0.4-0.9,0.9v1.1C7.1,3.5,6.9,3.8,6.6,3.8z"
                  />
                  <path
                    id="Path_40249"
                    class="fill-color"
                    d="M11.1,15.8h-3c-1.1,0-2.1-0.9-2.1-2.1v-1.1C6,12.3,6.3,12,6.6,12c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.5,0.4,0.9,0.9,0.9h3c0.3,0,0.6,0.2,0.6,0.5C11.7,15.5,11.4,15.7,11.1,15.8C11.1,15.8,11.1,15.8,11.1,15.8z"
                  />
                </g>
              </g>
            </svg>
            Switch to {{ workspaceName }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  props: {
    workspaceName: { type: String },
  },
  mounted() {
    const vue = this
    vue.$dialog = window
      .$(vue.$el)
      .off('hidden.bs.modal')
      .off('shown.bs.modal')
      .on('hidden.bs.modal', function () {
        vue.model = false
      })
      .on('shown.bs.modal', function () {
        vue.model = true
      })
  },
  methods: {
    show() {
      this.$dialog.modal('show')
      this.$auth.$storage.removeUniversal('switchWorkspaceId')
    },
    async logout() {
      this.$dialog.modal('hide')
      await this.$logout()
    },
  },
}
</script>

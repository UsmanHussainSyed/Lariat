<template>
  <div class="general-settings-right h-100 w-100">
    <div class="general-settings-title">
      <h4>SharpSpring Form</h4>
      <div v-if="$_auth().user.lead.isSuperAdmin" class="right-side">
        <nuxt-link
          :to="{
            name: 'workspace_id-workspace-settings-sharpspring-form-add',
            params: {
              workspace_id: $_auth().id,
            },
          }"
          class="btn btn-icon"
        >
          <svg
            id="Layer_1"
            class="plus-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4454" transform="translate(-1005 -577.999)">
              <path
                id="Path_3394"
                class="fill-color"
                d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
              ></path>
              <path
                id="Path_3395"
                class="fill-color"
                d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
              ></path>
            </g>
          </svg>

          Add New Form</nuxt-link
        >
      </div>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view sharpspring-form small-height">
          <ul class="thead">
            <li>
              <div
                class="title sorting sortarrow flex30"
                :class="[sortBy === 'DESC' ? 'active descending' : '']"
              >
                <span
                  @click="
                    sortBy == 'ASC' ? (sortBy = 'DESC') : (sortBy = 'ASC')
                  "
                  >Title</span
                >
              </div>
              <div class="id sorting flex50">
                <span>Form ID</span>
              </div>
              <div class="status sorting flex10">
                <span>Status</span>
              </div>
              <div
                v-if="$_auth().user.lead.isSuperAdmin"
                class="sorting text-center flex10"
              >
                <span>Action</span>
              </div>
            </li>
          </ul>
          <div
            v-if="!isLoading && forms.length"
            class="customscrollbar no_footer"
          >
            <ul class="tbody">
              <li v-for="form of forms" :key="form.id">
                <div class="name tb-column flex30">
                  <label>{{ form.title }}</label>
                </div>
                <div class="id tb-column flex50">
                  <label>{{ form.form_id }}</label>
                </div>
                <div class="status tb-column flex10">
                  <div
                    :class="[
                      form.status === 1
                        ? 'form-status-check'
                        : 'form-status-uncheck',
                    ]"
                  >
                    <svg
                      v-if="form.status === 1"
                      id="Layer_1"
                      class="mark-complete-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4484" transform="translate(-872 -896)">
                        <path
                          id="Path_3407"
                          class="fill-color"
                          d="M878.2,911.2c-0.3,0-0.5-0.1-0.7-0.3l-5.3-5.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4.9,4.9l10.3-10.4c0.2-0.2,0.4-0.3,0.6-0.2c0.2,0,0.4,0.1,0.5,0.2c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0L878.9,911C878.7,911.1,878.5,911.2,878.2,911.2z"
                        ></path>
                      </g>
                    </svg>
                    <svg
                      v-else
                      id="Layer_1"
                      class="close-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4358"
                        transform="translate(-69.745 -317.549)"
                      >
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
                  </div>
                </div>
                <div class="tb-column flex10">
                  <ul v-if="$_auth().user.lead.isSuperAdmin" class="action">
                    <li>
                      <nuxt-link
                        v-tooltip="'Edit Form'"
                        :to="{
                          name: 'workspace_id-workspace-settings-sharpspring-form-id',
                          params: {
                            workspace_id: $_auth().id,
                            id: form.id,
                          },
                        }"
                      >
                        <svg
                          id="Layer_1"
                          class="edit-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4350"
                            transform="translate(-397.961 -147.331)"
                          >
                            <path
                              id="Path_3408"
                              class="fill-color"
                              d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                            ></path>
                            <path
                              id="Path_3409"
                              class="fill-color"
                              d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                            ></path>
                          </g>
                        </svg>
                      </nuxt-link>
                    </li>

                    <li>
                      <a
                        v-tooltip="'Delete Form'"
                        data-toggle="modal"
                        data-target="#delete-form"
                        @click="formDeletePrompt(form.id)"
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
                        >
                          <g
                            id="Group_4351"
                            transform="translate(-443.472 -147.331)"
                          >
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
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-else-if="!isLoading && forms.length <= 0"
            class="no-data-found"
          >
            <div class="inner w-100">
              <svg
                id="Layer_1"
                class="no-record-icon darkgray"
                style="height: 150px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 131.3 156.8"
                xml:space="preserve"
              >
                <g id="Group_4457" transform="translate(-190.348 -177.624)">
                  <path
                    id="Path_3564"
                    class="fill-color"
                    d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                  />
                  <path
                    id="Path_3565"
                    class="fill-color"
                    d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                  />
                </g>
              </svg>
              <p>You haven't added any Forms yet!</p>
              <nuxt-link
                :to="{
                  name: 'workspace_id-workspace-settings-sharpspring-form-add',
                  params: {
                    workspace_id: $_auth().id,
                  },
                }"
                class="btn btn-icon"
              >
                <svg
                  id="Layer_1"
                  class="plus-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4454" transform="translate(-1005 -577.999)">
                    <path
                      id="Path_3394"
                      class="fill-color"
                      d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                    ></path>
                    <path
                      id="Path_3395"
                      class="fill-color"
                      d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                    ></path>
                  </g>
                </svg>
                Add New Form</nuxt-link
              >
            </div>
          </div>
          <div v-else class="searh-result-body customscrollbar">
            <ContentLoader
              :speed="1"
              :animate="true"
              :width="400"
              :height="100"
              class="px-2 normalLoader"
            >
              <rect x="0" y="-1" rx="0" ry="0" width="395" height="15" />
              <rect x="0" y="15" rx="0" ry="0" width="395" height="15" />
              <rect x="0" y="31" rx="0" ry="0" width="395" height="15" />
              <rect x="0" y="47" rx="0" ry="0" width="395" height="15" />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
    <div id="delete-form" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Form</h5>
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
            <p>Are you sure you want to delete the form?</p>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                @click="removeDelete()"
                >No</a
              >
              <a
                href="javascript:void(0);"
                data-dismiss="modal"
                class="btn"
                @click="removeForm()"
                >Yes</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader,
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      error: null,
      isLoading: false,
      forms: [],
      deleteFormId: null,
      sortBy: 'ASC',
    }
  },
  watch: {
    sortBy() {
      this.loadForms()
    },
  },
  mounted() {
    this.loadForms()
  },
  methods: {
    loadForms() {
      this.isLoading = true
      this.$axios
        .$post('lm/sharpspring/list', {
          sortvalue: 'title',
          orderby: this.sortBy,
        })
        .then((data) => {
          this.error = data && data.error
          this.forms = data.data ? data.data.sharpSpringFormList : []
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
        .finally(() => (this.isLoading = false))
    },
    removeDelete() {
      this.deleteFormId = null
    },
    formDeletePrompt(id) {
      this.deleteFormId = id
    },
    removeForm() {
      this.$axios
        .post('lm/sharpspring/delete', {
          workspace_id: this.$route.params.workspace_id,
          sharp_spring_forms_id: this.deleteFormId,
        })
        .then(() => {
          this.forms = this.forms.filter(
            (form) => form.id !== this.deleteFormId
          )
          this.deleteFormId = null
        })
        .catch((err) => this.$toast.error(this.$getErrorMessage(err)))
    },
  },
}
</script>

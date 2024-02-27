<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!subscriptionFetched" class="overlay">
      <div class="loader"></div>
    </div>
    <template v-else-if="!aclEnabled">
      <img
        :src="require('~/assets/img/blurred-images/acl-list.png')"
        style="width: 100%"
      />
      <div class="common-overaly">
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
    </template>
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
    <div v-if="subscriptionFetched" class="general-settings-title">
      <h4>ACL Management</h4>
    </div>
    <div v-if="subscriptionFetched" class="workspace-settings customscrollbar">
      <div class="workspace-settings-subheading">
        <p>Add different access control/permission roles to the assets.</p>
      </div>
      <div class="form-group">
        <WorkspaceNote />
      </div>
      <div class="row no-gutters">
        <div class="col-lg-7 col-md-12">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label">Access Control Name</label>
                  <input
                    v-model.trim="accessForm.name"
                    type="text"
                    class="form-control"
                    placeholder="Access Control Name"
                  />

                  <div v-if="$v.accessForm.name.$error" class="input-error">
                    <template v-if="!$v.accessForm.name.required">
                      Please provide access control name
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group required">
                  <label class="control-label"
                    >Set Status - Active/Inactive</label
                  >
                  <div class="d-flex">
                    <label class="label-switch mt10">
                      <input
                        v-model="accessForm.is_active"
                        type="checkbox"
                        class="switch-onoff switch"
                        :disabled="loading"
                      />
                      <span class="lable"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <button
                    type="submit"
                    name="submit"
                    class="btn"
                    :disabled="loading || isSame"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        v-if="loadingACLs"
        style="margin: auto; overflow: hidden; width: 97%"
        class="pb-3"
      >
        <ContentLoader
          :speed="1"
          :animate="true"
          :width="400"
          :height="200"
          class="normalLoader"
        >
          <rect x="0" y="7" rx="4" ry="4" width="300" height="20" />
          <rect x="0" y="30" rx="4" ry="4" width="300" height="20" />
          <rect x="0" y="53" rx="4" ry="4" width="300" height="20" />
          <rect x="0" y="77" rx="4" ry="4" width="300" height="20" />
        </ContentLoader>
      </div>
      <div class="row no-gutters">
        <div class="col-lg-9 col-md-11 col-sm-12">
          <div class="workspace-setting-table">
            <ul class="thead">
              <li v-show="accessControlList.length">
                <label class="check-label"
                  >Select All
                  <input
                    id="ckbCheckAll"
                    v-model="checkAll"
                    type="checkbox"
                    name="checkbox"
                    @input="
                      accessList.forEach((ev) => (ev.selected = !checkAll))
                    "
                  />
                  <span class="check-span"></span>
                </label>
              </li>
              <li>
                <input
                  v-model="search"
                  type="search"
                  class="form-control searchCloseIcon"
                  name="search"
                  placeholder="Search access control"
                />
              </li>
              <li v-if="selections.length">
                <button
                  class="btn"
                  type="button"
                  @click="
                    multiDeleteDialog = false
                    $nextTick(() => (multiDeleteDialog = true))
                  "
                >
                  Delete ({{ selections.length }})
                </button>
              </li>
            </ul>
            <div v-if="isSearchTerm" class="search-result mb1">
              <div class="alert alert-info alert-dismissible">
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  @click="search = ''"
                >
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
                Showing results for <strong>"{{ search.trim() }}"</strong>
              </div>
            </div>
            <ul class="thead workspace-tabledata-header">
              <li>
                <div class="name sorting">Access Control</div>
                <div class="control-status sorting">Control Status</div>
                <div class="action sorting">Action</div>
              </li>
            </ul>
            <draggable
              v-model="accessList"
              class="tbody list-animation"
              tag="ul"
              draggable=".drag"
              handle=".drag-row"
              @change="draggableAccess"
            >
              <li
                v-for="(access, index) in accessControlList"
                :key="access.id"
                class="drag"
                :style="`--animation-order: ${index + 1}`"
              >
                <div class="workspace-tabledata">
                  <span class="drag-row">
                    <svg
                      id="Layer_1"
                      class="menu-option-icon h-orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4482" transform="translate(-872 -801)">
                        <rect
                          id="Rectangle_3020"
                          x="872"
                          y="801"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Group_4348"
                          transform="translate(588.166 653.684)"
                        >
                          <circle
                            id="Ellipse_203"
                            class="fill-color"
                            cx="292.8"
                            cy="148.9"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-2"
                            class="fill-color"
                            cx="292.8"
                            cy="163.8"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-3"
                            class="fill-color"
                            cx="292.8"
                            cy="156.3"
                            r="1.5"
                          ></circle>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <label class="check-label">
                    <input
                      v-model="access.selected"
                      type="checkbox"
                      name=""
                      class="checkBoxClass"
                    />
                    <span class="check-span"></span>
                  </label>
                  <input
                    v-model="access.name"
                    type="text"
                    class="form-control"
                    @keyup="editName(access)"
                  />
                  <label class="label-switch">
                    <input
                      v-model="access.is_active"
                      type="checkbox"
                      class="switch-onoff switch"
                      @change="changeStatus(access)"
                    />
                    <span class="lable"></span>
                  </label>
                  <a
                    class="delete-forever"
                    data-toggle="modal"
                    data-target="#delete-task-status"
                    @click.capture="showDeleteTypeDialog(access)"
                  >
                    <svg
                      id="Layer_1"
                      class="delete-icon h-orange"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete Task Status"
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
                </div>
              </li>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="singleDeleteDialog"
      @click:confirm-button="deleteAccess(accessDeleteData.id)"
    >
      <template slot="header">Are you sure?</template>

      Are you sure you want to delete the access of
      <b>{{ accessDeleteData.name }}</b> ?
    </ConfirmationDialog>
    <ConfirmationDialog
      v-model="multiDeleteDialog"
      @click:confirm-button="deleteSelection"
    >
      <template slot="header">Are you sure?</template>

      Are you sure you want to delete all the
      <b>{{ selections.length }} selected</b> access ?
    </ConfirmationDialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import draggable from 'vuedraggable'
import { ContentLoader } from 'vue-content-loader'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'

export default {
  components: {
    ConfirmationDialog,
    WorkspaceNote,
    draggable,
    ContentLoader,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      loadingACLs: true,
      search: '',
      currentInstance: '',
      accessForm: {
        name: '',
        is_active: true,
      },
      accessOriginal: null,
      loading: false,
      checkAll: false,
      accessList: [],
      accessDeleteData: {},
      singleDeleteDialog: false,
      multiDeleteDialog: false,

      accessListOld: null,
      updateName: null,
      subscriptionData: {},
      subscriptionFetched: false,
    }
  },
  computed: {
    aclEnabled() {
      return (
        !this.subscriptionFetched ||
        !!this.subscriptionData?.features?.acl_wordpress_integration?.enable
      )
    },
    isSearchTerm() {
      return this.search && this.search.trim()
    },
    isSame() {
      return this.$isSame(this.accessForm, this.accessOriginal)
    },
    selections() {
      return this.accessList.filter(({ selected }) => selected)
    },
    accessControlList() {
      const search = this.search && this.search.trim()

      if (search) {
        return this.accessList.filter(({ name: accessName }) => {
          let regex = null
          try {
            regex = new RegExp(search, 'ig')
          } catch {}

          return regex && regex.test(accessName)
        })
      }
      return this.accessList
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
  },
  created() {
    this.accessOriginal = { ...this.accessForm }
    this.$store.dispatch('dam/getNotifications')
  },
  async mounted() {
    await this.fetchSubscription()
    this.getAccessList()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
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
    // delete multiple access
    async deleteSelection() {
      if (!this.aclEnabled) return
      await this.$axios
        .$delete('digital-assets/acl/delete', {
          data: {
            id: this.selections.map(({ id }) => id),
          },
        })
        .then((response) => {
          this.accessList = this.accessList.filter(({ selected }) => !selected)

          this.$toast.global.success(response.message)
          this.$nextTick(() => (this.multiDeleteDialog = false))
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
        })
    },
    // edit name of access role
    editName(accessData) {
      if (!this.aclEnabled) return
      const currentACL = this.accessListOld.find((e) => e.id === accessData.id)
      if (accessData.name === currentACL?.name) return
      clearTimeout(this.updateName)
      this.updateName = setTimeout(() => {
        if (accessData?.name !== '') {
          this.$axios
            .$patch(`digital-assets/acl/update`, {
              id: accessData.id,
              workspace_id: this.$getWorkspaceId(),
              name: accessData.name,
              is_active: Number(accessData.is_active),
            })
            .then((response) => {
              this.$toast.global.success(response.message)
              this.accessListOld.find((e) => e.id === accessData.id).name =
                accessData.name
            })
            .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        } else {
          this.accessList = this.accessList.map((access, index) => {
            if (accessData.id === access.id) {
              access.name = this.accessListOld[index].name
            }
            return access
          })
        }
      }, 2000)
    },
    // delete specific access
    async deleteAccess(accessDataId) {
      if (!this.aclEnabled) return
      await this.$axios
        .$delete('digital-assets/acl/delete', {
          data: {
            id: [accessDataId],
          },
        })
        .then((response) => {
          this.accessList = this.accessList.filter(
            ({ id }) => accessDataId !== id
          )
          this.$toast.global.success(response.message)
          this.accessDeleteData = {}
          this.$nextTick(() => (this.singleDeleteDialog = false))
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
        })
    },
    // delete dialog for specific access
    showDeleteTypeDialog(accessData) {
      if (!this.aclEnabled) return
      this.accessDeleteData = accessData
      this.$nextTick(() => (this.singleDeleteDialog = true))
    },
    // change active status of access
    async changeStatus(accessData) {
      if (!this.aclEnabled) return
      await this.$axios
        .$patch(`digital-assets/acl/update`, {
          id: accessData.id,
          workspace_id: this.$getWorkspaceId(),
          name: accessData.name,
          is_active: Number(accessData.is_active),
        })
        .then((response) => {
          this.accessListOld = this.accessListOld.map((access) => {
            if (accessData.id === access.id) {
              access.is_active = Number(accessData.is_active)
            }
            return access
          })
          this.$toast.global.success(response.message)
        })
    },
    // change the position of access by dragging
    async draggableAccess() {
      if (!this.aclEnabled) return
      const orderList = []
      this.accessList.map((access, index) =>
        orderList.push({ id: access.id, index })
      )
      await this.$axios
        .$patch(`digital-assets/acl/update-order`, {
          workspace_id: this.$getWorkspaceId(),
          order: orderList,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
          this.accessListOld = JSON.parse(JSON.stringify(response.data))
        })
    },
    // get the access control list
    async getAccessList() {
      if (!this.aclEnabled) {
        this.loadingACLs = false
        return
      }
      await this.$axios.$get(`digital-assets/acl/list`).then((response) => {
        response.data.forEach((ev) => (ev.selected = false))
        this.accessList = response.data
        this.accessListOld = JSON.parse(JSON.stringify(response.data))
        this.loadingACLs = false
        this.checkAll = false
      })
    },
    // add new access
    handleSubmit() {
      if (!this.aclEnabled) return
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.accessForm.workspace_id = this.$getWorkspaceId()
      this.accessForm.is_active = Number(this.accessForm.is_active)
      this.loading = true
      this.$axios
        .$post(`digital-assets/acl/create`, this.accessForm)
        .then((response) => {
          this.$toast.global.success(response.message)
          this.$v.$reset()
          this.accessForm = this.accessOriginal
          this.loading = false

          this.accessOriginal = { ...this.accessForm }
          this.getAccessList()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.loading = false
        })
    },
  },
  validations: {
    accessForm: {
      name: { required },
    },
  },
}
</script>
<style scoped>
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

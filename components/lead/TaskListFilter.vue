<template>
  <div class="resizableLeft table-list-scrolling">
    <div class="clickBox">
      <div class="common-box p-0 h-100">
        <div class="box p0 h-100">
          <div class="common-box-header">
            <h2 class="title sideShow">
              <a href="javascript:void(0);" class="shrink">
                <svg
                  id="Layer_1"
                  class="sidebar-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 25 25"
                  xml:space="preserve"
                >
                  <g id="Group_5300" transform="translate(-90 -90)">
                    <path
                      id="Rectangle_1967"
                      class="fill-darkgray"
                      d="M94,90h17c2.2,0,4,1.8,4,4v17c0,2.2-1.8,4-4,4H94c-2.2,0-4-1.8-4-4V94C90,91.8,91.8,90,94,90z"
                    ></path>
                    <path
                      id="Icon_open-media-skip-backward"
                      class="fill-color"
                      d="M101.5,97l-7.5,5.6l7.5,5.6V97z M101.5,102.6l7.5,5.6V97L101.5,102.6z"
                    ></path>
                  </g>
                </svg>
                <span>Filters</span>
              </a>
            </h2>
            <h2 class="title sideHide">
              <a href="javascript:void(0);" class="shrink">
                <svg
                  id="Layer_1"
                  class="sidebar-invert-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 25 25"
                  xml:space="preserve"
                >
                  <g id="Group_5300" transform="translate(-90 -90)">
                    <path
                      id="Rectangle_1967"
                      class="fill-white"
                      d="M94,90h17c2.2,0,4,1.8,4,4v17c0,2.2-1.8,4-4,4H94c-2.2,0-4-1.8-4-4V94C90,91.8,91.8,90,94,90z"
                    ></path>
                    <path
                      id="Icon_open-media-skip-backward"
                      class="fill-color"
                      d="M101.5,97l-7.5,5.6l7.5,5.6V97z M101.5,102.6l7.5,5.6V97L101.5,102.6z"
                    ></path>
                  </g>
                </svg>
                <span>Filters</span>
              </a>
            </h2>
          </div>
          <div class="filter-form">
            <div class="customscrollbar">
              <div class="tbody">
                <form @submit.prevent>
                  <div class="form-group">
                    <Select2
                      v-model="selectedUser"
                      :options="users"
                      placeholder="Assigned User"
                      custom-event
                      @input="getUser($event)"
                    />
                  </div>
                  <div class="form-group">
                    <Select2
                      v-model="selectedStatus"
                      :options="status"
                      placeholder="Status"
                      custom-event
                      @input="$emit('filter:status', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <Select2
                      v-model="lastDate"
                      :options="dueDates"
                      placeholder="Due Date"
                      custom-event
                      @input="getDate($event)"
                    />
                  </div>
                  <div class="form-group">
                    <button
                      href="javascript:void(0);"
                      class="btn"
                      data-toggle="modal"
                      data-target="#saved-search"
                      :disabled="selectedId ? true : false"
                    >
                      Save
                    </button>
                    <a
                      v-if="selectedUser || selectedStatus || lastDate"
                      href="javascript:void(0);"
                      class="btn btn-gray"
                      @click="resetFilter"
                      >Reset</a
                    >
                  </div>
                </form>

                <div class="saved-list">
                  <h3>Saved Search</h3>
                  <div v-if="!savedSearches.length">No Saved Search found</div>

                  <transition-group v-else name="staggered" tag="ul">
                    <li
                      v-for="(saveFilter, index) in savedSearches"
                      :key="saveFilter.id"
                      :class="{ active: selectedId === saveFilter.id }"
                      :style="`transition-delay:${index * 20}ms`"
                    >
                      <div class="number">{{ index + 1 }}</div>
                      <div class="name">
                        <a
                          href="javascript:void(0);"
                          @click="setFilter(saveFilter)"
                          >{{ saveFilter.name }}</a
                        >
                      </div>
                      <div class="action">
                        <a
                          v-tooltip="'Delete saved search'"
                          data-toggle="modal"
                          data-target="#delete-saved-search"
                          @click="setDeletedSavedSerch(saveFilter.id)"
                        >
                          <DeleteIcon />
                        </a>
                      </div>
                    </li>
                  </transition-group>
                </div>
                <!-- <a
                  v-if="selectedId"
                  href="javascript:void(0);"
                  class="btn btn-gray btn-small mt1"
                  @click="resetFilter"
                  >Reset filter</a
                > -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="saved-search"
      class="modal fade"
      style="display: none"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Saved Search</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <CloseIcon />
              </span>
            </button>
          </div>
          <div class="modal-body saved-search-body text-center">
            <div class="row">
              <div class="col-md-6">
                <span>Assignee User</span>
                <strong>{{ getSelectedUser || '-' }}</strong>
              </div>
              <div class="col-md-6">
                <span>Status</span>
                <strong>{{ getStatusName || '-' }}</strong>
              </div>
              <div class="col-md-6">
                <span>Due Date</span>
                <strong>{{ getDueDate || '-' }}</strong>
              </div>
              <div class="col-md-12">
                <input
                  v-model="filterTitle"
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Save search title name here..."
                />
                <div v-if="$v.filterTitle.$error" class="input-error">
                  <div v-if="!$v.filterTitle.required">Field is required</div>
                </div>
              </div>
            </div>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn"
                :class="{ loading: isLoading }"
                @click="submitSearch"
                >Save</a
              >
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation-dialog
      v-model="showDeleteDialog"
      @click:confirm-button="deleteSavedFilter"
    >
      <template slot="header">Delete Saved Filter</template>
      Are you sure you want to delete the Saved Filter?
    </confirmation-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    Select2,
    ConfirmationDialog,
  },
  props: {
    status: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    dueDates: {
      type: Array,
      required: true,
    },
    savedSearches: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isLoading: false,
    lastDate: '',
    selectedStatus: '',
    selectedUser: '',
    showDeleteDialog: false,
    tempDeletedFilterId: '',
    selectedDate: '',
    filterTitle: '',
    selectedId: '',
    startDate: '',
    endDate: '',
  }),
  computed: {
    getStatusName() {
      const statusName = this.status.find(
        (s) => Number(s.id) === Number(this.selectedStatus)
      )?.text
      return statusName
    },
    getSelectedUser() {
      const userName =
        this.selectedUser &&
        this.users.find((s) => parseInt(s.id) === parseInt(this.selectedUser))
          ?.name
      return userName
    },
    getDueDate() {
      const dueDate = this.dueDates.find(
        (s) => s.id === this.selectedDate
      )?.text
      return dueDate
    },
  },

  methods: {
    setFilter(savedSearch) {
      this.setFilterData(savedSearch)
      this.$emit('clearFilter')
      this.$emit('setFilter', savedSearch)
    },
    setDeletedSavedSerch(id) {
      this.showDeleteDialog = true
      this.tempDeletedFilterId = id
    },
    deleteSavedFilter() {
      this.$emit('deleteSavedFilter', this.tempDeletedFilterId)
    },
    getDate(evt) {
      this.selectedDate = evt
      this.endDate = this.$moment().format('YYYY-MM-DD')
      if (this.selectedDate !== 365) {
        this.startDate = this.$moment()
          .subtract(this.selectedDate, 'days')
          .format('YYYY-MM-DD')
      } else {
        this.startDate = this.$moment()
          .subtract(this.selectedDate, 'years')
          .format('YYYY-MM-DD')
      }
      this.$emit('filter:due-date', {
        endDate: this.endDate,
        startDate: this.startDate,
      })
      this.selectedId = ''
    },
    getUser(userId) {
      this.selectedUser = userId
      this.selectedId = ''
      this.$emit('filter:user', userId)
    },
    submitSearch() {
      this.$v.$touch()
      if (this.selectedUser || this.selectedDate || this.selectedStatus) {
        if (!this.$v.$invalid)
          this.$emit('submit', {
            status: this.selectedStatus,
            user: this.selectedUser,
            date: this.selectedDate,
            title: this.filterTitle,
            startDate: this.startDate,
            endDate: this.endDate,
          })
      } else {
        alert('Please select at least one field')
      }
    },
    setFilterData(savedSearch) {
      this.selectedId = savedSearch.id
      this.selectedUser = savedSearch.save_data.user
      this.selectedStatus = savedSearch.save_data.status
      this.lastDate = savedSearch.save_data.date
      this.selectedDate = savedSearch.save_data.date
    },
    clearFilterData() {
      this.selectedId = ''
      this.selectedUser = ''
      this.selectedStatus = ''
      this.selectedDate = ''
      this.lastDate = ''
    },
    resetFilter() {
      this.clearFilterData()
      this.$emit('clearFilter')
    },
    resetForm() {
      this.selectedStatus = ''
      this.selectedUser = ''
      this.selectedDate = ''
      this.filterTitle = ''
      this.startDate = ''
      this.endDate = ''
      this.lastDate = ''
      this.$v.$reset()
    },
  },
  validations() {
    return {
      filterTitle: {
        required,
      },
    }
  },
}
</script>

<style>
.staggered-item {
  display: inline-block;
  margin-right: 10px;
}
.staggered-enter-active,
.staggered-leave-active {
  transition: all 0.5s;
}
.staggered-enter, .staggered-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>

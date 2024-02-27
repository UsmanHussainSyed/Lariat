<template>
  <div class="body-content">
    <div class="resizableMain filterMain project-list lead-tasks">
      <TaskListFilter
        ref="taskListRef"
        :due-dates="filterDueDate"
        :status="filterData.status"
        :users="filterData.users"
        :saved-searches="savedSerchFilters"
        @deleteSavedFilter="deleteSavedFilter"
        @submit="addSavedFilter"
        @setFilter="setSavedFilter"
        @clearFilter="clearFilter"
        @filter:user="changeUser"
        @filter:status="changeStatus"
        @filter:due-date="changeDueDate"
      />
      <div class="resizableRight pr-0">
        <div class="row h-100">
          <div class="col-sm-12 h-100">
            <div class="common-box-header">
              <h2 class="title">
                {{ checkLessThen ? 'Total Task ' : 'Total Tasks ' }}-
                <strong> {{ totalTasks }} </strong>
              </h2>
              <div class="newAnalytics p0 mt1">
                <ul class="assetsType justify-content-end">
                  <li>
                    <label class="check-label">
                      Show No Due Date Records
                      <input v-model="isDueDate" type="checkbox" name="" />
                      <span class="check-span"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="common-box bg-gray">
              <div class="filter-dropdown">
                <a href="javascript:void(0);" class="filter-dropdown-toggle">
                  <MenuIcon />
                </a>
                <ul class="filter-dropdown-menu">
                  <li v-for="item in filterHideList" :key="item.name">
                    <a href="javascript:void(0);"
                      ><label class="check-label">
                        {{ item.name }}
                        <input
                          v-model="item.isActive"
                          type="checkbox"
                          name=""
                          :checked="item.isActive" /><span
                          class="check-span"
                        ></span></label
                    ></a>
                  </li>
                </ul>
              </div>
              <div
                class="table-list-view lead-task-list-view table-list-scrolling s2"
              >
                <div class="thead">
                  <div class="project_task_row">
                    <div
                      class="sorting sortarrow task__wrapper"
                      :class="[
                        sortData === 'title' && currentSort === 'desc'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleSortData('title')">Task Name</span>
                    </div>
                    <div class="sorting filterarrow task__column bigger_cell">
                      <span v-show="checkHiddenFilter('Product Inquired')"
                        >Product Inquired</span
                      >
                      <ul class="dataFilter">
                        <li
                          v-for="item in filterData.product_inquired"
                          :key="item.key"
                        >
                          <label class="check-label"
                            >{{ item.name }}
                            <input
                              v-model="item.isActive"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div class="sorting filterarrow task__column big_cell">
                      <span v-show="checkHiddenFilter('Assigned To')"
                        >Assigned To</span
                      >

                      <ul class="dataFilter">
                        <li v-for="item in filterData.users" :key="item.key">
                          <label class="check-label"
                            >{{ item.name }}
                            <input
                              v-model="item.isActive"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div
                      class="sorting sortarrow task__column bigger_cell"
                      :class="[
                        sortData === 'user_name' && currentSort === 'desc'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span
                        v-show="checkHiddenFilter('Name / Email')"
                        @click="toggleSortData('user_name')"
                        >Name / Email</span
                      >
                    </div>
                    <div
                      class="sorting filterarrow task__column mid_cell status"
                    >
                      <span v-show="checkHiddenFilter('Status')"
                        >Status
                        <i
                          v-tooltip="{
                            html: true,
                            content: getStatusDescription,
                          }"
                          class="fa fa-info-circle tip"
                          aria-hidden="true"
                          data-tip="tip-info"
                        ></i
                      ></span>
                      <ul class="dataFilter">
                        <li v-for="item in filterData.status" :key="item.key">
                          <label class="check-label"
                            >{{ item.name }}
                            <input
                              v-model="item.isActive"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div class="sorting task__column bigger_cell description">
                      <span v-show="checkHiddenFilter('Description')"
                        >Description</span
                      >
                    </div>
                    <div class="sorting task__column mid_cell ChooseFile">
                      <span v-show="checkHiddenFilter('Attachment')"
                        >Attachment</span
                      >
                    </div>
                    <div
                      class="sorting sortarrow task__column sm_cell"
                      :class="[
                        sortData === 'due_date' && currentSort === 'desc'
                          ? 'active descending'
                          : '',
                      ]"
                      @click="toggleSortData('due_date')"
                    >
                      <span v-show="checkHiddenFilter('Due Date')"
                        >Due Date</span
                      >
                    </div>
                    <div class="sorting task__column xsm_cell actions">
                      <span>Action</span>
                    </div>
                  </div>
                </div>
                <div class="customscrollbar no_footer">
                  <div class="tbody">
                    <div class="project_task_list">
                      <div
                        v-for="task in taskLists"
                        :key="task.id"
                        class="project_task_row"
                      >
                        <div
                          class="StatusBgColor"
                          :style="'background-color:' + getStatusColor(task)"
                        ></div>
                        <div class="tb-column task__wrapper">
                          <nuxt-link
                            class="task-name"
                            :to="{
                              name: 'workspace_id-lead-leads-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: task.lead_id,
                              },
                              query: {
                                tab: 'task',
                              },
                            }"
                          >
                            {{ task.title }}
                          </nuxt-link>
                        </div>
                        <div class="tb-column task__column bigger_cell">
                          <div
                            v-show="checkHiddenFilter('Product Inquired')"
                            class="normal-dropdown no-border"
                          >
                            <Select2
                              :options="productOption"
                              :value="task.product_id || 0"
                              item_text="product_name"
                              placeholder="Product name"
                              @input="updateTaskProduct(task, $event)"
                            />
                          </div>
                        </div>
                        <div class="tb-column task__column big_cell">
                          <div class="assignee-dropdown no-border visible-text">
                            <Select2WithImage
                              v-show="checkHiddenFilter('Assigned To')"
                              :value="
                                getTaskUserValue(task.user_id, task.users)
                              "
                              :options="task.users"
                              :custom-event="true"
                              dropdown-css-class="owner-select"
                              @optionChangeHandler="
                                updateTaskUser(task, $event)
                              "
                            />
                          </div>
                        </div>
                        <div class="tb-column task__column bigger_cell">
                          <div class="media">
                            <div
                              v-show="checkHiddenFilter('Name / Email')"
                              class="media-left"
                            >
                              <div
                                v-if="task.user_profile_image"
                                class="profile-bg"
                                :style="
                                  'background-image: url(' +
                                  task.user_profile_image +
                                  ')'
                                "
                              ></div>
                              <div v-else class="profile-char">
                                {{
                                  task.user_name
                                    ? task.user_name.charAt(0)
                                    : task.user_email
                                    ? task.user_email.charAt(0)
                                    : '-'
                                }}
                              </div>
                            </div>
                            <div
                              v-show="checkHiddenFilter('Name / Email')"
                              class="media-body"
                            >
                              <label>{{
                                task.user_name ? task.user_name : '-'
                              }}</label>
                              <span>
                                {{ task.user_email ? task.user_email : '-' }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="tb-column task__column mid_cell status">
                          <div
                            v-show="checkHiddenFilter('Status')"
                            class="status-dropdown no-border"
                          >
                            <lead-status
                              v-if="taskStatusList.length"
                              v-model="task.status"
                              :value="task.status"
                              :items="taskStatusList"
                              item_text="status_name"
                              :select_first="true"
                              item_value="id"
                              @change="updateTaskStatus(task)"
                            >
                            </lead-status>
                          </div>
                        </div>
                        <div
                          class="tb-column task__column bigger_cell description"
                        >
                          <div
                            v-show="checkHiddenFilter('Description')"
                            class="NoteBox"
                            data-toggle="modal"
                            data-target="#quick-note"
                            @click="addQuickNoteDialog(task, task.description)"
                          >
                            <span>{{ task.description || '-' }}</span>
                          </div>
                        </div>
                        <div class="tb-column task__column ChooseFile">
                          <a
                            v-if="task.attach"
                            v-show="checkHiddenFilter('Attachment')"
                            v-tooltip="task.file_name"
                            @click="
                              downloadTaskAttachment(
                                task.file_name,
                                task.attach
                              )
                            "
                          >
                            {{ task.file_name || '&ndash;' }}
                          </a>
                          <span
                            v-else
                            v-show="checkHiddenFilter('Attachment')"
                            v-tooltip="task.file_name"
                          >
                            {{ task.file_name || '&ndash;' }}
                          </span>
                        </div>
                        <div class="tb-column task__column sm_cell">
                          <DatePicker
                            v-if="reRender"
                            v-show="checkHiddenFilter('Due Date')"
                            human
                            placeholder="Due date"
                            :class-obj="'datepicker form-control flatpickr-input'"
                            :start-date="task.due_date"
                            :min-date="
                              checkMinDate(task.due_date || new Date())
                            "
                            :disable-date="
                              getDisabledDateList(task.due_date || new Date())
                            "
                            :custom-event="true"
                            @dateChanged="dueDateHandler(...arguments, task)"
                          />
                          <span
                            v-if="task.due_date"
                            v-tooltip="'Remove Due date'"
                            class="remove-date"
                            @click="dueDateHandler(null, task)"
                            ><svg
                              id="Layer_1"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                              class="close-icon h-red has-tooltip"
                            >
                              <g
                                id="Group_4358"
                                transform="translate(-69.745 -317.549)"
                              >
                                <path
                                  id="Path_3424"
                                  d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                                  class="fill-color"
                                ></path>
                                <path
                                  id="Path_3425"
                                  d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                                  class="fill-color"
                                ></path>
                              </g></svg
                          ></span>
                        </div>
                        <div class="tb-column task__column xsm_cell actions">
                          <a
                            v-tooltip="'Delete Task'"
                            data-toggle="modal"
                            @click="setDeletedTask(task.id)"
                          >
                            <DeleteIcon />
                          </a>
                        </div>
                      </div>
                    </div>
                    <EmptyState v-if="!taskLists.length && !isLoading" />
                    <client-only>
                      <infinite-loading
                        :identifier="tasksInfiniteId"
                        @infinite="tasksInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="100"
                          >
                            <rect
                              v-for="index in 10"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results">
                          <!-- <EmptyState /> -->
                        </div>
                      </infinite-loading>
                    </client-only>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation-dialog
      v-model="showDeleteDialog"
      @click:confirm-button="deleteTask"
    >
      <template slot="header">Delete Task</template>
      Are you sure you want to delete the task?
    </confirmation-dialog>
    <QuickNoteModal
      :description="loadedDescription"
      :disabled="false"
      @update:description="(newValue) => (loadedDescription = newValue)"
      @saveDescription="addQuickNote"
    />
  </div>
</template>

<script>
import Moment from 'moment-timezone'
import _ from 'lodash'
import { ContentLoader } from 'vue-content-loader'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import EmptyState from '~/components/theme/global/EmptyState'
import Select2 from '~/components/plugins/Select2'
import Select2WithImage from '@/components/plugins/Select2WithImage.vue'
import LeadStatus from '~/components/lead/LeadStatus.vue'
import TaskListFilter from '~/components/lead/TaskListFilter.vue'
// import LeadTaskUser from '~/components/lead/LeadTaskUser.vue'
import DatePicker from '~/components/plugins/DatePicker'
import TaskMixin from '~/mixins/lead.js'
import { checkIsEqual } from '~/utils/helper.js'
import QuickNoteModal from '~/components/lead/QuicknoteModal.vue'
import MenuIcon from '~/components/lead/Icons/MenuIcon'
export default {
  components: {
    EmptyState,
    ConfirmationDialog,
    Select2,
    MenuIcon,
    LeadStatus,
    // LeadTaskUser,
    Select2WithImage,
    DatePicker,
    TaskListFilter,
    ContentLoader,
    QuickNoteModal,
  },
  mixins: [TaskMixin],
  layout: 'leadLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-lead-module'],
  data: () => ({
    showDeleteDialog: false,
    tempDeletedTaskId: null,
    lastDate: '',
    filterDueDate: [
      {
        id: '0',
        text: 'Today',
      },
      {
        id: '7',
        text: 'Last Week',
      },
      {
        id: '30',
        text: 'Last 30 Days',
      },
      {
        id: '90',
        text: 'Last 3 Months',
      },
      {
        id: '365',
        text: 'Last Year',
      },
    ],
    filters: {
      start_date: '',
      end_date: '',
      status: '',
    },
    contentLoaderData: [0, 15, 31, 47, 63, 79, 95, 111, 127, 143],
    isLoading: false,
    totalTasks: 0,
    tasksInfiniteId: new Date().getTime(),
    taskLists: [],
    tasksPage: 0,
    taskStatusList: [],
    productOption: [],
    taskUserList: [],
    sortData: '',
    currentSort: '',
    loadedDescription: '',
    filterData: {
      product_inquired: [],
      status: [],
      users: [],
    },
    savedSerchFilters: [],
    filterPayload: {
      product_ids: [],
      status_ids: [],
      user_ids: [],
      dueDate: null,
    },
    filterHideList: [
      { name: 'Name / Email', isActive: true },
      { name: 'Product Inquired', isActive: true },
      { name: 'Assigned To', isActive: true },
      { name: 'Status', isActive: true },
      { name: 'Description', isActive: true },
      { name: 'Attachment', isActive: true },
      { name: 'Due Date', isActive: true },
    ],
    reRender: true,
    isDueDate: false,
    loadedTask: null,
  }),
  computed: {
    getTaskUserValue() {
      return (userId, userList) => {
        const user = userList.find((e) => parseInt(e.id) === parseInt(userId))
        if (user) {
          return user.id
        } else {
          return 0
        }
      }
    },
    checkLessThen() {
      return this.totalTasks <= 1
    },
    getStatusColor() {
      return (task) => {
        const color = this.taskStatusList.find(
          (status) => status.id === task.status
        )?.status_color
        return color
      }
    },
    checkHiddenFilter() {
      return (name) =>
        this.filterHideList.find((e) => e.name === name)?.isActive
    },
    checkMinDate() {
      return (taskDate) => (Moment(taskDate) > Moment() ? new Date() : taskDate)
    },
    getDisabledDateList() {
      return (taskDate) => {
        const dateArray = []
        const c = Moment(taskDate).add(1, 'days').format('YYYY-MM-DD')
        const s = Moment().format('YYYY-MM-DD')
        let currentDate = Moment(c)
        const stopDate = Moment(s)
        while (currentDate < stopDate) {
          dateArray.push(Moment(currentDate).format('YYYY-MM-DD'))
          currentDate = Moment(currentDate).add(1, 'days')
        }
        return dateArray
      }
    },
  },
  watch: {
    isDueDate: {
      handler() {
        this.handleFilterChange()
      },
    },
    'filterData.product_inquired': {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          this.filterPayload.product_ids = this.filterData.product_inquired
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      immediate: false,
      deep: true,
    },
    'filterData.users': {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          this.filterPayload.user_ids = this.filterData.users
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      immediate: false,
      deep: true,
    },
    'filterData.status': {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          this.filterPayload.status_ids = this.filterData.status
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      immediate: false,
      deep: true,
    },
    filterHideList: {
      handler() {
        const filterHiddenList = window.localStorage
        filterHiddenList.setItem(
          'taskHeaderFilters',
          JSON.stringify(this.filterHideList)
        )
      },
      deep: true,
    },
  },
  beforeMount() {
    this.getFiltersHeader()
  },
  created() {
    this.loadStatusList()
    this.loadTaskProductList()
    this.loadTaskListColumnHeader()
    this.getSavefilters()
  },
  methods: {
    addQuickNoteDialog(task, desc) {
      this.loadedDescription = desc
      this.loadedTask = task
    },
    addQuickNote() {
      if (
        this.loadedDescription !== '' &&
        this.loadedDescription !== null &&
        this.loadedDescription !== this.loadedTask.description
      ) {
        this.$axios
          .$post(
            `lm/leads/task/edit`,
            this.createFormData(
              this.loadedTask,
              'description',
              this.loadedDescription
            )
          )
          .then((response) => {
            this.$toast.global.success(response.message)
            const task = this.taskLists.find(
              ({ id }) => parseInt(this.loadedTask.id) === parseInt(id)
            )
            task && (task.description = this.loadedDescription)
            const index = this.taskLists.findIndex(
              ({ id }) => parseInt(this.loadedTask.id) === parseInt(id)
            )
            this.taskLists.splice(index, 1, task)
          })
          .catch((error) => {
            this.$toast.error(this.$getErrorMessage(error.message))
          })
      }
    },
    createFormData(task, exclude, value) {
      const formData = new FormData()
      Object.keys(task).forEach((e) => {
        if (typeof task[e] !== 'object' && e !== 'file') {
          formData.append(e, task[e])
        } else if (task[e] instanceof File) {
          formData.append('attach', task[e])
        }
      })
      formData.delete(exclude)
      formData.append(exclude, value)
      return formData
    },
    getStatusDescription() {
      if (this.taskStatusList.length > 0 && typeof document !== 'undefined') {
        const ul = document.createElement('ul')
        this.taskStatusList.forEach((s) => {
          const li = document.createElement('li')
          const strong = document.createElement('strong')
          strong.textContent = s.status_name
          li.appendChild(strong)
          ul.appendChild(li)
        })
        return ul
      }
      return ''
    },
    clearFilter() {
      this.filterPayload.user_ids = []
      this.filterPayload.status_ids = []
      this.filterPayload.dueDate = null
      this.handleFilterChange()
    },
    setSavedFilter(evt) {
      evt.save_data.user && (this.filterPayload.user_ids = [evt.save_data.user])
      evt.save_data.status &&
        (this.filterPayload.status_ids = [evt.save_data.status])
      evt.save_data.dueDate.endDate &&
        (this.filterPayload.dueDate = evt.save_data.dueDate)
      this.handleFilterChange()
    },
    async deleteSavedFilter($event) {
      try {
        const { message } = await this.$axios.$post(
          'lm/leads/task/delete-lead-task-filter-history',
          {
            id: $event,
          }
        )
        const index = this.savedSerchFilters.findIndex((i) => i.id === $event)
        this.savedSerchFilters.splice(index, 1)
        this.$toast.global.success(message)
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error.message))
      }
    },
    async addSavedFilter({ title, status, user, date, startDate, endDate }) {
      this.$refs.taskListRef.isLoading = true
      try {
        const { message } = await this.$axios.$post(
          'lm/leads/task/add-lead-task-filter-history',
          {
            name: title,
            save_data: {
              workspace: this.$getWorkspaceId(),
              user,
              status,
              sortBy: 2,
              date,
              dueDate: {
                startDate,
                endDate,
              },
            },
          }
        )
        this.$toast.global.success(message)
        this.savedSerchFilters = []
        window.$('#saved-search').modal('hide')
        this.getSavefilters()
        this.$refs.taskListRef.isLoading = false
        this.$refs.taskListRef.resetForm()
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error.message))
      }
    },
    async getSavefilters() {
      try {
        const { data } = await this.$axios.$post(
          'lm/leads/task/list-lead-task-filter-history'
        )
        this.savedSerchFilters = data
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error.message))
      }
    },
    changeUser(userId) {
      if (typeof userId === 'string') {
        this.filterPayload.user_ids = [userId]
      } else {
        this.filterPayload.user_ids = userId
      }
      this.handleFilterChange()
    },
    changeDueDate({ startDate, endDate }) {
      this.filterPayload.dueDate = {}
      this.filterPayload.dueDate.startDate = startDate
      this.filterPayload.dueDate.endDate = endDate
      this.handleFilterChange()
    },
    changeStatus(statusId) {
      this.$refs.taskListRef.selectedId = ''
      if (typeof statusId === 'string') {
        this.filterPayload.status_ids = [statusId]
      } else {
        this.filterPayload.status_ids = statusId
      }
      this.handleFilterChange()
    },
    changeProduct(product_id) {
      this.filterPayload.product_ids = product_id
      this.handleFilterChange()
    },
    handleFilterChange() {
      this.tasksPage = 0
      this.taskLists = []
      this.tasksInfiniteId = new Date()
    },
    loadTaskListColumnHeader() {
      this.$axios
        .$get(`lm/leads/task/task-list-column-header`)
        .then(({ data }) => {
          const product_inquired = Object.keys(data.product_inquired).map(
            (e, i) => {
              return Object.assign({
                id: e.toString(),
                key: _.uniqueId(),
                name: Object.values(data.product_inquired)[i],
                text: Object.values(data.product_inquired)[i],
                isActive: false,
              })
            }
          )
          this.filterData.product_inquired = product_inquired
          // eslint-disable-next-line array-callback-return
          this.filterData.status = data.task_status.map((e) => {
            return {
              id: e.id.toString(),
              key: _.uniqueId(),
              name: e.status_name,
              text: e.status_name,
              isActive: false,
            }
          })
          // eslint-disable-next-line array-callback-return
          this.filterData.users = data.users.map((user) => {
            return {
              id: user.id.toString(),
              key: _.uniqueId(),
              name: user.name,
              text: user.text,
              isActive: false,
            }
          })
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    getFiltersHeader() {
      const filterHiddenList = window.localStorage
      const filters = JSON.parse(filterHiddenList.getItem('taskHeaderFilters'))
      if (filters) {
        this.filterHideList = filters
      }
    },
    // Update methods
    updateTaskUser(task, { id }) {
      this.$axios
        .$post(`lm/leads/task/update-user`, {
          url_workspace_id: this.$route.params.url_workspace_id,
          id: task.id,
          user_id: id,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
          const { data } = response
          task.user_profile_image = data.user_profile_image
          task.user_name = data.user_name
          task.user_email = data.user_email
          task.product_id = data.product_id
          this.loadTaskListColumnHeader()
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    updateTaskStatus(task) {
      this.$axios
        .$post(`lm/leads/task/update-status`, {
          url_workspace_id: this.$route.params.url_workspace_id,
          id: task.id,
          status: task.status,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    updateTaskProduct(task, productid) {
      this.$axios
        .$post(`lm/leads/task/update-product`, {
          url_workspace_id: this.$route.params.url_workspace_id,
          id: task.id,
          product_id: productid,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
          this.loadTaskListColumnHeader()
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    dueDateHandler(data, task) {
      this.$axios
        .$post(`lm/leads/task/update-due-date`, {
          url_workspace_id: this.$route.params.url_workspace_id,
          id: task.id,
          due_date: data ? data.startDate.split(' ')[0] : null,
        })
        .then((response) => {
          if (data === null) {
            task.due_date = null
          } else {
            this.reRender = false
            this.$nextTick(() => {
              task.due_date = data.startDate.split(' ')[0]
              this.reRender = true
            })
          }
          this.$toast.global.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    // Listing
    loadTaskUserList() {
      const formData = new FormData()
      formData.append('url_workspace_id', this.$route.params.workspace_id)
      this.$axios
        .$post(`lm/leads/task/get-sell-persons`, formData)
        .then(({ data }) => {
          this.taskUserList = data
        })
    },
    async loadTaskProductList() {
      await this.$axios.$get(`lm/leads/task/get-products`).then(({ data }) => {
        this.productOption = data
        this.productOption = this.productOption.map((data) => {
          Object.assign(data, { text: data.product_name })
          data.id = data.product_id
          return data
        })
      })
    },
    loadStatusList() {
      this.$axios.$get(`lm/common/list-lead-task-status`).then(({ data }) => {
        data.forEach((e) => {
          e.id = e.id.toString()
        })
        this.taskStatusList = data
      })
    },
    setDeletedTask(id) {
      this.showDeleteDialog = true
      this.tempDeletedTaskId = id
    },
    tasksInfiniteHandler($state) {
      this.isLoading = true
      this.tasksPage += 1
      const _filterData = new FormData()
      this.filterPayload.status_ids.length &&
        _filterData.append(
          'status_id',
          JSON.stringify(this.filterPayload.status_ids)
        )
      this.filterPayload.product_ids.length &&
        _filterData.append(
          'product_id',
          JSON.stringify(this.filterPayload.product_ids)
        )
      this.filterPayload.user_ids.length &&
        _filterData.append(
          'user_id',
          JSON.stringify(this.filterPayload.user_ids)
        )
      _filterData.append('isDueDate', this.isDueDate)
      if (this.filterPayload.dueDate) {
        _filterData.append('start_date', this.filterPayload.dueDate.startDate)
        _filterData.append('end_date', this.filterPayload.dueDate.endDate)
      }
      this.$axios
        .$post(`lm/leads/task/my-task-list`, _filterData, {
          params: {
            url_workspace_id: this.$route.params.url_workspace_id,
            page: this.currentPage || '',
            sortvalue: this.sortData || '',
            orderby: this.currentSort || '',
          },
        })
        .then(({ data }) => {
          if (this.tasksPage === data.current_page) {
            this.taskLists.push(...data.leadTaskList)
            this.totalTasks = data.total
            $state.loaded()
            this.isLoading = false
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
    },
    toggleSortData(data) {
      if (this.isLoading) return
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'asc'
      } else {
        this.currentSort = this.currentSort === 'asc' ? 'desc' : 'asc'
      }
      this.tasksPage = 0
      this.taskLists = []
      this.tasksInfiniteId = new Date()
    },
    deleteTask() {
      this.$axios
        .$get(`lm/leads/task/delete`, {
          params: {
            id: this.tempDeletedTaskId,
          },
        })
        .then((r) => {
          if (!r.error.length) {
            const i = this.taskLists.findIndex(
              (t) => t.id === this.tempDeletedTaskId
            )
            this.taskLists.splice(i, 1)
            this.totalTasks -= 1
            this.tempDeletedTaskId = null
            this.$toast.global.success(r.message)
          } else {
            this.$toast.error(r.message)
          }
        })
    },

    // download task attachment
    downloadTaskAttachment(name, url) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
  },
}
</script>

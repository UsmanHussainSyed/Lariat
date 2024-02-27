<template>
  <div
    class="main-search"
    :class="{ searching: !!anySearchText || !!recentActive }"
  >
    <form
      class="main-search-inner"
      @submit.prevent="current_index == -1 && searchHistoryStore()"
    >
      <svg
        id="Layer_1"
        class="search-icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 18 18"
        xml:space="preserve"
      >
        <path
          id="Icon_ionic-ios-search"
          class="fill-color"
          d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
        ></path>
      </svg>

      <input
        ref="input"
        v-model="search"
        type="text"
        name="q"
        autocomplete="off"
        class="form-control"
        placeholder="Search in Lariat Marketing Hub…"
        required
        data-lpignore="true"
        @paste="handlePaste"
        @blur="focused = false"
        @focus="focused = active = true"
        @click="searchHistoryFound"
      />
    </form>
    <div
      v-if="active && recentActive && !anySearchText"
      class="main-search-box customscrollbar"
    >
      <div
        v-if="searchHistoryList && searchHistoryList.length"
        class="search-result-section"
      >
        <div class="search-title">Recent Search Results</div>
        <div
          v-for="searchHistory in searchHistoryList"
          :key="searchHistory.id"
          class="search-result-option"
        >
          <nuxt-link
            :to="{
              name: 'workspace_id-project-search-result',
              params: { workspace_id: workspaceId },
              query: { q: searchHistory.search_text },
            }"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <svg
                  id="Layer_1"
                  class="timer-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4346" transform="translate(-115.321 -147.331)">
                    <path
                      id="Path_3396"
                      class="fill-color"
                      d="M124.3,165.3c-5,0-9-4-9-9s4-9,9-9s9,4,9,9C133.3,161.3,129.3,165.3,124.3,165.3z M124.3,148.9c-4.1,0-7.4,3.3-7.4,7.4s3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4C131.7,152.2,128.4,148.9,124.3,148.9z"
                    />
                    <path
                      id="Path_3397"
                      class="fill-color"
                      d="M123.6,156.7l-0.1-4.7c0-0.4,0.4-0.8,0.8-0.8c0,0,0,0,0,0l0,0c0.4,0,0.8,0.4,0.8,0.8v4.1l2.7,2.6c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l0,0c-0.3,0.3-0.8,0.3-1.1,0L123.6,156.7z"
                    />
                  </g>
                </svg>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span>
                    <span
                      >"{{ searchHistory.search_text }}" Search Results</span
                    >
                  </span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="active && anySearchText" class="main-search-box customscrollbar">
      <div v-if="loading" class="main-search-loader">
        <svg
          id="Layer_1"
          class="refresh-icon fa-spin"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4491" transform="translate(-1206 -466)">
            <rect
              id="Rectangle_3030"
              x="1206"
              y="466"
              class="fill-white"
              width="18"
              height="18"
            />
            <g
              id="Icon_feather-refresh-cw"
              transform="translate(-369.921 -994.994)"
            >
              <g id="Path_3566">
                <path
                  id="Path_3569"
                  class="fill-color"
                  d="M1593.2,1469.2h-4.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h3.8v-3.8c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v4.5C1593.9,1468.9,1593.6,1469.2,1593.2,1469.2z"
                />
              </g>
              <g id="Path_3567">
                <path
                  id="Path_3570"
                  class="fill-color"
                  d="M1576.7,1476.7c-0.4,0-0.7-0.3-0.7-0.7v-4.5c0-0.4,0.3-0.7,0.7-0.7h4.5c0.4,0,0.7,0.3,0.7,0.7s-0.3,0.7-0.7,0.7h-3.8v3.8C1577.4,1476.4,1577.1,1476.7,1576.7,1476.7z"
                />
              </g>
              <g id="Path_3568">
                <path
                  id="Path_3571"
                  class="fill-color"
                  d="M1584.9,1477.5c-2,0-3.9-0.8-5.3-2.2l-3.5-3.3c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l3.5,3.3c2.3,2.4,6.2,2.4,8.5,0c0.6-0.6,1.1-1.4,1.4-2.3c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9c0,0,0,0,0,0C1590.9,1475.5,1588.1,1477.5,1584.9,1477.5L1584.9,1477.5z M1593.2,1469.2c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.3c-2.3-2.4-6.2-2.4-8.5,0c-0.6,0.6-1.1,1.4-1.4,2.3c-0.1,0.4-0.6,0.6-0.9,0.4c-0.4-0.1-0.6-0.5-0.4-0.9c1.4-3.9,5.7-5.9,9.6-4.6c1.1,0.4,2,1,2.8,1.8l3.5,3.3c0.3,0.3,0.3,0.7,0,1C1593.6,1469.1,1593.4,1469.2,1593.2,1469.2L1593.2,1469.2z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div v-else-if="noResult" class="search-result-section">
        <div class="search-result-not-found">
          <div class="search-result-structure">
            No result found for "{{ anySearchText }}"
          </div>
        </div>
      </div>
      <div
        v-if="searchResult.clients && searchResult.clients.length"
        class="search-result-section"
      >
        <div class="search-title">Clients</div>
        <div
          v-for="client in searchResult.clients"
          :key="client.user_id"
          class="search-result-option"
        >
          <div
            class="search-result-structure"
            @click="goToProjectList(client, 'Client')"
          >
            <div class="search-result-structure-icon">
              <div
                v-if="client.display_profile_image"
                class="profile-bg"
                :style="{
                  backgroundImage: `url(${client.display_profile_image})`,
                }"
              ></div>
              <div
                v-else
                :class="[
                  'profile-char',
                  'fl-as-imgtxt',
                  'bg-gray',
                  client.user_name[0].toLowerCase(),
                ]"
              >
                {{ client.user_name[0].toUpperCase() }}
              </div>
            </div>
            <div class="search-result-structure-label">
              <div class="search-result-title">
                <span
                  v-html="$getSearchedMarkedText(client.display_title, search)"
                ></span>
                <span>({{ client.workspace_name }})</span>
              </div>
            </div>
          </div>
        </div>

        <div class="search-result-option">
          <div class="show-more-link">
            <nuxt-link
              :to="{
                name: 'workspace_id-project-search-result',
                params: { workspace_id: workspaceId },
                query: { q: search, tab: 'clients' },
              }"
              >Show More Client</nuxt-link
            >
          </div>
        </div>
      </div>

      <div
        v-if="searchResult.sub_clients && searchResult.sub_clients.length"
        class="search-result-section"
      >
        <div class="search-title">
          {{ $_auth().user.project.isClient ? 'Clients' : 'Sub Clients' }}
        </div>
        <div
          v-for="client in searchResult.sub_clients"
          :key="client.user_id"
          class="search-result-option"
        >
          <div
            class="search-result-structure"
            @click="goToProjectList(client, 'SubClient')"
          >
            <div class="search-result-structure-icon">
              <div
                v-if="client.display_profile_image"
                class="profile-bg"
                :style="{
                  backgroundImage: `url(${client.display_profile_image})`,
                }"
              ></div>
              <div
                v-else
                :class="[
                  'profile-char',
                  'fl-as-imgtxt',
                  'bg-gray',
                  client.user_name[0].toLowerCase(),
                ]"
              >
                {{ client.user_name[0].toUpperCase() }}
              </div>
            </div>
            <div class="search-result-structure-label">
              <div class="search-result-title">
                <span
                  v-html="$getSearchedMarkedText(client.display_title, search)"
                ></span>
                <span>({{ client.workspace_name }})</span>
              </div>
            </div>
          </div>
        </div>

        <div class="search-result-option">
          <div class="show-more-link">
            <nuxt-link
              :to="{
                name: 'workspace_id-project-search-result',
                params: { workspace_id: workspaceId },
                query: { q: search, tab: 'sub-clients' },
              }"
              >{{
                $_auth().user.project.isClient
                  ? 'Show More Client'
                  : 'Show More Sub Client'
              }}</nuxt-link
            >
          </div>
        </div>
      </div>

      <div
        v-if="searchResult.projects && searchResult.projects.length"
        class="search-result-section"
      >
        <div class="search-title">Projects</div>
        <div
          v-for="project in searchResult.projects"
          :key="project.workspace_id + '' + project.project_id"
          class="search-result-option"
        >
          <nuxt-link
            :to="{
              name: 'workspace_id-project-project_id',
              params: {
                workspace_id: project.workspace_id,
                project_id: project.project_id,
              },
            }"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span
                    v-html="
                      $getSearchedMarkedText(project.display_title, search)
                    "
                  ></span>
                </div>
                <div class="search-result-subtitle">
                  <span v-if="project.user_name"
                    >{{ project.user_name }} - {{ project.project_id }}</span
                  >
                  <span v-else>
                    {{ project.project_id }}
                  </span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="search-result-option">
          <div class="show-more-link" @click="removeProjectFilter">
            <nuxt-link
              :to="{
                name: 'workspace_id-project-search-result',
                params: { workspace_id: workspaceId },
                query: { q: search, tab: 'projects' },
              }"
              >Show More Projects</nuxt-link
            >
          </div>
        </div>
      </div>
      <div
        v-if="searchResult.tasks && searchResult.tasks.length"
        class="search-result-section"
      >
        <div class="search-title">Tasks</div>
        <div
          v-for="task in searchResult.tasks"
          :key="task.task_id"
          class="search-result-option"
          :class="{ 'completed-task': task.is_completed == '1' }"
        >
          <nuxt-link
            :to="{
              name: 'workspace_id-project-project_id-task_id',
              params: {
                workspace_id: task.workspace_id,
                project_id: task.project_id,
                task_id: task.task_id,
              },
            }"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <svg
                  class="task-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.5"
                  height="17.5"
                  viewBox="0 0 17.5 17.5"
                >
                  <g
                    id="incomplete-tasks"
                    transform="translate(422.202 87.935)"
                  >
                    <circle
                      id="Ellipse_98"
                      data-name="Ellipse 98"
                      cx="8"
                      cy="8"
                      r="8"
                      transform="translate(-421.452 -87.185)"
                      fill="#fff"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      id="Path_2644"
                      data-name="Path 2644"
                      d="M-410.074-81.508l-4.553,4.553-2.277-2.277"
                      transform="translate(0.037 0.046)"
                      fill="#fff"
                      stroke-width="1.5"
                    ></path>
                  </g>
                </svg>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span
                    v-html="$getSearchedMarkedText(task.display_title, search)"
                  ></span>
                </div>
                <div class="search-result-subtitle">
                  <span>{{ task.project_name }} - {{ task.project_id }}</span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="search-result-option">
          <div class="show-more-link">
            <nuxt-link
              :to="{
                name: 'workspace_id-project-search-result',
                params: { workspace_id: workspaceId },
                query: { q: search, tab: 'tasks' },
              }"
              >Show More Tasks</nuxt-link
            >
          </div>
        </div>
      </div>
      <div
        v-if="
          searchResult.Buckets &&
          searchResult.Buckets.length &&
          !$_auth().user.project.isClient
        "
        class="search-result-section"
      >
        <div class="search-title">Buckets</div>
        <div
          v-for="bucket in searchResult.Buckets"
          :key="bucket.workspace_id + '' + bucket.bucket_id"
          class="search-result-option"
        >
          <nuxt-link
            :to="{
              name: 'workspace_id-project-bucket-bucket_id-client_id',
              params: {
                workspace_id: bucket.workspace_id,
                bucket_id: bucket.bucket_id,
                client_id: bucket.client_id,
              },
            }"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span
                    v-html="
                      $getSearchedMarkedText(bucket.display_bucket_name, search)
                    "
                  ></span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="search-result-option">
          <div class="show-more-link" @click="removeBucketFilter">
            <nuxt-link
              :to="{
                name: 'workspace_id-project-search-result',
                params: { workspace_id: workspaceId },
                query: { q: search, tab: 'buckets' },
              }"
              >Show More Buckets</nuxt-link
            >
          </div>
        </div>
      </div>
      <div
        v-if="searchResult.users && searchResult.users.length"
        class="search-result-section"
      >
        <div class="search-title">Peoples</div>
        <div
          v-for="user in searchResult.users"
          :key="user.user_id"
          class="search-result-option"
        >
          <nuxt-link v-if="user.user_id == $auth.user.id" to="/profile">
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <div
                  v-if="user.display_profile_image"
                  class="profile-bg"
                  :style="{
                    backgroundImage: `url(${user.display_profile_image})`,
                  }"
                ></div>
                <div
                  v-else
                  :class="[
                    'profile-char',
                    'fl-as-imgtxt',
                    'bg-gray',
                    user.user_name[0].toLowerCase(),
                  ]"
                >
                  {{ user.user_name[0].toUpperCase() }}
                </div>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span
                    v-html="$getSearchedMarkedText(user.display_title, search)"
                  ></span>
                </div>
                <div class="search-result-subtitle">
                  <span
                    v-html="$getSearchedMarkedText(user.user_email, search)"
                  ></span>
                </div>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link
            v-else
            :to="{
              name: 'workspace_id-workspace-settings-user-userid-edit',
              params: {
                workspace_id: workspaceId,
                userid: user.user_id,
              },
            }"
          >
            <div class="search-result-structure">
              <div class="search-result-structure-icon">
                <div
                  v-if="user.display_profile_image"
                  class="profile-bg"
                  :style="{
                    backgroundImage: `url(${user.display_profile_image})`,
                  }"
                ></div>
                <div
                  v-else
                  :class="[
                    'profile-char',
                    'fl-as-imgtxt',
                    'bg-gray',
                    user.user_name[0].toLowerCase(),
                  ]"
                >
                  {{ user.user_name[0].toUpperCase() }}
                </div>
              </div>
              <div class="search-result-structure-label">
                <div class="search-result-title">
                  <span
                    v-html="$getSearchedMarkedText(user.display_title, search)"
                  ></span>
                </div>
                <div class="search-result-subtitle">
                  <span
                    v-html="$getSearchedMarkedText(user.user_email, search)"
                  ></span>
                </div>
                <div class="search-result-subtitle">
                  <span>({{ user.workspace_name }})</span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="search-result-option">
          <div class="show-more-link">
            <nuxt-link
              :to="{
                name: 'workspace_id-project-search-result',
                params: { workspace_id: workspaceId },
                query: { q: search, tab: 'users' },
              }"
              >Show More People</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { SearchBus } from '~/buses/searchbus'

const keys = ['tasks', 'projects', 'users', 'Buckets']

export default {
  data() {
    return {
      keys,
      search: '',
      loading: false,
      focused: false,
      active: false,
      searchResult: {},
      pastedText: null,
      current_index: -1,
      searchHistoryList: [],
      recentActive: false,
    }
  },
  computed: {
    anySearchText() {
      return (this.search || this.pastedText || '').trim()
    },
    noResult() {
      const { users, projects, tasks, Buckets } = this.searchResult

      return (
        (!users || !users.length) &&
        (!projects || !projects.length) &&
        (!Buckets || !Buckets.length) &&
        (!tasks || !tasks.length)
      )
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {
    active(a) {
      if (a) {
        this.timerId && clearTimeout(this.timerId)

        this.$nextTick(() => this.initJquery())

        document.addEventListener('click', this.delayedBlured)
        document.addEventListener('contextmenu', this.delayedBlured)
      } else {
        document.removeEventListener('click', this.delayedBlured)
        document.removeEventListener('contextmenu', this.delayedBlured)
      }
    },
    search() {
      this.active = true
      this.commonSearch()
    },
  },
  mounted() {
    this.$nextTick(() => (this.active = false))
    this.$refs.input.addEventListener(
      'keydown',
      (e) =>
        parseInt(e.keyCode) === 9 &&
        this.$nextTick(() => (this.active = false)),
      true
    )
  },
  methods: {
    removeProjectFilter() {
      this.$store.dispatch('project/projectserach/setProjectFilter', null)
    },
    removeBucketFilter() {
      this.$store.dispatch('project/projectserach/setBucketFilter', null)
    },
    handlePaste(ev) {
      this.pastedText =
        ev && ev.clipboardData && ev.clipboardData.getData('text')
    },
    delayedBlured() {
      if (!this.focused)
        this.timerId = setTimeout(() => (this.active = false), 1)
    },
    commonSearch: _.debounce(function () {
      const search = (this.search || this.pastedText || '').trim()
      if (!search) {
        this.searchResult = {}
        this.loading = false
        return
      }

      this.loading = true

      const search_text = search

      this.$axios
        .$post(
          `dashboard/common-search?search_text=${encodeURI(search_text)}`,
          {
            search_text,
            accessibleWorkspaces: this.$allowedWorkspaces(
              'slug'
            ).project.list.map((wp) => wp.id),
          }
        )
        .then(({ data }) => {
          this.searchResult = data || {}
          this.$nextTick(() => this.initJquery())
        })
        .finally(() => {
          this.pastedText = null
          this.$nextTick(() => (this.loading = false))
        })
    }, 1000),
    initJquery() {
      const self = this

      window.$(self.$el).find('.main-search-box .search-result-option').unbind()

      window
        .$(self.$el)
        .find('.main-search-box .search-result-option')
        .hover(function () {
          window
            .$(self.$el)
            .find('.search-result-option')
            .removeClass('selected')
          window.$(self.$el).find(this).addClass('selected')
        })

      const $input = window.$(self.$el).find('.form-control')
      let current_index = window.$(self.$el).find('.selected').index()
      const $number_list = window.$(self.$el).find('.search-result-section')
      const $options = $number_list.find('.search-result-option')
      const items_total = $options.length

      this.current_index = current_index

      $input.unbind('keyup')

      $input.bind('keyup', function (e) {
        if (parseInt(e.keyCode) === 13) {
          if (current_index !== -1) {
            window.$($options.eq(current_index)).find('a')[0].click()
            $input.blur()
            self.active = false
          } else {
            self.active = false
          }
        } else if (parseInt(e.keyCode) === 40) {
          self.focused = true
          if (current_index + 1 < items_total) {
            current_index++
            change_selection()
          }
          e.preventDefault()
        } else if (parseInt(e.keyCode) === 38) {
          self.focused = true
          if (current_index > 0) {
            current_index--
            change_selection()
          }
          e.preventDefault()
        }

        self.current_index = current_index
      })

      function change_selection() {
        $options.removeClass('selected')
        $options.eq(current_index).addClass('selected')
        const scrollTop = window.$($options.eq(current_index)).offset().top
        const goingUp =
          window.$(self.$el).find('.main-search-box')[0].scrollTop > scrollTop

        if (scrollTop > 400 || goingUp)
          window
            .$(self.$el)
            .find('.main-search-box')
            .animate(
              {
                scrollTop:
                  window.$('.main-search-box')[0].scrollTop +
                  48 * (goingUp ? -1 : 1),
              },
              100
            )
      }
    },
    async searchHistoryFound() {
      try {
        const { data } = await this.$axios.$get(`/dashboard/recent-search`)
        if (data && data.length) {
          this.recentActive = true
          this.searchHistoryList = data
        }
      } catch (e) {
        this.loading = false
        this.recentActive = false
      }
    },
    searchHistoryStore() {
      const search = (this.search || this.pastedText || '').trim()
      const search_text = search
      this.$axios
        .$post(
          `dashboard/add-recent-search?search_text=${encodeURI(search_text)}`
        )
        .then(({ data }) => {
          if (data) {
            this.active = false
            this.recentActive = true
            this.searchHistoryList.unshift(data)
            return this.$router.push({
              name: 'workspace_id-project-search-result',
              params: { workspace_id: this.workspaceId },
              query: { q: this.search },
            })
          } else if (!data) {
            return this.$router.push({
              name: 'workspace_id-project-search-result',
              params: { workspace_id: this.workspaceId },
              query: { q: this.search },
            })
          }
        })
        .catch((e) => {
          const { data } = e.response
          if (data.code === 403) {
            this.active = false
            return this.$router.push({
              name: 'workspace_id-project-search-result',
              params: { workspace_id: this.workspaceId },
              query: { q: this.search },
            })
          }
        })
    },
    getUserImage(user) {
      if (user.display_profile_image) {
        return ` url(${user.display_profile_image})`
      }
      if (!user.display_profile_image && user.user_name) {
        return ` url('https://ui-avatars.com/api/?name=${encodeURI(
          user.user_name
        )}&size=128&background=EFF1F3&font-size=0.5&bold=true')`
      }
    },
    goToProjectList(client, type) {
      const projectListFilterData = {
        client_id:
          type === 'Client'
            ? [
                {
                  client_id: client.user_id,
                  client_name: client.user_name,
                  clientsOrNot: client.internal_client,
                  id: client.user_id,
                  text: client.user_name,
                },
              ]
            : [],
        internal_workspace_id: 0,
        workspaceId: this.$allowedWorkspaces('slug').project.ids,
        sub_client_id:
          type === 'SubClient'
            ? [
                {
                  client_id: client.user_id,
                  client_name: client.user_name,
                  id: client.user_id,
                  text: client.user_name,
                },
              ]
            : [],
        project_created_by_id: [],
        project_owner_id: [],
        development_owner_id: [],
        projectStatusId: [],
        search_term: '',
        is_recent_project: 0,
        is_archive_project: 0,
        is_favourite_project: 0,
        is_collaborate: 0,
        filterTextId: '1',
        sortValue: '',
        orderBy: '',
      }
      this.$store.dispatch(
        'project/projectserach/setProjectFilter',
        projectListFilterData
      )
      SearchBus.$emit('access-client', projectListFilterData)
      return this.$router.push({
        name: 'workspace_id-project-all-project-list',
        params: {
          workspace_id: this.$_auth().id,
        },
      })
    },
  },
}
</script>

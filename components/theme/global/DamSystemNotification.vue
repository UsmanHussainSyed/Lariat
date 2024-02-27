<template>
  <div :class="['notification', showList ? 'show' : '']">
    <a
      v-tooltip="{
        html: false,
        content: 'Notifications',
      }"
      href="javascript:void(0);"
      class="bell-icon-link"
      @click="enableBellClick && openList()"
    >
      <svg
        id="Layer_1"
        class="bell-icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 18 18"
        xml:space="preserve"
      >
        <g id="notification" transform="translate(-29.867 0)">
          <path
            id="Path_38100"
            class="fill-color"
            d="M44.4,9.2V7.6c0-2.4-1.6-4.5-3.9-5.2V1.6c0-0.9-0.7-1.6-1.6-1.6s-1.6,0.7-1.6,1.6v0.8C35,3,33.5,5.2,33.5,7.6v1.7c0,2.1-0.8,4.2-2.3,5.8c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.4,0.1h4.8c0.3,1.4,1.7,2.3,3.1,2.1c1-0.2,1.8-1,2.1-2.1h4.8c0.3,0,0.5-0.2,0.5-0.5c0-0.1-0.1-0.3-0.1-0.4C45.2,13.5,44.4,11.4,44.4,9.2z M38.4,1.6c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5v0.6c-0.2,0-0.3,0-0.5,0s-0.4,0-0.5,0L38.4,1.6z M38.9,16.9c-0.7,0-1.3-0.4-1.5-1.1h3C40.2,16.5,39.6,16.9,38.9,16.9z M32.7,14.8c1.2-1.6,1.9-3.6,1.9-5.6V7.6c0-2.4,1.9-4.4,4.3-4.5c2.4,0,4.4,1.9,4.5,4.3c0,0,0,0.1,0,0.1v1.7c0,2,0.6,4,1.9,5.6L32.7,14.8z"
          />
        </g>
      </svg>
      <span v-if="displayBatchCount.show" class="count">
        {{ displayBatchCount.count_ }}
      </span>
    </a>
    <div v-click-outside="onClickOutsideOfList" class="notification-body">
      <div
        v-infinite-scroll="infinityHandler"
        class="notification-wrapper"
        infinite-scroll-distance="1"
      >
        <div class="notification-header-fixed">
          <div class="daygroup">
            <span></span>
          </div>

          <h4>
            {{
              activeTab == 1
                ? `Notifications (${unreadNotifications})`
                : `Announcements (${unreadAnnouncements})`
            }}
          </h4>
          <div class="readall">
            <a
              v-if="showMarkAllAsReadNotification"
              href="javascript:void(0);"
              @click="readAllNotifications"
              >Mark all as read</a
            >
            <a
              v-if="showMarkAllAsReadAnnouncement"
              href="javascript:void(0);"
              @click="readAllAnnouncements"
              >Mark all as read</a
            >
          </div>
        </div>
        <ul class="nav nav-tabs nav-justified">
          <li
            v-tooltip="
              damSystemNotificationAllowed
                ? ''
                : 'Please upgrade your subscription plan to enable this feature.'
            "
            class="nav-item"
          >
            <a
              :href="damSystemNotificationAllowed ? '#notifications' : ''"
              data-toggle="tab"
              :class="{
                active: activeTab === 1 && damSystemNotificationAllowed,
              }"
              :style="
                damSystemNotificationAllowed
                  ? ''
                  : 'opacity:0.4;pointer-events:none;cursor:not-allowed'
              "
              @click="damSystemNotificationAllowed && changeTab(1)"
              >Notifications ({{ unreadNotifications }})</a
            >
          </li>
          <li class="nav-item">
            <a
              href="#announcement"
              :class="{ active: activeTab === 2 }"
              data-toggle="tab"
              @click="changeTab(2)"
              >Announcements ({{ unreadAnnouncements }})</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div
            v-if="damSystemNotificationAllowed"
            id="notifications"
            :class="['tab-pane', activeTab === 1 ? 'active' : '']"
          >
            <a
              v-if="showMarkAllAsReadNotification"
              href="javascript:void(0);"
              class="mark-all-read"
              @click="readAllNotifications"
              >Mark all as read</a
            >
            <label v-if="!initialLoading" class="label-switch small no-text"
              >Only show unread.
              <input
                v-model="showOnlyUnreadNotifications"
                :true-value="true"
                :false-value="false"
                type="checkbox"
                class="switch"
                @change="
                  () => {
                    page = 1
                    systemNotifications = []
                    initialLoadNotifications()
                  }
                "
              />
              <span class="lable"></span>
            </label>
            <section v-if="todayNotifications.length">
              <div class="section-header">
                <span>Today</span>
              </div>
              <div
                v-for="(noti, index) in todayNotifications"
                :key="index"
                :class="['notification-item', !noti.read_at ? 'unread' : '']"
              >
                <a
                  :href="noti.notification_url"
                  :target="noti.new_tab ? '_blank' : ''"
                  @click.stop="readUnreadNotification(noti.id, true)"
                >
                  <div class="item-wrapper">
                    <div
                      v-if="noti.sender_user_detail.profile_image"
                      class="profile-bg fl-as-imgtxt"
                      :title="noti.sender_user_detail.name"
                      :style="{
                        backgroundImage: `url(${noti.sender_user_detail.display_profile_image})`,
                      }"
                    ></div>
                    <div
                      v-else
                      :class="[
                        'profile-char fl-as-imgtxt',
                        noti.sender_user_detail.name[0].toLowerCase(),
                      ]"
                      :title="noti.sender_user_detail.name"
                    >
                      {{ noti.sender_user_detail.name[0].toUpperCase() }}
                    </div>
                    <div class="item-content">
                      <h5>
                        <a
                          v-if="noti.notification_url"
                          :href="noti.notification_url"
                          :target="noti.new_tab ? '_blank' : ''"
                          style="word-break: break-word"
                          @click.stop="readUnreadNotification(noti.id, true)"
                        >
                          {{ noti.notification_text }}
                        </a>
                        <template v-else>{{ noti.notification_text }}</template>
                        <span>{{ noti.created_date }}</span>
                      </h5>
                      <div class="path-link">
                        <span>{{ noti.brand_name }}</span>
                      </div>
                    </div>
                    <button
                      v-tooltip.left="{
                        html: false,
                        trigger: 'hover',
                        hideOnTargetClick: false,
                        content: noti.read_at
                          ? `Mark as unread`
                          : `Mark as read`,
                      }"
                      class="notification-read-unread"
                      aria-pressed="false"
                      @click.capture.prevent.stop="
                        readUnreadNotification(noti.id)
                      "
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
                </a>
              </div>
            </section>
            <section v-if="yesterdayNotifications.length">
              <div class="section-header">
                <span>Yesterday</span>
              </div>
              <div
                v-for="(noti, index) in yesterdayNotifications"
                :key="index"
                :class="['notification-item', !noti.read_at ? 'unread' : '']"
              >
                <a
                  :href="noti.notification_url"
                  :target="noti.new_tab ? '_blank' : ''"
                  @click="readUnreadNotification(noti.id, true)"
                >
                  <div class="item-wrapper">
                    <div
                      v-if="noti.sender_user_detail.profile_image"
                      class="profile-bg fl-as-imgtxt"
                      :title="noti.sender_user_detail.name"
                      :style="{
                        backgroundImage: `url(${noti.sender_user_detail.display_profile_image})`,
                      }"
                    ></div>
                    <div
                      v-else
                      :class="[
                        'profile-char fl-as-imgtxt',
                        noti.sender_user_detail.name[0].toLowerCase(),
                      ]"
                      :title="noti.sender_user_detail.name"
                    >
                      {{ noti.sender_user_detail.name[0].toUpperCase() }}
                    </div>
                    <div class="item-content">
                      <h5>
                        <a
                          v-if="noti.notification_url"
                          :href="noti.notification_url"
                          :target="noti.new_tab ? '_blank' : ''"
                          style="word-break: break-word"
                          @click="readUnreadNotification(noti.id, true)"
                        >
                          {{ noti.notification_text }}
                        </a>
                        <template v-else>{{ noti.notification_text }}</template>
                        <span>{{ noti.created_date }}</span>
                      </h5>
                      <div class="path-link">
                        <span>{{ noti.brand_name }}</span>
                      </div>
                    </div>
                    <button
                      v-tooltip.left="{
                        html: false,
                        trigger: 'hover',
                        hideOnTargetClick: false,
                        content: noti.read_at
                          ? `Mark as unread`
                          : `Mark as read`,
                      }"
                      class="notification-read-unread"
                      aria-pressed="false"
                      @click.prevent="readUnreadNotification(noti.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
                </a>
              </div>
            </section>
            <section v-if="olderNotifications.length">
              <div class="section-header">
                <span>Older</span>
              </div>
              <div
                v-for="(noti, index) in olderNotifications"
                :key="index"
                :class="['notification-item', !noti.read_at ? 'unread' : '']"
              >
                <a
                  :href="noti.notification_url"
                  :target="noti.new_tab ? '_blank' : ''"
                  @click="readUnreadNotification(noti.id, true)"
                >
                  <div class="item-wrapper">
                    <div
                      v-if="noti.sender_user_detail.profile_image"
                      class="profile-bg fl-as-imgtxt"
                      :title="noti.sender_user_detail.name"
                      :style="{
                        backgroundImage: `url(${noti.sender_user_detail.display_profile_image})`,
                      }"
                    ></div>
                    <div
                      v-else
                      :class="[
                        'profile-char fl-as-imgtxt',
                        noti.sender_user_detail.name[0].toLowerCase(),
                      ]"
                      :title="noti.sender_user_detail.name"
                    >
                      {{ noti.sender_user_detail.name[0].toUpperCase() }}
                    </div>
                    <div class="item-content">
                      <h5>
                        <a
                          v-if="noti.notification_url"
                          :href="noti.notification_url"
                          :target="noti.new_tab ? '_blank' : ''"
                          style="word-break: break-word"
                          @click="readUnreadNotification(noti.id, true)"
                        >
                          {{ noti.notification_text }}
                        </a>
                        <div
                          v-else
                          style="cursor: default"
                          @click="readUnreadNotification(noti.id, true)"
                        >
                          {{ noti.notification_text }}
                        </div>
                        <span>{{ noti.created_date }}</span>
                      </h5>
                      <div class="path-link">
                        <span>{{ noti.brand_name }}</span>
                      </div>
                    </div>
                    <button
                      v-tooltip.left="{
                        html: false,
                        trigger: 'hover',
                        hideOnTargetClick: false,
                        content: noti.read_at
                          ? `Mark as unread`
                          : `Mark as read`,
                      }"
                      class="notification-read-unread"
                      aria-pressed="false"
                      @click.prevent.stop="readUnreadNotification(noti.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
                </a>
              </div>
            </section>
            <template v-if="initialLoading || loadMoreLoading">
              <section>
                <div v-for="index in 5" :key="index" class="notification-item">
                  <div class="item-wrapper">
                    <div class="profile-bg fl-as-imgtxt" style="margin-top: 0">
                      <ContentLoader
                        :speed="2"
                        :animate="true"
                        :height="36"
                        :width="36"
                        :style="{
                          width: '36px',
                          height: '36px',
                          borderRadius: '3px',
                        }"
                      >
                        <rect
                          x="0"
                          :y="0"
                          rx="0"
                          ry="0"
                          width="36"
                          height="36"
                        />
                        />
                      </ContentLoader>
                    </div>
                    <div
                      class="item-content"
                      style="justify-content: space-between"
                    >
                      <ContentLoader
                        :speed="2"
                        :animate="true"
                        :height="12"
                        :width="300"
                        :style="{
                          width: '300px',
                          height: '12px',
                          borderRadius: '3px',
                        }"
                      >
                        <rect
                          x="0"
                          :y="0"
                          rx="0"
                          ry="0"
                          width="300"
                          height="12"
                        />
                        />
                      </ContentLoader>
                      <ContentLoader
                        :speed="2"
                        :animate="true"
                        :height="12"
                        :width="100"
                        :style="{
                          width: '100px',
                          height: '12px',
                          borderRadius: '3px',
                        }"
                      >
                        <rect
                          x="0"
                          :y="0"
                          rx="0"
                          ry="0"
                          width="100"
                          height="12"
                        />
                        />
                      </ContentLoader>
                    </div>
                  </div>
                </div>
              </section>
            </template>
            <div
              v-if="
                !todayNotifications.length &&
                !yesterdayNotifications.length &&
                !olderNotifications.length &&
                !initialLoading
              "
              class="no-notification"
            >
              <img src="~/assets/img/no-notification.svg" alt="" />
              <p>You have no notifications available.</p>
            </div>
            <div
              v-else-if="
                showLast30DaysMsg &&
                !loadMoreLoading &&
                (todayNotifications.length ||
                  yesterdayNotifications.length ||
                  olderNotifications.length)
              "
              class="no-more-load"
            >
              <img src="~/assets/img/30-days-notification.svg" alt="" />
              <p>That's all your notifications from the last 30 days.</p>
            </div>
          </div>
          <div
            id="announcement"
            :class="['tab-pane', activeTab === 2 ? 'active' : '']"
          >
            <template v-if="initialLoading_">
              <div style="text-align: center; padding: 20px">
                <i>Loading.....</i>
              </div>
            </template>
            <template v-else>
              <section class="announcement">
                <div class="section-header">
                  <label
                    v-if="!initialLoading_ && announcements.length"
                    class="label-switch small no-text"
                    >Only show unread
                    <input
                      v-model="showOnlyUnreadAnnouncements"
                      :true-value="true"
                      :false-value="false"
                      type="checkbox"
                      class="switch"
                    />
                    <span class="lable"></span>
                  </label>
                  <a
                    v-if="showMarkAllAsReadAnnouncement"
                    href="javascript:void(0);"
                    class="mark-all-read"
                    @click="readAllAnnouncements"
                    >Mark all as read</a
                  >
                </div>
                <div
                  v-for="anno in announcementComputed"
                  :key="anno.id"
                  :class="['notification-item', !anno.read_at ? 'unread' : '']"
                >
                  <a
                    href="javascript:void(0);"
                    data-toggle="modal"
                    data-target="#announcement-detail"
                    class="item-link"
                    @click="announcementClicked(anno)"
                  ></a>
                  <div class="item-wrapper">
                    <div
                      v-if="anno.announcements_detail.publisher.profile_image"
                      class="profile-bg fl-as-imgtxt"
                      :title="anno.announcements_detail.publisher.name"
                      :style="{
                        backgroundImage: `url(${anno.announcements_detail.publisher.display_profile_image})`,
                      }"
                    ></div>
                    <div
                      v-else
                      :class="[
                        'profile-char fl-as-imgtxt',
                        anno.announcements_detail.publisher.name[0].toLowerCase(),
                      ]"
                      :title="anno.announcements_detail.publisher.name"
                    >
                      {{
                        anno.announcements_detail.publisher.name[0].toUpperCase()
                      }}
                    </div>
                    <div class="item-content">
                      <h5>
                        {{ anno.announcements_detail.title
                        }}<span>{{ anno.created_date }}</span>
                      </h5>
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#announcement-detail"
                        @click="announcementClicked(anno)"
                      >
                        {{ htmlToText(anno.announcements_detail.description) }}
                      </a>
                      <div class="path-link">
                        <span>{{ anno.workspace_detail.workspace_name }}</span>
                        <span>{{
                          anno.announcements_detail.publisher.name
                        }}</span>
                      </div>
                    </div>
                    <button
                      v-tooltip.left="{
                        html: false,
                        trigger: 'hover',
                        hideOnTargetClick: false,
                        content: anno.read_at
                          ? `Mark as unread`
                          : `Mark as read`,
                      }"
                      class="notification-read-unread"
                      aria-pressed="false"
                      @click="readUnreadAnnouncement(anno.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
                </div>
              </section>
              <div
                v-if="loadMoreLoading_"
                style="text-align: center; padding: 10px"
              >
                <i>Loading....</i>
              </div>
              <div v-if="!announcementComputed.length" class="no-notification">
                <img src="~/assets/img/no-notification.svg" alt="" />
                <p>You have no announcements available.</p>
              </div>
              <div
                v-if="
                  showLast30DaysMsg_ &&
                  !loadMoreLoading_ &&
                  announcementComputed.length
                "
                class="no-more-load"
              >
                <img src="~/assets/img/30-days-notification.svg" alt="" />
                <p>That's all your announcements till now.</p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="bottom-fixed">
        <nuxt-link
          v-if="workspaceModule"
          :to="{
            name: 'notification-settings-workspace_id-module_id-type',
            params: {
              workspace_id: $_auth().id,
              module_id: workspaceModule,
              type: 'system',
            },
          }"
          >Notification Settings</nuxt-link
        >
      </div>
    </div>
    <!--  Announcement Detail Modal  -->
    <div
      v-if="showAnnouncementModel"
      id="announcement-detail"
      class="modal fade"
    >
      <div
        class="modal-dialog large modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content text-left">
          <div class="modal-header">
            <h5 class="modal-title">Announcement</h5>
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
          <div class="modal-body announcement-body">
            <h4>{{ clickedAnnouncementDetail.announcements_detail.title }}</h4>
            <div class="anno-date">
              Announced By :
              <strong>{{
                clickedAnnouncementDetail.announcements_detail.publisher.name
              }}</strong>
            </div>
            <div class="anno-date mb-3">
              Announced Date :
              <strong>{{
                $moment()
                  .local(
                    clickedAnnouncementDetail.announcements_detail.publish_date
                  )
                  .format('MMM DD, YYYY')
              }}</strong>
            </div>

            <div
              v-html="
                clickedAnnouncementDetail.announcements_detail.description
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import { isEmpty } from 'lodash'
import vClickOutside from 'v-click-outside'
import Profile from '~/assets/img/profile.png'
import routeParams from '~/mixins/routeParams'
export default {
  name: 'DamSystemNotification',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: { ContentLoader },
  mixins: [routeParams],
  data() {
    return {
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      dummyProfile: Profile,
      page: 1,
      lastPage: 1,
      activeTab: 1, // 1 = notification  2 = announcement
      systemNotifications: [],
      unreadNotifications: 0,
      showList: false,
      initialLoading: false,
      loadMoreLoading: false,
      showLast30DaysMsg: false,
      enableClickOutside: false,
      enableBellClick: true,
      badgesCount: this.$auth.user.dam_badges_count,
      showOnlyUnreadNotifications: false,
      initialLoading_: false,
      loadMoreLoading_: false,
      page_: 1,
      lastPage_: 1,
      announcements: [],
      unreadAnnouncements: 0,
      showLast30DaysMsg_: false,
      showOnlyUnreadAnnouncements: false,
      clickedAnnouncementDetail: {},
    }
  },
  computed: {
    workspaceModule() {
      const workspaceModules = this.$auth.user.accessibleWorkspaces
        .find(({ id }) => parseInt(id) === parseInt(this.$_auth().id))
        .module.map(({ module_id }) => module_id)
      return workspaceModules.find((e) => e === 2)
    },
    todayNotifications() {
      if (this.showOnlyUnreadNotifications) {
        return this.systemNotifications.filter(
          ({ notification_label, read_at }) =>
            notification_label.toLowerCase() === 'today' && read_at === null
        )
      } else {
        return this.systemNotifications.filter(
          ({ notification_label }) =>
            notification_label.toLowerCase() === 'today'
        )
      }
    },
    yesterdayNotifications() {
      if (this.showOnlyUnreadNotifications) {
        return this.systemNotifications.filter(
          ({ notification_label, read_at }) =>
            notification_label.toLowerCase() === 'yesterday' && read_at === null
        )
      } else {
        return this.systemNotifications.filter(
          ({ notification_label }) =>
            notification_label.toLowerCase() === 'yesterday'
        )
      }
    },
    olderNotifications() {
      if (this.showOnlyUnreadNotifications) {
        return this.systemNotifications.filter(
          ({ notification_label, read_at }) =>
            notification_label.toLowerCase() === 'older' && read_at === null
        )
      } else {
        return this.systemNotifications.filter(
          ({ notification_label }) =>
            notification_label.toLowerCase() === 'older'
        )
      }
    },
    showMarkAllAsReadNotification() {
      const data = this.systemNotifications.filter(
        ({ read_at }) => read_at === null
      )
      return !!(data.length && this.activeTab === 1)
    },
    displayBatchCount() {
      return {
        show: this.badgesCount >= 1,
        count_: this.badgesCount > 9 ? `9+` : `${this.badgesCount}`,
      }
    },
    announcementComputed() {
      if (this.showOnlyUnreadAnnouncements) {
        return this.announcements.filter(({ read_at }) => read_at === null)
      } else {
        return this.announcements
      }
    },
    showMarkAllAsReadAnnouncement() {
      const data = this.announcements.filter(({ read_at }) => read_at === null)
      return !!(data.length && this.activeTab === 2)
    },
    showAnnouncementModel() {
      return !isEmpty(this.clickedAnnouncementDetail)
    },
    damSystemNotificationAllowed() {
      return !!this.$auth.user?.subscription_features?.system_notifications
        ?.enable
    },
  },
  mounted() {
    this.$echo
      .private(`user.${this.$auth.user.id}.projectBatchNotification`)
      .listen('.ProjectUserNotificationBadgesEvent', (e) => {
        const {
          data: { dam_badges_count },
        } = e
        this.badgesCount = this.damSystemNotificationAllowed
          ? dam_badges_count
          : 0
      })

    this.$echo
      .private(`user.${this.$auth.user.id}.getUserSubscriptionChannel`)
      .listen('.GetUserSubscriptionEvent', async (e) => {
        const { plan_assign } = e

        if (plan_assign) {
          this.$auth.fetchUser()
          const { data } = await this.$axios
            .$get(`/view-workspace?workspace_id=${this.routeWorkspaceId}`)
            .catch(() => {})
          this.$axios
            .$post('subscription/update-event-sent', {
              workspace_id: data.workspace_unique_id,
              event_status: true,
            })
            .catch(console.log)
        }
      })
    this.loadJQ()
    this.getBadgesCount()
    if (!this.damSystemNotificationAllowed) {
      this.activeTab = 2
    }
  },
  beforeDestroy() {
    this.$echo.leave(`user.${this.$auth.user.id}.projectBatchNotification`)
  },

  methods: {
    async getBadgesCount() {
      try {
        const { data } = await this.$axios.$get(`user-badges-count`)
        this.badgesCount = data.dam_badges_count
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    loadJQ() {
      window.$('.notification-body .notification-wrapper').scroll(function () {
        const scroll = window.$(this).scrollTop()
        if (scroll >= 60) {
          window.$(this).addClass('notifixed')
        } else {
          window.$(this).removeClass('notifixed')
        }
      })
    },
    infinityHandler() {
      if (this.activeTab === 1 && this.damSystemNotificationAllowed) {
        // notifications
        this.systemNotifications.length &&
          this.page <= this.lastPage &&
          this.loadMoreNotifications()
      }
      if (this.activeTab === 2) {
        // announcements
        this.announcements.length &&
          this.page_ <= this.lastPage_ &&
          this.loadMoreAnnouncements()
      }
    },
    changeTab(id) {
      this.activeTab = id === 1 && this.damSystemNotificationAllowed ? id : 2
      if (this.activeTab === 2 && !this.announcements.length) {
        this.initialLoadAnnouncements()
      }
    },
    openList() {
      this.showList = true
      this.enableBellClick = false
      setTimeout(() => {
        this.enableClickOutside = true
      }, 500)
      this.page = 1
      this.systemNotifications = []
      this.initialLoadNotifications()
    },
    closeList() {
      if (this.enableClickOutside) {
        this.enableClickOutside = false
        this.enableBellClick = true
        this.showList = false
        setTimeout(() => {
          this.activeTab = 1
          this.initialLoading = false
          this.systemNotifications = []
          this.showLast30DaysMsg = false
          this.page = 1
          this.lastPage = 1
          this.showOnlyUnreadNotifications = false
          this.initialLoading_ = false
          this.announcements = []
          this.showLast30DaysMsg_ = false
          this.page_ = 1
          this.lastPage_ = 1
          this.showOnlyUnreadAnnouncements = false
        }, 200)
      }
    },
    async initialLoadNotifications() {
      if (!this.damSystemNotificationAllowed) return
      try {
        this.initialLoading = true
        const { data } = await this.$axios.$get(
          'digital-assets/notification/system-notification-list',
          {
            params: {
              workspace_id: this.$getWorkspaceId(),
              show_unread: ~~this.showOnlyUnreadNotifications,
              page: this.page,
              module_id: 2,
            },
          }
        )
        this.lastPage = data.last_page
        this.systemNotifications.push(...data.data)
        this.unreadNotifications = data.total_unread_notification
        this.unreadAnnouncements = data.total_unread_announcement
        this.initialLoading = false
        if (this.page < this.lastPage) {
          this.page += 1
        } else {
          this.showLast30DaysMsg = true
        }
      } catch (e) {
        this.initialLoading = false
        this.$toast.error(this.$getErrorMessage(e))
      } finally {
        this.badgesCount = 0
      }
    },
    async loadMoreNotifications() {
      if (
        this.loadMoreLoading ||
        this.page > this.lastPage ||
        !this.damSystemNotificationAllowed
      )
        return
      try {
        this.loadMoreLoading = true
        const { data } = await this.$axios.$get(
          `digital-assets/notification/system-notification-list`,
          {
            params: {
              workspace_id: this.$getWorkspaceId(),
              show_unread: ~~this.showOnlyUnreadNotifications,
              page: this.page,
              module_id: 2,
            },
          }
        )
        this.lastPage = data.last_page
        this.loadMoreLoading = false
        this.initialLoading = false
        if (data.data.length) {
          this.showLast30DaysMsg = true
          this.systemNotifications.push(...data.data)
          this.page += 1
        } else {
          this.showLast30DaysMsg = true
        }
      } catch (e) {
        this.loadMoreLoading = false
        this.initialLoading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async readUnreadNotification(nId, readOnly) {
      const findIndex = this.systemNotifications.findIndex(
        ({ id }) => parseInt(id) === parseInt(nId)
      )
      if (findIndex !== -1) {
        const read_at = this.systemNotifications[findIndex].read_at
          ? null
          : 'read'
        if (!read_at && readOnly) return
        this.systemNotifications[findIndex].read_at = read_at
        const currentCount = this.unreadNotifications
        this.unreadNotifications = this.systemNotifications[findIndex].read_at
          ? currentCount - 1
          : currentCount + 1
      }
      try {
        const { data } = await this.$axios.$post(
          `digital-assets/notification/read-unread-system-notification`,
          {
            notification_id: nId,
            workspace_id: this.$getWorkspaceId(),
          }
        )
        this.unreadNotifications = data.total_unread_notification
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async readAllNotifications() {
      this.systemNotifications = this.systemNotifications.map((data) => {
        return { ...data, read_at: 'read' }
      })
      this.unreadNotifications = 0
      try {
        const { data } = await this.$axios.$post(
          `digital-assets/notification/mark-all-read-unread-notification`,
          {}
        )
        this.unreadNotifications = data.total_unread_notification
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    onClickOutsideOfList() {
      this.closeList()
    },
    async initialLoadAnnouncements() {
      try {
        this.initialLoading_ = true
        this.badgesCount = 0
        const { data } = await this.$axios.$get(
          `announcement/notification-list?page=${this.page_}&module_id=2`
        )
        this.lastPage_ = data.last_page
        this.announcements.push(...data.data)
        this.unreadAnnouncements = data.total_unread_announcement
        this.initialLoading_ = false
        if (this.page_ < this.lastPage_) {
          this.page_ += 1
        } else {
          this.showLast30DaysMsg_ = true
        }
      } catch (e) {
        this.initialLoading_ = true
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async loadMoreAnnouncements() {
      if (this.showLast30DaysMsg_) {
        return true
      }
      try {
        this.loadMoreLoading_ = true
        const { data } = await this.$axios.$get(
          `announcement/notification-list?page=${this.page_}&module_id=2`
        )
        this.lastPage_ = data.last_page_
        this.loadMoreLoading_ = false
        this.initialLoading_ = false
        if (data.data.length) {
          this.showLast30DaysMsg_ = true
          this.announcements.push(...data.data)
          this.page_ += 1
        } else {
          this.showLast30DaysMsg_ = true
        }
      } catch (e) {
        this.loadMoreLoading_ = false
        this.initialLoading_ = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    readAnnouncement(aId) {
      const findIndex = this.announcements.findIndex(
        ({ id }) => parseInt(id) === parseInt(aId)
      )
      if (findIndex !== -1) {
        const read_at = this.announcements[findIndex].read_at
        if (read_at === null) {
          this.announcements[findIndex].read_at = 'read'
          const currentCount = this.unreadAnnouncements
          this.unreadAnnouncements = currentCount - 1

          try {
            this.$axios.$post(`announcement/read`, {
              notification_id: aId,
              module_id: 2,
            })
          } catch (e) {
            this.$toast.error(this.$getErrorMessage(e))
          }
        }
      }
    },
    readUnreadAnnouncement(aId) {
      const findIndex = this.announcements.findIndex(
        ({ id }) => parseInt(id) === parseInt(aId)
      )
      if (findIndex !== -1) {
        const read_at = this.announcements[findIndex].read_at ? null : 'read'
        this.announcements[findIndex].read_at = read_at
        const currentCount = this.unreadAnnouncements
        this.unreadAnnouncements = this.announcements[findIndex].read_at
          ? currentCount - 1
          : currentCount + 1
      }
      try {
        this.$axios.$post(`announcement/read-unread`, {
          notification_id: aId,
          module_id: 2,
        })
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    readAllAnnouncements() {
      this.announcements = this.announcements.map((data) => {
        return { ...data, read_at: 'read' }
      })
      this.unreadAnnouncements = 0
      try {
        this.$axios.$post(`announcement/mark-all-read?module_id=2`)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    announcementClicked(anno) {
      this.clickedAnnouncementDetail = anno
      this.readAnnouncement(anno.id)
    },
    htmlToText(string) {
      return string.replace(/<[^>]+>/g, '')
    },
  },
}
</script>

<style scoped></style>

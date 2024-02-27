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
      <!--<span class="count">{{ $auth.user.project_badges_count }}-</span>-->
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
          <li class="nav-item">
            <a
              href="#notifications"
              data-toggle="tab"
              :class="{ active: activeTab === 1 }"
              @click="changeTab(1)"
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
            <label
              v-if="!initialLoading && systemNotifications.length"
              class="label-switch small no-text"
              >Only show unread.
              <input
                v-model="showOnlyUnreadNotifications"
                :true-value="true"
                :false-value="false"
                type="checkbox"
                class="switch"
              />
              <span class="lable"></span>
            </label>
            <template v-if="initialLoading">
              <div style="text-align: center; padding: 20px">
                <i>Loading.....</i>
              </div>
            </template>
            <template v-else>
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
                    href="javascript:void(0);"
                    class="item-link"
                    @click="clicked(noti)"
                  ></a>
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
                        {{ noti.full_notification_text
                        }}<span>{{ noti.created_date }}</span>
                      </h5>
                      <a
                        v-if="noti.file_link"
                        @click="
                          downloadProjectReport(
                            noti.file_download_link,
                            noti.file_name
                          )
                        "
                      >
                        {{ noti.file_name }}
                      </a>
                      <a
                        v-if="noti.task_detail"
                        href="javascript:void(0)"
                        @click="
                          taskClicked({
                            workspace_id: noti.workspace_detail.workspace_id,
                            project_id: noti.project_detail.project_id,
                            task_id: noti.task_detail.id,
                            notification_id: noti.id,
                          })
                        "
                      >
                        {{ noti.task_detail.task_title }}
                      </a>
                      <a
                        v-if="noti.project_detail"
                        href="javascript:void(0)"
                        @click="
                          projectClicked({
                            workspace_id: noti.workspace_detail.workspace_id,
                            project_id: noti.project_detail.project_id,
                            notification_id: noti.id,
                          })
                        "
                      >
                        {{ noti.project_detail.project_name }}
                      </a>
                      <div class="path-link">
                        <span
                          v-if="
                            !$_auth().user.project.isClient &&
                            noti.is_clickable == 1
                          "
                          >{{ noti.workspace_detail.workspace_name }}</span
                        >
                        <a
                          v-if="noti.project_detail"
                          href="javascript:void(0)"
                          @click="
                            projectClicked({
                              workspace_id: noti.workspace_detail.workspace_id,
                              project_id: noti.project_detail.project_id,
                              notification_id: noti.id,
                            })
                          "
                        >
                          {{ noti.project_detail.project_name }}
                        </a>
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
                      @click="readUnreadNotification(noti.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
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
                    href="javascript:void(0);"
                    class="item-link"
                    @click="clicked(noti)"
                  ></a>
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
                        {{ noti.full_notification_text
                        }}<span>{{ noti.created_date }}</span>
                      </h5>
                      <a
                        v-if="noti.file_link"
                        @click="
                          downloadProjectReport(
                            noti.file_download_link,
                            noti.file_name
                          )
                        "
                      >
                        {{ noti.file_name }}
                      </a>
                      <a
                        v-if="noti.task_detail"
                        href="javascript:void(0)"
                        @click="
                          taskClicked({
                            workspace_id: noti.workspace_detail.workspace_id,
                            project_id: noti.project_detail.project_id,
                            task_id: noti.task_detail.id,
                            notification_id: noti.id,
                          })
                        "
                      >
                        {{ noti.task_detail.task_title }}
                      </a>
                      <a
                        v-if="noti.project_detail"
                        href="javascript:void(0)"
                        @click="
                          projectClicked({
                            workspace_id: noti.workspace_detail.workspace_id,
                            project_id: noti.project_detail.project_id,
                            notification_id: noti.id,
                          })
                        "
                      >
                        {{ noti.project_detail.project_name }}
                      </a>
                      <div class="path-link">
                        <span
                          v-if="
                            !$_auth().user.project.isClient &&
                            noti.is_clickable == 1
                          "
                        >
                          {{ noti.workspace_detail.workspace_name }}
                        </span>
                        <a
                          v-if="noti.project_detail"
                          href="javascript:void(0)"
                          @click="
                            projectClicked({
                              workspace_id: noti.workspace_detail.workspace_id,
                              project_id: noti.project_detail.project_id,
                              notification_id: noti.id,
                            })
                          "
                        >
                          {{ noti.project_detail.project_name }}
                        </a>
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
                      @click="readUnreadNotification(noti.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
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
                    href="javascript:void(0);"
                    class="item-link"
                    @click="clicked(noti)"
                  ></a>
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
                        {{ noti.full_notification_text
                        }}<span>{{ noti.created_date }}</span>
                      </h5>
                      <a
                        v-if="noti.file_link"
                        @click="
                          downloadProjectReport(
                            noti.file_download_link,
                            noti.file_name
                          )
                        "
                      >
                        {{ noti.file_name }}
                      </a>
                      <a
                        v-if="noti.task_detail"
                        href="javascript:void(0)"
                        @click="
                          taskClicked({
                            workspace_id: noti.workspace_detail.workspace_id,
                            project_id: noti.project_detail.project_id,
                            task_id: noti.task_detail.id,
                            notification_id: noti.id,
                          })
                        "
                      >
                        {{ noti.task_detail.task_title }}
                      </a>
                      <a
                        v-if="noti.project_detail"
                        href="javascript:void(0)"
                        @click="
                          projectClicked({
                            workspace_id: noti.workspace_detail.workspace_id,
                            project_id: noti.project_detail.project_id,
                            notification_id: noti.id,
                          })
                        "
                      >
                        {{ noti.project_detail.project_name }}
                      </a>
                      <div class="path-link">
                        <span
                          v-if="
                            !$_auth().user.project.isClient &&
                            noti.is_clickable == 1
                          "
                          >{{ noti.workspace_detail.workspace_name }}</span
                        >
                        <a
                          v-if="noti.project_detail"
                          href="javascript:void(0)"
                          @click="
                            projectClicked({
                              workspace_id: noti.workspace_detail.workspace_id,
                              project_id: noti.project_detail.project_id,
                              notification_id: noti.id,
                            })
                          "
                        >
                          {{ noti.project_detail.project_name }}
                        </a>
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
                      @click="readUnreadNotification(noti.id)"
                    >
                      <div class="indicator"></div>
                    </button>
                  </div>
                </div>
              </section>
              <div
                v-if="loadMoreLoading"
                style="text-align: center; padding: 10px"
              >
                <i>Loading....</i>
              </div>
              <div
                v-if="
                  !todayNotifications.length &&
                  !yesterdayNotifications.length &&
                  !olderNotifications.length
                "
                class="no-notification"
              >
                <img src="~/assets/img/no-notification.svg" alt="" />
                <p>You have no notifications available.</p>
              </div>
              <div
                v-if="
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
            </template>
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
                        <span v-if="!$_auth().user.project.isClient">{{
                          anno.workspace_detail.workspace_name
                        }}</span>
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
          :to="{
            name: 'notification-settings-workspace_id-module_id-type',
            params: {
              workspace_id: $_auth().id,
              module_id: workspaceModule,
              type: 'system',
            },
          }"
          >Notification Setting</nuxt-link
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
import { isEmpty } from 'lodash'
import vClickOutside from 'v-click-outside'
import Profile from '~/assets/img/profile.png'
export default {
  name: 'ProjectSystemNotifications',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {},
  data() {
    return {
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
      badgesCount: this.$auth.user.project_badges_count,
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
      return workspaceModules[0]
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
  },
  mounted() {
    this.$echo
      .private(`user.${this.$auth.user.id}.projectBatchNotification`)
      .listen('.ProjectUserNotificationBadgesEvent', (e) => {
        const {
          data: { project_badges_count },
        } = e
        this.badgesCount = project_badges_count
      })
    this.loadJQ()
    this.getBadgesCount()
  },
  beforeDestroy() {
    this.$echo.leave(`user.${this.$auth.user.id}.projectBatchNotification`)
  },

  methods: {
    async getBadgesCount() {
      try {
        const { data } = await this.$axios.$get(`user-badges-count`)
        this.badgesCount = data.project_badges_count
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
      if (this.activeTab === 1) {
        this.systemNotifications.length && this.loadMoreNotifications()
      }
      if (this.activeTab === 2) {
        this.announcements.length && this.loadMoreAnnouncements()
      }
    },
    changeTab(id) {
      this.activeTab = id
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
    clicked(noti) {
      if (noti.is_clickable === 1) {
        const params = {
          workspace_id: noti.workspace_detail.workspace_id,
          notification_id: noti.id,
        }
        if (noti.task_detail) {
          params.project_id = noti.project_detail.project_id
          params.task_id = noti.task_detail.id
          this.taskClicked(params)
        }
        if (noti.project_detail) {
          params.project_id = noti.project_detail.project_id
          this.projectClicked(params)
        }
      }
      if (noti.is_clickable === 0) {
        this.readNotification(noti.id)
      }
    },
    taskClicked(params) {
      const { workspace_id, project_id, task_id, notification_id } = params
      this.closeList()
      this.readNotification(notification_id)
      this.$router.push({
        name: 'workspace_id-project-project_id-task_id',
        params: {
          workspace_id,
          project_id,
          task_id,
        },
      })
    },
    projectClicked(params) {
      const { workspace_id, project_id, notification_id } = params
      this.closeList()
      this.readNotification(notification_id)
      this.$router.push({
        name: 'workspace_id-project-project_id',
        params: {
          workspace_id,
          project_id,
        },
      })
    },
    async initialLoadNotifications() {
      try {
        this.initialLoading = true
        this.badgesCount = 0
        const { data } = await this.$axios.$get(
          `user-notification/project?page=${this.page}&module_id= 1`
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
        this.initialLoading = true
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async loadMoreNotifications() {
      if (this.showLast30DaysMsg) {
        return true
      }
      if (this.loadMoreLoading) {
        return true
      }
      try {
        this.loadMoreLoading = true
        const { data } = await this.$axios.$get(
          `user-notification/project?page=${this.page}&module_id= 1`
        )
        this.lastPage = data.last_page
        this.loadMoreLoading = false
        this.initialLoading = false
        if (data.data.length) {
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
    readNotification(nId) {
      const findIndex = this.systemNotifications.findIndex(
        ({ id }) => parseInt(id) === parseInt(nId)
      )
      if (findIndex !== -1) {
        const read_at = this.systemNotifications[findIndex].read_at
        if (read_at === null) {
          this.systemNotifications[findIndex].read_at = 'read'
          const currentCount = this.unreadNotifications
          this.unreadNotifications = currentCount - 1

          try {
            this.$axios.$post(`user-notification/project-read`, {
              notification_id: nId,
            })
          } catch (e) {
            this.$toast.error(this.$getErrorMessage(e))
          }
        }
      }
    },
    readUnreadNotification(nId) {
      const findIndex = this.systemNotifications.findIndex(
        ({ id }) => parseInt(id) === parseInt(nId)
      )
      if (findIndex !== -1) {
        const read_at = this.systemNotifications[findIndex].read_at
          ? null
          : 'read'
        this.systemNotifications[findIndex].read_at = read_at
        const currentCount = this.unreadNotifications
        this.unreadNotifications = this.systemNotifications[findIndex].read_at
          ? currentCount - 1
          : currentCount + 1
      }
      try {
        this.$axios.$post(`user-notification/project-read-unread`, {
          notification_id: nId,
        })
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
        await this.$axios.$post(`user-notification/mark-all-project-read`, {})
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
          `announcement/notification-list?page=${this.page_}&module_id= 1`
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
      if (this.loadMoreLoading_) {
        return true
      }
      try {
        this.loadMoreLoading_ = true
        const { data } = await this.$axios.$get(
          `announcement/notification-list?page=${this.page_}&module_id= 1`
        )
        this.lastPage_ = data.last_page_
        this.loadMoreLoading_ = false
        this.initialLoading_ = false
        if (data.data.length) {
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
              module_id: 1,
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
          module_id: 1,
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
        this.$axios.$post(`announcement/mark-all-read?module_id= 1`)
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
    downloadProjectReport(downloadURL, name) {
      const link = document.createElement('a')
      link.href = downloadURL
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    },
  },
}
</script>

<style scoped></style>

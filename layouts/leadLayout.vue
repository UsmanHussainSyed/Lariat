<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div class="main-right" :class="{ leadAlertMsg: isSystemNotification }">
      <!-- Top LeadHeader -->
      <LeadHeader v-if="$auth.loggedIn" />
      <overlay-loader :is-active="isLoading" :loading-text="getLoadingText" />
      <div v-if="isSystemNotification" class="leadMessage mb10 pl10 pr10">
        <div class="alert alert-danger">
          Notifications are turned off across the instance.
        </div>
      </div>
      <!-- Main content -->
      <nuxt v-if="$auth.loggedIn" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LeftMenu from '@/components/theme/global/LeftMenu'
import LeadHeader from '@/components/theme/global/LeadHeader'
import { _debounce } from '~/utils/helper'

export default {
  components: { LeadHeader, LeftMenu },
  data() {
    return {
      isSystemNotification: false,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'loading/isLoading',
      getLoadingText: 'loading/getLoadingText',
    }),
  },
  mounted() {
    this.initPusherEvent()
  },
  async beforeMount() {
    try {
      const { data } = await this.$axios.$get(
        `/view-workspace?workspace_id=${this.$getWorkspaceId()}`
      )

      this.isSystemNotification = !!data.pause_notification
    } catch (error) {
      this.$toast.error(this.$getErrorMessage(error))
    }
  },
  methods: {
    initPusherEvent() {
      const authUserId = this.$auth.user.id
      this.$echo
        .private(`logoutDealershipUser.${authUserId}`)
        .listen('.logoutDealershipUser', (e) => {
          const {
            data: { userId },
          } = e
          if (userId === authUserId) {
            this.$toast.info(
              'You are being logged out.. Please contact dealership for more information'
            )
            _debounce(() => {
              this.$logout()
            }, 1500)
          }
        })
    },
  },
}
</script>

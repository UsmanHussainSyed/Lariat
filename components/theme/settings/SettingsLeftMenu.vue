<template>
  <div class="general-settings-left customscrollbar h-100">
    <Select2
      v-model="internal_workspace_id"
      :class="'select'"
      :options="$allowedWorkspaces('slug').general.list"
      placeholder="Select Organization"
    />
    <template v-if="user.hasGeneralSettingsAccess">
      <h4>Global Settings</h4>
      <ul>
        <template v-for="(menu, index) in generalSettings">
          <li v-if="menu.access" :key="`gen_${index}`">
            <nuxt-link
              exact
              :class="{ active: menu.matchRoutes.includes(currentRouteName) }"
              :to="{
                name: menu.routeName,
                params: { workspace_id: internal_workspace_id },
              }"
              >{{ menu.name }}</nuxt-link
            >
          </li>
        </template>
        <template v-for="(menu, index) in subscriptionGeneralSettings">
          <li
            v-if="menu.access && user.hasGeneralSettingsAccess"
            :key="`subgen_${index}`"
          >
            <nuxt-link
              exact
              :class="{ active: menu.matchRoutes.includes(currentRouteName) }"
              :to="{
                name: menu.routeName,
                params: { workspace_id: internal_workspace_id },
              }"
              >{{ menu.name }}</nuxt-link
            >
          </li>
        </template>
      </ul>
    </template>

    <template v-if="user.hasDamAccess && damSettings.length">
      <h4>Digital Asset Management <SpinLoading v-if="fetchingInstances" /></h4>
      <ul>
        <template v-if="!fetchingInstances">
          <li v-for="(menu, index) in damSettings" :key="`dam_${index}`">
            <nuxt-link
              exact
              :class="{ active: menu.matchRoutes.includes(currentRouteName) }"
              :to="{
                name: menu.routeName,
                params: {
                  workspace_id: routeWorkspaceId,
                  instance_id: routeInstanceId,
                },
              }"
              >{{ menu.name }}</nuxt-link
            >
            <ul v-if="(menu.children || []).length">
              <li v-for="(child, i) in menu.children" :key="`menu_${i}`">
                <nuxt-link
                  exact
                  :class="{
                    active: child.matchRoutes.includes(currentRouteName),
                  }"
                  :to="{
                    name: child.routeName,
                    params: {
                      workspace_id: routeWorkspaceId,
                      instance_id: routeInstanceId,
                    },
                  }"
                  >{{ child.name }}</nuxt-link
                >
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </template>
    <template
      v-if="
        (user.hasLeadAccess && user.lead.isSuperAdmin) ||
        user.lead.isDealerAdmin
      "
    >
      <h4>Lead Management</h4>
      <ul>
        <li
          v-for="(menu, index) in leadSettings"
          :key="index"
          :class="[menu.check && !sharpSpringAccount && 'disable-list']"
        >
          <nuxt-link
            v-if="menu.role !== 'dealer-admin'"
            :class="{
              active: menu.routeName === currentRouteName,
              active: menu.matchRoutes.includes(currentRouteName),
            }"
            :to="{
              name: menu.routeName,
              params: { workspace_id: internal_workspace_id },
            }"
            >{{ menu.name }}</nuxt-link
          >
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import Select2 from '~/components/plugins/Select2'
import routeParams from '~/mixins/routeParams'

export default {
  name: 'SettingsLeftMenu',
  components: { Select2 },
  mixins: [routeParams],
  data() {
    return {
      workspace_id: this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      generalSettings: [
        {
          name: 'General Settings',
          routeName: 'workspace_id-workspace-settings',
          access: this.$_auth().user.hasGeneralSettingsAccess,
          matchRoutes: ['workspace_id-workspace-settings'],
        },
        {
          name: 'Workspace Admins',
          routeName: 'workspace_id-workspace-settings-user-list',
          access: this.$_auth().user.hasGeneralSettingsAccess,
          matchRoutes: [
            'workspace_id-workspace-settings-user-list',
            'workspace_id-workspace-settings-user-add',
            'workspace_id-workspace-settings-user-userid-edit',
            'workspace_id-workspace-settings-user-userid-reset-password',
          ],
        },
      ],
      projectGeneralSettings: [
        {
          name: 'User Groups',
          routeName: 'workspace_id-workspace-settings-users-group-list',
          access:
            this.$_auth().user.hasGeneralSettingsAccess &&
            this.$_auth().user.hasProjectAccess &&
            (this.$_auth().user.project.isSuperAdmin ||
              this.$_auth().user.project.isAdmin),
          matchRoutes: [
            'workspace_id-workspace-settings-users-group-list',
            'workspace_id-workspace-settings-users-group-add',
            'workspace_id-workspace-settings-users-group-usergroupid-edit',
          ],
        },
      ],
      subscriptionGeneralSettings: [
        {
          name: 'Account & Billing',
          routeName: 'workspace_id-workspace-settings-account-billing',
          access:
            this.$_auth().user.hasGeneralSettingsAccess &&
            this.$auth.user.subscription_user &&
            !!this.$_auth().user.hasDamAccess,
          matchRoutes: ['workspace_id-workspace-settings-account'],
        },
      ],
      leadSettings: [
        {
          name: 'Settings',
          routeName: 'workspace_id-workspace-settings-lm-dashboard-setting',
          matchRoutes: ['workspace_id-workspace-settings-lm-dashboard-setting'],
        },
        {
          name: 'Account Setup',
          routeName: 'workspace_id-workspace-settings-sharpspring-account',
          matchRoutes: [
            'workspace_id-workspace-settings-sharpspring-account',
            'workspace_id-workspace-settings-sharpspring-external',
          ],
          role: this.$_auth().user.lead.role,
        },
        {
          name: 'Form Setup',
          routeName: 'workspace_id-workspace-settings-sharpspring-form',
          matchRoutes: ['workspace_id-workspace-settings-sharpspring-form'],
          check: 'sharpspring_account_added',
          role: this.$_auth().user.lead.role,
        },
        {
          name: 'Dealership Settings',
          routeName: 'workspace_id-workspace-settings-dealership-settings',
          matchRoutes: ['workspace_id-workspace-settings-dealership-settings'],
          role: this.$_auth().user.lead.role,
        },
        {
          name: 'Product Settings',
          routeName:
            'workspace_id-workspace-settings-lm-product-manage-product-list',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-product-manage-product-list',
            'workspace_id-workspace-settings-lm-product-manage-product-variant',
            'workspace_id-workspace-settings-lm-product-manage-category-setting',
            'workspace_id-workspace-settings-lm-products-add',
            'workspace_id-workspace-settings-lm-products-id-edit',
          ],
          role: this.$_auth().user.lead.role,
        },
        {
          name: 'Dealer Group Network',
          routeName: 'workspace_id-workspace-settings-lm-dealer-group-network',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-dealer-group-network',
          ],
          role: this.$_auth().user.lead.role,
        },
        {
          name: 'Status Management',
          routeName: 'workspace_id-workspace-settings-lm-manage-status',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-manage-status',
            'workspace_id-workspace-settings-lm-manage-status-Task-status',
          ],
          role: this.$_auth().user.lead.role,
        },
        {
          name: 'Pending Emails',
          routeName: 'workspace_id-workspace-settings-lm-pending-email',
          matchRoutes: ['workspace_id-workspace-settings-lm-pending-email'],
        },
        {
          name: 'Notification Settings',
          routeName: 'workspace_id-workspace-settings-lm-notification',
          matchRoutes: ['workspace_id-workspace-settings-lm-notification'],
        },
        {
          name: 'Email Settings',
          routeName: 'workspace_id-workspace-settings-lm-email-settings-smtp',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-email-settings-smtp',
            'workspace_id-workspace-settings-lm-email-settings-imap',
            'workspace_id-workspace-settings-lm-email-settings-email-template-add',
            'workspace_id-workspace-settings-lm-email-settings-email-template-id-edit',
            'workspace_id-workspace-settings-lm-email-settings-email-template-list',
            'workspace_id-workspace-settings-lm-email-settings-email-template-signature',
          ],
        },
        {
          name: 'SMS Settings',
          routeName:
            'workspace_id-workspace-settings-lm-sms-settings-lookup-configuration',
          matchRoutes: [
            'workspace_id-workspace-settings-lm-sms-settings-lookup-configuration',
            'workspace_id-workspace-settings-lm-sms-settings-twilio-configuration',
          ],
        },
      ],
      trialEnded: false,
      sharpspring_account_added: false,
    }
  },
  computed: {
    damSettings() {
      return this.trialEnded
        ? []
        : this.routeInstanceId
        ? [
            {
              name: 'General',
              routeName: 'workspace_id-workspace-settings-dam-instance_id',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id',
                'workspace_id-workspace-settings-dam-instance_id-product-settings',
              ],
            },
            {
              name: 'Users',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-users',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-users',
                'workspace_id-workspace-settings-dam-instance_id-users-add',
                'workspace_id-workspace-settings-dam-instance_id-users-user_id-change-password',
                'workspace_id-workspace-settings-dam-instance_id-users-user_id',
              ],
            },
            {
              name: 'User Groups',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-user-groups',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-user-groups',
                'workspace_id-workspace-settings-dam-instance_id-user-groups-add',
                'workspace_id-workspace-settings-dam-instance_id-user-groups-edit',
              ],
            },
            {
              name: 'Manage Banner',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-manage-banner',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-manage-banner',
              ],
            },
            {
              name: 'Manage Tile',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-manage-tile',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-manage-tile',
              ],
            },
            {
              name: 'Integrations',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-integration',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-integration',
              ],
            },
            {
              name: 'ACL',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-accessControl',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-accessControl',
              ],
            },
            {
              name: 'Notification Settings',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-notifications',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-notifications',
              ],
            },
            {
              name: 'Announcements',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-announcements-list',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-announcements-list',
                'workspace_id-workspace-settings-dam-instance_id-announcements-add',
                'workspace_id-workspace-settings-dam-instance_id-announcements-announcement_id-edit',
                'workspace_id-workspace-settings-dam-instance_id-announcements-announcement_id-preview',
              ],
            },
            {
              name: 'Product Management',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-product-manage',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-product-manage-id-edit',
              ],
            },
            {
              name: 'Orders',
              routeName:
                'workspace_id-workspace-settings-dam-instance_id-orders',
              matchRoutes: [
                'workspace_id-workspace-settings-dam-instance_id-orders-id',
              ],
            },
          ]
        : [
            {
              name: 'Create DAM Instance',
              routeName: 'workspace_id-add-dam-instance',
              matchRoutes: ['workspace_id-add-dam-instance'],
            },
          ]
    },
    user() {
      const workspace = this.$auth.user.accessibleWorkspaces.find(
        ({ id }) => parseInt(id) === parseInt(this.internal_workspace_id)
      )
      return this.$getUserModulesAndRoles(workspace)
    },
    sharpSpringAccount() {
      return this.sharpspring_account_added
    },
  },
  created() {
    this.$axios.$get('lm/sharpspring/check-account').then(({ data }) => {
      this.sharpspring_account_added = data.sharpspring_account_added
    })
  },
  mounted() {
    this.$watch('internal_workspace_id', this.updateRouteWp)
    this.updateRouteWp(this.$route.params.workspace_id)
  },
  methods: {
    async updateRouteWp(newVal, oldVal) {
      this.trialEnded = await this.isTrialEndedForWp(newVal)
      if (this.trialEnded) {
        this.generalSettings = []
        this.leadSettings = []
        return this.$router.replace({
          params: { workspace_id: newVal },
          name: 'workspace_id-workspace-settings-account-billing',
        })
      }
      this.$router.replace({
        query: this.$route.query,
        params: { workspace_id: newVal },
      })
      const workspace = this.$auth.user.accessibleWorkspaces.find(
        ({ id }) => parseInt(id) === parseInt(this.internal_workspace_id)
      )
      const user = this.$getUserModulesAndRoles(workspace)
      this.generalSettings[0].access = user.hasGeneralSettingsAccess
      this.generalSettings[1].access = user.hasGeneralSettingsAccess

      if (this.$store.dispatch('dam/shouldResetDamState'))
        this.$store.commit('dam/resetState')

      if (
        workspace.type.toString() === 'parent' &&
        user.hasDamAccess &&
        !Object.keys(this.$store.state.dam.damInstance).length
      ) {
        await this.$store.dispatch('dam/getInstances', newVal)
        this.$router.replace({
          query: this.$route.query,
          params: {
            workspace_id: newVal,
            instance_id: this.$store.state.dam.damInstance?.id,
          },
        })
      }
      this.subscriptionGeneralSettings[0].access =
        workspace.type.toString() === 'parent' && user.hasDamAccess
    },
    isTrialEndedForWp(wpId) {
      const currentWpId = wpId
      const wp = this.$auth.user.accessibleWorkspaces.find(
        (e) => e.id === currentWpId
      )
      return (
        wp.is_trial_account && (wp.is_suspended || wp.trial_expire === 'true')
      )
    },
  },
}
</script>

import Vue from 'vue'
import { sortBy, orderBy } from 'lodash'
import * as utils from '@/utils'

Vue.filter('shrinkString', utils.shrinkString)

export default ({ app, store }, inject) => {
  Object.entries(utils).forEach(([key, value]) => {
    if (typeof value === 'function') inject(key, value)
  })

  inject(
    'fileAcceptInputImage',
    'image/jpeg,image/gif,image/png,image/svg,image/jpg'
  )

  const setCurrentWorkspace = (workspaceId) => {
    const workspace = app.$auth.user.accessibleWorkspaces.find(
      ({ id }) => parseInt(id) === parseInt(workspaceId)
    )
    const user = app.$getUserModulesAndRoles(workspace)
    const currentWorkspace = {
      ...workspace,
      user,
    }
    app.$auth.$storage.setCookie('currentWorkspace', currentWorkspace)
    if (store.dispatch('dam/shouldResetDamState'))
      store.commit('dam/resetState')
  }

  const _auth = () => {
    if (app.$auth.loggedIn)
      return app.$auth.$storage.getCookie('currentWorkspace')
    else return null
  }

  const sortResources = (asset, sortBy, sortOrder) => {
    return orderBy(
      asset,
      [
        function (o) {
          if (o.file) {
            if (sortBy === 'file_size') {
              return o.file[sortBy]
            } else {
              return o.file[sortBy].toLowerCase()
            }
          } else if (o.folder) {
            if (sortBy === 'total_contain') {
              return o.folder[sortBy]
            } else {
              return o.folder[sortBy].toLowerCase()
            }
          }
        },
      ],
      [sortOrder]
    )
  }

  const getWorkspaceId = () => _auth()?.id
  const getUserModulesAndRoles = (workspace) => {
    // module default redirects
    const moduleRedirects = {
      dam: 'workspace_id-dam',
      lead: 'workspace_id-lead-leads',
      leadExecutiveDashboard: 'workspace_id-lead-executive-dashboard',
    }
    // blue-print of user role & permissions
    const user = {
      name: app.$auth?.user?.name,
      email: app.$auth?.user?.email,
      hasDamAccess: false,
      hasGeneralSettingsAccess: false,
      redirectPathName: null,
      dam: {
        role: null,
        isAdmin: null,
      },
      lead: {
        role: null,
        isSuperAdmin: false,
        isRSM: false,
        isDealerGroupAdmin: false,
        isDealerAdmin: false,
        isSalesPerson: false,
      },
    }

    if (workspace?.module?.length) {
      workspace.module.forEach(
        ({
          module_id: moduleId,
          role_slug: role,
          leadsExecutiveDashboard: lexd,
        }) => {
          if (parseInt(moduleId) === 2) {
            user.hasDamAccess = true
            user.dam.role = role
            user.dam.isAdmin = role === 'admin'
          }
          if (parseInt(moduleId) === 3) {
            user.hasLeadAccess = true
            user.lead.role = role
            user.lead.isSuperAdmin = role === 'super-admin'
            user.lead.isRSM = role === 'rsm'
            user.lead.isDealerGroupAdmin = role === 'dealer-group-admin'
            user.lead.isDealerAdmin = role === 'dealer-admin'
            user.lead.isSalesPerson = role === 'sales-person'
            user.lead.leadsExecutiveDashboard = lexd
          }
        }
      )
    }
    user.hasGeneralSettingsAccess =
      user.dam.isAdmin || user.lead.isSuperAdmin || user.lead.isDealerAdmin
    if (user.hasDamAccess) user.redirectPathName = moduleRedirects.dam
    else if (user.hasLeadAccess) user.redirectPathName = moduleRedirects.lead
    return user
  }

  const allowedWorkspaces = (
    type = 'slug',
    allOption = false,
    checkAdminAccess = false
  ) => {
    const allWp = app.$auth.user.accessibleWorkspaces || []
    const projectWorkspaces = []
    const generalSettingsWorkspaces = []
    const profileWorkspaces = []
    allWp.forEach((wp) => {
      const {
        id,
        workspace_unique_id: workspaceUniqueId,
        name,
        department_id: departmentId,
        department_name: departmentName,
        client_only: clientOnly,
        client_ids: clientIds,
        is_suspended,
      } = wp
      const user = app.$getUserModulesAndRoles(wp)
      if (user.hasGeneralSettingsAccess) {
        type === 'slug' && generalSettingsWorkspaces.push({ id, text: name })
        type === 'id' &&
          generalSettingsWorkspaces.push({
            id: workspaceUniqueId,
            text: name,
            department_id: departmentId,
            department_name: departmentName,
            client_only: clientOnly,
            client_ids: clientIds,
          })
      }
      let check = false
      if (!checkAdminAccess) {
        check = user.hasProjectAccess
      } else {
        check =
          user.hasProjectAccess &&
          (user.project.isSuperAdmin || user.project.isAdmin)
      }
      if (check) {
        type === 'slug' && projectWorkspaces.push({ id, text: name })

        type === 'id' &&
          projectWorkspaces.push({
            id: workspaceUniqueId,
            text: name,
            department_id: departmentId,
            department_name: departmentName,
            client_only: clientOnly,
            client_ids: clientIds,
          })
      }
      // for profile workspaces
      type === 'slug' &&
        !is_suspended &&
        profileWorkspaces.push({ id, text: name })
      type === 'id' &&
        !is_suspended &&
        profileWorkspaces.push({
          id: workspaceUniqueId,
          text: name,
          department_id: departmentId,
          department_name: departmentName,
          client_only: clientOnly,
          client_ids: clientIds,
          user,
        })
    })
    const projectWorkspacesList = sortBy(projectWorkspaces, ['text'])
    if (allOption) {
      if (allWp.length > 1) {
        projectWorkspacesList.unshift({ id: 0, text: 'All Workspaces' })
      }
    }
    return {
      general: {
        list: generalSettingsWorkspaces,
        ids: generalSettingsWorkspaces.map(({ id }) => id),
      },
      profile: {
        list: profileWorkspaces,
        ids: profileWorkspaces.map(({ id }) => id),
      },
    }
  }

  const getErrorMessage = (e) => {
    if (typeof e === 'string') return e

    if (e) {
      const { data } = e.response || {}
      return (data && data.message) || e.message
    }

    return 'Oops! Something went wrong...'
  }

  const gotoReferringUrl = () => {
    if (app.$auth.$storage.getUniversal('trackReferringUrl') === true) {
      return app.router.replace({
        name: app.$auth.$storage.getUniversal('referringUrlName'),
        params: app.$auth.$storage.getUniversal('referringUrlParams'),
        query: app.$auth.$storage.getUniversal('referringUrlQuery'),
      })
    }
  }
  const nextStep = () => {
    if (app.$auth.user.workspace_id === 0) {
      return app.router.replace('create-workspace')
    }
    if (app.$auth.user.workspace_id > 0) {
      if (!app.$auth.$storage.getCookie('currentWorkspace').module.length) {
        return app.router.replace({
          name: 'workspace_id-choose-modules',
          params: {
            workspace_id: app.$auth.$storage.getCookie('currentWorkspace').id,
          },
        })
      } else {
        // go to referring url if any
        // eslint-disable-next-line no-lonely-if
        if (app.$auth.$storage.getUniversal('trackReferringUrl') === true) {
          if (
            app.$auth.$storage.getUniversal('referringUrlParams') &&
            !app.$auth.user.accessibleWorkspaces
              ?.map(({ id }) => id)
              .includes(
                app.$auth.$storage.getUniversal('referringUrlParams')
                  .workspace_id
              )
          ) {
            return app.router.replace({
              name: app.$_auth().user.redirectPathName,
              params: { workspace_id: app.$_auth().id },
            })
          } else {
            app.$gotoReferringUrl()
          }
        } else {
          // go to appropriate dashboard
          return app.router.replace({
            name: app.$_auth().user.redirectPathName,
            params: { workspace_id: app.$_auth().id },
          })
        }
      }
    }
  }
  const setAuthToken = () => {
    app.$axios.setToken(app.$auth.strategy.token.get())
  }
  const getUserProjectListColumns = () => {
    return app.$auth.user.project_list_preference
  }
  const logout = async () => {
    await app.$auth.logout()
    app.$clearAuthCookies()
  }
  function getMarkedText(text, search, tag = 'mark') {
    if (!search) return text

    try {
      return text.replace(
        new RegExp(`(${search})`, 'ig'),
        `<${tag}>$1</${tag}>`
      )
    } catch {
      return text
    }
  }
  function getSearchedMarkedText(text, search, tag = 'mark') {
    if (!search) return text
    try {
      const term = search.split(' ')
      for (let i = 0; i < term.length; i++) {
        if (term[i]) {
          text = text.replace(
            new RegExp(`(${term[i]})`, 'ig'),
            `<${tag}>$1</${tag}>`
          )
        }
      }
      return text
    } catch {
      return text
    }
  }
  function stringToRegex(input) {
    // eslint-disable-next-line
    input && input.trim().replace(/([\[\]\\\^\$\.\|\?\*\+\(\)])/g, '\\$1')
    return input && new RegExp(input, 'ig')
  }
  const clearAuthCookies = () => {
    app.$auth.$storage.removeUniversal('errorLayout')
    app.$auth.$storage.removeUniversal('currentWorkspace')
    app.$auth.$storage.removeUniversal('internal_workspace_id')

    app.$auth.$storage.removeUniversal('invite_people_result')
    app.$auth.$storage.removeUniversal('invite_childworkspace_people_result')
    app.$auth.$storage.removeUniversal('invite_client_result')
    app.$auth.$storage.removeUniversal('addProjectWorkspaceId')

    app.$auth.$storage.removeUniversal('trackReferringUrl')
    app.$auth.$storage.removeUniversal('referringUrlName')
    app.$auth.$storage.removeUniversal('referringUrlParams')
    app.$auth.$storage.removeUniversal('referringUrlQuery')
    app.$auth.$storage.removeUniversal('switchWorkspaceId')
  }
  const setPageMetaTitle = (title) => {
    process.client && (document.title = title)
  }
  const setPageMetaFavicon = (href) => {
    const link = document.querySelector("link[rel~='icon']")
    process.client && (link.href = href)
  }

  inject('_auth', _auth)
  inject('setCurrentWorkspace', setCurrentWorkspace)
  inject('getErrorMessage', getErrorMessage)
  inject('gotoReferringUrl', gotoReferringUrl)
  inject('nextStep', nextStep)
  inject('setAuthToken', setAuthToken)
  inject('getUserProjectListColumns', getUserProjectListColumns)
  inject('logout', logout)
  inject('clearAuthCookies', clearAuthCookies)
  inject('getUserModulesAndRoles', getUserModulesAndRoles)
  inject('getMarkedText', getMarkedText)
  inject('getSearchedMarkedText', getSearchedMarkedText)
  inject('stringToRegex', stringToRegex)
  inject('allowedWorkspaces', allowedWorkspaces)
  inject('successToast', (message) => app.$toast?.success(message))
  inject('errorToast', (e) => app.$toast?.error(getErrorMessage(e)))
  inject('checkValidation', (e) =>
    app.$toast?.error(utils.getValidationMessage(e))
  )
  inject('getWorkspaceId', getWorkspaceId)
  // inject('hourlyTrackingWorkspaces', hourlyTrackingWorkspaces)
  inject('setPageMetaTitle', setPageMetaTitle)
  inject('sortResources', sortResources)
  inject('setPageMetaFavicon', setPageMetaFavicon)
}

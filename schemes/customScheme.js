import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  getProp_(holder, propName) {
    if (!propName || !holder || typeof holder !== 'object') {
      return holder
    }
    if (propName in holder) {
      return holder[propName]
    }
    const propParts = Array.isArray(propName)
      ? propName
      : (propName + '').split('.')
    let result = holder
    while (propParts.length && result) {
      result = result[propParts.shift()]
    }
    return result
  }

  setCurrentWorkspace(user) {
    const currentWorkspaceId = this.$auth.$storage.getCookie('currentWorkspace')
      ? this.$auth.$storage.getCookie('currentWorkspace').id
      : user.workspace_id

    if (currentWorkspaceId) {
      const workspace = this.$auth.user.accessibleWorkspaces.find(
        ({ id }) => id === currentWorkspaceId
      )
      return {
        id: workspace.id,
        workspace_unique_id: workspace.workspace_unique_id,
        name: workspace.name,
        type: workspace.type,
        module: workspace.module,
      }
    } else {
      return {}
    }
  }

  // Override `fetchUser` method of `local` scheme
  // eslint-disable-next-line require-await
  async fetchUser(endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }
    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        // eslint-disable-next-line no-undef
        // const user = getProp(response.data, this.options.user.property)
        const user = this.getProp_(response.data, this.options.user.property)
        const currentWorkspace = this.setCurrentWorkspace(user)
        // Transform the user object
        const customUser = {
          ...user,
          currentWorkspace,
        }
        // Set the custom user
        // The `customUser` object will be accessible through `this.$auth.user`
        // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
        this.$auth.setUser(customUser)

        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
  }
}

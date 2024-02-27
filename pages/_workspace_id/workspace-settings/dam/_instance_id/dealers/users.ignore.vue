<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h2 class="title">DAM User List</h2>
      <div class="right-side">
        <Select2 v-model="filterSelectModel" :options="filterOptions"></Select2>
        <div class="search-pr">
          <form
            class="navbar-form search-navbar-form"
            role="search"
            @submit.prevent="fetchUser"
          >
            <div class="input-group">
              <button class="btn-search hidden-xs" type="submit">
                <img src="img/icon/search.svg" alt="" />
              </button>
              <input
                v-model.trim="searchTerm"
                class="form-control"
                placeholder="Search..."
                name="srch-term"
                type="text"
              />
            </div>
          </form>
        </div>
        <nuxt-link
          :to="{
            to: 'workspace_id-workspace-settings-dam-instance_id-users-add',
            params: {},
          }"
          class="btn-comment btn-icon"
        >
          <img src="~/assets/img/icon/plus.svg" alt="" />
          Add New User
        </nuxt-link>
      </div>
    </div>
    <div class="workspace-settings"></div>
  </div>
</template>

<script>
export default {
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      searchTerm: '',
      filterSelectModel: '1',
      filterOptions: [
        { id: 1, text: 'Active Users', name: 'Users' },
        { id: 2, text: 'Pending approval', name: 'Pending approval' },
        { id: 3, text: 'Inactive', name: 'Inactive' },
      ],
    }
  },
  methods: {
    fetchUser() {
      this.identifier += 1
    },
  },
}
</script>

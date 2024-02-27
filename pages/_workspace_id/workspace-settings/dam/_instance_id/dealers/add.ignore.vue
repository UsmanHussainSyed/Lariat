<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h2 class="title">DAM User List</h2>
      <div class="right-side">
        <Select2 v-model="filter"></Select2>
        <div class="search-pr">
          <form class="navbar-form search-navbar-form" role="search">
            <div class="input-group">
              <button class="btn-search hidden-xs" type="submit">
                <img src="img/icon/search.svg" alt="" />
              </button>
              <input
                id="srch-term"
                class="form-control"
                placeholder="Search..."
                name="srch-term"
                type="text"
              />
            </div>
          </form>
        </div>
        <a href="dam-user-add.html" class="btn-comment btn-icon"
          ><img src="img/icon/plus.svg" alt="" />Add New User</a
        >
      </div>
    </div>
    <div class="workspace-settings"></div>
  </div>
</template>

<script>
export default {
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
}
</script>

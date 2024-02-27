<template>
  <div class="dropbox-breadcrumb">
    <div class="breadcrumb-links">
      <ul style="align-items: center">
        <li>&nbsp;</li>
        <template v-for="(breadcrumb, i) in breadcrumbs">
          <slot :name="`item_${i}`" :item="breadcrumb">
            <li
              :key="breadcrumb.path"
              :style="{
                cursor: i === breadcrumbs.length - 1 ? 'default' : 'pointer',
              }"
              @click.stop="$emit('breadcrumb-click', breadcrumb)"
            >
              <span>{{ breadcrumb.name }}</span>
            </li>
          </slot>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropboxBreadcrumb',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
    ({ redirect, params, query }) => {
      return redirect({
        name: 'workspace_id-dam-integrations',
        params,
        query,
      })
    },
  ],
  props: {
    cwd: { type: String, default: '' },
    breadcrumbs: { type: Array, default: () => [] },
  },
}
</script>

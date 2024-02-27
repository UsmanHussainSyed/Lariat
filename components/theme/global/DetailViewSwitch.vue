<template>
  <div class="d-flex ml1">
    <span>Detail view</span>
    <label class="label-switch label-switch d-none d-md-flex ml0">
      <input
        id="detailView"
        v-model="is_view_detail"
        type="checkbox"
        class="switch"
        name="detail-view"
        data-lpignore="true"
        @click="getDetailView()"
      />
      <span class="lable"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'DetailViewSwitch',
  data() {
    return {
      is_view_detail: this.$auth.user.detail_view,
    }
  },
  methods: {
    async getDetailView() {
      try {
        await this.$axios.$get(`/change-detail-view`)
        this.$auth.fetchUser()
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
}
</script>

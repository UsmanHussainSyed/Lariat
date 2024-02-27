<template>
  <div class="body-content dam-container p0">
    <div class="body-content-auto w-100">
      <h2>Generating image variations with OpenAI</h2>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'damLayout',
  middleware: [
    'check-if-suspended',
    // ({ redirect, params, query }) => {
    //   return redirect({
    //     name: 'workspace_id-dam',
    //     params,
    //     query,
    //   })
    // },
  ],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped></style>

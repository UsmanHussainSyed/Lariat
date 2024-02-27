<script>
export default {
  middleware: ['onlyAuth'],
  async asyncData({ query, $axios, error, $toQueryString, redirect, params }) {
    const fallback = query.from
    if (fallback) delete query.from
    const downloadURL = `digital-assets/object-download?${$toQueryString(
      query
    )}`
    await $axios
      .get(downloadURL)
      .then((response) => redirect(303, response.data))
      .catch((e) => {
        // const errorCode = e?.response?.status
        // const errorMessage = e?.response?.statusText
        // if (fallback) return redirect(fallback)
        // redirect('/')
        error(e)
      })
  },
}
</script>

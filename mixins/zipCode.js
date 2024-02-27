export default {
  watch: {
    'contact_details.zip_code'(val) {
      if (val.length >= 5) this.getZipCodeSearch()
    },
    'lead.zip_code'(val) {
      if (val.length >= 5) this.getZipCodeSearch()
    },
  },
  methods: {
    getZipCodeSearch() {
      this.$axios
        .post('lm/common/zipcode-find-address', {
          zipcode: this.contact_details
            ? this.contact_details.zip_code
            : this.lead.zip_code,
        })
        .then(({ data }) => {
          if (this.contact_details) {
            this.contact_details.city = data.data.city
            this.contact_details.county = data.data.county
            this.contact_details.state = data.data.state
            this.contact_details.country = data.data.country
          } else {
            this.lead.city = data.data.city
            this.lead.county = data.data.county
            this.lead.state = data.data.state
            this.lead.country = data.data.country
          }
        })
    },
  },
}

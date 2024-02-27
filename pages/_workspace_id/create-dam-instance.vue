<template>
  <div class="body-content p0">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body bg-white">
              <h4>Create DAM instance</h4>
              <form ref="form" class="form" @submit.prevent="handleSubmit">
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Brand Name</label>
                    <input
                      v-model.trim="$v.brand.name.$model"
                      class="form-control"
                      name="brand_name"
                      type="text"
                      autocomplete="off"
                      placeholder="eg. abc"
                    />
                    <div v-if="$v.brand.name.$error" class="input-error">
                      <template v-if="!$v.brand.name.required">
                        Please provide brand name
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="radio-group">
                      <label class="radio-label">
                        Brand URL
                        <input
                          value="brand"
                          :checked="brand.is_domain == 0"
                          type="radio"
                          name="url"
                          @click="selectUrl"
                        />
                        <span class="radio-span"></span>
                      </label>
                      <label
                        v-tooltip="
                          customBrandAllowed
                            ? ''
                            : 'Please upgrade your subscription plan to enable this feature.'
                        "
                        class="radio-label"
                        :style="customBrandAllowed ? '' : 'opacity:0.4'"
                        @click="
                          (e) => {
                            if (!customBrandAllowed) {
                              e.stopPropagation()
                              e.stopImmediatePropagation()
                              e.preventDefault()
                            } else selectUrl(e)
                          }
                        "
                      >
                        Custom URL
                        <input
                          value="custom"
                          :checked="customBrandAllowed && brand.is_domain == 1"
                          type="radio"
                          name="url"
                          :style="
                            customBrandAllowed ? '' : 'pointer-events:none'
                          "
                          @click="customBrandAllowed ? selectUrl : ''"
                        />
                        <span class="radio-span"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div v-if="brand.is_domain == 0" class="col-sm-12">
                  <div class="form-group required">
                    <input
                      v-model.trim="$v.brand.brandUrl.$model"
                      name="url"
                      class="form-control"
                      type="text"
                      autocomplete="off"
                    />
                    <div v-if="$v.brand.brandUrl.$error" class="input-error">
                      <template v-if="!$v.brand.brandUrl.required">
                        URL is required.
                      </template>
                      <template v-else-if="!$v.brand.brandUrl.length">
                        URL must must contain 3 characters.
                      </template>
                      <template v-else-if="!$v.brand.brandUrl.format">
                        URL must start with an alphabet and should only contain
                        a-z, 0-9, _ and -.
                      </template>
                    </div>
                    <div
                      v-else
                      class="input-error text-info"
                      style="color: #17a2b8 !important"
                    >
                      <template v-if="!$v.brand.brandUrl.$model">eg.</template>
                      {{ $config.damBaseUrl }}/<strong
                        v-if="$v.brand.brandUrl.$model"
                        >{{ $v.brand.brandUrl.$model }}</strong
                      ><strong v-else>&lt;Brand_URL&gt;</strong>
                    </div>
                  </div>
                </div>
                <div v-else class="col-sm-12">
                  <div class="form-group w-100">
                    <input
                      v-model.trim="brand.domainUrl"
                      type="text"
                      class="form-control"
                    />
                    <div v-if="$v.brand.domainUrl.$error" class="input-error">
                      <template v-if="!$v.brand.domainUrl.required">
                        URL is required.
                      </template>
                      <template v-else-if="!$v.brand.domainUrl.length">
                        URL must must contain 3 characters.
                      </template>
                      <template v-else-if="!$v.brand.domainUrl.format">
                        URL must start with an alphabet and should only contain
                        a-z, 0-9, _ and -.
                      </template>
                    </div>
                    <div class="input-info">
                      <span
                        >eg. yourdomain.com or brandname.yourdomain.com</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 mt-35">
                  <button
                    type="submit"
                    class="cs-btn-orange btn-block btn-spiner"
                    :class="{ 'btn-disable ': loading }"
                    :disabled="loading"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  layout: 'damLayout',
  middleware: ['authCheck', 'check-dam-instance'],
  data() {
    return {
      loading: false,
      brand: { name: '', domainUrl: '', brandUrl: '', is_domain: 0 },
    }
  },
  computed: {
    customBrandAllowed() {
      return !!this.$auth.user?.subscription_features?.custom_brand_url?.enable
    },
  },
  watch: {
    '$store.state.dam.companyName': {
      handler(n) {
        this.brand.name = n
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    selectUrl(ev) {
      if (ev.target.value === 'brand') {
        this.brand.is_domain = 0
        this.brand.domainUrl = ''
      } else {
        this.brand.is_domain = 1
        this.brand.brandUrl = ''
      }
    },
    async handleSubmit(e) {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true

      const formData = new FormData()
      if (this.brand.is_domain === 0) {
        formData.append('url', this.brand.brandUrl)
      } else {
        formData.append('url', this.brand.domainUrl)
      }
      formData.append('brand_name', this.brand.name)
      formData.append('workspace_id', this.$getWorkspaceId())
      formData.append('is_domain', this.brand.is_domain)

      const response = await this.$axios
        .$post('digital-assets/instance/create', formData)
        .catch((e) => {
          const {
            error: { brand_name = [], url = [] },
            message,
          } = e.response.data
          const _messages =
            brand_name.length || url.length
              ? [brand_name[0], url[0]].filter((e) => e)
              : [message]
          _messages.forEach((_message) => this.$toast.global.error(_message))
        })
        .catch(this.$checkValidation)

      if (response) {
        const { message } = response
        if (message) this.$toast.global.success(message)

        await this.$auth.fetchUser()

        this.$router.replace({
          name: 'workspace_id-dam',
          params: {
            workspace_id: this.$getWorkspaceId(),
          },
        })
      }

      this.loading = false
    },
  },
  validations() {
    if (this.brand.is_domain === 0 || this.brand.is_domain === '0') {
      return {
        brand: {
          name: { required },
          brandUrl: {
            required,
            length: minLength(3),
            format(v) {
              return /^[a-z]{1}[a-z0-9_-]{2,36}$/gi.test(v)
            },
          },
        },
      }
    }
    if (this.brand.is_domain === 1 || this.brand.is_domain === '1') {
      return {
        brand: {
          name: { required },
          domainUrl: {
            required,
            length: minLength(3),
            format(v) {
              return /^[a-z0-9]+[_-]?.[a-z0-9\-_]*(\.[a-z]{1,3}){1,2}$/gi.test(
                v
              )
            },
          },
        },
      }
    }
  },
}
</script>

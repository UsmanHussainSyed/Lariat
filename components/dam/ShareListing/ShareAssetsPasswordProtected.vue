<template>
  <!--  Password Protected  -->
  <div class="password-protected">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="passwordProtectedInner">
        <div class="mb20 d-flex align-items-center justify-content-center">
          <img
            v-if="brandLogo"
            :src="brandLogo"
            alt="Logo"
            style="max-height: 45px; max-width: 200px"
          />
          <h2 v-else>{{ brandName }}</h2>
        </div>
        <div class="box bg-white text-center">
          <h4 class="mb2">This share is password protected</h4>
          <div class="d-flex">
            <div class="form-group mb0">
              <input
                id="pin-field"
                v-model.lazy="$v.password.$model"
                type="password"
                name="password"
                placeholder="Password"
                class="form-control"
                @keyup.enter="handleSubmit()"
              />
              <span toggle="#pin-field" class="toggle-pin fa fa-eye"></span>
              <div
                v-if="$v.password.$error && !$v.password.required"
                class="input-error"
              >
                Please provide password
              </div>
            </div>
            <div class="form-group ml-2 mb0">
              <a
                href="javascript:void(0);"
                class="btn btn-gray btn-icon"
                @click="handleSubmit()"
              >
                <svg
                  id="Layer_1"
                  data-v-343bdb4f=""
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 492 492"
                  xml:space="preserve"
                  class="big-down-arrow-icon"
                >
                  <g data-v-343bdb4f="">
                    <g data-v-343bdb4f="">
                      <path
                        data-v-343bdb4f=""
                        d="M442.7,268.5l-16.1-16.1c-5.1-5.1-11.8-7.9-19-7.9c-7.2,0-14.6,2.8-19.6,7.9L283.7,356V26.9C283.7,12.1,272.9,0,258,0h-22.8c-14.8,0-28.4,12.1-28.4,26.9v330.2l-104-104.7c-5.1-5.1-11.4-7.9-18.7-7.9c-7.2,0-13.8,2.8-18.8,7.9l-16,16.1c-10.5,10.5-10.4,27.6,0,38.1l177.6,177.6c5.1,5.1,11.8,7.9,19.1,7.9h0.1c7.2,0,14-2.8,19-7.9l177.5-177.6C453.2,296.1,453.2,279,442.7,268.5z"
                        class="fill-color"
                      ></path>
                    </g>
                  </g></svg
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    brandLogo: { type: String, default: null },
    brandName: { type: String, default: null },
    shareId: { type: Number, default: 0 },
    workspaceId: { type: Number, default: 0 },
  },
  data() {
    return {
      loading: false,
      password: null,
    }
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      this.loading = true
      await this.$axios
        .$post('authentication-check', {
          workspace_id: this.workspaceId,
          id: this.shareId,
          password: this.password,
        })
        .then(({ message, data }) => {
          sessionStorage.setItem('shared_url_access_token', data.access_token)
          this.$toast.global.success(message)
          this.$emit('openSharedList', data.access_token)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
  },
  validations: {
    password: { required },
  },
}
</script>

<template>
  <div class="body-content">
    <div class="general-settings h-100 w-100">
      <div
        class="general-settings-right w-100 h-100 d-flex align-items-center justify-content-center"
      >
        <div class="row no-gutters">
          <div class="col-md-12">
            <div class="general-settings-box feedback-box p2">
              <div v-if="!showThankyouBlock" class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <h2 class="title pl0">Submit Feedback</h2>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <label class="control-label">User Name</label>
                    <span class="input-control">{{ userName }}</span>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <label class="control-label">Email</label>
                    <span class="input-control">{{ userEmail }}</span>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <label class="control-label">Workspace Name</label>
                    <span class="input-control">{{ workspace_name }}</span>
                  </div>
                </div>
                <!-- <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">Module</label>
                    <div class="radio-group">
                      <label
                        v-for="(module, index) in modules"
                        :key="index"
                        class="radio-label"
                        >{{ module.module_name }}
                        <input
                          v-model="selectedModule"
                          type="radio"
                          name="module"
                          :value="module.module_id"
                        />
                        <span class="radio-span"></span>
                      </label>
                    </div>
                  </div>
                </div> -->

                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Feedback Comment</label>
                    <textarea
                      v-model="$v.comment.$model"
                      cols="4"
                      rows="4"
                      class="form-control"
                    ></textarea>
                    <div
                      v-if="$v.comment.$error && !$v.comment.required"
                      class="input-error"
                    >
                      Please add your comment
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <button
                    type="button"
                    name="submit"
                    class="btn"
                    :disabled="saveLoader"
                    @click="submitFeedback"
                  >
                    <i
                      v-if="saveLoader"
                      class="fa fa-circle-o-notch fa-spin"
                    ></i>
                    Submit Feedback
                  </button>
                </div>
              </div>
              <template v-if="showThankyouBlock">
                <p><strong>Thank you for giving your feedback.</strong></p>
                <p class="mb0">
                  Your feedback is very valuable for us. It's helps a lot in
                  improving the lariat platform and to release the new features.
                </p>
              </template>
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
  layout: 'projectLayout',
  middleware: ['authCheck'],
  data() {
    return {
      userId: this.$auth.user.id,
      userName: this.$auth.user.name,
      userEmail: this.$auth.user.email,
      workspace_id: this.$_auth().id
        ? this.$_auth().id
        : this.$route.params.workspace_id,
      workspace_name: this.$_auth().name,
      modules: this.$_auth().module,
      // selectedModule: 1,
      comment: '',
      saveLoader: false,
      showThankyouBlock: false,
    }
  },
  methods: {
    async submitFeedback() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false
        }
        this.saveLoader = true
        await this.$axios.$post('send-feedback', {
          comment: this.comment,
          moduleId: 2,
        })

        this.saveLoader = false
        this.comment = ''
        this.showThankyouBlock = true
        this.$toast.success('Your Feedback has been send successfully!')
      } catch (e) {
        this.saveLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    comment: { required },
  },
}
</script>

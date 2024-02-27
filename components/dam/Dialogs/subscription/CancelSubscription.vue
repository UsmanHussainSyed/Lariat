<template>
  <Model
    v-model="model"
    header-text="
      You are canceling your DAM subscription
    "
    hide-buttons
    :model-footer="false"
    :body-class="'cancel-subscription'"
  >
    <p class="mb2">
      We are sorry to see you go! So that we can continue to improve our
      service, please take a moment to tell us why you are canceling your
      <span :class="`plan-status ${lowerCase(planName)}`">{{ planName }}</span>
      subscription.
    </p>
    <div class="form-group d-flex required">
      <label class="control-label">Reason</label>
      <div class="radio-group vertical">
        <label
          v-for="reason in cancelReasons"
          :key="reason.id"
          class="radio-label"
          @click="cancelReason = reason"
          >{{ reason.text }}
          <input
            type="radio"
            name="reason"
            :value="reason.id"
            :checked="cancelReason.id === reason.id"
          />
          <span class="radio-span"></span>
        </label>
      </div>
    </div>
    <div class="form-group d-flex required">
      <label class="control-label">Comment</label>
      <textarea
        v-model="cancelComment"
        cols="4"
        rows="4"
        class="form-control"
        :placeholder="'What could we have done differently to improve the experience for you?'"
        :required="true"
      ></textarea>
    </div>
    <div class="form-group">
      <h6>Please Acknowledge</h6>
      <div class="d-flex acknowledge">
        <label class="check-label">
          <input
            v-model="cancelAcknowledged"
            type="checkbox"
            name="acknowledge"
            :checked="cancelAcknowledged"
          />
          <span class="check-span"></span>
        </label>
        <p>
          Your subscription will be cancelled on your current active plan end
          date
          <strong>{{ subscription.next_billing_date }}</strong
          >. Till that date, still you have access to your DAM account. You can
          also claim back to restart subscription if you have changed your mind.
          Once your subscription is cancel, you will no longer able to access
          your DAM account.
        </p>
      </div>
    </div>
    <div class="form-group mb0">
      <div class="d-flex justify-content-center">
        <a
          href="javascript:void(0);"
          class="btn btn-danger btn-big"
          :class="{ disabled: !allowedToCancel }"
          :disabled="!allowedToCancel"
          @click="cancel()"
          >Cancel Subscription</a
        >
      </div>
    </div>
  </Model>
</template>

<script>
import Model from '~/components/plugins/Model'
export default {
  name: 'CancelSubscription',
  components: { Model },
  extends: Model,
  props: {
    subscription: { type: Object, required: true, default: () => {} },
  },
  data() {
    return {
      cancelAcknowledged: false,
      cancelComment: '',
      cancelReasons: Object.freeze([
        {
          id: 1,
          text: 'Too Complex',
        },
        {
          id: 2,
          text: 'I’m closing down my business',
        },
        {
          id: 3,
          text: 'I’m moving to a different DAM platform',
        },
        {
          id: 4,
          text: 'Other',
        },
      ]),
      cancelReason: {},
    }
  },
  computed: {
    lowerCase() {
      return (value) => {
        if (!value || !value.length) return value
        if (
          typeof value === 'string' &&
          value.toLowerCase &&
          typeof value.toLowerCase === 'function'
        )
          return value.toLowerCase()
        return value
      }
    },
    allowedToCancel() {
      if (!this.cancelReason?.id) return false
      return this.cancelComment?.length && this.cancelAcknowledged
    },
    billingCycle() {
      return this.subscription.billing_cycle === 'yearly'
        ? 'year'
        : this.subscription.billing_cycle === 'monthly'
        ? 'month'
        : this.subscription.billing_cycle
    },
    storage() {
      return this.subscription.features?.storage?.default_value
    },
    planName() {
      return this.subscription?.plan_name || ''
    },
  },
  methods: {
    reset() {
      this.cancelAcknowledged = false
      this.cancelComment = ''
      this.cancelReason = {}
    },
    cancel() {
      if (this.canceling) return
      this.canceling = true
      this.$axios
        .$post('digital-assets/subscription/cancel', {
          cancel_reason: this.cancelReason.text,
          cancel_comment: this.cancelComment,
        })
        .then(() => {
          this.$toast.global.success(
            `Your DAM subscription is scheduled to cancel on ${this.subscription.next_billing_date}. You can reactivate your current plan anytime before ${this.subscription.next_billing_date}. 😥`
          )
          this.hide()
          this.$emit('canceled')
          this.reset()
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.canceling = false
        })
    },
  },
}
</script>

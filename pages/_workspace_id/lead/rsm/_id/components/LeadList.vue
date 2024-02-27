<template>
  <li>
    <div class="name-email tb-column flex30">
      <div class="dealer-num">{{ count }}</div>
      <div>
        <div class="top-column">
          <label>
            <nuxt-link
              :to="{
                name: 'workspace_id-lead-leads-id',
                params: {
                  workspace_id: $_auth().id,
                  id: lead.id,
                },
              }"
            >
              {{ getFullName(lead.first_name, lead.last_name) }}
            </nuxt-link></label
          >
        </div>
        <div class="bottom-column">
          <span>
            <nuxt-link
              :to="{
                name: 'workspace_id-lead-leads-id',
                params: {
                  workspace_id: $_auth().id,
                  id: lead.id,
                },
              }"
            >
              {{ lead.email }}
            </nuxt-link></span
          >
        </div>
      </div>
    </div>
    <div class="tb-column flex15">
      <div class="top-column">
        <label>{{ lead.phone }}</label>
      </div>
    </div>
    <div class="model tb-column flex30">
      <div class="top-column">
        <label>{{ lead.product_name }}</label>
      </div>
    </div>
    <div class="dealer sorting sortarrow flex20">
      <div class="top-column">
        <label>{{ lead.dealership_name || '-' }}</label>
      </div>
    </div>
    <div class="lead-status tb-column flex15">
      <div class="top-column">
        <div class="status-no-dropdown">
          <lead-status
            v-if="lead.lead_status"
            :value="lead.lead_status"
            class="search-by"
            :items="leadStatusOptions"
            item_text="status_name"
            item_value="id"
            item_color="status_color"
            :disabled="true"
            :select_first="false"
          >
          </lead-status>
          <label v-else> - </label>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import LeadStatus from '~/components/lead/LeadStatus.vue'
export default {
  components: {
    LeadStatus,
  },
  props: {
    lead: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
    leadStatusOptions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getFullName() {
      return (firstName, lastName) => {
        if (firstName && lastName) {
          return firstName + ' ' + lastName
        } else if (firstName) {
          return firstName
        } else if (lastName) {
          return lastName
        } else {
          return '-'
        }
      }
    },
  },
}
</script>

<style></style>

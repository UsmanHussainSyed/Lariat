<template>
  <li class="bg-white">
    <div class="dropdown common-dropdown">
      <a
        href="javascript:void(0);"
        class="dropdown-toggle"
        data-toggle="dropdown"
      >
        <MenuIcon />
      </a>
      <ul class="dropdown-menu">
        <li v-if="!assignment.isProductDeleted">
          <a
            class="dropdown-item"
            data-toggle="dropdown"
            @click="$emit('onEdit', assignment, $event)"
            ><span class="dropdown-item-icon">
              <EditIcon :is-active-orange="false" /> </span
            >Edit</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click="$emit('onDelete', assignment)"
            ><span class="dropdown-item-icon"> <DeleteIcon /> </span>Delete</a
          >
        </li>
      </ul>
    </div>
    <div class="mb20">
      <h5>Model</h5>
      <p>{{ assignment.product_name }}</p>
    </div>
    <div
      v-for="v in assignment.variant_options"
      :key="v.id"
      :class="{ mb20: v.variant_display_options.savedOption }"
    >
      <h5 v-if="v.variant_display_options.savedOption">
        {{ v.variant_name }}
      </h5>
      <p v-if="v.variant_display_options.savedOption">
        {{ v.variant_display_options.savedOption }}
      </p>
    </div>
    <div v-if="assignment.dealership_name" class="mb20">
      <h5>Dealership</h5>
      <p>{{ assignment.dealership_name }}</p>
    </div>
    <div v-if="assignment.rsm.length" class="mb20">
      <h5>
        {{ assignment.rsm.length > 1 ? 'RSMs' : 'RSM' }}
      </h5>
      <p v-for="rsm in assignment.rsm" :key="rsm.id">
        {{ rsm.name }}
      </p>
    </div>
    <div class="status-dropdown w-50">
      <Select2WithColor
        v-model="status"
        :class-obj="{ 'status-select': true }"
        dropdown-css-class="status-select"
        :options="leadStatusOptions"
        :custom-event="true"
        @optionChangeHandler="
          handleStatusChange(
            ...arguments,
            assignment.product_id,
            assignment.dealership_id
          )
        "
      />
    </div>
  </li>
</template>
<script>
import Select2WithColor from '@/components/plugins/Select2WithColor'
import MenuIcon from '@/components/lead/Icons/MenuIcon'
export default {
  components: {
    MenuIcon,
    Select2WithColor,
  },
  props: {
    assignment: {
      type: Object,
      required: true,
    },
    leadStatusOptions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    status: {
      get() {
        return this.assignment.lead_status
      },
      set(v) {
        this.$emit('update:status', v)
      },
    },
  },
  methods: {
    handleStatusChange(v, product_id, dealership_id) {
      this.$emit('onStatusChange', v, product_id, dealership_id)
    },
  },
}
</script>

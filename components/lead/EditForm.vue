<template>
  <div>
    <div class="edit-user-form">
      <div class="add-user-box">
        <text-field
          v-model="editUser.name"
          label="Name"
          :required="true"
          :v="$v.editUser.name"
        ></text-field>
        <text-field
          v-model="editUser.email"
          label="Email"
          type="email"
          readonly
          required
          :disabled="true"
          :v="$v.editUser.email"
        ></text-field>

        <text-field
          v-model="editUser.designation"
          label="Job Title"
          :required="true"
          :v="$v.editUser.designation"
        ></text-field>

        <Select
          v-model="editUser.role"
          :items="roles"
          item_text="name"
          item_value="id"
          label="User Role"
          :required="true"
          :v="$v.editUser.role"
        ></Select>

        <div class="form-group">
          <label class="control-label"></label>
          <button
            class="btn btn-small"
            :disabled="addUserLoading"
            @click="updateUserForm"
          >
            <i v-if="addUserLoading" class="fa fa-circle-o-notch fa-spin"> </i>
            <span> Update</span>
          </button>
          <a
            href="javascript:void(0);"
            class="add-user-form-close"
            @click="closeForm"
          >
            <svg
              id="Layer_1"
              class="close-icon h-red"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4358" transform="translate(-69.745 -317.549)">
                <path
                  id="Path_3424"
                  class="fill-color"
                  d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                ></path>
                <path
                  id="Path_3425"
                  class="fill-color"
                  d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                ></path>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import TextField from '~/components/lead/TextField.vue'
import Select from '~/components/lead/Select.vue'
export default {
  name: 'EditForm',
  components: {
    TextField,
    Select,
  },
  props: {
    addUserLoading: {
      type: Boolean,
      default: false,
    },
    myUser: {
      type: Object,
      required: true,
    },
    roles: Array,
  },
  computed: {
    editUser() {
      return this.myUser
    },
  },
  methods: {
    updateUserForm() {
      this.$v.editUser.$touch()
      if (!this.$v.editUser.$invalid) {
        this.$emit('updateUser', this.editUser)
      }
    },
    closeForm() {
      this.$emit('closeEditUserForm', this.editUser)
    },
  },
  validations() {
    return {
      editUser: {
        name: { required },
        email: { required, email },
        role: { required },
        designation: { required },
      },
    }
  },
}
</script>

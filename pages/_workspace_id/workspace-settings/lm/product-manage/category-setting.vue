<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <navigationTab :active-routes="productRoutes" />
    </div>

    <div class="workspace-settings customscrollbar">
      <div class="common-box p0">
        <div class="row h-100">
          <div
            v-if="$_auth().user.lead.isSuperAdmin"
            class="col-lg-12 col-xl-4"
          >
            <form class="form" @submit.prevent="handleSubmit">
              <div class="table-list-view">
                <div class="no_header">
                  <div id="personal_details" class="sc_nav_section active">
                    <div class="box">
                      <div class="form-group required">
                        <label class="control-label">Category Name</label>
                        <input
                          v-model="form.name"
                          type="text"
                          name="first-name"
                          class="form-control"
                          placeholder="Category name"
                        />
                        <div
                          v-if="$v.form.name.$error && !$v.form.name.required"
                          class="input-error"
                        >
                          Please provide category name
                        </div>
                      </div>
                      <Select
                        v-model="form.parent_category_id"
                        item_text="name"
                        item_value="id"
                        placeholder="Root"
                        :items="parentCategories"
                        :select_first="false"
                        label="Parent Category"
                      ></Select>
                    </div>
                  </div>
                </div>
                <div class="tfooter p0">
                  <div class="row xs-gutters">
                    <div class="col-7">
                      <button class="btn btn-block" type="submit">
                        <span>Save</span>
                      </button>
                    </div>
                    <div class="col-5">
                      <button
                        type="button"
                        class="btn btn-gray btn-block"
                        @click="reset()"
                      >
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-12 col-xl-8 h-100 mdt-2">
            <div class="common-box bg-gray h-100">
              <div class="table-list-view small-height">
                <ul class="thead">
                  <li>
                    <div
                      class="sorting sortarrow flex30"
                      :class="[
                        sortBy === 'name' && sortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="sort('name')">Category Name</span>
                    </div>
                    <div
                      class="sorting sortarrow flex20"
                      :class="[
                        sortBy === 'id' && sortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="sort('id')">Category Id</span>
                    </div>
                    <div
                      class="sorting sortarrow flex35"
                      :class="[
                        sortBy === 'parent_category' && sortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="sort('parent_category')"
                        >Parent Category</span
                      >
                    </div>
                    <div
                      v-if="$_auth().user.lead.isSuperAdmin"
                      class="sorting flex15"
                    >
                      <span>Actions</span>
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <li
                      v-for="category in categories"
                      v-show="category.id !== deleteCategoryId"
                      :key="category.id"
                    >
                      <div class="tb-column flex30">
                        <label class="table-a">{{ category.name }}</label>
                      </div>
                      <div class="tb-column flex20">
                        <label class="table-a">{{ category.id }}</label>
                      </div>
                      <div class="tb-column flex35">
                        <label>{{ categoryName(category.parent_id) }}</label>
                      </div>
                      <div class="tb-column flex15">
                        <ul class="action">
                          <li>
                            <a
                              v-if="$_auth().user.lead.isSuperAdmin"
                              href="javascript:void(0);"
                              @click="editCategory(category)"
                            >
                              <svg
                                id="Layer_1"
                                v-tooltip="'Edit Category'"
                                class="edit-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                                aria-describedby="tooltip13562"
                              >
                                <g
                                  id="Group_4350"
                                  transform="translate(-397.961 -147.331)"
                                >
                                  <path
                                    id="Path_3408"
                                    class="fill-color"
                                    d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                                  ></path>
                                  <path
                                    id="Path_3409"
                                    class="fill-color"
                                    d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              v-if="$_auth().user.lead.isSuperAdmin"
                              href="javascript:void(0);"
                              data-toggle="modal"
                              data-target="#delete-category"
                              @click="deleteCategoryId = category.id"
                            >
                              <svg
                                id="Layer_1"
                                v-tooltip="'Delete Category'"
                                class="delete-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 15.3 18"
                                xml:space="preserve"
                                aria-describedby="tooltip634440"
                              >
                                <g
                                  id="Group_4351"
                                  transform="translate(-443.472 -147.331)"
                                >
                                  <path
                                    id="Path_3410"
                                    class="fill-color"
                                    d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                                  ></path>
                                  <path
                                    id="Path_3411"
                                    class="fill-color"
                                    d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="delete-category" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Category</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
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
              </span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>Are you sure you want to delete the category?</p>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                @click="deleteCategoryId = null"
                >No</a
              >
              <a
                href="javascript:void(0);"
                class="btn"
                data-dismiss="modal"
                @click="deleteCategory()"
                >Yes</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Select from '~/components/lead/Select.vue'
import navigationTab from '~/components/lead/navigation-tab'
import routeMixins from '~/mixins/routeMixins'
export default {
  components: {
    Select,
    navigationTab,
  },
  mixins: [routeMixins],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],

  data() {
    return {
      form: {
        name: null,
        workspace_id: this.$route.params.workspace_id,
        parent_category_id: null,
        category_id: null,
      },
      categories: [],
      parentCategories: [],
      deleteCategoryId: null,
      sortBy: '',
      sortOrder: 'DESC',
    }
  },
  created() {
    this.parentCategory()
  },

  methods: {
    async parentCategory() {
      await this.$axios
        .$get(`lm/category/list`, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
            sortvalue: this.sortBy,
            orderby: this.sortOrder,
          },
        })
        .then((response) => {
          this.parentCategories = response.data.filter(
            (c) => c.parent_id === null
          )
          this.categories = response.data
          this.deleteCategoryId = null
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    sort(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.sortBy = column
        this.sortOrder = 'ASC'
      }
      this.parentCategory()
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      const data = {
        name: this.form.name,
        workspace_id: this.$route.params.workspace_id,
      }
      if (
        this.form.parent_category_id &&
        this.form.parent_category_id !== 'root'
      ) {
        data.parent_category_id = this.form.parent_category_id
      }
      let action = 'add'
      if (this.form.category_id) {
        data.category_id = this.form.category_id
        action = 'update'
      }

      this.$axios
        .$post('lm/category/' + action, data, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((response) => {
          this.$toast.success(response.message)
          this.parentCategory()
          this.form.name = null
          this.form.parent_category_id = null
          this.form.category_id = null
          this.$v.form.$reset()
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    reset() {
      if (this.form.name && this.form.name.trim()) {
        const f = confirm('Do you really want to cancel?')
        if (f) {
          this.form.name = null
          this.form.parent_category_id = null
          this.form.category_id = null
          this.$v.form.$reset()
        }
      } else {
        this.form.name = null
        this.form.parent_category_id = null
        this.form.category_id = null
        this.$v.form.$reset()
      }
    },
    editCategory(c) {
      this.form.name = c.name
      this.form.parent_category_id = c.parent_id === null ? 'root' : c.parent_id
      this.form.category_id = c.id
    },
    deleteCategory() {
      if (this.deleteCategoryId)
        this.$axios
          .$post(
            `lm/category/delete`,
            {
              category_id: this.deleteCategoryId,
              workspace_id: this.$route.params.workspace_id,
            },
            {
              params: {
                url_workspace_id: this.$route.params.workspace_id,
              },
            }
          )
          .then((r) => {
            this.$toast.success('Category deleted successfully')

            this.parentCategory()
          })
          .catch((err) => {
            this.deleteCategoryId = null
            this.$toast.error(this.$getErrorMessage(err))
          })
    },
    categoryName(id) {
      const c = this.categories.find((c) => c.id === id)
      if (c) return c.name
      return 'Root'
    },
  },
  validations: {
    form: {
      name: { required },
    },
  },
}
</script>

<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <navigationTab :active-routes="productRoutes" />
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="general-settings-title">
        <h4>Manage Product Variants</h4>
      </div>
      <div class="workspace-settings-subheading">
        <p>
          This is a list of all Active Product Varaints in your Organization.
          You can add and delete Types, sort, and edit.
        </p>
      </div>
      <div class="form-group">
        <WorkspaceNote />
      </div>
      <div class="row no-gutters">
        <div class="col-lg-6 col-md-12">
          <form @submit.prevent="addVariant" @keypress.enter.prevent>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group required">
                  <label class="control-label">Add New Product Variant</label>
                  <input
                    v-model="$v.fieldsPayload.variant_name.$model"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <div
                    v-if="
                      $v.fieldsPayload.variant_name.$error &&
                      !$v.fieldsPayload.variant_name.required
                    "
                    class="input-error"
                  >
                    Product Varaint is required
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group required">
                  <label class="control-label">Field Type</label>
                  <div class="multiselect">
                    <Select2MultipleWithoutImage
                      :options="fieldTypes"
                      :value="selectedFields"
                      custom-event
                      @changeFollower="selectFields"
                    />
                    <div
                      v-if="
                        $v.selectedFields.$error && !$v.selectedFields.required
                      "
                      class="input-error"
                    >
                      Field Type is required
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-for="(field, index) in $v.fieldsPayload.fields.$each.$iter"
                :key="index"
                class="col-md-12 box mb-4"
                :class="[
                  field.type.$model === 'multiple_dropdown' ||
                  field.type.$model === 'single_dropdown'
                    ? 'dropdown'
                    : '',
                ]"
              >
                <h4>{{ checkFieldProperName(field.type.$model) }}</h4>
                <label
                  v-if="
                    (field.type.$model === 'multiple_dropdown' ||
                      field.type.$model === 'single_dropdown' ||
                      field.type.$model === 'upload') &&
                    fieldsPayload.variantDisplayOptions.isDropdown
                  "
                  class="radio-label"
                >
                  <input
                    v-model="field.isPrimaryOption.$model"
                    type="radio"
                    name="variant"
                    value="true"
                    @click="changePrimaryOption($event, field)"
                  />
                  <span class="radio-span"></span>
                </label>
                <div class="form-group w-75 mb0 required">
                  <label class="control-label">Field Label</label>
                  <input
                    v-model="field.label.$model"
                    type="text"
                    name=""
                    class="form-control"
                  />
                  <div
                    v-if="field.label.$error && !field.label.required"
                    class="input-error"
                  >
                    Please enter field Label
                  </div>
                </div>
                <div
                  v-if="
                    field.type.$model === 'multiple_dropdown' ||
                    field.type.$model === 'single_dropdown'
                  "
                  class="form-group w-75 mb0 required"
                >
                  <div class="custom-value-list">
                    <draggable
                      v-model="field.seedValue.$model"
                      tag="ul"
                      draggable=".drag"
                      handle=".drag_handle"
                      ghost-class="ghost"
                    >
                      <li
                        v-for="(dField, idx) in field.seedValue.$model"
                        :key="idx"
                        class="drag"
                      >
                        <span class="drag_handle"
                          ><span></span><span></span><span></span
                        ></span>
                        <input
                          v-model="dField.text"
                          type="text"
                          class="form-control"
                          placeholder="Enter option"
                          @keydown.enter="addFieldOption(field)"
                        />
                        <a
                          v-if="
                            parseInt(field.seedValue.$model.length) !=
                            parseInt(idx) + 1
                          "
                          href="javascript:void(0);"
                          class="actions"
                          @click="field.seedValue.$model.splice(idx, 1)"
                        >
                          <svg
                            id="Layer_1"
                            class="close-icon h-red"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete Field"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4358"
                              transform="translate(-69.745 -317.549)"
                            >
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
                      </li>
                    </draggable>
                    <a
                      href="javascript:void(0);"
                      class="addOptions"
                      @click="addFieldOption(field)"
                      >Add options</a
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group d-flex">
                  <label class="label-switch no-text"
                    >Display as a Drop-down
                    <input
                      v-model="fieldsPayload.variantDisplayOptions.isDropdown"
                      type="checkbox"
                      class="switch"
                      :value="selectedFieldIncludeOptions && 1"
                      :disabled="!selectedFieldIncludeOptions"
                    />
                    <span class="lable"></span>
                  </label>
                </div>
                <div v-if="minOptSelect" class="input-error">
                  Please select atleast one field as option
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn"
                    :class="{ 'btn-disable': loading }"
                    :disabled="loading"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="!myData" class="searh-result-body customscrollbar">
        <ContentLoader
          :speed="1"
          :animate="true"
          :width="400"
          :height="100"
          class="px-2 normalLoader"
        >
          <rect x="0" y="-1" rx="0" ry="0" width="66.666667%" height="15" />
          <rect x="0" y="15" rx="0" ry="0" width="66.666667%" height="15" />
          <rect x="0" y="31" rx="0" ry="0" width="66.666667%" height="15" />
          <rect x="0" y="47" rx="0" ry="0" width="66.666667%" height="15" />
        </ContentLoader>
      </div>

      <div v-else class="row no-gutters">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="workspace-setting-table">
            <ul class="thead">
              <li>
                <label class="check-label"
                  >Select All
                  <input
                    id="ckbCheckAll"
                    v-model="checkAll"
                    name="checkbox"
                    type="checkbox"
                    data-lpignore="true"
                    @input="
                      listItems.forEach((ev) => (ev.selected = !checkAll))
                    "
                  />

                  <span class="check-span"></span>
                </label>
              </li>
              <li>
                <input
                  v-model="search"
                  class="form-control"
                  type="search"
                  name="search"
                  placeholder="Search Variant Types"
                  data-lpignore="true"
                />
              </li>
              <li v-if="selections.length">
                <button
                  class="btn"
                  type="button"
                  @click="
                    multiDeleteDialog = false
                    $nextTick(() => (multiDeleteDialog = true))
                  "
                >
                  Delete ({{ selections.length }})
                </button>
              </li>
            </ul>
            <div v-if="isSearchTerm" class="search-result mb1">
              <div class="alert alert-info alert-dismissible">
                <button
                  class="close"
                  type="button"
                  data-dismiss="alert"
                  @click="search = ''"
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
                </button>
                Showing results for
                <strong>"{{ search.trim() }}"</strong>
              </div>
            </div>
            <ul class="thead workspace-tabledata-header">
              <li>
                <div class="name sorting">Name</div>
              </li>
            </ul>
            <draggable
              v-model="types"
              class="tbody list-animation"
              tag="ul"
              draggable=".drag"
              handle=".drag-row"
              @change="draggableProjectTaskType"
            >
              <li
                v-for="(type, index) in listItems"
                :key="type.id"
                class="drag"
                :style="`--animation-order: ${index + 1}`"
              >
                <div class="workspace-tabledata" :class="{ pl0: isSearchTerm }">
                  <span v-if="!isSearchTerm" class="drag-row">
                    <svg
                      id="Layer_1"
                      class="menu-option-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4482" transform="translate(-872 -801)">
                        <rect
                          id="Rectangle_3020"
                          x="872"
                          y="801"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Group_4348"
                          transform="translate(588.166 653.684)"
                        >
                          <circle
                            id="Ellipse_203"
                            class="fill-color"
                            cx="292.8"
                            cy="148.9"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-2"
                            class="fill-color"
                            cx="292.8"
                            cy="163.8"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-3"
                            class="fill-color"
                            cx="292.8"
                            cy="156.3"
                            r="1.5"
                          ></circle>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <label class="check-label">
                    <input
                      v-model="type.selected"
                      name="checkbox"
                      class="checkBoxClass"
                      type="checkbox"
                      data-lpignore="true"
                    />

                    <span class="check-span"></span>
                  </label>
                  <input
                    ref="taskType"
                    v-model="type.type_name"
                    class="form-control"
                    type="text"
                    data-lpignore="true"
                    @keyup="editType(type)"
                  />

                  <a
                    href="javascript:void(0);"
                    class="delete-forever"
                    @click.capture="showDeleteTypeDialog(type)"
                  >
                    <svg
                      id="Layer_1"
                      v-tooltip="'Delete'"
                      class="delete-icon h-orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 15.3 18"
                      xml:space="preserve"
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
                </div>
              </li>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="singleDeleteDialog"
      @click:confirm-button="deleteType(getDeleteTypeId)"
    >
      <template slot="header">Delete Product Variant</template>

      Are you sure you want to delete <b>{{ getDeleteTypeName }}</b> as a
      Product Variant?
    </ConfirmationDialog>
    <ConfirmationDialog
      v-model="multiDeleteDialog"
      @click:confirm-button="deleteSelection"
    >
      <template slot="header">Delete Product Variant</template>

      Are you sure you want to delete
      <b>{{ selections.length }} selected</b> Product Variants?
    </ConfirmationDialog>
  </div>
</template>

<script>
// import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'
import draggable from 'vuedraggable'
import { ContentLoader } from 'vue-content-loader'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import navigationTab from '~/components/lead/navigation-tab'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import Select2MultipleWithoutImage from '~/components/plugins/Select2MultipleWithoutImage'
import { slugify } from '~/utils/helper'
import routeMixins from '~/mixins/routeMixins'
export default {
  components: {
    WorkspaceNote,
    ConfirmationDialog,
    draggable,
    ContentLoader,
    navigationTab,
    Select2MultipleWithoutImage,
  },
  mixins: [routeMixins],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
  ],
  data() {
    return {
      search: '',
      myData: null,
      checkAll: false,
      multiDeleteDialog: false,
      singleDeleteDialog: false,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,

      loading: null,
      types: [],
      new_type: null,
      getDeleteTypeId: null,
      getDeleteTypeName: null,
      fieldTypes: [],
      selectedFields: [],
      minOptSelect: false,
      fieldsPayload: {
        variantDisplayOptions: {
          isDropdown: false,
          options: [],
          savedOption: '',
        },
        variant_name: '',
        fields: [],
      },
    }
  },
  computed: {
    checkField() {
      return (id) =>
        this.fieldTypes.find((e) => parseInt(e.id) === parseInt(id))?.field_name
    },
    checkFieldProperName() {
      return (name) => this.fieldTypes.find((e) => e.field_name === name).text
    },
    isEverySomeFieldNotSelected() {
      return this.fieldsPayload.fields.some((e) => e.isPrimaryOption)
    },
    checckFieldIncludeDropdown() {
      return this.selectedFields.some(
        (e) =>
          this.checkField(e) === 'multiple_dropdown' ||
          this.checkField(e) === 'single_dropdown'
      )
    },
    selectedFieldIncludeOptions() {
      return this.selectedFields.some(
        (e) =>
          this.checkField(e) === 'multiple_dropdown' ||
          this.checkField(e) === 'single_dropdown' ||
          this.checkField(e) === 'upload'
      )
    },
    isSearchTerm() {
      return this.search && this.search.trim()
    },
    selections() {
      return this.types.filter(({ selected }) => selected)
    },
    listItems() {
      const search = this.search && this.search.trim()

      if (search) {
        return this.types.filter(({ type_name: typeName }) => {
          let regex = null
          try {
            regex = new RegExp(search, 'ig')
          } catch {}

          return regex && regex.test(typeName)
        })
      }

      return this.types
    },
  },
  watch: {
    listItems: {
      handler() {
        if (this.listItems.every((ev) => ev.selected === true)) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getProductVariants()
    this.getVariantCustomFields()
  },
  methods: {
    selectFields($event) {
      this.selectedFields = $event
      this.selectedFields.forEach((eId) => {
        if (
          !this.fieldsPayload.fields.some(
            (e) => e.type === this.checkField(eId)
          )
        ) {
          this.$v.$reset()
          this.fieldsPayload.fields.push({
            type: this.checkField(eId),
            label: '',
            seedValue: [{ text: '' }],
            data: null,
            isPrimaryOption: false,
            attachmentData: null,
          })
        }
      })
      this.fieldsPayload.fields.forEach((field, i) => {
        if (
          !this.selectedFields.includes(
            this.fieldTypes
              .find((e) => e.field_name === field.type)
              .id.toString()
          )
        ) {
          this.$v.$reset()
          this.fieldsPayload.fields.splice(i, 1)
        }
      })
      if (!this.selectedFieldIncludeOptions) {
        this.fieldsPayload.variantDisplayOptions.isDropdown = false
      }
    },
    async getVariantCustomFields() {
      // Get -> lm/product/variant/type/custom-fields?url_workspace_id=751248318
      try {
        const { data } = await this.$axios.$get(
          'lm/product/variant/type/custom-fields'
        )
        data.shift()
        this.fieldTypes = data
      } catch (e) {
        console.log(e)
      }
    },
    async getProductVariants() {
      try {
        const productTypeData = await this.$axios.$post(
          '/lm/product/variant/type/list',
          {
            workspace_id: this.internal_workspace_id,
          }
        )
        this.myData = true
        productTypeData.data.forEach((ev) => (ev.selected = false))
        this.types.push(...productTypeData.data)
      } catch (e) {
        // const { data } = e.response || {}
        this.loading = false
      }
    },
    addFieldOption(field) {
      this.$v.$touch()
      if (!field.seedValue.$each.$error) {
        field.seedValue.$model.push({ text: '' })
      }
    },
    changePrimaryOption(evt, field) {
      this.fieldsPayload.fields.forEach((e) => {
        e.isPrimaryOption = false
      })
      field.isPrimaryOption.$model = evt.target.value
      this.minOptSelect = false
    },
    async addVariant() {
      for (let i = 0; i < this.fieldsPayload.fields.length; i++) {
        if (
          this.fieldsPayload.fields[i].type.toString() !==
            'multiple_dropdown' &&
          this.fieldsPayload.fields[i].type.toString() !== 'single_dropdown'
        ) {
          this.fieldsPayload.fields[i].seedValue[0].text = 'xxx'
        }
      }
      if (this.fieldsPayload.variantDisplayOptions.isDropdown) {
        if (!this.isEverySomeFieldNotSelected) {
          this.minOptSelect = true
        } else {
          this.minOptSelect = false
        }
      } else {
        this.fieldsPayload.fields.forEach((e) => {
          e.isPrimaryOption = false
        })
        this.minOptSelect = false
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (this.minOptSelect) {
        return
      }
      try {
        this.loading = true
        for (let i = 0; i < this.fieldsPayload.fields.length; i++) {
          if (
            this.fieldsPayload.fields[i].type.toString() !==
              'multiple_dropdown' &&
            this.fieldsPayload.fields[i].type.toString() !== 'single_dropdown'
          ) {
            this.fieldsPayload.fields[i].seedValue = null
          } else {
            this.fieldsPayload.fields[i].seedValue.forEach((f) => {
              f.id = slugify(f.text)
            })
          }
        }
        const { message } = await this.$axios.$post(
          'lm/product/variant/type/add',
          {
            workspace_id: this.internal_workspace_id,
            type_name: this.fieldsPayload.variant_name,
            custom_fields: this.fieldsPayload,
          }
        )
        this.types = []
        this.selectedFields = []
        this.fieldsPayload = {
          variantDisplayOptions: {
            isDropdown: false,
            options: [],
            savedOption: '',
          },
          variant_name: '',
          fields: [],
        }
        this.getProductVariants()
        this.$v.$reset()
        this.new_type = null
        this.$nextTick(() => {
          this.$v.$reset()
        })
        this.loading = false
        this.$toast.success(message)
      } catch (e) {
        const { data } = e.response || {}
        this.loading = false
        this.$toast.error((data && data.message) || e.message)
      }
    },

    editType(type) {
      debounce(async () => {
        const typeName = type.type_name

        if (typeName !== '') {
          try {
            const { data, message } = await this.$axios.$post(
              'lm/product/variant/type/update',
              {
                workspace_id: this.internal_workspace_id,
                project_type_id: type.id,
                type_name: typeName,
              }
            )
            if (Object.keys(data).length === 0) {
              this.$toast.success(message)
            } else {
              type.type_name = data.variant_name
              this.$toast.error(message)
            }
          } catch (e) {
            const { data } = e.response || {}
            this.loading = false
            this.$toast.error((data && data.message) || e.message)
          }
        }
      }, 1000)
      // else {
      //   const typeId = type.id
      //   let index = this.listItems.findIndex(({ id }) => id === typeId)
      //   if (~index) {
      //     index--
      //     if (index > 0)
      //       this.$nextTick(() => this.$refs.taskType[index].focus())
      //   }

      //   if (typeId) {
      //     if (
      //       event.keyCode.toString() === '8' ||
      //       event.which.toString() === '8'
      //     ) {
      //       this.deleteType(typeId)
      //     }
      //   }
      // }
    },
    showDeleteTypeDialog(type) {
      this.singleDeleteDialog = false
      this.getDeleteTypeId = type.id
      this.getDeleteTypeName = type.type_name
      this.$nextTick(() => (this.singleDeleteDialog = true))
    },
    async deleteType(typeId) {
      try {
        const { message } = await this.$axios.$post(
          'lm/product/variant/type/delete',
          {
            workspace_id: this.internal_workspace_id,
            product_variant_type_id: typeId,
          }
        )
        this.types = this.types.filter(({ id }) => typeId !== id)
        this.$toast.success(message)
        this.$nextTick(() => (this.singleDeleteDialog = false))
      } catch (e) {
        const { data } = e.response || {}
        this.$toast.error((data && data.message) || e.message)
        this.loading = false
      }
    },
    async deleteSelection() {
      try {
        const { message } = await this.$axios.$post(
          'lm/product/variant/type/delete-multiple',
          {
            workspace_id: this.internal_workspace_id,
            product_variant_type_id: this.selections.map(({ id }) => id),
          }
        )

        this.types = this.types.filter(({ selected }) => !selected)

        this.$nextTick(() => (this.multiDeleteDialog = false))
        this.$toast.success(message)
      } catch (e) {
        const { data } = e.response || {}
        this.$toast.error((data && data.message) || e.message)
      }
    },
    async draggableProjectTaskType() {
      this.types.map((type, index) => (type.sort_order = index + 1))
      try {
        const productTypeData = await this.$axios.$post(
          `lm/product/variant/type/change-ordering`,
          {
            workspace_id: this.internal_workspace_id,
            data: this.types,
          }
        )
        this.$toast.success(productTypeData.message)
      } catch (e) {
        const { data } = e.response || {}
        this.$toast.error((data && data.message) || e.message)
      }
    },
  },
  validations() {
    let v = {
      selectedFields: { required },
      fieldsPayload: {
        variantDisplayOptions: {
          isDropdown: {},
          options: {},
          savedOption: {},
        },
        variant_name: { required },
        fields: {
          $each: {
            // type: '',
            isPrimaryOption: {},
            label: { required },
            type: { required },
            seedValue: {},
            // data: null,
          },
        },
      },
    }
    if (this.checckFieldIncludeDropdown) {
      v = {
        selectedFields: { required },
        fieldsPayload: {
          variantDisplayOptions: {
            isDropdown: {},
            options: {},
            savedOption: {},
          },
          variant_name: { required },
          fields: {
            $each: {
              // type: '',
              isPrimaryOption: {},
              label: { required },
              type: { required },
              seedValue: {
                $each: {
                  text: { required },
                },
              },
              // data: null,
            },
          },
        },
      }
    }
    return v
  },
}

let timeout
function debounce(func, wait) {
  clearTimeout(timeout)
  timeout = setTimeout(func, wait)
}
</script>

<style scoped></style>

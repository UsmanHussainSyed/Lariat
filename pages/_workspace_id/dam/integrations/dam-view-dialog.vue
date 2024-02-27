<template>
  <div class="modal fade" role="dialog">
    <div class="modal-dialog modal-small" :class="dynamicClass">
      <div class="modal-content" :class="contentClass">
        <slot name="modal-content">
          <div class="modal-header" style="align-items: center">
            <slot name="header" v-bind="{ hide }">
              <h5 class="modal-title">{{ headerText }}</h5>
              <button type="button" class="close" @click="hide">
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
            </slot>
          </div>
          <div class="modal-body" :class="bodyClass">
            <div class="form-group mb0 text-center">
              <label class="control-label text-center">{{ statusText }}</label>
            </div>
            <div
              class="btn-group text-center"
              style="overflow: hidden; display: block"
            >
              <transition name="slide-up">
                <button
                  v-if="showAdd"
                  class="btn btn-gray"
                  :disabled="addingToDam"
                  @click="addingToDam ? null : $emit('add')"
                >
                  {{ addingToDam ? 'Adding...' : 'Add to DAM' }}
                </button>
              </transition>
            </div>
          </div>
          <div v-if="modelFooter" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAdd: { type: Boolean, default: false },
    addingToDam: { type: Boolean, default: false },
    statusText: { type: String, default: '' },

    headerText: { type: String, default: '' },
    contentClass: { type: String, default: null },
    bodyClass: { type: String, default: null },
    layoutClass: { type: String, default: null },
    positiveButton: { type: String, default: 'Yes' },
    negativeButton: { type: String, default: 'No' },
    centered: { type: Boolean, default: true },
    hideButtons: { type: Boolean, default: false },
    modelFooter: { type: Boolean, default: false },
  },
  computed: {
    dynamicClass() {
      const obj = {}
      obj[this.layoutClass] = true
      obj['modal-dialog-centered'] = this.centered
      return obj
    },
  },
  watch: {
    model(model) {
      if (model) document.addEventListener('keyup', this.keyEvent)
      else document.removeEventListener('keyup', this.keyEvent)
    },
  },
  mounted() {
    const vue = this

    vue.$dialog = window
      .$(vue.$el)
      .off('hidden.bs.modal')
      .off('shown.bs.modal')
      .on('hidden.bs.modal', function () {
        vue.model = false
      })
      .on('shown.bs.modal', function () {
        vue.model = true
      })
  },
  destroyed() {
    if (this.model) document.removeEventListener('keyup', this.keyEvent)

    this.$dialog.modal('hide')
  },
  methods: {
    keyEvent(ev) {
      if (ev.key === 'Escape') this.model = false
    },
    toggleModel() {
      this.model = !this.model
    },
    triggerModel() {
      this.$dialog.modal(this.model ? 'show' : 'hide')
    },
    show() {
      this.$dialog.modal('show')
    },
    hide() {
      this.$dialog.modal('hide')
    },
  },
}
</script>

<template>
  <li>
    <div class="banner-box">
      <div
        v-tooltip="isActive ? 'Drag to rearrange' : ''"
        class="drag_banner"
        :class="{
          'drag-handler': isActive,
        }"
        :style="!isActive ? 'cursor: default' : ''"
        style="max-width: 10px; min-width: 10px"
      >
        <svg
          id="Layer_1"
          :style="!isActive ? 'visibility: hidden' : ''"
          class="menu-option-icon h-orange"
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
            <g id="Group_4348" transform="translate(588.166 653.684)">
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
      </div>
      <div class="banner-no">{{ banner.position + 1 }}</div>
      <div class="preview-container">
        <div class="preview-images">
          <img :src="banner.image" class="img-responsive" />
        </div>
      </div>
      <div class="tile-name">
        <label v-if="(banner.title || '').length">{{ banner.title }}</label>
        <span v-else> &mdash; </span>
      </div>
      <div class="tile-desc">
        <label
          v-if="(banner.description || '').length"
          data-toggle="modal"
          data-target="#banner-description-modal"
          >{{ banner.description }}</label
        >
        <span v-else> &mdash; </span>
      </div>
      <div class="head-url">
        <a
          v-if="(banner.url || '').length"
          :href="banner.url"
          target="_blank"
          >{{ banner.url }}</a
        >
        <span v-else> &mdash; </span>
      </div>

      <div class="turn-head">
        <label :for="`banner-${banner.id}`" class="label-switch">
          <input
            :id="`banner-${banner.id}`"
            v-model="isActive"
            type="checkbox"
            class="switch"
            name="detail-view"
            :checked="isActive"
          />
          <span class="lable"></span>
        </label>
      </div>
      <div class="action-head">
        <div class="d-flex align-items-center justify-content-start">
          <a class="edit-banner" @click="$emit('editBanner', banner)">
            <svg
              id="Layer_1"
              v-tooltip="`Edit Banner`"
              class="edit-icon h-orange"
              data-toggle="tooltip"
              title=""
              data-original-title="Edit Banner"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4350" transform="translate(-397.961 -147.331)">
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
          <a
            v-if="!isActive"
            data-toggle="modal"
            data-target="#delete-banner"
            @click="deleteBanner"
          >
            <svg
              id="Layer_1"
              v-tooltip="`Delete Banner`"
              class="delete-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 15.3 18"
              xml:space="preserve"
            >
              <g id="Group_4351" transform="translate(-443.472 -147.331)">
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
      </div>
    </div>
  </li>
</template>

<script>
import routeParams from '~/mixins/routeParams'

export default {
  mixins: [routeParams],
  props: { banner: { type: Object, required: true } },
  data() {
    return {
      isActive: this.banner.is_active,
    }
  },
  computed: {
    title() {
      return this.banner.title === null
    },
    description() {
      return this.banner.description === null
    },
    url() {
      return this.banner.url === null
    },
  },
  watch: {
    isActive() {
      this.updateBanner()
    },
  },
  methods: {
    deleteBanner() {
      this.$emit('removeMe', this.banner)
    },
    updateBanner() {
      this.$axios
        .post('digital-assets/instance/banner/update', {
          instance_id: this.banner.instance_id,
          workspace_id: this.routeWorkspaceId,
          id: this.banner.id,
          title: this.banner.title,
          is_active: ~~this.isActive,
          description: this.banner.description,
          url: this.banner.url,
          image_name: this.banner.image_name,
        })
        .then(({ data }) => {
          this.$toast.global.success(data.message)

          this.$emit('update:banner', {
            ...this.banner,
            title: this.banner.title,
            is_active: ~~this.isActive,
          })
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
  },
}
</script>

<style>
.banner-list-structure .tbody li .banner-box .switch-btn {
  padding-left: 2rem;
}
.switch-btn input:checked ~ .switch:before {
  right: -1px !important;
  left: 50% !important;
}
.switch-btn input ~ .switch:before {
  left: -1px !important;
  right: 50% !important;
}
</style>

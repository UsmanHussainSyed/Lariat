<template>
  <div class="asset-overview">
    <template v-if="data.loaded">
      <template v-for="overviewItem in overviewItems">
        <nuxt-link
          v-if="overviewItem.show"
          :key="overviewItem.name"
          :to="overviewItem.to"
        >
          <div
            v-if="overviewItem.src"
            class="icons"
            :class="[
              overviewItem.name.toLowerCase() == 'trash'
                ? 'trashed'
                : overviewItem.name.toLowerCase(),
            ]"
            v-html="overviewItem.src"
          ></div>

          <span class="asset-text">
            <strong>{{ Number(overviewItem.subText).toLocaleString() }}</strong>

            <span>{{ overviewItem.name }}</span>
          </span>
        </nuxt-link>
      </template>
    </template>
    <ContentLoader
      v-else-if="loading"
      :speed="1"
      :width="300"
      style="margin-right: -0.6rem"
      :height="400"
      :animate="true"
      class="normalLoader"
    >
      <rect x="0" y="0" rx="2" ry="2" width="140" height="90" />
      <rect x="150" y="0" rx="2" ry="2" width="140" height="90" />
      <rect x="0" y="100" rx="2" ry="2" width="140" height="90" />
      <rect x="150" y="100" rx="2" ry="2" width="140" height="90" />
      <rect x="0" y="200" rx="2" ry="2" width="140" height="90" />
      <rect x="150" y="200" rx="2" ry="2" width="140" height="90" />
    </ContentLoader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: { ContentLoader },
  props: {
    data: { type: Object, default: () => ({ loaded: false }) },
    loading: Boolean,
  },
  computed: {
    overviewItems() {
      const workspaceId = this.$getWorkspaceId()

      return [
        ...[
          {
            show: true,
            to: {
              name: 'workspace_id-dam',
              params: { workspace_id: workspaceId },
              hash: `#audio`,
            },
            src: '<svg class="audio-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 14.9" xml:space="preserve"><path id="High_Volume" class="fill-color" d="M9.7,14.9H8c-0.2,0-0.3-0.1-0.4-0.2l-3.3-3.3H1.7C0.8,11.4,0,10.7,0,9.7V5.1c0-0.9,0.8-1.7,1.7-1.7h2.6l3.3-3.3C7.7,0.1,7.8,0,8,0h1.7c0.3,0,0.6,0.3,0.6,0.6v13.7C10.3,14.6,10,14.9,9.7,14.9L9.7,14.9zM8.2,13.7h0.9V1.1H8.2L5,4.4C4.9,4.5,4.7,4.6,4.6,4.6H1.7c-0.3,0-0.6,0.3-0.6,0.6v4.6c0,0.3,0.3,0.6,0.6,0.6h2.9c0.2,0,0.3,0.1,0.4,0.2L8.2,13.7z M12.3,10.2c1-0.6,1.5-1.7,1.5-2.8c0.1-1.1-0.5-2.2-1.5-2.8c-0.3-0.1-0.6,0-0.8,0.2c-0.1,0.3,0,0.6,0.2,0.8c0.6,0.4,0.9,1.1,0.8,1.8c0.1,0.7-0.3,1.4-0.8,1.8c-0.3,0.1-0.4,0.5-0.3,0.8C11.6,10.2,12,10.4,12.3,10.2L12.3,10.2z M13.4,12.5c1.7-1.1,2.8-3,2.6-5.1c0.2-2-0.9-4-2.6-5.1c-0.3-0.1-0.6,0-0.8,0.3s0,0.6,0.3,0.8l0,0c1.4,0.9,2.1,2.4,2,4.1c0.1,1.6-0.6,3.2-2,4.1c-0.3,0.1-0.4,0.5-0.3,0.8C12.8,12.5,13.1,12.7,13.4,12.5L13.4,12.5z"/></svg>',
            name: 'Audios',
            subText: this.data.total_audios || 0,
          },
          {
            show: true,
            to: {
              name: 'workspace_id-dam',
              params: { workspace_id: workspaceId },
              hash: `#application`,
            },
            src: '<svg class="document-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12.2 16" xml:space="preserve"><g id="document" transform="translate(-61)"><path id="Path_40830" class="fill-color" d="M72.7,3.3l-3-2.9C69.3,0.2,68.9,0,68.5,0h-5.7C61.8,0,61,0.8,61,1.7v12.6c0,0.9,0.8,1.7,1.7,1.7h8.8c0.9,0,1.7-0.8,1.7-1.7V4.6C73.2,4.1,73,3.6,72.7,3.3z M71.7,3.8h-2.3c-0.1,0-0.2-0.1-0.2-0.2V1.4L71.7,3.8z M71.5,15.1h-8.8c-0.4,0-0.8-0.3-0.8-0.8V1.7c0-0.4,0.3-0.8,0.8-0.8h5.6v2.7c0,0.6,0.5,1.1,1.1,1.1h2.8v9.6C72.2,14.7,71.9,15.1,71.5,15.1L71.5,15.1z"/><path id="Path_40831" class="fill-color" d="M70.4,6.2h-6.9c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5h6.9c0.3,0,0.5-0.2,0.4-0.5C70.9,6.5,70.7,6.3,70.4,6.2L70.4,6.2z"/><path id="Path_40832" class="fill-color" d="M70.4,8.8h-6.9c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5h6.9c0.3,0,0.5-0.2,0.4-0.5C70.9,9,70.7,8.8,70.4,8.8L70.4,8.8z"/><path id="Path_40833" class="fill-color" d="M65.8,11.2h-2.3c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5h2.3c0.3,0,0.5-0.2,0.4-0.5C66.3,11.5,66.1,11.3,65.8,11.2L65.8,11.2z"/></g></svg>',
            name: 'Documents',
            subText: this.data.total_documents || 0,
          },
          {
            show: true,
            to: {
              name: 'workspace_id-dam',
              params: { workspace_id: workspaceId },
            },
            src: '<svg class="folder-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 12.4" xml:space="preserve"><path id="folder_5_" class="fill-color" d="M15.8,5.6C15.6,5.2,15.1,5,14.7,5h-1.2V2.8c0-0.5-0.5-1-1-1H6.7c0,0,0,0,0,0l-1-1.5C5.4,0.2,5.1,0,4.8,0H1C0.5,0,0,0.4,0,1v10.5c0,0.5,0.5,1,1,1h11.8c0.2,0,0.3-0.1,0.4-0.3l0,0l2.6-5.3C16.1,6.5,16,6,15.8,5.6zM1,0.9h3.8c0,0,0,0,0.1,0l1,1.5c0.2,0.2,0.5,0.4,0.8,0.4h5.8c0,0,0,0,0.1,0V5H4.1c-0.5,0-1,0.3-1.2,0.8L0.9,9.8L1,0.9C1,0.9,1,0.9,1,0.9z M15,6.4l-2.5,5H1.2l2.5-5.3C3.8,6,3.9,5.9,4.1,6h10.6c0.1,0,0.3,0.1,0.4,0.2C15.1,6.2,15.1,6.3,15,6.4L15,6.4z"/></svg>',
            name: 'Folders',
            subText:
              (this.data.total_folder || 0) +
              this.$store.state.dam.newFolderCount,
          },

          {
            show: true,
            to: {
              name: 'workspace_id-dam',
              params: { workspace_id: workspaceId },
              hash: `#image`,
            },
            src: '<svg class="images-icon white" version="1.1" id="image_6_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><g id="Group_4104"><g id="Group_4103"><path id="Path_40834" class="fill-color" d="M14,0H2C0.9,0,0,0.9,0,2V14c0,1.1,0.9,2,2,2H14c1.1,0,2-0.9,2-2V2C16,0.9,15.1,0,14,0zM15.1,14c0,0.6-0.5,1.1-1.1,1.1h0H2c-0.6,0-1.1-0.5-1.1-1.1l0,0v-1.7L4,9.6c0.1-0.1,0.3-0.1,0.4,0l1.9,1.6c0.2,0.2,0.5,0.1,0.6,0l4.6-4.6c0.1-0.1,0.3-0.1,0.4,0c0,0,0,0,0,0l3,3.7L15.1,14L15.1,14z M15.1,8.7L12.8,6c-0.4-0.5-1.2-0.6-1.8-0.2c0,0-0.1,0.1-0.1,0.1l-4.3,4.3L5,8.9c-0.5-0.4-1.1-0.4-1.6,0L0.9,11V2c0-0.6,0.5-1.1,1.1-1.1l0,0H14c0.6,0,1.1,0.5,1.1,1.1c0,0,0,0,0,0V8.7z"/></g></g><g id="Group_4106" transform="translate(2.764 1.969)"><g id="Group_4105"><path id="Path_40835" class="fill-color" d="M2.3,0C1,0,0,1,0,2.3c0,1.3,1,2.3,2.3,2.3c1.3,0,2.3-1,2.3-2.3C4.5,1,3.5,0,2.3,0z M2.3,3.6C1.5,3.6,0.9,3,0.9,2.3c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3C3.6,3,3,3.6,2.3,3.6C2.3,3.6,2.3,3.6,2.3,3.6L2.3,3.6z"/></g></g></svg>',
            name: 'Images',
            subText: this.data.total_images || 0,
          },
          {
            show: true,
            to: {
              name: 'workspace_id-dam',
              params: { workspace_id: workspaceId },
              hash: `#video`,
            },
            src: '<svg class="video-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve"><g id="play_2_" transform="translate(0)"><path id="Path_40836" class="fill-color" d="M13.7,2.3c-3.1-3.1-8.2-3.1-11.3,0s-3.1,8.2,0,11.3s8.2,3.1,11.3,0S16.8,5.5,13.7,2.3zM8,15.1c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1c0,0,0,0,0,0C15.1,11.9,11.9,15.1,8,15.1z"/><path id="Path_40837" class="fill-color" d="M11.7,7.6L6.1,3.6C5.9,3.4,5.6,3.5,5.4,3.7C5.4,3.7,5.3,3.8,5.3,3.9v8.1c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.2,0,0.3-0.1l5.6-4.1c0.2-0.2,0.3-0.4,0.1-0.7C11.8,7.7,11.8,7.7,11.7,7.6L11.7,7.6z M6.3,11.1V4.9L10.6,8L6.3,11.1z"/></g></svg>',
            name: 'Videos',
            subText: this.data.total_videos || 0,
          },
        ],
        {
          show: true,
          to: {
            name: 'workspace_id-dam',
            params: { workspace_id: workspaceId },
            hash: `#archive`,
          },
          src: '<svg class="archive-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 12.2" xml:space="preserve"><g id="cardboard-box" transform="translate(0 -60.25)"><path id="Path_40838" class="fill-color" d="M15.5,60.2H0.5c-0.3,0-0.5,0.2-0.5,0.5c0,0,0,0,0,0v2.8C0,63.8,0.2,64,0.5,64h0.5v8c0,0.3,0.2,0.5,0.5,0.5c0,0,0,0,0,0h13.2c0.3,0,0.5-0.2,0.5-0.5l0,0v-8h0.5c0.3,0,0.5-0.2,0.5-0.5v-2.8C16,60.5,15.8,60.2,15.5,60.2C15.5,60.2,15.5,60.2,15.5,60.2z M14.1,71.6H1.9V64h12.2V71.6z M15.1,63.1H0.9v-1.9h14.1L15.1,63.1z"/><path id="Path_40839" class="fill-color" d="M7.1,67.8h1.9c0.8,0,1.4-0.6,1.4-1.4S9.7,65,8.9,65H7.1c-0.8,0-1.4,0.6-1.4,1.4S6.3,67.8,7.1,67.8z M7.1,65.9h1.9c0.3,0,0.5,0.2,0.5,0.5c0,0.2-0.2,0.4-0.5,0.5H7.1c-0.3,0-0.5-0.2-0.5-0.5C6.6,66.1,6.8,65.9,7.1,65.9z"/></g></svg>',
          name: 'Archived',
          subText: this.data.total_archive || 0,
        },
        {
          show: this.data.total_trash,
          to: {
            name: 'workspace_id-dam-trash',
            params: { workspace_id: workspaceId },
          },
          src: '<svg class="delete-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13 16" xml:space="preserve"><g id="trash_1_" transform="translate(-48)"><path id="Path_40840" class="fill-color" d="M59.8,2H57V1.5C57,0.7,56.3,0,55.5,0h-2C52.7,0,52,0.7,52,1.5V2h-2.8C48.6,2,48,2.6,48,3.2V5c0,0.3,0.2,0.5,0.5,0.5h0.3l0.4,9.1c0,0.8,0.7,1.4,1.5,1.4h7.6c0.8,0,1.5-0.6,1.5-1.4l0.4-9.1h0.3C60.8,5.5,61,5.3,61,5V3.2C61,2.6,60.4,2,59.8,2z M53,1.5C53,1.2,53.2,1,53.5,1h2C55.8,1,56,1.2,56,1.5V2h-3V1.5z M49,3.2C49,3.1,49.1,3,49.2,3h10.5C59.9,3,60,3.1,60,3.2v1.2H49V3.2z M58.8,14.5c0,0.3-0.2,0.5-0.5,0.5h-7.6c-0.3,0-0.5-0.2-0.5-0.5l-0.4-9h9.5L58.8,14.5z"/><path id="Path_40841" class="fill-color" d="M54.5,14c0.3,0,0.5-0.2,0.5-0.5V7c0-0.3-0.2-0.5-0.5-0.5S54,6.7,54,7v6.5C54,13.8,54.2,14,54.5,14z"/><path id="Path_40842" class="fill-color" d="M57,14c0.3,0,0.5-0.2,0.5-0.5V7c0-0.3-0.2-0.5-0.5-0.5S56.5,6.7,56.5,7v6.5C56.5,13.8,56.7,14,57,14z"/><path id="Path_40843" class="fill-color" d="M52,14c0.3,0,0.5-0.2,0.5-0.5V7c0-0.3-0.2-0.5-0.5-0.5S51.5,6.7,51.5,7v6.5C51.5,13.8,51.7,14,52,14z"/></g></svg>',
          name: 'Trash',
          subText: this.data.total_trash || 0,
        },
        {
          show: this.data.total_uncategorized,
          to: {
            name: 'workspace_id-dam-uploaded',
            params: { workspace_id: this.$getWorkspaceId() },
          },
          src: '<svg class="uncategorized-icon white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 16 16" xml:space="preserve"><g id="category_2_" transform="translate(-0.25 -0.25)"><path id="Path_40844" class="fill-color" d="M5.7,7.1H1.7c-0.8,0-1.5-0.7-1.5-1.5V1.7c0-0.8,0.7-1.5,1.5-1.5h3.9c0.8,0,1.5,0.7,1.5,1.5v3.9C7.2,6.4,6.5,7.1,5.7,7.1z M1.7,1.4c-0.2,0-0.3,0.2-0.3,0.3v3.9C1.4,5.8,1.6,6,1.7,6h3.9C5.9,6,6,5.8,6,5.6V1.7c0-0.2-0.2-0.3-0.3-0.3L1.7,1.4z"/><path id="Path_40845" class="fill-color" d="M5.7,16.2H1.8c-0.8,0-1.5-0.7-1.5-1.5v-3.9c0-0.8,0.7-1.5,1.5-1.5h3.9c0.8,0,1.5,0.7,1.5,1.5v3.9C7.2,15.6,6.5,16.3,5.7,16.2L5.7,16.2z M1.8,10.5c-0.2,0-0.3,0.2-0.3,0.3v3.9c0,0.2,0.2,0.3,0.3,0.3h3.9c0.2,0,0.3-0.2,0.3-0.3v-3.9c0-0.2-0.2-0.3-0.3-0.3L1.8,10.5z"/><path id="Path_40846" class="fill-color" d="M14.8,16.2h-3.9c-0.8,0-1.5-0.7-1.5-1.5v-3.9c0-0.8,0.7-1.5,1.5-1.5h3.9c0.8,0,1.5,0.7,1.5,1.5v3.9C16.2,15.6,15.6,16.3,14.8,16.2L14.8,16.2z M10.8,10.5c-0.2,0-0.3,0.2-0.3,0.3v3.9c0,0.2,0.2,0.3,0.3,0.3h3.9c0.2,0,0.3-0.2,0.3-0.3v-3.9c0-0.2-0.2-0.3-0.3-0.3L10.8,10.5z"/><path id="Path_40847" class="fill-color" d="M12.8,7.1c-1.9,0-3.4-1.6-3.4-3.5c0-1.9,1.6-3.4,3.5-3.4c1.9,0,3.4,1.5,3.4,3.4C16.3,5.6,14.7,7.1,12.8,7.1C12.8,7.1,12.8,7.1,12.8,7.1z M12.8,1.4c-1.3,0-2.3,1-2.2,2.3c0,1.3,1,2.3,2.3,2.2c1.2,0,2.2-1,2.2-2.3C15.1,2.4,14.1,1.4,12.8,1.4C12.8,1.4,12.8,1.4,12.8,1.4z"/></g></svg>',
          name: 'Uncategorized',
          subText: this.data.total_uncategorized || 0,
        },
      ]
    },
  },
}
</script>

<style>
.asset-overview a.overview-item--small {
  padding: 0.5rem 12px;
}
.asset-overview a {
  margin-bottom: 0.75rem;
  max-width: calc(50% - 0.75rem / 2);
}
.asset-overview a.overview-item--small.full {
  flex: 0 0 100%;
  max-width: 100% !important;
}
</style>

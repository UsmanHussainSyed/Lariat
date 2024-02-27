<template>
  <header
    class="header bg-gray dam-header"
    :class="{ 'hide-separator': !hasInstance }"
  >
    <div class="header-left">
      <SearchBar v-if="hasInstance && $route.name !== 'profile'" />
    </div>
    <div class="header-right">
      <div v-if="hasInstance && $route.name !== 'profile'">
      <!-- <button
          id="dam-front-end-btn"
          class="btn btn-gray"
          @click="openDamFrontend()"
        >
          DAM Front-end
        </button>
        -->
      </div>
         <div
        v-if="hasInstance && $route.name !== 'profile'"
        class="dropdown mycollection">
        <!--
        <button type="button" class="dropdown-toggle" data-toggle="dropdown">
          <svg
            id="Layer_1"
            class="collection-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 14 14"
            xml:space="preserve"
          > 
            <desc>Created with Sketch.</desc>
            <g id="Phased-Approach">
              <g id="icon_boards">
                <rect
                  id="Rectangle-path"
                  class="fill-color"
                  width="11"
                  height="11"
                />
                <polygon
                  id="Shape"
                  class="fill-color"
                  points="14,14 3,14 3,11.9 12,11.9 12,3 14,3"
                />
              </g>
            </g>
          </svg>

          <span>Collection</span>
          <svg
            id="Layer_1"
            class="arrow-down-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4477" transform="translate(-871 -467)">
              <rect
                id="Rectangle_3015"
                x="871"
                y="467"
                class="fill-hide"
                width="18"
                height="18"
              />
              <g
                id="Icon_feather-chevron-down-3"
                transform="translate(506.256 149.451)"
              >
                <path
                  id="Path_3435"
                  class="fill-color"
                  d="M373.7,330.8c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l6.5,6.5l6.5-6.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-7,7C374.1,330.7,373.9,330.8,373.7,330.8z"
                />
              </g>
            </g>
          </svg>
        </button>
        -->
        <!-- Create First Collection -->
       <!--
        <div v-if="isCollection.length === 0" class="dropdown-menu">
          <p>Collections are the best place to save images and video clips.</p>
          <div class="rectangle"></div>
          <ul class="collection">
            <li>
              <nuxt-link
                class="dropdown-item"
                :to="{
                  query: { ...$route.query, createCollection: true },
                  hash: $route.hash,
                }"
                replace
              >
                Create Collection
              </nuxt-link>
            </li>
          </ul>
        </div>
        -->
        <!-- Create Collection -->
        <!--
        <div v-else class="dropdown-menu">
          <span>Recent Collection</span>
          <ul class="collection-folder">
            <li v-for="collection in isCollection" :key="collection.id">
              <nuxt-link
                class="dropdown-item"
                href="#"
                :to="{
                  name: 'workspace_id-dam-collection-id',
                  params: {
                    workspace_id: $getWorkspaceId(),
                    id: collection.id,
                  },
                }"
              >
                <span class="collection-title">{{ collection.name }}</span>
                <span class="label">{{ collection.assets_count }}</span>
              </nuxt-link>
            </li>
          </ul>
          <div class="rectangle"></div>
          <ul class="collection">
            <li>
              <nuxt-link
                :to="{
                  name: 'workspace_id-dam-collection',
                  params: { workspace_id: $getWorkspaceId() },
                }"
                class="dropdown-item"
                href="#"
              >
                View all Collection
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="dropdown-item"
                :to="{
                  query: { ...$route.query, createCollection: true },
                  hash: $route.hash,
                }"
                replace
              >
                Create Collection
              </nuxt-link>
            </li>
          </ul>
        </div>
        -->
         
      </div>
      <DamSystemNotification v-if="hasInstance && $route.name !== 'profile'" />
      <div v-if="hasInstance && $route.name !== 'profile'" class="dropdown">
        <button
          id="header-upload-btn"
          type="button"
          class="header-btn dropdown-toggle"
          data-toggle="dropdown"
        >
          <svg
            id="Layer_1"
            class="plus-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4454" transform="translate(-1005 -577.999)">
              <path
                id="Path_3394"
                class="fill-color"
                d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
              ></path>
              <path
                id="Path_3395"
                class="fill-color"
                d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
              ></path>
            </g>
          </svg>
        </button>
        <ul class="dropdown-menu">
          <li
            v-tooltip="
              storageFull ? 'You have consumed all of your storage quota.' : ''
            "
          >
            <nuxt-link
              :to="{
                name: 'workspace_id-dam-upload',
                params: { workspace_id: $getWorkspaceId() },
              }"
              class="dropdown-item"
              href="#"
              :style="storageFull ? 'pointer-events: none;opacity:0.4' : ''"
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Layer_1"
                  class="upload-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4436" transform="translate(-375.358 -797.334)">
                    <path
                      id="Path_3552"
                      class="fill-color"
                      d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                    />
                    <g id="Group_4435">
                      <path
                        id="Path_3553"
                        class="fill-color"
                        d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                      />
                      <path
                        id="Path_3554"
                        class="fill-color"
                        d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                      />
                    </g>
                  </g>
                </svg>
              </span>
              Upload
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="dropdown-item"
              :to="{
                query: { ...$route.query, createFolder: true },
                hash: $route.hash,
              }"
              replace
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Layer_1"
                  class="folder-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4469" transform="translate(-579 -801)">
                    <rect
                      id="Rectangle_3008"
                      x="579"
                      y="801"
                      class="fill-hide"
                      width="18"
                      height="18"
                    />
                    <path
                      id="Path_3452"
                      class="fill-color"
                      d="M581.3,818.2c-0.6,0-1.1-0.2-1.5-0.6c-0.5-0.5-0.8-1.1-0.8-1.8v-11.4c0-0.7,0.3-1.3,0.8-1.8c0.4-0.4,1-0.6,1.5-0.6h0.1h4.4l1.7,2.5l7.1,0c0.6,0,1.1,0.2,1.5,0.6c0.5,0.5,0.8,1.1,0.8,1.8v9c0,0.7-0.3,1.3-0.8,1.8c-0.4,0.4-1,0.6-1.5,0.6L581.3,818.2z M594.6,816.6l0,0.1L594.6,816.6c0.2,0,0.4-0.1,0.5-0.2c0.2-0.2,0.3-0.4,0.3-0.7v-8.9c0-0.2-0.1-0.5-0.3-0.6c-0.1-0.1-0.3-0.2-0.5-0.2h-7.8l-1.7-2.5l-3.7,0c-0.2,0-0.4,0.1-0.5,0.2c-0.2,0.2-0.3,0.4-0.3,0.7v11.3c0,0.2,0.1,0.5,0.3,0.6c0.1,0.1,0.3,0.2,0.5,0.2L594.6,816.6L594.6,816.6z"
                    />
                  </g>
                </svg>
              </span>
              Folder
            </nuxt-link>
          </li>
        </ul>
      </div>

      <ProfileDropDown id="header-profile-btn" />
    </div>
    <client-only>
      <portal-target
        v-if="hasInstance && $route.name !== 'profile'"
        name="dam-header-bottom"
      ></portal-target>
    </client-only>
  </header>
</template>

<script>
import DamSystemNotification from '~/components/theme/global/DamSystemNotification'
import ProfileDropDown from '~/components/theme/global/ProfileDropDown'
import SearchBar from '~/components/dam/SearchBar'

export default {
  name: 'DamHeader',
  components: { SearchBar, ProfileDropDown, DamSystemNotification },
  data() {
    return {
      collections: [],
    }
  },
  computed: {
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    hasInstance() {
      const { dam } = this.$store.state
      return !dam.fetchingInstances && dam.damInstance?.id
    },
    isCollection() {
      const _collections =
        this.collections || this.$store.state.dam.collectionList
      return _collections.slice(0, 5)
    },
  },
  created() {
    if (
      ![
        'workspace_id-add-dam-instance',
        'workspace_id-create-dam-instance',
      ].includes(this.$route.name)
    )
      this.$store.dispatch('dam/getCollections')
    const workspace = {
      id: this.$getWorkspaceId(),
    }
    this.$store.dispatch('dam/getInstances', workspace.id)
  },
  mounted() {
    if (
      ![
        'workspace_id-add-dam-instance',
        'workspace_id-create-dam-instance',
      ].includes(this.$route.name)
    ) {
      this.$axios
        .$get('digital-assets/collection/get-top-collection', {
          params: {
            workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((r) => {
          this.collections = r.data
        })
        .catch(() => {})
    }
  },
  methods: {
    openDamFrontend() {
      if (this.$store.state.dam.damInstance?.is_domain === 1) {
        window.open(
          'http://' +
            `${this.$store.state.dam.damInstance?.brandUrl}/${this.$store.state.dam.damInstance?.urlSlug}/${this.$store.state.dam.damInstance?.loginUrl}`,
          '_blank'
        )
      } else if (this.$store.state.dam.damInstance?.is_domain === 0) {
        window.open(
          `${this.$config.damBaseUrl}/${this.$store.state.dam.damInstance?.brandUrl}/${this.$store.state.dam.damInstance?.loginUrl}`,
          '_blank'
        )
      }
    },
  },
}
</script>

<style>
.header.hide-separator .user-dropdown:before {
  content: unset;
}
</style>

<template>
  <div class="body-content dam-container">
    <div v-if="breadcrumbs" class="common-box-header category-header">
      <div class="category-header-right">
        <nuxt-link
          class="home-icon breadcrumb-links"
          :to="{
            name: 'workspace_id-dam',
            params: { workspace_id: $getWorkspaceId() },
          }"
        >
          <svg
            id="Layer_1"
            class="home-icon orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 16.2 18"
            xml:space="preserve"
          >
            <g id="Group_4409" transform="translate(-871.194 -659.595)">
              <g id="Path_3470">
                <path
                  id="Path_3514"
                  class="fill-color"
                  d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                />
              </g>
              <g id="Path_3471">
                <path
                  id="Path_3515"
                  class="fill-color"
                  d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                />
              </g>
            </g>
          </svg>
        </nuxt-link>
        <div class="breadcrumb-links">
          <ul>
            <li></li>
            <li v-for="(crumb, i) in breadcrumbs" :key="i">
              <component
                :is="crumb.url ? 'nuxt-link' : 'span'"
                v-tooltip="{
                  html: false,
                  content: crumb.og || crumb.name,
                }"
                :to="crumb.url"
              >
                {{ crumb.name }}
              </component>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="body-content-auto w-100 h-100">
      <div class="common-box p0">
        <div class="dam-detail h-100">
          <div class="inner-detail-left h-100">
            <div class="detail-top d-flex align-items-center">
              <div
                class="detail-top-left w-75 d-flex align-items-center"
                :class="{ 'active-rename': renameActive }"
              >
                <div class="rename-text">
                  <h2
                    class="title"
                    :class="{ hover: titleHover }"
                    @mouseover="titleHover = true"
                    @mouseout="titleHover = false"
                  >
                    {{ file.display_file_name | shrinkString(60, 15) }}
                  </h2>
                </div>
                <div class="rename-input w-100">
                  <input
                    ref="renameInput"
                    v-model="fileNameModel"
                    type="text"
                    name="name"
                    class="form-control"
                    :disabled="!!renaming"
                    @keyup.enter="changeFileName()"
                    @keyup.esc="changeFileName(1)"
                    @blur="changeFileName()"
                  />
                </div>
                <div class="ml-2 dropdown more-options">
                  <button
                    type="button"
                    data-toggle="dropdown"
                    class="dropdown-toggle"
                  >
                    <svg
                      id="Capa_1"
                      class="more-options-icon h-orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <g>
                            <path
                              class="fill-color"
                              d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0zM256,480C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"
                            ></path>
                            <circle
                              class="fill-color"
                              cx="256"
                              cy="256"
                              r="32"
                            ></circle>
                            <circle
                              class="fill-color"
                              cx="368"
                              cy="256"
                              r="32"
                            ></circle>
                            <circle
                              class="fill-color"
                              cx="144"
                              cy="256"
                              r="32"
                            ></circle>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      v-if="!file.is_archive"
                      :disabled="allButtonDisabled"
                      :class="{ 'btn-disable': allButtonDisabled }"
                    >
                      <a
                        class="dropdown-item"
                        :class="{ 'btn-disable': allButtonDisabled }"
                        :disabled="allButtonDisabled"
                        @click="$refs.moveDialog.show()"
                      >
                        <span class="dropdown-item-icon">
                          <svg
                            id="Layer_1"
                            class="move-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4355"
                              transform="translate(-741.322 -145.174)"
                            >
                              <path
                                id="Path_3418"
                                class="fill-color"
                                d="M744.6,157.4c-0.2,0-0.4-0.1-0.6-0.2l-2.5-2.5c-0.3-0.3-0.3-0.8,0-1.1l2.5-2.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-1.9,1.9l1.9,1.9c0.3,0.3,0.3,0.8,0,1.1C745,157.3,744.8,157.4,744.6,157.4z"
                              ></path>
                              <path
                                id="Path_3419"
                                class="fill-color"
                                d="M747.9,149.2c-0.2,0-0.4-0.1-0.6-0.2c-0.3-0.3-0.3-0.8,0-1.1l2.5-2.5c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l2.5,2.5c0.3,0.3,0.3,0.8,0,1.1c-0.3,0.3-0.8,0.3-1.1,0l-1.9-1.9l-1.9,1.9C748.3,149.1,748.1,149.2,747.9,149.2z"
                              ></path>
                              <path
                                id="Path_3420"
                                class="fill-color"
                                d="M750.3,163.2c-0.2,0-0.4-0.1-0.6-0.2l-2.5-2.5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l1.9,1.9l1.9-1.9c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-2.5,2.5C750.7,163.1,750.5,163.2,750.3,163.2z"
                              ></path>
                              <path
                                id="Path_3421"
                                class="fill-color"
                                d="M756.1,157.4c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l1.9-1.9l-1.9-1.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l2.5,2.5c0.3,0.3,0.3,0.8,0,1.1l-2.5,2.5C756.5,157.3,756.3,157.4,756.1,157.4z"
                              ></path>
                              <path
                                id="Path_3422"
                                class="fill-color"
                                d="M742.1,155c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8h16.4c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8H742.1z"
                              ></path>
                              <path
                                id="Path_3423"
                                class="fill-color"
                                d="M750.3,163.2c-0.4,0-0.8-0.4-0.8-0.8V146c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v16.4C751.1,162.8,750.8,163.2,750.3,163.2z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Move
                      </a>
                    </li>
                    <li
                      v-if="!file.is_archive"
                      v-tooltip="
                        storageFull
                          ? 'You have consumed all your storage quota.'
                          : ''
                      "
                      :disabled="allButtonDisabled"
                      :class="{ 'btn-disable': allButtonDisabled }"
                      :style="
                        storageFull || allButtonDisabled
                          ? 'cursor:default;opacity:0.4'
                          : ''
                      "
                    >
                      <a
                        class="dropdown-item"
                        :disabled="storageFull || allButtonDisabled"
                        :class="{
                          'btn-disable': storageFull || allButtonDisabled,
                        }"
                        @click="storageFull ? null : $refs.copyDialog.show()"
                      >
                        <span class="dropdown-item-icon">
                          <svg
                            id="Layer_1"
                            class="copy-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3778"
                              class="fill-color"
                              d="M15.9,18H6.3c-1.2,0-2.1-0.9-2.1-2.1V6.3c0-1.2,0.9-2.1,2.1-2.1h9.6c1.2,0,2.1,0.9,2.1,2.1v9.6C18,17.1,17.1,18,15.9,18z M6.3,5.6c-0.4,0-0.7,0.3-0.7,0.7l0,0v9.6c0,0.4,0.3,0.7,0.7,0.7h0h9.6c0.4,0,0.7-0.3,0.7-0.7l0,0V6.3c0-0.4-0.3-0.7-0.7-0.7h0H6.3z M2.8,12.4H2.1c-0.4,0-0.7-0.3-0.7-0.7l0,0V2.1c0-0.4,0.3-0.7,0.7-0.7h0h9.6c0.4,0,0.7,0.3,0.7,0.7l0,0v0.7h1.4V2.1c0-1.2-0.9-2.1-2.1-2.1H2.1C0.9,0,0,0.9,0,2.1v9.6c0,1.2,0.9,2.1,2.1,2.1h0.7L2.8,12.4z"
                            ></path>
                          </svg>
                        </span>
                        Copy
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        :class="{
                          'btn-disable': allButtonDisabled || ui.deleting,
                        }"
                        :disabled="allButtonDisabled || ui.deleting"
                        @click="$refs.deleteDialog.show()"
                      >
                        <span class="dropdown-item-icon">
                          <svg
                            id="Layer_1"
                            class="delete-icon"
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
                        </span>
                        Delete
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item rename-link"
                        @click="renameActive = 1"
                      >
                        <span class="dropdown-item-icon">
                          <svg
                            id="Layer_1"
                            class="rename-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_5357"
                              transform="translate(-653.672 -933.511)"
                            >
                              <g id="Group_5358">
                                <path
                                  id="Path_3777"
                                  class="fill-color"
                                  d="M670.9,951.5h-16.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h16.5c0.4,0,0.7,0.3,0.7,0.7C671.7,951.2,671.3,951.5,670.9,951.5L670.9,951.5z"
                                ></path>
                              </g>
                              <g id="Group_4350">
                                <path
                                  id="Path_3409"
                                  class="fill-color"
                                  d="M657.8,948.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l9.3-9.3c1-1,2.6-1,3.6,0s1,2.6,0,3.6l-9.3,9.3c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C657.9,948.1,657.9,948.1,657.8,948.1zM669.2,935.1c-0.3,0-0.5,0.1-0.7,0.3l-9.2,9.2l-0.4,1.8l1.8-0.4l9.1-9.1c0.4-0.4,0.4-1,0-1.3C669.7,935.2,669.4,935.1,669.2,935.1L669.2,935.1z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </span>
                        Rename
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        :disabled="allButtonDisabled || ui.archiving"
                        :class="{
                          'btn-disable': allButtonDisabled || ui.archiving,
                        }"
                        @click="archiveFile"
                      >
                        <span class="dropdown-item-icon">
                          <svg
                            v-if="file.is_archive"
                            id="Layer_1"
                            class="archive-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g id="Group_4472" transform="translate(-871 -133)">
                              <rect
                                id="Rectangle_3011"
                                x="871"
                                y="133"
                                class="fill-hide"
                                width="18"
                                height="18"
                              ></rect>
                              <g
                                id="Group_4364"
                                transform="translate(177.341 -155.069)"
                              >
                                <path
                                  id="Path_3441"
                                  class="fill-color"
                                  d="M709.3,304.5H696c-0.4,0-0.7-0.4-0.7-0.8v-9.5c0-0.4,0.3-0.8,0.7-0.8c0.4,0,0.8,0.3,0.8,0.7c0,0,0,0.1,0,0.1v8.8h11.9v-8.8c0-0.4,0.3-0.8,0.7-0.8c0.4,0,0.8,0.3,0.8,0.7c0,0,0,0.1,0,0.1v9.5C710.1,304.2,709.8,304.5,709.3,304.5C709.3,304.5,709.3,304.5,709.3,304.5z"
                                ></path>
                                <path
                                  id="Path_3442"
                                  class="fill-color"
                                  d="M710.9,294.9h-16.5c-0.4,0-0.7-0.3-0.7-0.7c0,0,0,0,0,0v-3.9c0-0.4,0.3-0.7,0.7-0.8c0,0,0,0,0,0h16.5c0.4,0,0.7,0.3,0.7,0.7c0,0,0,0,0,0v3.9C711.7,294.6,711.3,294.9,710.9,294.9C710.9,294.9,710.9,294.9,710.9,294.9z M695.1,293.4h15.1V291h-15.1L695.1,293.4z"
                                ></path>
                                <path
                                  id="Path_3443"
                                  class="fill-color"
                                  d="M704.3,298H701c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h3.3c0.4,0,0.8,0.3,0.8,0.8S704.7,298,704.3,298z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                          <svg
                            v-else
                            id="Layer_1"
                            class="unarchive-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 21"
                            xml:space="preserve"
                          >
                            <path
                              class="fill-color"
                              d="M15.3,9.6v10.1H2.2V9.6"
                            />
                            <path class="fill-color" d="M7.3,12.7h2.9" />
                            <path
                              class="fill-color"
                              d="M1,3.5l14-2.4l0.7,3.8l-14,2.4L1,3.5z"
                            />
                          </svg>
                        </span>
                        {{ file.is_archive ? 'Unarchive' : 'Archive' }}
                      </a>
                    </li>
                    <li
                      v-tooltip="
                        assetEmbeddingAllowed
                          ? ''
                          : 'Please upgrade your subscription plan to enable this feature.'
                      "
                    >
                      <a
                        class="dropdown-item"
                        :class="{ disabled: !assetEmbeddingAllowed }"
                        :style="
                          assetEmbeddingAllowed
                            ? ''
                            : 'pointer-events:none;opacity:0.4'
                        "
                        :disabled="!assetEmbeddingAllowed"
                        @click="getEmbedLink"
                      >
                        <span
                          class="dropdown-item-icon"
                          data-toggle="modal"
                          data-target="#embedPopup"
                        >
                          <svg
                            id="Layer_1"
                            class="embed-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 9.8"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4360"
                              transform="translate(-199.745 -321.662)"
                            >
                              <path
                                id="Path_3430"
                                class="fill-color"
                                d="M204,330.9c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.5c-0.3-0.3-0.3-0.8,0-1.1l3.5-3.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-2.9,3l2.9,3c0.3,0.3,0.3,0.8,0,1.1C204.5,330.8,204.3,330.9,204,330.9L204,330.9z"
                              ></path>
                              <path
                                id="Path_3431"
                                class="fill-color"
                                d="M213.4,330.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.2,0.1-0.4,0.2-0.5l2.9-3l-2.9-3c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0c0,0,0,0,0,0l3.5,3.5c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.5,3.5C213.8,330.8,213.7,330.9,213.4,330.9z"
                              ></path>
                              <path
                                id="Path_3432"
                                class="fill-color"
                                d="M207,331.4c-0.4,0-0.8-0.3-0.8-0.8c0-0.1,0-0.2,0.1-0.3l3.4-8.2c0.2-0.4,0.6-0.6,1-0.4c0.4,0.2,0.6,0.6,0.4,1l0,0l-3.4,8.2C207.6,331.3,207.4,331.4,207,331.4z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Embed
                      </a>
                    </li>
                    <li
                      v-if="
                        iFrameFileTypes.includes(
                          (__file_ext || '').toLowerCase()
                        )
                      "
                    >
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#delete"
                        @click="$refs.assetIFrame.show(file)"
                        ><span class="dropdown-item-icon">
                          <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              class="fill-color"
                              fill-rule="evenodd"
                              d="M13,20 L20,20 L20,4 L4,4 L4,11 L11,11 C12.1045695,11 13,11.8954305 13,13 L13,20 Z M11,20 L11,13 L4,13 L4,20 L11,20 Z M4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 Z"
                            /></svg></span
                        >Generate Iframe</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="table-filter w-25">
                <ul>
                  <li>
                    <AddToCollectionButton
                      :file="file"
                      @saveCollection="$refs.saveCollectionDialog.show()"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div class="common-box customscrollbar bg-gray p20">
              <div
                v-if="reloadFrame"
                class="asset-detail-img d-flex"
                :style="{
                  'flex-direction':
                    previewIcon ||
                    (isImage &&
                      ui.tab !== 'edit' &&
                      !(
                        file.compress_file ||
                        file.thumbnail_file ||
                        __image_thumb
                      ))
                      ? 'column'
                      : 'row',
                }"
              >
                <template v-if="isPdf">
                  <img
                    v-if="previewLoaded"
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewFile"
                    :alt="file.display_file_name"
                  />
                  <iframe
                    v-else
                    type="application/pdf"
                    :src="__url + '#toolbar=0?transparent=0'"
                    width="100%"
                    height="100%"
                    @load="checkPreview"
                  ></iframe>
                </template>
                <template v-else-if="isHtml">
                  <img
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewImage"
                    :alt="file.display_file_name"
                    @error="imageErrorHandle"
                  />
                </template>
                <template v-else-if="isTxt">
                  <img
                    v-if="previewLoaded"
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewFile"
                    :alt="file.display_file_name"
                  />
                  <iframe
                    v-else
                    type="application/txt"
                    :src="__url"
                    width="100%"
                    height="100%"
                    @load="checkPreview"
                  ></iframe>
                </template>
                <template v-else-if="isDoc">
                  <img
                    v-if="previewLoaded"
                    ref="docFile"
                    class="img-fluid"
                    style="object-fit: contain"
                    :src="previewFile"
                    :alt="file.display_file_name"
                  />
                  <iframe
                    v-else
                    :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                      __url
                    )}`"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    @load="checkPreview"
                  >
                    This is an embedded
                    <a target="_blank" href="http://office.com">
                      Microsoft Office
                    </a>
                    document, powered by
                    <a target="_blank" href="http://office.com/webapps">
                      Office Online </a
                    >.
                  </iframe>
                </template>
                <client-only v-else-if="isVideo">
                  <!-- :poster="videoThumbnail" -->
                  <video
                    ref="video"
                    controlsList="nodownload"
                    type="video/mp4"
                    controls
                    crossOrigin="anonymous"
                    disablepictureinpicture
                    @error="ui.videoError = true"
                    @emptied="ui.videoError = true"
                  >
                    <source :src="__url" type="video/mp4" />
                    <object>
                      <img
                        ref="videoFile"
                        :alt="file.display_file_name"
                        :src="previewImage"
                        width="640"
                        height="360"
                        title="No video playback capabilities, please download the video below"
                        @error="imageErrorHandle"
                      />
                    </object>
                    Your browser does not support the video tag.
                  </video>
                </client-only>
                <div v-else-if="isAudio" style="margin: auto">
                  <client-only>
                    <av-waveform
                      ref="audio"
                      :audio-src="__url"
                      :canv-width="1200"
                      :canv-height="200"
                      :playtime-font-size="18"
                      :played-line-width="2"
                      :playtime-clickable="false"
                      :noplayed-line-width="1"
                      :canv-top="true"
                      played-line-color="#ed703d"
                      noplayed-line-color="#1a1d2556"
                    ></av-waveform>
                  </client-only>
                </div>
                <template v-else-if="$isImage(file.file_type)">
                  <image-editor
                    v-if="ui.tab === 'edit' && !cropperError"
                    ref="editor"
                    :mime-type="file.file_meta_data.MimeType"
                    :src="file.display_file"
                    @cropper-ready="cropperLoaded = $event"
                    @image-error="cropperError = $event"
                  />
                  <img
                    v-else
                    ref="sourceImage"
                    class="img-fluid"
                    :style="{
                      objectFit: 'contain',
                      maxHeight:
                        previewIcon ||
                        !(
                          file.compress_file ||
                          file.thumbnail_file ||
                          __image_thumb
                        )
                          ? '128px'
                          : '',
                    }"
                    :src="
                      file.watermark_file ||
                      file.compress_file ||
                      file.thumbnail_file ||
                      __image_thumb ||
                      __thumb
                    "
                    :alt="file.display_file_name"
                    crossorigin="anonymous"
                    @error="imageErrorHandle"
                  />
                </template>
                <div
                  v-else
                  :class="
                    hasZipCompressedImage
                      ? 'd-flex align-items-center justify-content-center h-100'
                      : 'm-auto'
                  "
                  style="text-align: center"
                >
                  <img
                    class="img-fluid"
                    style="object-fit: contain"
                    :style="{ maxHeight: file.thumbnail_file ? '' : '128px' }"
                    :src="
                      file.compress_file ||
                      file.thumbnail_file ||
                      __image_thumb ||
                      __thumb
                    "
                    :alt="file.display_file_name"
                    @error="imageErrorHandle"
                  />
                  <p v-if="!file.thumbnail_file" class="mt-3">
                    {{
                      ui.videoError
                        ? 'We cannot play this video, yet...'
                        : 'No preview available for this file.'
                    }}
                  </p>
                </div>
                <p
                  v-if="
                    previewIcon ||
                    (isImage &&
                      ui.tab !== 'edit' &&
                      !(
                        file.compress_file ||
                        file.thumbnail_file ||
                        __image_thumb
                      ))
                  "
                  class="mt-3"
                >
                  {{ 'No preview available for this file.' }}
                </p>
              </div>
              <div
                v-else
                class="asset-detail-img"
                :style="{
                  display: 'flex',
                  'flex-direction': 'column',
                  flex: '1',
                  overflow: 'hidden',
                }"
              ></div>
            </div>
          </div>
          <div class="inner-detail-right h-100">
            <div class="common-box detail-tabs p-0 h-100">
              <div class="tabs-view h-100">
                <ul class="nav nav-left" role="tablist">
                  <li class="nav-item" @click="ui.tab = 'overview'">
                    <a
                      class="nav-link"
                      :class="{ active: ui.tab == 'overview' }"
                    >
                      Overview
                    </a>
                  </li>
                  <li class="nav-item" @click="ui.tab = 'versionHistory'">
                    <a
                      class="nav-link"
                      :class="{ active: ui.tab == 'versionHistory' }"
                      >Version History</a
                    >
                  </li>
                  <li class="nav-item tab-click" @click="loadExifData()">
                    <a
                      class="nav-link"
                      :class="{ active: ui.tab == 'metadata' }"
                      @click="ui.tab = 'metadata'"
                    >
                      Metadata
                    </a>
                  </li>
                  <li class="nav-item" @click="ui.tab = 'tags'">
                    <a class="nav-link" :class="{ active: ui.tab == 'tags' }">
                      Tags
                    </a>
                  </li>
                  <li
                    v-if="
                      $isImage(file.file_type) &&
                      canEditinBrowser(file.file_type)
                    "
                    class="nav-item"
                    @click="ui.tab = 'edit'"
                  >
                    <a class="nav-link" :class="{ active: ui.tab == 'edit' }">
                      Edit
                    </a>
                  </li>
                  <li
                    class="nav-item tab-click"
                    @click="ui.tab = 'manageProduct'"
                  >
                    <a
                      class="nav-link"
                      :class="{ active: ui.tab == 'manageProduct' }"
                      >Manage Product</a
                    >
                  </li>
                  <li
                    class="nav-item tab-click"
                    @click=";(ui.tab = 'analytics'), getAnalyticsGraphData()"
                  >
                    <a
                      class="nav-link"
                      :class="{ active: ui.tab == 'analytics' }"
                    >
                      <svg
                        id="Layer_1"
                        class="analytics-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Storage_Analytics">
                          <g id="chart" transform="translate(-2.024 -1.999)">
                            <path
                              id="path3587"
                              class="fill-color"
                              d="M11,2c-5,0-9,4-9,9s4,9,9,9c5,0,9-4,9-9v0c0-0.3-0.3-0.6-0.6-0.6l0,0h-7.8V2.6C11.6,2.3,11.4,2,11,2C11,2,11,2,11,2z M10.4,3.3V11c0,0.3,0.3,0.6,0.6,0.6h0h7.7c-0.3,4.3-4,7.5-8.3,7.2s-7.5-4-7.2-8.3C3.5,6.7,6.6,3.6,10.4,3.3L10.4,3.3z"
                            ></path>
                            <path
                              id="path3583"
                              class="fill-color"
                              d="M13.1,2.3L13.1,2.3c-0.3,0-0.6,0.3-0.6,0.6v6c0,0.3,0.3,0.6,0.6,0.6h6c0.3,0,0.6-0.3,0.6-0.6c0-0.1,0-0.1,0-0.2c-0.8-3.2-3.3-5.6-6.5-6.5C13.2,2.3,13.2,2.3,13.1,2.3z M13.7,3.9c2,0.8,3.6,2.4,4.4,4.4h-4.4L13.7,3.9z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      Analytics
                    </a>
                  </li>
                </ul>
                <div v-if="ui.loading" class="col-lg-12 col-xl-12 h-100 w-100">
                  <div class="overlay">
                    <div class="loader"></div>
                  </div>
                </div>
                <div v-else class="tabbing-inner">
                  <div class="h-100">
                    <div
                      class="tab-content customscrollbar"
                      :class="{
                        'version-height': uploadHeight,
                        'after-upload': afterUpload,
                      }"
                    >
                      <div
                        id="overview"
                        class="tab-pane"
                        :class="{ active: ui.tab == 'overview' }"
                      >
                        <!-- <h3>{{ file.display_file_name }}</h3> -->
                        <p v-if="file.description">
                          {{ file.description }}
                        </p>

                        <ul class="overview-table">
                          <li>
                            <span>ID</span><span>: {{ file.id }}</span>
                          </li>
                          <template v-if="metaData">
                            <li
                              v-for="(value, key) in filterMetaData(metaData)"
                              :key="key"
                            >
                              <span>{{ $camelCaseToNormalCase(key) }}</span>
                              <span
                                :inner-html.prop="
                                  ':' + ' ' + $getFormattedMetaValue(value, key)
                                "
                              >
                              </span>
                            </li>
                          </template>
                          <li class="align-items-start">
                            <span>Parent Folder</span>
                            <span
                              >:
                              <div class="breadcrumb-links">
                                <template v-for="(crumb, i) in breadcrumbs">
                                  <component
                                    :is="crumb.url ? 'nuxt-link' : 'span'"
                                    :key="i"
                                    :to="crumb.url"
                                  >
                                    {{ crumb.name }}
                                  </component>
                                </template>
                              </div>
                            </span>
                          </li>
                          <li>
                            <span
                              >Permission
                              <i
                                v-tooltip="{
                                  html: true,
                                  content: `<ul>
                                    <li>
                                      <strong>PUBLIC:</strong> This image can be used per the brand’s licensing guidelines and shared publicly as needed.
                                    </li>
                                    <li>
                                        <strong>PRIVATE:</strong> This image is for internal use only and may require credit per the brand’s licensing guidelines and may not be shared without specific permissions.
                                    </li>
                                        </ul>`,
                                }"
                                class="fa fa-info-circle"
                                aria-hidden="true"
                              ></i
                            ></span>
                            <span class="align-items-center">
                              <label
                                v-tooltip="
                                  privacyCustomizationAllowed
                                    ? ''
                                    : 'Please upgrade your subscription plan to enable this feature.'
                                "
                                class="label-switch justify-content-end mr-2"
                                data-toggle="modal"
                                data-target="#permission"
                                :style="
                                  privacyCustomizationAllowed
                                    ? ''
                                    : 'opacity: 0.4'
                                "
                              >
                                <span>: Public</span>
                                <input
                                  v-if="privacyCustomizationAllowed"
                                  v-model="file.is_public"
                                  type="checkbox"
                                  class="switch-onoff switch"
                                  name="detail-view"
                                  @change="checkAssetPermission('permission')"
                                />
                                <input
                                  v-else
                                  type="checkbox"
                                  class="switch-onoff switch"
                                  name="detail-view"
                                  checked
                                  disabled
                                />
                                <span class="lable"></span>
                              </label>
                              <i
                                v-if="isAssetPrivacyUpdating"
                                v-tooltip="
                                  'Watermark will auto updated for this asset within few moments.'
                                "
                                class="fa fa-circle-o-notch fa-spin"
                              ></i>
                            </span>
                          </li>
                          <li>
                            <span
                              >Licensing
                              <i
                                v-tooltip="
                                  'This image cannot be used for commercial advertising purposes.'
                                "
                                class="fa fa-info-circle"
                                aria-hidden="true"
                              ></i
                            ></span>
                            <span>
                              <label class="label-switch justify-content-end">
                                <span>: Editorial Use Only</span>
                                <input
                                  v-model="file.is_editorial_use"
                                  type="checkbox"
                                  class="switch-onoff switch"
                                  name="editorial"
                                  @change="checkAssetPermission('editorial')"
                                />
                                <span class="lable"></span>
                              </label>
                            </span>
                          </li>
                          <li
                            v-if="accessControlList && accessControlList.length"
                            class="align-items-start"
                          >
                            <span>ACL Permission</span>
                            <span
                              >:
                              <div class="access-control">
                                <label
                                  v-for="access in accessControlList"
                                  :key="access.id"
                                  class="label-switch justify-content-end"
                                >
                                  <span>{{ access.name }}</span>
                                  <input
                                    v-model="access.is_active"
                                    type="checkbox"
                                    class="switch-onoff switch"
                                    @change="changeStatus(access)"
                                  />
                                  <span class="lable"></span>
                                </label>
                              </div>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div
                        id="version-history"
                        class="tab-pane w-100 h-100 position-relative"
                        :class="{ active: ui.tab == 'versionHistory' }">
                        <div v-if="!assetVersionAllowed" class="common-overaly">
                          <div class="common-modal">
                            <div class="common-modal-header">
                              <h5>Upgrade Plan</h5>
                            </div>
                            <div class="common-modal-body text-center">
                              <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
                            </div>
                          </div>
                        </div>
                        <ul
                          class="version-history position-relative"
                          :class="{
                            'w-100 h-100 common-blur': !assetVersionAllowed,
                          }"
                        >
                          <Versions
                            v-for="assetVersionData in versionHistory"
                            :key="assetVersionData.id"
                            :asset-data="assetVersionData"
                            :file-version-id="file.assets_version_id"
                            :file-version="file.version"
                            :version-list="versionHistory.length"
                            :on-hold="completed"
                            @makeCurrent="changeVersion"
                            @VersionDeleted="reloadAssetData"
                            @assetDelete="deleteFile"
                            @holdService="holdService"
                            @closeVersionUpload="closeVersionUpload"
                          >
                          </Versions>
                        </ul>
                      </div>

                      <div v-if="ui.tab == 'metadata'">
                        <template v-if="ui.exifLoading">
                          Please wait! Fetching the metadata from the image.
                          <div class="overlay">
                            <div class="loader"></div>
                          </div>
                        </template>
                        <div
                          v-else
                          id="metadata"
                          class="tab-pane"
                          :class="{ active: ui.tab == 'metadata' }"
                        >
                          <ul class="overview-table">
                            <li
                              v-for="(value, index) in filterExifData(exif)"
                              :key="index"
                            >
                              <span>{{ $camelCaseToNormalCase(index) }}</span
                              ><span
                                :inner-html.prop="
                                  ':' +
                                  ' ' +
                                  $getFormattedMetaValue(value, index)
                                "
                              ></span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <!-- tags-->
                      <div
                        id="file-tag-panel"
                        class="tab-pane position-relative"
                        :class="{ active: ui.tab == 'tags' }"
                      >
                        <client-only>
                          <div
                            v-if="!tagManagementAllowed"
                            class="common-overaly has-relative"
                          >
                            <div class="common-modal">
                              <div class="common-modal-header">
                                <h5>Upgrade Plan</h5>
                              </div>
                              <div class="common-modal-body text-center">
                                <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
                                
                              </div>
                            </div>
                          </div>
                          <span v-if="ui.loading">Loading...</span>
                          <FileTagInput
                            v-else
                            v-model="tags"
                            :file-ids="[
                              {
                                id: file.id,
                                assets_version_id: file.assets_version_id,
                              },
                            ]"
                            class="tag-add-box"
                            :class="{ 'common-blur': !tagManagementAllowed }"
                            :disabled="
                              ui.deleting || ui.loading || !tagManagementAllowed
                            "
                            @versionTagsUpdated="latestVersionTags"
                          />
                        </client-only>
                      </div>

                      <!-- edit -->
                      <div
                        v-if="$isImage(file.file_type)"
                        id="edit"
                        class="tab-pane"
                        :class="{
                          active: ui.tab === 'edit',
                          'w-100 h-100': !cropperLoaded && !cropperError,
                        }"
                      >
                        <div
                          v-if="!assetEditAllowed"
                          class="common-overaly has-relative"
                        >
                          <div class="common-modal">
                            <div class="common-modal-header">
                              <h5>Upgrade Plan</h5>
                            </div>
                            <div class="common-modal-body text-center">
                              <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
                              
                            </div>
                          </div>
                        </div>
                        <div
                          v-if="ui.loading || (!cropperLoaded && !cropperError)"
                          class="col-lg-12 col-xl-12 h-100 w-100"
                        >
                          <div class="overlay">
                            <div class="loader"></div>
                          </div>
                        </div>
                        <image-edit-actions
                          v-show="
                            !ui.loading && (cropperLoaded || cropperError)
                          "
                          ref="imageActions"
                          :key="key"
                          :class="{ 'common-blur': !assetEditAllowed }"
                          :editor="$refs.editor"
                          :file-name="file.display_file_name"
                          :cropper-error="cropperError"
                        />
                      </div>
                      <!-- Manage Product -->
                      <ManageProduct
                        v-if="ui.tab === 'manageProduct'"
                        ref="manageProduct"
                        :file="file"
                        :active-tab="ui.tab === 'manageProduct'"
                      />
                      <!-- analytics-->
                      <div
                        id="analytics"
                        class="tab-pane position-relative"
                        :class="{ active: ui.tab === 'analytics' }"
                      >
                        <div
                          v-if="!perAssetAnalyticsAllowed"
                          class="common-overaly"
                        >
                          <div class="common-modal">
                            <div class="common-modal-header">
                              <h5>Upgrade Plan</h5>
                            </div>
                            <div class="common-modal-body text-center">
                              <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
                              
                            </div>
                          </div>
                        </div>
                        <div
                          :class="{ 'common-blur': !perAssetAnalyticsAllowed }"
                        >
                          <div class="newAnalytics p0">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="analyticsBox box-4">
                                  <h3>{{ totalViewed }}</h3>
                                  <h5>Total Views</h5>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="analyticsBox box-5">
                                  <h3>{{ totalDownloads }}</h3>
                                  <h5>Total Downloads</h5>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="analyticsBox box-1">
                                  <h3>{{ totalShared }}</h3>
                                  <h5>Total Shares</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="chartBox">
                            <div class="title">
                              <h4>
                                Total Views by User Type
                                <i
                                  v-tooltip="'Total Views by User Type'"
                                  class="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </h4>
                            </div>
                            <div class="chart">
                              <InnerLoader
                                v-if="graph.viewed && !assetsViewed"
                                :bg-white="false"
                              />
                              <Doughnut
                                v-if="assetsViewed"
                                :chart-data="assetsViewedData"
                                :options="assetsViewedOptions"
                                :height="250"
                              ></Doughnut>
                              <EmptyPieChart
                                v-if="!graph.viewed && !assetsViewed"
                              />
                            </div>
                          </div>
                          <div class="chartBox">
                            <div class="title">
                              <h4>
                                Total Downloads by User Type
                                <i
                                  v-tooltip="'Total Downloads by User Type'"
                                  class="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </h4>
                            </div>
                            <div class="chart">
                              <InnerLoader
                                v-if="graph.downloaded && !assetsDownloaded"
                                :bg-white="false"
                              />
                              <Doughnut
                                v-if="assetsDownloaded"
                                :chart-data="assetsDownloadedData"
                                :options="assetsDownloadedOptions"
                                :height="250"
                              ></Doughnut>
                              <EmptyPieChart
                                v-if="!graph.downloaded && !assetsDownloaded"
                              />
                            </div>
                          </div>
                          <div class="chartBox">
                            <div class="title">
                              <h4>
                                Total Shared By Url Type
                                <i
                                  v-tooltip="'Total Shared By Url Type'"
                                  class="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </h4>
                            </div>
                            <div class="chart">
                              <InnerLoader
                                v-if="graph.shared && !assetsShared"
                                :bg-white="false"
                              />
                              <Doughnut
                                v-if="assetsShared"
                                :chart-data="assetsSharedData"
                                :options="assetsSharedOptions"
                                :height="250"
                              ></Doughnut>
                              <EmptyPieChart
                                v-if="!graph.shared && !assetsShared"
                              />
                            </div>
                          </div>
                          <div v-if="topAssetsTagList.length" class="chartBox">
                            <div class="title">
                              <h4>
                                Top 5 Popular Tags for Asset
                                <i
                                  v-tooltip="'Top 5 Popular Tags for Asset'"
                                  class="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </h4>
                            </div>
                            <div class="chart">
                              <div class="tagList">
                                <span
                                  v-for="(tag, index) in topAssetsTagList"
                                  :key="index"
                                  >{{ tag.tag_name }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="detail-right-actions"
                      :class="{ closeUploaded: addedCount > 0 }"
                      :style="{ height: !versionUploaded ? '' : '357px' }"
                    >
                      <template v-if="!version">
                        <div class="d-flex align-items-center">
                          <div class="dropdown">
                            <a
                              href="javascript:void(0)"
                              class="btn btn-icon"
                              :data-toggle="
                                otherResolutions.length ? 'dropdown' : ''
                              "
                              :disabled="
                                allButtonDisabled || downloadingWithResolution
                              "
                              :class="{
                                'btn-disable':
                                  allButtonDisabled ||
                                  downloadingWithResolution,
                                disabled:
                                  allButtonDisabled ||
                                  downloadingWithResolution,
                                'dropdown-toggle':
                                  otherResolutions.length &&
                                  !downloadingWithResolution,
                              }"
                              :style="
                                downloadingWithResolution || allButtonDisabled
                                  ? 'pointer-events:none'
                                  : ''
                              "
                              @click="
                                allButtonDisabled ||
                                otherResolutions.length ||
                                downloadingWithResolution
                                  ? null
                                  : downloadFile()
                              "
                            >
                              <svg
                                v-show="!downloadingWithResolution"
                                id="Layer_1"
                                class="download-icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4359"
                                  transform="translate(-153.745 -317.549)"
                                >
                                  <path
                                    id="Path_3427"
                                    class="fill-color"
                                    d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                                  />
                                  <path
                                    id="Path_3428"
                                    class="fill-color"
                                    d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                                  />
                                  <path
                                    id="Path_3429"
                                    class="fill-color"
                                    d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                                  />
                                </g>
                              </svg>
                              <SpinLoading
                                v-show="downloadingWithResolution"
                                style="margin-left: -4px"
                              />
                              {{
                                downloadingWithResolution
                                  ? `&nbsp;Downloading...`
                                  : 'Download'
                              }}
                            </a>
                            <ul
                              v-if="otherResolutions.length"
                              class="dropdown-menu"
                              :style="{
                                willChange: 'transform',
                                height: 'auto',
                              }"
                            >
                              <li
                                v-for="(format, index) in otherResolutions"
                                :key="index"
                                @click="
                                  convertResolution(
                                    format.width,
                                    format.height,
                                    format.quality
                                  )
                                "
                              >
                                <a
                                  href="javascript:void(0);"
                                  class="dropdown-item"
                                  >{{ format.name }}</a
                                >
                              </li>
                            </ul>
                          </div>
                          <button
                            v-if="!file.is_archive"
                            type="button"
                            class="btn btn-gray btn-icon"
                            :disabled="allButtonDisabled"
                            :class="{ 'btn-disable': allButtonDisabled }"
                            @click="$refs.shareDialog.show()"
                          >
                            <svg
                              id="Layer_1"
                              class="share-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_4473"
                                transform="translate(-871 -230)"
                              >
                                <rect
                                  id="Rectangle_3012"
                                  x="871"
                                  y="230"
                                  class="fill-hide"
                                  width="18"
                                  height="18"
                                />
                                <path
                                  id="Icon_open-share"
                                  class="fill-color"
                                  d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                                />
                              </g>
                            </svg>

                            <span>Share</span>
                          </button>
                          <div
                            v-if="downloadableFormats.length"
                            v-tooltip="
                              assetConversionAllowed
                                ? ''
                                : 'Please upgrade your subscription plan to enable this feature.'
                            "
                            class="dropdown convert-video"
                          >
                            <a
                              class="dropdown-toggle btn btn-gray btn-icon"
                              :disabled="!assetConversionAllowed"
                              :style="
                                assetConversionAllowed
                                  ? ''
                                  : 'opacity:0.4;pointer-events:none'
                              "
                              data-toggle="dropdown"
                              :class="{
                                disabledFileConvert:
                                  allButtonDisabled ||
                                  converting ||
                                  !assetConversionAllowed,
                                disabled: !assetConversionAllowed,
                              }"
                            >
                              <svg
                                id="Layer_1"
                                class="convert-assets-icon"
                                :class="{ converting: converting }"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g id="Convert">
                                  <g id="sync" transform="translate(-2 -2.023)">
                                    <path
                                      id="Path_40227"
                                      class="fill-color"
                                      d="M16.1,14.6h1.8c-2,3.8-6.7,5.3-10.5,3.3c-2.6-1.3-4.2-4-4.2-6.9H2c0,5,4,9,9,9c3.2,0,6.2-1.7,7.8-4.5v1.8H20v-3.9h-3.9V14.6z"
                                    />
                                    <path
                                      id="Path_40228"
                                      class="fill-color"
                                      d="M5.9,7.4H4.1c2-3.8,6.7-5.3,10.5-3.3c2.6,1.3,4.2,4,4.2,6.9H20c0-5-4-9-9-9C7.8,2,4.8,3.7,3.2,6.5V4.7H2v3.9h3.9V7.4z"
                                    />
                                  </g>
                                </g>
                              </svg>
                              Convert
                            </a>
                            <ul
                              class="dropdown-menu"
                              :style="{
                                willChange: 'transform',
                                height: 'auto',
                                maxHeight: '220px',
                                overflowY: 'auto',
                              }"
                            >
                              <li
                                v-for="(format, index) in downloadableFormats"
                                :key="index"
                                @click="convertFile(format)"
                              >
                                <a
                                  href="javascript:void(0);"
                                  class="dropdown-item"
                                  >{{ format }}</a
                                >
                              </li>
                            </ul>
                          </div>
                          <button
                            v-tooltip="
                              storageFull
                                ? 'You have consumed all your storage quota.'
                                : !assetVersionAllowed
                                ? 'Please upgrade your subscription plan to enable this feature.'
                                : ''
                            "
                            type="button"
                            class="btn btn-gray btn-icon btn-version"
                            :style="
                              storageFull ||
                              allButtonDisabled ||
                              !assetVersionAllowed
                                ? 'cursor:default;opacity:0.4'
                                : ''
                            "
                            @click="
                              storageFull || !assetVersionAllowed
                                ? null
                                : addVersion()
                            "
                          >
                            <svg
                              id="Layer_1"
                              class="plus-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_4454"
                                transform="translate(-1005 -577.999)"
                              >
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

                            <span> Add New Version</span>
                          </button>
                        </div>
                      </template>
                      <div v-if="uploadHeight">
                        <div
                          style="
                            display: flex;
                            align-items: center;
                            min-height: 52px;
                          "
                        >
                          <!-- <p style="color: #e40808">
                            <strong style="color: #030422">Note : </strong>At
                            the time of uploading new version, all version will
                            have their own tags respectively and will not be
                            copied.
                          </p> -->
                        </div>
                      </div>

                      <a
                        v-if="versionUploaded"
                        class="hide-version"
                        @click.stop="closeOngoingUpload"
                      >
                        Close
                      </a>

                      <div
                        v-if="version"
                        style="cursor: pointer"
                        class="versioning dam-dropzone"
                        :class="{ 'version-height': uploadHeight }"
                        :style="{ marginTop: !versionUploaded ? 0 : '10px' }"
                      >
                        <client-only>
                          <AssetUpload
                            :file="file"
                            @close=";(version = false), (uploadHeight = false)"
                            @deleted="deleteUpload"
                            @version-uploaded="assetsUploadSuccessful"
                          />
                        </client-only>
                      </div>

                      <FileTagInput
                        v-if="versionUploaded"
                        ref="tagInput"
                        name-id="Tags"
                        :value="newVersionData.tags || []"
                        :file-ids="[
                          {
                            id: file.id,
                            assets_version_id: file.assets_version_id,
                          },
                        ]"
                        class="customscrollbar tag-add-box bg-white"
                        :style="
                          uploadHeight
                            ? {}
                            : {
                                minHeight: 'unset',
                                height: 'calc(100% - 70px)',
                              }
                        "
                        @versionTagsUpdated="currentVersionTags"
                        @removedTag="removeTagFromFiles"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <client-only>
        <ShareAssetDialog ref="shareDialog" :files="[file]" type="folder" />

        <DeleteDialog ref="deleteDialog" @button:yes="deleteFile">
          Are you sure you want to delete
          <strong>{{ file.display_file_name }}</strong
          >?
        </DeleteDialog>

        <MoveFolderDialog
          ref="moveDialog"
          move-to-folder
          :files-to-move="[file]"
          @moved="moved"
        />

        <CopyFolderDialog
          ref="copyDialog"
          move-to-folder
          :files-to-move="[file]"
        />
        <SaveToCollection ref="saveCollectionDialog" :file="file" />
        <AssetPermissionDialog
          ref="assetPermissionDialog"
          @changeSharePermission="changeSharePermission"
        />

        <EmbedLinkDialog ref="embedDialog" :file="file" />
      </client-only>
    </div>
    <client-only>
      <asset-i-frame-generator ref="assetIFrame" />
    </client-only>
  </div>
</template>

<script>
import axios from 'axios'
import FileSaver from 'file-saver'
import AssetUpload from '../asset-upload.vue'
import ImageEditor from './ImageEditor'
import ImageEditActions from './ImageEditActions'
import fileType from '~/mixins/fileType'
import FileTagInput from '~/components/dam/FileTagInput'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import CopyFolderDialog from '~/components/dam/Dialogs/CopyFolderDialog'
import EmbedLinkDialog from '~/components/dam/Dialogs/EmbedLinkDialog'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
import ShareAssetDialog from '~/components/dam/Dialogs/ShareAssetDialog'
import SaveToCollection from '~/components/dam/Dialogs/SaveToCollection'
import AssetPermissionDialog from '~/components/dam/Dialogs/AssetPermissionDialog'
import AddToCollectionButton from '~/components/dam/AssetList/AddToCollectionButton'
import ManageProduct from '~/components/dam/ManageProduct.vue'
import Versions from '~/components/dam/AssetList/Versions'
import { getFileExt, isImage, isAudio } from '~/utils'
import '~/assets/css/dam-dropzone.css'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
import EmptyPieChart from '~/components/theme/global/EmptyPieChart'
import Doughnut from '~/components/plugins/Doughnut'
let vue

const isDirty = () => !vue.completed

if (process.client) {
  window.onload = function () {
    window.addEventListener('beforeunload', function (e) {
      if (!isDirty()) return undefined

      const confirmationMessage =
        'It looks like you have been editing something. ' +
        'If you leave before saving, your changes will be lost.'

      ;(e || window.event).returnValue = confirmationMessage // Gecko + IE
      return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
    })
  }
}

const GENERAL_ICON = require('~/assets/img/file/general.svg')
const IMAGE_ICON = require('~/assets/img/icon/images.svg')
const AUDIO_ICON = require('~/assets/img/file/audio.svg')

function getGeneralIcon(ext) {
  if (ext)
    if (isImage(ext)) return IMAGE_ICON
    else if (isAudio(ext)) return AUDIO_ICON
    else
      try {
        return require(`~/assets/img/file/${ext}.svg`)
      } catch {}
  return GENERAL_ICON
}

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (result, key) {
      result[key] = obj[key]
      return result
    }, {})
}

function resizeCanvas() {
  const $canvas = window.$('.asset-detail-img canvas')
  const $container = window.$('.asset-detail-img')

  $canvas.outerWidth($container.width())
}

const categories = ['video', 'audio', 'image', 'application', 'archive']

const categoriesObject = [
  { text: 'Home', id: '' },
  { text: 'Audio', id: 'audio' },
  { text: 'Documents', id: 'application' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
  { text: 'Archived', id: 'archive' },
]

const recursivePush = (item, array, workspaceId) => {
  if (!item) return

  array.push({
    name: item.folder_name,
    url: {
      name: 'workspace_id-dam',
      params: { workspace_id: workspaceId },
      hash: `#${item.id}`,
    },
  })

  recursivePush(item.parent, array, workspaceId)
}

const VIDEO_FORMATS = [
  // 'asf',
  'avi',
  // 'fla',
  // 'f4a',
  // 'f4b',
  // 'f4p',
  // 'flv',
  // 'f4v',
  // 'mmf',
  'mov',
  'mpeg',
  'mp4',
  // 'm4v',
  // 'ogg',
  // 'ogv',
  // 'rm',
  // 'viv',
  // 'vob',
  // 'wav',
  'webm',
]

const AUDIO_FORMATS = [
  'mp2',
  'mp3',
  'oga',
  'opus',
  'wv',
  'voc',
  'tta',
  'flac',
  'au',
  'aiff',
]
const IMAGE_FORMATS = [
  // 'tif',
  // 'tiff',
  'bmp', // exclude for svg file
  'jpg',
  // 'jp2',
  // 'gif',//requires libvips with support for ImageMagick
  'jpeg',
  // 'jfif', // exclude for svg file
  // 'pjpeg',
  // 'pjp',
  'png',
  // 'eps',
  // 'raw',
  // 'cr2',
  // 'orf',
  // 'sr2',
  // 'apng',
  // 'svg',
  // 'webp',
  // 'ico',
  // 'cur',
  // 'heif',
  // 'avif',
]

// const IMAGE_MIMETYPES = {
//   tif: 'image/tiff',
//   tiff: 'image/tiff',
//   bmp: 'image/bmp',
//   jpg: 'image/jpeg',
//   jpeg: 'image/jpeg',
//   jfif: 'image/jpeg',
//   pjpeg: 'image/pjpeg',
//   png: 'image/png',
//   eps: 'application/postscript',
//   svg: 'image/svg+xml',
//   webp: 'image/webp',
//   ico: 'image/vnd.microsoft.icon',
// }

export default {
  components: {
    CopyFolderDialog,
    EmbedLinkDialog,
    DeleteDialog,
    MoveFolderDialog,
    ShareAssetDialog,
    FileTagInput,
    SaveToCollection,
    AddToCollectionButton,
    AssetPermissionDialog,
    Versions,
    AssetUpload,
    ImageEditor,
    ImageEditActions,
    InnerLoader,
    EmptyPieChart,
    Doughnut,
    ManageProduct,
    AssetIFrameGenerator: () => import('~/components/dam/AssetIFrameGenerator'),
  },
  mixins: [fileType],
  beforeRouteLeave(to, from, next) {
    const manageProductComp = this.$refs.manageProduct
    if (manageProductComp && manageProductComp.changesFound) {
      const x = confirm(
        'Changes not applied until saved. Do you want to continue without saving it?'
      )
      next(x)
    } else {
      if (this.completed) return next()

      if (confirm('Do you really want to leave? files may not get uploaded!'))
        next()
      else next(false)
    }
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],

  async asyncData({
    params,
    store,
    $axios,
    $getWorkspaceId,
    $deleteMetaKeys,
    error,
  }) {
    if (!params.id || Number.isNaN(Number(params.id)))
      return error({
        status: 404,
        message: 'Requested file was not found',
      })

    let metaData, tags, file, versionHistory
    let accessControlList = []
    if (!store.state.dam.folderList || !store.state.dam.folderList.length)
      await store.dispatch('dam/getFolders')

    await $axios
      .$post('digital-assets/view-detail', {
        digital_assets_id: params.id,
        workspace_id: $getWorkspaceId(),
      })
      .then(({ data }) => {
        if (!data)
          return error({
            status: 404,
            message: 'Requested file was not found',
          })

        if (data.versions && data.versions.length)
          versionHistory = data.versions

        metaData = data.file_meta_data || {}
        if (metaData) {
          $deleteMetaKeys(metaData)
          metaData = sortObject({
            ...metaData,
            FileName: data.display_file_name,
          })
        }

        // delete data.thumbnail_file
        if ((data?.file_type || '').toLowerCase() === 'gif')
          delete data.compress_file

        tags = data.tags
        file = data

        // acl list and permissions
        const assetAccess = data.acl?.filter((item) =>
          file.acl_permission.includes(item.id)
        )
        if (assetAccess && assetAccess.length) {
          data.acl.filter((item) => {
            if (file.acl_permission.includes(item.id)) {
              accessControlList.push(item)
            } else {
              item.is_active = 0
              accessControlList.push(item)
            }
            return item
          })
        } else {
          accessControlList = data.acl?.map((item) => {
            item.is_active = 0
            return item
          })
        }
      })
      .catch((e) => error(e))

    return { metaData, tags, file, versionHistory, accessControlList }
  },
  data() {
    return {
      previewIcon: false,
      previewFile: null,
      previewLoaded: false,
      iFrameFileTypes: [
        'jpg',
        'jpeg',
        'gif',
        'jpe',
        'png',
        'svg',
        'bmp',
        'webp',
        'pdf',
        'docx',
        'doc',
        'rtf',
        'txt',
        'xlsx',
        'xls',
        'pptx',
        'ppt',
        'pps',
        'ppsx',
        'mp4',
        'mov',
        'webm',
      ],
      ui: {
        tab: 'overview',
        loading: true,
        deleting: false,
        archiving: false,
        exifLoading: false,
        videoError: false,
        downloadBtnLoading: true,
      },
      newFolder: null,
      videoThumbnail: null,
      exif: null,
      fileCopy: null,
      version: false,
      autoTag: true,
      uploadComplete: true,
      completed: true,
      completedCount: 0,
      addedCount: 0,
      successCount: 0,

      uploadHeight: false,
      afterUpload: false,

      versionHistory: null,
      versionUploaded: false,

      newVersionData: null,
      source: null,
      request: null,

      successUploaded: false,
      reloadFrame: true,
      accessControlList: [],
      rotationInputKey: 0,
      cropperLoaded: false,
      cropperError: false,
      converting: false,
      key: 0,

      graph: {
        viewed: true,
        downloaded: true,
        shared: true,
      },
      assetsViewed: false,
      assetsViewedData: null,
      assetsViewedOptions: {},

      assetsDownloaded: false,
      assetsDownloadedData: null,
      assetsDownloadedOptions: {},

      assetsShared: false,
      assetsSharedData: null,
      assetsSharedOptions: {},

      totalDownloads: null,
      totalViewed: null,
      totalShared: null,

      topAssetsTagList: [],
      renameActive: 0,
      renaming: 0,
      fileNameModel: '',
      titleHover: false,
      originalImageW: null,
      originalImageH: null,
      fetchingImageDimension: false,
      downloadingWithResolution: false,
      isAssetPrivacyUpdating: false,
    }
  },
  computed: {
    canEditinBrowser() {
      return (type) => ['jpg', 'jpeg', 'png'].includes(type)
    },
    otherResolutions() {
      if (!this.originalImageW || !this.originalImageH) return []
      const resolutions = []
      if (this.originalImageW > 640) {
        resolutions.push({
          id: 'small',
          name: 'Small (640x' + this.targetH(640) + ')',
          width: 640,
          height: this.targetH(640),
          quality: 60,
        })
      }
      if (this.originalImageW > 1920) {
        resolutions.push({
          id: 'medium',
          name: 'Medium (1920x' + this.targetH(1920) + ')',
          width: 1920,
          height: this.targetH(1920),
          quality: 80,
        })
      }
      if (this.originalImageW > 2400) {
        resolutions.push({
          id: 'large',
          name: 'Large (2400x' + this.targetH(2400) + ')',
          width: 2400,
          height: this.targetH(2400),
          quality: 80,
        })
      }
      if (!resolutions.length) return []
      resolutions.push({
        id: 'original',
        name: `Original (${this.originalImageW}x${this.originalImageH})`,
        quality: 100,
      })
      return resolutions
    },
    aspectRatio() {
      return this.originalImageW && this.originalImageH
        ? this.originalImageW / this.originalImageH
        : 1
    },
    targetH() {
      return (sizeW) => {
        return this.originalImageW && this.originalImageH && sizeW
          ? Math.round(sizeW / this.aspectRatio)
          : null
      }
    },
    privacyCustomizationAllowed() {
      return !!this.$auth.user?.subscription_features
        ?.public_and_private_asset_customisation?.enable
    },
    orderManagementAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_order_management
        ?.enable
    },
    assetVersionAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_versioning?.enable
    },
    assetEmbeddingAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_embedding?.enable
    },
    assetEditAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_edit_modification
        ?.enable
    },
    tagManagementAllowed() {
      return !!this.$auth.user?.subscription_features?.tag_management?.enable
    },
    assetConversionAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_conversion?.enable
    },
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    hasZipCompressedImage() {
      return (
        this.file.file_type === 'zip' &&
        (this.file.compress_file || '').length > 0
      )
    },
    downloadableFormats() {
      const sortAscending = (a, b) => a.localeCompare(b)
      if (this.file.type === 'video')
        return [...VIDEO_FORMATS, 'gif'].sort(sortAscending)
      if (this.file.type === 'audio') return AUDIO_FORMATS.sort(sortAscending)
      if (this.file.type === 'image') {
        if (this.file.file_type === 'svg') return []
        return this.file.file_type === 'gif'
          ? ['gif', ...IMAGE_FORMATS].sort(sortAscending)
          : IMAGE_FORMATS.sort(sortAscending)
      }
      return []
    },
    hideUpload() {
      return this.addedCount > 0
    },
    dropzone() {
      return this.$refs.damDropzone && this.$refs.damDropzone.dropzone
    },
    // inside collection route
    isCollection() {
      return this.$route.name.search('collection')
    },
    hashParam() {
      return this.$route.params.came_from_hash
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    isFolder() {
      return (
        !!this.hashParam && !this.inCategory && !isNaN(Number(this.hashParam))
      )
    },
    inCategory() {
      return categories.includes(this.hashParam)
    },
    category() {
      return categoriesObject.find(({ id }) => this.hashParam === id)
    },
    allButtonDisabled() {
      return this.ui.loading || this.ui.deleting || this.ui.archiving
    },
    fileId() {
      return this.$route.params.id
    },
    parentFolder() {
      const workspaceId = this.$getWorkspaceId()

      if (this.newFolder)
        return {
          name: this.newFolder.folder_name,
          url: {
            name: 'workspace_id-dam',
            params: { workspace_id: workspaceId },
            hash: `#${this.newFolder.id}`,
          },
        }

      const breadcrumbs = []

      recursivePush(this.file.breadcrumb, breadcrumbs, workspaceId)

      return breadcrumbs[0]
    },
    breadcrumbs() {
      const breadcrumbs = [
        {
          name: this.$shrinkString(this.file.display_file_name, 60, 15),
          og: this.file.display_file_name,
        },
      ]

      const workspaceId = this.$getWorkspaceId()

      recursivePush(this.file.breadcrumb, breadcrumbs, workspaceId)

      if (this.newFolder) {
        breadcrumbs[this.file.breadcrumb - 2] = {
          name: this.newFolder.folder_name,
          url: {
            name: 'workspace_id-dam',
            params: { workspace_id: workspaceId },
            hash: `#${this.newFolder.id}`,
          },
        }
      }

      return breadcrumbs.reverse()
    },
    perAssetAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.per_asset_analytics
        ?.enable
    },
  },
  watch: {
    cropperLoaded: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.imageActions) {
            this.$refs.imageActions.update()
          }
        })
      },
      immediate: true,
    },
    renameActive: {
      handler(n) {
        this.$nextTick(() => {
          if (n) {
            this.fileNameModel = this.file.display_file_name.replace(
              `.${this.file.file_type}`,
              ''
            )
            this.$refs.renameInput.click()
            this.$refs.renameInput.focus()
          }
        })
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    if (this.file.type === 'image' && this.file.display_file) {
      this.fetchingImageDimension = true
      // this.ui.downloadBtnLoading = true
      this.ui.loading = false
      this.originalImageW = this.file.width
      this.originalImageH = this.file.height
      this.fetchingImageDimension = false
    } else {
      // this.ui.downloadBtnLoading = false
      this.ui.loading = false
    }
    const { tab } = this.$route.query
    if (tab === 'manageProduct') {
      this.ui.tab = tab
    }
    this.fileCopy = { ...this.file }
    if (this.isVideo) {
      this.$nextTick(() => {
        const video = this.$refs.video
        if (!video) return

        video.setAttribute('crossOrigin', 'anonymous')
        const playPromise = video.play()

        this.$store.commit('dam/pictureInPicture', video)
        // In browsers that don’t yet support this functionality,
        // playPromise won’t be defined.
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.$refs.video.pause()
              // Automatic playback started!
            })
            .catch((error) => {
              console.log(error)
              this.ui.videoError = true
              // Automatic playback failed.
              // Show a UI element to let the user manually start playback.
            })
        }
        this.getThumbnail()
        this.$refs.video.addEventListener('loadedmetadata', () => {
          if (document.pictureInPictureElement) {
            this.popup()
          }
        })
      })
    } else if (this.isAudio) {
      this.$nextTick(() => {
        window.$(document).ready(function () {
          window.$('.asset-detail-img audio').attr('controlsList', 'nodownload')
          resizeCanvas()
          window.$(window).on('resize', function () {
            resizeCanvas()
          })
        })
      })
    } else if (this?.file?.file_type === 'avi') {
      this.ui.videoError = true
    }
  },
  beforeDestroy() {},
  methods: {
    convertResolution(width, height, quality) {
      if (this.downloadingWithResolution) return
      if (quality === 100) return this.downloadFile()
      this.downloadingWithResolution = true
      const w = width
      const h = height
      const s = this.file.display_file
      const q = quality
      const m = this.file.file_meta_data.MimeType || this.metaData.MimeType
      if (!s) return this.$toast.error('Image source not available!')
      // if (!m) return this.$toast.error('mime type not available')
      axios
        .post(
          '/convert/resolution',
          {
            w,
            h,
            s,
            q,
            m,
          },
          {
            responseType: 'blob',
          }
        )
        .then((r) => {
          FileSaver.saveAs(
            new Blob([r.data], { type: this.metaData.MimeType }),
            this.file.display_file_name +
              '_' +
              w +
              'x' +
              h +
              '.' +
              r.headers.ext
          )
        })
        .catch((e) => {
          console.error(e)
          console.error(e.response)
        })
        .finally(() => {
          this.downloadingWithResolution = false
        })
    },
    async changeFileName() {
      const fileName = this.fileNameModel.trim()

      if (!fileName) {
        this.fileNameModel = this.file.display_file_name.replace(
          `.${this.file.file_type}`,
          ''
        )
        this.renameActive = 0
        return
      }

      if (
        fileName ===
        this.file.display_file_name.replace(`.${this.file.file_type}`, '')
      ) {
        this.renameActive = 0
        return
      }
      if (!this.renameActive || this.renaming) return

      this.renaming = 1
      await this.$axios
        .$post('/digital-assets/update-with-field', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
          field_name: 'display_file_name',
          field_value: this.file.display_file_name.endsWith(
            `.${this.file.file_type}`
          )
            ? `${fileName}.${this.file.file_type}`
            : fileName,
        })
        .then(() => {
          this.fileNameModel = fileName
          this.$toast.global.success('Asset renamed successfully.')
          this.file.display_file_name = this.file.display_file_name.endsWith(
            `.${this.file.file_type}`
          )
            ? `${fileName}.${this.file.file_type}`
            : fileName
          this.renameActive = 0
          this.renaming = 0
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.fileNameModel = this.file.display_file_name
        })
    },
    imageErrorHandle(data) {
      if (
        this.isPdf ||
        this.isTxt ||
        this.isDoc ||
        this.isHtml ||
        this.isImage
      ) {
        this.previewIcon = true
      }
      try {
        data.target.src = require(`~/assets/img/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        data.target.src = require(`~/assets/img/file/general.svg`)
      }
      setTimeout(() => {
        if (this.file.file_type.toLowerCase() === 'html') {
          this.$refs.docFile.style.maxHeight = '128px'
        } else if (this.$isVideo(this.file.file_type)) {
          this.$refs.videoFile.style.maxHeight = '128px'
        } else if (this.$isImage(this.file.file_type)) {
          this.$refs.sourceImage.style.maxHeight = '128px'
        }
      }, 50)
    },
    errorHandle() {
      if (this.isPdf || this.isTxt || this.isDoc || this.isHtml) {
        this.previewIcon = true
      }
      try {
        this.previewFile = require(`~/assets/img/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        this.previewFile = require(`~/assets/img/file/general.svg`)
      }
      setTimeout(() => {
        this.$refs.docFile.style.maxHeight = '128px'
      }, 50)
    },
    checkPreview() {
      axios
        .get(this.file.display_file)
        .then(() => {
          return true
        })
        .catch(() => {
          if (this.file.file_preview_id) {
            if (this.file.file_preview_status === 'success') {
              this.previewFile = this.file.compress_file
              this.previewLoaded = true
            } else {
              this.previewLoaded = true
              this.errorHandle()
            }
          } else {
            this.previewLoaded = true
            this.errorHandle()
          }
        })
    },
    // change status of access
    changeStatus(accessData) {
      const field_value = [
        ...this.accessControlList.filter((e) => e.is_active).map((e) => e.id),
      ]
      this.$axios
        .$post(`digital-assets/update-with-field`, {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
          field_name: 'acl_permission',
          field_value: [...new Set(field_value)],
        })
        .then((response) => {
          this.$toast.global.success(response.message)
        })
    },
    getEmbedLink(e) {
      if (!this.assetEmbeddingAllowed) {
        e.preventDefault()
        e.stopImmediatePropagation()
        return
      }
      this.$refs.embedDialog.getEmbedLink()
      this.$refs.embedDialog.show()
    },
    closeVersionUpload() {
      if (this.versionUploaded && this.assetVersionAllowed) {
        this.closeOngoingUpload()
      }
    },
    holdService() {
      if (this.isVideo) {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture()
        }
        this.$refs.video.pause()
      } else if (this.isAudio) {
        this.$refs.audio.audio.pause()
      }
    },
    latestVersionTags(tag = {}) {
      if (!this.tagManagementAllowed) return
      if (!Object.keys(tag).length) return
      // this.tags.push({ ...tag })
      let isLatestVersion = false
      if (Object.keys(this.newVersionData || {}).length) {
        this.newVersionData.tags = this.newVersionData.tags || []
        isLatestVersion =
          this.newVersionData.assets_version_id === this.file.assets_version_id
      }
      if (
        isLatestVersion &&
        !this.newVersionData.tags.map((e) => e.id).includes(tag.id)
      ) {
        this.newVersionData.tags.push({ ...tag })
      }
    },
    currentVersionTags(tag = {}) {
      if (!Object.keys(tag).length) return
      this.newVersionData.tags = this.newVersionData.tags || []
      // this.newVersionData.tags.push({ ...tag })
      const isLatestVersion =
        this.newVersionData.assets_version_id === this.file.assets_version_id
      if (isLatestVersion && !this.tags.map((e) => e.id).includes(tag.id)) {
        this.tags.push({ ...tag })
      }
    },
    removeTagFromFiles(tag) {
      const index = this.tags.findIndex(
        ({ tag_name }) => tag.tag_name === tag_name
      )
      if (~index) {
        this.tags.splice(index, 1)
      }
      if (this.versionUploaded) {
        const newIndex = this.newVersionData.tags.findIndex(
          ({ tag_name }) => tag.tag_name === tag_name
        )
        if (~newIndex) {
          this.newVersionData.tags.splice(newIndex, 1)
        }
      }
    },
    async reloadAssetData() {
      await this.$nuxt.refresh()
      // this.loadVersionHistory()
      this.reloadFrame = false
      if (this.$store?.state?.dam?.activeSelectionList?.length) {
        const parentId = this.file.category_id
        this.$store.dispatch('dam/refreshColumnData', { parentId })
      }
      this.$nextTick(() => {
        this.reloadFrame = true
        this.previewIcon = false
        this.key++
      })
    },
    async changeVersion(assetVersion) {
      if (!this.assetVersionAllowed) return
      await this.$axios
        .$post(`digital-assets/version/make-current-version`, {
          workspace_id: this.$getWorkspaceId(),
          asset_id: this.file.id,
          current_version_id: assetVersion,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
          this.reloadAssetData()
        })
    },
    thumbnail(file, dataUrl) {
      if (!file.previewElement) return

      const ext = getFileExt(file.name)
      setTimeout(
        (dataURL) => {
          if (!dataURL || typeof dataURL !== 'string')
            dataURL = getGeneralIcon(ext)

          window
            .$(file.previewElement)
            .find('[data-dz-thumbnail]')
            .attr('src', dataURL)
        },
        1,
        dataUrl
      )
    },
    async deleteUpload(file) {
      if (this.destroyed || !this.assetVersionAllowed) {
        return
      }
      if (file.success) {
        await this.$axios
          .$delete(
            `digital-assets/version/${this.file.assets_version_id}/remove`,
            {
              params: {
                current_version: true,
                asset_id: this.file.id,
              },
            }
          )
          .then((response) => {
            this.$toast.global.success(response.message)
            this.reset()
            this.afterUpload = false
            if (this.successUploaded) {
              this.uploadHeight = false
            } else {
              this.uploadHeight = true
            }
            this.uploadComplete = true
            this.completed = true
            this.successUploaded = false
            this.reloadAssetData()
          })
      } else {
        this.reset()
        this.afterUpload = false
        if (this.successUploaded) {
          this.uploadHeight = false
        } else {
          this.uploadHeight = true
        }
        this.uploadComplete = true
        this.completed = true
        this.successUploaded = false
        this.reloadAssetData()
      }
    },
    assetsUploadSuccessful(versionData) {
      this.afterUpload = true
      this.uploadHeight = false
      this.versionUploaded = true
      this.newVersionData = versionData
      this.reloadAssetData()
    },
    assetsUpload(file, xhr, formData) {
      formData.append('workspace_id', this.$getWorkspaceId())
      formData.append('url_workspace_id', this.$route.params.workspace_id)
      formData.append('auto_tag', this.autoTag ? '1' : '0')
      formData.append('asset_id', this.file.id)
    },
    addVersion() {
      if (!this.assetVersionAllowed) return
      this.version = true
      this.uploadHeight = true
    },
    reset() {
      this.completedCount = 0
      this.addedCount = 0
      this.successCount = 0
      this.versionUploaded = false
    },
    closeVersion() {
      if (!this.assetVersionAllowed) return
      this.version = false
      this.uploadHeight = false
      this.afterUpload = false
      this.reset()
    },
    closeOngoingUpload() {
      this.successUploaded = true
      this.version = false
      this.afterUpload = false
      this.uploadHeight = false
      this.reset()
    },
    storePermmissionChange(name, value, fileId, fileCategoryId, message) {
      const activeSelectionList = this.$store.state.dam.activeSelection
      if (activeSelectionList.length > 0) {
        const indexOfParent = activeSelectionList.indexOf(fileCategoryId)
        if (indexOfParent !== -1) {
          this.$store
            .dispatch('dam/assetDetialsChange', {
              name,
              value,
              fileId,
              indexOfParent,
            })
            .then(() => {
              this.$toast.global.success(message)
            })
        } else {
          this.$toast.global.success(message)
        }
      } else {
        this.$toast.global.success(message)
      }
    },
    async changeSharePermission() {
      if (this.file.is_public === 1) {
        this.file.is_public = 0
        this.$refs.assetPermissionDialog.hide()
      } else {
        this.file.is_public = 1
      }
      this.isAssetPrivacyUpdating = true
      await this.$axios
        .$post(`digital-assets/update-with-field`, {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
          field_name: 'is_public',
          field_value: this.file.is_public,
        })
        .then(async ({ message }) => {
          this.fileCopy.is_public = this.file.is_public
          const value = this.file.is_public
          const name = 'permission'
          await this.storePermmissionChange(
            name,
            value,
            this.file.id,
            this.file.category_id,
            message
          )
          this.isAssetPrivacyUpdating = false
        })
    },
    async checkAssetPermission(actionChange) {
      if (actionChange === 'permission') {
        if (!this.privacyCustomizationAllowed) return
        await this.$axios
          .$get(`digital-assets/${this.file.id}/check-assets-shared`)
          .then(({ data }) => {
            if (data.asset_shared && this.fileCopy.is_public === 1) {
              if (this.file.is_public === true || this.file.is_public === 1) {
                this.file.is_public = 0
              } else if (
                this.file.is_public === false ||
                this.file.is_public === 0
              ) {
                this.file.is_public = 1
              }
              this.$refs.assetPermissionDialog.show()
            } else {
              this.isAssetPrivacyUpdating = true
              if (this.file.is_public === true || this.file.is_public === 1) {
                this.file.is_public = 1
              } else if (
                this.file.is_public === false ||
                this.file.is_public === 0
              ) {
                this.file.is_public = 0
              }
              this.$axios
                .$post(`digital-assets/update-with-field`, {
                  workspace_id: this.$getWorkspaceId(),
                  digital_assets_id: this.file.id,
                  field_name: 'is_public',
                  field_value: this.file.is_public,
                })
                .then(async ({ message }) => {
                  this.fileCopy.is_public = this.file.is_public
                  const value = this.file.is_public
                  const name = 'permission'
                  await this.storePermmissionChange(
                    name,
                    value,
                    this.file.id,
                    this.file.category_id,
                    message
                  )
                  this.isAssetPrivacyUpdating = false
                })
            }
          })
      } else if (actionChange === 'editorial') {
        await this.$axios
          .$post(`digital-assets/update-with-field`, {
            workspace_id: this.$getWorkspaceId(),
            digital_assets_id: this.file.id,
            field_name: 'is_editorial_use',
            field_value: this.file.is_editorial_use,
          })
          .then(({ message }) => {
            const value = this.file.is_editorial_use
            const name = 'is_editorial_use'
            this.storePermmissionChange(
              name,
              value,
              this.file.id,
              this.file.category_id,
              message
            )
          })
      }
    },
    popup() {
      const x = new URL(this.__url)
      const y = x.searchParams
        .get('response-content-disposition')
        .split('=')[1]
        .replace(/['"]+/g, '')
      const pip = document.pictureInPictureElement
      const pipSrc = new URL(pip.firstChild.src)
      const pipFile = pipSrc.searchParams
        .get('response-content-disposition')
        .split('=')[1]
        .replace(/['"]+/g, '')
      if (y !== pipFile) {
        pip.pause()
        this.$nextTick(() => {
          this.$refs.video
            .requestPictureInPicture()
            .catch((error) => console.log(error))
        })
      } else {
        const q = this.$refs.video
        q.currentTime = pip.currentTime
        pip.pause()
        this.$nextTick(() => {
          this.$refs.video
            .requestPictureInPicture()
            .then(() => {
              // q.play()
              // document.pictureInPictureElement.play()
            })
            .catch((error) => console.log(error))
        })
      }
    },
    moved() {
      this.$nuxt.refresh()
    },
    async archiveFile() {
      if (this.ui.archiving) return

      this.ui.archiving = true
      await this.$axios
        .$post('digital-assets/archive_assets', {
          workspace_id: this.$getWorkspaceId(),
          assets_id: [this.file.id],
          is_archive: this.file.is_archive === 0 ? 1 : 0,
        })
        .then(({ message }) => {
          this.file.is_archive = this.file.is_archive === 0 ? 1 : 0
          this.$toast.global.success(message)
          // this.$router.go(-1);
        })
        .catch(this.onError)

      this.ui.archiving = false
    },
    async deleteFile() {
      if (this.ui.deleting) return

      this.ui.deleting = true
      await this.$axios
        .$post('digital-assets/category/delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: [this.file.id],
          category_ids: [],
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          const parentId = this.file.category_id
          if (this.$store?.state?.dam?.activeSelection?.length) {
            this.$store
              .dispatch('dam/refreshColumnData', { parentId })
              .then(() => {
                this.$router.go(-1)
              })
          } else if (window.history.back() === undefined) {
            this.$router.replace({
              name: 'workspace_id-dam',
              params: { workspace_id: this.$_auth().id },
            })
          } else {
            this.$router.go(-1)
          }
        })
        .catch(this.onError)

      this.ui.deleting = false
    },
    filterExifData(exifData) {
      const notAllowed = [
        'FilePermissions',
        'YCbCrSubSampling',
        'Directory',
        'SourceFile',
        'RedTRC',
        'BlueTRC',
        'GreenTRC',
        'ProfileID',
        'ThumbnailImage',
      ]
      if (!Object.keys(exifData || {}).length) {
        if (!Object.keys(this.metaData || {}).length) return {}
        exifData = JSON.parse(JSON.stringify(this.metaData))
        Object.keys(exifData).forEach((e) => {
          const val = exifData[e]
          exifData[e] = { val }
        })
      }
      return Object.keys(exifData)
        .sort()
        .filter((key) => !notAllowed.includes(key))
        .reduce((obj, key) => {
          const val = exifData[key]
          obj[key] = val.val
          return obj
        }, {})
    },
    filterMetaData(metaData) {
      const allowed = [
        'Credit',
        'FileSize',
        'DateUploaded',
        'LastModified',
        'Dimensions',
      ]
      return Object.keys(metaData)
        .sort((a, b) => allowed.indexOf(a) - allowed.indexOf(b))
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = metaData[key]
          return obj
        }, {})
    },
    downloadFile() {
      this.$store.dispatch('dam/downloadFile', {
        id: this.file.id,
        url: this.__url,
        name: this.file.display_file_name,
        fallback_route: this.$route.fullPath,
        workspace_id: this.$route.params.workspace_id,
        url_workspace_id: this.$route.params.workspace_id,
      })
    },
    updateDownloadCount(assetId, type) {
      this.$axios.$post('digital-assets/download-count', {
        workspace_id: this.$getWorkspaceId(),
        asset_id: assetId,
        is_backend_download: true,
        download_by: 'desktop',
        type,
      })
    },
    convertFile(format) {
      if (this.converting || !this.assetConversionAllowed) return
      if (
        format === this.file.file_type ||
        !['audio', 'video', 'image'].includes(this.file.type)
      ) {
        return this.downloadFile()
      }
      this.converting = true
      this.$axios
        .$post('digital-assets/convert-asset', {
          workspace_id: this.$getWorkspaceId(),
          asset_id: this.file.id,
          asset_type: this.file.file_type,
          convert_type: format,
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => (this.converting = false))
    },
    onError(e) {
      this.$toast.global.error(this.$getErrorMessage(e))
    },
    getThumbnail() {
      return new Promise((resolve) => {
        const video = document.createElement('video')
        const vue = this
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        video.addEventListener(
          'loadeddata',
          function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            video.pause()

            resolve()

            vue.videoThumbnail = canvas.toDataURL('image/jpeg')
          },
          false
        )

        video.muted = true
        video.playsInline = true
        video.setAttribute('crossOrigin', 'anonymous')
        video.setAttribute('src', this.__url)
        video.preload = 'metadata'
        video.play()
      })
    },
    getAnalyticsGraphData() {
      if (!this.perAssetAnalyticsAllowed) return
      this.getAssetsAnalyticsSummary()
      this.getTopAssetsTagAnalytics()
      this.getAssetsViewedByUser()
      this.getAssetsDownloadedByUser()
      this.getAssetsSharedByUser()
    },
    async getAssetsAnalyticsSummary() {
      if (!this.perAssetAnalyticsAllowed) return
      await this.$axios
        .$post('digital-assets/analytics/summary', {
          asset_id: this.file.id,
        })
        .then(({ data }) => {
          this.totalDownloads = data.total_download
          this.totalViewed = data.total_view
          this.totalShared = data.total_share
        })
        .catch(this.$errorToast)
    },
    async getTopAssetsTagAnalytics() {
      if (!this.perAssetAnalyticsAllowed) return
      await this.$axios
        .$post('digital-assets/analytics/top-asset-tags', {
          asset_id: this.file.id,
        })
        .then(({ data }) => {
          this.topAssetsTagList = data.tags
        })
        .catch(this.$errorToast)
    },
    async getAssetsViewedByUser() {
      if (!this.perAssetAnalyticsAllowed) return
      this.graph.viewed = true
      await this.$axios
        .$post('digital-assets/analytics/view-by-user', {
          asset_id: this.file.id,
        })
        .then(({ data }) => {
          this.assetsViewedByUserFilter(data)
          this.graph.viewed = false
        })
        .catch(this.$errorToast)
    },
    assetsViewedByUserFilter(view_by_user_type) {
      const userKey = Object.keys(view_by_user_type)
      const userValue = Object.values(view_by_user_type)
      for (let i = 0; i < userValue.length; i++) {
        if (userValue[i] > 0 && this.assetsViewed === false) {
          this.assetsViewed = true
        }
      }
      this.assetsViewedData = {
        labels: userKey,
        datasets: [
          {
            data: userValue,
            backgroundColor: [
              'rgba(69, 94, 167, 0.9)',
              'rgba(255, 138, 1, 0.9)',
            ],
          },
        ],
      }
      this.assetsViewedOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          position: 'right',
          labels: {
            boxWidth: 18,
            padding: 20,
            fontSize: 14,
            fontFamily: 'acumin-pro,sans-serif',
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
      }
    },
    async getAssetsDownloadedByUser() {
      if (!this.perAssetAnalyticsAllowed) return
      this.graph.downloaded = true
      await this.$axios
        .$post('digital-assets/analytics/download-by-user', {
          asset_id: this.file.id,
        })
        .then(({ data }) => {
          this.assetsDownloadedByUserFilter(data)
          this.graph.downloaded = false
        })
        .catch(this.$errorToast)
    },
    assetsDownloadedByUserFilter(view_by_user_type) {
      const userKey = Object.keys(view_by_user_type)
      const userValue = Object.values(view_by_user_type)
      for (let i = 0; i < userValue.length; i++) {
        if (userValue[i] > 0 && this.assetsDownloaded === false) {
          this.assetsDownloaded = true
        }
      }
      this.assetsDownloadedData = {
        labels: userKey,
        datasets: [
          {
            data: userValue,
            backgroundColor: [
              'rgba(69, 94, 167, 0.9)',
              'rgba(255, 138, 1, 0.9)',
            ],
          },
        ],
      }
      this.assetsDownloadedOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          position: 'right',
          labels: {
            boxWidth: 18,
            padding: 20,
            fontSize: 14,
            fontFamily: 'acumin-pro,sans-serif',
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
      }
    },
    async getAssetsSharedByUser() {
      if (!this.perAssetAnalyticsAllowed) return
      this.graph.shared = true
      await this.$axios
        .$post('digital-assets/analytics/share-by-url-type', {
          asset_id: this.file.id,
        })
        .then(({ data }) => {
          this.assetsSharedByUserFilter(data)
          this.graph.shared = false
        })
        .catch(this.$errorToast)
    },
    assetsSharedByUserFilter(view_by_user_type) {
      const userKey = Object.keys(view_by_user_type)
      const userValue = Object.values(view_by_user_type)
      for (let i = 0; i < userValue.length; i++) {
        if (userValue[i] > 0 && this.assetsShared === false) {
          this.assetsShared = true
        }
      }
      this.assetsSharedData = {
        labels: userKey,
        datasets: [
          {
            data: userValue,
            backgroundColor: [
              'rgba(45, 190, 119, 0.9)',
              'rgba(0, 95, 213, 0.9)',
            ],
          },
        ],
      }
      this.assetsSharedOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          position: 'right',
          labels: {
            boxWidth: 18,
            padding: 20,
            fontSize: 14,
            fontFamily: 'acumin-pro,sans-serif',
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
      }
    },
    async loadExifData() {
      this.ui.tab = 'metadata'
      if (this.exif) return true
      this.ui.exifLoading = true
      await this.$axios
        .$get(
          `digital-assets/category/view-asset-metadata?asset_id=${this.file.id}`
        )
        .then(({ data }) => {
          this.exif = data.file_preview_metadata?.exif || {}
        })
        .catch(this.$errorToast)
      this.ui.exifLoading = false
    },
  },
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style>
.closeUploaded {
  position: relative !important;
}

.after-upload {
  height: calc(100% - 357px) !important;
}

.hide-upload {
  display: none !important;
}

.versioning .upload-images .upload-text h5 {
  margin: 20px 0;
  font-size: 14px;
  color: #6f7070;
  font-weight: 500;
}

.versioning .upload-images {
  border: 2px dashed #dfe0e2 !important;
  border-radius: 4px !important;
  padding: 26px !important;
  position: relative !important;
  display: flex !important;
  height: 100% !important;
  justify-content: center !important;
  align-items: center !important;
  flex-wrap: wrap !important;
}

.version-height {
  height: calc(100% - 290px) !important;
}

.dam-file-display-title {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
}

.asset-detail-img canvas {
  width: 100%;
}

.asset-detail-img audio {
  width: 100%;
}

.asset-detail-img video {
  height: auto;
  width: 100%;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}

.cui-statusbar .cui-ctl,
.cui-statusbar .cui-ctl-medium {
  display: none !important;
}

.tabs-view table td {
  white-space: nowrap !important;
  vertical-align: top;
  padding-top: 8px;
  padding-bottom: 8px;
}

.tabs-view table td strong,
.tabs-view table td span {
  display: inline-block !important;
  word-break: break-all !important;
  white-space: normal !important;
}

.tabs-view table td span {
  margin-left: 0.375rem;
  margin-right: 0.375rem;
}

input.hide-indicator[type='number']::-webkit-outer-spin-button,
input.hide-indicator[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input.hide-indicator[type='number'] {
  -moz-appearance: textfield;
}
.convert-assets-icon.converting {
  animation: rotate 1s infinite both;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
.title .edit-icon {
  display: none;
}
.title.hover .edit-icon {
  display: inline;
}
#analytics .common-overlay {
  align-items: flex-start;
}
#analytics .common-modal {
  margin-top: 100px;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
}
</style>

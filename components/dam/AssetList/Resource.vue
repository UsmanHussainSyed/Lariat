<template>
  <li
    ref="nameChange1"
    :style="assetNoClick ? '' : 'cursor: pointer !important'"
    class="rename-asset"
    :class="[
      mode === 'columnView' ? 'mdoe-panalview' : `mode-${mode}`,
      {
        'selected-box': selected,
        selected,
        video: isVideo && !!file.video_preview,
        image: isImage || (isVideo && !file.video_preview),
        'assets-private': file.is_public === 0,
        'active-rename': renameActive && !trashMode,
      },
    ]"
    v-on="{
      ...(isVideo && mode !== 'columnView'
        ? {
            mouseenter: playVideo,
            mouseleave: pauseVideo,
          }
        : {}),
    }"
  >
    <!-- panel view of resource -->
    <template v-if="mode === 'columnView'">
      <div
        class="preview-img tb-column"
        :style="{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }"
      >
        <label
          v-if="!shareMode"
          class="check-label"
          :for="`file-` + file.id"
          @click.capture.stop
        >
          <input
            :id="`file-` + file.id"
            :checked="selected"
            type="checkbox"
            :disabled="deleting || deletingModel || downloading"
            @input="
              !(deleting || deletingModel || downloading) &&
                $emit('click:selected', file)
            "
          />
          <span class="check-span"></span>
        </label>
      </div>
      <div class="categary-name tb-column">
        <div class="categary-image folder-image">
          <a href="javascript:void(0);" class="img-link">
            <img
              :src="file.thumbnail_file || previewImage"
              alt="Folder Icon"
              @error="errorHandle"
            />
          </a>
        </div>
        <div class="top-column">
          <div class="rename-text">
            <component
              :is="assetNoClick ? 'a' : 'nuxt-link'"
              class="resource-title"
              style="cursor: inherit"
              :to="{
                name: 'workspace_id-dam-files-id',
                params: {
                  workspace_id: workspaceId,
                  id: file.id,
                  came_from_hash: hashParam,
                  is_coming_from_home: fromHome,
                },
              }"
              :style="assetNoClick ? '' : 'cursor: pointer !important'"
            >
              <span v-if="mode == 'columnView'">
                {{ file.display_file_name | shrinkString(35, 12) }}
              </span>
            </component>
          </div>
          <div class="rename-input">
            <input
              ref="renameInput"
              v-model="fileName"
              type="text"
              name="folder-name"
              class="form-control"
              :disabled="!!(renameActive && renaming)"
              @keyup.enter="changeFileName"
              @keyup.esc="
                () => {
                  renameActive = 0
                  fileName = oldName
                }
              "
              @blur="changeFileName"
            />
          </div>
        </div>
      </div>
      <div
        class="action tb-column"
        :style="canShowLock ? 'flex:1;max-width: 60px' : ''"
      >
        <div class="top-column">
          <div
            class="categary-actions"
            :style="canShowLock ? 'align-items: center' : ''"
          >
            <svg
              v-if="canShowLock"
              id="_x31__x2C_5"
              v-tooltip="`For internal use only`"
              aria-describedby="tooltip348527"
              class="locked-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <path
                class="fill-color"
                d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
              ></path>
              <path
                class="fill-color"
                d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
              ></path>
              <path
                class="fill-color"
                d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
              ></path>
              <path
                class="fill-color"
                d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
              ></path>
            </svg>
            <div class="dropdown" :class="{ show: dropDownList }">
              <a
                class="dropdown-toggle"
                data-toggle="dropdown"
                @click.capture.stop="dropDown()"
              >
                <svg
                  id="Layer_1"
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
              </a>
              <ul class="dropdown-menu" :class="{ show: dropDownList }">
                <!-- move -->
                <li
                  v-if="
                    !trashMode &&
                    !($route.hash.replace('#', '') === 'archive') &&
                    !(isCollection > -1)
                  "
                >
                  <a
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#move"
                    @click.capture.stop="selectFromDrop(file, 'move')"
                    ><span class="dropdown-item-icon">
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
                      </svg> </span
                    >Move</a
                  >
                </li>
                <!-- copy -->
                <li
                  v-if="
                    !noView &&
                    !trashMode &&
                    !($route.hash.replace('#', '') === 'archive') &&
                    !(isCollection > -1)
                  "
                  v-tooltip="
                    storageFull
                      ? 'You have consumed all of your storage quota.'
                      : ''
                  "
                  :style="storageFull ? 'opacity:0.4;cursor:default' : ''"
                >
                  <a
                    class="dropdown-item"
                    :style="storageFull ? 'cursor:default' : ''"
                    @click.capture.stop="
                      storageFull ? null : selectFromDrop(file, 'copy')
                    "
                    ><span class="dropdown-item-icon">
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
                        />
                      </svg> </span
                    >Copy</a
                  >
                </li>
                <!-- share -->
                <li v-if="!noView && !trashMode">
                  <a
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#sharePopup"
                    @click.capture.stop="selectFromDrop(file, 'share')"
                    ><span class="dropdown-item-icon">
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
                        <g id="Group_4473" transform="translate(-871 -230)">
                          <rect
                            id="Rectangle_3012"
                            x="871"
                            y="230"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <path
                            id="Icon_open-share"
                            class="fill-color"
                            d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                          ></path>
                        </g>
                      </svg> </span
                    >Share</a
                  >
                </li>
                <!-- download -->
                <li v-if="!trashMode">
                  <a
                    class="dropdown-item"
                    @click.capture.stop="selectFromDrop(file, 'download')"
                    ><span class="dropdown-item-icon">
                      <svg
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
                          ></path>
                          <path
                            id="Path_3428"
                            class="fill-color"
                            d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                          ></path>
                          <path
                            id="Path_3429"
                            class="fill-color"
                            d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                          ></path>
                        </g>
                      </svg> </span
                    >Download</a
                  >
                </li>
                <!-- delete -->
                <li>
                  <a
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#delete"
                    @click.capture.stop="selectFromDrop(file, 'delete')"
                    ><span class="dropdown-item-icon">
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
                      </svg> </span
                    >{{
                      isCollection > -1 ? 'Remove from Collection' : 'Delete'
                    }}</a
                  >
                </li>
                <!-- rename -->
                <li v-if="!trashMode">
                  <a
                    class="dropdown-item rename-link"
                    @click.capture.stop="onRenameClick"
                    ><span class="dropdown-item-icon">
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
                            />
                          </g>
                          <g id="Group_4350">
                            <path
                              id="Path_3409"
                              class="fill-color"
                              d="M657.8,948.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l9.3-9.3c1-1,2.6-1,3.6,0s1,2.6,0,3.6l-9.3,9.3c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C657.9,948.1,657.9,948.1,657.8,948.1zM669.2,935.1c-0.3,0-0.5,0.1-0.7,0.3l-9.2,9.2l-0.4,1.8l1.8-0.4l9.1-9.1c0.4-0.4,0.4-1,0-1.3C669.7,935.2,669.4,935.1,669.2,935.1L669.2,935.1z"
                            />
                          </g>
                        </g>
                      </svg> </span
                    >Rename</a
                  >
                </li>
                <!-- restore -->
                <li v-if="trashMode">
                  <a
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#restore"
                    @click.capture.stop="selectFromDrop(file, 'restore')"
                    ><span class="dropdown-item-icon"
                      ><svg
                        id="Layer_1"
                        class="restore-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 19.4 15"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_1436"
                          transform="translate(-633.85 -1416.75)"
                        >
                          <path
                            id="Path_2902"
                            class="st0"
                            d="M639.4,1421.6l4.1-4.1l4.1,4.1"
                          />
                          <line
                            id="Line_287"
                            class="st1"
                            x1="643.5"
                            y1="1417.5"
                            x2="643.5"
                            y2="1426.5"
                          />
                          <path
                            id="Path_2903"
                            class="st1"
                            d="M652.5,1426.2L652.5,1426.2c0,2.7-2.1,4.8-4.8,4.8c0,0,0,0,0,0h-8.3c-2.7,0-4.8-2.1-4.8-4.8l0,0l0,0"
                          />
                        </g></svg></span
                    >Restore</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- end of panel view of resource -->
    <template v-else>
      <div
        class="preview-img tb-column flex10"
        style="transform: none"
        :class="[
          mode === 'columnView' ? 'mode-panalview' : `mode-${mode}`,
          {
            selected,
            video: !!(isVideo && file.video_preview),
            image: isImage || !!(isVideo && !file.video_preview),
          },
        ]"
      >
        <label
          v-if="!shareLinkHideDownload"
          class="check-label"
          :for="`file-` + file.id"
          @click.capture.stop
        >
          <input
            :id="`file-` + file.id"
            :checked="selected"
            type="checkbox"
            :disabled="deleting || deletingModel || downloading"
            @input="
              !(deleting || deletingModel || downloading) &&
                $emit('click:selected', file)
            "
          />
          <span class="check-span"></span>
        </label>
        <nuxt-link
          v-slot="{ navigate }"
          :event="assetNoClick ? '' : 'click'"
          :to="
            assetNoClick
              ? '#'
              : {
                  name: 'workspace_id-dam-files-id',
                  params: {
                    workspace_id: workspaceId,
                    id: file.id,
                    came_from_hash: hashParam,
                    is_coming_from_home: fromHome,
                  },
                }
          "
        >
          <div
            class="categary-image"
            v-on="{
              ...(assetNoClick
                ? {}
                : {
                    click: navigate,
                  }),
            }"
          >
            <!-- video -->
            <template v-if="isVideo">
              <a
                :class="{ 'no-image': videoThumbnail == previewImage }"
                class="img-link"
              >
                <div :class="{ icons: !__image_thumb }">
                  <img
                    class="preview-images preview"
                    style="object-fit: contain !important"
                    :src="__image_thumb || __thumb"
                    @load="imageLoading = false"
                  />
                </div>
                <video
                  v-if="file.video_preview"
                  ref="video"
                  class="thevideo"
                  :src="file.video_preview"
                  style="width: auto; height: 100%; object-fit: contain"
                  muted
                  loop
                  preload="metadata"
                  disablepictureinpicture
                >
                  Your browser does not support the video tag.
                </video>
              </a>
            </template>
            <!-- doc -->
            <div
              v-else-if="isDoc"
              :class="{ 'no-image': !isImage }"
              class="img-link"
            >
              <div :class="{ icons: !__image_thumb }">
                <img
                  class="dam-image-preview"
                  :src="previewImage"
                  :style="mode == 'list' ? { objectFit: 'contain' } : {}"
                  @load="imageLoading = false"
                  @error="errorHandle"
                />
              </div>
            </div>
            <!-- pdf -->
            <div
              v-else-if="isPdf"
              :class="{ 'no-image': !isImage }"
              class="img-link"
            >
              <div :class="{ icons: !__image_thumb }">
                <img
                  class="dam-image-preview"
                  :src="previewImage"
                  :style="mode == 'list' ? { objectFit: 'contain' } : {}"
                  @load="imageLoading = false"
                  @error="errorHandle"
                />
              </div>
            </div>
            <!-- txt -->
            <div
              v-else-if="isTxt"
              :class="{ 'no-image': !isImage }"
              class="img-link"
            >
              <div :class="{ icons: !__image_thumb }">
                <img
                  class="dam-image-preview"
                  :src="previewImage"
                  :style="mode == 'list' ? { objectFit: 'contain' } : {}"
                  @load="imageLoading = false"
                  @error="errorHandle"
                />
              </div>
            </div>
            <!-- html -->
            <div
              v-else-if="isHtml"
              :class="{ 'no-image': !isImage }"
              class="img-link"
            >
              <div :class="{ icons: !__image_thumb }">
                <img
                  class="dam-image-preview"
                  :src="previewImage"
                  :style="mode == 'list' ? { objectFit: 'contain' } : {}"
                  @load="imageLoading = false"
                  @error="errorHandle"
                />
              </div>
            </div>
            <!-- Audio -->
            <!--            <div v-else-if="isAudio" class="img-link">
              <div class="icons">
                <img
                  :src="__thumb"
                  @load="imageLoading = false"
                  @error="errorHandle"
                />
              </div>
            </div>-->
            <div v-else :class="{ 'no-image': !isImage }" class="img-link">
              <div :class="{ icons: !isImage ? true : !__image_thumb }">
                <img
                  class="dam-image-preview"
                  :src="
                    isAudio
                      ? previewImage
                      : file.thumbnail_file || __image_thumb || __thumb
                  "
                  :style="mode == 'list' ? { objectFit: 'contain' } : {}"
                  @load="imageLoading = false"
                  @error="errorHandle"
                />
              </div>
            </div>
            <client-only>
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  overflow: hidden;
                  border-radius: 4px 4px 0px 0px;
                "
              >
                <ContentLoader
                  v-if="imageLoading || (isVideo && videoThumbnailFetching)"
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                  "
                  :speed="1"
                  :width="100"
                  :height="100"
                  :animate="true"
                  class="normalLoader"
                >
                  <rect x="0" y="0" rx="0" ry="0" width="100" height="100" />
                </ContentLoader>
              </div>
            </client-only>
            <div
              v-if="file.asset_product && orderManagementAllowed"
              class="product-tag"
            >
              <svg
                id="Layer_1"
                class="product-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <path
                    class="fill-color"
                    d="M510,208.7l-47.9-75.6c-1.3-2.1-3.3-3.8-5.5-4.9l-194.8-92c-3.6-1.7-7.8-1.7-11.4,0.1l-195.2,96c-2,1-3.9,2.6-5.1,4.5L2.1,208.4c-4.1,6.2-2.1,15,4.4,18.7l41.3,23.6V361c0,4.9,2.7,9.3,7,11.6l195,102.9c3.9,2,8.6,2,12.4-0.1l195-107c6.4-3.5,8.7-11.5,5.2-17.8c-3.5-6.4-11.5-8.7-17.8-5.2l-175.6,96.3V284.5l35.6,44.6c3.9,4.9,11.3,6.3,16.8,3.2l184-105.2C511.8,223.5,514,214.9,510,208.7L510,208.7z M256.2,62.7L422.1,141l-166.2,91.1l-166-87.6L256.2,62.7z M65.3,161.2l170.5,90L193.8,304l-162-92.7L65.3,161.2z M74.1,353.1v-87.3l116.4,66.6c5.5,3.1,12.9,1.7,16.8-3.2l35.6-44.6v157.6L74.1,353.1z M318.2,304L276,251l170.5-93.4l34,53.6L318.2,304z"
                  ></path>
                  <circle
                    class="fill-color"
                    cx="451"
                    cy="306.1"
                    r="15.3"
                  ></circle>
                </g>
              </svg>
            </div>
            <div class="video-info">
              <div class="upper-info">
                <div class="tags">
                  <span style="cursor: default" @click.capture.stop>{{
                    file.file_type || '&dash;'
                  }}</span>
                  <span v-if="file.asset_product && orderManagementAllowed"
                    >Product</span
                  >
                </div>

                <div class="d-flex align-items-center">
                  <AddToCollectionButton
                    v-if="!(isCollection > -1) && !trashMode && !noView"
                    :file="file"
                    @saveCollection="$refs.saveCollectionDialog.show()"
                  />
                  <div
                    class="dropdown more-options"
                    :class="{ show: dropDownList }"
                  >
                    <button
                      type="button"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      @click.capture.stop="dropDown()"
                    >
                      <svg
                        id="Layer_1"
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
                    </button>
                    <ul class="dropdown-menu" :class="{ show: dropDownList }">
                      <!-- download -->
                      <li v-if="!trashMode">
                        <a
                          class="dropdown-item"
                          @click.capture.stop="selectFromDrop(file, 'download')"
                          ><span class="dropdown-item-icon">
                            <svg
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
                                ></path>
                                <path
                                  id="Path_3428"
                                  class="fill-color"
                                  d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                                ></path>
                                <path
                                  id="Path_3429"
                                  class="fill-color"
                                  d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                                ></path>
                              </g>
                            </svg> </span
                          >Download</a
                        >
                      </li>
                      <!-- share -->
                      <li
                        v-if="
                          !noView &&
                          !trashMode &&
                          !($route.hash.replace('#', '') === 'archive')
                        "
                      >
                        <a
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#sharePopup"
                          @click.capture.stop="selectFromDrop(file, 'share')"
                          ><span class="dropdown-item-icon">
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
                                ></rect>
                                <path
                                  id="Icon_open-share"
                                  class="fill-color"
                                  d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                                ></path>
                              </g>
                            </svg> </span
                          >Share</a
                        >
                      </li>
                      <!-- copy -->
                      <li
                        v-if="
                          !noView &&
                          !trashMode &&
                          !($route.hash.replace('#', '') === 'archive') &&
                          !(isCollection > -1)
                        "
                        v-tooltip="
                          storageFull
                            ? 'You have consumed all of your storage quota.'
                            : ''
                        "
                        :style="storageFull ? 'opacity:0.4;cursor:default' : ''"
                      >
                        <a
                          class="dropdown-item"
                          :style="storageFull ? 'cursor:default' : ''"
                          @click.capture.stop="
                            storageFull ? null : selectFromDrop(file, 'copy')
                          "
                          ><span class="dropdown-item-icon">
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
                              />
                            </svg> </span
                          >Copy</a
                        >
                      </li>
                      <li
                        v-if="
                          !trashMode &&
                          !($route.hash.replace('#', '') === 'archive') &&
                          !(isCollection > -1)
                        "
                      >
                        <a
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#move"
                          @click.capture.stop="selectFromDrop(file, 'move')"
                          ><span class="dropdown-item-icon">
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
                            </svg> </span
                          >Move</a
                        >
                      </li>
                      <!-- rename -->
                      <li v-if="!trashMode">
                        <a
                          class="dropdown-item rename-link"
                          @click.capture.stop="onRenameClick"
                          ><span class="dropdown-item-icon">
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
                                  />
                                </g>
                                <g id="Group_4350">
                                  <path
                                    id="Path_3409"
                                    class="fill-color"
                                    d="M657.8,948.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l9.3-9.3c1-1,2.6-1,3.6,0s1,2.6,0,3.6l-9.3,9.3c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C657.9,948.1,657.9,948.1,657.8,948.1zM669.2,935.1c-0.3,0-0.5,0.1-0.7,0.3l-9.2,9.2l-0.4,1.8l1.8-0.4l9.1-9.1c0.4-0.4,0.4-1,0-1.3C669.7,935.2,669.4,935.1,669.2,935.1L669.2,935.1z"
                                  />
                                </g>
                              </g>
                            </svg> </span
                          >Rename</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#delete"
                          @click.capture.stop="selectFromDrop(file, 'delete')"
                          ><span class="dropdown-item-icon">
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
                            </svg> </span
                          >{{
                            isCollection > -1
                              ? 'Remove from Collection'
                              : 'Delete'
                          }}</a
                        >
                      </li>
                      <li v-if="trashMode">
                        <a
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#restore"
                          @click.capture.stop="selectFromDrop(file, 'restore')"
                          ><span class="dropdown-item-icon"
                            ><svg
                              id="Layer_1"
                              class="restore-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 19.4 15"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_1436"
                                transform="translate(-633.85 -1416.75)"
                              >
                                <path
                                  id="Path_2902"
                                  class="st0"
                                  d="M639.4,1421.6l4.1-4.1l4.1,4.1"
                                />
                                <line
                                  id="Line_287"
                                  class="st1"
                                  x1="643.5"
                                  y1="1417.5"
                                  x2="643.5"
                                  y2="1426.5"
                                />
                                <path
                                  id="Path_2903"
                                  class="st1"
                                  d="M652.5,1426.2L652.5,1426.2c0,2.7-2.1,4.8-4.8,4.8c0,0,0,0,0,0h-8.3c-2.7,0-4.8-2.1-4.8-4.8l0,0l0,0"
                                />
                              </g></svg></span
                          >Restore</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <template v-if="isVideo && file.video_preview">
                <a
                  ref="expandButton"
                  :href="`#file-video-${file.id}`"
                  data-fancybox
                >
                </a>
                <video
                  v-if="file.video_preview"
                  :id="`file-video-${file.id}`"
                  ref="galleryVideo"
                  width="640"
                  height="320"
                  controlsList="nodownload"
                  controls
                  :data-id="`file-${file.id}`"
                  style="display: none"
                  disablepictureinpicture
                >
                  <source :src="file.video_preview" type="video/mp4" />
                  Your browser doesn't support HTML5 video tag.
                </video>
              </template>
              <a
                v-else-if="__compressed_preview || __image_thumb"
                ref="expandButton"
                style="display: none"
                data-fancybox="image-preview"
                data-width="auto"
                data-height="auto"
                :data-href="
                  file.watermark_file || __compressed_preview || __image_thumb
                "
                :href="
                  file.watermark_file || __compressed_preview || __image_thumb
                "
              >
              </a>
              <div v-if="mode == 'tile' && !trashMode" class="down-info">
                <template v-if="!noView">
                  <template v-if="(isVideo && file.video_preview) || isImage">
                    <a v-if="isVideo" @click.capture.stop="toggleVideoPlay()">
                      <svg
                        v-if="paused"
                        id="Layer_1"
                        class="play-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        xml:space="preserve"
                      >
                        <path
                          id="Icon_material-play-circle-outline"
                          class="fill-color"
                          d="M8,14.5l6-4.5L8,5.5V14.5z M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8C18,14.4,14.4,18,10,18z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        id="Layer_1"
                        class="pause-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 20 20"
                        xml:space="preserve"
                      >
                        <path
                          id="Icon_material-play-circle-outline"
                          class="fill-color"
                          d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S14.4,18,10,18z M13,13H7V7h6V13z"
                        />
                      </svg>
                    </a>
                    <a v-else> </a>
                    <a
                      v-if="__compressed_preview || __image_thumb"
                      @click.capture.stop="onExpandAssetsCount()"
                    >
                      <svg
                        id="Layer_1"
                        class="expand-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 16 16"
                        xml:space="preserve"
                      >
                        <path
                          id="Icon_awesome-expand"
                          class="fill-color"
                          d="M0,5.3V0.9C0,0.4,0.4,0,0.9,0c0,0,0,0,0,0h4.4c0.2,0,0.4,0.2,0.4,0.4v1.4c0,0.2-0.2,0.4-0.4,0.4h-3v3c0,0.2-0.2,0.4-0.4,0.4H0.4C0.2,5.7,0,5.5,0,5.3z M10.3,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h3v3c0,0.2,0.2,0.4,0.4,0.4h1.4c0.2,0,0.4-0.2,0.4-0.4V0.9C16,0.4,15.6,0,15.1,0c0,0,0,0,0,0h-4.4C10.5,0,10.3,0.2,10.3,0.4z M15.6,10.3h-1.4c-0.2,0-0.4,0.2-0.4,0.4v3h-3c-0.2,0-0.4,0.2-0.4,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h4.4c0.5,0,0.9-0.4,0.9-0.9c0,0,0,0,0,0v-4.4C16,10.5,15.8,10.3,15.6,10.3L15.6,10.3z M5.7,15.6v-1.4c0-0.2-0.2-0.4-0.4-0.4h-3v-3c0-0.2-0.2-0.4-0.4-0.4H0.4c-0.2,0-0.4,0.2-0.4,0.4v4.4C0,15.6,0.4,16,0.9,16c0,0,0,0,0,0h4.4C5.5,16,5.7,15.8,5.7,15.6z"
                        />
                      </svg>
                    </a>
                    <nuxt-link
                      v-else
                      class="btn btn-gray-invert"
                      :to="{
                        name: 'workspace_id-dam-files-id',
                        params: {
                          workspace_id: workspaceId,
                          id: file.id,
                          came_from_hash: hashParam,
                          is_coming_from_home: fromHome,
                        },
                      }"
                    >
                      View
                    </nuxt-link>
                  </template>
                  <template v-else>
                    <a> </a>

                    <nuxt-link
                      class="btn btn-gray-invert"
                      :to="{
                        name: 'workspace_id-dam-files-id',
                        params: {
                          workspace_id: workspaceId,
                          id: file.id,
                          came_from_hash: hashParam,
                          is_coming_from_home: fromHome,
                        },
                      }"
                    >
                      View
                    </nuxt-link>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="categary-name tb-column flex27">
        <div class="top-column">
          <div
            v-if="canShowLock"
            v-tooltip="'For internal use only'"
            class="permissionIcon"
          >
            <svg
              id="_x31__x2C_5"
              class="locked-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <path
                class="fill-color"
                d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
              ></path>
              <path
                class="fill-color"
                d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
              ></path>
              <path
                class="fill-color"
                d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
              ></path>
              <path
                class="fill-color"
                d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
              ></path>
            </svg>
          </div>
          <div class="rename-text">
            <component
              :is="assetNoClick ? 'a' : 'nuxt-link'"
              v-tooltip="{
                html: false,
                content: file.display_file_name,
              }"
              class="resource-title"
              style="cursor: inherit"
              :to="{
                name: 'workspace_id-dam-files-id',
                params: {
                  workspace_id: workspaceId,
                  id: file.id,
                  came_from_hash: hashParam,
                  is_coming_from_home: fromHome,
                },
              }"
              :style="assetNoClick ? '' : 'cursor: pointer !important'"
            >
              <span v-if="mode == 'list'">
                {{ file.display_file_name | shrinkString(35, 12) }}
              </span>
              <span v-else> {{ file.display_file_name }} </span>
            </component>
          </div>
          <div class="rename-input">
            <input
              ref="renameInput"
              v-model="fileName"
              type="text"
              name="folder-name"
              class="form-control"
              :disabled="!!(renameActive && renaming)"
              @keyup.enter="changeFileName"
              @keyup.esc="
                () => {
                  renameActive = 0
                  fileName = oldName
                }
              "
              @blur="changeFileName"
            />
          </div>
        </div>
      </div>
      <div
        class="assets tb-column"
        :class="hashParam === 'archive' ? 'flex10' : 'flex18'"
      >
        <div class="top-column">
          <div class="tags">
            <span :inner-html.prop="file.file_type || '&dash;'"></span>
            <span v-if="file.asset_product && orderManagementAllowed"
              >Product</span
            >
          </div>
        </div>
      </div>
      <div
        class="update-date tb-column"
        :class="hashParam === 'archive' ? 'flex13' : 'flex18'"
      >
        <div class="top-column">
          <label>
            {{ $moment(file.updated_at).format('Do MMM, YYYY') }}
          </label>
        </div>
      </div>
      <div
        class="size tb-column"
        :class="hashParam === 'archive' ? 'flex10' : 'flex12'"
      >
        <div class="top-column">
          <label>
            {{ $toHumanlySize(file.file_size) }}
          </label>
        </div>
      </div>
      <div v-if="hashParam === 'archive'" class="size tb-column flex15">
        <div v-tooltip="(file.archive_user || {}).text" class="media">
          <div class="media-left pr-0">
            <div
              v-if="userImage"
              class="profile-bg"
              :style="{
                backgroundImage: `url(${userImage})`,
              }"
            ></div>
            <div
              v-else-if="((file.archive_user || {}).text || '').length"
              :class="[
                'profile-char',
                'fl-as-imgtxt',
                file.archive_user.text.charAt(0),
              ]"
            >
              {{ file.archive_user.text.charAt(0) }}
            </div>
          </div>
          <div class="media-body" style="overflow: hidden">
            <label
              :style="{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                overflow: 'hidden',
              }"
              >{{ (file.archive_user || {}).text || '-' }}</label
            >
          </div>
        </div>
      </div>

      <div v-if="!deleting" class="categary-action tb-column flex15">
        <div class="top-column">
          <div class="categary-actions">
            <template v-if="trashMode">
              <template v-if="mode == 'list'">
                <a
                  v-tooltip="`Restore File`"
                  title="Restore File"
                  class="pt-2 px-2"
                  @click.capture.stop="$refs.restoreDialog.show()"
                >
                  <svg
                    id="Layer_1"
                    class="restore-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 19.4 15"
                    xml:space="preserve"
                  >
                    <g id="Group_1436" transform="translate(-633.85 -1416.75)">
                      <path
                        id="Path_2902"
                        class="st0"
                        d="M639.4,1421.6l4.1-4.1l4.1,4.1"
                      />
                      <line
                        id="Line_287"
                        class="st1"
                        x1="643.5"
                        y1="1417.5"
                        x2="643.5"
                        y2="1426.5"
                      />
                      <path
                        id="Path_2903"
                        class="st1"
                        d="M652.5,1426.2L652.5,1426.2c0,2.7-2.1,4.8-4.8,4.8c0,0,0,0,0,0h-8.3c-2.7,0-4.8-2.1-4.8-4.8l0,0l0,0"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  v-tooltip="`Permanently delete file`"
                  title="Permanently delete file"
                  @click.capture.stop="$refs.deleteDialog.show()"
                >
                  <BinIcon />
                </a>
              </template>
            </template>
            <a
              v-else-if="shareMode && !shareLinkHideDownload"
              class="action-btn download-link"
              @click.capture.stop="downloadSharedFile"
            >
              <DownloadIcon />
            </a>
            <template v-else-if="shareMode && shareLinkHideDownload">
              &nbsp;
            </template>
            <template v-else>
              <template v-if="!noView">
                <a
                  v-if="canShowLock"
                  v-tooltip="`For internal use only`"
                  href="javascript:void(0);"
                  aria-describedby="tooltip348527"
                >
                  <svg
                    id="_x31__x2C_5"
                    class="locked-icon h-orange"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    xml:space="preserve"
                  >
                    <path
                      class="fill-color"
                      d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
                    ></path>
                    <path
                      class="fill-color"
                      d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
                    ></path>
                    <path
                      class="fill-color"
                      d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
                    ></path>
                    <path
                      class="fill-color"
                      d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
                    ></path>
                  </svg>
                </a>
                <a
                  v-if="$route.hash.replace('#', '') !== 'archive'"
                  class="share-it action-btn"
                  @click.capture.stop="$refs.shareDialog.show()"
                >
                  <ShareIcon />
                </a>
                <div class="dropdown">
                  <a
                    href="javascript:void(0);"
                    class="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <svg
                      id="Layer_1"
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
                  </a>
                  <ul class="dropdown-menu">
                    <!-- download -->
                    <li v-if="!trashMode">
                      <a
                        class="dropdown-item"
                        @click.capture.stop="selectFromDrop(file, 'download')"
                        ><span class="dropdown-item-icon">
                          <svg
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
                              ></path>
                              <path
                                id="Path_3428"
                                class="fill-color"
                                d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                              ></path>
                              <path
                                id="Path_3429"
                                class="fill-color"
                                d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                              ></path>
                            </g>
                          </svg> </span
                        >Download</a
                      >
                    </li>
                    <!-- copy -->
                    <li
                      v-if="
                        !noView &&
                        !trashMode &&
                        !($route.hash.replace('#', '') === 'archive') &&
                        !(isCollection > -1)
                      "
                      v-tooltip="
                        storageFull
                          ? 'You have consumed all of your storage quota.'
                          : ''
                      "
                      :style="storageFull ? 'opacity:0.4;cursor:default' : ''"
                    >
                      <a
                        class="dropdown-item"
                        :style="storageFull ? 'cursor:default' : ''"
                        @click.capture.stop="
                          storageFull ? null : selectFromDrop(file, 'copy')
                        "
                        ><span class="dropdown-item-icon">
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
                            />
                          </svg> </span
                        >Copy</a
                      >
                    </li>
                    <!-- move -->
                    <li
                      v-if="
                        !trashMode &&
                        !($route.hash.replace('#', '') === 'archive') &&
                        !(isCollection > -1)
                      "
                    >
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#move"
                        @click.capture.stop="selectFromDrop(file, 'move')"
                        ><span class="dropdown-item-icon">
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
                          </svg> </span
                        >Move</a
                      >
                    </li>
                    <!-- rename -->
                    <li v-if="!trashMode">
                      <a
                        class="dropdown-item rename-link"
                        @click.capture.stop="onRenameClick"
                        ><span class="dropdown-item-icon">
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
                                />
                              </g>
                              <g id="Group_4350">
                                <path
                                  id="Path_3409"
                                  class="fill-color"
                                  d="M657.8,948.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l9.3-9.3c1-1,2.6-1,3.6,0s1,2.6,0,3.6l-9.3,9.3c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C657.9,948.1,657.9,948.1,657.8,948.1zM669.2,935.1c-0.3,0-0.5,0.1-0.7,0.3l-9.2,9.2l-0.4,1.8l1.8-0.4l9.1-9.1c0.4-0.4,0.4-1,0-1.3C669.7,935.2,669.4,935.1,669.2,935.1L669.2,935.1z"
                                />
                              </g>
                            </g>
                          </svg> </span
                        >Rename</a
                      >
                    </li>
                    <!-- delete -->
                    <li>
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#delete"
                        @click.capture.stop="selectFromDrop(file, 'delete')"
                        ><span class="dropdown-item-icon">
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
                          </svg> </span
                        >{{
                          isCollection > -1
                            ? 'Remove from Collection'
                            : 'Delete'
                        }}</a
                      >
                    </li>

                    <!-- restore -->
                    <li v-if="trashMode">
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#restore"
                        @click.capture.stop="selectFromDrop(file, 'restore')"
                        ><span class="dropdown-item-icon"
                          ><svg
                            id="Layer_1"
                            class="restore-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 19.4 15"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_1436"
                              transform="translate(-633.85 -1416.75)"
                            >
                              <path
                                id="Path_2902"
                                class="st0"
                                d="M639.4,1421.6l4.1-4.1l4.1,4.1"
                              />
                              <line
                                id="Line_287"
                                class="st1"
                                x1="643.5"
                                y1="1417.5"
                                x2="643.5"
                                y2="1426.5"
                              />
                              <path
                                id="Path_2903"
                                class="st1"
                                d="M652.5,1426.2L652.5,1426.2c0,2.7-2.1,4.8-4.8,4.8c0,0,0,0,0,0h-8.3c-2.7,0-4.8-2.1-4.8-4.8l0,0l0,0"
                              />
                            </g></svg></span
                        >Restore</a
                      >
                    </li>
                  </ul>
                </div>
              </template>
              <a
                v-else
                class="action-btn download-link"
                @click.capture.stop="downloadFile"
              >
                <DownloadIcon />
              </a>
            </template>
          </div>
        </div>
      </div>
    </template>
    <client-only>
      <template v-if="trashMode">
        <DeleteDialog ref="restoreDialog" @button:yes="restoreFile">
          Are you sure you want to restore
          <b>{{ file.display_file_name }} </b>?
        </DeleteDialog>
        <DeleteDialog ref="deleteDialog" @button:yes="deleteFile">
          Are you sure you want to delete
          <b>{{ file.display_file_name }} </b>?
        </DeleteDialog>
      </template>
      <template v-else>
        <DeleteDialog ref="deleteDialog" @button:yes="deleteFile(false)">
          Are you sure you want to delete
          <b>{{ file.display_file_name }} </b>?
        </DeleteDialog>
        <ShareAssetDialog
          v-if="currentRoute == 'workspace_id-dam-collection-id'"
          ref="shareDialog"
          :files="[file]"
          collection-assets
          :collection-assets-id="$route.params.id"
          type="folder"
        />
        <ShareAssetDialog
          v-if="currentRoute != 'workspace_id-dam-collection-id'"
          ref="shareDialog"
          :files="[file]"
          type="folder"
        />
        <SaveToCollection ref="saveCollectionDialog" :file="file" />
      </template>
    </client-only>
  </li>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import fileType from '~/mixins/fileType'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import ShareAssetDialog from '~/components/dam/Dialogs/ShareAssetDialog'
import SaveToCollection from '~/components/dam/Dialogs/SaveToCollection'
import AddToCollectionButton from '~/components/dam/AssetList/AddToCollectionButton'

export default {
  components: {
    DeleteDialog,
    ShareAssetDialog,
    ContentLoader,
    SaveToCollection,
    AddToCollectionButton,
  },
  mixins: [fileType],
  props: {
    file: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
    shareMode: { type: Boolean, default: false },
    trashMode: { type: Boolean, default: false },
    noView: { type: Boolean, default: false },
    fromHome: { type: Boolean, default: false },
    deleting: { type: Boolean, default: false },
    mode: { type: String, default: 'list' },
    shareId: { type: Number, default: 0 },
    shareWorkspaceId: { type: String, required: false, default: null },
    shareLinkHideDownload: { type: Boolean, default: false },
  },
  data() {
    return {
      deletingModel: false,
      paused: false,
      imageLoading: false,
      videoThumbnail: this.__image_thumb || this.__thumb || '',
      videoThumbnailAdded: false,
      videoError: false,
      videoThumbnailFetching: false,
      dropDownList: false,
      defaultCollection: false,
      loading: false,
      galleryMode: 0,
      display_file: null,
      fileName: this.file.display_file_name.replace(
        `.${this.file.file_type}`,
        ''
      ),
      oldName: this.file.display_file_name.replace(
        `.${this.file.file_type}`,
        ''
      ),
      renameActive: 0,
      renaming: 0,
    }
  },
  computed: {
    orderManagementAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_order_management
        ?.enable
    },
    userImage() {
      const user = this.file.archive_user || {}
      return (
        user.display_thumb_profile_image ||
        user.display_profile_image ||
        user.profile_image
      )
    },
    canShowLock() {
      if (this.mode === 'tile') {
        return !this.file.is_public && !this.renameActive
      }
      return !this.file.is_public
    },
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    filePreview() {
      let x = null
      if (this.file.file_preview_id) {
        if (
          this.file.file_preview_status === 'pending' ||
          this.file.file_preview_status === 'started'
        ) {
          x = true
        } else {
          x = false
        }
      } else if (this.isImage) {
        x = false
      } else if (this.isTxt || this.isPdf || this.isDoc) {
        x = true
      }
      return x
    },
    isCollection() {
      return this.$route.name.search('collection')
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    assetNoClick() {
      return this.selected || this.shareMode || this.trashMode || this.noView
    },
    disableAllButton() {
      return this.deletingModel
    },
    downloading() {
      const item = this.$store.state.dam.downloadingItems
      return !!item && item.downloading
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
    currentRoute() {
      return this.$route.name
    },
  },
  watch: {
    galleryMode(n) {
      if (!n || this.display_file) return
      this.$axios
        .$get(`digital-assets/asset-preview?digital_assets_id=${this.file.id}`)
        .then(({ data }) => {
          this.display_file = data.display_file
          const video = this.$refs.galleryVideo
          if (!video) return
          const currentTime = video.currentTime
          const paused = video.paused
          video.querySelector('source').src = this.display_file
          video.load()
          setTimeout(() => {
            video.currentTime = currentTime
            if (!paused) video.play()
          }, 250)
        })
    },
  },
  mounted() {
    this.$bus.$on('closeDropDown', () => {
      if (this.dropDownList === true) {
        this.dropDownList = false
      }
    })

    this.$nextTick(() => {
      this.imageLoading = this.isImage
      if (this.isVideo) {
        window
          .$(this.$el)
          .find('[data-fancybox]')
          .fancybox({
            video: {
              tpl:
                `<video disablepictureinpicture class="fancybox-video" data-id="file-${this.file.id}" controlsList="nodownload" controls >` +
                '<source src="{{src}}"  />' +
                'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
                '</video>',
              autoStart: true,
            },
            buttons: ['close'],
          })
      } else if (this.isImage) {
        window
          .$(this.$el)
          .find('[data-fancybox]')
          .fancybox({
            protect: true,
            buttons: ['close'],
          })
      }
    })
  },
  methods: {
    onExpandAssetsCount() {
      this.$refs.expandButton.click()
      if (!this.galleryMode) {
        this.galleryMode = 1
      }
      this.viewAssetsCount()
    },
    onRenameClick() {
      this.renameActive = 1
      this.$nextTick(() => {
        this.$refs.renameInput.click()
        this.$refs.renameInput.focus()
      })
    },
    toggleVideoPlay() {
      this.paused = !this.paused
      if (this.paused) this.$refs.video.pause()
      else this.$refs.video.play()
    },
    errorHandle(data) {
      try {
        data.target.src = require(`~/assets/img/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        data.target.src = require(`~/assets/img/file/general.svg`)
      }
      if (this.mode !== 'columnView') {
        data.target.parentElement.classList.add('icons')
      }
    },
    selectFromDrop(file, type) {
      this.dropDown()
      if (type === 'share') {
        this.$refs.shareDialog.show()
      }
      if (type === 'copy' && this.storageFull) return
      this.$emit('selectedDrop', file, type, 'file')
    },
    dropDown() {
      this.dropDownList = !this.dropDownList
    },
    pauseVideo() {
      const video = this.$refs.video
      if (!video) return
      this.$suppressError(() => {
        video.pause()
      })
    },
    playVideo() {
      if (this.paused || this.videoError) return

      const video = this.$refs.video
      if (!video) return
      this.$suppressError(() => {
        video.play()
      })
    },
    async viewAssetsCount() {
      await this.$axios
        .$post('digital-assets/view-asset-count', {
          workspace_id: this.$getWorkspaceId(),
          asset_id: this.file.id,
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    async restoreFile() {
      await this.$axios
        .$post('digital-assets/category/restore-deleted-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: [this.file.id],
          category_ids: [],
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.$emit('removeMe', this.file)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    async changeFileName() {
      const fileName = this.fileName.trim()

      if (!fileName) {
        this.fileName = this.oldName
        return
      }

      if (fileName === this.oldName) {
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
          this.oldName = fileName
          this.fileName = fileName
          this.$toast.global.success('Asset renamed successfully.')
          if (this.folder) {
            this.$emit(
              'folderNameChanged',
              this.file,
              this.file.display_file_name.endsWith(`.${this.file.file_type}`)
                ? `${fileName}.${this.file.file_type}`
                : fileName
            )
          }
          if (this.file) {
            this.$emit(
              'fileNameChanged',
              this.file,
              this.file.display_file_name.endsWith(`.${this.file.file_type}`)
                ? `${fileName}.${this.file.file_type}`
                : fileName
            )
          }
          this.renameActive = 0
          this.renaming = 0
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.fileName = this.oldName
        })
    },
    async deleteFile(final = this.trashMode) {
      if (this.deletingModel) return

      this.deletingModel = true

      const endPoint = final
        ? 'digital-assets/category/permanent-delete-category-with-files'
        : 'digital-assets/category/delete-category-with-files'

      await this.$axios
        .$post(endPoint, {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: [this.file.id],
          category_ids: [],
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.$emit('removeMe', this.file)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.deletingModel = false
    },
    downloadFile() {
      if (this.$route.name.includes('shared-assets')) {
        this.$axios
          .$post(`share-link-download`, {
            workspace_id: this.shareWorkspaceId || this.$getWorkspaceId(),
            share_id: this.shareId,
            asset_id: this.file.id,
          })
          .catch(this.$errorToast)
      }

      this.$store.dispatch('dam/downloadFile', {
        id: this.file.id,
        url: this.file.display_file,
        name: this.file.display_file_name,
        callCountApi: !this.shareMode,
        useModernDownload: true,
        fallback_route: this.$route.fullPath,
        workspace_id: this.$route.params.workspace_id,
        url_workspace_id: this.$route.params.workspace_id,
      })
    },
    downloadSharedFile() {
      this.$store.dispatch('dam/downloadMultipleSharedFiles', {
        files: [this.file.id],
        folders: [],
        shareId: this.shareId,
        shareWorkspaceId: this.shareWorkspaceId,
      })
    },
  },
}
</script>

<style>
.categary-actions .restore-img {
  filter: brightness(0) saturate(100%) invert(61%) sepia(4%) saturate(472%)
    hue-rotate(196deg) brightness(91%) contrast(85%);
}
.selected-box .preview-images .preview {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.selected-box.mode-tile .preview-images:not(.no-image) .preview {
  background-size: contain;
}

.selected-box:not(.mode-list) .preview-images.no-image .preview {
  height: calc(100% - 1.5rem);
  width: calc(100% - 0.5rem);
  padding: 1rem;
  padding-top: 2rem;
  margin: auto;
  background-origin: content-box !important;
  background-size: contain;
}
.selected-box.image .preview-images {
  background: white !important;
}
.video .preview-images.preview {
  transition: opacity 350ms ease-in-out;
  opacity: 1;
}
.video:hover .preview-images.preview {
  opacity: 0;
}
</style>

<style scoped>
.dropdown-menu.show {
  will-change: transform;
  position: absolute;
  transform: translate3d(-94px, 38px, 0px);
  top: 0px;
  left: 0px;
}
.categary-image {
  z-index: 1;
}
</style>

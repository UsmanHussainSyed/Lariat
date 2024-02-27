<template>
  <li
    ref="nameChange"
    :style="assetNoClick ? '' : 'cursor: pointer !important'"
    class="folder-list"
    :class="{
      selected,
      'selected-box': selected,
      'active-rename': !!renameActive,
      permissionFolder: permissionType(folder) !== 'public',
    }"
  >
    <!-- panel view of folder -->
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
          :for="`folder-${folder.id}`"
          class="check-label"
        >
          <input
            :id="`folder-${folder.id}`"
            :checked="selected"
            type="checkbox"
            @input="$emit('click:selected', folder)"
          />
          <span class="check-span"></span>
        </label>
      </div>
      <div class="categary-name tb-column">
        <div class="categary-image folder-image a">
          <nuxt-link
            :event="assetNoClick ? '' : 'click'"
            :to="
              assetNoClick
                ? '#'
                : {
                    name: 'workspace_id-dam',
                    params: {
                      workspace_id: workspaceId,
                      folder: folder,
                    },
                    query: $route.query,
                    hash: `#${folder.id}`,
                  }
            "
            class="img-link"
          >
            <img
              :src="
                assetsCount
                  ? require('~/assets/img/folder-icon.svg')
                  : require('~/assets/img/folder-icon2.svg')
              "
              alt=""
            />
          </nuxt-link>
        </div>
        <div class="top-column">
          <div class="rename-text">
            <a
              :style="
                assetNoClick ? 'cursor: default' : 'cursor: pointer !important'
              "
              @click="panelChange"
              >{{ getFileName }}</a
            >
          </div>
          <div class="rename-input">
            <input
              ref="renameInput"
              v-model="getFileName"
              type="text"
              name="folder-name"
              class="form-control"
              :disabled="!!(renameActive && renaming)"
              @keyup.enter="changeFileName()"
              @keyup.esc="changeFileName(1)"
              @blur="changeFileName()"
            />
          </div>
        </div>
      </div>
      <div class="action tb-column">
        <div class="top-column">
          <div class="categary-actions">
            <svg
              v-if="permissionType(folder) !== 'public'"
              id="_x31__x2C_5"
              v-tooltip="
                folder.permission_type === 'group'
                  ? 'Restricted to specific groups'
                  : folder.permission_type === 'user' &&
                    folder.permission === 'all'
                  ? 'Restricted to frontend users'
                  : 'Restricted to specific users'
              "
              class="locked-icon"
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
              <ul v-if="!disableAllButton" class="dropdown-menu">
                <!-- permission -->
                <li v-if="!trashMode">
                  <a
                    v-tooltip="
                      canUpdatePermission
                        ? ''
                        : 'Please upgrade your subscription plan to enable this feature.'
                    "
                    class="dropdown-item"
                    data-toggle="modal"
                    :style="
                      canUpdatePermission
                        ? ''
                        : 'opacity:0.4;cursor:not-allowed'
                    "
                    @click.capture="
                      canUpdatePermission && $refs.permissionDialog.show()
                    "
                  >
                    <span class="dropdown-item-icon">
                      <svg
                        id="Layer_1"
                        class="permission-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Permission">
                          <g id="key" transform="translate(-2.767 -2.751)">
                            <path
                              id="Path_40238"
                              class="fill-color"
                              d="M14.6,2.8c-3.4,0-6.2,2.8-6.2,6.2c0,0.7,0.1,1.5,0.4,2.2L3,17c-0.1,0.1-0.2,0.3-0.2,0.5v2.6c0,0.4,0.3,0.7,0.7,0.7h4.1c0.4,0,0.7-0.3,0.7-0.7v-1.6h1.6c0.4,0,0.7-0.3,0.7-0.7v-1.7h2c0.4,0,0.7-0.3,0.7-0.7v-0.6c3.3,0.8,6.6-1.2,7.5-4.5c0.8-3.3-1.2-6.6-4.5-7.5C15.6,2.8,15.1,2.8,14.6,2.8z M9.8,8.9c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8s-2.2,4.8-4.8,4.8c-0.6,0-1.3-0.1-1.9-0.4c-0.3-0.1-0.7,0-0.9,0.4c0,0.1-0.1,0.2-0.1,0.3v0.8h-2c-0.4,0-0.7,0.3-0.7,0.7v1.7H7.6c-0.4,0-0.7,0.3-0.7,0.7v1.6H4.1v-1.6l5.8-5.9c0.3-0.3,0.4-0.7,0.1-1.1C9.9,10.2,9.8,9.6,9.8,8.9L9.8,8.9z M15.8,5.3c-1.4,0-2.4,1.1-2.4,2.5s1.1,2.4,2.5,2.4c1.4,0,2.4-1.1,2.4-2.5C18.2,6.4,17.1,5.3,15.8,5.3L15.8,5.3zM15.8,8.9c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C16.9,8.4,16.4,8.9,15.8,8.9C15.8,8.9,15.8,8.9,15.8,8.9L15.8,8.9z"
                            ></path>
                          </g>
                        </g></svg></span
                    >Permission</a
                  >
                </li>
                <!-- move -->
                <li v-if="!trashMode">
                  <a
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#moveFolder"
                    @click.capture.stop="selectFromDrop(folder, 'moveFolder')"
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
                        </g></svg></span
                    >Move Folder</a
                  >
                </li>
                <!-- share -->
                <li v-if="!trashMode">
                  <a
                    class="dropdown-item"
                    data-toggle="modal"
                    data-target="#sharePopup"
                    @click.capture.stop="selectFromDrop(folder, 'share')"
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
                    @click.capture.stop="selectFromDrop(folder, 'download')"
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
                    @click.capture.stop="selectFromDrop(folder, 'delete')"
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
                    >Delete</a
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
                    data-target="#delete"
                    @click.capture.stop="selectFromDrop(folder, 'restore')"
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
    <!-- end of panel view of folder -->
    <template v-else>
      <div class="preview-img tb-column flex10">
        <label
          v-if="!shareLinkHideDownload"
          :for="`folder-${folder.id}`"
          class="check-label"
        >
          <input
            :id="`folder-${folder.id}`"
            :checked="selected"
            type="checkbox"
            @input="$emit('click:selected', folder)"
          />
          <span class="check-span"></span>
        </label>
        <div class="categary-image folder-image">
          <a v-if="!shareMode" class="img-link" @click="panelChange">
            <span>
              <img
                :src="
                  require(assetsCount
                    ? '~/assets/img/folder-icon.svg'
                    : '~/assets/img/folder-icon2.svg')
                "
                alt=""
              />
              <b v-if="assetsCount">
                <template v-if="folder.sub_category_count > 0"
                  >{{ folder.sub_category_count }} Folder<template
                    v-if="folder.sub_category_count > 1"
                    >s</template
                  ></template
                >
                <template v-if="folder.total_assets > 0"
                  >{{ folder.total_assets }} Asset<template
                    v-if="folder.total_assets > 1"
                    >s</template
                  ></template
                >
              </b>
              <b v-else>Empty Folder</b>
            </span>
            <svg
              v-if="mode === 'tile' && permissionType(folder) !== 'public'"
              id="_x31__x2C_5"
              v-tooltip="
                folder.permission_type === 'group'
                  ? 'Restricted to specific groups'
                  : folder.permission_type === 'user' &&
                    folder.permission === 'all'
                  ? 'Restricted to frontend users'
                  : 'Restricted to specific users'
              "
              class="locked-icon"
              data-toggle="tooltip"
              title=""
              data-original-title="Restricted for Frontend Users"
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
            v-if="shareMode"
            class="img-link"
            @click="$emit('nextStack', folder.id)"
          >
            <span>
              <img
                :src="
                  require(assetsCount
                    ? '~/assets/img/folder-icon.svg'
                    : '~/assets/img/folder-icon2.svg')
                "
                alt=""
              />
              <b v-if="assetsCount">
                <template v-if="folder.sub_category_count > 0"
                  >{{ folder.sub_category_count }} Folder<template
                    v-if="folder.sub_category_count > 1"
                    >s</template
                  ></template
                >
                <template v-if="folder.total_assets > 0"
                  >{{ folder.total_assets }} Asset<template
                    v-if="folder.total_assets > 1"
                    >s</template
                  ></template
                >
              </b>
              <b v-else>Empty Folder</b>
            </span>
          </a>
          <div class="video-info">
            <div class="upper-info">
              <div class="d-flex align-items-center">
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
                    <!-- permission -->
                    <li v-if="!trashMode">
                      <a
                        v-tooltip="
                          canUpdatePermission
                            ? ''
                            : 'Please upgrade your subscription plan to enable this feature.'
                        "
                        class="dropdown-item"
                        data-toggle="modal"
                        :style="
                          canUpdatePermission
                            ? ''
                            : 'opacity:0.4;cursor:not-allowed'
                        "
                        @click.capture="
                          canUpdatePermission && $refs.permissionDialog.show()
                        "
                      >
                        <span class="dropdown-item-icon">
                          <svg
                            id="Layer_1"
                            class="permission-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g id="Permission">
                              <g id="key" transform="translate(-2.767 -2.751)">
                                <path
                                  id="Path_40238"
                                  class="fill-color"
                                  d="M14.6,2.8c-3.4,0-6.2,2.8-6.2,6.2c0,0.7,0.1,1.5,0.4,2.2L3,17c-0.1,0.1-0.2,0.3-0.2,0.5v2.6c0,0.4,0.3,0.7,0.7,0.7h4.1c0.4,0,0.7-0.3,0.7-0.7v-1.6h1.6c0.4,0,0.7-0.3,0.7-0.7v-1.7h2c0.4,0,0.7-0.3,0.7-0.7v-0.6c3.3,0.8,6.6-1.2,7.5-4.5c0.8-3.3-1.2-6.6-4.5-7.5C15.6,2.8,15.1,2.8,14.6,2.8z M9.8,8.9c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8s-2.2,4.8-4.8,4.8c-0.6,0-1.3-0.1-1.9-0.4c-0.3-0.1-0.7,0-0.9,0.4c0,0.1-0.1,0.2-0.1,0.3v0.8h-2c-0.4,0-0.7,0.3-0.7,0.7v1.7H7.6c-0.4,0-0.7,0.3-0.7,0.7v1.6H4.1v-1.6l5.8-5.9c0.3-0.3,0.4-0.7,0.1-1.1C9.9,10.2,9.8,9.6,9.8,8.9L9.8,8.9z M15.8,5.3c-1.4,0-2.4,1.1-2.4,2.5s1.1,2.4,2.5,2.4c1.4,0,2.4-1.1,2.4-2.5C18.2,6.4,17.1,5.3,15.8,5.3L15.8,5.3zM15.8,8.9c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C16.9,8.4,16.4,8.9,15.8,8.9C15.8,8.9,15.8,8.9,15.8,8.9L15.8,8.9z"
                                ></path>
                              </g>
                            </g></svg></span
                        >Permission</a
                      >
                    </li>
                    <!-- move -->
                    <li v-if="!trashMode">
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#moveFolder"
                        @click.capture.stop="
                          selectFromDrop(folder, 'moveFolder')
                        "
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
                            </g></svg></span
                        >Move Folder</a
                      >
                    </li>
                    <!-- share -->
                    <li v-if="!trashMode">
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#sharePopup"
                        @click.capture.stop="selectFromDrop(folder, 'share')"
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
                        @click.capture.stop="selectFromDrop(folder, 'download')"
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
                        @click.capture.stop="selectFromDrop(folder, 'delete')"
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
                        >Delete</a
                      >
                    </li>
                    <!-- restore -->
                    <li v-if="trashMode">
                      <a
                        class="dropdown-item"
                        data-toggle="modal"
                        data-target="#restore"
                        @click.capture.stop="selectFromDrop(folder, 'restore')"
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="categary-name tb-column flex27">
        <div class="top-column">
          <div class="rename-text">
            <component
              :is="assetNoClick ? 'a' : 'nuxt-link'"
              v-if="!shareMode"
              v-tooltip="{
                html: false,
                content: folder.folder_name,
              }"
              :event="assetNoClick ? '' : 'click'"
              :to="
                assetNoClick
                  ? '#'
                  : {
                      name: 'workspace_id-dam',
                      params: {
                        workspace_id: workspaceId,
                        folder: folder,
                      },
                      hash: `#${folder.id}`,
                    }
              "
              :style="selected ? { cursor: 'default !important' } : {}"
            >
              {{ getFileName }}
            </component>
            <a
              v-if="shareMode"
              v-tooltip="{
                html: false,
                content: folder.folder_name,
              }"
              :style="selected ? { cursor: 'default !important' } : {}"
              @click="$emit('nextStack', folder.id)"
              >{{ getFileName }}</a
            >
            <svg
              v-if="mode === 'list' && permissionType(folder) !== 'public'"
              id="_x31__x2C_5"
              v-tooltip="
                folder.permission_type === 'group'
                  ? 'Restricted to specific groups'
                  : folder.permission_type === 'user' &&
                    folder.permission === 'all'
                  ? 'Restricted to frontend users'
                  : 'Restricted to specific users'
              "
              class="locked-icon"
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
          <div class="rename-input">
            <input
              ref="renameInput"
              v-model="getFileName"
              type="text"
              name="folder-name"
              class="form-control"
              :disabled="!!(renameActive && renaming)"
              @keyup.enter="changeFileName()"
              @keyup.esc="changeFileName(1)"
              @blur="changeFileName()"
            />
          </div>
        </div>
      </div>
      <div class="assets tb-column flex18">
        <div class="top-column">
          <span style="text-transform: unset">
            <template v-if="assetsCount"
              ><template v-if="folder.sub_category_count > 0"
                >{{ folder.sub_category_count }} Folder<template
                  v-if="folder.sub_category_count > 1"
                  >s</template
                ></template
              >
              <template v-if="folder.total_assets > 0"
                >{{ folder.total_assets }} Asset<template
                  v-if="folder.total_assets > 1"
                  >s</template
                ></template
              ></template
            >
            <template v-else>Empty Folder</template>
          </span>
        </div>
      </div>
      <div class="update-date tb-column flex18">
        <div class="top-column">
          <label>
            {{ $moment(folder.updated_at).format('Do MMM, YYYY') }}
          </label>
        </div>
      </div>
      <div class="size tb-column flex12">
        <div class="top-column">
          <label>&dash;</label>
        </div>
      </div>
      <div class="categary-action tb-column flex15">
        <div class="top-column">
          <div class="categary-actions">
            <span v-if="deletingModel" class="action-btn">
              <SpinLoading />
            </span>
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
              <a
                v-if="!trashMode"
                data-toggle="modal"
                data-target="#sharePopup"
                @click.capture.stop="selectFromDrop(folder, 'share')"
              >
                <svg
                  id="Layer_1"
                  class="share-icon h-orange"
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
                </svg>
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
                <ul v-if="!disableAllButton" class="dropdown-menu">
                  <!-- permission -->
                  <li v-if="!trashMode">
                    <a
                      v-tooltip="
                        canUpdatePermission
                          ? ''
                          : 'Please upgrade your subscription plan to enable this feature.'
                      "
                      class="dropdown-item"
                      data-toggle="modal"
                      :style="
                        canUpdatePermission
                          ? ''
                          : 'opacity:0.4;cursor:not-allowed'
                      "
                      @click.capture="
                        canUpdatePermission && $refs.permissionDialog.show()
                      "
                    >
                      <span class="dropdown-item-icon">
                        <svg
                          id="Layer_1"
                          class="permission-icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Permission">
                            <g id="key" transform="translate(-2.767 -2.751)">
                              <path
                                id="Path_40238"
                                class="fill-color"
                                d="M14.6,2.8c-3.4,0-6.2,2.8-6.2,6.2c0,0.7,0.1,1.5,0.4,2.2L3,17c-0.1,0.1-0.2,0.3-0.2,0.5v2.6c0,0.4,0.3,0.7,0.7,0.7h4.1c0.4,0,0.7-0.3,0.7-0.7v-1.6h1.6c0.4,0,0.7-0.3,0.7-0.7v-1.7h2c0.4,0,0.7-0.3,0.7-0.7v-0.6c3.3,0.8,6.6-1.2,7.5-4.5c0.8-3.3-1.2-6.6-4.5-7.5C15.6,2.8,15.1,2.8,14.6,2.8z M9.8,8.9c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8s-2.2,4.8-4.8,4.8c-0.6,0-1.3-0.1-1.9-0.4c-0.3-0.1-0.7,0-0.9,0.4c0,0.1-0.1,0.2-0.1,0.3v0.8h-2c-0.4,0-0.7,0.3-0.7,0.7v1.7H7.6c-0.4,0-0.7,0.3-0.7,0.7v1.6H4.1v-1.6l5.8-5.9c0.3-0.3,0.4-0.7,0.1-1.1C9.9,10.2,9.8,9.6,9.8,8.9L9.8,8.9z M15.8,5.3c-1.4,0-2.4,1.1-2.4,2.5s1.1,2.4,2.5,2.4c1.4,0,2.4-1.1,2.4-2.5C18.2,6.4,17.1,5.3,15.8,5.3L15.8,5.3zM15.8,8.9c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C16.9,8.4,16.4,8.9,15.8,8.9C15.8,8.9,15.8,8.9,15.8,8.9L15.8,8.9z"
                              ></path>
                            </g>
                          </g></svg></span
                      >Permission</a
                    >
                  </li>
                  <!-- move -->
                  <li v-if="!trashMode">
                    <a
                      class="dropdown-item"
                      data-toggle="modal"
                      data-target="#moveFolder"
                      @click.capture.stop="selectFromDrop(folder, 'moveFolder')"
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
                          </g></svg></span
                      >Move Folder</a
                    >
                  </li>
                  <!-- download -->
                  <li v-if="!trashMode">
                    <a
                      class="dropdown-item"
                      @click.capture.stop="selectFromDrop(folder, 'download')"
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
                      @click.capture.stop="selectFromDrop(folder, 'delete')"
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
                      >Delete</a
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
                      data-target="#delete"
                      @click.capture.stop="selectFromDrop(folder, 'restore')"
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
          </div>
        </div>
      </div>
    </template>
    <client-only>
      <ShareAssetDialog
        ref="shareDialog"
        :folders="[shareAble]"
        type="folder"
      />
      <PermissionDialog
        ref="permissionDialog"
        :folder-id="folder.id"
        :permission="{
          value:
            folder.permission_type === 'group'
              ? (folder.groups || []).map((e) => e.id).join(',')
              : folder.permission,
          type: folder.permission_type,
        }"
        @permission-updated="$emit('permission-updated', $event)"
      />
    </client-only>
  </li>
</template>

<script>
import ShareAssetDialog from '~/components/dam/Dialogs/ShareAssetDialog'
import PermissionDialog from '~/components/dam/Dialogs/PermissionDialog'

export default {
  components: { ShareAssetDialog, PermissionDialog },
  props: {
    folder: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
    trashMode: { type: Boolean, default: false },
    shareMode: { type: Boolean, default: false },
    mode: { type: String, default: 'list' },
    level: { type: Number, default: 0 },
    shareId: { type: Number, default: 0 },
    shareWorkspaceId: { type: String, required: false, default: null },
    shareLinkHideDownload: { type: Boolean, default: false },
  },
  data() {
    return {
      deletingModel: false,
      fileName: this.folder.folder_name || this.folder.category_name,
      oldName: this.folder.folder_name || this.folder.category_name,
      dropDownList: false,
      shareAble: {},
      renameActive: 0,
      renaming: 0,
    }
  },
  computed: {
    canUpdatePermission() {
      return !!this.$auth.user?.subscription_features
        ?.folder_permission_customisation?.enable
    },
    permissionType() {
      return (folder) => {
        return !(folder.permission_type || '').length ||
          folder.permission_type === 'public'
          ? 'public'
          : folder.permission_type
      }
    },
    getFileName: {
      get() {
        return this.fileName
      },
      set(newValue) {
        this.fileName = (newValue || '').trim()
      },
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    assetNoClick() {
      return this.selected || this.shareMode || this.trashMode
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
    assetsCount() {
      return (
        (this.folder.total_assets || 0) + (this.folder.sub_category_count || 0)
      )
    },
    disableAllButton() {
      return this.deletingModel
    },
  },
  watch: {
    'folder.folder_name'() {
      this.getFileName = this.folder.folder_name || this.folder.category_name
      this.oldName = this.folder.folder_name || this.folder.category_name
    },
  },
  mounted() {
    this.$bus.$on('closeDropDown', () => {
      if (this.dropDownList === true) {
        this.dropDownList = false
      }
    })
  },
  methods: {
    panelChange() {
      if (this.assetNoClick) return
      this.$router.push({
        name: 'workspace_id-dam',
        params: {
          workspace_id: this.workspaceId,
          folder: this.folder,
        },
        query: this.$route.query,
        hash: `#${this.folder.id}`,
      })
    },
    onRenameClick() {
      this.renameActive = 1
      this.$nextTick(() => {
        this.$refs.renameInput.click()
        this.$refs.renameInput.focus()
      })
    },
    async changeFileName(discard) {
      const fileName = this.getFileName

      if (discard) {
        this.getFileName = this.oldName
        this.renameActive = 0
        this.renaming = false
        return
      }
      if (!(fileName || '').length) {
        this.getFileName = this.oldName
        this.renameActive = 0
        this.renaming = false
        return
      }

      if (fileName === this.oldName || this.renaming) {
        this.renameActive = 0
        this.renaming = false
        return
      }

      this.renaming = true
      await this.$axios
        .$post(`/digital-assets/category/rename/${this.folder.id}`, {
          workspace_id: this.$getWorkspaceId(),
          folder_name: fileName,
        })
        .then(() => {
          this.oldName = fileName
          this.$store
            .dispatch('dam/renameFolders', {
              oldFolder: this.folder,
              newName: fileName,
            })
            .then(() => {
              this.$toast.global.success('Folder renamed successfully.')
              this.$emit('folderNameChanged', this.folder, fileName)
            })
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.fileName = this.oldName
        })
      this.renaming = false
      this.renameActive = 0
    },
    selectFromDrop(folder, type) {
      this.dropDown()
      if (type === 'share') {
        const folderId = this.folder.id
        this.$axios
          .$post(`digital-assets/check-private-assets`, {
            workspace_id: this.$getWorkspaceId(),
            category_ids: [folderId],
          })
          .then(({ data }) => {
            this.shareAble = this.folder
            for (const key in data) {
              if (this.shareAble.id === parseInt(key)) {
                this.shareAble.is_public = data[key]
              }
            }
            this.$nextTick(() => {
              this.$refs.shareDialog.show()
            })
          })
      }
      this.$emit('selectedDrop', folder, type, 'folder')
    },
    dropDown() {
      this.dropDownList = !this.dropDownList
    },
    downloadSharedFile() {
      this.$store.dispatch('dam/downloadMultipleSharedFiles', {
        files: [],
        folders: [this.folder.id],
        shareId: this.shareId,
        shareWorkspaceId: this.shareWorkspaceId,
      })
    },
  },
}
</script>

<style scoped>
.dropdown-menu.show {
  will-change: transform;
  position: absolute;
  transform: translate3d(-94px, 38px, 0px);
  top: 0px;
  left: 0px;
}
</style>

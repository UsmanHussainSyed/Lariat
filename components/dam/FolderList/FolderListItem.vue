<template>
  <li
    ref="nameChange"
    class="folder-list"
    :class="{
      'active-rename': !!renameActive,
      permissionFolder: permissionType(folder) !== 'public',
    }"
  >
    <!-- active: folder.id == selection, -->
    <div class="rename-text">
      <component
        v-bind="props"
        :is="props.is"
        class="folder-item"
        :class="{
          active: folder.id == selection, // (to disable current folder) disabled: !multiple && _disabled
          'has-child': hasSubFolder,
          disabled: parentFolderDisable != null && !multiple && _disabled,
        }"
        v-on="listeners"
      >
        <template v-if="multiple">
          <div class="checkboxInputDiv" @click.stop.capture>
            <label class="check-label" :style="{ paddingLeft: '16px' }">
              <input
                ref="checkbox"
                type="checkbox"
                :value="checked"
                :disabled="_disabled"
                :checked="checked || _disabled"
                @input="
                  $emit('click:toggle', {
                    selected: $event.target.checked,
                    id: folder.id,
                    parentId: folder.parent_id,
                  })
                "
              />
              <span class="check-span"></span>
            </label>
          </div>
          <!-- <label
            style="
              right: 0;
              top: 50%;
              bottom: 0;
              padding: 0.25rem 1rem;
              position: absolute;
              transform: translateY(-55%);
              z-index: 10;
            "
            @click.stop.capture
          >
            <input
              ref="checkbox"
              type="checkbox"
              :value="checked"
              :disabled="_disabled"
              :checked="checked || _disabled"
              @input="
                $emit('click:toggle', {
                  selected: $event.target.checked,
                  id: folder.id,
                  parentId: folder.parent_id,
                })
              "
            />
          </label> -->
        </template>
        <svg
          v-if="hasExternalIntegration == 1"
          id="Layer_1"
          class="dropbox-icon blue"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Dropbox">
            <g id="dropbox-2" transform="translate(0 -9.413)">
              <path
                id="Path_38039"
                fill="#0361CF"
                d="M8.3,19.6l-4.6-3c-0.1-0.1-0.3-0.1-0.5,0l-3.1,2.5c-0.2,0.1-0.2,0.4-0.1,0.6c0,0,0.1,0.1,0.1,0.1l4.6,3c0.1,0.1,0.3,0.1,0.5,0l3.1-2.5c0.2-0.1,0.2-0.4,0.1-0.6C8.4,19.7,8.4,19.7,8.3,19.6z"
              ></path>
              <path
                id="Path_38040"
                fill="#0361CF"
                d="M9.6,20.3l3.1,2.5c0.1,0.1,0.3,0.1,0.5,0l4.6-3c0.2-0.1,0.2-0.4,0.1-0.6c0,0-0.1-0.1-0.1-0.1l-3.1-2.5c-0.1-0.1-0.3-0.1-0.5,0l-4.6,3C9.5,19.8,9.4,20,9.6,20.3C9.6,20.3,9.6,20.3,9.6,20.3z"
              ></path>
              <path
                id="Path_38041"
                fill="#0361CF"
                d="M8.4,12.5L5.3,10c-0.1-0.1-0.3-0.1-0.5,0l-4.6,3c-0.2,0.1-0.2,0.4-0.1,0.6c0,0,0.1,0.1,0.1,0.1l3.1,2.5c0.1,0.1,0.3,0.1,0.5,0l4.6-3C8.5,13,8.6,12.8,8.4,12.5C8.4,12.6,8.4,12.5,8.4,12.5z"
              ></path>
              <path
                id="Path_38042"
                fill="#0361CF"
                d="M17.8,12.9l-4.6-3c-0.1-0.1-0.3-0.1-0.5,0l-3.1,2.5c-0.2,0.1-0.2,0.4-0.1,0.6c0,0,0.1,0.1,0.1,0.1l4.6,3c0.1,0.1,0.3,0.1,0.5,0l3.1-2.5C18,13.5,18.1,13.2,17.8,12.9C17.9,13,17.8,13,17.8,12.9z"
              ></path>
              <path
                id="Path_38043"
                fill="#0361CF"
                d="M8.8,20.8l-3.5,2.8c-0.1,0.1-0.3,0.1-0.4,0L4,23c-0.2-0.1-0.4-0.1-0.5,0.1c0,0.1-0.1,0.1-0.1,0.2v0.3c0,0.1,0.1,0.3,0.2,0.3l5.2,3.1c0.1,0.1,0.3,0.1,0.4,0l5.2-3.1c0.1-0.1,0.2-0.2,0.2-0.3v-0.3c0-0.2-0.2-0.4-0.4-0.4c-0.1,0-0.1,0-0.2,0.1l-0.8,0.5c-0.1,0.1-0.3,0.1-0.4,0l-3.5-2.8C9.1,20.7,8.9,20.7,8.8,20.8z"
              ></path>
            </g>
          </g>
        </svg>
        <svg
          v-if="hasExternalIntegration == 2"
          width="94"
          height="94"
          viewBox="0 0 94 94"
          fill="none"
          class="google-drive-icon"
          xmlns="http://www.w3.org/2000/svg"
          style="max-width: 18px"
        >
          <rect width="94" height="94" fill="none" />
          <path
            d="M10.7219 73.2906L14.4917 79.8021C15.275 81.1729 16.401 82.25 17.7229 83.0333L31.1865 59.7292H4.25937C4.25937 61.2469 4.65104 62.7646 5.43437 64.1354L10.7219 73.2906Z"
            fill="#0066DA"
          />
          <path
            d="M47 32.3125L33.5365 9.00833C32.2146 9.79166 31.0885 10.8687 30.3052 12.2396L5.43437 55.3229C4.65104 56.6938 4.25937 58.2115 4.25937 59.7292H31.1865L47 32.3125Z"
            fill="#00AC47"
          />
          <path
            d="M47 32.3125L60.4635 9.00833C59.1416 8.22499 57.6239 7.83333 56.0573 7.83333H37.9427C36.376 7.83333 34.8583 8.27395 33.5364 9.00833L47 32.3125Z"
            fill="#00832D"
          />
          <path
            d="M62.8135 59.7292H31.1864L17.7229 83.0333C19.0448 83.8167 20.5625 84.2083 22.1292 84.2083H71.8708C73.4375 84.2083 74.9552 83.7677 76.2771 83.0333L62.8135 59.7292Z"
            fill="#2684FC"
          />
          <path
            d="M76.2771 83.0333C77.599 82.25 78.725 81.1729 79.5083 79.8021L81.075 77.1094L88.5656 64.1354C89.3489 62.7646 89.7406 61.2469 89.7406 59.7292H62.8625L76.2771 83.0333Z"
            fill="#EA4335"
          />
          <path
            d="M76.1302 33.7813L63.6948 12.2396C62.9115 10.8687 61.7854 9.79166 60.4635 9.00833L47 32.3125L62.8135 59.7292H89.6917C89.6917 58.2115 89.3 56.6938 88.5167 55.3229L76.1302 33.7813Z"
            fill="#FFBA00"
          />
        </svg>
        <svg
          v-if="hasExternalIntegration == 3"
          id="Layer_1"
          class="box-icon"
          viewBox="0 0 40 21.6"
          xmlns="http://www.w3.org/2000/svg"
          style="max-width: 18px"
        >
          <style type="text/css">
            .box-logo-svg {
              fill: #0061d5;
            }
          </style>
          <path
            class="box-logo-svg"
            d="M39.7 19.2c.5.7.4 1.6-.2 2.1-.7.5-1.7.4-2.2-.2l-3.5-4.5-3.4 4.4c-.5.7-1.5.7-2.2.2-.7-.5-.8-1.4-.3-2.1l4-5.2-4-5.2c-.5-.7-.3-1.7.3-2.2.7-.5 1.7-.3 2.2.3l3.4 4.5L37.3 7c.5-.7 1.4-.8 2.2-.3.7.5.7 1.5.2 2.2L35.8 14l3.9 5.2zm-18.2-.6c-2.6 0-4.7-2-4.7-4.6 0-2.5 2.1-4.6 4.7-4.6s4.7 2.1 4.7 4.6c-.1 2.6-2.2 4.6-4.7 4.6zm-13.8 0c-2.6 0-4.7-2-4.7-4.6 0-2.5 2.1-4.6 4.7-4.6s4.7 2.1 4.7 4.6c0 2.6-2.1 4.6-4.7 4.6zM21.5 6.4c-2.9 0-5.5 1.6-6.8 4-1.3-2.4-3.9-4-6.9-4-1.8 0-3.4.6-4.7 1.5V1.5C3.1.7 2.4 0 1.6 0 .7 0 0 .7 0 1.5v12.6c.1 4.2 3.5 7.5 7.7 7.5 3 0 5.6-1.7 6.9-4.1 1.3 2.4 3.9 4.1 6.8 4.1 4.3 0 7.8-3.4 7.8-7.7.1-4.1-3.4-7.5-7.7-7.5z"
          ></path>
        </svg>

        <svg
          v-if="hasSubFolder && hasExternalIntegration == 0"
          id="Layer_1"
          class="sub-folder-icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4470" transform="translate(-623 -801)">
            <rect
              id="Rectangle_3009"
              x="623"
              y="801"
              class="fill-hide"
              width="18"
              height="18"
            />
            <g id="Group_4375" transform="translate(277.799 512.51)">
              <g id="Group_4372">
                <path
                  id="Path_3453"
                  class="fill-color"
                  d="M354.2,302.1c-0.4,0-0.8-0.3-0.8-0.8v-5c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v5C355,301.8,354.6,302.1,354.2,302.1z"
                />
              </g>
              <g id="Group_4373">
                <path
                  id="Path_3454"
                  class="fill-color"
                  d="M347.5,305.7c-0.6,0-1.1-0.2-1.5-0.6c-0.5-0.5-0.8-1.1-0.8-1.8v-11.4c0-0.7,0.3-1.3,0.8-1.8c0.4-0.4,1-0.6,1.5-0.6h0.1h4.4l1.7,2.5l7.1,0c0.6,0,1.1,0.2,1.5,0.6c0.5,0.5,0.8,1.1,0.8,1.8v9c0,0.7-0.3,1.3-0.8,1.8c-0.4,0.4-1,0.6-1.5,0.6L347.5,305.7z M360.8,304.1l0,0.1L360.8,304.1c0.2,0,0.4-0.1,0.5-0.2c0.2-0.2,0.3-0.4,0.3-0.7v-8.9c0-0.2-0.1-0.5-0.3-0.6c-0.1-0.1-0.3-0.2-0.5-0.2H353l-1.7-2.5l-3.7,0c-0.2,0-0.4,0.1-0.5,0.2c-0.2,0.2-0.3,0.4-0.3,0.7v11.3c0,0.2,0.1,0.5,0.3,0.6c0.1,0.1,0.3,0.2,0.5,0.2L360.8,304.1L360.8,304.1z"
                />
              </g>
              <g id="Group_4374">
                <path
                  id="Path_3455"
                  class="fill-color"
                  d="M356.7,299.6h-5c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h5c0.4,0,0.8,0.3,0.8,0.8S357.1,299.6,356.7,299.6z"
                />
              </g>
            </g>
          </g>
        </svg>
        <svg
          v-if="!hasSubFolder && !hasExternalIntegration"
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
            ></rect>
            <path
              id="Path_3452"
              class="fill-color"
              d="M581.3,818.2c-0.6,0-1.1-0.2-1.5-0.6c-0.5-0.5-0.8-1.1-0.8-1.8v-11.4c0-0.7,0.3-1.3,0.8-1.8c0.4-0.4,1-0.6,1.5-0.6h0.1h4.4l1.7,2.5l7.1,0c0.6,0,1.1,0.2,1.5,0.6c0.5,0.5,0.8,1.1,0.8,1.8v9c0,0.7-0.3,1.3-0.8,1.8c-0.4,0.4-1,0.6-1.5,0.6L581.3,818.2z M594.6,816.6l0,0.1L594.6,816.6c0.2,0,0.4-0.1,0.5-0.2c0.2-0.2,0.3-0.4,0.3-0.7v-8.9c0-0.2-0.1-0.5-0.3-0.6c-0.1-0.1-0.3-0.2-0.5-0.2h-7.8l-1.7-2.5l-3.7,0c-0.2,0-0.4,0.1-0.5,0.2c-0.2,0.2-0.3,0.4-0.3,0.7v11.3c0,0.2,0.1,0.5,0.3,0.6c0.1,0.1,0.3,0.2,0.5,0.2L594.6,816.6L594.6,816.6z"
            ></path>
          </g>
        </svg>
        {{ fileName }}
      </component>
      <div
        v-if="permissionType(folder) !== 'public'"
        class="permissionFolderIcon"
      >
        <svg
          id="_x31__x2C_5"
          v-tooltip="
            folder.permission_type === 'group'
              ? 'Restricted to specific groups'
              : folder.permission_type === 'user' && folder.permission === 'all'
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
      <div v-if="!selectionMode && !multiple" class="dropdown more-options">
        <button
          ref="actionMenu"
          type="button"
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
        </button>
        <ul class="dropdown-menu">
          <!-- download -->
          <li>
            <a
              class="dropdown-item"
              @click.capture.stop="
                () => {
                  selectFromPanel(folder, 'download')
                  $refs.actionMenu.click()
                }
              "
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
                  <g id="Group_4359" transform="translate(-153.745 -317.549)">
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
          <li>
            <a
              class="dropdown-item"
              data-toggle="modal"
              data-target="#sharePopup"
              @click.capture.stop="
                () => {
                  selectFromPanel(folder, 'share')
                  $refs.actionMenu.click()
                }
              "
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
          <!-- move -->
          <li v-if="!folder.integration_type">
            <a
              class="dropdown-item"
              data-toggle="modal"
              data-target="#moveFolder"
              @click.capture.stop="
                () => {
                  selectFromPanel(folder, 'moveFolder')
                  $refs.actionMenu.click()
                }
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
                  <g id="Group_4355" transform="translate(-741.322 -145.174)">
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
          <!-- rename -->
          <li v-if="!folder.integration_type">
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
                  <g id="Group_5357" transform="translate(-653.672 -933.511)">
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
          <!-- permission -->
          <li>
            <a
              v-tooltip="
                canUpdatePermission
                  ? ''
                  : 'Please upgrade your subscription plan to enable this feature.'
              "
              class="dropdown-item"
              :style="
                canUpdatePermission ? '' : 'opacity:0.4;cursor:not-allowed'
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
          <!-- delete -->
          <li>
            <a
              class="dropdown-item"
              data-toggle="modal"
              data-target="#delete"
              @click.capture.stop="
                () => {
                  selectFromPanel(folder, 'delete')
                  $refs.actionMenu.click()
                }
              "
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
                </svg> </span
              >Delete</a
            >
          </li>
        </ul>
      </div>
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
        @blur="changeFileName(1)"
      />
    </div>

    <ShareAssetDialog ref="shareDialog" :folders="[shareAble]" type="folder" />
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
  </li>
</template>

<script>
import ShareAssetDialog from '~/components/dam/Dialogs/ShareAssetDialog'
import PermissionDialog from '~/components/dam/Dialogs/PermissionDialog'
export default {
  components: {
    ShareAssetDialog,
    PermissionDialog,
  },
  props: {
    folder: { type: Object, required: true },
    selectionMode: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    selection: { type: [String, Number], default: null },
    routeFolder: { type: [String, Number], default: null },
    disabled: { type: Boolean, default: null },
    parentFolderDisable: { type: String, default: null },
    multipleSelection: { type: Array, default: () => [] },
  },
  data() {
    return {
      fileName: this.folder.folder_name || this.folder.category_name,
      oldName: this.folder.folder_name || this.folder.category_name,
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
    getFileName: {
      get() {
        return this.fileName
      },
      set(newValue) {
        this.fileName = (newValue || '').trim()
      },
    },
    _disabled() {
      return !this.multiple && this.disabled
    },
    hasSubFolder() {
      return this.folder.sub_category_count
    },
    hasExternalIntegration() {
      return this.folder.integration_type
    },
    checked() {
      return !!this.multipleSelection.find((el) => el === this.folder.id)
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
    props() {
      const props = {
        is: this.selectionMode || this.multiple ? 'a' : 'nuxt-link',
      }

      if (!this.selectionMode && !this.multiple)
        props.to = {
          name: 'workspace_id-dam',
          params: { workspace_id: this.workspaceId, folder: this.folder },
          hash: `#${this.folder.id}`,
        }

      return props
    },
    listeners() {
      const listeners = { ...this.$listeners }

      if (this.selectionMode)
        listeners.click = function (ev) {
          if (this.hasSubFolder) this.$emit('click', ev)
          if (this.disabled) return

          this.$emit(
            'update:selection',
            this.hasSubFolder
              ? this.folder.id
              : this.folder.id === this.selection
              ? null
              : this.folder.id
          )
          this.$emit('click', ev)
        }.bind(this)
      else if (this.multiple) {
        listeners.click = function (ev) {
          if (!this.hasSubFolder) this.$refs.checkbox.click()

          this.$emit('click', ev)
        }.bind(this)
      }

      return listeners
    },
    permissionType() {
      return (folder) => {
        return !(folder.permission_type || '').length ||
          folder.permission_type === 'public'
          ? 'public'
          : folder.permission_type
      }
    },
  },
  watch: {
    'folder.folder_name'() {
      this.getFileName = this.folder.folder_name || this.folder.category_name
      this.oldName = this.folder.folder_name || this.folder.category_name
    },
  },
  methods: {
    selectFromPanel(folder, type) {
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
      } else {
        this.$emit('selectedDrop', folder, type, 'folder')
      }
    },
    async changeFileName(discard) {
      const fileName = this.getFileName

      if (discard) {
        this.getFileName = this.oldName
        this.renameActive = 0
        return
      }
      if (!(fileName || '').trim().length) {
        this.getFileName = this.oldName
        this.$toast.global.error('Folder name is required.')
        this.renaming = false
        this.renameActive = 0
        return
      }

      if (fileName === this.oldName || this.renaming) {
        return
      }

      this.renaming = true
      await this.$axios
        .$post(`/digital-assets/category/rename/${this.folder.id}`, {
          workspace_id: this.$getWorkspaceId(),
          folder_name: fileName.trim(),
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
            })
          this.$emit('folderNameChanged', this.folder, fileName)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.fileName = this.oldName
        })
      this.renaming = false
    },
    onRenameClick() {
      this.renameActive = 1
      this.$nextTick(() => {
        this.$refs.renameInput.click()
        this.$refs.renameInput.focus()
      })
    },
  },
}
</script>

<style>
.folder-item.disabled {
  background-color: #e4e4e4 !important;
  pointer-events: none;
}

.folder-item .custom-checkbox label::before {
  top: 4px;
  left: -1px;
  width: 16px;
  height: 16px;
}

.checkboxInputDiv {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}
</style>

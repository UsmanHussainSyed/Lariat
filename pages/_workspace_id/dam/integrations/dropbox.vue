<template>
  <div
    class="body-content-main h-100 resource-wrapper position-relative"
    :class="{
      'grid-list': viewType === 'list',
      'grid-tile': viewType === 'grid',
    }"
  >
    <template v-if="!dropboxEnabled">
      <img
        :src="require('~/assets/img/blurred-images/integrated-app.png')"
        style="width: 100%"
      />
      <div v-if="internalIntegrationEnabled" class="common-overaly">
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
    </template>
    <template v-else>
      <div class="common-box-header">
        <div class="filter-left">
          <dropbox-breadcrumb
            :cwd="cwd"
            class="filter-left"
            :breadcrumbs="getBreadCrumbs()"
            @breadcrumb-click="handleBreadcrumbClick"
          >
            <template #item_0="{ item }">
              <li>
                <h2 v-if="cwd == ''" class="title" style="padding-left: 6px">
                  DropBox
                </h2>
                <a
                  v-else
                  class="home-icon"
                  @click.stop="
                    () => {
                      if (dropboxEnabled) {
                        handleBreadcrumbClick(item)
                      }
                    }
                  "
                >
                  <img src="~/assets/img/dropbox-blue.svg" width="18" />
                </a>
              </li>
            </template>
          </dropbox-breadcrumb>
        </div>
        <div class="table-filter">
          <ul>
            <div
              v-show="uploadProgress"
              style="margin-right: 8px; display: flex; align-items: center"
            >
              <img
                :src="require('~/assets/img/loading.gif')"
                height="16"
                style="margin-right: 6px"
              />
              Uploading...
            </div>
            <li>
              <div class="dropdown show">
                <button
                  type="button"
                  data-toggle="dropdown"
                  :style="{
                    height: '34px',
                    width: '34px',
                    backgroundColor: '#445ea7',
                    border: '1px solid #445ea7',
                    borderRadius: '4px',
                    outline: 'none',
                  }"
                  aria-expanded="true"
                >
                  <svg
                    id="Layer_1"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                    class="plus-icon white"
                  >
                    <g id="Group_4454" transform="translate(-1005 -577.999)">
                      <path
                        id="Path_3394"
                        d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                        class="fill-color"
                      ></path>
                      <path
                        id="Path_3395"
                        d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                        class="fill-color"
                      ></path>
                    </g>
                  </svg>
                </button>
                <ul
                  class="dropdown-menu add-dropdown"
                  x-placement="bottom-start"
                >
                  <li>
                    <a
                      :disabled="uploadProgress"
                      class="dropdown-item"
                      @click="
                        () => {
                          if (dropboxEnabled) {
                            uploadFile()
                          }
                        }
                      "
                      ><span
                        :style="{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                          display: 'inline-block',
                          marginRight: '8px',
                        }"
                        ><svg
                          id="Layer_1"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                          class="upload-icon"
                        >
                          <g
                            id="Group_4436"
                            transform="translate(-375.358 -797.334)"
                          >
                            <path
                              id="Path_3552"
                              d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                              class="fill-color"
                            ></path>
                            <g id="Group_4435">
                              <path
                                id="Path_3553"
                                d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                                class="fill-color"
                              ></path>
                              <path
                                id="Path_3554"
                                d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                                class="fill-color"
                              ></path>
                            </g>
                          </g></svg
                      ></span>
                      Upload File
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="dropdown-item"
                      data-target="#category"
                      data-toggle="modal"
                      ><span
                        :style="{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                          display: 'inline-block',
                          marginRight: '8px',
                        }"
                        ><svg
                          id="Layer_1"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                          class="folder-icon"
                        >
                          <g id="Group_4469" transform="translate(-579 -801)">
                            <rect
                              id="Rectangle_3008"
                              x="579"
                              y="801"
                              width="18"
                              height="18"
                              class="fill-hide"
                            ></rect>
                            <path
                              id="Path_3452"
                              d="M581.3,818.2c-0.6,0-1.1-0.2-1.5-0.6c-0.5-0.5-0.8-1.1-0.8-1.8v-11.4c0-0.7,0.3-1.3,0.8-1.8c0.4-0.4,1-0.6,1.5-0.6h0.1h4.4l1.7,2.5l7.1,0c0.6,0,1.1,0.2,1.5,0.6c0.5,0.5,0.8,1.1,0.8,1.8v9c0,0.7-0.3,1.3-0.8,1.8c-0.4,0.4-1,0.6-1.5,0.6L581.3,818.2z M594.6,816.6l0,0.1L594.6,816.6c0.2,0,0.4-0.1,0.5-0.2c0.2-0.2,0.3-0.4,0.3-0.7v-8.9c0-0.2-0.1-0.5-0.3-0.6c-0.1-0.1-0.3-0.2-0.5-0.2h-7.8l-1.7-2.5l-3.7,0c-0.2,0-0.4,0.1-0.5,0.2c-0.2,0.2-0.3,0.4-0.3,0.7v11.3c0,0.2,0.1,0.5,0.3,0.6c0.1,0.1,0.3,0.2,0.5,0.2L594.6,816.6L594.6,816.6z"
                              class="fill-color"
                            ></path>
                          </g></svg
                      ></span>
                      Create Folder
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="gried-view">
                <span
                  class="gridview"
                  :class="{ active: viewType === 'grid' }"
                  @click="dropboxEnabled ? (viewType = 'grid') : ''"
                >
                  <svg
                    id="Layer_1"
                    class="gridview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4377" transform="translate(-594.872 -288.043)">
                      <path
                        id="Path_3460"
                        class="fill-color"
                        d="M600.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,288.9,602,288,600.9,288z"
                      ></path>
                      <path
                        id="Path_3461"
                        class="fill-color"
                        d="M610.9,289.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,288h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,288.9,612,288,610.9,288z"
                      ></path>
                      <path
                        id="Path_3462"
                        class="fill-color"
                        d="M600.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H600.9 M600.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C602.9,298.9,602,298,600.9,298z"
                      ></path>
                      <path
                        id="Path_3463"
                        class="fill-color"
                        d="M610.9,299.5c0.3,0,0.5,0.2,0.5,0.5v4c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-4c0-0.3,0.2-0.5,0.5-0.5H610.9 M610.9,298h-4c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2v-4C612.9,298.9,612,298,610.9,298z"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span
                  class="listview"
                  :class="{ active: viewType === 'list' }"
                  @click="dropboxEnabled ? (viewType = 'list') : ''"
                >
                  <svg
                    id="Layer_1"
                    class="listview-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4378" transform="translate(-645.53 -288.043)">
                      <path
                        id="Path_3464"
                        class="fill-color"
                        d="M648.5,289.5v1.5H647v-1.5H648.5 M648.5,288H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,288.7,649.4,288,648.5,288z"
                      ></path>
                      <path
                        id="Path_3465"
                        class="fill-color"
                        d="M662.8,291H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,291,662.8,291L662.8,291z"
                      ></path>
                      <path
                        id="Path_3466"
                        class="fill-color"
                        d="M648.5,296.3v1.5H647v-1.5H648.5 M648.5,294.8H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5v-1.5C650,295.5,649.4,294.8,648.5,294.8L648.5,294.8z"
                      ></path>
                      <path
                        id="Path_3467"
                        class="fill-color"
                        d="M662.8,297.8H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,297.8,662.8,297.8L662.8,297.8z"
                      ></path>
                      <path
                        id="Path_3468"
                        class="fill-color"
                        d="M648.5,303v1.5H647V303H648.5 M648.5,301.5H647c-0.8,0-1.5,0.7-1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h1.5c0.8,0,1.5-0.7,1.5-1.5V303C650,302.2,649.4,301.5,648.5,301.5z"
                      ></path>
                      <path
                        id="Path_3469"
                        class="fill-color"
                        d="M662.8,304.5H653c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.8c0.4,0,0.8,0.3,0.8,0.8S663.2,304.5,662.8,304.5L662.8,304.5z"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="common-box bg-gray">
        <div
          class="table-list-view dropbox-table multi-table-view table-list-scrolling s2 scrolling"
        >
          <ul class="thead">
            <li>
              <div class="preview-img sorting flex7"></div>
              <div class="categary-name sorting flex30">
                <span>Asset Name</span>
              </div>
              <div class="assets sorting flex18">
                <span>Asset Type</span>
              </div>
              <div class="update-date sorting flex18">
                <span>Date Uploaded</span>
              </div>
              <div class="size sorting flex12">
                <span>Size</span>
              </div>
              <div class="categary-action sorting flex15 text-right">
                <div class="">Action</div>
              </div>
            </li>
          </ul>
          <div class="customscrollbar" @scroll="onScroll">
            <ul class="tbody" style="padding: 1px 0">
              <template v-for="entry in fileEntries">
                <li
                  v-if="entry['.tag'] === 'folder'"
                  :key="entry.id"
                  :ref="`item${entry.id}`"
                  class="folder-list"
                  :class="{ highlighted: highlightItem.id === entry.id }"
                >
                  <div class="preview-img tb-column flex7">
                    <!-- <label class="check-label">
                      <input type="checkbox" name="" />
                      <span class="check-span"></span>
                    </label> -->
                    <div class="categary-image folder-image">
                      <a
                        class="img-link"
                        @click="dropboxEnabled ? handleEntryClick(entry) : ''"
                      >
                        <span>
                          <img
                            src="~/assets/img/folder-icon.svg"
                            width="48"
                            alt="Folder Icon"
                          />
                          <!-- <b>0 Asset</b> -->
                        </span>
                      </a>
                      <div class="video-info">
                        <div class="upper-info">
                          <div class="d-flex align-items-center">
                            <div class="dropdown more-options">
                              <button
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
                                  <g
                                    id="Group_4482"
                                    transform="translate(-872 -801)"
                                  >
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
                              <ul class="dropdown-menu">
                                <li>
                                  <a
                                    class="dropdown-item"
                                    href="javascript:void(0);"
                                    data-toggle="modal"
                                    data-target="#move"
                                    @click="
                                      () => {
                                        if (dropboxEnabled) {
                                          showFileMove = true
                                          fileToMove = entry
                                          moveType = 'move'
                                        }
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
                                <li>
                                  <a
                                    class="dropdown-item"
                                    href="javascript:void(0);"
                                    data-toggle="modal"
                                    data-target="#move"
                                    @click="
                                      () => {
                                        if (dropboxEnabled) {
                                          showFileMove = true
                                          fileToMove = entry
                                          moveType = 'copy'
                                        }
                                      }
                                    "
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
                                    href="javascript:void(0);"
                                    data-toggle="modal"
                                    data-target="#sharePopup"
                                    @click="
                                      () => {
                                        if (dropboxEnabled) {
                                          sharableMedia = entry
                                          shareMediaType = entry['.tag']
                                          shareableLink = ''
                                        }
                                      }
                                    "
                                  >
                                    <span class="dropdown-item-icon">
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
                                      </svg>
                                    </span>
                                    Share
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item"
                                    @click="
                                      () => {
                                        if (dropboxEnabled) {
                                          downloadZip(entry.path_display)
                                        }
                                      }
                                    "
                                  >
                                    <span class="dropdown-item-icon">
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
                                      </svg>
                                    </span>
                                    Download
                                  </a>
                                </li>
                                <li
                                  @click="
                                    () => {
                                      if (dropboxEnabled) {
                                        fileToDelete = entry
                                        deleteFileType = entry['.tag']
                                      }
                                    }
                                  "
                                >
                                  <a
                                    class="dropdown-item"
                                    href="javascript:void(0);"
                                    data-toggle="modal"
                                    data-target="#delete"
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="categary-name tb-column flex30">
                    <div class="top-column">
                      <div class="rename-text">
                        <a
                          v-tooltip="entry.name"
                          title
                          @click="
                            () => {
                              if (dropboxEnabled) {
                                handleEntryClick(entry)
                              }
                            }
                          "
                          >{{ entry.name }}</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="assets tb-column flex18">
                    <div class="top-column">
                      <label>-</label>
                    </div>
                  </div>
                  <div class="update-date tb-column flex18">
                    <div class="top-column">
                      <label>-</label>
                    </div>
                  </div>
                  <div class="size tb-column flex12">
                    <div class="top-column">
                      <label>-</label>
                    </div>
                  </div>
                  <div class="categary-action tb-column flex15">
                    <div class="top-column">
                      <div class="categary-actions">
                        <a
                          data-toggle="modal"
                          data-target="#sharePopup"
                          @click="
                            () => {
                              if (dropboxEnabled) {
                                sharableMedia = entry
                                shareMediaType = entry['.tag']
                                shareableLink = ''
                              }
                            }
                          "
                        >
                          <svg
                            id="Layer_1"
                            class="share-icon h-orange"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Share Folder"
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
                              <g
                                id="Group_4482"
                                transform="translate(-872 -801)"
                              >
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
                            <!-- move -->
                            <li>
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                data-toggle="modal"
                                data-target="#move"
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      showFileMove = true
                                      fileToMove = entry
                                      moveType = 'move'
                                    }
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
                            <!-- copy -->
                            <li>
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                data-toggle="modal"
                                data-target="#move"
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      showFileMove = true
                                      fileToMove = entry
                                      moveType = 'copy'
                                    }
                                  }
                                "
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
                            <!-- download -->
                            <li>
                              <a
                                class="dropdown-item"
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      downloadZip(entry.path_display)
                                    }
                                  }
                                "
                              >
                                <span class="dropdown-item-icon">
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
                                  </svg>
                                </span>
                                Download
                              </a>
                            </li>
                            <!-- delete -->
                            <li
                              @click="
                                () => {
                                  if (dropboxEnabled) {
                                    fileToDelete = entry
                                    deleteFileType = entry['.tag']
                                  }
                                }
                              "
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                data-toggle="modal"
                                data-target="#delete"
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
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  v-else
                  :ref="`item${entry.id}`"
                  :key="entry.id"
                  :class="{ highlighted: highlightItem.id === entry.id }"
                >
                  <div class="preview-img tb-column flex7">
                    <!-- <label class="check-label">
                      <input type="checkbox" name="" />
                      <span class="check-span"></span>
                    </label> -->
                    <div class="categary-image">
                      <a
                        class="img-link"
                        :style="{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }"
                        @click="
                          () => {
                            if (dropboxEnabled) {
                              handleEntryClick(entry)
                            }
                          }
                        "
                      >
                        <template v-if="hasThumb(entry)">
                          <div v-if="entry.meta.thumb" class="icons">
                            <img
                              v-if="entry.meta.thumb"
                              style="height: 100%"
                              :src="entry.meta.thumb"
                            />
                          </div>
                          <img
                            v-else-if="entry.meta.source"
                            style="height: 100%"
                            :src="entry.meta.source"
                          />
                          <img
                            v-else
                            style="height: 64px"
                            src="~/assets/img/loading.gif"
                          />
                        </template>
                        <div v-else class="icons">
                          <img
                            src="~/assets/img/file/unknown.svg"
                            style="height: 80%"
                          />
                        </div>
                      </a>
                      <div class="video-info">
                        <div class="upper-info">
                          <div class="tags">
                            <span>{{ fileExtension(entry) }}</span>
                          </div>
                          <div class="dropdown more-options">
                            <button
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
                                <g
                                  id="Group_4482"
                                  transform="translate(-872 -801)"
                                >
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
                            <ul class="dropdown-menu">
                              <!-- adding file to dam -->
                              <li
                                v-if="
                                  entry.meta.damIntegrationState === 'adding'
                                "
                                @click.prevent.capture.stop
                              >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  disabled
                                  style="pointer-events: none"
                                  @click.prevent.capture.stop
                                >
                                  <span class="dropdown-item-icon">
                                    <img
                                      :style="{
                                        height: '14px',
                                        minHeight: '14px',
                                        maxHeight: '14px',
                                        width: '14px',
                                        minWidth: '14px',
                                        maxWidth: '14px',
                                      }"
                                      :src="require('~/assets/img/loading.gif')"
                                    />
                                  </span>
                                  Adding...
                                </a>
                              </li>
                              <!-- view in DAM -->
                              <li
                                v-else-if="
                                  entry.meta.damIntegrationState === 'active'
                                "
                              >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  @click="
                                    () => {
                                      if (dropboxEnabled) {
                                        viewFileInDAM(entry)
                                      }
                                    }
                                  "
                                >
                                  <span class="dropdown-item-icon">
                                    <svg
                                      id="Layer_1"
                                      class="view-icon"
                                      data-toggle="tooltip"
                                      title=""
                                      data-original-title="View Time Log History"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      x="0px"
                                      y="0px"
                                      viewBox="0 0 18 18"
                                      xml:space="preserve"
                                    >
                                      <g
                                        id="Group_4485"
                                        transform="translate(-1206 -273)"
                                      >
                                        <rect
                                          id="Rectangle_3023"
                                          x="1206"
                                          y="273"
                                          class="fill-hide"
                                          width="18"
                                          height="18"
                                        ></rect>
                                        <g
                                          id="Icon_feather-eye"
                                          transform="translate(592.345 127.486)"
                                        >
                                          <g id="Path_3357">
                                            <path
                                              id="Path_3359"
                                              class="fill-color"
                                              d="M622.7,161.3c-5.6,0-8.8-6.2-8.9-6.4c-0.1-0.2-0.1-0.5,0-0.7c0.1-0.3,3.3-6.4,8.9-6.4s8.8,6.2,8.9,6.4c0.1,0.2,0.1,0.5,0,0.7C631.4,155.1,628.3,161.3,622.7,161.3z M615.3,154.5c0.7,1.2,3.4,5.2,7.4,5.2s6.7-4,7.4-5.2c-0.7-1.2-3.4-5.2-7.4-5.2S616,153.3,615.3,154.5z"
                                            ></path>
                                          </g>
                                          <g id="Path_3358">
                                            <path
                                              id="Path_3360"
                                              class="fill-color"
                                              d="M622.7,157.5c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3l0,0C625.7,156.2,624.3,157.5,622.7,157.5z M622.7,153c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5l0,0C624.2,153.7,623.5,153,622.7,153z"
                                            ></path>
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </span>
                                  View In DAM
                                </a>
                              </li>
                              <!-- add to DAM -->
                              <li
                                v-else-if="
                                  entry.meta.damIntegrationState === 'add'
                                "
                                v-tooltip="
                                  storageFull
                                    ? 'You have consumed all of your DAM storage quota.'
                                    : entry.size + storageUsed > storageTotal
                                    ? 'Adding this file will exceed your DAM storage quota.'
                                    : ''
                                "
                              >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  :style="
                                    storageFull ||
                                    entry.size + storageUsed > storageTotal
                                      ? 'pointer-events:none;opacity:0.4'
                                      : ''
                                  "
                                  @click.prevent.capture.stop="
                                    storageFull ||
                                    entry.size + storageUsed > storageTotal ||
                                    !dropboxEnabled
                                      ? null
                                      : addFileToDAM(entry)
                                  "
                                >
                                  <span class="dropdown-item-icon">
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
                                  </span>
                                  Add to DAM
                                </a>
                              </li>
                              <!-- move -->
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  data-toggle="modal"
                                  data-target="#move"
                                  @click="
                                    () => {
                                      if (dropboxEnabled) {
                                        showFileMove = true
                                        fileToMove = entry
                                        moveType = 'move'
                                      }
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
                              <!-- copy -->
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  data-toggle="modal"
                                  data-target="#move"
                                  @click="
                                    () => {
                                      if (dropboxEnabled) {
                                        showFileMove = true
                                        fileToMove = entry
                                        moveType = 'copy'
                                      }
                                    }
                                  "
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
                              <!-- share -->
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  data-toggle="modal"
                                  data-target="#sharePopup"
                                  @click="
                                    () => {
                                      if (dropboxEnabled) {
                                        sharableMedia = entry
                                        shareMediaType = entry['.tag']
                                        shareableLink = ''
                                      }
                                    }
                                  "
                                >
                                  <span class="dropdown-item-icon">
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
                                    </svg>
                                  </span>
                                  Share
                                </a>
                              </li>
                              <!-- download -->
                              <li
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      downloadFile(entry)
                                    }
                                  }
                                "
                              >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                >
                                  <span class="dropdown-item-icon">
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
                                    </svg>
                                  </span>
                                  Download
                                </a>
                              </li>
                              <!-- delete -->
                              <li
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      fileToDelete = entry
                                      deleteFileType = entry['.tag']
                                    }
                                  }
                                "
                              >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0);"
                                  data-toggle="modal"
                                  data-target="#delete"
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
                            </ul>
                          </div>
                        </div>
                        <!-- <div class="down-info">
                          <a href="img/resource-img1.jpg" data-fancybox="">
                            <svg
                              class="expand-icon white"
                              version="1.1"
                              id="Layer_1"
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
                              ></path>
                            </svg>
                          </a>
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="categary-name tb-column flex30">
                    <div class="top-column">
                      <a
                        v-tooltip="entry.name"
                        href="javascript:void(0);"
                        title
                        @click="
                          () => {
                            if (dropboxEnabled) {
                              handleEntryClick(entry)
                            }
                          }
                        "
                        >{{ entry.name }}</a
                      >
                    </div>
                  </div>
                  <div class="assets tb-column flex18">
                    <div class="top-column">
                      <span>{{ entry.name.split('.').slice(-1)[0] }}</span>
                    </div>
                  </div>
                  <div class="update-date tb-column flex18">
                    <div class="top-column">
                      <label :title="entry.client_modified">{{
                        $moment(entry.client_modified).format('DD MMM YYYY')
                      }}</label>
                    </div>
                  </div>
                  <div class="size tb-column flex12">
                    <div class="top-column">
                      <label>{{ getReadableSize(entry.size) }}</label>
                    </div>
                  </div>
                  <div class="categary-action tb-column flex15">
                    <div class="top-column">
                      <div class="categary-actions">
                        <a
                          data-toggle="modal"
                          data-target="#sharePopup"
                          @click="
                            () => {
                              if (dropboxEnabled) {
                                sharableMedia = entry
                                shareMediaType = entry['.tag']
                                shareableLink = ''
                              }
                            }
                          "
                        >
                          <svg
                            id="Layer_1"
                            class="share-icon h-orange"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Share Image"
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
                              <g
                                id="Group_4482"
                                transform="translate(-872 -801)"
                              >
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
                            <!-- adding file to dam -->
                            <li
                              v-if="entry.meta.damIntegrationState === 'adding'"
                              @click.prevent.capture.stop
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                disabled
                                style="pointer-events: none"
                                @click.prevent.capture.stop
                              >
                                <span class="dropdown-item-icon">
                                  <img
                                    style="height: 14px"
                                    :src="require('~/assets/img/loading.gif')"
                                  />
                                </span>
                                Adding...
                              </a>
                            </li>
                            <!-- view in DAM -->
                            <li
                              v-else-if="
                                entry.meta.damIntegrationState === 'active'
                              "
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      viewFileInDAM(entry)
                                    }
                                  }
                                "
                              >
                                <span class="dropdown-item-icon">
                                  <svg
                                    id="Layer_1"
                                    class="view-icon"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="View Time Log History"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 18 18"
                                    xml:space="preserve"
                                  >
                                    <g
                                      id="Group_4485"
                                      transform="translate(-1206 -273)"
                                    >
                                      <rect
                                        id="Rectangle_3023"
                                        x="1206"
                                        y="273"
                                        class="fill-hide"
                                        width="18"
                                        height="18"
                                      ></rect>
                                      <g
                                        id="Icon_feather-eye"
                                        transform="translate(592.345 127.486)"
                                      >
                                        <g id="Path_3357">
                                          <path
                                            id="Path_3359"
                                            class="fill-color"
                                            d="M622.7,161.3c-5.6,0-8.8-6.2-8.9-6.4c-0.1-0.2-0.1-0.5,0-0.7c0.1-0.3,3.3-6.4,8.9-6.4s8.8,6.2,8.9,6.4c0.1,0.2,0.1,0.5,0,0.7C631.4,155.1,628.3,161.3,622.7,161.3z M615.3,154.5c0.7,1.2,3.4,5.2,7.4,5.2s6.7-4,7.4-5.2c-0.7-1.2-3.4-5.2-7.4-5.2S616,153.3,615.3,154.5z"
                                          ></path>
                                        </g>
                                        <g id="Path_3358">
                                          <path
                                            id="Path_3360"
                                            class="fill-color"
                                            d="M622.7,157.5c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3l0,0C625.7,156.2,624.3,157.5,622.7,157.5z M622.7,153c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5l0,0C624.2,153.7,623.5,153,622.7,153z"
                                          ></path>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                View In DAM
                              </a>
                            </li>
                            <!-- add to DAM -->
                            <li
                              v-else-if="
                                entry.meta.damIntegrationState === 'add'
                              "
                              v-tooltip="
                                storageFull
                                  ? 'You have consumed all of your DAM storage quota.'
                                  : entry.size + storageUsed > storageTotal
                                  ? 'Adding this file will exceed your DAM storage quota.'
                                  : ''
                              "
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                :style="
                                  storageFull ||
                                  entry.size + storageUsed > storageTotal
                                    ? 'pointer-events:none;opacity:0.4'
                                    : ''
                                "
                                @click.prevent.capture.stop="
                                  storageFull ||
                                  entry.size + storageUsed > storageTotal ||
                                  !dropboxEnabled
                                    ? null
                                    : addFileToDAM(entry)
                                "
                              >
                                <span class="dropdown-item-icon">
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
                                </span>
                                Add to DAM
                              </a>
                            </li>
                            <!-- move -->
                            <li>
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                data-toggle="modal"
                                data-target="#move"
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      showFileMove = true
                                      fileToMove = entry
                                      moveType = 'move'
                                    }
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
                            <!-- copy -->
                            <li>
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                data-toggle="modal"
                                data-target="#move"
                                @click="
                                  () => {
                                    if (dropboxEnabled) {
                                      showFileMove = true
                                      fileToMove = entry
                                      moveType = 'copy'
                                    }
                                  }
                                "
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
                            <!-- download -->
                            <li
                              @click="
                                () => {
                                  if (dropboxEnabled) {
                                    downloadFile(entry)
                                  }
                                }
                              "
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                              >
                                <span class="dropdown-item-icon">
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
                                  </svg>
                                </span>
                                Download
                              </a>
                            </li>
                            <li
                              @click="
                                () => {
                                  if (dropboxEnabled) {
                                    fileToDelete = entry
                                    deleteFileType = entry['.tag']
                                  }
                                }
                              "
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                data-toggle="modal"
                                data-target="#delete"
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
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </template>
              <ContentLoader
                v-show="fetchingFiles"
                :speed="1"
                :animate="true"
                :height="6 * 70"
                width="100%"
                :style="{
                  height: `${6 * 70}px`,
                  width: '100%',
                  margin: '0 10px',
                }"
              >
                <rect
                  v-for="i in 6"
                  :key="i"
                  x="0"
                  :y="(i - 1) * 70 + 10"
                  rx="0"
                  ry="0"
                  width="100%"
                  height="60"
                />
                /></ContentLoader
              >
            </ul>
          </div>
        </div>

        <dropbox-gallery
          v-if="dropboxEnabled"
          :files="fileEntries.filter((e) => e['.tag'] === 'file')"
          :open.sync="galleryOpen"
          :dropbox-instance="dbx"
          :path="cwd"
          :active-file-id="galleryPreselectFile"
        ></dropbox-gallery>

        <!--  Select Folder Show Bar Bottom  -->
        <div class="select-bar" v-if="dropboxEnabled">
          <div class="select-left">
            <div class="select-all">
              <span>Select</span>
              <div class="custom-radio">
                <input id="all" type="radio" name="selectAll" />
                <label for="all">All</label>
              </div>
              <div class="custom-radio">
                <input id="none" type="radio" name="selectAll" />
                <label for="none">None</label>
              </div>
            </div>
            <span class="select-counter">1 Selected</span>
          </div>
          <div class="select-center">
            <ul>
              <li
                @click="
                  () => {
                    if (dropboxEnabled) {
                      fileToDelete = entry
                      deleteFileType = entry['.tag']
                    }
                  }
                "
              >
                <a
                  href="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#delete"
                >
                  Delete
                  <svg
                    id="Layer_1"
                    class="delete-icon white"
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
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#move"
                  @click="
                    () => {
                      if (dropboxEnabled) {
                        showFileMove = true
                        fileToMove = entry
                        moveType = 'move'
                      }
                    }
                  "
                >
                  Move
                  <svg
                    id="Layer_1"
                    class="move-icon white"
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
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div class="select-right">
            <ul>
              <li>
                <a
                  href="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#sharePopup"
                  @click="
                    () => {
                      if (dropboxEnabled) {
                        sharableMedia = entry
                        shareMediaType = entry['.tag']
                        shareableLink = ''
                      }
                    }
                  "
                >
                  Share
                  <svg
                    id="Layer_1"
                    class="share-icon white"
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
              </li>
              <li>
                <a href="javascript:void(0);">
                  Download
                  <svg
                    id="Layer_1"
                    class="download-icon white"
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
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!--  Add Category Modal  -->
        <div id="category" class="modal" v-if="dropboxEnabled">
          <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
          >
            <div class="modal-content bg-gray">
              <div class="modal-header">
                <h5 id="exampleModalLongTitle" class="modal-title">
                  Create Folder
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true"
                    ><svg
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
                      <g
                        id="Group_4358"
                        transform="translate(-69.745 -317.549)"
                      >
                        <path
                          id="Path_3424"
                          class="fill-color"
                          d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                        />
                        <path
                          id="Path_3425"
                          class="fill-color"
                          d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                        />
                      </g></svg
                  ></span>
                </button>
              </div>
              <div
                class="modal-body category-list"
                style="padding-bottom: 20px !important"
              >
                <input
                  v-model.trim="newFolderName"
                  type="text"
                  placeholder="Folder Name"
                  class="form-control"
                />
              </div>
              <div class="modal-footer justify-content-start">
                <button
                  type="button"
                  class="btn"
                  @click.stop="dropboxEnabled ? createFolder() : ''"
                >
                  Create
                </button>
                <button
                  ref="createFolderCloseBtn"
                  type="button"
                  class="btn btn-gray"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <img
                  v-show="creatingFolder"
                  :src="require('~/assets/img/loading.gif')"
                  height="16"
                  style="margin-left: 12px"
                />
                <!-- <span
                  v-show="!creatingFolder && fileCreateError"
                  style="color: red"
                  >&emsp;{{ fileCreateError }}</span
                > -->
              </div>
            </div>
          </div>
        </div>
        <!--  Move Category Modal  -->
        <move-file-modal
          v-if="showFileMove && fileToMove && dropboxEnabled"
          :dbx="dbx"
          :path="cwd"
          :open.sync="showFileMove"
          :file-data="fileToMove"
          :type="moveType"
          @moved="fetchContents()"
        />
        <!--  Share Modal  -->
        <div
          v-if="sharableMedia && dropboxEnabled"
          id="sharePopup"
          class="modal fade"
        >
          <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
          >
            <div class="modal-content bg-gray">
              <div class="modal-header">
                <h5 id="exampleModalLongTitle" class="modal-title">
                  {{
                    shareableLink
                      ? 'Create Share Link'
                      : `Share selected ${shareMediaType}`
                  }}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true"
                    ><svg
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
                      <g
                        id="Group_4358"
                        transform="translate(-69.745 -317.549)"
                      >
                        <path
                          id="Path_3424"
                          class="fill-color"
                          d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                        />
                        <path
                          id="Path_3425"
                          class="fill-color"
                          d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                        />
                      </g></svg
                  ></span>
                </button>
              </div>
              <div class="modal-body">
                <template v-if="!shareableLink">
                  <div class="share-wrapper">
                    <div class="share-box d-flex align-items-center">
                      <div
                        class="profile-bg flex-20"
                        :style="{
                          backgroundImage:
                            sharableMedia['.tag'] === 'folder'
                              ? `url(${require('~/assets/img/folder-icon.svg')})`
                              : hasThumb(sharableMedia)
                              ? `url(${
                                  sharableMedia.meta.thumb ||
                                  sharableMedia.meta.source
                                })`
                              : `url(${require('~/assets/img/file/unknown.svg')})`,
                        }"
                        :title="sharableMedia.name"
                      ></div>
                      <div class="share-name flex-80 pl-2">
                        <label>{{ sharableMedia.name }}</label>
                      </div>
                    </div>
                  </div>
                </template>
                <div
                  v-if="shareableLink"
                  class="mt-3 align-items-center"
                  style="display: flex"
                >
                  <div style="flex: 1 1 0%; padding-right: 1rem">
                    <input
                      type="text"
                      spellcheck="false"
                      readonly
                      onclick="this.setSelectionRange(0, this.value.length)"
                      class="form-control m-0"
                      :value="shareableLink"
                    />
                  </div>
                  <div>
                    <button
                      v-clipboard="() => shareableLink"
                      v-clipboard:success="() => (copySuccess = true)"
                      v-clipboard:error="
                        () => $toast.global.error('Copy failed')
                      "
                      class="btn btn-big"
                    >
                      {{ copySuccess ? 'Copied!' : 'Copy' }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="!shareableLink" class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  :disabled="creatingShareLink"
                  @click="
                    dropboxEnabled
                      ? getShareableLink(sharableMedia.path_display)
                      : ''
                  "
                >
                  {{ creatingShareLink ? 'Creating...' : 'Create link' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--  Delete Folder Modal  -->
        <div
          v-if="fileToDelete && dropboxEnabled"
          id="delete"
          class="modal fade"
        >
          <div
            class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true"
                    ><svg
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
                      <g
                        id="Group_4358"
                        transform="translate(-69.745 -317.549)"
                      >
                        <path
                          id="Path_3424"
                          class="fill-color"
                          d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                        />
                        <path
                          id="Path_3425"
                          class="fill-color"
                          d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                        />
                      </g></svg
                  ></span>
                </button>
              </div>
              <div class="modal-body text-center">
                <p>
                  Are you sure you want to delete the
                  {{ deleteFileType === 'folder' ? 'folder' : 'file' }}?
                </p>
                <div class="btn-group">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-gray"
                    data-dismiss="modal"
                    >No</a
                  >
                  <a
                    class="btn"
                    data-dismiss="modal"
                    @click="dropboxEnabled ? deleteFile(fileToDelete) : ''"
                  >
                    Yes</a
                  >
                  <img
                    v-show="deleteProgress"
                    src="~/assets/img/loading.gif"
                    height="16"
                    style="margin-left: 12px; margin-top: 7px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        ref="fileUploader"
        :key="uploadKey"
        type="file"
        hidden
        @change="handleFile"
      />
      <Dialog
        ref="dialog"
        :show-add="fileViewShowAdd"
        :adding-to-dam="fileToView.meta.damIntegrationState === 'adding'"
        :status-text="fileViewStatus"
        @add="addFileToDAM(fileToView, true)"
      />
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import Dialog from './dam-view-dialog.vue'
import DropboxGallery from './dropbox-gallery'
import MoveFileModal from './move-file-modal'
import DropboxBreadcrumb from './dropbox-breadcrumb'
import { supportedThumbnails, blobTobase64, formatBytes } from './utils'
import zipShot from '~/mixins/zipShot'
const { Dropbox } = require('dropbox')
const FileSaver = require('file-saver')

// fallback thumbnails required from ~/assets/img/file/
const localThumbnails = [
  'ai',
  'csv',
  'doc',
  'docx',
  'eps',
  'exe',
  'html',
  'log',
  'pdf',
  'ppt',
  'pptx',
  'psd',
  'rar',
  'rtf',
  'tif',
  'tiff',
  'ttf',
  'txt',
  'xd',
  'xls',
  'xlsx',
  'xml',
  'zip',
  'md',
  'js',
  'vue',
]

export default {
  components: {
    DropboxGallery,
    MoveFileModal,
    DropboxBreadcrumb,
    ContentLoader,
    Dialog,
  },
  mixins: [zipShot],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
    ({ redirect, params, query }) => {
      return redirect({
        name: 'workspace_id-dam-integrations',
        params,
        query,
      })
    },
  ],
  props: {
    path: { type: String, default: '' },
  },
  data() {
    return {
      showFileMove: false,
      viewType: 'grid',
      galleryOpen: false,
      galleryPreselectFile: '',
      dbx: null,
      filesGetCursor: null,
      hasMoreFiles: false,
      fileEntries: [],
      cwd: '',
      newFolderName: '',
      createFolderDialog: false,
      sharableMedia: null,
      shareMediaType: 'file',
      shareableLink: '',
      fileToDelete: null,
      deleteFileType: 'file',
      fileToMove: null,
      moveType: 'move',
      uploadKey: 0,
      fileCreateError: '',
      fetchingFiles: false,
      deleteProgress: false,
      creatingFolder: false,
      uploadProgress: false,
      creatingShareLink: false,
      copySuccess: false,
      damFolderId: undefined,
      fileViewStatus: '',
      fileViewShowAdd: true,
      fileToView: { meta: {} },
      highlightItem: {},
    }
  },
  computed: {
    internalIntegrationEnabled() {
      return (
        this.dropboxEnabled ||
        this.dropboxEntEnabled ||
        this.boxEnabled ||
        this.driveEnabled
      )
    },
    dropboxEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.dropbox_integration?.enable
    },
    dropboxEntEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.dropbox_enterprise_integration?.enable
    },
    boxEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.box_integration?.enable
    },
    driveEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.google_drive_integration?.enable
    },
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    storageUsed() {
      return this.$store.state.dam.storage?.used
    },
    storageTotal() {
      return this.$store.state.dam.storage?.total
    },
    getReadableSize() {
      return (size) => formatBytes(size)
    },
    hasThumb() {
      return (fileEntry) => {
        if (fileEntry['.tag'] === 'folder') return false

        const ext = fileEntry.path_display.substring(
          fileEntry.path_display.lastIndexOf('.') + 1
        )
        return (
          supportedThumbnails.includes(ext.toLowerCase()) ||
          localThumbnails.includes(ext.toLowerCase()) ||
          ['mp3'].includes(ext.toLowerCase())
        )
      }
    },
    fileExtension() {
      return (file) =>
        file['.tag'] === 'folder'
          ? null
          : file.name.lastIndexOf('.') > 0
          ? file.name.split('.').pop()
          : 'UNKNOWN'
    },
  },
  watch: {
    path: {
      handler(n) {
        this.cwd = n
        this.fetchContents()
      },
    },
    cwd: {
      handler(n) {
        const query = { ...this.$route.query }
        if (n && n.length && query.source === 'dropbox') query.path = n
        else delete query.path
        this.$router.push({
          path: this.$route.path,
          query,
        })
      },
    },
    copySuccess(n) {
      if (n) {
        setTimeout(() => {
          this.copySuccess = false
        }, 1000)
      }
    },
  },
  async mounted() {
    const accessToken = await this.getDropboxToken()
    if (!accessToken) return
    this.dbx = new Dropbox({ accessToken })
    const query = { ...this.$route.query }
    if (query.path) this.cwd = query.path
    const { workspace_id } = this.$route.params
    try {
      this.$axios
        .$post('digital-assets/category/create-internal-category', {
          url_workspace_id: workspace_id,
          workspace_id,
          folder_name: 'Dropbox files',
          integration_type: 1,
        })
        .then((r) => {
          this.damFolderId = r.data.id
        })
    } catch (_) {}
    this.fetchContents()
  },
  methods: {
    // removes all templates and metadata for a file
    // async clearMeta(file) {
    //   const templates = await (
    //     await this.dbx.filePropertiesTemplatesListForUser()
    //   ).result?.template_ids
    //   for await (const template of templates) {
    //     await this.removeTemplate(template)
    //   }
    // },
    async clearDamOnFile(file) {
      if (!this.dropboxEnabled) return
      const templates = await (
        await this.dbx.filePropertiesTemplatesListForUser()
      ).result?.template_ids
      if (!templates.length) return
      let damTemplate

      for await (const template of templates) {
        const templateData = await this.dbx.filePropertiesTemplatesGetForUser({
          template_id: template,
        })
        if (templateData?.result?.name === 'DAM Import') {
          damTemplate = template
          break
        }
      }
      if (damTemplate) {
        await this.dbx.filePropertiesPropertiesRemove({
          path: file.path_display,
          property_template_ids: [damTemplate],
        })
      }
    },
    /**
     * Removes a template from dropbox
     * @param template_id
     * @returns {Promise<DropboxResponse<void>>}
     */
    // async removeTemplate(template_id) {
    //   return await this.dbx.filePropertiesTemplatesRemoveForUser({
    //     template_id,
    //   })
    // },
    /**
     * Adds DAM template definition for a file in dropbox
     * @param file
     * @returns {Promise<DropboxResponse<file_properties.AddTemplateResult>>}
     */
    async addTemplate(file) {
      if (!this.dropboxEnabled) return
      try {
        return await this.dbx.filePropertiesTemplatesAddForUser({
          name: 'DAM Import',
          description: 'This links a dropbox file to a DAM folder',
          fields: [
            {
              name: 'damFileId',
              description: 'damFileId',
              type: 'string',
            },
          ],
        })
      } catch (e) {
        if (file) file.meta.damIntegrationState = 'add'
        console.error(e)
      }
    },
    /**
     * lists all template definitions for current account
     * @param file
     * @returns {Promise<DropboxResponse<file_properties.ListTemplateResult>>}
     */
    async listTemplates(file) {
      try {
        return await this.dbx.filePropertiesTemplatesListForUser()
      } catch (e) {
        if (file) file.meta.damIntegrationState = 'add'
        console.error(e)
      }
    },
    /**
     * Fetches schema definition for a dropbox template
     * @param file
     * @param template_id
     * @returns {Promise<DropboxResponse<file_properties.GetTemplateResult>>}
     */
    async getTemplateSchema(file, template_id) {
      try {
        return await this.dbx.filePropertiesTemplatesGetForUser({ template_id })
      } catch (e) {
        if (file) file.meta.damIntegrationState = 'add'
        console.error(e)
      }
    },
    /**
     * Adds property to a dropbox file
     * Conflicting DAM file id will be overwritten
     * @param file
     * @param template_id
     * @param damFileId
     * @returns {Promise<null|*>}
     */
    async addFileProperty(file, template_id, damFileId) {
      if (!this.dropboxEnabled) return
      try {
        await this.dbx.filePropertiesPropertiesAdd({
          path: file.path_display,
          property_groups: [
            {
              template_id,
              fields: [
                {
                  name: 'damFileId',
                  value: damFileId + '',
                },
              ],
            },
          ],
        })
        return null
      } catch (e) {
        // property already exists in dropbox template
        if (e.status === 409) {
          const { result: { property_groups = [] } = {} } =
            await this.getFileMetadata(file, template_id)
          if (!property_groups.length) {
            this.$toast.error('Unknown error occurred')
            return e
          }
          const { fields } =
            property_groups.find((e) => e.template_id === template_id) || {}
          const property = fields
            ? fields.find((e) => e.name === 'damFileId') || {}
            : {}
          if (property.value === String(damFileId)) {
            return null
          }
          await this.dbx.filePropertiesPropertiesOverwrite({
            path: file.path_display,
            property_groups: [
              {
                template_id,
                fields: [
                  {
                    name: 'damFileId',
                    value: String(damFileId),
                  },
                ],
              },
            ],
          })
          return null
        } else {
          this.$toast.error('Unknown error occurred')
          return e
        }
      }
    },
    /**
     * fetches metadata for a file
     * @param file dropbox file
     * @param tid dropbox template_id
     * @returns {Promise<DropboxResponse<files.FileMetadataReference | files.FolderMetadataReference | files.DeletedMetadataReference>>}
     */
    async getFileMetadata(file, tid) {
      if (!this.dropboxEnabled) return
      if (!(tid || '').length) {
        return {}
      }
      return await this.dbx.filesGetMetadata({
        path: file.path_display,
        include_property_groups: {
          '.tag': 'filter_some',
          filter_some: [tid],
        },
      })
    },
    /**
     * imports a file into DAM in 4 steps
     * STEP1: generate temporary link to file
     * STEP2: fetch file stream
     * STEP3: upload file to s3
     * STEP4: upload s3 data to backend
     * @param file
     * @returns {Promise<void>}
     */
    async addFileToDAM(file = this.fileToView, redirect) {
      if (!this.dropboxEnabled) return
      if (this.storageFull) {
        this.$toast.global.error(
          'You have consumed all of your DAM storage quota.'
        )
        return
      }
      if (file.size + this.storageUsed > this.storageTotal) {
        this.$toast.global.error(
          'Adding this file will exceed your DAM storage quota.'
        )
        return
      }
      try {
        if (!this.damFolderId) {
          this.$toast.error('Oops, unknown error occurred.')
          return
        }
        file.meta.damIntegrationState = 'adding'
        Object.assign(this.fileToView, file)

        const { workspace_id } = this.$route.params
        const { result } = await this.dbx.filesGetTemporaryLink({
          path: file.path_display,
        })

        const { data: binary, headers } = await axios.get(result.link, {
          responseType: 'blob',
        })

        const formData = new FormData()
        formData.append('file', binary)
        formData.append('mimeType', headers['content-type'])
        const { data: s3Response } = await axios.post('/s3/upload', formData, {
          params: { workspaceId: workspace_id },
        })

        const file_extension = file.name.substring(
          file.name.lastIndexOf('.') + 1
        )
        const { data: uploadResponse } = await this.$axios.$post(
          `digital-assets/upload`,
          {
            workspace_id,
            file_name: s3Response.assetId,
            display_file_name: file.name,
            display_file: s3Response.signedUrl,
            auto_tag: false,
            mime_type: headers['content-type'],
            file_extension,
            file_size: file.size,
            category_id: this.damFolderId,
          },
          { params: { url_workspace_id: workspace_id } }
        )
        await this.updateFileMeta(file, uploadResponse.id)

        if (file_extension.toLowerCase() === 'zip') {
          const zipThumbnail = await this.getZipShot({
            ext: 'zip',
            blob: binary,
          })

          const thumbnailResponse = await this.uploadThumbnail(
            zipThumbnail,
            file.name,
            s3Response.assetId
          )

          if (thumbnailResponse?.signedUrl) {
            await this.$axios
              .$post('digital-assets/upload-zipfile-preview', {
                workspace_id,
                asset_id: uploadResponse.id,
                compress_file: thumbnailResponse.signedUrl,
              })
              .catch(console.error)
          }
        }
        if (!redirect) {
          file.meta.damIntegrationState = 'active'
          this.fileToView.meta.damIntegrationState = 'active'
        }
        if (redirect && this.$refs.dialog?.model) {
          this.$router.push({
            name: 'workspace_id-dam-files-id',
            params: {
              workspace_id: this.$getWorkspaceId(),
              id: uploadResponse.id,
              came_from_hash: (this.$router.hash || '').replace('#', ''),
            },
            // hash: `#${parentFolder.parent_id || ''}`
          })
        }
      } catch (e) {
        file.meta.damIntegrationState = 'add'
        this.$toast.error(e)
      }
    },
    uploadThumbnail(zipThumbnail, fileName, assetId) {
      if (!this.dropboxEnabled) return
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const { data, headers } = await axios.get(zipThumbnail, {
            responseType: 'blob',
          })

          const file = new File([data], fileName, {
            type: headers['content-type'],
          })

          const formData = new FormData()
          formData.append('file', file)

          await axios
            .post('/s3/upload', formData, {
              params: {
                workspaceId: this.$getWorkspaceId(),
                compress: true,
                key: assetId,
              },
            })
            .then(({ data }) => resolve(data))
        } catch (e) {
          reject(e)
        }
      })
    },
    /**
     * Fetches file metadata and updates local file to navigate to
     * @param file
     * @param damFileId dam asset id
     * @returns {Promise<void>}
     */
    async updateFileMeta(file, damFileId) {
      if (!this.dropboxEnabled) return
      try {
        const { template_ids = [] } = await (
          await this.listTemplates(file)
        )?.result
        let templateId
        if (template_ids.length) {
          // filtering out template for DAM property
          const templates = await Promise.all(
            template_ids.map(async (id) => {
              return {
                id,
                ...(await (await this.getTemplateSchema(file, id)).result),
              }
            })
          )
          templateId = (templates.find((e) => e.name === 'DAM Import') || {}).id
        }
        if (!templateId) {
          file.meta.damIntegrationState = 'add'
          this.$toast.error('File template not found')
          return
        }
        const propertyError = await this.addFileProperty(
          file,
          templateId,
          damFileId
        )
        if (!propertyError) {
          file.meta.damIntegrationState = 'active'
          file.meta.damFileId = String(damFileId)
        } else {
          file.meta.damIntegrationState = 'add'
          this.$toast.error('Could not add metadata')
        }
      } catch (e) {
        file.meta.damIntegrationState = 'add'
        this.$toast.error(e)
      }
    },
    checkFileInstance(file) {
      if (!this.dropboxEnabled) return
      return new Promise((resolve, reject) => {
        const digital_assets_id = file?.meta?.damFileId
        if (!digital_assets_id) return resolve({ deleted: false })
        this.$axios
          .$post('digital-assets/view-detail', {
            digital_assets_id,
            workspace_id: this.$getWorkspaceId(),
          })
          .then((_) => resolve({ deleted: false }))
          .catch((e) => {
            // if (e?.response?.data?.code < 500) {
            return resolve({ deleted: true })
            // }
            // reject(e)
          })
      })
    },
    /**
     * Navigates to dam file
     * @param file
     */
    async viewFileInDAM(file) {
      if (!this.dropboxEnabled) return
      Object.assign(this.fileToView, file)
      this.fileViewStatus = 'Checking file...'
      this.fileViewShowAdd = false
      this.$refs.dialog.show()
      try {
        const { deleted } = await this.checkFileInstance(file)

        if (deleted) {
          await this.clearDamOnFile(file)
          file.meta.damIntegrationState = 'add'
          this.fileToView.meta.damIntegrationState = 'add'
          this.fileViewStatus =
            'This file was removed from DAM. Would you like to add?'
          this.fileViewShowAdd = true
          return
        }
        if (!file?.meta?.damFileId) {
          file.meta.damIntegrationState = 'add'
          this.fileToView.meta.damIntegrationState = 'add'
          this.fileViewStatus = 'File is not added into DAM.'
          this.fileViewShowAdd = true
          file.meta.damFileId = null
          return
        }
        if (this.$refs.dialog?.model)
          this.$router.push({
            name: 'workspace_id-dam-files-id',
            params: {
              workspace_id: this.$getWorkspaceId(),
              id: file.meta.damFileId,
              came_from_hash: (this.$router.hash || '').replace('#', ''),
            },
            // hash: `#${parentFolder.parent_id || ''}`
          })
      } catch (e) {
        this.fileViewStatus = 'An error occured.'
        this.$toast.global.error(e)
      }
    },
    /**
     * Scroll handler to fetch next set of files above 80% threshold
     * @param e browser scroll event
     */
    onScroll(e) {
      if (!this.dropboxEnabled) return
      const el = e.target
      if (!el) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 80 && this.hasMoreFiles) {
        this.highlightItem = {}
        this.fetchContentsNext()
      }
    },
    /**
     * Generates a shareable link to a file
     * @param path string
     */
    getShareableLink(path) {
      if (!this.dropboxEnabled) return
      if (this.creatingShareLink) return
      this.creatingShareLink = true
      this.dbx
        .sharingCreateSharedLinkWithSettings({ path })
        .then((res) => {
          this.shareableLink = res.result.url
        })
        .catch((e) => {
          if (!e.error) {
            this.$toast.global.error(this.$getErrorMessage(e))
            return
          }
          const { error } = e.error
          if (
            error['.tag'] === 'shared_link_already_exists' &&
            error.shared_link_already_exists
          ) {
            this.shareableLink = error.shared_link_already_exists.metadata.url
          } else if (
            error['.tag'] === 'path' &&
            error.path['.tag'] === 'not_found'
          ) {
            this.shareableLink = ''
            this.$toast.global.error(`This ${this.shareMediaType} was deleted`)
          } else {
            this.shareableLink = ''
            this.$toast.global.error(this.$getErrorMessage(e))
          }
        })
        .finally(() => {
          this.creatingShareLink = false
        })
    },
    /**
     * Attempts to generate a thumbnail
     * @param fileEntry
     * @returns {Promise<{thumb: null}|{source: unknown}|{thumb}|{thumb: *}>}
     */
    async getThumbnail(fileEntry) {
      const ext = fileEntry.path_display
        .substring(fileEntry.path_display.lastIndexOf('.') + 1)
        .toLowerCase()
      if (['mp3'].includes(ext.toLowerCase())) {
        return { thumb: require('~/assets/img/file/audio.svg') }
      }
      if (localThumbnails.includes(ext.toLowerCase())) {
        return {
          thumb: require('~/assets/img/file/' + ext.toLowerCase() + '.svg'),
        }
      }
      if (!this.hasThumb(fileEntry)) return { thumb: null }

      const res = await this.dbx.filesGetThumbnailV2({
        resource: {
          '.tag': 'path',
          path: fileEntry.path_display,
        },
        format: 'png',
        size: 'w256h256',
        mode: 'fitone_bestfit',
      })
      return { source: await blobTobase64(res.result.fileBlob) }
    },
    /**
     * Prepares and downloads zip from dropbox
     * @param path
     * @returns {Promise<void>}
     */
    async downloadZip(path) {
      if (!this.dropboxEnabled) return
      const resp = await this.dbx.filesDownloadZip({ path })
      FileSaver.saveAs(resp.result.fileBlob, resp.result.metadata.name)
    },
    /**
     * Creates a folder in dropbox
     */
    createFolder() {
      if (!this.dropboxEnabled) return
      const name = (this.newFolderName || '').trim()
      if (!name.length) return
      this.creatingFolder = true
      this.dbx
        .filesCreateFolderV2({ path: this.cwd + '/' + name })
        .then((r) => {
          this.fileEntries.unshift({
            ...r.result.metadata,
            '.tag': 'folder',
            meta: { isDeleting: false },
          })
          // this.fileCreateError = ''
          this.newFolderName = ''
          this.$refs.createFolderCloseBtn.click()
          this.$toast.global.success(`Folder created successfully.`)
        })
        .catch((e) => {
          this.$toast.global.error(
            e.status === 409
              ? 'Duplicate folder exists.'
              : this.$getErrorMessage(e)
          )
          // this.fileCreateError = e.error
        })
        .finally(() => (this.creatingFolder = false))
    },
    /**
     * Attempts to delete a file from dropbox
     * @param file
     */
    deleteFile(file) {
      if (!this.dropboxEnabled) return
      this.deleteProgress = true
      file.meta.isDeleting = true
      this.dbx
        .filesDeleteV2({
          path: file.path_display,
        })
        .then((r) => {
          this.fileEntries = this.fileEntries.filter(
            (e) => e.id !== r.result.metadata.id
          )
          this.$toast.global.success(
            `${
              this.deleteFileType === 'file' ? 'File' : 'Folder'
            } deleted successfully.`
          )
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => (this.deleteProgress = false))
    },
    /**
     * Handler to upload files
     * @param e, browser input event
     */
    handleFile(e) {
      if (!this.dropboxEnabled) return
      if (!e.target.files[0] || this.uploadProgress) return
      this.uploadProgress = true
      this.dbx
        .filesUpload({
          path: this.cwd + '/' + e.target.files[0].name,
          strict_conflict: true,
          contents: e.target.files[0],
        })
        .then((res) => {
          this.fileEntries.unshift({
            ...res.result,
            '.tag': 'file',
            meta: {
              isDeleting: false,
              damFileId: undefined,
              damIntegrationState: 'add',
            },
          })
          this.updateEntries(this.fileEntries)
        })
        .catch((e) => {
          this.$toast.error(e)
        })
        .finally(() => {
          this.uploadKey++
          this.uploadProgress = false
        })
    },
    /**
     * Mock function to trigger upload dialog
     */
    uploadFile() {
      if (!this.dropboxEnabled) return
      if (this.uploadProgress) return
      this.$refs.fileUploader.click()
    },
    /**
     * Prepares breadcrumb for the current dropbox directory
     * @returns {[{path: string, name: string}]}
     */
    getBreadCrumbs() {
      const dirs = this.cwd.split('/').filter((e) => e)
      const n = [{ name: 'Home', path: '' }]
      dirs.forEach((v, i) => {
        n.push({ name: v, path: '/' + dirs.slice(0, i + 1).join('/') })
      })
      n[n.length - 1].leaf = true
      return n
    },
    /**
     * CLick handler for a file|folder,
     * Opens gallery (if entry is a file) or navigates to folder
     * @param entry file | folder
     */
    handleEntryClick(entry) {
      if (!this.dropboxEnabled) return
      if (entry['.tag'] === 'folder') {
        this.highlightItem = {}
        this.cwd = entry.path_display
        this.fetchContents()
      } else {
        this.galleryPreselectFile = entry.id
        this.galleryOpen = true
      }
    },
    /**
     * Navigates to a directory
     * @param breadcrumb
     */
    handleBreadcrumbClick(breadcrumb) {
      if (!this.dropboxEnabled) return
      if ((!breadcrumb.path && breadcrumb.name !== 'Home') || breadcrumb.leaf)
        return
      this.highlightItem = {}
      this.cwd = breadcrumb.path
      this.fetchContents()
    },
    /**
     * Fetches dropbox token
     * @returns {Promise<unknown>}
     */
    getDropboxToken() {
      if (!this.dropboxEnabled) return
      return new Promise((resolve) => {
        this.$axios
          .$get(
            'digital-assets/get-app-token?' +
              this.$toQueryString({ workspace_id: this.$getWorkspaceId() })
          )
          .then((res) => {
            resolve(res.data.dropbox.token)
          })
          .catch((_) => {
            resolve(null)
          })
      })
    },
    /**
     * Downloads a file from dropbox
     * @param file
     * @returns {Promise<void>}
     */
    async downloadFile(file) {
      if (!this.dropboxEnabled) return
      const res = await this.dbx.filesDownload({ path: file.path_display })
      FileSaver.saveAs(res.result.fileBlob, res.result.name)
    },
    updateEntries(entries) {
      if (!this.dropboxEnabled) return
      entries
        .filter(
          (e) => e['.tag'] === 'file' && !(e.meta?.thumb || e.meta?.source)
        )
        .forEach(async (e) => {
          e.meta = e.meta || {}
          const { thumb, source } = await this.getThumbnail(e)
          if (source) this.$set(e.meta, 'source', source)
          else this.$set(e.meta, 'thumb', thumb)
        })
    },
    /**
     * Fetches template_id for DAM template if available
     * Otherwise when `create` is set to `true` creates DAM template
     * @param create boolean
     * @returns {Promise<*|null>}
     */
    async getCurrentTemplate(create = false) {
      try {
        const { template_ids = [] } = await (await this.listTemplates())?.result
        let templateId
        if (template_ids.length) {
          // filtering out template for DAM property
          const templates = await Promise.all(
            template_ids.map(async (id) => {
              return {
                id,
                ...(await (await this.getTemplateSchema(null, id)).result),
              }
            })
          )
          templateId = (templates.find((e) => e.name === 'DAM Import') || {}).id
        }
        if (!templateId && create) {
          // no templates available, creating one
          templateId = await (await this.addTemplate()).result.template_id
        }
        return templateId
      } catch (e) {
        return null
      }
    },
    async fetchContents() {
      console.log('fetchContents')
      if (this.fetchingFiles) return
      this.fetchingFiles = true

      let propertyGroups, templateId
      try {
        templateId = await this.getCurrentTemplate(true)
        if (templateId) {
          propertyGroups = {
            '.tag': 'filter_some',
            filter_some: [templateId],
          }
        }
      } catch (e) {
        // caught
      }
      try {
        const response = await this.dbx.filesListFolder({
          path: this.cwd,
          limit: 25,
          include_property_groups: propertyGroups,
        })
        this.filesGetCursor = response.result.cursor
        this.fileEntries = response.result.entries.map((e) => {
          const damFileId = (
            (
              (
                e.property_groups.find((t) => t.template_id === templateId) ||
                {}
              ).fields || []
            ).find((t) => t.name === 'damFileId') || {}
          ).value
          return {
            ...e,
            meta: {
              isDeleting: false,
              // active = successfully added to dam, has valid id
              // adding = integration is in progress
              // add = asset is not yet added into DAM
              damIntegrationState: damFileId ? 'active' : 'add',
              // parent id on file meta, for future support
              damFolderId: undefined,
              damFileId,
            },
          }
        })
        this.hasMoreFiles = response.result.has_more
        const itemToHighlight = JSON.parse(JSON.stringify(this.highlightItem))
        if (itemToHighlight && Object.keys(itemToHighlight).length) {
          const fileToHighlight = await this.getOrFetchItem(
            itemToHighlight,
            templateId
          )
          if (fileToHighlight) {
            this.fileEntries.unshift(fileToHighlight)
            this.highlightItem = {}
            this.$nextTick(() => {
              this.highlight(itemToHighlight)
            })
          }
        }
        this.updateEntries(this.fileEntries)
        this.fetchingFiles = false
      } catch (error) {
        console.log(error)
        if (error.status === 401) {
          this.$axios
            .$post('digital-assets/update-app-token', {
              workspace_id: this.$getWorkspaceId(),
              dropbox_connect: 0,
            })
            .finally(() =>
              this.$store.dispatch('dropbox/setDisconnected', true)
            )
        } else this.$toast.error(error)
        this.fetchingFiles = false
      }
    },
    // todo: merge with fetchContents
    async fetchContentsNext() {
      if (this.fetchingFiles) return
      this.fetchingFiles = true
      let templateId
      try {
        templateId = await this.getCurrentTemplate(true)
      } catch (e) {
        // caught
      }

      try {
        const response = await this.dbx.filesListFolderContinue({
          cursor: this.filesGetCursor,
        })
        this.filesGetCursor = response.result.cursor
        const currentItems = this.fileEntries.map(({ id }) => id)
        response.result.entries = response.result.entries.filter(
          (e) => !currentItems.includes(e.id)
        )
        this.fileEntries.push(
          ...response.result.entries.map((e) => {
            const damFileId = (
              (
                (
                  e.property_groups.find((t) => t.template_id === templateId) ||
                  {}
                ).fields || []
              ).find((t) => t.name === 'damFileId') || {}
            ).value
            return {
              ...e,
              meta: {
                isDeleting: false,
                // active = successfully added to dam, has valid id
                // adding = adding integration is in progress
                // add = asset is not yet added into DAM
                damIntegrationState: damFileId ? 'active' : 'add',
                // parent id on file meta, for future support
                damFolderId: undefined,
                damFileId,
              },
            }
          })
        )
        this.fetchingFiles = false
        this.hasMoreFiles = response.result.has_more
        this.updateEntries(this.fileEntries)
      } catch (error) {
        this.fetchingFiles = false
        this.$toast.error(error)
      }
    },
    async getOrFetchItem(item = {}, templateId) {
      if (!this.dropboxEnabled) return
      const existing = this.fileEntries.find((e) => e.id === item.id)
      if (existing) return existing
      const result = (await this.getFileMetadata(item, templateId))?.result
      if (!result) return
      const damFileId = (
        (
          (
            result.property_groups.find((t) => t.template_id === templateId) ||
            {}
          ).fields || []
        ).find((t) => t.name === 'damFileId') || {}
      ).value
      return {
        ...result,
        meta: {
          isDeleting: false,
          damIntegrationState: damFileId ? 'active' : 'add',
          damFolderId: undefined,
          damFileId,
        },
      }
    },
    highlight(item) {
      if (!this.dropboxEnabled) return
      this.highlightItem = item
      if (this.fileEntries.find(({ id }) => id === item.id)) {
        this.$refs[`item${item.id}`][0].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }
    },
  },
}
</script>
<style scoped>
li.highlighted,
li.highlighted:hover {
  background: rgba(68, 94, 167, 0.1);
  box-shadow: 0 0 0px 0.5px #445ea7;
}
.breadcrumb-links ul li:nth-of-type(2) {
  padding-left: 0;
}
.breadcrumb-links ul li:nth-of-type(2)::before {
  content: none;
  display: none;
}
ul.add-dropdown {
  left: 50% !important;
  top: 100% !important;
  transform: translateX(-50%) !important;
}
ul.add-dropdown li > a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  clear: both;
  font-weight: normal;
  line-height: 1.55;
  color: #333;
  white-space: nowrap;
  position: relative;
  font-size: 13px;
}
ul.add-dropdown li > a:hover {
  background-color: #eff1f3;
  color: #3f4f6b;
  padding-left: 25px;
  padding-right: 5px;
  text-decoration: none;
}
.gridview svg path,
.listview svg path {
  fill: #757a85 !important;
}
.gridview.active svg path,
.listview.active svg path {
  fill: #ff8a01 !important;
}
</style>

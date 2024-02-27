<template>
  <div
    :class="{
      'grid-list': viewType === 'list',
      'grid-tile': viewType === 'grid',
    }"
    class="body-content-main h-100 resource-wrapper position-relative"
  >
    <template v-if="!boxEnabled">
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
      <div class="common-box-header" style="margin: 0">
        <div class="filter-left">
          <div class="breadcrumb-links">
            <ul style="align-items: center">
              <h2
                v-if="parentDetails.id === '0' || !breadcrumbs.length"
                class="title"
                style="padding-left: 6px"
              >
                Box
              </h2>
              <template v-else>
                <li style="cursor: pointer; padding-left: 6px">
                  <a
                    class="home-icon"
                    @click.stop="
                      () => {
                        if (boxEnabled) {
                          handleBreadcrumbClick()
                        }
                      }
                    "
                  >
                    <img alt="" src="~/assets/img/box.svg" width="24" />
                  </a>
                </li>
                <li
                  v-for="breadcrumb in breadcrumbs.slice(1)"
                  :key="breadcrumb.id"
                  style="cursor: pointer"
                  @click.stop="
                    boxEnabled ? handleBreadcrumbClick(breadcrumb.id) : ''
                  "
                >
                  <span>{{ breadcrumb.name }}</span>
                </li>
                <li>
                  <span>{{ parentDetails.name }}</span>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="table-filter">
          <ul>
            <li>
              <div class="dropdown show">
                <button
                  :style="{
                    height: '34px',
                    width: '34px',
                    backgroundColor: '#445ea7',
                    border: '1px solid #445ea7',
                    borderRadius: '4px',
                    outline: 'none',
                  }"
                  aria-expanded="true"
                  data-toggle="dropdown"
                  type="button"
                >
                  <svg
                    id="Layer_1"
                    class="plus-icon white"
                    version="1.1"
                    viewBox="0 0 18 18"
                    x="0px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    y="0px"
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
                <ul
                  class="dropdown-menu add-dropdown"
                  x-placement="bottom-start"
                >
                  <!-- upload files -->
                  <li>
                    <a
                      class="dropdown-item"
                      @click="boxEnabled ? onUploadClick() : ''"
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
                          class="upload-icon"
                          version="1.1"
                          viewBox="0 0 18 18"
                          x="0px"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          y="0px"
                        >
                          <g
                            id="Group_4436"
                            transform="translate(-375.358 -797.334)"
                          >
                            <path
                              id="Path_3552"
                              class="fill-color"
                              d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                            ></path>
                            <g id="Group_4435">
                              <path
                                id="Path_3553"
                                class="fill-color"
                                d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                              ></path>
                              <path
                                id="Path_3554"
                                class="fill-color"
                                d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                              ></path>
                            </g>
                          </g></svg
                      ></span>
                      Upload Files
                    </a>
                  </li>
                  <!-- create folder -->
                  <li>
                    <a
                      class="dropdown-item"
                      data-target="#category"
                      data-toggle="modal"
                      href="#"
                      @click="boxEnabled ? onFolderCreate() : ''"
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
                          class="folder-icon"
                          version="1.1"
                          viewBox="0 0 18 18"
                          x="0px"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          y="0px"
                        >
                          <g id="Group_4469" transform="translate(-579 -801)">
                            <rect
                              id="Rectangle_3008"
                              class="fill-hide"
                              height="18"
                              width="18"
                              x="579"
                              y="801"
                            ></rect>
                            <path
                              id="Path_3452"
                              class="fill-color"
                              d="M581.3,818.2c-0.6,0-1.1-0.2-1.5-0.6c-0.5-0.5-0.8-1.1-0.8-1.8v-11.4c0-0.7,0.3-1.3,0.8-1.8c0.4-0.4,1-0.6,1.5-0.6h0.1h4.4l1.7,2.5l7.1,0c0.6,0,1.1,0.2,1.5,0.6c0.5,0.5,0.8,1.1,0.8,1.8v9c0,0.7-0.3,1.3-0.8,1.8c-0.4,0.4-1,0.6-1.5,0.6L581.3,818.2z M594.6,816.6l0,0.1L594.6,816.6c0.2,0,0.4-0.1,0.5-0.2c0.2-0.2,0.3-0.4,0.3-0.7v-8.9c0-0.2-0.1-0.5-0.3-0.6c-0.1-0.1-0.3-0.2-0.5-0.2h-7.8l-1.7-2.5l-3.7,0c-0.2,0-0.4,0.1-0.5,0.2c-0.2,0.2-0.3,0.4-0.3,0.7v11.3c0,0.2,0.1,0.5,0.3,0.6c0.1,0.1,0.3,0.2,0.5,0.2L594.6,816.6L594.6,816.6z"
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
                  :class="{ active: viewType === 'grid' }"
                  class="gridview"
                  @click="boxEnabled ? (viewType = 'grid') : ''"
                >
                  <svg
                    id="Layer_1"
                    class="gridview-icon"
                    version="1.1"
                    viewBox="0 0 18 18"
                    x="0px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    y="0px"
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
                  :class="{ active: viewType === 'list' }"
                  class="listview"
                  @click="boxEnabled ? (viewType = 'list') : ''"
                >
                  <svg
                    id="Layer_1"
                    class="listview-icon"
                    version="1.1"
                    viewBox="0 0 18 18"
                    x="0px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    y="0px"
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
      <div
        class="common-box bg-gray"
        style="margin-top: 8px; height: calc(100% - 45px)"
      >
        <div
          class="table-list-view dropbox-table multi-table-view table-list-scrolling s2 scrolling"
        >
          <ul class="thead">
            <li>
              <div class="preview-img sorting flex10"></div>
              <div class="categary-name sorting flex27">
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
              <div
                v-if="selectedBox === 'enterprise'"
                class="size sorting flex12"
              >
                <span>Shared By</span>
              </div>
              <div class="categary-action sorting flex15 text-right">
                <div class="">Action</div>
              </div>
            </li>
          </ul>
          <div class="customscrollbar" @scroll="onScroll">
            <ul class="tbody" style="padding: 1px 0">
              <empty-state
                v-if="!loadingFiles && !allFiles.length"
                class="h-100"
                dense
              />
              <li
                v-for="file in allFiles"
                v-else
                :ref="`item${file.id}`"
                :key="file.id"
                :class="{
                  'folder-list': isFolder(file),
                  highlighted: highlightItem.id === file.id,
                }"
              >
                <!-- image -->
                <div class="preview-img tb-column flex10">
                  <div
                    :class="[
                      'categary-image',
                      isFolder(file) ? 'folder-image' : '',
                    ]"
                  >
                    <a
                      class="img-link"
                      @click="boxEnabled ? handleEntryClick(file) : ''"
                    >
                      <span v-if="isFolder(file)">
                        <img
                          alt="Folder Icon"
                          src="~/assets/img/folder-icon.svg"
                          width="48"
                        />
                      </span>
                      <div v-else :class="{ icons: !!file.thumbnail_fallback }">
                        <img
                          :key="file.thumbnail"
                          :src="file.thumbnail_fallback || file.thumbnail"
                          alt
                          :style="{ height: viewType === 'grid' ? '100%' : '' }"
                        />
                      </div>
                    </a>
                    <div class="video-info">
                      <div class="upper-info">
                        <div class="tags">
                          <span v-if="!isFolder(file)">{{
                            file.extension || 'UNKNOWN'
                          }}</span>
                        </div>
                        <div class="dropdown more-options">
                          <button
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            type="button"
                          >
                            <svg
                              id="Layer_1"
                              class="menu-option-icon h-orange"
                              version="1.1"
                              viewBox="0 0 18 18"
                              x="0px"
                              xml:space="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              y="0px"
                            >
                              <g
                                id="Group_4482"
                                transform="translate(-872 -801)"
                              >
                                <rect
                                  id="Rectangle_3020"
                                  class="fill-hide"
                                  height="18"
                                  width="18"
                                  x="872"
                                  y="801"
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
                              v-if="!isFolder(file) && file.addingToDAM"
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
                              v-else-if="!isFolder(file) && isFileInDAM(file)"
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                @click="boxEnabled ? viewFileInDAM(file) : ''"
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
                                View in DAM
                              </a>
                            </li>
                            <!-- add to DAM -->
                            <li
                              v-else-if="
                                !isFolder(file) &&
                                !isFileInDAM(file) &&
                                isEnterprise()
                              "
                              v-tooltip="
                                storageFull
                                  ? 'You have consumed all of your DAM storage quota.'
                                  : parseInt(file.size) + storageUsed >
                                    storageTotal
                                  ? 'Adding this file will exceed your DAM storage quota.'
                                  : ''
                              "
                            >
                              <a
                                class="dropdown-item"
                                href="javascript:void(0);"
                                :style="
                                  storageFull ||
                                  parseInt(file.size) + storageUsed >
                                    storageTotal
                                    ? 'pointer-events:none;opacity:0.4'
                                    : ''
                                "
                                @click.prevent.capture.stop="
                                  storageFull ||
                                  parseInt(file.size) + storageUsed >
                                    storageTotal ||
                                  !boxEnabled
                                    ? null
                                    : addFileToDAM(file)
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
                                data-target="#move"
                                data-toggle="modal"
                                href="javascript:void(0);"
                                @click="
                                  () => {
                                    if (boxEnabled) {
                                      moveKey++,
                                        $nextTick(() => {
                                          showFileMove = true
                                          fileToMove = file
                                          moveType = 'move'
                                        })
                                    }
                                  }
                                "
                              >
                                <span class="dropdown-item-icon">
                                  <svg
                                    id="Layer_1"
                                    class="move-icon"
                                    version="1.1"
                                    viewBox="0 0 18 18"
                                    x="0px"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    y="0px"
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
                                data-target="#move"
                                data-toggle="modal"
                                href="javascript:void(0);"
                                @click="
                                  () => {
                                    if (boxEnabled) {
                                      moveKey++,
                                        $nextTick(() => {
                                          showFileMove = true
                                          fileToMove = file
                                          moveType = 'copy'
                                        })
                                    }
                                  }
                                "
                              >
                                <span class="dropdown-item-icon">
                                  <svg
                                    id="Layer_1"
                                    class="copy-icon"
                                    version="1.1"
                                    viewBox="0 0 18 18"
                                    x="0px"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    y="0px"
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
                                v-tooltip="
                                  file.permissions.can_share
                                    ? ''
                                    : 'You do not have permission to share'
                                "
                                class="dropdown-item"
                                data-target="#sharePopup"
                                data-toggle="modal"
                                href="javascript:void(0);"
                                :disabled="!file.permissions.can_share"
                                :style="{
                                  opacity: file.permissions.can_share ? 1 : 0.3,
                                }"
                                @click="
                                  boxEnabled && file.permissions.can_share
                                    ? ((shareableMedia = file),
                                      (shareableMedia.type = file.type),
                                      (shareableLink = ''))
                                    : null
                                "
                              >
                                <span class="dropdown-item-icon">
                                  <svg
                                    id="Layer_1"
                                    class="share-icon"
                                    version="1.1"
                                    viewBox="0 0 18 18"
                                    x="0px"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    y="0px"
                                  >
                                    <g
                                      id="Group_4473"
                                      transform="translate(-871 -230)"
                                    >
                                      <rect
                                        id="Rectangle_3012"
                                        class="fill-hide"
                                        height="18"
                                        width="18"
                                        x="871"
                                        y="230"
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
                            <!-- delete -->
                            <li
                              v-tooltip="
                                file.permissions.can_delete
                                  ? ''
                                  : 'You do not have permission to delete'
                              "
                              :disabled="!file.permissions.can_delete"
                              :style="{
                                opacity: file.permissions.can_delete ? 1 : 0.3,
                              }"
                              @click="
                                boxEnabled && file.permissions.can_delete
                                  ? ((fileToDelete = file),
                                    (deleteFileType = isFolder(file)
                                      ? 'Folder'
                                      : 'File'))
                                  : null
                              "
                            >
                              <a
                                class="dropdown-item"
                                data-target="#delete"
                                data-toggle="modal"
                                href="javascript:void(0);"
                              >
                                <span class="dropdown-item-icon">
                                  <svg
                                    id="Layer_1"
                                    class="delete-icon"
                                    version="1.1"
                                    viewBox="0 0 15.3 18"
                                    x="0px"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    y="0px"
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
                            <!-- download -->
                            <li
                              v-tooltip="
                                file.permissions.can_download
                                  ? ''
                                  : 'You do not have permission to download'
                              "
                              :disabled="!file.permissions.can_download"
                              :style="{
                                opacity: file.permissions.can_download
                                  ? 1
                                  : 0.3,
                              }"
                              @click="
                                boxEnabled && file.permissions.can_download
                                  ? downloadFile(file)
                                  : null
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
                                    viewBox="0 0 18 18"
                                    x="0px"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    y="0px"
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
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- name -->
                <div class="categary-name flex27 tb-column">
                  <div class="top-column">
                    <div class="rename-text">
                      <a
                        v-tooltip="{ html: false, content: file.name }"
                        style="position: relative"
                        title
                        @click="boxEnabled ? handleEntryClick(file) : ''"
                        >{{ file.name }}</a
                      >
                      <!-- <img
                        v-if="
                          sharerPhoto(file) &&
                          selectedBox === 'Shared with me' &&
                          viewType === 'grid'
                        "
                        v-tooltip="{ html: false, content: sharerName(file) }"
                        :src="sharerPhoto(file)"
                        height="26"
                        style="border-radius: 4px"
                      /> -->
                    </div>
                  </div>
                </div>
                <!-- asset type -->
                <div class="assets tb-column flex18">
                  <div class="top-column">
                    <label v-if="isFolder(file)">-</label>
                    <span v-else>{{ fileType(file) }}</span>
                  </div>
                </div>
                <!-- update date -->
                <div class="update-date tb-column flex18">
                  <div class="top-column">
                    <label :title="file.modified_at">
                      {{ $moment(file.modified_at).format('DD MMM YYYY') }}
                    </label>
                  </div>
                </div>
                <!-- size -->
                <div class="size tb-column flex12">
                  <div class="top-column">
                    <label>
                      {{ getReadableSize(parseInt(file.size)) }}
                    </label>
                  </div>
                </div>
                <!-- shared by -->
                <div
                  v-if="
                    0 && selectedBox === 'enterprise' && viewType === 'list'
                  "
                  v-tooltip="{ html: false, content: sharerName(file) }"
                  class="size tb-column flex12"
                  style="display: flex; align-items: center"
                >
                  <img
                    v-if="sharerPhoto(file)"
                    :src="sharerPhoto(file)"
                    height="26"
                    style="border-radius: 4px; margin-right: 6px"
                  />
                  <div
                    :style="{
                      maxWidth: sharerPhoto(file)
                        ? 'calc(100% - 30px)'
                        : '100%',
                    }"
                    class="top-column"
                  >
                    <label style="overflow: hidden">{{
                      sharerName(file)
                    }}</label>
                  </div>
                </div>
                <!-- actions -->
                <div class="categary-action tb-column flex15">
                  <div class="top-column">
                    <div class="categary-actions">
                      <a
                        v-tooltip="
                          file.permissions.can_share
                            ? 'Share'
                            : 'You do not have permission to share'
                        "
                        :disabled="!file.permissions.can_share"
                        :style="{
                          opacity: file.permissions.can_share ? 1 : 0.3,
                        }"
                        data-target="#sharePopup"
                        data-toggle="modal"
                        @click="
                          boxEnabled && file.permissions.can_share
                            ? ((shareableMedia = file),
                              (shareableMedia.type = file.type),
                              (shareableLink = ''))
                            : null
                        "
                      >
                        <svg
                          id="Layer_1"
                          :data-original-title="
                            isFolder(file) ? 'Share Folder' : 'Share Image'
                          "
                          class="share-icon h-orange"
                          data-toggle="tooltip"
                          title=""
                          version="1.1"
                          viewBox="0 0 18 18"
                          x="0px"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          y="0px"
                        >
                          <g id="Group_4473" transform="translate(-871 -230)">
                            <rect
                              id="Rectangle_3012"
                              class="fill-hide"
                              height="18"
                              width="18"
                              x="871"
                              y="230"
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
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          href="javascript:void(0);"
                        >
                          <svg
                            id="Layer_1"
                            class="menu-option-icon h-orange"
                            version="1.1"
                            viewBox="0 0 18 18"
                            x="0px"
                            xml:space="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            y="0px"
                          >
                            <g id="Group_4482" transform="translate(-872 -801)">
                              <rect
                                id="Rectangle_3020"
                                class="fill-hide"
                                height="18"
                                width="18"
                                x="872"
                                y="801"
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
                            v-if="
                              !isFolder(file) &&
                              file.addingToDAM &&
                              isEnterprise()
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
                              !isFolder(file) &&
                              isFileInDAM(file) &&
                              isEnterprise()
                            "
                          >
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              @click="boxEnabled ? viewFileInDAM(file) : ''"
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
                              View in DAM
                            </a>
                          </li>
                          <!-- add to DAM -->
                          <li
                            v-else-if="
                              !isFolder(file) &&
                              !isFileInDAM(file) &&
                              isEnterprise()
                            "
                            v-tooltip="
                              storageFull
                                ? 'You have consumed all of your DAM storage quota.'
                                : parseInt(file.size) + storageUsed >
                                  storageTotal
                                ? 'Adding this file will exceed your DAM storage quota.'
                                : ''
                            "
                          >
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              :style="
                                storageFull ||
                                parseInt(file.size) + storageUsed > storageTotal
                                  ? 'pointer-events:none;opacity:0.4'
                                  : ''
                              "
                              @click.prevent.capture.stop="
                                storageFull ||
                                parseInt(file.size) + storageUsed >
                                  storageTotal ||
                                !boxEnabled
                                  ? null
                                  : addFileToDAM(file)
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
                              data-target="#move"
                              data-toggle="modal"
                              href="javascript:void(0);"
                              @click="
                                () => {
                                  if (boxEnabled) {
                                    moveKey++,
                                      $nextTick(() => {
                                        showFileMove = true
                                        fileToMove = file
                                        moveType = 'move'
                                      })
                                  }
                                }
                              "
                            >
                              <span class="dropdown-item-icon">
                                <svg
                                  id="Layer_1"
                                  class="move-icon"
                                  version="1.1"
                                  viewBox="0 0 18 18"
                                  x="0px"
                                  xml:space="preserve"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  y="0px"
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
                              data-target="#move"
                              data-toggle="modal"
                              href="javascript:void(0);"
                              @click="
                                () => {
                                  if (boxEnabled) {
                                    moveKey++,
                                      $nextTick(() => {
                                        showFileMove = true
                                        fileToMove = file
                                        moveType = 'copy'
                                      })
                                  }
                                }
                              "
                            >
                              <span class="dropdown-item-icon">
                                <svg
                                  id="Layer_1"
                                  class="copy-icon"
                                  version="1.1"
                                  viewBox="0 0 18 18"
                                  x="0px"
                                  xml:space="preserve"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  y="0px"
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
                          <!-- delete -->
                          <li
                            v-tooltip="
                              file.permissions.can_delete
                                ? ''
                                : 'You do not have permission to delete'
                            "
                            :disabled="!file.permissions.can_delete"
                            :style="{
                              opacity: file.permissions.can_delete ? 1 : 0.3,
                            }"
                            @click="
                              boxEnabled && file.permissions.can_delete
                                ? ((fileToDelete = file),
                                  (deleteFileType = isFolder(file)
                                    ? 'Folder'
                                    : 'File'))
                                : null
                            "
                          >
                            <a
                              class="dropdown-item"
                              data-target="#delete"
                              data-toggle="modal"
                              href="javascript:void(0);"
                            >
                              <span class="dropdown-item-icon">
                                <svg
                                  id="Layer_1"
                                  class="delete-icon"
                                  version="1.1"
                                  viewBox="0 0 15.3 18"
                                  x="0px"
                                  xml:space="preserve"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  y="0px"
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
                          <!-- download -->
                          <li
                            v-tooltip="
                              file.permissions.can_download
                                ? ''
                                : 'You do not have permission to download'
                            "
                            :disabled="!file.permissions.can_download"
                            :style="{
                              opacity: file.permissions.can_download ? 1 : 0.3,
                            }"
                            @click="
                              boxEnabled && file.permissions.can_download
                                ? downloadFile(file)
                                : null
                            "
                          >
                            <a class="dropdown-item" href="javascript:void(0);">
                              <span class="dropdown-item-icon">
                                <svg
                                  id="Layer_1"
                                  class="download-icon"
                                  version="1.1"
                                  viewBox="0 0 18 18"
                                  x="0px"
                                  xml:space="preserve"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  y="0px"
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
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <ContentLoader
                v-if="loadingFiles"
                :animate="true"
                :height="6 * 70"
                :speed="1"
                :style="{
                  height: `${6 * 70}px`,
                  width: '100%',
                  margin: '0 10px',
                }"
                width="100%"
              >
                <rect
                  v-for="i in 6"
                  :key="i"
                  :y="(i - 1) * 70 + 10"
                  height="60"
                  rx="0"
                  ry="0"
                  width="100%"
                  x="0"
                />
              </ContentLoader>
            </ul>
          </div>
        </div>
        <gallery
          :active-file-id="galleryPreselectFile"
          :files="allFiles.filter((e) => !isFolder(e))"
          :open.sync="galleryOpen"
        ></gallery>

        <!--  Add Category Modal  -->
        <div id="category" class="modal">
          <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
          >
            <div class="modal-content bg-gray">
              <div class="modal-header">
                <h5 id="exampleModalLongTitle" class="modal-title">
                  Create Folder
                </h5>
                <button
                  aria-label="Close"
                  class="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true"
                    ><svg
                      id="Layer_1"
                      class="close-icon h-red"
                      version="1.1"
                      viewBox="0 0 18 18"
                      x="0px"
                      xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      y="0px"
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
                  ref="newFolderName"
                  v-model.trim="newFolderName"
                  class="form-control"
                  placeholder="Folder Name"
                  type="text"
                  @keyup.enter.stop="createFolder"
                />
              </div>
              <div class="modal-footer justify-content-start">
                <button
                  class="btn"
                  type="button"
                  @click.stop="boxEnabled ? createFolder() : ''"
                >
                  Create
                </button>
                <button
                  ref="createFolderCloseBtn"
                  class="btn btn-gray"
                  data-dismiss="modal"
                  type="button"
                >
                  Cancel
                </button>
                <img
                  v-show="creatingFolder"
                  :src="require('~/assets/img/loading.gif')"
                  height="16"
                  style="margin-left: 12px"
                />
              </div>
            </div>
          </div>
        </div>
        <!--  Move Category Modal  -->
        <move-file-modal
          v-if="showFileMove && fileToMove"
          :key="moveKey"
          :file-data="fileToMove"
          :open.sync="showFileMove"
          :path="cwd"
          :type="moveType"
          @moved="onFileMoved"
        />
        <!--  Share Modal  -->
        <div v-if="shareableMedia" id="sharePopup" class="modal fade">
          <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
          >
            <div class="modal-content bg-gray">
              <div class="modal-header">
                <h5 id="exampleModalLongTitle" class="modal-title">
                  {{
                    shareableLink
                      ? 'Create Share Link'
                      : `Share selected ${shareableMedia.type}`
                  }}
                </h5>
                <button
                  aria-label="Close"
                  class="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true"
                    ><svg
                      id="Layer_1"
                      class="close-icon h-red"
                      version="1.1"
                      viewBox="0 0 18 18"
                      x="0px"
                      xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      y="0px"
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
                        :style="{
                          backgroundImage:
                            shareableMedia.type === 'folder'
                              ? `url(${require('~/assets/img/folder-icon.svg')})`
                              : `url(${shareableMedia.thumbnail})`,
                        }"
                        :title="shareableMedia.name"
                        class="profile-bg flex-20"
                      ></div>
                      <div class="share-name flex-80 pl-2">
                        <label>{{ shareableMedia.name }}</label>
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
                      class="form-control m-0"
                      onClick="this.setSelectionRange(0, this.value.length)"
                      :value="shareableLink"
                    />
                  </div>
                  <button
                    v-clipboard="() => shareableLink"
                    v-clipboard:success="() => (copySuccess = true)"
                    v-clipboard:error="() => $toast.global.error('Copy failed')"
                    class="btn btn-big"
                  >
                    {{ copySuccess ? 'Copied!' : 'Copy' }}
                  </button>
                </div>
              </div>
              <div
                v-if="!shareableLink"
                class="modal-footer justify-content-end"
              >
                <button
                  v-if="!shareableLink"
                  class="btn"
                  type="button"
                  :disabled="creatingShareLink"
                  @click="boxEnabled ? getShareableLink(shareableMedia) : ''"
                >
                  {{ creatingShareLink ? 'Creating...' : 'Create link' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--  Delete Folder Modal  -->
        <div v-if="fileToDelete" id="delete" class="modal fade">
          <div
            class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you sure?</h5>
                <button
                  ref="deleteModalBtn"
                  aria-label="Close"
                  class="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true"
                    ><svg
                      id="Layer_1"
                      class="close-icon h-red"
                      version="1.1"
                      viewBox="0 0 18 18"
                      x="0px"
                      xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      y="0px"
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
                  {{ fileToDelete.type }}?
                </p>
                <div class="btn-group">
                  <a
                    class="btn btn-gray"
                    data-dismiss="modal"
                    href="javascript:void(0);"
                    >No</a
                  >
                  <a
                    class="btn"
                    @click="boxEnabled ? deleteFile(fileToDelete) : ''"
                  >
                    Yes</a
                  >
                  <img
                    v-show="deleteProgress"
                    height="16"
                    src="~/assets/img/loading.gif"
                    style="margin-left: 12px; margin-top: 7px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        ref="dialog"
        :show-add="fileViewShowAdd"
        :adding-to-dam="fileToView.addingToDAM"
        :status-text="fileViewStatus"
        @add="addFileToDAM(fileToView, true)"
      />
      <input
        :key="uploadKey"
        ref="fileUploader"
        hidden
        multiple
        type="file"
        @change="updateUploadQueue($event.target.files)"
      />
      <template v-if="uploadQueue.length">
        <div
          style="
            bottom: 15px;
            position: fixed;
            box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.24);
            right: 14px;
            background: white;
            height: 48px;
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 12px 14px;
            box-sizing: border-box;
            border-radius: 3px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            z-index: 999;
          "
        >
          <img
            v-if="uploadStatus === 'Done'"
            height="20"
            src="~/assets/img/upload-done.svg"
            style="margin-right: 8px"
          />
          <img
            v-else
            height="20"
            src="~/assets/img/loading.gif"
            style="margin-right: 8px"
          />
          <span>{{ uploadStatus }}</span
          >&nbsp;&nbsp;
          <strong style="overflow: hidden; text-overflow: ellipsis">{{
            uploadQueue.length === 1
              ? uploadQueue[0].content.name
              : uploadQueueIndex +
                1 -
                uploadErrorCount +
                '/' +
                uploadQueue.length
          }}</strong>
          <img
            v-show="uploadStatus !== 'Done'"
            v-tooltip="'Cancel Upload'"
            height="16"
            src="~/assets/img/icon/plus.svg"
            style="margin-left: 8px; transform: rotate(45deg); cursor: pointer"
            @click="boxEnabled ? cancelUpload() : ''"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import Dialog from '../dam-view-dialog.vue'
import MoveFileModal from './box-move-file.vue'
import Gallery from './box-gallery.vue'
import { formatBytes } from './../utils'
import EmptyState from '@/components/theme/global/EmptyState'
import zipShot from '~/mixins/zipShot'
const FileSaver = require('file-saver')

const VIDEO_ICON = require('~/assets/img/file/video.svg')
const IMAGE_ICON = require('~/assets/img/icon/images.svg')
const AUDIO_ICON = require('~/assets/img/file/audio.svg')

export default {
  components: { ContentLoader, EmptyState, MoveFileModal, Gallery, Dialog },
  mixins: [zipShot],
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  data() {
    return {
      viewType: 'grid',
      loadingFiles: false,
      breadcrumbs: [],
      selectedBox: 'personal',
      allFiles: [],
      newFolderName: '',
      creatingFolder: false,
      parentDetails: {},
      offset: 0,
      limit: 100,
      hasNext: true,
      searchOffset: 0,
      shareableMedia: null,
      copySuccess: false,
      creatingShareLink: false,
      fileToDelete: null,
      fileToMove: null,
      deleteProgress: false,
      moveKey: 0,
      showFileMove: false,
      moveType: '',
      cwd: '',
      uploadQueue: [],
      uploadKey: 0,
      uploadStatus: '',
      uploadQueueIndex: 0,
      uploadErrorCount: 0,
      reloadAfterUpload: false,
      galleryOpen: false,
      galleryPreselectFile: null,
      retryCount: 0,
      damFolderId: null,
      fileViewStatus: '',
      fileViewShowAdd: true,
      fileToView: {},
      highlightItem: {},
    }
  },
  computed: {
    ...mapGetters({
      DRIVE_USER: 'drive/user',
      DRIVE_ACCESS_TOKEN: 'drive/accessToken',
      DRIVE_REFRESH_TOKEN: 'drive/refreshToken',
      DRIVE_ICON: 'drive/icon',
      DROPBOX_TOKEN: 'dropbox/token',
      DROPBOX_ICON: 'dropbox/icon',
      DROPBOX_USER: 'dropbox/user',
      BOX_USER: 'box/user',
      BOX_ACCESS_TOKEN: 'box/accessToken',
      BOX_REFRESH_TOKEN: 'box/refreshToken',
      BOX_ICON: 'box/icon',
      BOX_SESSION: 'box/session',
      BOX_ACCESSTOKEN_TTL_MS: 'box/accessTokenTTLMS',
      BOX_ACQUIRED_AT_MS: 'box/acquiredAtMS',
    }),
    getReadableSize() {
      return (size) => (size ? formatBytes(size) : '-')
    },
    fileExtension() {
      return (file) => file.name.substring(file.name.lastIndexOf('.') + 1)
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
  },
  watch: {
    '$route.query': {
      handler(n) {
        this.$nextTick(() => {
          this.cwd = n.path || '0'
          this.allFiles = []
          this.offset = 0
          this.hasNext = true
          this.loadFiles(this.cwd)
        })
      },
      deep: true,
    },
    copySuccess(n) {
      if (n) {
        setTimeout(() => {
          this.copySuccess = false
        }, 1000)
      }
    },
  },
  mounted() {
    if (!this.BOX_ACCESS_TOKEN) return
    this.cwd = this.$route.query.path || '0' // '0' is root folder
    this.allFiles = []
    this.offset = 0
    this.hasNext = true
    this.loadFiles(this.cwd)

    const { workspace_id } = this.$route.params
    try {
      this.$axios
        .$post('digital-assets/category/create-internal-category', {
          url_workspace_id: workspace_id,
          workspace_id,
          folder_name: 'Box files',
          integration_type: 3,
        })
        .then((r) => {
          this.damFolderId = r.data.id
        })
    } catch (_) {}
  },
  methods: {
    isEnterprise() {
      const enterprise = this.BOX_SESSION.enterprise || {}
      return !!enterprise.id && enterprise.type === 'enterprise'
    },
    /**
     * Returns dam assetId of a file
     * @param file
     * @returns {null|*}
     */
    getDAMId(file) {
      const entId = this.BOX_SESSION?.enterprise?.id
      if (!entId || !file.metadata) return null
      return file.metadata[`enterprise_${entId}`]?.DAM?.damFileId
    },
    async removeDamOnFile(file) {
      if (!this.boxEnabled) return
      await axios
        .post(
          '/box/remove-metadata',
          {
            fileId: file.id,
            accessToken: this.BOX_ACCESS_TOKEN,
          },
          {
            headers: {
              access_token: this.BOX_ACCESS_TOKEN,
              refresh_token: this.BOX_REFRESH_TOKEN,
              access_token_ms: this.BOX_ACCESSTOKEN_TTL_MS,
              acquired_at: this.BOX_ACQUIRED_AT_MS,
            },
          }
        )
        .catch(console.log)
      try {
        const entId = this.BOX_SESSION?.enterprise?.id
        if (entId && file.metadata)
          file.metadata[`enterprise_${entId}`].DAM.damFileId = undefined
      } catch (_) {}
    },
    /**
     * Checks if a file has already been added into DAM
     * @param file
     * @returns {boolean}
     */
    isFileInDAM(file) {
      return !!this.getDAMId(file)
    },
    checkFileInstance(file) {
      return new Promise((resolve, reject) => {
        const digital_assets_id = this.getDAMId(file)
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
      if (!this.boxEnabled) return
      Object.assign(this.fileToView, file)
      this.fileViewStatus = 'Checking file...'
      this.fileViewShowAdd = false
      this.$refs.dialog.show()
      try {
        const { deleted } = await this.checkFileInstance(file)

        if (deleted) {
          this.removeDamOnFile(file)
          this.fileViewStatus =
            'This file was removed from DAM. Would you like to add?'
          this.fileViewShowAdd = true
          return
        }
        const damFileId = this.getDAMId(file)
        if (!damFileId) {
          this.fileViewStatus = 'File is not added into DAM.'
          this.fileViewShowAdd = true
          file.metadata = null
          return
        }
        if (this.$refs.dialog?.model)
          this.$router.push({
            name: 'workspace_id-dam-files-id',
            params: {
              workspace_id: this.$getWorkspaceId(),
              id: damFileId,
              came_from_hash: (this.$router.hash || '').replace('#', ''),
            },
          })
      } catch (e) {
        this.fileViewStatus = 'An error occured.'
        this.$toast.global.error(e)
      }
    },
    /**
     * Adds a file from Box to DAM
     * @param file
     * @returns {Promise<void>}
     */
    async addFileToDAM(file = this.fileToView, redirect) {
      if (!this.boxEnabled) return
      if (!this.isEnterprise()) {
        this.$toast.error(
          'This feature is available for enterprise Box Accounts only.'
        )
        return
      }
      if (this.storageFull) {
        this.$toast.global.error(
          'You have consumed all of your DAM storage quota.'
        )
        return
      }
      if (parseInt(file.size) + this.storageUsed > this.storageTotal) {
        this.$toast.global.error(
          'Adding this file will exceed your DAM storage quota.'
        )
        return
      }
      if (file.type === 'folder') {
        this.$toast.error('Not a file')
        return
      }
      if (!this.damFolderId) {
        this.$toast.error('Oops, unknown error occurred.')
        return
      }
      if (!file.permissions.can_download) {
        this.$toast.error('Oops, there is no permission to download this file.')
        return
      }
      const { workspace_id } = this.$route.params
      this.$set(file, 'addingToDAM', true)
      const _this = this
      try {
        // get file url
        const { data: url } = await axios.get('/box/download', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            fileId: file.id,
            fileType: file.type,
          },
        })
        // download blob
        const { data: blob, headers } = await axios.get(url, {
          responseType: 'blob',
        })

        // upload file to s3
        const formData = new FormData()
        formData.append('file', blob)
        formData.append('mimeType', headers['content-type'])
        const { data: s3Response } = await axios.post('/s3/upload', formData, {
          params: { workspaceId: workspace_id },
        })

        // upload file to backend
        const { data: uploadResponse } = await this.$axios.$post(
          `digital-assets/upload`,
          {
            workspace_id,
            file_name: s3Response.assetId,
            display_file_name: file.name,
            display_file: s3Response.signedUrl,
            auto_tag: false,
            mime_type: headers['content-type'],
            file_extension: file.extension,
            file_size: file.size,
            category_id: this.damFolderId,
          },
          { params: { url_workspace_id: workspace_id } }
        )
        // update file metadata to box
        await axios.post(
          '/box/add-metadata',
          {
            fileId: file.id,
            type: file.type,
            damFileId: parseInt(uploadResponse.id),
            accessToken: this.BOX_ACCESS_TOKEN,
          },
          {
            headers: {
              access_token: this.BOX_ACCESS_TOKEN,
              refresh_token: this.BOX_REFRESH_TOKEN,
              access_token_ms: this.BOX_ACCESSTOKEN_TTL_MS,
              acquired_at: this.BOX_ACQUIRED_AT_MS,
            },
          }
        )

        // updata file metadata
        const {
          data: { metadata = {} },
        } = await axios.get('/box/files/' + file.id + '/metadata', {
          headers: {
            access_token: this.BOX_ACCESS_TOKEN,
            refresh_token: this.BOX_REFRESH_TOKEN,
            access_token_ms: this.BOX_ACCESSTOKEN_TTL_MS,
            acquired_at: this.BOX_ACQUIRED_AT_MS,
          },
        })
        this.$set(file, 'metadata', metadata)
        if (file.extension.toLowerCase() === 'zip') {
          const zipThumbnail = await this.getZipShot({
            ext: 'zip',
            blob,
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
        if (!redirect) file.addingToDAM = false
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
        file.addingToDAM = false
        _this.$toast.error(e)
        console.error(e)
      }
    },
    uploadThumbnail(zipThumbnail, fileName, assetId) {
      if (!this.boxEnabled) return
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
     * Checks if a file is already in queue
     * @param file File
     * @returns boolean
     */
    isFileInQueue(file) {
      if (!this.boxEnabled) return
      if (!this.uploadQueue.length) return false
      return this.uploadQueue.some((e) =>
        this.isDuplicateFile(e.content, file.content)
      )
    },
    /**
     * Checks if two files are same
     * @param file1 File
     * @param file2 File
     * @returns boolean
     */
    isDuplicateFile(file1, file2) {
      if (!this.boxEnabled) return
      if (!(file1 instanceof File) || !(file2 instanceof File)) return
      const keys = [
        'webkitRelativePath',
        'type',
        'size',
        'name',
        'lastModified',
      ]
      return keys.every((e) => file1[e] === file2[e])
    },
    /**
     * After a file ws uploaded sucecssfully, updates the queue for next upload
     */
    onFileUploaded() {
      if (!this.boxEnabled) return
      this.uploadQueueIndex++
      if (this.uploadQueueIndex >= this.uploadQueue.length) {
        this.uploadStatus = 'Done'
        this.uploadQueueIndex--
        setTimeout(() => {
          this.uploadQueue = []
          this.uploadQueueIndex = 0
          this.uploadErrorCount = 0
          if (this.reloadAfterUpload) {
            this.offset = 0
            this.allFiles = []
            this.hasNext = true
            this.loadFiles(this.cwd)
          }
        }, 3000)
      } else {
        this.uploadFile()
      }
    },
    /**
     * Uploads a file from queue to users Box
     */
    uploadFile() {
      if (!this.boxEnabled) return
      if (!this.uploadQueue.length) return
      this.uploadStatus = 'Uploading'
      const currentFile = this.uploadQueue[this.uploadQueueIndex]

      const data = new FormData()
      data.append('file', currentFile.content)
      data.append('parent', currentFile.parent)

      axios
        .post('/box/upload', data, {
          headers: {
            refresh_token: this.BOX_REFRESH_TOKEN,
            access_token_ttl: this.BOX_ACCESSTOKEN_TTL_MS,
            acquired_at: this.BOX_ACQUIRED_AT_MS,
            access_token: this.BOX_ACCESS_TOKEN,
            'Content-Type': 'multipart-formdata',
          },
        })
        .then((r) => {
          if (r.data.id) {
            this.allFiles.unshift({ ...r.data })
            this.getThumbnails([this.allFiles.find((e) => e.id === r.data.id)])
          } else {
            this.reloadAfterUpload = this.reloadAfterUpload || true
          }
        })
        .catch((e) => {
          this.uploadErrorCount++
        })
        .finally(() => {
          this.onFileUploaded()
        })
    },
    /**
     * Maintains a queue for file uploads
     * @param files [File]
     */
    updateUploadQueue(files = []) {
      if (!this.boxEnabled) return
      if (!files[0]) return
      files.forEach((e) => {
        const queueItem = { content: e, parent: this.cwd }
        if (!this.isFileInQueue(queueItem)) {
          this.uploadQueue.push(queueItem)
        } else {
          this.$toast.info(
            'File is already in queue: ' + queueItem.content.name
          )
        }
      })
      this.$refs.fileUploader.value = null
      if (this.uploadStatus !== 'Uploading') this.uploadFile()
    },
    /**
     * After a file/folder was moved/copied
     */
    onFileMoved(destination) {
      if (!this.boxEnabled) return
      this.allFiles = []
      this.offset = 0
      this.hasNext = true
      this.loadFiles(this.cwd)
    },
    /**
     * Generates public shareable link for a file/folder
     * @param file Object
     */
    getShareableLink(file) {
      if (!this.boxEnabled) return
      this.shareableLink = ''
      this.creatingShareLink = true
      axios
        .get('/box/share', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            fileId: file.id,
            fileType: file.type,
          },
        })
        .then((r) => {
          this.shareableLink = r.data.shared_link.url
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.creatingShareLink = false
        })
    },
    /**
     * Fetches list of files and folders ordered by Folder ASC, File ASC
     * @param parent parent directory id, 0 for root
     */
    loadFiles(parent) {
      if (this.loadingFiles || !this.hasNext) return
      this.loadingFiles = true
      const params = {
        accessToken: this.BOX_ACCESS_TOKEN,
        refreshToken: this.BOX_REFRESH_TOKEN,
        accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
        acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
        parent: parent || '0',
        offset: this.offset,
        limit: this.limit,
      }
      // endpoint to axios middleware
      axios
        .get('/box/list-files', {
          params,
        })
        .then((r) => {
          this.parentDetails = r.data
          this.offset = this.parentDetails.item_collection.offset
          this.total = this.parentDetails.item_collection.total_count
          this.allFiles.push(
            ...r.data.item_collection.entries.filter(
              (e) => !this.allFiles.map((f) => f.id).includes(e.id)
            )
          )
          this.breadcrumbs = r.data.path_collection.entries
          this.getThumbnails(this.allFiles.filter((e) => e.type === 'file'))
        })
        .catch(async (e) => {
          // if session token expired, try to get new token
          if (e?.response?.data?.authExpired && this.retryCount < 2) {
            this.retryCount++
            await this.$store
              .dispatch('box/refreshToken', {
                workspace_id: this.$route.params.workspace_id,
              })
              .then(() => {
                this.loadingFiles = false
                this.hasNext = true
                this.offset = 0
                this.allFiles = []
                return this.loadFiles(parent)
              })
              .catch(() => {})
          }
        })
        .finally(() => {
          this.loadingFiles = false
          this.hasNext = this.offset + this.limit < this.total
          this.$nextTick(async () => {
            const itemToHighlight = JSON.parse(
              JSON.stringify(this.highlightItem)
            )
            if (itemToHighlight && Object.keys(itemToHighlight).length) {
              const fileToHighlight = await this.getOrFetchItem(itemToHighlight)
              if (fileToHighlight) {
                if (!this.allFiles.find((e) => e.id === fileToHighlight.id))
                  this.allFiles.unshift(fileToHighlight)
                this.highlightItem = {}
                this.highlight(fileToHighlight)
              }
            }
          })
        })
    },
    // breadcrumb handler, update path in query
    handleBreadcrumbClick(parent) {
      if (!this.boxEnabled) return
      if (!parent && this.cwd === '') return
      if (parent === this.cwd) return
      this.highlightItem = {}
      this.cwd = !parent ? '' : parent
      this.offset = 0
      this.allFiles = []
      this.hasNext = true
      const query = {
        source: 'box',
      }
      if (this.cwd.length) query.path = this.cwd
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query,
      })
    },
    /**
     * Triggers file input
     */
    onUploadClick() {
      if (!this.boxEnabled) return
      this.$refs.fileUploader.click()
    },
    /**
     * Attempts to focus the text field
     */
    onFolderCreate() {
      if (!this.boxEnabled) return
      this.$nextTick(() => {
        setTimeout(() => this.$refs.newFolderName.focus(), 100)
      })
    },
    changeBoxType(type) {},
    /**
     * Checks if it is a folder
     * @param file Object
     * @returns boolean
     */
    isFolder(file) {
      return file.type === 'folder'
    },
    /**
     * Creates a folder in users box
     */
    createFolder() {
      if (!this.boxEnabled) return
      this.creatingFolder = true
      axios
        .post('/box/create-folder', {
          name: this.newFolderName,
          parent: this.cwd,
          accessToken: this.BOX_ACCESS_TOKEN,
          refreshToken: this.BOX_REFRESH_TOKEN,
          accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
          acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
        })
        .then(({ data }) => {
          this.newFolderName = ''
          this.$toast.global.success(`Folder created successfully.`)
          this.$refs.createFolderCloseBtn.click()
          this.allFiles.unshift(data)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => (this.creatingFolder = false))
    },
    /**
     * Click handler for file/folder
     * @param file Object
     * If folder was clicked, router is pushed to that folder
     * Opens the gallery, otherwise
     */
    handleEntryClick(file) {
      if (!this.boxEnabled) return
      if (file.type === 'folder') {
        this.highlightItem = {}
        this.cwd = file.id
        this.offset = 0
        this.hasNext = true
        this.allFiles = []

        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: {
            ...this.$route.query,
            path: file.id,
            source: 'box',
          },
        })
      } else {
        this.galleryPreselectFile = file.id
        this.galleryOpen = true
      }
    },
    /**
     * @param files [Object]
     * Tries to generate thumbnail from Box
     * Falls back to default thumbnails
     */
    getThumbnails(files) {
      files.forEach(async (file) => {
        const ext = file.extension
        const img = this.$isImage(ext)
        const vid = this.$isVideo(ext)
        const aud = this.$isAudio(ext)
        let source
        try {
          if (img) {
            source = await (
              await axios.get('/box/thumbnail', {
                params: {
                  accessToken: this.BOX_ACCESS_TOKEN,
                  refreshToken: this.BOX_REFRESH_TOKEN,
                  accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
                  acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
                  fileId: file.id,
                },
              })
            ).data
            this.$set(file, 'thumbnail', source)
          } else {
            throw new Error('Other')
          }
        } catch (_) {
          try {
            if (img) {
              source = IMAGE_ICON
            } else if (vid) {
              source = VIDEO_ICON
            } else if (aud) {
              source = AUDIO_ICON
            } else {
              source = require('~/assets/img/file/' + ext + '.svg')
            }
          } catch (_) {
            source = require('~/assets/img/file/general.svg')
          } finally {
            this.$set(file, 'thumbnail_fallback', source)
          }
        }
      })
    },
    /**
     * @param file Object
     */
    deleteFile(file) {
      if (!this.boxEnabled) return
      this.deleteProgress = true
      axios
        .post('/box/delete', {
          fileId: file.id,
          accessToken: this.BOX_ACCESS_TOKEN,
          type: file.type,
        })
        .then((_) => {
          this.allFiles.splice(
            this.allFiles.findIndex((e) => e.id === file.id),
            1
          )
          this.fileToDelete = null
          this.$toast.global.success(
            `${
              file.type === 'folder' ? 'Folder' : 'File'
            } deleted successfully.`
          )
          this.$refs.deleteModalBtn.click()
        })
        .catch(async (e) => {
          // token has expired for current session,
          // refesh token
          if (e?.response?.data?.authExpired) {
            await this.$store.dispatch('box/refreshToken', {
              workspace_id: this.$route.params.workspace_id,
            })
          } else this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.deleteProgress = false
        })
    },
    /**
     * @param file object
     */
    downloadFile(file) {
      if (!this.boxEnabled) return
      if (file.type === 'folder') {
        return this.downloadZip(file)
      }
      axios
        .get('/box/download', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            fileId: file.id,
            fileType: file.type,
          },
        })
        .then((r) => {
          // raw binary content is returned on r.data
          FileSaver.saveAs(r.data, file.name)
        })
        .catch((e) => {
          this.$toast.error(e)
        })
    },
    // downloads a folder (recusive) as zip
    downloadZip(folder) {
      if (!this.boxEnabled) return
      axios
        .get('/box/download-zip', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            fileId: folder.id,
            fileName: folder.name,
          },
        })
        .then((r) => {
          FileSaver.saveAs(r.data.download_url)
        })
        .catch((e) => {
          this.$toast.error(e)
        })
    },
    // returns 'file' or 'folder'
    fileType(file) {
      return file.extension
        ? file.extension
        : file.name.substring(file.name.lastIndexOf('.') + 1)
    },
    // scroll event handler
    onScroll(e) {
      if (!this.boxEnabled) return
      const el = e.target
      if (!el) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      // at least 80% height is scrolled and there are more data
      if (scrollPercent > 80 && this.hasNext) {
        this.highlightItem = {}
        this.offset += this.limit + 1
        this.loadFiles(this.parentDetails.id)
      }
    },
    async getOrFetchItem(item) {
      if (!this.boxEnabled) return
      const file = this.allFiles.find((e) => e.id === item.id)
      if (file) return file
      return (
        await axios.get(`/box/files/${item.id}`, {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            entId: this.BOX_SESSION.enterprise?.id,
          },
        })
      )?.data
    },
    highlight(item) {
      if (!this.boxEnabled) return
      this.highlightItem = item
      if (this.allFiles.find(({ id }) => id === item.id)) {
        this.$nextTick(() => {
          if (this.$refs[`item${item.id}`][0]) {
            this.$refs[`item${item.id}`][0].scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            })
          }
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

<template>
  <div>
    <transition name="slide-up">
      <div v-if="!!count" class="select-bar">
        <div v-if="selectedTab === 'permission'" class="permission top-bar">
          <div class="select-center w-100">
            <ul>
              <li>
                <div
                  v-tooltip="
                    privateCustomizationAllowed
                      ? ''
                      : 'Please upgrade your subscription plan to enable this feature.'
                  "
                  class="d-flex align-items-center"
                  :style="
                    privateCustomizationAllowed
                      ? ''
                      : 'opacity: 0.4;cursor:not-allowed'
                  "
                >
                  <label
                    class="radio-label"
                    :style="
                      privateCustomizationAllowed ? '' : 'pointer-events: none'
                    "
                  >
                    <input
                      type="radio"
                      name="permission"
                      :checked="permission == 'Public' ? true : false"
                      @change="
                        privateCustomizationAllowed &&
                          checkAssetPermission('is_public', 'Public', true)
                      "
                    />
                    <span
                      >Public
                      <i
                        v-tooltip="{
                          html: true,
                          content: `<ul>
                          <li>
                               This image can be used per the brand’s licensing guidelines and shared publicly as needed.
                           </li>

                      </ul>`,
                        }"
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i
                    ></span>
                    <span class="radio-span"></span>
                  </label>
                  <label
                    class="radio-label"
                    :style="
                      privateCustomizationAllowed ? '' : 'pointer-events: none'
                    "
                  >
                    <input
                      :checked="permission == 'Private' ? true : false"
                      type="radio"
                      name="permission"
                      @change="
                        privateCustomizationAllowed &&
                          checkAssetPermission('is_public', 'Private', false)
                      "
                    />
                    <span
                      >Private
                      <i
                        v-tooltip="{
                          html: true,
                          content: `<ul>

                           <li>
                               This image is for internal use only and may require credit per the brand’s licensing guidelines and may not be shared without specific permissions.
                            </li>
                      </ul>`,
                        }"
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i
                    ></span>
                    <span class="radio-span"></span>
                  </label>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <span
                  >Editorial Use Only
                  <i
                    v-tooltip="
                      'This image cannot be used for commercial advertising purposes.'
                    "
                    class="fa fa-info-circle"
                    aria-hidden="true"
                  ></i
                ></span>
                :
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <label class="radio-label">
                    <input
                      type="radio"
                      name="editorial"
                      :checked="permission == 'Editorial_use' ? true : false"
                      @change="
                        checkAssetPermission(
                          'is_editorial_use',
                          'Editorial_use',
                          true
                        )
                      "
                    />
                    <span>Yes</span>
                    <span class="radio-span"></span>
                  </label>
                  <label class="radio-label">
                    <input
                      type="radio"
                      name="editorial"
                      :checked="permission == 'Editorial_unused' ? true : false"
                      @change="
                        checkAssetPermission(
                          'is_editorial_use',
                          'Editorial_unused',
                          false
                        )
                      "
                    />
                    <span>No</span>
                    <span class="radio-span"></span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="tagManagementAllowed && selectedTab === 'tags'"
          class="top-bar tags"
        >
          <div class="select-center w-100">
            <FileTagInput
              name-id="commonTagsSelectionBar"
              :value="commonTags"
              :file-ids="
                selectedFiles.map(({ id, assets_version_id }) => ({
                  id,
                  assets_version_id,
                }))
              "
              class="tag-add-box"
              @versionTagsUpdated="addTagToSelectedFiles"
              @removedTag="removeTagFromFiles"
            />
          </div>
        </div>
        <div class="bottom-bar">
          <div v-if="deleting" class="select-left"></div>
          <div v-else class="select-left">
            <div class="select-all">
              <span>Select All</span>
              <label class="check-label">
                <input
                  :checked="selectedAll"
                  type="checkbox"
                  name=""
                  @click="
                    $event.target.checked
                      ? $emit('click:select-all')
                      : $emit('click:select-none')
                  "
                />
                <span class="check-span"></span>
              </label>
              <a
                href="javascript:;"
                @click="
                  () => {
                    $emit('click:select-none')
                    selectedTab = ''
                  }
                "
                >Remove selection</a
              >
            </div>
            <span class="select-counter"
              ><span>{{ count }}</span> selected</span
            >
          </div>
          <div class="select-center">
            <ul v-if="trashMode">
              <li v-if="deleting">
                <a disabled href="javascript:void(0);">
                  <div>
                    <SpinLoading />
                    {{ restoring ? 'Restoring' : 'Deleting' }}...
                  </div>
                </a>
              </li>
            </ul>
            <ul v-else>
              <li>
                <a v-if="deleting" disabled href="javascript:void(0);">
                  <div>
                    <SpinLoading />{{
                      isCollection > -1 ? ' Removing...' : ' Deleting...'
                    }}
                  </div>
                </a>
                <a
                  v-else
                  href="javascript:void(0);"
                  @click="$refs.deleteDialog.show()"
                >
                  {{ isCollection > -1 ? 'Remove from Collection' : 'Delete' }}
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
              <li
                v-if="
                  !selectedFolders.length &&
                  !deleting &&
                  !($route.hash.replace('#', '') === 'archive') &&
                  !(isCollection > -1)
                "
              >
                <a
                  :disabled="deleting"
                  href="javascript:;"
                  @click="!deleting && $refs.moveDialog.show()"
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
              <li
                v-if="
                  !selectedFolders.length &&
                  !deleting &&
                  !noView &&
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
                  :style="storageFull ? 'cursor:default' : ''"
                  :disabled="deleting || storageFull"
                  href="javascript:;"
                  @click="!deleting && !storageFull && $refs.copyDialog.show()"
                >
                  Copy
                  <svg
                    id="Layer_1"
                    class="copy-icon white"
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
                </a>
              </li>
              <li
                v-if="
                  !selectedFolders.length &&
                  !deleting &&
                  !($route.hash.replace('#', '') === 'archive') &&
                  !(isCollection > -1)
                "
              >
                <a
                  :disabled="deleting"
                  href="javascript:;"
                  @click="archieve('archieve')"
                >
                  Archive
                  <svg
                    id="Layer_1"
                    class="archive-icon white"
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
                </a>
              </li>
              <li
                v-if="
                  !selectedFolders.length &&
                  !deleting &&
                  $route.hash.replace('#', '') === 'archive' &&
                  !(isCollection > -1)
                "
              >
                <a href="javascript:;" @click="archieve('unarchieve')">
                  Unarchive
                  <svg
                    id="Layer_1"
                    class="unarchive-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 21"
                    xml:space="preserve"
                  >
                    <path class="fill-color" d="M15.3,9.6v10.1H2.2V9.6"></path>
                    <path class="fill-color" d="M7.3,12.7h2.9"></path>
                    <path
                      class="fill-color"
                      d="M1,3.5l14-2.4l0.7,3.8l-14,2.4L1,3.5z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li
                v-if="
                  !selectedFolders.length &&
                  !deleting &&
                  !($route.hash.replace('#', '') === 'archive') &&
                  !(isCollection > -1)
                "
                :class="{ active: selectedTab === 'permission' }"
              >
                <a
                  href="javascript:void(0);"
                  class="permission-btn"
                  @click="() => (selectedTab = 'permission')"
                >
                  Permission
                  <svg
                    id="Layer_1"
                    class="permission-icon white"
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
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li
                v-if="
                  !selectedFolders.length &&
                  !deleting &&
                  !($route.hash.replace('#', '') === 'archive') &&
                  !(isCollection > -1)
                "
                v-tooltip="
                  tagManagementAllowed
                    ? ''
                    : 'Please upgrade your subscription plan to enable this feature.'
                "
                :class="{ active: selectedTab === 'tags' }"
              >
                <a
                  href="javascript:void(0);"
                  class="tags-btn"
                  :class="{ disabled: !tagManagementAllowed }"
                  :disabled="!tagManagementAllowed"
                  :style="
                    tagManagementAllowed
                      ? ''
                      : 'pointer-events: none;opacity: 0.4'
                  "
                  @click="
                    tagManagementAllowed
                      ? selectedTab == 'tags'
                        ? (selectedTab = '')
                        : (selectedTab = 'tags')
                      : ''
                  "
                >
                  Tags
                  <svg
                    id="Layer_1"
                    class="tags-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Tags">
                      <g id="supermarket" transform="translate(-16.372)">
                        <g id="Group_39423" transform="translate(16.972)">
                          <g id="Group_39422">
                            <path
                              id="Path_40239"
                              class="fill-color"
                              d="M15.6,2.5V1.8c0-1-0.8-1.8-1.8-1.8h-5C8.4,0,7.9,0.2,7.6,0.5l-7,7c-0.7,0.7-0.7,1.8,0,2.5c0,0,0,0,0,0l0.7,0.7c0,0.1,0,0.3,0,0.4c0,0.5,0.2,0.9,0.5,1.3l5,5c0.7,0.7,1.8,0.7,2.5,0l7-7c0.3-0.3,0.5-0.8,0.5-1.3v-5C16.8,3.4,16.3,2.7,15.6,2.5z M1.4,9.3C1.1,9,1.1,8.6,1.4,8.4l7-7c0.1-0.1,0.3-0.2,0.4-0.2h5c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0v0.6H10c-0.5,0-0.9,0.2-1.3,0.5L1.9,9.8L1.4,9.3z M15.4,9.6l-7,7c-0.2,0.2-0.6,0.2-0.8,0l-5-5c-0.2-0.2-0.2-0.6,0-0.8l7-7C9.7,3.6,9.9,3.6,10,3.6h5c0.3,0,0.6,0.3,0.6,0.6v0v5l0,0C15.6,9.3,15.5,9.5,15.4,9.6z"
                            />
                          </g>
                        </g>
                        <g id="Group_39425" transform="translate(27.807 4.777)">
                          <g id="Group_39424">
                            <path
                              id="Path_40240"
                              class="fill-color"
                              d="M1.8,0C0.8,0,0,0.8,0,1.8c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8l0,0C3.6,0.8,2.8,0,1.8,0z M1.8,2.4c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6c0.3,0,0.6,0.3,0.6,0.6C2.4,2.1,2.1,2.4,1.8,2.4L1.8,2.4z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div v-if="deleting" class="select-right"></div>
          <div v-else-if="trashMode" class="select-right">
            <ul>
              <li>
                <a
                  href="javascript:void(0);"
                  @click="$refs.restoreDialog.show()"
                >
                  Restore
                  <svg
                    id="Layer_1"
                    class="restore-icon white"
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
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  @click="$refs.deleteDialog.show()"
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
            </ul>
          </div>
          <div v-else class="select-right">
            <ul>
              <li
                v-if="!noView && !($route.hash.replace('#', '') === 'archive')"
              >
                <a href="javascript:void(0);" @click="showShare">
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
                <a href="javascript:void(0);" @click="downloadSelectedFile()">
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
        <a
          href="javascript:void(0);"
          class="select-bar-close"
          @click="closeSelection"
        >
          <svg
            class="close-icon red h-white"
            focusable="false"
            viewBox="0 0 32 32"
          >
            <path
              class="fill-color"
              d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
            ></path>
          </svg>
        </a>
      </div>
    </transition>

    <client-only>
      <DeleteDialog ref="deleteDialog" @button:yes="deleteResources">
        <template v-if="trashMode">
          Are you sure you want to permanently delete the selected
          asset<template v-if="count > 1">s</template>?
        </template>
        <template v-else>
          <template v-if="isCollection > -1">
            Are you sure to remove file<template v-if="count > 1">s</template>
            from collection?
          </template>
          <template v-else>
            Are you sure you want to delete the selected asset<template
              v-if="count > 1"
              >s</template
            >?
          </template>
        </template>
      </DeleteDialog>
      <template v-if="trashMode">
        <DeleteDialog ref="restoreDialog" @button:yes="restoreSelectedFiles()">
          Are you sure you want to restore the selected asset<template
            v-if="count > 1"
            >s</template
          >?
        </DeleteDialog>
      </template>
      <template v-else>
        <ShareAssetDialog
          v-if="!noView && currentRoute == 'workspace_id-dam-collection-id'"
          ref="shareDialog"
          :files="[...selectedFiles]"
          :folders="[...shareAble]"
          collection-assets
          :collection-assets-id="$route.params.id"
          type="folder"
        />
        <ShareAssetDialog
          v-if="!noView && currentRoute != 'workspace_id-dam-collection-id'"
          ref="shareDialog"
          :files="[...selectedFiles]"
          :folders="[...shareAble]"
          type="folder"
        />
        <MoveFolderDialog
          ref="moveDialog"
          :files-to-move="selectedFiles"
          :move-to-folder="!noView"
          @moved="movedAssets"
        />
        <CopyFolderDialog
          v-if="!storageFull"
          ref="copyDialog"
          :files-to-move="selectedFiles"
          @copied="selectedFolderData"
        />
        <AssetPermissionDialog
          ref="assetPermissionDialog"
          :permission="permission"
          :is-updating="isAssetPrivacyUpdating"
          @changeSharePermission="changeSharePermission"
          @permissionRemove="permissionRemove"
        />
      </template>
    </client-only>
  </div>
</template>

<script>
import CopyFolderDialog from '~/components/dam/Dialogs/CopyFolderDialog'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
import ShareAssetDialog from '~/components/dam/Dialogs/ShareAssetDialog'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import AssetPermissionDialog from '~/components/dam/Dialogs/AssetPermissionDialog'
import FileTagInput from '~/components/dam/FileTagInput'
const categories = ['video', 'audio', 'image', 'application', 'search']
export default {
  components: {
    CopyFolderDialog,
    MoveFolderDialog,
    ShareAssetDialog,
    DeleteDialog,
    AssetPermissionDialog,
    FileTagInput,
  },
  props: {
    selectedFiles: { type: Array, default: () => [] },
    selectedFolders: { type: Array, default: () => [] },
    selectedAll: { type: Boolean, default: false },
    trashMode: { type: Boolean, default: false },
    noView: { type: Boolean, default: false },
    deleting: { type: Boolean, default: false },
    restoring: { type: Boolean, default: false },
  },
  data() {
    return {
      deletingModel: !!this.deleting,
      restoringModel: !!this.restoring,
      shareAble: [],
      is_public: null,
      permissionType: null,
      permission: null,
      is_permission: null,
      commonTags: [],
      archiving: 0,
      selectedTab: '',
      isAssetPrivacyUpdating: false,
    }
  },
  computed: {
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    isCollection() {
      return this.$route.name.search('collection')
    },
    count() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedFileCount() {
      return this.selectedFiles.length
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    inCategory() {
      return categories.includes(this.hashParam)
    },
    currentRoute() {
      return this.$route.name
    },
    tagManagementAllowed() {
      return !!this.$auth.user.subscription_features?.tag_management?.enable
    },
    privateCustomizationAllowed() {
      return !!this.$auth.user.subscription_features
        ?.public_and_private_asset_customisation?.enable
    },
  },
  watch: {
    selectedAll() {
      if (!this.selectedAll) {
        this.selectedTab = ''
      }
    },
    deletingModel(deletingModel) {
      this.$emit('update:deleting', deletingModel)
    },
    restoringModel(n) {
      this.$emit('update:restoring', !!n)
    },
    count(a) {
      if (this.count < 1) {
        this.selectedTab = ''
      }
      if (a) window.$('body').addClass('selectBaractive')
      else window.$('body').removeClass('selectBaractive')
    },
    selectedFiles(selectedFiles) {
      if (this.selectedFileCount === 0) this.commonTags = []
      else if (
        !this.selectedFolders.length &&
        !this.deleting &&
        !(this.$route.hash.replace('#', '') === 'archive') &&
        this.$route.name !== 'workspace_id-dam-trash' &&
        !(this.isCollection > -1)
      ) {
        const map = {}
        selectedFiles.forEach(({ tags = [] } = {}) => {
          tags.forEach(({ tag_name }) => {
            if (map[tag_name]) map[tag_name] += 1
            else map[tag_name] = 1
          })
        })
        this.commonTags = this.tagManagementAllowed
          ? Object.entries(map).reduce((array, [text, count]) => {
              if (count >= selectedFiles.length) {
                array.push({
                  tag_name: text,
                  id: text,
                  text,
                })
              }
              return array
            }, [])
          : []
      }
    },
  },
  destroyed() {
    window.$('body').removeClass('selectBaractive')
  },
  methods: {
    closeSelection() {
      console.log(this.selectedTab, 'testingggg')
      if (this.selectedTab) {
        console.log('hereontabclose')
        this.selectedTab = ''
      } else {
        this.$emit('click:select-none')
      }
    },
    archieve(data) {
      if (this.archiving) return
      this.archiving = 1
      const fileIds = [...this.selectedFiles].map(({ id }) => id)
      this.$axios
        .$post(`digital-assets/archive_assets`, {
          workspace_id: this.$getWorkspaceId(),
          assets_id: fileIds,
          is_archive: data === 'unarchieve' ? 0 : 1,
        })
        .then(({ message }) => {
          if (data === 'archieve') {
            this.$emit('archieve', 'archieve', { assets: fileIds })
          } else {
            this.$emit('archieve', 'unarchieve', { assets: fileIds })
          }
          this.$toast.global.success(message)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => (this.archiving = 0))
    },
    showShare() {
      if (this.selectedFolders.length) {
        const folderIds = this.selectedFolders.map(({ id }) => id)

        this.$axios
          .$post(`digital-assets/check-private-assets`, {
            workspace_id: this.$getWorkspaceId(),
            category_ids: folderIds,
          })
          .then(({ data }) => {
            this.shareAble = [...this.selectedFolders]
            for (const key in data) {
              for (const folder of this.shareAble) {
                if (folder.id === parseInt(key)) {
                  folder.is_public = data[key]
                }
              }
            }
            this.$nextTick(() => {
              this.$refs.shareDialog.show()
            })
          })
      } else {
        this.shareAble = [...this.selectedFolders]
        this.$refs.shareDialog.show()
      }
    },
    movedAssets(folder) {
      this.$emit('moved', folder)
    },
    selectedFolderData(data) {
      this.$emit('copied', data)
    },
    deleteResources() {
      this.isCollection > -1
        ? this.deleteSelectedAssets()
        : this.deleteSelectedFiles()
    },
    downloadSelectedFile(toBeDownloaded, resourceType) {
      let selectedFile = []
      let selectedFolder = []
      if (resourceType === 'folder') {
        selectedFolder = toBeDownloaded
        selectedFile = this.selectedFiles
      } else {
        selectedFile = !toBeDownloaded ? this.selectedFiles : toBeDownloaded
        selectedFolder = this.selectedFolders
      }
      let collectionsId = null
      if (this.$route.name === 'workspace_id-dam-collection-id') {
        collectionsId = this.$route.params.id
      }
      if (selectedFile.length === 1 && !selectedFolder.length) {
        const [file] = selectedFile
        this.$store.dispatch('dam/downloadFile', {
          id: file.id,
          url: file.display_file,
          name: file.display_file_name,
          collection_id: collectionsId,
          fallback_route: this.$route.fullPath,
          workspace_id: this.$route.params.workspace_id,
          url_workspace_id: this.$route.params.workspace_id,
        })
      } else {
        this.$store.dispatch('dam/downloadMultipleFiles', {
          files: selectedFile.map(({ id }) => id),
          folders: selectedFolder.map(({ id }) => id),
          collection_id: collectionsId,
        })
      }
    },
    restoreSelectedFiles(toBeRestored, resourceType) {
      if (this.deletingModel || this.restoringModel) return

      this.restoringModel = true
      this.$nextTick(() => (this.deletingModel = true))

      let selectedFile = []
      let selectedFolder = []
      if (resourceType === 'folder') {
        selectedFolder = toBeRestored
        selectedFile = this.selectedFiles
      } else {
        selectedFile = !toBeRestored ? this.selectedFiles : toBeRestored
        selectedFolder = this.selectedFolders
      }
      const files = [...selectedFile]
      const folders = [...selectedFolder]
      const fileIds = files.map(({ id }) => id)
      const folderIds = folders.map(({ id }) => id)

      this.$axios
        .$post('digital-assets/category/restore-deleted-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: folderIds,
          assets_ids: fileIds,
        })
        .then(({ message }) => {
          if (message) this.$toast.global.success(message)

          folders.forEach((folder) =>
            this.$store.dispatch('dam/removeFolderFromList', folder)
          )

          this.$nextTick(() => {
            this.deletingModel = false
            this.restoringModel = false
            if (toBeRestored) {
              this.$emit('fromTrashMode', 'dropDown', resourceType)
            } else {
              this.$emit('deleted', null, resourceType)
            }
          })
        })
        .catch((e) => {
          this.restoringModel = false
          this.deletingModel = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    deleteSelectedFiles(final = this.trashMode, toBeDeleted, resourceType) {
      if (this.deletingModel) return
      this.deletingModel = true

      const resourceTypes = []
      if (this.selectedFiles.length) resourceTypes.push('file')
      if (this.selectedFolders.length) resourceTypes.push('folder')
      let selectedFile = []
      let selectedFolder = []
      if (resourceType === 'folder') {
        selectedFolder = toBeDeleted
        selectedFile = this.selectedFiles
      } else {
        selectedFile = !toBeDeleted ? this.selectedFiles : toBeDeleted
        selectedFolder = this.selectedFolders
      }

      const files = [...selectedFile]
      const folders = [...selectedFolder]
      this.deletingModel = true

      const fileIds = files.map(({ id }) => id)
      const folderIds = folders.map(({ id }) => id)

      const endPoint = final
        ? 'digital-assets/category/permanent-delete-category-with-files'
        : 'digital-assets/category/delete-category-with-files'

      this.$axios
        .$post(endPoint, {
          workspace_id: this.$getWorkspaceId(),
          category_ids: folderIds,
          assets_ids: fileIds,
        })
        .then(({ message }) => {
          if (folderIds.length && !fileIds.length)
            this.$toast.global.success(
              `Folder${folderIds.length > 1 ? 's' : ''} deleted successfully.`
            )
          else if (message) this.$toast.global.success(message)

          folders.forEach((folder) =>
            this.$store.dispatch('dam/removeFolderFromList', folder)
          )

          this.$nextTick(() => {
            this.deletingModel = false
            if (toBeDeleted) {
              this.$emit('fromTrashMode', 'dropDown', resourceTypes, {
                folderIds,
                fileIds,
              })
            } else {
              this.$emit('deleted', null, resourceTypes, { folderIds, fileIds })
            }
          })
        })
        .catch((e) => {
          this.deletingModel = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    deleteSelectedAssets(toBeDeleted, idOfCollection, resourceType) {
      if (this.deletingModel) return
      this.deletingModel = true
      const selectedFile =
        resourceType === 'file'
          ? toBeDeleted
          : !toBeDeleted
          ? this.selectedFiles.map((item) => item.id)
          : []
      if (!selectedFile?.length) {
        this.deletingModel = false
        return
      }
      this.deletingModel = true
      idOfCollection = !idOfCollection ? this.$route.params.id : idOfCollection
      this.$store
        .dispatch('dam/deleteAssets', {
          collectionId: idOfCollection,
          assetIds: selectedFile,
        })
        .then(() => {
          this.deletingModel = false
          this.$emit('removeAsset')
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
          this.deletingModel = false
        })
    },
    permissionBarClose() {
      this.permission = null
      window.$('.top-bar.permission').removeClass('open')
      this.selectedTab = ''
    },
    permissionRemove() {
      this.permission = null
    },
    checkAssetPermission(fieldName, permission, fieldValue) {
      this.permissionType = fieldName
      this.is_public = fieldValue
      this.is_permission = true
      this.permission = permission
      if (fieldName === 'is_public' && this.privateCustomizationAllowed) {
        this.$refs.assetPermissionDialog.show()
      }
      if (fieldName === 'is_editorial_use') {
        this.changeSharePermission()
      }
    },
    async changeSharePermission() {
      this.isAssetPrivacyUpdating = true
      await this.$axios
        .$post(`digital-assets/update-multiple-field`, {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.selectedFiles.map((e) => e.id),
          field_name: this.permissionType,
          field_value: this.is_public,
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.isAssetPrivacyUpdating = false
          if (this.permissionType === 'is_public') {
            this.$refs.assetPermissionDialog.hide()
            if (this.inCategory || this.hashParam === '') {
              this.selectedFiles.map(
                (e) => (e.is_public = this.is_public === true ? 1 : 0)
              )
            }
            const value = this.is_public === true ? 1 : 0
            const name = 'permission'

            // eslint-disable-next-line array-callback-return
            this.selectedFiles.map((e) => {
              const activeSelectionList = this.$store.state.dam.activeSelection
              const indexOfParent = activeSelectionList.indexOf(e.category_id)
              if (indexOfParent !== -1) {
                this.$store.dispatch('dam/assetDetialsChange', {
                  name,
                  value,
                  fileId: e.id,
                  indexOfParent,
                })
              }
            })
          }
          if (this.permissionType === 'is_editorial_use') {
            this.selectedFiles.map(
              (e) => (e.is_editorial_use = this.is_public === true ? 1 : 0)
            )
          }
          this.permissionBarClose()
        })
    },
    addTagToSelectedFiles(tag) {
      console.log(tag)
      if (!this.tagManagementAllowed) return
      if (this.inCategory || this.hashParam === '') {
        this.selectedFiles.forEach(({ tags }) => {
          if (tags) {
            tags.push(tag)
          }
        })
      }

      // eslint-disable-next-line array-callback-return
      this.selectedFiles.map((e) => {
        const findExistTag = e.tags?.find(
          ({ tag_name }) => tag_name === tag.tag_name
        )
        if (!findExistTag || !e.tags) {
          const value = tag
          const name = 'tags'
          const activeSelectionList = this.$store.state.dam.activeSelection
          const indexOfParent = activeSelectionList.indexOf(e.category_id)
          if (indexOfParent !== -1) {
            this.$store.dispatch('dam/assetDetialsChange', {
              name,
              value,
              fileId: e.id,
              indexOfParent,
            })
          }
        }
      })
    },
    removeTagFromFiles(tag) {
      if (!this.tagManagementAllowed) return
      if (this.inCategory || this.hashParam === '') {
        this.selectedFiles.forEach(({ tags }) => {
          // eslint-disable-next-line array-callback-return
          tags?.find((tagsData, index) => {
            if (tagsData && tagsData.tag_name === tag.tag_name) {
              tags.splice(index, 1)
            }
          })
        })
      }

      // eslint-disable-next-line array-callback-return
      this.selectedFiles.map((e) => {
        const name = 'removeTags'
        const activeSelectionList = this.$store.state.dam.activeSelection
        const indexOfParent = activeSelectionList.indexOf(e.category_id)
        if (indexOfParent !== -1) {
          // eslint-disable-next-line array-callback-return
          e.tags.find((tagsData, index) => {
            if (tagsData && tagsData.tag_name === tag.tag_name) {
              const value = index
              this.$store.dispatch('dam/assetDetialsChange', {
                name,
                value,
                fileId: e.id,
                indexOfParent,
              })
            }
          })
        }
      })
    },
  },
}
</script>
<style scoped>
.select-bar,
.select-bar > * {
  user-select: none;
}
</style>

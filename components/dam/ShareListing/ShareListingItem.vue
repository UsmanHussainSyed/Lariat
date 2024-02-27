<template>
  <li>
    <div class="tb-column flex3">
      <div class="top-column">
        <label v-if="revoked || expired" class="check-label">
          <input
            type="checkbox"
            :checked="selected"
            @change="$emit('selection-change', !selected)"
          />
          <span class="check-span"></span>
        </label>
      </div>
    </div>
    <div class="share-url tb-column flex30">
      <div class="top-column">
        <div class="share-url">
          <label>
            <component
              :is="revoked || expired ? 'span' : 'a'"
              :href="
                (revoked || expired ? '' : url.share_url)
                  | normalizedUrl(url.generated_source, customDomain)
              "
              :style="{ 'user-select': revoked || expired ? 'none' : '' }"
              target="__blank"
            >
              <component :is="revoked || expired ? 's' : ''">
                {{
                  url.share_url
                    | normalizedUrl(url.generated_source, customDomain)
                }}
              </component>
              {{
                revoked || expired
                  ? ''
                  : url.share_url
                    | normalizedUrl(url.generated_source, customDomain)
              }}
            </component>
            <span
              v-if="revoked && filter_by == 'revoked'"
              class="ml-3 plan-status alert-warning"
            >
              Revoked</span
            >
            <span
              v-if="expired && filter_by == 'expired'"
              class="plan-status alert-secondary ml-3"
            >
              Expired</span
            >
          </label>
        </div>
      </div>
    </div>
    <div class="share-title tb-column flex11">
      <div v-tooltip="url.title" class="top-column">
        <label
          style="display: inline-block; max-width: 98%; vertical-align: middle"
          >{{ url.title ? url.title : '-' }}</label
        >
      </div>
    </div>
    <div class="share-desc tb-column flex20">
      <div v-tooltip="url.description" class="top-column">
        <label
          style="display: inline-block; max-width: 98%; vertical-align: middle"
          >{{
            url.description
              ? getSubStringDesc(url.description) || url.description
              : '-'
          }}</label
        >
      </div>
    </div>
    <div class="generated-date tb-column flex10">
      <div class="top-column">
        <label
          v-tooltip="{
            html: false,
            content: $moment(url.created_at).format('LL LT'),
          }"
        >
          {{ $moment(url.created_at).format('Do, MMM YYYY') }}
        </label>
      </div>
    </div>
    <div class="generated-by tb-column flex10">
      <div class="top-column">
        <label>{{ url.userName }}</label>
      </div>
    </div>
    <div class="generated-source tb-column flex10">
      <div class="top-column">
        <label>{{ url.generated_source | normalizedSource }}</label>
      </div>
    </div>
    <div class="share-actions tb-column flex6">
      <ul class="action d-flex justify-content-end">
        <li v-if="!revoked && !expired">
          <a href="javascript:void(0);" @click="copyShareAssetsLink()">
            <svg
              id="Layer_1"
              v-tooltip="'Copy Shared URL'"
              class="share-link-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 12 12"
              xml:space="preserve"
            >
              <g id="Icon_ionic-ios-link" transform="translate(-3.375 -3.375)">
                <path
                  id="Path_3757"
                  class="fill-color"
                  d="M10.1,11.9L10.1,11.9c-0.1,0-0.2,0.1-0.3,0.1l-1.9,1.9c-0.8,0.8-2.2,0.8-3,0s-0.8-2.2,0-3l0,0l2-2C7,8.8,7.1,8.7,7.2,8.6c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.5,0,1,0.2,1.4,0.6c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.2,0.3,0.4,0.6,0.3h0h0c0.2-0.1,0.4-0.3,0.3-0.6c-0.1-0.5-0.4-0.9-0.7-1.2c-0.5-0.4-1-0.7-1.7-0.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0C7.4,7.5,7.2,7.6,7,7.7C6.7,7.8,6.5,8,6.2,8.2l-2,2c-0.6,0.6-0.9,1.3-0.9,2.2c0,1.7,1.4,3,3,3c0.8,0,1.6-0.3,2.1-0.9l1.9-1.9c0.2-0.2,0.2-0.5,0-0.6C10.3,11.9,10.2,11.8,10.1,11.9z"
                ></path>
                <path
                  id="Path_3758"
                  class="fill-color"
                  d="M14.5,4.3c-1.2-1.2-3.1-1.2-4.3,0L8.4,6.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l1.8-1.8c0.8-0.8,2.2-0.8,3,0.1c0.8,0.8,0.8,2.1,0,2.9l-2,2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.1,0.1-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.6-1.8-1.3C8.3,8.9,8.1,8.8,7.9,8.9C7.6,8.9,7.5,9.2,7.5,9.4c0,0,0,0,0,0c0.1,0.4,0.4,0.8,0.7,1.1l0,0l0,0c0.5,0.5,1.1,0.8,1.8,0.9c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.3,0.8-0.6l2-2C15.7,7.4,15.7,5.5,14.5,4.3L14.5,4.3z"
                ></path>
              </g>
            </svg>
          </a>
        </li>
        <li v-if="deletingModel">
          <SpinLoading />
        </li>
        <li v-else-if="url.is_active && !url.is_expired">
          <a @click="$refs.deleteDialog.show()">
            <svg
              id="Layer_1"
              v-tooltip="'Revoke Shared URL'"
              class="inactive-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              style="enable-background: new 0 0 18 18"
              xml:space="preserve"
            >
              <g>
                <g id="turn-off" transform="translate(-20.581)">
                  <g id="Group_39280" transform="translate(21.331)">
                    <g id="Group_39279" transform="translate(0)">
                      <path
                        id="Path_40169"
                        class="fill-color"
                        d="M11.6,2.2c-0.4-0.2-0.8,0-1,0.4c-0.2,0.4,0,0.8,0.4,1c3.4,1.5,5,5.5,3.5,8.9c-1.5,3.4-5.5,5-8.9,3.5c-3.4-1.5-5-5.5-3.5-8.9C2.7,5.5,4,4.2,5.6,3.6C5.9,3.4,6.1,3,6,2.6S5.4,2,5,2.2c0,0,0,0,0,0C0.8,4-1.1,8.9,0.7,13s6.7,6.1,10.9,4.3c4.2-1.8,6.1-6.7,4.3-10.9C15,4.5,13.5,3,11.6,2.2L11.6,2.2z"
                      />
                      <path
                        id="Path_40170"
                        class="fill-color"
                        d="M8.2,8.2C8.7,8.2,9,7.9,9,7.5V0.8C9,0.3,8.7,0,8.2,0S7.5,0.3,7.5,0.8v6.8C7.5,7.9,7.8,8.2,8.2,8.2z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </a>
        </li>
        <li v-else>
          <a @click="$refs.deleteDialog.show()">
            <svg
              id="Layer_1"
              v-tooltip="'Delete Shared URL'"
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
        </li>
        <li v-if="!revoked && !expired && url.generated_source === 'admin'">
          <a
            v-tooltip="
              advancedShareAllowed
                ? 'Advanced share options.'
                : 'Please upgrade your subscription plan to enable advanced share options.'
            "
            href="javascript:void(0);"
            data-toggle="modal"
            :data-target="
              advancedShareAllowed ? '#advanceSharePopup_' + url.id : ''
            "
            @click="advancedShareAllowed ? advanceShareSetting(url) : ''"
          >
            <svg
              id="Layer_1"
              :style="advancedShareAllowed ? '' : 'opacity:0.4'"
              class="setting-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18.2 18.2"
              xml:space="preserve"
            >
              <g id="Group_5025" transform="translate(-149.964 -975.354)">
                <path
                  id="Path_3577"
                  class="fill-color"
                  d="M159,987.5c-1.7,0-3-1.4-3-3s1.4-3,3-3c1.7,0,3,1.4,3,3C162.1,986.1,160.7,987.5,159,987.5zM159,982.9c-0.8,0-1.5,0.7-1.5,1.5c0,0.8,0.7,1.5,1.5,1.5c0.8,0,1.5-0.7,1.5-1.5c0,0,0,0,0,0C160.5,983.6,159.9,982.9,159,982.9z"
                ></path>
                <path
                  id="Path_3578"
                  class="fill-color"
                  d="M159.1,993.5c-1.3,0-2.3-1-2.3-2.3c0-0.2-0.1-0.4-0.3-0.5c-0.1,0-0.2-0.1-0.2-0.1c-0.1,0-0.2,0-0.3,0.1c-0.8,1-2.3,1.1-3.2,0.2c-1-0.8-1.1-2.3-0.2-3.2c0.1-0.1,0.1-0.2,0.2-0.2c0.2-0.2,0.2-0.5,0-0.7c-0.1-0.1-0.2-0.1-0.3-0.1h-0.1c-1.3,0-2.3-1-2.3-2.3s1-2.3,2.3-2.3c0.3,0,0.5-0.2,0.5-0.5c0-0.1,0-0.2-0.1-0.3c-1-0.8-1.1-2.3-0.2-3.2s2.3-1.1,3.2-0.2c0.1,0.1,0.2,0.2,0.2,0.2c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.1,0,0.2,0l0.2-0.1c0.1-0.1,0.2-0.2,0.2-0.4v-0.1c0-1.3,1-2.3,2.2-2.3s2.3,1,2.3,2.2c0,0,0,0.1,0,0.1c0,0.3,0.2,0.5,0.5,0.5c0,0,0,0,0,0h0c0.1,0,0.2,0,0.3-0.1c0.8-0.9,2.3-1,3.2-0.2c0.9,0.8,1,2.2,0.2,3.2c-0.1,0.1-0.2,0.2-0.2,0.2c-0.1,0.1-0.2,0.3-0.1,0.5l0.1,0.2c0.1,0.1,0.2,0.2,0.4,0.2h0.1c1.3,0,2.3,1,2.3,2.2c0,1.3-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0c-0.2,0-0.4,0.1-0.5,0.3c-0.1,0.2,0,0.4,0.1,0.5c1,0.8,1.1,2.3,0.2,3.2c-0.4,0.5-1,0.7-1.6,0.8c-0.1,0-0.1,0-0.2,0c-0.6,0-1.1-0.2-1.5-0.6c-0.1-0.1-0.2-0.2-0.2-0.2c-0.1-0.1-0.2-0.1-0.3-0.1c-0.3,0-0.5,0.2-0.5,0.5v0.1C161.4,992.5,160.4,993.5,159.1,993.5zM156.3,989.1c1.1,0,2,0.9,2.1,2c0,0.4,0.3,0.8,0.7,0.8c0,0,0,0,0,0c0.4,0,0.7-0.3,0.7-0.7v-0.1c0-1.1,0.9-2,2-2c0.5,0,1.1,0.2,1.4,0.6c0,0,0.1,0.1,0.2,0.2c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.3c0.3-0.3,0.2-0.8-0.1-1l-0.1-0.1c-0.6-0.6-0.7-1.5-0.4-2.2c0.3-0.7,1-1.2,1.8-1.2c0.4,0,0.8-0.3,0.8-0.7c0,0,0,0,0,0c0-0.4-0.3-0.7-0.7-0.7h-0.1c-0.8,0-1.5-0.5-1.9-1.2l-0.1-0.2c-0.3-0.7-0.1-1.5,0.5-2.1c0,0,0.1-0.1,0.2-0.2c0.3-0.3,0.2-0.8-0.1-1c-0.3-0.3-0.8-0.2-1,0.1l-0.1,0.1c-0.8,0.8-2.1,0.8-2.9,0c-0.4-0.4-0.6-0.9-0.6-1.4c0-0.4-0.3-0.8-0.7-0.8c0,0,0,0,0,0c-0.4,0-0.7,0.3-0.7,0.7v0.1c0,0.8-0.5,1.5-1.2,1.9l-0.2,0.1c-0.7,0.3-1.5,0.1-2.1-0.5c0,0-0.1-0.1-0.2-0.2c-0.3-0.3-0.8-0.2-1,0.1s-0.2,0.8,0.1,1l0,0l0.1,0.1c0.8,0.8,0.8,2.2-0.1,2.9c-0.4,0.3-0.8,0.5-1.3,0.6c-0.4,0-0.8,0.3-0.8,0.7c0,0,0,0,0,0c0,0.4,0.3,0.7,0.7,0.7h0.1c1.1,0,2,0.9,2,2c0,0.5-0.2,1-0.6,1.4c0,0-0.1,0.1-0.2,0.2c-0.3,0.3-0.2,0.8,0.1,1c0.3,0.2,0.8,0.2,1-0.1l0.1-0.1C155.2,989.4,155.7,989.1,156.3,989.1z"
                ></path>
              </g>
            </svg>
          </a>
        </li>
      </ul>
    </div>

    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        :header-text="`${
          url.is_active && !url.is_expired ? 'Revoke' : 'Delete'
        } Share URL`"
        @button:yes="deleteUrl"
      >
        Are you sure you want to
        <strong>{{
          `${url.is_active && !url.is_expired ? 'revoke' : 'delete'}`
        }}</strong>
        shared URL?
      </DeleteDialog>
    </client-only>
    <!--  Advance Share Modal  -->
    <div
      :id="'advanceSharePopup_' + url.id"
      class="modal fade sharePopup advancesharePopup"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content bg-gray">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              Update Advance Share Option
            </h5>
            <button
              type="button"
              class="close advanceSharePopupClose"
              data-dismiss="modal"
              aria-label="Close"
              @click="shareModalReset()"
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
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
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
            <div class="advance-share-option">
              <div class="form-group d-flex align-items-center">
                <label class="check-label mr1">
                  Share Label
                  <input v-model="is_share_title" type="checkbox" />
                  <span class="check-span"></span>
                </label>
                <div v-if="is_share_title" class="inputDiv label">
                  <input
                    v-model="title"
                    type="text"
                    name="share-label"
                    class="form-control"
                    placeholder="Share label"
                  />
                </div>
              </div>
              <div class="form-group d-flex align-items-center">
                <label class="check-label mr1">
                  Note To Recipient
                  <input v-model="is_share_description" type="checkbox" />
                  <span class="check-span"></span>
                </label>
                <div v-if="is_share_description" class="inputDiv recipient">
                  <input
                    v-model="description"
                    type="text"
                    name="recipient"
                    class="form-control"
                    placeholder="Enter a note for the share recipient"
                  />
                </div>
              </div>
              <div class="form-group d-flex align-items-center">
                <label class="check-label mr1">
                  Password Protect
                  <input v-model="is_share_password" type="checkbox" />
                  <span class="check-span"></span>
                </label>
                <div v-if="is_share_password" class="inputDiv password">
                  <input
                    id="pin-field"
                    v-model="password"
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter a password"
                    :disabled="isPasswordDisabled"
                    autocomplete="off"
                  />
                  <span toggle="#pin-field" class="toggle-pin fa fa-eye"></span>
                </div>

                <a
                  v-if="is_share_password && password"
                  href="javascript:void(0);"
                  class="btn btn-small btn-gray ml-2"
                  @click="removePassword()"
                  >Remove</a
                >

                <a
                  v-if="is_share_password && password && isPasswordDisabled"
                  href="javascript:void(0);"
                  class="btn btn-small ml-2"
                  @click="changePassword()"
                  >Change</a
                >
              </div>
              <div class="form-group d-flex align-items-center">
                <label class="check-label mr1">
                  Set Expiration Date
                  <input v-model="is_share_expirationDate" type="checkbox" />
                  <span class="check-span"></span>
                </label>
                <div v-if="is_share_expirationDate" class="inputDiv date">
                  <DatePicker
                    :placeholder="'Select a date'"
                    :class-obj="'datepicker form-control'"
                    :start-date.sync="expiration"
                    :min-date="$moment().add('1', 'day').format('YYYY-MM-DD')"
                  />
                </div>
              </div>
              <div class="form-group d-flex align-items-center">
                <label class="check-label mr1">
                  Hide Download
                  <input v-model="hide_download" type="checkbox" />
                  <span class="check-span"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn"
              :class="{ 'btn-disabled': !loading }"
              :disabled="advanceBtnDisabled || loading"
              @click="updateAdvanceShareUrl()"
            >
              <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
              Update Share Option
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import DeleteDialog from '~/components/plugins/DeleteDialog'
import damShareUrl from '~/mixins/damShareUrl'
import DatePicker from '~/components/plugins/DatePicker'
export default {
  components: { DeleteDialog, DatePicker },
  mixins: [damShareUrl],
  props: {
    url: { type: Object, required: true },
    deleting: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    filter_by: { type: String, required: true },
  },
  data() {
    return {
      deletingModel: this.deleting,
      loading: false,
      title: null,
      description: null,
      password: null,
      hide_download: 0,
      expiration: null,
      is_share_title: 0,
      is_share_description: 0,
      is_share_password: 0,
      is_share_expirationDate: 0,
      isPasswordDisabled: false,
      advanceBtnDisabled: false,
    }
  },
  computed: {
    advancedShareAllowed() {
      return this.$auth.user?.subscription_features?.advance_share_management
        ?.enable
    },
    customDomain() {
      const withHttp = (url) =>
        /^((http|https):\/\/)/.test(url) ? url : `https://${url}`
      const { brandUrl, is_domain } = this.$store.state.dam.damInstance || {}
      return is_domain && brandUrl ? withHttp(brandUrl) : ''
    },
    revoked() {
      return this.url.is_active.toString() === '0'
    },
    expired() {
      return this.url.is_expired === true
    },
    isFromUser() {
      return this.url.generated_source === 'user'
    },
  },
  watch: {
    deletingModel(deletingModel) {
      this.$emit('update:deleting', deletingModel)
    },
    deleting(deleting) {
      this.deletingModel = deleting
    },
    hide_download() {
      this.advanceBtnDisabled = false
    },
    is_share_title() {
      this.advanceBtnDisabled = false
    },
    is_share_description() {
      this.advanceBtnDisabled = false
    },
    is_share_password() {
      this.advanceBtnDisabled = false
    },
    is_share_expirationDate() {
      this.advanceBtnDisabled = false
    },
  },
  methods: {
    async deleteUrl() {
      if (this.deletingModel) return

      this.deletingModel = true
      await this.$axios
        .$post(`digital-assets/dashboard/delete-share-assets-url`, {
          workspace_id: this.$getWorkspaceId(),
          share_url_id: this.url.id,
        })
        .then(({ status, code, message }) => {
          this.$emit('revoked', this.url)
          if (code === 200 && status) {
            this.$emit('deleted', this.url.id)
          }
          this.$toast.global.success(message)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.deletingModel = false
    },
    advanceShareSetting(url) {
      window.$('#advanceSharePopup_' + url.id).modal({ backdrop: 'static' })
      this.is_share_title = url.title ? 1 : 0
      this.is_share_description = url.description ? 1 : 0
      this.is_share_password = url.password_required ? 1 : 0
      this.is_share_expirationDate = url.expiration ? 1 : 0
      this.title = url.title
      this.description = url.description
      if (url.password_required) {
        this.password = this.getRandomString(25)
        this.isPasswordDisabled = true
      }
      this.hide_download = url.hide_download
      this.expiration = url.expiration

      if (
        this.hide_download ||
        this.is_share_title ||
        this.is_share_description ||
        this.is_share_password ||
        this.is_share_expirationDate
      ) {
        this.advanceBtnDisabled = false
      } else {
        this.advanceBtnDisabled = true
      }
    },
    async updateAdvanceShareUrl() {
      if (!this.is_share_password) {
        this.isPasswordDisabled = false
      }
      this.loading = true
      await this.$axios
        .$post('digital-assets/dashboard/update-share-url', {
          workspace_id: this.$getWorkspaceId(),
          title: this.is_share_title ? this.title : null,
          description: this.is_share_description ? this.description : null,
          ...(!this.isPasswordDisabled && {
            password: this.is_share_password ? this.password : null,
          }),
          hide_download:
            this.hide_download === true || this.hide_download === 1 ? 1 : 0,
          expiration: this.is_share_expirationDate ? this.expiration : null,
          id: this.url.id,
        })
        .then(({ data, message }) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.url.title = this.is_share_title ? this.title : null
          // eslint-disable-next-line vue/no-mutating-props
          this.url.description = this.is_share_description
            ? this.description
            : null
          // eslint-disable-next-line vue/no-mutating-props
          this.url.password_required =
            this.is_share_password && this.password
              ? this.is_share_password
              : false
          // eslint-disable-next-line vue/no-mutating-props
          this.url.hide_download =
            this.hide_download === true || this.hide_download === 1 ? 1 : 0
          // eslint-disable-next-line vue/no-mutating-props
          this.url.expiration = this.is_share_expirationDate
            ? this.expiration
            : null
          this.isPasswordDisabled = false
          window.$('.advanceSharePopupClose').trigger('click')
          this.$toast.global.success(message)
          this.shareModalReset()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.loading = false
    },
    shareModalReset() {
      this.title = null
      this.description = null
      this.password = null
      this.hide_download = 0
      this.expiration = null
      this.is_share_title = 0
      this.is_share_description = 0
      this.is_share_password = 0
      this.is_share_expirationDate = 0
    },
    copyShareAssetsLink() {
      const DAM_FRONTEND_URL = process.env.DAM_FRONTEND_URL
      let currentSource = ''
      if (process.client) currentSource = window.location.origin

      // eslint-disable-next-line prefer-const
      let [type, status] = this.url.share_url.split('?').pop().split('&')
      type = type.replace('type=', '')

      const url = `${
        this.url.generated_source === 'admin'
          ? currentSource
          : this.customDomain || DAM_FRONTEND_URL
      }/shared-assets/${type}?${status}`
      const el = document.createElement('textarea')
      el.innerHTML = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$toast.global.success('Shared Link Copied')
    },
    getRandomString(length) {
      const randomChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        )
      }
      return result
    },
    removePassword() {
      this.is_share_password = 0
      this.password = null
      this.isPasswordDisabled = false
    },
    changePassword() {
      this.isPasswordDisabled = false
    },
    getSubStringDesc(str) {
      if (str && str.length > 50) {
        return str.substr(0, 50) + '...'
      } else {
        return str
      }
    },
  },
}
</script>

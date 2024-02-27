<template>
  <div
    class="general-settings-right h-100"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        <button v-if="0" type="button" class="close" data-dismiss="alert">
          <svg
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
              ></path>
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              ></path>
            </g>
          </svg>
        </button>
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li class="active">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >DAM Settings</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-product-settings',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >Product &amp; Order Settings</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-watermark-config',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >Watermark Configuration</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-12 col-md-12 h-100">
          <div class="workspace-setting-left">
            <div class="general-settings-box customscrollbar">
              <form class="row" @submit.prevent="handleSubmit">
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Brand Name</label>
                    <input
                      v-model.trim="brand.brand_name"
                      class="form-control"
                      type="text"
                      placeholder="eg. abc"
                    />
                    <div v-if="$v.brand.brand_name.$error" class="input-error">
                      <template v-if="!$v.brand.brand_name.required">
                        Please provide brand name
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="radio-group">
                      <label class="radio-label">
                        Brand URL
                        <input
                          value="brand"
                          :checked="brand.is_domain == 0"
                          type="radio"
                          name="url"
                          @click="selectUrl"
                        />
                        <span class="radio-span"></span>
                      </label>
                      <label
                        v-tooltip="
                          customBrandAllowed
                            ? ''
                            : 'Please upgrade your subscription plan to enable this feature.'
                        "
                        class="radio-label"
                        :style="customBrandAllowed ? '' : 'opacity:0.4'"
                        @click="
                          (e) => {
                            if (!customBrandAllowed) {
                              e.stopPropagation()
                              e.stopImmediatePropagation()
                              e.preventDefault()
                            } else selectUrl(e)
                          }
                        "
                      >
                        Custom URL
                        <input
                          value="custom"
                          :checked="customBrandAllowed && brand.is_domain == 1"
                          type="radio"
                          name="url"
                          :style="
                            customBrandAllowed ? '' : 'pointer-events:none'
                          "
                          @click="customBrandAllowed ? selectUrl : ''"
                        />
                        <span class="radio-span"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div v-if="brand.is_domain == 0" class="col-sm-12">
                  <div class="form-group required">
                    <!-- <label class="control-label">Brand URL</label> -->
                    <input
                      v-model.trim="brand.brandUrl"
                      class="form-control"
                      type="text"
                    />
                    <div v-if="$v.brand.brandUrl.$error" class="input-error">
                      <template v-if="!$v.brand.brandUrl.required">
                        URL is required.
                      </template>
                      <template v-else-if="!$v.brand.brandUrl.length">
                        URL must must contain 3 characters.
                      </template>
                      <template v-else-if="!$v.brand.brandUrl.format">
                        URL must start with an alphabet and should only contain
                        a-z, 0-9, _ and -.
                      </template>
                    </div>
                    <div
                      class="input-error text-info"
                      :style="isSame ? '' : 'user-select:none'"
                    >
                      <component
                        :is="isSame ? 'a' : 'span'"
                        :href="`${$config.damBaseUrl}/${brand.brandUrl}`"
                        style="color: #17a2b8 !important"
                        target="__blank"
                      >
                        <template v-if="!isSame">eg.</template>
                        {{ $config.damBaseUrl }}/<strong
                          v-if="brand.brandUrl"
                          >{{ brand.brandUrl }}</strong
                        ><strong v-else>&lt;Brand_URL&gt;</strong>
                      </component>
                    </div>
                  </div>
                </div>
                <div v-else class="col-sm-12 d-flex">
                  <div
                    class="form-group"
                    :class="{
                      'w-100': brand.cname === null,
                      'w-90': brand.cname !== null,
                    }"
                  >
                    <input
                      v-model.trim="brand.domainUrl"
                      type="text"
                      class="form-control"
                    />
                    <div v-if="$v.brand.domainUrl.$error" class="input-error">
                      <template v-if="!$v.brand.domainUrl.required">
                        URL is required.
                      </template>
                      <template v-else-if="!$v.brand.domainUrl.length">
                        URL must must contain 3 characters.
                      </template>
                      <template v-else-if="!$v.brand.domainUrl.format">
                        URL must start with an alphabet and should only contain
                        a-z, 0-9, _ and -.
                      </template>
                    </div>
                    <div
                      class="input-error text-info"
                      :style="isSame ? '' : 'user-select:none'"
                    >
                      <component
                        :is="isSame ? 'a' : 'span'"
                        :href="`http://${brand.domainUrl}`"
                        style="color: #17a2b8 !important"
                        target="__blank"
                      >
                        <template v-if="!isSame">eg.</template>
                        https://<strong v-if="brand.domainUrl">{{
                          brand.domainUrl
                        }}</strong
                        ><strong v-else
                          >&lt;yourdomain.com or
                          brandname.yourdomain.com&gt;</strong
                        >
                      </component>
                    </div>
                    <div v-if="brand.cname !== null" class="input-info">
                      <span>CNAME: {{ brand.cname }}</span>
                      <a
                        href="javascript:void(0);"
                        class="link"
                        data-toggle="modal"
                        data-target="#CNameGuideModal"
                        :style="{
                          color: '#ff0000 !important',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }"
                        >(How to update CNAME record?)</a
                      >
                    </div>
                  </div>
                  <div v-if="brand.cname !== null" class="form-group w-10">
                    <div class="customBrand">
                      <a
                        v-if="brand.is_pointed === 0"
                        href="javascript:void(0);"
                        ><svg
                          id="Layer_1"
                          v-tooltip="'Custom URL Not Verify'"
                          class="close-icon red"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Custom URL Not Verify"
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
                            ></path>
                            <path
                              id="Path_3425"
                              class="fill-color"
                              d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                            ></path>
                          </g></svg
                      ></a>
                      <a
                        v-if="brand.is_pointed === 1"
                        href="javascript:void(0);"
                        ><svg
                          id="Layer_1"
                          v-tooltip="'Custom URL Verify'"
                          class="mark-complete-icon lime"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Custom URL Verify"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Group_4484" transform="translate(-872 -896)">
                            <path
                              id="Path_3407"
                              class="fill-color"
                              d="M878.2,911.2c-0.3,0-0.5-0.1-0.7-0.3l-5.3-5.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4.9,4.9l10.3-10.4c0.2-0.2,0.4-0.3,0.6-0.2c0.2,0,0.4,0.1,0.5,0.2c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0L878.9,911C878.7,911.1,878.5,911.2,878.2,911.2z"
                            ></path>
                          </g></svg
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <button
                    type="submit"
                    class="btn"
                    :class="{ 'btn-disabled': loading || isSame }"
                    :disabled="loading || isSame"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>

                    Submit
                  </button>
                  <button
                    v-if="!isSame"
                    class="btn btn-gray"
                    :class="{ 'btn-disabled': loading }"
                    :disabled="loading"
                    @click="clear"
                  >
                    Cancel
                  </button>
                </div>
                <div class="col-sm-12 mt3 mb2">
                  <hr />
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <h5>DAM Customization</h5>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label"
                      >Display Trending Section (Frontend)</label
                    >
                    <div class="d-flex">
                      <label class="label-switch">
                        <input
                          v-model="damBranding.settings.is_trading"
                          type="checkbox"
                          class="switch switch-onoff"
                          name="tiles"
                          @change="damBrandingSetting()"
                        />
                        <span class="lable ml0"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label"
                      >Display Recent Upload Section (Frontend)</label
                    >
                    <div class="d-flex">
                      <label class="label-switch">
                        <input
                          v-model="damBranding.settings.is_recent_upload"
                          type="checkbox"
                          class="switch switch-onoff"
                          name="tranding"
                          @change="damBrandingSetting()"
                        />
                        <span class="lable ml0"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label"
                      >Default Auto Tagging (Admin)</label
                    >
                    <div class="d-flex">
                      <label
                        v-tooltip="
                          !autoTagAllowed
                            ? 'Please upgrade your subscription plan to enable AI based auto tagging feature.'
                            : ''
                        "
                        class="label-switch"
                        :style="!autoTagAllowed ? 'opacity:0.4' : ''"
                      >
                        <input
                          v-model="damBranding.settings.auto_tagging"
                          type="checkbox"
                          class="switch switch-onoff"
                          name="tranding"
                          :disabled="!autoTagAllowed"
                          :style="!autoTagAllowed ? 'pointer-events:none' : ''"
                          @change="autoTagAllowed ? damBrandingSetting() : ''"
                        />
                        <span
                          class="lable ml0"
                          :style="!autoTagAllowed ? 'cursor:default' : ''"
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="CNameGuideModal"
      class="modal fade"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="modal-dialog xlarge modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              CNAME record setup guide
            </h5>
            <button
              ref="storageDialogClose"
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
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
                    <path
                      id="Path_3424"
                      class="fill-color"
                      d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                    ></path>
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    ></path>
                  </g></svg
              ></span>
            </button>
          </div>
          <div class="modal-body">
            <div id="domainInfo" class="domainInfoAccordion">
              <div class="card">
                <div id="headingGoDaddy" class="card-header">
                  <a
                    data-toggle="collapse"
                    data-target="#collapseGoDaddy"
                    aria-expanded="false"
                    aria-controls="collapseGoDaddy"
                    class="collapsed"
                  >
                    How to set up your CNAME to GoDaddy?
                  </a>
                </div>
                <div
                  id="collapseGoDaddy"
                  class="collapse"
                  aria-labelledby="headingGoDaddy"
                  data-parent="#domainInfo"
                  style=""
                >
                  <div class="card-body">
                    <p>
                      Add a CNAME (alias) record to use a domain prefix, such as
                      blog to point your domain to another domain name, or URL,
                      when your domain is using
                      <a
                        href="https://in.godaddy.com/help/change-nameservers-for-my-domains-664"
                        target="_blank"
                        >GoDaddy nameservers</a
                      >. To add a domain prefix that points to an
                      <strong>IP address</strong>,
                      <a
                        href="https://in.godaddy.com/help/add-a-subdomain-4080"
                        target="_blank"
                        >add a subdomain</a
                      >
                      instead. The most common <strong>CNAME</strong> is www,
                      with the <strong>@</strong> symbol entered for the
                      <strong>Value</strong> field. This will make
                      <em>www.mycoolnewbusiness.com</em> load to the same
                      webpage as the root domain,
                      <em>mycoolnewbusiness.com</em>.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Log in to your GoDaddy
                          <a
                            href="https://sso.godaddy.com/login?app=dcc&amp;path=%2Fdomains%3FshowAdvanceListView%3Dtrue%26&amp;auth_reason=1"
                            target="_blank"
                            >Domain Control Center</a
                          >. (Need help logging in?
                          <a
                            href="https://in.godaddy.com/help/i-cant-sign-in-to-my-godaddy-account-19319"
                            target="_blank"
                            >Find your username or password</a
                          >.)
                        </p>
                        <img
                          :src="
                            require('~/assets/img/domains-select-domain.png')
                          "
                          alt=""
                          class="img-responsive"
                        />
                      </li>
                      <li>
                        <p>
                          Select your domain to access the
                          <strong>Domain Settings</strong> page.
                        </p>
                      </li>
                      <li>
                        <p>
                          Select <strong>Manage DNS</strong> under
                          <strong>Additional Settings</strong>.
                        </p>
                      </li>
                      <li>
                        <p>Select <strong>Add</strong> to add a new record.</p>
                        <img
                          :src="require('~/assets/img/domains-add-record.png')"
                          alt=""
                          class="img-responsive"
                        />
                      </li>
                      <li>
                        <p>
                          Select <strong>CNAME</strong> from the
                          <strong>Type</strong> menu options.
                        </p>
                      </li>
                      <li>
                        <p>Enter the details for your new CNAME record:</p>
                        <ul>
                          <li>
                            <p>
                              <strong>Name:</strong> The host name or prefix the
                              CNAME record will be set to. You can include a
                              period (.) but not as the first or last character.
                              Consecutive periods (...) are not allowed, and the
                              host cannot exceed 63 characters or be the @
                              symbol. You can't use a host that's already
                              assigned to an existing A record, TXT record or MX
                              record.
                            </p>
                          </li>
                          <li>
                            <p>
                              <strong>Value:</strong> The URL you are setting as
                              the destination for the host. Type @ to point
                              directly to your root domain name.
                            </p>
                          </li>
                          <li>
                            <p>
                              <strong>TTL:</strong> How long the server should
                              cache information. The default setting is 1 hour.
                            </p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>
                          Select <strong>Add Record</strong> to save your new
                          CNAME record.
                        </p>
                      </li>
                    </ul>
                    <p>
                      Most DNS updates take effect within an hour, but could
                      take up to 48 hours to update globally.
                    </p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div id="headingIONOS" class="card-header">
                  <a
                    class="collapsed"
                    data-toggle="collapse"
                    data-target="#collapseIONOS"
                    aria-expanded="false"
                    aria-controls="collapseIONOS"
                  >
                    How to set up your CNAME to IONOS (1&amp;1)?
                  </a>
                </div>
                <div
                  id="collapseIONOS"
                  class="collapse"
                  aria-labelledby="headingIONOS"
                  data-parent="#domainInfo"
                >
                  <div class="card-body">
                    <p>
                      Below are detailed instructions for setting up a CNAME in
                      <a href="https://www.ionos.com/" target="_blank"
                        >1&amp;1 IONOS</a
                      >. For a general overview of CNAMEs, head over to
                      <a
                        href="https://support.photoshelter.com/hc/en-us/articles/203375130-Overview-Setting-Up-Your-CNAME"
                        target="_blank"
                        >Setting Up Your CNAME</a
                      >.
                    </p>
                    <ul>
                      <li>
                        <p>Log into your 1&amp;1 IONOS account.</p>
                      </li>
                      <li>
                        <p>
                          Navigate to the domains section of the account. Next
                          to your custom domain, click on the gear symbol and
                          choose "manage subdomains."
                        </p>
                      </li>
                      <li>
                        <p>Click on the option to "Add record."</p>
                        <img
                          :src="require('~/assets/img/add-record-1&amp;1.png')"
                          alt=""
                          class="img-responsive"
                        />
                      </li>
                      <li>
                        <p>Choose "CNAME" from the list of records.</p>
                        <img
                          :src="require('~/assets/img/cname-list-1&amp;1.png')"
                          alt=""
                          class="img-responsive"
                        />
                      </li>
                      <li>
                        <p>
                          In the "Host Name" field, enter "www" (unless you
                          prefer to use a different alias, like
                          archive.yourdomain.com). In the "Points to" field,
                          enter in "custom.photoshelter.com" - exactly as
                          written.
                        </p>
                        <img
                          :src="require('~/assets/img//host-name-1&amp;1.png')"
                          alt=""
                          class="img-responsive"
                        />
                      </li>
                      <li>
                        <p>
                          Click the "Save" button and confirm the change on the
                          next screen.
                        </p>
                      </li>
                      <li>
                        <p>
                          Next, navigate back to DNS and click the "Redirect"
                          option next to "CNAME."
                        </p>
                      </li>
                      <li>
                        <p>
                          Fill in the requested fields with the following
                          details:
                        </p>
                        <ul>
                          <li>
                            <p>"Type" should be "Your domain"</p>
                          </li>
                          <li>
                            <p>
                              "Redirect to destination" should be
                              https://www.yourdomain.com (replacing "yourdomain"
                              with your custom domain).
                            </p>
                          </li>
                          <li>
                            <p>"Redirect type" should be "HTTP redirect."</p>
                            <img
                              :src="require('~/assets/img/http-1&amp;1.png')"
                              alt=""
                              class="img-responsive"
                            />
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>
                          Click the "Save" button. It may take some time for the
                          changes to propagate, so if you receive an error in
                          the next couple steps, wait a few hours before trying
                          again.
                        </p>
                      </li>
                      <li>
                        <p>
                          Now, log into your PhotoShelter account and navigate
                          to "Website" &gt; "<a
                            href="https://www.photoshelter.com/login?ref=%2Fmem%2Fsite%2Fsettings"
                            target="_blank"
                            >General Settings.</a
                          >"
                        </p>
                      </li>
                      <li>
                        <p>
                          Enter your custom domain into the "Custom Domain
                          (CNAME)" field (including the "www").
                        </p>
                        <img
                          :src="
                            require('~/assets/img/general-settings-cname.png')
                          "
                          alt=""
                          class="img-responsive"
                        />
                      </li>
                      <li>
                        <p>
                          Click the "Save Settings" button. If it saves
                          successfully, it may take a few minutes for the SSL
                          certificate to generate (that's what makes your
                          website show as secure). Once that's done, your custom
                          domain should load successfully to your PhotoShelter
                          website.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card">
                <div id="headingGoogle" class="card-header">
                  <a
                    class="collapsed"
                    data-toggle="collapse"
                    data-target="#collapseGoogle"
                    aria-expanded="false"
                    aria-controls="collapseGoogle"
                  >
                    How to set up your CNAME to Google domains?
                  </a>
                </div>
                <div
                  id="collapseGoogle"
                  class="collapse"
                  aria-labelledby="headingGoogle"
                  data-parent="#domainInfo"
                >
                  <div class="card-body">
                    <p>
                      Once you've received your unique CNAME record for your
                      custom domain, follow these steps to add the record in
                      Google Domains.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <a
                            href="https://domains.google.com/registrar/"
                            target="_blank"
                            >Log in</a
                          >
                          to your Google Domains account.
                        </p>
                      </li>
                      <li>
                        <p>
                          Click on the domain that you’d like to update with a
                          CNAME record.
                        </p>
                      </li>
                      <li>
                        <p>
                          Select the <strong>menu</strong>
                          <img
                            :src="require('~/assets/img/menu-icon-google.png')"
                            alt=""
                            width="16"
                            height="16"
                            style="margin: 0px; border: none"
                          />
                          icon, followed by the <strong>DNS</strong>
                          <img
                            :src="require('~/assets/img/dns-icon.png')"
                            alt=""
                            width="22"
                            height="22"
                            style="margin: 0px; border: none"
                          />
                          icon
                        </p>
                      </li>
                      <li>
                        <p>
                          Scroll down until you see the
                          <strong>Custom resource records</strong> section.
                        </p>
                        <ul>
                          <li>
                            <p>
                              In the <strong>Name</strong> or
                              <strong>@</strong> field, type in the
                              <strong>subdomain</strong> you plan to use for
                              your landing page(s). Example: try, get, promo. If
                              you want to use your naked domain, type www.
                            </p>
                          </li>
                          <li>
                            <p>
                              In the <strong>Type</strong> drop-down menu,
                              select <strong>CNAME</strong>.
                            </p>
                          </li>
                          <li>
                            <p>
                              In the <strong>TTL</strong> field, enter
                              <strong>1H</strong>.
                            </p>
                          </li>
                          <li>
                            <p>
                              In the <strong>Data</strong> field, paste in the
                              unique CNAME value that you've copied from
                              Unbounce.
                            </p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>Click the <strong>ADD</strong> button.</p>
                      </li>
                    </ul>
                    <p>
                      All set! You’ve successfully added your CNAME record to
                      your Google Domains domain.
                    </p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div id="headingcPanel" class="card-header">
                  <a
                    class="collapsed"
                    data-toggle="collapse"
                    data-target="#collapsecPanel"
                    aria-expanded="false"
                    aria-controls="collapsecPanel"
                  >
                    How to set up your CNAME to cPanel with different hosting?
                  </a>
                </div>
                <div
                  id="collapsecPanel"
                  class="collapse"
                  aria-labelledby="headingcPanel"
                  data-parent="#domainInfo"
                  style=""
                >
                  <div class="card-body">
                    <p>
                      Your custom domain is activated immediately, but for the
                      mapping to be effective, you have to add the right CNAME
                      in your domain’s DNS records. How you add a CNAME to your
                      DNS records depends on your hosting service.
                    </p>
                    <p>
                      cPanel is an online web hosting control panel preferred by
                      many popular hosting providers (e.g., HostGator, JustHost,
                      WebhostingPad, etc.).
                    </p>
                    <p>
                      <strong
                        >To set up a CNAME with cPanel, follow these
                        steps:</strong
                      >
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Sign in to your web hosting account.</strong>
                        </p>
                      </li>
                      <li>
                        <p>
                          On your cPanel dashboard, go to the
                          <strong>Domains</strong> section.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Simple DNS Zone Editor</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Go to the <strong>Add a CNAME Record</strong> section,
                          and type the <strong>Name</strong> of your domain in
                          the respective field:
                        </p>
                        <ul>
                          <li>
                            <p>
                              If your custom domain is a root domain (e.g.
                              www.mysite.com), type <em>www</em> The rest is
                              added automatically by cPanel.
                            </p>
                          </li>
                          <li>
                            <p>
                              If your custom domain is a subdomain of the root
                              domain (e.g., elearning.mysite.com), type
                              <em>elearning</em> The rest is added automatically
                              by cPanel.
                            </p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>
                          In the <strong>CNAME</strong> field, type
                          <em>myportal.talentlms.com</em>.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Add CNAME Record.</strong></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card">
                <div id="headingPlesk" class="card-header">
                  <a
                    class="collapsed"
                    data-toggle="collapse"
                    data-target="#collapsePlesk"
                    aria-expanded="false"
                    aria-controls="collapsePlesk"
                  >
                    How to set up your CNAME to Plesk with different hosting?
                  </a>
                </div>
                <div
                  id="collapsePlesk"
                  class="collapse"
                  aria-labelledby="headingPlesk"
                  data-parent="#domainInfo"
                >
                  <div class="card-body">
                    <p>
                      <strong>DNS</strong> stands for
                      <strong>Domain Name System</strong> and it’s a naming
                      system arranged in a tree-like fashion that turns
                      human-readable domain names into the strings of numbers
                      known as
                      <a href="https://www.plesk.com/wiki/ip/" target="_blank"
                        >IP</a
                      >
                      addresses that identify web resources. This kind of
                      translation is known as <em>resolving</em>. When adding a
                      domain name (with
                      <strong>Websites &amp; Domains &gt; Add Domain</strong>),
                      look no further than <strong>Plesk</strong> to handle
                      resolution duties for your resources. It’s capable of
                      performing three very useful roles:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Acting as a
                          <a
                            href="https://www.plesk.com/blog/various/backup-importance-its-types-and-strategies/"
                            target="_blank"
                            >backup</a
                          >
                          server
                        </p>
                      </li>
                      <li>
                        <p>Directly processing translation requests</p>
                      </li>
                      <li>
                        <p>Handing them on to a remote server</p>
                      </li>
                    </ul>
                    <p>
                      The backup server role can be changed for existing domain
                      names (<strong>Websites &amp; Domains</strong> &gt; domain
                      name &gt; <strong>DNS Settings</strong>). We’ll examine
                      each role and explain how to assign them in the next
                      section.
                    </p>
                    <h3>DNS Name Resolving</h3>
                    <p>
                      The whole domain name system is arranged as a hierarchy.
                      It’s known as the domain namespace. This global system
                      holds every possible domain name and it’s divided into
                      logical “domain zones.” A domain zone is a bit of the
                      namespace that stores the addresses of specific domains.
                      Addresses are kept in a file on another name server that
                      has authority for that zone. So, for example, when a
                      browser tries to access www.forinstance.com, it retrieves
                      its IP address from a server that has authority for the
                      forinstance.com zone. Check the related documentation for
                      additional information about how DNS works.
                    </p>
                    <h3>Plesk as a Master DNS Server</h3>
                    <p>
                      After you buy a domain, a registrar lets you go into the
                      settings for the <strong>DNS zone</strong> that’s
                      responsible for your domain and its subdomains. You can
                      choose between allowing the registrar to look after it or
                      handing that responsibility on to Plesk. If you go with
                      that option, then you’ll be able to manage a zone from
                      your own account.
                    </p>
                    <p>
                      To look at what records are in a domain’s DNS zone right
                      now, and to also add, modify, and remove records, go to
                      <strong>Websites &amp; Domains &gt; DNS Settings</strong>.
                    </p>
                    <p>
                      Click <strong>Add Record</strong> to add a record, and
                      then click on its name to modify it. For removing records,
                      look for the checkbox next to its name and click
                      <strong>Remove</strong>. A note of caution though—getting
                      rid of certain records could have a detrimental effect on
                      how your domain functions. For instance, if you get rid of
                      the
                      <a
                        href="https://www.plesk.com/wiki/a-record/"
                        target="_blank"
                        >A record</a
                      >
                      then this would mean it won’t be able to resolve anymore.
                      If you do make changes that you later want to undo, just
                      click <strong>Reset to Default</strong> to roll back to
                      the default DNS records. This undoes all the changes that
                      have been made to the DNS zone and restores it in line
                      with the DNS template for the whole server. It’s worth
                      remembering that when going through this procedure any
                      custom records that you might have added to the zone will
                      disappear.
                    </p>
                    <p>
                      You’ll also find the SOA record in the DNS zone. You can
                      look at and make alterations to its record values by going
                      to
                      <strong
                        >Websites &amp; Domains &gt; DNS Settings &gt;
                        SOA</strong
                      >. If you put a check in the
                      <strong
                        >Use serial number format recommended by IETF and
                        RIPE</strong
                      >
                      checkbox this will alter how Plesk stores SOA serial
                      numbers, changing them from the Unix timestamp to the
                      YYYYMMDDNN format suggested by RIPE. A lot of domain
                      registrars, usually ones in Europe may require you to use
                      this format, so you can always try enabling this option if
                      your registrar won’t allow your SOA serial number.
                    </p>
                    <h3>Plesk as a Slave DNS Server</h3>
                    <p>
                      If you’d like to give authority for your zone to a DNS
                      server that you already have and you’re an advanced user,
                      you can enable Plesk to act as a slave (or “secondary”)
                      DNS server. In this situation, Plesk will hold a copy of
                      your zone and you won’t be given the choice of managing it
                      via the Customer Panel. Plesk’s DNS server is only used if
                      your primary name server stops working for some reason.
                    </p>
                    <p>
                      To make the Plesk DNS server behave as a secondary name
                      server:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Go to <strong>Websites &amp; Domains</strong> and
                          click on the domain name so you can manage its DNS
                          settings.
                        </p>
                      </li>
                      <li>
                        <p>Click on <strong>DNS Settings</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Click on <strong>Master/Slave</strong> to switch DNS
                          server mode.
                        </p>
                      </li>
                      <li>
                        <p>Click on <strong>Add Record</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Type the IP address of the primary (master) DNS
                          server.
                        </p>
                      </li>
                      <li>
                        <p>
                          Click on <strong>OK</strong>, and then
                          <strong>Update</strong>.
                        </p>
                      </li>
                      <li>
                        <p>
                          Go through steps 2-6 again for each website that’s
                          going to need a secondary name server on your server.
                        </p>
                      </li>
                    </ul>
                    <p>
                      To make the Plesk DNS server work as your main backup:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Go to <strong>Websites &amp; Domains</strong> and
                          click to choose a domain name so you can manage its
                          DNS settings.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>DNS Settings</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Click <strong>Master/Slave</strong> to go between DNS
                          server modes.
                        </p>
                      </li>
                    </ul>
                    <p>
                      The zone’s original resource records will be restored.
                    </p>
                    <h3>Registrar’s DNS Settings in Plesk</h3>
                    <p>
                      If you decide against using Plesk as a DNS server, you’ll
                      need to undertake all zone management via a domain
                      registrar’s site. Some registrars will permit remote DNS
                      zone management. If that’s the case with your hosting
                      provider, you’ll still have the opportunity to make
                      changes to the DNS zone using the Customer Panel,
                      irrespective of the location of your authoritative name
                      server.
                    </p>
                    <p>
                      To turn off the Plesk DNS service for a site that
                      currently uses external name servers:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Go to <strong>Websites &amp; Domains</strong> and
                          click to choose a domain name so you can manage its
                          DNS settings.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>DNS Settings</strong>.</p>
                      </li>
                      <li>
                        <p>Click <strong>Disable</strong>.</p>
                      </li>
                    </ul>
                    <p>
                      When you turn off the DNS service for the zone the screen
                      will refresh, leaving only a list of name servers. You can
                      click on these links to validate how the zone
                      configuration is validated on the external authoritative
                      name servers.
                    </p>
                    <p>
                      If you would like to validate a zone configuration that’s
                      maintained on authoritative name servers, follow these
                      steps:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Add the entries pointing to the appropriate name
                          servers that are authoritative for the zone to the
                          list: Click <strong>Add Record</strong>, choose a name
                          server, click <strong>OK</strong>, and then click
                          <strong>Update</strong>.
                        </p>
                      </li>
                      <li>
                        <p>
                          Do this for every name server you want to test. The
                          records will appear in the list.
                        </p>
                      </li>
                      <li>
                        <p>Click on the records that you’ve just created.</p>
                      </li>
                    </ul>
                    <p>
                      Plesk will recover the zone file from remote name servers
                      and then check the resource records to ensure that the
                      domain’s resources are correctly resolved. The results
                      will be interpreted and displayed on the screen.
                    </p>
                    <h3>Additional Domain Operations</h3>
                    <p>
                      If your Customer Panel has billing system integration,
                      then you might find that Plesk offers you these operations
                      on domains:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Permission to set a password for accessing the domain
                          management panel on a registrar’s site.
                        </p>
                      </li>
                      <li>
                        <p>
                          Locking and unlocking of a domain name when you want
                          to transfer to another provider.
                        </p>
                      </li>
                      <li>
                        <p>
                          Altering contact information like domain registrant
                          and various other details.
                        </p>
                      </li>
                      <li>
                        <p>
                          Altering DNS settings for domain zones served by a
                          domain registrar.
                        </p>
                      </li>
                      <li>
                        <p>
                          Configuring automated renewal of the domain account
                          with the domain name registration company.
                        </p>
                      </li>
                    </ul>
                    <p>
                      For setting a new password to access your domain
                      management Customer Panel on a registrar’s site:
                    </p>
                    <ul>
                      <li>
                        <p>Go to your <strong>Account</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Look for the domain name you want to change the
                          settings for and click the
                          <strong>Show Domain Info</strong> link next to it.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Change Domain Password</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Enter your new password and click <strong>OK</strong>.
                        </p>
                      </li>
                    </ul>
                    <p>
                      To lock or unlock a domain name for transfer to another
                      provider:
                    </p>
                    <ul>
                      <li>
                        <p>Go to your <strong>Account</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Look for the domain name you want to change a setting
                          for and click the
                          <strong>Show Domain Info</strong> link next to it.
                        </p>
                      </li>
                      <li>
                        <p>
                          Click <strong>Change Registrar Lock Setting</strong>.
                        </p>
                      </li>
                      <li>
                        <p>
                          To permit domain name transfer, uncheck the
                          <strong>Lock</strong> checkbox and click
                          <strong>OK</strong>.
                        </p>
                      </li>
                    </ul>
                    <p>
                      To change domain owner’s contact, technical,
                      administrative, or billing information:
                    </p>

                    <ul>
                      <li>
                        <p>Go to <strong>Account</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Find the domain name for which you want to change
                          settings, and click the link
                          <strong>Show Domain Info</strong> that’s next to it.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Edit Contact Info</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Go through the required changes and click
                          <strong>OK</strong>.
                        </p>
                      </li>
                    </ul>
                    <p>To change DNS settings for a domain:</p>
                    <ul>
                      <li>
                        <p>Go to <strong>Account</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Find the domain name you want to change the settings
                          for and click the
                          <strong>Show Domain Info</strong> link that’s next to
                          it.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Edit DNS Settings</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Set the domain name servers that serve the DNS zone
                          for your website and also the IP address of the server
                          where the website is hosted.
                        </p>
                      </li>
                      <li>
                        <p>
                          If your website’s DNS zone is served by your domain
                          name registrar, then you can also detail other
                          resource records that influence how your website’s
                          services may be accessed using the Internet.
                        </p>
                      </li>
                      <li>
                        <p>To save your changes, click <strong>OK</strong>.</p>
                      </li>
                    </ul>
                    <p>To configure automatic renewal of the domain name:</p>
                    <ul>
                      <li>
                        <p>Go to <strong>Account</strong>.</p>
                      </li>
                      <li>
                        <p>
                          Look for the domain name that you want to change the
                          settings for and click the
                          <strong>Show Domain Info</strong> link next to it.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Automatic Domain Renewal</strong>.</p>
                      </li>
                      <li>
                        <p>
                          To permit auto-renewal of domain registration, select
                          the <strong>Turn on auto renewal</strong> checkbox and
                          click <strong>OK</strong>.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card">
                <div id="headingNameCheap" class="card-header">
                  <a
                    class="collapsed"
                    data-toggle="collapse"
                    data-target="#collapseNameCheap"
                    aria-expanded="false"
                    aria-controls="collapseNameCheap"
                  >
                    How to set up your CNAME with Name Cheap?
                  </a>
                </div>
                <div
                  id="collapseNameCheap"
                  class="collapse"
                  aria-labelledby="headingNameCheap"
                  data-parent="#domainInfo"
                  style=""
                >
                  <div class="card-body">
                    <p>
                      Your custom domain is activated immediately, but for the
                      mapping to be effective, you have to add the right CNAME
                      in your domain’s DNS records. How you add a CNAME to your
                      DNS records depends on your hosting service.
                    </p>
                    <p>
                      <strong
                        >Here’s a brief guide to setting up a CNAME with
                        NameCheap:</strong
                      >
                    </p>
                    <ul>
                      <li>
                        <p>Sign in to your NameCheap account.</p>
                      </li>
                      <li>
                        <p>
                          On the left-hand panel, click
                          <strong>Domain List</strong>.
                        </p>
                      </li>
                      <li>
                        <p>
                          Locate the domain you want to map to TalentLMS and
                          click <strong>Manage</strong>.
                        </p>
                      </li>
                      <li>
                        <p>Go to the <strong>Advanced DNS</strong> tab.</p>
                      </li>
                      <li>
                        <p>
                          In the <strong>Host Records</strong> section, click
                          <strong>Add new record</strong>.
                        </p>
                      </li>
                      <li>
                        <p>
                          From the <strong>Type</strong> drop-down list, choose
                          <strong>CNAME Record</strong>.
                        </p>
                      </li>
                      <li>
                        <p>In the <strong>Host</strong> field, type:</p>
                      </li>
                      <ul>
                        <li>
                          <p>
                            www, if you’re using a root domain (e.g.,
                            www.mydomain.com).
                          </p>
                        </li>
                        <li>
                          <p>
                            Your subdomain name (e.g., elearning), if you’re
                            using a subdomain of your root domain (e.g.,
                            elearning.mydomain.com).
                          </p>
                        </li>
                      </ul>
                      <li>
                        <p>
                          In the <strong>Value</strong> field type your
                          TalentLMS domain, (e.g., myportal.talentlms.com).
                        </p>
                      </li>
                      <li>
                        <p>
                          Click <strong>Save all changes</strong> to update your
                          DNS records.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card">
                <div id="headingCrazy" class="card-header">
                  <a
                    class="collapsed"
                    data-toggle="collapse"
                    data-target="#collapseCrazy"
                    aria-expanded="false"
                    aria-controls="collapseCrazy"
                  >
                    How to set up your CNAME with Crazy Domains?
                  </a>
                </div>
                <div
                  id="collapseCrazy"
                  class="collapse"
                  aria-labelledby="headingCrazy"
                  data-parent="#domainInfo"
                  style=""
                >
                  <div class="card-body">
                    <p>
                      Follow these steps to add or update
                      <strong>CNAME Records</strong> for your domain name via
                      your <strong>Account Manager</strong>:
                    </p>
                    <ul>
                      <li>
                        <p>
                          <a
                            href="https://www.crazydomains.com.au/help/how-can-i-access-my-account-manager/"
                            target="_blank"
                            >Log In</a
                          >
                          to your <strong>Account Manager</strong>.
                        </p>
                      </li>
                      <li>
                        <p>
                          Click <strong>Domains</strong> on the menu bar at the
                          top of the page.
                        </p>
                      </li>
                      <li>
                        <p>
                          Click the <strong>Domain Name</strong> that you wish
                          to manage.
                        </p>
                        <p>
                          If you only have one domain, you will automatically be
                          redirected to its management page.
                        </p>
                      </li>
                      <li>
                        <p>
                          Scroll down to the
                          <strong>DNS Settings</strong> section and click the
                          <strong>Hamburger Menu</strong> on the right, then
                          select <strong>Add Record</strong>.
                        </p>
                        <p>
                          (Or to update an existing record: hover your cursor
                          over the <strong>CNAME Record</strong> and click the
                          <strong>Modify</strong> option that appears on its
                          right.)
                        </p>
                      </li>
                      <li>
                        <p>
                          Select <strong>CNAME Record</strong> from the
                          drop-down menu, then click the
                          <strong>Add</strong> button.
                        </p>
                      </li>
                      <li>
                        <p>
                          Enter the <strong>Sub Domain</strong> if necessary,
                          followed by the
                          <strong>CNAME Record domain or subdomain</strong> in
                          the <strong>Alias For</strong> field.
                        </p>
                      </li>
                      <li>
                        <p>Click <strong>Update</strong>.</p>
                      </li>
                    </ul>
                    <p>
                      You've now added or updated
                      <strong>CNAME Records</strong> for your domain name.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Colorpicker from '~/components/plugins/Colorpicker'
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    Colorpicker,
    Select2,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  async asyncData({
    params: { workspace_id, instance_id },
    $axios,
    error,
    $getErrorMessage,
  }) {
    const instance = await $axios
      .$get(
        `digital-assets/instance/detail?workspace_id=${workspace_id}&id=${instance_id}`
      )
      .then(({ data }) => data)
      .catch((e) => {
        return error({ ...e, message: $getErrorMessage(e) })
      })

    if (!instance) error({ message: 'No DAM instance available', status: 404 })

    const brand = {
      brand_name: instance.brand_name,
      brandUrl: instance.url,
      domainUrl: instance.url,
      logo: instance.logo,
      favicon: instance.favicon_name,
      is_domain: instance.is_domain,
      is_pointed: instance.is_pointed,
      cname: instance.cname,
      settings: {
        is_trading: !!instance.settings?.is_trading,
        is_recent_upload: !!instance.settings?.is_recent_upload,
        auto_tagging: !!instance.settings?.auto_tagging,
      },
    }

    if (instance.is_domain === 0) {
      brand.domainUrl = ''
    } else {
      brand.brandUrl = ''
    }

    return {
      instance,
      brand,
      brandOriginal: Object.freeze({ ...brand }),
      damBranding: Object.freeze({ ...brand }),
    }
  },
  data() {
    return {
      logo: { src: null, file: null },
      faviconName: null,
      oldFaviconName: null,
      loading: false,
      removeLogo: false,
      maxSize: 262144,
      brandLoading: false,
      initialTheme: {},
      selectedUser: '',
      notificationUsers: [],
      subscriptionData: {},
      dataLoaded: false,
    }
  },
  computed: {
    customBrandAllowed() {
      return !!this.subscriptionData?.features?.custom_brand_url?.enable
    },
    autoTagAllowed() {
      return !!this.subscriptionData?.features?.ai_based_asset_auto_tagging
        ?.enable
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    isSame() {
      return this.$isSame(this.brand, this.brandOriginal)
    },
    workspace_id() {
      return this.$route.params.workspace_id
    },
  },
  watch: {
    autoTagAllowed: {
      handler(n) {
        if (this.dataLoaded) {
          if (!n) this.damBranding.settings.auto_tagging = false
        }
      },
      immediate: true,
    },
    '$route.params.workspace_id': {
      handler() {
        this.fetchSubscription()
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.faviconName = this.brand.favicon
    this.oldFaviconName = this.brand.favicon
  },
  mounted() {
    this.$store.dispatch('dam/getNotifications')
    const anchors = [
      ...document.querySelectorAll('#CNameGuideModal .collapse a'),
    ]
    anchors.forEach((anchor) => {
      const icon = document.createElement('i')
      icon.className = 'fa fa-external-link-square'
      icon.style.marginLeft = '4px'
      anchor.appendChild(icon)
    })
    this.getNotificationUserList()
    this.dataLoaded = true
  },
  methods: {
    fetchSubscription() {
      this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
    },
    updateNotificationUser() {
      this.$axios
        .$post('digital-assets/notification/add-order-admin', {
          workspace_id: this.workspace_id || this.$getWorkspaceId(),
          order_admin_id: this.selectedUser,
          instace_id: this.$route.params.instance_id,
        })
        .then(({ message }) => {
          this.$toast.success(message)
        })
        .catch(console.error)
    },
    getNotificationUserList() {
      this.$axios
        .$get('digital-assets/notification/new-order-admin-list', {
          params: {
            workspace_id: this.workspace_id || this.$getWorkspaceId(),
          },
        })
        .then(({ data }) => {
          this.notificationUsers = data
          this.selectedUser = data.find((e) => e.id === e.is_active)?.id
        })
        .catch(console.error)
    },
    selectUrl(ev) {
      if (ev.target.value === 'brand') {
        this.brand.is_domain = 0
        this.brand.domainUrl = this.brandOriginal.domainUrl
      } else {
        this.brand.is_domain = 1
        this.brand.brandUrl = this.brandOriginal.brandUrl
      }
    },
    onFileChange(file) {
      const imageFile = file[0]
      if (file.length > 0) {
        if (!imageFile.type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
        } else if (imageFile.size > this.maxSize) {
          this.$toast.global.error(
            'Your file is too big! Please select an image under 256KB'
          )
        } else {
          const img = new Image()
          img.src = URL.createObjectURL(imageFile)
          img.onload = () => {
            const width = img.naturalWidth
            const height = img.naturalHeight
            if (width <= 128 && height <= 128) {
              this.faviconName = imageFile.name
              this.brand.favicon = imageFile
            } else {
              this.$toast.global.error(
                'Maximum file dimension should be about 128 x 128.'
              )
            }
          }
        }
      }
    },
    clear() {
      this.logo = { src: null, file: null }
      this.brand = { ...this.brandOriginal }
      this.faviconName = this.oldFaviconName
      this.$nextTick(() => this.$v.$reset())
    },
    async handleSubmit() {
      await this.$v.$touch()
      if (this.$v.$invalid || this.loading) {
        return
      }
      this.loading = true

      const formData = new FormData()

      formData.append('workspace_id', this.instance.workspace_unique_id)
      formData.append('id', this.instance.id)
      if (this.brand.is_domain === 0) {
        formData.append('url', this.brand.brandUrl)
      } else {
        formData.append('url', this.brand.domainUrl)
      }
      formData.append('brand_name', this.brand.brand_name)
      formData.append('is_active', 1)
      formData.append('is_domain', this.brand.is_domain)
      formData.append('settings', JSON.stringify(this.brand.settings))

      await this.$axios
        .$post('digital-assets/instance/update', formData)
        .then(({ data, message }) => {
          if (message) this.$toast.global.success(message)

          this.brand = {
            brand_name: data.brand_name,
            brandUrl: data.url,
            domainUrl: data.url,
            logo: data.logo,
            favicon: data.favicon_name,
            is_domain: data.is_domain,
            is_pointed: data.is_pointed,
            cname: data.cname,
            settings: data.settings,
          }
          if (data.is_domain === 0) {
            this.brand.domainUrl = ''
          } else {
            this.brand.brandUrl = ''
          }
          this.faviconName = this.brand.favicon
          this.oldFaviconName = this.brand.favicon
          this.logo = { src: null, file: null }
          this.brandOriginal = Object.freeze({ ...this.brand })
          this.damBranding = Object.freeze({ ...this.brand })
        })
        .catch(this.$checkValidation)

      this.loading = false
    },
    async damBrandingSetting() {
      if (this.brandLoading) return
      this.brandLoading = true

      const formData = new FormData()
      formData.append('workspace_id', this.instance.workspace_unique_id)
      formData.append('id', this.instance.id)
      if (this.damBranding.is_domain === 0) {
        formData.append('url', this.damBranding.brandUrl)
      } else {
        formData.append('url', this.damBranding.domainUrl)
      }
      formData.append('brand_name', this.damBranding.brand_name)
      formData.append('is_active', 1)
      formData.append('is_domain', this.damBranding.is_domain)
      formData.append('settings', JSON.stringify(this.damBranding.settings))

      await this.$axios
        .$post('digital-assets/instance/update', formData)
        .then(({ data, message }) => {
          if (message) this.$toast.global.success(message)

          this.damBranding = Object.freeze({
            ...this.damBranding,
          })
          this.brandOriginal = Object.freeze({
            ...this.damBranding,
          })
        })
        .catch(this.$checkValidation)

      this.brandLoading = false
    },
    async imageUpload() {
      if ((this.$v.$touch() && this.$v.$invalid) || this.loading) return
      const formData = new FormData()

      formData.append('workspace_id', this.instance.workspace_unique_id)
      formData.append('id', this.instance.id)
      if (this.brandOriginal.is_domain === 0) {
        formData.append('url', this.brandOriginal.brandUrl)
      } else {
        formData.append('url', this.brandOriginal.domainUrl)
      }
      formData.append('brand_name', this.brandOriginal.brand_name)
      formData.append('is_active', 1)
      formData.append('is_domain', this.brandOriginal.is_domain)
      formData.append('settings', JSON.stringify(this.brandOriginal.settings))

      await this.$axios
        .$post('digital-assets/instance/update', formData)
        .then(({ data, message }) => {
          if (message) this.$toast.global.success(message)
          this.brand.logo = data.logo
          this.logo = { src: null, file: null }
          this.brandOriginal = Object.freeze({
            ...this.brandOriginal,
            logo: data.logo,
          })
          this.damBranding = Object.freeze({
            ...this.brandOriginal,
            logo: data.logo,
          })
        })
        .catch(this.$checkValidation)
    },
    logoChange({ target }) {
      const minSize = 2097152 // 4 mb
      const {
        files: [file],
      } = target

      if (!file) {
        return
      }
      if (!file.type.match('image.*')) {
        this.$toast.global.error('Please choose an image file')
        return
      }
      if (file.size > minSize) {
        target.value = null
        this.$toast.global.error('Image size should not exceed above 2 MB')
        return
      }

      const reader = new FileReader()

      reader.onload = ({ target: { result } }) => {
        this.logo = { file, src: result }
        this.removeLogo = false
        target.value = null
        this.imageUpload()
      }

      reader.readAsDataURL(file)
    },
  },

  validations() {
    if (this.brand.is_domain === 0 || this.brand.is_domain === '0') {
      return {
        brand: {
          brand_name: { required },
          brandUrl: {
            required,
            length: minLength(3),
            format(v) {
              return /^[a-z]{1}[a-z0-9_-]{2,36}$/gi.test(v)
            },
          },
        },
      }
    }
    if (this.brand.is_domain === 1 || this.brand.is_domain === '1') {
      return {
        brand: {
          brand_name: { required },
          domainUrl: {
            required,
            length: minLength(3),
            format(v) {
              // eslint-disable-next-line no-useless-escape
              return /^[a-z0-9]+([_\.-]?[a-z0-9-_]{0,36}){0,3}(\.[a-z]{1,3}){1,2}$/gi.test(
                v
              )
            },
          },
        },
      }
    }
  },
}
</script>

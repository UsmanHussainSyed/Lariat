<template>
  <div class="main-left">
    <component :is="`style`" v-html="css"></component>
    <div class="logo-instance">
      <img
        v-if="getBrandingDetails && getBrandingDetails.branding.brand_favicon"
        :src="getBrandingDetails.branding.brand_favicon"
        alt=""
        class="logo-icon"
      />
      <span v-else class="text-logo-letter">{{
        getBrandingDetails ? getBrandingDetails.name.substring(0, 2) : ''
      }}</span>
      <nuxt-link
        :to="{
          name: auth.user.redirectPathName,
          params: { workspace_id: auth.id },
        }"
      >
        <img
          v-if="getBrandingDetails && getBrandingDetails.logo"
          :src="getBrandingDetails.logo"
          alt=""
          class="logo"
        />
        <span v-else class="text-logo">{{
          getBrandingDetails ? getBrandingDetails.name : ''
        }}</span>
      </nuxt-link>
    </div>
    <div class="side-menu">
      <div class="customscrollbar">
        <ul class="nav nav-main">
          <div style="color: white"></div>
          <li
            v-if="auth.user.hasDamAccess"
            id="dam-left-menu"
            :class="{
              'nav-parent': true,
              active:
                getCurrentModule.firstIndex == 'dam' ||
                getCurrentModule.secondIndex == 'dam'
                  ? true
                  : false,
            }"
          >
            <a href="javascript:;" class="nav-link">
              <svg
                id="Layer_1"
                class="dam-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4069" transform="translate(-332.448 -126.134)">
                  <path
                    id="Path_3348"
                    class="fill-color"
                    d="M350.2,126.4c-0.2-0.2-0.4-0.3-0.7-0.3h-16.1c-0.5,0-1,0.4-1,1v0v16.1c0,0.5,0.4,1,1,1h16.1c0.5,0,1-0.4,1-1c0,0,0,0,0,0v-16.1C350.4,126.8,350.3,126.6,350.2,126.4z M348.5,142.2h-14.1v-14.1h14.1L348.5,142.2z"
                  />
                  <path
                    id="Path_3349"
                    class="fill-color"
                    d="M341.4,136.1c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.4,0.4-0.4,1,0,1.4C340.9,136,341.2,136.1,341.4,136.1z"
                  />
                </g>
              </svg>

              <span>Digital Asset Manager</span>
            </a>
            <ul v-if="!isInstance" class="nav nav-children">
              <template v-if="getInstance">
                <li>
                  <nuxt-link
                    exact
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="dashboard-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_5350"
                        transform="translate(-501.711 -997.494)"
                      >
                        <path
                          id="Path_3166"
                          class="fill-color"
                          d="M518.2,999v1.5h-15V999H518.2 M518.6,997.5h-15.8c-0.6,0-1.1,0.5-1.1,1.1v2.2c0,0.6,0.5,1.1,1.1,1.1h15.8c0.6,0,1.1-0.5,1.1-1.1v-2.2C519.7,998,519.2,997.5,518.6,997.5z"
                        />
                        <path
                          id="Path_3167"
                          class="fill-color"
                          d="M508.5,1005v9h-5.2v-9H508.5 M508.8,1003.5h-6c-0.6,0-1.1,0.5-1.1,1.1v9.8c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-9.8C510,1004,509.5,1003.5,508.8,1003.5z"
                        />
                        <path
                          id="Path_3168"
                          class="fill-color"
                          d="M518.2,1005v2.2H513v-2.2H518.2 M518.6,1003.5h-6c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-3C519.7,1004,519.2,1003.5,518.6,1003.5z"
                        />
                        <path
                          id="Path_3169"
                          class="fill-color"
                          d="M518.2,1011.7v2.2H513v-2.2H518.2 M518.6,1010.2h-6c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-3C519.7,1010.7,519.2,1010.2,518.6,1010.2z"
                        />
                      </g>
                    </svg>

                    <span>Dashboard</span>
                  </nuxt-link>
                </li>
                <!--
                <li class="d-none">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-share-urls',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="share-link-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 12 12"
                      xml:space="preserve"
                    >
                      <g
                        id="Icon_ionic-ios-link"
                        transform="translate(-3.375 -3.375)"
                      >
                        <path
                          id="Path_3757"
                          class="fill-color"
                          d="M10.1,11.9L10.1,11.9c-0.1,0-0.2,0.1-0.3,0.1l-1.9,1.9c-0.8,0.8-2.2,0.8-3,0s-0.8-2.2,0-3l0,0l2-2C7,8.8,7.1,8.7,7.2,8.6c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.5,0,1,0.2,1.4,0.6c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.2,0.3,0.4,0.6,0.3h0h0c0.2-0.1,0.4-0.3,0.3-0.6c-0.1-0.5-0.4-0.9-0.7-1.2c-0.5-0.4-1-0.7-1.7-0.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0C7.4,7.5,7.2,7.6,7,7.7C6.7,7.8,6.5,8,6.2,8.2l-2,2c-0.6,0.6-0.9,1.3-0.9,2.2c0,1.7,1.4,3,3,3c0.8,0,1.6-0.3,2.1-0.9l1.9-1.9c0.2-0.2,0.2-0.5,0-0.6C10.3,11.9,10.2,11.8,10.1,11.9z"
                        />
                        <path
                          id="Path_3758"
                          class="fill-color"
                          d="M14.5,4.3c-1.2-1.2-3.1-1.2-4.3,0L8.4,6.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l1.8-1.8c0.8-0.8,2.2-0.8,3,0.1c0.8,0.8,0.8,2.1,0,2.9l-2,2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.1,0.1-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.6-1.8-1.3C8.3,8.9,8.1,8.8,7.9,8.9C7.6,8.9,7.5,9.2,7.5,9.4c0,0,0,0,0,0c0.1,0.4,0.4,0.8,0.7,1.1l0,0l0,0c0.5,0.5,1.1,0.8,1.8,0.9c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.3,0.8-0.6l2-2C15.7,7.4,15.7,5.5,14.5,4.3L14.5,4.3z"
                        />
                      </g>
                    </svg>

                    <span>Shared URLs</span>
                  </nuxt-link>
                </li>
                <li class="d-none">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-embed-urls',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="embed-icon white"
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
                        />
                        <path
                          id="Path_3431"
                          class="fill-color"
                          d="M213.4,330.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.2,0.1-0.4,0.2-0.5l2.9-3l-2.9-3c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0c0,0,0,0,0,0l3.5,3.5c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.5,3.5C213.8,330.8,213.7,330.9,213.4,330.9z"
                        />
                        <path
                          id="Path_3432"
                          class="fill-color"
                          d="M207,331.4c-0.4,0-0.8-0.3-0.8-0.8c0-0.1,0-0.2,0.1-0.3l3.4-8.2c0.2-0.4,0.6-0.6,1-0.4c0.4,0.2,0.6,0.6,0.4,1l0,0l-3.4,8.2C207.6,331.3,207.4,331.4,207,331.4z"
                        />
                      </g>
                    </svg>
                    <span>Embed URLs</span></nuxt-link
                  >
                </li>
                <!--                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-analytics',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="analytics-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 11 11"
                      xml:space="preserve"
                    >
                      <path
                        id="spreadsheet-app"
                        class="fill-color st0"
                        d="M10.6,2.4H8.3C8,2.4,7.8,2.6,7.8,2.8v7.4H7.1V0.4C7.1,0.2,6.9,0,6.7,0c0,0,0,0,0,0H4.4C4.1,0,3.9,0.2,3.9,0.4l0,0v9.7H3.2V5.8c0-0.2-0.2-0.4-0.4-0.4H0.4C0.2,5.4,0,5.6,0,5.8v4.8C0,10.8,0.2,11,0.4,11h10.2c0.2,0,0.4-0.2,0.4-0.4V2.8C11,2.6,10.8,2.4,10.6,2.4z M2.3,10.2H0.9V6.2h1.5L2.3,10.2z M4.8,0.9h1.5v9.3H4.8V0.9z M10.2,10.2H8.7V3.2h1.5L10.2,10.2z"
                      />
                    </svg>
                    <span>Analytics</span>
                  </nuxt-link>
                </li>-->
                <li class="d-none">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-damAnalytics-damInsights',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="analytics-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 11 11"
                      xml:space="preserve"
                    >
                      <path
                        id="spreadsheet-app"
                        class="fill-color st0"
                        d="M10.6,2.4H8.3C8,2.4,7.8,2.6,7.8,2.8v7.4H7.1V0.4C7.1,0.2,6.9,0,6.7,0c0,0,0,0,0,0H4.4C4.1,0,3.9,0.2,3.9,0.4l0,0v9.7H3.2V5.8c0-0.2-0.2-0.4-0.4-0.4H0.4C0.2,5.4,0,5.6,0,5.8v4.8C0,10.8,0.2,11,0.4,11h10.2c0.2,0,0.4-0.2,0.4-0.4V2.8C11,2.6,10.8,2.4,10.6,2.4z M2.3,10.2H0.9V6.2h1.5L2.3,10.2z M4.8,0.9h1.5v9.3H4.8V0.9z M10.2,10.2H8.7V3.2h1.5L10.2,10.2z"
                      />
                    </svg>
                    <span>DAM Insights</span>
                  </nuxt-link>
                </li>
                <li class="d-none">
                  <nuxt-link class="nav-link" :to="getIntegrationSource(auth)">
                    <svg
                      id="Layer_1"
                      class="integration-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="integration_1">
                        <path
                          id="combine"
                          class="fill-color"
                          d="M16.3,4.5h-2.9V1.7c0-0.9-0.7-1.7-1.7-1.7c0,0,0,0,0,0H1.7C0.7,0,0,0.7,0,1.7c0,0,0,0,0,0v10.2c0,0.9,0.7,1.7,1.7,1.7h2.9v2.9c0,0.9,0.7,1.7,1.7,1.7c0,0,0,0,0,0h10.2c0.9,0,1.7-0.7,1.7-1.7c0,0,0,0,0,0V6.2C18,5.3,17.3,4.5,16.3,4.5z M6.3,12.4l6.1-6.1v2.5l-3.6,3.6H6.3z M11.7,5.6l-6.1,6.1V9.2l3.6-3.6L11.7,5.6z M5.6,7.7V6.2c0-0.3,0.3-0.6,0.6-0.6h1.6L5.6,7.7z M12.4,10.3v1.6c0,0.3-0.3,0.6-0.6,0.6h0h-1.6L12.4,10.3z M1.7,12.4c-0.3,0-0.6-0.3-0.6-0.6l0,0V1.7c0-0.3,0.3-0.6,0.6-0.6l0,0h10.2c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0v2.9H6.2c-0.9,0-1.7,0.7-1.7,1.7c0,0,0,0,0,0v6.3H1.7zM16.9,16.3c0,0.3-0.3,0.6-0.6,0.6l0,0H6.2c-0.3,0-0.6-0.3-0.6-0.6l0,0v-2.9h6.3c0.9,0,1.7-0.7,1.7-1.7c0,0,0,0,0,0V5.6h2.9c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0L16.9,16.3z"
                        />
                      </g></svg
                    ><span>Integrations</span></nuxt-link
                  >
                </li>
                <li class="d-none">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-generate-image',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      class="integration-icon white"
                    >
                      <!-- Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        class="fill-color st0"
                        d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40zm152 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"
                      />
                    </svg>
                    <span>Image Generation</span>
                  </nuxt-link>
                </li>
                <li class="d-none">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-generate-image-outpainting',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      class="integration-icon white"
                    >
                      <!-- Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                      <path
                        class="fill-color st0"
                        d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40zm152 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"
                      />
                    </svg>
                    <span>Out Painting</span>
                  </nuxt-link>
                </li>
                <!-- <li>
                  <nuxt-link
                    :class="{
                      'nav-link': true,
                      'nuxt-link-exact-active': damSettingsActiveStatus,
                    }"
                    :to="{
                      name: 'workspace_id-workspace-settings-dam',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    Settings
                  </nuxt-link>
                </li> -->
              </template>
              <template v-else>
                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-add-dam-instance',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="new-project-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_5341" transform="translate(-1005 -577.999)">
                        <path
                          id="Path_3394"
                          class="fill-color"
                          d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                        />
                        <path
                          id="Path_3395"
                          class="fill-color"
                          d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                        />
                      </g>
                    </svg>
                    <span>Create DAM Instance</span>
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </li>
          <li class="d-none"
            v-if="auth.user.hasLeadAccess"
            :class="{
              'nav-parent': true,
              active: getCurrentModule.firstIndex == 'lead',
            }"
          >
            <a href="javascript:void(0);" class="nav-link">
              <svg
                id="Layer_1"
                class="lm-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4068" transform="translate(-332.463 -96.555)">
                  <path
                    id="Path_3342"
                    class="fill-color"
                    d="M349.5,114.6c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1c0.5,0,1,0.4,1,1c0,0.3-0.1,0.5-0.3,0.7C350,114.5,349.7,114.6,349.5,114.6z"
                  />
                  <path
                    id="Path_3343"
                    class="fill-color"
                    d="M341.4,98.5c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1c0.5,0,1,0.4,1,1c0,0.3-0.1,0.5-0.3,0.7C342,98.4,341.7,98.5,341.4,98.5z"
                  />
                  <path
                    id="Path_3344"
                    class="fill-color"
                    d="M333.4,98.5c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1c0.5,0,1,0.4,1,1c0,0.3-0.1,0.5-0.3,0.7C333.9,98.4,333.7,98.5,333.4,98.5z"
                  />
                  <path
                    id="Path_3345"
                    class="fill-color"
                    d="M333.4,106.5c-0.5,0-1-0.4-1-1c0-0.5,0.4-1,1-1c0.5,0,1,0.4,1,1c0,0.3-0.1,0.5-0.3,0.7C333.9,106.4,333.7,106.5,333.4,106.5z"
                  />
                  <path
                    id="Path_3346"
                    class="fill-color"
                    d="M333.4,114.6c-0.5,0-1-0.4-1-1c0-0.3,0.1-0.5,0.3-0.7l16-16.1c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-16,16.1C333.9,114.5,333.7,114.6,333.4,114.6z"
                  />
                  <path
                    id="Path_3347"
                    class="fill-color"
                    d="M341.4,114.6c-0.5,0-1-0.4-1-1c0-0.3,0.1-0.5,0.3-0.7l8-8c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l0,0l-8,8C342,114.5,341.7,114.6,341.4,114.6z"
                  />
                </g>
              </svg>

              <span>Lead Management</span>
            </a>
            <ul class="nav nav-children">
              <li
                v-if="
                  !$_auth().user.lead.isSuperAdmin &&
                  !$_auth().user.lead.isRSM &&
                  !$_auth().user.lead.isDealerGroupAdmin
                " >
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-my-dealership',
                    params: {
                      workspace_id: auth.id,
                      id: 0,
                    },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="my-dealership-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 11 9.8"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_metro-shop"
                      class="fill-color"
                      d="M3.1,3.2L3.6,0H1.1l-1,2.8C0,2.8,0,3,0,3.1c0.1,0.8,0.8,1.3,1.6,1.2C2.3,4.3,2.9,3.9,3.1,3.2z M5.5,4.3C6.3,4.4,7,3.8,7.1,3.1c0,0,0-0.1,0-0.1L6.8,0H4.2L3.9,3c0,0,0,0.1,0,0.1C4,3.8,4.7,4.4,5.5,4.3zM8.6,4.9v2.4H2.4V4.9C2.2,5,1.9,5.1,1.6,5.1c-0.1,0-0.2,0-0.3,0v3.9c0,0.5,0.4,0.9,0.9,0.9h6.8c0.5,0,0.9-0.4,0.9-0.9V5c-0.1,0-0.2,0-0.3,0C9.1,5.1,8.8,5,8.6,4.9L8.6,4.9z M11,2.8L9.9,0H7.4l0.5,3.2c0.2,0.7,0.9,1.1,1.6,1.1c0.8,0.1,1.5-0.5,1.6-1.2C11,2.9,11,2.8,11,2.8L11,2.8z"
                    />
                  </svg>

                  <span>My Dealership</span>
                </nuxt-link>
              </li>

              <li v-if="$_auth().user.lead.isSuperAdmin">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-executive-dashboard',
                    params: {
                      workspace_id: auth.id,
                    },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="dashboard-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_5350" transform="translate(-501.711 -997.494)">
                      <path
                        id="Path_3166"
                        class="fill-color"
                        d="M518.2,999v1.5h-15V999H518.2 M518.6,997.5h-15.8c-0.6,0-1.1,0.5-1.1,1.1v2.2c0,0.6,0.5,1.1,1.1,1.1h15.8c0.6,0,1.1-0.5,1.1-1.1v-2.2C519.7,998,519.2,997.5,518.6,997.5z"
                      ></path>
                      <path
                        id="Path_3167"
                        class="fill-color"
                        d="M508.5,1005v9h-5.2v-9H508.5 M508.8,1003.5h-6c-0.6,0-1.1,0.5-1.1,1.1v9.8c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-9.8C510,1004,509.5,1003.5,508.8,1003.5z"
                      ></path>
                      <path
                        id="Path_3168"
                        class="fill-color"
                        d="M518.2,1005v2.2H513v-2.2H518.2 M518.6,1003.5h-6c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-3C519.7,1004,519.2,1003.5,518.6,1003.5z"
                      ></path>
                      <path
                        id="Path_3169"
                        class="fill-color"
                        d="M518.2,1011.7v2.2H513v-2.2H518.2 M518.6,1010.2h-6c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-3C519.7,1010.7,519.2,1010.2,518.6,1010.2z"
                      ></path>
                    </g>
                  </svg>
                  <span>Dashboard</span>
                </nuxt-link>
              </li>

              <li class="d-none">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-leads',
                    params: { workspace_id: auth.id },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="lead-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 16.3 18"
                    xml:space="preserve"
                  >
                    <path
                      id="Path_3776"
                      class="fill-color"
                      d="M15.2,10.6c-0.8-0.4-1.7-0.3-2.3,0.3l-2.2-1.2c0.1-0.2,0.1-0.4,0.1-0.7c0-0.3,0-0.5-0.1-0.8l2.2-1.3c0.2,0.2,0.5,0.3,0.8,0.4c0.2,0,0.3,0.1,0.5,0.1c1.1,0,2-0.9,2-2c0-0.4-0.1-0.7-0.3-1.1c-0.3-0.5-0.7-0.8-1.2-0.9c-0.5-0.1-1.1-0.1-1.5,0.2c-0.5,0.3-0.8,0.7-0.9,1.2c-0.1,0.3-0.1,0.6,0,0.9L10,7.2C9.7,6.8,9.2,6.6,8.8,6.5V3.9c1.1-0.4,1.6-1.5,1.3-2.5S8.6-0.2,7.5,0.1C6.7,0.4,6.1,1.1,6.1,2c0,0.9,0.5,1.6,1.4,1.9v2.6C7,6.6,6.6,6.9,6.2,7.2L4,6c0.1-0.3,0-0.6,0-0.9C3.8,4.6,3.4,4.1,3,3.9c-0.5-0.3-1-0.3-1.5-0.2c-0.5,0.1-0.9,0.5-1.2,1c-0.5,1-0.2,2.2,0.8,2.7c0.3,0.2,0.6,0.2,1,0.2c0.5,0,1-0.2,1.4-0.5l2.3,1.2C5.6,8.6,5.5,8.8,5.5,9c0,0.3,0,0.5,0.1,0.8l-2.2,1.3c-0.7-0.6-1.6-0.6-2.3-0.2c-0.5,0.3-0.8,0.7-0.9,1.2c-0.3,1.1,0.4,2.2,1.5,2.4c0.2,0,0.3,0.1,0.5,0.1c0.4,0,0.7-0.1,1-0.3C3.6,14,4,13.6,4.1,13.1c0.1-0.3,0.1-0.6,0-0.9l2.2-1.3c0.3,0.3,0.8,0.6,1.2,0.7v2.6c-1.1,0.4-1.6,1.5-1.3,2.5c0.4,1.1,1.5,1.6,2.5,1.3s1.6-1.5,1.3-2.5c-0.2-0.6-0.7-1.1-1.3-1.3v-2.6c0.5-0.1,0.9-0.4,1.3-0.8l2.2,1.2c0,0.1,0,0.2,0,0.3c0,0.7,0.4,1.4,1,1.8c0.3,0.2,0.6,0.2,1,0.2c1.1,0,2-0.9,2-2C16.3,11.6,15.9,10.9,15.2,10.6L15.2,10.6z M13.5,5c0.1-0.2,0.4-0.4,0.6-0.4c0.3,0,0.5,0.1,0.6,0.3c0.1,0.1,0.1,0.2,0.1,0.4c0,0.3-0.1,0.5-0.4,0.6c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3-0.2-0.5-0.3C13.4,5.6,13.4,5.3,13.5,5L13.5,5z M2,6.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7c0.1,0,0.2,0,0.4,0.1c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.2,0.2,0.5,0,0.8C2.5,6.2,2.3,6.4,2,6.4L2,6.4z M2.5,13.2c-0.3,0.2-0.8,0.1-1-0.2c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0.2-0.4,0.3-0.5c0.3-0.2,0.8-0.1,1,0.2c0.1,0.2,0.1,0.5,0,0.7C2.7,13.1,2.6,13.2,2.5,13.2L2.5,13.2z M7.4,2c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7c0,0.1,0,0.3-0.1,0.4c-0.2,0.3-0.6,0.5-1,0.3C7.7,2.6,7.6,2.5,7.5,2.4C7.4,2.2,7.4,2.1,7.4,2L7.4,2z M8.9,16c0,0.4-0.3,0.7-0.7,0.7c-0.4,0-0.7-0.3-0.7-0.7l0,0c0-0.1,0-0.2,0.1-0.3c0.2-0.4,0.6-0.5,1-0.3c0.1,0.1,0.2,0.2,0.3,0.3C8.8,15.7,8.9,15.9,8.9,16L8.9,16z M8.8,10.2c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2c0,0,0,0,0,0C7.1,9.9,6.8,9.5,6.8,9.1c0,0,0,0,0-0.1c0-0.5,0.2-0.9,0.6-1.1c0,0,0.1,0,0.1,0c0.2-0.1,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2c0,0,0,0,0,0C9.2,8.1,9.5,8.5,9.5,9c0,0,0,0,0,0C9.5,9.5,9.3,9.9,8.8,10.2C8.8,10.1,8.8,10.2,8.8,10.2L8.8,10.2z M14.9,12.7c-0.2,0.4-0.6,0.5-1,0.3c-0.1-0.1-0.2-0.1-0.3-0.2c0-0.1-0.1-0.1-0.1-0.2c-0.1-0.2,0-0.4,0.1-0.6c0.1-0.2,0.4-0.4,0.6-0.4h0c0.4,0,0.7,0.3,0.7,0.7C15,12.5,15,12.6,14.9,12.7z"
                    />
                  </svg>

                  <span>Leads</span>
                </nuxt-link>
              </li>
              <li class="d-none"
                v-if="
                  $_auth().user.lead.isSuperAdmin ||
                  $_auth().user.lead.isDealerGroupAdmin
                ">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-dealers',
                    params: { workspace_id: auth.id },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="dealer-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 20 16"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_awesome-store-alt"
                      class="fill-color"
                      d="M10,12H4V7H2v8c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1V7h-2V12z M19.8,4.4l-2.7-4C17,0.2,16.7,0,16.3,0H3.7C3.3,0,3,0.2,2.8,0.4l-2.7,4C-0.1,4.9,0,5.5,0.4,5.8C0.6,5.9,0.8,6,1,6h18c0.6,0,1-0.4,1-1C20,4.8,19.9,4.6,19.8,4.4L19.8,4.4z M16,15.5c0,0.3,0.2,0.5,0.5,0.5h1c0.3,0,0.5-0.2,0.5-0.5V7h-2V15.5z"
                    />
                  </svg>

                  <span>Dealers</span>
                </nuxt-link>
              </li>

              <li class="d-none" v-if="!$_auth().user.lead.isRSM">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-rsm',
                    params: { workspace_id: auth.id },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="rsm-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="RSM">
                      <path
                        id="investor"
                        class="fill-color"
                        d="M11.8,7.8c1.9-1.5,2.2-4.3,0.6-6.2S8.2-0.6,6.3,1S4.1,5.3,5.6,7.2c0.2,0.2,0.4,0.5,0.6,0.6C3.4,8.4,1.4,11,1.5,13.9v3.6C1.5,17.8,1.7,18,2,18c0,0,0,0,0,0h14.1c0.3,0,0.5-0.2,0.5-0.5l0,0v-3.6C16.7,11,14.7,8.4,11.8,7.8zM9.6,8.8v1.1H8.5V8.8L9.6,8.8z M8.4,10.9h1.2l0.6,2.8l-1.2,1l-1.2-1L8.4,10.9z M5.7,4.4c0-1.8,1.5-3.3,3.3-3.3s3.3,1.5,3.3,3.3s-1.5,3.3-3.3,3.3l0,0C7.2,7.7,5.7,6.2,5.7,4.4z M15.6,17h-13v-3.1c-0.1-2.7,1.9-4.9,4.6-5.1h0.3v1.5l-0.7,3.5c0,0.2,0,0.4,0.2,0.5l1.8,1.5c0.2,0.2,0.5,0.2,0.7,0l1.8-1.5c0.1-0.1,0.2-0.3,0.2-0.5l-0.7-3.5V8.8H11c2.7,0.2,4.7,2.4,4.6,5.1L15.6,17z"
                      ></path>
                    </g>
                  </svg>

                  <span>RSMs</span>
                </nuxt-link>
              </li>
              <li class="d-none">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-tasks',
                    params: { workspace_id: auth.id },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="task-created-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 14.2 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4444" transform="translate(-240.128 -796.501)">
                      <path
                        id="Path_3243"
                        class="fill-color"
                        d="M242,814.5c-1,0-1.8-0.8-1.9-1.7v-12.1c0-1,0.9-1.9,1.9-1.9h1.4l0-0.6c0-0.3,0.3-0.5,0.6-0.5h1.1c0.4-0.8,1.1-1.2,1.9-1.3c0,0,0.1,0,0.1,0c0.8,0,1.6,0.5,1.9,1.2l1.2,0c0.4,0,0.6,0.2,0.6,0.5v0.5l1.4,0.1c1,0,1.9,0.8,1.9,1.9v12.1c-0.1,1-0.9,1.8-1.9,1.8L242,814.5z M242,800c-0.4,0-0.7,0.3-0.8,0.7v12c0,0.3,0.3,0.6,0.7,0.6h10.4c0.4,0,0.7-0.2,0.8-0.6v-12c0-0.4-0.4-0.7-0.8-0.7H251l0,0.9c0,0.3-0.3,0.5-0.6,0.5h-6.2c-0.3,0-0.6-0.2-0.6-0.5V800L242,800z M249.8,800.3l0-1.3l-1,0c-0.3,0-0.5-0.2-0.6-0.5c-0.1-0.5-0.5-0.8-1-0.8c-0.5,0-0.9,0.4-1,0.8c0,0.3-0.3,0.5-0.5,0.5h-1v1.3L249.8,800.3z"
                      ></path>
                      <path
                        id="Path_3244"
                        class="fill-color"
                        d="M243.7,808.5c-0.2,0-0.3-0.1-0.4-0.2l-0.9-0.9c-0.2-0.2-0.2-0.6,0-0.8c0.1-0.1,0.3-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l0.4,0.4l1.3-1.1c0.1-0.1,0.2-0.1,0.4-0.1l0,0c0.2,0,0.3,0.1,0.4,0.2c0.2,0.2,0.2,0.6,0,0.8l-1.7,1.6c-0.1,0.1-0.1,0.1-0.2,0.1l0,0L243.7,808.5z"
                      ></path>
                      <path
                        id="Path_3245"
                        class="fill-color"
                        d="M246.8,808c-0.3,0-0.6-0.3-0.5-0.6c0-0.3,0.3-0.5,0.5-0.5h4.8c0.3,0,0.6,0.3,0.5,0.6c0,0.3-0.3,0.5-0.5,0.5H246.8z"
                      ></path>
                      <path
                        id="Path_3246"
                        class="fill-color"
                        d="M243.7,805.1c-0.2,0-0.3-0.1-0.4-0.2l-0.9-0.9c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0c0,0,0,0,0,0l0,0l0.4,0.4l1.3-1.1c0.2-0.2,0.6-0.2,0.8,0c0.2,0.2,0.2,0.6,0,0.8l-1.7,1.6c0,0-0.1,0.1-0.2,0.1l0,0.1L243.7,805.1z"
                      ></path>
                      <path
                        id="Path_3247"
                        class="fill-color"
                        d="M246.8,804.6c-0.3,0-0.6-0.2-0.6-0.6s0.2-0.6,0.6-0.6c0,0,0,0,0,0h4.8c0.3,0,0.6,0.3,0.6,0.6c0,0.3-0.3,0.5-0.6,0.6H246.8z"
                      ></path>
                      <path
                        id="Path_3248"
                        class="fill-color"
                        d="M243.7,811.9c-0.2,0-0.3-0.1-0.4-0.2l-0.9-0.9c-0.2-0.2-0.2-0.6,0-0.8c0.1-0.1,0.3-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l0.4,0.4l1.3-1.1c0.1-0.1,0.2-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2c0.2,0.2,0.2,0.6,0,0.8l-1.7,1.6c-0.1,0.1-0.2,0.1-0.3,0.1l0,0L243.7,811.9z"
                      ></path>
                      <path
                        id="Path_3249"
                        class="fill-color"
                        d="M246.8,811.3c-0.3,0-0.6-0.2-0.6-0.6s0.2-0.6,0.6-0.6c0,0,0,0,0,0h4.8c0.3,0,0.6,0.3,0.6,0.6c0,0.3-0.3,0.5-0.6,0.6H246.8z"
                      ></path>
                    </g>
                  </svg>

                  <span>{{
                    $_auth().user.lead.isSuperAdmin ? 'Tasks' : 'My Tasks'
                  }}</span>
                </nuxt-link>
              </li>
              <li class="d-none">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'workspace_id-lead-analytics',
                    params: { workspace_id: auth.id },
                  }"
                >
                  <svg
                    id="Layer_1"
                    class="analytics-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 11 11"
                    xml:space="preserve"
                  >
                    <path
                      id="spreadsheet-app"
                      class="fill-color"
                      d="M10.6,2.4H8.3C8,2.4,7.8,2.6,7.8,2.8v7.4H7.1V0.4C7.1,0.2,6.9,0,6.7,0c0,0,0,0,0,0H4.4C4.1,0,3.9,0.2,3.9,0.4l0,0v9.7H3.2V5.8c0-0.2-0.2-0.4-0.4-0.4H0.4C0.2,5.4,0,5.6,0,5.8v4.8C0,10.8,0.2,11,0.4,11h10.2c0.2,0,0.4-0.2,0.4-0.4V2.8C11,2.6,10.8,2.4,10.6,2.4z M2.3,10.2H0.9V6.2h1.5L2.3,10.2z M4.8,0.9h1.5v9.3H4.8V0.9z M10.2,10.2H8.7V3.2h1.5L10.2,10.2z"
                    ></path>
                  </svg>
                  <span>Analytics</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="feedback">
      <nuxt-link
        :to="{
          name: 'workspace_id-feedback',
          params: { workspace_id: internal_workspace_id },
        }"
        >Submit feedback</nuxt-link
      >
    </div>
    <div class="power-by">
      <span>Powered by</span>
      <img src="~/assets/img/lariat-logo.svg" alt="Lariat Logo" />
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { compact } from 'lodash'
import currentWorkspace from '~/mixins/currentWorkspace'

export default {
  name: 'LeftMenu',
  components: {},
  mixins: [currentWorkspace],
  data() {
    return {
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
    }
  },
  async fetch() {
    await this.$store.dispatch('dam/setBranding', {
      workspace_id: this.internal_workspace_id,
      isSetFavicon: false,
    })
  },
  head() {
    return {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href:
            (this.getBrandingDetails &&
              this.getBrandingDetails.branding.brand_favicon) ||
            '/favicon.png',
        },
      ],
    }
  },
  computed: {
    isInstance() {
      return this.$store.state.dam.fetchingInstances
    },
    getInstance() {
      return Object.keys(this.$store.state.dam.damInstance).length
    },
    getCurrentModule() {
      const path = compact(this.$route.path.split('/'))
      return { firstIndex: path[1], secondIndex: path[2] }
    },
    getBrandingDetails() {
      return this.$store.state.dam.brandingDetails
    },
    css() {
      return `
      :root {
--primary: ${
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.primary_color
            ? this.getBrandingDetails.branding.primary_color
            : '#070E22'
          : '#070E22'
      };
--secondary: ${
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.secondary_color
            ? this.getBrandingDetails.branding.secondary_color
            : '#ffffff'
          : '#ffffff'
      };
--submenu-default: ${this.hex2rgba(
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.secondary_color
            ? this.getBrandingDetails.branding.secondary_color
            : '#ffffff'
          : '#ffffff',
        0.7
      )};
--menu-background: ${this.hex2rgba(
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.secondary_color
            ? this.getBrandingDetails.branding.secondary_color
            : '#ffffff'
          : '#ffffff',
        0.15
      )};
}
.main-left{background-color: var(--primary);}
.main-left .text-logo-letter,
.main-left .logo-instance .text-logo,
ul.nav-main li.nav-parent > .nav-link span{color:  var(--secondary);}
ul.nav-main li.nav-parent > .nav-link:after{border-color:  var(--secondary);}
ul.nav-main li.nav-parent > .nav-link svg .fill-color{fill:  var(--secondary);}
ul.nav-main li.nav-parent.active > .nav-link,
ul.nav-main li.nav-parent > .nav-link:hover,
ul.nav-main li.nav-parent > .nav-link:focus{background-color: var(--menu-background);}
ul.nav-main ul.nav-children li > .nav-link{color: var(--submenu-default);}
ul.nav-main ul.nav-children li.active > .nav-link,
ul.nav-main ul.nav-children li > .nav-link.active,
ul.nav-main ul.nav-children li > .nav-link:hover,
ul.nav-main ul.nav-children li > .nav-link:focus{color: var(--secondary);}
ul.nav-main ul.nav-children li > .nav-link svg.report-icon .fill-color,
ul.nav-main ul.nav-children li > .nav-link svg.my-task-icon .st2{stroke: var(--submenu-default);}
ul.nav-main ul.nav-children li > .nav-link svg .fill-color{fill:  var(--submenu-default);}
         `
    },
    damSettingsActiveStatus() {
      const routeName = this.$route.name
      return (
        routeName === 'workspace_id-workspace-settings-dam-instance_id' ||
        routeName ===
          'workspace_id-workspace-settings-dam-instance_id-manage-banner' ||
        routeName === 'workspace_id-workspace-settings-dam-instance_id-users'
      )
    },
  },
  watch: {
    async workspaceId(workspaceId) {
      if (
        this.$_auth()?.user?.hasDamAccess &&
        !Object.keys(this.$store.state.dam.damInstance).length
      ) {
        await this.$store.dispatch('dam/getInstances', workspaceId)
      }
    },
  },
  async mounted() {
    this.loadJs()
    if (
      this.$_auth()?.user?.hasDamAccess &&
      !Object.keys(this.$store.state.dam.damInstance).length
    ) {
      await this.$store.dispatch('dam/getInstances', this.workspaceId)
    }
  },
  updated() {
    this.loadJs()
  },
  methods: {
    hex2rgba(hex, code) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
          'rgba(' +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
          ',' +
          code +
          ')'
        )
      }
    },
    getIntegrationSource(auth) {
      const { dropbox = {}, drive = {}, box = {} } = this.$store.state
      const query = dropbox.token
        ? { source: 'dropbox' }
        : drive.accessToken
        ? { source: 'google_drive' }
        : box.accessToken
        ? { source: 'box' }
        : {}
      return {
        name: 'workspace_id-dam-integrations',
        params: { workspace_id: auth.id },
        query,
      }
    },
    loadJs() {
      // Main Menu Click Hide Show JS----------------
      window.$(document).on('click', '.main-left:not(.show)', function () {
        $(this).addClass('show')
      })
      window
        .$(document)
        .on(
          'click',
          '.main-left .nav.nav-children > li:not(.sub-nav) > .nav-link',
          function () {
            window.$(this).parents('.main-left').removeClass('show')
          }
        )
      window.$(document).mouseup(function (e) {
        const container = window.$('.main-left')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.removeClass('show')
        }
      })

      $(document).ready(function () {
        $('.nav-main li a')
          .filter(function () {
            'use strict'
            return this.href === location.href.replace(/#.*/, '')
          })
          .parents('li.nav-parent')
          .addClass('active')
      })
      $(document).ready(function () {
        const $items = $('.nav-main li.nav-parent')

        function expand($li) {
          $li.children('ul.nav-children').slideDown('fast', function () {
            $li.addClass('nav-expanded')
            $(this).css('display', '')
            ensureVisible($li)
          })
        }

        function collapse($li) {
          $li.children('ul.nav-children').slideUp('fast', function () {
            $(this).css('display', '')
            $li.removeClass('nav-expanded')
          })
        }

        function ensureVisible($li) {
          const scroller = $li.offsetParent()
          if (!scroller.get(0)) {
            return false
          }
          const top = $li.position().top
          if (top < 0) {
            scroller.animate(
              {
                scrollTop: scroller.scrollTop() + top,
              },
              'fast'
            )
          }
        }

        function buildSidebarNav(anchor, prev, next, ev) {
          if (anchor.prop('href')) {
            const arrowWidth =
              parseInt(
                window.getComputedStyle(anchor.get(0), ':after').width,
                10
              ) || 0
            if (ev.offsetX > anchor.get(0).offsetWidth - arrowWidth) {
              ev.preventDefault()
            }
          }
          if (prev.get(0) !== next.get(0)) {
            collapse(prev)
            expand(next)
          } else {
            collapse(prev)
          }
        }

        $items.find('> a').on('click', function (ev) {
          const $html = $('html')
          const $window = $(window)
          const $anchor = $(this)
          const $prev = $anchor.closest('ul.nav').find('> li.nav-expanded')
          const $next = $anchor.closest('li')
          const $ev = ev
          if ($anchor.attr('href') === '#') {
            ev.preventDefault()
          }
          if (!$html.hasClass('sidebar-left-big-icons')) {
            buildSidebarNav($anchor, $prev, $next, $ev)
          } else if (
            $html.hasClass('sidebar-left-big-icons') &&
            $window.width() < 768
          ) {
            buildSidebarNav($anchor, $prev, $next, $ev)
          }
        })
      })
    },
  },
}
</script>

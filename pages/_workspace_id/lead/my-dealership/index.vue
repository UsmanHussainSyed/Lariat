<template>
  <div class="body-content">
    <div class="body-content-left h-100">
      <div class="common-box-header">
        <h2 class="title">Dealer Detail</h2>
      </div>
      <div
        ref="editbox_ref"
        class="box customscrollbar dl-detail-left ld-detail-left p0"
      >
        <a v-if="$_auth().user.lead.isDealerAdmin" class="dl-editicon">
          <svg
            id="Layer_1"
            class="edit-icon orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4350" transform="translate(-397.961 -147.331)">
              <path
                id="Path_3408"
                class="fill-color"
                d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
              ></path>
              <path
                id="Path_3409"
                class="fill-color"
                d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
              ></path>
            </g>
          </svg>
        </a>
        <div class="dl-detail-left-fr">
          <div class="box-heading">
            <img
              :src="
                dealerImg !== ''
                  ? dealerImg
                  : require('@/assets/img/placeholder.jpg')
              "
              style="height: 100px; width: auto; object-fit: contain"
              alt=""
            />
            <h3>{{ dealer.dealership_name }}</h3>
          </div>
          <div class="dealer-contact">
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="dealer-number-icon orange align-self-start"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4467" transform="translate(-229 -896)">
                  <rect
                    id="Rectangle_3006"
                    x="229"
                    y="896"
                    class="fill-hide"
                    width="18"
                    height="18"
                  />
                  <g id="Group_4087" transform="translate(-684.315 236.365)">
                    <path
                      id="Path_3323"
                      class="fill-color"
                      d="M914.1,675.6c-0.2,0-0.4-0.1-0.6-0.3c-0.1-0.2-0.2-0.4-0.2-0.6v-12.3c0-0.4,0.4-0.8,0.8-0.8h2.4c0.2,0,0.4,0.1,0.6,0.2c0.1,0.1,0.2,0.3,0.2,0.5c0,0.4-0.4,0.7-0.8,0.7h-1.8l0,11l1.8,0c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6c0,0.4-0.3,0.6-0.7,0.6L914.1,675.6L914.1,675.6z"
                    />
                    <path
                      id="Path_3324"
                      class="fill-color"
                      d="M928,675.6c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5c0-0.4,0.4-0.7,0.8-0.7h1.8l0-11l-1.8,0c-0.3,0-0.5-0.1-0.7-0.4c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.4,0.3-0.7,0.7-0.7h2.5c0.2,0,0.5,0.1,0.6,0.2c0.1,0.2,0.2,0.4,0.2,0.6v12.3c0,0.4-0.4,0.8-0.8,0.8L928,675.6z"
                    />
                    <path
                      id="Path_3325"
                      class="fill-color"
                      d="M918.3,672.1c-0.4,0-0.7-0.3-0.7-0.7v-5.6c0-0.4,0.4-0.7,0.8-0.7c0.4,0,0.7,0.3,0.7,0.7v5.6C919,671.8,918.7,672.1,918.3,672.1z"
                    />
                    <path
                      id="Path_3326"
                      class="fill-color"
                      d="M926.1,672.1c-0.4,0-0.7-0.3-0.7-0.7v-5.6c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7l0,0v5.6C926.9,671.8,926.5,672.1,926.1,672.1L926.1,672.1z"
                    />
                    <path
                      id="Path_3327"
                      class="fill-color"
                      d="M922.3,672.8c-0.4,0-0.7-0.3-0.7-0.7v-6.9c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v6.9C923,672.4,922.7,672.8,922.3,672.8z"
                    />
                  </g>
                </g>
              </svg>

              <div class="media-body">
                <h5>Dealership Number</h5>
                <p>{{ dealer.dealership_number }}</p>
              </div>
            </div>
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="email-icon orange align-self-start"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4466" transform="translate(-229 -802)">
                  <rect
                    id="Rectangle_3004"
                    x="229"
                    y="802"
                    class="fill-hide"
                    width="18"
                    height="18"
                  ></rect>
                  <g id="Group_4408" transform="translate(-597.727 142.118)">
                    <path
                      id="Path_3512"
                      class="fill-color"
                      d="M835.7,669.7c-0.4,0-0.7-0.1-1-0.3l-7.8-6.1l0.9-1.3l7.8,6.1l0.2,0.1l0-0.1l7.8-6.1l0.9,1.3l-7.8,6.1C836.4,669.6,836.1,669.7,835.7,669.7z"
                    ></path>
                    <path
                      id="Path_3513"
                      class="fill-color"
                      d="M828.4,675.9c-0.9,0-1.7-0.8-1.6-1.7v-10.6c0-0.9,0.7-1.7,1.6-1.7h14.7c0.9,0,1.7,0.8,1.6,1.7v10.6c0,0.9-0.7,1.7-1.6,1.7L828.4,675.9z M828.4,663.5c-0.1,0-0.1,0-0.1,0.1l0,0v10.6c0,0.1,0,0.1,0.1,0.1l0,0h14.7c0.1,0,0.1-0.1,0.1-0.1v-10.6c0-0.1,0-0.1-0.1-0.1L828.4,663.5z"
                    ></path>
                  </g>
                </g>
              </svg>

              <div class="media-body">
                <h5>Email</h5>
                <!-- prettier-ignore -->
                <div
                class="
                  d-flex
                  flex-wrap
                  align-items-center
                  justify-content-between
                "
              >
                <div 
                 class="mail-virify"
                :class="[
                 dealer.email_verified_at === null? 'worng' : '',
                 dealer.email_verified_at === null? 'flex90' : 'flex100'
                 ]"
                >
                  <p>
                    <a :href="'mailto:' + dealer.email">{{ dealer.email }}</a>
                  </p>
                  <svg
                    v-if="dealer.email_verified_at !== null"
                    id="Layer_1"
                    v-tooltip="'Verified at '+ $moment(dealer.email_verified_at ).format('MMM Do YYYY')"
                    class="mark-complete-icon lime"
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
                    </g>
                  </svg>
                  <svg id="Layer_1" class="close-icon red" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" xml:space="preserve"><g id="Group_4358" transform="translate(-69.745 -317.549)"><path id="Path_3424" class="fill-color" d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"></path><path id="Path_3425" class="fill-color" d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"></path></g></svg>
                </div>
              </div>
              </div>
            </div>
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="phone-icon orange align-self-start"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g
                  id="Icon_feather-phone"
                  transform="translate(-741.165 -659.595)"
                >
                  <path
                    id="Path_3511"
                    class="fill-color"
                    d="M756.8,677.6c-0.1,0-0.1,0-0.2,0c-2.7-0.3-5.2-1.2-7.5-2.7c-2.1-1.3-3.9-3.1-5.2-5.2c-1.5-2.3-2.4-4.8-2.7-7.5c-0.1-1.3,0.8-2.4,2.1-2.6c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0h2.5c1.2,0,2.2,0.9,2.3,2c0.1,0.8,0.3,1.5,0.5,2.2c0.3,0.9,0.1,1.8-0.5,2.5l-0.7,0.7c1,1.6,2.4,3,4,4l0.7-0.7c0.7-0.6,1.6-0.9,2.5-0.5c0.7,0.3,1.4,0.4,2.2,0.5c1.2,0.2,2.1,1.2,2,2.4v2.5C759.1,676.5,758.1,677.6,756.8,677.6L756.8,677.6z M746,661h-2.5c-0.3,0-0.6,0.1-0.7,0.4c-0.2,0.2-0.2,0.5-0.2,0.7c0.3,2.5,1.1,4.8,2.4,6.9c1.2,1.9,2.9,3.6,4.8,4.8c2.1,1.3,4.4,2.2,6.9,2.5c0.3,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.7v-2.5c0-0.5-0.3-0.9-0.8-1c-0.9-0.1-1.7-0.3-2.5-0.6c-0.4-0.1-0.8,0-1,0.2l-1.1,1.1c-0.2,0.2-0.6,0.3-0.8,0.1c-2.2-1.2-4-3.1-5.3-5.3c-0.2-0.3-0.1-0.6,0.1-0.8l1.1-1.1c0.3-0.3,0.3-0.7,0.2-1c-0.3-0.8-0.5-1.6-0.6-2.5C746.9,661.3,746.5,661,746,661L746,661z"
                  />
                </g>
              </svg>

              <div class="media-body">
                <h5>Phone</h5>
                <p>
                  <a
                    :href="
                      'tel:' + dealer.office_phone
                        ? dealer.office_phone
                        : dealer.phone
                    "
                    >{{
                      dealer.office_phone ? dealer.office_phone : dealer.phone
                    }}</a
                  >
                </p>
              </div>
            </div>
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="home-icon orange align-self-start"
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
                    ></path>
                  </g>
                  <g id="Path_3471">
                    <path
                      id="Path_3515"
                      class="fill-color"
                      d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                    ></path>
                  </g>
                </g>
              </svg>

              <div class="media-body">
                <h5>Address</h5>
                <p>
                  {{ dealer.address_line_1 }}<br v-if="dealer.address_line_1" />
                  {{ dealer.address_line_2 }}<br v-if="dealer.address_line_2" />
                  {{ dealer.city }}<br v-if="dealer.city" />
                  {{ dealer.zip_code }}
                </p>
              </div>
            </div>
          </div>
          <div class="dealer-contact dealer-contact2 mt2 pb0">
            <div
              v-if="
                dealer.dealership_rsm_assign &&
                dealer.dealership_rsm_assign.length > 0
              "
              class="row"
            >
              <div
                v-for="cat in getUniqueRsmList"
                :key="cat.category_id"
                class="col-lg-6 mb20"
              >
                <h5 class="mt0">{{ cat.user.name }}</h5>
                <span class="classes bg-blue">{{ cat.category.name }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="primaryContact"
            class="dealer-contact dealer-contact2 mt10"
          >
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="user-icon align-self-start"
                style="height: 15px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 17.7 18"
                xml:space="preserve"
              >
                <g id="Group_4410" transform="translate(-954.8 -658.583)">
                  <g id="Path_3236">
                    <path
                      id="Path_3516"
                      class="fill-color"
                      d="M971.8,676.6L971.8,676.6c-0.4,0-0.8-0.3-0.8-0.8v-1.3c0-1.8-1.5-3.3-3.3-3.3h-8.1c-1.8,0-3.3,1.5-3.3,3.3v1.3c0,0.4-0.3,0.8-0.8,0.8l0,0c-0.4,0-0.8-0.3-0.8-0.8v-1.3c0-2.7,2.2-4.8,4.8-4.8c0,0,0,0,0,0h8.1c2.7,0,4.8,2.2,4.8,4.8c0,0,0,0,0,0v1.3C972.5,676.2,972.2,676.6,971.8,676.6z"
                    />
                  </g>
                  <g id="Path_3237">
                    <path
                      id="Path_3517"
                      class="fill-color"
                      d="M963.7,668.2c-2.7,0-4.8-2.2-4.8-4.8c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C968.5,666.1,966.3,668.2,963.7,668.2z M963.7,660.1c-1.8,0-3.3,1.5-3.3,3.3c0,1.8,1.5,3.3,3.3,3.3c1.8,0,3.3-1.5,3.3-3.3l0,0C967,661.6,965.5,660.1,963.7,660.1C963.7,660.1,963.7,660.1,963.7,660.1L963.7,660.1z"
                    />
                  </g>
                </g>
              </svg>

              <div class="media-body align-self-start">
                <h5>Primary Contact</h5>
              </div>
            </div>
            <div class="media sc_media">
              <img
                v-if="primaryContact.display_profile_image"
                :src="primaryContact.display_profile_image"
                alt=""
                class="rd-img"
                style="width: 18px"
              />
              <div
                v-else
                class="profile-char primaryContact"
                :title="primaryContact.name ? primaryContact.name : '-'"
              >
                {{
                  primaryContact.name && primaryContact.name.trim()
                    ? primaryContact.name.charAt(0).toUpperCase()
                    : primaryContact.name.charAt(0).toUpperCase()
                }}
              </div>
              <div class="media-body align-self-start">
                <h5>{{ primaryContact.name ? primaryContact.name : '-' }}</h5>
                <p>{{ primaryContact.designation }}</p>
              </div>
            </div>
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="email-icon orange align-self-start"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4466" transform="translate(-229 -802)">
                  <rect
                    id="Rectangle_3004"
                    x="229"
                    y="802"
                    class="fill-hide"
                    width="18"
                    height="18"
                  ></rect>
                  <g id="Group_4408" transform="translate(-597.727 142.118)">
                    <path
                      id="Path_3512"
                      class="fill-color"
                      d="M835.7,669.7c-0.4,0-0.7-0.1-1-0.3l-7.8-6.1l0.9-1.3l7.8,6.1l0.2,0.1l0-0.1l7.8-6.1l0.9,1.3l-7.8,6.1C836.4,669.6,836.1,669.7,835.7,669.7z"
                    ></path>
                    <path
                      id="Path_3513"
                      class="fill-color"
                      d="M828.4,675.9c-0.9,0-1.7-0.8-1.6-1.7v-10.6c0-0.9,0.7-1.7,1.6-1.7h14.7c0.9,0,1.7,0.8,1.6,1.7v10.6c0,0.9-0.7,1.7-1.6,1.7L828.4,675.9z M828.4,663.5c-0.1,0-0.1,0-0.1,0.1l0,0v10.6c0,0.1,0,0.1,0.1,0.1l0,0h14.7c0.1,0,0.1-0.1,0.1-0.1v-10.6c0-0.1,0-0.1-0.1-0.1L828.4,663.5z"
                    ></path>
                  </g>
                </g>
              </svg>
              <div class="media-body align-self-start">
                <h5>Email</h5>
                <p>
                  <a :href="'mailto:' + primaryContact.email">{{
                    primaryContact.email
                  }}</a>
                </p>
              </div>
            </div>
            <div class="media sc_media">
              <svg
                id="Layer_1"
                class="phone-icon orange align-self-start"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g
                  id="Icon_feather-phone"
                  transform="translate(-741.165 -659.595)"
                >
                  <path
                    id="Path_3511"
                    class="fill-color"
                    d="M756.8,677.6c-0.1,0-0.1,0-0.2,0c-2.7-0.3-5.2-1.2-7.5-2.7c-2.1-1.3-3.9-3.1-5.2-5.2c-1.5-2.3-2.4-4.8-2.7-7.5c-0.1-1.3,0.8-2.4,2.1-2.6c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0h2.5c1.2,0,2.2,0.9,2.3,2c0.1,0.8,0.3,1.5,0.5,2.2c0.3,0.9,0.1,1.8-0.5,2.5l-0.7,0.7c1,1.6,2.4,3,4,4l0.7-0.7c0.7-0.6,1.6-0.9,2.5-0.5c0.7,0.3,1.4,0.4,2.2,0.5c1.2,0.2,2.1,1.2,2,2.4v2.5C759.1,676.5,758.1,677.6,756.8,677.6L756.8,677.6z M746,661h-2.5c-0.3,0-0.6,0.1-0.7,0.4c-0.2,0.2-0.2,0.5-0.2,0.7c0.3,2.5,1.1,4.8,2.4,6.9c1.2,1.9,2.9,3.6,4.8,4.8c2.1,1.3,4.4,2.2,6.9,2.5c0.3,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.7v-2.5c0-0.5-0.3-0.9-0.8-1c-0.9-0.1-1.7-0.3-2.5-0.6c-0.4-0.1-0.8,0-1,0.2l-1.1,1.1c-0.2,0.2-0.6,0.3-0.8,0.1c-2.2-1.2-4-3.1-5.3-5.3c-0.2-0.3-0.1-0.6,0.1-0.8l1.1-1.1c0.3-0.3,0.3-0.7,0.2-1c-0.3-0.8-0.5-1.6-0.6-2.5C746.9,661.3,746.5,661,746,661L746,661z"
                  ></path>
                </g>
              </svg>
              <div class="media-body align-self-start">
                <h5>Phone</h5>
                <p>
                  <a :href="'tel:' + primaryContact.phone">{{
                    primaryContact.phone
                  }}</a>
                </p>
              </div>
            </div>
          </div>
          <div class="map-part">
            <iframe
              :src="
                'https://maps.google.com/maps?q=' +
                location.lat +
                ',' +
                location.lng +
                '&hl=en&z=14&amp;output=embed'
              "
              src1="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.342090590568!2d-88.14682488441055!3d34.443463104458374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888781b6b94e32d7%3A0x76b1f72d9f012107!2sTiffin%20Motorhomes%20Inc.!5e0!3m2!1sen!2sin!4v1611210960164!5m2!1sen!2sin"
              width="350"
              height="260"
              frameborder="0"
              style="border: 0"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
        </div>
        <div class="dl-detail-left-bk">
          <form v-if="form" class="form" @submit.prevent="handleSubmit()">
            <div class="box-heading">
              <div class="row align-items-center">
                <div class="col-lg-5">
                  <div class="pr-img r11">
                    <img
                      :src="
                        dealerImg
                          ? dealerImg
                          : require('@/assets/img/placeholder.jpg')
                      "
                      alt=""
                      class="img-responsive"
                    />
                  </div>
                </div>
                <div class="col-lg-7">
                  <imageInput @input="onImageUpload">
                    <template slot="activator">
                      <label class="logo-update">Update Photo</label>
                    </template>
                  </imageInput>
                </div>
              </div>
              <a
                v-if="dealerImg"
                v-tooltip="'Delete Image'"
                class="dl-editicon"
                @click="removeImage"
              >
                <svg
                  id="Layer_1"
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
            </div>
            <div class="p1">
              <div class="form-group required">
                <label class="control-label">Dealership Number</label>
                <input
                  v-model="form.dealership_number"
                  type="text"
                  name="dealership-number"
                  class="form-control"
                />
                <div
                  v-if="
                    $v.form.dealership_number.$error &&
                    !$v.form.dealership_number.required
                  "
                  class="input-error"
                >
                  Please provide the number
                </div>
                <div
                  v-if="
                    $v.form.dealership_number.$error &&
                    !$v.form.dealership_number.numeric
                  "
                  class="input-error"
                >
                  Please provide only digits
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Dealership Name</label>
                <input
                  v-model="form.dealership_name"
                  type="text"
                  name="dealership-name"
                  class="form-control"
                />
                <div
                  v-if="
                    $v.form.dealership_name.$error &&
                    !$v.form.dealership_name.required
                  "
                  class="input-error"
                >
                  Please provide name
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  name="dealership-email"
                  class="form-control"
                />
                <div
                  v-if="$v.form.email.$error && !$v.form.email.required"
                  class="input-error"
                >
                  Please provide email
                </div>
                <div
                  v-if="$v.form.email.$error && !$v.form.email.email"
                  class="input-error"
                >
                  Please provide valid email
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Contact Number</label>
                <input
                  v-model="form.phone"
                  type="text"
                  name="dealership-phone"
                  class="form-control"
                />
                <div
                  v-if="$v.form.phone.$error && !$v.form.phone.maxLength"
                  class="input-error"
                >
                  Please provide valid contact number
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Office Number</label>
                <input
                  v-model="form.office_phone"
                  type="text"
                  name="office-phone"
                  class="form-control"
                />
                <div
                  v-if="
                    $v.form.office_phone.$error &&
                    !$v.form.office_phone.required
                  "
                  class="input-error"
                >
                  Please provide office number
                </div>
                <div
                  v-if="
                    $v.form.office_phone.$error && !$v.form.office_phone.numeric
                  "
                  class="input-error"
                >
                  Please provide valid office number
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Address Line 1</label>
                <client-only>
                  <vue-google-autocomplete
                    id="address"
                    ref="autocompleteRef"
                    v-model="form.address_line_1"
                    classname="form-control"
                    placeholder="Enter address line 1"
                    :country="['us', 'ca', 'aus']"
                    @placechanged="getAddressData"
                  >
                  </vue-google-autocomplete>
                </client-only>
                <div
                  v-if="
                    $v.form.address_line_1.$error &&
                    !$v.form.address_line_1.required
                  "
                  class="input-error"
                >
                  Please provide address
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Address Line 2</label>
                <input
                  v-model="form.address_line_2"
                  type="text"
                  name="dealership-address2"
                  class="form-control"
                />
              </div>
              <div class="form-group required">
                <label class="control-label">Zip Code</label>
                <input
                  v-model="form.zip_code"
                  type="text"
                  name="dealership-zipcode"
                  class="form-control"
                />
                <div
                  v-if="$v.form.zip_code.$error && !$v.form.zip_code.required"
                  class="input-error"
                >
                  Please provide zip code
                </div>
                <div
                  v-if="$v.form.zip_code.$error && !mycustomval"
                  class="input-error"
                >
                  Please provide valid zip code
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">City</label>
                <input
                  v-model="form.city"
                  type="text"
                  name="dealership-city"
                  class="form-control"
                />
                <div
                  v-if="$v.form.city.$error && !$v.form.city.required"
                  class="input-error"
                >
                  Please provide city
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">State</label>
                <input
                  v-model="form.state"
                  type="text"
                  name="dealership-state"
                  class="form-control"
                />
                <div
                  v-if="$v.form.state.$error && !$v.form.state.required"
                  class="input-error"
                >
                  Please provide state
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Country</label>
                <input
                  v-model="form.country"
                  type="text"
                  name="dealership-country"
                  class="form-control"
                />
                <div
                  v-if="$v.form.country.$error && !$v.form.country.required"
                  class="input-error"
                >
                  Please provide country
                </div>
              </div>
            </div>
            <div class="row xs-gutters">
              <div class="col-7">
                <button type="submit" class="btn btn-blue btn-block">
                  Update Info
                </button>
              </div>
              <div class="col-5">
                <button
                  type="button"
                  class="btn btn-gray dealer-edit-cancel btn-block"
                  @click="cancelEdit()"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="body-content-main h-100">
      <div class="tabs-view h-100">
        <ul class="nav nav-left" role="tablist">
          <li v-if="$_auth().user.lead.isDealerAdmin" class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#manage-users"
              >Manage users</a
            >
          </li>
          <li class="nav-item">
            <a
              ref="lead_tab"
              class="nav-link"
              data-toggle="tab"
              href="#leads"
              @click="loadLeads()"
              >Lead contacts</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#models"
              @click="loadModels()"
              >Models</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div
            v-if="$_auth().user.lead.isDealerAdmin"
            id="manage-users"
            class="tab-pane active"
          >
            <transition name="fade">
              <a
                v-if="selections.length"
                href="javascript:void(0);"
                class="resend-invitation btn btn-icon"
                @click.capture="
                  multiSendDialog = false
                  $nextTick(() => (multiSendDialog = true))
                "
              >
                <PlusIcon />
                Resend Invitation
              </a>
            </transition>
            <a
              href="javascript:void(0);"
              class="add-user-form-btn btn btn-icon"
              @click="toggleAddUserForm"
            >
              <svg
                id="Layer_1"
                class="plus-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
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
              Add New User</a
            >
            <div v-if="showUserForm" class="box p20 add-user-form">
              <div class="add-user-box">
                <text-field
                  v-model="user.name"
                  label="Name"
                  :v="$v.user.name"
                  required
                ></text-field>

                <text-field
                  v-model="user.email"
                  label="Email"
                  :v="$v.user.email"
                  required
                ></text-field>

                <text-field
                  v-model="user.designation"
                  :v="$v.user.designation"
                  label="Job Title"
                  required
                ></text-field>
                <Select
                  v-model="user.role"
                  label="User Role"
                  :items="roles"
                  item_text="name"
                  item_value="id"
                  :v="$v.user.role"
                  :select_first="false"
                  required
                >
                </Select>
                <div
                  v-if="
                    user.role && user.role.toString() === dealerAdmin.toString()
                  "
                  class="form-group text-center"
                >
                  <label class="control-label"></label>
                  <label class="check-label" style="max-width: max-content">
                    Assign Leads
                    <input
                      type="checkbox"
                      name=""
                      @change="
                        $event.target.checked
                          ? (user.is_lead_assign = 1)
                          : (user.is_lead_assign = 0)
                      "
                    />
                    <span class="check-span"></span>
                  </label>
                </div>
                <div class="form-group">
                  <label class="control-label"></label>
                  <button
                    class="btn btn-icon btn-small"
                    href="javascript:;"
                    :disabled="addUserLoading"
                    @click="addUser"
                  >
                    <i
                      v-if="addUserLoading"
                      class="fa fa-circle-o-notch fa-spin"
                    >
                    </i>
                    <svg
                      v-else
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
                    Add & Send Invite
                  </button>
                  <a
                    href="javascript:void(0);"
                    class="add-user-form-close ml-2"
                    @click="showUserForm = false"
                  >
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
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="common-box bg-gray h-100">
              <div class="table-list-view multi-table-view show-detail">
                <ul class="thead">
                  <li>
                    <div class="favorite sorting flex5">
                      <span>
                        <svg
                          id="Layer_1"
                          v-tooltip="'Primary contact'"
                          class="primary-contact-icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 17.7 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_38928"
                            transform="translate(-1626.306 -754)"
                          >
                            <path
                              id="Path_38013"
                              class="fill-color"
                              d="M1635.2,763.6c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8C1630.4,761.5,1632.5,763.6,1635.2,763.6z M1635.2,755.5c1.8,0,3.3,1.5,3.3,3.3c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3l0,0C1631.9,757,1633.4,755.5,1635.2,755.5C1635.2,755.5,1635.2,755.5,1635.2,755.5z"
                            ></path>
                            <path
                              id="Path_38014"
                              class="fill-color"
                              d="M1639.2,765.1h-8.1c-2.7,0-4.8,2.2-4.8,4.8c0,0,0,0,0,0v2h17.7v-2C1644,767.3,1641.9,765.2,1639.2,765.1C1639.2,765.1,1639.2,765.1,1639.2,765.1z M1642.5,770.5h-14.7V770c0-1.8,1.5-3.3,3.3-3.3h8.1c1.8,0,3.3,1.5,3.3,3.3L1642.5,770.5z"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <div class="sorting flex25">
                      <span>Name / Email</span>
                    </div>
                    <div class="sorting flex13">
                      <span>Job Title</span>
                    </div>
                    <div class="sorting flex13">
                      <span>User Role</span>
                    </div>
                    <div class="sorting flex24">
                      <span>Communication Preferences</span>
                    </div>
                    <div class="sorting flex10 text-center">
                      <span>Lead Visibility</span>
                    </div>
                    <div class="sorting flex10 text-center">
                      <span>Action</span>
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar">
                  <ul class="tbody no-hover">
                    <li
                      v-for="user in users"
                      :key="user.id"
                      :class="user.isEditing ? 'edit-mode' : ''"
                    >
                      <EditForm
                        v-if="user.isEditing"
                        :my-user="user"
                        :add-user-loading="addUserLoading"
                        :roles="roles"
                        @updateUser="updateUser($event)"
                        @closeEditUserForm="closeEditUserForm($event)"
                      />
                      <div class="favorite tb-column flex5">
                        <a
                          href="javascript:void(0);"
                          class="fav-icon active"
                          @click="addToPrimary(user.id)"
                        >
                          <span v-if="user.is_primary_contact">
                            <svg
                              id="Layer_1"
                              v-tooltip="'Primary contact'"
                              class="primary-contact-icon orange"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 17.7 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_38927"
                                transform="translate(-1593 -754)"
                              >
                                <path
                                  id="Path_38015"
                                  class="fill-color"
                                  d="M1601.9,763.6c2.7,0,4.8-2.2,4.8-4.8s-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8C1597.1,761.5,1599.2,763.6,1601.9,763.6z"
                                ></path>
                                <path
                                  id="Path_38016"
                                  class="fill-color"
                                  d="M1605.9,765.1h-8.1c-2.7,0-4.8,2.2-4.8,4.8c0,0,0,0,0,0v2h17.7v-2C1610.7,767.3,1608.6,765.2,1605.9,765.1C1605.9,765.1,1605.9,765.1,1605.9,765.1z"
                                ></path>
                              </g>
                            </svg>
                          </span>
                          <span v-else>
                            <svg
                              id="Layer_1"
                              v-tooltip="'Primary contact'"
                              class="primary-contact-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 17.7 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_38928"
                                transform="translate(-1626.306 -754)"
                              >
                                <path
                                  id="Path_38013"
                                  class="fill-color"
                                  d="M1635.2,763.6c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8C1630.4,761.5,1632.5,763.6,1635.2,763.6z M1635.2,755.5c1.8,0,3.3,1.5,3.3,3.3c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3l0,0C1631.9,757,1633.4,755.5,1635.2,755.5C1635.2,755.5,1635.2,755.5,1635.2,755.5z"
                                ></path>
                                <path
                                  id="Path_38014"
                                  class="fill-color"
                                  d="M1639.2,765.1h-8.1c-2.7,0-4.8,2.2-4.8,4.8c0,0,0,0,0,0v2h17.7v-2C1644,767.3,1641.9,765.2,1639.2,765.1C1639.2,765.1,1639.2,765.1,1639.2,765.1z M1642.5,770.5h-14.7V770c0-1.8,1.5-3.3,3.3-3.3h8.1c1.8,0,3.3,1.5,3.3,3.3L1642.5,770.5z"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </a>
                      </div>
                      <div class="name-email tb-column flex25">
                        <div class="media">
                          <div class="media-left">
                            <label
                              class="check-label"
                              :style="
                                user.invitation_status === false
                                  ? `opacity:0.5`
                                  : ''
                              "
                            >
                              <input
                                v-model="user.selected"
                                name="checkbox"
                                class="checkBoxClass"
                                type="checkbox"
                                data-lpignore="true"
                                :disabled="user.invitation_status === false"
                              />
                              <span
                                class="check-span"
                                :class="
                                  user.invitation_status === false
                                    ? 'disabled'
                                    : ''
                                "
                              ></span>
                            </label>
                          </div>
                          <div class="media-body">
                            <div class="top-column">
                              <label>{{ user.name }}</label>
                            </div>
                            <div class="bottom-column">
                              <span v-if="!user.isEditing"
                                ><a :href="'mailto:' + user.email">{{
                                  user.email
                                }}</a></span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column flex13">
                        <div class="top-column">{{ user.designation }}</div>
                      </div>
                      <div class="tb-column flex13">
                        <div class="top-column">
                          {{ user.roles_details.name }}
                        </div>
                      </div>
                      <div class="tb-column flex24">
                        <div class="top-column">
                          <ul class="check-list check-list-inline">
                            <li>
                              <label class="check-label"
                                >Text
                                <input
                                  v-model="user.is_communication_text"
                                  type="checkbox"
                                  name=""
                                  @change="
                                    toggleUserProperty(
                                      $event,
                                      'is_communication_text',
                                      user.id
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                            </li>
                            <li>
                              <label class="check-label"
                                >Email
                                <input
                                  v-model="user.is_communication_email"
                                  type="checkbox"
                                  name=""
                                  @change="
                                    toggleUserProperty(
                                      $event,
                                      'is_communication_email',
                                      user.id
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                            </li>
                            <li>
                              <label class="check-label"
                                >Phone
                                <input
                                  v-model="user.is_communication_phone"
                                  type="checkbox"
                                  name=""
                                  @change="
                                    toggleUserProperty(
                                      $event,
                                      'is_communication_phone',
                                      user.id
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="tb-column flex10 text-center">
                        <div class="top-column">
                          <label class="label-switch">
                            <input
                              id="detailView"
                              v-model="user.is_lead_visible"
                              type="checkbox"
                              class="switch"
                              name="detail-view"
                              @change="
                                toggleUserProperty(
                                  $event,
                                  'is_lead_visible',
                                  user.id
                                )
                              "
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                      </div>
                      <div class="tb-column flex10">
                        <ul class="action">
                          <li v-if="!user.invitation_status">
                            <a href="javascript:void(0);">
                              <svg
                                id="Layer_1"
                                v-tooltip="'Active User'"
                                class="active-user-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 17.5 17.5"
                                xml:space="preserve"
                              >
                                <g
                                  id="incomplete-tasks"
                                  transform="translate(422.202 87.935)"
                                >
                                  <circle
                                    id="Ellipse_98"
                                    class="fill-color"
                                    cx="-413.5"
                                    cy="-79.2"
                                    r="8"
                                  ></circle>
                                  <path
                                    id="Path_2644"
                                    class="fill-color"
                                    d="M-410-81.5l-4.6,4.6l-2.3-2.3"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                          </li>
                          <li v-else>
                            <a
                              href="javascript:void(0);"
                              @click="userVerification(user)"
                            >
                              <svg
                                id="Layer_1"
                                v-tooltip="'Sent Invitation'"
                                class="email-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4466"
                                  transform="translate(-229 -802)"
                                >
                                  <rect
                                    id="Rectangle_3004"
                                    x="229"
                                    y="802"
                                    class="fill-hide"
                                    width="18"
                                    height="18"
                                  ></rect>
                                  <g
                                    id="Group_4408"
                                    transform="translate(-597.727 142.118)"
                                  >
                                    <path
                                      id="Path_3512"
                                      class="fill-color"
                                      d="M835.7,669.7c-0.4,0-0.7-0.1-1-0.3l-7.8-6.1l0.9-1.3l7.8,6.1l0.2,0.1l0-0.1l7.8-6.1l0.9,1.3l-7.8,6.1C836.4,669.6,836.1,669.7,835.7,669.7z"
                                    ></path>
                                    <path
                                      id="Path_3513"
                                      class="fill-color"
                                      d="M828.4,675.9c-0.9,0-1.7-0.8-1.6-1.7v-10.6c0-0.9,0.7-1.7,1.6-1.7h14.7c0.9,0,1.7,0.8,1.6,1.7v10.6c0,0.9-0.7,1.7-1.6,1.7L828.4,675.9z M828.4,663.5c-0.1,0-0.1,0-0.1,0.1l0,0v10.6c0,0.1,0,0.1,0.1,0.1l0,0h14.7c0.1,0,0.1-0.1,0.1-0.1v-10.6c0-0.1,0-0.1-0.1-0.1L828.4,663.5z"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              v-tooltip="'Edit user'"
                              @click="setEditUser(user)"
                            >
                              <svg
                                id="Layer_1"
                                class="edit-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                                aria-describedby="tooltip648533"
                              >
                                <g
                                  id="Group_4350"
                                  transform="translate(-397.961 -147.331)"
                                >
                                  <path
                                    id="Path_3408"
                                    class="fill-color"
                                    d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                                  ></path>
                                  <path
                                    id="Path_3409"
                                    class="fill-color"
                                    d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              v-tooltip="'Delete user'"
                              @click="deleteUser(user)"
                            >
                              <svg
                                id="Layer_1"
                                class="delete-icon h-orange"
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
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <client-only>
                    <infinite-loading
                      v-if="dealerId"
                      :identifier="userInfiniteId"
                      @infinite="userInfiniteHandler"
                    >
                      <div slot="spinner">Loading...</div>
                      <div slot="no-more"></div>
                      <div slot="no-results">
                        <div v-if="!users.length" class="no-data-found">
                          <div class="inner w-100">
                            <svg
                              id="Layer_1"
                              class="no-record-icon darkgray"
                              style="height: 150px"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 131.3 156.8"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_4457"
                                transform="translate(-190.348 -177.624)"
                              >
                                <path
                                  id="Path_3564"
                                  class="fill-color"
                                  d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                                />
                                <path
                                  id="Path_3565"
                                  class="fill-color"
                                  d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                                />
                              </g>
                            </svg>

                            <p>You haven't added any user yet!</p>
                            <span class="btn btn-icon">
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
                              Add New User</span
                            >
                          </div>
                        </div>
                      </div>
                    </infinite-loading>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
          <div id="leads" class="tab-pane">
            <div class="common-box bg-gray h-100">
              <div class="table-list-view multi-table-view show-detail">
                <ul class="thead">
                  <li>
                    <div
                      class="favorite sorting sortarrow flex5"
                      :class="[
                        leadSortBy === 'is_favourite' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                      @click="toggleLeadSortData('is_favourite')"
                    >
                      <span>
                        <svg
                          id="Layer_1"
                          class="flag-icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 12 16"
                          xml:space="preserve"
                        >
                          <path
                            id="Path_3486"
                            class="fill-color"
                            d="M0.6,16C0.3,16,0,15.7,0,15.3V0.6C0,0.3,0.3,0,0.7,0C1,0,1.3,0.3,1.3,0.6v0.7h10C11.7,1.3,12,1.6,12,2c0,0,0,0,0,0c0,0.1,0,0.2-0.1,0.4L9.5,6l2.4,3.6c0.2,0.3,0.1,0.7-0.2,0.9c-0.1,0.1-0.2,0.1-0.4,0.1h-10v4.7C1.3,15.7,1,16,0.6,16L0.6,16L0.6,16z M10.1,9.3l-2-3C8,6.1,8,5.8,8.1,5.6l2-3H1.3v6.7L10.1,9.3z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div
                      class="name-email sorting sortarrow flex25"
                      :class="[
                        leadSortBy === 'name' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <div class="blank-space30"></div>
                      <span @click="toggleLeadSortData('name')"
                        >Name / Email</span
                      >
                    </div>
                    <div class="sorting flex10">
                      <span>Phone Number</span>
                    </div>
                    <div
                      class="last-score sorting sortarrow flex8 text-center"
                      :class="[
                        leadSortBy === 'lead_score' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleLeadSortData('lead_score')"
                        >Score
                        <i
                          v-tooltip="leadScoreText"
                          data-v-594610ab=""
                          aria-hidden="true"
                          data-tip="tip-info"
                          class="fa fa-info-circle tip"
                        ></i
                      ></span>
                    </div>
                    <!-- <div
                      class="created-date sorting sortarrow flex9"
                      :class="[
                        leadSortBy === 'created_at' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                      @click="toggleLeadSortData('created_at')"
                    >
                      <span>Created Date</span>
                    </div> -->
                    <div class="model sorting flex14">
                      <span>Model</span>
                    </div>
                    <div
                      class="sorting sortarrow flex10"
                      :class="[
                        leadSortBy === 'lead_source' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleLeadSortData('lead_source')"
                        >Source</span
                      >
                    </div>
                    <div class="lead-status sorting flex10">
                      <span>Status</span>
                    </div>
                    <div class="sorting flex8">
                      <span>Action</span>
                    </div>
                    <div
                      class="activity-date sorting sortarrow flex10"
                      :class="[
                        leadSortBy === 'updated_at' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleLeadSortData('updated_at')"
                        >Last Activity</span
                      >
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <li
                      v-for="(lead, index) in leads"
                      :key="lead.id"
                      :class="[
                        lead.product_data && lead.product_data.length
                          ? 'double-lead'
                          : '',
                      ]"
                    >
                      <div class="favorite tb-column flex5">
                        <a
                          v-if="lead.is_favourite"
                          href="javascript:void(0);"
                          class="fav-icon"
                          @click="addLeadFavourite(lead)"
                        >
                          <svg
                            id="Layer_1"
                            class="flag-fill-icon orange"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 13.5 18"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3485"
                              class="fill-color"
                              d="M0.7,18C0.3,18,0,17.7,0,17.3V0.7C0,0.3,0.3,0,0.7,0c0.4,0,0.7,0.3,0.7,0.7v0.8h11.3c0.4,0,0.7,0.3,0.7,0.7c0,0,0,0,0,0c0,0.1,0,0.3-0.1,0.4l-2.7,4.1l2.7,4.1c0.2,0.3,0.1,0.8-0.2,1c-0.1,0.1-0.3,0.1-0.4,0.1H1.5v5.3C1.5,17.7,1.2,18,0.7,18L0.7,18L0.7,18z"
                            ></path>
                          </svg>
                        </a>
                        <a
                          v-else
                          href="javascript:void(0);"
                          class="fav-icon"
                          @click="addLeadFavourite(lead)"
                        >
                          <svg
                            id="Layer_1"
                            class="flag-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 12 16"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3486"
                              class="fill-color"
                              d="M0.6,16C0.3,16,0,15.7,0,15.3V0.6C0,0.3,0.3,0,0.7,0C1,0,1.3,0.3,1.3,0.6v0.7h10C11.7,1.3,12,1.6,12,2c0,0,0,0,0,0c0,0.1,0,0.2-0.1,0.4L9.5,6l2.4,3.6c0.2,0.3,0.1,0.7-0.2,0.9c-0.1,0.1-0.2,0.1-0.4,0.1h-10v4.7C1.3,15.7,1,16,0.6,16L0.6,16L0.6,16z M10.1,9.3l-2-3C8,6.1,8,5.8,8.1,5.6l2-3H1.3v6.7L10.1,9.3z"
                            ></path>
                          </svg>
                        </a>
                      </div>
                      <div class="name-email tb-column flex25">
                        <div class="dealer-num">{{ index + 1 }}</div>
                        <div
                          v-if="lead.logo"
                          v-tooltip="{
                            html: false,
                            content: lead.name,
                          }"
                          class="profile-bg"
                          :style="'background-image: url(' + lead.logo + ')'"
                        ></div>
                        <div v-else class="profile-char" :title="lead.name">
                          {{
                            (lead.name + lead.email)
                              .trim()
                              .charAt(0)
                              .toUpperCase()
                          }}
                        </div>
                        <div>
                          <div class="top-column">
                            <label>
                              <nuxt-link
                                :to="{
                                  name: 'workspace_id-lead-leads-id',
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: lead.id,
                                  },
                                }"
                              >
                                {{ lead.name ? lead.name : lead.email }}
                              </nuxt-link></label
                            >
                          </div>
                          <div class="bottom-column">
                            <span
                              ><a :href="'mailto:' + lead.email">{{
                                lead.email
                              }}</a></span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="tb-column flex10">
                        <div class="top-column">
                          <label>{{ lead.phone || '-' }}</label>
                        </div>
                      </div>
                      <div class="lead-score tb-column flex8 text-center">
                        <div class="top-column">
                          <div :class="lead.lead_score | leadScoreText">
                            <strong>{{ lead.lead_score }}</strong>
                            <span
                              class="img-responsive img-center"
                              v-html="leadScoreIconSvg(lead.lead_score)"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="created-date tb-column flex9">
                        <div class="top-column">
                          <label>{{ lead.created_at_format }}</label>
                        </div>
                      </div> -->

                      <div class="model tb-column flex14">
                        <template v-for="product in lead.products">
                          <div :key="product.product_id" class="top-column">
                            <label
                              ><nuxt-link
                                :to="{
                                  name: 'workspace_id-lead-leads-id',
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: lead.id,
                                  },
                                }"
                                >{{ product.product_name || '-' }}
                              </nuxt-link>
                            </label>
                          </div>

                          <div
                            :key="product.product_id + 'bottom'"
                            class="bottom-column"
                          >
                            <span>
                              <nuxt-link
                                :to="{
                                  name: 'workspace_id-lead-leads-id',
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: lead.id,
                                  },
                                }"
                              >
                                {{ product.option_name || '-' }}
                              </nuxt-link>
                            </span>
                          </div>
                        </template>
                        <label v-if="!lead.products.length">-</label>
                      </div>
                      <div class="lead-source tb-column flex10">
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-lead-leads-id',
                            params: {
                              workspace_id: $_auth().id,
                              id: lead.id,
                            },
                          }"
                        >
                          <template v-for="(product, i) in lead.products">
                            <div
                              v-if="i <= 1"
                              :key="i"
                              class="img-text"
                              :class="[i >= 0 ? 'top-column' : 'bottom-column']"
                            >
                              <svg
                                v-if="product.lead_source == 'Phone'"
                                id="Layer_1"
                                class="phone-icon orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Icon_feather-phone"
                                  transform="translate(-741.165 -659.595)"
                                >
                                  <path
                                    id="Path_3511"
                                    class="fill-color"
                                    d="M756.8,677.6c-0.1,0-0.1,0-0.2,0c-2.7-0.3-5.2-1.2-7.5-2.7c-2.1-1.3-3.9-3.1-5.2-5.2c-1.5-2.3-2.4-4.8-2.7-7.5c-0.1-1.3,0.8-2.4,2.1-2.6c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0h2.5c1.2,0,2.2,0.9,2.3,2c0.1,0.8,0.3,1.5,0.5,2.2c0.3,0.9,0.1,1.8-0.5,2.5l-0.7,0.7c1,1.6,2.4,3,4,4l0.7-0.7c0.7-0.6,1.6-0.9,2.5-0.5c0.7,0.3,1.4,0.4,2.2,0.5c1.2,0.2,2.1,1.2,2,2.4v2.5C759.1,676.5,758.1,677.6,756.8,677.6L756.8,677.6z M746,661h-2.5c-0.3,0-0.6,0.1-0.7,0.4c-0.2,0.2-0.2,0.5-0.2,0.7c0.3,2.5,1.1,4.8,2.4,6.9c1.2,1.9,2.9,3.6,4.8,4.8c2.1,1.3,4.4,2.2,6.9,2.5c0.3,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.7v-2.5c0-0.5-0.3-0.9-0.8-1c-0.9-0.1-1.7-0.3-2.5-0.6c-0.4-0.1-0.8,0-1,0.2l-1.1,1.1c-0.2,0.2-0.6,0.3-0.8,0.1c-2.2-1.2-4-3.1-5.3-5.3c-0.2-0.3-0.1-0.6,0.1-0.8l1.1-1.1c0.3-0.3,0.3-0.7,0.2-1c-0.3-0.8-0.5-1.6-0.6-2.5C746.9,661.3,746.5,661,746,661L746,661z"
                                  ></path>
                                </g>
                              </svg>
                              <svg
                                v-else-if="product.lead_source == 'Web'"
                                id="Layer_1"
                                class="web-icon blue"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <path
                                  id="Icon_ionic-md-globe-2"
                                  class="fill-color"
                                  d="M9,0C4,0,0,4,0,9s4,9,9,9s9-4,9-9S14,0,9,0z M8.1,16.4c-4.1-0.5-7-4.2-6.5-8.3c0.2-1.5,0.8-2.8,1.7-4c0,0.3,0.1,0.7,0.1,1C3.2,6,3.3,6.9,3.8,7.6C4,8,4.1,8.4,4.2,8.8C4.3,9.2,4.7,9.4,5,9.6c0.6,0.5,1.2,1,1.8,1.4c0.4,0.3,0.7,0.4,0.6,0.9c-0.1,0.4-0.2,0.7-0.3,1c0,0.3,0.2,0.7,0.4,0.9c0.3,0.3,0.6,0.6,1,0.9C8.9,15.2,8.3,15.8,8.1,16.4L8.1,16.4z M14.3,14.3c-1.1,1.1-2.4,1.8-3.9,2.1c0.2-0.5,0.5-0.9,0.9-1.2c0.3-0.3,0.6-0.6,0.8-1c0.2-0.3,0.4-0.7,0.6-1c0.3-0.5-0.7-1.1-1.1-1.3c-0.7-0.3-1.4-0.8-2-1.2c-0.5-0.3-1.4,0.2-2-0.1c-0.7-0.4-1.4-0.8-2-1.4C5.1,8.7,5.1,8.1,5.1,7.4c0.5,0,1.2-0.1,1.6,0.3c0.1,0.1,0.5,0.7,0.7,0.5c0.2-0.2-0.2-0.8-0.2-1C7,6.7,7.7,6.5,8,6.1C8.5,5.7,9.5,5,9.4,4.7s-1-1.2-1.5-1.1C7.8,3.7,7.1,4.4,7,4.5C7,4.3,7,4,7,3.8c0-0.2-0.3-0.3-0.3-0.4c0-0.2,0.7-0.7,0.9-0.9C7.5,2.4,7.1,2.1,6.9,2.1C6.6,2.2,6.3,2.3,6,2.4c0-0.1,0-0.2,0-0.3c0.6-0.3,1.2-0.5,1.9-0.6l0.6,0.2l0.4,0.5l0.4,0.4l0.4,0.1l0.6-0.5l-0.2-0.4V1.6c1.1,0.2,2.2,0.6,3.2,1.2c-0.2,0-0.4,0-0.6,0.1c-0.1,0-0.2-0.1-0.3-0.1C12.7,3.4,13,4,13.3,4.5c0.3,0.6,1,1.3,1.1,1.9c0.1,0.8,0,1.5,0.1,2.4c0.2,0.7,0.5,1.3,1,1.9c0.2,0.1,0.5,0.1,0.8,0.1C15.9,12.1,15.3,13.3,14.3,14.3L14.3,14.3z"
                                ></path>
                              </svg>
                              <svg
                                v-else-if="product.lead_source == 'Event'"
                                id="Layer_1"
                                class="event-icon blue"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4421"
                                  transform="translate(-1042.37 -658.583)"
                                >
                                  <path
                                    id="Path_3523"
                                    class="fill-color"
                                    d="M1044.9,676.6c-1.3,0-2.4-1.1-2.5-2.4v-11.6c0.1-1.3,1.2-2.4,2.5-2.4h13c1.3,0,2.4,1.1,2.5,2.4v11.6c-0.1,1.4-1.2,2.4-2.5,2.4H1044.9z M1044.9,661.8c-0.5,0-0.9,0.4-1,0.9v11.5c0,0.5,0.5,0.9,1,0.9h12.9c0.5,0,1-0.4,1.1-0.9v-11.5c0-0.5-0.5-0.9-1-0.9L1044.9,661.8z"
                                  />
                                  <path
                                    id="Path_3524"
                                    class="fill-color"
                                    d="M1055,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1055.8,663.1,1055.5,663.4,1055,663.4z"
                                  />
                                  <path
                                    id="Path_3525"
                                    class="fill-color"
                                    d="M1047.7,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1048.5,663.1,1048.1,663.4,1047.7,663.4z"
                                  />
                                  <g id="Group_4420">
                                    <path
                                      id="Path_3526"
                                      class="fill-color"
                                      d="M1049.7,672.5l-3.2-3.2c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l2.2,2.2l5.5-5.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1L1049.7,672.5z"
                                    />
                                  </g>
                                </g>
                              </svg>
                              <label style="cursor: pointer">{{
                                product.lead_source || '-'
                              }}</label>
                            </div>
                          </template>
                          <label v-if="!lead.products.length">-</label>
                        </nuxt-link>
                      </div>
                      <div class="lead-status tb-column flex10">
                        <template v-for="(product, i) of lead.products">
                          <div
                            v-if="i <= 1"
                            :key="product.id"
                            :class="[i >= 0 ? 'top-column' : 'bottom-column']"
                          >
                            <LeadStatus
                              v-if="leadStatusOptions.length"
                              v-model="product.lead_status"
                              :items="leadStatusOptions"
                              item_text="status_name"
                              item_value="id"
                              @change="changeLeadStatus(lead, product)"
                            ></LeadStatus>
                          </div>
                        </template>
                      </div>
                      <div class="hv-img tb-column flex8">
                        <ul class="action" style="min-width: 80px">
                          <li>
                            <client-only>
                              <speech-recognition
                                v-slot="{ started, start, stop }"
                                v-model="annotation"
                                class="dropdown common-dropdown annotation"
                              >
                                <a
                                  v-tooltip="'Annotation'"
                                  class="dropdown-toggle"
                                  :class="{ 'mic-active': started }"
                                  data-toggle="dropdown"
                                  @click="
                                    () => {
                                      started ? stop() : start()
                                    }
                                  "
                                >
                                  <svg
                                    id="Layer_1"
                                    class="annotation-icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 12.4 18"
                                    xml:space="preserve"
                                  >
                                    <g
                                      id="Group_4391"
                                      transform="translate(-320.451 -659.57)"
                                    >
                                      <path
                                        id="Path_3487"
                                        class="fill-color"
                                        d="M326.7,661.1L326.7,661.1c0.5,0,1,0.2,1.3,0.6l0,0l0,0c0.4,0.4,0.6,0.9,0.6,1.4v5.5c0,0.5-0.2,1-0.6,1.4c-0.7,0.7-1.9,0.8-2.7,0l0,0l0,0c-0.4-0.4-0.6-0.9-0.6-1.4V663C324.7,661.9,325.6,661.1,326.7,661.1M326.7,659.6c-0.9,0-1.8,0.4-2.4,1c-0.7,0.6-1,1.5-1,2.4v5.5c0,0.9,0.4,1.8,1,2.4l0,0c1.3,1.3,3.5,1.3,4.8,0c0.7-0.6,1-1.5,1-2.4V663c0-0.9-0.4-1.8-1-2.4l0,0C328.4,659.9,327.6,659.6,326.7,659.6L326.7,659.6z"
                                      ></path>
                                      <path
                                        id="Path_3488"
                                        class="fill-color"
                                        d="M332.2,666.4c-0.4,0-0.7,0.3-0.7,0.7v1.4c0,2.6-2.1,4.8-4.7,4.8c-1.3,0-2.5-0.5-3.4-1.4c-0.9-0.9-1.4-2.1-1.4-3.4v-1.4c0-0.4-0.3-0.7-0.7-0.7s-0.7,0.3-0.7,0.7v1.4c0,3.2,2.3,5.8,5.5,6.2v1.4h-2.7c-0.2,0-0.4,0.1-0.5,0.2c-0.3,0.3-0.3,0.7,0,1c0,0,0,0,0,0c0.1,0.1,0.3,0.2,0.5,0.2h6.9l0,0c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7h-2.7v-1.3c3.2-0.4,5.5-3,5.5-6.2v-1.4C332.9,666.8,332.6,666.4,332.2,666.4z"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>
                                <ul class="dropdown-menu">
                                  <form>
                                    <div class="form-group">
                                      <textarea
                                        v-model="annotation"
                                        class="form-control"
                                        rows="8"
                                        placeholder="Start Annotation"
                                      ></textarea>
                                    </div>
                                    <div class="from-group mb0">
                                      <button
                                        type="button"
                                        class="btn btn-blue btn-small"
                                        @click="
                                          addLeadNote(annotation, lead.id)
                                          stop()
                                        "
                                      >
                                        Submit
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-gray btn-small"
                                        @click="
                                          stop()
                                          annotation = ''
                                        "
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </ul>
                              </speech-recognition>
                            </client-only>
                          </li>
                        </ul>
                      </div>
                      <div class="activity-date tb-column flex10">
                        <div class="top-column">
                          <label>{{ lead.updated_at_timestamp }}</label>
                        </div>
                        <div class="bottom-column">
                          <span>{{ lead.updated_at_format }}</span>
                        </div>
                      </div>
                    </li>
                    <client-only>
                      <infinite-loading
                        v-if="leadsLoaded"
                        :identifier="leadInfiniteId"
                        @infinite="leadsInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="100"
                          >
                            <rect
                              x="0"
                              y="-1"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                            <rect
                              x="0"
                              y="15"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                            <rect
                              x="0"
                              y="31"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                            <rect
                              x="0"
                              y="47"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results">
                          <div class="no-data-found">
                            <div class="inner w-100">
                              <p>No data found</p>
                            </div>
                          </div>
                        </div>
                      </infinite-loading>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="models" class="tab-pane">
            <div class="common-box h-100 customscrollbar model-list">
              <div
                v-if="!models.length"
                class="col-12 d-flex h-100 justify-content-center align-items-center"
              >
                <i
                  class="fa fa-circle-o-notch fa-spin fa-2x fa-fw text-primary"
                ></i>
              </div>
              <div v-for="model in models" :key="model.id" class="box">
                <div class="clearfix">
                  <h5 class="pull-left">{{ model.name }}</h5>
                </div>
                <div class="row">
                  <template v-for="product in model.product">
                    <div
                      v-if="products.includes(product.id)"
                      :key="product.id"
                      class="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <div class="sm-box">
                        <label class="check-label">{{ product.name }} </label>
                        <div
                          class="r189 setbg bg-gray"
                          :style="`background-image: url('${
                            product.product_images &&
                            product.product_images.length
                              ? product.product_images[0].product_image
                              : require('@/assets/img/placeholder.jpg')
                          }');background-size: contain;`"
                        ></div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="multiSendDialog"
      @click:confirm-button="userVerification"
    >
      <template slot="header">Resend Selected Invitation</template>

      Are you sure you want to Resend
      <b>{{ selections.length }} selected</b> Users?
    </ConfirmationDialog>
  </div>
</template>

<script>
/* eslint-env jquery */
import axios from 'axios'
import {
  alphaNum,
  required,
  email,
  maxLength,
  helpers,
  or,
} from 'vuelidate/lib/validators'
import { ContentLoader } from 'vue-content-loader'
import SpeechRecognition from '@/components/lead/SpeechRecognition.vue'
import EditForm from '~/components/lead/EditForm'
import TextField from '~/components/lead/TextField.vue'
import Select from '~/components/lead/Select.vue'
import LeadStatus from '~/components/lead/LeadStatus'
import leadMixin from '~/mixins/lead.js'
import imageInput from '~/components/lead/ImageInput'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
const canadian = helpers.regex(
  'alpha',
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
)
export default {
  components: {
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
    TextField,
    Select,
    LeadStatus,
    SpeechRecognition,
    ContentLoader,
    EditForm,
    imageInput,
    ConfirmationDialog,
  },
  mixins: [leadMixin],
  layout: 'leadLayout',
  middleware: ['authCheck', 'can-access-lead-module'],
  data() {
    return {
      annotation: '',
      dealerImg: null,
      form: null,
      dealerId: null,
      dealer: {},
      models: [],
      products: [],
      user: this.newUser(),
      showUserForm: false,
      roles: [],
      users: [],
      isLoading: false,
      leadInfiniteId: new Date().getTime(),
      usersPage: 0,
      leads: [],
      leadsPage: 0,
      leadsLoaded: false,
      leadOrder: 'ASC',
      leadSortBy: 'name',
      leadStatusOptions: [],
      location: { lat: 37.0902, lng: 95.7129 },
      dealerAdmin: null,
      addUserLoading: false,
      tempEmail: '',
      multiSendDialog: false,
      userInfiniteId: new Date(),
    }
  },
  computed: {
    selections() {
      return this.users.filter(({ selected }) => selected)
    },
    primaryContact() {
      return this.users.find((u) => u.is_primary_contact)
    },
    userRole() {
      return this.$_auth().user.lead
    },
    getUniqueRsmList() {
      const result = []
      const map = new Map()
      for (const item of this.dealer.dealership_rsm_assign) {
        if (!map.has(item.rsm_user_id)) {
          map.set(item.rsm_user_id, true)
          result.push(item)
        }
      }
      return result
    },
  },
  created() {
    this.fetchDealerDetails()
    this.fetchUserRole()
  },
  mounted() {
    const { leads } = this.$route.query
    if (leads) {
      this.$refs.lead_tab.click()
    } else if (!this.$_auth().user.lead.isDealerAdmin) {
      this.$refs.lead_tab.click()
    }
  },
  methods: {
    loadUserData() {
      this.usersPage = 0
      this.users = []
      this.userInfiniteId = new Date()
    },
    removeImage() {
      this.dealerImg = null
      this.form.logo = null
    },
    cancelEdit() {
      this.form = { ...this.dealer }
      this.$refs.editbox_ref.scrollTop = 0
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.form.$invalid) {
        return false
      }
      const formData = new FormData()
      Object.keys(this.form).forEach((e) => {
        if (typeof this.form[e] !== 'object' && e !== 'file') {
          formData.append(e, this.form[e])
        } else if (this.form[e] instanceof File) {
          formData.append('logo', this.form[e])
        }
      })
      // console.log(this.form)
      formData.delete('dealership_products')
      formData.append(
        'dealership_products',
        JSON.stringify(this.form.dealership_products)
      )
      formData.delete('dealership_rsm_assign')
      formData.append(
        'rsm_assignment',
        JSON.stringify(this.form.dealership_rsm_assign)
      )
      this.$axios
        .$post('lm/dealership/add', formData)
        .then((response) => {
          this.$toast.global.success('Dealership has been updated successfully')
          this.fetchDealerDetails()
          this.$nextTick(() => {
            $('.dl-detail-left-fr').show()
            $('.dl-detail-left-bk').hide()
            $('.dl-detail-left a.dl-editicon').show()
            this.$refs.editbox_ref.scrollTop = 0
          })
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    changeAddressIfNotFound() {
      if (this.$refs.autocompleteRef.autocompleteText) {
        this.form.address_line_1 = this.$refs.autocompleteRef.autocompleteText
      }
    },
    getAddressData(data) {
      this.form.address_line_1 = ''
      let street = ''
      let route = ''
      if (data.street_number) street += data.street_number + ' '
      if (data.route) {
        route += data.route
      }
      this.form.zip_code = data.postal_code ? data.postal_code : ''
      const address = street + route
      this.form.address_line_1 = address
    },
    onImageUpload(obj) {
      this.dealerImg = obj.imageURL
      this.form.logo = obj.imageFile
    },
    async fetchDealerDetails() {
      try {
        await this.$axios
          .$get('lm/dealership/get-dealership-id')
          .then(({ data }) => {
            this.dealerId = data.dealership_id[0]
            this.$axios
              .$get(`/lm/dealership/view`, {
                params: {
                  id: data.dealership_id,
                },
              })
              .then(async ({ data }) => {
                this.dealer = data
                this.form = data
                this.dealerImg = data.dealership_logo
                this.products = data.dealership_products.map(
                  (p) => p.product_id
                )
                await this.getLocationDetails(data)
              })
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getLocationDetails(data) {
      await axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address:
              data.address_line_1 ||
              '' + ', ' + data.address_line_2 ||
              '' + ', ' + data.city + ', ' + data.country,
            key: 'AIzaSyAv28a0JR1qb99F5MuesXac7HA_aiddRXg',
          },
        })
        .then(({ data }) => {
          if (data.results.length)
            this.location = data.results[0].geometry.location
        })
    },
    async fetchUserRole() {
      try {
        const [res1, res2] = await Promise.all([
          this.$axios.$post(`/lm/dealership/user/all-role`),
          this.$axios.$get(`lm/common/list-lead-status`),
        ])
        const { data } = res1
        this.roles = data.role
        const role = this.roles.find((r) => r.name === 'Dealer Admin')
        this.dealerAdmin = role.id
        this.leadStatusOptions = res2.data
      } catch (error) {
        console.log(error)
      }
    },
    async userVerification(params) {
      const wsId = this.$route.params.workspace_id
      try {
        const { message } = await this.$axios.$post(
          `/lm/dealership/user/resend-invite-people?url_workspace_id=${wsId}`,
          {
            workspace_id: wsId,
            user_id: params
              ? [params.user_id]
              : this.selections.map(({ user_id }) => user_id),
          }
        )
        if (!params) {
          this.users.forEach((ev) => (ev.selected = false))
        }
        this.$toast.success(message)
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    closeEditUserForm(user) {
      user.isEditing = false
    },
    addUser() {
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        this.addUserLoading = true
        this.$axios
          .$post('/lm/dealership/user/invite-people', this.user)
          .then((r) => {
            // this.users.unshift(r.data)
            this.loadUserData()
            this.$toast.success(r.message)
            this.user = this.newUser()
            this.$v.user.$reset()
            this.addUserLoading = false
            this.showUserForm = false
          })
          .catch((err) => {
            this.$toast.error(this.$getErrorMessage(err))
            this.addUserLoading = false
          })
      }
    },
    addToPrimary(uid) {
      this.$axios
        .$post('/lm/dealership/user/change-primary-contact', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: uid,
        })
        .then((r) => {
          this.users.forEach((u) => (u.is_primary_contact = false))
          const i = this.users.findIndex((u) => u.id === uid)
          if (r.data.is_primary_contact === false) {
            this.users[i].is_primary_contact = false
            this.$toast.success('Primary contact removed successfully')
          } else {
            this.users[i].is_primary_contact = true
            this.$toast.success(r.message)
          }
        })
    },
    toggleUserProperty(e, p, uid) {
      this.$axios
        .$post('/lm/dealership/user/update-with-field', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: uid,
          field_name: p,
          field_value: e.target.checked.toString(),
        })
        .then((r) => {
          this.$toast.success(r.message)
        })
    },
    setEditUser(user) {
      this.tempEmail = user.email
      this.users.forEach((user) => (user.isEditing = false))
      user.isEditing = true
    },
    loadModels() {
      this.$axios
        .$get(`/lm/category/list-category-with-products`)
        .then(({ data }) => {
          this.models = data.filter((m) => m.product.length)
        })
    },
    addLeadNote(note, lead_id) {
      if (!note) {
        return false
      }
      this.$axios
        .$post('/lm/leads/notes/add', {
          workspace_id: this.$route.params.workspace_id,
          lead_id,
          note,
        })
        .then((response) => {
          this.$toast.success(response.message)
          this.annotation = ''
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    updateUser(user) {
      this.addUserLoading = true
      this.$axios
        .$post('/lm/dealership/user/update', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          designation: user.designation,
          role: user.role,
        })
        .then((r) => {
          const i = this.users.findIndex((u) => u.user_id === user.user_id)
          if (this.tempEmail !== user.email) {
            user.invitation_status = true
          }
          this.users.splice(i, 1, user)
          user.isEditing = false
          this.addUserLoading = false
          this.$toast.success(r.message)
        })
    },
    deleteUser(u) {
      this.$axios
        .$post('/lm/dealership/user/delete', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: u.user_id,
        })
        .then((r) => {
          const i = this.users.findIndex((usr) => u.user_id === usr.user_id)
          this.users.splice(i, 1)
          this.$toast.success(r.message)
        })
    },
    loadLeads() {
      this.leadsLoaded = true
      this.leads = []
      this.leadsPage = 0
      this.leadInfiniteId += 1
    },
    leadsInfiniteHandler($state) {
      this.isLoading = true
      this.leadsPage += 1
      const filterFormData = new FormData()
      filterFormData.append('dealership_ids', JSON.stringify([this.dealerId]))
      this.$axios
        .$post('/lm/leads/list', filterFormData, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
            page: this.leadsPage,
            sortvalue: this.leadSortBy,
            orderby: this.leadOrder,
          },
        })
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (this.leadsPage <= 1) this.leads = []
          if (
            data.data &&
            data.data.length &&
            this.leadsPage === data.current_page
          ) {
            this.leads.push(...data.data)
            $state.loaded()
            if (this.lastPage === this.page) $state.complete()
          } else $state.complete()
          this.isLoading = false
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    userInfiniteHandler($state) {
      this.isLoading = true
      this.usersPage += 1
      this.$axios
        .$get(
          `lm/dealership/user/list`,

          {
            params: {
              dealership_id: this.dealerId,
              page: this.usersPage,
            },
          }
        )
        .then(({ data }) => {
          data.userList.forEach((ev) => (ev.selected = false))
          data.userList.forEach((ev) => (ev.isEditing = false))
          if (
            data.userList &&
            data.userList.length &&
            this.usersPage === data.current_page
          ) {
            this.isLoading = false
            this.users.push(...data.userList)
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    newUser() {
      return {
        name: '',
        phone: '',
        email: '',
        role: '',
        designation: '',
        workspace_id: this.$route.params.workspace_id,
        dealership_id: this.dealerId ? this.dealerId : '',
        is_lead_assign: 1,
      }
    },
    changeLeadStatus(lead, product) {
      this.$axios
        .$post('lm/leads/update-status', {
          workspace_id: this.$route.params.workspace_id,
          lead_id: lead.id,
          lead_status: product.lead_status,
          product_id: product.product_id,
          dealership_id: product.dealership_id,
        })
        .then((response) => {
          if (response) {
            if (response.error.length <= 0) {
              this.$toast.success('Lead status changed successfully')
            } else {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            }
          } else {
            this.$toast.error('Something went wrong.')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    addLeadFavourite(lead) {
      this.$axios
        .$post('lm/leads/add-lead-favourite', {
          workspace_id: this.$route.params.workspace_id,
          lead_id: lead.id,
          user_id: this.$auth.user.id,
          is_favourite: !lead.is_favourite,
        })
        .then((response) => {
          if (response) {
            if (response.error.length <= 0) {
              lead.is_favourite = !lead.is_favourite
            } else {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            }
          } else {
            this.$toast.error('Something went wrong.')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    // addLeadRead(lead) {
    //   this.$axios
    //     .$post('lm/leads/add-lead-read', {
    //       workspace_id: this.$route.params.workspace_id,
    //       lead_id: lead.id,
    //       user_id: this.$auth.user.id,
    //       is_read: !lead.is_read,
    //     })
    //     .then((response) => {
    //       if (response) {
    //         if (response.error.length <= 0) {
    //           lead.is_read = !lead.is_read
    //         } else {
    //           for (const err of response.error) {
    //             this.$toast.error(err)
    //           }
    //         }
    //       } else {
    //         this.$toast.error('Something went wrong.')
    //       }
    //     })
    //     .catch((err) => {
    //       this.$toast.error(this.$getErrorMessage(err))
    //     })
    // },
    toggleLeadSortData(table) {
      if (this.isLoading) return
      if (this.leadSortBy !== table) {
        this.leadSortBy = table
        this.leadOrder = 'DESC'
      } else {
        this.leadOrder = this.leadOrder === 'ASC' ? 'DESC' : 'ASC'
      }
      this.leadsPage = 0
      this.leads = []
      this.leadInfiniteId += 1
    },
    toggleAddUserForm() {
      this.showUserForm = true
      this.user = this.newUser()
    },
  },
  validations() {
    return {
      user: {
        name: { required },
        email: { required, email },
        role: { required },
        designation: { required },
      },
      form: {
        dealership_number: { required },
        dealership_name: { required },
        email: { required, email },
        phone: {
          maxLength: maxLength(20),
        },
        office_phone: {
          maxLength: maxLength(20),
        },
        address_line_1: { required },
        zip_code: { required, mycustomval: or(alphaNum, canadian) },
        city: { required },
        state: { required },
        country: { required },
      },
    }
  },
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.check-label > .check-span.disabled {
  cursor: not-allowed;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>

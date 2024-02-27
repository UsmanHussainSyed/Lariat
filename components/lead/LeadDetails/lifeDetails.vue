<template>
  <div>
    <div v-if="isTask">
      <div v-if="data">
        <p>
          <label>Product Inquired</label>{{ data['Product Inquired'] || '-' }}
        </p>
        <p><label>Task Name</label>{{ data['Task Name'] || '-' }}</p>
        <p><label>Due Date</label> {{ data['Due Date'] || '-' }}</p>
        <p><label>Status</label>{{ data['Status'] || '-' }}</p>
        <p><label>Assigned to</label> {{ data['Assigned to'] || '-' }}</p>
        <p><label>Description</label> {{ data['Description'] || '-' }}</p>
        <div v-if="isImageType && isNotEmpty" class="r21 bg-gray mb2 mt2">
          <img
            :src="attachmentDetails.attach | imgUrl"
            alt=""
            class="img-responsive"
            width="100%"
            height="100%"
          />
        </div>
        <a
          v-else-if="isNotEmpty && isDoc"
          :href="attachmentDetails.attach"
          class="bg-gray dl-brochure"
          download
        >
          <svg
            id="Layer_1"
            class="pdf-icon blue"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 14 18"
            xml:space="preserve"
          >
            <g id="Group_4447" transform="translate(-306 -292.193)">
              <g id="Group_4443" transform="translate(-18.22 -505.141)">
                <g id="Group_4442">
                  <g id="Group_4439">
                    <g id="Group_4438">
                      <path
                        id="Path_3556"
                        class="fill-color"
                        d="M333.6,798.8l3.1,3.1v11.9h-11v-15H333.6 M333.8,797.3h-8.3c-0.7,0-1.3,0.6-1.3,1.3c0,0,0,0,0,0v15.5c0,0.7,0.6,1.3,1.3,1.3c0,0,0,0,0,0H337c0.7,0,1.3-0.6,1.3-1.3v-12.3c0-0.3-0.1-0.5-0.3-0.7l-3.4-3.4C334.3,797.4,334,797.3,333.8,797.3L333.8,797.3z"
                      ></path>
                    </g>
                  </g>
                  <g id="Group_4441">
                    <g id="Group_4440">
                      <path
                        id="Path_3557"
                        class="fill-color"
                        d="M332.1,802.8v-5.3h1.5v3.8l4.4,0l0,1.5L332.1,802.8z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
              <path
                id="Icon_awesome-file-pdf"
                class="fill-color"
                d="M317.1,303.2c-0.5-0.5-2-0.3-2.7-0.3v0c-0.7-0.4-1.3-1.1-1.5-1.9c0.3-0.7,0.3-1.5,0.2-2.3c-0.1-0.5-0.6-0.8-1.1-0.8c-0.3,0-0.6,0.2-0.7,0.5c-0.1,0.9,0,1.8,0.3,2.7c-0.4,1-0.9,2-1.5,3h0c-1,0.5-2.7,1.6-2,2.4c0.2,0.2,0.5,0.3,0.8,0.4c0.6,0,1.3-0.6,2.2-2.2c0.9-0.3,1.9-0.6,2.9-0.8c0.7,0.4,1.5,0.6,2.3,0.7c0.5,0,0.9-0.3,1-0.8c0,0,0,0,0,0C317.4,303.7,317.3,303.4,317.1,303.2z M308.8,306.4c0.3-0.6,0.8-1,1.3-1.4C309.3,306.1,308.9,306.4,308.8,306.4L308.8,306.4z M312.2,298.7c0.3,0,0.3,1.3,0.1,1.7C312.1,299.8,312.1,299.2,312.2,298.7L312.2,298.7z M311.2,304.2c0.4-0.7,0.7-1.4,1-2.2c0.3,0.6,0.8,1,1.3,1.4C312.7,303.6,311.9,303.9,311.2,304.2L311.2,304.2zM316.7,304c0,0-0.2,0.2-1.6-0.3C316.6,303.6,316.9,303.9,316.7,304L316.7,304z"
              ></path>
            </g>
          </svg>
          {{ attachmentDetails.file_name }}
          <span class="pull-right">
            <svg
              id="Layer_1"
              class="attachment-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 15.8 18"
              xml:space="preserve"
            >
              <path
                id="Path_3561"
                class="fill-color"
                d="M5.5,11.5l5.2-5.2C11,6,11,5.5,10.6,5.2c0,0,0,0,0,0l0,0c-0.3-0.3-0.8-0.3-1.1,0l-5.1,5.1c-0.9,0.9-1,2.3-0.3,3.3c0.8,1,2.4,1.2,3.4,0.4c0.1-0.1,0.1-0.1,0.2-0.2l6.9-6.9c1.6-1.6,1.6-4.1,0-5.7s-4.1-1.6-5.7,0l0,0L1.7,8.4l0,0c-1.6,1.5-2.1,3.8-1.3,5.8c1,3,4.3,4.5,7.3,3.5c0.8-0.3,1.5-0.7,2.1-1.3l0,0l0,0L14,12c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l0,0c-0.3-0.3-0.8-0.3-1.1,0l-4.4,4.3l0,0c-1.2,1.2-3,1.5-4.6,0.8c-2-1-2.9-3.4-1.9-5.4c0.2-0.4,0.5-0.8,0.8-1.1l0,0l0,0L10,2.4c0.9-0.9,2.3-1,3.3-0.3c1,0.8,1.2,2.4,0.4,3.4c-0.1,0.1-0.1,0.1-0.2,0.2l-6.9,6.9c-0.3,0.3-0.8,0.3-1.1,0C5.2,12.3,5.2,11.8,5.5,11.5L5.5,11.5"
              ></path>
            </svg>
          </span>
        </a>
      </div>
    </div>
    <div v-else-if="isLeadUpdate">
      <p v-for="(key, index) in getLeadUpdatedKeys" :key="index">
        <label>{{ getLeadUpdatedLabels[index] }}</label
        >{{ data[key] }}
      </p>
    </div>
    <div v-else>
      <div v-if="data">
        <p v-for="(i, index) in getFormatedData" :key="index">
          <label>{{ i }}</label
          >{{ getFormatedValues[index] || '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { imageExtensions, docExtensions, pdfExtensions } from '~/utils/index.js'
export default {
  filters: {
    imgUrl(v) {
      if (v instanceof File) return URL.createObjectURL(v)
      return v
    },
  },
  props: {
    isTask: {
      type: Boolean,
      default: false,
    },
    isLeadUpdate: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
    attachmentDetails: {
      type: Object,
      requred: false,
      default: () => {},
    },
  },
  computed: {
    getLeadUpdatedLabels() {
      return Object.keys(this.data).map((key) => {
        const unslug = key.replace(/_/g, ' ')
        const toUpperCase = unslug.charAt(0).toUpperCase() + unslug.slice(1)
        return toUpperCase
      })
    },
    getLeadUpdatedKeys() {
      return Object.keys(this.data)
    },
    getFormatedData() {
      return Object.keys(this.data)
    },
    getFormatedValues() {
      return Object.values(this.data)
    },
    isImageType() {
      return imageExtensions.includes(this.attachmentDetails.file_type)
    },
    isNotEmpty() {
      return !!this.attachmentDetails.attach
    },
    isDoc() {
      return (
        docExtensions.includes(this.attachmentDetails.file_type) ||
        pdfExtensions.includes(this.attachmentDetails.file_type)
      )
    },
  },
}
</script>

<template>
  <svg
    id="Layer_1"
    class="email-icon"
    :class="isActiveOrange ? 'orange align-self-start' : 'h-orange'"
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
</template>
<script>
export default {
  props: {
    isActiveOrange: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

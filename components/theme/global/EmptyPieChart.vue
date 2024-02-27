<template>
  <div class="no-data" :class="[fullWidth == true ? 'big' : '']">
    <div>
      <svg
        id="Layer_1"
        class="pie-chart-icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 150 150"
        xml:space="preserve"
      >
        <g id="Pi_chart">
          <g id="pie_chart" transform="translate(0 0.03)">
            <path
              id="Path_40260"
              class="fill-color"
              d="M71.8,150C32.2,149.9,0,117.8,0,78.1C0,38.5,29.4,6.3,65.5,6.3c1.3,0,2.4,1.1,2.4,2.4c0,0,0,0,0,0v68.6l43.6,56.1c0.8,1,0.6,2.5-0.4,3.4C99.1,146.8,89.5,150,71.8,150z M62.3,11.2C30.1,13.1,4.8,42.5,4.8,78.1c0,37,30,67,67,67c15.4,0,24-2.6,33.9-10.1l0.6-0.4L63.6,79.6c-0.3-0.4-0.5-0.9-0.5-1.5V11.2L62.3,11.2z"
            />
            <path
              id="Path_40261"
              class="fill-color"
              d="M78.2,74.2c-1.3,0-2.4-1.1-2.4-2.4v0V2.4c0-1.3,1.1-2.4,2.4-2.4l0,0c39.7,0,71.8,32.2,71.8,71.8c0,1.3-1.1,2.4-2.4,2.4L78.2,74.2z M80.6,69.4h64.5l0-0.8c-1.6-34.1-29.6-62.1-63.7-63.7l-0.8,0L80.6,69.4z"
            />
            <path
              id="Path_40262"
              class="fill-color"
              d="M125.4,137.6h-0.1c-0.7,0-1.3-0.4-1.7-0.9L82.6,86c-0.8-1.1-0.7-2.6,0.4-3.4c0.4-0.3,0.9-0.5,1.5-0.5h63.1c1.3,0,2.4,1.1,2.4,2.4c0,19.9-8.3,38.9-22.9,52.6C126.7,137.4,126.1,137.7,125.4,137.6L125.4,137.6z M125.7,131.6l0.6-0.6c11.3-11.7,18-27.1,18.8-43.4l0-0.8H89.5L125.7,131.6z"
            />
          </g>
        </g>
      </svg>
      <span>Data not available</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fullWidth: { type: Boolean, default: false },
  },
}
</script>

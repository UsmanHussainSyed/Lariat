<template>
  <svg
    id="Layer_1"
    class="note-icon"
    :class="[startAlign ? 'align-self-start' : '', customClass]"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 14 18"
    xml:space="preserve"
  >
    <g id="Group_4419" transform="translate(-998.57 -658.583)">
      <g id="Group_4415">
        <g id="Group_4412">
          <g id="Group_4411">
            <path
              id="Path_3518"
              class="fill-color"
              d="M1007.9,660.1l3.1,3.1v11.9h-11v-15H1007.9 M1008.1,658.6h-8.3c-0.7,0-1.3,0.6-1.3,1.3v15.5c0,0.7,0.6,1.3,1.3,1.3h11.5c0.7,0,1.3-0.6,1.3-1.3V663c0-0.3-0.1-0.5-0.3-0.7l-3.4-3.4C1008.7,658.7,1008.4,658.6,1008.1,658.6L1008.1,658.6z"
            ></path>
          </g>
        </g>
        <g id="Group_4414">
          <g id="Group_4413">
            <path
              id="Path_3519"
              class="fill-color"
              d="M1006.5,664v-5.3h1.5v3.8l4.4,0l0,1.5L1006.5,664z"
            ></path>
          </g>
        </g>
      </g>
      <g id="Group_4416">
        <path
          id="Path_3520"
          class="fill-color"
          d="M1008.3,667.5h-5.7c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8l0,0h5.7c0.4,0,0.8,0.3,0.8,0.8S1008.7,667.5,1008.3,667.5z"
        ></path>
      </g>
      <g id="Group_4417">
        <path
          id="Path_3521"
          class="fill-color"
          d="M1008.3,670.4h-5.7c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h5.7c0.4,0,0.8,0.3,0.8,0.8S1008.8,670.4,1008.3,670.4z"
        ></path>
      </g>
      <g id="Group_4418">
        <path
          id="Path_3522"
          class="fill-color"
          d="M1008.3,673.3h-5.7c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8l0,0h5.7c0.4,0,0.8,0.3,0.8,0.8S1008.7,673.3,1008.3,673.3z"
        ></path>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    startAlign: {
      default: false,
      type: Boolean,
    },
    customClass: {
      default: 'false',
      type: String,
    },
  },
}
</script>

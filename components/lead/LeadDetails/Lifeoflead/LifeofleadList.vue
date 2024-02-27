<template>
  <li class="tl-item">
    <div class="timestamp">
      {{
        (life.lead_date &&
          $moment(life.lead_date).tz($auth.user.timezone).format('hh:mm A')) ||
        '-'
      }}<br />
      {{
        (life.lead_date &&
          $moment(life.lead_date)
            .tz($auth.user.timezone)
            .format(`MMM Do 'YY`)) ||
        '-'
      }}
    </div>
    <div class="item-icon" v-html="lifeOfLeadIconSvg(life.type)"></div>
    <div class="item-detail">
      <h5>{{ life.type }}</h5>
      <read-more
        v-if="life.type === 'Note Added'"
        class="ck-content"
        more-str="Read more"
        :text="life.title"
        link="#"
        less-str="Read less"
        :max-chars="150"
      ></read-more>
      <p v-else>
        {{ life.title }}
      </p>
    </div>
  </li>
</template>

<script>
import mixin from '~/mixins/lead.js'
export default {
  mixins: [mixin],
  props: {
    life: {
      type: Object,
      required: true,
    },
  },
}
</script>

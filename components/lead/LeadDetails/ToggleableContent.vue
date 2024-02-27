<template>
  <div class="body-content-fixed body-content-right h-100">
    <div class="box customscrollbar w-100">
      <ul class="ld-list p0">
        <li class="bg-gray">
          <div class="media">
            <NoteIcon :start-align="true" custom-class="orange" />
            <div class="media-body align-self-center">
              <h5>Forms Completed</h5>
            </div>
          </div>
          <div class="tb-data">
            <p v-if="!(submittedForms && submittedForms.length)">
              No data found
            </p>
            <template v-for="(formData, index) in submittedForms" v-else>
              <p v-if="index < 5" :key="index">
                {{ formData.form }} <br /><span>{{ formData.created_at }}</span>
              </p>
            </template>
          </div>
        </li>
        <li class="bg-gray">
          <div class="media">
            <WebIcon custom-class="orange" :start-align="true" />
            <div class="media-body align-self-center">
              <h5>Most Visited Pages</h5>
            </div>
          </div>
          <div class="tb-data">
            <table class="table table-borderless">
              <tbody>
                <tr v-if="!(mostVisited && mostVisited.length)">
                  <td>No data found</td>
                </tr>
                <tr
                  v-for="(recentPageVisit, index) in mostVisited"
                  v-else
                  :key="index"
                >
                  <template v-if="index < 5">
                    <td><div v-html="recentWebVisits[index]"></div></td>
                    <td class="text-gray" align="right">
                      {{ recentPageVisit.agoTime }}
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li class="bg-gray">
          <div class="media">
            <NoteIcon :start-align="true" custom-class="orange" />
            <div class="media-body align-self-center">
              <h5>Last Web Visit</h5>
            </div>
          </div>
          <div class="tb-data">
            <table class="table table-borderless">
              <tbody>
                <tr v-if="!(lastVisited && lastVisited.length)">
                  <td>No data found</td>
                </tr>
                <tr v-else>
                  <td>
                    {{ lastVisited[0].created_at }}
                  </td>
                  <td class="text-gray" align="right">
                    {{ lastVisited[0].agoTime }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li class="ld-list-title">
          <div class="media">
            <NoteIcon :start-align="true" custom-class="orange" />
            <div class="media-body align-self-center">
              <h5>Recent Note(s)</h5>
            </div>
          </div>
        </li>
        <li v-if="!topNotesData.length" class="bg-yellow">No notes added</li>
        <li
          v-for="recentNotes in topNotesData"
          v-else
          :key="recentNotes.id"
          class="bg-yellow"
        >
          <div class="ck-content" v-html="recentNotes.note"></div>
          <h5 class="mb0">{{ recentNotes.user_details.name }}</h5>
          <span
            >{{
              $moment(recentNotes.created_at)
                .tz($auth.user.timezone)
                .format(`MMM Do YYYY, hh:mm A`)
            }}
            {{
              $moment(recentNotes.created_at)
                .tz($auth.user.timezone)
                .format('hh:mm A')
            }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleableContent',
  props: {
    submittedForms: {
      type: Array,
      required: true,
    },
    mostVisited: {
      type: Array,
      required: true,
    },
    lastVisited: {
      type: Array,
      required: true,
    },
    topNotesData: {
      type: Array,
      required: true,
    },
    recentWebVisits: {
      type: Array,
      required: true,
    },
  },
}
</script>

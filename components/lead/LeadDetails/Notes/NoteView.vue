<template>
  <div class="col-lg-5 h-100 active-note">
    <div class="common-box box h-100 customscrollbar">
      <div class="media sc_media">
        <NoteIcon start-align />
        <div class="media-body align-self-start">
          <h5>Notes</h5>
          <p>
            {{
              $moment(viewedNote.created_at)
                .tz($auth.user.timezone)
                .format(`MMM Do YYYY`)
            }},
            {{
              $moment(viewedNote.created_at)
                .tz($auth.user.timezone)
                .format(`hh:mm A`)
            }}
          </p>
          <div class="notes-desc">
            <p>
              <label>Name</label>
              {{ viewedNote.user_details.name }}
            </p>
            <p
              class="ck-content"
              v-html="getLabelDesc(viewedNote.note, 'Content')"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    viewedNote: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getLabelDesc() {
      return (html, title) => `<label>${title}</label>` + html
    },
  },
}
</script>

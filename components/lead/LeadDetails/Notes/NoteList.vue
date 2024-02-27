<template>
  <div class="col-lg-7 h-100">
    <div class="common-box box h-100">
      <div class="tl-notes h-100">
        <a
          v-if="notes.length"
          href="javascript:void(0);"
          class="add-tl-notes"
          @click="$emit('newNote', false)"
        >
          <PlusIcon :white="true" />
          <span>Add Note</span></a
        >
        <ul class="tl customscrollbar w-100">
          <li
            v-for="note in notes"
            :key="note.id"
            class="tl-item"
            @click="$emit('viewNote', note)"
          >
            <div class="timestamp">
              {{ note.created_time }}<br />
              {{ note.created_date }}
            </div>
            <div class="item-icon">
              <NoteIcon />
            </div>
            <div class="item-detail">
              <div class="ck-content" v-html="note.note"></div>
              <h5>{{ note.user_details.name }}</h5>
            </div>
          </li>
          <div v-if="!notes.length" style="height: 10px; visibility: hidden">
            No data
          </div>
          <client-only>
            <infinite-loading
              v-if="notesLoaded"
              :identifier="notesInfiniteId"
              @infinite="$emit('notesInfiniteHandler', $event)"
            >
              <div slot="spinner">
                <NoteLoader />
              </div>
              <div slot="no-more"></div>
              <div slot="no-results">
                <EmptyState>
                  <p>You haven't added any Note yet!</p>
                  <span class="btn btn-icon" @click="$emit('newNote', false)"
                    ><PlusIcon :white="true" /> Add New Note</span
                  ></EmptyState
                >
              </div>
            </infinite-loading>
          </client-only>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import EmptyState from '~/components/theme/global/EmptyState'
import PlusIcon from '~/components/lead/Icons/PlusIcon.vue'
import NoteIcon from '~/components/lead/Icons/NoteIcon.vue'
import NoteLoader from '~/components/lead/LeadDetails/Loaders/NoteLoader.vue'
export default {
  components: {
    EmptyState,
    PlusIcon,
    NoteIcon,
    NoteLoader,
  },
  props: {
    notesInfiniteId: {
      type: Number,
      required: true,
    },
    notes: {
      type: Array,
      required: true,
    },
    notesLoaded: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

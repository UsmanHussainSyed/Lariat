<template>
  <div
    class="col-lg-5 h-100 new-lead-note new-notes"
    :style="!showNote && 'display: block'"
  >
    <div class="common-box bg-gray h-100">
      <form class="h-100" @submit.prevent>
        <client-only>
          <speech-recognition
            v-slot="{ started, start, stop }"
            v-model="note"
            class="h-100"
          >
            <h5>Add New Note</h5>
            <div class="form-group note-area">
              <Ckeditor
                v-model="note"
                class="form-control h-100"
                placeholder="Note"
                :mention-users="[]"
              />
              <div class="annotation">
                <a
                  href="javascript:void(0);"
                  :class="{ 'mic-active': started }"
                  @click="
                    () => {
                      started ? stop() : start()
                    }
                  "
                >
                  <AnnotationIcon />
                </a>
              </div>

              <div
                v-if="$v.note.$error && !$v.note.required"
                class="input-error"
              >
                Please enter details
              </div>
            </div>
            <div class="form-group mb0 inline-btns">
              <button type="button" class="btn" @click="addNote">Add</button>
              <button
                type="button"
                class="btn btn-gray cancel-btn"
                @click="
                  note = ''
                  $emit('showNote', true)
                  stop()
                "
              >
                Cancel
              </button>
            </div>
          </speech-recognition>
        </client-only>
      </form>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import SpeechRecognition from '~/components/lead/SpeechRecognition'
import Ckeditor from '~/components/plugins/Ckeditor'
import AnnotationIcon from '~/components/lead/Icons/AnnotationIcon.vue'
export default {
  components: {
    Ckeditor,
    SpeechRecognition,
    AnnotationIcon,
  },
  props: {
    showNote: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      note: '',
    }
  },
  watch: {
    note(v) {
      this.$emit('update:note', v)
    },
  },
  methods: {
    addNote() {
      this.$v.note.$touch()
      if (this.$v.note.$invalid) return
      this.$emit('addNote')
    },
  },
  validations: {
    note: { required },
  },
}
</script>

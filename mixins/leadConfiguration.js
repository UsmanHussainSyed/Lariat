export default {
  data: () => ({
    filterHideList: [
      { name: 'Product Inquired', isActive: true },
      { name: 'Assigned To', isActive: true },
      { name: 'Status', isActive: true },
      { name: 'Description', isActive: true },
      { name: 'File Upload', isActive: true },
      { name: 'Due Date', isActive: true },
    ],
    editorToolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      ['blockquote' /* 'code-block' */],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      /* ['link', 'image', 'video'], */
      ['clean'], // remove formatting button
    ],
  }),
  computed: {
    isWebVisits() {
      return (
        this.activeLifeOfLeadNote.info.data &&
        ['Website Visit', 'importantPageVisit', 'pageVisit'].includes(
          this.activeLifeOfLeadNote.data.type
        )
      )
    },
    isTaskAdded() {
      return (
        this.activeLifeOfLeadNote.info.data &&
        typeof this.activeLifeOfLeadNote.info.data === 'object' &&
        ['task', 'Task', 'Task Created'].includes(
          this.activeLifeOfLeadNote.data.type
        )
      )
    },
    isFormSubmittion() {
      return (
        this.activeLifeOfLeadNote.info.data &&
        typeof this.activeLifeOfLeadNote.info.data === 'object' &&
        [
          'formSubmit',
          'Form Submission',
          'Added through form submission',
        ].includes(this.activeLifeOfLeadNote.data.type)
      )
    },
    isNoteAddedRes() {
      return (
        this.activeLifeOfLeadNote.info.data &&
        Array.isArray(this.activeLifeOfLeadNote.info.data) &&
        this.checkIsInclued(this.activeLifeOfLeadNote.info.data[0].type) &&
        ['notes', 'Note Added'].includes(this.activeLifeOfLeadNote.data.type)
      )
    },
  },
}

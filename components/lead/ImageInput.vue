<template>
  <div class="image-upload">
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      ref="file1"
      type="file"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
    />
  </div>
</template>

<script>
export default {
  props: {
    // Use "value" to enable using v-model
    value: Object,
    context: Number,
    imageId: Number,
  },
  data: () => ({
    uploadFieldName: 'file',
    maxSize: 5000000, // in bytes
  }),
  methods: {
    launchFilePicker() {
      this.$refs.file1.click()
    },
    onFileChange(fieldName, file) {
      const imageFile = file[0]
      if (file.length > 0) {
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.$toast.global.error('Please choose an image file')
        }
        // Max size of image is 5 MB
        else if (imageFile.size > this.maxSize) {
          this.$toast.global.error(
            'Your file is too big! Please select an image under 5MB'
          )
        } else {
          // Append file into FormData and turn file into image URL
          const formData = new FormData()
          const imageURL = URL.createObjectURL(imageFile)
          formData.append(fieldName, imageFile)
          // Emit the FormData and image URL to the parent component
          this.$emit('input', {
            formData,
            imageURL,
            // context: this.context,
            imageFile,
            // imageId: this.imageId,
          })
        }
      }
    },
  },
}
</script>

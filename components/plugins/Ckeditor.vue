<template>
  <ckeditor
    v-model="model"
    :editor="editor"
    :config="editorConfig"
    :tag-name="tagName"
    :disabled="disabled"
    v-on="$listeners"
  />
</template>
<script>
/* eslint-disable vue/require-default-prop */
class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest()
          this._initListeners(resolve, reject, file)
          this._sendRequest(file)
        })
    )
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest())

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open('POST', `${process.env.API_BASE_URL}ckeditor-upload-image`, true)
    xhr.responseType = 'json'
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr
    const loader = this.loader
    const genericErrorText = `Couldn't upload file: ${file.name}.`

    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const response = xhr.response

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        )
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url,
      })
    })

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total
          loader.uploaded = evt.loaded
        }
      })
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData()

    data.append('upload', file)

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data)
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader)
  }
}

function customItemRenderer(item) {
  const itemElement = document.createElement('span')

  const avatar = document.createElement('img')
  const userNameElement = document.createElement('span')
  const fullNameElement = document.createElement('span')

  itemElement.classList.add('mention__item')

  // avatar.src = `../../assets/img/${ item.avatar }.jpg`;
  // avatar.src = item.avatar;

  if (item.display_profile_image) {
    avatar.src = item.display_profile_image
  }
  // if (!item.display_profile_image && item.name) {
  //   avatar.src = `https://ui-avatars.com/api/?name=${encodeURI(
  //     item.name
  //   )}&size=128&background=F8F9Fa&font-size=0.55&bold=true')`
  // }
  if (!item.display_profile_image && item.name) {
    userNameElement.classList.add('profile-mention')
    userNameElement.classList.add('fl-as-imgtxt')
    userNameElement.classList.add('bg-gray')
    userNameElement.classList.add(item.name[0].toLowerCase())
    userNameElement.textContent = item.name[0].toUpperCase()
  }

  fullNameElement.classList.add('mention__item__full-name')
  fullNameElement.textContent = item.name
  if (item.display_profile_image) {
    itemElement.appendChild(avatar)
  }
  itemElement.appendChild(userNameElement)
  itemElement.appendChild(fullNameElement)

  return itemElement
}

let ClassicEditor
let CKEditor
if (process.client) {
  CKEditor = require('@ckeditor/ckeditor5-vue2').component

  // ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  ClassicEditor = require('@/ckeditor5_build/ckeditor')
}

export default {
  components: {
    ckeditor: CKEditor,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    tagName: {
      type: String,
      required: false,
      default: 'div',
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    uploadUrl: {
      type: String,
      required: false,
    },
    config: {
      type: Object,
      required: false,
      default() {},
    },
    // customEvent: {
    //   type: Boolean,
    //   required: false,
    // },

    editorOptions: {
      type: Array,
      default: () => [],
    },
    mentionUsers: { type: Array, default: () => [] },
  },
  data() {
    return {
      model: this.value,
      editor: ClassicEditor,
      editorConfig: {
        placeholder: this.placeholder,
        // width: '10%',
        // height: 200 ,
        // uiColor :'#66AB16',
        // scayt_autoStartup: true,
        // Limit the number of suggestions available in the context menu.
        // scayt_maxSuggestions: 3,
        mention: {
          feeds: [
            {
              marker: '@',
              feed: this.getFeedItems,
              // feed:[
              //   { id: '@cflores', avatar: 'm_1', name: 'Charles Flores' },
              //  { id: '@gjackson', avatar: 'm_2', name: 'Gerald Jackson' },
              //  { id: '@wreed', avatar: 'm_3', name: 'Wayne Reed' },
              //  { id: '@lgarcia', avatar: 'm_4', name: 'Louis Garcia' },
              //  { id: '@rwilson', avatar: 'm_5', name: 'Roy Wilson' },
              // { id: '@mnelson', avatar: 'm_6', name: 'Matthew Nelson' },
              //  { id: '@rwilliams', avatar: 'm_7', name: 'Randy Williams' },
              // { id: '@ajohnson', avatar: 'm_8', name: 'Albert Johnson' },
              //  { id: '@sroberts', avatar: 'm_9', name: 'Steve Roberts' },
              //  { id: '@kevans', avatar: 'm_10', name: 'Kevin Evans' },
              // { id: '@mwilson', avatar: 'w_1', name: 'Mildred Wilson' },

              // ],
              itemRenderer: customItemRenderer,
              // itemTemplate: '<li data-id="{id}">' +
              //   '<img class="photo" src="assets/mentions/img/{avatar}.jpg" />' +
              //   '<strong class="username">{name}</strong>' +
              //   '<span class="fullname">{name}</span>' +
              //   '</li>',
              // outputTemplate: '<a href="mailto:{name}@example.com">@{name}</a><span>&nbsp;</span>',
              // minChars: 0
            },
          ],
        },

        toolbar: {
          items: [
            'undo',
            'redo',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'imageUpload',
            'mediaEmbed',
            'removeFormat',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'codeBlock',
            'insertTable',
          ],
        },
        // simpleUpload: {
        // The URL that the images are uploaded to.
        // uploadUrl: 'http://laravel-social.com/api/v1/ckeditor-upload-image',
        // },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'http://',
        },
        mediaEmbed: {
          previewsInData: true,
        },
        // fontFamily: {
        //     options: [
        //         'default',
        //         'Ubuntu, Arial, sans-serif',
        //         'Ubuntu Mono, Courier New, Courier, monospace'
        //     ]
        // },
        // fontSize: {
        //     options: [
        //         'tiny',
        //         'default',
        //         'big'
        //     ]
        // },
        fontSize: {
          options: [
            '9px',
            '11px',
            '13px',
            'default',
            '17px',
            '19px',
            '21px',
            '23px',
          ],
          supportAllValues: true,
        },
        // Automatic text transformation (autocorrect)
        typing: {
          transformations: {
            include: [
              // Use only the 'quotes' and 'typography' groups.
              'quotes',
              'typography',

              // Plus some custom transformation.
              { from: 'CKE', to: 'CKEditor' },
            ],
          },
        },
        // Code blocks
        // codeBlock: {
        //     languages: [
        //         { language: 'css', label: 'CSS' },
        //         { language: 'html', label: 'HTML' }
        //     ]
        // },
        language: 'en',
        /* image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side',
          ],
        }, */
        /* image: {
          upload: {
            types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
          },
        }, */
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            // 'tableCellProperties',
            // 'tableProperties',
          ],
        },
        licenseKey: '',
        extraPlugins: [MyCustomUploadAdapterPlugin],
      },
    }
  },
  watch: {
    value(value) {
      this.model = value
    },
    model(model) {
      this.$emit('update', model)
    },
  },
  methods: {
    getFeedItems(searchTerm) {
      // As an example of an asynchronous action, return a promise
      // that resolves after a 100ms timeout.
      // This can be a server request or any sort of delayed action.
      return new Promise((resolve) => {
        setTimeout(() => {
          const itemsToDisplay = this.mentionUsers // this.editorOptions
            // Filter out the full list of all items to only those matching the query text.
            // .filter( this.isItemMatching )
            // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
            // .slice( 0, 10 );

            .filter((ev) => {
              let regex
              try {
                regex = new RegExp(searchTerm, 'ig')
              } catch {}

              if (regex) return regex.test(ev.name) || regex.test(ev.id)

              return (
                (ev.name || '').includes(searchTerm) ||
                (ev.id || '').includes(searchTerm)
              )
            })

          resolve(itemsToDisplay)
        }, 100)
      })
    },
  },
}
</script>
<style>
@import url('@/assets/css/ckeditor.css');
</style>

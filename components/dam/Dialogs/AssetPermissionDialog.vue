<template>
  <Model
    v-model="model"
    hide-buttons
    header-text="
      Permission
    "
    :model-footer="false"
    :body-class="'text-center'"
    :layout-class="'modal-small'"
    :modal-share-url="'sharePopup'"
    @permissionRemove="$emit('permissionRemove')"
  >
    <p v-if="permission == 'Private'">
      Your selected asset(s) will become Private and no longer sharable by
      Users. And, selected asset(s) will be removed from any early created
      shared URL.
    </p>
    <p v-if="permission == 'Public'">
      Your selected asset(s) will become Public asset and users will allowed to
      share them. Also if any shared URL has been generated earlier with
      selected asset(s) will be accessible under shared URL.
    </p>
    <p v-if="permission != 'Public' && permission != 'Private'">
      Sharing link is generated for this asset. By changing permission from
      Public to Private, the link no longer accessible. Do you want to continue?
    </p>
    <div class="btn-group">
      <button
        class="btn btn-gray"
        data-dismiss="modal"
        @click="
          model = false
          $emit('permissionRemove')
        "
      >
        No
      </button>
      <button
        class="btn"
        :class="{ disabled: isUpdating }"
        @click="$emit('changeSharePermission')"
      >
        Yes
      </button>
    </div>
  </Model>
</template>

<script>
import Model from '~/components/plugins/Model'

export default {
  components: { Model },
  extends: Model,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    permission: { type: String },
    isUpdating: { type: Boolean, default: false },
  },
}
</script>

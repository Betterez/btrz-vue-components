<template>
    <div v-if="errors" class="errors">
      <div v-for="error in errors" class="error">
        <p class="bz-input-error"><i class="fa fa-exclamation-circle"></i> <span>{{ $t(error.message) || error.message }}</span></p>
      </div>
    </div>
</template>

<script>
  export default {
    name: "BtrzErrors",
    props: {
      errors: {
        type: Object
      }
    }
  }
</script>

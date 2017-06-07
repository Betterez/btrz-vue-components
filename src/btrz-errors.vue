<template>
    <div v-if="errors" class="errors">
      <div v-for="error in errors" class="error">
        {{ $t(error.message) || error.message }}
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

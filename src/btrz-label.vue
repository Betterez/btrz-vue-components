<template>
    <label :for="id" v-if="label">{{label}}:</label>
</template>

<script>
  export default {
    name: "BtrzLabel",
    props: {
      id: {
        type: String
      },
      label: {
        type: String
      }
    }
  }
</script>

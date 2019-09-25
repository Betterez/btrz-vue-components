<template>
    <label :for="id" v-if="label" :aria-label="ariaLabel">{{label}}</label>
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
      },
      ariaLabel: {
        type: String
      } 
    }
  }
</script>

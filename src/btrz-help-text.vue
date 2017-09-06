<template>
  <span class="help-block">{{ text }}</span>
</template>

<script>
  export default {
    name: "BtrzHelpText",
    props: {      
      text: {
        type: String,
        note: "Text to show in the help-block span."
      }
    }
  }
</script>

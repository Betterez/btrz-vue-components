<template>
  <div class="input-container">
    <input name="inputValidate" class="form-control"
      v-bind:type="type"
      v-bind:placeholder="placeholder"
      v-validate
      v-bind:data-vv-rules="validations" />
    <div v-show="errors.has('inputValidate')" class="error">{{ errors.first('inputValidate') }}</div>
  </div>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "validations", "type"],
  }
</script>

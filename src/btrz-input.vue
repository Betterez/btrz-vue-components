<template>
  <div class="input-container">
    <input class="form-control"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      v-validate
      :data-vv-rules="validations" />
    <div v-show="errors.has('inputValidate')" class="error">{{ errors.first('inputValidate') }}</div>
  </div>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "validations", "type", "name"],
  }
</script>

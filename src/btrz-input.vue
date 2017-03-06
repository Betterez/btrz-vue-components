<template>
  <div class="col-xs-12 col-sm-12 col-md-6">
    <label class="hidden-xs"></label>
    <div class="input-container">
      <input type="text" name="inputValidate" class="form-control"
        v-validate
        v-bind:data-vv-rules="validations"
        v-bind:placeholder="placeholder" />
      <div v-show="errors.has('inputValidate')" class="error">{{ errors.first('inputValidate') }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "validations"],
    data: () => ({
      input: "",
    }),
  }
</script>

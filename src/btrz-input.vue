<template>
  <div class="col-xs-12 col-sm-12 col-md-6">
    <label class="hidden-xs"></label>
    <div class="input-container">
      <input type="text" v-model="input" name="input" v-bind:placeholder="placeholder" class="form-control" />
      <div v-show="errors.has('input')" class="error">{{ errors.first('input') }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder"],
    data: () => ({
      input: "",
    }),
  }
</script>

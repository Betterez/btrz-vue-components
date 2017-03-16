<template>
  <div class="input-container">
    <input class="form-control"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      v-validate
      :data-vv-rules="validations" />
    <div v-show="fields.dirty(this.name) && errors.has(this.name)" class="error">{{ errors.first(this.name) }}</div>
  </div>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "validations", "type", "name"],
  }
</script>

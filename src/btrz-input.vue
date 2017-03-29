<template>
  <div class="input-container">
    <input class="form-control"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"/>
  </div>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "type", "name"]
  }
</script>

<template>
    <input class="form-control full-width"
      :id="id"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value);"
      @blur="$emit('blur', $event.target.value);"
      @focus="$emit('focus', $event.target.value);"/>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "type", "name", "value", "id"]
  }
</script>

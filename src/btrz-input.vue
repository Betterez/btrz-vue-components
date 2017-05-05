<template>
    <input class="form-control full-width"
      :id="id"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="change($event.target.value)"
      @blur="blur($event.target.value)"
      @focus="focus($event.target.value)"/>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["placeholder", "type", "name", "value", "id"],
    created() {
      this.$parent.$emit('change', this.value);
    },
    methods: {
      change(value) {
        this.$emit('input', value);
        this.$parent.$emit('change', value);
      },
      focus(value) {
        this.$emit('focus', value);
        this.$parent.$emit('focus');
      },
      blur(value) {
        this.$emit('blur', value);
        this.$parent.$emit('blur');
      }
    }
  }
</script>

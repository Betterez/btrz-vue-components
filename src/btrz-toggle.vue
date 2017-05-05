<template>
    <span class="btrz-switcher" @click="toggle">
      <input type="checkbox" :checked=this.isChecked>
      <label></label>
    </span>
</template>

<script>
  export default {
    name: "BtrzInput",
    props: ["checked"],
    methods: {
      toggle() {
        this.isChecked = !this.isChecked;
        this.$parent.$emit('change', this.checked);
      },
      onFocus() {
        this.$parent.$emit('focus');
      },
      outOfFocus() {
        this.$parent.$emit('blur');
      }
    },
    data() {
      return {isChecked: this.checked}
    }
  }
</script>

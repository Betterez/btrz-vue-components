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
        this.$parent.$emit('childValueUpdated', this.checked);
      },
      onFocus() {
        this.$parent.$emit('childOnFocus');
      },
      outOfFocus() {
        this.$parent.$emit('childOutOfFocus');
      }
    },
    data() {
      return {isChecked: this.checked}
    }
  }
</script>

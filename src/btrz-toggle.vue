<template>
    <span class="btrz-switcher" @click="toggle">
      <input :checked=isChecked type="checkbox">
      <label></label>
    </span>
</template>

<script>
  export default {
    name: "BtrzToggle",
    props: ["id", "type", "label", "name", "value", "errors", "checked"],
    computed: {
      isChecked: function () {
        if(this.value === "true") {
          this.value = true;
        }
        if(this.value === "false") {
          this.value = false;
        }
        return Boolean(this.value)
      }
    },
    methods: {
      toggle() {
        this.value = !this.value;
      }
    },
    data() {
      return {value: this.value}
    }
  }
</script>

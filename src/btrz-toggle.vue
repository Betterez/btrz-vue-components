<template>
  <div>
    <btrz-label :id="id" :label="label"></btrz-label>
    <span class="btrz-switcher" @click="toggle">
      <input :checked=isChecked type="checkbox">
      <label></label>
    </span>
    <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>
import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";

  export default {
    name: "BtrzToggle",
    components: {
      BtrzLabel,
      BtrzErrors
    },
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

<template>
  <select @change="change" :placeholder="placeholder" v-model="selected" class="form-control col-xs-2 chevron-down-bkg" :disabled="disabled">
    <option class="au-target" value="">{{ placeholder }}</option>
    <option class="au-target" v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
  export default {
    name: "BtrzSelect",
    props: {
      selectedValue: {
        type: String,
        "default": ""
      },
      options: {
        type: Array,
        "default": () => { return []; }
      },
      placeholder: {
        type: String,
        "default": ""
      },
      disabled: {
        type: Boolean,
        "default": false
      }
    },
    model: {
      prop: "selected",
      event: "change"
    },
    methods: {
      change() {
        this.$emit("change", this.selected);
      }
    },
    data() {
      return {selected: this.selectedValue};
    }
  };
</script>

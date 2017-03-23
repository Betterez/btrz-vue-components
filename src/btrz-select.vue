<template>
  <select @change="propagateChange($event.target.value)" v-model="selected" class="form-control col-xs-2 chevron-down-bkg" :disabled="disabled">
    <option value="" v-if="defaultOption" :value="defaultOption.value">{{defaultOption.text}}</option>
    <option v-for="option in options" :value="option.value">
      {{option.text}}
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
      defaultOption: {
        type: Object,
        default: null
      },
      disabled: {
        type: Boolean,
        "default": false
      }
    },
    model: {
      prop: "selectedValue",
      event: "change"
    },
    methods: {
      propagateChange(newValue) {
        this.$emit("change", newValue);
      }
    },
    data() {
      return {selected: this.selectedValue};
    }
  };
</script>

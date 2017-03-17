<template>
  <div>
    <select @change="change" v-model="selected" class="form-control col-xs-2 chevron-down-bkg">
      <option :value="selectedOption.value">{{ selectedOption.text }}</option>
      <option v-for="option in options" :value="option.value">
        {{option.text}}
      </option>
    </select>
    <div class="error hidden" title="required">Required</div>
  </div>
</template>

<script>
  export default {
    name: "BtrzSelect",
    props: {
      selectedOption: {
        type: Object,
        //        default: () => { return {text: "", value: ""}; }
        default: null
      },
      options: {
        type: Array,
        "default": () => { return []; }
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    model: {
      prop: "selected",
      event: "change"
    },
    created() {
      this.selectedOption = this.selectedOption || {text: this.placeholder, value: ""};
    },
    methods: {
      change() {
        this.$emit("change", this.selected);
      }
    },
    data() {
      return {selected: null};
    }
  };
</script>

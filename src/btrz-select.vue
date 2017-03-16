<template>
  <select class="form-control col-xs-2 chevron-down-bkg">
    <option :value="selectedOption.value">{{ selectedOption.text }}</option>
    <option v-for="option in options" :value="option.value">
      {{option.text}}
    </option>
  </select>
</template>

<script>
  export default {
    name: "BtrzSelect",
    props: {
      selectedOption: {
        type: Object,
        "default": () => { return {text: "", value: ""}; }
      },
      options: {
        type: Array,
        "default": () => { return []; }
      }
    }
  };
</script>


<template>
  <select ref="select"
          @change="propagateChange($event.target.value)"
          v-model="selected"
          class="form-control col-xs-2 chevron-down-bkg"
          :disabled="disabled">
    <option value="" v-if="firstOption" :value="firstOption.value">{{firstOption.text}}</option>
    <option v-for="option in options" :value="option.value">
      {{option.text}}
    </option>
  </select>
</template>

<script>

  function hasTextAndValue(optionList) {
    return optionList.every(
      (option) => "text" in option && "value" in option
    );
  };

  export default {
    name: "BtrzSelect",
    props: {
      selectedValue: {
        type: String,
        "default": ""
      },
      options: {
        type: Array,
        "default": () => [],
        validation: hasTextAndValue
      },
      firstOption: {
        type: Object,
        default: null,
        validation: hasTextAndValue
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
      // Just using for testing
      hasTextAndValue,
      propagateChange(newValue) {
        this.$emit("change", newValue);
      }
    },
    computed: {
      selected() {
        return this.selectedValue;
      }
    }
  };

</script>

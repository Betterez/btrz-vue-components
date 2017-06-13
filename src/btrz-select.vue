<template>
  <div>
    <btrz-label :id="id" :label="label"></btrz-label>
    <select ref="select"
    :class="`chevron-down-bkg ${classes} ${(this.selected === '') ? 'default-selected' : ''}`"
    @change="propagateChange($event.target.value)"
    v-model="selected"
    :disabled="disabled">
    <option value="" v-if="firstOption" :value="firstOption.value">{{firstOption.text}}</option>
    <option v-for="option in options" :value="option.value">
      {{option.text}}
    </option>
  </select>
  <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>

  function hasTextAndValue(optionList) {
    return optionList.every(
      (option) => "text" in option && "value" in option
    );
  };

  import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
  import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";

  export default {
    name: "BtrzSelect",
    components:{
      BtrzLabel,
      BtrzErrors
    },
    props: {
      classes: {
        type: String
      },
      label: {
        type: String
      },
      errors: {
        type: Object
      },
      selectedValue: {
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
      focus() {
        this.$refs.select.focus();
      },
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

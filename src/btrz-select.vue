<template>
  <div :class="{ 'input--focused': focused, 'bz-has-error': hasError }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <div class="input-group">
      <select ref="select"
      :id="id"
      :name="name"
      :class="`chevron-down-bkg ${classes} ${(this.selected === '') ? 'default-selected' : ''}`"
      :disabled="disabled"
      v-model="selected"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);">
      <option value="" v-if="firstOption" :value="firstOption.value">{{firstOption.text}}</option>
      <option v-for="option in options" :value="option.value">
        {{option.text}}
      </option>
    </select>
    </div>
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
      id: {
        type: String
      },      
      classes: {
        type: String
      },
      label: {
        type: String
      },
      errors: {
        type: Array
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
      },
      name: {
        type: String
      }
    },
    data() {
      return {
        focused: false
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
      focusUpdated(focus, value) {
        this.$emit(focus, value);
        this.focused = !this.focused;
      }
    },
    computed: {
      hasError: {
        get() { return this.errors && this.errors.length > 0 }
      },
      selected: {
        get() {
          return this.selectedValue;
        },
        set(newValue) {
          this.$emit("change", newValue);
        }
      }
    }
  };

</script>

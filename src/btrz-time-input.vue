<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <input class="clock-bkg form-control full-width"
    :id="id"
    :name="name"
    :type="type"
    :value="inputValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :label="label"
    @input="valueUpdated($event.target.value);"
    @blur="focusUpdated('blur', $event.target.value);"
    @focus="focusUpdated('focus', $event.target.value);"/>
    <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>
  import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
  import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";
  export default {
    name: "BtrzInput",
    components:{
      BtrzLabel,
      BtrzErrors
    },
    props: {
      placeholder: {type: String},
      type: {type: String},
      name: {type: String},
      value: {type: String},
      id: {type: String},
      label: {type: String},
      errors: {type: Object},
      disabled: {type: Boolean, "default": false}
    },
    methods: {
      valueUpdated(value) {
        this.inputValue = value;
        this.isEmpty = !Boolean(value);
        this.$emit('input', value);
      },
      focusUpdated(focus, value) {
        this.$emit(focus, value);
        this.focused = !this.focused;
      }
    },
    mounted() {
      this.valueUpdated(this.value);
    },
    data() {
      return {isEmpty: true, focused: false, inputValue: this.value};
    }
  }
</script>

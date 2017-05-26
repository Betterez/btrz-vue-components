<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty,
      'bz-has-error': hasError
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <div class="input-group">
      <span v-if="prefix" class="input-group-addon">{{prefix}}</span>
      <input class="form-control"
      ref="input"
      :id="id"
      :disabled="disabled"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :label="label"
      @input="valueUpdated($event.target.value);"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);"/>
      <span v-if="postfix" class="input-group-addon">{{postfix}}</span>
    </div>
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
      placeholder: {type: "text"},
      type: {type: "text"},
      name: {type: "text"},
      value: {},
      id: {type: "text"},
      label: {type: "text"},
      errors: {type: Object},
      prefix: {type: "text"},
      postfix: {type: "text"},
      disabled: {type: Boolean}
    },
    computed: {
      hasError: {
        get() { return this.errors && this.errors.length > 0 }
      }
    },
    methods: {
      _updateValue(value) {
        this.inputValue = value;
        this.isEmpty = !Boolean(value);
      },
      valueUpdated(value) {
        this._updateValue(value);
        this.$emit('input', value);
      },
      focusUpdated(focus, value) {
        this.$emit(focus, value);
        this.focused = !this.focused;
      },
      focus() {
        this.$refs.input.focus();
      }
    },
    mounted() {
      this._updateValue(this.value);
    },
    data() {
      return {isEmpty: true, focused: false, inputValue: this.value};
    }
  }
</script>

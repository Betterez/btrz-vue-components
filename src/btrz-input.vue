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
      :value="value"
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
      placeholder: {type: String},
      type: {type: String},
      name: {type: String},
      value: {type: String},
      id: {type: String},
      label: {type: String},
      errors: {type: String},
      prefix: {type: String},
      postfix: {type: String},
      disabled: {type: Boolean}
    },
    computed: {
      hasError: {
        get() { return this.errors && this.errors.length > 0 }
      },
      isEmpty: {
        get() {
          return !Boolean(this.value);
        }
      }
    },
    methods: {
      valueUpdated(value) {
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
    data() {
      return {focused: false};
    }
  }
</script>

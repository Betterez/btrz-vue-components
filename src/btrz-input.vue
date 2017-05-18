<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <div class="input-group">
      <span v-if="prefix" class="input-group-addon">{{prefix}}</span>
      <input class="form-control"
      :id="id"
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
    props: ["placeholder", "type", "name", "value", "id", "label", "errors", "prefix", "postfix"],
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

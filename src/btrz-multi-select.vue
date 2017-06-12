<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty,
      'bz-has-error': hasError
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <select
      ref="multiselect"
      multiple
      class="form-control"
      rows="4"
      :id="id"
      @input="valueUpdated($event.target.value);"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);">
      <option v-for="option in options" v-bind:value="option.key">{{option.value}}</option>
    </select>
    <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>
  import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
  import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";
  export default {
    name: "BtrzMultiSelect",
    components:{
      BtrzLabel,
      BtrzErrors
    },
    props: {
      id: { type: String },
      label: { type: String },
      errors: { type: Object },
      options: { type: Object },
      value: { type: Array }
    },
    computed: {
      hasError: {
        get() { return this.errors && this.errors.length > 0 }
      },
      isEmpty: {
        get() {
          return this.value.length === 0;
        }
      }
    },
    mounted() {
      for (var i = 0; i < this.value.length; i++) {
        this.$refs.multiselect.options[this.value[i]].selected = true;
      }
    },
    methods: {
      cleanSelecteds() {
        for (let i = 0; i< this.$refs.multiselect.options.length; i++) {
          this.$refs.multiselect.options[i].selected = false;
        }
      },
      valueUpdated(value) {
        this.value = [];
        for (let i = 0; i< this.$refs.multiselect.options.length; i++) {
          if (this.$refs.multiselect.options[i].selected) {
            this.value.push(this.$refs.multiselect.options[i].value);
          }
        }
        this.$emit('input', this.value);
      },
      focusUpdated(focus, value) {
        this.$emit(focus, value);
        this.focused = !this.focused;
      },
      focus() {
        this.$refs.multiselect.focus();
      }
    },
    data() {
      return {
        focused: false
      };
    }
  }
</script>

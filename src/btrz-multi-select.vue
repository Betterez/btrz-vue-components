<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty,
      'bz-has-error': hasError
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <select multiple :disabled="!selectEnabled" class="form-control" rows="4" :id="id"
      v-model="selectedOptions"
      @input="valueUpdated($event.target.value);"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);">
      <option v-for="option in optionsData" :value="option.key" :selected="option.selected">{{option.value}}</option>
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
    props: ["id", "label", "errors", "options"],
    computed: {
      selectEnabled: {
        get() {
          if (this.options && this.options.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      hasError: {
        get() { return this.errors && this.errors.length > 0 }
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
    mounted() {
      var options = [];
      this.optionsData.forEach(function(option){
        if(option.selected == true) {
          options.push(option.key);
        }
      });
      this.selectedOptions = options;
    },
    data() {
      return {isEmpty: true, focused: false, inputValue: this.value, optionsData: this.options, selectedOptions: ''};
    }
  }
</script>

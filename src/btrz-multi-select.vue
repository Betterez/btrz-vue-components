<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty,
      'bz-has-error': hasError
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <select
      multiple
      :disabled="!selectEnabled"
      class="form-control"
      rows="4"
      :id="id"
      v-model="selectedOptions"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);">
      <option v-for="option in value" :value="option.key" :selected="option.selected">{{option.value}}</option>
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
      value: { type: Object }
    },
    computed: {
      selectEnabled: {
        get() {
          if (this.value && this.value.length > 0) {
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
    watch: {
      selectedOptions(newValue) {
        this.value.forEach(function(element) {
          element.selected = false;
        });
        newValue.forEach((element) => {
          this.value[element].selected = true;
        });
      }
    },
    mounted() {
      var options = [];
      this.value.forEach(function(option){
        if(option.selected == true) {
          options.push(option.key);
        }
      });
      this.selectedOptions = options;
    },
    methods: {
      focusUpdated(focus, value) {
        this.$emit(focus, value);
        this.focused = !this.focused;
      },
      focus() {
        this.$refs.input.focus();
      }
    },
    data() {
      return {isEmpty: true, focused: false, selectedOptions: []};
    }
  }
</script>

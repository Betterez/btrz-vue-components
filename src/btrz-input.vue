<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty,
      'bz-has-error': hasError
    }" :aria-describedby="ariaDescribedby">
    <btrz-label :id="id" :label="label" :aria-label="ariaLabel"></btrz-label>
    <div class="input-group">
      <span v-if="prefix" class="input-group-addon">{{prefix}}</span>
      <input class="form-control"
      :class="{'text-right': textAlign==='right', 'text-center': textAlign==='center'}"
      ref="input"
      :id="id"
      :disabled="disabled"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :label="label"
      :aria-describedby="ariaDescribedby"      
      :min="min"
      :max="max"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      @input="valueUpdated($event.target.value);"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);"/>
      <span v-if="postfix" class="input-group-addon">{{postfix}}</span>
    </div>
    <btrz-help-text v-if="helptext && !errors" :text="helptext"></btrz-help-text>
    <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>
  import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
  import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";
  import BtrzHelpText from "../../btrz-vue-components/src/btrz-help-text";
  export default {
    name: "BtrzInput",
    token: "<btrz-input class=\"form-group\" id=\"myId\" name=\"nameName\" value=\"myValue\" label=\"myLabel\"></btrz-input>",
    description: "This is a very basic but versatil input.",
    components:{
      BtrzLabel,
      BtrzErrors,
      BtrzHelpText
    },
    props: {
      placeholder: {
        type: String,
        note: "A placeholder to show when the input is empty."
      },
      type: {
        type: String,
        default: 'text',
        note: "The HTML input type. (text, number, email, etc)"
      },
      name: {
        type: String,
        note: "The name the input will have."
      },
      value: {
        type: String,
        note: "Starting value for the component."
      },
      id: {
        type: String,
        note: "Id for the component, is used for the label 'for' attr."
      },
      label: {
        type: String,
        note: "A label to be appended after the input."
      },
      ariaLabel: {
        type: String
      },
      ariaDescribedby: {
        type: String
      }, 
      errors: {
        type: Array,
        note: "List of errors to display."
      },
      prefix: {
        type: String,
        note: "This can be used to display something before the input."
      },
      postfix: {
        type: String,
        note: "This can be used to display something after the input."
      },
      disabled: {
        type: Boolean,
        default: false,
        note: "This is the disabled/enabled property of the input."
      },
      textAlign: {
        type: String,
        default: 'left',
        note: 'This add a class to the input to change the alignment of the input content.'
      },
      min: {
        type: Number,
        note: 'This is the minimum amount for the input'
      },
      max: {
        type: Number,
        note: 'This is the maximum amount for the input'
      },
      maxlength: {
        type: String,
        note: "Max length native attrs for the input"
      },
      autocomplete: {
        type: String
      },
      helptext: {
        type: String,
        note: "Text to show in a help-block span." 
      }
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

<style scoped>
  .text-right{
    text-align: right;
  }
  .text-center{
    text-align: center;
  }
</style>

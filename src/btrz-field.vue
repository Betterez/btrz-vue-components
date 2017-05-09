<template>
  <div
    class="clearfix form-group"
    :class="{
        'input--focused': focused,
        'input--empty': isEmpty,
        'input--filled': !isEmpty
      }">
    <label :for="id" v-if="label && label.length > 0">{{label}}:</label>
    <label :for="id" v-if="!label">&nbsp;</label>

    <component v-bind:is="content" :name="name" :type="type" :value="value" :id="id" @input="change(this.value)" @blur="blur()" @focus="focus()">
    </component>

    <div v-if="errors" class="errors">
      <div v-for="error in errors" class="error">
        {{error.message}}
      </div>
    </div>
  </div>
</template>

<script>
import BtrzInput from "../src/btrz-input";
import BtrzToggle from "../src/btrz-toggle";

  export default {
    name: "BtrzField",
    components: {
      BtrzInput,
      BtrzToggle
    },
    props: {
      id: {
        type: String
      },
      type: {
        type: String
      },
      label: {
        type: String
      },
      name: {
        type: String
      },
      value : {
        type: String
      },
      errors: {
        type: Object
      },
      checked: {
        type: Boolean
      },
      content: {
        type: String
      }
    },
    methods: {
      change(value) {
        this.isEmpty = !Boolean(value);
      },
      focus() {
        this.focused = true;
      },
      blur() {
        this.focused = false;
      }
    },
    created() {
      this.change(this.value);
    },
    data() {
      return {
        focused: false,
        isEmpty: false
      }
    }
  }
</script>

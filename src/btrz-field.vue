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

    <btrz-input v-if="type === 'text'"
      v-model="inputData"
      @input="change(inputData)"
      @blur="blur()"
      @focus="focus()"
      :id="id"
      :name="name"
      type="text"
      :value="value">
    </btrz-input>

    <btrz-toggle v-if="type === 'toggle'"
      :checked="checked"
      :id="id"
      :name="name">
    </btrz-toggle>

    <div v-if="errors" class="errors">
      <div v-for="error in errors" class="error">
        {{error.message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzField",
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

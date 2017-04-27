<template>
  <div class="clearfix form-group" :class="{'input--focused': focused, 'input--empty': isEmpty, 'input--filled': !isEmpty}">
    <label :for="this.name">{{label}}</label>
    <btrz-input
      @focus="focused = true; isEmpty;"
      @blur="focused = false;"
      class="form-control"
      v-model="inputData"
      type="text"
      :name="this.name"
      :id="this.name"
      :placeholder="this.placeholder">
    </btrz-input>
    <div v-show="this.$error" class="error">Error message</div>
  </div>
</template>

<script>
  import BtrzInput from "/home/smarbos/camba/betterez/btrz-vue-components/src/btrz-input.vue";
  export default {
    name: "BtrzInputField",
    props: ['name', 'label', 'value', 'placeholder'],
    components: {
      BtrzInput
    },
    computed: {
      isEmpty: function() {
        return !Boolean(this.inputData);
      }
    },
    data() {
      return {
        focused: false,
        inputData: this.value || ''
      }
    }
  }
</script>

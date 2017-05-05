<template>
  <div
    class="clearfix form-group"
    :class="{
        'input--focused': focused,
        'input--empty': isEmpty,
        'input--filled': !isEmpty
      }">
      <label :for="id">
        <span v-if="label && label.length > 0">{{label}}:</span>
        <span v-if="!label">&nbsp;</span>
      </label>
    <slot></slot>
    <div>
      <div class="error">
        ERRORS
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzField",
    props: {
      label: {
        type: String
      }
    },
    mounted() {
      console.log(this)
      try {
        this.id = this.$children[0].$options.propsData.id;
      }
      catch(err) {
        this.id = null;
        console.loh(err)
      }
      this.change(this.value);
      this.$on('change', function(value) {
        this.change(value);
      })
      this.$on('focus', function(){
        this.focus();
      });
      this.$on('blur', function(){
        this.blur();
      })
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
    data() {
      return {
        focused: false,
        isEmpty: false
      }
    }
  }
</script>

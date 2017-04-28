<template>
  <div
    class="clearfix form-group"
    :class="{
        'input--focused': focused,
        'input--empty': isEmpty,
        'input--filled': !isEmpty
      }">
    <slot :props="getProps()"></slot>
  </div>
</template>

<script>
  export default {
    name: "BtrzField",
    props: ["name", "type", "value", "props"],
    created() {
      this.$on('childValueUpdated', function(value) {
        this.checkIfEmpty(value);
      })
      this.$on('childOnFocus', function(){
        this.childIsOnFocus();
      });
      this.$on('childOutOfFocus', function(){
        this.childIsOutOfFocus();
      })
    },
    methods: {
      checkIfEmpty(value) {
        this.isEmpty = !Boolean(value);
      },
      getProps() {
        return this._props;
      },
      childIsOnFocus() {
        this.focused = true;
      },
      childIsOutOfFocus() {
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

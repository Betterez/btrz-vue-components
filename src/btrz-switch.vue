<template>
  <div class="btn-group toggle-wrapper" role="group">
    <div v-bind:class="{selected: this.selected === this.onValue, first: true}" v-on:click="handleClick(onValue)">
      {{ onText }}
    </div>
    <div v-bind:class="{selected: this.selected === this.offValue, second: true}" v-on:click="handleClick(offValue)">
      {{ offText }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzSwitch",
    props: ["selectedValue", "onValue", "onText", "offValue", "offText"],
    model: {
      prop: "selectedValue",
      event: "change"
    },
    methods: {
      handleClick (val) {
        this.selected = val;
        this.$emit("change", val);
      }
    },
    data: function () {
      return {selected: this.selectedValue};
    }
  }
</script>

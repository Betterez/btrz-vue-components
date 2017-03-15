<template>
  <div class="btn-group toggle-wrapper" role="group">
    <div v-bind:class="{selected: this.selected === this.onValue}"
         v-on:click="change(onValue)">
      {{ onText }}
    </div>
    <div v-bind:class="{selected: this.selected === this.offValue}"
         v-on:click="change(offValue)">
      {{ offText }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzSwitch",
    props: ["selectedValue", "onValue", "onText", "offValue", "offText"],
    model: {
      prop: 'selectedValue',
      event: 'change'
    },
    methods: {
      change (val) {
        this.selected = val;
        this.$emit("change", val);
      }
    },
    data: function () {
      return {selected: this.selectedValue};
    }
  }
</script>

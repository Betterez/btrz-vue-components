<template>
  <div class="container products-section">
    <div class="container col-xs-12 ">
      <div class="row">
        <div v-for="item in items" v-bind:class="'col-xs-12 col-sm-6 ' + colSpan">
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzGrid",
    props: ["items"],
    computed: {
      colSpan() {
        return this.items.length === 2 || this.items.length === 4 ? "" : "col-md-4";
      },
    }
  }
</script>

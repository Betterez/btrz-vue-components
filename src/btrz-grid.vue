<template>
  <div>
    <div v-for="item in items" :class="itemClass ? itemClass : 'col-xs-12 col-sm-6 ' + colSpan">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzGrid",
    props: ["items", "itemClass"],
    computed: {
      colSpan() {
        return this.items.length === 2 || this.items.length === 4 ? "" : "col-md-4";
      },
    }
  }
</script>

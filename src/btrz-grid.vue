<template>
  <div>
    <div v-if="this.$slots.first" :class="itemClass ? itemClass : 'col-xs-12 col-sm-6 ' + colSpan">
      <slot name="first"></slot>
    </div>
    <div v-for="(item, index) in items" :class="itemClass ? itemClass : 'col-xs-12 col-sm-6 ' + colSpan">
      <slot :item="item" :index="index"></slot>
    </div>
    <div v-if="this.$slots.last" :class="itemClass ? itemClass : 'col-xs-12 col-sm-6 ' + colSpan">
      <slot name="last"></slot>
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
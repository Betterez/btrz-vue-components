<template>
  <a v-bind:href="'./products/' + product._id" class="ellipsis btn btn-lg btn-default btn-block btn-product">
    <i v-bind:class="'fa ' + icon"></i> {{ product.name }}
    <p class="ellipsis hidden-xs">{{ product.description }}</p>
  </a>
</template>

<script>
export default {
  name: "BtrzProductItem",
  props: ["product"],
  computed: {
    icon() {
      return this.product.icon || "fa-ticket";
    }
  }
};
</script>

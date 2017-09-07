<template>
  <a v-on:click="propagateEvent" :href="`${baseUrl}/${product.family}/${product._id}`" class="ellipsis btn btn-lg btn-default btn-block btn-product">
    <i :class="`fa ${icon}`"></i> {{ $t(product.lexiconKeys.name) || product.name }}
    <p class="ellipsis hidden-xs">{{ $t(product.lexiconKeys.description) || product.description }}</p>
  </a>
</template>

<script>
export default {
  name: "BtrzProductCard",
  props: ["product", "baseUrl"],
  methods: {
    propagateEvent($event) {
      this.$emit("click", $event);
    }
  },
  computed: {
    icon() {
      return this.product.icon || "fa-ticket";
    }
  }
};
</script>
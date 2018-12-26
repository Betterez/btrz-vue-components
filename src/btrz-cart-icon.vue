<template>
  <div v-if="cartId && qty > 0" class="flex-item user-nav cart-box">
    <a class="ml-10 cart-link" @click="cartClicked">
      <span>({{qty}})</span>
      <i class="fa fa-lg fa-shopping-cart"></i>
    </a>
  </div>
</template>

<script>
  //usage: <btrz-cart-icon :cartUrl="/cart2/accId/cart" :cartId="cartId" :qty="cartQty"></btrz-cart-icon>
  export default {
    name: "BtrzCartIcon",
    props: ["cartUrl", "cartId", "qty"],
    methods: {
      cartClicked() {
        this.$emit('click', `${this.cartUrl}/${this.cartId}`);
      }
    }
  };
</script>

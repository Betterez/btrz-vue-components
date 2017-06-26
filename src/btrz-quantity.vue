<template>
  <div tabindex="0" class="fare-item" :class="{'input--focused': focused}" @focus="switchFocus()" @blur="switchFocus()" @keydown.up="increment($event)"
  @keydown.down="decrement($event)">
    <div class="fare-detail flex-container">
      <button tabindex="-1" class="minus-icon flex-item" type="button" @click="decrement()" >
        <i class="fa fa-minus-square-o"></i>
      </button>
      <div class="fare-title  flex-item">
        {{quantity}}
        <input type="text" v-model="quantity" :name="name" hidden/>
        {{ title }}
        <div class="fare-description">{{description}}</div>
      </div>
      <button tabindex="-1" class="plus-icon flex-item" type="button" @click="increment()">
        <i class="fa fa-plus-square-o"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzQuantity",
    props: {
      id: {type: String},
      name: {type: String},
      title: {type: String},
      description: {type: String},
      max: {type: Number, required: true},
      min: {type: Number, "default": 0},
      initialValue: {type: Number, "default": 0}
    },
    data() {
      return {
        "quantity": this.initialValue, "focused":false
      };
    },
    methods: {
      switchFocus() {
        this.focused = !this.focused;
      },
      increment(e) {
        if (e) { e.preventDefault(); }
        if (this.quantity < this.max) {
          this.quantity++;
          this.$emit("quantityChanged", {id: this.id, quantity: this.quantity});
        }
      },
      decrement(e) {
        if (e) { e.preventDefault(); }
        if (this.quantity > this.min) {
          this.quantity--;
          this.$emit("quantityChanged", {id: this.id, quantity: this.quantity});
        }
      }
    },
  };
</script>

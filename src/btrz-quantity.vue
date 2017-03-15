<template>
  <div class="fare-item">
    <div class="fare-detail flex-container">
      <button class="minus-icon flex-item" type="button" @click="decrement()" >
        <i class="fa fa-minus-square-o"></i>
      </button>
      <div class="fare-title  flex-item">
        <input type="text" v-model="quantity" :name="name" readonly/>
        {{ name }}
        <div class="fare-description">{{description}}</div>
      </div>
      <button class="plus-icon flex-item" type="button" @click="increment()">
        <i class="fa fa-plus-square-o"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzQuantity",
    props: {
      name: {
        type: String
      },
      id: {
        type: String
      },
      description: {
        type: String
      },
      max: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        "default": 0
      },
      initialValue: {
        type: Number,
        "default": 0
      }
    },

    data() {
      return {
        "quantity": this.initialValue
      };
    },

    methods: {
      increment() {
        if (this.quantity < this.max) {
          this.quantity++;
          this.$emit("quantityChanged", {id: this.id, quantity: this.quantity});
        }
      },

      decrement() {
        if (this.quantity > this.min) {
          this.quantity--;
          this.$emit("quantityChanged", {id: this.id, quantity: this.quantity});
        }
      }

    }
  };
</script>

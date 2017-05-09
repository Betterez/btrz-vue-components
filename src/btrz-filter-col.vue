<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BtrzFilterCol",
    props: {
      colsize: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      colClass: function() {
        var colClass = "";
        for (var i = 0; i < this.colsize.length; i++) {
          colClass += "col-"+this.colsize[i];
          if(i <= this.colsize.length-1){
            colClass += " ";
          }
        }
        return colClass;
      }
    }
  }
</script>

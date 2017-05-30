<template>
  <modal class="btrz-alert" :value="opened" :title="message" @input="$emit('change', false)">
    <div slot="footer">
      <div class="col-xs-6 col-xs-offset-3">
        <a class="btn btn-lg btn-default btn-block" @click="closeModal">{{ $t("Close") }}</a>
      </div>
    </div>
  </modal>
</template>

<script>
  import {Modal} from "uiv";

  export default {
    name: "BtrzAlert",
    components: {
      Modal
    },
    model: {
      prop: "opened",
      event: "change"
    },
    props: {
      message: {type: String, required: true},
      opened: {required: true, type: Boolean, default: false}
    },
    methods: {
      closeModal() {
        this.$emit("change", false);
      }
    }
  };
</script>


<style>
  .btrz-alert .modal-body {
    display: none;
  }

  .btrz-alert .modal-title {
    text-align: center;
    text-shadow: none;
    font-size: 20px;
  }
</style>

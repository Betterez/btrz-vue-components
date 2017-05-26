<template>
  <modal :ok-text="$t('close')" :value="opened" effect="fade" @ok="closeModal" @cancel="closeModal">
    <div slot="modal-header" class="modal-header text-center">
      {{ message }}
    </div>
    <template slot="modal-body">
    </template>
    <div slot="modal-footer" class="modal-footer">
      <div class="col-xs-6 col-xs-offset-3">
        <a class="btn btn-lg btn-default btn-block" @click="closeModal">{{ $t("Close") }}</a>
      </div>
    </div>
  </modal>
</template>

<script>
  import Modal from "vue-strap/src/Modal";

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
      opened: {type: Boolean, default: false}
    },
    methods: {
      closeModal() {
        this.$emit("change", false);
        this.opened = false;
      }
    }
  };
</script>

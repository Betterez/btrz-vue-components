<template>
  <div class="row">
    <div class="col-xs-6">
      <btrz-date-input class="form-group" ref="startDate" v-model="startModel" @change="startDateUpdated()" :id="id + '_' + startDateName" :name="startDateName" :label="startDateLabel" :lang="lang" :submitFormat="submitFormat"></btrz-date-input>
    </div>
    <div class="col-xs-6">
      <btrz-date-input class="form-group" ref="endDate" v-model="endModel" :disabled="endDateDisabled" :minDate="endDateMinValue" :id="id + '_' + startDateName" :name="endDateName" :label="endDateLabel" :lang="lang" :submitFormat="submitFormat"></btrz-date-input>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import BtrzDateInput from "../../btrz-vue-components/src/btrz-date-input";

  export default {
    name: "BtrzDateRange",
    components: {
      BtrzDateInput
    },
    props: {
      id: {type: String},
      name: {type: String},
      startDateName: {type: String},
      startDateLabel: {type: String},
      endDateName: {type: String},
      endDateLabel: {type: String},
      "value": {"default": null},
      // value: Supports setting Date, [YEAR, MONTH, DAY], timestamp (int) or string matching submitFormat
      displayFormat: {type: String, "default": "dd mmmm, yyyy"}, // Pickadate format
      submitFormat: {type: String, "default": "YYYY-MM-DD"}, // Momentjs format
      minDate: {"default": false},
      lang: {type: String, required: true},
      errors: {type: Object},
      label: {type: String}
    },
    model: {
      prop: "value",
      event: "change"
    },
    methods: {
      startDateUpdated() {
        this.endDateMinValue = this.startModel;
        this.$refs.endDate.value = null;
        this.$refs.endDate.isEmpty = true;
        if (this.startModel != null)  this.endDateDisabled = false; else this.endDateDisabled = true;
      }
    },
    data() {
      return {endDateDisabled:true, endDateMinValue: null}
    }
  };

</script>

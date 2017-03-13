<template>
  <div>
    <div class="col-xs-12 fares-options">
      <label class="hidden-xs" t="whoIsTravelling">Select who is travelling?</label>
    </div>
    <div v-bind:class="{ 'error-container': totalPassengers == 0 }">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <!-- Warning: Custom events can only be catched in the component definition -->
        <btrz-fare-item v-for="(fare, index) in fares"
                        @incremented="incrementCounter"
                        @decremented="decrementCounter"
                        :name="fare.name"
                        :description="fare.description"
                        :max="maxQty"
                        :min="fare.minimumValue"
                        :initialValue="fare.defaultQty">
        </btrz-fare-item>
      </div>
      <div class="col-xs-12 mt5 container">
        <div class=" error hidden">${'pleaseSelectAFare' & t}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BtrzFareItem from "btrz-vue-components/src/btrz-fare-item";

  export default {
    name: "BtrzFareChooser",
    components: {BtrzFareItem},
    data() {
      return {
        isValid: true,
        totalPassengers: 1,
        // Sample data
        maxQty: 10,
        // Sample data
        fares: [
          {
            name: "Adult",
            indexableName: "adult",
            defaultQty: 1,
            minimumValue: 0,
            description: "12 and over"
          },
          {
            name: "Child",
            indexableName: "child",
            defaultQty: 0,
            minimumValue: 0,
            description: "11 years and under"
          }
        ]
      };
    },
    methods: {
      incrementCounter() {
        this.totalPassengers++;
      },
      decrementCounter() {
        this.totalPassengers--;
      }
    }
  };
</script>

import "./setup";

import { expect } from "chai";
import { mountComponent, insertHTML } from "./utils";
import BtrzSwitch from "../src/btrz-switch";


describe("BtrzSwitch", () => {

  it("should emit change event with new selected value", (done) => {
    let component = mountComponent(BtrzSwitch, {});

    component.$on('change', function (val) {
      expect(val).to.equal("newval");
      done();
    });

    component.change("newval");
  });

  it("should render initial selected option", () => {
    insertHTML(`<div id="app">
                  <btrz-switch
                    :on-value="'oneway'" :on-text="'One Way!'"
                    :off-value="'roundtrip'" :off-text="'Round Trip!'"
                    v-model="tripType">
                  </btrz-switch>
                </div>`);

    let v = new Vue({
      el: '#app',
      components: { BtrzSwitch },
      data: {tripType: "roundtrip"}
    });

    expect($(".selected").text()).to.include("Round Trip!");
  });

  it.only("should update selected option", (done) => {
    insertHTML(`<div id="app">
                  <btrz-switch
                    :on-value="'oneway'" :on-text="'One Way!'"
                    :off-value="'roundtrip'" :off-text="'Round Trip!'"
                    v-model="tripType">
                  </btrz-switch>
                </div>`);

    let v = new Vue({
      el: '#app',
      components: { BtrzSwitch },
      data: {tripType: "roundtrip"}
    });

    expect($(".selected").text()).to.include("Round Trip!");

console.log("v.tripType", v.tripType);
    v.tripType = "oneway";
console.log("v.tripType", v.tripType);

    v.$nextTick(function () {

      console.log(this.$el.innerHTML);

      expect($(".selected").text()).to.include("One Way!");
      done();
    });
  });

});

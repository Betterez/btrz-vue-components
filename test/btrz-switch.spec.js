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

    let vm = new Vue({
      el: '#app',
      components: { BtrzSwitch },
      data: {tripType: "roundtrip"}
    });

    const DEFAULT_PROPS = {
      onValue: "oneway",
      onText: "One Way!",
      offValue: "roundtrip",
      offText: "Round Trip!",
      selectedValue: "roundtrip"
    };

    mountComponent(BtrzSwitch, DEFAULT_PROPS);

    expect($(vm.$el).find(".selected").text()).to.include("Round Trip!");
  });

  it("should update selected option", (done) => {
    const DEFAULT_PROPS = {
      onValue: "oneway",
      onText: "One Way!",
      offValue: "roundtrip",
      offText: "Round Trip!",
      selectedValue: "roundtrip"
    };

    const vm = mountComponent(BtrzSwitch, DEFAULT_PROPS);

    expect($(vm.$el).find(".selected")
           .text().trim()).to.equal("Round Trip!");

    vm.selected = "oneway";

    vm.$nextTick(() => {
      expect($(vm.$el).find(".selected")
             .text().trim()).to.equal("One Way!");
      done();
    });
  });

});

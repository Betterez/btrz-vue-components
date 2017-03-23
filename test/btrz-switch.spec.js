import "./setup";

import {expect} from "chai";
import {mountComponent, insertHTML} from "./utils";
import BtrzSwitch from "../src/btrz-switch";


describe("BtrzSwitch", () => {
  it("should emit change event with new selected value", (done) => {
    const vm = mountComponent(BtrzSwitch, {});

    vm.$on("change", function (val) {
      expect(val).to.equal("newVal");
      done();
    });

    vm.handleClick("newVal");
  });

  it("should render initial selected option", () => {
    insertHTML(`<div id="app">
                  <btrz-switch
                    :on-value="'oneway'" :on-text="'One Way!'"
                    :off-value="'roundtrip'" :off-text="'Round Trip!'"
                    v-model="tripType">
                  </btrz-switch>
                </div>`);

    const vm = new Vue({
        el: "#app",
        components: {BtrzSwitch},
        data: {tripType: "roundtrip"}
      }),
      DEFAULT_PROPS = {
        onValue: "oneway",
        onText: "One Way!",
        offValue: "roundtrip",
        offText: "Round Trip!",
        selectedValue: "roundtrip"
      };

    mountComponent(BtrzSwitch, DEFAULT_PROPS);

    expect($(vm.$el).find(".selected")
      .text()).to.include("Round Trip!");
  });

  it("should update selected when first button is clicked", (done) => {
    const DEFAULT_PROPS = {
        onValue: "oneway",
        onText: "One Way!",
        offValue: "roundtrip",
        offText: "Round Trip!",
        selectedValue: "roundtrip"
      },
      vm = mountComponent(BtrzSwitch, DEFAULT_PROPS);

    expect($(vm.$el).find(".selected")
      .text()
      .trim()).to.equal("Round Trip!");

    $(vm.$el).find(".first").click();

    vm.$nextTick(() => {
      expect($(vm.$el).find(".selected")
        .text()
        .trim()).to.equal("One Way!");
      done();
    });
  });


  it("should update selected when second button is clicked", (done) => {
    const DEFAULT_PROPS = {
        onValue: "oneway",
        onText: "One Way!",
        offValue: "roundtrip",
        offText: "Round Trip!",
        selectedValue: "oneway"
      },
      vm = mountComponent(BtrzSwitch, DEFAULT_PROPS);

    expect($(vm.$el).find(".selected")
      .text()
      .trim()).to.equal("One Way!");

    $(vm.$el).find(".second").click();

    vm.$nextTick(() => {
      expect($(vm.$el).find(".selected")
        .text()
        .trim()).to.equal("Round Trip!");
      done();
    });
  });
});

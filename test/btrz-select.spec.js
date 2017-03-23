import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzSelect from "../src/btrz-select";

describe("BtrzSelect", () => {
  it("should select the default value", () => {
    const EXPECTED_VALUE = "default_value",
      vm = mountComponent(BtrzSelect, {
        selectedValue: EXPECTED_VALUE
      });

    expect(vm.selected).to.equal(EXPECTED_VALUE);
  });

  it("should render the default value empty if not specified", () => {
    const EXPECTED_DEFAULT = "",
      vm = mountComponent(BtrzSelect),
      optionEl = $(vm.$el).find("option[value='']");

    expect(optionEl.text()).to.equal(EXPECTED_DEFAULT);
  });

  it("should render the disabled if specified", () => {
    const vm = mountComponent(BtrzSelect, {
      disabled: true
    });

    expect($(vm.$el).attr("disabled")).to.be.eql("disabled");
  });

  it("should render the default option", () => {
    const DEFAULT_OPTION = {text: "All", value: "all"},
      vm = mountComponent(BtrzSelect, {defaultOption: DEFAULT_OPTION}),
      optionsEl = $(vm.$el).find("option"),
      availableOptions = optionsEl.map((idx, option) => {
        return {text: option.text.trim(), value: option.value.trim()};
      }).toArray();

    expect(availableOptions.length).to.be.eql(1);
    expect(availableOptions[0]).to.deep.equal(DEFAULT_OPTION);
  });

  it("should render the given options", () => {
    const EXPECTED_OPTIONS = [
        {text: "option1", value: "value1"},
        {text: "option2", value: "value2"},
        {text: "option3", value: "value3"}
      ],
      vm = mountComponent(BtrzSelect, {options: EXPECTED_OPTIONS}),
      optionsEl = $(vm.$el).find("option"),
      availableOptions = optionsEl.map((idx, option) => {
        return {text: option.text.trim(), value: option.value.trim()};
      }).toArray();

    expect(availableOptions).to.deep.equal(EXPECTED_OPTIONS);
  });

  it("should emit change event with new selected value", (done) => {
    const EXPECTED_SELECTION = "newVal",
      vm = mountComponent(BtrzSelect);

    vm.$on("change", (val) => {
      expect(val).to.equal(EXPECTED_SELECTION);
      done();
    });

    vm.propagateChange(EXPECTED_SELECTION);
  });
});

import "./setup";

import {expect} from "chai";
import {mountComponent, insertHTML} from "./utils";
import BtrzSelect from "../src/btrz-select";

describe("BtrzSelect", () => {
  it("should select the default value", () => {
    const EXPECTED_VALUE = "default_value";
    const vm = mountComponent(BtrzSelect, {
      selectedValue: EXPECTED_VALUE,
      options: [{text: "test description", value: "default_value"}]
    });

    expect(vm.selected).to.equal(EXPECTED_VALUE);
  });

  it("should render the default value empty if not specified", () => {
    const EXPECTED_DEFAULT = "";

    const vm = mountComponent(BtrzSelect);

    const optionEl = $(vm.$el).find("option[value='']");
    // eslint-disable-next-line no-unused-expressions
    expect(optionEl).to.be.ok;
    expect(optionEl.text()).to.equal(EXPECTED_DEFAULT);
  });

  it("should render the placeholder when no option is selected", () => {
    const EXPECTED_PLACEHOLDER = "test placeholder";

    const vm = mountComponent(BtrzSelect, {
      placeholder: EXPECTED_PLACEHOLDER
    });

    const optionEl = $(vm.$el).find("option[value='']");
    // eslint-disable-next-line no-unused-expressions
    expect(optionEl).to.be.ok;
    expect(optionEl.text()).to.equal(EXPECTED_PLACEHOLDER);
  });

  it("should render the given options", () => {
    const EXPECTED_OPTIONS = [
      {text: "", value: ""},
      {text: "option1", value: "value1"},
      {text: "option2", value: "value2"},
      {text: "option3", value: "value3"}
    ];

    const vm = mountComponent(BtrzSelect, {options: EXPECTED_OPTIONS.slice(1)});
    // eslint-disable-next-line no-unused-expressions
    const optionsEl = $(vm.$el).find("option");

    expect(optionsEl).to.be.ok;

    let availableOptions = optionsEl.map((idx, option) => {
      return {text: option.text.trim(), value: option.value.trim()};
    });

    availableOptions = availableOptions.toArray();
    expect(availableOptions).to.deep.equal(EXPECTED_OPTIONS);
  });

  it("should emit change event with new selected value", (done) => {
    const component = mountComponent(BtrzSelect);

    component.$on("change", (val) => {
      expect(val).to.equal("newval");
      done();
    });

    component.selected = "newval";
    component.change();
  });
});

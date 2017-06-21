import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzSelect from "../src/btrz-select";

const DUMMY_OPTIONS = [
  {text: "option1", value: "value1"},
  {text: "option2", value: "value2"},
  {text: "option3", value: "value3"}
];

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
      }),
      select = $(vm.$el).find("select");

    expect($(select).attr("disabled")).to.be.eql("disabled");
  });

  it("should render the first option if specified", () => {
    const DEFAULT_OPTION = {text: "All", value: "all"},
      vm = mountComponent(BtrzSelect, {firstOption: DEFAULT_OPTION}),
      optionsEl = $(vm.$el).find("option"),
      availableOptions = optionsEl.map((idx, option) => {
        return {text: option.text.trim(), value: option.value.trim()};
      }).toArray();

    expect(availableOptions.length).to.be.eql(1);
    expect(availableOptions[0]).to.deep.equal(DEFAULT_OPTION);
  });

  it("should render the given options", () => {
    const DUMMY_OPTIONS = [
        {text: "option1", value: "value1"},
        {text: "option2", value: "value2"},
        {text: "option3", value: "value3"}
      ],
      vm = mountComponent(BtrzSelect, {options: DUMMY_OPTIONS}),
      optionsEl = $(vm.$el).find("option"),
      availableOptions = optionsEl.map((idx, option) => {
        return {text: option.text.trim(), value: option.value.trim()};
      }).toArray();

    expect(availableOptions).to.deep.equal(DUMMY_OPTIONS);
  });

  describe("should support v-model binding", () => {
    const V_MODEL_EVENT = "change";
    it("should be configured to emit the defined event", () => {
      expect(BtrzSelect.model.event).to.equal(V_MODEL_EVENT);
    });

    it("should emit change event with new selected value", (done) => {
      const EXPECTED_SELECTION = DUMMY_OPTIONS[1].value;
      const vm = mountComponent(BtrzSelect, {options: DUMMY_OPTIONS});

      vm.$on(V_MODEL_EVENT, (val) => {
        expect(val).to.equal(EXPECTED_SELECTION);
        done();
      });

      vm.propagateChange(EXPECTED_SELECTION);
    });

    it("should update the select value when changed from a parent component.", () => {
      const ParentComponent = {
        name: "TestComponent",
        components: {BtrzSelect},
        template: `
        <div>
          <btrz-select v-model="selectedValue" :options="options">
          </btrz-select>
        </div>`,
        data() {
          return {
            selectedValue: DUMMY_OPTIONS[0].value,
            options: DUMMY_OPTIONS
          };
        }
      };

      const parentVm = mountComponent(ParentComponent);
      const selectEl = $(parentVm.$el).find("select");

      parentVm.selectedValue = DUMMY_OPTIONS[2].value;

      parentVm.$nextTick(() => {
        expect(selectEl.val()).to.equal(DUMMY_OPTIONS[2].value);
      });
    });
  });

  describe("hasTextAndValue", () => {
    it("should correctly validate option list when it contains value and text keys", () => {
      expect(BtrzSelect.methods.hasTextAndValue(DUMMY_OPTIONS)).to.equal(true);
    });

    it("should not validate if the option list not contains text", () => {
      const actual = BtrzSelect.methods.hasTextAndValue([
        {value: "test value", text: "test text"},
        {value: "test value2", otherKey: "test key"}
      ]);

      expect(actual).to.equal(false);
    });

    it("should not validate if the option list not contains value", () => {
      const actual = BtrzSelect.methods.hasTextAndValue([
        {text: "test1", value: "value key"},
        {text: "test2", otherKey: "test key"}
      ]);

      expect(actual).to.equal(false);
    });

    it("should not validate one of the options not contains value and text", () => {
      const actual = BtrzSelect.methods.hasTextAndValue([
        {text: "test1", value: "test key"},
        {otherKey: "test key"}
      ]);

      expect(actual).to.equal(false);
    });
  });
});

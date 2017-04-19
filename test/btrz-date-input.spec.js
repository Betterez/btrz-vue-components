"use strict";
import "./setup";

import {expect} from "chai";
import {mount} from "avoriaz";
import moment from "moment";
import sinon from "sinon";
import BtrzDateInput from "../src/btrz-date-input";
require("imports-loader?define=>false!pickadate/lib/picker.date");

const DEFAULT_SUBMIT_FORMAT = "YYYY-MM-DD";

const dummyLogger = {
  warn() { return null; },
  error() { return null; },
  info() { return null; }
};

describe("BtrzDateInput", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(BtrzDateInput, {data: {logger: dummyLogger}});
  });

  describe("should support v-model binding", () => {
    const V_MODEL_EVENT = "change";

    it("should be configured to emit the defined event", () => {
      expect(BtrzDateInput.model.event).to.equal(V_MODEL_EVENT);
    });

    it("should emit a change event when the date is changed from ui", (done) => {
      const EXPECTED_DATE = moment().format(DEFAULT_SUBMIT_FORMAT);

      wrapper.vm.$once(V_MODEL_EVENT, (newVal) => {
        expect(newVal).to.equal(EXPECTED_DATE);
        done();
      });

      wrapper.vm.picker.set("select", EXPECTED_DATE);
    });

    it("should initialize the specified date from string", () => {
      const expectedDate = new Date();
      wrapper = mount(BtrzDateInput, {propsData: {value: expectedDate}, data: {logger: dummyLogger}});
      const actualDate = wrapper.vm.picker.get("select").obj;
      expect(moment(actualDate).isSame(expectedDate, "days")).to.be.ok;
    });

    it("should update the showed value when the value property change", (done) => {
      const EXPECTED_DATE = new Date();

      wrapper.vm.value = EXPECTED_DATE;
      wrapper.update();

      Vue.nextTick(() => {
        const actualValue = wrapper.vm.picker.get("select", "yyyy-mm-dd");
        expect(actualValue).to.equal(moment(EXPECTED_DATE).format(DEFAULT_SUBMIT_FORMAT));
        done();
      });
    });

  });

  it("should show the datepicker in french if initialized with lang='fr'", () => {
    const EXPECTED_CLEAR_STRING = "Effacer";
    const wrapper = mount(BtrzDateInput, {
      data: {logger: dummyLogger},
      propsData: {lang: "fr"}
    });
    expect(wrapper.vm.picker.component.settings.clear).to.equal(EXPECTED_CLEAR_STRING);
  });

  it("should show the datepicker in french after dinamically changing the lang property", (done) => {
    const EXPECTED_CLEAR_STRING = "Effacer";
    const wrapper = mount(BtrzDateInput, {
      data: {logger: dummyLogger},
      propsData: {lang: "en"}
    });
    expect(wrapper.vm.picker.component.settings.clear).to.equal("Clear");

    wrapper.vm.lang = "fr";
    wrapper.update();
    Vue.nextTick(() => {
      expect(wrapper.vm.picker.component.settings.clear).to.equal(EXPECTED_CLEAR_STRING);
      done();
    });
  });

  it("should emit a warning and fallback to 'en' if the specified language doesn't exists", () => {
    const warnSpy = sinon.spy();
    const wrapper = mount(BtrzDateInput, {
      propsData: {lang: "ja"},
      data: {
        logger: {warn: warnSpy}
      }
    });
    expect(warnSpy).to.have.been.calledOnce;
  });

  it("should disable the component if specified by a property", () => {
    wrapper.vm.disabled = true;
    wrapper.update();
    const pickerInput = wrapper.find("input.form-control")[0];
    expect(pickerInput.hasAttribute("disabled", "disabled")).to.equal(true);
  });

  it("should support setting the value using a formatted string", (done) => {
    const expectedDate = moment();
    wrapper = mount(BtrzDateInput, {
      propsData: {submitFormat: DEFAULT_SUBMIT_FORMAT},
      data: {logger: dummyLogger}
    });

    wrapper.vm.value = expectedDate.format(DEFAULT_SUBMIT_FORMAT);

    Vue.nextTick( () => {
      const actualDate = wrapper.vm.picker.get("select").obj;
      expect(moment(actualDate).isSame(expectedDate, "days")).to.be.ok;
      done();
    });

    wrapper.vm.value = expectedDate.format(DEFAULT_SUBMIT_FORMAT);
  });

  it("should support setting the value using a javascript Date", (done) => {
    const expectedDate = new Date();
    wrapper = mount(BtrzDateInput, {
      propsData: {submitFormat: DEFAULT_SUBMIT_FORMAT},
      data: {logger: dummyLogger}
    });

    wrapper.vm.value = expectedDate;

    Vue.nextTick( () => {
      const actualDate = wrapper.vm.picker.get("select").obj;
      expect(moment(actualDate).isSame(expectedDate, "days")).to.be.ok;
      done();
    });
  });

  it("should support setting the minDate value as formatted string", (done) => {
    const TOMORROW = moment().add(1, "days");
    wrapper.vm.minDate = TOMORROW.format(DEFAULT_SUBMIT_FORMAT);

    Vue.nextTick( () => {
      const actualMin = wrapper.vm.picker.get("min").obj;
      expect(moment(actualMin).isSame(TOMORROW, "days")).to.be.ok;
      done();
    });
  });

  it("should support setting the minDate value as date object", (done) => {
    const TOMORROW = moment().add(1, "days");
    wrapper.vm.minDate = TOMORROW.toDate();

    Vue.nextTick( () => {
      const actualMin = wrapper.vm.picker.get("min").obj;
      expect(moment(actualMin).isSame(TOMORROW, "days")).to.be.ok;
      done();
    });
  });

  it("should support setting the minDate value as date object", (done) => {
    const TODAY = moment();
    wrapper.vm.minDate = true;

    Vue.nextTick( () => {
      const actualMin = wrapper.vm.picker.get("min").obj;
      expect(moment(actualMin).isSame(TODAY, "days")).to.be.ok;
      done();
    });
  });

});

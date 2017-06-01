import "./setup";

import {expect} from "chai";
import { mount } from 'avoriaz';
import BtrzTimeInput from "../src/btrz-time-input";

describe.only("BtrzTimeInput", () => {
  it("Value and Disabled Props values should bind to component.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    expect(wrapper.vm.$props.value).to.equal("13:37");
    expect(wrapper.vm.$props.disabled).to.equal(false);
  });

  it("selectElement method should init null and select hour by default.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    expect(wrapper.vm.selectedElement).to.equal(null);
    wrapper.vm.selectElement();
    expect(wrapper.vm.selectedElement).to.equal('hours');
  });

  it("switchElement method should switch between hours and minutes.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    wrapper.vm.selectElement();
    expect(wrapper.vm.selectedElement).to.equal('hours');
    wrapper.vm.switchElement();
    expect(wrapper.vm.selectedElement).to.equal('minutes');
    wrapper.vm.switchElement();
    expect(wrapper.vm.selectedElement).to.equal('hours');
  });

  it("decreaseElement method should decrease selected value.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    wrapper.vm.selectElement();
    expect(wrapper.vm.getHour()).to.equal(13);
    wrapper.vm.decreaseElement();
    expect(wrapper.vm.getHour()).to.equal(12);
    wrapper.vm.switchElement();
    expect(wrapper.vm.getMinutes()).to.equal(37);
    wrapper.vm.decreaseElement();
    expect(wrapper.vm.getMinutes()).to.equal(36);
  });

  it("increaseElement method should increase selected value.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    wrapper.vm.selectElement();
    expect(wrapper.vm.getHour()).to.equal(13);
    wrapper.vm.increaseElement();
    expect(wrapper.vm.getHour()).to.equal(14);
    wrapper.vm.switchElement();
    expect(wrapper.vm.getMinutes()).to.equal(37);
    wrapper.vm.increaseElement();
    expect(wrapper.vm.getMinutes()).to.equal(38);
  });

  it("increaseElement method should increase selected value.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    wrapper.vm.selectElement();
    expect(wrapper.vm.getHour()).to.equal(13);
    wrapper.vm.increaseElement();
    expect(wrapper.vm.getHour()).to.equal(14);
    wrapper.vm.switchElement();
    expect(wrapper.vm.getMinutes()).to.equal(37);
    wrapper.vm.increaseElement();
    expect(wrapper.vm.getMinutes()).to.equal(38);
  });

  it("getHour method should return selected hour.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    wrapper.vm.selectElement();
    expect(wrapper.vm.getHour()).to.equal(13);
  });

  it("getMinutes method should return selected hour.", () => {
    const wrapper = mount(BtrzTimeInput, {propsData: {value: "13:37", disabled: false}});
    wrapper.vm.selectElement();
    expect(wrapper.vm.getMinutes()).to.equal(37);
  });

  it("Should select Hours or Minutes depending on input's pointer position.", () => {
    const wrapper = mount(BtrzTimeInput, {attachToDocument: true, propsData: {value: "13:37", disabled: false}});
    let event = {
      key: 2,
      preventDefault: () => {console.log("prevented")},
      stopPropagation: () => {console.log("stopPropagation")}
    }
    let input = $("input");
    wrapper.vm.$refs.timepicker.selectionEnd = 0;
    wrapper.vm.$refs.timepicker.selectionStart = 1;
    input.click();
    expect(wrapper.vm.selectedElement).to.equal('hours');
    wrapper.vm.$refs.timepicker.selectionEnd = 4;
    wrapper.vm.$refs.timepicker.selectionStart = 5;
    input.click();
    expect(wrapper.vm.selectedElement).to.equal('minutes');
  });
});

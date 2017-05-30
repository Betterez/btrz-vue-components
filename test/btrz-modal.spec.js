import "./setup";

import {expect} from "chai";
import {mount} from "avoriaz";
import BtrzModal from "../src/btrz-modal";

const propsData = {};
const options = {propsData};

describe("BtrzModal", () => {
  const V_MODEL_EVENT = "input";

  it("should render the modal elements", () => {
    const wrapper = mount(BtrzModal, options);

    const [modal] = wrapper.find("div.modal[role='dialog']");
    expect(modal).to.exist;
    const [dialog] = modal.find("div.modal-dialog[role='document']");
    expect(dialog).to.exist;
    const [header] = dialog.find(".modal-content div.modal-header");
    expect(header).to.exist;
    const [xButton] = header.find("button.close");
    expect(xButton).to.exist;
    const [modalTitle] = header.find("h4.modal-title");
    expect(modalTitle).to.exist;
    const [footer] = dialog.find("div.modal-content div.modal-footer");
    expect(footer).to.exist;
  });

  it("should show the modal when value property set", (done, err) => {
    propsData.opened = false;
    const wrapper = mount(BtrzModal, options);
    wrapper.setProps({value: true});
    Vue.nextTick(() => {
      const [modal] = wrapper.find("div[role='dialog']");
      expect(modal.hasClass("in")).to.be.true;
      done(err);
    });
  });

  it("should emit the change event when the close button is pressed", (done, err) => {
    propsData.value = true;
    const wrapper = mount(BtrzModal, options);

    wrapper.vm.$on(V_MODEL_EVENT, (value) => {
      expect(value).to.be.false;
      done(err);
    });

    Vue.nextTick(() => {
      const [footer] = wrapper.find("div.modal-content div.modal-footer");
      expect(footer).to.exist;
      const [closeBtn] = footer.find("button.btn");
      closeBtn.dispatch("click");
    });
  });

  it("should emit a change event when the 'X' button pressed", (done, err) => {
    propsData.value = true;
    const wrapper = mount(BtrzModal, options);

    wrapper.vm.$on(V_MODEL_EVENT, (value) => {
      expect(value).to.be.false;
      done(err);
    });

    Vue.nextTick(() => {
      const [header] = wrapper.find(".modal-content div.modal-header");
      expect(header).to.exist;
      const [xButton] = header.find("button.close");
      xButton.dispatch("click");
    });
  });

  it("should remove emit a change event when the 'X' button pressed", (done, err) => {
    propsData.value = true;
    const wrapper = mount(BtrzModal, options);

    wrapper.vm.$on(V_MODEL_EVENT, (value) => {
      expect(value).to.be.false;
      done(err);
    });

    Vue.nextTick(() => {
      const [header] = wrapper.find(".modal-content div.modal-header");
      expect(header).to.exist;
      const [xButton] = header.find("button.close");
      xButton.dispatch("click");
    });
  });
});

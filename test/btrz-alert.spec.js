import "./setup";

import {expect} from "chai";
import {mount} from "avoriaz";
import BtrzAlert from "../src/btrz-alert";
import {Modal} from "uiv";

const propsData = {};
const options = {propsData};

describe("BtrzAlert", () => {

  it("should render the modal elements", () => {
    const wrapper = mount(BtrzAlert, options);

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
    const [okButton] = footer.find("div a.btn.btn-lg.btn-default.btn-block");
    expect(okButton).to.exist;
  });

  it("should display the specified message", () => {
    propsData.message = "Test message";
    const wrapper = mount(BtrzAlert, options);

    const [modal] = wrapper.find("div.modal[role='dialog']");
    expect(modal).to.exist;
    const [title] = modal.find("h4.modal-title");
    expect(title.text()).to.equal(propsData.message);
  });

  it("should show the modal when opened property set", (done, err) => {
    propsData.opened = false;
    const wrapper = mount(BtrzAlert, options);
    wrapper.setProps({opened: true});
    Vue.nextTick(() => {
      const [modal] = wrapper.find("div[role='dialog']");
      expect(modal.hasClass("in")).to.be.true;
      done(err);
    });
  });

  it("should emit the change event when the close button is pressed", (done, err) => {
    propsData.opened = true;
    const wrapper = mount(BtrzAlert, options);

    wrapper.vm.$on("change", (opened) => {
      expect(opened).to.be.false;
      done(err);
    });

    Vue.nextTick(() => {
      const [footer] = wrapper.find("div.modal-content div.modal-footer");
      expect(footer).to.exist;
      const [closeBtn] = footer.find("a.btn");
      closeBtn.dispatch("click");
    });
  });

  it("should emit a change event when the 'X' button pressed", (done, err) => {
    propsData.opened = true;
    const wrapper = mount(BtrzAlert, options);

    wrapper.vm.$on("change", (opened) => {
      expect(opened).to.be.false;
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
    propsData.opened = true;
    const wrapper = mount(BtrzAlert, options);

    wrapper.vm.$on("change", (opened) => {
      expect(opened).to.be.false;
      done(err);
    });

    Vue.nextTick(() => {
      const [header] = wrapper.find(".modal-content div.modal-header")
      expect(header).to.exist;
      const [xButton] = header.find("button.close");
      xButton.dispatch("click");
    });
  });

})

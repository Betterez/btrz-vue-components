import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzField from "../src/btrz-field";
import BtrzInput from "../src/btrz-input";

describe("BtrzField", () => {
  it("Should render a form-group.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="text" value="testValue"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    formGroup = $(".form-group");
    expect(formGroup.length).to.equal(1);
  });

  it("Should render correct label.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="text" value="testValue" label="testLabel"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $(".form-group label");
    expect(label.text()).to.equal("testLabel:");
  });

  it("Should render an empty label if label field is empty.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" label=""></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $(".form-group label");
    expect(label.html().trim()).to.equal('&nbsp;');
  });

  it("Should render correct for attribute in the label.", () => {
    insertHTML(`<div id="app">
                  <btrz-field id="123456" name="testName" type="testType" value="testValue" label="true"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $(".form-group label");
    expect(label.attr("for")).to.equal('123456');
  });

  it("Should have class .input--filled if the input is contains text.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" label="true"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField, BtrzInput}
      }),
    formGroup = $(".form-group");
    expect(formGroup.hasClass('input--filled')).to.equal(true);
  });

  it("Should have class .input--empty if the input is empty.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="text" value="" label="label text"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField, BtrzInput}
      }),
    formGroup = $(".form-group");
    expect(formGroup.hasClass('input--empty')).to.equal(true);
  });

  it("Should display errors if there's any.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="text" value="" label="label text" :errors="[{'type': 0, 'message': 'Error message goes here'}]"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField, BtrzInput}
      }),
    errors = $(".form-group .errors");
    expect(errors.length).to.not.equal(0);
  });

  it("should not display any errors if there's none.", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="text" value="" label="label text" :errors="[{'type': 0, 'message': 'Error message goes here'}]"></btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField, BtrzInput}
      }),
    errors = $(".form-group .errors");
    expect(errors.length).to.equal(1);
  });
});

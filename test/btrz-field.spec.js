import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzField from "../src/btrz-field";
import BtrzInput from "../src/btrz-input";

describe("BtrzField", () => {
  it("Should render a form-group", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" :label=true>
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    formGroup = $(".form-group");
    expect(formGroup.length).to.equal(1);
  });

  it("should render a label if label='true'", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" :label=true>
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $("#app");
    expect(label.length).to.equal(1);
  });

  it("should render an empty label if label='false'", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" :label=false>
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $(".form-group label");
    expect(label.html()).to.equal('<!----> <span>&nbsp;</span>');
  });

  it("should render correct name in the label", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" label="true">
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $(".form-group label");
    expect(label.text()).to.equal('testName: ');
  });

  it("should render correct for attribute in the label", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" label="true">
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField}
      }),
    label = $(".form-group label");
    expect(label.attr("for")).to.equal('testName');
  });

  it("should have class .input--filled if the input is complete inside the field", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="testValue" label="true">
                    <template scope="props">
                      <btrz-input :name="props.props.name" :type="props.props.type" :value="props.props.value"></btrz-input>
                    </template>
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField, BtrzInput}
      }),
    formGroup = $(".form-group");
    expect(formGroup.hasClass('input--filled')).to.equal(true);
  });

  it("should have class .input--empty if the input is empty inside the field", () => {
    insertHTML(`<div id="app">
                  <btrz-field name="testName" type="testType" value="" label="true">
                    <template scope="props">
                      <btrz-input :name="props.props.name" :type="props.props.type" :value="props.props.value"></btrz-input>
                    </template>
                  </btrz-field>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzField, BtrzInput}
      }),
    formGroup = $(".form-group");
    expect(formGroup.hasClass('input--empty')).to.equal(true);
  });
});

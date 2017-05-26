import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzMultiSelect from "../src/btrz-multi-select";

describe("BtrzMultiSelect", () => {
  it("should render a multiple select element.", () => {
    insertHTML(`<div id="app">
                  <btrz-multi-select
                  id="id"
                  label="label"
                  :options="[{'key': 0, 'value': 'option1', selected: false}, {'key': 2, 'value': 'option2', selected: true}, {'key': 3, 'value': 'option3', selected: false}]"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect}
      }),
      select = $("select");
    expect(select.attr("multiple")).to.equal("multiple");
  });

  it("should render the given options.", () => {
    insertHTML(`<div id="app">
                  <btrz-multi-select
                  id="id"
                  label="label"
                  :options="[{'key': 0, 'value': 'option1', selected: false}, {'key': 2, 'value': 'option2', selected: true}, {'key': 3, 'value': 'option3', selected: false}]"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect}
      }),
      options = $("select option");
    expect(options.length).to.equal(3);
  });

  it("should render the given options with selected param as selected.", () => {
    insertHTML(`<div id="app">
                  <btrz-multi-select
                  id="id"
                  label="label"
                  :options="[{'key': 0, 'value': 'option1', selected: true}, {'key': 2, 'value': 'option2', selected: false}, {'key': 3, 'value': 'option3', selected: true}]"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect}
      }),
    selected = $("select option:selected");
    expect(selected.text().indexOf('option1')).to.not.equal(-1);
    expect(selected.text().indexOf('option3')).to.not.equal(-1);
    expect(selected.length).to.equal(2);
  });

  it("should render the select as disabled if there're no options to show.", () => {
    insertHTML(`<div id="app">
                  <btrz-multi-select
                  id="id"
                  label="label"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect}
      }),
    select = $("select");
    expect(select.attr("disabled")).to.equal("disabled");
  });
});

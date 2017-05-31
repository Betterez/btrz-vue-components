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
                  v-model="data"
                  :options="[{'key': 0, 'value': 'option1'}, {'key': 2, 'value': 'option2'}, {'key': 3, 'value': 'option3'}]"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect},
        data: {data: []}
      }),
      select = $("select");
    expect(select.attr("multiple")).to.equal("multiple");
  });

  it("should render the given options.", () => {
    insertHTML(`<div id="app">
                  <btrz-multi-select
                  id="id"
                  label="label"
                  v-model="data"
                  :options="[{'key': 0, 'value': 'option1'}, {'key': 1, 'value': 'option2'}, {'key': 2, 'value': 'option3'}]"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect},
        data: {data: []}
      }),
      options = $("select option");
    expect(options.length).to.equal(3);
  });

  it("should render the given options with selected param as selected.", () => {
    insertHTML(`<div id="app">
                  <btrz-multi-select
                  id="id"
                  label="label"
                  v-model="data"
                  :options="[{'key': 0, 'value': 'option1'}, {'key': 1, 'value': 'option2'}, {'key': 2, 'value': 'option3'}]"
                  errors="">
                  </btrz-multi-select>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzMultiSelect},
        data: {data: [0,2]}
      }),
    selected = $("select option:selected");
    expect(selected.text().indexOf('option1')).to.not.equal(-1);
    expect(selected.text().indexOf('option3')).to.not.equal(-1);
    expect(selected.length).to.equal(2);
  });
});

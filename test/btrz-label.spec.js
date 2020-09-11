import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzInput from "../src/btrz-input";
import BtrzToggle from "../src/btrz-toggle";

describe("BtrzLabel", () => {
  it("btrz-input should render a label with a given text", () => {
    insertHTML(`<div id="app">
                  <btrz-input type='text' class="form-control" label="test label"></btrz-input>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzInput}
      }),
      label = $(".form-control label");
    expect(label.text()).to.equal("test label");
  });

  it("btrz-toggle should render a label with a given text", () => {
    insertHTML(`<div id="app">
                  <btrz-toggle class="form-control" label="Activate this" value="false"></btrz-toggle>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzToggle}
      }),
      label = $(".form-control label");
    expect(label.text()).to.equal("Activate this");
  });
});

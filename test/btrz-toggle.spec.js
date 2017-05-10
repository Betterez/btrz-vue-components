import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzToggle from "../src/btrz-toggle";

describe("BtrzToggle", () => {
  it("Toggle should be ON if checked is true", () => {
    insertHTML(`<div id="app">
                  <btrz-toggle value="true"></btrz-toggle>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzToggle}
      }),
    BtrzSwitcher = $("#app input");
    expect(BtrzSwitcher.is(":checked")).to.equal(true);
  });

  it("Toggle should be OFF if checked is false", () => {
    insertHTML(`<div id="app">
                  <btrz-toggle value="false"></btrz-toggle>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzToggle}
      }),
    BtrzSwitcher = $("#app input");
    expect(BtrzSwitcher.is(":checked")).to.equal(false);
  });
});

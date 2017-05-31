import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzTimeInput from "../src/btrz-time-input";

describe("BtrzTimeInput", () => {

  it("Time input should contain a clock-bkg class", () => {
    insertHTML(`<div id="app">
                  <btrz-time-input name="testName" type="testType" value="testValue" placeholder="hh:mm"></btrz-time-input>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzTimeInput}
      }),
    input = $("#app input");
    expect(input.hasClass('clock-bkg')).to.equal(true);
  });

});

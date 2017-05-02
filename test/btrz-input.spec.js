import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzInput from "../src/btrz-input";

describe("BtrzInput", () => {
  it("should render an input element with a placeholder", () => {
    insertHTML(`<div id="app">
                  <btrz-input placeholder='test placeholder'></btrz-input>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzInput}
      }),
      input = $(".form-control");

    expect(input.attr("placeholder")).to.equal("test placeholder");
  });

  it("should render an input element with type prop text", () => {
    insertHTML(`<div id="app">
                  <btrz-input type='text'></btrz-input>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzInput}
      }),
      input = $(".form-control");
    expect(input.attr("type")).to.equal("text");
  });
});

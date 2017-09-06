import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzInput from "../src/btrz-input";
import BtrzHelpText from "../src/btrz-help-text";

describe("BtrzHelpText", () => {
  it("<btrz-help-text> should render a span with a help text", () => {
    insertHTML(`
      <div id="app">
        <btrz-help-text text="test span help"></btrz-help-text>
      </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzHelpText}
      }),
      span = $("span.help-block");
    expect(span.text()).to.equal("test span help");
  });

  it("btrz-input should render a span with a help text given", () => {
    insertHTML(`
      <div id="app">
        <btrz-input type='text' helptext="test span help"></btrz-input>
      </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzInput}
      }),
      span = $("span.help-block");
    expect(span.text()).to.equal("test span help");
  });
});

import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzInput from "../src/btrz-input";
import BtrzToggle from "../src/btrz-toggle";

describe("BtrzErrors", () => {
  it("btrz-input should render errors if a error object is given as parameter.", () => {
    insertHTML(`<div id="app">
                  <btrz-input type='text' class="form-control" :errors="[{'type': 0, 'message': 'Error message goes here'}, {'type': 0, 'message': 'Error message goes here'}]"></btrz-input>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzInput}
      }),
      errors = $(".form-control .error");
    expect(errors.length).to.equal(2);
  });

  it("btrz-toggle should render errors if a error object is given as parameter.", () => {
    insertHTML(`<div id="app">
                  <btrz-toggle class="form-control" :errors="[{'type': 0, 'message': 'Error message goes here'}]" value="false"></btrz-toggle>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzToggle}
      }),
      errors = $(".form-control .error");
    expect(errors.length).to.equal(1);
  });

});

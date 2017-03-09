import "./setup";

import { expect } from "chai";
import { insertHTML, mountComponent } from "./utils";
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import BtrzInput from '../src/btrz-input';


before(() => {
  Vue.use(VeeValidate);
});

describe("BtrzInput", () => {
  it("should render an input element with a placeholder", () => {
    insertHTML(`<div id="app">
                  <btrz-input placeholder='test placeholder'></btrz-input>
                </div>`);

    new Vue({
      el: "#app",
      components: { BtrzInput },
    });

    const input = $(".input-container input");
    expect(input.attr("placeholder")).to.equal("test placeholder");
  });
});

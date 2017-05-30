import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import {mount} from "avoriaz";
import BtrzInput from "../src/btrz-input";

// TODO: Migrate to use avoriaz

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

  it("should disable the input when specified true", () => {
    const wrapper = mount(BtrzInput, {propsData: {disabled: true}});
    expect(wrapper.vm.$refs.input.disabled).to.equal(true);
  });

  it("should NOT disable the input when specified false", () => {
    const wrapper = mount(BtrzInput, {propsData: {disabled: false}});
    expect(wrapper.vm.$refs.input.disabled).to.equal(false);
  });

  it("should NOT disable the input when NOT specified", () => {
    const wrapper = mount(BtrzInput);
    expect(wrapper.vm.$refs.input.disabled).to.equal(false);
  });

  //Missing test for updating model via v-model
});

import "./setup";

import {expect} from "chai";
import {mount} from "avoriaz";
import {mountComponent} from "./utils";
import BtrzWizard from "../src/btrz-wizard";

describe("BtrzWizard", () => {
  it("should render wizard", () => {
    const routes = [{
        title: "search",
        step: 0,
        active: true,
        path: "/search/"
      }, {
        title: "passengerInformation",
        step: 1,
        active: false,
        path: "/passenger/"
      }],
      wrapper = mount(BtrzWizard, {propsData: {routes}});

    expect((wrapper.find(".active")[0]).text()).to.include("search");
    expect((wrapper.find(".disabled")[0]).text()).to.include("passengerInformation");
  });

  it("should not render wizard", () => {
    const vm = mountComponent(BtrzWizard, {routes: []});
    expect($(vm.$el).find(".active").length).to.equal(0);
    expect($(vm.$el).find(".disabled").length).to.equal(0);
  });
});

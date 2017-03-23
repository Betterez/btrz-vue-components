import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzProductCard from "../src/btrz-product-card";


describe("BtrzProductCard", () => {
  it("should render product link", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      baseUrl = "cart/accountId",
      vm = mountComponent(BtrzProductCard, {product, baseUrl});

    expect(vm.$el.href).to.be.eql("cart/accountId/reservation/123456789");
  });

  it("should render product icon", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      vm = mountComponent(BtrzProductCard, {product});

    expect(vm.$el.innerHTML).to.include("class=\"fa fa-reservation\"");
  });

  it("should compute a default icon", () => {
    const product = {family: "reservation", _id: "123456789"},
      vm = mountComponent(BtrzProductCard, {product});

    expect(vm.icon).to.be.eql("fa-ticket");
  });

  it("should compute the icon of the product", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      vm = mountComponent(BtrzProductCard, {product});

    expect(vm.icon).to.be.eql("fa-reservation");
  });
});

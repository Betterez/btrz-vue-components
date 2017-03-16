import "./setup";

import { expect } from "chai";
import { mountComponent } from "./utils";
import BtrzProductItem from "../src/btrz-product-item";


describe("BtrzProductItem", () => {

  it("should render product link", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      productLink = "cart/accountId",
      component = mountComponent(BtrzProductItem, {product, productLink});

    expect(component.$el.href).to.be.eql("cart/accountId/product/123456789");
  });

  it("should render product icon", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      component = mountComponent(BtrzProductItem, {product});

    expect(component.$el.innerHTML).to.include('class="fa fa-reservation"');
  });

  it("should compute a default icon", () => {
    const product = {family: "reservation", _id: "123456789"},
      component = mountComponent(BtrzProductItem, {product});

    expect(component.icon).to.be.eql("fa-ticket");
  });

  it("should compute the icon of the product", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      component = mountComponent(BtrzProductItem, {product});

    expect(component.icon).to.be.eql("fa-reservation");
  });

});

import { expect } from "chai";
import { render } from "./utils";
const BtrzProductItem = require("src/btrz-product-item");


describe("BtrzProductItem", () => {

  it("should render product link", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      component = render(BtrzProductItem, {product});

    expect(component.$el.href).to.be.eql("./products/123456789");
  });

  it("should render product icon", () => {
    const product = {family: "reservation", _id: "123456789", icon: "fa-reservation"},
      component = render(BtrzProductItem, {product});

    expect(component.$el.innerHTML).to.include('class="fa fa-reservation"');
  });

});

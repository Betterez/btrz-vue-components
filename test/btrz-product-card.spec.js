import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzProductCard from "../src/btrz-product-card";


describe("BtrzProductCard", () => {

  let product;
  beforeEach(function () {
    product = {
      family: "reservation",
      _id: "123456789",
      icon: "fa-reservation",
      lexiconKeys: {
        name: "product_name_lexicon",
        description: "product_desc_lexicon",
      }
    };
  });

  it("should render product link", () => {
    const baseUrl = "cart/accountId",
      vm = mountComponent(BtrzProductCard, {product, baseUrl});
    expect(vm.$el.href).to.be.eql("cart/accountId/reservation/123456789");
  });

  it("should render product icon", () => {
    const vm = mountComponent(BtrzProductCard, {product});
    expect(vm.$el.innerHTML).to.include("class=\"fa fa-reservation\"");
  });

  it("should render product name from lexiconKeys", () => {
    const vm = mountComponent(BtrzProductCard, {product});
    expect(vm.$el.innerHTML).to.include("product_name_lexicon");
  });

  it("should render product description from lexiconKeys", () => {
    const vm = mountComponent(BtrzProductCard, {product});
    expect(vm.$el.innerHTML).to.include("product_desc_lexicon");
  });

  it("should render product name if not found in lexiconKeys", () => {
    product.lexiconKeys = {};
    product.name = "PrevName";
    const vm = mountComponent(BtrzProductCard, {product});
    expect(vm.$el.innerHTML).to.include("PrevName");
  });

  it("should render product description if not found in lexiconKeys", () => {
    product.lexiconKeys = {};
    product.description = "PrevDescription";
    const vm = mountComponent(BtrzProductCard, {product});
    expect(vm.$el.innerHTML).to.include("PrevDescription");
  });

  it("should compute a default icon", () => {
    const productWithoutIcon = {family: "reservation", _id: "123456789", lexiconKeys: {}},
      vm = mountComponent(BtrzProductCard, {product: productWithoutIcon});
    expect(vm.icon).to.be.eql("fa-ticket");
  });

  it("should compute the icon of the product", () => {
    const vm = mountComponent(BtrzProductCard, {product});
    expect(vm.icon).to.be.eql("fa-reservation");
  });
});

import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzCartIcon from "../src/btrz-cart-icon";

describe("BtrzCartIcon", () => {
  it("should not render if there's no cart id", () => {
    const component = mountComponent(BtrzCartIcon, {});
    expect(component.$el.innerHTML).to.equal(undefined);
  });

  it("should not render if cart items qty is zero", () => {
    const component = mountComponent(BtrzCartIcon, {cartId: "123", qty: 0});
    expect(component.$el.innerHTML).to.equal(undefined);
  });

  it("should not render cart link", () => {
    const data= {cartUrl: "/cart2/accId/cart", cartId: "123", qty: 1},
      component = mountComponent(BtrzCartIcon, data);
    expect(component.$el.innerHTML).to.include('href="/cart2/accId/cart/123"');
  });

  it("should not render cart items quantity", () => {
    const data= {cartUrl: "/cart2/accId/cart", cartId: "123", qty: 4},
      component = mountComponent(BtrzCartIcon, data);
    expect(component.$el.innerHTML).to.include("<span>(4)</span>");
  });
});

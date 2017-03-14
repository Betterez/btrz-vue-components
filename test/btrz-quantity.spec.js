import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import sinon from "sinon";

import BtrzQuantity from "../src/btrz-quantity";

describe("BtrzQuantity", () => {
  it("should increment the quantity", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      max: 10
    });

    vm.increment();

    expect(vm.quantity).to.equal(1);
  });

  it("should decrement the quantity", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      max: 10,
      initialValue: 1
    });

    vm.decrement();

    expect(vm.quantity).to.equal(0);
  });

  it("should NOT increment the quantity if the max reached", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      max: 10,
      initialValue: 9
    });

    vm.increment();
    vm.increment();

    expect(vm.quantity).to.equal(10);
  });

  it("should NOT decrement the quantity if the min reached", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      max: 10,
      min: 1,
      initialValue: 2
    });

    vm.decrement();
    vm.decrement();

    expect(vm.quantity).to.equal(1);
  });

  it("should NOT decrement the quantity if the min defaulted to zero reached", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      initialValue: 1,
      max: 10
    });

    vm.decrement();
    vm.decrement();

    expect(vm.quantity).to.equal(0);
  });

  it("should emit a 'quantityChanged' event when decrement is called", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      initialValue: 1,
      max: 10,
      id: "1"
    });

    const spy = sinon.spy(vm, "$emit");
    vm.decrement();
    expect(spy.calledWith("quantityChanged")).to.equal(true);
    expect(spy.firstCall.args[1].quantity).to.equal(0);
  });

  it("should emit a 'quantityChanged' event when increment is called", () => {
    const vm = mountComponent(BtrzQuantity, {
      name: "Test",
      description: "A description",
      initialValue: 1,
      max: 10,
      id: "1"
    });

    const spy = sinon.spy(vm, "$emit");
    vm.increment();
    expect(spy.calledWith("quantityChanged")).to.equal(true);
    expect(spy.firstCall.args[1].quantity).to.equal(2);
  });
});

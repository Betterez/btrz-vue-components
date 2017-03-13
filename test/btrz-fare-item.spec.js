import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import sinon from "sinon";

import BtrzFareItem from "../src/btrz-fare-item";

describe("BtrzFareItem", () => {
  it("should increment the quantity", () => {
    const vm = mountComponent(BtrzFareItem, {
      name: "Test",
      description: "A description",
      max: 10
    });

    vm.increment();

    expect(vm.quantity).to.equal(1);
  });

  it("should decrement the quantity", () => {
    const vm = mountComponent(BtrzFareItem, {
      name: "Test",
      description: "A description",
      max: 10,
      initialValue: 1
    });

    vm.decrement();

    expect(vm.quantity).to.equal(0);
  });

  it("should NOT increment the quantity if the max reached", () => {
    const vm = mountComponent(BtrzFareItem, {
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
    const vm = mountComponent(BtrzFareItem, {
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
    const vm = mountComponent(BtrzFareItem, {
      name: "Test",
      description: "A description",
      initialValue: 1,
      max: 10
    });

    vm.decrement();
    vm.decrement();

    expect(vm.quantity).to.equal(0);
  });

  it("should emit a 'decrement' event when decrement is called", () => {
    const vm = mountComponent(BtrzFareItem, {
      name: "Test",
      description: "A description",
      initialValue: 1,
      max: 10
    });

    const spy = sinon.spy(vm, "$emit");
    expect(spy.calledWith("decremented"));
  });

  it("should emit a 'incremented' event when increment is called", () => {
    const vm = mountComponent(BtrzFareItem, {
      name: "Test",
      description: "A description",
      initialValue: 1,
      max: 10
    });

    const spy = sinon.spy(vm, "$emit");
    expect(spy.calledWith("incremented"));
  });
});

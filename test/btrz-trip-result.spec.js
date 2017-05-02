import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzTripResult from "../src/btrz-trip-result";
import sinon from "sinon";

describe("BtrzTripResult", () => {
  it("should emit an event when a trip is selected", () => {
    const accountPreferences = {
        timeFormat: "h"
      },
      trip = {
        segments: [{departureDate: "dep"}],
        departure: "dep",
        arrival: "arr",
        from: "from",
        to: "to",
        duration: 10,
        fares: [{lexiconKeys: {name: "fare"}, valueToDisplay: 10}]
      },
      vm = mountComponent(BtrzTripResult, {
        trip,
        index: 0,
        currency: "$",
        accountPreferences
      }),
      spy = sinon.spy(vm, "$emit"),
      checkTrip = vm.$el.querySelector(".check-trip");

    checkTrip.click();
    expect(spy.calledWith("tripSelected")).to.equal(true);
    expect(spy.firstCall.args[1]).to.deep.equal(trip);
  });

  it("should emit an event when a trip is selected on tablet", () => {
    const accountPreferences = {
        timeFormat: "h"
      },
      trip = {
        segments: [{departureDate: "dep"}],
        departure: "dep",
        arrival: "arr",
        from: "from",
        to: "to",
        duration: 10,
        fares: [{lexiconKeys: {name: "fare"}, valueToDisplay: 10}]
      },
      vm = mountComponent(BtrzTripResult, {
        trip,
        index: 0,
        currency: "$",
        accountPreferences
      }),
      spy = sinon.spy(vm, "$emit"),
      checkTripTrablet = vm.$el.querySelector(".tablet");

    checkTripTrablet.click();
    expect(spy.calledWith("tripSelected")).to.equal(true);
    expect(spy.firstCall.args[1]).to.deep.equal(trip);
  });
});

import "./setup";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {mountComponent} from "./utils";
import BtrzTripResult from "../src/btrz-trip-result";
import sinon from "sinon";

chai.use(sinonChai);

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

  it("should emit an event when trip details opened", () => {
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
      tripDetails = vm.$el.querySelector(".trip-details");

    tripDetails.click();
    expect(spy.called).to.equal(true);
    expect(spy).to.have.been.calledWith("openTripDetails");
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

import "./setup";

import {expect} from "chai";
import {mountComponent} from "./utils";
import BtrzTripModal from "../src/btrz-trip-modal";
import sinon from "sinon";

describe("BtrzTripModal", () => {
  it("should emit an event when a trip is selected", () => {
    const accountPreferences = {
        timeFormat: "h"
      },
      trip = {
        segments: [{
          stops: [{
            minsWaiting: 0,
            scheduleDisplayName: "asd",
            departureDate: "dep",
            departure: "dep",
            name: "name",
            arrival: "arr"
          }]
        }],
        departure: "dep",
        arrival: "arr",
        from: "from",
        to: "to",
        duration: 10,
        fares: [{lexiconKeys: {name: "fare"}, valueToDisplay: 10}]
      },
      vm = mountComponent(BtrzTripModal, {
        trip,
        accountPreferences
      }),
      spy = sinon.spy(vm, "$emit"),
      chooseTrip = vm.$el.querySelector(".btn-success");

    chooseTrip.click();
    expect(spy.calledWith("tripSelected")).to.equal(true);
    expect(spy.firstCall.args[1]).to.deep.equal(trip);
  });
});

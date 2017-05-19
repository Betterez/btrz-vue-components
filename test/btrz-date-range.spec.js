import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzDateRange from "../src/btrz-date-range";

describe("BtrzDateRange", () => {
  it("Should render two btrz-date-input.", () => {
    insertHTML(`<div id="app">
                  <btrz-date-range
                    id='travelDate' fro
                    lang='en'
                    start-date-name='startDateName'
                    start-date-label='Start Date'
                    end-date-name='endDateName'
                    end-date-label='End Date'
                    submitFormat=''>
                  </btrz-date-range>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzDateRange}
      }),
      dateInput = $("#app .picker__input");
    expect(dateInput.length).to.equal(2);
  });

  it("Should use the given labels for start and end date input.", () => {
    insertHTML(`<div id="app">
                  <btrz-date-range
                    id='travelDate' fro
                    lang='en'
                    start-date-name='startDateName'
                    start-date-label='Start Date'
                    end-date-name='endDateName'
                    end-date-label='End Date'
                    submitFormat=''>
                  </btrz-date-range>
                </div>`);

    const app = new Vue({
      el: "#app",
      components: {BtrzDateRange}
    }),
    label = $("#app label");
    expect(label.text().indexOf('Start Date')).to.not.equal(-1);
    expect(label.text().indexOf('End Date')).to.not.equal(-1);
  });

});

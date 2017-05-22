import "./setup";

import {expect} from "chai";
import {mount} from "avoriaz";
import moment from "moment";
import {insertHTML} from "./utils";
import BtrzDateRange from "../src/btrz-date-range";

const dummyLogger = {
  warn() { return null; },
  error() { return null; },
  info() { return null; }
};


describe.only("BtrzDateRange", () => {
  it("Should render two btrz-date-input.", () => {
    insertHTML(`<div id="app">
                  <btrz-date-range
                    id='travelDate'
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
                    id='travelDate'
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

  it("End date and end time Should initialize disabled", () => {
    let wrapper = null;
    const EXPECTED_DATE = new Date();
    let props = {
      value: EXPECTED_DATE,
      startDateName: 'testStartDateName',
      startDateLabel: 'testStartDateLabel',
      endDateName: 'testEndDateName',
      endDateLabel: 'testEndDateLabel',
      displayTime: true,
      lang: 'en'
    };
    wrapper = mount(BtrzDateRange, {
      data: {logger: dummyLogger},
      propsData: props
    });
    expect(wrapper.vm.$refs.endDate.disabled).to.equal(true);
    expect(wrapper.vm.$refs.endTime.disabled).to.equal(true);
  });

  it("End date and end time should get enabled if start date is selected.", () => {
    let wrapper = null;
    const EXPECTED_DATE = new Date();
    let props = {
      value: EXPECTED_DATE,
      startDateName: 'testStartDateName',
      startDateLabel: 'testStartDateLabel',
      endDateName: 'testEndDateName',
      endDateLabel: 'testEndDateLabel',
      lang: 'en'
    };
    wrapper = mount(BtrzDateRange, {
      data: {logger: dummyLogger},
      propsData: props
    });
    wrapper.vm.$refs.startDate.picker.set("select", EXPECTED_DATE);
    expect(wrapper.vm.endDateDisabled).to.equal(false);
  });

  it("End date picker min value should be start date.", () => {
    let wrapper = null;
    const EXPECTED_DATE = new Date();
    let props = {
      value: EXPECTED_DATE,
      startDateName: 'testStartDateName',
      startDateLabel: 'testStartDateLabel',
      endDateName: 'testEndDateName',
      endDateLabel: 'testEndDateLabel',
      lang: 'en'
    };
    wrapper = mount(BtrzDateRange, {
      data: {logger: dummyLogger},
      propsData: props
    });
    wrapper.vm.$refs.startDate.picker.set("select", EXPECTED_DATE);
    const actualDate = wrapper.vm.$refs.startDate.picker.get("select").obj;
    expect(moment(wrapper.vm.endDateMinValue).isSame(EXPECTED_DATE, "days")).to.be.ok;
  });

});

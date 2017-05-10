import "./setup";

import {expect} from "chai";
import {insertHTML} from "./utils";
import BtrzFilter from "../src/btrz-filter";
import BtrzFilterRow from "../src/btrz-filter-row";
import BtrzFilterCol from "../src/btrz-filter-col";
import BtrzField from "../src/btrz-field";

describe("BtrzFilter", () => {
  it("Should render a given title.", () => {
    insertHTML(`<div id="app">
                  <btrz-filter title="testTitle"></btrz-filter>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzFilter}
      }),
    filterTitle = $(".filter-section .filters-header h3");
    expect(filterTitle.text()).to.equal("testTitle");
  });

  it("Should render given fields.", () => {
    insertHTML(`<div id="app">
                  <btrz-filter title='testTitle'>
                    <btrz-filter-row>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='1' label='This is a label' name='randomInput' content='BtrzInput' value='1' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='2' label='This is a label' name='randomInput' content='BtrzInput' value='2' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                    </btrz-filter-row>
                    <btrz-filter-row>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='3' label='This is a label' name='randomInput' content='BtrzInput' value='3' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='4' label='This is a label' name='randomInput' content='BtrzInput' value='4' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                    </btrz-filter-row>
                  </btrz-filter>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzFilter, BtrzField, BtrzFilterRow, BtrzFilterCol}
      }),
    filterFormGroups = $(".filter-section .form-group");
    expect(filterFormGroups.length).to.equal(4);
  });

  it("Should render <btr-filter-row> as bootstrap rows.", () => {
    insertHTML(`<div id="app">
                  <btrz-filter title='testTitle'>
                    <btrz-filter-row>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='1' label='This is a label' name='randomInput' content='BtrzInput' value='1' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='2' label='This is a label' name='randomInput' content='BtrzInput' value='2' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                    </btrz-filter-row>
                    <btrz-filter-row>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='3' label='This is a label' name='randomInput' content='BtrzInput' value='3' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='4' label='This is a label' name='randomInput' content='BtrzInput' value='4' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                    </btrz-filter-row>
                  </btrz-filter>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzFilter, BtrzField, BtrzFilterRow, BtrzFilterCol}
      }),
    filterRows = $(".filter-section #filter .row");
    expect(filterRows.length).to.equal(2);
  });

  it("Should render <btr-filter-col> as bootstrap cols.", () => {
    insertHTML(`<div id="app">
                  <btrz-filter title='testTitle'>
                    <btrz-filter-row>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='1' label='This is a label' name='randomInput' content='BtrzInput' value='1' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='2' label='This is a label' name='randomInput' content='BtrzInput' value='2' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                    </btrz-filter-row>
                    <btrz-filter-row>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='3' label='This is a label' name='randomInput' content='BtrzInput' value='3' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                      <btrz-filter-col class='col-xs-12 col-md-6'>
                        <btrz-field id='4' label='This is a label' name='randomInput' content='BtrzInput' value='4' type='number'>
                        </btrz-field>
                      </btrz-filter-col>
                    </btrz-filter-row>
                  </btrz-filter>
                </div>`);

    const app = new Vue({
        el: "#app",
        components: {BtrzFilter, BtrzField, BtrzFilterRow, BtrzFilterCol}
      }),
    filterCols = $(".filter-section #filter .col-xs-12");
    expect(filterCols.length).to.equal(4);
  });

});

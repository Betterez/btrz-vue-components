import { expect } from "chai";
import { insertHTML, mountComponent } from "./utils";
const BtrzGrid = require("src/btrz-grid");


describe("BtrzGrid", () => {

  it("should render child component for each item", () => {
    insertHTML(`<div id="app">
                  <btrz-grid :items="things">
                    <template scope="props">
                      <child-component :thing="props.item"></child-component>
                    </template>
                  </btrz-grid>
                </div>`);

    const ChildComponent = Vue.extend({
      template: "<a href='#'>{{ thing.name }}</a>",
      props: ["thing"]
    });

    new Vue({
      el: '#app',
      components: { BtrzGrid, ChildComponent },
      data: {things: [{name: "first"}, {name: "second"}]}
    });

    const renderedChilds = $(".row a");
    expect(renderedChilds).to.have.length(2);
    expect(renderedChilds.get(0).text).to.equal("first");
    expect(renderedChilds.get(1).text).to.equal("second");
  });

  it("should default to 2 per line (50%) if items' length is 2", () => {
    const items = [1, 2],
      component = mountComponent(BtrzGrid, {items});
    expect(component.colSpan).to.be.eql("");
  });

  it("should default to 2 per line (50%) if items' length is 4", () => {
    const items = [1, 2, 3, 4],
      component = mountComponent(BtrzGrid, {items});

    expect(component.colSpan).to.be.eql("");
  });

  it("should default to 3 per line (33%) if items' length is other than 2 or 4", () => {
    const items = [1, 2, 3],
      component = mountComponent(BtrzGrid, {items});

    expect(component.colSpan).to.be.eql("col-md-4");
  });

});

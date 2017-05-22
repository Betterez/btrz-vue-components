import "./setup";

import {expect} from "chai";
import {insertHTML, mountComponent} from "./utils";
import BtrzGrid from "../src/btrz-grid";


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
      }),
      app = new Vue({
        el: "#app",
        components: {BtrzGrid, ChildComponent},
        data: {things: [{name: "first"}, {name: "second"}]}
      }),
      renderedChildren = $("#app div div a");
    expect(renderedChildren).to.have.length(2);
    expect(renderedChildren.get(0).text).to.equal("first");
    expect(renderedChildren.get(1).text).to.equal("second");
  });

  it("should render last item if provided", () => {
    insertHTML(`<div id="app">
                  <btrz-grid :items="things">
                    <a slot="first">first</a>
                    <template scope="props">
                      <child-component :thing="props.item"></child-component>
                    </template>
                    <a slot="last">last</a>
                  </btrz-grid>
                </div>`);

    const ChildComponent = Vue.extend({
        template: "<a href='#'>{{ thing.name }}</a>",
        props: ["thing"]
      }),
      app = new Vue({
        el: "#app",
        components: {BtrzGrid, ChildComponent},
        data: {things: [{name: "2"}, {name: "3"}]}
      }),
      renderedChildren = $("#app div div a");
    expect(renderedChildren).to.have.length(4);
    expect(renderedChildren.get(0).text).to.equal("first");
    expect(renderedChildren.get(1).text).to.equal("2");
    expect(renderedChildren.get(2).text).to.equal("3");
    expect(renderedChildren.get(3).text).to.equal("last");
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

# btrz-vue-components
A collection of Vue components used in the Betterez UI

## How we work: reusable, generic components

Keep in mind that we are aiming to create a collection of **reusable, generic components**.

So, instead of creating a ReservationsList component that knows how to render a list of reservations, in turn create a generic List component that delegates rendering each item to other components, in this case, ReservationListItem.

An example of this is the [BtrzGrid](src/btrz-grid.vue) and [BtrzProductItem](src/btrz-product-item.vue) components.

To achieve rendering delegation we use [Vue's Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

### Naming components

All components must begin with the **"Btrz" prefix**.

### Component's styles

Only the compontent specific styles should be inside the compontent file.

Other non specific styles should be under the /assets/css/ folder, following the [ITCSS standard](https://speakerdeck.com/dafed/managing-css-projects-with-itcss).

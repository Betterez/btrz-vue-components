# btrz-vue-components
A collection of Vue components used in the Betterez UI

## How we work

Keep in mind that we are aiming to create a collection of **reusable, generic components**.

So, instead of creating a ReservationsList component that knows how to render a list of reservations, in turn create a generic List component that delegates rendering each item to other components, in this case, ReservationListItem. An example of this is the BtrzGrid and BtrzProductItem components.

### Naming components

All components must begin with the **"Btrz" prefix**.

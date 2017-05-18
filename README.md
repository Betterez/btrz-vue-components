# btrz-vue-components
A collection of Vue components used in the Betterez UI

### Before we start
Remember that Node v6.9.5 is needed.

### How we work: reusable, generic components

Keep in mind that we are aiming to create a collection of **reusable, generic components**.

So, instead of creating a ReservationsList component that knows how to render a list of reservations, in turn create a generic List component that delegates rendering each item to other components, in this case, ReservationListItem.

An example of this is the [BtrzGrid](src/btrz-grid.vue) and [BtrzProductItem](src/btrz-product-item.vue) components.

To achieve rendering delegation we use [Vue's Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

### Naming components

All components must begin with the **"Btrz" prefix**.

Other prefixes shall be used as needed, the only consideration being that they should go from generic to specific. For instance: btrz-input, btrz-input-date, btrz-input-time.

### Component's styles

Only the compontent specific styles should be inside the component file.

Use [<style scoped>](https://vue-loader.vuejs.org/en/features/scoped-css.html), but be aware that this prevents others from overriding the component's styles.

Other non specific styles, shared between components, should be under the /assets/css/ folder, following the [ITCSS standard](https://speakerdeck.com/dafed/managing-css-projects-with-itcss). ** not yet implemented **

Each application using btrz-vue-components is responsible for providing the rest of the styles:
- Base CSS like typography
- Bootstrap (compatible version)
- Overrides to each component as needed (the component must allow it, again: use <style scoped> with caution)

### Component demo page

** Work in progress: not yet implemented **

Before creating a component, check the demo pages to avoid duplicates. You can also ask in Slack: #vue-components

### Internationalization support

Components in btrz-vue-components should expect a $t method available on the component instance. This method accepts a lexicon key, and returns the corresponding translation. It is up to each project using the components to provide this $t method. For instance btrz-vue-websales does it using vuex-i18n plugin.

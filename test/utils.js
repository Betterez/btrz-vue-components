module.exports = {
  render: function (Component, props) {
    const Ctor = Vue.extend(Component),
      vm = new Ctor({propsData: props}).$mount();
    return vm;
  }
};
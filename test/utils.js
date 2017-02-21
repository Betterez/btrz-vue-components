module.exports = {
  mountComponent: function (Component, props) {
    const Ctor = Vue.extend(Component),
      vm = new Ctor({propsData: props}).$mount();
    return vm;
  },
  insertHTML: function (htmlStr) {
    var frag = document.createDocumentFragment(),
      temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    document.body.insertBefore(frag, document.body.childNodes[0]);
  }
};
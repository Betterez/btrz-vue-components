
// mock vuex-i18n's component.$t
Vue.prototype.$t = lexicon => lexicon;

afterEach(() => {
  document.body.innerHTML = "";
});

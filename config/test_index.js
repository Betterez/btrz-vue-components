import Vue from "vue";

Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context("../test/", true, /\.spec$/);
testsContext.keys().forEach(testsContext);

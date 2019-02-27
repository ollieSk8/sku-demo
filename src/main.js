import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VeeValidate from "vee-validate";
const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'field',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false
};

Vue.use(VeeValidate, config);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')

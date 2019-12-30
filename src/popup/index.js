import Vue from "vue";
import AppComponent from "./App.vue";

Vue.component("app-component", AppComponent);

import {
  Card,
  Button
} from 'element-ui';

Vue.use(Card);
Vue.use(Button);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
import Vue from "vue";
import AppComponent from "./App.vue";

Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.config.productionTip = false;

Vue.component('VueSlider', VueSlider)

new Vue({
	store,
	render: (h) => h(App),
}).$mount("#app");

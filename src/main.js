import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal';
import { createPinia, PiniaVuePlugin } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import './assets/main.css'

Vue.use(VModal, {
    resizable: true,
    adaptive: true
});

Vue.use(PiniaVuePlugin)
const pinia = createPinia();
const installPersistedStatePlugin = createPersistedStatePlugin();
pinia.use((context) => installPersistedStatePlugin(context));

new Vue({
    render: (h) => h(App),
    pinia,
}).$mount('#app')
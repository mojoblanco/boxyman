var Vue = require("vue/dist/vue.js");

Vue.component("hello-world", require('./components/HelloWorld.vue'));

const app = new Vue({
    el: "#app"
});
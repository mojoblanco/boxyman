var Vue = require("vue/dist/vue.js");
var axios = require("axios/dist/axios.js");
var VueAxios = require("vue-axios/dist/vue-axios.min.js")

Vue.use(VueAxios, axios)

Vue.component("hello-world", require('./components/HelloWorld.vue'));
Vue.component("project-form", require('./components/AddProjectForm.vue'));

const app = new Vue({
    el: "#app"
});
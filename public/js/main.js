var Vue = require("vue/dist/vue.js");

Vue.component("hello-world", require('./components/HelloWorld.vue'));
Vue.component("project-form", require('./components/AddProjectForm.vue'));

const app = new Vue({
    el: "#app"
});
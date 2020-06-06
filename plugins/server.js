import Vue from "vue";
import ContentEditable from "../components/ContentEditable";

Vue.component('ce', ContentEditable);
Vue.mixin({
    methods: {
        generateId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }
    },
    computed: {
        currentUser: {
            get() {
                return this.$store.getters['auth/getUser']
            },
            set() {

            }
        }
    }
});

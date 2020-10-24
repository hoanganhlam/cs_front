import Vue from "vue";
import ContentEditable from "../components/ContentEditable";

const showdown = require('showdown');
const converter = new showdown.Converter();
Vue.component('ce', ContentEditable);
Vue.mixin({
    methods: {
        generateId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },
        convertName(user) {
            if (user) {
                if (user.profile && user.profile.nick) {
                    return user.profile.nick
                }
                if (user.first_name || user.last_name) {
                    return user.first_name + ' ' + user.last_name
                }
                return user.username
            } else {
                return 'Anonymous';
            }
        },
        toHTML(val) {
            return val ? converter.makeHtml(val) : '';
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

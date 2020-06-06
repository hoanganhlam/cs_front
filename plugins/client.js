import Vue from 'vue';
import Editor from '../components/Editor';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(CKEditor);
Vue.component('editor', Editor);


<template>
    <div class="content">
        <tiny-editor v-model="editorData"
                     api-key="sgdhe7czf3wgmsipn054ql44mi1ce2khbevpw9atwsq3ir1q"
                     :init="editorConfig"/>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import TurnDownService from "turndown";

const turndown = new TurnDownService;
export default {
    name: "Editor",
    components: {
        'tiny-editor': Editor
    },
    props: {
        value: {},
        placeholder: {},
        changed: {}
    },
    data() {
        return {
            editor: null,
            editorData: null,
            editorConfig: {
                height: 150,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
            },
            turnDown: null
        };
    },
    methods: {},
    watch: {
        editorData() {
            this.$emit('input', turndown.turndown(this.editorData));
        },
        changed() {
            this.editorData = this.toHTML(this.value);
        }
    },
    created() {
        this.editorData = this.toHTML(this.value);
    }
}
</script>

<style scoped>

</style>

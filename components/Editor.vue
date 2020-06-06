<template>
    <div class="content">
        <ckeditor :placeholder="placeholder" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<script>
    const BalloonEditor = require('../plugins/ckeditor/ckeditor');

    export default {
        name: "Editor",
        props: {
            value: {},
            placeholder: {}
        },
        data() {
            return {
                editor: BalloonEditor,
                editorData: this.value,
                editorConfig: {}
            };
        },
        watch: {
            editorData() {
                this.$emit('input', this.editorData)
            }
        }
    }
</script>

<style scoped>

</style>

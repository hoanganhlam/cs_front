<template>
    <div class="content">
        <div ref="editor"></div>
    </div>
</template>

<script>
    export default {
        name: "Editor",
        props: {
            value: {},
            placeholder: {},
            changed: {}
        },
        data() {
            return {
                editor: null,
                editorData: this.value,
                editorConfig: {},
                turnDown: null
            };
        },
        methods: {},
        mounted() {
            if (process.client) {
                if (typeof BalloonEditor !== 'undefined' && typeof TurndownService !== 'undefined') {
                    BalloonEditor
                        .create(this.$refs['editor'], {
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                            heading: {
                                options: [
                                    {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
                                    {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
                                    {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'}
                                ]
                            },
                        })
                        .then(editor => {
                            this.editor = editor;
                            if (this.value) {
                                this.editor.setData(this.toHTML(this.value));
                            } else {
                                this.editor.setData(this.toHTML('Write something...'));
                            }
                        })
                        .catch(error => {
                            // console.error(error);
                        });
                    this.$refs['editor'].parentElement.addEventListener('change', () => {
                        this.handleInput()
                    });
                    this.turnDown = new TurndownService();
                }
            }
        },
        computed: {
            data() {
                return this.editor ? this.editor.getData() : null;
            }
        },
        watch: {
            data() {
                if (this.turnDown) {
                    this.$emit('input', this.turnDown.turndown(this.data));
                }
            },
            changed() {
                if (this.editor) {
                    this.editor.setData(this.toHTML(this.value));
                }
            }
        }
    }
</script>

<style lang="scss">
    .ck-content {
        margin-left: -9.6px;
        margin-right: -9.6px;
    }
</style>

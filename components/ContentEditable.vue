<script>
    export default {
        name: "ContentEditable",
        render: function (createElement) {
            let eml = this.data;
            return createElement(this.elm, {
                on: {
                    input: this.handleInput,
                    paste: this.handlePaste
                },
                attrs: {
                    contentEditable: this.editable,
                },
                ref: 'xxx'
            }, eml)
        },
        props: {
            elm: {
                type: String,
                default: 'div'
            },
            value: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: true
            },
            allowPasteHtml: {
                default: false,
                type: Boolean
            },
            rows: {
                default: null,
                type: Number
            }
        },
        data() {
            return {
                data: this.value,
                typing: false
            }
        },
        methods: {
            handleInput(e) {
                this.typing = true
                if (this.allowPasteHtml) {
                    this.$emit('input', e.target.innerHTML)
                } else {
                    this.$emit('input', e.target.innerText)
                }
            },
            handlePaste(e) {
                if (!this.allowPasteHtml) {
                    let data = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
                    let regex = /<(?!(\/\s*)?(b|i|em|s|strong|u)[>,\s])([^>])*>/g;
                    data = data.replace(regex, '');
                    document.execCommand('insertHTML', false, data);
                    e.preventDefault();
                }
            },
        },
        watch: {
            value() {
                if (!this.typing || this.value === null) {
                    this.$refs.xxx.innerHTML = this.value
                }
            }
        }
    }
</script>

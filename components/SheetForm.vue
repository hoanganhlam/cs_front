<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <div class="modal-card-title">
                <ce elm="h1" class="title is-4" v-model="data.title" placeholder="Sheet title"></ce>
            </div>
        </header>
        <section class="modal-card-body">
            <b-field label-position="on-border" label="Description">
                <editor v-model="data.description"></editor>
            </b-field>
            <div class="level is-mobile">
                <div class="level-left">
                    <h4 class="title is-6">Rows</h4>
                </div>
                <div class="level-right">
                    <div class="button is-text" @click="addRow">Add</div>
                </div>
            </div>
            <div class="data-elm" v-for="(row, i) in data.rows" :key="i">
                <b-field label-position="on-border" label="Label">
                    <editor :value="row.label" @input="row.label = $event"/>
                </b-field>
                <b-field label-position="on-border" label="Value">
                    <editor :value="row.value" @input="row.value = $event"/>
                </b-field>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-primary is-fullwidth" @click="$emit('done')">Done</button>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "SheetForm",
        props: {
            value: {
                default: () => {
                    return {
                        title: null,
                        description: null,
                        rows: []
                    }
                }
            }
        },
        data() {
            return {
                data: this.value
            }
        },
        methods: {
            addRow() {
                this.data.rows.push(
                    {
                        label: null,
                        value: null
                    }
                );
            }
        },
        watch: {
            value() {
                this.data = this.value;
            },
            data: {
                deep: true,
                handler: function () {
                    this.$emit('input', this.data);
                }
            }
        }
    }
</script>

<style lang="scss">
    .data-elm {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #F5F5F5;
    }
</style>

<template>
    <section>
        <b-field>
            <ce elm="h1" class="title" v-model="data.title" placeholder="Sheet title"></ce>
        </b-field>
        <b-field label="Description">
            <editor v-model="data.description"></editor>
        </b-field>
        <div class="level is-mobile">
            <div class="level-left">
                <h4 class="title is-6">Rows</h4>
            </div>
            <div class="level-right">
                <div class="button" @click="addRow">
                    <b-icon icon="plus"></b-icon>
                    <span>Add</span>
                </div>
            </div>
        </div>
        <div class="data-elm" v-for="(row, i) in data.rows" :key="i">
            <div class="media">
                <div class="media-content">
                    <b-field label-position="on-border" label="Label">
                        <editor :value="row.label" @input="row.label = $event"/>
                    </b-field>
                </div>
                <div class="media-right">
                    <div class="delete" @click="data.rows.splice(i, 1)"></div>
                </div>
            </div>
            <b-field label-position="on-border" label="Value">
                <editor :value="row.value" @input="row.value = $event"/>
            </b-field>
        </div>
    </section>
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
            value: {
                deep: true,
                handler: function () {
                    this.data = this.value;
                }
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

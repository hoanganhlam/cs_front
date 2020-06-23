<template>
    <div class="card cheat-sheet">
        <div class="card-header">
            <div class="card-header-title">
                <b-icon size="is-small" icon="chevron-right"></b-icon>
                <span>{{data.title}}</span>
            </div>
        </div>
        <div class="card-content">
            <div v-html="data.description" class="description"></div>
            <div class="row" v-for="(row, i) in data.rows" :key="i">
                <div class="label" v-html="row.label"></div>
                <div class="value" v-html="row.value"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CheatCard",
        props: {
            value: {
                default: () => {
                    return {
                        title: null,
                        description: null,
                        rows: []
                    }
                }
            },
            updating: {
                type: Boolean,
                default: false
            },
            setting: {
                default: () => {
                    return {
                        column: 12
                    }
                }
            }
        },
        data() {
            return {
                data: this.value,
                showForm: false
            }
        },
        watch: {
            showForm() {
                this.$emit('opened', this.showForm);
            }
        }
    }
</script>

<style lang="scss">
</style>

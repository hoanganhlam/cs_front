<template>
    <div class="card cheat-sheet" v-if="data.rows.length">
        <div class="card-header">
            <div class="card-header-title">
                <b-icon size="is-small" icon="chevron-right"></b-icon>
                <span>{{data.title}}</span>
            </div>
        </div>
        <div v-if="data.description" v-html="data.description" class="card-content"></div>
        <div class="card" v-for="(row, i) in data.rows" :key="i">
            <div class="card-content">
                <div class="columns">
                    <div class="column" v-if="row.label">
                        <div class="label" v-html="row.label"></div>
                    </div>
                    <div class="column" v-if="row.value">
                        <div class="value" v-html="row.value"></div>
                    </div>
                </div>
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

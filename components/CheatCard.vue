<template>
    <div class="card cheat-sheet">
        <div v-if="updating" class="controllable" @click="showForm = !showForm">
            <b-icon size="is-small" icon="pen"></b-icon>
        </div>
        <div class="card-header">
            <div class="card-header-title title is-5">
                <b-icon size="is-small" icon="chevron-right"></b-icon>
                <span>{{data.title}}</span>
            </div>
        </div>
        <div class="card-content content">
            <div v-html="data.description" class="description"></div>
            <div>
                <div class="columns is-multiline" v-bind:class="{'full' : setting.column === 12}"
                     v-for="(row, i) in data.rows" :key="i">
                    <div :class="`column is-${setting.column}`" v-html="row.label"></div>
                    <div :class="`column`" v-html="row.value"></div>
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
    .cheat-sheet {
        position: relative;
        box-shadow: none;
        border: 1px solid rgba(81, 86, 88, 0.12941);

        &.less {
            padding: 0;
            box-shadow: none;

            .card-header {
                padding: 0;
                box-shadow: none;
            }
        }

        .columns:first-child {
            margin-top: 0;
        }

        .columns:last-child {
            margin-bottom: -0.5rem;
        }

        .columns:nth-child(odd) {
            background: #F5F5F5;
        }

        .columns.full:nth-child(odd) {
            background: unset;
        }

        .column {
            padding: 0.5rem .75rem;

            p {
                margin-bottom: 0 !important;
            }

            &:first-child {
                padding-bottom: 0;
            }
        }

        .controllable {
            cursor: pointer;
            opacity: 0;
            position: absolute;
            padding: .25rem .4rem;
            border: 1px solid rgba(81, 86, 88, 0.12941);
            border-radius: 50%;
            top: -.75rem;
            right: -.75rem;
            background: #FFF;
        }

        &:hover {
            .controllable {
                opacity: 1;
            }
        }

        .description:empty {
            margin-top: -.5rem;
        }

        .description:not(:empty) {
            margin-bottom: .75rem;
        }

        .content pre {
            overflow-x: unset;
            white-space: break-spaces;
            word-break: break-all;
        }

        .content ul:not(:last-child),
        .content p {
            margin-bottom: .5rem;
        }

        .content {
            ul {
                margin-top: .5rem;
            }
        }
    }
</style>

<template>
    <b-tabs type="is-boxed" expanded>
        <b-tab-item label="General" icon="tune">
            <b-field label-position="on-border" label="Column">
                <div class="has-border">
                    <div class="columns is-variable is-1">
                        <div class="column">
                            <div class="button is-fullwidth"
                                 @click="data.general.column = 2"
                                 v-bind:class="{'is-primary': data.general.column === 2}">
                                <b-icon icon="pause"></b-icon>
                                <span>Two</span>
                            </div>
                        </div>
                        <div class="column">
                            <div class="button is-fullwidth"
                                 @click="data.general.column = 3"
                                 v-bind:class="{'is-primary': data.general.column === 3}">
                                <b-icon icon="view-column"></b-icon>
                                <span>Three</span>
                            </div>
                        </div>
                    </div>
                </div>
            </b-field>
            <b-field label-position="on-border" label="Sheet column">
                <div class="has-border">
                    <b-slider v-model="data.general.sheetColumn" :min="1" :max="12" :step="1" ticks></b-slider>
                </div>
            </b-field>
            <b-field label-position="on-border" label="Font Family">
                <b-dropdown v-model="data.general.font" aria-role="list" class="font-selector">
                    <button class="has-border" type="button" slot="trigger" :style="{'font-family': data.general.font ? data.general.font : 'BlinkMacSystemFont'}">
                        {{data.general.font ? data.general.font : 'BlinkMacSystemFont'}}
                    </button>
                    <b-dropdown-item v-for="(font, i) in fonts" :value="font"
                                     :style="{'font-family': font}"
                                     :key="`${font}-${i}`" aria-role="listitem">
                        {{ font }}
                    </b-dropdown-item>
                </b-dropdown>
            </b-field>
        </b-tab-item>
        <b-tab-item label="Style" icon="palette">
            <b-field label-position="on-border" label="Coloring">
                <div class="has-border">
                    <div class="level is-mobile" v-for="c in fieldColors" :key="c.field">
                        <div class="level-left">
                            {{c.label}}
                        </div>
                        <div class="level-right">
                            <b-dropdown>
                                <div slot="trigger" class="button is-square"
                                     v-bind:style="{background: data['color'][c.field]}">
                                </div>
                                <b-dropdown-item paddingless custom>
                                    <color-picker
                                        @input="updateColor(c.field, $event)"
                                        :value="data['color'][c.field]"
                                        :preset-colors="['#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)']"
                                    />
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </div>
            </b-field>
            <b-field label-position="on-border" label="Card Style">
                <div class="has-border"></div>
            </b-field>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    import {Chrome} from 'vue-color';

    const DEFAULT = {
        color: {
            "--header-bg-color": "#F5F5F5",
            "--header-txt-color": "#333333",
            "--body-text-color": "#cd2653",
        },
        general: {
            column: 3,
            sheetColumn: 12,
            font: null
        }
    };
    export default {
        name: "StyleOption",
        props: {
            value: {
                default: () => DEFAULT
            }
        },
        data() {
            return {
                colors: [],
                fieldColors: [
                    {
                        field: '--header-bg-color',
                        label: 'Header Background',
                    },
                    {
                        field: '--header-txt-color',
                        label: 'Header Text Color',
                    },
                    {
                        field: '--body-text-color',
                        label: 'Body Text Color',
                    },
                ],
                data: this.value,
                fonts: ['BlinkMacSystemFont', 'Ubuntu', 'Open Sans', 'SegoeUI']
            }
        },
        components: {
            'color-picker': Chrome,
        },
        methods: {
            updateColor(field, val) {
                this.data.color[field] = val.hex
            },
        }
    }
</script>

<style lang="scss">
    .style-editor {
        .tabs:not(:last-child),
        .level:not(:last-child) {
            margin-bottom: 0;
        }

        .tab-content {
            border: 1px solid;
            background: white;
            border-color: #dbdbdb;
            border-top-color: transparent !important;

            .tabs:not(:last-child),
            .level:not(:last-child) {
                margin-bottom: .5rem;
            }
        }

        .dropdown-content {
            padding-top: 0;
            padding-bottom: 0;
        }

        .dropdown-trigger {
            .button {
                width: 24px;
                height: 24px;
            }
        }

        .font-selector {
            width: 100%;

            .dropdown-trigger {
                width: 100%;

                .has-border {
                    width: 100%;
                    cursor: pointer;
                    text-align: left;
                }
            }
        }
    }
</style>

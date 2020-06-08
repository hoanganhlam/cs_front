<template>
    <section class="section has-background-light" v-bind:style="style">
        <div class="container">
            <div class="cheat-sheets">
                <div class="sheet-header">
                    <div class="media">
                        <div class="media-left">
                            <Avatar :can-update="updating" class="is-128x128" v-model="data.media"></Avatar>
                        </div>
                        <div class="media-content">
                            <ce :editable="updating" elm="h1" class="title" v-model="data.title"></ce>
                            <client-only v-if="updating">
                                <editor v-model="data.description"></editor>
                            </client-only>
                            <div v-else v-html="data.description"></div>
                            <b-field v-if="updating">
                                <b-taginput
                                    v-model="data.taxonomies"
                                    :data="taxonomy.results"
                                    autocomplete
                                    :allow-new="true"
                                    field="title"
                                    icon="label"
                                    placeholder="Add Tag"
                                    :before-adding="beforeAdding"
                                    @add="onAdd"
                                    @typing="getQuerySet">
                                    <template slot-scope="props">{{props.option.title}}</template>
                                    <template slot="empty">got zero result</template>
                                </b-taginput>
                            </b-field>
                            <p>by <b>{{convertName(data.user)}}</b></p>
                        </div>
                    </div>
                </div>
                <div class="sheet-body">
                    <div class="columns is-multiline grid">
                        <div :class="`sheet column is-${12 / data.settings.general.column}`"
                             v-for="(sheet, i) in data.sheets"
                             :key="sheet.id">
                            <CheatCard :value="sheet" :updating="updating" @opened="openSheet(sheet)"
                                       :setting="setting"
                                       @input="sheet = $event"/>
                        </div>
                    </div>
                </div>
                <div class="sheet-footer">
                    <p>© CheatSheetMaker.com</p>
                </div>
                <div class="fixed-sidebar">
                    <div class="buttons">
                        <div class="button is-text" @click="updating = !updating">
                            <b-icon size="is-small" :icon="updating ? 'eye' : 'pen'"></b-icon>
                            <span v-if="textBar">{{updating ? 'View' : 'Update'}}</span>
                        </div>
                        <div v-if="updating" class="button is-text" @click="showStyleOption = !showStyleOption">
                            <b-icon size="is-small" icon="tune"></b-icon>
                            <span v-if="textBar">Custom</span>
                        </div>
                        <div v-if="updating" class="button is-text" @click="addSheet">
                            <b-icon size="is-small" icon="plus"></b-icon>
                            <span v-if="textBar">Add</span>
                        </div>
                        <div v-if="!updating" class="button is-text">
                            <b-icon size="is-small" icon="cloud-download"></b-icon>
                            <span v-if="textBar">Download</span>
                        </div>
                        <div v-else class="button is-text" @click="save()">
                            <b-icon size="is-small" icon="content-save"></b-icon>
                            <span v-if="textBar">Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="active"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="false"
                 aria-role="dialog"
                 aria-modal>
            <client-only>
                <SheetForm @done="active = false" v-model="activeSheet"/>
            </client-only>
        </b-modal>
        <div class="style-editor" v-if="showStyleOption">
            <client-only>
                <StyleOption v-model="data.settings"/>
            </client-only>
        </div>
    </section>
</template>

<script>
    import StyleOption from "../components/StyleOption";
    import SheetForm from "../components/SheetForm";
    import CheatCard from "../components/CheatCard";
    import Avatar from "../components/Avatar";
    import {cloneDeep, debounce} from "lodash";

    const DEFAULT_SETTINGS = {
        color: {
            "--header-bg-color": "#F5F5F5",
            "--header-txt-color": "#333333",
            "--body-text-color": "#cd2653",
        },
        general: {
            column: 2,
            sheetColumn: 12,
            font: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
        }
    };
    const DEFAULT_SHEET = {
        title: null,
        description: null,
        rows: []
    };
    const DEFAULT = {
        title: 'Cheat Sheet Name',
        description: '<i>This is description</i>',
        sheets: [],
        settings: {},
        taxonomies: [],
        user: null
    };
    export default {
        name: 'HomePage',
        components: {
            StyleOption,
            SheetForm,
            CheatCard,
            Avatar
        },
        async asyncData({$axios, params}) {
            let data = DEFAULT;
            if (params.slug && params.slug !== 'editor') {
                data = await $axios.$get(`/sheet/cheat-sheets/${params.slug}/`);
            }
            if (!data.settings || !data.settings.hasOwnProperty('general')) {
                data.settings = DEFAULT_SETTINGS;
            }
            return {
                data
            }
        },
        head() {
            return {
                title: this.$route.params.slug === 'editor' ? 'Editor' : this.data.title,
                link: this.links
            }
        },
        data() {
            return {
                updating: false,
                showStyleOption: false,
                active: false,
                activeSheet: null,
                textBar: false,
                fonts: [
                    {
                        name: 'Open Sans',
                        uri: 'Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600'
                    },
                    {
                        name: 'Ubuntu',
                        uri: 'Ubuntu:ital,wght@0,300;0,400;1,300;1,400&'
                    },
                    {
                        name: 'SegoeUI',
                        uri: null
                    }
                ],
                taxonomy: {
                    results: []
                }
            }
        },
        methods: {
            reLayout() {
                let elem = document.querySelector('.columns.grid');
                new Masonry(elem, {
                    itemSelector: '.column.sheet'
                });
            },
            addSheet() {
                this.data.sheets.push({
                    id: this.generateId(),
                    ...cloneDeep(DEFAULT_SHEET)
                });
            },
            openSheet(sheet) {
                this.active = true;
                this.activeSheet = sheet;
            },
            async save() {
                let data = cloneDeep(this.data);
                data.media = data.media ? data.media.id : undefined;
                data.taxonomies = data.taxonomies ? data.taxonomies.map(x => x.id) : [];
                if (this.data.id) {
                    await this.$axios.$put(`/sheet/cheat-sheets/${this.data.slug}/`, data);
                } else {
                    let res = await this.$axios.$post(`/sheet/cheat-sheets/`, data);
                    this.$router.replace({path: '/' + res.slug});
                }
                this.updating = false;
            },
            async onAdd(e) {
                if (typeof e === 'string' && e.length > 3) {
                    let res = await this.$axios.$post('/general/hash-tags/', {title: e});
                    if (res.id) {
                        this.data.taxonomies[this.data.taxonomies.indexOf(e)] = res;
                        this.taxonomy.results.push(res);
                    }
                }
            },
            beforeAdding(tag) {
                if (this.data.taxonomies === null) {
                    this.data.taxonomies = []
                }
                let check = this.data.taxonomies.map(x => x.id).indexOf(tag.id);
                return check === -1;
            },
            getQuerySet: debounce(function (text) {
                this.$axios.$get('/general/hash-tags/', {
                    params: {search: text}
                }).then(res => {
                    this.taxonomy = res;
                })
            }, 500),
        },
        updated() {
            this.reLayout()
        },
        computed: {
            setting() {
                return {
                    column: this.data.settings.general.sheetColumn
                }
            },
            links() {
                let out = [];
                this.fonts.forEach(font => {
                    if (font.uri) {
                        out.push(
                            {
                                rel: 'stylesheet',
                                href: `https://fonts.googleapis.com/css?family=${font.uri}&display=swap`
                            }
                        )
                    }
                });
                return out;
            },
            style() {
                return {
                    "--header-bg-color": this.data.settings.color["--header-bg-color"] || DEFAULT_SETTINGS.color["--header-bg-color"],
                    "--header-txt-color": this.data.settings.color["--header-txt-color"] || DEFAULT_SETTINGS.color["--header-txt-color"],
                    "--body-text-color": this.data.settings.color["--body-text-color"] || DEFAULT_SETTINGS.color["--body-text-color"],
                    "--font-family": this.data.settings.general.font || DEFAULT_SETTINGS.general.font
                }
            }
        },
        mounted() {
            this.reLayout();
        }
    }
</script>
<style lang="scss">
    .style-editor {
        width: 250px;
        position: fixed;
        top: 25%;
    }

    .fixed-sidebar {
        position: fixed;
        width: 50px;
        top: 25% x;
        right: 1rem;

        .buttons {
            width: fit-content;
        }

        .button {
            text-decoration: none;
            margin-bottom: 0;
            justify-content: left;
        }
    }

    .cheat-sheets {
        min-height: calc(100vh - 5.5rem);
        position: relative;
        background: #ffffff;
        box-shadow: 0 3px 3px 1px rgba(10, 10, 10, 0.1), 0 0 0 0px rgba(10, 10, 10, 0.1);;
        display: flex;
        flex-direction: column;
        font-family: var(--font-family);

        .sheet-footer,
        .sheet-header {
            padding: 1rem 1.5rem;
            flex: 0;
            background: var(--header-bg-color);
            color: var(--header-txt-color);

            .title {
                color: var(--header-txt-color);
            }

            .title:not(:last-child) {
                margin-bottom: .5rem;
            }
        }

        .sheet-body {
            flex: 1;
            color: var(--body-text-color);
            padding: 1.5rem;

            .card {
                color: inherit;
            }
        }

        .columns:not(:last-child) {
            margin-bottom: .5rem;
        }
    }

    .has-border,
    pre,
    .ck.ck-editor__editable_inline {
        border: 1px solid #51565821;
    }

    .has-border {
        padding: .5rem;
    }

    .modal-card {
        min-width: 450px;
    }

    .b-slider .b-slider-thumb-wrapper {
        z-index: 99;
    }
</style>

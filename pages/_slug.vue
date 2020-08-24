<template>
    <div>
        <div class="hero has-text-centered is-light">
            <div class="hero-body">
                <div class="container small">
                    <n-link class="button is-text" to="/">
                        <b-icon icon="chevron-left"></b-icon>
                        <span>Back to home</span>
                    </n-link>
                    <avatar v-if="updating || data.media" v-model="data.media" class="is-96x96" :can-update="updating"
                            style="margin: 0 auto"/>
                    <ce elm="h1" :editable="updating" class="title is-1" placeholder="Title" v-model="data.title"></ce>
                    <div v-if="!updating" class="subtitle" v-html="data.description"></div>
                    <editor v-else :value="data.description" @input="data.description = $event"
                            placeholder="Description"/>
                    <b-field v-if="updating">
                        <b-taginput
                            v-model="data['post_terms']"
                            :data="taxonomy.results"
                            autocomplete
                            :allow-new="true"
                            field="title"
                            icon="label"
                            placeholder="Add Tag"
                            :before-adding="beforeAdding"
                            @add="onAdd"
                            @typing="getTagQuerySet">
                            <template slot-scope="props">{{props.option.title}}</template>
                            <template slot="empty">got zero result</template>
                        </b-taginput>
                    </b-field>
                    <div class="button is-text" v-if="currentUser" @click="handleUpdate()">
                        <b-icon size="is-small" icon="pen"></b-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero" v-if="updating">
            <div class="hero-body has-text-centered">
                <div class="button is-large" @click="addSheet">
                    <b-icon icon="plus"></b-icon>
                    <span>Add Sheet</span>
                </div>
            </div>
        </div>
        <div class="hero sheet-detail" v-for="(sheet, i) in data['meta'].sheets" :key="sheet.id">
            <div class="hero-body">
                <div class="container small content">
                    <div class="level">
                        <div class="level-left">
                            <div class="title">{{sheet.title}}</div>
                        </div>
                        <div class="level-right" v-if="updating">
                            <div class="button is-text" @click="updateSheet(i)"
                                 v-bind:class="{'is-active': activeSheet && activeSheet.id === sheet.id}">
                                <b-icon size="is-small" icon="pen"></b-icon>
                            </div>
                        </div>
                    </div>
                    <div class="subtitle" v-html="sheet.description"></div>
                    <div class="section" v-for="(row, i) in sheet.rows" :key="i">
                        <div class="field" v-html="row.label"></div>
                        <div v-html="row.value"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero" v-if="data.related && data.related.length > 1">
            <div class="hero-body">
                <div class="container small">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-header-title">Related</div>
                        </div>
                        <div class="card-content">
                            <div class="media" v-for="cs in data.related" :key="cs.id" v-if="cs.id !== data.id">
                                <div class="media-left">
                                    <avatar :value="cs.media" class="is-24x24"></avatar>
                                </div>
                                <div class="media-content">
                                    <h3>
                                        <n-link :to="`/${cs.slug}`">{{cs.title}}</n-link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!active" class="hero">
            <div class="hero-body">
                <div class="container has-text-centered">
                    Credit to: <a href="https://simplecheatsheet.com">Simple Cheat Sheet</a>
                </div>
            </div>
        </div>
        <transition>
            <div v-if="active" class="drawer">
                <div class="hero">
                    <div class="hero-body">
                        <div class="container">
                            <div class="level">
                                <div class="level-left widget_title">Add Sheet</div>
                                <div class="level-right">
                                    <button class="delete" @click="active = false"></button>
                                </div>
                            </div>
                            <sheet-form v-model="activeSheet"></sheet-form>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Avatar from "../components/Avatar";
    import {cloneDeep, debounce} from "lodash";
    import SheetForm from "../components/SheetForm";

    const DEFAULT = {
        title: '{Name} Cheat Sheet',
        description: '<i>This is description</i>',
        sheets: [],
        settings: {},
        taxonomies: [],
        user: null
    };

    const DEFAULT_SHEET = {
        title: null,
        description: null,
        rows: []
    };
    export default {
        name: 'HomePage',
        components: {
            SheetForm,
            Avatar
        },
        async asyncData({$api, params}) {
            let data = DEFAULT;
            let updating = false;
            if (params.slug && params.slug !== 'editor') {
                data = await $api['post'].get(params.slug);
            } else {
                updating = true;
            }
            if (data['post_terms'] === null) {
                data['post_terms'] = [];
            }
            if (data['meta'] === null) {
                data['meta'] = {sheets: []};
            }
            return {
                data,
                updating
            }
        },
        head() {
            return {
                script: [
                    {
                        src: 'https://cdn.ckeditor.com/ckeditor5/21.0.0/classic/ckeditor.js'
                    },
                    {
                        src: 'https://unpkg.com/turndown/dist/turndown.js'
                    }
                ],
                title: this.$route.params.slug === 'editor' ? 'Editor' : this.data.title
            }
        },
        data() {
            return {
                active: false,
                activeSheet: null,
                textBar: false,
                taxonomy: {
                    results: []
                }
            }
        },
        methods: {
            addSheet() {
                this.data['meta'].sheets.push({
                    id: this.generateId(),
                    ...cloneDeep(DEFAULT_SHEET)
                });
                this.activeSheet = this.data['meta'].sheets[this.data['meta'].sheets.length - 1];
                this.active = true;
            },
            updateSheet(index) {
                this.activeSheet = this.data['meta'].sheets[index];
                this.active = true;
            },
            handleUpdate() {
                if (this.updating) {
                    this.save();
                } else {
                    this.updating = true;
                }
            },
            async save() {
                let data = cloneDeep(this.data);
                data['options'].media = data['options'].media ? data['options'].media.id : undefined;
                data['post_terms'] = data['post_terms'] ? data['post_terms'].map(x => x.id) : [];
                // if (this.data.id) {
                //     await this.$axios.$put(`/sheet/cheat-sheets/${this.data.slug}/`, data);
                // } else {
                //     let res = await this.$axios.$post(`/sheet/cheat-sheets/`, data);
                //     this.$router.replace({path: '/' + res.slug});
                // }
                this.updating = false;
            },
            getQuerySet: debounce(function (text) {
                this.$api['term_taxonomy'].list({search: text}).then(res => {
                    this.taxonomy = res;
                })
            }, 500),
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
                let check = this.data['post_terms'].map(x => x.id).indexOf(tag.id);
                return check === -1;
            },
            getTagQuerySet: debounce(function (text) {
                this.$api['pub_taxonomy'].list('/general/hash-tags/', {search: text}).then(res => {
                    this.taxonomy = res;
                })
            }, 500),
        },
    }
</script>
<style lang="scss">
    .sheet-detail {
        .section {
            padding: 1rem 0;
        }
    }

    .drawer {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 600px;
        background: white;
        border-left: 1px solid rgb(234, 231, 237);
        overflow-y: auto;
    }
</style>

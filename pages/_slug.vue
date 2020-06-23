<template>
    <div v-bind:style="style">
        <div class="hero has-text-centered is-dark">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">{{data.title}}</h1>
                    <div class="subtitle" v-html="data.description"></div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="columns grid is-multiline">
                    <div class="column sheet is-4" v-for="sheet in data.sheets" :key="sheet.id">
                        <CheatCard :value="sheet"></CheatCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            column: 3,
            sheetColumn: 12,
            font: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
        }
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
                title: this.$route.params.slug === 'editor' ? 'Editor' : this.data.title
            }
        },
        data() {
            return {
                updating: false,
                showStyleOption: false,
                active: false,
                activeSheet: null,
                textBar: false,
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
            style() {
                return {
                    "--header-bg-color": this.data.settings.color["--header-bg-color"] || DEFAULT_SETTINGS.color["--header-bg-color"],
                    "--header-txt-color": this.data.settings.color["--header-txt-color"] || DEFAULT_SETTINGS.color["--header-txt-color"],
                    "--body-text-color": this.data.settings.color["--body-text-color"] || DEFAULT_SETTINGS.color["--body-text-color"],
                }
            }
        },
        mounted() {
            if (process.client) {
                let _this = this;
                setTimeout(function () {
                    _this.reLayout();
                }, 50)
            }
        }
    }
</script>
<style lang="scss">
</style>

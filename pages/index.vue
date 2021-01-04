<template>
    <div class="is-fullheight">
        <div class="hero is-dark">
            <div class="hero-body">
                <div class="container small">
                    <h1 class="title is-1">Cheat Sheet Maker</h1>
                    <p class="subtitle">A cheat sheet (also cheatsheet) or crib sheet is a concise set of notes used for
                        quick reference.</p>
                    <b-field expanded>
                        <p class="control" v-if="currentUser">
                            <n-link to="/editor" class="button is-medium is-primary">
                                <b-icon icon="plus"></b-icon>
                                <span>Add</span>
                            </n-link>
                        </p>
                        <b-autocomplete
                            size="is-medium"
                            :data="data"
                            placeholder="e.g. Css"
                            field="title"
                            :loading="isFetching"
                            :check-infinite-scroll="true"
                            @typing="getAsyncData"
                            @infinite-scroll="getMoreAsyncData"
                            @select="option => $router.replace({path: `/${option.slug}`})"
                            expanded
                        >
                            <template slot-scope="props">
                                <div class="media">
                                    <div class="media-left">
                                        <avatar :value="props.option.media" class="is-24x24"/>
                                    </div>
                                    <div class="media-content">
                                        <n-link :to="`/${props.option.slug}`">{{ props.option.title }}</n-link>
                                    </div>
                                </div>
                            </template>
                        </b-autocomplete>
                    </b-field>
                </div>
            </div>
        </div>
        <div class="hero">
            <div class="hero-body">
                <div class="container">
                    <div class="show-sheet">
                        <div class="header has-text-centered">
                            <h2 class="title">New</h2>
                            <p></p>
                        </div>
                        <div class="columns is-variable is-2 is-multiline">
                            <div class="column is-4" v-for="s in sheet.results" :key="s.id">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-header-title">
                                            <n-link :to="`/${s.slug}`">{{ s.title }}</n-link>
                                        </h3>
                                        <div class="card-header-icon">
                                            <avatar :value="s.media" class="is-24x24"/>
                                        </div>
                                    </div>
                                    <div class="card-content" v-html="s.description"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../components/Avatar";
import debounce from 'lodash/debounce';

export default {
    name: "index",
    components: {Avatar},
    async asyncData(ctx) {
        return {
            sheet: await ctx.$api['post'].list({
                publication: process.env.PUBLICATION
            }),
            hash_tag: await ctx.$api['taxonomy'].list({
                publication: process.env.PUBLICATION
            }),
        }
    },
    data() {
        return {
            data: [],
            isFetching: false,
            name: '',
            page: 1,
            totalPages: 1
        }
    },
    methods: {
        getAsyncData: debounce(function (name) {
            if (this.name !== name) {
                this.name = name;
                this.data = [];
                this.page = 1;
            }

            if (!name.length) {
                this.data = [];
                this.page = 1;
                this.totalPages = 1;
                return;
            }

            if (this.page > this.totalPages) {
                return;
            }

            this.isFetching = true;
            this.$api['pub_post'].list({
                search: name,
                page: this.page
            })
                .then(res => {
                    this.data = res.results;
                    this.page++;
                    this.totalPages = res['num_pages'];
                })
                .catch((error) => {
                    this.data = [];
                    throw error
                })
                .finally(() => {
                    this.isFetching = false;
                })
        }, 500),
        getMoreAsyncData: debounce(function () {
            this.getAsyncData(this.name);
        }, 250)
    },
    created() {
        this.hash_tag.results.forEach(tag => {
            tag.sheets = this.sheet.results.filter(x => x['post_terms'] && x['post_terms'].map(x => x.id).includes(tag.id) && x.media)
        })
    },
}
</script>

<style lang="scss">
.widget_title {
    font-weight: bold;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }
}

.show-sheet {
    .header {
        margin-bottom: 1.5rem;
    }

    .card {
        box-shadow: none;
        border: 1px solid rgb(234, 231, 237);
        background-color: rgb(250, 248, 252);
        height: 100%;

        .card-header {
            background-color: white;
            box-shadow: none;
            border-bottom: 1px solid rgb(234, 231, 237);
        }

        .card-content {
            padding: 1rem;
        }

        .image img {
            object-fit: cover;
        }
    }

    &:not(:last-child) {
        margin-bottom: 1.5rem;
    }
}

</style>

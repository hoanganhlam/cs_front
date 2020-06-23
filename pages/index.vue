<template>
    <div class="is-fullheight">
        <div class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">Cheat Sheet Maker</h1>
                    <p class="subtitle">A cheat sheet (also cheatsheet) or crib sheet is a concise set of notes used for
                        quick reference.</p>
                </div>
            </div>
        </div>
        <div class="section large" style="padding-top: 1.5rem">
            <div class="container">
                <div class="columns">
                    <div class="column is-2" v-for="(cs, index) in six" :key="cs.id">
                        <div class="card">
                            <div class="card-content">
                                <n-link :to="`/${cs.slug}`">
                                    <avatar size="thumb_128_128" :value="cs.media" class="is-96x96"/>
                                </n-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns grid is-multiline">
                    <div class="column is-4" v-for="tag in hash_tag.results" :key="tag.id">
                        <div class="card cheat-sheet">
                            <div class="card-header">
                                <div class="card-header-title">{{tag.title}}</div>
                            </div>
                            <div class="card-content">
                                <ul>
                                    <li class="sheet-item" v-for="sheet in tag.sheets" :key="sheet.id">
                                        <div class="media">
                                            <div class="media-left">
                                                <avatar size="thumb_24_24" :value="sheet.media"
                                                        class="is-24x24"></avatar>
                                            </div>
                                            <div class="media-content">
                                                <n-link :to="`/${sheet.slug}`">{{sheet.title}}</n-link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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

    export default {
        name: "index",
        components: {Avatar},
        async asyncData(ctx) {
            return {
                sheet: await ctx.$axios.$get('/sheet/cheat-sheets/'),
                hash_tag: await ctx.$axios.$get('/general/hash-tags/', {params: {page_size: 200}}),
            }
        },
        computed: {
            six() {
                return this.sheet.slice(0, 6)
            }
        },
        created() {
            this.hash_tag.results.forEach(tag => {
                tag.sheets = this.sheet.filter(x => x.taxonomies.map(x => x.id).includes(tag.id))
            })
        },
        mounted() {
            let elem = document.querySelector('.columns.grid');
            new Masonry(elem, {
                itemSelector: '.column'
            });
        }
    }
</script>

<style lang="scss">
    .sheet-item {
        &:not(:last-child) {
            margin-bottom: .75rem;
        }

        .media {
            .media-left {
                margin-right: .5rem;
            }
        }
    }
</style>

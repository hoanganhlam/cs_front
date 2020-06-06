<template>
    <div class="is-fullheight">
        <div class="section">
            <div class="container">
                <h1 class="title">Cheat Sheet Maker</h1>
                <p class="subtitle">A cheat sheet (also cheatsheet) or crib sheet is a concise set of notes used for
                    quick reference.</p>
            </div>
        </div>
        <div class="section large has-background-light">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="tag in hash_tag.results" :key="tag.id">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-header-title">{{tag.title}}</div>
                            </div>
                            <div class="card-content">
                                <ul>
                                    <li v-for="sheet in tag.sheets" :key="sheet.id">
                                        <n-link :to="`/${sheet.slug}`">{{sheet.title}}</n-link>
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
    export default {
        name: "index",
        async asyncData(ctx) {
            return {
                sheet: await ctx.$axios.$get('/sheet/cheat-sheets/', {params: {page_size: 200}}),
                hash_tag: await ctx.$axios.$get('/general/hash-tags/', {params: {page_size: 200}}),
            }
        },
        created() {
            this.hash_tag.results.forEach(tag => {
                tag.sheets = this.sheet.results.filter(x => x.taxonomies.includes(x.id))
            })
        }
    }
</script>

<style scoped>

</style>

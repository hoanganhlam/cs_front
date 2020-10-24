require('dotenv').config();

export default {
    mode: 'universal',
    env: {
        SITE_TITLE: process.env.SITE_TITLE || 'Cheat Sheet Maker',
        SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || 'Cheat Sheet Maker',
        PUBLICATION: process.env.PUBLICATION || 3
    },
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - CheatSheetMaker.com',
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js'}
        ],
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        '@/scss/app.scss',
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~/plugins/repository'},
        {src: '~/plugins/axios'},
        {src: '~/plugins/auth'},
        {src: '~/plugins/client', mode: 'client'},
        {src: '~/plugins/server'},
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/dotenv'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://buefy.github.io/#/documentation
        'nuxt-buefy',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/dotenv',
        ['cookie-universal-nuxt', {alias: 'ck'}],
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: process.env.API_DOMAIN
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extractCSS: true,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        extend(config, ctx) {
        }
    }
}

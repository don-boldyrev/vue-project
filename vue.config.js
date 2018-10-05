const webpack = require('webpack')
module.exports = {
    baseUrl: '',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
              Vue: ['vue/dist/vue.esm.js', 'default'],
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
              $: 'jquery',
              moment: 'moment',
            }),
        ]  
    }
}
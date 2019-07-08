module.exports = {
    publicPath: '/', // 配置路由基础路径， history 模式需使用绝对路径
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    configureWebpack: {
        // webpack 配置
        output: {
            // 输出重构  打包编译后的 文件名称
            filename: `js/[name].js?${Math.random()}`,
            chunkFilename: `js/[name].js?${Math.random()}`
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions: {}
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 10086,
        https: false,
        hotOnly: false,
        proxy: null,
        // proxy: {
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changOrigin: true
        //     }
        // },
        before: (app) => {}
    }
}
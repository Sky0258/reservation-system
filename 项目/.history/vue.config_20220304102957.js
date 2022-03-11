module.exports = {
    // publicPath:'./static',
    lintOnSave:false,
    devServer:{
        proxy: {
            '/api': {
                target: 'http://120.77.42.192:9090/',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        },
        port: 10010,
        host:'0.0.0.0',
    },
}

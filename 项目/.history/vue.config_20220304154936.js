module.exports = {
    publicPath:'./',
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
        open: true,
        host:'0.0.0.0',
    },
}

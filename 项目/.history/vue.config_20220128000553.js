module.exports = {
    publicPath:'./static',
    lintOnSave:false,
    devServer:{
        proxy:{
            '/account':{
                target: 'http://120.77.42.192:9090'
            },
        },
        port: 8080,
        host:'0.0.0.0',
    },
}

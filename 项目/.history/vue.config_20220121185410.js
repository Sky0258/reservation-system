module.exports = {
    lintOnSave:false,
    devServer:{
        proxy:{
            '/account':{
                target: 'http://120.77.42.192:9090'
            },
        },
        // port: 9000,
        // host:'0.0.0.0',
    },
    // lintOnSave: false,
}

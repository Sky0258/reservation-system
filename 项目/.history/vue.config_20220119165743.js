module.exports = {
    lintOnSave:false,
    devServer:{
        proxy:{
            '/account':{
                target: ''
            }
        }
    }
}
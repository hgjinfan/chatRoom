const userModel = require('../../models/User/user')

exports.login = async (ctx, next) => {
    
}

exports.getList = async (ctx, next) => {
    const find = await userModel.findOne({
        name: 'xugao'
    })
    console.log(find)
    ctx.body = {
        name: '1'
    }
    next()
}
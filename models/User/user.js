const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    password: String,
    id: Number,
    create_time: String
})

userSchema.index({
    id: 1
})

const User = mongoose.model('User', userSchema)

// var xu = new User({
//     name: 'xu',
//     password: 'xugaoxiang',
//     id: '2',
//     create_time: '20181007'
// })

// xu.save((err, xu) => {
//     if(err) {
//         return console.error(err)
//     }
//     console.log('ok')
// })
module.exports = User
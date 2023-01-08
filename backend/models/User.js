const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    }
}, {
    collection:'users'
})

module.exports = mongoose.model('User', userSchema)
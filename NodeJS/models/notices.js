const mongoose = require('mongoose')

var Notices = mongoose.model('Notices',{
    note: {
        type: String
    },
    timeStamp:{
        type: Date,
        default: Date.now
    }
})
/*const Notices = new mongoose.Schema(
                { note: String},
            { timestamps: true})*/

module.exports = {Notices}
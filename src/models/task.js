const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const newS = new Schema({
    folder_id: { type: ObjectId },
    title: { type: String, required: true },
    description: { type: String, default: false }
});

newS.virtual('folders')
    .set(function (folders) {
        this._folders = folders;
    })
    .get(function () {
        return this._folders;
    })

module.exports = mongoose.model('Task', newS)
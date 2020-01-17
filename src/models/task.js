const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

//Schema de tasks
const newS = new Schema({
    folder_id: { type: ObjectId },
    title: { type: String, required: true },
    description: { type: String, default: false }
});


module.exports = mongoose.model('Task', newS)
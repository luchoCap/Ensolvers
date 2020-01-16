const mongoose = require('mongoose');
const { Schema } = mongoose;

const newS = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: false }
});

module.exports = mongoose.model('Task', newS)
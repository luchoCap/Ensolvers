const mongoose = require('mongoose')
const { Schema } = mongoose;
const path = require('path')

//Schema de Folders
const FolderSchema = new Schema({
    title: { type: String }

});



module.exports = mongoose.model('Folder', FolderSchema);
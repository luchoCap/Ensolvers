const mongoose = require('mongoose')
const { Schema } = mongoose;
const path = require('path')

//los nombres como title, etc los pongo yo
const FolderSchema = new Schema({
    title: { type: String }

});

//le voy a quirar la extension al nombre con una variable virtual, y no se almacena en la base de datos
FolderSchema.virtual(`uniqueId`)
    .get(function () {
        return this.title;
    })

module.exports = mongoose.model('Folder', FolderSchema);
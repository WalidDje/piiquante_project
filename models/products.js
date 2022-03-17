//Imports
const mongoose = require('mongoose');

//Schema
const ProductSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String, required: true },
    heat: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: Array },
    usersDisliked: { type:Array },
});

//Schema Exports
module.exports = mongoose.model('Product', ProductSchema);
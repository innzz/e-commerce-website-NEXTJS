const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true})

mongoose.models = {};

export default mongoose.model('Order', ProductSchema);
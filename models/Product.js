const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nane: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    img: {type: String, required: true},
    category: {type: String, required: true},
    size: {type: String},
    color: {type: String},
    price: {type: Number, required: true},
    available: {type: Number, required: true},
}, {timestamps: true})


export default mongoose.model('Order', ProductSchema);
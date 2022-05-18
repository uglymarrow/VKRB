const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: { type: String, required: true },
    prodname: { type: String, required: true },
    proddate: { type: Date, required: true},
    exdate:   { type: Date},
    quantity: { type: Number},
    category: {type: String}
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
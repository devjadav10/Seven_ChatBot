const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        risk: {
            type: String,
            required: false,
        },
        return: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
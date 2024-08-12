const mongoose = require('mongoose')

const typeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        return: {
            type: String,
            required: false,
        },
        expenseRatio: {
            type: String,
            required: false,
        },
    }
);

const mfSchema = mongoose.Schema(
    {
        Low:[typeSchema]
    },
    {
        Medium:[typeSchema]
    },
    {
        High:[typeSchema]
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// import mongoose from 'mongoose'
import mongoose from "./index.js";

const typeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        riskType: {
            type: String,
            required: false,
        },
        returns : {
            type: String,
            required: false,
        },
        expenseRatio : {
            type: String,
            required: false,
        }
    }
);

const mfSchema = mongoose.Schema(
    {
        fund : [typeSchema]
    },
    {
        timestamps: true // Optional: adds createdAt and updatedAt timestamps
    }
)


const MutualFund = mongoose.model('MutualFund', mfSchema);

// module.exports = {
//     MutualFund
// };

export default MutualFund;
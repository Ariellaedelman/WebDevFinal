import mongoose from "mongoose";

const { Schema } = mongoose;

const foodSchema = new Schema (
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "User"
        },

        item_name: {
            type: String,
            trim: true,
            required: true,
        },

        brand_name: {
            type: String,
            required: true,
        },
        
        nf_calories: {
            type: Number,
            required: true,
        },

        nf_total_carbohydrate: {
            type: Number,
            required: true,
        },

        nf_protein: {
            type: Number,
            required: true,
        },

        nf_total_fat: {
            type: Number,
            required: true,
        },

        nf_serving_size_qty: {
            type: Number,
            required: true,
        },

        item_id: {
            type: String,
            required: true,
        },

        /* 
        key: {

        },
        */
    },

    { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
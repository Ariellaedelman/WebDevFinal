import mongoose from "mongoose";

const { Schema } = mongoose;

const foodSchema = new Schema (
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "User"
        },

        name: {
            type: String,
            trim: true,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },
        
        calories: {
            type: Number,
            required: true,
        },

        carbohydrates: {
            type: Number,
            required: true,
        },

        protein: {
            type: Number,
            required: true,
        },

        fat: {
            type: Number,
            required: true,
        },

        serving_size: {
            type: Number,
            required: true,
        },

        food_specific_id: {
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
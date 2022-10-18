import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema (
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        /* 
        username: {
            type: String,
            trim: true,
            required: true,
        },

        */

        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },

        role: {
            type: String,
            default: "User",
        },

        /*
        image: {
            public_id: "",
            url: "",
        },
        */

    },

    { timestamps: true }
);

export default mongoose.model("User", userSchema);
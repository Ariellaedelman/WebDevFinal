import User from "../models/user_model_v2";
import Food from "../models/food_model";
import { hashPassword, comparePassword } from "../helpers/auth_helper_v2";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import db from "../models/model_index";
// import { user } from "../models/model_index";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import React, { useContext, useEffect, useState } from 'react';
//import { AuthContext } from '.../context/auth';

// sendgrid
/*
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
*/

//keeps current user intact 

// signup function
export const signup = async (req, res) => {
    console.log("Signup Hit");
    try {
        // validation
        const { name, email, password, age, height_ft, height_inch, weight, gender, activitylevel, goal, macro_plan, carbs, fat, protein, calories, stars, rating, curr_macro_plan, curr_carbs, curr_fat, curr_protein, curr_calories} = req.body;
        if (!name) {
            return res.json({
            error: "Name is required",
            });
        }
        if (!email) {
            return res.json({
            error: "Email is required",
            });
        }
        if (!password || password.length < 6) {
            return res.json({
            error: "Password is required and should be 6 characters long",
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
            error: "Email is taken",
            });
        }

        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await new User({
            name,
            email,
            password: hashedPassword,
            age, 
            height_ft, 
            height_inch, 
            weight, 
            gender, 
            activitylevel, 
            goal,
            macro_plan,
            carbs,
            fat,
            protein,
            calories,
            stars,
            rating,
            curr_macro_plan, 
            curr_carbs, 
            curr_fat, 
            curr_protein, 
            curr_calories,
            }).save();

            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
            });

            //   console.log(user);
            const { password, ...rest } = user._doc;
            return res.json({
            token,
            user: rest,
            });
        } 
        catch (err) {
            console.log(err);
        }
    } 
    catch (err) {
        console.log(err);
    }
};

// signin function
export const signin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        
        // check if our db has user with that email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
            error: "No user found",
            });
        }
        
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
            error: "Wrong password",
            });
        }

        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
        });

        user.password = undefined;
        user.secret = undefined;

        res.json({
        token,
        user,
        });

    } 
    catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};



/* export const forgotPassword = async (req, res) => {
const { email } = req.body;
// find user by email
const user = await User.findOne({ email });
console.log("USER ===> ", user);
if (!user) {
return res.json({ error: "User not found" });
}
// generate code
const resetCode = nanoid(5).toUpperCase();
// save to db
user.resetCode = resetCode;
user.save();
// prepare email
const emailData = {
from: process.env.EMAIL_FROM,
to: user.email,
subject: "Password reset code",
html: "<h1>Your password  reset code is: {resetCode}</h1>"
};
// send email
try {
const data = await sgMail.send(emailData);
console.log(data);
res.json({ ok: true });
} catch (err) {
console.log(err);
res.json({ ok: false });
}
};
*/

/* export const resetPassword = async (req, res) => {
try {
const { email, password, resetCode } = req.body;
// find user based on email and resetCode
const user = await User.findOne({ email, resetCode });
// if user not found
if (!user) {
return res.json({ error: "Email or reset code is invalid" });
}
// if password is short
if (!password || password.length < 6) {
return res.json({
error: "Password is required and should be 6 characters long",
});
}
// hash password
const hashedPassword = await hashPassword(password);
user.password = hashedPassword;
user.resetCode = "";
user.save();
return res.json({ ok: true });
} catch (err) {
console.log(err);
}
}; */

// adding foods to database
export const addFood = async (req, res) => {
    console.log("Adding Food Hit");
    try {
        // const theUser = user.default.db.collection("users")
        //const db = require("../models/model_index")
        //console.log(theUser);
        const { user_id, item_name, brand_name, nf_calories, nf_total_carbohydrate, nf_protein, nf_total_fat, nf_serving_size_qty, item_id, date } = req.body;
        console.log(req.body)

        const newFood = await new Food({
            user_id, 
            item_name, 
            brand_name, 
            nf_calories, 
            nf_total_carbohydrate, 
            nf_protein, 
            nf_total_fat, 
            nf_serving_size_qty, 
            item_id,
            date,
            }).save();


            res.json({ ok: true });

    } 
    catch (err) {
        console.log(err);
        res.json({ ok: false })
    }
};

// removing foods to database
export const removeFood = async (req, res) => {
    console.log("Removing Food Hit");
    try {
        // const theUser = user.default.db.collection("users")
        //const db = require("../models/model_index")
        //console.log(theUser);
        const { user_id, item_id } = req.body;
        console.log("this is the body: ", req.body)

        const removedFood = await Food.deleteOne({'user_id': user_id, 'item_id': item_id})


        res.json({ ok: true });

    } 
    catch (err) {
        console.log(err);
        res.json({ ok: false })
    }
};



// updating user
export const update = async (req, res) => {
    console.log("Updating User Hit");

   // const dbUsing = db.mongoose.("calutritionDB")

    try {
        const { email, age, height_ft, height_inch, weight, gender, activitylevel, goal, macro_plan, carbs, fat, protein, calories } = req.body;
        // console.log(req.body) *TESTING PURPOSES*
        //console.log(res.body)
        
        /* 
        const updatedUser = await User.findOne({ email });

        if (!updatedUser) {
            return res.json({
            error: "No user found",
            });
        }

        */

        //console.log(updatedUser)

        const newUpdatedUser = await User.findOneAndUpdate({email}, {age, height_ft, height_inch, weight, gender, activitylevel, goal, macro_plan, carbs, fat, protein, calories},
            /*
            function (err, docs) {
                if (err){
                    console.log(err)
                    res.json({ ok: false })
                }
                else{
                    console.log("Original Doc : ", docs);
                    res.json({ ok: true });
                }
            }
            */
           )
        
            /*
            const updateUser = await new User({
                name: user.name,
                email,
                password: user.password,
                age, 
                height_ft, 
                height_inch, 
                weight, 
                gender, 
                activitylevel, 
                goal,
                calories,
                }).save();
            */

            res.json({ ok: true });
        

    } 
    
    catch (err) {
        console.log(err);
        res.json({ ok: false })
    }
    
    
};

// updating current user info
export const updateCurr = async (req, res) => {
    console.log("Updating Current User Info Hit");

   // const dbUsing = db.mongoose.("calutritionDB")

    try {
        //remember to add ratings and the foods array soon
        const { email, curr_macro_plan, curr_carbs, curr_fat, curr_protein, curr_calories, stars, rating, date} = req.body;
        console.log(req.body)

        const newUpdatedCurrUser = await User.findOneAndUpdate({email}, {curr_macro_plan, curr_carbs, curr_fat, curr_protein, curr_calories, stars, rating}, )
        const newUpdatedCurrUserArr = await User.findOneAndUpdate({email}, {$push: {final_days_array: {
            "final_calories": curr_calories,
            "final_carbs": curr_carbs,
            "final_protein": curr_protein,
            "final_fat": curr_fat,
            "final_rating": rating,
            "date": date
                }
            }
        }); //in}, )

        
        

        res.json({ ok: true });
        

    } 
    
    catch (err) {
        console.log(err);
        res.json({ ok: false })
    }
    
    
};

// getting foods to database
export const getFood = async (req, res) => {
    console.log("Getting Foods Hit");
    try {
        // const theUser = user.default.db.collection("users")
        //const db = require("../models/model_index")
        //console.log(theUser);
        const { user_id, date } = req.body;
        console.log("this is req body for foods: ", req.body)

        /* 
        const oneFood = await Food.find({'user_id' : user_id})
        console.log(oneFood)
        */

        const retrivedFoods = await Food.find({'user_id': user_id, 'date': date})
        console.log(retrivedFoods)



        res.json(retrivedFoods);

    } 
    catch (err) {
        console.log(err);
        res.json({ ok: false })
    }
};

// getting full day of stats from database
export const getFullDay = async (req, res) => {
    console.log("Getting Specific Day Hit");
    try {
        // const theUser = user.default.db.collection("users")
        //const db = require("../models/model_index")
        //console.log(theUser);
        const {  user_id, date } = req.body;
        console.log("this is req body for full day: ", req.body)

        /* 
        const oneFood = await Food.find({'user_id' : user_id})
        console.log(oneFood)
        */

        const retrivedStats = await User.find({'user_id': user_id, "final_days_array.date": date})
        console.log(retrivedStats)



        res.json(retrivedStats);

    } 
    catch (err) {
        console.log(err);
        res.json({ ok: false })
    }
};
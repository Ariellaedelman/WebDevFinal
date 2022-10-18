import express from "express";

const router = express.Router();

//import { signup, signin, forgotPassword, resetPassword } from "../controllers/auth_controller_v2"
// controller
const { signup, signin, forgotPassword, resetPassword } = require("../controllers/auth_controller_v2");

router.get("/", (req, res) => {
    return res.json({
        data: "hello world from the API",
    })
});

/* router.get("/calutritionDB", (req, res) => {
    return res.json({
        data: "idk how to do a get",
    })
}); */

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
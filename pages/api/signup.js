import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

var CryptoJS = require("crypto-js");

const handler = async(req,res)=>{
    if (req.method == 'POST') {
        const {name,email} = req.body;
        let user = new User({email, name, password: CryptoJS.AES.encrypt(req.body.password, '#1113').toString()});
        await user.save();
        res.status(200).json({success: "success"})
    }
    else{
    res.status(400).json({error: "error"})
    }
}

export default connectDb(handler);

        
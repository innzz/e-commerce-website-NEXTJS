import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
// const token = jwt.sign({ foo: 'bar'},'sign',{ expiresIn: '1h'});

const handler = async(req,res)=>{
    if (req.method == 'POST') {
        let user = await User.findOne({"email": req.body.email});
        if(user){
            const bytes  = CryptoJS.AES.decrypt(user.password, '#1113');
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if(req.body.email == user.email && req.body.password == decryptedPassword ){
                const token = jwt.sign({email: user.email,name: user.name},'#1113',{ expiresIn: '2d'});
                res.status(200).json({success:true, token: token});
            }
            else{
                res.status(400).json({success: false, error: "Invalid Credentials"})
            }
        }
        else{
            res.status(400).json({success: false, error: "User not found"})
        }
    }
    else{
    res.status(400).json({error: "error"})
    }
}

export default connectDb(handler);

        
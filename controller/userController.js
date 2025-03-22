import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function saveUser(req,res){

    if (req.body.role =="admin"){
        if(req.user==null){
            res.status(403).json({
                message : "Please login as admin before creating an admin account",
            });
            return;
        }
        if(req.user.role !="admin"){
            res.status(403).json({
                message : "You are not autherized to create an admin account",
            })
            return;
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const user =new User({
        email : req.body.email,
        fristName : req.body.fristName,
        lastName : req.body.lastName,
        password : hashedPassword,
        role : req.body.role,

        

    });

    

    user.save().then(()=>{
        res.json({
            message : "User saved successfully"
        })
    }).catch(()=>{
        res.json({
            message :"User not saved"
        })
    })
}

export function loginUser(req,res){

    const email = req.body.email;
    const password =req.body.password;

    User.findOne({
        email : email
    }).then((user)=>{
        if(user==null){
        res.json({
            message :"Invalid email"
        })
    }else{
        const isPasswordCorrect =bcrypt.compareSync(password , user.password)
        if(isPasswordCorrect){

const userData = {
email:user.email,
fristName:user.fristName,
lastName:user.lastName,
role:user.role,
phone:user.phone,
isDisable:user.isDisable,
isEmailVerified:user.isEmailVerified

}

const token = jwt.sign(userData,"password") 


            res.json({
                message :"Login successfully",
                token:token,
            });
            
        }else{
            res.json({
                message:"Invalid password"
            })
        }
    }
    })
}
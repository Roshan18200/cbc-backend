import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SAVE USER
export async function saveUser(req, res) {
    try {
        const { email, password, role, firstName, lastName } = req.body;

        // Check required fields
        if (!email || !password || !firstName || !lastName || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Admin creation authorization
        if (role === "admin") {
            if (!req.user) {
                return res.status(403).json({
                    message: "Please login as admin before creating an admin account",
                });
            }
            if (req.user.role !== "admin") {
                return res.status(403).json({
                    message: "You are not authorized to create an admin account",
                });
            }
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create and save user
        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            role,
        });

        await user.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ message: "User not saved" });
    }
}

// LOGIN USER
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const userData = {
            id: user._id,
            email: user.email,
            firstName: user.fristName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            isDisable: user.isDisable,
            isEmailVerified: user.isEmailVerified,
        };

        const token = jwt.sign(userData, "password", { expiresIn: "1h" });


        res.json({
            message: "User logged in",
            token: token,
            user : {
              firstName : user.firstName,
              lastName : user.lastName,
              role : user.role,
              profilePicture : user.profilePicture,
              email : user.email
            }
          })
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
/*
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function saveUser(req,res){

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
        firstName : req.body.fristName,
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
}*/
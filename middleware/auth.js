import jwt from 'jsonwebtoken';  // or const jwt = require('jsonwebtoken');


export default function verifyJWT (req,res,next){
    const header = req.header("Authorization");
   if(header != null){
    const token=header.replace("Bearer ","")
    jwt.verify(token,"password",(err , decoded)=>{
        console.log(decoded)
        if(decoded !=null){
            req.user = decoded
        }
    })
   }
next()

}

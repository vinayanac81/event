import jwt from "jsonwebtoken"

export default async(req,res,next)=>{
    try {
        // got error here
        const auth= req.headers.authorization
        if (auth === undefined) {
          res.json({ message: "no token provided,please login.", success: false ,noToken:true });
        }
        let token = auth.split(" ").pop();
        // console.log(token);
      jwt.verify(token,"vinayan",(err,decoded)=>{
        // console.log('jj');
        if(err){
          console.log("k");
            res.status(200).send({msg:"Authentication failed,Token expired.",success:false,tokenExp:true})
        }else{
            // console.log(decoded);
            console.log("done");
            req.body.managerId=decoded.id
            next()
        }
      })
    } catch (error) {
     console.log(error);   
    }
}
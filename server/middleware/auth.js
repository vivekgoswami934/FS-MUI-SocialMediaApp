import jwt from 'jsonwebtoken';


export const verifyToken =async (req,res,next) => {
try{

    let token = req.header("Authorization")

    if(!token) return res.stats(403).send("Access Denied")

    if(token.startWith("Bearer ")) token = token.slice(7,token.length).trimleft();

    const verified  = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = verified;

    next()
    

}catch(err){
    res.status(500).json({err : err.message})
}
} 
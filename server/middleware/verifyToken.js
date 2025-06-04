import jwt from 'jsonwebtoken'

export const verifyToken =  ( req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({success: false, message: 'Unauthorized, no token'})

    } 

    try {
        const decoded  =  jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
        return res.status(401).json({success: false, message: 'Unauthorized, invalid token'})       
        }

        req.UserId = decoded.id
        next() 
    } catch (error) { 
        console.log(error)
        return res.status(401).json({success: false, message:'Unauthorized, auth error'})
    }


}
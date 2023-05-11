const jwt = require('jsonwebtoken')
//Вообще эта канитель на будущее сейчас просто не хочу потерять
module.exports = function (role) {
    return function (req, res, next){
        if (req.method === "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message:"Ne Avtorizovan"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !==role){
                return res.status(403).json({message:"net pristupa"})
            }
            req.user = decoded
            next()
        } catch (e){
            res.status(401).json({message:"Ne Avtorizovan"})
        }
    };
}


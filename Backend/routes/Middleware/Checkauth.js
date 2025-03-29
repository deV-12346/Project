const jwt =  require("jsonwebtoken")
const Secret_key = ''

const checkauth = async (req,res,next) =>{
       const token = req.header("Authorization")
       if (!token) {
            return res.status(401).json({ message: 'No token provided, access denied' });
      }
      try {
            const decoded = await jwt.verify(token.split(' ')[1],Secret_key); 
        
            req.user = decoded;
            
            next();
          } catch (err) {
            res.status(403).json({ message: 'Invalid or expired token' });
          }
};


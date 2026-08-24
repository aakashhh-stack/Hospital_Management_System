import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv({ path: "../.env" })

function isAuth(req, res, next) {
    try {

        const authToken = req.headers.authorization
        if (!authToken) {
            return res.status(401).json(
                {
                    message: 'Invalid Token  or Expired',
                    success: false
                }
            )
        }
        const [schema, token] = authToken.split(' ');

        if (schema !== 'Bearer' || !token) {
            return res.status(401).json({
                message: 'Invalid authorization format',
                success: false
            })

        }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();


    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }

}

export default isAuth;
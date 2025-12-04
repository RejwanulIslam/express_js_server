import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const auth = (...roles: string[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(500).json({ message: "You are not allowed" })
            }
            const decode = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload
            req.user = decode
            console.log(decode)

            if (roles.length && !roles.includes(decode.role)) {
                return res.status(500).json({
                    error: "unauthorize"
                })
            }
            next()
        } catch (error: any) {
            res.status(500).send({
                message: error.message
            })
        }
    }


}

export default auth;
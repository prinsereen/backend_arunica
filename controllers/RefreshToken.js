import jwt from "jsonwebtoken";
import Student from "../models/StudentModel.js";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Student.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);

            const user_id = user.id;
            const user_name = user.name;
            const user_email = user.email;
            const user_nisn = user.nisn;
    

        const accessToken = jwt.sign({user_id, user_name, user_email, user_nisn}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}
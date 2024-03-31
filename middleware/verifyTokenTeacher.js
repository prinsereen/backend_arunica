import jwt from "jsonwebtoken"

export const verifyTokenTeacher = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_TEACHER, (err, decoded) => {
        if (err) {
            console.log("error here")
            return res.sendStatus(403);
        }
        console.log(decoded)
        req.user = {
            id: decoded.id,
            nip: decoded.nip,
            email: decoded.email,
            name: decoded.name,
        };
        console.log(req.user)
        next();
    });
};

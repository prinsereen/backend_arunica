import jwt from "jsonwebtoken"

export const verifyTokenAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log(decoded)
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
        };
        console.log(req.user)
        next();
    });
};

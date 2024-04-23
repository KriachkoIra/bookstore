import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token." });
  } else {
    jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      } else {
        if (decoded.role !== "admin") {
          return res.status(401).json({ message: "Invalid admin." });
        }
        req.role = decoded.role;
        next();
      }
    });
  }
};

export { verify };

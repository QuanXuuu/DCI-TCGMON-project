import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.id,
    };

    next();
  } catch (err) {
    res.clearCookie("jwt");
    return res.redirect("/");
  }
};

export default checkAuth;

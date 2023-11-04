import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.id,
    };

    console.log(req.user);

    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

export default checkAuth;

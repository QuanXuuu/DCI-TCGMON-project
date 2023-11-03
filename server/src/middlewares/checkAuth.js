const checkAuth = (req, res, next) => {
  // check if there is a Cookie
  // check if the Token in Cookie valid or not
  const payload = jwt.verify(token);

  req.user = {
    id: payload.id.
  }
  next();
};

export default checkAuth;

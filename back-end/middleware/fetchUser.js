const jwt = require("jsonwebtoken");

const JWT_PASSWORD = "Revanth@101";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  
    if(!token)
    {
      res.send("Not a valid Token");
    }
  const rr = jwt.verify(token, JWT_PASSWORD);

  if (!rr) {
    res.send("Not a valid Token");
  } else {
    req.user=rr.user;
    
  }
  next();
};

module.exports = fetchUser;

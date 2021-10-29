const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Bearer } = require('permit');
const permit = new Bearer();
const database = require("../db/models");
const { User } = database;

module.exports = {
  login(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email: email
      },
    }).then((user) => {
      if (!user) return res.status(401).json({ error: "email not found" });

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "invalid password" });
      }

      let jwtPayload = { email: user.email };
      // let jwtPayload = { id };
      let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

      return res.status(200).json({ token
        // id, name, email, role, restaurant, token
       });
      })
      .catch((error) =>
          res.status(400).json({
            code: 400,
            error: error.message
          })
        );
    },

  auth(req, res, next) {
     const token = permit.check(req);

     if (!token) {
       permit.fail(res);
       return res.status(401).json({
          error: "authentication required!" });
     }
 
     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       if (err) {
         permit.fail(res);
         return res.status(401).json({ error: "failed to authenticate token!" });
       }
 
       req.email = decoded.email;
       next();
     });
}

}
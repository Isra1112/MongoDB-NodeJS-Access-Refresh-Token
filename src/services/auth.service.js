const config = require("../../config/authConfig");
const db = require("../models/index.model");
const { user: User, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class Auth{
    async signin(req,res){
      User.findOne({
        email: req.body.email,
      })
        .populate("roles","name default")
        .exec(async (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
            });
          }
    
          let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
          });
    
          let refreshToken = await RefreshToken.createToken(user);
    
          //   let authorities = [];
    
        //   for (let i = 0; i < user.roles.length; i++) {
        //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        //   }
          res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            accessToken: token,
            refreshToken: refreshToken,
          });
        });
    };

    async accessToken(req,res){
      const { refreshToken: requestToken } = req.body;
    
      if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
      }
    
      try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
    
        if (!refreshToken) {
          res.status(403).json({ message: "Refresh token is not in database!" });
          return;
        }
    
        if (RefreshToken.verifyExpiration(refreshToken)) {
          RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
          
          res.status(403).json({
            message: "Refresh token was expired. Please make a new signin request",
          });
          return;
        }
    
        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
          expiresIn: config.jwtExpiration,
        });
    
        return res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: refreshToken.token,
        });
      } catch (err) {
        return res.status(500).send({ message: err });
      }
    };
}


module.exports = Auth
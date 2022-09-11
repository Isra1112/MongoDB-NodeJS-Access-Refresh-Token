const mongoose = require("mongoose");
const config = require("../../config/authConfig");
const { v4: uuidv4 } = require('uuid');

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: {
    type: Date,
    default: Date.now,
    index: { expires: config.jwtRefreshExpiration }
    // index: { expires: 60 * 60 * 24 }
  },
});

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + config.jwtRefreshExpiration
  );

  let _token = uuidv4();

  let _object = new this({
    token: _token,
    user: user._id,
  });


  let refreshToken = await _object.save();

  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;




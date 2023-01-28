const jwt = require("jsonwebtoken");
const APP_SECRET = "EBProps";

function getUserId(context) {
  /* const Authorization = context.request.get('Authorization') */
  const Authorization = context.token;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

const verifyToken = (authHeader) => {
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    const result = jwt.verify(token, APP_SECRET);
    console.log("result", result);
    if (result.userId) {
      return true;
    } else return false;
  }
};

module.exports = {
  APP_SECRET,
  getUserId,
  verifyToken,
};

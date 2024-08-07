const bcrypt = require("bcryptjs");
const { create } = require("connect-mongo");
const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "Not authenticated" });
  console.log(authHeader);
  const token = authHeader.split(" ")[1]; //El espacio entre comillas es importante
  console.log(authHeader);
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};

module.exports = {
  createHash,
  isValidPassword,
  generateToken,
  authToken,
};

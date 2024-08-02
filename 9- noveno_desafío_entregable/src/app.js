const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const messageRouter = require("./routes/messages.router.js");
const sessionRouter = require("./routes/api/session.router.js");
const viewsRouter = require("./routes/views.router.js");
const dotenv = require("dotenv");
const passport = require("passport");
const nodemailer = require("nodemailer");
const { errorHandler } = require("./middleware/index.js");

const { passportCall, authorization, generateToken } = require("./utils.js");
const initializePassport = require("./config/passport.config.js");

const { devLogger, prodLogger } = require("./middleware/logger.js");

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cookieParser());
app.use(cors());
app.use(
  session({
    // store: new FileStoreInstance({ path: "./session", ttl: 100, retries: 0 }),
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  try {
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error en la conexión", error);
  }
};

connectMongoDB();

app.get("/info", (req, res) => {
  prodLogger.debug("Probando");
  res.send({ message: "Prueba de logger" });
});

app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);
app.use("/", productsRouter);
app.use("/carts", cartsRouter);
app.use("/", messageRouter);
app.use(errorHandler);

app.listen(PORT, `0.0.0.0`, () =>
  console.log(`Server listening on port ${PORT}`)
);

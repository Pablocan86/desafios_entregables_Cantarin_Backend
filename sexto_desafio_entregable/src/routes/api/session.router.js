const express = require("express");
const userModel = require("../../dao/models/users.model.js");
const passport = require("passport");

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failregister" }),
  async (req, res) => {
    res.redirect("/userregistrade");
  }
);

router.get("/failregister", async (req, res) => {
  console.log("Estrategia fallida");
  res.send({ error: "Falló" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales invalidas" });
    try {
      if (!req.user) return res.redirect("/register");
      req.session.user = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.rol,
      };

      if (req.session.user.rol === "admin") {
        res.redirect("/productsManager");
      } else {
        res.redirect("/products");
      }
    } catch (err) {
      res.status(500).send("Error al iniciar sesión");
    }
  }
);

router.get("/faillogin", (req, res) => {
  res.send({ error: "Login fallido" });
});
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/login");
  });
});

router.get("/auth/google", passport.authenticate("google", { scope: "email" }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "login" }),
  async (req, res) => {
    req.session.user = req.user;
    if (req.session.user.rol === "admin") {
      res.redirect("/productsManager");
    } else {
      res.redirect("/products");
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: "user.email" }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "login" }),
  async (req, res) => {
    req.session.user = req.user;
    if (req.session.user.rol === "admin") {
      res.redirect("/productsManager");
    } else {
      res.redirect("/products");
    }
  }
);
module.exports = router;

const express = require("express");
const userModel = require("../../dao/models/users.model.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const newUser = new userModel({
      first_name,
      last_name,
      email,
      age,
      password,
    });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error al registrar usuario");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) return res.redirect("/register");
    req.session.user = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      rol: user.rol,
    };

    if (req.session.user.rol === "admin") {
      res.redirect("/productsManager");
    } else {
      res.redirect("/products");
    }
  } catch (err) {
    res.status(500).send("Error al iniciar sesión");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.redirect("/login");
  });
});

module.exports = router;

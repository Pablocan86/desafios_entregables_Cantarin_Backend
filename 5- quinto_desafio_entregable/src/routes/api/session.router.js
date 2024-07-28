const express = require("express");
const userModel = require("../../dao/models/users.model.js");
const {createHash, isValidPassword} = require("../../utils.js")


const router = express.Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const newUser = new userModel({
      first_name,
      last_name,
      email,
      age,
      password:createHash(password),
    });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error al registrar usuario");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if(!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"})
   try {
    const user = await userModel.findOne({ email },{email:1,first_name:1,last_name:1,password:1,age:1,rol:1});
    if(!user) return res.status(400).send({status:"error",error:"User not found"})
    if(!isValidPassword(user,password)) return res.status(403).send({status:"error",error:"Incorrect password"})
    delete user.password;
  req.session.user=user
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

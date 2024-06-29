const cartManager = require("../dao/cartManager.js");

const cartService = new cartManager();

exports.getcarts = async (req, res) => {
  try {
    let carts = await cartService.getCarts();
    res.send({ result: "success", payload: carts });
  } catch (error) {
    console.error("No se encuentas carritos en la Base de datos", error);
  }
};

exports.addCart = async (req, res) => {
  await cartService.addCart();
  let carts = await cartService.getCarts();
  console.log("Carrito creado correctamente");
  res.send({ result: "success", payload: carts });
};

exports.getCartById = async (req, res) => {
  let { cid } = req.params;

  try {
    let cart = await cartService.getCartById(cid);
    res.render("cart", { cart, style: "cart.css", title: "Carrito" });
  } catch (error) {
    res.status(500).send("Error al obtener el carrito");
  }
};

exports.addToCart = async (req, res) => {
  let { cid, pid } = req.params;
  try {
    await cartService.addToCart(pid, cid);

    res.redirect("/products");
  } catch (error) {
    console.error("No se puede agregar el producto", error);
    res.status(500).send("Error de conexión");
  }
};

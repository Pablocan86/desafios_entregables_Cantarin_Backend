const express = require("express");
const router = express.Router();
const cartModel = require("../dao/models/cart.model.js");
const productModel = require("../dao/models/product.model.js");
const CartManager = require("../dao/cartManager.js");
const cartController = require("../controllers/cartController.js");

const cartManager = new CartManager();

//Muesra todos los carritos
router.get("/carts", cartController.getcarts);

//Crea un carrito
router.post("/createcart", cartController.addCart);

//Muestra carrito con productos detallados
//(lo comento para que no tenga problemas con el otro router del handlebar)
// router.get("/carts/:cid", async (req, res) => {
//   try {
//     let { cid } = req.params;
//     let cart = await cartModel.findById(cid).populate("products.product");
//     if (cart) {
//       res.send({ products: cart });
//     } else {
//       res.send({ message: "No existe 🛒" });
//     }
//   } catch (error) {
//     console.error("No existe carrito");
//     res.json({ message: "No existe carrito" });
//   }
// });

router.get("/carts/:cid", cartController.getCartById);

//No se pide en las cosignas, de todos modos tratar de adaptar

router.post("/carts/:cid/products/:pid", cartController.addToCart);

/*Ruta que agrega solo la cantidad pasada por body
{
  quantity:Number
}
*/

router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    let { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ Respusta: "Carrito no encontrado" });
    }

    let existProduct = cart.products.find((p) => p.product.toString() === pid);

    if (!existProduct) {
      return res
        .status(404)
        .send({ Respuesta: "Producto no encontrado en el carrito" });
    } else {
      existProduct.quantity++;
      let result = await cartModel.updateOne(
        { _id: cid },
        { products: cart.products }
      );

      res.redirect(`/carts/${cid}`);
    }
  } catch (error) {
    res.status(504).send(error);
  }
});

//Prueba para acceder a los productos
router.get("/carrito/:cid/product/:pid", async (req, res) => {
  let { cid, pid } = req.params;
  console.log(pid);
  const cart = await cartModel.findById(cid);
  const producto = cart.products.find((p) => (p.product.id = pid));
  res.send({ producto: producto });
});
//Ruta que borra todo el carrito

// router.delete("/carts/:uid", async (req, res) => {
//   let { uid } = req.params;
//   try {
//     await cartManager.deleteCart(uid);

//     res
//       .status(201)
//       .json({ message: `Carrito con ID: '${uid}' borrado correctamente` });
//   } catch (error) {
//     if (
//       error.message === "No se encuentra carrito con es id en la base de datos"
//     ) {
//       res.status(400).json({
//         error: "No se encuentra carrito con es id en la base de datos",
//       });
//     } else if (error.message === "No hay carritos para borrar") {
//       res.status(401).json({ error: "No hay carritos para borrar" });
//     } else {
//       res
//         .status(500)
//         .json({ error: "Ocurrió un error al procesar la solicitud" });
//     }
//   }
// });

//Ruta que solo borra el producto del carrito seleccionado
// router.delete("/carts/:cid/products/:pid", async (req, res) => {
//   try {
//     let { cid, pid } = req.params;

//     const cart = await cartModel.findById(cid);
//     if (!cart) {
//       return res.status(404).send({ Respuesta: "Carrito no encontrado" });
//     }

//     let productInCart = cart.products.find((p) => p._id.toString() === pid);

//     if (!productInCart) {
//       return res
//         .status(404)
//         .send({ Respuesta: "No existe producto en el carrito" });
//     }

//     // Eliminar el producto del array de productos
//     cart.products = cart.products.filter((p) => p._id != pid);

//     // Guardar los cambios en el carrito
//     await cart.save();

//     res.render("cart", { cart, style: "cart.css", title: "Carrito" });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

router.delete("/carts/:cid/products/:pid", async (req, res) => {
  try {
    let { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ Respusta: "Carrito no encontrado" });
    }

    let existProduct = cart.products.find((p) => p.product.toString() === pid);

    if (!existProduct) {
      return res
        .status(404)
        .send({ Respuesta: "Producto no encontrado en el carrito" });
    } else {
      existProduct.quantity--;
      let result = await cartModel.updateOne(
        { _id: cid },
        { products: cart.products }
      );

      res.redirect(`/carts/${cid}`);
    }
  } catch (error) {
    res.status(504).send(error);
  }
});

module.exports = router;

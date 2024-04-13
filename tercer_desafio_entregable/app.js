const ProductMananger = require("./productManager");
const express = require("express");

const manager = new ProductMananger();
//Inicializamos Express
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || null;
    await manager.getProducts();
    let productos = manager.products;
    if (limit !== null) {
      productos = productos.slice(0, limit);
    }

    res.send({ products: productos });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
const { Server } = require("socket.io");
const ProductMAnager = require("./productManager.js");

const managerP = new ProductMAnager();

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Listenning on PORT ${PORT}`)
);

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

socketServer.on("connection", (socket) => {
  console.log("Nuevo Cliente");

  socket.on("newProduct", (newProduct) => {
    managerP.addProduct(
      newProduct.title,
      newProduct.description,
      newProduct.price,
      newProduct.status,
      newProduct.thumbnail,
      newProduct.code,
      newProduct.stock,
      newProduct.category
    );
    console.log(`Producto ${newProduct.title} agregado al carrito`);
  });

  socket.on("selectId", (numero) => {
    managerP.deleteProduct(numero);
    console.log(`Producto con número de ID: ${numero} borrado`);
  });
});

app.use("/", productsRouter);
app.use("/", cartRouter);

class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("Ya existe un producto con el mismo código.");
      return;
    }

    const product = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    console.log("Producto agregado:", product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
    }
    console.error("No found");
  }
}

const manager = new ProductManager();

manager.addProduct(
  "Camisa",
  "Camisa de algodón",
  25.99,
  "img/camisa.jpg",
  "CAM001",
  50
);
manager.addProduct(
  "Pantalón",
  "Pantalón vaquero",
  35.99,
  "img/pantalon.jpg",
  "PAN001",
  30
);
manager.addProduct(
  "Pantalón",
  "Pantalón vaquero",
  35.99,
  "img/pantalon.jpg",
  "PAN002",
  30
);

console.log("Todos los productos:", manager.getProducts());

console.log("Producto con ID 1:", manager.getProductById(1));
console.log("Producto con ID 3:", manager.getProductById(3));
console.log("Producto con ID 4:", manager.getProductById(4));

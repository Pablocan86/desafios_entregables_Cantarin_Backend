/*Poder agregar, consultar, modificar y eliminar producto
y manejarlo en persistencia*/

const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./segundo_desafio_entregable/Products.json";
    this.nextId = 1;
  }
  //Crea el archivo JSON o agregar productos al mismo
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
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
      fs.writeFile(this.path, JSON.stringify(this.products));
      console.log(
        `Su producto con el nombre "${product.title}" fue agregado correctamente`
      );
    } catch (error) {
      console.error("No se puede agregar producto", error);
    }
  }

  //Obtengo solo el producto con el ID seleccionado
  async getProductById(id) {
    try {
      const productos = await this.readPath();
      const productoEncontrado = productos.find(
        (producto) => producto.id === id
      );
      if (productoEncontrado) {
        console.log(`Usted seleccionó ${productoEncontrado.title}`);
      } else {
        console.log("No se encontró ningún producto con ese ID");
      }
    } catch (error) {
      console.error("Error al leer el archivo de productos", error);
    }
  }

  //Borro un producto del JSON
  async deleteProduct(id) {
    try {
      const productos = await this.readPath();
      const productosActualizados = productos.filter(
        (producto) => producto.id != id
      );
      const productoEliminado = productos.find(
        (producto) => producto.id === id
      );
      if (productoEliminado) {
        fs.writeFile(this.path, JSON.stringify(productosActualizados, null, 2));
        console.log(`Usted ha eliminado producto ${productoEliminado.title}`);
        await this.getProducts();
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al leer el archivo de productos", error);
    }
  }

  //Obtengo el contenido del achivo JSON en forma de arreglo
  async getProducts() {
    try {
      const contenido = await this.readPath();
      this.products = contenido;
      console.log(contenido);
    } catch (error) {
      "No hay productos en la lista", error;
    }
  }
  //Obtengo contenido del archivo JSON
  async readPath() {
    try {
      const contenido = await fs.readFile(this.path, "utf8");
      const productos = JSON.parse(contenido);
      return productos;
    } catch (error) {
      throw new Error("Error al leer el archivo de productos", error);
    }
  }
  //Actualizo producto
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      const contenido = await this.readPath();
      const productoReemplazar = contenido.find((e) => e.id === id);

      if (!productoReemplazar) {
        console.log("No existe producto para reemplazar");
        return;
      }
      const productoActualizado = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const productosActualizados = contenido.map((producto) => {
        if (producto.id === id) {
          this.getProducts();
          return productoActualizado;
        }

        return producto;
      });

      await fs.writeFile(
        this.path,
        JSON.stringify(productosActualizados, null, 2),
        "utf8"
      );

      console.log("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }
}

const manager = new ProductManager();

//Empieza con JSON (Base de datos) vacío
manager.getProducts();

//Se agregan productos
manager.addProduct("Camiseta", "Re linda", 2500, "./img.jpg", "CAM200", 20);
manager.addProduct("Remera", "Re linda", 2500, "./img.jpg", "REM200", 20);
// manager.addProduct("Pantalon", "Re linda", 2500, "./img.jpg", "PAN200", 20);

//Se prueba eliminar un producto indicando el ID
// manager.deleteProduct(1);

//Se viusalizan los productos actualizados luego de la eliminación
// manager.getProducts();

//Se modifican datos del producto (id,title,description,price,thumbnail,code,stock)
// manager.updateProduct(
//   1,
//   "Camisola",
//   "Re linda",
//   3000,
//   "/img.jpg",
//   "CAMI200",
//   20
// );

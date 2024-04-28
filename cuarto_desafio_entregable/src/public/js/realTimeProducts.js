const socket = io();

// const formulario = document.querySelector("#formulario");

// formulario.addEventListener("submit", function (e) {
//   e.preventDefault();
// });
const addButton = document.querySelector("#addButton");
const deleteButton = document.querySelector("#deleteButton");

addButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("linkImage").value;
  const newProduct = {
    title: title,
    description: description,
    price: price,
    status: true,
    thumbnail: image,
    code: code,
    stock: stock,
    category: category,
  };

  socketServer.emit("newProduct", newProduct);
});

deleteButton.addEventListener("click", () => {
  const deleteId = document.getElementById("deleteId").value;
  const numero = parseInt(deleteId);
  socket.emit("selectId", numero);
  console.log(numero);
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  const updateButton = document.querySelector(".updateButton");
  const titleProduct = document.querySelector(".titleProduct");
  const idProduct = document.querySelector(".idProduct");
  const form = document.querySelector(".UpdateProductForm");

  updateButton.addEventListener("click", async () => {
    const confirmUpdate = confirm(`Actualizara ${titleProduct.textContent}`);
    if (confirmUpdate) {
      try {
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const response = await fetch(`/${idProduct.textContent}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj),
          });

          if (response.ok) {
            alert("Producto actualizado correctamente");
          } else {
            const errorData = await response.text();
            console.log("Error al actualizar", errorData);
          }
        });
      } catch (error) {
        console.log("No se ha actualizado", error);
      }
    }
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-id");
      const confirmDelete = confirm(
        "¿Estás seguro de que deseas eliminar este producto?"
      );

      if (confirmDelete) {
        try {
          const response = await fetch(`/productsManager/${productId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            alert("Producto eliminado exitosamente");
            // Opcional: remover el elemento del DOM
            button.parentElement.remove();
          } else {
            alert("Error al eliminar el producto");
          }
        } catch (error) {
          alert("Error de red al intentar eliminar el producto");
        }
      }
    });
  });
});

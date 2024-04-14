const ProductMananger = require("../tercer_desafio_entregable/productManager");
const express = require("express");
const app = express();

const PORT = 8080;
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Analizsa cuerpo de las solicitudes para trabajar con queries y params

let frase = "Frase inicial";
//Endopoints

app.get("/api/frase", (req, res) => {
  res.json({ frase: frase });
});

app.get("/api/palabras/:pos", (req, res) => {
  const posicion = req.params.pos;
  const palabras = frase.split(" ");
  const index = parseInt(posicion) - 1;
  if (index >= 0 && index < palabras.length) {
    const buscada = palabras[index];
    res.json({ buscada: buscada });
  } else {
    res.status(404).send("La posición no es válida");
  }
});

app.post("/api/palabras", (req, res) => {
  const { palabra } = req.body;
  frase += ` ${palabra}`;
  const posicion = frase.split(" ").length;
  res.json({ agregada: palabra, pos: posicion });
});

app.put("/api/palabras/:pos", (req, res) => {
  const posicion = req.params.pos;
  const palabra = req.body.palabra;
  const palabras = frase.split(" ");
  const index = parseInt(posicion) - 1;
  if (index >= 0 && index < palabras.length) {
    const anterior = palabras[index];
    palabras[index] = palabra;
    frase = palabras.join(" ");
    res.json({ actualizada: palabra, anterior: anterior });
  } else {
    res.status(404).send("La posición no es válida");
  }
});

app.delete("/api/palabras/:pos", (req, res) => {
  const posicion = req.params.pos;
  const palabras = frase.split(" ");
  const index = parseInt(posicion) - 1;
  if (index >= 0 && index < palabras.length) {
    const eliminada = palabras.splice(index, 1)[0];
    frase = palabras.join(" ");
    res.json({ eliminada: eliminada });
  } else {
    res.status(404).send("La posición no es válida");
  }
});
// -----------------------------------------------------------------------------
// let tasks = [
//   { id: 1, title: "Primer Tarea" },
//   { id: 2, title: "Segunda Tarea" },
//   { id: 3, title: "Tercer Tarea" },
// ];

// app.get("/tasks", (req, res) => {
//   res.json(tasks);
// });

// app.get("/tasks/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const task = tasks.find((t) => t.id === taskId);
//   if (task) {
//     res.json(task);
//   } else {
//     res.status(404).json({ message: "Tarea no encontrada" });
//   }
// });

// app.post("/tasks", (req, res) => {
//   const { title } = req.body;
//   const newTask = { id: tasks.length + 1, title };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// app.put("/tasks/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const task = tasks.find((t) => t.id === taskId);
//   if (task) {
//     const { title } = req.body;
//     task.title = title;
//     res.json(task);
//   } else {
//     res.status(404).json({ massage: "Tarea no encontrada" });
//   }
// });

// app.delete("/tasks/:id", (req, res) => {
//   const taskID = parseInt(req.params.id);
//   tasks = tasks.filter((e) => e.id !== taskID);
//   res.json({ message: `Tareas eliminada` });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

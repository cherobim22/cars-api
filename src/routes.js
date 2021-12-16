const express = require('express');
const routes = express.Router();

const MarcasController = require('./controllers/MarcasController');

// Root endpoint
routes.get("/", (req, res) => {
    res.send('v1.0.0')
});
routes.get("/api/marcas/", MarcasController.read);
routes.get("/api/marcas/:id", MarcasController.readById);
routes.post("/api/marcas/", MarcasController.create);
routes.delete("/api/marcas/:id", MarcasController.delete);
routes.put("/api/marcas/:id", MarcasController.update);

module.exports = routes;
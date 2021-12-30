const express = require('express');
const routes = express.Router();

const BrandasController = require('./controllers/BrandasController');

// Root endpoint
routes.get("/", (req, res) => {
    res.send('v1.0.0')
});
routes.get("/api/marcas/", BrandasController.read);
routes.get("/api/marcas/:id", BrandasController.readById);
routes.post("/api/marcas/", BrandasController.create);
routes.delete("/api/marcas/:id", BrandasController.delete);
routes.put("/api/marcas/:id", BrandasController.update);

module.exports = routes;
const express = require('express');
const routes = express.Router();

const BrandsController = require('./controllers/BrandsController');

// Root endpoint
routes.get("/", (req, res) => {
    res.send('v1.0.0')
});
routes.get("/api/marcas/", BrandsController.read);
routes.get("/api/marcas/:id", BrandsController.readById);
routes.post("/api/marcas/", BrandsController.create);
routes.delete("/api/marcas/:id", BrandsController.delete);
routes.put("/api/marcas/:id", BrandsController.update);

module.exports = routes;
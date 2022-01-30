const carService = require("../services/carService");
const router = require("express").Router();
const validator = require("../utils/validator");

router.post("/", async (req, res) => {
  const validate = await validator(['name', 'year', 'price', 'fuel', 'brand_id'], Object.keys(req.body));
  const { name, year, price, fuel, brand_id } = req.body;

  const date = new Date().toLocaleString();
  const regex = new RegExp("/", "g");
  const created_at = date.replace(regex, "-");

  if (validate.length) {
    res.status(400).json({ error: validate });
    return;
  }
  const marca = await carService.getBy("name", name);

  if (marca) {
    res.status(422).json({ error: "this cars already exists" });
  }

  let resp = await carService.insertCar(name, year, price, fuel, brand_id);
  return res.json({ id: resp });
});

router.get("/", async (req, res) => {
  const page = req.query.page ?? 1;
  const date = new Date();
  const now = date.toLocaleString();
  let string = "";
  let start = "01/01/2021 00:00:00";
  let end = now;

  if (req.query.string) {
    string = req.query.string;
  }

  if (req.query.start && req.query.end) {
    start = req.query.start;
    end = req.query.end;
  }

  const carss = await carService.getCars(start, end, page, string);

  return res.json(carss);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const marca = await carService.getBy("id", id);
  return res.json(marca);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const validate = await validator(['name', 'year', 'price', 'fuel', 'brand_id'], Object.keys(req.body));
  const { name, year, price, fuel, brand_id } = req.body;

  let date = new Date().toLocaleString();
  let regex = new RegExp("/", "g");
  let updated_at = date.replace(regex, "-");

  if (validate.length) {
    res.status(400).json({ error: validate });
    return;
  }

  await carService.updateCar(name, year, price, fuel, brand_id);
  return res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const cars = await carService.getBy("id", id);

  try {
    if (cars.length) {
      await carService.deleteCar(id);
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(404)
        .json({ msg: "nenhuma marca encontrada com o id " + id });
    }
  } catch (error) {
    return res.send(error);
  }
});

module.exports = (app) => app.use("/api/cars/", router);

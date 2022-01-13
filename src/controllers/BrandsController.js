const brandService = require("../services/brandService");
const router = require("express").Router();
const validator = require("../utils/validator");

router.post("/", async (req, res) => {
  const validate = await validator(["name", "origin"], Object.keys(req.body));
  const { name, origin } = req.body;

  const date = new Date().toLocaleString();
  const regex = new RegExp("/", "g");
  const created_at = date.replace(regex, "-");

  if (validate.length) {
    res.status(400).json({ error: validate });
    return;
  }
  const marca = await brandService.getBy("name", name);

  if (marca) {
    res.status(422).json({ error: "this brand already exists" });
  }

  let resp = await brandService.insertBrand(name, origin, created_at);
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

  const brands = await brandService.getBrands(start, end, page, string);

  return res.json(brands);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const marca = await brandService.getBy("id", id);
  return res.json(marca);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const validate = await validator(["name", "origin"], Object.keys(req.body));
  const { name, origin } = req.body;

  let date = new Date().toLocaleString();
  let regex = new RegExp("/", "g");
  let updated_at = date.replace(regex, "-");

  if (validate.length) {
    res.status(400).json({ error: validate });
    return;
  }

  await brandService.updateBrand(id, name, origin, updated_at);
  return res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const brand = await brandService.getBy("id", id);

  if (brand.length) {
    const resp = await brandService.deleteBrand(id);
    return res.status(200).json({ success: true });
  } else {
    return res
      .status(404)
      .json({ msg: "nenhuma marca encontrada com o id " + id });
  }
});

module.exports = (app) => app.use("/api/marcas/", router);

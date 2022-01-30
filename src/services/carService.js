const connection = require("../database/connection");

module.exports = {
  async insertCar(name, year, price, fuel, brand_id ) {
    return connection("cars").insert({ name, year, price, fuel, brand_id  });
  },
  async getCars(start, end, page, string = '') {
    return connection("cars")
      .select("*")
      .where('name', 'like', `%${string}%`)
      .where((builder) => {
        builder.whereBetween("created_at", [start, end]);
      })
      .orderBy("id", "desc")
      .paginate({ perPage: 10, currentPage: page });
  },
  async updateCar(name, year, price, fuel, brand_id) {
    return connection("cars")
      .where("id", "=", id)
      .update({ name, year, price, fuel, brand_id });
  },
  async deleteCar(id) {
    return connection("cars").where("id", id).delete();
  },
  async getBy(key, value) {
    if (key === "id") {
      return connection("cars").where(key, value);
    }

    return connection("cars").where(key, value).first();
  },
};

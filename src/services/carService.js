const connection = require("../database/connection");

module.exports = {
  async insertCar(name, year, price, fuel, brand_id, created_at ) {
    return connection("cars").insert({ name, year, price, fuel, brand_id, created_at  });
  },
  async getCars(start, end, page, string) {
    // console.log(string)
    return connection("cars")
      .select("*")
      .where('name', 'like', `%${string}%`)
      // .orWhere('origin', 'like', `%${string}%`)
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
   
    return connection.raw(`select * from cars c  join brands b on b.id = c.brand_id where c.id = ${value}`) ;
  },
};

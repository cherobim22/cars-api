const connection = require("../database/connection");

module.exports = {
  async insertBrand(name, origin, created_at) {
    return connection("brands").insert({ name, origin, created_at });
  },
  async getBrands(start, end, page, string = '') {
    return connection("brands")
      .select("*")
      .where('name', 'like', `%${string}%`)
      .orWhere('origin', 'like', `%${string}%`)
      .where((builder) => {
        builder.whereBetween("created_at", [start, end]);
      })
      .orderBy("id", "desc")
      .paginate({ perPage: 10, currentPage: page });
  },
  async updateBrand(id, name, origin, updated_at) {
    return connection("brands")
      .where("id", "=", id)
      .update({ name, origin, updated_at });
  },
  async deleteBrand(id) {
    return connection("brands").where("id", id).delete();
  },
  async getBy(key, value) {
    if (key === "id") {
      return connection("brands").where(key, value);
    }

    return connection("brands").where(key, value).first();
  },
};

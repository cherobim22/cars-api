const connection = require('../database/connection');

module.exports = {
    async insertBrand(name, origin, created_at){
        return connection('brands').insert({name, origin, created_at});
    },
    async getBrands(start, end, page){
        return connection('brands').select('*')
            .where((builder) => {
                builder.whereBetween('created_at', [start, end]);
            })
            .orderBy('id', 'desc')
            .paginate({perPage:10,  currentPage: page});
    },

};
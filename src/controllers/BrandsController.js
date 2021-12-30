const brandsServie = require('../services/brands');

module.exports = {
    async create(req, res){
        let errors = [];
        const validate =  ['name', 'origin'];
        const body = Object.keys(req.body);
        const difference = validate.filter(x => !body.includes(x));
        const {name, origin} = req.body;
        const date = new Date();
        const data = date.toLocaleString();
        const regex = new RegExp('/', 'g');
        const created_at = data.replace(regex, '-');

        difference.forEach(e => {
            errors.push("Especifique o campo "+e);
        });

        if (errors.length){
            res.status(400).json({"error":errors});
            return;
        }

        let resp =  await brandsServie.insertBrand(name, origin, created_at)
        return res.json({resp});
    },
    async read(req, res){
        const page = req.query.page ?? 1;
        const date = new Date();
        const now = date.toLocaleString(); 
        let string = '';
        let start = "01/01/2021 00:00:00";
        let end = now;

        if(req.query.string){
            string = req.query.string;
        }

        if(req.query.start && req.query.end){
           start = req.query.start;
           end = req.query.end;
        }

        const brands = await brandsServie.getBrands(start, end, page);

        return res.json(brands);
    },

    async readById(req, res){
        const { id } = req.params;
        const marca = await connection('brands').where('id', '=', id).first();
        
        return res.json(marca);
    },
    async update(req, res){
        const { id } = req.params;
        let errors = [];
        const validate =  ['nome', 'origin'];
        const body = Object.keys(req.body);
        let difference = validate.filter(x => !body.includes(x));
        let date = new Date();
        let data = date.toLocaleString();
        let regex = new RegExp('/', 'g');
        let updated_at = data.replace(regex, '-');
        
        const {nome, origin} = req.body;     

        difference.forEach(e => {
            errors.push("Especifique o campo "+e);
        });
    
        if (errors.length){
            res.status(400).json({"error":errors});
            return;
        }
        
        await connection('brands').where('id', '=', id).update({nome, origin, updated_at})
    
        return res.json({ msg: 'atualizado com sucesso'});
    },
    async delete(req, res){
        const { id } = req.params;
        const product = await connection('brands').where('id', id);
        const date = new Date();
        const deleted_at = date.toLocaleString();
        const status = 0;
        
        if(product.length){
            await connection('brands').where('id', id).update({status, deleted_at});
            return res.status(200).json({msg: 'removido com sucesso'});
        }else{
           return res.status(404).json({msg: 'nenhuma marca encontrada com o id '+id});
        }
    }
};
const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        let errors=[]
        const validate =  [ 'name', 'origin'] ;
        const body = Object.keys(req.body);
        const difference = validate.filter(x => !body.includes(x));
        const {name, origin } = req.body;
        const date = new Date();
        const data = date.toLocaleString();
        const regex = new RegExp('/', 'g');
        const created_at = data.replace(regex, '-');
        const updated_at = data.replace(regex, '-');

        difference.forEach(e => {
            errors.push("Especifique o campo "+e);
        });

        if (errors.length){
            res.status(400).json({"error":errors});
            return;
        }

        let resp =  await connection('marcas').insert({name, origin, created_at, updated_at})

        return res.json({resp});
    },
    async read(req, res){
        const page = req.query.page ?? 1;
        let date = new Date()
        const now = date.toLocaleString(); 
        let string = '';
        let start = "01/01/2021 00:00:00"
        let end = now

        if(req.query.string){
            string = req.query.string
        }

        if(req.query.start && req.query.end){
           start = req.query.start
           end = req.query.end
        }

        const marcas = await connection('marcas').select('*')
        .where((builder) => {
            builder.whereBetween('created_at', [start, end]);
        }).orderBy('id', 'desc').paginate({perPage:10,  currentPage: page});

        return res.json(marcas);
    },

    async readById(req, res){
        const { id } = req.params;
        const marca = await connection('marcas').where('id', '=', id).first();

        return res.json(marca);
    },
    async update(req, res){
        const { id } = req.params;
        let errors=[]
        const validate =  [ 'nome', 'origin'] ;
        const body = Object.keys(req.body);
        let difference = validate.filter(x => !body.includes(x));
        let date = new Date()
        let data = date.toLocaleString();
        let regex = new RegExp('/', 'g');
        let updated_at = data.replace(regex, '-');
        
        let {nome, origin } = req.body;     

        difference.forEach(e => {
            errors.push("Especifique o campo "+e);
        });
    
        if (errors.length){
            res.status(400).json({"error":errors});
            return;
        }
        
        await connection('marcas').where('id', '=', id).update({nome, origin, updated_at})
    
        return res.json({ msg: 'atualizado com sucesso'});
    },
    async delete(req, res){
        const { id } = req.params;
        const product = await connection('marcas').where('id', id);
        
        let date = new Date()
        const deleted_at = date.toLocaleString();
        let status = 0
        
        if(product.length){
            await connection('marcas').where('id', id).update({status, deleted_at});
            return res.status(200).json({msg: 'removido com sucesso'});
        }else{
           return res.status(404).json({msg: 'nenhuma marca encontrada com o id '+id});
        }
    }
};
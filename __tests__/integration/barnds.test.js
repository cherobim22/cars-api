const axios = require('axios');
const randomstring = require("randomstring");

const request = function (url, method, data){
    return axios({url, method, data});
}

describe('getting information', () => {
    it('should recieve brands', async () => {
        const res = await request('http://localhost:3333/api/marcas')
        let itens = res.data;
        expect(itens.data.length).toBeGreaterThan(1);
    }); 

    it('should recieve brands and match object', async () => {
        const res = await request('http://localhost:3333/api/marcas')
        let itens = res.data;
        expect(itens.data[0]).toHaveProperty('name');
    }); 

    it('must create and delete a brand', async () => {
        let mock = {
            "name": randomstring.generate(8),
            "origin":  randomstring.generate(8)
        };
        const res = await request('http://localhost:3333/api/marcas', 'POST', mock)
        let item = res.data.id;
        expect(res.status).toEqual(200)
        expect(res.data).toHaveProperty('id');

        const {data} = await request('http://localhost:3333/api/marcas/'+item, 'DELETE')

        expect(data.success).toEqual(1)
    }); 

});
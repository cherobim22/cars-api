const axios = require('axios');

const request = function (url, method, data){
    return axios({url, method, data});
}

describe('getting information', () => {
    it('should recieve brands', async () => {
        const res = await request('http://localhost:3333/api/marcas')
        let itens = res.data;
        expect(itens.data.length).toBeGreaterThan(1);
    }); 
});
const axios = require('axios');
const crypto = require('crypto');

const generate = () => {
    return crypto.randomBytes(20).toString('hex');
}

const request = function (url, method, data){
    return axios({url, method, data});
}

test('check if api response return array data greater than 0', async function () {
    const {data} = await request('http://localhost:3333/api/marcas')
    expect(data.length).toBeGreaterThan(0);
});

test('check if api creates a new brand', async function () {
    const body = {name:generate(), origin:generate()};
    const {data} = await request('http://localhost:3333/api/marcas', 'POST', body);
    const brand = await request('http://localhost:3333/api/marcas/'+data.resp[0]);
    expect(brand.data.id).toBe(data.resp[0])
});



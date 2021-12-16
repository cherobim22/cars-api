const axios = require('axios');

async function getMarcas(){
    const response = await axios({
        url:'http://localhost:3333/api/marcas/',
        method:'get'
    })
    const marcas = response.data;
    return marcas;
}

test('posts', async function () {
    expect.arrayContaining(getMarcas());
});
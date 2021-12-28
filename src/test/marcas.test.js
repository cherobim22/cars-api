const axios = require('axios');
const generate = () => {
    return crypto.randomBytes(20).toString('hex');
}

const request = function (url, method, data){
    return axios({url, method, data})
}


test('check if api response return array data greater than 0', async function () {
    const {data} = await request('http://localhost:3333/api/marcas')
    expect(data.length).toBeGreaterThan(0);
});



const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngos').select('*');
    
        return response.json(ngos);
    },
    async show(request, response) {
        const id = request.headers.authorization;

        const incidents = await connection('incidents').where('id_ngo', id).select('*');

        return response.json(incidents);
    },
    async store(request, response) {
        const id = generateUniqueId();
        const { name, email, phone, city, uf } = request.body;
        
        await connection('ngos').insert({
            id,
            name,
            email,
            phone,
            city,
            uf
        });
        
        return response.json({ id });
    }
}
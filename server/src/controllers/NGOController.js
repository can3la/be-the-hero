const crypto = require('crypto');

const connection = require('../database/connection');

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
        const id = crypto.randomBytes(4).toString('HEX');
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
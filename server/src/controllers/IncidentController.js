const connection = require('./../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const limit = 4
        const incidents = await connection('incidents').join(
            'ngos', 'ngos.id', '=', 'incidents.id_ngo'
        ).limit(limit).offset((page - 1) * limit).select([
            'incidents.*', 'ngos.name', 'ngos.email', 'ngos.phone', 'ngos.city', 'ngos.uf',
        ]);

        const [count] = await connection('incidents').count('id');

        response.header('X-Total-Count', count['count(`id`)']);
    
        return response.json(incidents);
    },
    async store(request, response) {
        const id_ngo = request.headers.authorization;
        const { title, description, value } = request.body;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            id_ngo
        });

        return response.json({ id });
    },
    async destroy(request, response) {
        const id_ngo = request.headers.authorization;
        const { id } = request.params;

        const incident = await connection('incidents').where('id', id).select('id_ngo').first();

        if (incident.id_ngo !== id_ngo) {
            return response.status(401).json({
                message: 'Operation not permitted.'
            });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}
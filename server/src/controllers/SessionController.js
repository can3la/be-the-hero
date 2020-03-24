const connection = require('./../database/connection');

module.exports = {
    async store(request, response) {
        const { id } = request.body;

        const ngo = await connection('ngos').where('id', id).select('name').first();

        if (!ngo) {
            return response.status(400).json({
                message: 'No ngo found with this ID'
            });
        }

        return response.json(ngo);
    },
}
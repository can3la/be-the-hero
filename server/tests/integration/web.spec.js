const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Web', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a NGO, start a session, include a incident and exclude that incident', async () => {
        const ngo = {
            name: "NGO",
            email: "contact@ngo.com",
            phone: "4700000000",
            city: "Joinville",
            uf: "SC"
        }

        const ngoId = await createNGO(ngo);
        const ngoName = await startSession(ngoId);
        expect(ngoName).toBe(ngo.name);
        
        const incidentId = await includeIncident(ngoId, {
            title: "Dollor",
            description: "Lorem Ipsum",
            value: 70.50
        });

        const response = await request(app).delete(`/incidents/${incidentId}`).set({ 
            authorization: ngoId
        });

        expect(response.status).toBe(204);
    });

    it('should be able to create a NGO, start a session, include a incident and dont exclude that incident', async () => {
        const ngo = {
            name: "NGO",
            email: "contact@ngo.com",
            phone: "4700000000",
            city: "Joinville",
            uf: "SC"
        }

        const ngoId = await createNGO(ngo);
        const ngoName = await startSession(ngoId);
        expect(ngoName).toBe(ngo.name);
        
        const incidentId = await includeIncident(ngoId, {
            title: "Dollor",
            description: "Lorem Ipsum",
            value: 70.50
        });

        const response = await request(app).delete(`/incidents/${incidentId}`).set({ 
            authorization: ngoId.split('').sort(() => {
                return 0.5 - Math.random()
            }).join('')
        });
        expect(response.status).toBe(401);
    });
});

async function createNGO(ngo) {
    const response = await request(app).post('/ngos').send(ngo);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    return response.body.id;
}

async function startSession(ngoId) {
    const response = await request(app).post('/sessions').send({ 
        id: ngoId
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    return response.body.name;
}

async function includeIncident(ngoId, incident) {
    const response = await request(app).post('/incidents').set({ 
        authorization: ngoId
    }).send(incident);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    return response.body.id;
}

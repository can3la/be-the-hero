const express = require('express');

const NGOController = require('./controllers/NGOController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ngos', NGOController.index);
routes.post('/ngos', NGOController.store);
routes.get('/profile', NGOController.show);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);

routes.post('/sessions', SessionController.store);

module.exports = routes;
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const NGOController = require('./controllers/NGOController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.store);

routes.get('/ngos', NGOController.index);
routes.post('/ngos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        phone: Joi.string().trim().regex(/^[0-9]{10,11}$/).required(),
        city: Joi.string().required().min(3),
        uf: Joi.string().required().length(2)
    })
}), NGOController.store);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), NGOController.show);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(3),
        value: Joi.number().required()
    })
}), IncidentController.store);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.destroy);

module.exports = routes;
const { Router } = require('express');
const controller = require('./controller');

const routes = Router();

routes.get('/professionals', controller.findProfessionals);
routes.get('/professionals/:id', controller.findProfessional);

module.exports = routes;

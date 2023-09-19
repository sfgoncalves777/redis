require('dotenv').config()
const logger = require('npmlog');
const express = require('express');
const database = require('./lib/infrastructure/database');
const redis = require('./lib/infrastructure/redis');
const routesProfessionals = require('./lib/professionals/routes');
const serviceProfessionals = require('./lib/professionals/services');

const app = express();

const uriMongoDB = process.env.MONGODB;
const port = process.env.PORT;

process.on('SIGINT', async () => {
  try {
    logger.log('Encerrando a aplicação.');
    await redis.flushAll();
    await redis.disconnect();
    await database.close();
    logger.log('Aplicação encerrada com sucesso.');
    process.exit();
  } catch (error) {
    logger.error('Erro ao encerrar a aplicação:', error);
    throw error;
  }
});

(async () => {
  try {
    logger.info('[APP] - Iniciando a aplicação');
    app.listen(port || 3333);
    await database.connect(uriMongoDB);
    await redis.connect();
    await serviceProfessionals.initCache();
    app.use(routesProfessionals);
    logger.info('[APP] - Aplicação inicializada');
  } catch (err) {
    logger.error('[APP] - Falha ao incializar a aplicação. Error:', JSON.stringify(err, ['message', 'stack']));
    throw err;
  }
})();

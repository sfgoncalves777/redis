const logger = require('npmlog');
const Db = require('./mongodb');

const db = new Db();

module.exports = {
  async connect(uri) {
    logger.info('[MONGODB] - Estabelecendo a conexão');
    try {
      const client = await db.connect(uri);
      logger.info('[MONGODB] - Conectado');
      return client;
    } catch (err) {
      logger.error('[MONGODB] - Erro ao estabelecer a conexão. Error', JSON.stringify(err, ['message', 'stack']));
      throw err;
    }
  },
  async close() {
    logger.info('[MONGODB] - Encerrando a conexão');
    try {
      await db.close();
      logger.info('[MONGODB] - Conexão encerrada');
    } catch (err) {
      logger.error('[MONGODB] - Erro ao encerrar a conexão. Error', JSON.stringify(err, ['message', 'stack']));
      throw err;
    }
  },
  getCollection(collectionName) {
    return db.getCollection(collectionName);
  },
};

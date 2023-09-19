const database = require('../infrastructure/database');
const redis = require('../infrastructure/redis');

const COLLECTION_NAME = 'professionals';

const initCache = async () => {
  const cursor = await database.getCollection(COLLECTION_NAME).find({});
  while (await cursor.hasNext()) {    
    const user = await cursor.next();
    const userData = JSON.parse(JSON.stringify(user));
    delete userData._id;
    await redis.set(user._id.toString(), JSON.stringify(userData));
  }
  await cursor.close();
}

const findAll = async () => {
  const keys = await redis.keys('*');
  const professionals = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const professional = await redis.get(key);
    professionals.push(JSON.parse(professional));
  }
  return professionals;
}

const findOne = async (professionalId) => {
  const professional = await redis.get(professionalId);
  return JSON.parse(professional);
}

module.exports = { initCache, findAll, findOne };
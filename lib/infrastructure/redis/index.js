const { createClient } = require('redis');

const urlRedis = process.env.REDISCONNECTION;

const client = createClient({ url: urlRedis });

client.on('error', (err) => new Error(err));

module.exports = client;

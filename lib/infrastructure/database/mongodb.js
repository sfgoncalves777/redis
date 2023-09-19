const { MongoClient } = require('mongodb');

class Db {
  constructor() {
    this.client = null;
    this.db = null;
    this.collections = new Map();
  }

  async connect(uri, options = {}) {
    this.client = await MongoClient.connect(uri, options);
    this.db = this.client.db();
    return this.client;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.collections.clear();
    }
  }

  getCollection(collectionName) {
    let collection = this.collections.get(collectionName);
    if (!collection) {
      collection = this.db.collection(collectionName);
      this.collections.set(collectionName, collection);
    }
    return collection;
  }
}

module.exports = Db;

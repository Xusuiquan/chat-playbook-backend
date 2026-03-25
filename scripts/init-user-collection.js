const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-playbook-backend';
  const dbName = getDbName(uri) || 'chat-playbook-backend';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const name = 'users';
    const exists = await db.listCollections({ name }).hasNext();
    if (!exists) {
      await db.createCollection(name, {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['username', 'email', 'passwordHash', 'createdAt'],
            properties: {
              _id: { bsonType: 'objectId' },
              username: { bsonType: 'string', minLength: 3, maxLength: 64 },
              email: { bsonType: 'string' },
              passwordHash: { bsonType: 'string', minLength: 32 },
              createdAt: { bsonType: 'date' },
              updatedAt: { bsonType: 'date' },
              roles: {
                bsonType: 'array',
                items: { bsonType: 'string' },
                uniqueItems: false,
              },
              isActive: { bsonType: 'bool' },
            },
            additionalProperties: true,
          },
        },
        validationLevel: 'moderate',
      });
    } else {
      await db.command({
        collMod: name,
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['username', 'email', 'passwordHash', 'createdAt'],
            properties: {
              _id: { bsonType: 'objectId' },
              username: { bsonType: 'string', minLength: 3, maxLength: 64 },
              email: { bsonType: 'string' },
              passwordHash: { bsonType: 'string', minLength: 32 },
              createdAt: { bsonType: 'date' },
              updatedAt: { bsonType: 'date' },
              roles: {
                bsonType: 'array',
                items: { bsonType: 'string' },
                uniqueItems: false,
              },
              isActive: { bsonType: 'bool' },
            },
            additionalProperties: true,
          },
        },
        validationLevel: 'moderate',
      });
    }
    await db.collection(name).createIndexes([
      { key: { username: 1 }, name: 'uniq_username', unique: true },
      { key: { email: 1 }, name: 'uniq_email', unique: true },
      { key: { createdAt: -1 }, name: 'idx_created_at' },
    ]);
    const users = db.collection(name);
    const now = new Date();
    const seed = [
      {
        username: 'zhangsan',
        email: 'zhangsan@example.com',
        passwordHash: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
        createdAt: now,
        updatedAt: now,
        roles: ['user'],
        isActive: true,
        displayName: '张三',
      },
      {
        username: 'lisi',
        email: 'lisi@example.com',
        passwordHash: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
        createdAt: now,
        updatedAt: now,
        roles: ['user'],
        isActive: true,
        displayName: '李四',
      },
    ];
    for (const doc of seed) {
      await users.updateOne(
        { username: doc.username },
        { $setOnInsert: doc },
        { upsert: true }
      );
    }
    process.stdout.write(`Mongo collection initialized: ${dbName}.${name}\n`);
  } catch (err) {
    process.stderr.write(`${String(err && err.message ? err.message : err)}\n`);
    process.exitCode = 1;
  } finally {
    await client.close().catch(() => {});
  }
}

function getDbName(u) {
  try {
    const normalized = u.replace('mongodb+srv://', 'mongodb://');
    const url = new URL(normalized);
    const path = url.pathname || '';
    const name = path.startsWith('/') ? path.slice(1) : path;
    return name || undefined;
  } catch {
    return undefined;
  }
}

run();

const { MongoClient, ObjectId } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-playbook-backend';
  const dbName = getDbName(uri) || 'chat-playbook-backend';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    await ensureCategories(db);
    await ensureTopics(db);
    await ensureSentences(db);
    await seed(db);
    process.stdout.write(`Mongo taxonomy initialized for db: ${dbName}\n`);
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

async function ensureCategories(db) {
  const name = 'categories';
  const exists = await db.listCollections({ name }).hasNext();
  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'slug', 'createdAt'],
      properties: {
        _id: { bsonType: 'objectId' },
        name: { bsonType: 'string', minLength: 1, maxLength: 64 },
        slug: { bsonType: 'string', minLength: 1, maxLength: 64 },
        description: { bsonType: 'string' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
      additionalProperties: true,
    },
  };
  if (!exists) {
    await db.createCollection(name, { validator, validationLevel: 'moderate' });
  } else {
    await db.command({ collMod: name, validator, validationLevel: 'moderate' });
  }
  await db.collection(name).createIndexes([
    { key: { slug: 1 }, name: 'uniq_slug', unique: true },
    { key: { createdAt: -1 }, name: 'idx_created_at' },
  ]);
}

async function ensureTopics(db) {
  const name = 'topics';
  const exists = await db.listCollections({ name }).hasNext();
  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['categoryId', 'title', 'createdAt'],
      properties: {
        _id: { bsonType: 'objectId' },
        categoryId: { bsonType: 'objectId' },
        title: { bsonType: 'string', minLength: 1, maxLength: 128 },
        tags: { bsonType: 'array', items: { bsonType: 'string' } },
        description: { bsonType: 'string' },
        isActive: { bsonType: 'bool' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
      additionalProperties: true,
    },
  };
  if (!exists) {
    await db.createCollection(name, { validator, validationLevel: 'moderate' });
  } else {
    await db.command({ collMod: name, validator, validationLevel: 'moderate' });
  }
  await db.collection(name).createIndexes([
    { key: { categoryId: 1, title: 1 }, name: 'uniq_category_title', unique: true },
    { key: { categoryId: 1 }, name: 'idx_category' },
    { key: { tags: 1 }, name: 'idx_tags' },
    { key: { createdAt: -1 }, name: 'idx_created_at' },
  ]);
}

async function ensureSentences(db) {
  const name = 'sentences';
  const exists = await db.listCollections({ name }).hasNext();
  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['topicId', 'sentence', 'createdAt'],
      properties: {
        _id: { bsonType: 'objectId' },
        topicId: { bsonType: 'objectId' },
        sentence: { bsonType: 'string', minLength: 1 },
        description: { bsonType: 'string' },
        isActive: { bsonType: 'bool' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
      additionalProperties: true,
    },
  };
  if (!exists) {
    await db.createCollection(name, { validator, validationLevel: 'moderate' });
  } else {
    await db.command({ collMod: name, validator, validationLevel: 'moderate' });
  }
  await db.collection(name).createIndexes([
    { key: { topicId: 1, sentence: 1 }, name: 'uniq_topic_sentence', unique: true },
    { key: { topicId: 1 }, name: 'idx_topic' },
    { key: { createdAt: -1 }, name: 'idx_created_at' },
  ]);
}

async function seed(db) {
  const now = new Date();
  const categories = db.collection('categories');
  const topics = db.collection('topics');
  const sentences = db.collection('sentences');
  const cats = [
    { slug: 'kaichang', name: '撩妹开场', description: '自然不尴尬的聊天开场', createdAt: now, updatedAt: now },
    { slug: 'yaoyue', name: '邀约', description: '轻松自然地发出邀约', createdAt: now, updatedAt: now },
  ];
  for (const c of cats) {
    await categories.updateOne({ slug: c.slug }, { $setOnInsert: c }, { upsert: true });
  }
  const kaichang = await categories.findOne({ slug: 'kaichang' });
  const yaoyue = await categories.findOne({ slug: 'yaoyue' });
  const kaichangId = kaichang?._id || new ObjectId();
  const yaoyueId = yaoyue?._id || new ObjectId();
  const tps = [
    {
      categoryId: kaichangId,
      title: '第一次聊天开场',
      tags: ['开场', '幽默', '轻松'],
      description: '不尴尬的自然破冰',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      categoryId: yaoyueId,
      title: '咖啡邀约',
      tags: ['邀约', '线下', '咖啡'],
      description: '轻松地提出线下见面邀约',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ];
  for (const t of tps) {
    await topics.updateOne(
      { categoryId: t.categoryId, title: t.title },
      { $setOnInsert: t },
      { upsert: true },
    );
  }
  const tp1 = await topics.findOne({ categoryId: kaichangId, title: '第一次聊天开场' });
  const tp2 = await topics.findOne({ categoryId: yaoyueId, title: '咖啡邀约' });
  const uts = [
    {
      topicId: tp1?._id,
      sentence: '嗨，刚看到你的笑容，感觉今天的心情都被点亮了。',
      description: '轻松开场，氛围友好自然',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      topicId: tp2?._id,
      sentence: '附近新开了一家咖啡店，气氛很棒，周末一起去试试吗？',
      description: '自然不唐突的邀约',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ].filter((u) => u.topicId);
  for (const u of uts) {
    await sentences.updateOne(
      { topicId: u.topicId, sentence: u.sentence },
      { $setOnInsert: u },
      { upsert: true },
    );
  }
}

run();

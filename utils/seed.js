const connection = require('../config/connection');
const { Thought, User } = require('../models');
const getRandomName = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
    });
  }

  await User.collection.insertMany(users);
  console.log(users);
  process.exit(0);
});

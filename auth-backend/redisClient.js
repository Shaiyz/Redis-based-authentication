const redis = require('redis');
const client = redis.createClient();

client.on('connect', function () {
  console.log('Connected to Redis...');
});

client.on('error', function (err) {
  console.log('Redis error: ' + err);
});

module.exports = client;

/* eslint-disable no-console*/
const mongoose = require('mongoose');

// Export connection events 'on', 'open' and 'close' pass log function as second param to log event and redacted uri
module.exports = (dbUri = process.env.MONGODB_URI) => {
  mongoose.connect(dbUri, { useNewUrlParser: true });
};

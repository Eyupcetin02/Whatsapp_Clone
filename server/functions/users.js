const mongoose = require("mongoose");


const getAllMessage = async (socket, data) => {
  const { user1, user2 } = data;
  const schemaKey = [user1, user2].sort().join('');
  console.log(schemaKey)

  if (mongoose.models[schemaKey]) {
      const messages = await mongoose.models[schemaKey].find()
      socket.emit('allMessages', messages || []);
  } else {
      socket.emit('allMessages', []);
  }
}

module.exports = {getAllMessage};

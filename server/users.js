const users = [];

const addUser = ({ id, name, room }) => {
  // Make entered room 1 word and all lowercase
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Find if user already exists in the room with that username
  const existingUser = users.find(user => user.name === name && user.room === room);

  if (existingUser) return { error: 'Username is taken' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id)
 
  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

// Find a specific user
const getUser = (id) => users.find(user => user.id === id)

// Filter out list of all users in the room
const getUsersInRoom = (room) => users.filter(user => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
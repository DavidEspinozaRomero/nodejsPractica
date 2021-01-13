// const list = []
const db = require("mongoose");
const Model = require('./model')

db.Promise = global.Promise;
// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://deerhou:AtlasCiervo235@cluster0.vbhl4.mongodb.net/Cluster0?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
  // const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
// });
console.log('[db] Conectada con exito');

db.connect(uri, {seNewUrlParser: true},)

function addMessage(message) {
  const myModel = new Model(message)
  myModel.save()
}

async function getMessages(filterUser) {
  let filter = {}
  if (filterUser !== null) {
    filter = {user:filterUser}
  }
  return await Model.find(filter)
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id
  })
  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id
  })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText:updateText,
  remove:removeMessage,
  // get: get
  // update
  // delete
}
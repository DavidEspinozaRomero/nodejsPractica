const { Model } = require('mongoose');
const store = require('./store')

function addMessage(user, message) {
  return new Promise ((resolve, reject)=>{
    if (!user || !message) {
      console.error("[messageController] user/message undefined");
      return reject("los datos son incorrectos")
    }
    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    }
    store.add(fullMessage);
    resolve(fullMessage)
  })
}

function getMessages(filterUser) {
  return new Promise((resolve, reject)=>{
    resolve(store.list(filterUser))
  });
}

function updateMessage(id, message) {
  console.log(id, message);
  return new Promise(async(resolve, reject)=>{
    if(!id || !message) {
      reject('Invalid data')
      return false
    }
    const result = await store.updateText(id, message)
    resolve(result)
  })
}

function deleteMessage(id) {
  return new Promise((resolve,reject)=>{
    if (!id) {
      reject("Id invalido")
      return false
    }
    store.remove(id)
      .then(()=>{
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
  })
}


module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
}
import loki from '../libs/Database'
import { Collection } from 'lokijs'
import { Token, User } from '../types/db'

(async () => {
  const db = await loki('v1')

  db.removeCollection('users')
  db.removeCollection('tokens')

  insertUsers(db.addCollection('users', {
    unique: ['id', 'mail'],
    disableMeta: true
  }));
  insertTokens(db.addCollection('tokens', {
    unique: ['id'],
    disableMeta: true
  }))

  db.saveDatabase()
  db.close()
})()

function insertUsers(collection: Collection<User>) {
  collection.insert({
    id: 1,
    mail: 'taro-yamada1@example.com',
    name: '山田太郎1',
    birthday: 21,
    gender: 1
  });
  collection.insert({
    id: 2,
    mail: 'taro-yamada2@example.com',
    name: '山田太郎2',
    birthday: 22,
    gender: 2
  });
  console.info("users:", collection.data)
}

function insertTokens(collection: Collection<Token>) {
  collection.insert({
    id: 1,
    user_id: 1,
    token: ''
  });
  console.info("tokens:", collection.data)
}

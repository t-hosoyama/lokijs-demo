import loki from '../libs/Database'
import { Token, User } from '../types/db';

(async () => {
  let db;

  try {
    db = await loki('v1')

    const users = db.getCollection<User>('users')
    const tokens = db.getCollection<Token>('tokens')

    const user = users.findOne({ id: 1 })
    const token = user && tokens.by('user_id', user.id)

    // find
    console.log('users count: ', users.count())
    console.log('users find: ', users.find({ mail: 'taro-yamada2@example.com' }))
    console.log('tokens by: ', token)

    // update
    if (user && token) {
      token.token = 'updated';
      tokens.update(token)
      console.log('tokens update: ', tokens.by('user_id', user.id))
    }

    // remove
    tokens.insert({
      id: 2,
      user_id: 2,
      token: 'test'
   })
   const token2 = tokens.by('id', 2)
   console.log('tokens before remove: ', token2)
   token2 && tokens.remove(token2)
   console.log('tokens after remove: ', tokens.by('id', 2))

  } catch(e) {
    console.error(e)
  } finally {
    db && db.close()
  }
})()

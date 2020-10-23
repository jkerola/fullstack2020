const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const hashPass = require('../utils/user_helper').hashPass
const app = require('../app')

const api = supertest(app)
const url = '/api/users'

const User = require('../models/user')
describe('general', () => {
  beforeEach(async () => { // test init
    await User.deleteMany({})
    const user = helper.userItem
    const pwdHash = await hashPass(user.password)
    const userObject = new User({ ...user, pwdHash })
    await userObject.save()
  })
  test('response is JSON format', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  describe('get', () => {
    test('all users', async () => {
      const response = await api.get(url)
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(1)
    })
  })
  describe('post', () => {
    describe('proper users', () => {
      test('creating a new user', async () => { // check new user is properly created
        const user = helper.initialUsers[0]
        const pwdHash = await hashPass(user.password)
        await api
          .post(url)
          .send({ ...user, pwdHash })
        const users = await helper.getUsers()
        const usernames = users.map(user => user.username)
        expect(usernames).toContain(user.username)
      })
      test('username not unique', async () => {
        const user = helper.userItem
        await api
          .post(url)
          .send(user)
          .expect(400)
        const users = await helper.getUsers()
        expect(users.length).toBe(1) // if invalid is added, length > 1
      })
    })
    describe('faulty users', () => {
      test('missing username or password', async () => {
        const userPass = helper.userMissingPassword
        await api
          .post(url)
          .send(userPass)
          .expect(400)
        const userName = helper.userMissingName
        await api
          .post(url)
          .send(userName)
          .expect(400)
        const users = await helper.getUsers()
        const usernames = users.map(user => user.username)
        expect(users.length).toBe(1) // if invalid added, length > 1
        expect(usernames).not.toContain(userPass.username) // invalid user should not exist
      })
      test('username or password too short', async () => {
        const userName = helper.userShortName
        await api
          .post(url)
          .send(userName)
          .expect(400)
        const userPass = helper.userShortPass
        await api
          .post(url)
          .send(userPass)
          .expect(400)
        const users = await helper.getUsers()
        const usernames = users.map(user => user.username)
        expect(users.length).toBe(1) // if invalid added, length > 1
        expect(usernames).not.toContain(userName.username) // invalid user should not exist
      })
      test('request has no content whatsoever', async () => {
        const emptyUser = {}
        await api
          .post(url)
          .send(emptyUser)
          .expect(400)
        const users = await helper.getUsers()
        expect(users.length).toBe(1) // if invalid added, length > 1
      })
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

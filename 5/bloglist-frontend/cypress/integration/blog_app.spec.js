describe('Blog Application', function () {
  const username = Cypress.env('CYPRESS_USERNAME')
  const password = Cypress.env('CYPRESS_PASSWORD')
  const name = Cypress.env('CYPRESS_NAME')
  beforeEach(function () {
    // reset database
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create a new user
    const info = {
      username: username,
      name: name,
      password: password
    }
    cy.request('POST', 'http://localhost:3001/api/users', info)
    // second user
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: Cypress.env('CYPRESS_USERNAME2'),
      name: Cypress.env('CYPRESS_NAME2'),
      password: Cypress.env('CYPRESS_PASSWORD2')
    })
    // visit login page
    cy.visit('http://localhost:3000')
  })
  describe('Login', function () {
    it('page is accessible', function () {
      cy.contains('Bloglist')
      cy.contains('Username')
      cy.contains('Password')
    })
    it('with bad credentials fails', function () {
      cy.get('#usernameInput').type('wronguser')
      cy.get('#passwordInput').type('123456')
      cy.get('#loginButton').click()
      // bonus exercise, if notification colour is correct (orangered)
      cy.get('.error').should('have.css', 'background-color', 'rgb(255, 69, 0)')
      cy.contains('Invalid Credentials')
    })
    it('with corrrect cred. is succesfull', function () {
      cy.get('#usernameInput').type(username)
      cy.get('#passwordInput').type(password, { delay: 30 })
      cy.get('#loginButton').click()

      cy.contains(`Logged in as ${name}`)
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: Cypress.env('CYPRESS_USERNAME'),
        password: Cypress.env('CYPRESS_PASSWORD')
      })
    })
    it('a blog item can be created', function () {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('test blog')
      cy.get('#authorInput').type('test author')
      cy.get('#urlInput').type('https://testurl.com')
      cy.contains('submit').click()

      cy.contains('test blog by test author')
    })
    describe('and a blog item exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog',
          author: 'test author',
          url: 'http://testurl.com'
        })
      })
      it('blog item can be liked', function () {
        cy.contains('test blog by test author').click()
        cy.get('.likeBlogButton').click()
        cy.contains('likes: 1')
      })
      it('blog can be liked multiple times', function () {
        cy.contains('test blog by test author').click()
        cy.get('.likeBlogButton').click({ timeout: 5000 })
        cy.get('.likeBlogButton').click({ timeout: 5000 })
        cy.contains('likes: 2')
        cy.get('.likeBlogButton').click({ timeout: 5000 })
        cy.contains('likes: 3')
      })
      it('blog item can be deleted', function () {
        cy.contains('test blog by test author').click()
        cy.get('.deleteBlogButton').click()
        cy.contains('Blog deleted succesfully')
        cy.should('not.contain', 'test blog by test author')
      })
      it('blog can only be deleted by creating user', function () {
        cy.get('#logoutButton').click()
        cy.visit('http://localhost:3000')
        cy.login({
          username: Cypress.env('CYPRESS_USERNAME2'),
          password: Cypress.env('CYPRESS_PASSWORD2')
        })
        cy.contains('test blog by test author').click()
        cy.should('not.contain', 'delete')
      })
    })
    describe('and multiple blog items exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog',
          author: 'test author',
          url: 'http://testurl.com'
        })
        cy.createBlog({
          title: 'second test blog',
          author: 'second test author',
          url: 'http://testurl.com'
        })
        cy.createBlog({
          title: 'third test blog',
          author: 'third test author',
          url: 'http://testurl.com'
        })
        cy.visit('http://localhost:3000')
      })
      it('blog items are sorted correctly', function () {
        cy.contains('third test blog by third test author').parent().as('thirdBlog')
        cy.get('@thirdBlog')
          .click()
          .find('.likeBlogButton')
          .click()
        cy.contains('second test blog by second test author').parent().as('secondBlog')
        cy.get('@secondBlog')
          .click()
          .find('.likeBlogButton')
          .click().click()
        // gets the first blog item displayed on the page
        cy.get('.blogDiv').then(blogs => blogs[0])
          .contains('likes: 2')
          .contains('second test blog')
        // second blog item
        cy.get('.blogDiv').then(blogs => blogs[1])
          .contains('likes: 1')
          .contains('third test blog')
      })
    })
  })
})

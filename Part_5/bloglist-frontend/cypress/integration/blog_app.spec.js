describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'abba',
      name: 'abba',
      password: 'abba'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'abba', password: 'abba' })

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('afsd')
      cy.get('#password').type('asdf')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'abba', password: 'abba' })
    })

    // it('A blog can be created and liked', function() {
    //   cy.contains('new blog').click()
    //   cy.createBlog({ title: 'cypress', author: 'merl', url: 'cypress.com' })
    //   cy.contains('create').click()
    //   cy.contains('show').click()
    //   cy.contains('like').click()

    //   cy.contains('cypress')
    //   cy.contains('merl')
    //   cy.contains('likes 1')
    // })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'cypress',
          author: 'abba',
          url: 'c'
        })
      })

      it('it can be liked', function () {
        cy.contains('show').click()
        cy.contains('like').click()

        cy.contains('cypress')
        cy.contains('abba')
        cy.contains('likes 1')
      })

      it('it can be removed', function () {
        cy.contains('show').click()
        cy.contains('remove').click()

        cy.on('window:confirm', () => true)

        cy.get('blog').should('not.exist')
      })
    })

    describe('the blog with most likes above', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'cypress1',
          author: 'abba',
          url: 'c1',
          likes: '1'
        })
        cy.createBlog({
          title: 'cypress2',
          author: 'abba',
          url: 'c2',
          likes: '2'
        })
      })

      it('one of those with most likes is above', async function () {
        // cy.contains('cypress1')
        //   .parent()
        //   .find('button')
        //   .click()

        // cy.contains('cypress1')
        //   .parent()
        //   .parent()
        //   .find('.like-button')
        //   .click()

        // cy.contains('cypress2')
        //   .parent()
        //   .find('button')
        //   .click()

        // cy.contains('cypress2')
        //   .parent()
        //   .parent()
        //   .find('.like-button')
        //   .then(($btn) => {
        //     cy.wrap($btn).click()
        //     cy.wrap($btn).click()
        //       .get('.blog:first').contains('likes 2')
        //   })
        //   .then(() => {
        //     setTimeout(() => {
        //       cy.get('.blog:first').contains('likes 2')
        //     }, 2000)
        //   })

        cy.contains('cypress1')
          .parent()
          .find('button')
          .click()

        cy.contains('cypress2')
          .parent()
          .find('button')
          .click()

        cy.get('.blog:first').contains('likes 2')
      })
    })
  })
})
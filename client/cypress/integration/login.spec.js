describe('Login Tests', () => {
    it('Log In Test with valid credentials', () => {
        // Visits Website
        cy.visit('https://gulfarms.herokuapp.com')
        // Should redirect to login page
        cy.url().should('include', '/login')
        // Enter Email and Password
        cy.get('#email').type('mjunaid.s100@gmail.com')
        cy.get('#password').type('123456789')
        cy.contains('LOGIN').click()
        cy.wait(5000)
        cy.url().should('include', '/home')
    })
    it('Log In Test with invalid credentials', () => {
        // Visits Website
        cy.visit('https://gulfarms.herokuapp.com')
        // Should redirect to login page
        cy.url().should('include', '/login')
        // Enter Email and Password
        cy.get('#email').type('100@gmail.com')
        cy.get('#password').type('123456789')
        cy.contains('LOGIN').click()
        cy.contains('Email or password is invalid')
    })
    it('Log In Test for Email/Password Input requirements', () => {
        // Visits Website
        cy.visit('https://gulfarms.herokuapp.com')
        // Should redirect to login page
        cy.url().should('include', '/login')
        // Enter Email and Password
        cy.contains('LOGIN').click()
        cy.contains('Email field is required')
        cy.contains('Password field is required')
    })
    it('Log In Test for Email Validity', () => {
        // Visits Website
        cy.visit('https://gulfarms.herokuapp.com')
        // Should redirect to login page
        cy.url().should('include', '/login')
        // Enter Email and Password
        cy.get('#email').type('100')
        cy.get('#password').type('123456789')
        cy.contains('LOGIN').click()
        cy.contains('Email is invalid')
    })
})
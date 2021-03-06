describe('Barn Tests', () => {
    // Pre Condition
    beforeEach(() => {
        // Log In
        cy.visit('https://gulfarms.herokuapp.com')
        cy.get('#email').type('mjunaid.s100@gmail.com')
        cy.get('#password').type('123456789{enter}')
        cy.wait(2000)
        cy.contains('Farms').click()
        cy.wait(500)
        cy.contains('farm1').click()
        cy.wait(500)
        cy.contains('preset1').click()
    })
    it('Test for Creating New Barn with VALID inputs', () => {
        cy.wait(1000)
        cy.get('.fa-plus-circle').click()
        cy.get('#barnName').type('barn1').should('have.value', 'barn1')
        cy.get('#Description').type('Newly Created Barn')
        cy.get('#AlertDescription').type('Vaccination').should('have.value', 'Vaccination')
        cy.get('#AlertDuration').type('1').should('have.value', '1')
        cy.get('.fa-plus').click()
        cy.contains('SAVE').click()
        cy.wait(2000)
        cy.contains('barn1')
    })
    it('Test for display of errors for the required fields', () => {
        cy.wait(1000)
        cy.get('.fa-plus-circle').click()
        cy.contains('SAVE').click()
        cy.contains('Create New Barn')
    })
    it('Test for Creating New Barn with INVALID inputs', () => {
        cy.wait(1000)
        cy.get('.fa-plus-circle').click()
        cy.get('#barnName').type('barn2').should('have.value', 'barn2')
        cy.get('#Description').type('Newly Created Barn')
        cy.get('#AlertDescription').type('Vaccination').should('have.value', 'Vaccination')
        cy.get('#AlertDuration').type('ss').should('have.value', 'ss')
        cy.get('.fa-plus').click()
        cy.contains('Invalid Input')
        cy.get('.fa-plus').click()
        cy.contains('Invalid Input')
        cy.contains('SAVE').click()
        cy.wait(1000)
        cy.contains('barn2').should('not.exist')
    })
    it('Test for Deleting Barn', () => {
        cy.wait(1000)
        cy.contains('barn1').click()
        cy.wait(1000)
        cy.get('.fa-trash-alt').click()
        cy.contains('Reason For Removal')
        cy.contains('Save').click()
        cy.wait(1000)
        cy.url().should('have', '/farms')
        cy.contains('farm1').click()
        cy.wait(1000)
        cy.contains('preset1').click()
        cy.wait(1000)
        cy.contains('barn1').should('not.exist')
    })
})
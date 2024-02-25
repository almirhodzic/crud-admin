describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://minicart.ch/dashboard')
  })
})

it('Login-Test auf minicart.ch', function () {
  const loginPage = 'https://minicart.ch/login'
  const loginUser = 'admin@admin.com'
  const loginPass = '1234'

  cy.visit(loginPage)
  cy.get('input[type="email"]').type(loginUser) 
  cy.get('input[type="password"]').type(`${loginPass}{enter}`) 
  cy.url().should('include', '/dashboard')
  cy.get('h5').should('contain', 'Hallo Admin!')
})
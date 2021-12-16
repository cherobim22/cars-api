describe('first test', () => {
    it('does not to much', () => {
       cy.visit('https://www.youtube.com/');
       cy.get('#logo-icon').click()
    })
}) 
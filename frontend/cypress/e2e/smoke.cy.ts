describe('Smoke', () => {
	it('loads home and navigates to meetings', () => {
		cy.visit('/')
		cy.contains('Vite + React')
		cy.contains('Go to Meetings').click()
		cy.url().should('include', '/meetings')
		cy.contains('Meetings')
	})
})



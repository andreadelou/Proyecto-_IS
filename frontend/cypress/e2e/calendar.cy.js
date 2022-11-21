describe('Tests for Calendar screens', () => {
	it('Displays the default view for Calendar', () => {
		cy.login();
		cy.visit('https://mind-app-b0b0f.web.app/#/calendar')
		// cy.wait(2000)
		cy.contains('Tareas')
	})
	it('Clicking on a date will not display the view', () => {
		cy.login();
		cy.get('button').contains('1').click();
		cy.wait(1000)
		cy.get('Tareas').should('not.exist')
	})
	// afterEach(() => { cy.logout() })
})
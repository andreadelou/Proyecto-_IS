describe('Tests for Calendar screens', () => {
	it('loads the page using basic auth', () => {
		cy.visit('https://mind-app-b0b0f.web.app/#/calendar', {
			auth: {
				username: 'lam20102@uvg.edu.gt',
				password: 'princesa71'
			},
		})
	})
})
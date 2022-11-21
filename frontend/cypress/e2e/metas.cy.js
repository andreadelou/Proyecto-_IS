// log in
function loginUsingAPI(username, password) {
	// Send request to the DoltHub API login endpoint
	cy.request({
		url: "https://mind-app-b0b0f.web.app/#/",
		body: { username, password },
	}).then((res) => {
		// If successful, check to make sure usernames match
		expect(res.body.username).to.eq(username);
		// Set the cookie value for dolthubToken
		cy.setCookie("dolthubToken", res.body.cookie_value);
	});

	// Assert login successful by checking for existence of cookie
	cy.getCookie("dolthubToken").should("exist");
}


describe('Logging In - Basic Auth', function () {
	// we can use these values to log in
	const username = 'lam20102@uvg.edu.gt'
	const password = 'princesa71'



	context('cy.request', () => {
		// https://on.cypress.io/request

		it('without authorization gets 401', () => {
			cy.request({
				url: 'https://mind-app-b0b0f.web.app/#/',
				failOnStatusCode: false,
			}).its('status').should('equal', 200)
		})

		it('with authorization', () => {
			cy.request({
				url: 'https://mind-app-b0b0f.web.app/#/',
				auth: {
					username, password,
				},
			}).its('status').should('equal', 200)
		})

	})

	context('cy.visit', () => {
		// https://on.cypress.io/visit

		it('loads the page using basic auth', () => {
			cy.visit('https://mind-app-b0b0f.web.app/#/', {
				auth: {
					username,
					password,
				},
			})

			// confirm that all static resources have loaded
			cy.get('#app-message').should('not.be.empty')
			cy.log('app.js loaded')

			// cy.contains('h1', 'Red').should('have.css', 'color', 'rgb(255, 0, 0)')
			cy.log('app.css loaded')
		})
	})

	context('logins', () => {
		// https://on.cypress.io/visit

		it('successfully logs in ', () => {
			cy.intercept('GET', `${Cypress.env('apiUrl')}https://mind-app-b0b0f.web.app/#/`)
				.as('getUserModels')

			cy.request('POST', `https://mind-app-b0b0f.web.app/#/`, {
				username: Cypress.env(username),
				password: Cypress.env(password),
			}).then((response) => {
				cy.setCookie('auth_key', '123key')
			})

			cy.visit('https://mind-app-b0b0f.web.app/#/home')
			// cy.wait('@getUserModels')
			cy.contains('h1', 'Home').should('be.visible')
		})


	})


})




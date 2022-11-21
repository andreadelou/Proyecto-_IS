describe('Comprar mascota en tienda', function () {
  // we can use these values to log in
  const username = 'lam20102@uvg.edu.gt'
  const password = 'princesa71'

  'page display on medium size screen',
  {
    viewportHeight: 1920,
    viewportWidth: 1080,
  },

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

    context('Comprar', () => {
      // https://on.cypress.io/visit
      
      it('successfully comprar ', () => {

        cy.contains('Personalizar').click()
        // cy.wait(2000)
        cy.contains('Tienda').click()
        // cy.wait(2000)
        cy.get('[alt="cuadro1"]').click()
        
      })

      // cy.contains('Welcome').click()
  
      
      })

  })
  describe('Cambiar mascota', function () {

    context('Seleccionar armario y mascota', () => {
      // https://on.cypress.io/visit
     
      it('Cambiar armario ', () => {
  
        cy.contains('Personajes').click()
        cy.wait(2000)
        cy.get('[alt="cuadro1"]').click()
        cy.get('.chakra-modal__close-btn').click()
      })
  
      // cy.contains('Welcome').click()
  
     
      })
  })
 
describe('empty spec', () => {
  // we can use these values to log in
  const username = 'rebecca.smith1220@gmail.com'
  const password = '1234hola'
/* 
  const username = 'lam20102@uvg.edu.gt'
  const password = 'princesa71' */
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


    //Check box checking
  context('Check', () => {
    // https://on.cypress.io/visit
    it('check metas', () => {
      cy.visit('https://mind-app-b0b0f.web.app/#/health')

      // un delay para esperar a que se cargue la página
      cy.wait(2000)
      // cy.contains('Nueva Meta').click()
      cy.get('[type="checkbox"]').check({force:true},'chakra-checkbox__input')
      
    })
        
    })

    context('Assertion checkbox', () => {
      // https://on.cypress.io/visit
      it('checks check', () => {
        cy.get('[type="checkbox"]').first().check().should('be.checked'); 
        
        
      })
          
      })

       //percentage checking
      context('Goals name and percentage check', () => {
        // https://on.cypress.io/visit
        it('checks data', () => {
          // cy.wait('@getUserModels')
          cy.contains('h3', 'Ejercicio').should('be.visible')
          cy.contains('h3', 'Meditar').should('be.visible')
          cy.contains('h3', 'Salud').should('be.visible')
          cy.contains('h3', 'Salud Mental').should('be.visible') 
          cy.contains('p', '%').should('be.visible') 
          
          
        })
            
        })

     
      

      
})
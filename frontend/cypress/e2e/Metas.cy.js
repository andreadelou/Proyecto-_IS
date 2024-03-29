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

    xcontext('Check', () => {
      // https://on.cypress.io/visit
      it('check goal', () => {
        cy.visit('https://mind-app-b0b0f.web.app/#/goals')
        // cy.wait(2000)
        cy.get('.chakra-button').click()
        // cy.get('[type="checkbox"]').first().check()
        cy.get('[data-testid="title"]').type('Nueva Meta')
        cy.get('[data-testid="description"]').type('Descripcion de meta')
        cy.get('[data-testid="category"]').select('health')
        // cy.get('[data-testid="salud"]')
        cy.get('[data-testid="reminder"]').click()
        cy.get('.react-datepicker__day--023').click()
        cy.get('[data-testid="save"]').click()
        
      })
          
      })

       xcontext('Assertion checkbox', () => {
         // https://on.cypress.io/visit
         it('assertion', () => {
           cy.get('[type="checkbox"]').first().check().should('be.checked'); 
           // .and('have.value','Automation Tester');
          
         })
            
         })


         // aqui se crea una nueva submeta pero solo si hay una meta
xcontext('nueva submeta', () =>{

  it('creates a new sub-goal', ()=>{
    cy.visit('https://mind-app-b0b0f.web.app/#/goals')
    // cy.contains('h2', 'exercise').should('be.visible')
    cy.get('svg').first().click({ multiple: true },{force: true})
    cy.get("input[placeholder=\"Escribe la sub tarea\"]").first().type('aqui va la submeta que me invento')


  })


})

xcontext('verificar', ()=>{
  it('verifica que sea la meta que es',()=>{

    cy.get('[placeholder=\"Nombre de tu meta\"]').then(($btn) => {
      //guarda la variable (nombre de meta)
      const txt = $btn.text()
      // $btn is the object that the previous command yielded
      cy.visit('https://mind-app-b0b0f.web.app/#/home')

      //verifica que este la meta
      cy.contains(txt).should('be.visible')
    })


  })
})
  })




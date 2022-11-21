import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

const cypressConfig = defineConfig({
	e2e: {
		baseUrl: 'https://mind-app-b0b0f.web.app',
		supportFile: 'cypress/support/e2e/index.js',
		setupNodeEvents(on, config) {
			cypressFirebasePlugin(on, config, admin);
			// e2e testing node events setup code
			
		},
		
	},

	

	
});



export default cypressConfig;
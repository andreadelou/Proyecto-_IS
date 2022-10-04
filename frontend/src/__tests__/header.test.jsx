import React from 'react';
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
import Header from '../components/Header'
const { BrowserRouter } = require("react-router-dom")

describe('Header tests', () => {
	it('Should call logout method', async () => {
		jest.mock('../components/Header');
		// Arrange
		await act(async () => {
			render(
				<Header title="Titulo" subtitle="Hola" bandera/>,
				{ wrapper: BrowserRouter }
			)  
		})
		const logoutButton = await screen.findByTestId('logoutButton')
		console.log(logoutButton);
		// Act
		// fireEvent.click(logoutButton)
		// Assert
		
	})
})
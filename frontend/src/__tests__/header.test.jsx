import React from 'react';
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
import Header  from '../components/Header'

const { BrowserRouter } = require("react-router-dom")

describe('Header tests', () => {
	it('Should call logout method', async () => {
		const mockGetData = jest.spyOn(Header, "logOut").mockImplementation(() => {console.log('hi')})
		// Arrange
		await act(async () => {
			render(
				<Header.Header title="Titulo" subtitle="Hola" Bandera/>,
				{ wrapper: BrowserRouter }
			)  
		})
		const logoutButton = await screen.findByTestId('logoutButton')
		// Act
		fireEvent.click(logoutButton)
		// Assert
		expect(mockGetData).toHaveBeenCalled()

		
	})
})
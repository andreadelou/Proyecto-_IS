import React from 'react';
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
import Header  from '../components/Header'

const { BrowserRouter } = require("react-router-dom")

import * as firebase from '../firebase';

describe('Header tests', () => {
	it('Should call logout method', async () => {
		// Arrange
		await act(async () => {
			render(
				<Header title="Titulo" subtitle="Hola" Bandera/>,
				{ wrapper: BrowserRouter }
				)  
			})
		const mockGetData = jest.spyOn(firebase, 'logout').mockImplementation(() => {console.log('TESTING LOGOUT METHOD')})
		
		const logoutButton = await screen.findByTestId('logoutButton')
		// Act
		fireEvent.click(logoutButton)
		// Assert
		expect(mockGetData).toHaveBeenCalled()

		
	})
})
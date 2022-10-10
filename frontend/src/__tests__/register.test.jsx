import React from 'react';
const { act, render, fireEvent, screen } = require("@testing-library/react")
const { BrowserRouter } = require("react-router-dom")
const { default: Register } = require("../pages/Register")
import * as userService from "../services/users.service.js";
import * as firebase from '../firebase.js';
import * as firebaseHooks from "react-firebase-hooks/auth";


describe('Tests for <Register>', () => {
	test('Registers a new user', async () => {
		jest.spyOn(firebase, 'registerWithEmailAndPassword').mockReturnValue(true);
		jest.spyOn(userService, 'createUserInCollection').mockReturnValue(true);
		await act(async() => {
			render(
				<Register />,
				{ wrapper: BrowserRouter }
			)  
		})
		const emailInput = screen.getByTestId('email')
		const passWordInput = screen.getByTestId('password')
		const passWordInput2 = screen.getByTestId('password2')
		const name= screen.getByTestId('name')
		const registerButton = screen.getByTestId('registerButton')
		const birthday= screen.getByTestId('birthday')
		// Act
		fireEvent.change(emailInput, { target: { value: 'mafer@gmail.com' } })
		fireEvent.change(name, { target: { value: 'Mafer' } })
		fireEvent.change(passWordInput, { target: { value: '123' } })
		fireEvent.change(passWordInput2, { target: { value: '123' } })
		fireEvent.change(passWordInput2, { target: { value: '123' } })
		fireEvent.change(birthday, { target: { value: '01/01/2000' } })
		fireEvent.click(registerButton)
		expect(screen.getByTestId('registerButton')).toBeTruthy()
	})
})

describe('Tests for <Register>', () => {
	test('Registers a new user', async () => {
		jest.spyOn(firebase, 'registerWithEmailAndPassword').mockReturnValue(true);
		jest.spyOn(userService, 'createUserInCollection').mockReturnValue(false);
		await act(async() => {
			render(
				<Register />,
				{ wrapper: BrowserRouter }
			)  
		})
		const emailInput = screen.getByTestId('email')
		const passWordInput = screen.getByTestId('password')
		const passWordInput2 = screen.getByTestId('password2')
		const name= screen.getByTestId('name')
		const registerButton = screen.getByTestId('registerButton')
		const birthday= screen.getByTestId('birthday')
		// Act
		fireEvent.change(emailInput, { target: { value: 'mafer@gmail.com' } })
		fireEvent.change(name, { target: { value: 'Mafer' } })
		fireEvent.change(passWordInput, { target: { value: '123' } })
		fireEvent.change(passWordInput2, { target: { value: '123' } })
		fireEvent.change(passWordInput2, { target: { value: '123' } })
		fireEvent.change(birthday, { target: { value: '01/01/2000' } })
		fireEvent.click(registerButton)
		expect(screen.getByTestId('registerButton')).toBeTruthy()

	})
})


describe('Tests for <Register>', () => {
	test('Registers a new user', async () => {
		jest.spyOn(firebase, 'registerWithEmailAndPassword').mockReturnValue(true);
		jest.spyOn(userService, 'createUserInCollection').mockReturnValue(true);
				jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		await act(async() => {
			render(
				<Register />,
				{ wrapper: BrowserRouter }
			)  
		})
	})
	
})
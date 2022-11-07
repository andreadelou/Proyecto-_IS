import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import * as firebase from '../firebase.js';
import * as firebaseHooks from 'react-firebase-hooks/auth';

const { default: Login } = require("../pages/Login")

describe('Tests for <Login/>', () => {
	test('Can click remind user', async() => {
		await act(async() => {
			render(
				<Login />,
				{ wrapper: BrowserRouter }
			)  
		})
		const checkBox = screen.getByTestId('remindCheckbox')
		fireEvent.click(checkBox)
		fireEvent.click(checkBox)
	})

	test('Can click register', async() => {
		await act(async() => {
			render(
				<Login />,
				{ wrapper: BrowserRouter }
			)  
		})
		const registerButton = screen.getByTestId('registerButton')
		fireEvent.click(registerButton)
	})
	test('Can click login', async() => {
		await act(async() => {
			render(
				<Login />,
				{ wrapper: BrowserRouter }
			)  
		})
		jest.spyOn(firebase, 'loginWithEmailAndPassword').mockReturnValue(true)
		const checkBox = screen.getByTestId('remindCheckbox')
		const emailInput = screen.getByTestId('email')
		const passwordInput = screen.getByTestId('password')
		const loginButton = screen.getByTestId('loginButton')
		fireEvent.click(checkBox)
		fireEvent.change(emailInput, {target: {value: 'guillermo@gmail.com'}})
		fireEvent.change(passwordInput, {target: {value: '123'}})
		fireEvent.click(loginButton)
	})
	test('Can click login', async() => {
		await act(async() => {
			render(
				<Login />,
				{ wrapper: BrowserRouter }
			)  
		})
		const checkBox = screen.getByTestId('remindCheckbox')
		const emailInput = screen.getByTestId('email')
		const passwordInput = screen.getByTestId('password')
		const loginButton = screen.getByTestId('loginButton')
		fireEvent.click(checkBox)
		fireEvent.change(emailInput, {target: {value: 'guillermo@gmail.com'}})
		fireEvent.change(passwordInput, {target: {value: '123'}})
		fireEvent.click(loginButton)
	})

	test('Fills the email when it is set on the local storage', async () => {
		await act(async() => {
			localStorage.setItem('email', 'test@example.com')
			const { unmount } = render(
				<Login />,
				{ wrapper: BrowserRouter }
			);
			unmount();
		})
	})
	test('Sends a reset password email', async() => {
		await act(async() => {
			render(
				<Login />,
				{ wrapper: BrowserRouter }
			)  
		})
		jest.spyOn(firebase, 'sendResetPasswordEmail').mockReturnValue(true)
		const forgetEmailButton = screen.getByTestId('forgetPassword');
		fireEvent.click(forgetEmailButton)
		const sendEmailButton = screen.getByTestId('sendButton');
		fireEvent.change(screen.getAllByTestId('email')[1], {target: {value: 'guillermo@gmail.com'}})
		fireEvent.click(sendEmailButton)
	
	})
	test('Does not send a reset password email', async () => {
			jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		await act(async() => {
			render(
				<Login />,
				{ wrapper: BrowserRouter }
			)  
		})
		jest.spyOn(firebase, 'sendResetPasswordEmail').mockReturnValue(false)
		const forgetEmailButton = screen.getByTestId('forgetPassword');
		fireEvent.click(forgetEmailButton)
		const sendEmailButton = screen.getByTestId('sendButton');
		fireEvent.change(screen.getAllByTestId('email')[1], {target: {value: 'guillermo@gmail.com'}})
		fireEvent.click(sendEmailButton)
	})
})
// app.test.js
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {BrowserRouter} from 'react-router-dom'
import App from '../App'
import { act } from 'react-dom/test-utils'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgetPasswordModal from '../components/ForgetPasswordModal'





describe("Authentication tests", () => {
	it('allows login when the two inputs are filled', async () => {
		// Arrange
		await act(async() => {
		 render(<Login />, {wrapper: BrowserRouter})  
		})
		const emailInput = screen.getByTestId('email')
		const passWordInput = screen.getByTestId('password')
		const loginButton = screen.getByTestId('loginButton')
		// Act
		fireEvent.change(emailInput, { target: { value: 'guillermo@gmail.com' } })
		fireEvent.change(passWordInput, { target: { value: '123' } })
		// Assert
		expect(loginButton.closest('button')).not.toBeDisabled()
	})

	it("allows register when two inputs are filled", async () => {
		// Arrange
		await act(async() => {
		 render(<Register />, {wrapper: BrowserRouter})  
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
		// Assert
		expect(registerButton.closest('button')).not.toBeDisabled()
	})

	xit("Does not allows to register if the two passwords do not match", async () => {
		// Arrange
		await act(async() => {
		 render(<Register />, {wrapper: BrowserRouter})  
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
		fireEvent.change(passWordInput2, { target: { value: '1234' } })
		fireEvent.change(birthday, { target: { value: '01/01/2000' } })
		// Assert
		expect(registerButton.closest('button')).toBeDisabled()
	})
	xit('Button is enabled when an email is typed', async () => {
		// Arrange
		const onOpenMock = jest
			.fn()
			.mockName('onOpen')
		const onCloseMock = jest
			.fn()
			.mockName('onClose')
		await act(async () => {
			render(<ForgetPasswordModal isOpen onClose={onCloseMock} onOpen={onOpenMock} />, {wrapper: BrowserRouter})  
		})
		const emailInput = screen.getByTestId('email')
		const sendEmailButton = screen.getByTestId('sendButton')
		// Act
		fireEvent.change(emailInput, {target: {value: 'guillermo@gmail.com'}})
		// Assert
		expect(sendEmailButton.closest('button')).not.toBeDisabled()

	})

	it('Sends a recover email when the users fills the form and clicks it', async () => {
		// Arrange
		const onOpenMock = jest
		.fn()
		.mockName('onOpen')
		const onCloseMock = jest
		.fn()
		.mockName('onClose')
		const sendEmailMock = jest.fn().mockName('sendEmail')
		
			await act(async () => {
				render(<ForgetPasswordModal sendEmail={sendEmailMock} isOpen onClose={onCloseMock} onOpen={onOpenMock} />, {wrapper: BrowserRouter})  
			})
		const emailInput = screen.getByTestId('email')
		const sendEmailButton = screen.getByTestId('sendButton')
		fireEvent.change(emailInput, {target: {value: 'guillermo@gmail.com'}})
		// Act
		fireEvent.click(sendEmailButton)
		// Assert
		expect(sendEmailMock).toHaveBeenCalled()

	})
})
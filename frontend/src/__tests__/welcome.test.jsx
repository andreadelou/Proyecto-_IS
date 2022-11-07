import { act, fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import * as firebaseHooks from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import * as goalsService from '../services/goals.service'
import * as usersService from '../services/users.service'


describe('Tests para <Welcome>', () => { 
	test('Can toggle the pet', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		
		await act(async() => {
			render(
				<Welcome />,
				{ wrapper: BrowserRouter }
				) 
				
				const plantButton = screen.getByTestId('plantButton')
				const frogButton = screen.getByTestId('frogButton')
				const exerciseButton = screen.getByTestId('exerciseButton')
				const meditateButton = screen.getByTestId('meditarButton')
				const startButton = screen.getByTestId('startButton')
				await act(async () => {
					fireEvent.click(exerciseButton)
				})
				await act(async () => {
					fireEvent.click(meditateButton)
				})
				await act(async () => { 
					fireEvent.click(plantButton)
				})
				await act(async () => { 
					fireEvent.click(frogButton)
				})
				await act(async () => { 
					fireEvent.click(startButton)
				})
		})
	})

	test('Can toggle a goal', async () => {
	jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(usersService, 'updateUserInfo').mockImplementation(jest.fn())
		jest.spyOn(goalsService, 'insertGoal').mockImplementation(jest.fn())
			await act(async() => {
				render(
				<Welcome />,
				{ wrapper: BrowserRouter }
				) 
			
				const exerciseButton = screen.getByText('Ejercicio')
				const learnButton = screen.getByText('Leer')

				const healthButton = screen.getByText('Medicina')
				const meditateButton = screen.getByText('Meditar')
				const startButton = screen.getByTestId('startButton')
				const frogButton = screen.getByTestId('frogButton')

			
				await act(async () => {
					fireEvent.click(exerciseButton)
				})
				await act(async () => {
					fireEvent.click(exerciseButton)
				})
				await act(async () => {
					fireEvent.click(exerciseButton)
				})
				await act(async () => {
					fireEvent.click(learnButton)
				})
				await act(async () => {
					fireEvent.click(meditateButton)
				})
				await act(async () => {
					fireEvent.click(healthButton)
				})
				await act(async () => {
					fireEvent.click(frogButton)
				})
				await act(async () => { 
					fireEvent.click(startButton)
				})
		})
	})
 })
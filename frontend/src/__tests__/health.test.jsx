// import Goals from "../pages/Health"
import React from 'react'
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
const { BrowserRouter } = require("react-router-dom")
const { default: Health } = require("../pages/Health")
import * as firebaseHooks from "react-firebase-hooks/auth";
import * as goalsService from "../services/goals.service";



describe('Health tests', () => {
	beforeEach(() => {
	jest.clearAllMocks()
	})
	
	

	test("render health titulo", async () => {
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({});
	jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[null, false]);
    await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
    })
    const titulo = screen.getByText(/estadísticas de tus metas/i)
    expect(titulo).toBeInTheDocument
})


	test("Calls fetch all goals", async () => {
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({
		'exercise': [{
				title: 'goal1',
				id: '123',
				todos: [{completed: true}, {completed: false}]
			}],
			'learn': [],
'health': [],
'mentalhealth': [],
	});
	jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
	await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
  })
})

	test("render health casilla", async () => {
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({});
	jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
    await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
    })
    const checkbox = screen.getByText(/incluir metas completadas/i)
    expect(checkbox).toBeInTheDocument
})

	test("puede marcar casilla", async () => {
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({});
	jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
    await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
    })
    const checkBox2 = screen.getByTestId('checkboxHealth')
    fireEvent.click(checkBox2)
})
})

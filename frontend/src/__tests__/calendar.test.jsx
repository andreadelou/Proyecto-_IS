import React from "react";
const {
    render,
    screen,
    fireEvent,
    within,
    getByTestId,
    waitFor,
} = require("@testing-library/react");
const { act } = require("react-dom/test-utils");
const { BrowserRouter } = require("react-router-dom");
const { default: Calendar } = require("../pages/Calendar");
import * as goalsService from "../services/goals.service";
import NuevasMetas from "../pages/Calendar";
import * as firebaseHooks from "react-firebase-hooks/auth";
import * as userService from '../services/users.service'

xtest("Checks text", async () => {
    await act(async () => {
        render(<Calendar />, { wrapper: BrowserRouter });
    });
    const texto = screen.getByText(/octubre de 2022/i);
    expect(texto).toBeInTheDocument;
});

test("Checks selected date", async () => {
    await act(async () => {
        render(<Calendar />, { wrapper: BrowserRouter });
    });
    const titulo = screen.getByText(/Dia seleccionado/i);
    expect(titulo).toBeInTheDocument;
});

test("Checks subtitle", async () => {
    await act(async () => {
        render(<Calendar />, { wrapper: BrowserRouter });
    });
    const sub = screen.getByText(/Organiza tu tiempo/i);
    expect(sub).toBeInTheDocument;
});

test("Goals", async () => {
    const goals = jest
        .spyOn(goalsService, "fetchAllGoals")
        .mockReturnValue(true);
    await act(async () => {
        render(<Calendar />, { wrapper: BrowserRouter });
    });
});

test("Goals", async () => {
    jest.spyOn(goalsService, "fetchGoalsByDate").mockReturnValue(true);
    await act(async () => {
        render(<Calendar />, { wrapper: BrowserRouter });
    });
});


test('Fetch goals when there is a current user', async () => {
	jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
		[{ uid: '123', email: 'foo@bar.com' }, false]);
	jest.spyOn(goalsService, "fetchGoalsByDate").mockReturnValue(
		[]);
	jest.spyOn(goalsService, "fetchAllGoals").mockReturnValue([]);
	await act(async () => {
        render(<NuevasMetas date1='2022-05-05' date2='2022-06-06' />, { wrapper: BrowserRouter });
    });
})
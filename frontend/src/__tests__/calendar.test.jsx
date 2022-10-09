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
import Calendario from "../pages/Calendar";

test("Checks text", async () => {
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

// import Goals from "../pages/Health"
import React from 'react'
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
const { BrowserRouter } = require("react-router-dom")
const { default: Health } = require("../pages/Health")

test("render health titulo", async () => {
    await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
    })
    const titulo = screen.getByText(/estadísticas de tus metas/i)
    expect(titulo).toBeInTheDocument
})


test("render health casilla", async () => {
    await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
    })
    const checkbox = screen.getByText(/incluir metas completadas/i)
    expect(checkbox).toBeInTheDocument
})

test("puede marcar casilla", async () => {
    await act(async () => {
        render(<Health />, { wrapper: BrowserRouter})
    })
    const checkBox2 = screen.getByTestId('checkboxHealth')
    fireEvent.click(checkBox2)
})
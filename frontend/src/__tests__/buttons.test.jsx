
// import Goals from "../pages/Goals"
import React from "react"
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
const { default: AddButton } = require("../components/AddButton")

describe('Buttons tests', () => {
	test('Add button works', async () => {
		// Arrange
		const onClickMock = jest
			.fn()
			.mockName('onClick')
		await act(async() => {
			render(
				<AddButton
					onAdd={onClickMock}
				/>
			)  
		})
		const addButton = screen.getByTestId('onaddButton')
		// Act
		fireEvent.click(addButton)
		// Assert
		expect(onClickMock).toHaveBeenCalledTimes(1)

	})
})
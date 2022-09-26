// import Goals from "../pages/Goals"

const { render, getByTestId, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
const { BrowserRouter } = require("react-router-dom")
const { default: GoalModal } = require("../components/GoalModal")


describe("Tests for the goals logic", () => {
	
	test('Allows to save a goal if the fields are filled', async () => {
		// Arrange
		const onOpenMock = jest
			.fn()
			.mockName('onOpen')
		const onCloseMock = jest
			.fn()
			.mockName('onClose')
		
		await act(async() => {
			render(
				<GoalModal
				isOpen={true} onOpen={onOpenMock}
				onClose={onCloseMock} />,
				{ wrapper: BrowserRouter }
			)  
		})
		const titleInput = screen.getByTestId('title')
		const categoryInput = screen.getByTestId('category')
		const reminderInput = screen.getByTestId('reminder')
		const saveButton = screen.getByTestId('save')
		// Act
		fireEvent.change(titleInput, { target: { value: 'Goal Title' } })
		fireEvent.change(categoryInput, { target: { value: 'health' } })
		fireEvent.change(reminderInput, { target: { value: '2022/09/27' } })
		// Assert
		expect(saveButton.closest('button').disabled).toBeFalsy()
	})

		
	test('Saves the goal when the user clicks the button.', async () => {
		// Arrange
		const onOpenMock = jest
			.fn()
			.mockName('onOpen')
		const onCloseMock = jest
			.fn()
			.mockName('onClose')
		const onSaveMock = jest
			.fn()
			.mockName('onSave')
		
		await act(async() => {
			render(
				<GoalModal
					isOpen={true} onOpen={onOpenMock}
					onSave ={onSaveMock}
					onClose={onCloseMock} />,
				{ wrapper: BrowserRouter }
			)  
		})
		const titleInput = screen.getByTestId('title')
		const categoryInput = screen.getByTestId('category')
		const reminderInput = screen.getByTestId('reminder')
		const saveButton = screen.getByTestId('save')
		// Act
		fireEvent.change(titleInput, { target: { value: 'Goal Title' } })
		fireEvent.change(categoryInput, { target: { value: 'health' } })
		fireEvent.change(reminderInput, { target: { value: '2022/09/27' } })
		fireEvent.click(saveButton)
		// Assert
		expect(onSaveMock).toHaveBeenCalled()
	})

})
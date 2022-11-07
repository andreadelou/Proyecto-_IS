// import Goals from "../pages/Goals"
import React from 'react'
const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
const { BrowserRouter } = require("react-router-dom")
const { default: GoalModal } = require("../components/GoalModal")
const { default: TodoForm } = require("../components/TodoForm")
const { default: Goals } = require("../pages/Goals")
import * as firebaseHooks from 'react-firebase-hooks/auth';
import Todo from '../components/Todo'
import TodoList from '../components/TodoList'
import * as goalsService from '../services/goals.service';
import * as usersService from '../services/users.service';

describe("Tests for the goals logic", () => {
	
	beforeEach(() => {
		// mockFirebase({currentUser: {email: 'Guillermo@gmail.com'}})
	})
	test('Fetch all goals when the user logs in', async () => {
		
		await act(async () => {
			render(
				<Goals />,
				{ wrapper: BrowserRouter }
			)
		})
	})
	
	test('Allows to save a goal if the fields are filled', async () => {
		// Arrange
		const onOpenMock = jest
			.fn()
			.mockName('onOpen')
		const onCloseMock = jest
			.fn()
			.mockName('onClose')
		
		await act(async () => {
			render(
				<GoalModal
					isOpen={true} onOpen={onOpenMock}
					onClose={onCloseMock} />,
				{ wrapper: BrowserRouter }
			)
		})
		const titleInput = screen.getByTestId('title')
		const descriptionInput = screen.getByTestId('description')
		const categoryInput = screen.getByTestId('category')
		const reminderInput = screen.getByTestId('reminder')
		const saveButton = screen.getByTestId('save')
		// Act
		fireEvent.change(titleInput, { target: { value: 'Goal Title' } })
		fireEvent.change(descriptionInput, { target: { value: 'Goal Title' } })
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
		
		await act(async () => {
			render(
				<GoalModal
					isOpen={true} onOpen={onOpenMock}
					onSave={onSaveMock}
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

	test("Clicking on the plus icon calls the method that creates the item.", async () => {
		// Arrange
		const onAddMock = jest
			.fn()
			.mockName('onAdd')
		
		await act(async () => {
			render(
				<TodoForm
					isOpen={true} onAdd={onAddMock}

					title="test goal"
				/>,
				{ wrapper: BrowserRouter }
			)
		})
		const addButton = screen.getByTestId('onaddButton')
		// Act
		fireEvent.click(addButton)
		// Assert
		expect(onAddMock).toHaveBeenCalled()	// The method that adds the todo should be called
	})

	test("Clicking the edit button calls the method that edits the item.", async () => {
		// Arrange
		const onEditMock = jest
			.fn()
			.mockName('onEdit')
		
		await act(async () => {
			render(
				<TodoForm
					isOpen={true}
					onEdit={onEditMock}

					title="test goal"
				/>,
				{ wrapper: BrowserRouter }
			)
		})
		const editButton = screen.getByTestId('oneditButton')
		// Act
		fireEvent.click(editButton)
		// Assert
		const goalSaveButton = screen.getByTestId('goalSaveButton')
		expect(goalSaveButton).toBeDefined()
	})

	test('Fetch all goals when there is an user', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(goalsService, 'fetchAllGoals').mockReturnValue([]);
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({
			'exercise': [{
				title: 'goal1',
				id: '123',
				todos: [{completed: true}, {completed: false}]
			}],
			'learn': [{
				title: 'goal1',
				id: '1233',
				todos: [{completed: true}]
			}],
			'mentalhealth': [{
				title: 'goal1',
				id: '12334',
				todos: [{completed: true}]
			}],
			'health': [{
				title: 'goal1',
				id: '123345',
				todos: [{completed: true}]
			}]
		});
		await act(async() => {
			render(
				<Goals />,
				{ wrapper: BrowserRouter }
			)  
		})
		const addButton = screen.getAllByTestId('onaddButton')[0]
		fireEvent.click(addButton)
	})
	test('Toggle a goal completed state', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(goalsService, 'fetchAllGoals').mockReturnValue([]);
		jest.spyOn(goalsService,'updateGoalTodo').mockReturnValue([]);
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({
			'exercise': [{
				title: 'goal1',
				completed: true,
				id: '123',
				todos: [{completed: false}, {completed: false}]
			}],
			'learn': [{
				title: 'goal1',
				completed: true,
				id: '1233',
				todos: [{completed: false}]
			}],
			'mentalhealth': [{
				title: 'goal1',
				completed: true,
				id: '12334',
				todos: [{completed: false}]
			}],
			'health': [{
				title: 'goal1',
				completed: true,
				id: '123345',
				todos: [{completed: false}]
			}],
			'noc': [{
				title: 'goal1',
				completed: true,
				id: '123345',
				todos: [{completed: false}]
			}]
		});
		await act(async() => {
			render(
				<Goals />,
				{ wrapper: BrowserRouter }
			)  
		})
		await act(async () => {
			const toggleComplete = screen.getAllByTestId('toggleComplete')[0]
			const toggleComplete2 = screen.getAllByTestId('completedGoal')[0]
			fireEvent.click(toggleComplete)
			fireEvent.click(toggleComplete2)
		})
	})
	test('Toggle a goal completed state', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(goalsService, 'fetchAllGoals').mockReturnValue([]);
		jest.spyOn(goalsService,'updateGoalTodo').mockReturnValue([]);
		jest.spyOn(goalsService,'updateGoal').mockReturnValue([]);
		jest.spyOn(usersService,'addPointsToUser').mockReturnValue([]);
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({
			'exercise': [{
				title: 'goal1',
				id: '123',
				completed: false,
				todos: [{completed: true}, {completed: false}]
			}],
		});
		await act(async() => {
			render(
				<Goals />,
				{ wrapper: BrowserRouter }
			)  
		})
		await act(async () => {
			const toggleComplete = screen.getAllByTestId('completedGoal')[0]
			fireEvent.click(toggleComplete)
		})
	})
	test('Toggle a goal completed state', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(goalsService, 'fetchAllGoals').mockReturnValue([]);
		jest.spyOn(goalsService,'updateGoalTodo').mockReturnValue([]);
		jest.spyOn(goalsService,'updateGoal').mockReturnValue([]);
		jest.spyOn(usersService,'addPointsToUser').mockReturnValue([]);
		jest.spyOn(goalsService, 'fetchAllGoalsAndGroupByCategory').mockReturnValue({
			'mentalhealth': [{
				title: 'goal1',
				id: '123',
				completed: true,
				todos: [{completed: true}, {completed: false}]
			}],
		});
		await act(async() => {
			render(
				<Goals />,
				{ wrapper: BrowserRouter }
			)  
		})
		await act(async () => {
			const toggleComplete = screen.getAllByTestId('completedGoal')[0]
			fireEvent.click(toggleComplete)
		})
	})
	


    test("Fetch goals when there is a current user", async () => {
        jest.spyOn(firebaseHooks, "useAuthState").mockReturnValue([
            { uid: "123", email: "foo@bar.com" },
            false,
        ]);
        jest.spyOn(
            goalsService,
            "fetchAllGoalsAndGroupByCategory"
        ).mockReturnValue([]);
        jest.spyOn(goalsService, "fetchAllGoals").mockReturnValue([]);
        await act(async () => {
            render(<Goals date1="2022-05-05" date2="2022-06-06" />, {
                wrapper: BrowserRouter,
            });
        });
		});
	
	test("Can Render a Todo", () => {
		const toggleComplete = jest.fn()
		const removeTodo = jest.fn()
		const onTodoChange = jest.fn()
		render(<Todo todo={{ value: '123', completed: false }} toggleComplete={toggleComplete} removeTodo={removeTodo} onTodoChange={onTodoChange} />)
		const todoInput = screen.getByPlaceholderText('Escribe la sub tarea')
		fireEvent.change(todoInput, { target: { value: 'mafer@gmail.com' } })
		expect(onTodoChange).toHaveBeenCalled()
	})
	test("Can edit a todo", () => {
		const changed = jest.fn();
		render(<TodoList todos={[{ value: '123', completed: false }]} onTodoChange={changed} removeTodo={jest.fn()} toggleComplete={jest.fn()} />)
		const todoInput = screen.getByPlaceholderText('Escribe la sub tarea');
		fireEvent.change(todoInput, {target: {value: "Esta es una tarea"}})
		expect(changed).toHaveBeenCalled();
	})
});

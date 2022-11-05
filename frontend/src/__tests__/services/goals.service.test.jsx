const { getAllGoals, addPoints, getPoints, saveGoalsInLocal, saveGoal, deleteGoal } = require("../../services/goals.service")

describe('goals.service tests', () => {
	it('Can get all goals', () => {
		// Act
		const goals = getAllGoals()
		// Assert
		expect(goals).toHaveLength(0)
	})

	it('Can add points to the user', () => {
		// Arrange
		const pointsToAdd = 10
		localStorage.setItem('points', 0)
		// Act
		addPoints(pointsToAdd)
		// Assert
		const pointsFromLocal = localStorage.getItem('points')
		expect(parseInt(pointsFromLocal)).toEqual(pointsToAdd)
	})

	it('Can add points to the user no points', () => {
		// Arrange
		const pointsToAdd = 10
		localStorage.removeItem('points');
		// Act
		addPoints(pointsToAdd)
		// Assert
		const pointsFromLocal = localStorage.getItem('points')
		expect(parseInt(pointsFromLocal)).toEqual(pointsToAdd)
	})

	it('can get points from the user', () => {
		// Arrange
		localStorage.setItem('points', 10)
		// Act
		const points = getPoints()
		// Assert
		expect(parseInt(points)).toEqual(10)
	})
	it('can get points from the user with no points', () => {
		// Arrange
		localStorage.removeItem('points')
		// Act
		const points = getPoints()
		// Assert
		expect(parseInt(points)).toEqual(0)
	})

	it('can save goals in local storage', () => {
		// Arrange
		jest.spyOn(Storage.prototype, 'setItem');
		Storage.prototype.setItem = jest.fn();
		// Act
		saveGoalsInLocal()
		// Assert
		expect(localStorage.setItem).toHaveBeenCalled()
	})

	it('Can save a goal in local storage', () => {
		// Arrange
		const title = 'Correr 10k'
		const category = 'exercise'
		// Act 
		saveGoal(title, category)
		// Assert
		expect(getAllGoals()).toHaveLength(1)
	})

	it('Can delete goals from local storage', () => {
		// Arrange
		saveGoal('Test', 'exercise')
		const { id } = getAllGoals()[0];
		jest.spyOn(Storage.prototype, 'removeItem');
		Storage.prototype.removeItem = jest.fn();
		// Act
		deleteGoal(id)
		// Assert
		expect(localStorage.removeItem).toHaveBeenCalled()
	})
	

	// Clear the local storage after each test
	afterEach(() => {
		localStorage.clear()
	})
})
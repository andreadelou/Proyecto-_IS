import { async } from '@firebase/util';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, Timestamp, getDocs, updateDoc, doc, query, where, orderBy, limit } from 'firebase/firestore'
import { fetchAllGoals, fetchAllGoalsAndGroupByCategory, fetchExpiredTasks, fetchGoalsByDate, insertGoal, proximatarea, updateGoal, updateGoalTodo } from '../services/goals.service';

jest.mock('firebase/firestore');
jest.mock('firebase/auth');



describe('Tests en Goals Service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	})
	test('Puede actualizar una meta', async () => {
		const goalId = '123-abc';
		const updatedGoal = { title: 'Meta', todos: [] }
		await updateGoal(goalId, updatedGoal);
		expect(updateDoc).toHaveBeenCalled();
	})

	test('Can insert a goal', async () => {
		const title = 'goal';
		const category = 'health';
		const reminder = null;
		const description = 'this is a test goal.';
		await insertGoal(title, category, reminder, description);
		expect(addDoc).toHaveBeenCalled();
	})
	test('Can insert a goal with default params', async () => {
		const title = 'goal';
		const category = 'health';
		await insertGoal(title, category);
		expect(addDoc).toHaveBeenCalled();
	})

	test('Can update goal todo', async () => {
		await updateGoalTodo({ title: '123', todos: ['he'] }, 0, 'hello');
		expect(updateDoc).toHaveBeenCalled();
	})

	test('Can fetch all goals', async () => {
		getDocs.mockResolvedValue(
			{
				docs: [
					{ id: 123, data: jest.fn() }
				]
			}
		)
		await fetchAllGoals()
		expect(getDocs).toHaveBeenCalled();
	})

	test('Can fetch expired tasks', async () => {
		getDocs.mockResolvedValue(
			{
				docs: [
					{ id: 123, data: jest.fn() }
				]
			}
		)
		await fetchExpiredTasks()
		expect(getDocs).toHaveBeenCalled();
	})
	test('Can get next task', async () => {
		getDocs.mockResolvedValue(
			{
				docs: [
					{ id: 123, data: jest.fn() }
				]
			}
		)
		await proximatarea()
		expect(getDocs).toHaveBeenCalled();
	})

	test('Can fetch all goals and group by category', async () => {
		const goalData = jest.fn().mockReturnValue({ completed: false, category: 'health' })
		const goalData2 = jest.fn().mockReturnValue({ completed: true, category: 'health' })
		getDocs.mockResolvedValue(
			{
				docs: [
					{ id: 123, data: goalData, },
					{ id: 124, data: goalData2, }
				]
			}
		)
		await fetchAllGoalsAndGroupByCategory(true)
		expect(getDocs).toHaveBeenCalled();
		await fetchAllGoalsAndGroupByCategory()
		expect(getDocs).toHaveBeenCalled();
	})
	test('Can fetch all goals by date', async () => {
		getDocs.mockResolvedValue(
			{
				docs: [
					{ id: 123, data: jest.fn(), },

				]
			}
		)
		await fetchGoalsByDate('2022-01-01', '2022-02-02');
		expect(getDocs).toHaveBeenCalled();
	})

})
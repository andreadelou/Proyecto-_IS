import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import GoalModalTwo from '../components/GoalModalTwo';
describe('Tests para <GoalModalTwo>', () => {
	it('Sets the goal title',  () => {
		const isOpen = true
		const onClose = jest.fn();
		const onOpen = jest.fn();
		const onSave = jest.fn();
		render(<GoalModalTwo isOpen={isOpen} onClose={onClose} onOpen={onOpen} onSave={onSave} />)
		const goalInput = screen.getByTestId('goalTitle')
		fireEvent.change(goalInput, { target: { value: '123' } })
		const saveButton = screen.getByText('Guardar')
		fireEvent.click(saveButton)
		expect(onSave).toHaveBeenCalled();
	})
})
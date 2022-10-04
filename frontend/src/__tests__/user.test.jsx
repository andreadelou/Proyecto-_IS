import { User } from "../models/user"

describe("Buy pet", () => {
	it('User buys a pet.', () => {
		// Arrange
		const sut = new User('abcd', 100, true, true, 'example@email.com', 'Guillermo', 'frog', []);
		// Act
		sut.addPet('dog', 100)
		// Assert
		// * 1. The pet belongs to the user
		expect(sut.pets.includes('dog')).toBeTruthy();
		// * 2. The user has less points
		expect(sut.points).toEqual(0)
	})
	it('User cant buy a pet if it there are no enoguh points.', () => {
		// Arrange
		const sut = new User('abcd', 0, true, true, 'example@email.com', 'Guillermo', 'frog', []);
		// Act
		const result = sut.addPet('dog', 100)
		// Assert
		// * 1. The pet does not belong to the user
		expect(sut.pets.includes('dog')).toBeFalsy();
		// * 2. The result is false
		expect(result).toBeFalsy()
	})

	it('User cannot buy a pet that is already owned', () => {
		// Arrange
		const sut = new User('abcd', 100, true, true, 'example@email.com', 'Guillermo', 'frog', ['dog']);
		// Act
		const result = sut.addPet('dog', 100)
		// Assert
		// * 1. The overall result should be false
		expect(result).toBeFalsy();
	})

})
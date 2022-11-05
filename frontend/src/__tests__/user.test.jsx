import { User } from "../models/user"
import { addPointsToUser, createUserInCollection, getUserInfo, updateUserInfo } from "../services/users.service";
import firebase from 'firebase/app'
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
jest.mock('firebase/firestore');
jest.mock('firebase/auth');
describe("Users tests", () => {

	beforeEach(() => {
			console.log(firebase)		
        
  })
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

	xit('Can create an user on a collection', async () => {
		await createUserInCollection({
			uid: '1232',
			email: 'test@example.com'
		})
	})

	it('update user information', async () => { 
		// Arrange
		const uid = '1icT46W2zDhm2azgnMp4BzhmCei12'
		createUserInCollection({uid: uid, email: 'test@example.com'})
		// Act
		const result = await updateUserInfo(uid, { email: 'tes2@example.com' })
		// Assert
		expect(result).toBeTruthy()
		// Clean
		const docRef = doc(db, 'users', uid);    // Get the document reference from firebase
		await deleteDoc(docRef)
	})
	

	xit('get user information', async () => {
		await getUserInfo({uid: '1icT46W2zDhm2azgnMp4BzhmCei1'})
	})

	it('cannot add a pet if there is no price and pet', () => {
		const sut = new User('abcd', 100, true, true, 'example@email.com', 'Guillermo', 'frog');
		sut.addPet(null, null)
		expect(sut.points).toEqual(100)
		
	})


	test('Can addPointsToUser', async() => {
		getDoc.mockResolvedValue(
			{
				exists: jest.fn().mockReturnValue(true),
				data: jest.fn().mockReturnValue({uid: 123})
			}
			)
		await addPointsToUser(10, { uid: '123' });
		expect(getDoc).toHaveBeenCalled();
	})

	test('Creates a new user if it does note exists', async () => {
		
	})

})

 
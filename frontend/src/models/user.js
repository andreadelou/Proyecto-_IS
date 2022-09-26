export class User {

	constructor(uid, points, active, configured, email, name, pet, pets = []) {
		this.uid = uid;
		this.points = points;
		this.active = active;
		this.configured = configured;
		this.email = email;
		this.name = name;
		this.pet = pet;
		this.pets = pets;
	}

	/**
	 * 
	 * @param {string} pet 
	 * @param {number} price 
	 * @return {boolean} success
	 */
	addPet(pet, price) {
		if (this.pets.includes(pet)) return false;	// Prevents the user from buying an already existing pet
		if (!price || !pet) return false;	// This parametters are required
		if (this.points < price) return false;	// The user can't buy a pet if there are no enoguh points
		this.pets.push(pet);
		this.points = this.points - price;
	}

}
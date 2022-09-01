import { ActiveRecord } from '../../../utils/activeRecord';


/**
 * Defines the structure of the profile active record
 */
export class Profile implements ActiveRecord<Profile> {

	public get id(): string {
		return this.id
	}
	private set id(v: string) {
		this.id = v;
	}
	
	public get name() : string {
		return this.name
	}
	public set name(v : string) {
		this.name = v;
	}

	public get points() : number {
		return this.points;
	}
	public set points(v : number) {
		this.points = v;
	}
	
	public get active() : boolean {
		return this.active;
	}
	public set active(v : boolean) {
		this.active = v;
	}

	public get configured() : boolean {
		return this.configured;
	}
	public set configured(v : boolean) {
		this.configured = v;
	}
	
	public get pet() : string {
		return this.pet;
	}
	public set pet(v : string) {
		this.pet = v;
	}
	
	private constructor(id: string, name: string, points: number, active: boolean,
		configured: boolean, pet: string)
	{
		this.id = id;
		this.name = name;
		this.points = points;
		this.active = active;
		this.configured = configured;
		this.pet = pet;
	}

	public static async create(id: string, name: string, points: number, active: boolean,
		configured: boolean, pet: string): Promise<Profile> {
			// Call the firebase method to create the profile
			// If successful, return the profile
	}
	
	public static async findOne(id: string): Promise<Profile> {
		// Call the firebase method to find the profile by id
		// If successful, return the profile
	}

	save(): Promise<Profile> {
		throw new Error('Method not implemented.');
	}
	delete(): Promise<Profile> {
		throw new Error('Method not implemented.');
	}
	edit(values: object): Promise<Profile> {
		throw new Error('Method not implemented.');
	}

}
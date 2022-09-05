import { ActiveRecord } from './../../../shared/activeRecord';



/**
 * Defines the structure of the profile active record
 */
export class Profile implements ActiveRecord {

	public get id(): string {
		return this.id
	}
	private set id(v: string) {
		this.id = v;
	}

	public get inventory(): string[] {
		return this.inventory;
	}
	private set inventory(v: string[]) {
		this.inventory = v;
	}

	public get name() : string {
		return this.name
	}
	public set name(v : string) {
		this.name = v;
	}

	public get pets() {
		return this.pets;
	}

	public set pets(v: string[]) {
		this.pets = v;
	} 

	public get points() : number {
		return this.points;
	}
	private set points(v : number) {
		this.points = v;
	}
	
	public get active() : boolean {
		return this.active;
	}
	private set active(v : boolean) {
		this.active = v;
	}

	public get configured() : boolean {
		return this.configured;
	}
	private set configured(v : boolean) {
		this.configured = v;
	}
	
	public get pet() : string {
		return this.pet;
	}
	private set pet(v : string) {
		this.pet = v;
	}
	
	private constructor(id: string, name: string, points: number, active: boolean,
		configured: boolean, pet: string, pets: string[])
	{
		this.id = id;
		this.name = name;
		this.points = points;
		this.active = active;
		this.configured = configured;
		this.pet = pet;
		this.pets = pets;
	}
	save(): Promise<Profile> {
		throw new Error('Method not implemented.');
	}
	delete(): Promise<Profile> {
		throw new Error('Method not implemented.');
	}
	update(): Promise<Profile> {
		throw new Error('Method not implemented.');
	}
	

}
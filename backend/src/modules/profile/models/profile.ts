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
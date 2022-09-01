
export interface ActiveRecord<T> {
	save(): Promise<T>
	delete(): Promise<T>
	edit(values: object): Promise<T>
}
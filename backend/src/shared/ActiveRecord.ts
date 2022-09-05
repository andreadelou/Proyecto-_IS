
/**
 * Active Records
 */
export interface ActiveRecord<E> {
	save(): Promise<E>
	delete(): Promise<E>
	update(): Promise<E>
}
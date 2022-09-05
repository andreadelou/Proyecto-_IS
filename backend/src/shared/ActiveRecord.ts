
/**
 * Active Records
 */
export interface ActiveRecord {
	save(): Promise<ActiveRecord>
	delete(): Promise<ActiveRecord>
	update(): Promise<ActiveRecord>
}



/**
 * Guard against null or undefined values
 * @param {*} value 
 * @returns 
 */
export const againstNullOrUndefined = (value) => {
	if (value == null || value === undefined) return false
	return true
}
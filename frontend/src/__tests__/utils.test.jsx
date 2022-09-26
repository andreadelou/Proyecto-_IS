const { againstNullOrUndefined } = require("../utils/guard");

describe("Utility methods", () => {
	it("Against null or undefined catches undefined and null values", () => {
		// arrange
		const value = null;
		let value2;
		// act
		const res1 = againstNullOrUndefined(value)
		const res2 = againstNullOrUndefined(value2)
		// assert
		expect(res1).toBeFalsy()
		expect(res2).toBeFalsy()
	})
	it("Against null or undefined passes correct values", () => {
		// arrange
		const value = "one";
		let value2 = 2;
		// act
		const res1 = againstNullOrUndefined(value)
		const res2 = againstNullOrUndefined(value2)
		// assert
		expect(res1).toBeTruthy()
		expect(res2).toBeTruthy()
	})
})
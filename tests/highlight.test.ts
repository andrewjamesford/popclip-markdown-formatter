import { highlight } from "../Config";

describe("highlight", () => {
	test("wraps text in double equals", () => {
		expect(highlight("hi")).toBe("==hi==");
	});
	test("removes highlight if already present", () => {
		expect(highlight("==hi==")).toBe("hi");
	});
});

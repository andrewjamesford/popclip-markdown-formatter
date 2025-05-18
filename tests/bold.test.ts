import { bold } from "../Config";

describe("bold", () => {
	test("wraps text in bold", () => {
		expect(bold("hello")).toBe("**hello**");
	});
	test("removes bold if already present", () => {
		expect(bold("**hello**")).toBe("hello");
	});
	test("handles empty string", () => {
		expect(bold("")).toBe("");
	});
});

import { italic } from "../Config";

describe("italic", () => {
	test("wraps text in italic", () => {
		expect(italic("hello")).toBe("_hello_");
	});
	test("removes italic if already present", () => {
		expect(italic("_hello_")).toBe("hello");
	});
});

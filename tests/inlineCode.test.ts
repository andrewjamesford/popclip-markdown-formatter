import { inlineCode } from "../Config";

describe("inlineCode", () => {
	test("wraps text in backticks", () => {
		expect(inlineCode("code")).toBe("`code`");
	});
	test("removes backticks if already present", () => {
		expect(inlineCode("`code`")).toBe("code");
	});
});

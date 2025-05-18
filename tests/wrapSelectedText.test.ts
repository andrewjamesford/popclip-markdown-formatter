import { wrapSelectedText } from "../Config";

describe("wrapSelectedText", () => {
	test("wraps text with the given tag", () => {
		expect(wrapSelectedText("hello", "~~")).toBe("~~hello~~");
	});

	test("handles empty string", () => {
		expect(wrapSelectedText("", "~~")).toBe("");
	});

	test("handles text with newlines", () => {
		expect(wrapSelectedText("line1\nline2", "~~")).toBe("~~line1\nline2~~");
	});

	test("handles text with only whitespace", () => {
		expect(wrapSelectedText("   ", "~~")).toBe("   ");
	});

	test("handles text with special characters", () => {
		expect(wrapSelectedText("hello! @#%", "~~")).toBe("~~hello! @#%~~");
	});
	test("handles text with markdown already present and removes instead", () => {
		expect(wrapSelectedText("~~already~~", "~~")).toBe("already");
	});

	test("handles multi-line text", () => {
		const input = "first line\nsecond line\nthird line";
		const expected = "~~first line\nsecond line\nthird line~~";
		expect(wrapSelectedText(input, "~~")).toBe(expected);
	});

	test("handles unicode characters", () => {
		expect(wrapSelectedText("こんにちは", "~~")).toBe("~~こんにちは~~");
	});
});

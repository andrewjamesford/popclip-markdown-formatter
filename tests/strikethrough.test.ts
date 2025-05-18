import { strikethrough } from "../Config";

describe("strikethrough", () => {
	test("adds strikethrough to text", () => {
		expect(strikethrough("hello")).toBe("~~hello~~");
	});

	test("handles empty string", () => {
		expect(strikethrough("")).toBe("");
	});

	test("preserves newlines", () => {
		expect(strikethrough("line1\nline2")).toBe("~~line1\nline2~~");
	});

	test("handles text with only whitespace", () => {
		expect(strikethrough("   ")).toBe("   ");
	});

	test("handles text with special characters", () => {
		expect(strikethrough("hello! @#%")).toBe("~~hello! @#%~~");
	});

	test("handles text with markdown already present and removes instead", () => {
		expect(strikethrough("~~already~~")).toBe("already");
	});

	test("handles multi-line text", () => {
		const input = "first line\nsecond line\nthird line";
		const expected = "~~first line\nsecond line\nthird line~~";
		expect(strikethrough(input)).toBe(expected);
	});

	test("handles unicode characters", () => {
		expect(strikethrough("こんにちは")).toBe("~~こんにちは~~");
	});
});

import { blockQuote } from "../Config";

describe("blockQuote", () => {
	test("adds > to text", () => {
		expect(blockQuote("quote")).toBe("> quote");
	});

	test("handles empty string", () => {
		expect(blockQuote("")).toBe("> ");
	});

	test("handles whitespace only", () => {
		expect(blockQuote("   ")).toBe(">    ");
	});

	test("handles text that already starts with >", () => {
		expect(blockQuote("> already quoted")).toBe("> > already quoted");
	});

	test("handles multiline input", () => {
	expect(blockQuote("line1\nline2")).toBe("> line1\n> line2");
	});

	test("handles leading and trailing whitespace", () => {
		expect(blockQuote("  hello  ")).toBe(">   hello  ");
	});

	test("handles text with only newlines", () => {
		expect(blockQuote("\n")).toBe("> \n");
	});

	test("handles unicode characters", () => {
		expect(blockQuote("こんにちは")).toBe("> こんにちは");
	});

	test("handles special characters", () => {
		expect(blockQuote("!@#$%^&*()")).toBe("> !@#$%^&*()");
	});
});

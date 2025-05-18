import { blockQuote } from "../Config";

describe("blockQuote", () => {
	test("adds > to text", () => {
		expect(blockQuote("quote")).toBe("> quote");
	});
});

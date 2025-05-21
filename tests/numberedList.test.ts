import { numberedList } from "../Config";

describe("numberedList", () => {
	test("adds numbers to each line", () => {
		expect(numberedList("item one\\nitem two")).toBe(
			"1. item one\\n2. item two",
		);
	});

	test("handles single line", () => {
		expect(numberedList("single item")).toBe("1. single item");
	});

	test("handles empty lines", () => {
		expect(numberedList("item one\\n\\nitem two")).toBe(
			"1. item one\\n2. \\n3. item two",
		);
	});

	test("handles text with special characters", () => {
		expect(numberedList("item #1\\nitem @2")).toBe("1. item #1\\n2. item @2");
	});

	test("removes numbering if already present", () => {
		expect(numberedList("1. already numbered")).toBe("already numbered");
	});

	test("handles complex multi-line case", () => {
		const input = "first item\\nsecond item\\nthird item\\nfourth item";
		const expected =
			"1. first item\\n2. second item\\n3. third item\\n4. fourth item";
		expect(numberedList(input)).toBe(expected);
	});
});

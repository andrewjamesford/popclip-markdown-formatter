import { headingsPlus } from "../Config";

describe("headingsPlus", () => {
	test("increases heading level", () => {
		expect(headingsPlus("## Heading")).toBe("# Heading");
	});

	test("converts non-heading text to h1", () => {
		expect(headingsPlus("Regular text")).toBe("# Regular text");
	});

	test("handles empty string", () => {
		expect(headingsPlus("")).toBe("# ");
	});

	test("handles multiple hash symbols", () => {
		expect(headingsPlus("### Third level heading")).toBe(
			"## Third level heading",
		);
	});

	test("handles h1 converting to no heading", () => {
		expect(headingsPlus("# Heading")).toBe(" Heading");
	});

	test("handles multi-line content with headings", () => {
		const input = "## Main heading\\nSome content\\n### Subheading";
		const expected = "# Main heading\\nSome content\\n## Subheading";
		expect(headingsPlus(input)).toBe(expected);
	});

	test("handles headings with special characters", () => {
		expect(headingsPlus("## Heading with @special #chars!")).toBe(
			"# Heading with @special #chars!",
		);
	});
});

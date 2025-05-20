import { headingsMinus } from "../Config";

describe("headingsMinus", () => {
	test("increases heading level by one", () => {
		expect(headingsMinus("# Heading")).toBe("## Heading");
		expect(headingsMinus("## Heading")).toBe("### Heading");
		expect(headingsMinus("### Heading")).toBe("#### Heading");
	});

	test("handles multiple lines with same heading level", () => {
		expect(headingsMinus("# Heading 1\\n# Heading 2")).toBe(
			"## Heading 1\\n## Heading 2",
		);
	});

	test("returns original text when no heading is present", () => {
		expect(headingsMinus("Regular text")).toBe("Regular text");
	});

	test("increases heading level for all lines", () => {
		expect(headingsMinus("# Title\\nSome content\\n## Subtitle")).toBe(
			"## Title\\n## Some content\\n## Subtitle",
		);
	});
});

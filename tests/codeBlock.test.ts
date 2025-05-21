import { codeBlock } from "../Config";

describe("codeBlock", () => {
	test("wraps text in code block", () => {
		expect(codeBlock("console.log('hello')")).toBe(
			"```\nconsole.log('hello')\n```",
		);
	});

	test("handles text with newlines", () => {
		expect(codeBlock("line1\\nline2")).toBe("```\nline1\\nline2\n```");
	});

	test("handles empty string", () => {
		expect(codeBlock("")).toBe("```\n\n```");
	});

	test("trims whitespace", () => {
		expect(codeBlock("  code  ")).toBe("```\ncode\n```");
	});

	test("handles text with special characters", () => {
		expect(codeBlock("function() { return 'special chars: !@#$%^&*()' }")).toBe(
			"```\nfunction() { return 'special chars: !@#$%^&*()' }\n```",
		);
	});
});

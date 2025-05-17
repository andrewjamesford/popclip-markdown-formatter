import {
	bold,
	italic,
	inlineCode,
	bulletedList,
	blockQuote,
	highlight,
	underline,
	strikethrough,
	wrapSelectedText,
} from "../Config";

describe("bold", () => {
	test("wraps text in bold", () => {
		expect(bold("hello")).toBe("**hello**");
	});
	test("removes bold if already present", () => {
		expect(bold("**hello**")).toBe("hello");
	});
	test("handles empty string", () => {
		expect(bold("")).toBe("");
	});
});

describe("italic", () => {
	test("wraps text in italic", () => {
		expect(italic("hello")).toBe("_hello_");
	});
	test("removes italic if already present", () => {
		expect(italic("_hello_")).toBe("hello");
	});
});

describe("inlineCode", () => {
	test("wraps text in backticks", () => {
		expect(inlineCode("code")).toBe("`code`");
	});
	test("removes backticks if already present", () => {
		expect(inlineCode("`code`")).toBe("code");
	});
});

describe("bulletedList", () => {
	test("adds dash to each line", () => {
		expect(bulletedList("a\\nb")).toBe("- a\\n- b");
	});
	test("handles single line", () => {
		expect(bulletedList("a")).toBe("- a");
	});
});

describe("blockQuote", () => {
	test("adds > to text", () => {
		expect(blockQuote("quote")).toBe("> quote");
	});
});

describe("highlight", () => {
	test("wraps text in double equals", () => {
		expect(highlight("hi")).toBe("==hi==");
	});
	test("removes highlight if already present", () => {
		expect(highlight("==hi==")).toBe("hi");
	});
});

describe("underline", () => {
	test("wraps text in u", () => {
		expect(underline("hi")).toBe("uhiu");
	});
	test("removes underline if already present", () => {
		expect(underline("uhiu")).toBe("hi");
	});
});

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

import { bulletedList } from "../Config";

describe("bulletedList", () => {
	test("adds dash to each line", () => {
		expect(bulletedList("a\\nb")).toBe("- a\\n- b");
	});
	test("handles single line", () => {
		expect(bulletedList("a")).toBe("- a");
	});
});

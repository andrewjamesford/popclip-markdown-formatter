import { taskList } from "../Config";

describe("taskList", () => {
	test("adds task checkbox to each line", () => {
		expect(taskList("task one\\ntask two")).toBe(
			"- [ ] task one\\n- [ ] task two",
		);
	});

	test("handles single line", () => {
		expect(taskList("single task")).toBe("- [ ] single task");
	});

	test("removes task checkbox if already present", () => {
		expect(taskList("- [ ] existing task")).toBe("existing task");
	});

	test("handles empty lines", () => {
		expect(taskList("task one\\n\\ntask two")).toBe(
			"- [ ] task one\\n- [ ] \\n- [ ] task two",
		);
	});

	test("handles text with special characters", () => {
		expect(taskList("buy milk #urgent\\npick up @store")).toBe(
			"- [ ] buy milk #urgent\\n- [ ] pick up @store",
		);
	});

	test("handles complex multi-line case", () => {
		const input = "task 1\\ntask 2\\ntask 3\\ntask 4";
		const expected =
			"- [ ] task 1\\n- [ ] task 2\\n- [ ] task 3\\n- [ ] task 4";
		expect(taskList(input)).toBe(expected);
	});
});

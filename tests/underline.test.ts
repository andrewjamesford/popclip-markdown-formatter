import { underline } from "../Config";

describe("underline", () => {
	test("wraps text in u", () => {
		expect(underline("hi")).toBe("uhiu");
	});
	test("removes underline if already present", () => {
		expect(underline("uhiu")).toBe("hi");
	});
});

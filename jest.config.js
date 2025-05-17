module.exports = {
	testEnvironment: "node",
	roots: ["<rootDir>/tests"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	preset: "ts-jest",
};

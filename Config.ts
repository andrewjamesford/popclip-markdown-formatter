// #popclip
// name: Markdown Formatter
// identifier: com.andrewford.popclip.extension.markdown-formatter
// description: Apply Markdown formatting to selected text
// icon: square MD
// popclip version: 4586
// keywords: markdown, formatter,
// language: typescript
// module: true

/// <reference types="@popclip/types" />

function wrapSelectedText(text: string, tag: string): string {
	// Check if the text is already wrapped in the tag
	const regex = new RegExp(
		`^${tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(.*?)${tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
	);

	// If it is, remove the tag
	if (regex.test(text)) return text.replace(regex, "$1");

	// If it isn't, wrap it in the tag
	return `${tag}${text}${tag}`;
}

function formatText(text: string, tag: string): string {
	// Check if the text is empty
	if (text.trim() === "") {
		return text;
	}
	// Split the text into lines
	const lines = text.split("\\n");

	// Map each line to the formatted version
	const formattedLines = lines.map((line) => {
		return wrapSelectedText(line, tag);
	});

	// Join the formatted lines into a single string
	return formattedLines.join("\\n");
}

// Action functions
export function strikethrough(text: string): string {
	const formattedText = formatText(text, "~~");
	return formattedText;
}

export function bold(text: string): string {
	const formattedText = formatText(text, "**");
	return formattedText;
}

export function italic(text: string): string {
	const formattedText = formatText(text, "_");
	return formattedText;
}

export function inlineCode(text: string): string {
	const formattedText = formatText(text, "`");
	return formattedText;
}

export function bulletedList(text: string): string {
	// Split the text into lines
	const lines = text.split("\\n");

	// Map each line to the formatted version
	const formattedLines = lines.map((line) => {
		return `- ${line}`;
	});

	// Join the formatted lines into a single string
	const formattedText = formattedLines.join("\\n");

	return formattedText;
}

export function blockQuote(text: string): string {
	const formattedText = `> ${text}`;
	return formattedText;
}

export function highlight(text: string): string {
	const formattedText = formatText(text, "==");
	return formattedText;
}

export function underline(text: string): string {
	const formattedText = formatText(text, "u");
	return formattedText;
}

export function codeBlock(text: string): string {
	const trimmedText = text.trim();
	const formattedText = `\`\`\`\n${trimmedText}\n\`\`\``;
	return formattedText;
}

// Complicated Action functions
export function numberedList(text: string): string {
	let counter = 0;

	// Split the text into lines
	const lines = text.split("\\n");

	// Map each line to the formatted version
	const formattedLines = lines.map((line) => {
		counter++;
		return wrapSelectedText(line, `${counter}. `);
	});

	// Join the formatted lines into a single string
	const formattedText = formattedLines.join("\\n");

	return formattedText;
}

export function taskList(text: string): string {
	// Split the text into lines
	const lines = text.split("\\n");

	// Map each line to the formatted version
	const formattedLines = lines.map((line) => {
		return wrapSelectedText(line, "- [ ] ");
	});

	// Join the formatted lines into a single string
	const formattedText = formattedLines.join("\\n");

	return formattedText;
}

export function headingsMinus(text: string): string {
	// Split the text into lines
	const lines = text.split("\\n");

	let headingLevel = 0;

	// find if there is a HX tag in the text
	const hasHeading = lines.find((line) => line.startsWith("#"));

	if (hasHeading && hasHeading.length > 0) {
		// Get the number of ##s in the first line
		headingLevel = hasHeading.match(/#/g)?.length || 0;
	} else {
		return `${text}`;
	}

	// Map each line to the formatted version
	const formattedLines = lines.map((line) => {
		// Remove any existing heading tags
		const cleanedLine = line.replace(/#+\s/g, "");

		// strip any spaces from the tag
		const tag = "#".repeat(headingLevel + 1).replace(/\s/g, "");

		return `${tag.trim()} ${cleanedLine}`;
	});

	// Join the formatted lines into a single string
	const formattedText = formattedLines.join("\\n");
	return formattedText;
}

export function headingsPlus(text: string): string {
	// Split the text into lines
	const lines = text.split("\\n");

	let headingLevel = 0;

	// find if there is a HX tag in the text
	const hasHeading = lines.find((line) => line.startsWith("#"));

	if (hasHeading && hasHeading.length > 0) {
		// Get the number of ##s in the first line
		headingLevel = hasHeading.match(/#/g)?.length || 0;

		// Map each line to the formatted version
		const formattedLines = lines.map((line) => {
			// Remove any existing heading tags
			const cleanedLine = line.replace(/#+\s/g, "");

			const tag = "#".repeat(headingLevel - 1);

			return `${tag.trim()} ${cleanedLine}`;
		});

		// Join the formatted lines into a single string
		const formattedText = formattedLines.join("\\n");

		return formattedText;
	}
	return `# ${text}`;
}

export default {
	actions: [
		{
			title: "Bulleted List",
			icon: "symbol:list.bullet",
			code: (selection) => popclip.pasteText(bulletedList(selection.text)),
		},
		{
			title: "Block Quote",
			icon: "symbol:quote.bubble",
			code: (selection) => popclip.pasteText(blockQuote(selection.text)),
		},
		{
			title: "Inline Code",
			icon: "symbol:chevron.left.chevron.right",
			code: (selection) => popclip.pasteText(inlineCode(selection.text)),
		},
		{
			title: "Code Block",
			icon: "iconify:fluent:code-block-edit-20-regular",
			code: (selection) => popclip.pasteText(codeBlock(selection.text)),
		},
		{
			title: "Heading -",
			icon: "square H-",
			code: (selection) => popclip.pasteText(headingsMinus(selection.text)),
		},
		{
			title: "Heading +",
			icon: "square H+",
			code: (selection) => popclip.pasteText(headingsPlus(selection.text)),
		},
		// {
		//   title: "Strike through",
		//   icon: "symbol:strikethrough",
		//   code: (selection) => popclip.pasteText(strikethrough(selection.text)),
		// },
		// {
		//   title: "Numbered List",
		//   icon: "symbol:list.number",
		//   code: (selection) => popclip.pasteText(numberedList(selection.text)),
		// },
		// {
		//   title: "Task List",
		//   icon: "symbol:list.bullet.rectangle",
		//   code: (selection) => popclip.pasteText(taskList(selection.text)),
		// },
	],
};

function wrapSelectedText(text: string, tag: string): string {
	// Check if the text is already wrapped in the tag
	const regex = new RegExp(`^${tag}(.*?)${tag}$`);

	if (regex.test(text)) return text.replace(regex, "$1");

	// If it isn't, wrap it in the tag
	return `${tag}${text}${tag}`;
}

function formatText(text: string, tag: string): string {
	// Split the text into lines
	const lines = text.split("\\n");
	// Map each line to the formatted version
	const formattedLines = lines.map((line) => {
		return wrapSelectedText(line, tag);
	});
	// Join the formatted lines into a single string
	return formattedLines.join("\\n");
}

function getInputText(): string {
	const text = popclip.input.text;
	return text;
}

function pasteText(text: string): void {
	popclip.pasteText(text);
}

// Action functions

function strikethrough(): void {
	const text = getInputText();
	const formattedText = formatText(text, "~~");
	pasteText(formattedText);
}
function bold(): void {
	const text = getInputText();
	const formattedText = formatText(text, "**");
	pasteText(formattedText);
}
function italic(): void {
	const text = getInputText();
	const formattedText = formatText(text, "_");
	pasteText(formattedText);
}
function inlineCode(): void {
	const text = getInputText();
	const formattedText = formatText(text, "`");
	pasteText(formattedText);
}
function bulletedList(): void {
	const text = getInputText();
	const formattedText = formatText(text, "- ");
	pasteText(formattedText);
}
function numberedList(): void {
	const text = getInputText();
	const formattedText = formatText(text, "1. ");
	pasteText(formattedText);
}

/// <reference types="@popclip/types" />

function wrapSelectedText(text: string, tag: string): string {
  // Check if the text is already wrapped in the tag
  const regex = new RegExp(`^${tag}(.*?)${tag}$`);
  // If it is, remove the tag
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
function blockQuote(): void {
  const text = getInputText();
  const formattedText = formatText(text, "> ");
  pasteText(formattedText);
}
function highlight(): void {
  const text = getInputText();
  const formattedText = formatText(text, "==");
  pasteText(formattedText);
}
// Underline is not supported in Obsidian
// function underline(): void {
//   const text = getInputText();
//   const formattedText = formatText(text, "__");
//   pasteText(formattedText);
// }

// Complicated Action functions
function numberedList(): void {
  const text = getInputText();
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
  pasteText(formattedText);
}
function taskList(): void {
  const text = getInputText();
  // Split the text into lines
  const lines = text.split("\\n");
  // Map each line to the formatted version
  const formattedLines = lines.map((line) => {
    return wrapSelectedText(line, "- [ ] ");
  });
  // Join the formatted lines into a single string
  const formattedText = formattedLines.join("\\n");
  pasteText(formattedText);
}
function codeBlock(): void {
  const text = getInputText();
  const formattedText = formatText(text, "```\\n");
  pasteText(formattedText);
}
function headingsPlus(): void {
  const text = getInputText();
  // Split the text into lines
  const lines = text.split("\\n");
  let headingLevel = 0;
  // find if there is a HX tag in the text
  const hasHeading = lines.find((line) => line.startsWith("#"));
  if (hasHeading) {
    // Get the number of ##s in the first line
    headingLevel = hasHeading.match(/#/g)?.length || 0;
  }
  // Map each line to the formatted version
  const formattedLines = lines.map((line) => {
    const tag = "#".repeat(headingLevel + 1);
    return `${tag} ${line}`;
  });
  // Join the formatted lines into a single string
  const formattedText = formattedLines.join("\\n");
  pasteText(formattedText);
}
function headingsMinus(): void {
  const text = getInputText();
  // Split the text into lines
  const lines = text.split("\\n");
  let headingLevel = 0;
  // find if there is a HX tag in the text
  const hasHeading = lines.find((line) => line.startsWith("#"));
  if (hasHeading) {
    // Get the number of ##s in the first line
    headingLevel = hasHeading.match(/#/g)?.length || 0;
  }

  // Map each line to the formatted version
  const formattedLines = lines.map((line) => {
    const tag = "#".repeat(headingLevel - 1);
    return `${tag} ${line}`;
  });
  // Join the formatted lines into a single string
  const formattedText = formattedLines.join("\\n");
  pasteText(formattedText);
}

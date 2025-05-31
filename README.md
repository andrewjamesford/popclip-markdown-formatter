# Markdown Formatter 

A PopClip extension that provides quick Markdown formatting options for text.

## Author

Andrew Ford - https://andrewford.co.nz

## Features

This extension adds the following formatting options to PopClip:

### Markdown Formatting

- **Strikethrough**: Wraps selected text with `~~` markers
- **Bulleted List**: Prepends `- ` to each line
- **Numbered List**: Prepends a number `1. ` to each line
- **Task List**: Prepends `- [ ] ` to each line
- **Block Quote**: Prepends `> ` to each line
- **Inline Code**: Wraps selected text with backticks (`` ` ``)
- **Code Block**: Wraps selected text with triple backticks (```` ``` ````) 
- **Heading -**: Drops the selected text into a Markdown heading format (e.g., `# Heading`, `## Subheading`, etc.)
- **Heading +**: Ups the selected text into a Markdown heading format (e.g., `# Heading`, `## Subheading`, etc.)

Note all options are optional and can be toggled on or off in the extension settings.

## Usage

1. Select text you want to format
2. Click the PopClip menu that appears
3. Choose the desired formatting option
4. The formatted text will replace your selection

The extension handles multi-line text appropriately, applying the formatting to each line where relevant.

## Customisation

You can customize which formatting options appear in your PopClip menu:

1. Open PopClip preferences
2. Find the Markdown Formatter extension
3. Click the gear icon to access settings
4. Toggle options on/off according to your needs

## Building and Installing

To build and install the extension:

1. Clone the repository or download the source code.
2. Run `npm install` to install dependencies.
3. Run `chmod +x bundle.sh` to make the script executable.
4. Run `./bundle.sh` to create the PopClip extension bundle.
5. Go to the build directory and double click the `MarkdownFormatter.popclipext` file to install it in PopClip.

Note you may get a warning about the extension being from an unidentified developer. You can bypass this by holding down the `Control` key while clicking the file and selecting "Open".
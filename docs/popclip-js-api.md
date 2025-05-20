# PopClip JavaScript API Reference

This documentation describes PopClip's JavaScript environment and is based on the TypeScript definitions file, `popclip.d.ts`.

## Table of Contents
- [Global Objects](#global-objects)
- [Core Functions](#core-functions)
- [The PopClip Interface](#the-popclip-interface)
- [Extension API](#extension-api)
- [Actions](#actions)
- [Input and Context](#input-and-context)
- [Common Interfaces](#common-interfaces)
- [Types and Constants](#types-and-constants)
- [Utility Functions](#utility-functions)
- [Rich String Handling](#rich-string-handling)

## Global Objects

PopClip provides several global objects that can be accessed from anywhere in your extension:

| Object | Description |
|--------|-------------|
| `popclip` | The main PopClip object used to interact with PopClip features |
| `pasteboard` | Provides access to the system clipboard |
| `util` | Utility functions and constants |

## Core Functions

### `defineExtension(extension)`

This global function may be called as an alternative to setting `module.exports` directly. The advantage of using `defineExtension()` is that you will automatically get type checking and autocomplete for your extension object.

You may define the shape of the extension's options object by specifying the `CustomOptions` generic type parameter. This will enable type checking and autocomplete for the `options` parameter in action functions and the population function.

Example:
```javascript
defineExtension({
  name: 'My Extension',
  actions: [{
    title: 'My Action',
    code: (selection) => {
      // Your code here
    }
  }]
});
```

### `sleep(milliseconds)`

Pauses execution for the specified number of milliseconds.

```javascript
await sleep(1000); // Wait for 1 second
```

## The PopClip Interface

The `popclip` global object provides methods and properties for interacting with PopClip's features.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `input` | Input | The current selection |
| `modifiers` | Modifiers | The state of modifier keys when the action was invoked |
| `context` | Context | The current context |
| `options` | Options & AuthOptions | The current values of the extension's options |

### Methods

#### Text and Pasteboard Operations

| Method | Description |
|--------|-------------|
| `copyText(text, options?)` | Place text on the pasteboard with optional "Copied" notification |
| `copyContent(content, options?)` | Place mixed content on the pasteboard |
| `pasteText(text, options?)` | Place text on pasteboard and invoke Paste command |
| `pasteContent(content, options?)` | Paste mixed pasteboard content |
| `performCommand(command, options?)` | Invoke cut, copy, or paste in the target app |

#### UI and Visual Feedback

| Method | Description |
|--------|-------------|
| `showText(text, options?)` | Display text to the user in PopClip's popup or as Large Type |
| `showSuccess()` | Show a checkmark symbol indicating success |
| `showFailure()` | Show an "X" symbol indicating failure |
| `showSettings()` | Open the settings UI for this extension |
| `appear()` | Trigger PopClip to appear again with the current selection |

#### App Integration

| Method | Description |
|--------|-------------|
| `openUrl(url, options?)` | Open a URL in a browser or other application |
| `pressKey(key, modifiers?)` | Simulate a key press by the user |
| `share(serviceName, items)` | Share items with a named macOS sharing service |

### Examples

```javascript
// Copy text to clipboard
popclip.copyText("Hello World");

// Open URL in default browser
popclip.openUrl("https://example.com");

// Open URL in a specific browser
popclip.openUrl("https://example.com", {app: "com.brave.Browser"});

// Show success indicator
popclip.showSuccess();

// Press a keyboard shortcut
popclip.pressKey('command B'); // Bold text (⌘B)
```

## Extension API

The Extension object defines the PopClip extension. It inherits properties from ActionProperties.

### Core Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | LocalizableString | The display name of this extension |
| `icon` | string | A string to define the extension's icon |
| `options` | Option[] | Defines the user-configurable options for this extension |
| `action` | Action\<CustomOptions\> \| ActionFunction\<CustomOptions\> | Simplified property to define a single action |
| `actions` | PopulationFunction\<CustomOptions\> \| (Action\<CustomOptions\> \| ActionFunction\<CustomOptions\>)[] | Define the actions to go in PopClip's popup |

### Behavior Properties

| Property | Type | Description |
|----------|------|-------------|
| `regex` | string \| RegExp | A regular expression to decide whether this action appears |
| `requirements` | Requirement[] | Conditions which must be met for this action to appear |
| `requiredApps` | string[] | Bundle identifiers for which the extension should appear |
| `excludedApps` | string[] | Bundle identifiers for which the extension should not appear |
| `auth` | AuthFunction | Function for authentication flow |

### Appearance Properties 

| Property | Type | Description |
|----------|------|-------------|
| `title` | LocalizableString | The action's title |
| `identifier` | string | A unique identifying string |
| `stayVisible` | boolean | Whether PopClip's popup should stay on screen after clicking |
| `captureHtml` | boolean | Whether PopClip will capture HTML/Markdown for the selection |
| `captureRtf` | boolean | Whether PopClip will capture RTF content for the selection |

### Icon Customization

| Property | Type | Description |
|----------|------|-------------|
| `preserveColor` | boolean | Display icon with original color instead of white/black |
| `preserveAspect` | boolean | Display icon with original aspect ratio |
| `flipX` | boolean | Draw icon horizontally flipped |
| `flipY` | boolean | Draw icon vertically flipped |
| `moveX` | number | Move icon horizontally |
| `moveY` | number | Move icon vertically |
| `scale` | number | Scale the icon |
| `rotate` | number | Rotate the icon anticlockwise |
| `circle` | boolean | Draw the icon inside a circle |
| `square` | boolean | Draw the icon inside a square |
| `search` | boolean | Draw the icon inside a magnifying glass shape |
| `strike` | boolean | Draw a strike-through line over the icon |
| `filled` | boolean | Draw the enclosing shape as a solid shape |
| `monospaced` | boolean | Draw text using a monospaced font (for text icons) |

## Actions

Actions are defined either as objects or as functions that return action objects.

### Action Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `code` | function | The function to execute when the action is clicked |
| `title` | string | The action's title |
| `icon` | string | The action's icon |
| `after` | AfterStep | Step to perform after the main action |
| `before` | BeforeStep | Step to perform before the main action |

### Action Function

```javascript
function myAction(selection, options, context) {
  // Do something with the selection
  return { text: 'Processed text' };
}
```

## Input and Context

The `input` property of the `popclip` object provides access to the current selection:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | The plain text of the selection |
| `html` | string | The HTML content of the selection (if available) |
| `markdown` | string | The Markdown content of the selection (if available) |
| `rtf` | string | The RTF content of the selection (if available) |
| `matchedText` | string | The first occurrence of text matched by the regex |

The `context` property provides information about the environment:

| Property | Type | Description |
|----------|------|-------------|
| `app` | string | The bundle identifier of the target app |
| `appName` | string | The display name of the target app |
| `browserUrl` | string | The URL of the current page (in browsers) |
| `browserTitle` | string | The title of the current page (in browsers) |
| `filePath` | string | Path to the file containing the selection (if applicable) |

## Common Interfaces

### Options Interface

Represents the values of the extension's options:

```javascript
interface Options {
  [key: string]: string | number | boolean;
}
```

### Modifiers Interface

Represents the state of modifier keys:

```javascript
interface Modifiers {
  command: boolean;
  option: boolean;
  control: boolean;
  shift: boolean;
  capsLock: boolean;
  function: boolean;
}
```

### PasteboardContent Interface

Represents content that can be placed on the pasteboard:

```javascript
interface PasteboardContent {
  text?: string;
  html?: string;
  rtf?: string;
}
```

## Types and Constants

### LocalizableString

A type to represent a string that can be localized to different languages.

```typescript
type LocalizableString = string | StringTable;
```

Where `StringTable` is an object with language codes as keys:

```typescript
interface StringTable {
  /** English (US) language string. */
  en: string;
  /** English (UK) language string. */
  "en-GB"?: string;
  /** Danish language string. */
  da?: string;
  /** German language string. */
  de?: string;
  // ... other supported languages
}
```

Example usage:
```javascript
const label = {
  en: "Color",
  "en-GB": "Colour",
  de: "Farbe",
  fr: "Couleur"
};
```

### Requirement and AfterStep Types

Requirements are specified in the `requirements` array to control when an action appears:

```typescript
type Requirement =
  | "text"     // Requires text selection
  | "cut"      // Requires cut capability
  | "paste"    // Requires paste capability
  | "formatting" // Requires text formatting capability
  | "url"      // Requires selected text to be a URL
  | "urls"     // Requires URLs in selection
  | "email"    // Requires email in selection
  | "emails"   // Requires emails in selection
  | "path"     // Requires file path in selection
  | `option-${string}=${string}`; // Requires specific option value
```

Negated requirements are also supported with the prefix `!`, e.g., `!url`.

After-steps control what happens after an action completes:

```typescript
type AfterStep =
  | "cut"
  | "copy"
  | "paste"
  | "paste-plain"
  | "popclip-appear"
  | "show-status"
  | "copy-result"
  | "paste-result"
  | "show-result"
  | "preview-result";
```

### Options Definition Types

PopClip supports multiple types of options for extension configuration:

```typescript
// Base option interface
interface OptionBase {
  identifier: string;
  type: "string" | "boolean" | "multiple" | "password" | "secret" | "heading";
  label?: LocalizableString;
  description?: LocalizableString;
  hidden?: boolean;
  inset?: boolean;
}

// String option
interface StringOption extends OptionBase {
  type: "string";
  defaultValue?: string;
}

// Boolean option (checkbox)
interface BooleanOption extends OptionBase {
  type: "boolean";
  defaultValue?: boolean;
  icon?: string;
}

// Multiple-choice option
interface MultipleOption extends OptionBase {
  type: "multiple";
  defaultValue?: string;
  values?: readonly string[];
  valueLabels?: readonly LocalizableString[];
}

// Password or secret option
interface PasswordOption extends OptionBase {
  type: "password" | "secret";
}

// Heading (not an actual option, just UI element)
interface HeadingOption extends OptionBase {
  type: "heading";
}
```

### Key Constants

The `util.constant` provides keyboard-related constants:

```typescript
// Modifier keys
MODIFIER_SHIFT: 131072
MODIFIER_CONTROL: 262144
MODIFIER_OPTION: 524288
MODIFIER_COMMAND: 1048576

// Key codes
KEY_RETURN: 0x24
KEY_TAB: 0x30
KEY_SPACE: 0x31
KEY_DELETE: 0x33
KEY_ESCAPE: 0x35
KEY_LEFTARROW: 0x7b
KEY_RIGHTARROW: 0x7c
KEY_DOWNARROW: 0x7d
KEY_UPARROW: 0x7e
```

## Utility Functions

The `util` global object provides utility functions for various tasks:

### Localization and Environment

```javascript
// Localize a string if a localization exists
util.localize("Copy");

// Get locale information
const { currencySymbol, decimalSeparator } = util.localeInfo;

// Get timezone information
const { identifier, abbreviation } = util.timeZoneInfo;
```

### Encoding and Cryptography

```javascript
// Base64 encoding/decoding
const encoded = util.base64Encode("Hello World");
const decoded = util.base64Decode(encoded);

// Random values
const array = new Uint8Array(16);
util.getRandomValues(array);

// Generate UUID
const uuid = util.randomUuid();

// HMAC generation
const key = new Uint8Array([1, 2, 3]);
const data = new Uint8Array([4, 5, 6]);
const hmac = util.hmac(data, key, "sha256");
```

### URL Handling

```javascript
// Build URL with query parameters
const url = util.buildQueryUrl("https://example.com", {
  q: "search term",
  lang: "en"
});

// Parse query string
const params = util.parseQuery("q=search&lang=en");
```

### Format Conversion

```javascript
// Convert HTML to RTF
const rtf = util.htmlToRtf("<b>Bold text</b>");
```

## Rich String Handling

The `RichString` class allows working with rich formatted text:

```javascript
// Create from HTML
const richHtml = new RichString("<b>Bold</b> and <i>italic</i>", {
  format: 'html'
});

// Create from Markdown
const richMarkdown = new RichString("**Bold** and *italic*", {
  format: 'markdown'
});

// Access formats
console.log(richMarkdown.html);  // Get HTML representation
console.log(richMarkdown.rtf);   // Get RTF representation
```

## Pasteboard API

The `pasteboard` global object provides access to the system clipboard:

```javascript
// Get text from clipboard
const clipboardText = pasteboard.text;

// Set text on clipboard
pasteboard.text = "New clipboard content";

// Work with rich content
pasteboard.content = {
  "public.utf8-plain-text": "Plain text",
  "public.html": "<b>Bold</b> text"
};

// Read rich content
const htmlContent = pasteboard.content["public.html"];
```

## Advanced Context Information

The `context` object provides detailed information about the current environment:

```typescript
interface Context {
  hasFormatting: boolean;  // Whether text formatting is supported
  canPaste: boolean;       // Whether paste command is available
  canCopy: boolean;        // Whether text is selected (can copy)
  canCut: boolean;         // Whether text can be cut
  browserUrl: string;      // URL of the current page (in browsers)
  browserTitle: string;    // Title of the current page (in browsers)
  appName: string;         // Name of the current application
  appIdentifier: string;   // Bundle ID of the current application
}
```

## Input Data Detection

The `input` object provides access to data detected in the selection:

```typescript
interface Input {
  // Basic text content
  text: string;
  matchedText: string;
  
  // Rich content (if enabled)
  html: string;
  xhtml: string;
  markdown: string;
  rtf: string;
  
  // Detected data with positions
  data: {
    urls: RangedStrings;        // Web URLs
    nonHttpUrls: RangedStrings; // Other protocol URLs
    emails: RangedStrings;      // Email addresses
    paths: RangedStrings;       // File paths
  };
  
  // Raw pasteboard content
  content: PasteboardContent;
  
  // URL detection
  isUrl: boolean;
}
```

Where `RangedStrings` is an array of strings with position information:

```typescript
interface RangedStrings extends Array<string> {
  ranges: { location: number; length: number }[];
}
```

## Additional Information

For more detailed information, refer to the [full PopClip JavaScript API documentation](https://pilotmoon.github.io/popclip-types/).

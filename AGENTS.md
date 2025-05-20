# AGENTS.md Contributor Guide

## Code Style
- Use Biomejs for linting and formatting. Run `npm run lint-format` to check for errors. If errors are found, run `npm run lint` to fix them and `npm run format` to format the code.
- Avoid abbreviations in variable names.

## Testing
- Run `npm run test` before finalizing a PR.
- All commits must pass `npm run lint-format` checks via Biomejs.
- Run `npm run check` to ensure that the code is valid and passes typescript checks.

## PR Instructions
- Title format: [Title] Short description
- Include a one-line summary and a "Testing Done" section

## Documentation
- PopClip Javascript API documentation is in the `docs` folder.
- Use the [PopClip JavaScript API](https://pilotmoon.github.io/popclip-types/) for reference.
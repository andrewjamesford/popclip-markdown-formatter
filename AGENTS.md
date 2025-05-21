# AGENTS.md Contributor Guide

## Code Style
- When starting a new task always create a new branch with an appropriate name.
- Use Biomejs for linting and formatting. Run `npm run lint-format` to check for errors. If errors are found, run `npm run lint` to fix them and `npm run format` to format the code.
- Avoid abbreviations in variable names.
- When completed task and all testing has passed, create a pull request (PR) to the main branch.

## Testing
- Run `npm run test` before finalizing a PR.
- All commits must pass `npm run lint-format` checks via Biomejs.
- Run `npm run check` to ensure that the code is valid and passes typescript checks.
- Run `npm run build` to ensure that the code builds correctly.

## PR Instructions
- Title format: [Title] Short description
- Include a one-line summary and a "Testing Done" section

## Documentation
- PopClip Javascript API documentation is in the `docs` folder.
- Use the [PopClip JavaScript API](https://pilotmoon.github.io/popclip-types/) for reference.

## Ignore
- Ignore `node_modules` and `build` folders in your PR.
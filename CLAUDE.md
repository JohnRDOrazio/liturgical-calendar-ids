# CLAUDE.md

## Project Overview

This project generates markdown documentation from JSON files containing liturgical event IDs and names for the Roman Catholic liturgical calendar.

## Runtime

Use Bun instead of Node.js:

- `bun install` for dependencies
- `bun run <script>` for npm scripts
- `bun <file>` to run TypeScript files directly

## Project Structure

```text
src/
  *.json    # Source data: liturgical events with litcal_event_key and name
  *.md      # Generated markdown documentation (tables)
index.ts    # Generator script
```

## Available Scripts

```bash
bun run generate      # Generate markdown files from JSON sources
bun run format:md     # Format markdown with Prettier (aligns tables)
bun run lint:md       # Lint markdown files
bun run lint:md:fix   # Lint and auto-fix markdown issues
```

## Workflow

1. Edit JSON files in `src/` to add or modify liturgical events
2. Run `bun run generate` to regenerate markdown documentation
3. Run `bun run format:md` to align tables with Prettier
4. Run `bun run lint:md` to verify markdown quality

## JSON Data Format

Each JSON file contains an array of liturgical events:

```json
[
  {
    "litcal_event_key": "Easter",
    "name": "Dominica Paschæ in Resurrectione Domini"
  }
]
```

The generator creates markdown tables with these columns and derives the document title from the filename.

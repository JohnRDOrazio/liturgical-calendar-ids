# Liturgical Calendar IDs

A reference repository documenting the unique event IDs (`event_key`) used in the
[Liturgical Calendar API](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI)
for Roman Catholic liturgical celebrations.

## Purpose

This repository provides a canonical reference for all liturgical event identifiers, organized by category:

- **Temporale** - Moveable feasts and seasons (Easter, Advent, Lent, etc.)
- **Sanctorale** - Fixed feasts of saints and celebrations
- **Feriale** - Weekday celebrations throughout the liturgical year
- **Special Events** - Events with unique characteristics

## Status

Work in progress. The JSON source files contain event keys and Latin names for liturgical celebrations, with references to the Roman Missal edition or decree that established each celebration.

## Project Structure

```text
src/
  *.json                  # Source data with event_key, name, and missal/decree
  *.md                    # Generated markdown documentation
  liturgical_events.md    # Combined table of all events
```

## Installation

```bash
bun install
```

## Scripts

| Script                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `bun run generate`          | Generate individual markdown files from JSON sources    |
| `bun run generate:combined` | Generate unified `liturgical_events.md` with all events |
| `bun run sort`              | Sort JSON files by number and day of week               |
| `bun run format:md`         | Format markdown tables with Prettier                    |
| `bun run lint:md`           | Lint markdown files                                     |
| `bun run lint:md:fix`       | Lint and auto-fix markdown issues                       |

## Workflow

1. Edit JSON files in `src/` to add or modify liturgical events
2. Run `bun run sort` to ensure proper ordering within each JSON source
3. Run `bun run generate && bun run generate:combined` to regenerate documentation
4. Run `bun run format:md` to align tables
5. Run `bun run lint:md` to verify markdown quality

## JSON Data Format

Each JSON file contains an array of liturgical events:

```json
[
  {
    "event_key": "Easter",
    "name": "Dominica Paschæ in Resurrectione Domini"
  }
]
```

Sanctorale entries include a `missal` or `decree` field indicating the source:

```json
{
  "event_key": "StJohnPaulII",
  "name": "S. Ioannis Pauli II, papæ",
  "decree": "2014-05-29 - Prot. N. 309/14"
}
```

## License

See the [Liturgical Calendar API](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI) repository for license information.

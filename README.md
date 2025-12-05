# Liturgical Calendar IDs

A reference repository documenting the unique event IDs (`event_key`) used in the
[Liturgical Calendar API](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI)
for Roman Catholic liturgical celebrations.

## Purpose

This repository provides a reference for all liturgical event identifiers, organized by category:

- **Temporale** - Moveable celebrations according to the liturgical seasons (Easter, Advent, Lent, etc.)
- **Sanctorale** - Fixed celebrations (usually of saints)
- **Feriale** - Weekday celebrations throughout the liturgical year
- **Special Events** - Events that don't fit into either the *temporale* or *sanctorale* categories

The main purpose is to work together with liturgists and developers who have created liturgical applications,
with the hope of contributing towards a canonicalization of liturgical celebration identifiers.

## Status

The JSON source files contain event keys and Latin names for liturgical celebrations.
The `sanctorale.json` file also includes references to the Roman Missal edition or decree that established each celebration.

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

## Special cases

### Jesus Christ, Eternal High Priest

The `special_events.json` file contains a single entry, `JesusChristEternalHighPriest`, for the celebration
"Domini nostri Iesu Christi Summi et Aeterni Sacerdotis", for which Pope Benedict XVI granted faculty to Bishops Conferences
to adopt within their own liturgical calendars.

### Days after Epiphany

For the ***days after Epiphany***, there is a kind of mapping between some of the identifiers when it comes to the lectionary readings;
they are however given distinct IDs so that they can have distinct names, according to the usage of the language edition of the Roman Missal.

| ID                        | Lectionary Mapping    | Name (Latin) <sup>[1](#footnote1)</sup> | Name (Italian) <sup>[2](#footnote2)</sup> | Name (English) <sup>[3](#footnote3)</sup> |
| ------------------------- | --------------------- | --------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| DayAfterEpiphanyJan7      | ---                   | %s temporis Nativitatis                 | Feria propria del %s                      | %s - Christmas Weekday                    |
| DayAfterEpiphanyJan8      | ---                   | %s temporis Nativitatis                 | Feria propria del %s                      | %s - Christmas Weekday                    |
| DayAfterEpiphanyJan9      | ---                   | %s temporis Nativitatis                 | Feria propria del %s                      | %s - Christmas Weekday                    |
| DayAfterEpiphanyJan10     | ---                   | %s temporis Nativitatis                 | Feria propria del %s                      | %s - Christmas Weekday                    |
| DayAfterEpiphanyJan11     | ---                   | %s temporis Nativitatis                 | Feria propria del %s                      | %s - Christmas Weekday                    |
| DayAfterEpiphanyJan12     | ---                   | %s temporis Nativitatis                 | Feria propria del %s                      | %s - Christmas Weekday                    |
| DayAfterEpiphanyMonday    | DayAfterEpiphanyJan7  | Feria II temporis Nativitatis           | Feria propria del 7 gennaio               | Monday - Christmas Weekday                |
| DayAfterEpiphanyTuesday   | DayAfterEpiphanyJan8  | Feria III temporis Nativitatis          | Feria propria del 8 gennaio               | Tuesday - Christmas Weekday               |
| DayAfterEpiphanyWednesday | DayAfterEpiphanyJan9  | Feria IV temporis Nativitatis           | Feria propria del 9 gennaio               | Wednesday - Christmas Weekday             |
| DayAfterEpiphanyThursday  | DayAfterEpiphanyJan10 | Feria V temporis Nativitatis            | Feria propria del 10 gennaio              | Thursday - Christmas Weekday              |
| DayAfterEpiphanyFriday    | DayAfterEpiphanyJan11 | Feria VI temporis Nativitatis           | Feria propria del 11 gennaio              | Friday - Christmas Weekday                |
| DayAfterEpiphanySaturday  | DayAfterEpiphanyJan12 | Sabbato temporis Nativitatis            | Feria propria del 12 gennaio              | Saturday - Christmas Weekday              |

When Epiphany is set to Sunday, the `DayAfterEpiphanyMonday` format of the `event_key` is used.

When Epiphany is set to January 6, the `DayAfterEpiphanyJan7` format of the `event_key` is used.

<a name="footnote1">1</a>: `%s` is substituted at runtime with the actual day of the week in the given year, in Latin.

<a name="footnote2">2</a>: `%s` is substituted at runtime with the day of the month and the month, in Italian.

<a name="footnote3">3</a>: `%s` is substituted at runtime with the actual day of the week in the given year, in English.

## License

See the [Liturgical Calendar API](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI) repository for license information.

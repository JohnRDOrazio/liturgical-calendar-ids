# Liturgical Calendar IDs

A reference repository documenting the unique event IDs (`litcal_event_key`) used in the
[Liturgical Calendar API](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI)
for Roman Catholic liturgical celebrations.

## Purpose

This repository provides a reference for all liturgical event identifiers, organized by category:

- **Temporale** - Moveable celebrations according to the liturgical seasons (Easter, Advent, Lent, etc.)
- **Sanctorale** - Fixed celebrations (usually of saints)
- **Feriale** - Weekday celebrations throughout the liturgical year
- **Special Events** - Events that don't fit into either the _temporale_ or _sanctorale_ categories

The main purpose is to work together with liturgists and developers who have created liturgical applications,
with the hope of contributing towards a canonicalization of liturgical celebration identifiers.

## Status

The JSON source files contain event keys and Latin names for liturgical celebrations.
The `sanctorale.json` file also includes references to the Roman Missal edition or decree that established each celebration.

## Project Structure

```text
src/
  *.json                  # Source data with litcal_event_key, name, and missal/decree
  *.md                    # Generated Markdown documentation
  liturgical_events.md    # Combined table of all events
eprex/
  sanctorale.ts                 # eprex source data for sanctorale mappings
  temporale.ts                  # eprex source data for temporale mappings
  sanctorale_missing_keys.json  # Sanctorale entries without eprex mappings
  sanctorale_missing_keys.md    # Markdown table of sanctorale missing keys
  temporale_missing_keys.json   # Temporale entries without eprex mappings
  temporale_missing_keys.md     # Markdown table of temporale missing keys
romcal/
  sanctorale.json               # romcal source data for sanctorale mappings
  temporale.json                # romcal source data for temporale mappings
  temporale_missing.json        # Temporale entries without romcal mappings
```

## Documentation Tables

| Category                     | Description                                  | Link                                                                   |
| ---------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| All Events                   | Combined table of all liturgical events      | [liturgical_events.md](src/liturgical_events.md)                       |
| Temporale                    | Moveable celebrations (Easter, Advent, etc.) | [temporale.md](src/temporale.md)                                       |
| Sanctorale                   | Fixed celebrations (saints)                  | [sanctorale.md](src/sanctorale.md)                                     |
| Special Events               | Other special celebrations                   | [special_events.md](src/special_events.md)                             |
| Feriale Per Annum            | Weekdays in Ordinary Time                    | [feriale_per_annum.md](src/feriale_per_annum.md)                       |
| Feriale Tempus Adventus      | Weekdays in Advent                           | [feriale_tempus_adventus.md](src/feriale_tempus_adventus.md)           |
| Feriale Tempus Nativitatis   | Weekdays in Christmas season                 | [feriale_tempus_nativitatis.md](src/feriale_tempus_nativitatis.md)     |
| Feriale Tempus Quadragesimae | Weekdays in Lent                             | [feriale_tempus_quadragesimae.md](src/feriale_tempus_quadragesimae.md) |
| Feriale Tempus Paschatis     | Weekdays in Easter season                    | [feriale_tempus_paschatis.md](src/feriale_tempus_paschatis.md)         |
| Temporale Missing Keys       | Temporale entries without eprex mappings     | [temporale_missing_keys.md](eprex/temporale_missing_keys.md)           |
| Sanctorale Missing Keys      | Sanctorale entries without eprex mappings    | [sanctorale_missing_keys.md](eprex/sanctorale_missing_keys.md)         |
| Romcal Temporale Missing     | Litcal entries without romcal mappings       | [temporale_missing.md](romcal/temporale_missing.md)                    |
| Romcal Temporale Unmatched   | Romcal entries without litcal mappings       | [temporale_unmatched.md](romcal/temporale_unmatched.md)                |

## Installation

```bash
bun install
```

## Scripts

| Script                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `bun run generate`              | Generate individual Markdown files from JSON sources    |
| `bun run generate:combined`     | Generate unified `liturgical_events.md` with all events |
| `bun run generate:missing-keys` | Generate missing_keys JSON and Markdown files           |
| `bun run sort`                  | Sort JSON files by number and day of week               |
| `bun run merge:sanctorale`      | Merge eprex sanctorale data into sanctorale.json        |
| `bun run merge:temporale`       | Merge eprex temporale data into temporale.json          |
| `bun run merge:romcal`          | Merge romcal sanctorale data into sanctorale.json       |
| `bun run format:md`             | Format Markdown tables with Prettier                    |
| `bun run lint:md`               | Lint Markdown files                                     |
| `bun run lint:md:fix`           | Lint and auto-fix Markdown issues                       |

## Workflow

1. Edit JSON files in `src/` to add or modify liturgical events
2. Run `bun run sort` to ensure proper ordering within each JSON source
3. Run `bun run generate && bun run generate:combined` to regenerate documentation
4. Run `bun run format:md` to align tables
5. Run `bun run lint:md` to verify Markdown quality

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

Sanctorale entries include a `missal` or `decree` field indicating the source:

```json
{
  "litcal_event_key": "StJohnPaulII",
  "name": "S. Ioannis Pauli II, papæ",
  "decree": "2014-05-29 - Prot. N. 309/14"
}
```

## External ID Mappings

Sanctorale entries may include external ID mappings from the [eprex](eprex/) source data:

```json
{
  "litcal_event_key": "StJoseph",
  "name": "Sancti Ioseph Sponsi Beatæ Mariæ Virginis",
  "missal": "missale_romanum_1970",
  "eprex_key": "joseph_husband_of_mary",
  "eprex_code": "0319",
  "eprex_short_key": "0319",
  "romcal_key": "joseph_husband_of_mary"
}
```

**Notes on external ID fields:**

- `eprex_code` follows MMDD date format consistently (e.g., `0319` for March 19)
- Entries with multiple feasts on the same day use suffixes (e.g., `0120a`, `0120b`)
- `eprex_key` and `romcal_key` values are identical in all mapped entries
- For temporale entries, `eprex_code` uses sequential numbering (0001-0030) rather than dates

**Special mappings between eprex and litcal:**

Some entries have different categorizations or names between the projects:

| eprex Entry                  | litcal Entry                        | Notes                                      |
| ---------------------------- | ----------------------------------- | ------------------------------------------ |
| `holy_saturday` (temporale)  | `EasterVigil` (temporale)           | Same liturgical day, different terminology |
| `mary_mother_of_the_church`  | `MaryMotherChurch` (sanctorale)     | Moveable feast classified as sanctorale    |
| Days after Ash Wednesday (3) | `feriale_tempus_quadragesimae.json` | Classified as feriale in litcal            |
| `mary_mother_of_god` (sanc.) | `MaryMotherOfGod` (temporale)       | eprex sanctorale → litcal temporale        |
| `epiphany` (sanctorale)      | `Epiphany` (temporale)              | eprex sanctorale → litcal temporale        |
| `nativity_of_the_lord` (s.)  | `Christmas` (temporale)             | eprex sanctorale → litcal temporale        |

**Cross-category mappings:**

The eprex project classifies Mary Mother of God, Epiphany, and Christmas in its sanctorale,
while the Roman Missal (and thus litcal) places them in the temporale (Proprium de Tempore).
These mappings are handled manually in `temporale.json` and skipped by `merge-sanctorale.ts`
via the `TEMPORALE_EVENTS` constant.

**Romcal mappings:**

The `romcal_key` field maps litcal event keys to [romcal](https://github.com/romcal/romcal) identifiers.
Romcal is a JavaScript library for calculating the liturgical calendar.

Cross-category mappings between romcal sanctorale and litcal temporale:

| romcal Entry               | litcal Entry                  | Notes                                                                                                                                 |
| -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `immaculate_heart_of_mary` | `ImmaculateHeart` (temporale) | Mobile feast (Saturday after Sacred Heart). See [issue #450](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI/issues/450) |

The Immaculate Heart of Mary is classified in litcal's temporale because it's a mobile celebration
(Saturday after the Solemnity of the Sacred Heart), not because it follows the Roman Missal's
Proprium de Tempore division. This is a structural choice in the litcal API.

This mapping is handled in `temporale.json` and skipped by `merge-romcal-sanctorale.ts`
via the `TEMPORALE_EVENTS` constant.

The following files track entries without external ID mappings:

- `eprex/sanctorale_missing_keys.json` - sanctorale entries without eprex mappings
- `eprex/temporale_missing_keys.json` - temporale entries without eprex mappings

### Projects Not Included

The [calendarium-romanum](https://github.com/igneus/calendarium-romanum) Ruby gem and its companion
[church-calendar-api](https://github.com/igneus/church-calendar-api) are not included in the mappings.
While the gem internally uses symbol identifiers for celebrations (e.g., `joseph`, `assumption`, `easter_sunday`),
the HTTP API does not expose these identifiers in its responses. The API returns celebration data with title,
colour, rank, and date, but without the internal symbol that would allow reliable cross-project mapping.

This makes automated comparison of calendar calculations between these projects and others difficult,
as matching celebrations would require fuzzy matching on titles rather than deterministic ID comparison.

## Special cases

### Jesus Christ, Eternal High Priest

The `special_events.json` file contains a single entry, `JesusChristEternalHighPriest`, for the celebration
"Domini nostri Iesu Christi Summi et Aeterni Sacerdotis", for which Pope Benedict XVI granted faculty to Bishops Conferences
to adopt within their own liturgical calendars.

### Days after Epiphany

For the **_days after Epiphany_**, there is a kind of mapping between some of the identifiers when it comes to the lectionary readings;
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

When Epiphany is set to Sunday, the `DayAfterEpiphanyMonday` format of the `litcal_event_key` is used.

When Epiphany is set to January 6, the `DayAfterEpiphanyJan7` format of the `litcal_event_key` is used.

<a name="footnote1">1</a>: `%s` is substituted at runtime with the actual day of the week in the given year, in Latin.

<a name="footnote2">2</a>: `%s` is substituted at runtime with the day of the month and the month, in Italian.

<a name="footnote3">3</a>: `%s` is substituted at runtime with the actual day of the week in the given year, in English.

## License

See the [Liturgical Calendar API](https://github.com/Liturgical-Calendar/LiturgicalCalendarAPI) repository for license information.

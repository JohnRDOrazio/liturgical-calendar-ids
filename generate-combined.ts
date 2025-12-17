import { Glob } from 'bun';

const SRC_DIR = './src';
const OUTPUT_FILE = './src/liturgical_events.md';

interface LiturgicalEvent {
  litcal_event_key: string;
  name: string;
  missal?: string;
  decree?: string;
  eprex_key?: string;
  eprex_code?: string;
  eprex_short_key?: string;
  romcal_key?: string;
}

interface CombinedEvent {
  litcal_event_key: string;
  name: string;
  missal: string;
  source: string;
  eprex_key: string;
  eprex_code: string;
  eprex_short_key: string;
  romcal_key: string;
}

async function generateCombinedMarkdown(): Promise<void> {
  const glob = new Glob('*.json');
  const allEvents: CombinedEvent[] = [];

  for await (const jsonFile of glob.scan(SRC_DIR)) {
    const basename = jsonFile.replace('.json', '');
    const jsonPath = `${SRC_DIR}/${jsonFile}`;

    const jsonContent = await Bun.file(jsonPath).text();
    const events: LiturgicalEvent[] = JSON.parse(jsonContent);

    const isSanctorale = basename === 'sanctorale';
    const isSpecialEvents = basename === 'special_events';

    for (const event of events) {
      let missal: string;
      if (isSanctorale || isSpecialEvents) {
        missal = event.missal || event.decree || '';
      } else {
        missal = 'missale_romanum_1970';
      }

      allEvents.push({
        litcal_event_key: event.litcal_event_key,
        name: event.name,
        missal,
        source: basename,
        eprex_key: event.eprex_key || '',
        eprex_code: event.eprex_code || '',
        eprex_short_key: event.eprex_short_key || '',
        romcal_key: event.romcal_key || '',
      });
    }
  }

  const headers = [
    'name',
    'litcal_event_key',
    'romcal_key',
    'eprex_key',
    'eprex_code',
    'eprex_short_key',
    'missal/decree',
    'temporale/sanctorale',
  ];
  const headerRow = `| ${headers.join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
  const dataRows = allEvents.map(
    (event) =>
      `| ${event.name} | ${event.litcal_event_key} | ${event.romcal_key} | ${event.eprex_key} | ${event.eprex_code} | ${event.eprex_short_key} | ${event.missal} | ${event.source} |`
  );

  const markdown = [
    '# Liturgical Celebration IDs',
    '',
    headerRow,
    separatorRow,
    ...dataRows,
    '',
  ].join('\n');

  await Bun.write(OUTPUT_FILE, markdown);
  console.log(`Generated ${OUTPUT_FILE}`);
}

generateCombinedMarkdown();

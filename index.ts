import { Glob } from 'bun';

const SRC_DIR = './src';

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

function filenameToTitle(filename: string): string {
  return filename
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function generateMarkdownFiles(): Promise<void> {
  const glob = new Glob('*.json');

  for await (const jsonFile of glob.scan(SRC_DIR)) {
    const basename = jsonFile.replace('.json', '');
    const jsonPath = `${SRC_DIR}/${jsonFile}`;
    const mdPath = `${SRC_DIR}/${basename}.md`;
    const title = filenameToTitle(basename);

    const jsonContent = await Bun.file(jsonPath).text();
    const events: LiturgicalEvent[] = JSON.parse(jsonContent);

    const isSanctorale = basename === 'sanctorale';
    const isTemporale = basename === 'temporale';

    let headers: string[];
    if (isSanctorale) {
      headers = [
        'litcal_event_key',
        'name',
        'missal/decree',
        'eprex_key',
        'eprex_code',
        'eprex_short_key',
        'romcal_key',
      ];
    } else if (isTemporale) {
      headers = [
        'litcal_event_key',
        'name',
        'eprex_key',
        'eprex_code',
        'eprex_short_key',
        'romcal_key',
      ];
    } else {
      headers = Object.keys(events[0] || { litcal_event_key: '', name: '' });
    }

    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
    const dataRows = events.map((event) => {
      let values: string[];
      if (isSanctorale) {
        values = [
          event.litcal_event_key,
          event.name,
          event.missal || event.decree || '',
          event.eprex_key || '',
          event.eprex_code || '',
          event.eprex_short_key || '',
          event.romcal_key || '',
        ];
      } else if (isTemporale) {
        values = [
          event.litcal_event_key,
          event.name,
          event.eprex_key || '',
          event.eprex_code || '',
          event.eprex_short_key || '',
          event.romcal_key || '',
        ];
      } else {
        values = headers.map((h) => event[h as keyof LiturgicalEvent] || '');
      }
      return `| ${values.join(' | ')} |`;
    });

    const markdown = [
      `# ${title}`,
      '',
      headerRow,
      separatorRow,
      ...dataRows,
      '',
    ].join('\n');

    await Bun.write(mdPath, markdown);
    console.log(`Generated ${mdPath}`);
  }
}

generateMarkdownFiles();

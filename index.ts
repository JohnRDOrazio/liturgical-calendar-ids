import { Glob } from 'bun';

const SRC_DIR = './src';

interface LiturgicalEvent {
  event_key: string;
  name: string;
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

    const headers = Object.keys(events[0] || { event_key: '', name: '' });
    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
    const dataRows = events.map(
      (event) => `| ${headers.map((h) => event[h as keyof LiturgicalEvent]).join(' | ')} |`
    );

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

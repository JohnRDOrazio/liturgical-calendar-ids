import { Glob } from 'bun';

const SRC_DIR = './src';

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface LiturgicalEvent {
  litcal_event_key: string;
  name: string;
  missal?: string;
  decree?: string;
}

interface ParsedKey {
  prefix: string;
  number: number | null;
  day: number;
}

function parseEventKey(eventKey: string): ParsedKey {
  let day = -1;
  let keyWithoutDay = eventKey;

  // Extract day suffix
  for (let i = 0; i < DAY_ORDER.length; i++) {
    if (eventKey.endsWith(DAY_ORDER[i])) {
      day = i;
      keyWithoutDay = eventKey.slice(0, -DAY_ORDER[i].length);
      break;
    }
  }

  // Extract trailing number and prefix
  const match = keyWithoutDay.match(/^(.*?)(\d+)$/);
  if (match) {
    return {
      prefix: match[1],
      number: parseInt(match[2], 10),
      day,
    };
  }

  return {
    prefix: keyWithoutDay,
    number: null,
    day,
  };
}

function sortEvents(events: LiturgicalEvent[]): LiturgicalEvent[] {
  return events.sort((a, b) => {
    const parsedA = parseEventKey(a.litcal_event_key);
    const parsedB = parseEventKey(b.litcal_event_key);

    // First sort by prefix
    if (parsedA.prefix !== parsedB.prefix) {
      return parsedA.prefix.localeCompare(parsedB.prefix);
    }

    // Then sort by number (numerically)
    if (parsedA.number !== parsedB.number) {
      if (parsedA.number === null) return -1;
      if (parsedB.number === null) return 1;
      return parsedA.number - parsedB.number;
    }

    // Finally sort by day of week
    if (parsedA.day === -1 && parsedB.day === -1) {
      return 0;
    }
    if (parsedA.day === -1) return -1;
    if (parsedB.day === -1) return 1;

    return parsedA.day - parsedB.day;
  });
}

async function sortJsonFiles(): Promise<void> {
  const glob = new Glob('*.json');

  for await (const jsonFile of glob.scan(SRC_DIR)) {
    const jsonPath = `${SRC_DIR}/${jsonFile}`;

    const jsonContent = await Bun.file(jsonPath).text();
    const events: LiturgicalEvent[] = JSON.parse(jsonContent);

    const sortedEvents = sortEvents(events);

    await Bun.write(jsonPath, JSON.stringify(sortedEvents, null, 2) + '\n');
    console.log(`Sorted ${jsonPath}`);
  }
}

sortJsonFiles();

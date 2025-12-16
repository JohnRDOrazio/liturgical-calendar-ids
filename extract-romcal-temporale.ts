/**
 * Extract all Proper of Time (temporale) IDs from romcal
 * and generate a JSON file with IDs and Latin names
 */

import { writeFileSync } from "fs";
import { join } from "path";

// Constants from romcal
const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

// Latin translations from romcal locale
const latinWeekdays: Record<number, string> = {
  0: "dominica",
  1: "feria secunda",
  2: "feria tertia",
  3: "feria quarta",
  4: "feria quinta",
  5: "feria sexta",
  6: "sabbato",
};

const latinOrdinals: Record<number, string> = {
  1: "prima",
  2: "secunda",
  3: "tertia",
  4: "quarta",
  5: "quinta",
  6: "sexta",
  7: "septima",
  8: "octava",
  9: "nona",
  10: "decima",
  11: "undecima",
  12: "duodecima",
  13: "decima tertia",
  14: "decima quarta",
  15: "decima quinta",
  16: "decima sexta",
  17: "decima septima",
  18: "decima octava",
  19: "decima nona",
  20: "vigesima",
  21: "vigesima prima",
  22: "vigesima secunda",
  23: "vigesima tertia",
  24: "vigesima quarta",
  25: "vigesima quinta",
  26: "vigesima sexta",
  27: "vigesima septima",
  28: "vigesima octava",
  29: "vigesima nona",
  30: "trigesima",
  31: "trigesima prima",
  32: "trigesima secunda",
  33: "trigesima tertia",
  34: "trigesima quartra",
};

const latinMonths: Record<number, string> = {
  0: "ianuarii",
  1: "februarii",
  2: "martii",
  3: "aprilis",
  4: "maii",
  5: "iunii",
  6: "iulii",
  7: "augusti",
  8: "septembris",
  9: "octobris",
  10: "novembris",
  11: "decembris",
};

// Fixed Latin names for specific celebrations
const latinNames: Record<string, string> = {
  nativity_of_the_lord: "In Nativitate Domini",
  holy_family_of_jesus_mary_and_joseph:
    "Sanctæ Familiæ Iesu, Mariæ et Ioseph",
  mary_mother_of_god:
    "In octava Nativitatis. Sollemnitas Sanctæ Dei Genetricis Mariæ",
  epiphany_of_the_lord: "In Epiphania Domini",
  baptism_of_the_lord: "In Baptismate Domini",
  ash_wednesday: "Feria IV Cinerum",
  palm_sunday_of_the_passion_of_the_lord: "Dominica in Palmis de Passione Domini",
  thursday_of_the_lords_supper: "Feria V Hebdomadæ Sanctæ, in Cena Domini",
  friday_of_the_passion_of_the_lord: "Feria VI in Passione Domini",
  holy_saturday: "Sabbato Sancto/Vigilia paschalis",
  easter_sunday: "Dominica Paschæ in Resurrectione Domini",
  divine_mercy_sunday:
    "Dominica in octava Paschæ seu Dominica de Divina Misericordia",
  ascension_of_the_lord: "In Ascensione Domini",
  pentecost_sunday: "Dominica Pentecostes",
  most_holy_trinity: "Ss.mæ Trinitatis",
  most_holy_body_and_blood_of_christ: "Ss.mi Corporis et Sanguinis Christi",
  most_sacred_heart_of_jesus: "Sacratissimi Cordis Iesu",
  sunday_of_the_word_of_god:
    "Dominica tertia per annum, seu Dominica Verbi Dei",
  our_lord_jesus_christ_king_of_the_universe: "D. N. I. C. universorum regis",
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLatinWeekday(dow: number, caps = false): string {
  const wd = latinWeekdays[dow];
  return caps ? capitalize(wd) : wd;
}

interface TemporaleEvent {
  romcal_id: string;
  name_la: string;
}

const events: TemporaleEvent[] = [];

// ==================== ADVENT ====================

// Advent weeks 1-3, days 0-6 (Sunday-Saturday)
for (let i = 0; i < 20; i++) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;
  const id = `advent_${week}_${WEEKDAYS[dow]}`;

  let name_la: string;
  if (dow === 0) {
    name_la = `Dominica ${latinOrdinals[week]} Adventus`;
  } else {
    name_la = `${getLatinWeekday(dow, true)}, hebdomada ${latinOrdinals[week]} Adventus`;
  }
  events.push({ romcal_id: id, name_la });
}

// Fourth Sunday of Advent
events.push({
  romcal_id: `advent_4_${WEEKDAYS[0]}`,
  name_la: `Dominica ${latinOrdinals[4]} Adventus`,
});

// Privileged weekdays December 17-24
for (let day = 17; day < 25; day++) {
  const id = `advent_${MONTHS[11]}_${day}`;
  const name_la = `Dia ${day} ${latinMonths[11]}`;
  events.push({ romcal_id: id, name_la });
}

// ==================== CHRISTMAS TIME ====================

// Nativity of the Lord
events.push({
  romcal_id: "nativity_of_the_lord",
  name_la: latinNames.nativity_of_the_lord,
});

// Octave of Christmas (days 2-7)
for (let count = 2; count < 8; count++) {
  const id = `christmas_octave_day_${count}`;
  const name_la = `De die ${count} infra octavam Nativitatis`;
  events.push({ romcal_id: id, name_la });
}

// Holy Family
events.push({
  romcal_id: "holy_family_of_jesus_mary_and_joseph",
  name_la: latinNames.holy_family_of_jesus_mary_and_joseph,
});

// Mary, Mother of God
events.push({
  romcal_id: "mary_mother_of_god",
  name_la: latinNames.mary_mother_of_god,
});

// Second Sunday after Christmas
events.push({
  romcal_id: "second_sunday_after_christmas",
  name_la: "Dominica secunda post Nativitatem",
});

// Weekdays before Epiphany (January 2-8)
for (let day = 2; day < 9; day++) {
  const id = `christmas_time_${MONTHS[0]}_${day}`;
  const name_la = `Die ${day} ${latinMonths[0]}`;
  events.push({ romcal_id: id, name_la });
}

// Epiphany of the Lord
events.push({
  romcal_id: "epiphany_of_the_lord",
  name_la: latinNames.epiphany_of_the_lord,
});

// Weekdays after Epiphany (Monday-Saturday)
for (let dow = 1; dow < 7; dow++) {
  const id = `${WEEKDAYS[dow]}_after_epiphany`;
  const name_la = `${getLatinWeekday(dow, true)} post Epiphaniam`;
  events.push({ romcal_id: id, name_la });
}

// Baptism of the Lord
events.push({
  romcal_id: "baptism_of_the_lord",
  name_la: latinNames.baptism_of_the_lord,
});

// ==================== LENT ====================

// Ash Wednesday
events.push({
  romcal_id: "ash_wednesday",
  name_la: latinNames.ash_wednesday,
});

// Days after Ash Wednesday (Thursday-Saturday)
for (let dow = 4; dow < 7; dow++) {
  const id = `${WEEKDAYS[dow]}_after_ash_wednesday`;
  const name_la = `${getLatinWeekday(dow, true)} post Cineres`;
  events.push({ romcal_id: id, name_la });
}

// Lent weeks 1-5, all days
for (let i = 0; i < 35; i++) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;
  const id = `lent_${week}_${WEEKDAYS[dow]}`;

  let name_la: string;
  if (dow === 0) {
    name_la = `Dominica ${latinOrdinals[week]} Quadragesimæ`;
  } else {
    name_la = `${getLatinWeekday(dow, true)}, hebdomada ${latinOrdinals[week]} Quadragesimæ`;
  }
  events.push({ romcal_id: id, name_la });
}

// Palm Sunday
events.push({
  romcal_id: "palm_sunday_of_the_passion_of_the_lord",
  name_la: latinNames.palm_sunday_of_the_passion_of_the_lord,
});

// Holy Week Monday-Thursday
for (let dow = 1; dow < 5; dow++) {
  const id = `holy_${WEEKDAYS[dow]}`;
  const name_la = `${getLatinWeekday(dow, true)} Hebdomadæ Sanctæ`;
  events.push({ romcal_id: id, name_la });
}

// ==================== PASCHAL TRIDUUM ====================

events.push({
  romcal_id: "thursday_of_the_lords_supper",
  name_la: latinNames.thursday_of_the_lords_supper,
});

events.push({
  romcal_id: "friday_of_the_passion_of_the_lord",
  name_la: latinNames.friday_of_the_passion_of_the_lord,
});

events.push({
  romcal_id: "holy_saturday",
  name_la: latinNames.holy_saturday,
});

events.push({
  romcal_id: "easter_sunday",
  name_la: latinNames.easter_sunday,
});

// ==================== EASTER TIME ====================

// Easter Octave (Monday-Saturday)
for (let dow = 1; dow < 7; dow++) {
  const id = `easter_${WEEKDAYS[dow]}`;
  const name_la = `De die ${getLatinWeekday(dow, true)} infra octavam Paschæ`;
  events.push({ romcal_id: id, name_la });
}

// Divine Mercy Sunday
events.push({
  romcal_id: "divine_mercy_sunday",
  name_la: latinNames.divine_mercy_sunday,
});

// Easter Time weeks 2-7, all days
for (let i = 8; i < 49; i++) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;

  // Ascension is on week 6, Thursday (dow 4)
  if (week === 6 && dow === 4) {
    events.push({
      romcal_id: "ascension_of_the_lord",
      name_la: latinNames.ascension_of_the_lord,
    });
  }

  const id = `easter_time_${week}_${WEEKDAYS[dow]}`;
  let name_la: string;
  if (dow === 0) {
    name_la = `Dominica ${latinOrdinals[week]} Paschæ`;
  } else {
    name_la = `${getLatinWeekday(dow, true)}, hebdomada ${latinOrdinals[week]} temporis paschalis`;
  }
  events.push({ romcal_id: id, name_la });
}

// Pentecost Sunday
events.push({
  romcal_id: "pentecost_sunday",
  name_la: latinNames.pentecost_sunday,
});

// ==================== ORDINARY TIME ====================

// Most Holy Trinity
events.push({
  romcal_id: "most_holy_trinity",
  name_la: latinNames.most_holy_trinity,
});

// Corpus Christi
events.push({
  romcal_id: "most_holy_body_and_blood_of_christ",
  name_la: latinNames.most_holy_body_and_blood_of_christ,
});

// Sacred Heart
events.push({
  romcal_id: "most_sacred_heart_of_jesus",
  name_la: latinNames.most_sacred_heart_of_jesus,
});

// Ordinary Time weeks 1-34
for (let i = 1; i < 238; i++) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;

  // Sunday of the Word of God (Week 3 Sunday)
  if (week === 3 && dow === 0) {
    events.push({
      romcal_id: "sunday_of_the_word_of_god",
      name_la: latinNames.sunday_of_the_word_of_god,
    });
  }

  // Christ the King (Week 34 Sunday)
  if (week === 34 && dow === 0) {
    events.push({
      romcal_id: "our_lord_jesus_christ_king_of_the_universe",
      name_la: latinNames.our_lord_jesus_christ_king_of_the_universe,
    });
  }

  // Regular Ordinary Time days (skip week 3 Sunday and week 34 Sunday as they have special IDs)
  if (!((week === 3 && dow === 0) || (week === 34 && dow === 0))) {
    const id = `ordinary_time_${week}_${WEEKDAYS[dow]}`;
    let name_la: string;
    if (dow === 0) {
      name_la = `Dominica ${latinOrdinals[week]} per annum`;
    } else {
      name_la = `${getLatinWeekday(dow, true)}, hebdomada ${latinOrdinals[week]} per annum`;
    }
    events.push({ romcal_id: id, name_la });
  }
}

// Write to JSON file
const outputPath = join(
  import.meta.dir,
  "romcal",
  "temporale.json"
);

writeFileSync(outputPath, JSON.stringify(events, null, 2));

console.log(`Generated ${events.length} temporale events`);
console.log(`Output written to: ${outputPath}`);

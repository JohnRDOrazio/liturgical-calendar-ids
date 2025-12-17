/**
 * CLEDR Liturgical Calendar - Temporale (Moveable Feasts)
 * All moveable celebrations dependent on Easter date
 *
 * Based on ePrex SpecialDay.Constants.cs codes 0001-0030+
 */

import {
  DiesSpecialis,
  Genus,
  Gradus,
  Praecedentia,
  Color
} from './types';

import {
  pascha,
  ascensio,
  corpusChristi,
  christusRex,
  sacraFamilia,
  baptismaDomini,
  dominicaIIPostNativitatem,
  addDies,
  idemDies
} from './computus';

// =============================================================================
// TEMPORALE - MOVEABLE FEASTS
// =============================================================================

/**
 * All moveable feasts (Temporale) with their calculations
 * Codes 0001-0030 from ePrex SpecialDay system
 */
export const TEMPORALE: DiesSpecialis[] = [
  // =========================================================================
  // BAPTISM OF THE LORD (ends Christmas season)
  // =========================================================================
  {
    code: '0001',
    id: 'baptism_of_the_lord',
    shortCode: 'BAP0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_DOMINI_5,
    priority: 600,
    colores: [Color.ALBUS],
    nomina: {
      la: 'In Baptismate Domini',
      en: 'The Baptism of the Lord'
    },
    match: (date, _easter) => idemDies(date, baptismaDomini(date.getFullYear())),
    externalIds: { romcal: 'baptism_of_the_lord', eprex: '0001' }
  },

  // =========================================================================
  // LENT (QUADRAGESIMA)
  // =========================================================================
  {
    code: '0002',
    id: 'ash_wednesday',
    shortCode: 'QUA0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_IV_CINERUM_2,
    priority: 220,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Feria IV Cinerum',
      en: 'Ash Wednesday'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -46)),
    daysFromEaster: -46,
    externalIds: { romcal: 'ash_wednesday', eprex: '0002' }
  },
  {
    code: '0003',
    id: 'thursday_after_ash_wednesday',
    shortCode: 'QUA0F5',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_QUADRAGESIMAE_9,
    priority: 920,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Feria V post Cineres',
      en: 'Thursday after Ash Wednesday'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -45)),
    daysFromEaster: -45,
    externalIds: { eprex: '0003' }
  },
  {
    code: '0004',
    id: 'friday_after_ash_wednesday',
    shortCode: 'QUA0F6',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_QUADRAGESIMAE_9,
    priority: 920,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Feria VI post Cineres',
      en: 'Friday after Ash Wednesday'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -44)),
    daysFromEaster: -44,
    externalIds: { eprex: '0004' }
  },
  {
    code: '0005',
    id: 'saturday_after_ash_wednesday',
    shortCode: 'QUA0S',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_QUADRAGESIMAE_9,
    priority: 920,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Sabbatum post Cineres',
      en: 'Saturday after Ash Wednesday'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -43)),
    daysFromEaster: -43,
    externalIds: { eprex: '0005' }
  },

  // =========================================================================
  // HOLY WEEK (Hebdomada Sancta)
  // =========================================================================
  {
    code: '0006',
    id: 'palm_sunday',
    shortCode: 'QUA6',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DOMINICA_PRIVILEGIATA_2,
    priority: 210,
    colores: [Color.RUBER],
    nomina: {
      la: 'Dominica in Palmis de Passione Domini',
      en: 'Palm Sunday of the Passion of the Lord'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -7)),
    daysFromEaster: -7,
    externalIds: { romcal: 'palm_sunday_of_the_passion_of_the_lord', eprex: '0006' }
  },
  {
    code: '0007',
    id: 'monday_of_holy_week',
    shortCode: 'QUA6F2',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_HEBDOMADAE_SANCTAE_2,
    priority: 220,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Feria II Hebdomadae Sanctae',
      en: 'Monday of Holy Week'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -6)),
    daysFromEaster: -6,
    externalIds: { romcal: 'monday_of_holy_week', eprex: '0007' }
  },
  {
    code: '0008',
    id: 'tuesday_of_holy_week',
    shortCode: 'QUA6F3',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_HEBDOMADAE_SANCTAE_2,
    priority: 220,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Feria III Hebdomadae Sanctae',
      en: 'Tuesday of Holy Week'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -5)),
    daysFromEaster: -5,
    externalIds: { romcal: 'tuesday_of_holy_week', eprex: '0008' }
  },
  {
    code: '0009',
    id: 'wednesday_of_holy_week',
    shortCode: 'QUA6F4',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FERIA,
    praecedentia: Praecedentia.FERIA_HEBDOMADAE_SANCTAE_2,
    priority: 220,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Feria IV Hebdomadae Sanctae',
      en: 'Wednesday of Holy Week'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -4)),
    daysFromEaster: -4,
    externalIds: { romcal: 'wednesday_of_holy_week', eprex: '0009' }
  },

  // =========================================================================
  // PASCHAL TRIDUUM (Triduum Paschale)
  // =========================================================================
  {
    code: '0010',
    id: 'holy_thursday',
    shortCode: 'TRI1',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.TRIDUUM_1,
    priority: 100,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Feria V in Cena Domini',
      en: 'Thursday of the Lord\'s Supper (Holy Thursday)'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -3)),
    daysFromEaster: -3,
    externalIds: { romcal: 'holy_thursday', eprex: '0010' }
  },
  {
    code: '0011',
    id: 'good_friday',
    shortCode: 'TRI2',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.TRIDUUM_1,
    priority: 100,
    colores: [Color.RUBER],
    nomina: {
      la: 'Feria VI in Passione Domini',
      en: 'Friday of the Passion of the Lord (Good Friday)'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -2)),
    daysFromEaster: -2,
    externalIds: { romcal: 'friday_of_the_passion_of_the_lord', eprex: '0011' }
  },
  {
    code: '0012',
    id: 'holy_saturday',
    shortCode: 'TRI3',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.TRIDUUM_1,
    priority: 100,
    colores: [Color.VIOLACEUS],
    nomina: {
      la: 'Sabbatum Sanctum',
      en: 'Holy Saturday'
    },
    match: (date, easter) => idemDies(date, addDies(easter, -1)),
    daysFromEaster: -1,
    externalIds: { romcal: 'holy_saturday', eprex: '0012' }
  },

  // =========================================================================
  // EASTER (Pascha)
  // =========================================================================
  {
    code: '0013',
    id: 'easter_sunday',
    shortCode: 'PAS0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.TRIDUUM_1,
    priority: 100,
    colores: [Color.ALBUS, Color.AUREUS],
    nomina: {
      la: 'Dominica Paschae in Resurrectione Domini',
      en: 'Easter Sunday of the Resurrection of the Lord'
    },
    match: (date, easter) => idemDies(date, easter),
    daysFromEaster: 0,
    externalIds: { romcal: 'easter_sunday', eprex: '0013' }
  },

  // =========================================================================
  // EASTER OCTAVE
  // =========================================================================
  {
    code: '0014',
    id: 'monday_of_easter_octave',
    shortCode: 'PAS1F2',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DIES_OCTAVAE_PASCHAE_2,
    priority: 230,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Feria II infra octavam Paschae',
      en: 'Monday within the Octave of Easter'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 1)),
    daysFromEaster: 1,
    externalIds: { romcal: 'easter_monday', eprex: '0014' }
  },
  {
    code: '0015',
    id: 'tuesday_of_easter_octave',
    shortCode: 'PAS1F3',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DIES_OCTAVAE_PASCHAE_2,
    priority: 230,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Feria III infra octavam Paschae',
      en: 'Tuesday within the Octave of Easter'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 2)),
    daysFromEaster: 2,
    externalIds: { eprex: '0015' }
  },
  {
    code: '0016',
    id: 'wednesday_of_easter_octave',
    shortCode: 'PAS1F4',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DIES_OCTAVAE_PASCHAE_2,
    priority: 230,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Feria IV infra octavam Paschae',
      en: 'Wednesday within the Octave of Easter'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 3)),
    daysFromEaster: 3,
    externalIds: { eprex: '0016' }
  },
  {
    code: '0017',
    id: 'thursday_of_easter_octave',
    shortCode: 'PAS1F5',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DIES_OCTAVAE_PASCHAE_2,
    priority: 230,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Feria V infra octavam Paschae',
      en: 'Thursday within the Octave of Easter'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 4)),
    daysFromEaster: 4,
    externalIds: { eprex: '0017' }
  },
  {
    code: '0018',
    id: 'friday_of_easter_octave',
    shortCode: 'PAS1F6',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DIES_OCTAVAE_PASCHAE_2,
    priority: 230,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Feria VI infra octavam Paschae',
      en: 'Friday within the Octave of Easter'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 5)),
    daysFromEaster: 5,
    externalIds: { eprex: '0018' }
  },
  {
    code: '0019',
    id: 'saturday_of_easter_octave',
    shortCode: 'PAS1S',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DIES_OCTAVAE_PASCHAE_2,
    priority: 230,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Sabbatum infra octavam Paschae',
      en: 'Saturday within the Octave of Easter'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 6)),
    daysFromEaster: 6,
    externalIds: { eprex: '0019' }
  },
  {
    code: '0020',
    id: 'divine_mercy_sunday',
    shortCode: 'PAS2',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.DOMINICA_PRIVILEGIATA_2,
    priority: 210,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Dominica II Paschae seu de Divina Misericordia',
      en: 'Second Sunday of Easter (Divine Mercy Sunday)'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 7)),
    daysFromEaster: 7,
    externalIds: { romcal: 'divine_mercy_sunday', eprex: '0020' }
  },

  // =========================================================================
  // MAJOR SOLEMNITIES AFTER EASTER
  // =========================================================================
  {
    code: '0021',
    id: 'ascension_of_the_lord',
    shortCode: 'ASC0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_DOMINI_IN_CALENDARIO_2,
    priority: 200,
    colores: [Color.ALBUS],
    nomina: {
      la: 'In Ascensione Domini',
      en: 'The Ascension of the Lord'
    },
    match: (date, _easter) => idemDies(date, ascensio(date.getFullYear())),
    externalIds: { romcal: 'ascension_of_the_lord', eprex: '0021' }
  },
  {
    code: '0022',
    id: 'pentecost_sunday',
    shortCode: 'PEN0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_DOMINI_IN_CALENDARIO_2,
    priority: 200,
    colores: [Color.RUBER],
    nomina: {
      la: 'Dominica Pentecostes',
      en: 'Pentecost Sunday'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 49)),
    daysFromEaster: 49,
    externalIds: { romcal: 'pentecost_sunday', eprex: '0022' }
  },
  {
    code: '0023',
    id: 'most_holy_trinity',
    shortCode: 'TRI0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3,
    priority: 300,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Ss.mae Trinitatis',
      en: 'The Most Holy Trinity'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 56)),
    daysFromEaster: 56,
    externalIds: { romcal: 'most_holy_trinity', eprex: '0023' }
  },
  {
    code: '0024',
    id: 'most_holy_body_and_blood_of_christ',
    shortCode: 'COR0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3,
    priority: 300,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Ss.mi Corporis et Sanguinis Christi',
      en: 'The Most Holy Body and Blood of Christ (Corpus Christi)'
    },
    match: (date, _easter) => idemDies(date, corpusChristi(date.getFullYear())),
    externalIds: { romcal: 'most_holy_body_and_blood_of_christ', eprex: '0024' }
  },
  {
    code: '0025',
    id: 'most_sacred_heart_of_jesus',
    shortCode: 'SCJ0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3,
    priority: 300,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Ss.mi Cordis Iesu',
      en: 'The Most Sacred Heart of Jesus'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 68)),
    daysFromEaster: 68,
    externalIds: { romcal: 'most_sacred_heart_of_jesus', eprex: '0025' }
  },
  {
    code: '0026',
    id: 'christ_the_king',
    shortCode: 'ORD34',
    genus: Genus.TEMPORALE,
    gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3,
    priority: 300,
    colores: [Color.ALBUS],
    nomina: {
      la: 'D.N. Iesu Christi Universorum Regis',
      en: 'Our Lord Jesus Christ, King of the Universe'
    },
    match: (date, _easter) => idemDies(date, christusRex(date.getFullYear())),
    externalIds: { romcal: 'our_lord_jesus_christ_king_of_the_universe', eprex: '0026' }
  },

  // =========================================================================
  // CHRISTMAS CYCLE MOVEABLE FEASTS
  // =========================================================================
  {
    code: '0027',
    id: 'holy_family',
    shortCode: 'NAT1F',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_DOMINI_5,
    priority: 600,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Sanctae Familiae Iesu, Mariae et Ioseph',
      en: 'The Holy Family of Jesus, Mary and Joseph'
    },
    match: (date, _easter) => idemDies(date, sacraFamilia(date.getFullYear())),
    externalIds: { romcal: 'holy_family_of_jesus_mary_and_joseph', eprex: '0027' }
  },
  {
    code: '0028',
    id: 'second_sunday_after_christmas',
    shortCode: 'NAT2D',
    genus: Genus.TEMPORALE,
    gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.DOMINICA_NATIVITATIS_6,
    priority: 600,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Dominica II post Nativitatem',
      en: 'Second Sunday after Christmas'
    },
    match: (date, _easter) => {
      const secondSunday = dominicaIIPostNativitatem(date.getFullYear());
      return secondSunday !== null && idemDies(date, secondSunday);
    },
    externalIds: { eprex: '0028' }
  },

  // =========================================================================
  // MEMORIALS DEPENDENT ON EASTER
  // =========================================================================
  {
    code: '0029',
    id: 'immaculate_heart_of_mary',
    shortCode: 'CIM0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10,
    priority: 1000,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Cordis Immaculati Beatae Mariae Virginis',
      en: 'The Immaculate Heart of the Blessed Virgin Mary'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 69)),
    daysFromEaster: 69,
    externalIds: { romcal: 'immaculate_heart_of_mary', eprex: '0029' }
  },
  {
    code: '0030',
    id: 'mary_mother_of_the_church',
    shortCode: 'MME0',
    genus: Genus.TEMPORALE,
    gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10,
    priority: 990,
    colores: [Color.ALBUS],
    nomina: {
      la: 'Beatae Mariae Virginis, Ecclesiae Matris',
      en: 'The Blessed Virgin Mary, Mother of the Church'
    },
    match: (date, easter) => idemDies(date, addDies(easter, 50)),
    daysFromEaster: 50,
    externalIds: { romcal: 'mary_mother_of_the_church', eprex: '0030' }
  }
];

/**
 * Find a temporale celebration for a given date
 */
export function findTemporale(date: Date): DiesSpecialis | null {
  const annus = date.getFullYear();
  const easter = pascha(annus);

  for (const dies of TEMPORALE) {
    if (dies.match(date, easter)) {
      return dies;
    }
  }
  return null;
}

/** Alias for findTemporale - used by calendar resolver */
export const findTemporaleCelebration = findTemporale;

/**
 * Get all temporale celebrations for a year
 */
export function getTemporaleAnno(annus: number): Array<{ date: Date; dies: DiesSpecialis }> {
  const easter = pascha(annus);
  const results: Array<{ date: Date; dies: DiesSpecialis }> = [];

  for (const dies of TEMPORALE) {
    // Calculate the date for this celebration
    let date: Date | null = null;

    if (dies.daysFromEaster !== undefined) {
      date = addDies(easter, dies.daysFromEaster);
    } else if (dies.id === 'baptism_of_the_lord') {
      date = baptismaDomini(annus);
    } else if (dies.id === 'ascension_of_the_lord') {
      date = ascensio(annus);
    } else if (dies.id === 'most_holy_body_and_blood_of_christ') {
      date = corpusChristi(annus);
    } else if (dies.id === 'christ_the_king') {
      date = christusRex(annus);
    } else if (dies.id === 'holy_family') {
      date = sacraFamilia(annus);
    } else if (dies.id === 'second_sunday_after_christmas') {
      date = dominicaIIPostNativitatem(annus);
    }

    if (date) {
      results.push({ date, dies });
    }
  }

  // Sort by date
  results.sort((a, b) => a.date.getTime() - b.date.getTime());

  return results;
}

export default TEMPORALE;

/**
 * CLEDR Liturgical Calendar - Sanctorale (Fixed Feasts)
 * Calendarium Romanum Generale - Latin nomenclature
 */

import {
  DiesSpecialis,
  Genus,
  Gradus,
  Praecedentia,
  Color
} from './types';

// =============================================================================
// HELPER: Create a fixed date matcher
// =============================================================================

function fixedDateMatch(month: number, day: number): (date: Date) => boolean {
  return (date: Date) =>
    date.getMonth() === month - 1 && date.getDate() === day;
}

// =============================================================================
// JANUARY
// =============================================================================

export const SANCTORALE_JANUARY: DiesSpecialis[] = [
  {
    code: '0101', id: 'mary_mother_of_god', shortCode: '0101',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.ALBUS],
    nomina: { la: 'Sanctae Dei Genetricis Mariae', en: 'Mary, the Holy Mother of God' },
    match: (date) => fixedDateMatch(1, 1)(date), month: 1, day: 1,
    externalIds: { romcal: 'mary_mother_of_god' }
  },
  {
    code: '0102', id: 'basil_great_gregory_nazianzen', shortCode: '0102',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Ss. Basilii Magni et Gregorii Nazianzeni, episcoporum et doctorum Ecclesiae', en: 'Saints Basil the Great and Gregory Nazianzen, Bishops and Doctors' },
    match: (date) => fixedDateMatch(1, 2)(date), month: 1, day: 2,
    externalIds: { romcal: 'basil_great_gregory_nazianzen' }
  },
  {
    code: '0106', id: 'epiphany', shortCode: '0106',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_DOMINI_IN_CALENDARIO_2, priority: 200,
    colores: [Color.ALBUS],
    nomina: { la: 'In Epiphania Domini', en: 'The Epiphany of the Lord' },
    match: (date) => fixedDateMatch(1, 6)(date), month: 1, day: 6,
    externalIds: { romcal: 'epiphany' }
  },
  {
    code: '0117', id: 'anthony_abbot', shortCode: '0117',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Antonii, abbatis', en: 'Saint Anthony, Abbot' },
    match: (date) => fixedDateMatch(1, 17)(date), month: 1, day: 17,
    externalIds: { romcal: 'anthony_abbot' }
  },
  {
    code: '0120', id: 'fabian_pope_martyr', shortCode: '0120a',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.RUBER],
    nomina: { la: 'S. Fabiani, papae et martyris', en: 'Saint Fabian, Pope and Martyr' },
    match: (date) => fixedDateMatch(1, 20)(date), month: 1, day: 20,
    externalIds: { romcal: 'fabian_pope_martyr' }
  },
  {
    code: '0120b', id: 'sebastian_martyr', shortCode: '0120b',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.RUBER],
    nomina: { la: 'S. Sebastiani, martyris', en: 'Saint Sebastian, Martyr' },
    match: (date) => fixedDateMatch(1, 20)(date), month: 1, day: 20,
    externalIds: { romcal: 'sebastian_martyr' }
  },
  {
    code: '0121', id: 'agnes_virgin_martyr', shortCode: '0121',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.RUBER],
    nomina: { la: 'S. Agnetis, virginis et martyris', en: 'Saint Agnes, Virgin and Martyr' },
    match: (date) => fixedDateMatch(1, 21)(date), month: 1, day: 21,
    externalIds: { romcal: 'agnes_virgin_martyr' }
  },
  {
    code: '0122', id: 'vincent_deacon_martyr', shortCode: '0122',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.RUBER],
    nomina: { la: 'S. Vincentii, diaconi et martyris', en: 'Saint Vincent, Deacon and Martyr' },
    match: (date) => fixedDateMatch(1, 22)(date), month: 1, day: 22,
    externalIds: { romcal: 'vincent_deacon_martyr' }
  },
  {
    code: '0124', id: 'francis_de_sales', shortCode: '0124',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Francisci de Sales, episcopi et doctoris Ecclesiae', en: 'Saint Francis de Sales, Bishop and Doctor' },
    match: (date) => fixedDateMatch(1, 24)(date), month: 1, day: 24,
    externalIds: { romcal: 'francis_de_sales' }
  },
  {
    code: '0125', id: 'conversion_of_paul', shortCode: '0125',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.ALBUS],
    nomina: { la: 'In Conversione S. Pauli, Apostoli', en: 'The Conversion of Saint Paul the Apostle' },
    match: (date) => fixedDateMatch(1, 25)(date), month: 1, day: 25,
    externalIds: { romcal: 'conversion_of_paul' }
  },
  {
    code: '0126', id: 'timothy_titus_bishops', shortCode: '0126',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Ss. Timothei et Titi, episcoporum', en: 'Saints Timothy and Titus, Bishops' },
    match: (date) => fixedDateMatch(1, 26)(date), month: 1, day: 26,
    externalIds: { romcal: 'timothy_titus_bishops' }
  },
  {
    code: '0127', id: 'angela_merici', shortCode: '0127',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Angelae Merici, virginis', en: 'Saint Angela Merici, Virgin' },
    match: (date) => fixedDateMatch(1, 27)(date), month: 1, day: 27,
    externalIds: { romcal: 'angela_merici' }
  },
  {
    code: '0128', id: 'thomas_aquinas', shortCode: '0128',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Thomae de Aquino, presbyteri et doctoris Ecclesiae', en: 'Saint Thomas Aquinas, Priest and Doctor' },
    match: (date) => fixedDateMatch(1, 28)(date), month: 1, day: 28,
    externalIds: { romcal: 'thomas_aquinas' }
  },
  {
    code: '0131', id: 'john_bosco', shortCode: '0131',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Ioannis Bosco, presbyteri', en: 'Saint John Bosco, Priest' },
    match: (date) => fixedDateMatch(1, 31)(date), month: 1, day: 31,
    externalIds: { romcal: 'john_bosco' }
  }
];

// =============================================================================
// FEBRUARY
// =============================================================================

export const SANCTORALE_FEBRUARY: DiesSpecialis[] = [
  {
    code: '0202', id: 'presentation_of_the_lord', shortCode: '0202',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_DOMINI_5, priority: 500,
    colores: [Color.ALBUS],
    nomina: { la: 'In Praesentatione Domini', en: 'The Presentation of the Lord' },
    match: (date) => fixedDateMatch(2, 2)(date), month: 2, day: 2,
    externalIds: { romcal: 'presentation_of_the_lord' }
  },
  {
    code: '0205', id: 'agatha_virgin_martyr', shortCode: '0205',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.RUBER],
    nomina: { la: 'S. Agathae, virginis et martyris', en: 'Saint Agatha, Virgin and Martyr' },
    match: (date) => fixedDateMatch(2, 5)(date), month: 2, day: 5,
    externalIds: { romcal: 'agatha_virgin_martyr' }
  },
  {
    code: '0206', id: 'paul_miki_companions', shortCode: '0206',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.RUBER],
    nomina: { la: 'Ss. Pauli Miki et sociorum, martyrum', en: 'Saints Paul Miki and Companions, Martyrs' },
    match: (date) => fixedDateMatch(2, 6)(date), month: 2, day: 6,
    externalIds: { romcal: 'paul_miki_companions' }
  },
  {
    code: '0210', id: 'scholastica_virgin', shortCode: '0210',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Scholasticae, virginis', en: 'Saint Scholastica, Virgin' },
    match: (date) => fixedDateMatch(2, 10)(date), month: 2, day: 10,
    externalIds: { romcal: 'scholastica_virgin' }
  },
  {
    code: '0211', id: 'our_lady_of_lourdes', shortCode: '0211',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.ALBUS],
    nomina: { la: 'Beatae Mariae Virginis de Lourdes', en: 'Our Lady of Lourdes' },
    match: (date) => fixedDateMatch(2, 11)(date), month: 2, day: 11,
    externalIds: { romcal: 'our_lady_of_lourdes' }
  },
  {
    code: '0214', id: 'cyril_methodius', shortCode: '0214',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Ss. Cyrilli, monachi, et Methodii, episcopi', en: 'Saints Cyril and Methodius' },
    match: (date) => fixedDateMatch(2, 14)(date), month: 2, day: 14,
    externalIds: { romcal: 'cyril_methodius' }
  },
  {
    code: '0222', id: 'chair_of_peter', shortCode: '0222',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.ALBUS],
    nomina: { la: 'Cathedrae S. Petri, Apostoli', en: 'The Chair of Saint Peter the Apostle' },
    match: (date) => fixedDateMatch(2, 22)(date), month: 2, day: 22,
    externalIds: { romcal: 'chair_of_peter' }
  },
  {
    code: '0223', id: 'polycarp_bishop_martyr', shortCode: '0223',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.RUBER],
    nomina: { la: 'S. Polycarpi, episcopi et martyris', en: 'Saint Polycarp, Bishop and Martyr' },
    match: (date) => fixedDateMatch(2, 23)(date), month: 2, day: 23,
    externalIds: { romcal: 'polycarp_bishop_martyr' }
  }
];

// =============================================================================
// MARCH
// =============================================================================

export const SANCTORALE_MARCH: DiesSpecialis[] = [
  {
    code: '0319', id: 'joseph_husband_of_mary', shortCode: '0319',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Ioseph, Sponsi Beatae Mariae Virginis', en: 'Saint Joseph, Spouse of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(3, 19)(date), month: 3, day: 19,
    externalIds: { romcal: 'joseph_husband_of_mary' }
  },
  {
    code: '0325', id: 'annunciation', shortCode: '0325',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_DOMINI_IN_CALENDARIO_2, priority: 200,
    colores: [Color.ALBUS],
    nomina: { la: 'In Annuntiatione Domini', en: 'The Annunciation of the Lord' },
    match: (date) => fixedDateMatch(3, 25)(date), month: 3, day: 25,
    externalIds: { romcal: 'annunciation' }
  }
];

// =============================================================================
// APRIL
// =============================================================================

export const SANCTORALE_APRIL: DiesSpecialis[] = [
  {
    code: '0425', id: 'mark_evangelist', shortCode: '0425',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Marci, Evangelistae', en: 'Saint Mark, Evangelist' },
    match: (date) => fixedDateMatch(4, 25)(date), month: 4, day: 25,
    externalIds: { romcal: 'mark_evangelist' }
  },
  {
    code: '0429', id: 'catherine_of_siena', shortCode: '0429',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Catharinae Senensis, virginis et doctoris Ecclesiae', en: 'Saint Catherine of Siena, Virgin and Doctor' },
    match: (date) => fixedDateMatch(4, 29)(date), month: 4, day: 29,
    externalIds: { romcal: 'catherine_of_siena' }
  }
];

// =============================================================================
// MAY
// =============================================================================

export const SANCTORALE_MAY: DiesSpecialis[] = [
  {
    code: '0501', id: 'joseph_the_worker', shortCode: '0501',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Ioseph Opificis', en: 'Saint Joseph the Worker' },
    match: (date) => fixedDateMatch(5, 1)(date), month: 5, day: 1,
    externalIds: { romcal: 'joseph_the_worker' }
  },
  {
    code: '0503', id: 'philip_james_apostles', shortCode: '0503',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'Ss. Philippi et Iacobi, Apostolorum', en: 'Saints Philip and James, Apostles' },
    match: (date) => fixedDateMatch(5, 3)(date), month: 5, day: 3,
    externalIds: { romcal: 'philip_james_apostles' }
  },
  {
    code: '0514', id: 'matthias_apostle', shortCode: '0514',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Matthiae, Apostoli', en: 'Saint Matthias, Apostle' },
    match: (date) => fixedDateMatch(5, 14)(date), month: 5, day: 14,
    externalIds: { romcal: 'matthias_apostle' }
  },
  {
    code: '0531', id: 'visitation', shortCode: '0531',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_BMV_7, priority: 700,
    colores: [Color.ALBUS],
    nomina: { la: 'In Visitatione Beatae Mariae Virginis', en: 'The Visitation of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(5, 31)(date), month: 5, day: 31,
    externalIds: { romcal: 'visitation' }
  }
];

// =============================================================================
// JUNE
// =============================================================================

export const SANCTORALE_JUNE: DiesSpecialis[] = [
  {
    code: '0611', id: 'barnabas_apostle', shortCode: '0611',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.RUBER],
    nomina: { la: 'S. Barnabae, Apostoli', en: 'Saint Barnabas, Apostle' },
    match: (date) => fixedDateMatch(6, 11)(date), month: 6, day: 11,
    externalIds: { romcal: 'barnabas_apostle' }
  },
  {
    code: '0624', id: 'nativity_of_john_the_baptist', shortCode: '0624',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.ALBUS],
    nomina: { la: 'In Nativitate S. Ioannis Baptistae', en: 'The Nativity of Saint John the Baptist' },
    match: (date) => fixedDateMatch(6, 24)(date), month: 6, day: 24,
    externalIds: { romcal: 'nativity_of_john_the_baptist' }
  },
  {
    code: '0629', id: 'peter_and_paul_apostles', shortCode: '0629',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.RUBER],
    nomina: { la: 'Ss. Petri et Pauli, Apostolorum', en: 'Saints Peter and Paul, Apostles' },
    match: (date) => fixedDateMatch(6, 29)(date), month: 6, day: 29,
    externalIds: { romcal: 'peter_and_paul_apostles' }
  }
];

// =============================================================================
// JULY
// =============================================================================

export const SANCTORALE_JULY: DiesSpecialis[] = [
  {
    code: '0703', id: 'thomas_apostle', shortCode: '0703',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Thomae, Apostoli', en: 'Saint Thomas, Apostle' },
    match: (date) => fixedDateMatch(7, 3)(date), month: 7, day: 3,
    externalIds: { romcal: 'thomas_apostle' }
  },
  {
    code: '0722', id: 'mary_magdalene', shortCode: '0722',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Mariae Magdalenae', en: 'Saint Mary Magdalene' },
    match: (date) => fixedDateMatch(7, 22)(date), month: 7, day: 22,
    externalIds: { romcal: 'mary_magdalene' }
  },
  {
    code: '0723', id: 'bridget_of_sweden', shortCode: '0723',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Birgittae, religiosae', en: 'Saint Bridget, Religious' },
    match: (date) => fixedDateMatch(7, 23)(date), month: 7, day: 23,
    externalIds: { romcal: 'bridget_of_sweden' }
  },
  {
    code: '0725', id: 'james_apostle', shortCode: '0725',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Iacobi, Apostoli', en: 'Saint James, Apostle' },
    match: (date) => fixedDateMatch(7, 25)(date), month: 7, day: 25,
    externalIds: { romcal: 'james_apostle' }
  },
  {
    code: '0726', id: 'joachim_anne', shortCode: '0726',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Ss. Ioachim et Annae, parentum Beatae Mariae Virginis', en: 'Saints Joachim and Anne, Parents of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(7, 26)(date), month: 7, day: 26,
    externalIds: { romcal: 'joachim_anne' }
  },
  {
    code: '0729', id: 'martha', shortCode: '0729',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Marthae', en: 'Saint Martha' },
    match: (date) => fixedDateMatch(7, 29)(date), month: 7, day: 29,
    externalIds: { romcal: 'martha' }
  },
  {
    code: '0731', id: 'ignatius_of_loyola', shortCode: '0731',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Ignatii de Loyola, presbyteri', en: 'Saint Ignatius of Loyola, Priest' },
    match: (date) => fixedDateMatch(7, 31)(date), month: 7, day: 31,
    externalIds: { romcal: 'ignatius_of_loyola' }
  }
];

// =============================================================================
// AUGUST
// =============================================================================

export const SANCTORALE_AUGUST: DiesSpecialis[] = [
  {
    code: '0806', id: 'transfiguration', shortCode: '0806',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_DOMINI_5, priority: 500,
    colores: [Color.ALBUS],
    nomina: { la: 'In Transfiguratione Domini', en: 'The Transfiguration of the Lord' },
    match: (date) => fixedDateMatch(8, 6)(date), month: 8, day: 6,
    externalIds: { romcal: 'transfiguration' }
  },
  {
    code: '0810', id: 'lawrence_deacon_martyr', shortCode: '0810',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Laurentii, diaconi et martyris', en: 'Saint Lawrence, Deacon and Martyr' },
    match: (date) => fixedDateMatch(8, 10)(date), month: 8, day: 10,
    externalIds: { romcal: 'lawrence_deacon_martyr' }
  },
  {
    code: '0815', id: 'assumption', shortCode: '0815',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.ALBUS],
    nomina: { la: 'In Assumptione Beatae Mariae Virginis', en: 'The Assumption of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(8, 15)(date), month: 8, day: 15,
    externalIds: { romcal: 'assumption' }
  },
  {
    code: '0822', id: 'queenship_of_mary', shortCode: '0822',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Beatae Mariae Virginis Reginae', en: 'The Queenship of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(8, 22)(date), month: 8, day: 22,
    externalIds: { romcal: 'queenship_of_mary' }
  },
  {
    code: '0824', id: 'bartholomew_apostle', shortCode: '0824',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Bartholomaei, Apostoli', en: 'Saint Bartholomew, Apostle' },
    match: (date) => fixedDateMatch(8, 24)(date), month: 8, day: 24,
    externalIds: { romcal: 'bartholomew_apostle' }
  },
  {
    code: '0829', id: 'passion_of_john_the_baptist', shortCode: '0829',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.RUBER],
    nomina: { la: 'In Passione S. Ioannis Baptistae', en: 'The Passion of Saint John the Baptist' },
    match: (date) => fixedDateMatch(8, 29)(date), month: 8, day: 29,
    externalIds: { romcal: 'passion_of_john_the_baptist' }
  }
];

// =============================================================================
// SEPTEMBER
// =============================================================================

export const SANCTORALE_SEPTEMBER: DiesSpecialis[] = [
  {
    code: '0908', id: 'nativity_of_mary', shortCode: '0908',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_BMV_7, priority: 700,
    colores: [Color.ALBUS],
    nomina: { la: 'In Nativitate Beatae Mariae Virginis', en: 'The Nativity of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(9, 8)(date), month: 9, day: 8,
    externalIds: { romcal: 'nativity_of_mary' }
  },
  {
    code: '0914', id: 'exaltation_of_the_cross', shortCode: '0914',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_DOMINI_5, priority: 500,
    colores: [Color.RUBER],
    nomina: { la: 'In Exaltatione Sanctae Crucis', en: 'The Exaltation of the Holy Cross' },
    match: (date) => fixedDateMatch(9, 14)(date), month: 9, day: 14,
    externalIds: { romcal: 'exaltation_of_the_cross' }
  },
  {
    code: '0915', id: 'our_lady_of_sorrows', shortCode: '0915',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Beatae Mariae Virginis Perdolentis', en: 'Our Lady of Sorrows' },
    match: (date) => fixedDateMatch(9, 15)(date), month: 9, day: 15,
    externalIds: { romcal: 'our_lady_of_sorrows' }
  },
  {
    code: '0921', id: 'matthew_apostle_evangelist', shortCode: '0921',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Matthaei, Apostoli et Evangelistae', en: 'Saint Matthew, Apostle and Evangelist' },
    match: (date) => fixedDateMatch(9, 21)(date), month: 9, day: 21,
    externalIds: { romcal: 'matthew_apostle_evangelist' }
  },
  {
    code: '0929', id: 'michael_gabriel_raphael', shortCode: '0929',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.ALBUS],
    nomina: { la: 'Ss. Michaelis, Gabrielis et Raphaelis, Archangelorum', en: 'Saints Michael, Gabriel and Raphael, Archangels' },
    match: (date) => fixedDateMatch(9, 29)(date), month: 9, day: 29,
    externalIds: { romcal: 'michael_gabriel_raphael' }
  }
];

// =============================================================================
// OCTOBER
// =============================================================================

export const SANCTORALE_OCTOBER: DiesSpecialis[] = [
  {
    code: '1002', id: 'guardian_angels', shortCode: '1002',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Ss. Angelorum Custodum', en: 'The Holy Guardian Angels' },
    match: (date) => fixedDateMatch(10, 2)(date), month: 10, day: 2,
    externalIds: { romcal: 'guardian_angels' }
  },
  {
    code: '1004', id: 'francis_of_assisi', shortCode: '1004',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Francisci Assisiensis', en: 'Saint Francis of Assisi' },
    match: (date) => fixedDateMatch(10, 4)(date), month: 10, day: 4,
    externalIds: { romcal: 'francis_of_assisi' }
  },
  {
    code: '1007', id: 'our_lady_of_the_rosary', shortCode: '1007',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'Beatae Mariae Virginis a Rosario', en: 'Our Lady of the Rosary' },
    match: (date) => fixedDateMatch(10, 7)(date), month: 10, day: 7,
    externalIds: { romcal: 'our_lady_of_the_rosary' }
  },
  {
    code: '1015', id: 'teresa_of_avila', shortCode: '1015',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Teresiae a Iesu, virginis et doctoris Ecclesiae', en: 'Saint Teresa of Jesus, Virgin and Doctor' },
    match: (date) => fixedDateMatch(10, 15)(date), month: 10, day: 15,
    externalIds: { romcal: 'teresa_of_avila' }
  },
  {
    code: '1018', id: 'luke_evangelist', shortCode: '1018',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Lucae, Evangelistae', en: 'Saint Luke, Evangelist' },
    match: (date) => fixedDateMatch(10, 18)(date), month: 10, day: 18,
    externalIds: { romcal: 'luke_evangelist' }
  },
  {
    code: '1028', id: 'simon_jude_apostles', shortCode: '1028',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'Ss. Simonis et Iudae, Apostolorum', en: 'Saints Simon and Jude, Apostles' },
    match: (date) => fixedDateMatch(10, 28)(date), month: 10, day: 28,
    externalIds: { romcal: 'simon_jude_apostles' }
  }
];

// =============================================================================
// NOVEMBER
// =============================================================================

export const SANCTORALE_NOVEMBER: DiesSpecialis[] = [
  {
    code: '1101', id: 'all_saints', shortCode: '1101',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.ALBUS],
    nomina: { la: 'Omnium Sanctorum', en: 'All Saints' },
    match: (date) => fixedDateMatch(11, 1)(date), month: 11, day: 1,
    externalIds: { romcal: 'all_saints' }
  },
  {
    code: '1102', id: 'all_souls', shortCode: '1102',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.VIOLACEUS, Color.NIGER],
    nomina: { la: 'In Commemoratione Omnium Fidelium Defunctorum', en: 'The Commemoration of All the Faithful Departed' },
    match: (date) => fixedDateMatch(11, 2)(date), month: 11, day: 2,
    externalIds: { romcal: 'all_souls' }
  },
  {
    code: '1109', id: 'dedication_of_lateran', shortCode: '1109',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_DOMINI_5, priority: 500,
    colores: [Color.ALBUS],
    nomina: { la: 'In Dedicatione Basilicae Lateranensis', en: 'The Dedication of the Lateran Basilica' },
    match: (date) => fixedDateMatch(11, 9)(date), month: 11, day: 9,
    externalIds: { romcal: 'dedication_of_lateran' }
  },
  {
    code: '1121', id: 'presentation_of_mary', shortCode: '1121',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA,
    praecedentia: Praecedentia.MEMORIA_OBLIGATORIA_10, priority: 1000,
    colores: [Color.ALBUS],
    nomina: { la: 'In Praesentatione Beatae Mariae Virginis', en: 'The Presentation of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(11, 21)(date), month: 11, day: 21,
    externalIds: { romcal: 'presentation_of_mary' }
  },
  {
    code: '1130', id: 'andrew_apostle', shortCode: '1130',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Andreae, Apostoli', en: 'Saint Andrew, Apostle' },
    match: (date) => fixedDateMatch(11, 30)(date), month: 11, day: 30,
    externalIds: { romcal: 'andrew_apostle' }
  }
];

// =============================================================================
// DECEMBER
// =============================================================================

export const SANCTORALE_DECEMBER: DiesSpecialis[] = [
  {
    code: '1208', id: 'immaculate_conception', shortCode: '1208',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_GENERALIS_3, priority: 300,
    colores: [Color.ALBUS],
    nomina: { la: 'In Conceptione Immaculata Beatae Mariae Virginis', en: 'The Immaculate Conception of the Blessed Virgin Mary' },
    match: (date) => fixedDateMatch(12, 8)(date), month: 12, day: 8,
    externalIds: { romcal: 'immaculate_conception' }
  },
  {
    code: '1225', id: 'nativity_of_the_lord', shortCode: '1225',
    genus: Genus.SANCTORALE, gradus: Gradus.SOLLEMNITAS,
    praecedentia: Praecedentia.SOLLEMNITAS_DOMINI_IN_CALENDARIO_2, priority: 200,
    colores: [Color.ALBUS],
    nomina: { la: 'In Nativitate Domini', en: 'The Nativity of the Lord' },
    match: (date) => fixedDateMatch(12, 25)(date), month: 12, day: 25,
    externalIds: { romcal: 'nativity_of_the_lord' }
  },
  {
    code: '1226', id: 'stephen_first_martyr', shortCode: '1226',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'S. Stephani, Protomartyris', en: 'Saint Stephen, the First Martyr' },
    match: (date) => fixedDateMatch(12, 26)(date), month: 12, day: 26,
    externalIds: { romcal: 'stephen_first_martyr' }
  },
  {
    code: '1227', id: 'john_apostle_evangelist', shortCode: '1227',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Ioannis, Apostoli et Evangelistae', en: 'Saint John, Apostle and Evangelist' },
    match: (date) => fixedDateMatch(12, 27)(date), month: 12, day: 27,
    externalIds: { romcal: 'john_apostle_evangelist' }
  },
  {
    code: '1228', id: 'holy_innocents', shortCode: '1228',
    genus: Genus.SANCTORALE, gradus: Gradus.FESTUM,
    praecedentia: Praecedentia.FESTUM_SANCTORUM_7, priority: 701,
    colores: [Color.RUBER],
    nomina: { la: 'Ss. Innocentium, Martyrum', en: 'The Holy Innocents, Martyrs' },
    match: (date) => fixedDateMatch(12, 28)(date), month: 12, day: 28,
    externalIds: { romcal: 'holy_innocents' }
  },
  {
    code: '1231', id: 'sylvester_pope', shortCode: '1231',
    genus: Genus.SANCTORALE, gradus: Gradus.MEMORIA_AD_LIBITUM,
    praecedentia: Praecedentia.MEMORIA_AD_LIBITUM_12, priority: 1200,
    colores: [Color.ALBUS],
    nomina: { la: 'S. Silvestri I, papae', en: 'Saint Sylvester I, Pope' },
    match: (date) => fixedDateMatch(12, 31)(date), month: 12, day: 31,
    externalIds: { romcal: 'sylvester_pope' }
  }
];

// =============================================================================
// COMBINED SANCTORALE
// =============================================================================

export const SANCTORALE: DiesSpecialis[] = [
  ...SANCTORALE_JANUARY,
  ...SANCTORALE_FEBRUARY,
  ...SANCTORALE_MARCH,
  ...SANCTORALE_APRIL,
  ...SANCTORALE_MAY,
  ...SANCTORALE_JUNE,
  ...SANCTORALE_JULY,
  ...SANCTORALE_AUGUST,
  ...SANCTORALE_SEPTEMBER,
  ...SANCTORALE_OCTOBER,
  ...SANCTORALE_NOVEMBER,
  ...SANCTORALE_DECEMBER
].sort((a, b) => {
  if (a.month !== b.month) return (a.month || 0) - (b.month || 0);
  if (a.day !== b.day) return (a.day || 0) - (b.day || 0);
  return a.priority - b.priority;
});

// =============================================================================
// LOOKUP FUNCTIONS
// =============================================================================

/**
 * Find sanctorale celebrations for a given date
 */
export function findSanctorale(date: Date): DiesSpecialis[] {
  return SANCTORALE.filter(dies => dies.match(date, date));
}

/**
 * Find highest-precedence sanctorale celebration for a date
 */
export function findSanctoraleCelebration(date: Date): DiesSpecialis | null {
  const matches = findSanctorale(date);
  return matches.length > 0 ? matches[0] : null;
}

/**
 * Get all sanctorale for a specific month
 */
export function getSanctoraleByMonth(month: number): DiesSpecialis[] {
  return SANCTORALE.filter(dies => dies.month === month);
}

export default SANCTORALE;

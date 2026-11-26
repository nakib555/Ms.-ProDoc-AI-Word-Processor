export type SymbolCategoryName =
  | 'Common'
  | 'Quotes & Punctuation'
  | 'Currency & Legal'
  | 'Latin & Accented'
  | 'Greek'
  | 'Math & Logic'
  | 'Arrows'
  | 'Shapes & Box Drawing'
  | 'Wingdings & Dingbats'
  | 'Technical & UI'
  | 'IPA & Cyrillic';

export interface SymbolEntry {
  char: string;
  name: string;
  codepoint: string;
  category: SymbolCategoryName;
  subgroup: string;
  keywords?: string;
  shortcut?: string;
}

export interface SpecialCharacterEntry {
  id: string;
  char: string;
  previewLabel?: string;
  name: string;
  codepoint: string;
  shortcut: string;
  autoCorrect?: string;
  description: string;
}

export const SYMBOL_CATEGORIES: SymbolCategoryName[] = [
  'Common',
  'Quotes & Punctuation',
  'Currency & Legal',
  'Latin & Accented',
  'Greek',
  'Math & Logic',
  'Arrows',
  'Shapes & Box Drawing',
  'Wingdings & Dingbats',
  'Technical & UI',
  'IPA & Cyrillic',
];

const formatCodepoint = (char: string): string => {
  const cp = char.codePointAt(0);
  if (cp === undefined) return 'U+0000';
  return `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
};

const makeEntry = (
  char: string,
  name: string,
  category: SymbolCategoryName,
  subgroup: string,
  keywords?: string,
  shortcut?: string
): SymbolEntry => ({
  char,
  name,
  codepoint: formatCodepoint(char),
  category,
  subgroup,
  keywords,
  shortcut,
});

const RAW_SYMBOL_CATALOG: SymbolEntry[] = [
  // ===================== COMMON =====================
  makeEntry('©', 'Copyright Sign', 'Common', 'Marks & Legal', 'copyright (c)', 'Alt+Ctrl+C'),
  makeEntry('®', 'Registered Sign', 'Common', 'Marks & Legal', 'registered trademark (r)', 'Alt+Ctrl+R'),
  makeEntry('™', 'Trade Mark Sign', 'Common', 'Marks & Legal', 'trademark (tm)', 'Alt+Ctrl+T'),
  makeEntry('§', 'Section Sign', 'Common', 'Marks & Legal', 'section clause legal'),
  makeEntry('¶', 'Pilcrow / Paragraph Sign', 'Common', 'Marks & Legal', 'paragraph pilcrow formatting'),
  makeEntry('№', 'Numero Sign', 'Common', 'Marks & Legal', 'number no numero'),
  makeEntry('•', 'Bullet', 'Common', 'Bullets & Separators', 'bullet dot list'),
  makeEntry('◦', 'White Bullet', 'Common', 'Bullets & Separators', 'hollow bullet circle'),
  makeEntry('‣', 'Triangular Bullet', 'Common', 'Bullets & Separators', 'triangle bullet'),
  makeEntry('⁃', 'Hyphen Bullet', 'Common', 'Bullets & Separators', 'hyphen bullet dash'),
  makeEntry('·', 'Middle Dot', 'Common', 'Bullets & Separators', 'interpunct center dot'),
  makeEntry('…', 'Horizontal Ellipsis', 'Common', 'Marks & Legal', 'dots ellipsis ...', 'Alt+Ctrl+.'),
  makeEntry('—', 'Em Dash', 'Common', 'Dashes & Marks', 'em dash long dash ---', 'Alt+Ctrl+Num-'),
  makeEntry('–', 'En Dash', 'Common', 'Dashes & Marks', 'en dash range --', 'Ctrl+Num-'),
  makeEntry('†', 'Dagger', 'Common', 'Dashes & Marks', 'dagger footnote obelisk'),
  makeEntry('‡', 'Double Dagger', 'Common', 'Dashes & Marks', 'double dagger footnote'),
  makeEntry('‰', 'Per Mille Sign', 'Common', 'Measurements & Marks', 'per mille permille thousand'),
  makeEntry('‱', 'Per Ten Thousand Sign', 'Common', 'Measurements & Marks', 'basis point per myriad'),
  makeEntry('°', 'Degree Sign', 'Common', 'Measurements & Marks', 'degree angle temperature'),
  makeEntry('′', 'Prime (Feet / Minutes)', 'Common', 'Measurements & Marks', 'prime feet minutes'),
  makeEntry('″', 'Double Prime (Inches / Seconds)', 'Common', 'Measurements & Marks', 'double prime inches seconds'),
  makeEntry('‴', 'Triple Prime', 'Common', 'Measurements & Marks', 'triple prime'),
  makeEntry('¡', 'Inverted Exclamation Mark', 'Common', 'Dashes & Marks', 'spanish exclamation upside down'),
  makeEntry('¿', 'Inverted Question Mark', 'Common', 'Dashes & Marks', 'spanish question upside down'),
  makeEntry('‽', 'Interrobang', 'Common', 'Dashes & Marks', 'exclamation question interrobang'),
  makeEntry('¦', 'Broken Bar', 'Common', 'Dashes & Marks', 'pipe broken vertical bar'),
  makeEntry('◊', 'Lozenge', 'Common', 'Bullets & Separators', 'diamond lozenge'),
  makeEntry('※', 'Reference Mark', 'Common', 'Bullets & Separators', 'kome reference note'),
  makeEntry('⁂', 'Asterism', 'Common', 'Bullets & Separators', 'three stars section break'),
  makeEntry('✓', 'Check Mark', 'Common', 'Checkmarks & Status', 'check tick yes done'),
  makeEntry('✔', 'Heavy Check Mark', 'Common', 'Checkmarks & Status', 'bold check tick'),
  makeEntry('✕', 'Multiplication X / Cross', 'Common', 'Checkmarks & Status', 'cross cancel x close'),
  // Fractions & Ordinal Superscripts in Common
  makeEntry('½', 'Vulgar Fraction One Half', 'Common', 'Common Fractions', 'half 1/2 fraction'),
  makeEntry('⅓', 'Vulgar Fraction One Third', 'Common', 'Common Fractions', 'third 1/3 fraction'),
  makeEntry('⅔', 'Vulgar Fraction Two Thirds', 'Common', 'Common Fractions', 'two thirds 2/3 fraction'),
  makeEntry('¼', 'Vulgar Fraction One Quarter', 'Common', 'Common Fractions', 'quarter 1/4 fraction'),
  makeEntry('¾', 'Vulgar Fraction Three Quarters', 'Common', 'Common Fractions', 'three quarters 3/4 fraction'),
  makeEntry('⅕', 'Vulgar Fraction One Fifth', 'Common', 'Common Fractions', '1/5 fraction'),
  makeEntry('⅖', 'Vulgar Fraction Two Fifths', 'Common', 'Common Fractions', '2/5 fraction'),
  makeEntry('⅗', 'Vulgar Fraction Three Fifths', 'Common', 'Common Fractions', '3/5 fraction'),
  makeEntry('⅘', 'Vulgar Fraction Four Fifths', 'Common', 'Common Fractions', '4/5 fraction'),
  makeEntry('⅙', 'Vulgar Fraction One Sixth', 'Common', 'Common Fractions', '1/6 fraction'),
  makeEntry('⅚', 'Vulgar Fraction Five Sixths', 'Common', 'Common Fractions', '5/6 fraction'),
  makeEntry('⅛', 'Vulgar Fraction One Eighth', 'Common', 'Common Fractions', '1/8 fraction'),
  makeEntry('⅜', 'Vulgar Fraction Three Eighths', 'Common', 'Common Fractions', '3/8 fraction'),
  makeEntry('⅝', 'Vulgar Fraction Five Eighths', 'Common', 'Common Fractions', '5/8 fraction'),
  makeEntry('⅞', 'Vulgar Fraction Seven Eighths', 'Common', 'Common Fractions', '7/8 fraction'),

  // ===================== QUOTES & PUNCTUATION =====================
  makeEntry('‘', 'Left Single Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'single quote open smart'),
  makeEntry('’', 'Right Single Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'single quote close apostrophe smart'),
  makeEntry('‚', 'Single Low-9 Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'low quote german'),
  makeEntry('‛', 'Single High-Reversed-9 Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'reversed quote'),
  makeEntry('“', 'Left Double Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'double quote open smart'),
  makeEntry('”', 'Right Double Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'double quote close smart'),
  makeEntry('„', 'Double Low-9 Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'low double quote german'),
  makeEntry('‟', 'Double High-Reversed-9 Quotation Mark', 'Quotes & Punctuation', 'Quotation Marks', 'reversed double quote'),
  makeEntry('‹', 'Single Left-Pointing Angle Quotation Mark', 'Quotes & Punctuation', 'Guillemets', 'guillemet single left chevron'),
  makeEntry('›', 'Single Right-Pointing Angle Quotation Mark', 'Quotes & Punctuation', 'Guillemets', 'guillemet single right chevron'),
  makeEntry('«', 'Left-Pointing Double Angle Quotation Mark', 'Quotes & Punctuation', 'Guillemets', 'guillemet double left french'),
  makeEntry('»', 'Right-Pointing Double Angle Quotation Mark', 'Quotes & Punctuation', 'Guillemets', 'guillemet double right french'),
  makeEntry('‐', 'Hyphen', 'Quotes & Punctuation', 'Hyphens & Dashes', 'hyphen'),
  makeEntry('‑', 'Non-Breaking Hyphen', 'Quotes & Punctuation', 'Hyphens & Dashes', 'nonbreaking hyphen', 'Ctrl+Shift+-'),
  makeEntry('‒', 'Figure Dash', 'Quotes & Punctuation', 'Hyphens & Dashes', 'figure dash phone number'),
  makeEntry('―', 'Horizontal Bar', 'Quotes & Punctuation', 'Hyphens & Dashes', 'quotation dash bar'),
  makeEntry('‖', 'Double Vertical Line', 'Quotes & Punctuation', 'Brackets & Editorial', 'norm double pipe'),
  makeEntry('‗', 'Double Low Line', 'Quotes & Punctuation', 'Brackets & Editorial', 'double underline'),
  makeEntry('․', 'One Dot Leader', 'Quotes & Punctuation', 'Editorial Marks', 'dot leader'),
  makeEntry('‥', 'Two Dot Leader', 'Quotes & Punctuation', 'Editorial Marks', 'two dots'),
  makeEntry('‼', 'Double Exclamation Mark', 'Quotes & Punctuation', 'Editorial Marks', 'double bang !!'),
  makeEntry('⁇', 'Double Question Mark', 'Quotes & Punctuation', 'Editorial Marks', 'double question ??'),
  makeEntry('⁈', 'Question Exclamation Mark', 'Quotes & Punctuation', 'Editorial Marks', 'question exclamation ?!'),
  makeEntry('⁉', 'Exclamation Question Mark', 'Quotes & Punctuation', 'Editorial Marks', 'exclamation question !?'),
  makeEntry('‾', 'Overline', 'Quotes & Punctuation', 'Editorial Marks', 'overline macron'),
  makeEntry('⁄', 'Fraction Slash', 'Quotes & Punctuation', 'Editorial Marks', 'solidus fraction slash'),
  makeEntry('⟨', 'Mathematical Left Angle Bracket', 'Quotes & Punctuation', 'Brackets & Editorial', 'left angle bracket bra'),
  makeEntry('⟩', 'Mathematical Right Angle Bracket', 'Quotes & Punctuation', 'Brackets & Editorial', 'right angle bracket ket'),
  makeEntry('⌈', 'Left Ceiling', 'Quotes & Punctuation', 'Brackets & Editorial', 'ceiling bracket'),
  makeEntry('⌉', 'Right Ceiling', 'Quotes & Punctuation', 'Brackets & Editorial', 'ceiling bracket'),
  makeEntry('⌊', 'Left Floor', 'Quotes & Punctuation', 'Brackets & Editorial', 'floor bracket'),
  makeEntry('⌋', 'Right Floor', 'Quotes & Punctuation', 'Brackets & Editorial', 'floor bracket'),
  makeEntry('⁅', 'Left Square Bracket with Quill', 'Quotes & Punctuation', 'Brackets & Editorial', 'quill bracket'),
  makeEntry('⁆', 'Right Square Bracket with Quill', 'Quotes & Punctuation', 'Brackets & Editorial', 'quill bracket'),
  makeEntry('⁎', 'Low Asterisk', 'Quotes & Punctuation', 'Editorial Marks', 'asterisk'),
  makeEntry('⁑', 'Two Asterisks Aligned Vertically', 'Quotes & Punctuation', 'Editorial Marks', 'double asterisk'),

  // ===================== CURRENCY & LEGAL =====================
  makeEntry('$', 'Dollar Sign', 'Currency & Legal', 'Major Currencies', 'usd dollar currency'),
  makeEntry('¢', 'Cent Sign', 'Currency & Legal', 'Major Currencies', 'cent penny'),
  makeEntry('€', 'Euro Sign', 'Currency & Legal', 'Major Currencies', 'eur euro', 'Alt+Ctrl+E'),
  makeEntry('£', 'Pound Sterling Sign', 'Currency & Legal', 'Major Currencies', 'gbp pound sterling'),
  makeEntry('¥', 'Yen / Yuan Sign', 'Currency & Legal', 'Major Currencies', 'jpy cny yen yuan'),
  makeEntry('₹', 'Indian Rupee Sign', 'Currency & Legal', 'Major Currencies', 'inr rupee'),
  makeEntry('₩', 'Won Sign', 'Currency & Legal', 'Major Currencies', 'krw won korea'),
  makeEntry('CHF', 'Swiss Franc', 'Currency & Legal', 'Major Currencies', 'chf franc swiss'),
  makeEntry('₿', 'Bitcoin Sign', 'Currency & Legal', 'Major Currencies', 'btc bitcoin crypto'),
  makeEntry('¤', 'Currency Sign (Generic)', 'Currency & Legal', 'World Currencies', 'generic currency'),
  makeEntry('₣', 'French Franc Sign', 'Currency & Legal', 'World Currencies', 'franc'),
  makeEntry('₤', 'Lira Sign', 'Currency & Legal', 'World Currencies', 'lira'),
  makeEntry('₧', 'Peseta Sign', 'Currency & Legal', 'World Currencies', 'peseta'),
  makeEntry('₨', 'Rupee Sign', 'Currency & Legal', 'World Currencies', 'rupee pkr lkr'),
  makeEntry('₪', 'New Sheqel Sign', 'Currency & Legal', 'World Currencies', 'ils shekel israel'),
  makeEntry('₫', 'Dong Sign', 'Currency & Legal', 'World Currencies', 'vnd dong vietnam'),
  makeEntry('₭', 'Kip Sign', 'Currency & Legal', 'World Currencies', 'lak kip laos'),
  makeEntry('₮', 'Tugrik Sign', 'Currency & Legal', 'World Currencies', 'mnt tugrik mongolia'),
  makeEntry('₱', 'Peso Sign', 'Currency & Legal', 'World Currencies', 'php peso philippines'),
  makeEntry('₲', 'Guarani Sign', 'Currency & Legal', 'World Currencies', 'pyg guarani'),
  makeEntry('₳', 'Austral Sign', 'Currency & Legal', 'World Currencies', 'austral'),
  makeEntry('₴', 'Hryvnia Sign', 'Currency & Legal', 'World Currencies', 'uah hryvnia ukraine'),
  makeEntry('₵', 'Cedi Sign', 'Currency & Legal', 'World Currencies', 'ghs cedi ghana'),
  makeEntry('₸', 'Tenge Sign', 'Currency & Legal', 'World Currencies', 'kzt tenge kazakhstan'),
  makeEntry('₺', 'Turkish Lira Sign', 'Currency & Legal', 'World Currencies', 'try turkish lira'),
  makeEntry('₼', 'Manat Sign', 'Currency & Legal', 'World Currencies', 'azn manat'),
  makeEntry('₽', 'Ruble Sign', 'Currency & Legal', 'World Currencies', 'rub ruble'),
  makeEntry('₾', 'Lari Sign', 'Currency & Legal', 'World Currencies', 'gel lari georgia'),
  makeEntry('฿', 'Thai Baht Sign', 'Currency & Legal', 'World Currencies', 'thb baht thailand'),
  makeEntry('₡', 'Colon Sign', 'Currency & Legal', 'World Currencies', 'crc colon'),
  makeEntry('₦', 'Naira Sign', 'Currency & Legal', 'World Currencies', 'ngn naira nigeria'),
  makeEntry('ƒ', 'Latin Small Letter F with Hook (Florin / Guilder)', 'Currency & Legal', 'World Currencies', 'florin guilder function'),
  makeEntry('℗', 'Sound Recording Copyright', 'Currency & Legal', 'Legal & Ordinals', 'phonogram sound copyright'),
  makeEntry('℠', 'Service Mark', 'Currency & Legal', 'Legal & Ordinals', 'sm service mark'),
  makeEntry('ª', 'Feminine Ordinal Indicator', 'Currency & Legal', 'Legal & Ordinals', 'ordinal spanish portuguese'),
  makeEntry('º', 'Masculine Ordinal Indicator', 'Currency & Legal', 'Legal & Ordinals', 'ordinal spanish portuguese'),
  makeEntry('℡', 'Telephone Sign', 'Currency & Legal', 'Legal & Ordinals', 'tel telephone'),
  makeEntry('℻', 'Facsimile Sign', 'Currency & Legal', 'Legal & Ordinals', 'fax'),

  // ===================== LATIN & ACCENTED =====================
  // Latin-1 Uppercase
  makeEntry('À', 'Latin Capital Letter A with Grave', 'Latin & Accented', 'Latin-1 Uppercase', 'a grave accent'),
  makeEntry('Á', 'Latin Capital Letter A with Acute', 'Latin & Accented', 'Latin-1 Uppercase', 'a acute accent'),
  makeEntry('Â', 'Latin Capital Letter A with Circumflex', 'Latin & Accented', 'Latin-1 Uppercase', 'a circumflex accent'),
  makeEntry('Ã', 'Latin Capital Letter A with Tilde', 'Latin & Accented', 'Latin-1 Uppercase', 'a tilde accent'),
  makeEntry('Ä', 'Latin Capital Letter A with Diaeresis', 'Latin & Accented', 'Latin-1 Uppercase', 'a umlaut diaeresis'),
  makeEntry('Å', 'Latin Capital Letter A with Ring Above', 'Latin & Accented', 'Latin-1 Uppercase', 'a ring nordic'),
  makeEntry('Æ', 'Latin Capital Letter AE', 'Latin & Accented', 'Latin-1 Uppercase', 'ae ligature'),
  makeEntry('Ç', 'Latin Capital Letter C with Cedilla', 'Latin & Accented', 'Latin-1 Uppercase', 'c cedilla'),
  makeEntry('È', 'Latin Capital Letter E with Grave', 'Latin & Accented', 'Latin-1 Uppercase', 'e grave'),
  makeEntry('É', 'Latin Capital Letter E with Acute', 'Latin & Accented', 'Latin-1 Uppercase', 'e acute'),
  makeEntry('Ê', 'Latin Capital Letter E with Circumflex', 'Latin & Accented', 'Latin-1 Uppercase', 'e circumflex'),
  makeEntry('Ë', 'Latin Capital Letter E with Diaeresis', 'Latin & Accented', 'Latin-1 Uppercase', 'e umlaut diaeresis'),
  makeEntry('Ì', 'Latin Capital Letter I with Grave', 'Latin & Accented', 'Latin-1 Uppercase', 'i grave'),
  makeEntry('Í', 'Latin Capital Letter I with Acute', 'Latin & Accented', 'Latin-1 Uppercase', 'i acute'),
  makeEntry('Î', 'Latin Capital Letter I with Circumflex', 'Latin & Accented', 'Latin-1 Uppercase', 'i circumflex'),
  makeEntry('Ï', 'Latin Capital Letter I with Diaeresis', 'Latin & Accented', 'Latin-1 Uppercase', 'i umlaut'),
  makeEntry('Ð', 'Latin Capital Letter Eth', 'Latin & Accented', 'Latin-1 Uppercase', 'eth icelandic'),
  makeEntry('Ñ', 'Latin Capital Letter N with Tilde', 'Latin & Accented', 'Latin-1 Uppercase', 'n tilde spanish'),
  makeEntry('Ò', 'Latin Capital Letter O with Grave', 'Latin & Accented', 'Latin-1 Uppercase', 'o grave'),
  makeEntry('Ó', 'Latin Capital Letter O with Acute', 'Latin & Accented', 'Latin-1 Uppercase', 'o acute'),
  makeEntry('Ô', 'Latin Capital Letter O with Circumflex', 'Latin & Accented', 'Latin-1 Uppercase', 'o circumflex'),
  makeEntry('Õ', 'Latin Capital Letter O with Tilde', 'Latin & Accented', 'Latin-1 Uppercase', 'o tilde'),
  makeEntry('Ö', 'Latin Capital Letter O with Diaeresis', 'Latin & Accented', 'Latin-1 Uppercase', 'o umlaut'),
  makeEntry('Ø', 'Latin Capital Letter O with Stroke', 'Latin & Accented', 'Latin-1 Uppercase', 'o slash nordic'),
  makeEntry('Ù', 'Latin Capital Letter U with Grave', 'Latin & Accented', 'Latin-1 Uppercase', 'u grave'),
  makeEntry('Ú', 'Latin Capital Letter U with Acute', 'Latin & Accented', 'Latin-1 Uppercase', 'u acute'),
  makeEntry('Û', 'Latin Capital Letter U with Circumflex', 'Latin & Accented', 'Latin-1 Uppercase', 'u circumflex'),
  makeEntry('Ü', 'Latin Capital Letter U with Diaeresis', 'Latin & Accented', 'Latin-1 Uppercase', 'u umlaut'),
  makeEntry('Ý', 'Latin Capital Letter Y with Acute', 'Latin & Accented', 'Latin-1 Uppercase', 'y acute'),
  makeEntry('Þ', 'Latin Capital Letter Thorn', 'Latin & Accented', 'Latin-1 Uppercase', 'thorn icelandic'),
  makeEntry('ß', 'Latin Small Letter Sharp S (Eszett)', 'Latin & Accented', 'Latin-1 Lowercase', 'eszett german ss'),
  // Latin-1 Lowercase
  makeEntry('à', 'Latin Small Letter A with Grave', 'Latin & Accented', 'Latin-1 Lowercase', 'a grave'),
  makeEntry('á', 'Latin Small Letter A with Acute', 'Latin & Accented', 'Latin-1 Lowercase', 'a acute'),
  makeEntry('â', 'Latin Small Letter A with Circumflex', 'Latin & Accented', 'Latin-1 Lowercase', 'a circumflex'),
  makeEntry('ã', 'Latin Small Letter A with Tilde', 'Latin & Accented', 'Latin-1 Lowercase', 'a tilde'),
  makeEntry('ä', 'Latin Small Letter A with Diaeresis', 'Latin & Accented', 'Latin-1 Lowercase', 'a umlaut'),
  makeEntry('å', 'Latin Small Letter A with Ring Above', 'Latin & Accented', 'Latin-1 Lowercase', 'a ring'),
  makeEntry('æ', 'Latin Small Letter AE', 'Latin & Accented', 'Latin-1 Lowercase', 'ae ligature'),
  makeEntry('ç', 'Latin Small Letter C with Cedilla', 'Latin & Accented', 'Latin-1 Lowercase', 'c cedilla'),
  makeEntry('è', 'Latin Small Letter E with Grave', 'Latin & Accented', 'Latin-1 Lowercase', 'e grave'),
  makeEntry('é', 'Latin Small Letter E with Acute', 'Latin & Accented', 'Latin-1 Lowercase', 'e acute cafe resume'),
  makeEntry('ê', 'Latin Small Letter E with Circumflex', 'Latin & Accented', 'Latin-1 Lowercase', 'e circumflex'),
  makeEntry('ë', 'Latin Small Letter E with Diaeresis', 'Latin & Accented', 'Latin-1 Lowercase', 'e umlaut'),
  makeEntry('ì', 'Latin Small Letter I with Grave', 'Latin & Accented', 'Latin-1 Lowercase', 'i grave'),
  makeEntry('í', 'Latin Small Letter I with Acute', 'Latin & Accented', 'Latin-1 Lowercase', 'i acute'),
  makeEntry('î', 'Latin Small Letter I with Circumflex', 'Latin & Accented', 'Latin-1 Lowercase', 'i circumflex'),
  makeEntry('ï', 'Latin Small Letter I with Diaeresis', 'Latin & Accented', 'Latin-1 Lowercase', 'i umlaut naive'),
  makeEntry('ð', 'Latin Small Letter Eth', 'Latin & Accented', 'Latin-1 Lowercase', 'eth'),
  makeEntry('ñ', 'Latin Small Letter N with Tilde', 'Latin & Accented', 'Latin-1 Lowercase', 'n tilde spanish'),
  makeEntry('ò', 'Latin Small Letter O with Grave', 'Latin & Accented', 'Latin-1 Lowercase', 'o grave'),
  makeEntry('ó', 'Latin Small Letter O with Acute', 'Latin & Accented', 'Latin-1 Lowercase', 'o acute'),
  makeEntry('ô', 'Latin Small Letter O with Circumflex', 'Latin & Accented', 'Latin-1 Lowercase', 'o circumflex'),
  makeEntry('õ', 'Latin Small Letter O with Tilde', 'Latin & Accented', 'Latin-1 Lowercase', 'o tilde'),
  makeEntry('ö', 'Latin Small Letter O with Diaeresis', 'Latin & Accented', 'Latin-1 Lowercase', 'o umlaut'),
  makeEntry('ø', 'Latin Small Letter O with Stroke', 'Latin & Accented', 'Latin-1 Lowercase', 'o slash'),
  makeEntry('ù', 'Latin Small Letter U with Grave', 'Latin & Accented', 'Latin-1 Lowercase', 'u grave'),
  makeEntry('ú', 'Latin Small Letter U with Acute', 'Latin & Accented', 'Latin-1 Lowercase', 'u acute'),
  makeEntry('û', 'Latin Small Letter U with Circumflex', 'Latin & Accented', 'Latin-1 Lowercase', 'u circumflex'),
  makeEntry('ü', 'Latin Small Letter U with Diaeresis', 'Latin & Accented', 'Latin-1 Lowercase', 'u umlaut'),
  makeEntry('ý', 'Latin Small Letter Y with Acute', 'Latin & Accented', 'Latin-1 Lowercase', 'y acute'),
  makeEntry('þ', 'Latin Small Letter Thorn', 'Latin & Accented', 'Latin-1 Lowercase', 'thorn'),
  makeEntry('ÿ', 'Latin Small Letter Y with Diaeresis', 'Latin & Accented', 'Latin-1 Lowercase', 'y umlaut'),
  // Latin Extended-A Highlights
  makeEntry('Ā', 'Latin Capital Letter A with Macron', 'Latin & Accented', 'Latin Extended', 'macron'),
  makeEntry('ā', 'Latin Small Letter A with Macron', 'Latin & Accented', 'Latin Extended', 'macron'),
  makeEntry('Ć', 'Latin Capital Letter C with Acute', 'Latin & Accented', 'Latin Extended', 'c acute polish'),
  makeEntry('ć', 'Latin Small Letter C with Acute', 'Latin & Accented', 'Latin Extended', 'c acute'),
  makeEntry('Č', 'Latin Capital Letter C with Caron', 'Latin & Accented', 'Latin Extended', 'c caron hacek czech'),
  makeEntry('č', 'Latin Small Letter C with Caron', 'Latin & Accented', 'Latin Extended', 'c caron'),
  makeEntry('Đ', 'Latin Capital Letter D with Stroke', 'Latin & Accented', 'Latin Extended', 'd stroke'),
  makeEntry('đ', 'Latin Small Letter D with Stroke', 'Latin & Accented', 'Latin Extended', 'd stroke'),
  makeEntry('Ē', 'Latin Capital Letter E with Macron', 'Latin & Accented', 'Latin Extended', 'e macron'),
  makeEntry('ē', 'Latin Small Letter E with Macron', 'Latin & Accented', 'Latin Extended', 'e macron'),
  makeEntry('Ğ', 'Latin Capital Letter G with Breve', 'Latin & Accented', 'Latin Extended', 'g breve turkish'),
  makeEntry('ğ', 'Latin Small Letter G with Breve', 'Latin & Accented', 'Latin Extended', 'g breve'),
  makeEntry('İ', 'Latin Capital Letter I with Dot Above', 'Latin & Accented', 'Latin Extended', 'i dot turkish'),
  makeEntry('ı', 'Latin Small Letter Dotless I', 'Latin & Accented', 'Latin Extended', 'dotless i turkish'),
  makeEntry('Ī', 'Latin Capital Letter I with Macron', 'Latin & Accented', 'Latin Extended', 'i macron'),
  makeEntry('ī', 'Latin Small Letter I with Macron', 'Latin & Accented', 'Latin Extended', 'i macron'),
  makeEntry('Ł', 'Latin Capital Letter L with Stroke', 'Latin & Accented', 'Latin Extended', 'l stroke polish'),
  makeEntry('ł', 'Latin Small Letter L with Stroke', 'Latin & Accented', 'Latin Extended', 'l stroke polish'),
  makeEntry('Ń', 'Latin Capital Letter N with Acute', 'Latin & Accented', 'Latin Extended', 'n acute'),
  makeEntry('ń', 'Latin Small Letter N with Acute', 'Latin & Accented', 'Latin Extended', 'n acute'),
  makeEntry('Ō', 'Latin Capital Letter O with Macron', 'Latin & Accented', 'Latin Extended', 'o macron'),
  makeEntry('ō', 'Latin Small Letter O with Macron', 'Latin & Accented', 'Latin Extended', 'o macron'),
  makeEntry('Œ', 'Latin Capital Ligature OE', 'Latin & Accented', 'Latin Extended', 'oe ligature french'),
  makeEntry('œ', 'Latin Small Ligature OE', 'Latin & Accented', 'Latin Extended', 'oe ligature french'),
  makeEntry('Ř', 'Latin Capital Letter R with Caron', 'Latin & Accented', 'Latin Extended', 'r caron czech'),
  makeEntry('ř', 'Latin Small Letter R with Caron', 'Latin & Accented', 'Latin Extended', 'r caron'),
  makeEntry('Ś', 'Latin Capital Letter S with Acute', 'Latin & Accented', 'Latin Extended', 's acute'),
  makeEntry('ś', 'Latin Small Letter S with Acute', 'Latin & Accented', 'Latin Extended', 's acute'),
  makeEntry('Ş', 'Latin Capital Letter S with Cedilla', 'Latin & Accented', 'Latin Extended', 's cedilla turkish'),
  makeEntry('ş', 'Latin Small Letter S with Cedilla', 'Latin & Accented', 'Latin Extended', 's cedilla'),
  makeEntry('Š', 'Latin Capital Letter S with Caron', 'Latin & Accented', 'Latin Extended', 's caron'),
  makeEntry('š', 'Latin Small Letter S with Caron', 'Latin & Accented', 'Latin Extended', 's caron'),
  makeEntry('Ū', 'Latin Capital Letter U with Macron', 'Latin & Accented', 'Latin Extended', 'u macron'),
  makeEntry('ū', 'Latin Small Letter U with Macron', 'Latin & Accented', 'Latin Extended', 'u macron'),
  makeEntry('Ÿ', 'Latin Capital Letter Y with Diaeresis', 'Latin & Accented', 'Latin Extended', 'y umlaut'),
  makeEntry('Ź', 'Latin Capital Letter Z with Acute', 'Latin & Accented', 'Latin Extended', 'z acute'),
  makeEntry('ź', 'Latin Small Letter Z with Acute', 'Latin & Accented', 'Latin Extended', 'z acute'),
  makeEntry('Ż', 'Latin Capital Letter Z with Dot Above', 'Latin & Accented', 'Latin Extended', 'z dot'),
  makeEntry('ż', 'Latin Small Letter Z with Dot Above', 'Latin & Accented', 'Latin Extended', 'z dot'),
  makeEntry('Ž', 'Latin Capital Letter Z with Caron', 'Latin & Accented', 'Latin Extended', 'z caron'),
  makeEntry('ž', 'Latin Small Letter Z with Caron', 'Latin & Accented', 'Latin Extended', 'z caron'),

  // ===================== GREEK =====================
  // Uppercase (24)
  makeEntry('Α', 'Greek Capital Letter Alpha', 'Greek', 'Greek Uppercase', 'alpha capital'),
  makeEntry('Β', 'Greek Capital Letter Beta', 'Greek', 'Greek Uppercase', 'beta capital'),
  makeEntry('Γ', 'Greek Capital Letter Gamma', 'Greek', 'Greek Uppercase', 'gamma capital'),
  makeEntry('Δ', 'Greek Capital Letter Delta', 'Greek', 'Greek Uppercase', 'delta change increment'),
  makeEntry('Ε', 'Greek Capital Letter Epsilon', 'Greek', 'Greek Uppercase', 'epsilon capital'),
  makeEntry('Ζ', 'Greek Capital Letter Zeta', 'Greek', 'Greek Uppercase', 'zeta capital'),
  makeEntry('Η', 'Greek Capital Letter Eta', 'Greek', 'Greek Uppercase', 'eta capital'),
  makeEntry('Θ', 'Greek Capital Letter Theta', 'Greek', 'Greek Uppercase', 'theta capital angle'),
  makeEntry('Ι', 'Greek Capital Letter Iota', 'Greek', 'Greek Uppercase', 'iota capital'),
  makeEntry('Κ', 'Greek Capital Letter Kappa', 'Greek', 'Greek Uppercase', 'kappa capital'),
  makeEntry('Λ', 'Greek Capital Letter Lambda', 'Greek', 'Greek Uppercase', 'lambda capital'),
  makeEntry('Μ', 'Greek Capital Letter Mu', 'Greek', 'Greek Uppercase', 'mu capital'),
  makeEntry('Ν', 'Greek Capital Letter Nu', 'Greek', 'Greek Uppercase', 'nu capital'),
  makeEntry('Ξ', 'Greek Capital Letter Xi', 'Greek', 'Greek Uppercase', 'xi capital'),
  makeEntry('Ο', 'Greek Capital Letter Omicron', 'Greek', 'Greek Uppercase', 'omicron capital'),
  makeEntry('Π', 'Greek Capital Letter Pi', 'Greek', 'Greek Uppercase', 'pi product capital'),
  makeEntry('Ρ', 'Greek Capital Letter Rho', 'Greek', 'Greek Uppercase', 'rho capital'),
  makeEntry('Σ', 'Greek Capital Letter Sigma', 'Greek', 'Greek Uppercase', 'sigma sum capital'),
  makeEntry('Τ', 'Greek Capital Letter Tau', 'Greek', 'Greek Uppercase', 'tau capital'),
  makeEntry('Υ', 'Greek Capital Letter Upsilon', 'Greek', 'Greek Uppercase', 'upsilon capital'),
  makeEntry('Φ', 'Greek Capital Letter Phi', 'Greek', 'Greek Uppercase', 'phi capital'),
  makeEntry('Χ', 'Greek Capital Letter Chi', 'Greek', 'Greek Uppercase', 'chi capital'),
  makeEntry('Ψ', 'Greek Capital Letter Psi', 'Greek', 'Greek Uppercase', 'psi capital'),
  makeEntry('Ω', 'Greek Capital Letter Omega (Ohm)', 'Greek', 'Greek Uppercase', 'omega ohm resistance'),
  // Lowercase (25)
  makeEntry('α', 'Greek Small Letter Alpha', 'Greek', 'Greek Lowercase', 'alpha'),
  makeEntry('β', 'Greek Small Letter Beta', 'Greek', 'Greek Lowercase', 'beta'),
  makeEntry('γ', 'Greek Small Letter Gamma', 'Greek', 'Greek Lowercase', 'gamma'),
  makeEntry('δ', 'Greek Small Letter Delta', 'Greek', 'Greek Lowercase', 'delta'),
  makeEntry('ε', 'Greek Small Letter Epsilon', 'Greek', 'Greek Lowercase', 'epsilon'),
  makeEntry('ζ', 'Greek Small Letter Zeta', 'Greek', 'Greek Lowercase', 'zeta'),
  makeEntry('η', 'Greek Small Letter Eta', 'Greek', 'Greek Lowercase', 'eta'),
  makeEntry('θ', 'Greek Small Letter Theta', 'Greek', 'Greek Lowercase', 'theta angle'),
  makeEntry('ι', 'Greek Small Letter Iota', 'Greek', 'Greek Lowercase', 'iota'),
  makeEntry('κ', 'Greek Small Letter Kappa', 'Greek', 'Greek Lowercase', 'kappa'),
  makeEntry('λ', 'Greek Small Letter Lambda', 'Greek', 'Greek Lowercase', 'lambda wavelength'),
  makeEntry('μ', 'Greek Small Letter Mu (Micro)', 'Greek', 'Greek Lowercase', 'mu micro'),
  makeEntry('ν', 'Greek Small Letter Nu', 'Greek', 'Greek Lowercase', 'nu frequency'),
  makeEntry('ξ', 'Greek Small Letter Xi', 'Greek', 'Greek Lowercase', 'xi'),
  makeEntry('ο', 'Greek Small Letter Omicron', 'Greek', 'Greek Lowercase', 'omicron'),
  makeEntry('π', 'Greek Small Letter Pi', 'Greek', 'Greek Lowercase', 'pi 3.14'),
  makeEntry('ρ', 'Greek Small Letter Rho', 'Greek', 'Greek Lowercase', 'rho density'),
  makeEntry('ς', 'Greek Small Letter Final Sigma', 'Greek', 'Greek Lowercase', 'final sigma'),
  makeEntry('σ', 'Greek Small Letter Sigma', 'Greek', 'Greek Lowercase', 'sigma std deviation'),
  makeEntry('τ', 'Greek Small Letter Tau', 'Greek', 'Greek Lowercase', 'tau torque'),
  makeEntry('υ', 'Greek Small Letter Upsilon', 'Greek', 'Greek Lowercase', 'upsilon'),
  makeEntry('φ', 'Greek Small Letter Phi', 'Greek', 'Greek Lowercase', 'phi golden ratio'),
  makeEntry('χ', 'Greek Small Letter Chi', 'Greek', 'Greek Lowercase', 'chi'),
  makeEntry('ψ', 'Greek Small Letter Psi', 'Greek', 'Greek Lowercase', 'psi'),
  makeEntry('ω', 'Greek Small Letter Omega', 'Greek', 'Greek Lowercase', 'omega angular velocity'),
  // Variant Greek
  makeEntry('ϵ', 'Greek Lunate Epsilon Symbol', 'Greek', 'Greek Variants', 'epsilon varepsilon'),
  makeEntry('ϑ', 'Greek Theta Symbol', 'Greek', 'Greek Variants', 'theta vartheta'),
  makeEntry('ϰ', 'Greek Kappa Symbol', 'Greek', 'Greek Variants', 'kappa varkappa'),
  makeEntry('ϕ', 'Greek Phi Symbol', 'Greek', 'Greek Variants', 'phi varphi'),
  makeEntry('ϱ', 'Greek Rho Symbol', 'Greek', 'Greek Variants', 'rho varrho'),
  makeEntry('ϖ', 'Greek Pi Symbol', 'Greek', 'Greek Variants', 'pi varpi'),
  makeEntry('ϒ', 'Greek Upsilon with Hook Symbol', 'Greek', 'Greek Variants', 'upsilon'),

  // ===================== MATH & LOGIC =====================
  // Arithmetic & Operators
  makeEntry('±', 'Plus-Minus Sign', 'Math & Logic', 'Arithmetic & Operators', 'plus minus tolerance'),
  makeEntry('∓', 'Minus-or-Plus Sign', 'Math & Logic', 'Arithmetic & Operators', 'minus plus'),
  makeEntry('×', 'Multiplication Sign', 'Math & Logic', 'Arithmetic & Operators', 'multiply times cross'),
  makeEntry('÷', 'Division Sign', 'Math & Logic', 'Arithmetic & Operators', 'divide obelus'),
  makeEntry('−', 'Minus Sign', 'Math & Logic', 'Arithmetic & Operators', 'minus subtract'),
  makeEntry('∗', 'Asterisk Operator', 'Math & Logic', 'Arithmetic & Operators', 'star convolution'),
  makeEntry('∙', 'Bullet Operator', 'Math & Logic', 'Arithmetic & Operators', 'dot product'),
  makeEntry('∘', 'Ring Operator', 'Math & Logic', 'Arithmetic & Operators', 'composition function circle'),
  makeEntry('√', 'Square Root', 'Math & Logic', 'Arithmetic & Operators', 'sqrt radical root'),
  makeEntry('∛', 'Cube Root', 'Math & Logic', 'Arithmetic & Operators', 'cube root'),
  makeEntry('∜', 'Fourth Root', 'Math & Logic', 'Arithmetic & Operators', 'fourth root'),
  makeEntry('∞', 'Infinity', 'Math & Logic', 'Arithmetic & Operators', 'infinity forever'),
  makeEntry('∖', 'Set Minus', 'Math & Logic', 'Arithmetic & Operators', 'set difference backslash'),
  // Relations & Comparisons
  makeEntry('≠', 'Not Equal To', 'Math & Logic', 'Relations & Comparisons', 'not equal neq'),
  makeEntry('≈', 'Almost Equal To', 'Math & Logic', 'Relations & Comparisons', 'approximately approx'),
  makeEntry('≡', 'Identical To', 'Math & Logic', 'Relations & Comparisons', 'identical congruent equiv'),
  makeEntry('≢', 'Not Identical To', 'Math & Logic', 'Relations & Comparisons', 'not identical'),
  makeEntry('≅', 'Approximately Equal To / Congruent', 'Math & Logic', 'Relations & Comparisons', 'congruent isomorphism'),
  makeEntry('≇', 'Neither Approximately nor Actually Equal To', 'Math & Logic', 'Relations & Comparisons', 'not congruent'),
  makeEntry('∼', 'Tilde Operator (Similar)', 'Math & Logic', 'Relations & Comparisons', 'similar tilde'),
  makeEntry('≃', 'Asymptotically Equal To', 'Math & Logic', 'Relations & Comparisons', 'asymptotic'),
  makeEntry('≤', 'Less-Than or Equal To', 'Math & Logic', 'Relations & Comparisons', 'less equal leq'),
  makeEntry('≥', 'Greater-Than or Equal To', 'Math & Logic', 'Relations & Comparisons', 'greater equal geq'),
  makeEntry('≦', 'Less-Than Over Equal To', 'Math & Logic', 'Relations & Comparisons', 'less equal'),
  makeEntry('≧', 'Greater-Than Over Equal To', 'Math & Logic', 'Relations & Comparisons', 'greater equal'),
  makeEntry('≪', 'Much Less-Than', 'Math & Logic', 'Relations & Comparisons', 'much less'),
  makeEntry('≫', 'Much Greater-Than', 'Math & Logic', 'Relations & Comparisons', 'much greater'),
  makeEntry('≮', 'Not Less-Than', 'Math & Logic', 'Relations & Comparisons', 'not less'),
  makeEntry('≯', 'Not Greater-Than', 'Math & Logic', 'Relations & Comparisons', 'not greater'),
  makeEntry('≰', 'Neither Less-Than nor Equal To', 'Math & Logic', 'Relations & Comparisons', 'not less equal'),
  makeEntry('≱', 'Neither Greater-Than nor Equal To', 'Math & Logic', 'Relations & Comparisons', 'not greater equal'),
  makeEntry('∝', 'Proportional To', 'Math & Logic', 'Relations & Comparisons', 'proportional'),
  makeEntry('≔', 'Colon Equals (Defined As)', 'Math & Logic', 'Relations & Comparisons', 'assign definition'),
  makeEntry('≕', 'Equals Colon', 'Math & Logic', 'Relations & Comparisons', 'defined by'),
  makeEntry('≜', 'Delta Equal To (Defined As)', 'Math & Logic', 'Relations & Comparisons', 'triangle equal definition'),
  makeEntry('≟', 'Questioned Equal To', 'Math & Logic', 'Relations & Comparisons', 'question equal'),
  makeEntry('≺', 'Precedes', 'Math & Logic', 'Relations & Comparisons', 'precedes order'),
  makeEntry('≻', 'Succeeds', 'Math & Logic', 'Relations & Comparisons', 'succeeds order'),
  // Calculus & Big Operators
  makeEntry('∑', 'N-Ary Summation', 'Math & Logic', 'Calculus & Big Operators', 'sum sigma summation'),
  makeEntry('∏', 'N-Ary Product', 'Math & Logic', 'Calculus & Big Operators', 'product pi'),
  makeEntry('∐', 'N-Ary Coproduct', 'Math & Logic', 'Calculus & Big Operators', 'coproduct'),
  makeEntry('∫', 'Integral', 'Math & Logic', 'Calculus & Big Operators', 'integral calculus'),
  makeEntry('∬', 'Double Integral', 'Math & Logic', 'Calculus & Big Operators', 'double integral'),
  makeEntry('∭', 'Triple Integral', 'Math & Logic', 'Calculus & Big Operators', 'triple integral'),
  makeEntry('∮', 'Contour Integral', 'Math & Logic', 'Calculus & Big Operators', 'contour integral loop'),
  makeEntry('∯', 'Surface Integral', 'Math & Logic', 'Calculus & Big Operators', 'surface integral'),
  makeEntry('∰', 'Volume Integral', 'Math & Logic', 'Calculus & Big Operators', 'volume integral'),
  makeEntry('∂', 'Partial Differential', 'Math & Logic', 'Calculus & Big Operators', 'partial derivative'),
  makeEntry('∇', 'Nabla / Del Operator', 'Math & Logic', 'Calculus & Big Operators', 'nabla gradient divergence curl'),
  makeEntry('∆', 'Increment (Laplacian)', 'Math & Logic', 'Calculus & Big Operators', 'delta increment laplacian'),
  // Set Theory & Logic
  makeEntry('∀', 'For All', 'Math & Logic', 'Set Theory & Logic', 'forall universal quantifier'),
  makeEntry('∃', 'There Exists', 'Math & Logic', 'Set Theory & Logic', 'exists quantifier'),
  makeEntry('∄', 'There Does Not Exist', 'Math & Logic', 'Set Theory & Logic', 'not exists'),
  makeEntry('∈', 'Element Of', 'Math & Logic', 'Set Theory & Logic', 'in element member'),
  makeEntry('∉', 'Not an Element Of', 'Math & Logic', 'Set Theory & Logic', 'notin not member'),
  makeEntry('∋', 'Contains as Member', 'Math & Logic', 'Set Theory & Logic', 'contains member'),
  makeEntry('∌', 'Does Not Contain as Member', 'Math & Logic', 'Set Theory & Logic', 'not contains'),
  makeEntry('⊂', 'Subset Of', 'Math & Logic', 'Set Theory & Logic', 'subset proper'),
  makeEntry('⊃', 'Superset Of', 'Math & Logic', 'Set Theory & Logic', 'superset'),
  makeEntry('⊄', 'Not a Subset Of', 'Math & Logic', 'Set Theory & Logic', 'not subset'),
  makeEntry('⊅', 'Not a Superset Of', 'Math & Logic', 'Set Theory & Logic', 'not superset'),
  makeEntry('⊆', 'Subset of or Equal To', 'Math & Logic', 'Set Theory & Logic', 'subseteq'),
  makeEntry('⊇', 'Superset of or Equal To', 'Math & Logic', 'Set Theory & Logic', 'supseteq'),
  makeEntry('⊈', 'Neither a Subset of nor Equal To', 'Math & Logic', 'Set Theory & Logic', 'not subseteq'),
  makeEntry('⊉', 'Neither a Superset of nor Equal To', 'Math & Logic', 'Set Theory & Logic', 'not supseteq'),
  makeEntry('∪', 'Union', 'Math & Logic', 'Set Theory & Logic', 'union set or'),
  makeEntry('∩', 'Intersection', 'Math & Logic', 'Set Theory & Logic', 'intersection set and'),
  makeEntry('⋃', 'N-Ary Union', 'Math & Logic', 'Set Theory & Logic', 'big union'),
  makeEntry('⋂', 'N-Ary Intersection', 'Math & Logic', 'Set Theory & Logic', 'big intersection'),
  makeEntry('∅', 'Empty Set', 'Math & Logic', 'Set Theory & Logic', 'empty null set phi'),
  makeEntry('∧', 'Logical And', 'Math & Logic', 'Set Theory & Logic', 'and conjunction wedge'),
  makeEntry('∨', 'Logical Or', 'Math & Logic', 'Set Theory & Logic', 'or disjunction vee'),
  makeEntry('¬', 'Not Sign (Logical Negation)', 'Math & Logic', 'Set Theory & Logic', 'not negation logic'),
  makeEntry('⊻', 'Xor', 'Math & Logic', 'Set Theory & Logic', 'exclusive or xor'),
  makeEntry('⊕', 'Circled Plus (Direct Sum / XOR)', 'Math & Logic', 'Set Theory & Logic', 'oplus xor direct sum'),
  makeEntry('⊖', 'Circled Minus', 'Math & Logic', 'Set Theory & Logic', 'ominus'),
  makeEntry('⊗', 'Circled Times (Tensor Product)', 'Math & Logic', 'Set Theory & Logic', 'otimes tensor product'),
  makeEntry('⊘', 'Circled Division Slash', 'Math & Logic', 'Set Theory & Logic', 'oslash'),
  makeEntry('⊙', 'Circled Dot Operator', 'Math & Logic', 'Set Theory & Logic', 'odot hadamard'),
  makeEntry('⊢', 'Right Tack (Proves)', 'Math & Logic', 'Set Theory & Logic', 'turnstile proves'),
  makeEntry('⊣', 'Left Tack', 'Math & Logic', 'Set Theory & Logic', 'left turnstile'),
  makeEntry('⊤', 'Down Tack (Tautology / Top)', 'Math & Logic', 'Set Theory & Logic', 'top true tautology'),
  makeEntry('⊨', 'True / Models', 'Math & Logic', 'Set Theory & Logic', 'models entails'),
  makeEntry('∴', 'Therefore', 'Math & Logic', 'Set Theory & Logic', 'therefore proof'),
  makeEntry('∵', 'Because', 'Math & Logic', 'Set Theory & Logic', 'because since proof'),
  makeEntry('∎', 'End of Proof (QED / Tombstone)', 'Math & Logic', 'Set Theory & Logic', 'qed end proof halmos'),
  // Geometry
  makeEntry('∠', 'Angle', 'Math & Logic', 'Geometry', 'angle geometry'),
  makeEntry('∡', 'Measured Angle', 'Math & Logic', 'Geometry', 'measured angle'),
  makeEntry('∢', 'Spherical Angle', 'Math & Logic', 'Geometry', 'spherical angle'),
  makeEntry('∟', 'Right Angle', 'Math & Logic', 'Geometry', 'right angle 90'),
  makeEntry('⊥', 'Perpendicular / Up Tack', 'Math & Logic', 'Geometry', 'perpendicular orthogonal bottom'),
  makeEntry('∥', 'Parallel To', 'Math & Logic', 'Geometry', 'parallel lines'),
  makeEntry('∦', 'Not Parallel To', 'Math & Logic', 'Geometry', 'not parallel'),
  makeEntry('∶', 'Ratio', 'Math & Logic', 'Geometry', 'ratio colon'),
  makeEntry('∷', 'Proportion', 'Math & Logic', 'Geometry', 'proportion double colon'),
  // Letterlike & Number Sets
  makeEntry('ℕ', 'Double-Struck Capital N (Natural Numbers)', 'Math & Logic', 'Letterlike & Number Sets', 'natural numbers'),
  makeEntry('ℤ', 'Double-Struck Capital Z (Integers)', 'Math & Logic', 'Letterlike & Number Sets', 'integers'),
  makeEntry('ℚ', 'Double-Struck Capital Q (Rationals)', 'Math & Logic', 'Letterlike & Number Sets', 'rational numbers'),
  makeEntry('ℝ', 'Double-Struck Capital R (Real Numbers)', 'Math & Logic', 'Letterlike & Number Sets', 'real numbers'),
  makeEntry('ℂ', 'Double-Struck Capital C (Complex Numbers)', 'Math & Logic', 'Letterlike & Number Sets', 'complex numbers'),
  makeEntry('ℍ', 'Double-Struck Capital H (Quaternions)', 'Math & Logic', 'Letterlike & Number Sets', 'quaternions'),
  makeEntry('ℙ', 'Double-Struck Capital P (Primes / Probability)', 'Math & Logic', 'Letterlike & Number Sets', 'probability primes'),
  makeEntry('℘', 'Script Capital P (Power Set / Weierstrass)', 'Math & Logic', 'Letterlike & Number Sets', 'power set weierstrass'),
  makeEntry('ℑ', 'Black-Letter Capital I (Imaginary Part)', 'Math & Logic', 'Letterlike & Number Sets', 'imaginary part'),
  makeEntry('ℜ', 'Black-Letter Capital R (Real Part)', 'Math & Logic', 'Letterlike & Number Sets', 'real part'),
  makeEntry('ℵ', 'Alef Symbol', 'Math & Logic', 'Letterlike & Number Sets', 'aleph cardinality infinity'),
  makeEntry('ℏ', 'Planck Constant Over Two Pi', 'Math & Logic', 'Letterlike & Number Sets', 'hbar reduced planck'),
  makeEntry('ℓ', 'Script Small L', 'Math & Logic', 'Letterlike & Number Sets', 'ell liter length'),
  // Superscripts & Subscripts
  makeEntry('⁰', 'Superscript Zero', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 0 power'),
  makeEntry('¹', 'Superscript One', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 1 power'),
  makeEntry('²', 'Superscript Two (Squared)', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 2 squared'),
  makeEntry('³', 'Superscript Three (Cubed)', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 3 cubed'),
  makeEntry('⁴', 'Superscript Four', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 4 power'),
  makeEntry('⁵', 'Superscript Five', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 5 power'),
  makeEntry('⁶', 'Superscript Six', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 6 power'),
  makeEntry('⁷', 'Superscript Seven', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 7 power'),
  makeEntry('⁸', 'Superscript Eight', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 8 power'),
  makeEntry('⁹', 'Superscript Nine', 'Math & Logic', 'Superscripts & Subscripts', 'superscript 9 power'),
  makeEntry('ⁿ', 'Superscript Latin Small Letter N', 'Math & Logic', 'Superscripts & Subscripts', 'superscript n'),
  makeEntry('₀', 'Subscript Zero', 'Math & Logic', 'Superscripts & Subscripts', 'subscript 0'),
  makeEntry('₁', 'Subscript One', 'Math & Logic', 'Superscripts & Subscripts', 'subscript 1'),
  makeEntry('₂', 'Subscript Two', 'Math & Logic', 'Superscripts & Subscripts', 'subscript 2 h2o'),
  makeEntry('₃', 'Subscript Three', 'Math & Logic', 'Superscripts & Subscripts', 'subscript 3'),
  makeEntry('₄', 'Subscript Four', 'Math & Logic', 'Superscripts & Subscripts', 'subscript 4'),
  makeEntry('₅', 'Subscript Five', 'Math & Logic', 'Superscripts & Subscripts', 'subscript 5'),

  // ===================== ARROWS =====================
  makeEntry('←', 'Leftwards Arrow', 'Arrows', 'Basic Arrows', 'left arrow'),
  makeEntry('→', 'Rightwards Arrow', 'Arrows', 'Basic Arrows', 'right arrow next'),
  makeEntry('↑', 'Upwards Arrow', 'Arrows', 'Basic Arrows', 'up arrow'),
  makeEntry('↓', 'Downwards Arrow', 'Arrows', 'Basic Arrows', 'down arrow'),
  makeEntry('↔', 'Left Right Arrow', 'Arrows', 'Basic Arrows', 'horizontal both arrow'),
  makeEntry('↕', 'Up Down Arrow', 'Arrows', 'Basic Arrows', 'vertical both arrow'),
  makeEntry('↖', 'North West Arrow', 'Arrows', 'Diagonal Arrows', 'top left diagonal arrow'),
  makeEntry('↗', 'North East Arrow', 'Arrows', 'Diagonal Arrows', 'top right diagonal arrow external'),
  makeEntry('↘', 'South East Arrow', 'Arrows', 'Diagonal Arrows', 'bottom right diagonal arrow'),
  makeEntry('↙', 'South West Arrow', 'Arrows', 'Diagonal Arrows', 'bottom left diagonal arrow'),
  makeEntry('⇐', 'Leftwards Double Arrow', 'Arrows', 'Double & Implication Arrows', 'implied by'),
  makeEntry('⇒', 'Rightwards Double Arrow', 'Arrows', 'Double & Implication Arrows', 'implies double arrow'),
  makeEntry('⇑', 'Upwards Double Arrow', 'Arrows', 'Double & Implication Arrows', 'up double arrow'),
  makeEntry('⇓', 'Downwards Double Arrow', 'Arrows', 'Double & Implication Arrows', 'down double arrow'),
  makeEntry('⇔', 'Left Right Double Arrow', 'Arrows', 'Double & Implication Arrows', 'iff equivalent'),
  makeEntry('⇕', 'Up Down Double Arrow', 'Arrows', 'Double & Implication Arrows', 'vertical double arrow'),
  makeEntry('⟵', 'Long Leftwards Arrow', 'Arrows', 'Long & Mapping Arrows', 'long left arrow'),
  makeEntry('⟶', 'Long Rightwards Arrow', 'Arrows', 'Long & Mapping Arrows', 'long right arrow'),
  makeEntry('⟷', 'Long Left Right Arrow', 'Arrows', 'Long & Mapping Arrows', 'long both arrow'),
  makeEntry('⟹', 'Long Rightwards Double Arrow', 'Arrows', 'Long & Mapping Arrows', 'long implies'),
  makeEntry('⟺', 'Long Left Right Double Arrow', 'Arrows', 'Long & Mapping Arrows', 'long iff'),
  makeEntry('↦', 'Rightwards Arrow from Bar (Maps To)', 'Arrows', 'Long & Mapping Arrows', 'mapsto function'),
  makeEntry('↩', 'Leftwards Arrow with Hook', 'Arrows', 'Turns & Loops', 'reply return hook'),
  makeEntry('↪', 'Rightwards Arrow with Hook', 'Arrows', 'Turns & Loops', 'forward hook'),
  makeEntry('↰', 'Upwards Arrow with Tip Leftwards', 'Arrows', 'Turns & Loops', 'turn left'),
  makeEntry('↱', 'Upwards Arrow with Tip Rightwards', 'Arrows', 'Turns & Loops', 'turn right'),
  makeEntry('↲', 'Downwards Arrow with Tip Leftwards', 'Arrows', 'Turns & Loops', 'enter return'),
  makeEntry('↳', 'Downwards Arrow with Tip Rightwards', 'Arrows', 'Turns & Loops', 'subitem indent'),
  makeEntry('↵', 'Carriage Return / Enter Arrow', 'Arrows', 'Turns & Loops', 'enter newline return'),
  makeEntry('↺', 'Anticlockwise Open Circle Arrow', 'Arrows', 'Turns & Loops', 'undo rotate counter'),
  makeEntry('↻', 'Clockwise Open Circle Arrow', 'Arrows', 'Turns & Loops', 'redo refresh reload'),
  makeEntry('⇄', 'Rightwards Arrow Over Leftwards Arrow', 'Arrows', 'Paired & Reversible', 'exchange swap'),
  makeEntry('⇅', 'Upwards Arrow Leftwards of Downwards Arrow', 'Arrows', 'Paired & Reversible', 'sort vertical swap'),
  makeEntry('⇆', 'Leftwards Arrow Over Rightwards Arrow', 'Arrows', 'Paired & Reversible', 'swap'),
  makeEntry('⇌', 'Rightwards Harpoon Over Leftwards Harpoon', 'Arrows', 'Paired & Reversible', 'equilibrium chemistry reversible'),
  makeEntry('↚', 'Leftwards Arrow with Stroke', 'Arrows', 'Negated Arrows', 'not left arrow'),
  makeEntry('↛', 'Rightwards Arrow with Stroke', 'Arrows', 'Negated Arrows', 'not right arrow'),
  makeEntry('⇎', 'Left Right Double Arrow with Stroke', 'Arrows', 'Negated Arrows', 'not iff'),
  makeEntry('➜', 'Heavy Round-Tipped Rightwards Arrow', 'Arrows', 'Pointer Arrows', 'bullet arrow bold'),
  makeEntry('➡', 'Black Rightwards Arrow', 'Arrows', 'Pointer Arrows', 'filled right arrow'),
  makeEntry('➢', 'Three-D Top-Lighted Rightwards Arrowhead', 'Arrows', 'Pointer Arrows', 'wingdings bullet arrow'),
  makeEntry('➤', 'Black Rightwards Arrowhead', 'Arrows', 'Pointer Arrows', 'chevron pointer arrow'),

  // ===================== SHAPES & BOX DRAWING =====================
  // Geometric Shapes
  makeEntry('■', 'Black Square', 'Shapes & Box Drawing', 'Geometric Shapes', 'square filled solid stop'),
  makeEntry('□', 'White Square', 'Shapes & Box Drawing', 'Geometric Shapes', 'square outline empty'),
  makeEntry('▪', 'Black Small Square', 'Shapes & Box Drawing', 'Geometric Shapes', 'small square bullet'),
  makeEntry('▫', 'White Small Square', 'Shapes & Box Drawing', 'Geometric Shapes', 'small white square'),
  makeEntry('▬', 'Black Rectangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'rectangle bar'),
  makeEntry('▲', 'Black Up-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'triangle up'),
  makeEntry('△', 'White Up-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'triangle up outline'),
  makeEntry('▶', 'Black Right-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'play triangle right'),
  makeEntry('▷', 'White Right-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'triangle right outline'),
  makeEntry('▼', 'Black Down-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'dropdown triangle down'),
  makeEntry('▽', 'White Down-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'triangle down outline'),
  makeEntry('◀', 'Black Left-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'triangle left'),
  makeEntry('◁', 'White Left-Pointing Triangle', 'Shapes & Box Drawing', 'Geometric Shapes', 'triangle left outline'),
  makeEntry('◆', 'Black Diamond', 'Shapes & Box Drawing', 'Geometric Shapes', 'diamond solid'),
  makeEntry('◇', 'White Diamond', 'Shapes & Box Drawing', 'Geometric Shapes', 'diamond outline'),
  makeEntry('◈', 'White Diamond Containing Black Small Diamond', 'Shapes & Box Drawing', 'Geometric Shapes', 'diamond nested'),
  makeEntry('●', 'Black Circle', 'Shapes & Box Drawing', 'Geometric Shapes', 'circle filled dot'),
  makeEntry('○', 'White Circle', 'Shapes & Box Drawing', 'Geometric Shapes', 'circle outline'),
  makeEntry('◉', 'Fisheye', 'Shapes & Box Drawing', 'Geometric Shapes', 'radio button target'),
  makeEntry('◎', 'Bullseye', 'Shapes & Box Drawing', 'Geometric Shapes', 'bullseye double circle'),
  makeEntry('◐', 'Circle with Left Half Black', 'Shapes & Box Drawing', 'Geometric Shapes', 'half circle contrast'),
  makeEntry('◑', 'Circle with Right Half Black', 'Shapes & Box Drawing', 'Geometric Shapes', 'half circle'),
  makeEntry('◯', 'Large Circle', 'Shapes & Box Drawing', 'Geometric Shapes', 'large circle'),
  // Box Drawing
  makeEntry('─', 'Box Drawings Light Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'line horizontal box'),
  makeEntry('━', 'Box Drawings Heavy Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'bold horizontal line'),
  makeEntry('│', 'Box Drawings Light Vertical', 'Shapes & Box Drawing', 'Box Drawing', 'line vertical pipe'),
  makeEntry('┃', 'Box Drawings Heavy Vertical', 'Shapes & Box Drawing', 'Box Drawing', 'bold vertical line'),
  makeEntry('┌', 'Box Drawings Light Down and Right', 'Shapes & Box Drawing', 'Box Drawing', 'corner top left'),
  makeEntry('┐', 'Box Drawings Light Down and Left', 'Shapes & Box Drawing', 'Box Drawing', 'corner top right'),
  makeEntry('└', 'Box Drawings Light Up and Right', 'Shapes & Box Drawing', 'Box Drawing', 'corner bottom left'),
  makeEntry('┘', 'Box Drawings Light Up and Left', 'Shapes & Box Drawing', 'Box Drawing', 'corner bottom right'),
  makeEntry('├', 'Box Drawings Light Vertical and Right', 'Shapes & Box Drawing', 'Box Drawing', 'tee tree branch'),
  makeEntry('┤', 'Box Drawings Light Vertical and Left', 'Shapes & Box Drawing', 'Box Drawing', 'tee right'),
  makeEntry('┬', 'Box Drawings Light Down and Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'tee top'),
  makeEntry('┴', 'Box Drawings Light Up and Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'tee bottom'),
  makeEntry('┼', 'Box Drawings Light Vertical and Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'cross grid'),
  makeEntry('═', 'Box Drawings Double Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'double horizontal line'),
  makeEntry('║', 'Box Drawings Double Vertical', 'Shapes & Box Drawing', 'Box Drawing', 'double vertical line'),
  makeEntry('╔', 'Box Drawings Double Down and Right', 'Shapes & Box Drawing', 'Box Drawing', 'double corner top left'),
  makeEntry('╗', 'Box Drawings Double Down and Left', 'Shapes & Box Drawing', 'Box Drawing', 'double corner top right'),
  makeEntry('╚', 'Box Drawings Double Up and Right', 'Shapes & Box Drawing', 'Box Drawing', 'double corner bottom left'),
  makeEntry('╝', 'Box Drawings Double Up and Left', 'Shapes & Box Drawing', 'Box Drawing', 'double corner bottom right'),
  makeEntry('╠', 'Box Drawings Double Vertical and Right', 'Shapes & Box Drawing', 'Box Drawing', 'double tee left'),
  makeEntry('╣', 'Box Drawings Double Vertical and Left', 'Shapes & Box Drawing', 'Box Drawing', 'double tee right'),
  makeEntry('╦', 'Box Drawings Double Down and Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'double tee top'),
  makeEntry('╩', 'Box Drawings Double Up and Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'double tee bottom'),
  makeEntry('╬', 'Box Drawings Double Vertical and Horizontal', 'Shapes & Box Drawing', 'Box Drawing', 'double cross'),
  // Block Elements
  makeEntry('█', 'Full Block', 'Shapes & Box Drawing', 'Block Elements', 'solid block bar'),
  makeEntry('▓', 'Dark Shade', 'Shapes & Box Drawing', 'Block Elements', 'shade dark'),
  makeEntry('▒', 'Medium Shade', 'Shapes & Box Drawing', 'Block Elements', 'shade medium'),
  makeEntry('░', 'Light Shade', 'Shapes & Box Drawing', 'Block Elements', 'shade light'),

  // ===================== WINGDINGS & DINGBATS =====================
  // Office, Mail & Writing
  makeEntry('✂', 'Black Scissors', 'Wingdings & Dingbats', 'Office & Editorial', 'scissors cut wingdings'),
  makeEntry('✄', 'White Scissors', 'Wingdings & Dingbats', 'Office & Editorial', 'scissors cut'),
  makeEntry('☎', 'Black Telephone', 'Wingdings & Dingbats', 'Office & Editorial', 'phone telephone contact'),
  makeEntry('☏', 'White Telephone', 'Wingdings & Dingbats', 'Office & Editorial', 'phone'),
  makeEntry('✉', 'Envelope', 'Wingdings & Dingbats', 'Office & Editorial', 'mail email letter envelope'),
  makeEntry('✍', 'Writing Hand', 'Wingdings & Dingbats', 'Office & Editorial', 'sign signature write hand'),
  makeEntry('✎', 'Lower Right Pencil', 'Wingdings & Dingbats', 'Office & Editorial', 'pencil edit'),
  makeEntry('✏', 'Pencil', 'Wingdings & Dingbats', 'Office & Editorial', 'pencil edit'),
  makeEntry('✒', 'Black Nib', 'Wingdings & Dingbats', 'Office & Editorial', 'pen fountain nib'),
  makeEntry('☝', 'White Up Pointing Index', 'Wingdings & Dingbats', 'Office & Editorial', 'finger point hand'),
  makeEntry('☞', 'White Right Pointing Index', 'Wingdings & Dingbats', 'Office & Editorial', 'hand point right wingdings'),
  makeEntry('❐', 'Lower Right Drop-Shadowed White Square', 'Wingdings & Dingbats', 'Office & Editorial', 'window copy box'),
  makeEntry('❖', 'Black Diamond Minus White X', 'Wingdings & Dingbats', 'Office & Editorial', 'wingdings diamond bullet'),
  // Checkmarks, Crosses & Stars
  makeEntry('✗', 'Ballot X', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'cross x fail'),
  makeEntry('✘', 'Heavy Ballot X', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'bold cross x'),
  makeEntry('✖', 'Heavy Multiplication X', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'heavy x'),
  makeEntry('✚', 'Heavy Greek Cross', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'plus cross medical'),
  makeEntry('✝', 'Latin Cross', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'cross'),
  makeEntry('✦', 'Black Four Pointed Star', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'sparkle star'),
  makeEntry('✧', 'White Four Pointed Star', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'sparkle outline'),
  makeEntry('★', 'Black Star', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'star rating favorite'),
  makeEntry('☆', 'White Star', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'star outline'),
  makeEntry('✪', 'Circled White Star', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'star badge'),
  makeEntry('✯', 'Pinwheel Star', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'star'),
  makeEntry('✱', 'Heavy Asterisk', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'asterisk'),
  makeEntry('✳', 'Eight Spoked Asterisk', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'asterisk'),
  makeEntry('✿', 'Black Florette', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'flower florette'),
  makeEntry('❀', 'White Florette', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'flower'),
  makeEntry('❄', 'Snowflake', 'Wingdings & Dingbats', 'Checkmarks & Stars', 'snow winter cold'),
  // Weather, Suits, Music & Misc
  makeEntry('☀', 'Black Sun with Rays', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'sun weather bright'),
  makeEntry('☁', 'Cloud', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'cloud weather'),
  makeEntry('☂', 'Umbrella', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'umbrella rain'),
  makeEntry('☃', 'Snowman', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'snowman winter'),
  makeEntry('☕', 'Hot Beverage', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'coffee tea break'),
  makeEntry('☘', 'Shamrock', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'clover irish'),
  makeEntry('☺', 'White Smiling Face', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'smile happy wingdings J'),
  makeEntry('☹', 'White Frowning Face', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'sad frown wingdings L'),
  makeEntry('☮', 'Peace Symbol', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'peace'),
  makeEntry('☯', 'Yin Yang', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'yin yang balance'),
  makeEntry('⚑', 'Black Flag', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'flag milestone'),
  makeEntry('⚐', 'White Flag', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'flag'),
  makeEntry('♠', 'Black Spade Suit', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'spade cards'),
  makeEntry('♥', 'Black Heart Suit', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'heart love cards'),
  makeEntry('♦', 'Black Diamond Suit', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'diamond cards'),
  makeEntry('♣', 'Black Club Suit', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'club cards'),
  makeEntry('♩', 'Quarter Note', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'music note'),
  makeEntry('♪', 'Eighth Note', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'music note'),
  makeEntry('♫', 'Beamed Eighth Notes', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'music notes'),
  makeEntry('♬', 'Beamed Sixteenth Notes', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'music notes'),
  makeEntry('♭', 'Music Flat Sign', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'flat music'),
  makeEntry('♮', 'Music Natural Sign', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'natural music'),
  makeEntry('♯', 'Music Sharp Sign', 'Wingdings & Dingbats', 'Icons, Suits & Music', 'sharp music'),
  // Circled Digits (Wingdings classic)
  makeEntry('①', 'Circled Digit One', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 1 number step'),
  makeEntry('②', 'Circled Digit Two', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 2 number step'),
  makeEntry('③', 'Circled Digit Three', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 3 number step'),
  makeEntry('④', 'Circled Digit Four', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 4 number step'),
  makeEntry('⑤', 'Circled Digit Five', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 5 number step'),
  makeEntry('⑥', 'Circled Digit Six', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 6 number step'),
  makeEntry('⑦', 'Circled Digit Seven', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 7 number step'),
  makeEntry('⑧', 'Circled Digit Eight', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 8 number step'),
  makeEntry('⑨', 'Circled Digit Nine', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 9 number step'),
  makeEntry('⑩', 'Circled Number Ten', 'Wingdings & Dingbats', 'Circled Numbers', 'circled 10 number step'),
  makeEntry('❶', 'Dingbat Negative Circled Digit One', 'Wingdings & Dingbats', 'Circled Numbers', 'filled circled 1'),
  makeEntry('❷', 'Dingbat Negative Circled Digit Two', 'Wingdings & Dingbats', 'Circled Numbers', 'filled circled 2'),
  makeEntry('❸', 'Dingbat Negative Circled Digit Three', 'Wingdings & Dingbats', 'Circled Numbers', 'filled circled 3'),
  makeEntry('❹', 'Dingbat Negative Circled Digit Four', 'Wingdings & Dingbats', 'Circled Numbers', 'filled circled 4'),
  makeEntry('❺', 'Dingbat Negative Circled Digit Five', 'Wingdings & Dingbats', 'Circled Numbers', 'filled circled 5'),

  // ===================== TECHNICAL & UI =====================
  makeEntry('⌘', 'Command Key / Place of Interest', 'Technical & UI', 'Keyboard & Controls', 'cmd mac command'),
  makeEntry('⌥', 'Option Key', 'Technical & UI', 'Keyboard & Controls', 'alt option mac'),
  makeEntry('⇧', 'Upwards White Arrow (Shift)', 'Technical & UI', 'Keyboard & Controls', 'shift key'),
  makeEntry('⌃', 'Up Arrowhead (Ctrl)', 'Technical & UI', 'Keyboard & Controls', 'ctrl control key'),
  makeEntry('⌫', 'Erase to the Left (Backspace)', 'Technical & UI', 'Keyboard & Controls', 'backspace delete'),
  makeEntry('⌦', 'Erase to the Right (Forward Delete)', 'Technical & UI', 'Keyboard & Controls', 'delete forward'),
  makeEntry('⎋', 'Broken Circle with Northwest Arrow (Escape)', 'Technical & UI', 'Keyboard & Controls', 'esc escape'),
  makeEntry('⏎', 'Return Symbol', 'Technical & UI', 'Keyboard & Controls', 'enter return'),
  makeEntry('⇥', 'Rightwards Arrow to Bar (Tab)', 'Technical & UI', 'Keyboard & Controls', 'tab indent'),
  makeEntry('⇤', 'Leftwards Arrow to Bar (Backtab)', 'Technical & UI', 'Keyboard & Controls', 'shift tab'),
  makeEntry('⇪', 'Upwards White Arrow from Bar (Caps Lock)', 'Technical & UI', 'Keyboard & Controls', 'caps lock'),
  makeEntry('␣', 'Open Box (Space)', 'Technical & UI', 'Keyboard & Controls', 'spacebar space'),
  makeEntry('⏻', 'Power Symbol', 'Technical & UI', 'Keyboard & Controls', 'power on off'),
  makeEntry('☐', 'Ballot Box', 'Technical & UI', 'Checkboxes & Status', 'checkbox unchecked todo'),
  makeEntry('☑', 'Ballot Box with Check', 'Technical & UI', 'Checkboxes & Status', 'checkbox checked done'),
  makeEntry('☒', 'Ballot Box with X', 'Technical & UI', 'Checkboxes & Status', 'checkbox cross x'),
  makeEntry('℃', 'Degree Celsius', 'Technical & UI', 'Units & Science', 'celsius temperature c'),
  makeEntry('℉', 'Degree Fahrenheit', 'Technical & UI', 'Units & Science', 'fahrenheit temperature f'),
  makeEntry('K', 'Kelvin Sign', 'Technical & UI', 'Units & Science', 'kelvin temperature k'),
  makeEntry('Å', 'Angstrom Sign', 'Technical & UI', 'Units & Science', 'angstrom wavelength'),
  makeEntry('Ω', 'Ohm Sign', 'Technical & UI', 'Units & Science', 'ohm resistance electrical'),
  makeEntry('℧', 'Inverted Ohm Sign (Mho)', 'Technical & UI', 'Units & Science', 'mho conductance'),
  makeEntry('℮', 'Estimated Symbol', 'Technical & UI', 'Units & Science', 'estimated e mark packaging'),
  makeEntry('㎡', 'Square Meter', 'Technical & UI', 'Units & Science', 'm2 area square meter'),
  makeEntry('㎥', 'Cubic Meter', 'Technical & UI', 'Units & Science', 'm3 volume cubic meter'),
  makeEntry('⚙', 'Gear', 'Technical & UI', 'Engineering & Icons', 'settings gear cog'),
  makeEntry('⚠', 'Warning Sign', 'Technical & UI', 'Engineering & Icons', 'alert warning caution'),
  makeEntry('⚡', 'High Voltage Sign', 'Technical & UI', 'Engineering & Icons', 'lightning bolt voltage'),
  makeEntry('♻', 'Black Universal Recycling Symbol', 'Technical & UI', 'Engineering & Icons', 'recycle eco'),
  makeEntry('⚖', 'Scales', 'Technical & UI', 'Engineering & Icons', 'justice balance legal weight'),
  makeEntry('⚛', 'Atom Symbol', 'Technical & UI', 'Engineering & Icons', 'atom physics science'),
  makeEntry('☢', 'Radioactive Sign', 'Technical & UI', 'Engineering & Icons', 'radioactive hazard'),
  makeEntry('☣', 'Biohazard Sign', 'Technical & UI', 'Engineering & Icons', 'biohazard'),
  makeEntry('⚓', 'Anchor', 'Technical & UI', 'Engineering & Icons', 'anchor link'),

  // ===================== IPA & CYRILLIC =====================
  // IPA Phonetic Essentials
  makeEntry('ə', 'Latin Small Letter Schwa', 'IPA & Cyrillic', 'Phonetics (IPA)', 'schwa ipa vowel'),
  makeEntry('ɛ', 'Latin Small Letter Open E', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ɜ', 'Latin Small Letter Reversed Open E', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ɪ', 'Latin Letter Small Capital I', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ʊ', 'Latin Small Letter Upsilon', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ʌ', 'Latin Small Letter Turned V', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ɔ', 'Latin Small Letter Open O', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ɑ', 'Latin Small Letter Alpha', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ɒ', 'Latin Small Letter Turned Alpha', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ipa vowel'),
  makeEntry('ʃ', 'Latin Small Letter Esh', 'IPA & Cyrillic', 'Phonetics (IPA)', 'esh sh ipa'),
  makeEntry('ʒ', 'Latin Small Letter Ezh', 'IPA & Cyrillic', 'Phonetics (IPA)', 'ezh zh ipa'),
  makeEntry('ŋ', 'Latin Small Letter Eng', 'IPA & Cyrillic', 'Phonetics (IPA)', 'eng ng ipa'),
  makeEntry('ʔ', 'Latin Letter Glottal Stop', 'IPA & Cyrillic', 'Phonetics (IPA)', 'glottal stop ipa'),
  makeEntry('ˈ', 'Modifier Letter Vertical Line (Primary Stress)', 'IPA & Cyrillic', 'Phonetics (IPA)', 'stress primary ipa'),
  makeEntry('ˌ', 'Modifier Letter Low Vertical Line (Secondary Stress)', 'IPA & Cyrillic', 'Phonetics (IPA)', 'stress secondary ipa'),
  makeEntry('ː', 'Modifier Letter Triangular Colon (Long)', 'IPA & Cyrillic', 'Phonetics (IPA)', 'long vowel ipa'),
  // Cyrillic Core
  makeEntry('А', 'Cyrillic Capital Letter A', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Б', 'Cyrillic Capital Letter Be', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('В', 'Cyrillic Capital Letter Ve', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Г', 'Cyrillic Capital Letter Ghe', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Д', 'Cyrillic Capital Letter De', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Е', 'Cyrillic Capital Letter Ie', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ё', 'Cyrillic Capital Letter Io', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ж', 'Cyrillic Capital Letter Zhe', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('З', 'Cyrillic Capital Letter Ze', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('И', 'Cyrillic Capital Letter I', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Й', 'Cyrillic Capital Letter Short I', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('К', 'Cyrillic Capital Letter Ka', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Л', 'Cyrillic Capital Letter El', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('М', 'Cyrillic Capital Letter Em', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Н', 'Cyrillic Capital Letter En', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('О', 'Cyrillic Capital Letter O', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('П', 'Cyrillic Capital Letter Pe', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Р', 'Cyrillic Capital Letter Er', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('С', 'Cyrillic Capital Letter Es', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Т', 'Cyrillic Capital Letter Te', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('У', 'Cyrillic Capital Letter U', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ф', 'Cyrillic Capital Letter Ef', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Х', 'Cyrillic Capital Letter Ha', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ц', 'Cyrillic Capital Letter Tse', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ч', 'Cyrillic Capital Letter Che', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ш', 'Cyrillic Capital Letter Sha', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Щ', 'Cyrillic Capital Letter Shcha', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ъ', 'Cyrillic Capital Letter Hard Sign', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ы', 'Cyrillic Capital Letter Yeru', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ь', 'Cyrillic Capital Letter Soft Sign', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Э', 'Cyrillic Capital Letter E', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Ю', 'Cyrillic Capital Letter Yu', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
  makeEntry('Я', 'Cyrillic Capital Letter Ya', 'IPA & Cyrillic', 'Cyrillic', 'cyrillic russian'),
];

// Deduplicate by char so React keys and lookups stay deterministic.
const seenChars = new Set<string>();
export const SYMBOL_CATALOG: SymbolEntry[] = RAW_SYMBOL_CATALOG.filter((entry) => {
  if (seenChars.has(entry.char)) return false;
  seenChars.add(entry.char);
  return true;
});

/**
 * MS Word "Special Characters" tab entries with classic shortcuts and AutoCorrect hints.
 */
export const MS_WORD_SPECIAL_CHARACTERS: SpecialCharacterEntry[] = [
  {
    id: 'em-dash',
    char: '—',
    name: 'Em Dash',
    codepoint: 'U+2014',
    shortcut: 'Alt+Ctrl+Num -',
    autoCorrect: '-- (between words)',
    description: 'Long dash used for parenthetical clauses or attribution',
  },
  {
    id: 'en-dash',
    char: '–',
    name: 'En Dash',
    codepoint: 'U+2013',
    shortcut: 'Ctrl+Num -',
    autoCorrect: 'space + -- + space',
    description: 'Medium dash used for number, date, and score ranges',
  },
  {
    id: 'nonbreaking-hyphen',
    char: '‑',
    name: 'Nonbreaking Hyphen',
    codepoint: 'U+2011',
    shortcut: 'Ctrl+Shift+-',
    description: 'Prevents hyphenated words or codes from breaking across lines',
  },
  {
    id: 'optional-hyphen',
    char: '\u00AD',
    previewLabel: '¬',
    name: 'Optional (Soft) Hyphen',
    codepoint: 'U+00AD',
    shortcut: 'Ctrl+-',
    description: 'Invisible break point shown only if the word wraps at line end',
  },
  {
    id: 'nonbreaking-space',
    char: '\u00A0',
    previewLabel: '°',
    name: 'Nonbreaking Space',
    codepoint: 'U+00A0',
    shortcut: 'Ctrl+Shift+Space',
    description: 'Keeps adjacent words or units together on the same line',
  },
  {
    id: 'em-space',
    char: '\u2003',
    previewLabel: '⎵',
    name: 'Em Space',
    codepoint: 'U+2003',
    shortcut: 'U+2003',
    description: 'Typographic wide space equal to current point size',
  },
  {
    id: 'en-space',
    char: '\u2002',
    previewLabel: '␣',
    name: 'En Space',
    codepoint: 'U+2002',
    shortcut: 'U+2002',
    description: 'Typographic space equal to half an em space',
  },
  {
    id: 'copyright',
    char: '©',
    name: 'Copyright',
    codepoint: 'U+00A9',
    shortcut: 'Alt+Ctrl+C',
    autoCorrect: '(c)',
    description: 'Standard copyright notice symbol',
  },
  {
    id: 'registered',
    char: '®',
    name: 'Registered',
    codepoint: 'U+00AE',
    shortcut: 'Alt+Ctrl+R',
    autoCorrect: '(r)',
    description: 'Registered trademark notice symbol',
  },
  {
    id: 'trademark',
    char: '™',
    name: 'Trademark',
    codepoint: 'U+2122',
    shortcut: 'Alt+Ctrl+T',
    autoCorrect: '(tm)',
    description: 'Unregistered trademark symbol',
  },
  {
    id: 'section',
    char: '§',
    name: 'Section',
    codepoint: 'U+00A7',
    shortcut: 'Alt+0167',
    description: 'Legal and academic section marker',
  },
  {
    id: 'paragraph',
    char: '¶',
    name: 'Paragraph (Pilcrow)',
    codepoint: 'U+00B6',
    shortcut: 'Alt+0182',
    description: 'Paragraph break marker in legal/editorial writing',
  },
  {
    id: 'ellipsis',
    char: '…',
    name: 'Ellipsis',
    codepoint: 'U+2026',
    shortcut: 'Alt+Ctrl+.',
    autoCorrect: '...',
    description: 'Single-character three-dot omission mark',
  },
  {
    id: 'open-single-quote',
    char: '‘',
    name: 'Single Opening Quote',
    codepoint: 'U+2018',
    shortcut: 'Ctrl+`, `',
    description: 'Curved left single quotation mark',
  },
  {
    id: 'close-single-quote',
    char: '’',
    name: 'Single Closing Quote',
    codepoint: 'U+2019',
    shortcut: "Ctrl+', '",
    description: 'Curved right single quotation mark / apostrophe',
  },
  {
    id: 'open-double-quote',
    char: '“',
    name: 'Double Opening Quote',
    codepoint: 'U+201C',
    shortcut: 'Ctrl+`, "',
    description: 'Curved left double quotation mark',
  },
  {
    id: 'close-double-quote',
    char: '”',
    name: 'Double Closing Quote',
    codepoint: 'U+201D',
    shortcut: 'Ctrl+\', "',
    description: 'Curved right double quotation mark',
  },
  {
    id: 'bullet',
    char: '•',
    name: 'Bullet',
    codepoint: 'U+2022',
    shortcut: 'Alt+0149',
    description: 'Standard inline or list bullet separator',
  },
  {
    id: 'dagger',
    char: '†',
    name: 'Dagger',
    codepoint: 'U+2020',
    shortcut: 'Alt+0134',
    description: 'Primary footnote or table reference mark',
  },
  {
    id: 'double-dagger',
    char: '‡',
    name: 'Double Dagger',
    codepoint: 'U+2021',
    shortcut: 'Alt+0135',
    description: 'Secondary footnote or table reference mark',
  },
  {
    id: 'degree',
    char: '°',
    name: 'Degree',
    codepoint: 'U+00B0',
    shortcut: 'Alt+0176',
    description: 'Angle or temperature degree symbol',
  },
  {
    id: 'permille',
    char: '‰',
    name: 'Per Mille',
    codepoint: 'U+2030',
    shortcut: 'Alt+0137',
    description: 'Parts per thousand ratio symbol',
  },
  {
    id: 'numero',
    char: '№',
    name: 'Numero Sign',
    codepoint: 'U+2116',
    shortcut: 'U+2116',
    description: 'Number abbreviation symbol',
  },
];

export const DEFAULT_RECENT_SYMBOLS = [
  '©', '®', '™', '€', '£', '¥', '₹', '°',
  '±', '≠', '≤', '≥', '÷', '×', '∞', '√',
  '∑', 'π', 'α', '→',
];

const RECENT_SYMBOLS_KEY = 'prodoc_recent_symbols';

export function getRecentSymbols(): string[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [...DEFAULT_RECENT_SYMBOLS];
  }
  try {
    const raw = window.localStorage.getItem(RECENT_SYMBOLS_KEY);
    if (!raw) return [...DEFAULT_RECENT_SYMBOLS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.filter((s) => typeof s === 'string').slice(0, 20);
    }
  } catch {
    // ignore storage errors
  }
  return [...DEFAULT_RECENT_SYMBOLS];
}

export function recordRecentSymbol(symbol: string): string[] {
  const current = getRecentSymbols().filter((s) => s !== symbol);
  const next = [symbol, ...current].slice(0, 20);
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(RECENT_SYMBOLS_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }
  return next;
}

export function filterSymbols(query: string, category: string = 'All'): SymbolEntry[] {
  const q = query.trim().toLowerCase();
  const hexQuery = q.startsWith('u+') ? q.slice(2) : q;
  return SYMBOL_CATALOG.filter((entry) => {
    if (category !== 'All' && entry.category !== category) return false;
    if (!q) return true;
    return (
      entry.char.toLowerCase().includes(q) ||
      entry.name.toLowerCase().includes(q) ||
      entry.codepoint.toLowerCase().includes(q) ||
      (hexQuery.length >= 2 && entry.codepoint.toLowerCase().slice(2).includes(hexQuery)) ||
      entry.subgroup.toLowerCase().includes(q) ||
      entry.category.toLowerCase().includes(q) ||
      Boolean(entry.keywords && entry.keywords.toLowerCase().includes(q))
    );
  });
}

export function groupSymbolsBySubgroup(
  entries: SymbolEntry[]
): Array<{ group: string; category: SymbolCategoryName; items: SymbolEntry[] }> {
  const map = new Map<string, { group: string; category: SymbolCategoryName; items: SymbolEntry[] }>();
  for (const entry of entries) {
    const key = `${entry.category}::${entry.subgroup}`;
    let bucket = map.get(key);
    if (!bucket) {
      bucket = { group: entry.subgroup, category: entry.category, items: [] };
      map.set(key, bucket);
    }
    bucket.items.push(entry);
  }
  return Array.from(map.values());
}

export function resolveUnicodeHexInput(hexInput: string): SymbolEntry | null {
  const cleaned = hexInput.trim().replace(/^u\+/i, '');
  if (!/^[0-9a-fA-F]{1,6}$/.test(cleaned)) return null;
  const cp = Number.parseInt(cleaned, 16);
  if (!Number.isFinite(cp) || cp < 0x20 || cp > 0x10ffff) return null;
  // Reject surrogate range
  if (cp >= 0xd800 && cp <= 0xdfff) return null;
  const char = String.fromCodePoint(cp);
  const existing = SYMBOL_CATALOG.find((s) => s.char === char);
  if (existing) return existing;
  return {
    char,
    name: `Unicode Character U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
    codepoint: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
    category: 'Common',
    subgroup: 'Custom Unicode',
  };
}

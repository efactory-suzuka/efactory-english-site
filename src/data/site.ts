export const japaneseSite = 'https://efactorysuzuka.wixsite.com/efactory';
export const japaneseEcuSite = 'https://efactory-ecu-site.pages.dev/';
export const japanesePages: Record<string, string> = {
  '/': japaneseSite,
  '/services/': japaneseSite,
  '/pricing/': japaneseSite + '/page',
  '/about/': japaneseSite + '/us',
  '/ecu-tuning/': japaneseEcuSite,
  '/faq/': japaneseSite,
  '/contact/': japaneseSite,
};
const mapAddress = '三重県鈴鹿市徳居町1135';
export const contact = {
  line: 'https://lin.ee/OYeQxOp',
  ecuLine: 'https://lin.ee/PGKCTAO',
  email: 'efactory.suzuka@gmail.com',
  addressJapanese: '〒510-0264 三重県鈴鹿市徳居町1135',
  map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapAddress),
  mapEmbed: 'https://www.google.com/maps?q=' + encodeURIComponent(mapAddress) + '&output=embed&hl=en&z=16',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapAddress),
};
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About us', href: '/about/' },
  { label: 'ECU Flashing', href: '/ecu-tuning/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact & access', href: '/contact/' },
];
export const pricing = {
  source: 'Japanese public HOME, checked 2026-10-13, used per user instruction after Google master returned 401. Pass validity is from the user brief; detailed terms require confirmation.',
  taxIncluded: true,
  first: { label: 'First-visit trial', total: 4400, minutes: 90 },
  single: { label: 'Single session', total: 5500, minutes: 90 },
  passes: [
    { label: '3-session pass', total: 14850, sessions: 3, minutes: 90, validityMonths: 12 },
    { label: '5-session pass', total: 22000, sessions: 5, minutes: 90, validityMonths: 12 },
  ],
  memberships: [
    { label: 'Standard', monthly: 9900 },
    { label: 'Premium', monthly: 13200 },
  ],
};
export const yen = (amount: number) => `¥${amount.toLocaleString('en-US')}`;

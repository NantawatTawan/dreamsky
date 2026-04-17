export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dreamskycnx.com';

export const SITE_NAME = 'Dream Sky Paramotor CNX';
export const SITE_LEGAL_NAME = 'Dream Sky Paramotor Chiang Mai';

export const CONTACT = {
  phone: '+66823138099',
  phoneDisplay: '082-313-8099',
  lineUrl: 'https://line.me/ti/p/9cPa9GRwet',
  lineId: 'dreamskycnx99',
  wechatUrl: 'https://u.wechat.com/kME5YwDWd782XVwRhq4ldYs?s=3',
  tiktokUrl: 'https://www.tiktok.com/@dreamskyparamotor',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61573311088766',
  // TODO(client): replace with real Google Maps share link for the take-off / meeting point.
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chiang+Mai+Thailand',
} as const;

// TODO(client): exact street address; falls back to city-level for now.
export const ADDRESS = {
  addressLocality: 'Chiang Mai',
  addressRegion: 'Chiang Mai',
  addressCountry: 'TH',
  postalCode: '50000',
} as const;

// TODO(client): confirm exact take-off coordinates; Chiang Mai city centre used as placeholder.
export const GEO = {
  latitude: 18.7883,
  longitude: 98.9853,
} as const;

export const OPENING_HOURS = ['Mo-Su 06:30-09:00', 'Mo-Su 16:00-17:30'];

// TODO(client): confirm THB price range.
export const PRICE_RANGE = '฿฿';
export const CURRENCY = 'THB';

export const OG_LOCALE: Record<string, string> = {
  th: 'th_TH',
  en: 'en_US',
  zh: 'zh_CN',
};

export const LOCALES = ['th', 'en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const sameAs = [
  CONTACT.facebookUrl,
  CONTACT.tiktokUrl,
  CONTACT.wechatUrl,
  CONTACT.lineUrl,
];

export const absoluteUrl = (path = '') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

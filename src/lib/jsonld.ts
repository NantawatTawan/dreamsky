import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  CONTACT,
  ADDRESS,
  GEO,
  OPENING_HOURS,
  PRICE_RANGE,
  CURRENCY,
  sameAs,
  absoluteUrl,
} from './site';

const ORG_ID = `${SITE_URL}#organization`;
const BUSINESS_ID = `${SITE_URL}#localbusiness`;
const WEBSITE_ID = `${SITE_URL}#website`;

type JsonLd = Record<string, unknown>;

export function organizationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/images/logo.jpg'),
    image: absoluteUrl('/images/og-image.jpg'),
    sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT.phone,
        contactType: 'customer service',
        areaServed: 'TH',
        availableLanguage: ['th', 'en', 'zh'],
      },
    ],
  };
}

export function websiteLd(locale: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };
}

export function localBusinessLd(description: string, locale: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TravelAgency', 'TouristAttraction'],
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    description,
    url: absoluteUrl(`/${locale}`),
    telephone: CONTACT.phone,
    image: [
      absoluteUrl('/images/og-image.jpg'),
      absoluteUrl('/images/logo.jpg'),
    ],
    logo: absoluteUrl('/images/logo.jpg'),
    priceRange: PRICE_RANGE,
    currenciesAccepted: CURRENCY,
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      addressCountry: ADDRESS.addressCountry,
      postalCode: ADDRESS.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:30',
        closes: '09:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '16:00',
        closes: '17:30',
      },
    ],
    openingHours: OPENING_HOURS,
    areaServed: { '@type': 'City', name: 'Chiang Mai' },
    sameAs,
    knowsLanguage: ['th', 'en', 'zh'],
    parentOrganization: { '@id': ORG_ID },
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbLd(items: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type ArticleInput = {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author: string;
  locale: string;
  tags?: string[];
};

export function articleLd(input: ArticleInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    headline: input.title,
    description: input.description,
    image: input.image ? [absoluteUrl(input.image)] : undefined,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: input.locale,
    keywords: input.tags?.join(', '),
    author: {
      '@type': 'Organization',
      name: input.author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: { '@id': ORG_ID },
  };
}

type ServiceInput = {
  name: string;
  description: string;
  url: string;
  image?: string;
};

export function serviceLd(input: ServiceInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Paramotor tandem flight',
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image ? absoluteUrl(input.image) : undefined,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Chiang Mai' },
    offers: {
      '@type': 'Offer',
      priceCurrency: CURRENCY,
      availability: 'https://schema.org/InStock',
      url: input.url,
    },
  };
}

export function itemListLd(name: string, items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

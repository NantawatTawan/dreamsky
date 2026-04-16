import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Dream Sky Paramotor CNX';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B3A5C 0%, #2E5F8A 100%)',
          color: 'white',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#F5B731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 24 }}>
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
          Dream Sky Paramotor CNX
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9, maxWidth: 900 }}>
          {t('description')}
        </div>
      </div>
    ),
    { ...size }
  );
}

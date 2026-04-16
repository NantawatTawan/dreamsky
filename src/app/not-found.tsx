import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 560 }}>
            <p style={{ fontSize: 12, letterSpacing: 4, color: '#F2994A', fontWeight: 700 }}>404</p>
            <h1 style={{ marginTop: 12, fontSize: 40, fontWeight: 800, color: '#1B3A5C' }}>
              Page not found
            </h1>
            <p style={{ marginTop: 16, color: '#4a4a4a', lineHeight: 1.6 }}>
              The page you&apos;re looking for has drifted out of the sky.
            </p>
            <Link
              href="/th"
              style={{ display: 'inline-block', marginTop: 32, padding: '10px 24px', borderRadius: 999, background: '#F2994A', color: 'white', fontWeight: 600, textDecoration: 'none' }}
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { routing } from '@/i18n/routing';

const labels: Record<string, string> = {
  th: 'TH',
  en: 'EN',
  zh: '中文',
};

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const change = (next: string) => {
    if (next === locale) return;
    router.replace(
      // @ts-expect-error params typed loosely; locale swap is safe at runtime
      { pathname, params },
      { locale: next },
    );
  };

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {routing.locales.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-dark/30">|</span>}
          <button
            type="button"
            onClick={() => change(l)}
            className={`transition-colors cursor-pointer ${
              l === locale
                ? 'font-bold text-orange underline underline-offset-4'
                : 'text-dark/70 hover:text-orange'
            }`}
            aria-current={l === locale ? 'true' : undefined}
          >
            {labels[l]}
          </button>
        </div>
      ))}
    </div>
  );
}

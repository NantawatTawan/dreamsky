import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LineIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/20">
              <Image
                src="/images/logo.jpg"
                alt="Dream Sky Paramotor CNX"
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="font-bold text-white text-lg">
              Dream Sky <span className="text-orange">Paramotor</span> CNX
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {t("description")}
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">{t("links")}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-orange transition-colors">
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-orange transition-colors"
              >
                {tNav("pricing")}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-orange transition-colors"
              >
                {tNav("blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">{t("contact")}</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <LineIcon className="h-4 w-4 text-white/70" />
              <a
                href="https://line.me/R/ti/p/@dreamskyparamotor"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors"
              >
                LINE: @dreamskyparamotor
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white/70" />
              <a
                href="tel:+66000000000"
                className="hover:text-orange transition-colors"
              >
                0XX-XXX-XXXX
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4 text-white/70" />
              <a
                href="https://wa.me/66000000000"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors"
              >
                WhatsApp: +66XXXXXXXXX
              </a>
            </li>
            <li className="pt-2 border-t border-white/10 mt-3">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-white/70" />
                <div>
                  <div className="text-white/90 font-medium">
                    {t("flying_hours")}
                  </div>
                  <div className="text-white/60">{t("morning")}</div>
                  <div className="text-white/60">{t("evening")}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 text-xs text-white/70 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© 2026 Dream Sky Paramotor CNX. {t("rights")}.</span>
          <span className="text-white/50">Chiang Mai, Thailand</span>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  LineIcon,
  TikTokIcon,
  FacebookIcon,
} from "@/components/icons/BrandIcons";
import WeChatLink from "@/components/layout/WeChatLink";
import { CONTACT } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-10 w-10">
              <Image
                src="/images/logo-02.png"
                alt="Dream Sky Paramotor CNX"
                fill
                sizes="40px"
                className="object-contain"
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
                href="/packages"
                className="hover:text-orange transition-colors"
              >
                {tNav("packages")}
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
                href="https://line.me/ti/p/9cPa9GRwet"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors"
              >
                LINE: @dreamskycnx99
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white/70" />
              <a
                href="tel:+66823138099"
                className="hover:text-orange transition-colors"
              >
                082-313-8099
              </a>
            </li>
            {/* TODO: add WhatsApp when customer provides number */}
            <WeChatLink />
            <li className="flex items-center gap-2">
              <TikTokIcon className="h-4 w-4 text-white/70" />
              <a
                href="https://www.tiktok.com/@dreamskyparamotor"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors"
              >
                {t("tiktok")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FacebookIcon className="h-4 w-4 text-white/70" />
              <a
                href="https://www.facebook.com/profile.php?id=61573311088766"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors"
              >
                {t("facebook")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src="/images/google_map.png"
                alt="Google Maps"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors"
              >
                {t("location")}
              </a>
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

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { WeChatIcon } from "@/components/icons/BrandIcons";

export default function WeChatLink() {
  const t = useTranslations("footer");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <li className="flex items-center gap-2">
        <WeChatIcon className="h-4 w-4 text-white/70" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hover:text-orange transition-colors cursor-pointer"
        >
          {t("wechat")}
        </button>
      </li>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("wechat_qr_title")}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-center text-gray-900 font-semibold text-base">
              {t("wechat_qr_title")}
            </h3>
            <p className="mt-1 text-center text-xs text-gray-500">
              Dreamskyparamotorcnx
            </p>
            <div className="mt-4 flex justify-center">
              <Image
                src="/images/wechat-qr.jpg"
                alt="WeChat QR code"
                width={320}
                height={420}
                className="h-auto w-full max-w-[280px] object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-gray-600">
              {t("wechat_qr_hint")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

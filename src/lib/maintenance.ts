import { CONTACT } from "@/lib/site";

export const MAINTENANCE_MODE_ENABLED =
  process.env.MAINTENANCE_MODE === "true" ||
  process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export function renderMaintenanceHtml(): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>ปรับปรุงระบบ · Under Maintenance · 系统维护中 — Dream Sky Paramotor CNX</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Prompt", "Noto Sans SC", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: linear-gradient(180deg, #0b1f3a 0%, #06142a 100%);
    color: #f5f7fb;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    line-height: 1.6;
  }
  .card {
    width: 100%;
    max-width: 640px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 40px 32px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  }
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    font-weight: 700;
    color: #fff;
    font-size: 18px;
  }
  .logo img { width: 40px; height: 40px; object-fit: contain; }
  .accent { color: #ff7a1a; }
  .badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255, 122, 26, 0.15);
    color: #ffb37a;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 26px;
    margin: 0 0 12px;
    color: #fff;
    line-height: 1.3;
  }
  p { margin: 0 0 8px; color: rgba(245, 247, 251, 0.78); font-size: 15px; }
  .lang-block { padding: 18px 0; border-top: 1px solid rgba(255, 255, 255, 0.08); }
  .lang-block:first-of-type { border-top: 0; padding-top: 0; }
  .lang-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(245, 247, 251, 0.45);
    margin-bottom: 6px;
  }
  .contact {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .contact-title {
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(245, 247, 251, 0.6);
    margin-bottom: 14px;
  }
  .contact-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .contact-list a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 999px;
    background: #ff7a1a;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: transform 0.15s ease, background 0.15s ease;
  }
  .contact-list a.secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #f5f7fb;
  }
  .contact-list a:hover { transform: translateY(-1px); background: #ff8c3a; }
  .contact-list a.secondary:hover { background: rgba(255, 255, 255, 0.14); }
  .footer { margin-top: 28px; font-size: 12px; color: rgba(245, 247, 251, 0.4); }
  @media (max-width: 480px) {
    .card { padding: 28px 22px; }
    h1 { font-size: 22px; }
    p { font-size: 14px; }
  }
</style>
</head>
<body>
  <main class="card" role="main">
    <div class="logo">
      <img src="/images/logo-02.png" alt="Dream Sky Paramotor CNX" />
      <span>Dream Sky <span class="accent">Paramotor</span> CNX</span>
    </div>

    <span class="badge">ปรับปรุงระบบ · Maintenance · 维护中</span>

    <div class="lang-block">
      <div class="lang-label">ภาษาไทย</div>
      <h1>ขออภัย เว็บไซต์อยู่ระหว่างปรับปรุงชั่วคราว</h1>
      <p>เราจะกลับมาให้บริการในเร็วๆ นี้ ขอบคุณที่ให้ความสนใจ</p>
      <p>หากต้องการจองเที่ยวบินหรือสอบถามข้อมูล ติดต่อเราได้ตามช่องทางด้านล่าง</p>
    </div>

    <div class="lang-block">
      <div class="lang-label">English</div>
      <h1>We're temporarily down for maintenance</h1>
      <p>We'll be back online shortly. Thanks for your patience.</p>
      <p>To book a flight or ask a question, reach us through the channels below.</p>
    </div>

    <div class="lang-block">
      <div class="lang-label">中文</div>
      <h1>网站正在维护中,稍后回来</h1>
      <p>感谢您的耐心等候,我们很快就会恢复服务。</p>
      <p>如需预订飞行或咨询,请通过以下方式联系我们。</p>
    </div>

    <div class="contact">
      <div class="contact-title">ติดต่อเรา · Contact · 联系我们</div>
      <div class="contact-list">
        <a href="${CONTACT.lineUrl}" target="_blank" rel="noopener noreferrer">LINE: @${CONTACT.lineId}</a>
        <a href="tel:${CONTACT.phone}" class="secondary">📞 ${CONTACT.phoneDisplay}</a>
        <a href="${CONTACT.wechatUrl}" target="_blank" rel="noopener noreferrer" class="secondary">WeChat</a>
      </div>
    </div>

    <div class="footer">© 2026 Dream Sky Paramotor CNX · Chiang Mai, Thailand</div>
  </main>
</body>
</html>`;
}

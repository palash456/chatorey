import Link from 'next/link';

export const metadata = { title: 'Privacy · Chatorey' };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-lg px-5 py-8 text-[15px] leading-relaxed text-ink">
      <Link href="/" className="text-[13px] font-bold text-brand">← Back to app</Link>
      <h1 className="mt-4 text-[24px] font-extrabold">Privacy policy</h1>
      <p className="mt-2 text-muted">Prototype / demo — last updated {new Date().toLocaleDateString('en-IN')}</p>
      <section className="mt-6 space-y-4">
        <p><b>What this build is.</b> Chatorey in this repository is a high-fidelity product prototype. It does not process real payments or connect to live delivery partners.</p>
        <p><b>Data on your device.</b> Preferences, baskets, orders, and community actions are stored in your browser (localStorage) unless you clear them.</p>
        <p><b>Location.</b> You pick an area manually. We do not read GPS in this prototype.</p>
        <p><b>Photos &amp; UGC.</b> Adding a stall may use images you upload; in production these would be moderated and tied to an account.</p>
        <p><b>Contact.</b> For the pilot: hello@chatorey.app</p>
      </section>
    </main>
  );
}

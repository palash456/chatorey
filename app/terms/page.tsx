import Link from 'next/link';

export const metadata = { title: 'Terms · Chatorey' };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-lg px-5 py-8 text-[15px] leading-relaxed text-ink">
      <Link href="/" className="text-[13px] font-bold text-brand">← Back to app</Link>
      <h1 className="mt-4 text-[24px] font-extrabold">Terms of use</h1>
      <p className="mt-2 text-muted">Prototype / demo — not a live marketplace</p>
      <section className="mt-6 space-y-4">
        <p><b>Platform role.</b> Chatorey helps people discover street food and place orders with independent vendors. Vendors cook food; delivery partners (when live) handle pickup and drop-off.</p>
        <p><b>No warranty in demo.</b> Menu items, prices, hours, and ratings in this build are sample data for Jaipur unless marked as added by you locally.</p>
        <p><b>Orders.</b> Checkout in the prototype does not charge your UPI or card. Do not treat order confirmations as real purchases.</p>
        <p><b>Community.</b> Be respectful. Production will include reporting and moderation.</p>
        <p><b>Governing law.</b> Intended for operation in India (Rajasthan) when launched.</p>
      </section>
    </main>
  );
}

export function stallShareUrl(stallId: string) {
  if (typeof window === 'undefined') return `/?stall=${stallId}`;
  const u = new URL(window.location.href);
  u.searchParams.set('stall', stallId);
  u.hash = '';
  return u.toString();
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fallback below */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export async function shareStall(name: string, stallId: string): Promise<'shared' | 'copied' | 'failed'> {
  const url = stallShareUrl(stallId);
  const text = `Check out ${name} on Chatorey — street food worth ordering in Jaipur.`;
  try {
    if (navigator.share) {
      await navigator.share({ title: name, text, url });
      return 'shared';
    }
  } catch (e) {
    if ((e as Error).name === 'AbortError') return 'failed';
  }
  return (await copyText(url)) ? 'copied' : 'failed';
}

export async function shareInviteVendor(stallName: string, stallId: string): Promise<'shared' | 'copied' | 'failed'> {
  const url = stallShareUrl(stallId);
  const text = `Hi! ${stallName} is on Chatorey — locals are ordering from you. Join as a vendor: ${url}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: `Invite ${stallName}`, text, url });
      return 'shared';
    }
  } catch (e) {
    if ((e as Error).name === 'AbortError') return 'failed';
  }
  return (await copyText(text)) ? 'copied' : 'failed';
}

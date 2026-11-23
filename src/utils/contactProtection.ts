const USER_CODES = [
  110, 103, 117, 121, 101, 110, 118, 97, 110, 104, 111, 97, 110, 103, 108, 111,
  110, 103, 52, 55, 56,
];

const DOMAIN_CODES = [103, 109, 97, 105, 108, 46, 99, 111, 109];

function decodeCodes(codes: number[]): string {
  return String.fromCharCode(...codes);
}

export function resolveContactEmail(): string {
  return `${decodeCodes(USER_CODES)}${String.fromCharCode(64)}${decodeCodes(DOMAIN_CODES)}`;
}

export function openContactMailto(subject?: string, body?: string): void {
  if (typeof window === 'undefined') return;
  const address = resolveContactEmail();
  const params: string[] = [];
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  window.location.href = `${String.fromCharCode(109, 97, 105, 108, 116, 111, 58)}${address}${query}`;
}

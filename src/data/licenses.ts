export interface LicenseItem {
  id: string;
  authority: string;
  subtitle: string;
  registrationNumber: string;
  logo: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * REGISTERED & LICENSED BUSINESS DETAILS
 * ─────────────────────────────────────────────────────────────────────────────
 * Minimal, elegant compliance & trust data for footer display.
 * The owner replaces placeholder registration numbers with their actual details.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const licenses: LicenseItem[] = [
  {
    id: 'fssai',
    authority: 'FSSAI',
    subtitle: 'Licensed Food Business',
    registrationNumber: 'FSSAI No. XXXXXXXXXXXX',
    logo: '/brand/licenses/fssai.png',
  },
  {
    id: 'msme',
    authority: 'MSME / UDYAM',
    subtitle: 'Registered Business',
    registrationNumber: 'UDYAM-WB-03-000030',
    logo: '/brand/licenses/msme.png',
  },
  {
    id: 'trade',
    authority: 'Trade License',
    subtitle: 'Valid Business Registration',
    registrationNumber: 'Reg. Under Kalna Municipality',
    logo: '/brand/licenses/trade-emblem.png',
  },
];

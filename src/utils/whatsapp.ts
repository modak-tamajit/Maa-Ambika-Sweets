import { BUSINESS } from '@/config/business';

export interface WhatsAppEnquiryOptions {
  occasion?: string;
  guests?: string;
  sweetPreference?: string;
  productName?: string;
  customNote?: string;
}

/**
 * Builds a clean, contextual WhatsApp message from customer selections.
 */
export function buildWhatsAppMessage(options: WhatsAppEnquiryOptions = {}): string {
  const { occasion, guests, sweetPreference, productName, customNote } = options;

  // Single product enquiry
  if (productName) {
    return `Hello ${BUSINESS.name.english}, I would like to enquire about ${productName}. Please share availability and pricing details.`;
  }

  // Bulk / Occasion celebration enquiry
  const parts: string[] = [];
  parts.push(`Hi ${BUSINESS.name.english},`);

  if (occasion && guests && guests !== 'Not sure') {
    parts.push(`I would like to enquire about sweets for approximately ${guests} guests for a ${occasion}.`);
  } else if (occasion) {
    parts.push(`I would like to enquire about sweets for a ${occasion}.`);
  } else if (guests && guests !== 'Not sure') {
    parts.push(`I would like to enquire about sweets for approximately ${guests} guests.`);
  } else {
    parts.push(`I would like to enquire about sweet arrangements for an upcoming celebration.`);
  }

  if (sweetPreference && sweetPreference !== 'Not sure') {
    parts.push(`I am interested in ${sweetPreference}.`);
  }

  if (customNote && customNote.trim()) {
    parts.push(`Additional note: ${customNote.trim()}`);
  }

  parts.push('Please share availability, recommended varieties, and pricing.');
  return parts.join(' ');
}

/**
 * Constructs a fully URL-encoded WhatsApp link using the central BUSINESS number.
 */
export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = BUSINESS.whatsapp.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

/**
 * Returns direct phone call link for fallback.
 */
export function getTelephoneUrl(): string {
  const cleanPhone = BUSINESS.phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone}`;
}

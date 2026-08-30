export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export type AnalyticsEventName =
  | 'product_view'
  | 'view_all_products'
  | 'occasion_selected'
  | 'bulk_enquiry_started'
  | 'bulk_enquiry_completed'
  | 'whatsapp_clicked'
  | 'phone_clicked'
  | 'email_clicked'
  | 'directions_clicked'
  | 'google_reviews_clicked'
  | 'faq_opened';

/**
 * Lightweight, zero-dependency analytics dispatcher.
 * Dispatches conversion events safely without degrading performance.
 */
export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsParams): void {
  if (typeof window === 'undefined') return;

  // Safe developer logging
  if (process.env.NODE_ENV === 'development') {
    // console.debug(`[Analytics Event: ${eventName}]`, params);
  }

  // Extensible integration point for future providers (e.g. gtag, plausible, mixpanel)
  try {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    }
  } catch {
    // Silently suppress any third-party tracking errors
  }
}

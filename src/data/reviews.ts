export interface GoogleReview {
  id: string;
  authorName: string;
  rating: number;       // e.g. 5
  relativeTimeDescription: string; // e.g. '2 months ago'
  text: string;
  authorInitial?: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * GOOGLE REVIEWS DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Strictly store authentic, verified Google Reviews from the Maa Ambika Sweets
 * Google Maps listing. Never fabricate reviews or invent customer feedback.
 *
 * When empty, the UI gracefully renders a clean customer review section with a
 * direct link to the Google Maps listing.
 *
 * HOW TO ADD A VERIFIED GOOGLE REVIEW:
 * Add an object to the `reviews` array below:
 *
 * {
 *   id: 'rev-1',
 *   authorName: 'Customer Name',
 *   rating: 5,
 *   relativeTimeDescription: '3 months ago',
 *   text: 'Authentic taste and fresh sweets.',
 *   authorInitial: 'C'
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const reviews: GoogleReview[] = [];

export interface Product {
  id: string;
  nameEnglish: string;
  nameBengali: string;
  descriptionEnglish: string;
  descriptionBengali: string;
  image: string;       // File name inside public/catalogue/, e.g., 'rasogolla.jpg'
  category: string;    // e.g. 'Syrup-based', 'Sandesh & Dry Sweets', 'Curd & Dairy'
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PRODUCT CATALOGUE DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * The owner adds products manually as photography and details become available.
 * Do not invent products.
 *
 * HOW TO ADD A NEW PRODUCT:
 * 1. Place the product image in: public/catalogue/<filename>.jpg
 * 2. Add an object to the `products` array below:
 *
 * {
 *   id: 'rasogolla',
 *   nameEnglish: 'Rasogolla',
 *   nameBengali: 'রসগোল্লা',
 *   descriptionEnglish: 'Soft, spongy cottage cheese balls steeped in pure, light sugar syrup.',
 *   descriptionBengali: 'হালকা চিনির রসে তৈরি তুলতুলে ও নরম ছানার রসগোল্লা।',
 *   image: 'rasogolla.jpg',
 *   category: 'Syrup-based',
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const products: Product[] = [];

export interface Product {
  id: string;
  nameEnglish: string;
  nameBengali: string;
  descriptionEnglish: string;
  descriptionBengali: string;
  image: string;
  category: string;
}

 
export const products: Product[] = [
  {
    id: 'nolen-gur-rasogolla',
    nameEnglish: 'Nolen Gur Rasogolla',
    nameBengali: 'নলেন গুড়ের রসগোল্লা',
    descriptionEnglish:
      'Soft, spongy chhena balls delicately soaked in fragrant Nolen Gur syrup (Date Palm Jaggery).',
    descriptionBengali:
      'সুগন্ধি নলেন গুড়ের রসে ভেজানো তুলতুলে ও নরম ছানার রসগোল্লা।',
    image: 'Nolen_Gur_Rasogolla.png',
    category: 'Syrup-based',
  },

  {  
    id: 'nolen-gur-sandesh',
    nameEnglish: 'Nolen Gur Sandesh',
    nameBengali: 'নলেন গুড় সন্দেশ',
    descriptionEnglish:
      'A traditional Bengali sweet made with fresh chhena and flavored with Nolen Gur (Date Palm Jaggery).',
    descriptionBengali:
      'তাজা ছানা দিয়ে তৈরি একটি ঐতিহ্যবাহী বাঙালি মিষ্টি, যা নলেন গুড়ের স্বাদে ভরা।',
    image: 'Nolen_Gur_Sandesh.png',
    category: 'Chhena-based', 
  }
];
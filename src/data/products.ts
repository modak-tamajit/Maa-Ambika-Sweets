export interface Product {
  id: string;
  nameEnglish: string;
  nameBengali: string;
  descriptionEnglish: string;
  descriptionBengali: string;
  image: string;
  altText: string;
  category: string;
  occasionTags?: string[];
  season?: 'all-year' | 'winter' | 'seasonal';
}

export const products: Product[] = [
  {
    id: 'rasogolla',
    nameEnglish: 'Rasogolla',
    nameBengali: 'রসগোল্লা',
    descriptionEnglish:
      'Soft, spongy chhena balls soaked in light sugar syrup, capturing the timeless taste of Bengal.',
    descriptionBengali:
      'হালকা চিনির রসে ভেজানো নরম ও তুলতুলে ছানার রসগোল্লা, বাংলার চিরন্তন স্বাদের এক মিষ্টি ঐতিহ্য।',
    image: 'Rossogolla.png',
    altText: 'Spongy white Bengali Rasogollas soaked in light sugar syrup and served in a traditional bowl',
    category: '',
    occasionTags: ['wedding', 'annaprashan', 'durga-puja', 'birthday', 'festivals'],
    season: 'all-year',
  },
  {
    id: 'makha-sandesh',
    nameEnglish: 'Makha Sondesh',
    nameBengali: 'মাখা সন্দেশ',
    descriptionEnglish:
      'Freshly prepared chhena (Cottage Cheese) gently mixed with sugar to create a soft, crumbly and delicately sweet Bengali classic.',
    descriptionBengali:
      'তাজা ছানা ও চিনি আলতো করে মিশিয়ে তৈরি নরম, ঝুরঝুরে ও মিষ্টি স্বাদের এক চিরন্তন বাঙালি ঐতিহ্য।',
    image: 'Makha_Sondesh.png',
    altText: 'Traditional soft and crumbly Makha Sandesh sweet garnished with pistachios in an earthen bowl',
    category: '',
    occasionTags: ['wedding', 'annaprashan', 'durga-puja', 'birthday', 'festivals'],
    season: 'all-year',
  },
  {
    id: 'nolen-gur-rasogolla',
    nameEnglish: 'Nolen Gur Rasogolla',
    nameBengali: 'নলেন গুড়ের রসগোল্লা',
    descriptionEnglish:
      'Soft, spongy chhena balls (Cottage Cheese Balls) delicately soaked in fragrant Nolen Gur syrup (Date Palm Jaggery).',
    descriptionBengali:
      'সুগন্ধি নলেন গুড়ের রসে ভেজানো তুলতুলে ও নরম ছানার রসগোল্লা।',
    image: 'Nolen_Gur_Rasogolla.png',
    altText: 'Spongy Bengali Rasogollas soaked in warm date palm jaggery (Nolen Gur) syrup inside a clay handi',
    category: 'Winters Only',
    occasionTags: ['wedding', 'festivals', 'birthday'],
    season: 'winter',
  },
  {
    id: 'nolen-gur-sandesh',
    nameEnglish: 'Nolen Gur Sandesh',
    nameBengali: 'নলেন গুড় সন্দেশ',
    descriptionEnglish:
      'A traditional Bengali sweet made with fresh chhena (Cottage Cheese) and flavored with Nolen Gur (Date Palm Jaggery).',
    descriptionBengali:
      'তাজা ছানা দিয়ে তৈরি একটি ঐতিহ্যবাহী বাঙালি মিষ্টি, যা নলেন গুড়ের স্বাদে ভরা।',
    image: 'Nolen_Gur_Makha_Sondesh.png',
    altText: 'Handcrafted Nolen Gur Sandesh sweet confection made with date palm jaggery and fresh chhana',
    category: 'Winters Only',
    occasionTags: ['wedding', 'festivals', 'birthday'],
    season: 'winter',
  },
];
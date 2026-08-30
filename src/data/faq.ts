export interface FAQItem {
  id: string;
  questionEnglish: string;
  questionBengali: string;
  answerEnglish: string;
  answerBengali: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'bulk-orders',
    questionEnglish: 'Do you take bulk orders for weddings and celebrations?',
    questionBengali: 'আপনারা কি বিবাহ ও শুভ অনুষ্ঠানের জন্য বাল্ক অর্ডার নেন?',
    answerEnglish:
      'Yes, we regularly prepare celebratory sweet platters and bulk batches for weddings, Annaprashan, and festive gatherings. Please contact us on WhatsApp to discuss your guest count and current arrangements.',
    answerBengali:
      'হ্যাঁ, আমরা বিবাহ, অন্নপ্রাশন ও পারিবারিক অনুষ্ঠানের জন্য বিশেষ বাল্ক মিষ্টি তৈরি করি। আপনার প্রয়োজনীয় পরিমাণ জানতে সরাসরি হোয়াটসঅ্যাপে আমাদের সাথে যোগাযোগ করুন।',
  },
  {
    id: 'custom-packaging',
    questionEnglish: 'Can we order customized gift boxes and traditional curd pots?',
    questionBengali: 'অনুষ্ঠানের জন্য কি কাস্টমাইজড মিষ্টির বাক্স ও দইয়ের হাঁড়ির ব্যবস্থা আছে?',
    answerEnglish:
      'Yes, we offer curated sweet packaging and traditional earthen pots (matir handi) for special occasions. Reach out to us directly on WhatsApp to coordinate your preferred assortments.',
    answerBengali:
      'হ্যাঁ, বিভিন্ন শুভ অনুষ্ঠানের জন্য সুসজ্জিত মিষ্টির প্যাকেট এবং ঐতিহ্যবাহী মাটির হাঁড়ির ব্যবস্থা রয়েছে। আপনার পছন্দমতো মিষ্টি সাজাতে হোয়াটসঅ্যাপে কথা বলুন।',
  },
  {
    id: 'advance-notice',
    questionEnglish: 'How much advance notice is required for bulk orders?',
    questionBengali: 'বড় অর্ডারের জন্য কতদিন আগে জানাতে হয়?',
    answerEnglish:
      'For bulk orders and festive requirements, we recommend contacting us 3 to 4 days in advance so our confectioners can prepare your batch at peak freshness.',
    answerBengali:
      'অনুষ্ঠানের বাল্ক অর্ডারের ক্ষেত্রে মিষ্টির সর্বোচ্চ তাজা ভাব বজায় রাখতে ৩ থেকে ৪ দিন আগে জানানোর অনুরোধ করা হচ্ছে।',
  },
  {
    id: 'nolen-gur-season',
    questionEnglish: 'Are Nolen Gur sweets available throughout the year?',
    questionBengali: 'নলেন গুড়ের মিষ্টি কি সারা বছর পাওয়া যায়?',
    answerEnglish:
      'Nolen Gur (Date Palm Jaggery) delicacies are seasonal winter specials prepared exclusively during the colder months when authentic fresh jaggery is harvested in Bengal.',
    answerBengali:
      'নলেন গুড়ের মিষ্টি শীতকালীন বিশেষ আয়োজন। খাঁটি ঝোলা গুড়ের স্বাভাবিক গুণমান বজায় রাখতে এটি শুধুমাত্র শীতের মাসগুলিতেই তৈরি করা হয়।',
  },
  {
    id: 'store-pickup',
    questionEnglish: 'Can I place an enquiry and pick up directly from the shop?',
    questionBengali: 'দোকান থেকে সরাসরি অর্ডার সংগ্রহ করার সুযোগ আছে কি?',
    answerEnglish:
      'Yes, you can pre-book via WhatsApp and collect your freshly packed sweets directly from our shop in Rameswarpur, Kalna during our daily opening hours.',
    answerBengali:
      'হ্যাঁ, আপনি হোয়াটসঅ্যাপে আগে থেকে যোগাযোগ করে কালনার রামেশ্বরপুরে আমাদের দোকান থেকে সরাসরি তাজা মিষ্টি সংগ্রহ করতে পারেন।',
  },
  {
    id: 'daily-hours',
    questionEnglish: 'What are your shop timings and location?',
    questionBengali: 'দোকানের ঠিকানা ও সময়সূচী কী?',
    answerEnglish:
      'We are open all 7 days a week from 8:00 AM to 10:00 PM on Boinchi - Kalna Road in Rameswarpur, Kalna, Purba Bardhaman.',
    answerBengali:
      'আমরা সপ্তাহের প্রতিদিন সকাল ৮:০০টা থেকে রাত ১০:০০টা পর্যন্ত খোলা থাকি। আমাদের ঠিকানা: বৈঁচি - কালনা রোড, রামেশ্বরপুর, কালনা, পূর্ব বর্ধমান।',
  },
];

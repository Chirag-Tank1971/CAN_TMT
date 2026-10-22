import type { Translations } from './en';

export const hi: Translations = {
  nav: {
    logo: 'CAN TMT',
    links: ['CAN TMT क्यों?', 'उत्पाद', 'उपयोग', 'संपर्क'],
    cta: 'कोटेशन लें',
  },
  hero: {
    tagline: 'हाँ, हम बना सकते हैं।',
    subTagline: 'मजबूत नींव, मजबूत घर।',
    headline: 'भारत के भविष्य के\nलिए इस्पात',
    subheadline:
      'मजबूती, लचीलेपन और भूकंप प्रतिरोध के लिए इंजीनियर्ड प्रीमियम TMT सरिया — नींव जो पीढ़ियों तक टिके।',
    ctaPrimary: 'कोटेशन लें',
    ctaSecondary: 'WhatsApp करें',
    scrollHint: 'नीचे स्क्रॉल करें',
  },
  why: {
    sectionTag: 'CAN TMT क्यों?',
    heading: 'हर सरिया, टिकाऊपन के लिए',
    subheading:
      'हमारी TMT सरिया IS 1786 मानकों को पूरा करती है और उनसे भी आगे जाती है।',
    features: [
      {
        icon: '⚡',
        title: 'उच्च मजबूती',
        body: 'ज्यादा yield strength आपकी संरचना को दशकों तक मजबूत रखती है।',
      },
      {
        icon: '🌊',
        title: 'बेहतरीन लचीलापन',
        body: 'टूटे बिना मुड़ना — भूकंप की ऊर्जा को झेलने के लिए जरूरी।',
      },
      {
        icon: '🏔️',
        title: 'भूकंप प्रतिरोध',
        body: 'मुड़े और वापस आए — पूरे भारत के seismic zone के लिए तैयार।',
      },
      {
        icon: '🔗',
        title: 'वेल्डिंग में आसान',
        body: 'कम carbon equivalent से बिना गरम किए साफ वेल्डिंग होती है।',
      },
      {
        icon: '🛡️',
        title: 'जंग से सुरक्षा',
        body: 'tempering प्रक्रिया से बाहरी परत मजबूत होती है जो जंग से बचाती है।',
      },
      {
        icon: '✅',
        title: 'IS 1786 प्रमाणित',
        body: '[TODO: BIS/ISI प्रमाण पत्र और लाइसेंस नंबर यहाँ जोड़ें]',
      },
    ],
  },
  crossSection: {
    sectionTag: 'अंदर की इंजीनियरिंग',
    heading: 'मजबूती के पीछे का विज्ञान',
    outerLabel: 'कठोर Martensite\nबाहरी परत',
    outerDesc: 'सतह के दबाव को झेलने वाली मजबूत बाहरी परत',
    transitionLabel: 'Transition Zone',
    transitionDesc: 'धीरे-धीरे बदलाव, टूटने से बचाता है',
    coreLabel: 'लचीला Ferrite-Pearlite\nकोर',
    coreDesc: 'नरम भीतरी हिस्सा ऊर्जा को बिना टूटे सोखता है',
  },
  process: {
    sectionTag: 'कैसे बनता है',
    heading: 'तीन चरण। अटूट इस्पात।',
    steps: [
      {
        number: '01',
        title: 'Quenching',
        body: '900°C+ पर लाल-गरम सरिया को तेजी से पानी से ठंडा किया जाता है — बाहरी martensite परत मिलीसेकंड में बन जाती है।',
      },
      {
        number: '02',
        title: 'Self-Tempering',
        body: 'अंदरूनी core की बची हुई गर्मी बाहर आती है और martensite परत को temper करती है — कोई भट्टी नहीं चाहिए।',
      },
      {
        number: '03',
        title: 'वायुमंडलीय ठंडक',
        body: 'cooling bed पर अंतिम ठंडक से core ferrite-pearlite में बदलता है — जो सरिया को लचीलापन देता है।',
      },
    ],
  },
  products: {
    sectionTag: 'उत्पाद श्रेणी',
    heading: 'हर ग्रेड, हर साइज',
    subheading: 'अपने प्रोजेक्ट के लिए सही specification चुनें।',
    grades: [
      { id: 'fe500', label: 'Fe 500', yieldStrength: '500 MPa', application: 'सामान्य निर्माण, आवासीय' },
      { id: 'fe500d', label: 'Fe 500D', yieldStrength: '500 MPa+', application: 'भूकंप क्षेत्र, ऊँची इमारतें' },
      { id: 'fe550d', label: 'Fe 550D', yieldStrength: '550 MPa', application: 'पुल, औद्योगिक संरचनाएँ' },
      { id: 'fe600', label: 'Fe 600', yieldStrength: '600 MPa', application: 'भारी बुनियादी ढाँचा, मेगा प्रोजेक्ट' },
    ],
    diameters: [8, 10, 12, 16, 20, 25, 32],
    diameterUnit: 'मिमी',
    ctaQuote: 'इस Spec के लिए कीमत जानें',
  },
  applications: {
    sectionTag: 'उपयोग',
    heading: 'एक कमरे से आसमान तक',
    items: [
      {
        title: 'घर और विला',
        description: 'आपके परिवार का भविष्य जिस नींव पर खड़ा है। भूकंप प्रतिरोध के लिए Fe 500D।',
        image: 'home',
      },
      {
        title: 'अपार्टमेंट कॉम्प्लेक्स',
        description: 'बहुमंजिला इमारतों में हर मंजिल पर समान गुणवत्ता जरूरी है।',
        image: 'apartment',
      },
      {
        title: 'पुल और फ्लाईओवर',
        description: 'ज्यादा load, लंबा span — यहाँ Fe 550D और Fe 600 की असली परीक्षा होती है।',
        image: 'bridge',
      },
      {
        title: 'व्यावसायिक इमारतें',
        description: 'दफ्तर, मॉल और होटल — लंबे समय तक टिकाऊ।',
        image: 'commercial',
      },
      {
        title: 'औद्योगिक संरचनाएँ',
        description: 'फैक्टरियाँ, गोदाम और प्लांट — भारी मशीनों के लिए तैयार।',
        image: 'industrial',
      },
    ],
  },
  stats: {
    sectionTag: 'हमारा ट्रैक रिकॉर्ड',
    heading: 'वो संख्याएँ जो भरोसा बनाती हैं',
    items: [
      { value: 'TODO', suffix: '+', label: 'वर्षों का अनुभव' },
      { value: 'TODO', suffix: 'T+', label: 'टन सप्लाई' },
      { value: 'TODO', suffix: '+', label: 'डीलर नेटवर्क' },
      { value: 'TODO', suffix: '+', label: 'शहर' },
    ],
  },
  howToOrder: {
    sectionTag: 'ऑर्डर कैसे करें',
    heading: 'तीन आसान चरण',
    steps: [
      { number: '01', title: 'पूछताछ', body: 'Call, WhatsApp या फॉर्म भरें। ग्रेड, साइज और मात्रा बताएं।' },
      { number: '02', title: 'कोटेशन', body: '2 घंटे में पारदर्शी कीमत। कोई छुपा चार्ज नहीं।' },
      { number: '03', title: 'जल्द डिलीवरी', body: 'हम आपकी साइट पर logistics संभालते हैं। [TODO: डिलीवरी समय जोड़ें]' },
    ],
  },
  contact: {
    sectionTag: 'संपर्क करें',
    heading: 'मिलकर बनाएँ',
    subheading: 'bulk quote, dealer partnership या किसी भी सवाल के लिए संपर्क करें।',
    formName: 'आपका नाम',
    formPhone: 'फोन / WhatsApp नंबर',
    formCity: 'आपका शहर',
    formGrade: 'ग्रेड चाहिए',
    formMessage: 'संदेश (मात्रा, प्रोजेक्ट का प्रकार…)',
    formSubmit: 'WhatsApp पर भेजें',
    formFallback: 'या ईमेल भेजें',
    phone: '[NUMBER]',
    email: '[EMAIL]',
    address: '[ADDRESS]',
    whatsappNumber: '[NUMBER]',
  },
  faq: {
    sectionTag: 'अक्सर पूछे जाने वाले सवाल',
    heading: 'आपके सवाल',
    items: [
      {
        q: 'TMT सरिया और साधारण सरिया में क्या फर्क है?',
        a: 'TMT (Thermo-Mechanically Treated) सरिया को एक नियंत्रित quenching प्रक्रिया से गुजरा जाता है जो बाहरी परत को कठोर और अंदर को लचीला बनाती है। साधारण सरिया पूरी तरह एक जैसी होती है — कमजोर, भंगुर और जंग लगने की संभावना ज्यादा। TMT सरिया ज्यादा टिकाऊ है, भूकंप में टूटती नहीं और वेल्डिंग आसान है।',
      },
      {
        q: 'साइट पर TMT सरिया की गुणवत्ता कैसे जाँचें?',
        a: 'सरिया पर stamped mill markings देखें: निर्माता का नाम, ग्रेड (जैसे Fe 500D) और BIS IS 1786 मार्क। ribs स्पष्ट और एक समान होनी चाहिए। दरारें, laminations या असमान सतह वाली सरिया से बचें। महत्वपूर्ण प्रोजेक्ट के लिए हर batch के साथ Mill Test Certificate (MTC) मांगें। [TODO: BIS लाइसेंस नंबर जोड़ें]',
      },
      {
        q: 'घर बनाने के लिए कौन सा ग्रेड सबसे अच्छा है?',
        a: 'Fe 500D भारत में आवासीय निर्माण के लिए सबसे लोकप्रिय विकल्प है। "D" का मतलब enhanced ductility है जो भूकंप-प्रवण क्षेत्रों (जो भारत के अधिकांश हिस्से हैं) के लिए आदर्श है। बहुत कम seismic risk वाले क्षेत्रों में Fe 500 उपयुक्त है। अपने structural engineer से सलाह लें।',
      },
      {
        q: 'क्या आप व्यक्तिगत घर बनाने वालों को भी supply करते हैं?',
        a: 'हाँ, हम दोनों को supply करते हैं। व्यक्तिगत ग्राहक अपने शहर में हमारे dealer network से ऑर्डर कर सकते हैं। Bulk और project orders सीधे हमसे preferential pricing पर लिए जा सकते हैं।',
      },
      {
        q: 'आप कौन से diameter और length में supply करते हैं?',
        a: 'हम 8mm से 32mm diameter में standard 12-metre length में supply करते हैं। बड़े प्रोजेक्ट के लिए cut-to-length और custom orders उपलब्ध हैं। विवरण के लिए हमारा product range section देखें।',
      },
    ],
  },
  footer: {
    tagline: '"मजबूत नींव, मजबूत घर।"',
    copyright: '© 2024 CAN TMT. सर्वाधिकार सुरक्षित।',
    links: ['गोपनीयता नीति', 'उपयोग की शर्तें', 'Sitemap'],
    isoNote: '[TODO: प्रमाण पत्र और ISO/BIS marks जोड़ें]',
  },
};

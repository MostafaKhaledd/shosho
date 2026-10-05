/**
 * ==============================================================================
 * SIBLING DIGITAL GIFT CONFIGURATION (إعدادات الهدية الرقمية للأخت / الأخ)
 * ==============================================================================
 * تم ربط جميع الصور الحقيقية وتسميتها بأسماء واضحة وجميلة!
 */

const globalScope = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

globalScope.SIBLING_GIFT_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. المعلومات العامة والأسماء
  // ----------------------------------------------------------------------------
  recipientName: "شوشو",                      // اسم أختك الغالية
  senderName: "",                             // صفة المُهدي
  relationshipBadge: "أحلى وأغلى أخت في الكون 🏆",
  secretPassword: "Suss",                    // كلمة السر للدخول
  passwordHint: "💡 تلميح: جربي 'Suss' (الكلمة السرية بتاعتنا!)",

  // ----------------------------------------------------------------------------
  // 2. الظرف وشاشة الدخول
  // ----------------------------------------------------------------------------
  envelopeText: "رسالة خاصة لأغلى أخت في الدنيا ✉️",
  envelopeInstruction: "دوسي على الظرف لفتحه 💌",
  prePasswordMessage: "مش عارف هتكون ردة فعلك إيه... بس جمعتلك أحلى صورنا ومواقفنا وذكرياتنا سوا في مكان واحد بمناسبة عيد ميلادك. جاهزة تفتحي الصندوق؟",
  welcomeBadge: "🎂 كل سنة وانت طيبة يا حببتي",
  welcomeTitle: "ان شاءالله الهدية تعجبك 🙂↔️",
  welcomeMessage: "كل حاجة هنا مننا ولينا... تفاصيل ومواقف صغيرة وضحكات يمكن ماتعرفيش إني لسه فاكرها كلها. كل سنة وإنتي طيبة وعقبال مليون سنة سعادة ونجاح! 🎂✨",

  // ----------------------------------------------------------------------------
  // 3. رأس الصفحة والعداد الحي
  // ----------------------------------------------------------------------------
  headerTitle: "شوية من ذكرياتنا البسيطه جمعتها هنا ✨",
  headerSubtitle: "",
  relationshipStartDate: "2003-02-10", 
  timerSubtext: "سنين وأيام وساعات وثواني من المشاركة، وخروجات الآيس كريم، ووقفتنا في ضهر بعض دايماً! 🤜🤛",

  // ----------------------------------------------------------------------------
  // 4. محطات قصتنا وذكرياتنا (Story Timeline)
  // ----------------------------------------------------------------------------
  timeline: [
    {
      date: "من زمان",
      title: "من يوم ما كنا صغيرين.. وإنتي سندي 👶💗",
      description: "من زمان كنت بقولك يا ماما كنت فاكرك مامتي التانيه وانتي فعلا مامتي",
      image: "assets/images/childhood-hug.jpg",
      tag: "أيام الطفولة"
    },
    {
      date: "مغامرات وجنون",
      title: "جننا سوا بيحلي الحياة 💗",
      description: "احلى وقت بقضيه معاكي ومبحبش اجرب حجات مجنونه غير وانتي معايا",
      image: "assets/images/ski-egypt-adventure.jpg",
      tag: "مغامراتنا سوا"
    },
    {
      date: "رخامتي عليكي",
      title: "كل ما بزهق مبلاقيش غيرك ارخم عليه 🙄",
      description: "مفيش الكلام ده... او او او 🦭",
      image: "assets/images/yacht-sea-trip.jpg",
      tag: "إذا كان عاجبك"
    },
    {
      date: "سندي",
      title: "اي لحظه مبتكملش غير بيكي 🎓🌟",
      description: "ربنا يديم وجودك ليا دايما يا حبيبتي",
      image: "assets/images/graduation-celebration.jpg",
      tag: "وجودك بيفرق في كل لحظه"
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. المشغل الموسيقي
  // ----------------------------------------------------------------------------
  audio: {
    trackTitle: "",
    artistName: "",
    audioSrc: "assets/audio/our-song.mp3",
    coverImg: "assets/images/yacht-sea-trip.jpg"
  },

  // ----------------------------------------------------------------------------
  // 6. الهدية المفاجأة
  // ----------------------------------------------------------------------------
  hiddenGift: {
    boxText: "لسه في حاجة مخبيهالك... 🎁",
    revealImage: "assets/images/whatsapp-surprise-gift.jpeg",
    captionTitle: "توقعي ديه يه 😉",
    captionSubtitle: "حاجة جوه حاجة جوه حاجة جوه حاجة"
  },

  // ----------------------------------------------------------------------------
  // 7. ألبوم ومعرض الذكريات (بدون مفاجأت وهدايا وبدون مواقف وسند)
  // ----------------------------------------------------------------------------
  gallery: [
    {
      id: 1,
      image: "assets/images/childhood-hug.jpg",
      category: "childhood",
      caption: "",
      date: "ذكريات طفولة"
    },
    {
      id: 2,
      image: "assets/images/ski-egypt-adventure.jpg",
      category: "trips",
      caption: "",
      date: "سكي إيجيبت"
    },
    {
      id: 3,
      image: "assets/images/yacht-sea-trip.jpg",
      category: "trips",
      caption: "",
      date: "رحلة بحرية"
    },
    {
      id: 4,
      image: "assets/images/graduation-celebration.jpg",
      category: "milestones",
      caption: "",
      date: "يوم التخرج"
    },
    {
      id: 5,
      image: "assets/images/wedding-hall-white.jpg",
      category: "milestones",
      caption: "",
      date: "أحلى مناسبة"
    },
    {
      id: 8,
      image: "assets/images/sea-crystal-water.jpg",
      category: "trips",
      caption: "",
      date: "في البحر"
    },
    {
      id: 9,
      image: "assets/images/bedouin-tent-kuffiyeh.jpg",
      category: "trips",
      caption: "",
      date: "كامب بدوي"
    },
    {
      id: 10,
      image: "assets/images/safari-mirror-selfie.jpg",
      category: "trips",
      caption: "",
      date: "سفاري"
    },
    {
      id: 11,
      image: "assets/images/marina-palm-promenade.jpg",
      category: "trips",
      caption: "",
      date: "مارينا"
    },
    {
      id: 12,
      image: "assets/images/sunny-beach-walk.jpg",
      category: "trips",
      caption: "",
      date: "على الشاطئ"
    },
    {
      id: 19,
      image: "assets/images/desert-camp-duo.jpg",
      category: "trips",
      caption: "",
      date: "كامب الصحراء"
    },
    {
      id: 20,
      image: "assets/images/safari-camp-fun.jpg",
      category: "trips",
      caption: "",
      date: "ذكريات الكامب"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = globalScope.SIBLING_GIFT_CONFIG;
}

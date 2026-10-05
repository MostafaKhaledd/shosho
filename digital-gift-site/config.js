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
  recipientName: "MK",                        // اسم أختك الغالية
  senderName: "أخوكي",                        // صفة المُهدي
  relationshipBadge: "أحلى وأغلى أخت في الكون 🏆",
  secretPassword: "Suss",                    // كلمة السر للدخول
  passwordHint: "💡 تلميح: جربي 'Suss' (الكلمة السرية بتاعتنا!)",

  // ----------------------------------------------------------------------------
  // 2. الظرف وشاشة الدخول
  // ----------------------------------------------------------------------------
  envelopeText: "رسالة خاصة لأغلى أخت في الدنيا ✉️",
  envelopeInstruction: "دوسي على الظرف لفتحه 💌",
  prePasswordMessage: "مش عارف هتكون ردة فعلك إيه... بس جمعتلك أحلى صورنا ومواقفنا وذكرياتنا سوا في مكان واحد بمناسبة عيد ميلادك. جاهزة تفتحي الصندوق؟",
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
      title: "من يوم ما كنا صغيرين.. وإنتي سندي 👶💛",
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
    },
    {
      date: "اليوم وكل يوم",
      title: "عيد ميلادك يا أحلى وأطيب أخت! 🎂🎉",
      description: "سنة جديدة بتكبري فيها، وتفضلي دايماً الأقرب لقلبي وأجمل نعمة ربنا رزقني بيها.",
      image: "assets/images/kuffiyeh-3d-avatar.jpg",
      tag: "عيد ميلاد سعيد"
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. المشغل الموسيقي
  // ----------------------------------------------------------------------------
  audio: {
    trackTitle: "أغنيتنا وسند ذكرياتنا 🎶",
    artistName: "الموسيقى المصاحبة لذكرياتنا الحلوة",
    audioSrc: "assets/audio/our-song.mp3",
    coverImg: "assets/images/yacht-sea-trip.jpg"
  },

  // ----------------------------------------------------------------------------
  // 6. لقطات وذكريات خاصة (بدلاً من سكرين شوتس الشات)
  // 8 صور حقيقية مختارة بعناية مع كلام وخواطر خاصة من الأخ لأخته
  // ----------------------------------------------------------------------------
  photoMoments: [
    {
      id: 1,
      image: "assets/images/childhood-hug.jpg",
      title: "من يوم ما كنا صغيرين.. وإنتي سندي 👶💛",
      date: "أيام الطفولة",
      tag: "ذكريات زمان",
      note: "فاكرة الصورة دي؟ كنت صغير ومفيش حد يملى عيني غيرك.. من يومنا وإنتي أماني وضهري وسندي في كل وقت.",
      reactionCount: 88
    },
    {
      id: 2,
      image: "assets/images/ski-egypt-adventure.jpg",
      title: "شركاء المغامرة والجنون ❄️⛷️",
      date: "مغامرة سكي إيجيبت",
      tag: "ضهر لضهر",
      note: "ضهر لضهر في أي مغامرة! يوم متنسيش من كتر الضحك والتجمد، دايماً أحلى خروجات وأسعد أوقات بتكون معاكي إنتي.",
      reactionCount: 65
    },
    {
      id: 3,
      image: "assets/images/graduation-celebration.jpg",
      title: "يوم تخرجي وفرحتك بيا 🎓🌟",
      date: "يوم التخرج",
      tag: "فرحة العمر",
      note: "في اليوم ده نظرة الفخر في عينك كانت بالدنيا وما فيها.. مفيش نجاح بيحلى في حياتي غير وإنتي واقفة جنبي ومبسوطة ليا.",
      reactionCount: 99
    },
    {
      id: 4,
      image: "assets/images/yacht-sea-trip.jpg",
      title: "رحلة البحر وضحكة من القلب 🌊⛵",
      date: "أيام الصيف والروقان",
      tag: "ضحكة من القلب",
      note: "الشمس والبحر وأحلى وأطيب ضحكة في الدنيا.. ربنا يديم وجودك اللي بيملى أي مكان نور وفرحة وبهجة.",
      reactionCount: 72
    },
    {
      id: 5,
      image: "assets/images/wedding-hall-white.jpg",
      title: "الشياكة والأناقة البيضاء ✨🤍",
      date: "أحلى إطلالة",
      tag: "فخر وأناقة",
      note: "إيدك في إيدي ومنورة القاعة كلها بجمالك وروحك الطيبة.. فخور بيكي ورافع راسي بيكي في كل وقت وكل مكان.",
      reactionCount: 84
    },
    {
      id: 6,
      image: "assets/images/icecream-night.jpg",
      title: "أيس كريم نص الليل والفضفضة 🍦🌙",
      date: "خروجة عفوية",
      tag: "أيس كريم روقان",
      note: "أبسط الخروجات وأتفه المواقف بتتحول لأحلى ذكريات عشان إنتي معايا.. دايماً شريكة الآيس كريم والفضفضة والضحك.",
      reactionCount: 91
    },
    {
      id: 7,
      image: "assets/images/cinema-popcorn-fun.jpg",
      title: "خروجة السينما والفشار 🍿🎬",
      date: "أيام الفرفشة",
      tag: "سلام وضحك",
      note: "علامة السلام والفشار اللي بيخلص قبل ما الفيلم يبدأ! كل لحظة معاكي بتسيب ذكرى حلوة وابتسامة بتفضل في القلب.",
      reactionCount: 57
    },
    {
      id: 8,
      image: "assets/images/bedouin-tent-kuffiyeh.jpg",
      title: "الكوفية وأجواء الكامب والجدعنة 🏜️🧣",
      date: "كامب الصحراء",
      tag: "أصالة وجدعنة",
      note: "الجدعنة والصحبة اللي مفيش زيها.. حتى اللبس البدوي والكوفية طالعين عليكي قمر وروحك محلياهم أكتر!",
      reactionCount: 79
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. الهدية المخفية والكوبونات
  // ----------------------------------------------------------------------------
  hiddenGift: {
    boxText: "لسه في حاجة مخبيهالك... 🎁",
    revealTitle: "لقيتي الهدية والمفاجأة المخفية! 🎉",
    revealSubtitle: "لأن الكلام لوحده مش كفاية، دي 3 كروت كوبونات أخوية ذهبية رسمية + صورة ومجسم لذكرانا:",
    revealImage: "assets/images/kuffiyeh-3d-avatar.jpg",
    vouchers: [
      {
        badge: "كوبون رقم 1 🍔",
        title: "1x وجبة أو حلى على حسابي",
        desc: "صالح للاستخدام في أي وقت تطلبي فيه أكلتك أو حلوياتك المفضلة بدون أي نقاش أو اعتراض!"
      },
      {
        badge: "كوبون رقم 2 🏆",
        title: "1x كارت الفوز بأي خناقة",
        desc: "استخدمي الكارت ده في أي نقاش أو خناقة بيننا عشان تكسبي فوراً وأعترف رسمياً إنك صح!"
      },
      {
        badge: "كوبون رقم 3 🧹",
        title: "1x كارت خدمة أو مشوار بدون تذمر",
        desc: "سلمي الكارت ده وهعملك أي طلب أو مشوار أو خدمة تطلبيها بابتسامه وبدون أي تذمر."
      }
    ],
    secretLetter: "كل سنة وإنتي طيبة وبخير يا أغلى MK! بعيداً عن الهزار والمقالب، وجودك كأخت ليا من أعظم نعم ربنا في حياتي. بتملي الدنيا فرحة وروح طيبة وسند مفيش زيه. خليكي دايماً واثقة في نفسك وطموحة وماشية ورا أحلامك وناجحة دايماً. بحبك وفخور بيكي في كل خطوة يا أحلى أخت! 💛"
  },

  // ----------------------------------------------------------------------------
  // 8. ألبوم ومعرض الذكريات الكامل (24 صورة حقيقية مصنفة)
  // ----------------------------------------------------------------------------
  gallery: [
    {
      id: 1,
      image: "assets/images/childhood-hug.jpg",
      category: "childhood",
      caption: "من أيام الطفولة وإنتي سندي وحبيبتي 👶💛",
      date: "ذكريات طفولة"
    },
    {
      id: 2,
      image: "assets/images/ski-egypt-adventure.jpg",
      category: "trips",
      caption: "مغامرة التلج والضحك في سكي إيجيبت ❄️⛷️",
      date: "سكي إيجيبت"
    },
    {
      id: 3,
      image: "assets/images/yacht-sea-trip.jpg",
      category: "trips",
      caption: "رحلة اليخت والبحر الفيروزي والشمس 🌊⛵",
      date: "رحلة بحرية"
    },
    {
      id: 4,
      image: "assets/images/graduation-celebration.jpg",
      category: "milestones",
      caption: "يوم التخرج وفرحتنا الكبيرة بنجاحنا سوا 🎓🌟",
      date: "يوم التخرج"
    },
    {
      id: 5,
      image: "assets/images/wedding-hall-white.jpg",
      category: "milestones",
      caption: "إطلالة بيضاء فخمة وأناقة في القاعة ✨🤍",
      date: "أحلى مناسبة"
    },
    {
      id: 6,
      image: "assets/images/cinema-popcorn-fun.jpg",
      category: "bonding",
      caption: "خروجة السينما والفشار وعلامة السلام 🍿✌️",
      date: "سينما وفشار"
    },
    {
      id: 7,
      image: "assets/images/icecream-night.jpg",
      category: "bonding",
      caption: "أيس كريم نص الليل والفضفضة العفوية 🍦🌙",
      date: "روقان نص الليل"
    },
    {
      id: 8,
      image: "assets/images/sea-crystal-water.jpg",
      category: "trips",
      caption: "مياه البحر الكريستالية وأحلى ضحكة 🌊💛",
      date: "في البحر"
    },
    {
      id: 9,
      image: "assets/images/bedouin-tent-kuffiyeh.jpg",
      category: "trips",
      caption: "الكوفية وأجواء الكامب البدوي والضحك 🏜️🧣",
      date: "كامب بدوي"
    },
    {
      id: 10,
      image: "assets/images/safari-mirror-selfie.jpg",
      category: "trips",
      caption: "سيلفي مراية عربية السفاري في الصحراء 🚙📸",
      date: "سفاري"
    },
    {
      id: 11,
      image: "assets/images/marina-palm-promenade.jpg",
      category: "trips",
      caption: "تمشية مارينا النخيل واليخوت الجميلة 🌴⛵",
      date: "مارينا"
    },
    {
      id: 12,
      image: "assets/images/sunny-beach-walk.jpg",
      category: "trips",
      caption: "أيام الصيف والشمس والروقان ☀️🌊",
      date: "على الشاطئ"
    },
    {
      id: 13,
      image: "assets/images/elevator-mirror-selfie.jpg",
      category: "bonding",
      caption: "سيلفي الأسانسير والشياكة والأناقة 🪞✨",
      date: "سيلفي شيك"
    },
    {
      id: 14,
      image: "assets/images/mall-selfie-peace.jpg",
      category: "bonding",
      caption: "سيلفي المول والضحكة وعلامة السلام ✌️🛍️",
      date: "في المول"
    },
    {
      id: 15,
      image: "assets/images/mall-anubis-tshirt.jpg",
      category: "bonding",
      caption: "تيشرت أنوبيس والضحكة العفوية الحلوة 🖤😄",
      date: "خروجة عفوية"
    },
    {
      id: 16,
      image: "assets/images/cafe-sister-hug.jpg",
      category: "bonding",
      caption: "سند وأمان لبعض في كل الأوقات 💛🤝",
      date: "أمان وسند"
    },
    {
      id: 17,
      image: "assets/images/evening-cafe-hearts.jpg",
      category: "bonding",
      caption: "قعدة الكافيه وقلوب الأصابع المليانة محبة 🫰☕",
      date: "في الكافيه"
    },
    {
      id: 18,
      image: "assets/images/cafe-mirror-smile.jpg",
      category: "bonding",
      caption: "ابتسامة وسيلفي مراية الكافيه ☕🪞",
      date: "كافيه"
    },
    {
      id: 19,
      image: "assets/images/desert-camp-duo.jpg",
      category: "trips",
      caption: "في قلب الصحراء والكامب مع أحلى أخت ⛺🔥",
      date: "كامب الصحراء"
    },
    {
      id: 20,
      image: "assets/images/safari-camp-fun.jpg",
      category: "trips",
      caption: "ضحك ومواقف مبتتنسيش في الكامب 🏕️✨",
      date: "ذكريات الكامب"
    },
    {
      id: 21,
      image: "assets/images/pool-heart-shadow.jpg",
      category: "bonding",
      caption: "ظل القلب الجميل عند المسبح 🏊💖",
      date: "ظل وذكرى"
    },
    {
      id: 22,
      image: "assets/images/moonlight-finger-hearts.jpg",
      category: "bonding",
      caption: "قلوب الأصابع تحت ضوء القمر الساطع 🌕🫰",
      date: "تحت القمر"
    },
    {
      id: 23,
      image: "assets/images/suss-dessert-hearts.jpg",
      category: "bonding",
      caption: "Love at first bite وحلويات مع أحلى أخت 🍰🧁",
      date: "حلويات Süss"
    },
    {
      id: 24,
      image: "assets/images/kuffiyeh-3d-avatar.jpg",
      category: "birthday",
      caption: "المجسم الكيوت بتاعنا بالكوفية الفلسطينية 🎨🧣",
      date: "مجسمنا الكيوت"
    }
  ]
};

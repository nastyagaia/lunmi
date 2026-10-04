// Остальные разделы каталога из папки «lunmi материалы для сайта» (кроме «Ухода для лица» — он в face-care.manifest.mjs).
// Один товар может жить в нескольких разделах: основной раздел — category/type, дополнительные — also.
// Цены и описания — примерные, до появления базы товаров.

export const ROOT = "/Users/anastasiagajkalova/Desktop/lunmi материалы для сайта";

const G = "glow skin/";
const A = "антивозрастной уход/Lunmi_Anti_Age/";
const B = "Для тела/";
const H = "Для волос/Product/";
const S = "Для загара/";
const T = "Бьюти-гаджеты/";
const LIPS = "макияж/Для губ/блески и тинты/";
const LIPSTICK = "макияж/Для губ/помады/";
const FACEMK = "макияж/Для лица/";
const EYES = "макияж/для глаз/";

const FACE = "Уход для лица";
const MAKEUP = "Макияж";
const GLOW = "Glow-skin";
const AGE = "Антивозрастной уход";
const SUN = "Для загара";
const HITS = "Хиты Кореи";

/** Новые товары. files — пути от ROOT */
export const extraProducts = [
  // ---------- из папки glow skin: уходовые средства, живут в «Уходе для лица» и в Glow-skin ----------
  { id: "anua-heartleaf-77-toner", category: FACE, type: "Тонеры и пэды", also: [[GLOW, "Успокаивающий уход"], [HITS, "Бестселлеры Olive Young"]], brand: "Anua", name: "Anua Heartleaf 77% Soothing Toner", title: "Anua Heartleaf 77% Toner", description: "Успокаивающий тонер с хауттюйнией", price: 2490, discount: "10%", hit: true, rating: "4.9", files: [G + "Anua_Heartleaf77_SoothingToner.png"] },
  { id: "cosrx-bha-blackhead", category: FACE, type: "Тонеры и пэды", also: [[GLOW, "Уход за порами"]], brand: "COSRX", name: "COSRX BHA Blackhead Power Liquid", title: "COSRX BHA Blackhead Liquid", description: "Тоник с BHA против чёрных точек", price: 1990, rating: "4.7", files: [G + "COSRX_BHA_BlackheadPowerLiquid.png"] },
  { id: "drjart-ceramidin-cream", category: FACE, type: "Кремы", also: [[GLOW, "Восстановление барьера"]], brand: "Dr.Jart+", name: "Dr.Jart+ Ceramidin Cream", description: "Крем с керамидами для сухой кожи", price: 3490, files: [G + "DrJart_Ceramidin_Cream.png"] },
  { id: "goodal-vita-c-serum", category: FACE, type: "Сыворотки и ампулы", also: [[GLOW, "Сияние кожи"]], brand: "Goodal", name: "Goodal Green Tangerine Vita C Dark Spot Serum", title: "Goodal Green Tangerine Vita C", description: "Сыворотка с витамином C против пятен", price: 2390, discount: "10%", files: [G + "Goodal_GreenTangerine_VitaC.png"] },
  { id: "klairs-vitamin-drop", category: FACE, type: "Сыворотки и ампулы", also: [[GLOW, "Сияние кожи"]], brand: "Klairs", name: "Klairs Freshly Juiced Vitamin Drop", title: "Klairs Freshly Juiced Vitamin Drop", description: "Мягкая сыворотка с витамином C", price: 1890, rating: "4.7", files: [G + "Klairs_FreshlyJuiced_VitaminDrop.png"] },
  { id: "medipeel-melanon-x", category: FACE, type: "Кремы", also: [[GLOW, "Выравнивание тона"], [AGE, "От пигментации"]], brand: "Medi-Peel", name: "Medi-Peel Melanon X Cream", description: "Крем против пигментации", price: 2190, files: [G + "MEDIPEEL_MelanonX_Cream.png"] },
  { id: "medipeel-red-lacto-mask", category: FACE, type: "Маски", also: [[GLOW, "Экспресс-уход"], [AGE, "Коллаген"]], brand: "Medi-Peel", name: "Medi-Peel Red Lacto Collagen Wrapping Mask", title: "Medi-Peel Red Lacto Collagen Mask", description: "Маска-плёнка с коллагеном", price: 2290, hit: true, rating: "4.7", files: [G + "MEDIPEEL_RedLacto_CollagenMask.png"] },
  { id: "numbuzin-no5-cream", category: FACE, type: "Кремы", also: [[GLOW, "Сияние кожи"]], brand: "Numbuzin", name: "Numbuzin No.5 Daily Multi-Vitamin Cream", title: "Numbuzin No.5 Multi-Vitamin Cream", description: "Крем с витаминами для сияния", price: 2590, files: [G + "Numbuzin_No5_MultiVitaminCream.png"] },
  { id: "somebymi-miracle-toner", category: FACE, type: "Тонеры и пэды", also: [[GLOW, "Уход за порами"]], brand: "Some By Mi", name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner", title: "Some By Mi Miracle Toner", description: "Тонер с кислотами для проблемной кожи", price: 1590, files: [G + "SomeByMi_AHABHAPHA_MiracleToner.png"] },
  { id: "vt-reedle-shot-100", category: FACE, type: "Сыворотки и ампулы", also: [[GLOW, "Сияние кожи"], [HITS, "Тренды Тиктока"]], brand: "VT Cosmetics", name: "VT Reedle Shot 100", description: "Сыворотка со спикулами для обновления кожи", price: 2690, hit: true, rating: "4.6", files: [G + "VT_ReedleShot_100.png"] },
  { id: "manyo-bifida-eye-cream", category: FACE, type: "Кремы", also: [[GLOW, "Увлажнение"], [AGE, "Кремы для глаз"]], brand: "Manyo", name: "Manyo Bifida Biome Concentrate Eye Cream", title: "Manyo Bifida Biome Eye Cream", description: "Крем для кожи вокруг глаз", price: 2390, files: [G + "manyo_BifidaBiome_EyeCream.png"] },

  // ---------- антивозрастной уход ----------
  { id: "arencia-red-smoothie-serum", category: FACE, type: "Сыворотки и ампулы", also: [[AGE, "Коллаген"], [HITS, "Тренды в Корее"]], brand: "Arencia", name: "Arencia Red Smoothie Serum 30", title: "Arencia Red Smoothie Serum", description: "Сыворотка-желе с коллагеном", price: 2990, files: [A + "Arencia_Red_Smoothie_Serum_8.png"] },
  { id: "ohui-retinol-cream", category: FACE, type: "Кремы", also: [[AGE, "Ретинол и ретиноиды"]], brand: "O HUI", name: "O HUI Reverse Activator Retinol Wrinkle Cream", title: "O HUI Retinol Wrinkle Cream", description: "Крем с ретинолом против морщин", price: 4990, files: [A + "OHUI_Reverse_Activator_Retinol_Wrinkle_Cream.png"] },
  { id: "ahc-real-eye-cream", category: FACE, type: "Кремы", also: [[AGE, "Кремы для глаз"]], brand: "AHC", name: "AHC Ten Revolution Real Eye Cream For Face", title: "AHC Real Eye Cream For Face", description: "Крем для глаз и лица", price: 2490, hit: true, rating: "4.8", files: [A + "AHC_Ten_Revolution_Real_Eye_Cream_For_Face.png"] },
  { id: "sulwhasoo-ginseng-cream", category: FACE, type: "Кремы", also: [[AGE, "Кремы"]], brand: "Sulwhasoo", name: "Sulwhasoo Concentrated Ginseng Rejuvenating Cream", title: "Sulwhasoo Ginseng Cream", description: "Омолаживающий крем с женьшенем", price: 12990, discount: "10%", files: [A + "Sulwhasoo_Concentrated_Ginseng_Rejuvenating_Cream.png"] },
  { id: "arencia-nad-booster", category: FACE, type: "Сыворотки и ампулы", also: [[AGE, "Сыворотки и ампулы"]], brand: "Arencia", name: "Arencia NAD+ Time-Rewind Booster Shot", title: "Arencia NAD+ Booster Shot", description: "Антивозрастной бустер с NAD+", price: 2790, files: [A + "Arencia NAD+ Time-Rewind Booster Shot.png"] },
  { id: "drdifferent-vitalift-a", category: FACE, type: "Кремы", also: [[AGE, "Ретинол и ретиноиды"]], brand: "Dr.Different", name: "Dr.Different Vitalift-A Forte", description: "Крем с ретиналем для упругости", price: 3990, files: [A + "DrDifferent_Vitalift_A_Forte.png"] },
  { id: "hera-signia-lifting-serum", category: FACE, type: "Сыворотки и ампулы", also: [[AGE, "Лифтинг и упругость"]], brand: "HERA", name: "HERA Signia Core Lifting Serum", title: "HERA Signia Lifting Serum", description: "Лифтинг-сыворотка", price: 8990, files: [A + "HERA_Signia_Core_Lifting_Serum.png"] },
  { id: "elizavecca-piggy-collagen", category: FACE, type: "Маски", also: [[AGE, "Коллаген"]], brand: "Elizavecca", name: "Elizavecca Green Piggy Collagen Jella Pack", title: "Elizavecca Piggy Collagen Pack", description: "Коллагеновая маска-желе", price: 990, files: [A + "Elizavecca Green Piggy Collagen Jella Pack.png"] },

  // ---------- для тела ----------
  { id: "illiyoon-top-to-toe-wash", category: "Для тела", type: "Гели для душа", brand: "Illiyoon", name: "Illiyoon Ceramide Ato 6.0 Top to Toe Wash", title: "Illiyoon Ceramide Ato Top to Toe Wash", description: "Мягкий гель для тела и волос", price: 1690, rating: "4.8", files: [B + "ILLIYOON_Ceramide_Ato_6.0_Top_to_Toe_Wash.png"] },
  { id: "happy-bath-baby-powder", category: "Для тела", type: "Гели для душа", brand: "Happy Bath", name: "Happy Bath Baby Powder 420 Body Wash", title: "Happy Bath Baby Powder Body Wash", description: "Гель для душа с пудровым ароматом", price: 990, files: [B + "HAPPY_BATH_Baby_Powder_420_Body_Wash.png"] },
  { id: "kundal-honey-body-wash", category: "Для тела", type: "Гели для душа", also: [[HITS, "Тренды Тиктока"]], brand: "Kundal", name: "Kundal Honey & Macadamia Body Wash White Musk", title: "Kundal Honey Body Wash White Musk", description: "Гель для душа с мёдом и макадамией", price: 1290, discount: "10%", hit: true, files: [B + "KUNDAL_Honey_Macadamia_Body_Wash_White_Musk.png"] },
  { id: "somebymi-body-cleanser", category: "Для тела", type: "Уход против акне", brand: "Some By Mi", name: "Some By Mi AHA BHA PHA 30 Days Miracle Acne Clear Body Cleanser", title: "Some By Mi Acne Body Cleanser", description: "Гель для тела против высыпаний", price: 1490, files: [B + "Some_By_Mi_AHA_BHA_PHA_30_Days_Miracle_Acne_Clear_Body_Cleanser.png"] },
  { id: "illiyoon-scrub-wash", category: "Для тела", type: "Скрабы", brand: "Illiyoon", name: "Illiyoon Fresh Moisture Scrub Wash", title: "Illiyoon Fresh Scrub Wash", description: "Мягкий скраб-гель для душа", price: 1390, files: [B + "ILLIYOON_Fresh_Moisture_Scrub_Wash.png"] },
  { id: "skinfood-black-sugar-scrub", category: "Для тела", type: "Скрабы", brand: "Skinfood", name: "Skinfood Black Sugar Perfect Essential Scrub 2X", title: "Skinfood Black Sugar Scrub 2X", description: "Скраб с чёрным сахаром", price: 1190, rating: "4.7", files: [B + "SKINFOOD_Black_Sugar_Perfect_Essential_Scrub_2X.png"] },
  { id: "illiyoon-ato-concentrate-cream", category: "Для тела", type: "Лосьоны и кремы", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Illiyoon", name: "Illiyoon Ceramide Ato Concentrate Cream", title: "Illiyoon Ceramide Ato Cream", description: "Крем с керамидами для сухой кожи", price: 1890, discount: "15%", hit: true, rating: "4.9", files: [B + "ILLIYOON_Ceramide_Ato_Concentrate_Cream.png"] },
  { id: "aestura-body-lotion", category: "Для тела", type: "Лосьоны и кремы", brand: "Aestura", name: "AESTURA Atobarrier 365 Body Lotion", title: "Aestura Atobarrier 365 Lotion", description: "Лосьон для тела с керамидами", price: 2490, files: [B + "AESTURA_Atobarrier365_Body_Lotion.png"] },
  { id: "kundal-honey-body-lotion", category: "Для тела", type: "Лосьоны и кремы", brand: "Kundal", name: "Kundal Honey & Macadamia Body Lotion White Musk", title: "Kundal Honey Body Lotion", description: "Лосьон с мёдом и макадамией", price: 1290, files: [B + "KUNDAL_Honey_Macadamia_Body_Lotion_White_Musk.png"] },
  { id: "illiyoon-ato-lotion", category: "Для тела", type: "Лосьоны и кремы", brand: "Illiyoon", name: "Illiyoon Ceramide Ato Lotion", description: "Увлажняющий лосьон для тела", price: 1590, files: [B + "ILLIYOON_Ceramide_Ato_Lotion.png"] },
  { id: "aromatica-body-cream", category: "Для тела", type: "Масла и эссенции для тела", brand: "Aromatica", name: "Aromatica Mellowness Oil-In Body Cream", title: "Aromatica Oil-In Body Cream", description: "Крем-масло для тела", price: 1990, files: [B + "AROMATICA_Mellowness_Oil_In_Body_Cream.png"] },
  { id: "aromatica-body-mist", category: "Для тела", type: "Мисты для тела", brand: "Aromatica", name: "Aromatica Inspirit Body Mist Basil & Bergamot", title: "Aromatica Body Mist Basil", description: "Мист для тела с базиликом и бергамотом", price: 1490, files: [B + "AROMATICA_Inspirit_Body_Mist_Basil_Bergamot.png"] },
  { id: "scentlier-body-mist", category: "Для тела", type: "Мисты для тела", brand: "Scentlier", name: "Scentlier Perfume Body Mist Ice Orange Blossom", title: "Scentlier Body Mist Orange Blossom", description: "Парфюмированный мист для тела", price: 1290, files: [B + "Scentlier_Perfume_Body_Mist_Ice_Orange_Blossom.png"] },
  { id: "nature-garden-grape-mist", category: "Для тела", type: "Мисты для тела", brand: "Nature Garden", name: "Nature Garden Sweety Sweet Pea Perfumed Body Mist", title: "Nature Garden Sweet Pea Body Mist", description: "Мист для тела со сладким цветочно-ягодным ароматом", price: 990, files: [B + "Nature_Garden_Pretty_Sweet_Grape_Perfumed_Body_Mist.png"] },
  { id: "kundal-white-musk-mist", category: "Для тела", type: "Мисты для тела", brand: "Kundal", name: "Kundal Pure Moist Body Mist White Musk", title: "Kundal Body Mist White Musk", description: "Увлажняющий мист для тела", price: 1190, files: [B + "KUNDAL_Pure_Moist_Body_Mist_White_Musk.png"] },
  { id: "whamisa-algae-mist", category: "Для тела", type: "Мисты для тела", brand: "Whamisa", name: "Whamisa Organic Algae Body Mist", description: "Органический мист с водорослями", price: 1690, files: [B + "WHAMISA_Organic_Algae_Body_Mist.png"] },

  // ---------- для волос ----------
  { id: "lador-keratin-shampoo", category: "Для волос", type: "Шампуни", brand: "Lador", name: "Lador Keratin LPP Shampoo", description: "Шампунь с кератином для повреждённых волос", price: 1690, discount: "10%", hit: true, rating: "4.8", files: [H + "Lador_Keratin_LPP_Shampoo_530ml.png"] },
  { id: "lador-angel-muguet-shampoo", category: "Для волос", type: "Шампуни", brand: "Lador", name: "Lador Angel Muguet Perfumed Hair Shampoo", title: "Lador Angel Muguet Shampoo", description: "Парфюмированный шампунь с ароматом ландыша", price: 1490, files: [H + "Lador_Angel_Muguet_Perfumed_Hair_Shampoo.png"] },
  { id: "lador-moisture-shampoo", category: "Для волос", type: "Шампуни", brand: "Lador", name: "Lador Moisture Balancing Shampoo", description: "Увлажняющий шампунь", price: 1390, files: [H + "Lador_Moisture_Balancing_Shampoo.png"] },
  { id: "lador-tea-tree-scalp", category: "Для волос", type: "Уход за кожей головы", brand: "Lador", name: "Lador Tea Tree Calming Scalp Shampoo", title: "Lador Tea Tree Scalp Shampoo", description: "Успокаивающий шампунь для кожи головы", price: 1490, files: [H + "Lador_Tea_Tree_Calming_Scalp_Shampoo.png"] },
  { id: "lador-acid-conditioner", category: "Для волос", type: "Кондиционеры", brand: "Lador", name: "Lador Damage Protector Acid Conditioner", title: "Lador Acid Conditioner", description: "Кондиционер для повреждённых волос", price: 1490, files: [H + "Lador_Damage_Protector_Acid_Conditioner.png"] },
  { id: "lador-hydro-lpp", category: "Для волос", type: "Маски", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Lador", name: "Lador Hydro LPP Treatment", description: "Маска для волос с протеинами", price: 1290, discount: "20%", hit: true, rating: "4.9", files: [H + "Lador_Hydro_LPP_Treatment_530ml.png", H + "Lador_Hydro_LPP_Treatment_150ml.png"] },
  { id: "lador-osmanthus-treatment", category: "Для волос", type: "Маски", brand: "Lador", name: "Lador Osmanthus Perfumed Hair Treatment", title: "Lador Osmanthus Hair Treatment", description: "Парфюмированная маска для волос", price: 1390, files: [H + "Lador_Osmanthus_Perfumed_Hair_Treatment.png"] },
  { id: "jsoop-keratin-ampoule", category: "Для волос", type: "Несмываемый уход", brand: "JSOOP", name: "JSOOP Silk Keratin No-Wash Ampoule Treatment 2X", title: "JSOOP Silk Keratin Ampoule", description: "Несмываемая ампула с кератином", price: 1190, files: [H + "JSOOP_Silk_Keratin_No-Wash_Ampoule_Treatment_2X.png"] },
  { id: "lador-wonder-balm", category: "Для волос", type: "Несмываемый уход", brand: "Lador", name: "Lador Wonder Balm", description: "Несмываемый бальзам для блеска", price: 1290, files: [H + "Lador_Wonder_Balm.png"] },
  { id: "lador-angel-muguet-oil", category: "Для волос", type: "Сыворотки и масла", brand: "Lador", name: "Lador Angel Muguet Perfumed Hair Oil", title: "Lador Angel Muguet Hair Oil", description: "Парфюмированное масло для волос", price: 1390, files: [H + "Lador_Angel_Muguet_Perfumed_Hair_Oil.png"] },
  { id: "lador-osmanthus-oil", category: "Для волос", type: "Сыворотки и масла", brand: "Lador", name: "Lador Osmanthus Perfumed Hair Oil", title: "Lador Osmanthus Hair Oil", description: "Масло для волос с ароматом османтуса", price: 1390, files: [H + "Lador_Osmanthus_Perfumed_Hair_Oil.png"] },

  // ---------- для загара: солнцезащитные средства живут и в «SPF для лица» ----------
  { id: "manyo-sun-serum", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Manyo", name: "Manyo Galactomy Moisture Sun Serum SPF50+ PA++++", title: "Manyo Galactomy Sun Serum", description: "Увлажняющая солнцезащитная сыворотка", price: 1990, files: [S + "Manyo Galactomy Moisture Sun Serum SPF 50+ PA++++.png"] },
  { id: "manyo-sun-stick", category: FACE, type: "SPF для лица", also: [[SUN, "SPF-стики"]], brand: "Manyo", name: "Manyo Hyaluron Hydrating Sun Stick SPF50+ PA++++", title: "Manyo Hyaluron Sun Stick", description: "Увлажняющий солнцезащитный стик", price: 1790, files: [S + "Manyo Hyaluron Hydrating Sun Stick SPF50+ PA++++.png"] },
  { id: "anua-glow-sunstick", category: FACE, type: "SPF для лица", also: [[SUN, "SPF-стики"]], brand: "Anua", name: "Anua Invisible Glow Finish Sunstick", title: "Anua Glow Finish Sunstick", description: "Невидимый стик с сияющим финишем", price: 1890, discount: "10%", hit: true, files: [S + "Anua_Invisible_Glow_Finish_Sunstick.png"] },
  { id: "drg-green-mild-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Dr.G", name: "Dr.G Green Mild Up Sun+", description: "Минеральный крем для чувствительной кожи", price: 1890, files: [S + "Dr.G_Green_Mild_Up_Sun+.png"] },
  { id: "benton-air-fit-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Benton", name: "Benton Air Fit UV Defense Sun Cream", title: "Benton Air Fit Sun Cream", description: "Лёгкий солнцезащитный крем", price: 1590, files: [S + "Benton_Air_Fit_UV_Defense_Sun_Cream.png"] },
  { id: "axis-y-physical-sunscreen", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "AXIS-Y", name: "AXIS-Y Complete No-Stress Physical Sunscreen", title: "AXIS-Y Physical Sunscreen", description: "Минеральный солнцезащитный крем", price: 1690, files: [S + "AXIS-Y_Complete_No-Stress_Physical_Sunscreen_V3.png"] },
  { id: "cosrx-invisible-sunscreen", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "COSRX", name: "COSRX Ultra-Light Invisible Sunscreen", title: "COSRX Invisible Sunscreen", description: "Невесомый солнцезащитный крем", price: 1590, rating: "4.6", files: [S + "COSRX_Ultra-Light_Invisible_Sunscreen.png"] },
  { id: "purito-soft-touch-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Purito", name: "Purito Daily Soft Touch Sunscreen", title: "Purito Soft Touch Sunscreen", description: "Солнцезащитный крем с бархатным финишем", price: 1490, files: [S + "Purito_Daily_Soft_Touch_Sunscreen.png"] },
  { id: "thank-you-farmer-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Thank You Farmer", name: "Thank You Farmer Sun Project Skin Relief Sun Cream", title: "Thank You Farmer Relief Sun Cream", description: "Успокаивающий солнцезащитный крем", price: 1690, files: [S + "Thank_You_Farmer_Sun_Project_Skin_Relief_Sun_Cream.png"] },
  { id: "skin1004-hyalu-cica-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"], [HITS, "Бестселлеры Olive Young"]], brand: "SKIN1004", name: "SKIN1004 Hyalu-Cica Water-Fit Sun Serum", title: "SKIN1004 Hyalu-Cica Sun Serum", description: "Солнцезащитная сыворотка с центеллой", price: 1790, discount: "15%", hit: true, rating: "4.9", files: [S + "SKIN1004_Hyalu-Cica_Water-Fit_Sun_Serum.png"] },
  { id: "tocobo-bio-watery-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Tocobo", name: "Tocobo Bio Watery Sun Cream SPF50+", title: "Tocobo Bio Watery Sun Cream", description: "Водянистый солнцезащитный крем", price: 1690, files: [S + "TOCOBO_Bio_Watery_Sun_Cream_SPF50+.png"] },
  { id: "haruharu-black-rice-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Haruharu", name: "Haruharu Wonder Black Rice Moisture Airyfit Daily Sunscreen", title: "Haruharu Black Rice Sunscreen", description: "Увлажняющий крем с чёрным рисом", price: 1890, files: [S + "Haruharu Wonder Black Rice Moisture Airyfit Daily Sunscreen.png"] },
  { id: "makeprem-sun-essence", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Make p:rem", name: "Make p:rem UV Defense Me Daily Sun Essence", title: "Make p:rem Daily Sun Essence", description: "Солнцезащитная эссенция на каждый день", price: 1590, files: [S + "make_prem_UV_Defense_Me_Daily_Sun_Essence.png"] },

  // ---------- макияж: для губ ----------
  // shades — товар с оттенками: скрипт сам находит пары «флакон + модель» по названию оттенка
  // (папки product / model внутри dir; у UNLEASHIA вторая картинка — свотч рядом с флаконом, суффикс _swatch).
  // Обложка — оттенок cover (часть названия), дальше по номерам. Цвет кружка снимается с флакона.
  { id: "dasique-juicy-dewy-lip-tint", category: MAKEUP, type: "Для губ", also: [[HITS, "Тренды в Корее"]], brand: "Dasique", name: "Dasique Juicy Dewy Lip Tint", title: "Dasique Juicy Dewy Tint", description: "Сочный тинт с глянцевым финишем", price: 1590, hit: true, rating: "4.8",
    shades: { dir: LIPS + "Dasique_Juicy_Dewy_Lip_Tint", product: "Product", model: "Model", cover: "Cherry_Soda" } },
  { id: "3ce-drop-glow-gel", category: MAKEUP, type: "Для губ", brand: "3CE", name: "3CE Drop Glow Gel", description: "Гелевый тинт с прозрачным сиянием", price: 1890, rating: "4.7",
    shades: { dir: LIPS + "3CE_Drop_Glow_Gel", product: "3CE_Drop_Glow_Gel_shades", model: "3CE_Drop_Glow_Gel_models" } },
  { id: "amuse-jel-fit-tint", category: MAKEUP, type: "Для губ", also: [[HITS, "Тренды Тиктока"]], brand: "AMUSE", name: "AMUSE Jel-Fit Tint", description: "Желейный тинт с влажным блеском", price: 1590, hit: true, rating: "4.8",
    shades: { dir: LIPS + "AMUSE_JelFitTint", product: "Packshots", model: "Model" } },
  { id: "clio-crystal-glam-tint", category: MAKEUP, type: "Для губ", brand: "CLIO", name: "CLIO Crystal Glam Tint", description: "Тинт с эффектом стеклянных губ", price: 1490, rating: "4.6",
    shades: { dir: LIPS + "CLIO_Crystal_Glam_Tint", product: "CLIO_Crystal_Glam_Tint_shades", model: "CLIO_Crystal_Glam_Tint_models" } },
  { id: "etude-glow-fixing-tint", category: MAKEUP, type: "Для губ", brand: "Etude", name: "ETUDE Glow Fixing Tint", description: "Стойкий тинт с глянцевым финишем", price: 1290,
    shades: { dir: LIPS + "ETUDE_Glow_Fixing_Tint", product: "Product", model: "Model" } },
  { id: "holika-soft-rolling-gloss", category: MAKEUP, type: "Для губ", brand: "Holika Holika", name: "Holika Holika Soft Rolling Gloss", description: "Мягкий блеск для губ", price: 990,
    shades: { dir: LIPS + "Holika_Holika_Soft_Rolling_Gloss", product: "Product", model: "Model" } },
  { id: "milk-touch-jelly-fit-tint", category: MAKEUP, type: "Для губ", brand: "Milk Touch", name: "Milk Touch Jelly Fit Tinted Glow Tint", title: "Milk Touch Jelly Fit Glow Tint", description: "Сияющий желейный тинт", price: 1390,
    shades: { dir: LIPS + "Milk_Touch_Jelly_Fit_Tinted_Glow_Tint", product: "Product", model: "Model" } },
  { id: "colorgram-fruity-glass-tint-deep-glaze", category: MAKEUP, type: "Для губ", brand: "Colorgram", name: "Colorgram Fruity Glass Tint Deep Glaze", title: "Colorgram Fruity Glass Tint", description: "Глянцевый тинт в глубоких оттенках", price: 1190,
    shades: { dir: LIPS + "colorgram_Fruity_Glass_Tint_Deep_Glaze", product: "Product", model: "Model" } },
  { id: "fwee-3d-voluming-gloss", category: MAKEUP, type: "Для губ", also: [[HITS, "Тренды Тиктока"]], brand: "Fwee", name: "Fwee 3D Voluming Gloss", description: "Блеск для объёма губ", price: 1890, discount: "10%", hit: true, rating: "4.8",
    shades: { dir: LIPS + "fwee_3D_Voluming_Gloss", product: "fwee_3D_Voluming_Gloss_6_shades", model: "fwee_3D_Voluming_Gloss_models" } },
  { id: "fwee-3d-voluming-tint", category: MAKEUP, type: "Для губ", brand: "Fwee", name: "Fwee 3D Voluming Tint", description: "Тинт с эффектом объёма", price: 1790,
    shades: { dir: LIPS + "fwee_3D_Voluming_Tint", product: "fwee_3D_Voluming_Tint_shades", model: "fwee_3D_Voluming_Tint_models" } },
  { id: "hince-raw-glow-gel-tint", category: MAKEUP, type: "Для губ", brand: "Hince", name: "Hince Raw Glow Gel Tint", description: "Гелевый тинт с естественным сиянием", price: 2290, rating: "4.7",
    shades: { dir: LIPS + "hince_RawGlowGelTint ", product: "Packshots", model: "Model" } },
  { id: "nuse-care-liptual", category: MAKEUP, type: "Для губ", brand: "Nuse", name: "Nuse Care Liptual", description: "Ухаживающий оттеночный бальзам", price: 1690,
    shades: { dir: LIPS + "nuse_Care_Liptual", product: "Product", model: "Model",
      // флакон у всех оттенков одинаковый фиолетовый — цвет снят с надписи «nuse» на флаконе
      colors: { "01": "#de877e", "02": "#e46b6c", "05": "#cd7e9d", "06": "#b85a80", "09": "#bc0c47" } } },
  { id: "romand-glasting-color-gloss", category: MAKEUP, type: "Для губ", brand: "Rom&nd", name: "Rom&nd Glasting Color Gloss", description: "Цветной блеск со стеклянным финишем", price: 1290,
    shades: { dir: LIPS + "romand_Glasting_Color_Gloss", product: "romand_Glasting_Color_Gloss_shades", model: "romand_Glasting_Color_Gloss_models" } },
  { id: "romand-juicy-lasting-tint", category: MAKEUP, type: "Для губ", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Rom&nd", name: "Rom&nd The Juicy Lasting Tint", title: "Rom&nd Juicy Lasting Tint", description: "Стойкий сочный тинт", price: 1090, discount: "15%", hit: true, rating: "4.9",
    shades: { dir: LIPS + "romand_The_Juicy_Lasting_Tint", product: "romand_The_Juicy_Lasting_Tint_shades", model: "romand_The_Juicy_Lasting_Tint_models" } },
  { id: "bbia-last-powder-lipstick", category: MAKEUP, type: "Для губ", brand: "BBIA", name: "BBIA Last Powder Lipstick 2", title: "BBIA Last Powder Lipstick", description: "Матовая помада с пудровым финишем", price: 1490,
    shades: { dir: LIPSTICK + "BBIA_Last_Powder_Lipstick_2", product: "Product", model: "Model" } },
  { id: "romand-zero-matte-lipstick", category: MAKEUP, type: "Для губ", brand: "Rom&nd", name: "Rom&nd Zero Matte Lipstick", description: "Лёгкая матовая помада", price: 1290, rating: "4.7",
    shades: { dir: LIPSTICK + "romand_Zero_Matte_Lipstick", product: "Product", model: "Model",
      // стик помады на фото маленький, автоматика смешивает его с серебристым корпусом — цвета подобраны вручную
      colors: { "01": "#b5606a", "05": "#a65448", "09": "#d08a78", "14": "#b8566c", "20": "#a72d25" } } },
  { id: "unleashia-oh-happy-day-lip-pencil", category: MAKEUP, type: "Для губ", brand: "UNLEASHIA", name: "UNLEASHIA Oh! Happy Day Lip Pencil", title: "UNLEASHIA Happy Day Lip Pencil", description: "Карандаш-помада для губ", price: 1290,
    shades: { dir: "макияж/Для губ/UNLEASHIA_Oh_Happy_Day_Lip_Pencil", product: "", model: "", second: "_swatch", colorFrom: "second" } },

  // ---------- макияж: для лица ----------
  // list — оттенки с файлами вручную (у каждого товара своё устройство папки). colorFrom: "second" — цвет со свотча.
  // На кушонах Babe Skin / Satin Wear и румянах Dough Dough — бренд UNLEASHIA (виден на упаковке).
  { id: "unleashia-babe-skin-cushion", category: MAKEUP, type: "Кушоны", brand: "UNLEASHIA", name: "UNLEASHIA Babe Skin Baby Blue Cushion", title: "UNLEASHIA Babe Skin Cushion", description: "Лёгкий кушон с сияющим финишем", price: 2490, hit: true, rating: "4.7",
    shades: { colorFrom: "second", list: [
      { name: "17C Seraphic", files: [FACEMK + "Babe Skin Baby Blue Cushion /Babe Skin Baby Blue Cushion 17C Seraphic-1.png", FACEMK + "Babe Skin Baby Blue Cushion /Babe Skin Baby Blue Cushion 17C Seraphic.png"] },
      { name: "18N Pure", files: [FACEMK + "Babe Skin Baby Blue Cushion /18N Pure-1.png", FACEMK + "Babe Skin Baby Blue Cushion /18N Pure.png"] },
      { name: "23W Jolly", files: [FACEMK + "Babe Skin Baby Blue Cushion /23W Jolly-1.png", FACEMK + "Babe Skin Baby Blue Cushion /23W Jolly.png"] },
      { name: "25N Good Night", files: [FACEMK + "Babe Skin Baby Blue Cushion /25N Good Night-1.png", FACEMK + "Babe Skin Baby Blue Cushion /25N Good Night.png"] },
    ] } },
  { id: "clio-kill-cover-founwear-cushion", category: MAKEUP, type: "Кушоны", also: [[HITS, "Бестселлеры Olive Young"]], brand: "CLIO", name: "CLIO Kill Cover Founwear Cushion The Original", title: "CLIO Kill Cover Cushion", description: "Плотный стойкий кушон", price: 2790, discount: "10%", hit: true, rating: "4.8",
    shades: { list: [
      { name: "17W Cream Shell", files: [FACEMK + "CLIO_Kill_Cover_Founwear_Cushion_The_Original/CLIO_Kill_Cover_Founwear_Cushion_The_Original_17W_Cream_Shell.png"] },
      { name: "19C Light", files: [FACEMK + "CLIO_Kill_Cover_Founwear_Cushion_The_Original/CLIO_Kill_Cover_Founwear_Cushion_The_Original_19C_Light.png"] },
      { name: "24N Honey", files: [FACEMK + "CLIO_Kill_Cover_Founwear_Cushion_The_Original/CLIO_Kill_Cover_Founwear_Cushion_The_Original_24N_Honey.png"] },
      { name: "34W Camel", files: [FACEMK + "CLIO_Kill_Cover_Founwear_Cushion_The_Original/CLIO_Kill_Cover_Founwear_Cushion_The_Original_34W_Camel.png"] },
    ] } },
  { id: "unleashia-satin-wear-cushion", category: MAKEUP, type: "Кушоны", brand: "UNLEASHIA", name: "UNLEASHIA Satin Wear Healthy-Green Cushion", title: "UNLEASHIA Satin Wear Cushion", description: "Кушон с сатиновым финишем", price: 2590,
    files: [FACEMK + "Satin Wear Healthy-Green Cushion /Satin Wear Healthy-Green Cushion.png", FACEMK + "Satin Wear Healthy-Green Cushion /Satin Wear Healthy-Green Cushion-1.png", FACEMK + "Satin Wear Healthy-Green Cushion /Satin Wear Healthy-Green Cushion-2.png"] },
  { id: "missha-m-perfect-cover-bb", category: MAKEUP, type: "Тональные средства", brand: "Missha", name: "MISSHA M Perfect Cover BB Cream", title: "MISSHA Perfect Cover BB Cream", description: "BB-крем с плотным покрытием", price: 1290, rating: "4.6",
    shades: { tone: "skin", list: [
      { name: "13 Bright Beige", files: [FACEMK + "MISSHA_M_Perfect_Cover_BB_Cream/MISSHA_M_Perfect_Cover_BB_Cream_13_Bright_Beige.png"] },
      { name: "21 Light Beige", files: [FACEMK + "MISSHA_M_Perfect_Cover_BB_Cream/MISSHA_M_Perfect_Cover_BB_Cream_21_Light_Beige.png"] },
      { name: "23 Natural Beige", files: [FACEMK + "MISSHA_M_Perfect_Cover_BB_Cream/MISSHA_M_Perfect_Cover_BB_Cream_23_Natural_Beige.png"] },
      { name: "25 Warm Beige", files: [FACEMK + "MISSHA_M_Perfect_Cover_BB_Cream/MISSHA_M_Perfect_Cover_BB_Cream_25_Warm_Beige.png"] },
      { name: "27 Honey Beige", files: [FACEMK + "MISSHA_M_Perfect_Cover_BB_Cream/MISSHA_M_Perfect_Cover_BB_Cream_27_Honey_Beige.png"] },
    ] } },
  { id: "missha-m-perfect-cover-serum-bb", category: MAKEUP, type: "Тональные средства", brand: "Missha", name: "MISSHA M Perfect Cover Serum BB Cream", title: "MISSHA Perfect Cover Serum BB", description: "BB-крем с ухаживающей сывороткой", price: 1490,
    shades: { tone: "skin", list: [
      { name: "13 Light Fair", files: [FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/оттенки/MISSHA_M_Perfect_Cover_Serum_BB_Cream_13_Light_Fair.png", FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/модели/MISSHA_M_Perfect_Cover_Serum_BB_Cream_13_Light_Fair_m.png"] },
      { name: "17 Fair", files: [FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/оттенки/MISSHA_M_Perfect_Cover_Serum_BB_Cream_17_Fair.png", FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/модели/MISSHA_M_Perfect_Cover_Serum_BB_Cream_17_Fair_m.png"] },
      { name: "19 Ivory", files: [FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/оттенки/MISSHA_M_Perfect_Cover_Serum_BB_Cream_19_Ivory.png", FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/модели/MISSHA_M_Perfect_Cover_Serum_BB_Cream_19_Ivory_m.png"] },
      { name: "21 Light Beige", files: [FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/оттенки/MISSHA_M_Perfect_Cover_Serum_BB_Cream_21_Light_Beige.png"] },
      { name: "33 Tan", files: [FACEMK + "MISSHA_M_Perfect_Cover_Serum_BB_Cream/оттенки/MISSHA_M_Perfect_Cover_Serum_BB_Cream_33_Tan.png"] },
    ] } },
  { id: "erborian-bb-creme-ginseng", category: MAKEUP, type: "Тональные средства", brand: "Erborian", name: "Erborian BB Crème au Ginseng", title: "Erborian BB Crème au Ginseng", description: "BB-крем с женьшенем", price: 2990, rating: "4.7",
    shades: { colorFrom: "second", list: [
      { name: "Clair", files: [FACEMK + "Erborian_BB_Creme_Au_Ginseng/Product/Erborian_BB_Creme_Au_Ginseng_Clair_40ml.png", FACEMK + "Erborian_BB_Creme_Au_Ginseng/Swatch/Erborian_BB_Creme_Au_Ginseng_Clair_Swatch.png"] },
      { name: "Doré", files: [FACEMK + "Erborian_BB_Creme_Au_Ginseng/Product/Erborian_BB_Creme_Au_Ginseng_Dore_40ml.png", FACEMK + "Erborian_BB_Creme_Au_Ginseng/Swatch/Erborian_BB_Creme_Au_Ginseng_Dore_Swatch.png"] },
      { name: "Ivoire", files: [FACEMK + "Erborian_BB_Creme_Au_Ginseng/Product/Erborian_BB_Creme_Au_Ginseng_Ivoire_40ml.png", FACEMK + "Erborian_BB_Creme_Au_Ginseng/Swatch/Erborian_BB_Creme_Au_Ginseng_Ivoire_Swatch.png"] },
      { name: "Nude", files: [FACEMK + "Erborian_BB_Creme_Au_Ginseng/Product/Erborian_BB_Creme_Au_Ginseng_Nude_40ml.png", FACEMK + "Erborian_BB_Creme_Au_Ginseng/Swatch/Erborian_BB_Creme_Au_Ginseng_Nude_Swatch.png"] },
    ] } },
  { id: "erborian-cc-red", category: MAKEUP, type: "Тональные средства", brand: "Erborian", name: "Erborian CC Red Correct", title: "Erborian CC Red", description: "CC-крем против покраснений", price: 3290,
    files: [FACEMK + "Erborian CC RED Корректирующий крем для лица 40 мл/CC RED Корректирующий крем для лица 40 мл.png", FACEMK + "Erborian CC RED Корректирующий крем для лица 40 мл/CC RED Корректирующий крем для лица 40 мл 3.png", FACEMK + "Erborian CC RED Корректирующий крем для лица 40 мл/CC RED Корректирующий крем для лица .png", FACEMK + "Erborian CC RED Корректирующий крем для лица 40 мл/CC RED Корректирующий крем для лица 15 мл-1.png"] },
  { id: "unleashia-dough-dough-waffle-blush", category: MAKEUP, type: "Румяна", also: [[HITS, "Тренды Тиктока"]], brand: "UNLEASHIA", name: "UNLEASHIA Dough Dough Waffle Blush", title: "UNLEASHIA Waffle Blush", description: "Кремовые румяна с вафельной текстурой", price: 1690, hit: true, rating: "4.8",
    shades: { list: [
      { name: "01 Peachy Batter", files: [FACEMK + "Dough Dough Waffle Blush/No.1 Peachy Batter.png", FACEMK + "Dough Dough Waffle Blush/01_Peach_Batter.png"] },
      { name: "02 Icy Berry", files: [FACEMK + "Dough Dough Waffle Blush/No.2 Icy Berry.png", FACEMK + "Dough Dough Waffle Blush/02_Icy_Berry.png"] },
      { name: "03 Jammy Grape", files: [FACEMK + "Dough Dough Waffle Blush/No.3 Jammy Grape.png", FACEMK + "Dough Dough Waffle Blush/03_Jammy_Grape.png"] },
      { name: "04 Toasted Crumb", files: [FACEMK + "Dough Dough Waffle Blush/No.4 Toasted Crumb.png", FACEMK + "Dough Dough Waffle Blush/04_Toasted_Crumb.png"] },
    ] } },
  { id: "about-tone-blur-powder-pact", category: MAKEUP, type: "Пудры и фиксаторы", brand: "About Tone", name: "ABOUT TONE Blur Powder Pact", description: "Компактная пудра с эффектом блюра", price: 1890, files: [FACEMK + "ABOUT_TONE_Blur_Powder_Pact.png"] },
  { id: "holika-puri-pore-pact", category: MAKEUP, type: "Пудры и фиксаторы", brand: "Holika Holika", name: "Holika Holika Puri Pore No Sebum Pact", title: "Holika Holika No Sebum Pact", description: "Матирующая пудра против жирного блеска", price: 990, files: [FACEMK + "HOLIKA_HOLIKA_Puri_Pore_No_Sebum_Pact.png"] },
  { id: "innisfree-no-sebum-pact", category: MAKEUP, type: "Пудры и фиксаторы", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Innisfree", name: "Innisfree No Sebum Mineral Pact", description: "Минеральная матирующая пудра", price: 1190, hit: true, rating: "4.8", files: [FACEMK + "INNISFREE_No_Sebum_Mineral_Pact.png"] },
  { id: "the-saem-perfect-pore-pact", category: MAKEUP, type: "Пудры и фиксаторы", brand: "The Saem", name: "The Saem Saemmul Perfect Pore Pact", title: "The Saem Perfect Pore Pact", description: "Пудра, скрывающая поры", price: 1090, files: [FACEMK + "THE_SAEM_Saemmul_Perfect_Pore_Pact.png"] },
  { id: "espoir-fresh-setting-fixer", category: MAKEUP, type: "Пудры и фиксаторы", brand: "Espoir", name: "Espoir Fresh Setting Fixer", description: "Спрей-фиксатор макияжа", price: 1690, files: [FACEMK + "ESPOIR_Fresh_Setting_Fixer.png"] },
  { id: "so-natural-setting-fixx", category: MAKEUP, type: "Пудры и фиксаторы", brand: "So Natural", name: "SO NATURAL All Day Tight Make Up Setting Fixx", title: "SO NATURAL Setting Fixx", description: "Стойкий спрей-фиксатор", price: 1390, files: [FACEMK + "SO_NATURAL_All_Day_Tight_Make_Up_Setting_Fixx.png"] },

  // ---------- макияж: для глаз и бровей ----------
  // У чёрных и коричневых подводок и тушей цвет кружка задан вручную (color) — автоматика берёт цвет упаковки
  { id: "etude-drawing-eye-brow", category: MAKEUP, type: "Для бровей", brand: "Etude", name: "ETUDE Drawing Eye Brow Pro Ash Brown", title: "ETUDE Drawing Eye Brow", description: "Карандаш для бровей", price: 690, hit: true, rating: "4.8", files: [EYES + "брови/ETUDE_Drawing_Eye_Brow_Pro_Ash_Brown/ETUDE_Drawing_Eye_Brow_Pro_Ash_Brown.png", EYES + "брови/ETUDE_Drawing_Eye_Brow_Pro_Ash_Brown/ETUDE_Drawing_Eye_Brow_Pro_Ash_Brown_m.png"] },
  { id: "peripera-speedy-skinny-brow-mascara", category: MAKEUP, type: "Для бровей", brand: "Peripera", name: "Peripera Speedy Skinny Brow Mascara", title: "Peripera Skinny Brow Mascara", description: "Тонкая тушь для бровей", price: 990,
    shades: { list: [
      { name: "03 Natural Brown", files: [EYES + "брови/Peripera_Speedy_Skinny_Brow_Mascara/Product/Peripera_Speedy_Skinny_Brow_Mascara_03_Natural_Brown.png", EYES + "брови/Peripera_Speedy_Skinny_Brow_Mascara/Model/Peripera_Speedy_Skinny_Brow_Mascara_03_Natural_Brown_m.png"], color: "#7a5a44" },
      { name: "06 Beige Ash", files: [EYES + "брови/Peripera_Speedy_Skinny_Brow_Mascara/Product/Peripera_Speedy_Skinny_Brow_Mascara_06_Beige_Ash.png", EYES + "брови/Peripera_Speedy_Skinny_Brow_Mascara/Model/Peripera_Speedy_Skinny_Brow_Mascara_06_Beige_Ash_m.png"], color: "#9a8676" },
    ] } },
  { id: "unleashia-shaper-pomade-brow-fixer", category: MAKEUP, type: "Для бровей", brand: "UNLEASHIA", name: "UNLEASHIA Shaper Pomade Eyebrow Fixer", title: "UNLEASHIA Brow Fixer", description: "Фиксирующий гель для бровей", price: 1290, files: [EYES + "брови/UNLEASHIA Shaper Pomade Eyebrow Fixer/Shaper Pomade Eyebrow Fixer 1.png", EYES + "брови/UNLEASHIA Shaper Pomade Eyebrow Fixer/Shaper Pomade Eyebrow Fixer 2.png"] },
  { id: "espoir-brow-balance-pencil", category: MAKEUP, type: "Для бровей", brand: "Espoir", name: "Espoir The Brow Balance Pencil", description: "Карандаш для бровей с щёточкой", price: 1190, files: [EYES + "брови/espoir The Brow Balance Pencil/espoir The Brow Balance Pencil.png", EYES + "брови/espoir The Brow Balance Pencil/Image-2.png"] },
  { id: "romand-han-all-brow-cara", category: MAKEUP, type: "Для бровей", brand: "Rom&nd", name: "Rom&nd Han All Brow Cara", description: "Оттеночная тушь для бровей", price: 1090,
    shades: { list: [
      { name: "01 Grace Taupe", files: [EYES + "брови/romand_Han_All_Brow_Cara/romand_Han_All_Brow_Cara_01_Grace_Taupe.png"], color: "#8a7a6c" },
      { name: "03 Modern Beige", files: [EYES + "брови/romand_Han_All_Brow_Cara/romand_Han_All_Brow_Cara_03_Modern_Beige.png"], color: "#a08a74" },
      { name: "04 Merry Blondy", files: [EYES + "брови/romand_Han_All_Brow_Cara/romand_Han_All_Brow_Cara_04_Merry_Blondy.png"], color: "#b3904e" },
    ] } },
  { id: "bbia-last-auto-gel-eyeliner", category: MAKEUP, type: "Для глаз", brand: "BBIA", name: "BBIA Last Auto Gel Eyeliner", description: "Автоматический гелевый карандаш", price: 990,
    shades: { list: [
      { name: "01 Noir", files: [EYES + "карандаш/BBIA_Last_Auto_Gel_Eyeliner/BBIA_Last_Auto_Gel_Eyeliner_01_Noir.png"], color: "#1e1e1e" },
      { name: "02 Jazz", files: [EYES + "карандаш/BBIA_Last_Auto_Gel_Eyeliner/BBIA_Last_Auto_Gel_Eyeliner_02_Jazz.png"], color: "#3d2b25" },
      { name: "04 Mellow Brown", files: [EYES + "карандаш/BBIA_Last_Auto_Gel_Eyeliner/BBIA_Last_Auto_Gel_Eyeliner_04_Mellow_Brown.png"], color: "#6b4a3a" },
      { name: "18 Moon Shower", files: [EYES + "карандаш/BBIA_Last_Auto_Gel_Eyeliner/BBIA_Last_Auto_Gel_Eyeliner_18_Moon_Shower.png"], color: "#d6c1b2" },
    ] } },
  { id: "unleashia-pretty-easy-glitter-stick", category: MAKEUP, type: "Для глаз", brand: "UNLEASHIA", name: "UNLEASHIA Pretty Easy Glitter Stick", title: "UNLEASHIA Glitter Stick", description: "Глиттер-стик для век", price: 1190,
    shades: { list: [
      { name: "02 Flutter", files: [EYES + "карандаш/Pretty_Easy_Glitter_Stick/Pretty_Easy_Glitter_Stick_02_Flutter.png"], color: "#d9d2c4" },
      { name: "03 Brave", files: [EYES + "карандаш/Pretty_Easy_Glitter_Stick/Pretty_Easy_Glitter_Stick_03_Brave.png"], color: "#d8c2c2" },
      { name: "06 Wee Hours", files: [EYES + "карандаш/Pretty_Easy_Glitter_Stick/Pretty_Easy_Glitter_Stick_06_Wee_Hours.png"], color: "#d5c9dc" },
      { name: "07 Sheer Skin", files: [EYES + "карандаш/Pretty_Easy_Glitter_Stick/Pretty_Easy_Glitter_Stick_07_Sheer_Skin.png"], color: "#e3b493" },
    ] } },
  { id: "dasique-mood-slim-liner", category: MAKEUP, type: "Для глаз", brand: "Dasique", name: "Dasique Mood Slim Liner 01 Daily Black", title: "Dasique Mood Slim Liner", description: "Тонкий карандаш для глаз", price: 990, files: [EYES + "карандаш/dasique_Mood_Slim_Liner_01_Daily_Black.png"] },
  { id: "innisfree-simple-label-pencil-liner", category: MAKEUP, type: "Для глаз", brand: "Innisfree", name: "Innisfree Simple Label Waterproof Pencil Liner", title: "Innisfree Waterproof Pencil Liner", description: "Водостойкий карандаш для глаз", price: 790, files: [EYES + "карандаш/innisfree_Simple_Label_Waterproof_Pencil_Liner_01_Black.png"] },
  { id: "3ce-eye-switch", category: MAKEUP, type: "Для глаз", brand: "3CE", name: "3CE Eye Switch Double Note", title: "3CE Eye Switch", description: "Глиттер для век с аппликатором", price: 1690, files: [EYES + "подводки/3CE_Eye_Switch/Product/3CE_Eye_Switch_Double_Note.png", EYES + "подводки/3CE_Eye_Switch/Model/3CE_Eye_Switch_Double_Note_m.png"] },
  { id: "clio-sharp-so-simple-pencil-liner", category: MAKEUP, type: "Для глаз", brand: "CLIO", name: "CLIO Sharp So Simple Waterproof Pencil Liner", title: "CLIO Sharp So Simple Liner", description: "Водостойкий карандаш для глаз", price: 990,
    shades: { list: [
      { name: "001 Black", files: [EYES + "подводки/CLIO_Sharp_So_Simple_Waterproof_Pencil_Liner_1200x1100/CLIO_Sharp_So_Simple_Waterproof_Pencil_Liner_001_Black.png"], color: "#1e1e1e" },
      { name: "013 Roasted Pink", files: [EYES + "подводки/CLIO_Sharp_So_Simple_Waterproof_Pencil_Liner_1200x1100/CLIO_Sharp_So_Simple_Waterproof_Pencil_Liner_013_Roasted_Pink.png"], color: "#a5706a" },
    ] } },
  { id: "clio-superproof-pen-liner", category: MAKEUP, type: "Для глаз", brand: "CLIO", name: "CLIO Superproof Pen Liner", description: "Стойкая подводка-фломастер", price: 1190, hit: true, rating: "4.8",
    shades: { list: [
      { name: "001 Black", files: [EYES + "подводки/CLIO_Superproof_Pen_Liner_1200x1100/CLIO_Superproof_Pen_Liner_001_Black.png"], color: "#1e1e1e" },
      { name: "002 Brown", files: [EYES + "подводки/CLIO_Superproof_Pen_Liner_1200x1100/CLIO_Superproof_Pen_Liner_002_Brown.png"], color: "#5b3a2a" },
    ] } },
  { id: "merzy-first-gel-eyeliner", category: MAKEUP, type: "Для глаз", brand: "MERZY", name: "MERZY The First Gel Eyeliner", description: "Гелевая подводка", price: 990, files: [EYES + "подводки/MERZY_The_First_Gel_Eyeliner/Product/MERZY_The_First_Gel_Eyeliner.png", EYES + "подводки/MERZY_The_First_Gel_Eyeliner/Model/MERZY_The_First_Gel_Eyeliner_m.png"] },
  { id: "lilybyred-am9-pm9-penliner", category: MAKEUP, type: "Для глаз", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Lilybyred", name: "Lilybyred AM9 to PM9 Survival Penliner", title: "Lilybyred Survival Penliner", description: "Стойкая подводка-фломастер", price: 1090,
    shades: { list: [
      { name: "01 Matt Black", files: [EYES + "подводки/lilybyred_AM9_to_PM9_Survival_Penliner/lilybyred_AM9_to_PM9_Survival_Penliner_01_Matt_Black.png"], color: "#1e1e1e" },
      { name: "03 Walnut Brown", files: [EYES + "подводки/lilybyred_AM9_to_PM9_Survival_Penliner/lilybyred_AM9_to_PM9_Survival_Penliner_03_Walnut_Brown.png"], color: "#5b3d2e" },
      { name: "Natural 01 Ash Black", files: [EYES + "подводки/lilybyred_AM9_to_PM9_Survival_Penliner_Natural/lilybyred_AM9_to_PM9_Survival_Penliner_Natural_01_Ash_Black.png"], color: "#4a4744" },
      { name: "Natural 02 Ash Brown", files: [EYES + "подводки/lilybyred_AM9_to_PM9_Survival_Penliner_Natural/lilybyred_AM9_to_PM9_Survival_Penliner_Natural_02_Ash_Brown.png"], color: "#7a6a5e" },
    ] } },
  { id: "romand-twinkle-pen-liner", category: MAKEUP, type: "Для глаз", brand: "Rom&nd", name: "Rom&nd Twinkle Pen Liner", description: "Сияющая подводка", price: 990,
    shades: { list: [
      { name: "02 Golden Wave", files: [EYES + "подводки/romand_Twinkle_Pen_Liner/romand_Twinkle_Pen_Liner_02_Golden_Wave.png"], color: "#d9b56c" },
      { name: "03 Rosy Sparkle", files: [EYES + "подводки/romand_Twinkle_Pen_Liner/romand_Twinkle_Pen_Liner_03_Rosy_Sparkle_m.png.png"], color: "#dc9a9a" },
    ] } },
  { id: "3ce-multi-eye-color-palette", category: MAKEUP, type: "Для глаз", also: [[HITS, "Тренды в Корее"]], brand: "3CE", name: "3CE Multi Eye Color Palette", title: "3CE Multi Eye Palette", description: "Палетка из 9 теней", price: 3490, discount: "15%", hit: true, rating: "4.8",
    shades: { list: [
      { name: "Delightful", files: [EYES + "тени/3CE Multi Eye Color Palette 8.5g/3CE Multi Eye Color Palette 8.5g. Delightful.png", EYES + "тени/3CE Multi Eye Color Palette 8.5g/3CE Multi Eye Color Palette 8.5g. Delightful-1.png"] },
      { name: "Auto Focus", files: [EYES + "тени/3CE Multi Eye Color Palette 8.5g/3CE Multi Eye Color Palette 8.5g. Auto Focus.png", EYES + "тени/3CE Multi Eye Color Palette 8.5g/Group 21208.png"] },
    ] } },
  { id: "clio-pro-eye-palette-air", category: MAKEUP, type: "Для глаз", brand: "CLIO", name: "CLIO Pro Eye Palette Air", description: "Палетка из 12 теней", price: 3290,
    shades: { list: [
      { name: "04 Pink Pairing", files: [EYES + "тени/CLIO Pro Eye Palette Air  /[CLIO] Pro Eye Palette Air 04 PINK PAIRING 12 Shades Eyeshadow Palette KOREA NEW.png", EYES + "тени/CLIO Pro Eye Palette Air  /[CLIO] Pro Eye Palette Air 04 PINK PAIRING 12 Shades Eyeshadow Palette KOREA NEW-1.png"] },
      { name: "09 Peach Mate Apple", files: [EYES + "тени/CLIO Pro Eye Palette Air  /[CLIO] Pro Eye Palette Air 09 PEACH MATE APPLE 12 Shades Eyeshadow Palette KOREA.png", EYES + "тени/CLIO Pro Eye Palette Air  /Group 21209.png"] },
    ] } },
  { id: "unleashia-get-loose-glitter-gel", category: MAKEUP, type: "Для глаз", also: [[HITS, "Тренды Тиктока"]], brand: "UNLEASHIA", name: "UNLEASHIA Get Loose Glitter Gel", title: "UNLEASHIA Glitter Gel", description: "Гелевый глиттер для век и лица", price: 1290,
    shades: { colorFrom: -1, list: [
      { name: "N1 Aurora Catcher", files: [EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N1_Aurora_Catcher.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/models/UNLEASHIA_Get_Loose_Glitter_Gel_N1_Aurora_Catcher_model 1.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N1_Aurora_Catcher_swatch.png"] },
      { name: "N3 Gold Obsessor", files: [EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N3_Gold_Obsessor.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/models/UNLEASHIA_Get_Loose_Glitter_Gel_N3_Gold_Obsessor_model 1.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N3_Gold_Obsessor_swatch.png"] },
      { name: "N4 Love Dreamer", files: [EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N4_Love_Dreamer.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/models/UNLEASHIA_Get_Loose_Glitter_Gel_N4_Love_Dreamer_model 1.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N4_Love_Dreamer_swatch.png"] },
      { name: "N5 Diamond Stealer", files: [EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N5_Diamond_Stealer.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N5_Diamond_Stealer_swatch.png"] },
      { name: "N6 Sunset Lover", files: [EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N6_Sunset_Lover.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/models/UNLEASHIA_Get_Loose_Glitter_Gel_N6_Sunset_Lover_model 1.png", EYES + "тени/UNLEASHIA_Get_Loose_Glitter_Gel 2/shades/UNLEASHIA_Get_Loose_Glitter_Gel_N6_Sunset_Lover_swatch.png"] },
    ] } },
  { id: "unleashia-glitterpedia-eye-palette", category: MAKEUP, type: "Для глаз", brand: "UNLEASHIA", name: "UNLEASHIA Glitterpedia Eye Palette", title: "UNLEASHIA Glitterpedia Palette", description: "Палетка теней с глиттером", price: 2290, hit: true, rating: "4.7",
    shades: { list: [
      { name: "No3 All of Coralpink", files: [EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No3_All_of_Coralpink.png"] },
      { name: "No4 All of Lavender Fog", files: [EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No4_All_of_Lavender_Fog.png", EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No4_All_of_Lavender_Fog_texture.png"] },
      { name: "No5 All of Dusty Rose", files: [EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No5_All_of_Dusty_Rose.png", EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No5_All_of_Dusty_Rose_texture.png"] },
      { name: "No6 All of Citrus", files: [EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No6_All_of_Citrus.png", EYES + "тени/UNLEASHIA_Glitterpedia_Eye_Palette/UNLEASHIA_Glitterpedia_Eye_Palette_No6_All_of_Citrus_texture.png"] },
    ] } },
  { id: "unleashia-mood-shower-face-palette", category: MAKEUP, type: "Для глаз", brand: "UNLEASHIA", name: "UNLEASHIA Mood Shower Face Palette", title: "UNLEASHIA Mood Shower Palette", description: "Палетка для глаз и лица", price: 2490,
    shades: { list: [
      { name: "No100 Ballerina Shower", files: [EYES + "тени/UNLEASHIA_Mood_Shower_Face_Palette/UNLEASHIA_Mood_Shower_Face_Palette_No100_Ballerina_Shower.png", EYES + "тени/UNLEASHIA_Mood_Shower_Face_Palette/UNLEASHIA_Mood_Shower_Face_Palette_No100_Ballerina_Shower_looks.png"] },
      { name: "No101 Ballerino Shower", files: [EYES + "тени/UNLEASHIA_Mood_Shower_Face_Palette/UNLEASHIA_Mood_Shower_Face_Palette_No101_Ballerino_Shower.png", EYES + "тени/UNLEASHIA_Mood_Shower_Face_Palette/UNLEASHIA_Mood_Shower_Face_Palette_No101_Ballerino_Shower_looks.png"] },
    ] } },
  { id: "dasique-starlit-jewel-liquid-glitter", category: MAKEUP, type: "Для глаз", brand: "Dasique", name: "Dasique Starlit Jewel Liquid Glitter", title: "Dasique Liquid Glitter", description: "Жидкий глиттер для век", price: 1390,
    shades: { list: [
      { name: "01 Frozen Gold", files: [EYES + "тени/dasique_Starlit_Jewel_Liquid_Glitter_shades/dasique_Starlit_Jewel_Liquid_Glitter_01_Frozen_Gold.png"], color: "#e3cf9d" },
      { name: "03 Purple Sparkling", files: [EYES + "тени/dasique_Starlit_Jewel_Liquid_Glitter_shades/dasique_Starlit_Jewel_Liquid_Glitter_03_Purple_Sparkling.png"], color: "#cdb7d6" },
      { name: "06 Pink Crystal", files: [EYES + "тени/dasique_Starlit_Jewel_Liquid_Glitter_shades/dasique_Starlit_Jewel_Liquid_Glitter_06_Pink_Crystal.png"], color: "#efb5c4" },
      { name: "08 Love Flake", files: [EYES + "тени/dasique_Starlit_Jewel_Liquid_Glitter_shades/dasique_Starlit_Jewel_Liquid_Glitter_08_Love_Flake.png"], color: "#e8a3b3" },
    ] } },
  { id: "clio-kill-lash-superproof-mascara", category: MAKEUP, type: "Для глаз", brand: "CLIO", name: "CLIO Kill Lash Superproof Mascara", title: "CLIO Kill Lash Mascara", description: "Водостойкая тушь для ресниц", price: 1490,
    shades: { list: [
      { name: "001 Long Curling", files: [EYES + "туши/CLIO_Kill_Lash_Superproof_Mascara/CLIO_Kill_Lash_Superproof_Mascara_001_Long_Curling.png"], color: "#1e1e1e" },
      { name: "010 Sharp Curl Black", files: [EYES + "туши/CLIO_Kill_Lash_Superproof_Mascara/CLIO_Kill_Lash_Superproof_Mascara_010_Sharp_Curl_Black.png"], color: "#2a2a2a" },
      { name: "Fine 01 Vanilla Black", files: [EYES + "туши/CLIO_Kill_Lash_Superproof_Mascara/CLIO_Kill_Lash_Superproof_Mascara_Fine_01_Vanilla_Black.png"], color: "#3a3634" },
      { name: "Fine 02 Mousse Brown", files: [EYES + "туши/CLIO_Kill_Lash_Superproof_Mascara/CLIO_Kill_Lash_Superproof_Mascara_Fine_02_Mousse_Brown.png"], color: "#5a3d2c" },
    ] } },
  { id: "dasique-mood-up-mascara", category: MAKEUP, type: "Для глаз", brand: "Dasique", name: "Dasique Mood Up Mascara Long Curl", title: "Dasique Mood Up Mascara", description: "Подкручивающая тушь для ресниц", price: 1390, files: [EYES + "туши/Dasique_Mood_Up_Mascara_Long_Curl/Dasique_Mood_Up_Mascara_Long_Curl.png", EYES + "туши/Dasique_Mood_Up_Mascara_Long_Curl/Image-3.png"] },
  { id: "etude-curl-fix-mascara", category: MAKEUP, type: "Для глаз", brand: "Etude", name: "ETUDE Curl Fix Mascara", description: "Тушь, которая держит изгиб", price: 990,
    shades: { list: [
      { name: "Black", files: [EYES + "туши/ETUDE_Curl_Fix_Mascara/ETUDE_Curl_Fix_Mascara_Black.png", EYES + "туши/ETUDE_Curl_Fix_Mascara/Image-3.png"], color: "#1e1e1e" },
      { name: "Brown", files: [EYES + "туши/ETUDE_Curl_Fix_Mascara/ETUDE_Curl_Fix_Mascara_Brown.png"], color: "#5b3a2a" },
    ] } },
  { id: "holika-lash-correcting-mascara", category: MAKEUP, type: "Для глаз", brand: "Holika Holika", name: "Holika Holika Lash Correcting Mascara Hyper Curling", title: "Holika Holika Lash Correcting Mascara", description: "Подкручивающая тушь для ресниц", price: 990, files: [EYES + "туши/HOLIKA_HOLIKA_Lash_Correcting_Mascara/HOLIKA_HOLIKA_Lash_Correcting_Mascara_Hyper_Curling_01.png", EYES + "туши/HOLIKA_HOLIKA_Lash_Correcting_Mascara/Image-1.png"] },
  { id: "peripera-ink-all-black-cara", category: MAKEUP, type: "Для глаз", brand: "Peripera", name: "Peripera Ink All Black Cara", description: "Угольно-чёрная тушь", price: 1090, discount: "5%", hit: true, rating: "4.7",
    shades: { list: [
      { name: "01 Long Curling", files: [EYES + "туши/Peripera_Ink_All_Black_Cara/Peripera_Ink_All_Black_Cara_01_Long_Curling.png", EYES + "туши/Peripera_Ink_All_Black_Cara/Image-5.png"], color: "#1e1e1e" },
      { name: "02 Volume Curling", files: [EYES + "туши/Peripera_Ink_All_Black_Cara/Peripera_Ink_All_Black_Cara_02_Volume_Curling.png"], color: "#262626" },
    ] } },
  { id: "mude-inspire-skinny-curling-mascara", category: MAKEUP, type: "Для глаз", brand: "Mude", name: "Mude Inspire Skinny Curling Mascara", title: "Mude Skinny Curling Mascara", description: "Тонкая подкручивающая тушь", price: 1190,
    shades: { list: [
      { name: "01 Black", files: [EYES + "туши/mude_Inspire_Skinny_Curling_Mascara/mude_Inspire_Skinny_Curling_Mascara_01_Black.png"], color: "#1e1e1e" },
      { name: "02 Brown", files: [EYES + "туши/mude_Inspire_Skinny_Curling_Mascara/mude_Inspire_Skinny_Curling_Mascara_02_Brown.png"], color: "#5b3a2a" },
    ] } },

  // ---------- бьюти-гаджеты ----------
  { id: "cellreturn-led-mask", category: "Бьюти-гаджеты", type: "LED-маски", brand: "CellReturn", name: "CellReturn Premium LED Mask", description: "LED-маска для омоложения кожи", price: 89990, files: [T + "CellReturn_LED_Mask.png"] },
  { id: "currentbody-led-mask", category: "Бьюти-гаджеты", type: "LED-маски", brand: "CurrentBody", name: "CurrentBody Skin LED Light Therapy Mask", title: "CurrentBody Skin LED Mask", description: "Гибкая LED-маска для лица", price: 39990, discount: "15%", hit: true, files: [T + "CurrentBody_Skin_LED_Mask.png"] },
  { id: "caelumen-micro-led-mask", category: "Бьюти-гаджеты", type: "LED-маски", brand: "Caelumen", name: "Caelumen Micro LED Mask", description: "Компактная LED-маска", price: 29990, files: [T + "Caelumen_Micro_LED_Mask.png"] },
  { id: "medicube-age-r-booster-pro", category: "Бьюти-гаджеты", type: "Микротоки", also: [[HITS, "Тренды Тиктока"]], brand: "Medicube", name: "Medicube Age-R Booster Pro", description: "Аппарат 6 в 1: микротоки, EMS, электропорация", price: 24990, discount: "10%", hit: true, rating: "4.8", files: [T + "Medicube_AGE-R_Booster_Pro.png", T + "Medicube_AGE-R_Booster_Pro_Pink.png"] },
  { id: "medicube-age-r-derma-tox", category: "Бьюти-гаджеты", type: "Аппараты для лица", brand: "Medicube", name: "Medicube Age-R Derma EMS Shot", title: "Medicube Age-R Derma EMS Shot", description: "Роликовый EMS-массажёр для упругости кожи", price: 19990, files: [T + "Medicube_AGE-R_Derma_Tox.png"] },
];

/** Уже существующие товары «Ухода для лица», которые дополнительно показываем в других разделах */
export const tags = {
  "cosrx-vitamin-c23": [[GLOW, "Сияние кожи"]],
  "tirtir-vitamin-c24": [[GLOW, "Сияние кожи"]],
  "cosrx-alpha-arbutin": [[GLOW, "Выравнивание тона"], [AGE, "От пигментации"]],
  "numbuzin-no5-glutathione": [[GLOW, "Выравнивание тона"]],
  "skin1004-tone-brightening": [[GLOW, "Выравнивание тона"]],
  "medipeel-peptide-9-cream": [[GLOW, "Антивозрастной уход"], [AGE, "Пептиды"]],
  "torriden-dive-in-serum": [[GLOW, "Увлажнение"], [HITS, "Бестселлеры Olive Young"]],
  "round-lab-birch-cream": [[GLOW, "Увлажнение"]],
  "aestura-atobarrier-cream": [[GLOW, "Восстановление барьера"], [HITS, "Бестселлеры Olive Young"]],
  "cosrx-ceramide-cream": [[GLOW, "Восстановление барьера"]],
  "skin1004-centella-ampoule": [[GLOW, "Успокаивающий уход"], [HITS, "Бестселлеры Olive Young"]],
  "mediheal-nmf-ampoule-mask": [[GLOW, "Экспресс-уход"]],
  "anua-pdrn-cream": [[GLOW, "Питание и восстановление"], [HITS, "Тренды в Корее"]],
  "anua-heartleaf-sun-cream": [[GLOW, "Защита от солнца"], [SUN, "Увлажняющие кремы с SPF"]],
  "anua-peach-tone-up": [[SUN, "Увлажняющие кремы с SPF"]],
  "celimax-retinal-shot": [[AGE, "Ретинол и ретиноиды"], [HITS, "Тренды в Корее"]],
  "wishtrend-bakuchiol-cream": [[AGE, "Ретинол и ретиноиды"]],
  "vely-vely-spicule-cream": [[AGE, "Лифтинг и упругость"]],
  "anua-niacinamide-txa-serum": [[AGE, "От пигментации"]],
  "abib-pdrn-cream": [[AGE, "Кремы"], [HITS, "Тренды в Корее"]],
  "centellian-madeca-cream": [[AGE, "Кремы"]],
  "anua-pdrn-capsule-serum": [[AGE, "Сыворотки и ампулы"], [HITS, "Тренды в Корее"]],
  "banila-clean-it-zero": [[HITS, "Бестселлеры Olive Young"]],
  "round-lab-dokdo-toner": [[HITS, "Бестселлеры Olive Young"]],
  "medicube-collagen-jelly-cream": [[HITS, "Тренды Тиктока"]],
  "biodance-collagen-mask": [[HITS, "Тренды Тиктока"]],
  "medicube-collagen-overnight-mask": [[HITS, "Тренды Тиктока"]],
  "numbuzin-no5-pad": [[HITS, "Тренды Тиктока"]],
  "cosrx-pdrn-overnight-mask": [[HITS, "Тренды в Корее"]],
  "medicube-pdrn-caffeine-mask": [[HITS, "Тренды в Корее"]],
  "anua-pore-cleansing-oil": [[HITS, "Бестселлеры Olive Young"]],
  "torriden-dive-in-cream": [[HITS, "Бестселлеры Olive Young"]],
  "dr-althea-345-cream": [[HITS, "Бестселлеры Olive Young"]],
  "mediheal-nmf-ampoule-mask": [[HITS, "Бестселлеры Olive Young"]],
  "medicube-zero-pore-pad": [[HITS, "Тренды Тиктока"]],
  "numbuzin-no3-serum": [[HITS, "Тренды Тиктока"]],
  "medicube-kojic-serum": [[HITS, "Тренды Тиктока"]],
  "biodance-caviar-eye-patch": [[HITS, "Тренды в Корее"]],
  "abib-pdrn-glow-serum": [[HITS, "Тренды в Корее"]],
};

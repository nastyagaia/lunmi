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

const FACE = "Уход для лица";
const GLOW = "Glow-skin";
const AGE = "Антивозрастной уход";
const SUN = "Для загара";
const HITS = "Хиты Кореи";

/** Новые товары. files — пути от ROOT */
export const extraProducts = [
  // ---------- из папки glow skin: уходовые средства, живут в «Уходе для лица» и в Glow-skin ----------
  { id: "anua-heartleaf-77-toner", category: FACE, type: "Тонеры и пэды", also: [[GLOW, "Успокаивающий уход"], [HITS, "Бестселлеры Olive Young"]], brand: "Anua", name: "Anua Heartleaf 77% Soothing Toner", title: "Anua Heartleaf 77% Toner", description: "Успокаивающий тонер с хауттюйнией", price: 2490, hit: true, rating: "4.9", files: [G + "Anua_Heartleaf77_SoothingToner.png"] },
  { id: "cosrx-bha-blackhead", category: FACE, type: "Тонеры и пэды", also: [[GLOW, "Уход за порами"]], brand: "COSRX", name: "COSRX BHA Blackhead Power Liquid", title: "COSRX BHA Blackhead Liquid", description: "Тоник с BHA против чёрных точек", price: 1990, rating: "4.7", files: [G + "COSRX_BHA_BlackheadPowerLiquid.png"] },
  { id: "drjart-ceramidin-cream", category: FACE, type: "Кремы", also: [[GLOW, "Восстановление барьера"]], brand: "Dr.Jart+", name: "Dr.Jart+ Ceramidin Cream", description: "Крем с керамидами для сухой кожи", price: 3490, files: [G + "DrJart_Ceramidin_Cream.png"] },
  { id: "goodal-vita-c-serum", category: FACE, type: "Сыворотки и ампулы", also: [[GLOW, "Сияние кожи"]], brand: "Goodal", name: "Goodal Green Tangerine Vita C Dark Spot Serum", title: "Goodal Green Tangerine Vita C", description: "Сыворотка с витамином C против пятен", price: 2390, discount: "10%", files: [G + "Goodal_GreenTangerine_VitaC.png"] },
  { id: "klairs-vitamin-drop", category: FACE, type: "Сыворотки и ампулы", also: [[GLOW, "Сияние кожи"]], brand: "Klairs", name: "Klairs Freshly Juiced Vitamin Drop", title: "Klairs Freshly Juiced Vitamin Drop", description: "Мягкая сыворотка с витамином C", price: 1890, rating: "4.7", files: [G + "Klairs_FreshlyJuiced_VitaminDrop.png"] },
  { id: "medipeel-melanon-x", category: FACE, type: "Кремы", also: [[GLOW, "Выравнивание тона"], [AGE, "От пигментации"]], brand: "Medi-Peel", name: "Medi-Peel Melanon X Cream", description: "Крем против пигментации", price: 2190, files: [G + "MEDIPEEL_MelanonX_Cream.png"] },
  { id: "medipeel-red-lacto-mask", category: FACE, type: "Маски", also: [[GLOW, "Экспресс-уход"], [AGE, "Коллаген"]], brand: "Medi-Peel", name: "Medi-Peel Red Lacto Collagen Wrapping Mask", title: "Medi-Peel Red Lacto Collagen Mask", description: "Маска-плёнка с коллагеном", price: 2290, hit: true, rating: "4.7", files: [G + "MEDIPEEL_RedLacto_CollagenMask.png"] },
  { id: "numbuzin-no5-cream", category: FACE, type: "Кремы", also: [[GLOW, "Сияние кожи"]], brand: "Numbuzin", name: "Numbuzin No.5 Vitamin-Niacinamide Concentrated Cream", title: "Numbuzin No.5 Vitamin Cream", description: "Крем с витаминами для сияния", price: 2590, files: [G + "Numbuzin_No5_MultiVitaminCream.png"] },
  { id: "somebymi-miracle-toner", category: FACE, type: "Тонеры и пэды", also: [[GLOW, "Уход за порами"]], brand: "Some By Mi", name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner", title: "Some By Mi Miracle Toner", description: "Тонер с кислотами для проблемной кожи", price: 1590, files: [G + "SomeByMi_AHABHAPHA_MiracleToner.png"] },
  { id: "vt-reedle-shot-100", category: FACE, type: "Сыворотки и ампулы", also: [[GLOW, "Сияние кожи"], [HITS, "Тренды Тиктока"]], brand: "VT Cosmetics", name: "VT Reedle Shot 100", description: "Сыворотка со спикулами для обновления кожи", price: 2690, hit: true, rating: "4.6", files: [G + "VT_ReedleShot_100.png"] },
  { id: "manyo-bifida-eye-cream", category: FACE, type: "Кремы", also: [[GLOW, "Увлажнение"], [AGE, "Кремы для глаз"]], brand: "Manyo", name: "Manyo Bifida Biome Concentrate Eye Cream", title: "Manyo Bifida Biome Eye Cream", description: "Крем для кожи вокруг глаз", price: 2390, files: [G + "manyo_BifidaBiome_EyeCream.png"] },

  // ---------- антивозрастной уход ----------
  { id: "arencia-red-smoothie-serum", category: FACE, type: "Сыворотки и ампулы", also: [[AGE, "Коллаген"], [HITS, "Тренды в Корее"]], brand: "Arencia", name: "Arencia Red Smoothie Serum 30", title: "Arencia Red Smoothie Serum", description: "Сыворотка-желе с коллагеном", price: 2990, files: [A + "Arencia_Red_Smoothie_Serum_8.png"] },
  { id: "ohui-retinol-cream", category: FACE, type: "Кремы", also: [[AGE, "Ретинол и ретиноиды"]], brand: "O HUI", name: "O HUI Reverse Activator Retinol Wrinkle Cream", title: "O HUI Retinol Wrinkle Cream", description: "Крем с ретинолом против морщин", price: 4990, files: [A + "OHUI_Reverse_Activator_Retinol_Wrinkle_Cream.png"] },
  { id: "ahc-real-eye-cream", category: FACE, type: "Кремы", also: [[AGE, "Кремы для глаз"]], brand: "AHC", name: "AHC Ten Revolution Real Eye Cream For Face", title: "AHC Real Eye Cream For Face", description: "Крем для глаз и лица", price: 2490, hit: true, rating: "4.8", files: [A + "AHC_Ten_Revolution_Real_Eye_Cream_For_Face.png"] },
  { id: "sulwhasoo-ginseng-cream", category: FACE, type: "Кремы", also: [[AGE, "Кремы"]], brand: "Sulwhasoo", name: "Sulwhasoo Concentrated Ginseng Rejuvenating Cream", title: "Sulwhasoo Ginseng Cream", description: "Омолаживающий крем с женьшенем", price: 12990, files: [A + "Sulwhasoo_Concentrated_Ginseng_Rejuvenating_Cream.png"] },
  { id: "arencia-nad-booster", category: FACE, type: "Сыворотки и ампулы", also: [[AGE, "Сыворотки и ампулы"]], brand: "Arencia", name: "Arencia NAD+ Time-Rewind Booster Shot", title: "Arencia NAD+ Booster Shot", description: "Антивозрастной бустер с NAD+", price: 2790, files: [A + "Arencia NAD+ Time-Rewind Booster Shot.png"] },
  { id: "drdifferent-vitalift-a", category: FACE, type: "Кремы", also: [[AGE, "Ретинол и ретиноиды"]], brand: "Dr.Different", name: "Dr.Different Vitalift-A Forte", description: "Крем с ретиналем для упругости", price: 3990, files: [A + "DrDifferent_Vitalift_A_Forte.png"] },
  { id: "hera-signia-lifting-serum", category: FACE, type: "Сыворотки и ампулы", also: [[AGE, "Лифтинг и упругость"]], brand: "HERA", name: "HERA Signia Core Lifting Serum", title: "HERA Signia Lifting Serum", description: "Лифтинг-сыворотка", price: 8990, files: [A + "HERA_Signia_Core_Lifting_Serum.png"] },
  { id: "elizavecca-piggy-collagen", category: FACE, type: "Маски", also: [[AGE, "Коллаген"]], brand: "Elizavecca", name: "Elizavecca Green Piggy Collagen Jella Pack", title: "Elizavecca Piggy Collagen Pack", description: "Коллагеновая маска-желе", price: 990, files: [A + "Elizavecca Green Piggy Collagen Jella Pack.png"] },

  // ---------- для тела ----------
  { id: "illiyoon-top-to-toe-wash", category: "Для тела", type: "Гели для душа", brand: "Illiyoon", name: "Illiyoon Ceramide Ato 6.0 Top to Toe Wash", title: "Illiyoon Ceramide Ato Top to Toe Wash", description: "Мягкий гель для тела и волос", price: 1690, rating: "4.8", files: [B + "ILLIYOON_Ceramide_Ato_6.0_Top_to_Toe_Wash.png"] },
  { id: "happy-bath-baby-powder", category: "Для тела", type: "Гели для душа", brand: "Happy Bath", name: "Happy Bath Baby Powder 420 Body Wash", title: "Happy Bath Baby Powder Body Wash", description: "Гель для душа с пудровым ароматом", price: 990, files: [B + "HAPPY_BATH_Baby_Powder_420_Body_Wash.png"] },
  { id: "kundal-honey-body-wash", category: "Для тела", type: "Гели для душа", also: [[HITS, "Тренды Тиктока"]], brand: "Kundal", name: "Kundal Honey & Macadamia Body Wash White Musk", title: "Kundal Honey Body Wash White Musk", description: "Гель для душа с мёдом и макадамией", price: 1290, hit: true, files: [B + "KUNDAL_Honey_Macadamia_Body_Wash_White_Musk.png"] },
  { id: "somebymi-body-cleanser", category: "Для тела", type: "Уход против акне", brand: "Some By Mi", name: "Some By Mi AHA BHA PHA 30 Days Miracle Acne Clear Body Cleanser", title: "Some By Mi Acne Body Cleanser", description: "Гель для тела против высыпаний", price: 1490, files: [B + "Some_By_Mi_AHA_BHA_PHA_30_Days_Miracle_Acne_Clear_Body_Cleanser.png"] },
  { id: "illiyoon-scrub-wash", category: "Для тела", type: "Скрабы", brand: "Illiyoon", name: "Illiyoon Fresh Moisture Scrub Wash", title: "Illiyoon Fresh Scrub Wash", description: "Мягкий скраб-гель для душа", price: 1390, files: [B + "ILLIYOON_Fresh_Moisture_Scrub_Wash.png"] },
  { id: "skinfood-black-sugar-scrub", category: "Для тела", type: "Скрабы", brand: "Skinfood", name: "Skinfood Black Sugar Perfect Essential Scrub 2X", title: "Skinfood Black Sugar Scrub 2X", description: "Скраб с чёрным сахаром", price: 1190, rating: "4.7", files: [B + "SKINFOOD_Black_Sugar_Perfect_Essential_Scrub_2X.png"] },
  { id: "illiyoon-ato-concentrate-cream", category: "Для тела", type: "Лосьоны и кремы", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Illiyoon", name: "Illiyoon Ceramide Ato Concentrate Cream", title: "Illiyoon Ceramide Ato Cream", description: "Крем с керамидами для сухой кожи", price: 1890, hit: true, rating: "4.9", files: [B + "ILLIYOON_Ceramide_Ato_Concentrate_Cream.png"] },
  { id: "aestura-body-lotion", category: "Для тела", type: "Лосьоны и кремы", brand: "Aestura", name: "AESTURA Atobarrier 365 Body Lotion", title: "Aestura Atobarrier 365 Lotion", description: "Лосьон для тела с керамидами", price: 2490, files: [B + "AESTURA_Atobarrier365_Body_Lotion.png"] },
  { id: "kundal-honey-body-lotion", category: "Для тела", type: "Лосьоны и кремы", brand: "Kundal", name: "Kundal Honey & Macadamia Body Lotion White Musk", title: "Kundal Honey Body Lotion", description: "Лосьон с мёдом и макадамией", price: 1290, files: [B + "KUNDAL_Honey_Macadamia_Body_Lotion_White_Musk.png"] },
  { id: "illiyoon-ato-lotion", category: "Для тела", type: "Лосьоны и кремы", brand: "Illiyoon", name: "Illiyoon Ceramide Ato Lotion", description: "Увлажняющий лосьон для тела", price: 1590, files: [B + "ILLIYOON_Ceramide_Ato_Lotion.png"] },
  { id: "aromatica-body-cream", category: "Для тела", type: "Масла и эссенции для тела", brand: "Aromatica", name: "Aromatica Mellowness Oil-In Body Cream", title: "Aromatica Oil-In Body Cream", description: "Крем-масло для тела", price: 1990, files: [B + "AROMATICA_Mellowness_Oil_In_Body_Cream.png"] },
  { id: "aromatica-body-mist", category: "Для тела", type: "Мисты для тела", brand: "Aromatica", name: "Aromatica Inspirit Body Mist Basil & Bergamot", title: "Aromatica Body Mist Basil", description: "Мист для тела с базиликом и бергамотом", price: 1490, files: [B + "AROMATICA_Inspirit_Body_Mist_Basil_Bergamot.png"] },
  { id: "scentlier-body-mist", category: "Для тела", type: "Мисты для тела", brand: "Scentlier", name: "Scentlier Perfume Body Mist Ice Orange Blossom", title: "Scentlier Body Mist Orange Blossom", description: "Парфюмированный мист для тела", price: 1290, files: [B + "Scentlier_Perfume_Body_Mist_Ice_Orange_Blossom.png"] },
  { id: "nature-garden-grape-mist", category: "Для тела", type: "Мисты для тела", brand: "Nature Garden", name: "Nature Garden Pretty Sweet Grape Perfumed Body Mist", title: "Nature Garden Grape Body Mist", description: "Мист для тела с ароматом винограда", price: 990, files: [B + "Nature_Garden_Pretty_Sweet_Grape_Perfumed_Body_Mist.png"] },
  { id: "kundal-white-musk-mist", category: "Для тела", type: "Мисты для тела", brand: "Kundal", name: "Kundal Pure Moist Body Mist White Musk", title: "Kundal Body Mist White Musk", description: "Увлажняющий мист для тела", price: 1190, files: [B + "KUNDAL_Pure_Moist_Body_Mist_White_Musk.png"] },
  { id: "whamisa-algae-mist", category: "Для тела", type: "Мисты для тела", brand: "Whamisa", name: "Whamisa Organic Algae Body Mist", description: "Органический мист с водорослями", price: 1690, files: [B + "WHAMISA_Organic_Algae_Body_Mist.png"] },

  // ---------- для волос ----------
  { id: "lador-keratin-shampoo", category: "Для волос", type: "Шампуни", brand: "Lador", name: "Lador Keratin LPP Shampoo", description: "Шампунь с кератином для повреждённых волос", price: 1690, hit: true, rating: "4.8", files: [H + "Lador_Keratin_LPP_Shampoo_530ml.png"] },
  { id: "lador-angel-muguet-shampoo", category: "Для волос", type: "Шампуни", brand: "Lador", name: "Lador Angel Muguet Perfumed Hair Shampoo", title: "Lador Angel Muguet Shampoo", description: "Парфюмированный шампунь с ароматом ландыша", price: 1490, files: [H + "Lador_Angel_Muguet_Perfumed_Hair_Shampoo.png"] },
  { id: "lador-moisture-shampoo", category: "Для волос", type: "Шампуни", brand: "Lador", name: "Lador Moisture Balancing Shampoo", description: "Увлажняющий шампунь", price: 1390, files: [H + "Lador_Moisture_Balancing_Shampoo.png"] },
  { id: "lador-tea-tree-scalp", category: "Для волос", type: "Уход за кожей головы", brand: "Lador", name: "Lador Tea Tree Calming Scalp Shampoo", title: "Lador Tea Tree Scalp Shampoo", description: "Успокаивающий шампунь для кожи головы", price: 1490, files: [H + "Lador_Tea_Tree_Calming_Scalp_Shampoo.png"] },
  { id: "lador-acid-conditioner", category: "Для волос", type: "Кондиционеры", brand: "Lador", name: "Lador Damage Protector Acid Conditioner", title: "Lador Acid Conditioner", description: "Кондиционер для повреждённых волос", price: 1490, files: [H + "Lador_Damage_Protector_Acid_Conditioner.png"] },
  { id: "lador-hydro-lpp", category: "Для волос", type: "Маски", also: [[HITS, "Бестселлеры Olive Young"]], brand: "Lador", name: "Lador Hydro LPP Treatment", description: "Маска для волос с протеинами", price: 1290, hit: true, rating: "4.9", files: [H + "Lador_Hydro_LPP_Treatment_530ml.png", H + "Lador_Hydro_LPP_Treatment_150ml.png"] },
  { id: "lador-osmanthus-treatment", category: "Для волос", type: "Маски", brand: "Lador", name: "Lador Osmanthus Perfumed Hair Treatment", title: "Lador Osmanthus Hair Treatment", description: "Парфюмированная маска для волос", price: 1390, files: [H + "Lador_Osmanthus_Perfumed_Hair_Treatment.png"] },
  { id: "jsoop-keratin-ampoule", category: "Для волос", type: "Несмываемый уход", brand: "JSOOP", name: "JSOOP Silk Keratin No-Wash Ampoule Treatment 2X", title: "JSOOP Silk Keratin Ampoule", description: "Несмываемая ампула с кератином", price: 1190, files: [H + "JSOOP_Silk_Keratin_No-Wash_Ampoule_Treatment_2X.png"] },
  { id: "lador-wonder-balm", category: "Для волос", type: "Несмываемый уход", brand: "Lador", name: "Lador Wonder Balm", description: "Несмываемый бальзам для блеска", price: 1290, files: [H + "Lador_Wonder_Balm.png"] },
  { id: "lador-angel-muguet-oil", category: "Для волос", type: "Сыворотки и масла", brand: "Lador", name: "Lador Angel Muguet Perfumed Hair Oil", title: "Lador Angel Muguet Hair Oil", description: "Парфюмированное масло для волос", price: 1390, files: [H + "Lador_Angel_Muguet_Perfumed_Hair_Oil.png"] },
  { id: "lador-osmanthus-oil", category: "Для волос", type: "Сыворотки и масла", brand: "Lador", name: "Lador Osmanthus Perfumed Hair Oil", title: "Lador Osmanthus Hair Oil", description: "Масло для волос с ароматом османтуса", price: 1390, files: [H + "Lador_Osmanthus_Perfumed_Hair_Oil.png"] },

  // ---------- для загара: солнцезащитные средства живут и в «SPF для лица» ----------
  { id: "manyo-sun-serum", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Manyo", name: "Manyo Galactomy Moisture Sun Serum SPF50+ PA++++", title: "Manyo Galactomy Sun Serum", description: "Увлажняющая солнцезащитная сыворотка", price: 1990, files: [S + "Manyo Galactomy Moisture Sun Serum SPF 50+ PA++++.png"] },
  { id: "manyo-sun-stick", category: FACE, type: "SPF для лица", also: [[SUN, "SPF-стики"]], brand: "Manyo", name: "Manyo Hyaluron Hydrating Sun Stick SPF50+ PA++++", title: "Manyo Hyaluron Sun Stick", description: "Увлажняющий солнцезащитный стик", price: 1790, files: [S + "Manyo Hyaluron Hydrating Sun Stick SPF50+ PA++++.png"] },
  { id: "anua-glow-sunstick", category: FACE, type: "SPF для лица", also: [[SUN, "SPF-стики"]], brand: "Anua", name: "Anua Invisible Glow Finish Sunstick", title: "Anua Glow Finish Sunstick", description: "Невидимый стик с сияющим финишем", price: 1890, hit: true, files: [S + "Anua_Invisible_Glow_Finish_Sunstick.png"] },
  { id: "drg-green-mild-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Dr.G", name: "Dr.G Green Mild Up Sun+", description: "Минеральный крем для чувствительной кожи", price: 1890, files: [S + "Dr.G_Green_Mild_Up_Sun+.png"] },
  { id: "benton-air-fit-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Benton", name: "Benton Air Fit UV Defense Sun Cream", title: "Benton Air Fit Sun Cream", description: "Лёгкий солнцезащитный крем", price: 1590, files: [S + "Benton_Air_Fit_UV_Defense_Sun_Cream.png"] },
  { id: "axis-y-physical-sunscreen", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "AXIS-Y", name: "AXIS-Y Complete No-Stress Physical Sunscreen", title: "AXIS-Y Physical Sunscreen", description: "Минеральный солнцезащитный крем", price: 1690, files: [S + "AXIS-Y_Complete_No-Stress_Physical_Sunscreen_V3.png"] },
  { id: "cosrx-invisible-sunscreen", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "COSRX", name: "COSRX Ultra-Light Invisible Sunscreen", title: "COSRX Invisible Sunscreen", description: "Невесомый солнцезащитный крем", price: 1590, rating: "4.6", files: [S + "COSRX_Ultra-Light_Invisible_Sunscreen.png"] },
  { id: "purito-soft-touch-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Purito", name: "Purito Daily Soft Touch Sunscreen", title: "Purito Soft Touch Sunscreen", description: "Солнцезащитный крем с бархатным финишем", price: 1490, files: [S + "Purito_Daily_Soft_Touch_Sunscreen.png"] },
  { id: "thank-you-farmer-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Thank You Farmer", name: "Thank You Farmer Sun Project Skin Relief Sun Cream", title: "Thank You Farmer Relief Sun Cream", description: "Успокаивающий солнцезащитный крем", price: 1690, files: [S + "Thank_You_Farmer_Sun_Project_Skin_Relief_Sun_Cream.png"] },
  { id: "skin1004-hyalu-cica-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"], [HITS, "Бестселлеры Olive Young"]], brand: "SKIN1004", name: "SKIN1004 Hyalu-Cica Water-Fit Sun Serum", title: "SKIN1004 Hyalu-Cica Sun Serum", description: "Солнцезащитная сыворотка с центеллой", price: 1790, hit: true, rating: "4.9", files: [S + "SKIN1004_Hyalu-Cica_Water-Fit_Sun_Serum.png"] },
  { id: "tocobo-bio-watery-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Tocobo", name: "Tocobo Bio Watery Sun Cream SPF50+", title: "Tocobo Bio Watery Sun Cream", description: "Водянистый солнцезащитный крем", price: 1690, files: [S + "TOCOBO_Bio_Watery_Sun_Cream_SPF50+.png"] },
  { id: "haruharu-black-rice-sun", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "Haruharu", name: "Haruharu Wonder Black Rice Moisture Airyfit Daily Sunscreen", title: "Haruharu Black Rice Sunscreen", description: "Увлажняющий крем с чёрным рисом", price: 1890, files: [S + "Haruharu Wonder Black Rice Moisture Airyfit Daily Sunscreen.png"] },
  { id: "makeprem-sun-essence", category: FACE, type: "SPF для лица", also: [[SUN, "Увлажняющие кремы с SPF"]], brand: "make p:rem", name: "make p:rem UV Defense Me Daily Sun Essence", title: "make p:rem Daily Sun Essence", description: "Солнцезащитная эссенция на каждый день", price: 1590, files: [S + "make_prem_UV_Defense_Me_Daily_Sun_Essence.png"] },

  // ---------- бьюти-гаджеты ----------
  { id: "cellreturn-led-mask", category: "Бьюти-гаджеты", type: "LED-маски", brand: "CellReturn", name: "CellReturn Premium LED Mask", description: "LED-маска для омоложения кожи", price: 89990, files: [T + "CellReturn_LED_Mask.png"] },
  { id: "currentbody-led-mask", category: "Бьюти-гаджеты", type: "LED-маски", brand: "CurrentBody", name: "CurrentBody Skin LED Light Therapy Mask", title: "CurrentBody Skin LED Mask", description: "Гибкая LED-маска для лица", price: 39990, hit: true, files: [T + "CurrentBody_Skin_LED_Mask.png"] },
  { id: "caelumen-micro-led-mask", category: "Бьюти-гаджеты", type: "LED-маски", brand: "Caelumen", name: "Caelumen Micro LED Mask", description: "Компактная LED-маска", price: 29990, files: [T + "Caelumen_Micro_LED_Mask.png"] },
  { id: "medicube-age-r-booster-pro", category: "Бьюти-гаджеты", type: "Микротоки", also: [[HITS, "Тренды Тиктока"]], brand: "Medicube", name: "Medicube Age-R Booster Pro", description: "Аппарат 6 в 1: микротоки, EMS, электропорация", price: 24990, hit: true, rating: "4.8", files: [T + "Medicube_AGE-R_Booster_Pro.png", T + "Medicube_AGE-R_Booster_Pro_Pink.png"] },
  { id: "medicube-age-r-derma-tox", category: "Бьюти-гаджеты", type: "Аппараты для лица", brand: "Medicube", name: "Medicube Age-R Derma Tox Shot", title: "Medicube Age-R Derma Tox", description: "Аппарат для упругости и сияния кожи", price: 19990, files: [T + "Medicube_AGE-R_Derma_Tox.png"] },
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

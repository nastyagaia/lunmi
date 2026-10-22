// Отзывы для английской версии — переводы пулов из src/data/reviews.ts (те же места в списках, чтобы подбор совпадал).
type Kind = "care" | "spf" | "cleanse" | "mask" | "lips" | "face" | "eyes" | "body" | "hair" | "gadget";

export const NAMES_EN = [
  "Anna", "Polina", "Veronica", "Maria", "Alina", "Daria", "Kate", "Ksenia", "Sofia", "Victoria",
  "Olga", "Julia", "Elizabeth", "Arina", "Kristina", "Natalie", "Irina", "Valerie", "Taisia", "Milana",
  "Alexandra", "Eva", "Margaret", "Anastasia", "Svetlana", "Diana", "Yana", "Alyona", "Karina", "Vera",
];

export const DATES_EN = [
  "2 days ago", "4 days ago", "1 week ago", "2 weeks ago", "3 weeks ago",
  "1 month ago", "2 months ago", "3 months ago", "5 months ago",
];

export const POOL_EN: Record<Kind, { good: string[]; mid: string[] }> = {
  care: {
    good: [
      "I’ve been using it morning and night for about a month. My skin is noticeably smoother and calmer, and the flaky patches on my cheeks are gone. The texture is light, absorbs in a minute and doesn’t pill under cream.",
      "Bought it on a friend’s recommendation and have no regrets. After a couple of weeks my skin looks rested and there’s less redness around my nose. It lasts ages.",
      "My second bottle already. I love that it has no strong scent and doesn’t sting, even though my skin is sensitive. A great basic step in any routine.",
      "I apply it at night under my cream — in the morning my skin is soft and feels nourished. Works well under makeup too, nothing pills.",
      "I was looking for something for dehydrated skin in winter — this is it. The tight feeling is gone and my skin feels much smoother.",
      "Third time buying it. Fewer breakouts, and old marks have faded noticeably. I use it with SPF during the day.",
    ],
    mid: [
      "Good product, my skin is softer, but no miracle — the effect builds up over time. I’ll keep using it and see.",
      "Lovely texture, but it wasn’t quite hydrating enough for me — I always put cream on top. I think it’ll be perfect in summer.",
    ],
  },
  spf: {
    good: [
      "Finally a sunscreen that doesn’t leave a white cast or feel greasy! I wear it every morning under foundation — everything stays put, nothing pills.",
      "Light as a regular moisturizer. Doesn’t sting my eyes and has almost no scent. Took it on holiday — didn’t burn once.",
      "I’ve tried so many SPFs, and this one stays on my favorites list. My skin isn’t shiny by lunchtime, and it’s invisible under makeup.",
      "Easy to reapply during the day and doesn’t dry my skin out. A great everyday option for the city.",
    ],
    mid: [
      "Protects well, but on my oily skin I get some shine by evening — I have to blot. Otherwise I love it.",
    ],
  },
  cleanse: {
    good: [
      "Removes even long-wear makeup and SPF perfectly, and my skin doesn’t feel tight afterwards. Lasts a long time.",
      "Gentle and pleasant, my skin feels clean but not squeaky. I’ve been using it morning and night for two months.",
      "Clearer pores and far fewer blackheads on my nose. Works great paired with a gel cleanser.",
      "My favorite first-step cleanser. Dissolves mascara without rubbing and doesn’t sting my eyes.",
    ],
    mid: [
      "Cleanses well, but I missed a richer lather — I’m used to foamier textures. No complaints about the results.",
    ],
  },
  mask: {
    good: [
      "I do it once or twice a week before big days — skin is instantly fresh and glowing, and makeup goes on perfectly.",
      "Feels lovely on the skin, well soaked, with enough serum left for my neck and hands. In the morning my face looks rested.",
      "After this mask my skin is visibly hydrated and smooth. I always stock up on a few.",
      "I use it in the evening after a shower, and in the morning my face is fresh with no signs of fatigue. A great express treatment.",
    ],
    mid: [
      "Nice effect, but it doesn’t last as long as I’d like. Perfect for a quick refresh before going out.",
    ],
  },
  lips: {
    good: [
      "Gorgeous, natural color that looks juicy on the lips. Doesn’t dry them out, lasts until my first meal and then leaves a light stain.",
      "Bought one shade and now I want them all. Lovely texture, not sticky, and my lips look well cared for.",
      "So easy to apply, the applicator gives even color. The shade matches the photo and works with everyday makeup.",
      "I wear it every day — light and weightless. You can layer it for brighter color.",
    ],
    mid: [
      "Beautiful shade, but on my dry lips it emphasizes the cracks — I put balm on first. Then it’s perfect.",
    ],
  },
  face: {
    good: [
      "Looks very natural, my skin looks even but not covered up. Lasts my whole workday.",
      "Found my shade on the first try, and it doesn’t oxidize during the day. Beautiful finish — skin looks rested.",
      "Compact and convenient, I carry it in my bag for touch-ups. Blends easily, no patches.",
      "I love the result: a soft, fresh look, no “mask” effect. A great everyday option.",
    ],
    mid: [
      "The coverage is light — a bit too light for me, so I add concealer. But the finish is gorgeous.",
    ],
  },
  eyes: {
    good: [
      "Lasts all day, doesn’t flake or transfer. Comes off easily with cleansing oil.",
      "Gorgeous shades that go well together. They blend easily — even I managed without much experience.",
      "Handy brush, I get a thin line on the first try. Doesn’t sting my eyes, and I wear contacts with no problem.",
    ],
    mid: [
      "I like the color, but it fades a little by evening. A great option for daytime makeup.",
    ],
  },
  body: {
    good: [
      "Lovely scent that lingers on the skin for a couple of hours. Skin is soft after the shower, no more dryness.",
      "Second time buying it — lasts long, nice texture, absorbs well. Skin is soft and velvety.",
      "Hydrates really well, I use it all over after the shower. Not sticky — you can get dressed right away.",
    ],
    mid: [
      "Good product, but the scent is a bit too sweet for me. Love the care itself.",
    ],
  },
  hair: {
    good: [
      "My hair is smooth, soft and easy to comb, no more frizz. I use it once a week.",
      "My colored hair looks much more alive and shiny. Lovely scent that lasts until the next wash.",
      "Great care for long hair — the ends look healthy and split less.",
    ],
    mid: [
      "Good effect, but on my fine hair I need to use very little, or it weighs it down.",
    ],
  },
  gadget: {
    good: [
      "I’ve been using it 3–4 times a week for about a month — my jawline is more defined and there’s less morning puffiness. Light and comfortable, and the battery lasts ages.",
      "I was skeptical at first, but the effect is visible: skin is firmer and glowing, and serums absorb better. The treatment is pleasant and relaxing.",
      "A great alternative to facialist visits. Works quietly, clear modes, everything is intuitive.",
    ],
    mid: [
      "Good device, but results don’t show right away — you need to be consistent. After a couple of weeks I noticed the effect.",
    ],
  },
};

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  isVeg: boolean;
  isChefPick?: boolean;
  price: number | null; // null as per Section 1 & Section 7
  isSample: boolean;
  image: string;
}

export type MenuCategory =
  | "Starters"
  | "Live Counters"
  | "Main Course"
  | "Biryani and Rice"
  | "Breads"
  | "Indo-Chinese"
  | "Italian"
  | "Desserts"
  | "Mocktails";

export const menuCategories: MenuCategory[] = [
  "Starters",
  "Live Counters",
  "Main Course",
  "Biryani and Rice",
  "Breads",
  "Indo-Chinese",
  "Italian",
  "Desserts",
  "Mocktails",
];

export const signatureDishes: MenuItem[] = [
  {
    id: "sig-1",
    name: "Murg Tikka Masala",
    category: "Main Course",
    description:
      "Tender tandoori chicken chunks simmered in a velvet tomato and cream reduction with Awadhi spices.",
    isVeg: false,
    isChefPick: true,
    price: null,
    isSample: false, // Verified known specialty
    image: "/placeholders/dish-murg-tikka.svg",
  },
  {
    id: "sig-2",
    name: "Awadhi Dum Biryani",
    category: "Biryani and Rice",
    description:
      "Fragrant long-grain basmati slow-cooked in a sealed handi with aromatic saffron and caramelized shallots.",
    isVeg: false,
    isChefPick: true,
    price: null,
    isSample: false, // Verified known specialty
    image: "/placeholders/dish-biryani.svg",
  },
  {
    id: "sig-3",
    name: "Tandoori Malai Tikka Starters",
    category: "Starters",
    description:
      "Char-grilled cottage cheese and spiced skewers steeped in cardamom, hung curd, and roasted cumin.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: false, // Verified known specialty
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "sig-4",
    name: "Shahi Gulab Jamun with Rabri",
    category: "Desserts",
    description:
      "Warm golden khoya dumplings soaked in fragrant rose syrup, rested on a bed of chilled slow-simmered rabri.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: false, // Verified known specialty
    image: "/placeholders/dish-dessert.svg",
  },
];

export const fullMenu: MenuItem[] = [
  ...signatureDishes,
  // Starters
  {
    id: "st-1",
    name: "Dahi Ke Kebab",
    category: "Starters",
    description: "Crisp crust patties filled with spiced hung curd, fresh coriander, and roasted gram flour.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "st-2",
    name: "Bhatti Da Murg Tikka",
    category: "Starters",
    description: "Smoky boneless chicken thigh cuts marinated in robust crushed spices, mustard oil, and Kashmiri chili.",
    isVeg: false,
    price: null,
    isSample: true,
    image: "/placeholders/dish-murg-tikka.svg",
  },
  {
    id: "st-3",
    name: "Crispy Corn & Water Chestnut",
    category: "Starters",
    description: "Golden wok-tossed sweet corn kernels with crunchy water chestnuts, scallions, and black pepper.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "st-4",
    name: "Galawati Kebab Platter",
    category: "Starters",
    description: "Lucknow's celebrated melt-in-mouth smoked mince kebabs infused with royal potli masala.",
    isVeg: false,
    isChefPick: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },

  // Live Counters
  {
    id: "lc-1",
    name: "Live Chaat & Golgappa Station",
    category: "Live Counters",
    description: "Freshly assembled crisp puris filled with spiced potatoes, sprouts, and customized flavored mint waters.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: true,
    image: "/placeholders/buffet-counter.svg",
  },
  {
    id: "lc-2",
    name: "Artisan Live Pasta Counter",
    category: "Live Counters",
    description: "Handcrafted penne or fusilli tossed to order in Arrabiata, Alfredo, or creamy pesto with garden vegetables.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/buffet-counter.svg",
  },
  {
    id: "lc-3",
    name: "Mongolian Wok Live Stir-Fry",
    category: "Live Counters",
    description: "Choice of fresh greens, noodles, and marinades scorched on a blazing teppanyaki flat top.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/buffet-counter.svg",
  },
  {
    id: "lc-4",
    name: "Live Hot Jalebi & Imarti Hearth",
    category: "Live Counters",
    description: "Spiral sweet jalebis fried crisp in pure ghee and ladled straight from the pan with saffron syrup.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-dessert.svg",
  },

  // Main Course
  {
    id: "mc-1",
    name: "Paneer Lababdar",
    category: "Main Course",
    description: "Soft cottage cheese batons tossed in a rich, chunky onion-tomato gravy finished with shredded paneer.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "mc-2",
    name: "Dal Makhani 'The Centurion'",
    category: "Main Course",
    description: "Overnight slow-simmered black urad lentils infused with white butter, fresh cream, and smoky charcoal mist.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "mc-3",
    name: "Mutton Rogan Josh",
    category: "Main Course",
    description: "Tender goat meat braised in a fragrant Kashmiri gravy colored naturally with Ratan Jot bark.",
    isVeg: false,
    price: null,
    isSample: true,
    image: "/placeholders/dish-murg-tikka.svg",
  },

  // Biryani and Rice
  {
    id: "br-1",
    name: "Subz Tarkari Biryani",
    category: "Biryani and Rice",
    description: "Seasonal garden vegetables and saffron-steeped basmati rice dum-cooked with whole spices.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-biryani.svg",
  },
  {
    id: "br-2",
    name: "Jeera Pulao",
    category: "Biryani and Rice",
    description: "Aromatic aged basmati rice tempered in tempered clarified butter and toasted royal cumin seeds.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-biryani.svg",
  },

  // Breads
  {
    id: "bd-1",
    name: "Tandoori Garlic Naan",
    category: "Breads",
    description: "Clay oven leavened bread brushed generously with garlic butter and fresh coriander leaves.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "bd-2",
    name: "Sheermal",
    category: "Breads",
    description: "Traditional Awadhi saffron-flavored sweet flatbread baked in a tandoor.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },

  // Indo-Chinese
  {
    id: "ic-1",
    name: "Chili Garlic Hakka Noodles",
    category: "Indo-Chinese",
    description: "Wok-tossed thin noodles with julienned bell peppers, cabbage, burnt garlic, and spicy red chili oil.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "ic-2",
    name: "Manchurian Gravy",
    category: "Indo-Chinese",
    description: "Crisp vegetable dumplings simmered in a dark soy, ginger, coriander, and scallion sauce.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },

  // Italian
  {
    id: "it-1",
    name: "Wood-Fired Style Margherita",
    category: "Italian",
    description: "Thin crust pie topped with San Marzano tomato sauce, fresh mozzarella medallions, and sweet basil.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },
  {
    id: "it-2",
    name: "Wild Mushroom Risotto",
    category: "Italian",
    description: "Creamy Arborio rice folded with sautéed porcini and button mushrooms, parmesan, and white truffle oil.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-starters.svg",
  },

  // Desserts
  {
    id: "ds-1",
    name: "Kesari Rasmalai",
    category: "Desserts",
    description: "Poached cottage cheese discs immersed in thick saffron-pistachio infused clotted milk.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-dessert.svg",
  },
  {
    id: "ds-2",
    name: "Warm Chocolate Walnut Brownie",
    category: "Desserts",
    description: "Rich fudge dark chocolate brownie served with a scoop of Madagascar vanilla bean gelato.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-dessert.svg",
  },

  // Mocktails
  {
    id: "mk-1",
    name: "Nawabi Khas Khas Sparkler",
    category: "Mocktails",
    description: "Chilled khus extract layered with sparkling soda, lime juice, and basil seeds.",
    isVeg: true,
    isChefPick: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-mocktail.svg",
  },
  {
    id: "mk-2",
    name: "Smoked Jamun Fizz",
    category: "Mocktails",
    description: "Fresh black plum pulp muddled with black salt, cumin, and aerated lemon tonic.",
    isVeg: true,
    price: null,
    isSample: true,
    image: "/placeholders/dish-mocktail.svg",
  },
];

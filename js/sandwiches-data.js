(function () {
  'use strict';

  /**
   * Real Harvey's Canada (harveys.ca) chicken sandwich menu, sides, drinks,
   * and official Garnish Counter toppings.
   * Exposed as a plain global so opening index.html over file:// works cleanly.
   */
  window.HARVEYS_DATE_MENU = {
    sandwiches: [
      {
        id: 'crispy-chicken',
        name: 'Crispy Chicken Sandwich',
        tagline: "100% Canadian crispy seasoned chicken breast",
        description:
          "Crispy seasoned chicken breast and your choice of toppings on a toasted golden bun. (530 Cals — try adding crispy bacon & Harv sauce!)",
        mealPriceNote: '$8.19 solo · ~$15.79 CAD combo',
        spiceLevel: 'Mild & Savory',
        badge: "HARVEY'S CLASSIC",
        imageUrl: 'assets/sandwiches/crispy-chicken.jpg',
        sourceImageUrl:
          'https://cdn.harveys.ca/static_images/harveys2x/1024x768/3031006.jpg?impolicy=imgopt&imwidth=720',
        fallbackQueryUrl:
          "https://www.google.com/search?tbm=isch&q=Harvey%27s+Canada+Crispy+Chicken+Sandwich",
        sourceLabel: "Harvey's Canada (harveys.ca)",
        officialUrl:
          'https://www.harveys.ca/en/menu/pickup/i96964/crispy-chicken-sandwich.html'
      },
      {
        id: 'buffalo-chicken',
        name: 'Buffalo Chicken Sandwich',
        tagline: "Tossed in Harvey's signature spicy buffalo sauce",
        description:
          "Crispy seasoned chicken breast tossed in Harvey's signature buffalo sauce and your choice of fresh Garnish Counter toppings on a toasted golden bun. (630 Cals)",
        mealPriceNote: '$8.49 solo · ~$16.59 CAD combo',
        spiceLevel: 'Spicy Buffalo',
        badge: 'FAN FAVOURITE',
        imageUrl: 'assets/sandwiches/buffalo-chicken.jpg',
        sourceImageUrl:
          'https://cdn.harveys.ca/static_images/harveys2x/1024x768/3031007.jpg?impolicy=imgopt&imwidth=720',
        fallbackQueryUrl:
          "https://www.google.com/search?tbm=isch&q=Harvey%27s+Canada+Buffalo+Chicken+Sandwich",
        sourceLabel: "Harvey's Canada (harveys.ca)",
        officialUrl:
          'https://www.harveys.ca/en/menu/pickup/i96967/buffalo-chicken-sandwich.html'
      },
      {
        id: 'hot-honey-crispy',
        name: 'Hot Honey Crispy Chicken',
        tagline: 'Sweet heat glaze over crunchy ruffled breading',
        description:
          "Crispy seasoned chicken breast tossed in Harvey's Hot Honey sauce and your choice of toppings on a toasted golden bun.",
        mealPriceNote: '$8.49 solo · ~$16.59 CAD combo',
        spiceLevel: 'Sweet & Spicy',
        badge: 'SWEET HEAT HIT',
        imageUrl: 'assets/sandwiches/hot-honey-crispy.jpg',
        sourceImageUrl:
          'https://cdn.harveys.ca/static_images/harveys2x/1024x768/3031266.jpg?impolicy=imgopt&imwidth=720',
        fallbackQueryUrl:
          "https://www.google.com/search?tbm=isch&q=Harvey%27s+Canada+Hot+Honey+Crispy+Chicken",
        sourceLabel: "Harvey's Canada (harveys.ca)",
        officialUrl:
          'https://www.harveys.ca/en/menu/pickup/i129827/hot-honey-crispy-chicken.html'
      },
      {
        id: 'grilled-chicken',
        name: 'Grilled Chicken Sandwich',
        tagline: 'Flame-grilled whole white meat chicken breast',
        description:
          'Flame-grilled seasoned 100% Canadian chicken breast and your choice of toppings on a toasted golden bun. (290 Cals)',
        mealPriceNote: '$8.19 solo · ~$15.79 CAD combo',
        spiceLevel: 'Mild Herb Grill',
        badge: 'FLAME-GRILLED',
        imageUrl: 'assets/sandwiches/grilled-chicken.jpg',
        sourceImageUrl:
          'https://cdn.harveys.ca/static_images/harveys2x/1024x768/3031005.jpg?impolicy=imgopt&imwidth=720',
        fallbackQueryUrl:
          "https://www.google.com/search?tbm=isch&q=Harvey%27s+Canada+Grilled+Chicken+Sandwich",
        sourceLabel: "Harvey's Canada (harveys.ca)",
        officialUrl:
          'https://www.harveys.ca/en/menu/pickup/i96961/grilled-chicken-sandwich.html'
      },
      {
        id: 'jr-buffalo',
        name: 'Jr. Buffalo',
        tagline: "Harv's Value Pick — Crispy Buffalo Chicken",
        description:
          "Crispy coated chicken patty tossed in Harvey's signature buffalo sauce and your choice of toppings on a toasted white bun. (310 Cals)",
        mealPriceNote: '$3.69 solo · Value Pick',
        spiceLevel: 'Spicy Buffalo',
        badge: 'VALUE PICK',
        imageUrl: 'assets/sandwiches/jr-buffalo.jpg',
        sourceImageUrl:
          'https://cdn.harveys.ca/static_images/harveys2x/1024x768/3031094.jpg?impolicy=imgopt&imwidth=720',
        fallbackQueryUrl:
          "https://www.google.com/search?tbm=isch&q=Harvey%27s+Canada+Jr+Buffalo+Chicken",
        sourceLabel: "Harvey's Canada (harveys.ca)",
        officialUrl:
          'https://www.harveys.ca/en/menu/pickup/i121163/jr-buffalo.html'
      },
      {
        id: 'jr-hot-honey',
        name: 'Jr. Hot Honey Chicken',
        tagline: "Harv's Value Pick — Sweet & Spicy Crispy Patty",
        description:
          "Junior crispy chicken patty tossed in Harvey's Hot Honey sauce and your choice of toppings on a toasted white bun.",
        mealPriceNote: '$3.69 solo · Value Pick',
        spiceLevel: 'Sweet & Spicy',
        badge: 'SNACK PICK',
        imageUrl: 'assets/sandwiches/jr-hot-honey.jpg',
        sourceImageUrl:
          'https://cdn.harveys.ca/static_images/harveys2x/1024x768/3031273.jpg?impolicy=imgopt&imwidth=720',
        fallbackQueryUrl:
          "https://www.google.com/search?tbm=isch&q=Harvey%27s+Canada+Jr+Hot+Honey+Chicken",
        sourceLabel: "Harvey's Canada (harveys.ca)",
        officialUrl:
          'https://www.harveys.ca/en/menu/pickup/i129834/jr-hot-honey-chicken.html'
      }
    ],

    sides: [
      {
        id: 'frings',
        name: 'Frings® (Fries + Onion Rings)',
        emoji: '🍟',
        note: 'Half Fries & Rings · 620 Cals'
      },
      {
        id: 'regular-fries',
        name: 'Original Canadian Fries (Regular)',
        emoji: '🥔',
        note: 'Skin-On Combo Side · 430 Cals'
      },
      {
        id: 'onion-rings',
        name: 'Golden Onion Rings (Regular)',
        emoji: '🧅',
        note: 'Real Onions · 300 Cals'
      },
      {
        id: 'classic-poutine',
        name: 'Classic Poutine (Regular)',
        emoji: '🧀',
        note: 'Curds & Veg Gravy · 700 Cals'
      },
      {
        id: 'deep-fried-pickles',
        name: 'Deep Fried Pickles (4 pc)',
        emoji: '🥒',
        note: 'With Creamy Ranch · 250 Cals'
      },
      {
        id: 'buffalo-chicken-poutine',
        name: 'Buffalo Chicken Poutine (Regular)',
        emoji: '🍗',
        note: 'Chicken & Buffalo · 850 Cals'
      }
    ],

    drinks: [
      {
        id: 'pepsi',
        name: 'Pepsi (20 oz)',
        emoji: '🥤',
        note: 'Combo Fountain Pop'
      },
      {
        id: 'mug-root-beer',
        name: 'Mug Root Beer (20 oz)',
        emoji: '🍺',
        note: 'Fountain Classic'
      },
      {
        id: 'dr-pepper',
        name: 'Dr Pepper (20 oz)',
        emoji: '🥤',
        note: 'Fountain Pop'
      },
      {
        id: '7-up',
        name: '7Up (20 oz)',
        emoji: '🍋',
        note: 'Crisp Lemon-Lime'
      },
      {
        id: 'brisk-iced-tea',
        name: 'Brisk Iced Tea (20 oz)',
        emoji: '🧊',
        note: 'Combo Drink'
      },
      {
        id: 'pepsi-zero',
        name: 'Pepsi Zero Sugar (20 oz)',
        emoji: '🥤',
        note: 'Zero Sugar Pop'
      },
      {
        id: 'chocolate-shake',
        name: 'Hand-Spun Chocolate Shake',
        emoji: '🍫',
        note: '100% Canadian Dairy'
      },
      {
        id: 'frozen-crush-cream-soda',
        name: 'Frozen Crush® Cream Soda',
        emoji: '🍧',
        note: 'Slushie · 200-260 Cals'
      }
    ],

    toppings: [
      { id: 'lettuce', name: 'Lettuce', emoji: '🥬', note: '' },
      { id: 'tomatoes', name: 'Tomatoes', emoji: '🍅', note: '' },
      { id: 'pickles', name: 'Pickles', emoji: '🥒', note: '' },
      { id: 'onions', name: 'Onions', emoji: '🧅', note: '' },
      { id: 'harv-sauce', name: 'Harv Sauce', emoji: '🧡', note: '' },
      { id: 'light-mayo', name: 'Light Mayo', emoji: '🥪', note: '' },
      { id: 'hot-peppers', name: 'Hot Peppers', emoji: '🌶️', note: '' },
      { id: 'jalapenos', name: 'Jalapeños', emoji: '🫑', note: '' },
      { id: 'cucumber', name: 'Cucumber', emoji: '🥒', note: '' },
      { id: 'black-olives', name: 'Black Olives', emoji: '🫒', note: '' },
      { id: 'relish', name: 'Relish', emoji: '💚', note: '' },
      { id: 'chipotle', name: 'Chipotle Sauce', emoji: '🔥', note: '' },
      { id: 'ranch', name: 'Ranch', emoji: '🥣', note: '' },
      { id: 'buffalo', name: 'Buffalo Sauce', emoji: '🍗', note: '' },
      { id: 'bbq', name: 'BBQ Sauce', emoji: '🍖', note: '' },
      { id: 'roasted-garlic', name: 'Roasted Garlic Sauce', emoji: '🧄', note: '' },
      { id: 'ghost-pepper', name: 'Ghost Pepper Sauce', emoji: '👻', note: 'Extra Hot!' },
      { id: 'bacon', name: 'Crispy Bacon', emoji: '🥓', note: 'Premium Add-On' },
      { id: 'cheddar-cheese', name: 'Cheddar-Style Cheese', emoji: '🧀', note: 'Premium Add-On' },
      { id: 'onion-rings-top', name: 'Onion Rings on Top', emoji: '⭕', note: 'Premium Add-On' }
    ]
  };
})();

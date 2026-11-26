(function () {
  'use strict';

  /**
   * Verified YouTube recommendations across Travel, Food, Business, Games, and Tech,
   * plus Steam-verified horror, co-op under $5 USD, and cozy/date game picks.
   * Exposed as a plain global so file:// and GitHub Pages work with zero CORS errors.
   */
  window.HARVEYS_RECOMMENDATIONS = {
    youtubeLinks: [
      /* ---------- Travel ---------- */
      {
        id: 'yt-travel-1',
        title: 'We Raced The Entire Length Of Japan - Finale',
        channel: 'Jet Lag: The Game',
        category: 'Travel',
        url: 'https://www.youtube.com/watch?v=gy662sV58fY',
        vibe: 'High-stakes bullet-train strategy race across Japan'
      },
      {
        id: 'yt-travel-2',
        title: "Britain: True Adventure is Right On Your Doorstep (Here's Proof)",
        channel: 'GeoWizard',
        category: 'Travel',
        url: 'https://www.youtube.com/watch?v=O-eKUbQbyNw',
        vibe: 'Spontaneous backroads micro-adventure & British countryside charm'
      },
      {
        id: 'yt-travel-3',
        title: 'I chased the ECLIPSE across Iceland',
        channel: 'DownieLive',
        category: 'Travel',
        url: 'https://www.youtube.com/watch?v=yOjurZueFio',
        vibe: 'Cinematic volcanic road trip chasing totality in Iceland'
      },

      /* ---------- Food ---------- */
      {
        id: 'yt-food-1',
        title: 'I Tried Every Country’s Rarest Food',
        channel: 'Joshua Weissman',
        category: 'Food',
        url: 'https://www.youtube.com/watch?v=7kYAD8-yKPw',
        vibe: 'Wild global delicacies taste-tested with crisp studio food shots'
      },
      {
        id: 'yt-food-2',
        title: '5 Identical Dishes, But 1 is Sabotaged',
        channel: 'Sorted Food',
        category: 'Food',
        url: 'https://www.youtube.com/watch?v=oHqrp3GKiIk',
        vibe: 'Hilarious blind taste-test guessing game among British chefs'
      },
      {
        id: 'yt-food-3',
        title: 'Michelle Yeoh Gets Physical While Eating Spicy Wings | Hot Ones',
        channel: 'First We Feast',
        category: 'Food',
        url: 'https://www.youtube.com/watch?v=kNfy6S10Tfw',
        vibe: 'Iconic spicy wing gauntlet interview while eating chicken'
      },

      /* ---------- Business ---------- */
      {
        id: 'yt-biz-1',
        title: 'The Airport Lounge Race',
        channel: 'Wendover Productions',
        category: 'Business',
        url: 'https://www.youtube.com/watch?v=HDfFSvCD8j0',
        vibe: 'Fascinating airline credit-card economics & airport lounge arms race'
      },
      {
        id: 'yt-biz-2',
        title: 'Why Buffets Suddenly Disappeared',
        channel: 'Modern MBA',
        category: 'Business',
        url: 'https://www.youtube.com/watch?v=PU1zr8ka-0s',
        vibe: 'Deep dive into restaurant margins, real estate & all-you-can-eat economics'
      },
      {
        id: 'yt-biz-3',
        title: 'Something Strange is Going on With NVIDIA',
        channel: 'ColdFusion',
        category: 'Business',
        url: 'https://www.youtube.com/watch?v=UWvObtGg6Rk',
        vibe: 'Sleek documentary breakdown of AI chip giant strategy & valuation'
      },

      /* ---------- Games ---------- */
      {
        id: 'yt-games-1',
        title: "WARNING: SCARIEST GAME IN YEARS | Five Nights at Freddy's - Part 1",
        channel: 'Markiplier',
        category: 'Games',
        url: 'https://www.youtube.com/watch?v=iOztnsBPrAA',
        vibe: 'Legendary FNAF 1 jumpscare reactions before Maddie takes the controls'
      },
      {
        id: 'yt-games-2',
        title: 'DAMN NATURE YOU SCARY! | Subnautica #1',
        channel: 'jacksepticeye',
        category: 'Games',
        url: 'https://www.youtube.com/watch?v=diS8RCYwSC8',
        vibe: 'Iconic Subnautica full-release ocean dive & creature hype'
      },
      {
        id: 'yt-games-3',
        title: "The Story Of Mario Maker's Impossible Levels",
        channel: 'Summoning Salt',
        category: 'Games',
        url: 'https://www.youtube.com/watch?v=arWClcUVxm8',
        vibe: 'Gripping synthwave speedrun documentary you cannot pause'
      },

      /* ---------- Tech ---------- */
      {
        id: 'yt-tech-1',
        title: 'Robot golf vs holes that keep getting harder',
        channel: 'Stuff Made Here',
        category: 'Tech',
        url: 'https://www.youtube.com/watch?v=2OfjZ3ORJfc',
        vibe: 'Over-engineered motorized golf club build with chaotic engineering wins'
      },
      {
        id: 'yt-tech-2',
        title: "I finally saw quantum physics with my own eyes... (It's spookier than I expected)",
        channel: 'Veritasium',
        category: 'Tech',
        url: 'https://www.youtube.com/watch?v=KfODG5REyss',
        vibe: 'Mind-bending real-world physics visualization & spooky science'
      },
      {
        id: 'yt-tech-3',
        title: 'Neuralink’s Newest Brain Chip Isn’t What You Think',
        channel: 'Cleo Abram',
        category: 'Tech',
        url: 'https://www.youtube.com/watch?v=Vna0hkq7U1g',
        vibe: 'Clear, upbeat explainer on brain-computer interfaces & future tech'
      }
    ],

    gamesList: [
      /* ---------- Horror ---------- */
      {
        id: 'fnaf-1',
        title: "Five Nights at Freddy's",
        genre: 'Horror',
        isCoop: false,
        priceLabel: '$4.99',
        underFive: true,
        url: 'https://store.steampowered.com/app/319510/Five_Nights_at_Freddys/',
        note: "Maddie's classic night-shift terror — guard the doors & watch Bonnie!"
      },
      {
        id: 'fnaf-sl',
        title: "Five Nights at Freddy's: Sister Location",
        genre: 'Horror',
        isCoop: false,
        priceLabel: '$7.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/506610/Five_Nights_at_Freddys_Sister_Location/',
        note: "Circus Baby's underground bunker — tense vents & iconic FNAF lore."
      },
      {
        id: 'fnaf-sb',
        title: "Five Nights at Freddy's: Security Breach",
        genre: 'Horror',
        isCoop: false,
        priceLabel: '$39.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/747660/Five_Nights_at_Freddys_Security_Breach/',
        note: "Free-roam Freddy Fazbear's Mega Pizzaplex survival with Glamrock Freddy."
      },
      {
        id: 'phasmo',
        title: 'Phasmophobia',
        genre: 'Horror',
        isCoop: true,
        priceLabel: '$19.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/739630/Phasmophobia/',
        note: 'Co-op paranormal ghost-hunting — spirit boxes, EMF & proximity screams.'
      },
      {
        id: 'lethal-company',
        title: 'Lethal Company',
        genre: 'Horror',
        isCoop: true,
        priceLabel: '$9.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/1966720/Lethal_Company/',
        note: 'Hilarious co-op scrap runs on haunted moons with proximity mic chaos.'
      },

      /* ---------- Co-Op < $5 USD (Verified Regular Steam Prices) ---------- */
      {
        id: 'we-were-here',
        title: 'We Were Here',
        genre: 'Co-Op < $5',
        isCoop: true,
        priceLabel: 'Free',
        underFive: true,
        url: 'https://store.steampowered.com/app/582500/We_Were_Here/',
        note: 'Free 2-player online co-op castle escape puzzle over walkie-talkies!'
      },
      {
        id: 'pico-park',
        title: 'PICO PARK',
        genre: 'Co-Op < $5',
        isCoop: true,
        priceLabel: '$4.99',
        underFive: true,
        url: 'https://store.steampowered.com/app/1509960/PICO_PARK/',
        note: 'Adorable $4.99 online/couch co-op puzzle chaos — pure teamwork test!'
      },
      {
        id: 'pacify',
        title: 'Pacify',
        genre: 'Co-Op < $5',
        isCoop: true,
        priceLabel: '$4.99',
        underFive: true,
        url: 'https://store.steampowered.com/app/967050/Pacify/',
        note: '$4.99 co-op haunted-house horror — calm the ghost before she sprints!'
      },
      {
        id: 'cry-of-fear',
        title: 'Cry of Fear',
        genre: 'Co-Op < $5',
        isCoop: true,
        priceLabel: 'Free',
        underFive: true,
        url: 'https://store.steampowered.com/app/223710/Cry_of_Fear/',
        note: 'Free cult-classic survival horror featuring a full online co-op campaign.'
      },
      {
        id: 'vampire-survivors',
        title: 'Vampire Survivors',
        genre: 'Co-Op < $5',
        isCoop: true,
        priceLabel: '$4.99',
        underFive: true,
        url: 'https://store.steampowered.com/app/1794680/Vampire_Survivors/',
        note: '$4.99 online & couch co-op bullet-heaven madness — instant dopamine.'
      },

      /* ---------- Other Picks ---------- */
      {
        id: 'subnautica',
        title: 'Subnautica',
        genre: 'Other Pick',
        isCoop: false,
        priceLabel: '$29.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/264710/Subnautica/',
        note: 'Tonight’s ocean main event — check those Subnautica alarms!!'
      },
      {
        id: 'portal-2',
        title: 'Portal 2',
        genre: 'Other Pick',
        isCoop: true,
        priceLabel: '$9.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/620/Portal_2/',
        note: 'All-time greatest 2-player co-op puzzle campaign with GLaDOS.'
      },
      {
        id: 'buckshot-roulette',
        title: 'Buckshot Roulette',
        genre: 'Other Pick',
        isCoop: false,
        priceLabel: '$2.99',
        underFive: true,
        url: 'https://store.steampowered.com/app/2835570/Buckshot_Roulette/',
        note: '$2.99 horror-tabletop thriller with 2–4 player online multiplayer.'
      },
      {
        id: 'stardew-valley',
        title: 'Stardew Valley',
        genre: 'Other Pick',
        isCoop: true,
        priceLabel: '$14.99',
        underFive: false,
        url: 'https://store.steampowered.com/app/413150/Stardew_Valley/',
        note: 'Cozy co-op date farm for cooling down after FNAF jumpscares.'
      }
    ]
  };
})();

const skills: Record<number, string[]> = {
  0: ["Not too bad! that's not that much time have spent scrolling on your phone."],
  1000: [
    "You could have learned to juggle three balls without chasing them across the room.",
    "That's enough time to bake your first crusty sourdough loaves from a starter.",
    "With that time, you could've picked up the basic chords to strum a few ukulele songs.",
  ],
  2000: [
    "You could have learned to roll tidy sushi that actually holds together.",
    "That's enough time to draw simple portraits that resemble your friends.",
    "With that time, you could've nailed comfortable freestyle breathing for steady laps.",
  ],
  3000: [
    "You could have learned to hem pants and do simple clothing repairs with a sewing machine.",
    "That's enough time to build a 5 to 7 trick card routine that stuns at parties.",
    "With that time, you could've gotten your Rubik's Cube solves under 90 seconds.",
  ],
  4000: [
    "You could have learned to center clay and throw basic bowls on the pottery wheel.",
    "That's enough time to make fresh pasta from scratch any night you want.",
    "With that time, you could've memorized hiragana and katakana and handled basic Japanese greetings.",
  ],
  5000: [
    "You could have learned to cruise on a skateboard, carve smooth turns, and do reliable kickturns.",
    "That's enough time to play 12 bar blues riffs on harmonica with a tasty bend or two.",
    "With that time, you could've dialed in pour over coffee that beats the café.",
  ],
  6000: [
    "You could have learned watercolor washes, glazing, and painted a few calm landscapes.",
    "That's enough time to tune up a bike, fix flats, and adjust brakes and gears.",
    "With that time, you could've memorized every country and capital without sweating it.",
  ],
  7000: [
    "You could have learned enough salsa to feel relaxed and playful on a social dance floor.",
    "That's enough time to grow a sunny windowsill garden of herbs and salad greens.",
    "With that time, you could've sharpened your knife skills and chopped dinner like a pro.",
  ],
  8000: [
    "You could have learned to knit hats and scarves that fit and look great.",
    "That's enough time to lay down steady drum grooves with a metronome.",
    "With that time, you could've gotten comfortable with basic rock climbing footwork and safe belaying.",
  ],
  9000: [
    "You could have learned a handful of chess openings and tactics to hold your own at club night.",
    "That's enough time to pipe buttercream flowers and decorate celebration cakes that wow.",
    "With that time, you could've folded intermediate origami models from diagrams with confidence.",
  ],
  10000: [
    "You could have learned to bake flaky croissants from scratch on a reliable weekend schedule.",
    "That's enough time to fingerpick ukulele and keep a 10 song set ready to share.",
    "With that time, you could've added backstroke and breaststroke to your swim with smooth form.",
  ],
  15000: [
    "You could have learned to build a sturdy wooden coffee table with clean joinery.",
    "That's enough time to chat comfortably about daily life in a new language.",
    "With that time, you could've mastered manual camera settings and composed sharp, balanced photos.",
  ],
  20000: [
    "You could have learned to make fresh cheeses like paneer and mozzarella at home.",
    "That's enough time to sew a lined jacket that actually fits.",
    "With that time, you could've found your voice in improv games and felt at ease on stage.",
  ],
  25000: [
    "You could have learned to throw matching bowls and mugs and glaze them consistently.",
    "That's enough time to design a small garden plan, compost well, and harvest seasonal veggies.",
    "With that time, you could've played harmonica solos using multiple positions over blues tunes.",
  ],
  30000: [
    "You could have learned acrylic portrait techniques that capture likeness and expression.",
    "That's enough time to overhaul a bike, deep clean the drivetrain, and true a slightly wobbly wheel.",
    "With that time, you could've built a yoga practice with safe inversions and solid balance.",
  ],
  35000: [
    "You could have learned to bake a bakery level lineup, baguettes, focaccia, and enriched breads.",
    "That's enough time to dance salsa and bachata smoothly in crowded rooms.",
    "With that time, you could've sharpened endgame skills that squeeze wins from equal positions.",
  ],
  40000: [
    "You could have learned to hand cut tidy dovetails and build a small bookshelf.",
    "That's enough time to pour silky espresso shots and pour latte art hearts, tulips, and swans.",
    "With that time, you could've led moderate indoor climbing routes with calm, precise movement.",
  ],
  45000: [
    "You could have learned calligraphy and hand lettering elegant enough for wedding invites.",
    "That's enough time to keep rock solid time on drums in a casual jam group.",
    "With that time, you could've handled home fixes like patching drywall and replacing a faucet.",
  ],
  50000: [
    "You could have learned to read short stories and chat freely in another language.",
    "That's enough time to perform close up magic with misdirection that leaves people grinning.",
    "With that time, you could've sewn tailored pants with crisp seams and a clean waistband.",
  ],
  60000: [
    "You could have learned efficient running form and trained up to an easy 10k.",
    "That's enough time to throw a matching dinnerware set for six with even walls and glaze.",
    "With that time, you could've set up simple portrait lighting and edited flattering, natural photos.",
  ],
  70000: [
    "You could have learned to can tomatoes and pickle cucumbers from your own garden haul.",
    "That's enough time to play intermediate pop songs on piano by ear.",
    "With that time, you could've refined your swimming with smooth flip turns and steady pacing.",
  ],
  80000: [
    "You could have learned to paint a home gallery wall of confident watercolor pieces.",
    "That's enough time to bake pain au chocolat and other viennoiserie that puff just right.",
    "With that time, you could've danced basic ballroom styles for social nights without nerves.",
  ],
  90000: [
    "You could have learned to build a small cabinet with neat doors and sturdy shelves.",
    "That's enough time to discuss news and opinions in another language over coffee.",
    "With that time, you could've folded complex modular origami that grabs attention.",
  ],
  100000: [
    "You could have learned chess planning that carries you through the middlegame with a plan.",
    "That's enough time to create sculptural pottery with smooth joins and thoughtful forms.",
    "With that time, you could've dialed in espresso consistently and tasted the difference.",
  ],
  125000: [
    "You could have learned to tailor a fully lined dress or suit that fits beautifully.",
    "That's enough time to sing and play ukulele together with confident rhythm and dynamics.",
    "With that time, you could've fermented kimchi, kombucha, and crunchy sour pickles safely.",
  ],
  150000: [
    "You could have learned layered oil painting techniques and completed a cohesive series.",
    "That's enough time to replace bike cables and housing and keep shifting buttery smooth.",
    "With that time, you could've written clear essays and messages in another language with nuance.",
  ],
  175000: [
    "You could have learned drum independence for syncopated grooves and smooth fills.",
    "That's enough time to bake artisan sourdough with predictable crumb across the seasons.",
    "With that time, you could've navigated an Argentine tango social floor with calm elegance.",
  ],
  200000: [
    "You could have learned to build a solid hardwood dining table that anchors a room.",
    "That's enough time to feel at home in open water with smooth, efficient strokes.",
    "With that time, you could've built a chess opening repertoire you actually understand.",
  ],
  225000: [
    "You could have learned to shoot and edit a cohesive travel photo series with a clear mood.",
    "That's enough time to throw large pottery forms like tall vases and big serving bowls.",
    "With that time, you could've cultivated a pollinator friendly garden buzzing with life.",
  ],
  250000: [
    "You could have learned piano well enough to play expressive classical pieces for friends.",
    "That's enough time to swap light switches, install dimmers, and do basic home electrical safely.",
    "With that time, you could've mastered copperplate and brush calligraphy for beautiful signage.",
  ],
  300000: [
    "You could have learned to host weekly pastry mornings with croissants, tarts, and brioche.",
    "That's enough time to read novels in another language with only occasional lookups.",
    "With that time, you could've danced swing, salsa, and a bit of tango with relaxed confidence.",
  ],
  350000: [
    "You could have learned to craft an heirloom dresser with drawers that glide smoothly.",
    "That's enough time to sharpen chess calculation and endgames into a true weapon.",
    "With that time, you could've coached your own swim training with smart drills and pacing.",
  ],
  400000: [
    "You could have learned to paint a cohesive body of work with a recognizable style.",
    "That's enough time to joke, tell stories, and play with idioms in another language.",
    "With that time, you could've drummed full sets with tight dynamics and stamina.",
  ],
  450000: [
    "You could have learned to grow a kitchen garden that feeds you most of the year.",
    "That's enough time to sew a winter coat with crisp tailoring and bound buttonholes.",
    "With that time, you could've folded gallery worthy complex origami that turns heads.",
  ],
  500000: [
    "You could have learned to cook confidently across world cuisines, from curries to tamales.",
    "That's enough time to craft a matching dining set, table and chairs that feel solid and elegant.",
    "With that time, you could've played long piano sets from memory with expressive touch.",
  ],
};

const thresholds = Object.keys(skills)
  .map(Number)
  .sort((a, b) => a - b);

const random_seed = Math.floor(Math.random() * 1000);

export function get_skill_you_could_have_learned(minutes: number): string {
  let selected_threshold = thresholds[0];
  for (const threshold of thresholds) {
    if (minutes >= threshold) {
      selected_threshold = threshold;
    } else {
      break;
    }
  }

  const skill_options = skills[selected_threshold];
  const index = random_seed % skill_options.length;
  return skill_options[index];
}

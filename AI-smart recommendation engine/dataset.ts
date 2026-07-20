export interface DatasetItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  genres: string[];
  budget: 'low' | 'medium' | 'high';
  duration: 'short' | 'medium' | 'long';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  difficulty: 'easy' | 'moderate' | 'hard';
  rating: number;
  popularity: number; // 0 to 100
  // Features mapped for simple vector space coordinate representation
  vectorCoords: { x: number; y: number; z: number }; 
  // User ratings for simulated Collaborative Filtering (User ID -> rating 1-5)
  userRatings: { [userId: string]: number };
}

export interface UserPreferences {
  category: string;
  genres: string[];
  interests: string[];
  budget: 'low' | 'medium' | 'high';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  difficulty: 'easy' | 'moderate' | 'hard';
  duration: 'short' | 'medium' | 'long';
  tags: string[];
}

export const CATEGORIES = [
  "Tech & Gadgets",
  "Movies & Entertainment",
  "Books & Literature",
  "Online Courses & Skills",
  "Travel & Adventure"
];

export const GENRES_BY_CATEGORY: { [key: string]: string[] } = {
  "Tech & Gadgets": ["Smart Home", "Wearables", "Audio & Sound", "Computing", "Gaming Hardware", "Photography"],
  "Movies & Entertainment": ["Sci-Fi", "Drama", "Action & Thriller", "Comedy", "Documentary", "Fantasy"],
  "Books & Literature": ["Self-Improvement", "Science Fiction", "Biography", "Business & Finance", "Philosophy", "Mystery"],
  "Online Courses & Skills": ["Programming", "Design & Arts", "Data Science", "Marketing", "Music Production", "Languages"],
  "Travel & Adventure": ["Nature & Hiking", "City Exploration", "Beach & Relax", "Cultural Heritage", "Extreme Sports", "Road Trips"]
};

export const INTEREST_CHIPS = [
  "Creativity", "Efficiency", "Automation", "Minimalism", "Deep Learning",
  "Outdoor Activities", "Storytelling", "Mindfulness", "Problem Solving",
  "Global Culture", "Fitness", "Financial Freedom", "Coding", "Future Tech"
];

export const TAG_CHIPS = [
  "AI", "Cyberpunk", "productivity", "beginner-friendly", "masterclass",
  "scenic", "immersive", "budget-friendly", "fast-paced", "philosophical",
  "interactive", "classic", "sustainable", "premium", "hands-on"
];

export const SIMULATED_USERS = [
  { id: "user_alpha", name: "Alex (Tech Enthusiast)", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80", similarity: 0.92, interests: ["Automation", "Future Tech", "Coding"] },
  { id: "user_beta", name: "Elena (Creative Soul)", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", similarity: 0.85, interests: ["Creativity", "Minimalism", "Design & Arts"] },
  { id: "user_gamma", name: "Marcus (Adventurer)", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", similarity: 0.64, interests: ["Outdoor Activities", "Nature & Hiking", "Extreme Sports"] },
  { id: "user_delta", name: "Sofia (Lifelong Learner)", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", similarity: 0.78, interests: ["Mindfulness", "Problem Solving", "Self-Improvement"] },
  { id: "user_epsilon", name: "Kenji (Sci-Fi Fanatic)", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", similarity: 0.55, interests: ["Future Tech", "Sci-Fi", "Storytelling"] }
];

export const RECOMMENDATION_DATASET: DatasetItem[] = [
  // TECH & GADGETS
  {
    id: "tech_01",
    title: "QuantumFlow VR Headset",
    category: "Tech & Gadgets",
    description: "Next-generation standalone mixed reality headset with holographic optical waveplates and neural gesture recognition.",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80",
    tags: ["AI", "immersive", "premium", "Gaming Hardware", "Future Tech"],
    genres: ["Gaming Hardware", "Computing"],
    budget: "high",
    duration: "long",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.8,
    popularity: 95,
    vectorCoords: { x: 0.85, y: 0.9, z: 0.75 },
    userRatings: { user_alpha: 5, user_beta: 4.5, user_gamma: 3, user_delta: 4, user_epsilon: 5 }
  },
  {
    id: "tech_02",
    title: "AeroSound Pro Earbuds",
    category: "Tech & Gadgets",
    description: "Acoustic active-noise-cancelling earbuds utilizing bio-cellulose drivers and personalized spatial audio matching.",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    tags: ["productivity", "premium", "Audio & Sound", "Minimalism"],
    genres: ["Audio & Sound", "Wearables"],
    budget: "medium",
    duration: "medium",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.6,
    popularity: 88,
    vectorCoords: { x: 0.3, y: 0.6, z: 0.5 },
    userRatings: { user_alpha: 4.5, user_beta: 5, user_gamma: 4, user_delta: 4.5, user_epsilon: 3 }
  },
  {
    id: "tech_03",
    title: "VeloFit Smart Band",
    category: "Tech & Gadgets",
    description: "Ultra-thin titanium health tracker that monitors continuous blood oxygen, circadian rhythm phase, and metabolic biomarkers.",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
    tags: ["Fitness", "Wearables", "Minimalism", "beginner-friendly"],
    genres: ["Wearables", "Smart Home"],
    budget: "medium",
    duration: "short",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.4,
    popularity: 82,
    vectorCoords: { x: 0.2, y: 0.4, z: 0.8 },
    userRatings: { user_alpha: 4, user_beta: 4, user_gamma: 5, user_delta: 5, user_epsilon: 2 }
  },
  {
    id: "tech_04",
    title: "Lumix Grid Smart Ambient Light",
    category: "Tech & Gadgets",
    description: "Modular wall lighting panels that synchronize with your biological clock and project generative pixel-art murals.",
    imageUrl: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=600&q=80",
    tags: ["Smart Home", "Creativity", "interactive", "budget-friendly"],
    genres: ["Smart Home", "Photography"],
    budget: "low",
    duration: "short",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.5,
    popularity: 79,
    vectorCoords: { x: 0.5, y: 0.3, z: 0.3 },
    userRatings: { user_alpha: 4.5, user_beta: 5, user_gamma: 2.5, user_delta: 4, user_epsilon: 4 }
  },
  {
    id: "tech_05",
    title: "Helix Nano Drone",
    category: "Tech & Gadgets",
    description: "Pocket-sized AI-stabilized camera drone with 4K HDR obstacle-evasion and smart tracking for cinematic tracking shots.",
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    tags: ["Photography", "Outdoor Activities", "premium", "immersive"],
    genres: ["Photography", "Gaming Hardware"],
    budget: "high",
    duration: "medium",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.7,
    popularity: 91,
    vectorCoords: { x: 0.75, y: 0.8, z: 0.6 },
    userRatings: { user_alpha: 5, user_beta: 4.5, user_gamma: 4.8, user_delta: 3, user_epsilon: 4.5 }
  },
  {
    id: "tech_06",
    title: "Apex Mechanical Deck",
    category: "Tech & Gadgets",
    description: "Ortholinear split mechanical keyboard with hot-swappable tactile switches, dynamic OLED info display and carbon plate.",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    tags: ["Computing", "productivity", "premium", "Automation"],
    genres: ["Computing", "Gaming Hardware"],
    budget: "high",
    duration: "long",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.9,
    popularity: 87,
    vectorCoords: { x: 0.9, y: 0.7, z: 0.4 },
    userRatings: { user_alpha: 5, user_beta: 4, user_gamma: 3, user_delta: 3.5, user_epsilon: 5 }
  },

  // MOVIES & ENTERTAINMENT
  {
    id: "movie_01",
    title: "Chronicles of Singularity",
    category: "Movies & Entertainment",
    description: "An epic cerebral sci-fi masterpiece exploring humanity's merge with global hyper-intelligence in a gorgeous neon cyber-metropolis.",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    tags: ["Cyberpunk", "Sci-Fi", "immersive", "philosophical", "Future Tech"],
    genres: ["Sci-Fi", "Fantasy"],
    budget: "low",
    duration: "medium",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.9,
    popularity: 98,
    vectorCoords: { x: 0.95, y: 0.85, z: 0.9 },
    userRatings: { user_alpha: 5, user_beta: 4.5, user_gamma: 2.5, user_delta: 4, user_epsilon: 5 }
  },
  {
    id: "movie_02",
    title: "The Silent Forest",
    category: "Movies & Entertainment",
    description: "A visually stunning drama and thriller charting an acoustic scientist's retreat into northern primeval woods to record ancient echoes.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    tags: ["Nature & Hiking", "Mindfulness", "Drama", "scenic"],
    genres: ["Drama", "Action & Thriller"],
    budget: "low",
    duration: "medium",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.4,
    popularity: 76,
    vectorCoords: { x: 0.2, y: 0.5, z: 0.85 },
    userRatings: { user_alpha: 3, user_beta: 4.8, user_gamma: 5, user_delta: 5, user_epsilon: 3.5 }
  },
  {
    id: "movie_03",
    title: "Codebreaker Protocol",
    category: "Movies & Entertainment",
    description: "A fast-paced geopolitical espionage thriller about a rogue cryptographer solving an encrypted ledger that predicts future global events.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    tags: ["Action & Thriller", "Problem Solving", "fast-paced", "Coding"],
    genres: ["Action & Thriller", "Sci-Fi"],
    budget: "medium",
    duration: "medium",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.6,
    popularity: 89,
    vectorCoords: { x: 0.8, y: 0.7, z: 0.4 },
    userRatings: { user_alpha: 5, user_beta: 3.5, user_gamma: 4, user_delta: 4, user_epsilon: 4.5 }
  },
  {
    id: "movie_04",
    title: "Artificial Humour",
    category: "Movies & Entertainment",
    description: "A witty, lighthearted comedy where a standup comic has to train an emotionally clueless android helper how to do punchlines.",
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80",
    tags: ["Comedy", "AI", "Storytelling", "beginner-friendly"],
    genres: ["Comedy", "Sci-Fi"],
    budget: "low",
    duration: "short",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.2,
    popularity: 83,
    vectorCoords: { x: 0.6, y: 0.4, z: 0.2 },
    userRatings: { user_alpha: 4, user_beta: 4.5, user_gamma: 3, user_delta: 4, user_epsilon: 4 }
  },
  {
    id: "movie_05",
    title: "Echoes of the Silk Road",
    category: "Movies & Entertainment",
    description: "An awe-inspiring documentary charting ancient desert trading trails using high-definition archaeological thermal maps and oral folklore.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    tags: ["Documentary", "Cultural Heritage", "scenic", "Global Culture"],
    genres: ["Documentary", "Fantasy"],
    budget: "low",
    duration: "long",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.7,
    popularity: 81,
    vectorCoords: { x: 0.3, y: 0.8, z: 0.9 },
    userRatings: { user_alpha: 3.5, user_beta: 4.8, user_gamma: 4.5, user_delta: 5, user_epsilon: 4 }
  },
  {
    id: "movie_06",
    title: "Neo-Odyssey: Beyond Horizon",
    category: "Movies & Entertainment",
    description: "Visually arresting fantasy saga showing sub-oceanic cities constructed via biological nanotechnology and deep-sea light communication.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    tags: ["Fantasy", "Sci-Fi", "immersive", "Future Tech"],
    genres: ["Fantasy", "Sci-Fi"],
    budget: "medium",
    duration: "long",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.8,
    popularity: 92,
    vectorCoords: { x: 0.85, y: 0.9, z: 0.7 },
    userRatings: { user_alpha: 4.8, user_beta: 5, user_gamma: 3.5, user_delta: 4, user_epsilon: 5 }
  },

  // BOOKS & LITERATURE
  {
    id: "book_01",
    title: "Atomic Habits for Coders",
    category: "Books & Literature",
    description: "A specific deep-dive detailing psychological compound loops to scale analytical learning, build side-projects, and secure deep focus.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    tags: ["Self-Improvement", "productivity", "beginner-friendly", "Efficiency"],
    genres: ["Self-Improvement", "Business & Finance"],
    budget: "low",
    duration: "medium",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.8,
    popularity: 96,
    vectorCoords: { x: 0.4, y: 0.3, z: 0.4 },
    userRatings: { user_alpha: 5, user_beta: 4.5, user_gamma: 3.8, user_delta: 5, user_epsilon: 3 }
  },
  {
    id: "book_02",
    title: "Algorithms of the Cosmos",
    category: "Books & Literature",
    description: "Cerebral philosophy exploring how physical forces match algorithmic state transitions, written in highly poetic narrative prose.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    tags: ["Science Fiction", "philosophical", "Future Tech", "Problem Solving"],
    genres: ["Science Fiction", "Philosophy"],
    budget: "low",
    duration: "long",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.9,
    popularity: 90,
    vectorCoords: { x: 0.95, y: 0.95, z: 0.8 },
    userRatings: { user_alpha: 5, user_beta: 4.2, user_gamma: 2.5, user_delta: 4.8, user_epsilon: 5 }
  },
  {
    id: "book_03",
    title: "The Decentralized Empire",
    category: "Books & Literature",
    description: "A fast-paced business and biography narrative analyzing historical power shifts towards fully automated systems and modern network states.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    tags: ["Business & Finance", "Automation", "Efficiency", "premium"],
    genres: ["Business & Finance", "Biography"],
    budget: "low",
    duration: "medium",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.5,
    popularity: 85,
    vectorCoords: { x: 0.7, y: 0.6, z: 0.3 },
    userRatings: { user_alpha: 4.8, user_beta: 4, user_gamma: 3.5, user_delta: 4.5, user_epsilon: 4.2 }
  },
  {
    id: "book_04",
    title: "Minimalist Code Architect",
    category: "Books & Literature",
    description: "A technical manifesto advocating for clean, pure, hyper-minimalist computer architectures that maximize performance and maintainability.",
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    tags: ["Self-Improvement", "Coding", "Minimalism", "productivity"],
    genres: ["Self-Improvement", "Philosophy"],
    budget: "low",
    duration: "short",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.7,
    popularity: 82,
    vectorCoords: { x: 0.8, y: 0.4, z: 0.3 },
    userRatings: { user_alpha: 5, user_beta: 4, user_gamma: 2, user_delta: 4.5, user_epsilon: 4.5 }
  },
  {
    id: "book_05",
    title: "The Cryptic Cipher",
    category: "Books & Literature",
    description: "An elegant mystery novel set in medieval Prague, tracing a monk who hides a complex mechanical cryptograph in a massive illuminated manuscript.",
    imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    tags: ["Mystery", "Storytelling", "immersive", "classic"],
    genres: ["Mystery", "Philosophy"],
    budget: "low",
    duration: "long",
    skillLevel: "beginner",
    difficulty: "moderate",
    rating: 4.6,
    popularity: 87,
    vectorCoords: { x: 0.5, y: 0.7, z: 0.8 },
    userRatings: { user_alpha: 4, user_beta: 4.8, user_gamma: 3.5, user_delta: 4.5, user_epsilon: 4.8 }
  },

  // ONLINE COURSES & SKILLS
  {
    id: "course_01",
    title: "Interactive Full-Stack Web App Engine",
    category: "Online Courses & Skills",
    description: "A comprehensive developer course focused on building lightning-fast serverless web architectures using React, TS, and modular patterns.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    tags: ["Programming", "Coding", "masterclass", "interactive", "productivity"],
    genres: ["Programming", "Design & Arts"],
    budget: "medium",
    duration: "long",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.9,
    popularity: 94,
    vectorCoords: { x: 0.85, y: 0.5, z: 0.4 },
    userRatings: { user_alpha: 5, user_beta: 4.5, user_gamma: 3, user_delta: 4.8, user_epsilon: 4.5 }
  },
  {
    id: "course_02",
    title: "Generative AI Foundations & Neural Architectures",
    category: "Online Courses & Skills",
    description: "Master hyper-scaling LLMs, training customized diffusion weights, and developing server-side vector semantic lookup engines.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    tags: ["AI", "Data Science", "masterclass", "Deep Learning", "Future Tech"],
    genres: ["Data Science", "Programming"],
    budget: "high",
    duration: "long",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.95,
    popularity: 97,
    vectorCoords: { x: 0.98, y: 0.95, z: 0.6 },
    userRatings: { user_alpha: 5, user_beta: 4.2, user_gamma: 2.5, user_delta: 5, user_epsilon: 5 }
  },
  {
    id: "course_03",
    title: "UX Design & Glassmorphic Interfaces",
    category: "Online Courses & Skills",
    description: "Learn precise visual layout, typographic scales, fluid animations, and crafting premium futuristic user experiences in modern CSS.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
    tags: ["Design & Arts", "Creativity", "beginner-friendly", "Minimalism"],
    genres: ["Design & Arts", "Marketing"],
    budget: "medium",
    duration: "medium",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.7,
    popularity: 89,
    vectorCoords: { x: 0.4, y: 0.4, z: 0.2 },
    userRatings: { user_alpha: 4, user_beta: 5, user_gamma: 3, user_delta: 4.5, user_epsilon: 3.5 }
  },
  {
    id: "course_04",
    title: "Growth Marketing & Viral Distribution",
    category: "Online Courses & Skills",
    description: "Accelerate user acquisition using data-driven analytics channels, behavioral funnels, dynamic copy, and automated content setups.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    tags: ["Marketing", "Efficiency", "Automation", "budget-friendly"],
    genres: ["Marketing", "Data Science"],
    budget: "low",
    duration: "short",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.3,
    popularity: 78,
    vectorCoords: { x: 0.6, y: 0.3, z: 0.3 },
    userRatings: { user_alpha: 4.5, user_beta: 4, user_gamma: 3.5, user_delta: 4.2, user_epsilon: 2.5 }
  },
  {
    id: "course_05",
    title: "Ambient Sound Production Masterclass",
    category: "Online Courses & Skills",
    description: "Synthesize soothing modular soundscapes, generative organic notes, dynamic panning, and custom spatial reverberations.",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    tags: ["Music Production", "Creativity", "immersive", "Mindfulness"],
    genres: ["Music Production", "Design & Arts"],
    budget: "medium",
    duration: "medium",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.8,
    popularity: 84,
    vectorCoords: { x: 0.3, y: 0.5, z: 0.4 },
    userRatings: { user_alpha: 3.8, user_beta: 5, user_gamma: 4.2, user_delta: 4.8, user_epsilon: 4 }
  },

  // TRAVEL & ADVENTURE
  {
    id: "travel_01",
    title: "Norwegian Fiords High-Latitude Wilderness",
    category: "Travel & Adventure",
    description: "An immersive, self-supported backpacking trekking route along glacial valleys, high cliffs, and breathtaking arctic waterfalls.",
    imageUrl: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80",
    tags: ["Nature & Hiking", "Outdoor Activities", "scenic", "premium"],
    genres: ["Nature & Hiking", "Extreme Sports"],
    budget: "high",
    duration: "long",
    skillLevel: "advanced",
    difficulty: "hard",
    rating: 4.9,
    popularity: 93,
    vectorCoords: { x: 0.15, y: 0.95, z: 0.9 },
    userRatings: { user_alpha: 3, user_beta: 4, user_gamma: 5, user_delta: 4.5, user_epsilon: 2 }
  },
  {
    id: "travel_02",
    title: "Kyoto Heritage Sanctuary & Bamboo Walkways",
    category: "Travel & Adventure",
    description: "Explore tranquil ancient wooden shrines, tea-gardens, local paper crafts, and guided walking paths through bamboo forests.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    tags: ["Cultural Heritage", "Mindfulness", "scenic", "Global Culture"],
    genres: ["Cultural Heritage", "City Exploration"],
    budget: "medium",
    duration: "medium",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.8,
    popularity: 96,
    vectorCoords: { x: 0.3, y: 0.6, z: 0.8 },
    userRatings: { user_alpha: 4, user_beta: 5, user_gamma: 4, user_delta: 5, user_epsilon: 4.5 }
  },
  {
    id: "travel_03",
    title: "Icelandic Ring Road Expedition",
    category: "Travel & Adventure",
    description: "Drive through volcanic black beaches, active thermal geysers, majestic ice glaciers, and gorgeous scenic waterfalls.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    tags: ["Road Trips", "Nature & Hiking", "scenic", "immersive"],
    genres: ["Road Trips", "Nature & Hiking"],
    budget: "high",
    duration: "long",
    skillLevel: "intermediate",
    difficulty: "moderate",
    rating: 4.95,
    popularity: 97,
    vectorCoords: { x: 0.2, y: 0.9, z: 0.85 },
    userRatings: { user_alpha: 4.5, user_beta: 4.5, user_gamma: 5, user_delta: 4.8, user_epsilon: 3.5 }
  },
  {
    id: "travel_04",
    title: "Crete Coastline Secret Coves & Beaches",
    category: "Travel & Adventure",
    description: "Relax in untouched pink-sand lagoons, explore small coastal fishing villages, and indulge in pristine Mediterranean local food.",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
    tags: ["Beach & Relax", "Minimalism", "budget-friendly", "scenic"],
    genres: ["Beach & Relax", "City Exploration"],
    budget: "medium",
    duration: "medium",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.6,
    popularity: 87,
    vectorCoords: { x: 0.1, y: 0.4, z: 0.7 },
    userRatings: { user_alpha: 3.5, user_beta: 4.8, user_gamma: 4.8, user_delta: 4.5, user_epsilon: 3 }
  },
  {
    id: "travel_05",
    title: "Seoul Tech-Culture Exploration",
    category: "Travel & Adventure",
    description: "Navigate futuristic cybercafe hubs, virtual-reality parks, high-speed rail, dynamic night markets, and traditional digital museums.",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    tags: ["City Exploration", "Future Tech", "Cyberpunk", "Global Culture"],
    genres: ["City Exploration", "Cultural Heritage"],
    budget: "medium",
    duration: "short",
    skillLevel: "beginner",
    difficulty: "easy",
    rating: 4.75,
    popularity: 91,
    vectorCoords: { x: 0.8, y: 0.7, z: 0.5 },
    userRatings: { user_alpha: 5, user_beta: 4.5, user_gamma: 3.8, user_delta: 4.2, user_epsilon: 5 }
  }
];

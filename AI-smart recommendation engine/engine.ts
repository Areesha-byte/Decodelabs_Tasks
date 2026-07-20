import { DatasetItem, RECOMMENDATION_DATASET, UserPreferences, SIMULATED_USERS } from '../data/dataset';

export interface RecommendationResult {
  item: DatasetItem;
  matchScore: number; // 0 to 100
  similarityPercentage: number; // 0 to 100
  contentScore: number; // 0 to 1
  collaborativeScore: number; // 0 to 1
  binaryOverlapScore: number; // 0 to 1
  whyRecommended: string;
  matchedKeywords: string[];
  techniqueUsed: 'Rule-Based' | 'Content-Based' | 'Collaborative' | 'Hybrid';
}

// Extract vocabulary of all unique tags, genres, and metadata values across dataset
export function extractVocabulary(dataset: DatasetItem[]): string[] {
  const vocab = new Set<string>();
  dataset.forEach(item => {
    item.tags.forEach(t => vocab.add(t.toLowerCase()));
    item.genres.forEach(g => vocab.add(g.toLowerCase()));
  });
  return Array.from(vocab);
}

// Calculate Document Frequencies (DF) for all tags/genres in dataset
export function calculateDocumentFrequencies(dataset: DatasetItem[], vocab: string[]): { [key: string]: number } {
  const df: { [key: string]: number } = {};
  vocab.forEach(term => {
    df[term] = 0;
  });

  dataset.forEach(item => {
    const itemTerms = new Set([
      ...item.tags.map(t => t.toLowerCase()),
      ...item.genres.map(g => g.toLowerCase())
    ]);
    itemTerms.forEach(term => {
      if (term in df) {
        df[term]++;
      }
    });
  });

  return df;
}

// Calculate Inverse Document Frequencies (IDF)
export function calculateIDF(totalDocuments: number, df: { [key: string]: number }): { [key: string]: number } {
  const idf: { [key: string]: number } = {};
  for (const term in df) {
    // IDF = log(1 + N / df)
    idf[term] = Math.log(1 + totalDocuments / (df[term] || 1));
  }
  return idf;
}

// Compute the TF-IDF representation of an item
export function getItemVector(item: DatasetItem, vocab: string[], idf: { [key: string]: number }): { [key: string]: number } {
  const vector: { [key: string]: number } = {};
  vocab.forEach(term => {
    vector[term] = 0;
  });

  const itemTerms = [
    ...item.tags.map(t => t.toLowerCase()),
    ...item.genres.map(g => g.toLowerCase())
  ];

  // Term frequencies (TF)
  const tfCounts: { [key: string]: number } = {};
  itemTerms.forEach(term => {
    tfCounts[term] = (tfCounts[term] || 0) + 1;
  });

  // TF-IDF = TF * IDF
  itemTerms.forEach(term => {
    if (term in vector) {
      vector[term] = tfCounts[term] * idf[term];
    }
  });

  return vector;
}

// Compute the User Preference Vector based on selections
export function getUserPreferenceVector(prefs: UserPreferences, vocab: string[], idf: { [key: string]: number }): { [key: string]: number } {
  const vector: { [key: string]: number } = {};
  vocab.forEach(term => {
    vector[term] = 0;
  });

  const userTerms: { term: string; weight: number }[] = [];

  // Add category match with high weight
  if (prefs.category) {
    userTerms.push({ term: prefs.category.toLowerCase(), weight: 2.5 });
  }

  // Add genres
  prefs.genres.forEach(g => {
    userTerms.push({ term: g.toLowerCase(), weight: 2.0 });
  });

  // Add interests
  prefs.interests.forEach(interest => {
    userTerms.push({ term: interest.toLowerCase(), weight: 1.5 });
  });

  // Add tags
  prefs.tags.forEach(t => {
    userTerms.push({ term: t.toLowerCase(), weight: 1.2 });
  });

  // Apply TF-IDF weighting for user profile
  userTerms.forEach(({ term, weight }) => {
    const termLower = term.toLowerCase();
    if (termLower in vector) {
      // User TF is simulated as the assigned preference weight
      vector[termLower] = weight * (idf[termLower] || 1.0);
    }
  });

  return vector;
}

// Compute Cosine Similarity between two vectors
export function computeCosineSimilarity(vecA: { [key: string]: number }, vecB: { [key: string]: number }): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (const term in vecA) {
    const valA = vecA[term] || 0;
    const valB = vecB[term] || 0;
    dotProduct += valA * valB;
    magnitudeA += valA * valA;
    magnitudeB += valB * valB;
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Compute simple binary overlap score
export function computeBinaryOverlap(prefs: UserPreferences, item: DatasetItem): number {
  const userTerms = new Set([
    prefs.category.toLowerCase(),
    ...prefs.genres.map(g => g.toLowerCase()),
    ...prefs.interests.map(i => i.toLowerCase()),
    ...prefs.tags.map(t => t.toLowerCase())
  ].filter(Boolean));

  const itemTerms = new Set([
    item.category.toLowerCase(),
    ...item.genres.map(g => g.toLowerCase()),
    ...item.tags.map(t => t.toLowerCase())
  ]);

  let intersectionCount = 0;
  userTerms.forEach(term => {
    if (itemTerms.has(term)) {
      intersectionCount++;
    }
  });

  if (userTerms.size === 0) return 0;
  return intersectionCount / Math.max(userTerms.size, 1);
}

// Simulate user similarity based on interest overlap
export function calculateUserSimilarities(prefs: UserPreferences): { [userId: string]: number } {
  const activeUserInterests = new Set([
    ...prefs.interests,
    ...prefs.genres
  ].map(i => i.toLowerCase()));

  const similarities: { [userId: string]: number } = {};

  SIMULATED_USERS.forEach(simUser => {
    const simUserInterests = new Set(simUser.interests.map(i => i.toLowerCase()));
    
    let intersectionCount = 0;
    activeUserInterests.forEach(interest => {
      if (simUserInterests.has(interest)) {
        intersectionCount++;
      }
    });

    const unionCount = new Set([...activeUserInterests, ...simUserInterests]).size;
    similarities[simUser.id] = unionCount > 0 ? intersectionCount / unionCount : 0.1;
  });

  return similarities;
}

// Run full hybrid recommendation pipeline
export function runRecommendationPipeline(prefs: UserPreferences): RecommendationResult[] {
  const vocab = extractVocabulary(RECOMMENDATION_DATASET);
  const df = calculateDocumentFrequencies(RECOMMENDATION_DATASET, vocab);
  const idf = calculateIDF(RECOMMENDATION_DATASET.length, df);
  const userVec = getUserPreferenceVector(prefs, vocab, idf);
  const userSimilarities = calculateUserSimilarities(prefs);

  const results: RecommendationResult[] = RECOMMENDATION_DATASET.map(item => {
    // 1. Rule-Based Filter Penalty
    // If user specified category, check if it matches.
    // If it's empty or 'All', no penalty.
    let ruleBasedMultiplier = 1.0;
    if (prefs.category && prefs.category !== "All" && item.category !== prefs.category) {
      // Soft constraint: reduce score significantly rather than hard deleting,
      // to keep results comprehensive but correctly ranked.
      ruleBasedMultiplier = 0.3; 
    }

    // Skill level matching
    if (prefs.skillLevel) {
      if (prefs.skillLevel === 'beginner' && item.skillLevel === 'advanced') {
        ruleBasedMultiplier *= 0.6; // reduce match score for beginner searching advanced
      } else if (prefs.skillLevel === 'advanced' && item.skillLevel === 'beginner') {
        ruleBasedMultiplier *= 0.8; // slightly reduce match for advanced getting beginner
      }
    }

    // Budget matching
    if (prefs.budget && item.budget !== prefs.budget) {
      if (prefs.budget === 'low' && item.budget === 'high') {
        ruleBasedMultiplier *= 0.4; // severe penalty
      } else if (prefs.budget === 'high' && item.budget === 'low') {
        ruleBasedMultiplier *= 0.9; // slight penalty
      } else {
        ruleBasedMultiplier *= 0.8;
      }
    }

    // 2. Content-Based Score (Cosine similarity of TF-IDF vectors)
    const itemVec = getItemVector(item, vocab, idf);
    const contentScore = computeCosineSimilarity(userVec, itemVec);

    // 3. Collaborative Filtering Prediction (Simulated)
    let colabRatingSum = 0;
    let similarityWeightSum = 0;

    SIMULATED_USERS.forEach(simUser => {
      const rating = item.userRatings[simUser.id] || 0;
      const simWeight = userSimilarities[simUser.id] || 0.1;

      if (rating > 0) {
        colabRatingSum += rating * simWeight;
        similarityWeightSum += simWeight;
      }
    });

    const predictedRating = similarityWeightSum > 0 ? colabRatingSum / similarityWeightSum : 3.0;
    // Map predicted rating (1 to 5) to 0 to 1 score
    const collaborativeScore = (predictedRating - 1) / 4;

    // 4. Simple Binary Overlap Score (for comparative charts)
    const binaryOverlapScore = computeBinaryOverlap(prefs, item);

    // 5. Hybrid Combination
    // Combine content score (50%), collaborative (30%), rating popularity (20%)
    const popularityFactor = item.popularity / 100;
    const ratingFactor = item.rating / 5;

    const rawHybridScore = (
      (0.5 * contentScore) + 
      (0.3 * collaborativeScore) + 
      (0.1 * popularityFactor) + 
      (0.1 * ratingFactor)
    ) * ruleBasedMultiplier;

    // Scale to percentage: 0 to 100
    const matchScore = Math.min(100, Math.max(10, Math.round(rawHybridScore * 100)));
    const similarityPercentage = Math.min(100, Math.max(10, Math.round(contentScore * 100)));

    // Generate matched keywords/tags
    const userSelectedTerms = new Set([
      prefs.category.toLowerCase(),
      ...prefs.genres.map(g => g.toLowerCase()),
      ...prefs.interests.map(i => i.toLowerCase()),
      ...prefs.tags.map(t => t.toLowerCase())
    ].filter(Boolean));

    const matchedKeywords = [
      ...item.genres,
      ...item.tags
    ].filter(term => userSelectedTerms.has(term.toLowerCase()));

    // Construct "Why Recommended" explanation
    let whyRecommended = "";
    if (matchedKeywords.length > 0) {
      whyRecommended = `Direct match on interests: ${matchedKeywords.slice(0, 3).join(', ')}. `;
    } else {
      whyRecommended = `Strong synergy with your category and budget settings. `;
    }

    if (item.rating >= 4.7) {
      whyRecommended += `Consistently top-rated (${item.rating}/5) by users with similar profiles.`;
    } else {
      whyRecommended += `Aligned with simulated users like ${SIMULATED_USERS[0].name.split(' ')[0]}.`;
    }

    // Assign technique used based on strongest contributing component
    let techniqueUsed: 'Rule-Based' | 'Content-Based' | 'Collaborative' | 'Hybrid' = 'Hybrid';
    if (ruleBasedMultiplier < 0.5) {
      techniqueUsed = 'Rule-Based';
    } else if (contentScore > 0.6 && contentScore > collaborativeScore) {
      techniqueUsed = 'Content-Based';
    } else if (collaborativeScore > 0.7) {
      techniqueUsed = 'Collaborative';
    }

    return {
      item,
      matchScore,
      similarityPercentage,
      contentScore,
      collaborativeScore,
      binaryOverlapScore,
      whyRecommended,
      matchedKeywords,
      techniqueUsed
    };
  });

  // Sort by Match Score descending, and break ties with item rating
  return results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.item.rating - a.item.rating;
  });
}

import { Sample, DataSplit, ScaledData, MetricReport, KComparison, NeighborInfo } from "../types";

// Seedable linear congruential generator (LCG) for reproducible shuffling (equivalent to random_state in sklearn)
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Returns a pseudo-random float between 0 and 1
  next(): number {
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }
}

// Perform train-test split (default 80/20) with shuffling and a random seed (random_state)
export function trainTestSplit(
  samples: Sample[],
  trainSizePercent: number = 80,
  randomState: number = 42
): DataSplit {
  // Create a copy to shuffle
  const shuffled = [...samples];
  const rng = new SeededRandom(randomState);

  // Fisher-Yates shuffle using our seeded RNG
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const trainCount = Math.floor((samples.length * trainSizePercent) / 100);
  const train = shuffled.slice(0, trainCount);
  const test = shuffled.slice(trainCount);

  return { train, test };
}

// Compute StandardScaler means and standard deviations, then transform data
export function fitTransform(split: DataSplit, numFeatures: number): ScaledData {
  const trainX = split.train.map(s => s.features);
  const testX = split.test.map(s => s.features);
  const trainY = split.train.map(s => s.target);
  const testY = split.test.map(s => s.target);

  const means: number[] = new Array(numFeatures).fill(0);
  const stds: number[] = new Array(numFeatures).fill(0);
  const n = trainX.length;

  // Calculate Mean
  for (let j = 0; j < numFeatures; j++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += trainX[i][j];
    }
    means[j] = sum / n;
  }

  // Calculate Standard Deviation
  for (let j = 0; j < numFeatures; j++) {
    let sumVariance = 0;
    for (let i = 0; i < n; i++) {
      const diff = trainX[i][j] - means[j];
      sumVariance += diff * diff;
    }
    // Population standard deviation (like sklearn does by default: ddof=0)
    stds[j] = Math.sqrt(sumVariance / n);
    // Prevent division by zero if std is extremely close to zero
    if (stds[j] < 1e-8) {
      stds[j] = 1e-8;
    }
  }

  // Scale data
  const scaledTrainX = trainX.map(row =>
    row.map((val, j) => (val - means[j]) / stds[j])
  );

  const scaledTestX = testX.map(row =>
    row.map((val, j) => (val - means[j]) / stds[j])
  );

  return {
    trainX: scaledTrainX,
    testX: scaledTestX,
    trainY,
    testY,
    means,
    stds
  };
}

// Single sample StandardScaler transformation
export function scaleSample(features: number[], means: number[], stds: number[]): number[] {
  return features.map((val, j) => (val - means[j]) / stds[j]);
}

// Calculate Euclidean Distance between two vectors of equal length
export function calculateEuclideanDistance(v1: number[], v2: number[]): number {
  let sum = 0;
  for (let i = 0; i < v1.length; i++) {
    const diff = v1[i] - v2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

// Predict target for a single sample using K-Nearest Neighbors
export function predictKNN(
  scaledSample: number[],
  trainX: number[][],
  trainY: number[],
  originalTrainX: number[][],
  k: number,
  numClasses: number
): { prediction: number; neighbors: NeighborInfo[] } {
  const neighbors: NeighborInfo[] = [];

  // Calculate distance to all training samples
  for (let i = 0; i < trainX.length; i++) {
    const dist = calculateEuclideanDistance(scaledSample, trainX[i]);
    neighbors.push({
      index: i,
      originalFeatures: originalTrainX[i],
      scaledFeatures: trainX[i],
      target: trainY[i],
      distance: dist
    });
  }

  // Sort by distance ascending
  neighbors.sort((a, b) => a.distance - b.distance);

  // Take top K
  const topK = neighbors.slice(0, k);

  // Vote tallying
  const votes = new Array(numClasses).fill(0);
  
  // Weights based on inverse distance (plus small epsilon to prevent 1/0)
  // to resolve ties elegantly and favor closer points
  topK.forEach(n => {
    const weight = 1 / (n.distance + 1e-5);
    votes[n.target] += weight;
  });

  // Find class with max vote
  let maxVote = -1;
  let prediction = 0;
  for (let c = 0; c < numClasses; c++) {
    if (votes[c] > maxVote) {
      maxVote = votes[c];
      prediction = c;
    }
  }

  return { prediction, neighbors: topK };
}

// Evaluate model and calculate complete metric scores (accuracy, precision, recall, f1, confusion matrix)
export function evaluateKNN(
  trainX: number[][],
  trainY: number[],
  originalTrainX: number[][],
  testX: number[][],
  testY: number[],
  k: number,
  numClasses: number,
  classNames: string[]
): MetricReport {
  const predictions: number[] = [];

  // Predict all test samples
  for (let i = 0; i < testX.length; i++) {
    const { prediction } = predictKNN(testX[i], trainX, trainY, originalTrainX, k, numClasses);
    predictions.push(prediction);
  }

  // Initialize Confusion Matrix: actual x predicted
  const confusionMatrix: number[][] = Array.from({ length: numClasses }, () =>
    new Array(numClasses).fill(0)
  );

  let correctCount = 0;
  for (let i = 0; i < testY.length; i++) {
    const actual = testY[i];
    const predicted = predictions[i];
    confusionMatrix[actual][predicted]++;
    if (actual === predicted) {
      correctCount++;
    }
  }

  const accuracy = correctCount / testY.length;

  // Calculate Precision, Recall, F1 for each class
  const classMetrics = classNames.map((className, c) => {
    let tp = 0;
    let fp = 0;
    let fn = 0;

    for (let i = 0; i < testY.length; i++) {
      const actual = testY[i];
      const predicted = predictions[i];

      if (actual === c && predicted === c) {
        tp++;
      } else if (actual !== c && predicted === c) {
        fp++;
      } else if (actual === c && predicted !== c) {
        fn++;
      }
    }

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
    const support = testY.filter(y => y === c).length;

    return { className, precision, recall, f1, support };
  });

  // Calculate Macro-averages (sum metrics / num classes)
  const macroPrecision = classMetrics.reduce((sum, m) => sum + m.precision, 0) / numClasses;
  const macroRecall = classMetrics.reduce((sum, m) => sum + m.recall, 0) / numClasses;
  const macroF1 = classMetrics.reduce((sum, m) => sum + m.f1, 0) / numClasses;

  return {
    accuracy,
    precision: macroPrecision,
    recall: macroRecall,
    f1: macroF1,
    confusionMatrix,
    classMetrics
  };
}

// Compare various K values to find the best performing model
export function compareKValues(
  trainX: number[][],
  trainY: number[],
  originalTrainX: number[][],
  testX: number[][],
  testY: number[],
  numClasses: number,
  classNames: string[],
  kValues: number[] = [1, 3, 5, 7, 9]
): KComparison[] {
  return kValues.map(k => {
    const report = evaluateKNN(trainX, trainY, originalTrainX, testX, testY, k, numClasses, classNames);
    return {
      k,
      accuracy: report.accuracy,
      precision: report.precision,
      recall: report.recall,
      f1: report.f1
    };
  });
}

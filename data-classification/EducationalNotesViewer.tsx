import { useState } from "react";
import { BookOpen, Sparkles, Code2, GraduationCap, ChevronRight, Search } from "lucide-react";

interface Concept {
  id: string;
  category: "Fundamentals" | "Data & Prep" | "KNN Algorithm" | "Evaluation" | "Advanced";
  title: string;
  simpleExplanation: string;
  analogy: string;
  pythonSnippet: string;
}

const concepts: Concept[] = [
  {
    id: "ai",
    category: "Fundamentals",
    title: "Artificial Intelligence (AI)",
    simpleExplanation: "AI is a broad field of computer science focused on building smart machines capable of performing tasks that typically require human intelligence, such as reasoning, problem-solving, planning, or understanding natural language.",
    analogy: "If human intelligence is natural flight (like a bird), Artificial Intelligence is engineered flight (like an airplane). They use different mechanisms but achieve the same functional outcome.",
    pythonSnippet: "# AI is the broad scientific field. Machine Learning is the implementation.\n# There is no single 'import ai' library; instead we write models:\nfrom sklearn.neighbors import KNeighborsClassifier"
  },
  {
    id: "ml",
    category: "Fundamentals",
    title: "Machine Learning (ML)",
    simpleExplanation: "A subset of AI where computers are trained to learn patterns from historical data and make predictions on new, unseen data, without being explicitly programmed with rigid step-by-step rules.",
    analogy: "Instead of writing an exact recipe manual for how to identify a cake, you show a child 1,000 photos of cakes and let them find the common elements (frosting, round shape, candles) on their own.",
    pythonSnippet: "# Standard ML pipeline workflow in Python:\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndata = pd.read_csv('dataset.csv')\n# The machine learns features (X) -> targets (y)"
  },
  {
    id: "supervised",
    category: "Fundamentals",
    title: "Supervised Learning",
    simpleExplanation: "A type of machine learning where the model learns from a 'labeled' dataset. This means the training data contains both the inputs (features) and the correct answers (targets/labels).",
    analogy: "Like studying for an exam using a practice test that has a complete answer key at the back. You try the questions, look at the correct answers, and correct your mistakes.",
    pythonSnippet: "# Labeled mapping: features (X) -> target label (y)\nX = [[5.1, 3.5], [4.9, 3.0]]\ny = [0, 1]  # 0: Setosa, 1: Versicolor"
  },
  {
    id: "classification",
    category: "Fundamentals",
    title: "Classification",
    simpleExplanation: "A supervised learning task where the goal is to predict a discrete categorical class or label (like 'Malignant' or 'Benign', or flower species), rather than a continuous numerical value (like predicting a house price, which is Regression).",
    analogy: "Sorting mail into discrete boxes: 'Bills', 'Personal Letters', or 'Spam'. Every email goes into a single, defined category.",
    pythonSnippet: "# Classification uses classifiers, not regressors:\nfrom sklearn.neighbors import KNeighborsClassifier\nmodel = KNeighborsClassifier()\n# Model outputs distinct target classes (0, 1, or 2)"
  },
  {
    id: "samples",
    category: "Data & Prep",
    title: "Samples",
    simpleExplanation: "A single, individual row or record in your dataset. It represents one single observation (e.g., one specific patient, or one individual flower).",
    analogy: "In a medical study of 1,000 patients, each single patient is one 'sample'.",
    pythonSnippet: "# In tabular data, samples are individual rows:\nsample_index_0 = X_train[0]\nprint(f\"First sample features: {sample_index_0}\")"
  },
  {
    id: "features",
    category: "Data & Prep",
    title: "Features (Dimensions)",
    simpleExplanation: "The individual measurable characteristics, properties, or variables of your samples used as inputs by the model (e.g., Sepal Width, Patient Age, Tumor Radius). The number of features equals the dimensions of the input space.",
    analogy: "If you describe a suspect to a police sketch artist, the 'features' are: height, hair color, eye color, and age.",
    pythonSnippet: "# Features are represented as columns (X variables):\nfeatures = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']\n# Features constitute the dimensions of the data vector"
  },
  {
    id: "classes",
    category: "Data & Prep",
    title: "Classes",
    simpleExplanation: "The distinct output target categories or labels that the model is trying to predict (e.g., 'Iris Setosa' vs. 'Iris Virginica', or 'Spam' vs. 'Not Spam').",
    analogy: "In a recycling bin, the three target 'classes' are: 'Paper', 'Plastic', and 'Glass'.",
    pythonSnippet: "# Target classes are represented in Scikit-learn as:\ntarget_names = ['setosa', 'versicolor', 'virginica']\n# Numerical codes represent labels: 0, 1, 2"
  },
  {
    id: "training_data",
    category: "Data & Prep",
    title: "Training Data",
    simpleExplanation: "The subset of the dataset (typically 80%) used to build and train the model. The algorithm analyzes this data to learn the underlying relationships between features and targets.",
    analogy: "The textbook chapters, classroom lectures, and practice exercises you study throughout the semester to learn a subject.",
    pythonSnippet: "# Model fits (learns) on training data:\nmodel.fit(X_train, y_train)"
  },
  {
    id: "testing_data",
    category: "Data & Prep",
    title: "Testing Data",
    simpleExplanation: "A separate subset of data (typically 20%) kept completely hidden from the model during training. It is used as an independent check to evaluate how well the trained model can generalize to brand new inputs.",
    analogy: "The final exam at the end of the semester. To ensure you actually learned concepts (and didn't just memorize questions), the exam contains brand new questions you've never seen before.",
    pythonSnippet: "# Model is evaluated ONLY on testing data:\npredictions = model.predict(X_test)\naccuracy = accuracy_score(y_test, predictions)"
  },
  {
    id: "shuffle",
    category: "Data & Prep",
    title: "Shuffle",
    simpleExplanation: "Randomizing the order of samples before splitting them into training and testing sets. This ensures that both subsets are representative of all classes.",
    analogy: "Shuffling a deck of cards before dealing them. If you don't shuffle, all the hearts might end up in one hand and all the spades in another.",
    pythonSnippet: "# train_test_split automatically shuffles by default:\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, shuffle=True, random_state=42\n)"
  },
  {
    id: "scaling",
    category: "Data & Prep",
    title: "StandardScaler",
    simpleExplanation: "A preprocessing tool that standardizes features by shifting their mean to 0 and scaling their standard deviation to 1, using the formula: z = (x - mean) / std. This ensures features with large numbers don't dominate distance calculations.",
    analogy: "If you compare currency, 1,000 Japanese Yen is only about 7 US Dollars. Without standardizing them to a single base, the raw number 1,000 will look massively bigger than 7, even though they represent the same purchasing power.",
    pythonSnippet: "# Scaling features:\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\n\n# Fit on TRAIN, transform both train and test\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)"
  },
  {
    id: "knn",
    category: "KNN Algorithm",
    title: "K-Nearest Neighbors (KNN)",
    simpleExplanation: "A simple, intuitive classification algorithm. To classify a new sample, it computes the distance to all training samples, finds the 'K' closest samples (neighbors), and assigns the class that has the majority vote.",
    analogy: "Birds of a feather flock together. If you want to know which political party someone supports, look at their 5 closest friends. If 4 support party A, they likely support party A too.",
    pythonSnippet: "# Train a KNN Classifier with K=5:\nfrom sklearn.neighbors import KNeighborsClassifier\nknn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train_scaled, y_train)"
  },
  {
    id: "euclidean",
    category: "KNN Algorithm",
    title: "Euclidean Distance",
    simpleExplanation: "The straight-line 'as-the-crow-flies' distance between two points in multi-dimensional feature space, calculated using the Pythagorean theorem: distance = sqrt( sum( (x_i - y_i)^2 ) ).",
    analogy: "Using a physical tape measure to measure the exact straight-line distance across a room from one corner to another.",
    pythonSnippet: "# Euclidean distance between two vectors a and b:\nimport numpy as np\na = np.array([1.0, 2.0])\nb = np.array([4.0, 6.0])\ndist = np.linalg.norm(a - b)  # equals sqrt(3^2 + 4^2) = 5.0"
  },
  {
    id: "overfitting",
    category: "KNN Algorithm",
    title: "Overfitting & Underfitting",
    simpleExplanation: "Overfitting is when a model learns the training noise too perfectly (usually with K=1 in KNN), getting 100% training accuracy but failing on new test data. Underfitting is when the model is too simple (e.g. K=100), missing local patterns.",
    analogy: "Overfitting is memorizing the exact practice questions word-for-word. If the final exam switches a single word, you fail. Underfitting is barely studying at all, guessing the average answer for every single question.",
    pythonSnippet: "# K=1 creates Overfitting (complex decision boundaries)\nknn_over = KNeighborsClassifier(n_neighbors=1)\n\n# K=100 creates Underfitting (too simple, over-generalized)\nknn_under = KNeighborsClassifier(n_neighbors=100)"
  },
  {
    id: "accuracy",
    category: "Evaluation",
    title: "Accuracy Score",
    simpleExplanation: "The percentage of correct predictions made by the model out of total test samples. Accuracy = (Correct Predictions) / (Total Predictions).",
    analogy: "Getting 18 out of 20 questions right on a final exam gives you an Accuracy of 90%.",
    pythonSnippet: "from sklearn.metrics import accuracy_score\nacc = accuracy_score(y_test, y_pred)\nprint(f\"Accuracy: {acc * 100:.2f}%\")"
  },
  {
    id: "precision",
    category: "Evaluation",
    title: "Precision Score",
    simpleExplanation: "The proportion of positive predictions that were actually correct. Precision = TP / (TP + FP). Out of all samples the model flagged as 'Malignant', how many were actually malignant?",
    analogy: "A police search warrant. High precision means when police search a house, they almost always find illegal items (few false alarms), even if they miss some criminals in other houses.",
    pythonSnippet: "from sklearn.metrics import precision_score\n# Macro precision calculates average across classes\nprec = precision_score(y_test, y_pred, average='macro')"
  },
  {
    id: "recall",
    category: "Evaluation",
    title: "Recall (Sensitivity)",
    simpleExplanation: "The proportion of actual positives that were correctly predicted. Recall = TP / (TP + FN). Out of all patients who actually had a malignant tumor, how many did the model find?",
    analogy: "An airport metal detector. It must have 100% Recall. It must beep for every single weapon (no false negatives), even if it sometimes beeps for loose coins and keys (triggering false positives).",
    pythonSnippet: "from sklearn.metrics import recall_score\nrec = recall_score(y_test, y_pred, average='macro')"
  },
  {
    id: "f1",
    category: "Evaluation",
    title: "F1 Score",
    simpleExplanation: "The harmonic mean of Precision and Recall. It combines both metrics into a single score, providing a balanced measure of performance, especially on imbalanced datasets. F1 = 2 * (Precision * Recall) / (Precision + Recall).",
    analogy: "A compromise rating between speed and accuracy. You can complete an exam extremely fast (high speed, poor accuracy) or extremely slow (poor speed, high accuracy). The F1 score is the sweet spot of doing both well.",
    pythonSnippet: "from sklearn.metrics import f1_score\nf1 = f1_score(y_test, y_pred, average='macro')"
  },
  {
    id: "confusion",
    category: "Evaluation",
    title: "Confusion Matrix",
    simpleExplanation: "A table that visualizes the performance of a classifier. Rows represent the actual true classes, while columns represent the classes predicted by the model, allowing you to see exactly where errors are occurring.",
    analogy: "A scoreboard matrix in sports tracking. It shows how many times Player A attempted to pass to Player B, but accidentally passed to Opponent C instead.",
    pythonSnippet: "from sklearn.metrics import confusion_matrix\ncm = confusion_matrix(y_test, y_pred)\n# Row index is actual class, column is predicted class"
  },
  {
    id: "balanced",
    category: "Advanced",
    title: "Why Class Balance Matters",
    simpleExplanation: "Class balance refers to having roughly equal numbers of samples for each class in your dataset. Imbalanced datasets cause classifiers to develop a bias toward the majority class, leading to high accuracy scores that mask terrible performance on minority classes.",
    analogy: "If a doctor guesses 'No Illness' for 100% of patients, and 99% of patients are indeed healthy, the doctor gets 99% accuracy! However, they missed the 1% who were sick and needed treatment. The accuracy is high, but the model is practically useless.",
    pythonSnippet: "# Always inspect class distribution before modeling:\nimport numpy as np\nunique, counts = np.unique(y, return_counts=True)\nprint(dict(zip(unique, counts)))"
  },
  {
    id: "mldl",
    category: "Advanced",
    title: "ML vs. Deep Learning (DL)",
    simpleExplanation: "Machine Learning models use structured tabular data and require human engineers to design and select features. Deep Learning is a subset of ML that uses multi-layered Artificial Neural Networks to automatically extract features from raw data (like images or audio).",
    analogy: "In standard ML, an engineer must manually specify features like 'has ears', 'has fur', and 'whiskers' to classify a cat. In Deep Learning, you feed raw photos of cats into a neural network, and it learns to detect ears, fur, and whiskers on its own.",
    pythonSnippet: "# Machine Learning: StandardScaler + KNN (manual features)\n# Deep Learning: Multi-layered Neural Networks using PyTorch/TensorFlow\n# e.g., model = keras.Sequential([keras.layers.Dense(128, activation='relu')])"
  },
  {
    id: "cnn",
    category: "Advanced",
    title: "Intro to CNNs (Comparison)",
    simpleExplanation: "Convolutional Neural Networks (CNNs) are specialized deep learning networks designed for image processing. Instead of looking at flat tabular features, CNNs use 'filters' that slide across pixels to automatically learn visual patterns, textures, and shapes.",
    analogy: "Like examining a painting through a small magnifying glass, moving it piece by piece from left to right. First you detect small lines, then shapes (eyes, nose), and finally the entire face.",
    pythonSnippet: "# Brief layout of a CNN layer sequence:\n# from tensorflow.keras import layers\n# model = Sequential([\n#     layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),\n#     layers.MaxPooling2D((2, 2)),\n#     layers.Flatten(),\n#     layers.Dense(10, activation='softmax')\n# ])"
  }
];

export default function EducationalNotesViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeConcept, setActiveConcept] = useState<Concept>(concepts[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Fundamentals", "Data & Prep", "KNN Algorithm", "Evaluation", "Advanced"];

  const filteredConcepts = concepts.filter(c => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]" id="educational-notes-viewer">
      {/* Header section */}
      <div className="bg-indigo-900 px-5 py-4 text-white">
        <h3 className="text-sm font-semibold flex items-center gap-1.5 text-indigo-100">
          <GraduationCap className="w-5 h-5 text-indigo-300" />
          Interactive ML Learning Syllabus
        </h3>
        <p className="text-[11px] text-indigo-200 mt-0.5">
          Master machine learning concepts with clear explanations, analogies, and code.
        </p>
      </div>

      {/* Category selector + Search */}
      <div className="p-3 border-b border-slate-100 bg-slate-50 flex flex-col gap-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search concepts (e.g. StandardScaler, recall)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={`cat-btn-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium border transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Body panel split */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Side: Syllabus List */}
        <div className="w-2/5 border-r border-slate-100 overflow-y-auto bg-slate-50/50">
          {filteredConcepts.length === 0 ? (
            <div className="text-center p-5 text-xs text-slate-400 mt-10">No matching concepts found.</div>
          ) : (
            filteredConcepts.map((c) => (
              <button
                key={`syllabus-item-${c.id}`}
                onClick={() => setActiveConcept(c)}
                className={`w-full text-left px-3 py-2.5 border-b border-slate-100/70 transition-all flex items-center justify-between group ${
                  activeConcept.id === c.id
                    ? "bg-indigo-50/80 border-l-2 border-l-indigo-600"
                    : "hover:bg-slate-100"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wide block">
                    {c.category}
                  </span>
                  <span className={`text-xs font-semibold block truncate ${
                    activeConcept.id === c.id ? "text-indigo-900" : "text-slate-700"
                  }`}>
                    {c.title}
                  </span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                  activeConcept.id === c.id ? "text-indigo-600 translate-x-0.5" : "text-slate-300 group-hover:text-slate-400"
                }`} />
              </button>
            ))
          )}
        </div>

        {/* Right Side: Active Concept Detail */}
        <div className="w-3/5 overflow-y-auto p-4 flex flex-col gap-4">
          <div className="border-b pb-2">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              Topic: {activeConcept.category}
            </span>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              {activeConcept.title}
            </h4>
          </div>

          {/* Simple Explanation */}
          <div className="space-y-1">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">What it is</h5>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {activeConcept.simpleExplanation}
            </p>
          </div>

          {/* Analogy */}
          <div className="space-y-1">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Analogy (Simple Language)
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/40 p-3 rounded-lg border border-amber-100/50">
              {activeConcept.analogy}
            </p>
          </div>

          {/* Scikit-Learn Python implementation */}
          <div className="space-y-1">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Code2 className="w-3 h-3 text-indigo-500" />
              Scikit-Learn Python Code
            </h5>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-200 overflow-x-auto border border-slate-800">
              <pre>
                <code>{activeConcept.pythonSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

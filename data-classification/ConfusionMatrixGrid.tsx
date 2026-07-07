interface ConfusionMatrixGridProps {
  matrix: number[][];
  classes: string[];
}

export default function ConfusionMatrixGrid({ matrix, classes }: ConfusionMatrixGridProps) {
  const numClasses = classes.length;

  // Find max value in matrix for relative color scaling
  let maxVal = 1;
  for (let r = 0; r < numClasses; r++) {
    for (let c = 0; c < numClasses; c++) {
      if (matrix[r][c] > maxVal) {
        maxVal = matrix[r][c];
      }
    }
  }

  // Shading color helper based on relative value
  const getShadingStyle = (val: number) => {
    if (val === 0) return "bg-slate-50 text-slate-400";
    const ratio = val / maxVal;
    if (ratio < 0.25) return "bg-indigo-50 text-indigo-800";
    if (ratio < 0.5) return "bg-indigo-100 text-indigo-900";
    if (ratio < 0.75) return "bg-indigo-300 text-slate-950 font-bold";
    return "bg-indigo-500 text-white font-bold";
  };

  // Check if a cell is on the diagonal (True Positives)
  const isDiagonal = (r: number, c: number) => r === c;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col h-full" id="confusion-matrix-container">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
          Confusion Matrix Heatmap
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Grid mapping actual target classes against model predictions.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mt-5">
        {/* Predicted Class Label */}
        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">
          Predicted Class ➜
        </div>

        <div className="flex">
          {/* Actual Class Label rotated */}
          <div className="flex items-center justify-center mr-2">
            <span
              className="text-[10px] font-bold text-slate-400 tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Actual Class ➜
            </span>
          </div>

          {/* Matrix Grid */}
          <div className="flex flex-col">
            {/* Headers row */}
            <div className="flex">
              {/* Corner spacer */}
              <div className="w-16 h-10 flex items-center justify-center"></div>
              {classes.map((c, idx) => (
                <div
                  key={`pred-header-${idx}`}
                  className="w-24 h-10 flex items-center justify-center text-center p-1 text-[10px] font-bold text-slate-600 leading-tight"
                >
                  {c.split(" (")[0]}
                </div>
              ))}
            </div>

            {/* Matrix rows */}
            {matrix.map((row, rIdx) => (
              <div key={`matrix-row-${rIdx}`} className="flex items-center">
                {/* Row Headers (Actual) */}
                <div className="w-16 h-20 pr-2 flex items-center justify-end text-right text-[10px] font-bold text-slate-600 leading-tight border-r border-slate-200">
                  {classes[rIdx].split(" (")[0]}
                </div>

                {/* Grid cells */}
                {row.map((cellVal, cIdx) => {
                  const isTP = isDiagonal(rIdx, cIdx);
                  const shadingClass = getShadingStyle(cellVal);

                  // Educational explanation of cell
                  let statusLabel = "";
                  if (isTP) {
                    statusLabel = `True Positive (${classes[rIdx].split(" (")[0]} correctly identified)`;
                  } else {
                    if (numClasses === 2) {
                      // Binary
                      if (rIdx === 0 && cIdx === 1) {
                        statusLabel = "False Negative (Malignant missed, labeled Benign)";
                      } else {
                        statusLabel = "False Positive (Benign labeled Malignant)";
                      }
                    } else {
                      // Multiclass
                      statusLabel = `Error (Actual ${classes[rIdx].split(" (")[0]} predicted as ${classes[cIdx].split(" (")[0]})`;
                    }
                  }

                  return (
                    <div
                      key={`matrix-cell-${rIdx}-${cIdx}`}
                      className={`relative w-24 h-20 m-1 flex flex-col items-center justify-center rounded-lg border border-slate-200/50 cursor-help transition-all duration-300 hover:scale-[1.03] hover:shadow-sm group ${shadingClass}`}
                    >
                      <span className="font-mono text-lg font-bold">{cellVal}</span>
                      <span className="text-[8px] uppercase tracking-wider opacity-80 mt-0.5">
                        {isTP ? "Correct" : "Error"}
                      </span>

                      {/* Diagnostic tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block z-20 bg-slate-900 text-slate-100 text-[10px] p-2.5 rounded-md shadow-xl text-center pointer-events-none font-sans">
                        <div className="font-semibold text-indigo-300 mb-0.5">{statusLabel}</div>
                        <div className="text-[9px] text-slate-400">
                          Count: <strong className="text-white">{cellVal}</strong> samples
                        </div>
                        {/* Triangle decorator */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Guide */}
        <div className="mt-4 flex gap-4 text-[10px] text-slate-500 border-t pt-3 w-full justify-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-indigo-500 border border-slate-300 rounded inline-block"></span>
            <span>Diagonal (Correct Detections)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-50 border border-slate-300 rounded inline-block"></span>
            <span>Off-Diagonal (Classification Errors)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

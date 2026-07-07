import { KComparison } from "../types";

interface AccuracyKLinePlotProps {
  comparisons: KComparison[];
  activeK: number;
}

export default function AccuracyKLinePlot({ comparisons, activeK }: AccuracyKLinePlotProps) {
  // SVG dimensions
  const svgWidth = 440;
  const svgHeight = 240;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 45;

  // X & Y values bounds
  const kValues = comparisons.map(c => c.k);
  const minK = Math.min(...kValues);
  const maxK = Math.max(...kValues);

  const accuracies = comparisons.map(c => c.accuracy);
  const minAcc = Math.max(0, Math.min(...accuracies) - 0.05); // slightly below min, at least 0
  const maxAcc = Math.min(1.0, Math.max(...accuracies) + 0.03); // slightly above max, at max 100%

  // Project coordinates
  const projectX = (k: number) => {
    return paddingLeft + ((k - minK) / (maxK - minK)) * (svgWidth - paddingLeft - paddingRight);
  };

  const projectY = (acc: number) => {
    return svgHeight - paddingBottom - ((acc - minAcc) / (maxAcc - minAcc)) * (svgHeight - paddingTop - paddingBottom);
  };

  // Draw grid lines
  const ticksY = 5;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col h-full" id="accuracy-k-plot-container">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
          Accuracy vs. K-Value
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Observe how the number of neighbors affects validation performance.
        </p>
      </div>

      <div className="relative border border-slate-50 bg-slate-50/50 rounded-lg overflow-hidden flex-1 flex items-center justify-center mt-3">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-h-[220px]">
          {/* Background Shading for Overfitting / Underfitting Zones */}
          {/* Overfitting zone: K=1 to K=2.5 */}
          <rect
            x={projectX(1)}
            y={paddingTop}
            width={projectX(2.2) - projectX(1)}
            height={svgHeight - paddingTop - paddingBottom}
            className="fill-red-500/5"
          />
          {/* Underfitting zone: K=7.5 to K=9 */}
          <rect
            x={projectX(7.5)}
            y={paddingTop}
            width={projectX(9) - projectX(7.5)}
            height={svgHeight - paddingTop - paddingBottom}
            className="fill-amber-500/5"
          />

          {/* Zones texts */}
          <text
            x={(projectX(1) + projectX(2.2)) / 2}
            y={paddingTop + 15}
            className="fill-red-500 font-medium text-[9px]"
            textAnchor="middle"
          >
            Overfitting Risk
          </text>
          <text
            x={(projectX(3) + projectX(7)) / 2}
            y={paddingTop + 15}
            className="fill-emerald-600 font-semibold text-[9px]"
            textAnchor="middle"
          >
            Optimal Sweet Spot
          </text>
          <text
            x={(projectX(7.5) + projectX(maxK)) / 2}
            y={paddingTop + 15}
            className="fill-amber-500 font-medium text-[9px]"
            textAnchor="middle"
          >
            Underfitting Risk
          </text>

          {/* Draw Grid lines for Y-axis (Accuracy) */}
          {Array.from({ length: ticksY }).map((_, i) => {
            const acc = minAcc + (i * (maxAcc - minAcc)) / (ticksY - 1);
            const y = projectY(acc);
            return (
              <g key={`y-grid-${i}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  className="stroke-slate-200 stroke-1"
                  strokeDasharray="2,2"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  className="fill-slate-400 font-mono text-[9px]"
                  textAnchor="end"
                >
                  {(acc * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* Vertical Grid lines for X-axis (K values: 1, 3, 5, 7, 9) */}
          {comparisons.map((c, i) => {
            const x = projectX(c.k);
            return (
              <g key={`x-grid-${i}`}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={svgHeight - paddingBottom}
                  className="stroke-slate-200 stroke-1"
                  strokeDasharray="2,2"
                />
                <text
                  x={x}
                  y={svgHeight - paddingBottom + 15}
                  className="fill-slate-500 font-mono text-[9px] font-semibold"
                  textAnchor="middle"
                >
                  K={c.k}
                </text>
              </g>
            );
          })}

          {/* Active K vertical dashed highlight line */}
          {kValues.includes(activeK) && (
            <line
              x1={projectX(activeK)}
              y1={paddingTop}
              x2={projectX(activeK)}
              y2={svgHeight - paddingBottom}
              className="stroke-indigo-500 stroke-1.5"
              strokeDasharray="4,4"
            />
          )}

          {/* Line Connecting Coordinates */}
          <path
            d={comparisons
              .map((c, i) => `${i === 0 ? "M" : "L"}${projectX(c.k)},${projectY(c.accuracy)}`)
              .join(" ")}
            className="fill-none stroke-indigo-600 stroke-2.5"
          />

          {/* Data Nodes (Circles) */}
          {comparisons.map((c, i) => {
            const cx = projectX(c.k);
            const cy = projectY(c.accuracy);
            const isActive = c.k === activeK;

            return (
              <g key={`node-${i}`}>
                {isActive && (
                  <circle cx={cx} cy={cy} r={9} className="fill-indigo-500/20 stroke-indigo-400 animate-ping" />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 6.5 : 4.5}
                  className={`${isActive ? "fill-indigo-600 stroke-slate-900 stroke-2" : "fill-white stroke-indigo-500 stroke-2 hover:fill-indigo-50 cursor-pointer"} transition-all duration-300`}
                >
                  <title>
                    Neighbors: K={c.k}&#10;Testing Accuracy: {(c.accuracy * 100).toFixed(2)}%
                  </title>
                </circle>
                {/* Accuracy percentage values floating above circles */}
                <text
                  x={cx}
                  y={cy - (isActive ? 11 : 9)}
                  className={`font-mono text-[8.5px] font-bold ${isActive ? "fill-indigo-600" : "fill-slate-500"}`}
                  textAnchor="middle"
                >
                  {(c.accuracy * 100).toFixed(1)}%
                </text>
              </g>
            );
          })}

          {/* X Axis Title */}
          <text
            x={(svgWidth + paddingLeft - paddingRight) / 2}
            y={svgHeight - 8}
            className="fill-slate-400 text-[10px] font-semibold tracking-wider uppercase"
            textAnchor="middle"
          >
            Number of Neighbors (K)
          </text>
        </svg>
      </div>
    </div>
  );
}

import { Sample, FeatureInfo, NeighborInfo } from "../types";
import { useState } from "react";
import { Play } from "lucide-react";

interface FeatureDistributionPlotProps {
  samples: Sample[];
  features: FeatureInfo[];
  classes: string[];
  predictedPoint: number[] | null; // unscaled features
  neighbors: NeighborInfo[];
  means: number[];
  stds: number[];
}

export default function FeatureDistributionPlot({
  samples,
  features,
  classes,
  predictedPoint,
  neighbors,
  means,
  stds
}: FeatureDistributionPlotProps) {
  const [xAxis, setXAxis] = useState<number>(0);
  const [yAxis, setYAxis] = useState<number>(2); // default to petal length or feature 2

  // Get feature boundaries to scale SVG points
  const xFeature = features[xAxis];
  const yFeature = features[yAxis];

  const xMin = xFeature.min - (xFeature.max - xFeature.min) * 0.1;
  const xMax = xFeature.max + (xFeature.max - xFeature.min) * 0.1;
  const yMin = yFeature.min - (yFeature.max - yFeature.min) * 0.1;
  const yMax = yFeature.max + (yFeature.max - yFeature.min) * 0.1;

  // SVG dimensions
  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 50;

  // Coordinate projection helper functions
  const projectX = (val: number) => {
    return padding + ((val - xMin) / (xMax - xMin)) * (svgWidth - padding * 2);
  };

  const projectY = (val: number) => {
    return svgHeight - padding - ((val - yMin) / (yMax - yMin)) * (svgHeight - padding * 2);
  };

  // Color mapping for classes
  const colors = [
    "fill-indigo-500 stroke-indigo-700", // Class 0: Setosa / Malignant
    "fill-cyan-500 stroke-cyan-700",     // Class 1: Versicolor / Benign
    "fill-emerald-500 stroke-emerald-700" // Class 2: Virginica
  ];

  const bgColors = [
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-emerald-500"
  ];

  // Map out grids
  const xTicks = 5;
  const yTicks = 5;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col h-full" id="feature-distribution-plot-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
            2D Feature Scatter Plot
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualize dataset partitions and standard decision domains.
          </p>
        </div>
        
        {/* Dimension Selectors */}
        <div className="flex items-center gap-2 text-xs">
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">X-Axis</label>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(Number(e.target.value))}
              className="mt-1 block w-28 rounded-md border border-slate-200 bg-slate-50 py-1 px-1.5 font-medium text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              {features.map((f, idx) => (
                <option key={`x-opt-${idx}`} value={idx}>
                  {f.name.split(" ")[0]} {f.name.includes("cm") ? "(cm)" : ""}
                </option>
              ))}
            </select>
          </div>
          <span className="text-slate-300 mt-4">vs</span>
          <div>
            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">Y-Axis</label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(Number(e.target.value))}
              className="mt-1 block w-28 rounded-md border border-slate-200 bg-slate-50 py-1 px-1.5 font-medium text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              {features.map((f, idx) => (
                <option key={`y-opt-${idx}`} value={idx}>
                  {f.name.split(" ")[0]} {f.name.includes("cm") ? "(cm)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative border border-slate-100 bg-slate-50 rounded-lg overflow-hidden flex-1 flex items-center justify-center">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-h-[350px]">
          {/* Grid lines */}
          {Array.from({ length: xTicks }).map((_, i) => {
            const val = xMin + (i * (xMax - xMin)) / (xTicks - 1);
            const x = projectX(val);
            return (
              <g key={`grid-x-${i}`}>
                <line
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={svgHeight - padding}
                  className="stroke-slate-200 stroke-1"
                  strokeDasharray="3,3"
                />
                <text
                  x={x}
                  y={svgHeight - padding + 15}
                  className="fill-slate-400 font-mono text-[9px]"
                  textAnchor="middle"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {Array.from({ length: yTicks }).map((_, i) => {
            const val = yMin + (i * (yMax - yMin)) / (yTicks - 1);
            const y = projectY(val);
            return (
              <g key={`grid-y-${i}`}>
                <line
                  x1={padding}
                  y1={y}
                  x2={svgWidth - padding}
                  y2={y}
                  className="stroke-slate-200 stroke-1"
                  strokeDasharray="3,3"
                />
                <text
                  x={padding - 10}
                  y={y + 3}
                  className="fill-slate-400 font-mono text-[9px]"
                  textAnchor="end"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Axes lines */}
          <line
            x1={padding}
            y1={svgHeight - padding}
            x2={svgWidth - padding}
            y2={svgHeight - padding}
            className="stroke-slate-400 stroke-1.5"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={svgHeight - padding}
            className="stroke-slate-400 stroke-1.5"
          />

          {/* Dataset Samples */}
          {samples.map((sample) => {
            const xVal = sample.features[xAxis];
            const yVal = sample.features[yAxis];
            const cx = projectX(xVal);
            const cy = projectY(yVal);

            // Is this sample part of the K nearest neighbors of the custom prediction?
            const isNeighbor = neighbors.some(
              (n) =>
                n.originalFeatures[0] === sample.features[0] &&
                n.originalFeatures[1] === sample.features[1] &&
                n.originalFeatures[2] === sample.features[2] &&
                n.originalFeatures[3] === sample.features[3]
            );

            return (
              <circle
                key={`dot-${sample.id}`}
                cx={cx}
                cy={cy}
                r={isNeighbor ? 7 : 4.5}
                className={`${colors[sample.target]} stroke-1.5 transition-all duration-300 ${
                  isNeighbor ? "stroke-slate-900 stroke-2 ring-4 ring-orange-400 ring-offset-2 animate-pulse" : "opacity-85 hover:opacity-100 cursor-pointer"
                }`}
              >
                <title>
                  Actual Class: {classes[sample.target]}
                  &#10;{features[xAxis].name}: {xVal}
                  &#10;{features[yAxis].name}: {yVal}
                </title>
              </circle>
            );
          })}

          {/* Dotted lines from predicted point to its K neighbors */}
          {predictedPoint &&
            neighbors.map((neighbor, idx) => {
              const startX = projectX(predictedPoint[xAxis]);
              const startY = projectY(predictedPoint[yAxis]);
              const endX = projectX(neighbor.originalFeatures[xAxis]);
              const endY = projectY(neighbor.originalFeatures[yAxis]);

              return (
                <line
                  key={`neighbor-line-${idx}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  className="stroke-amber-500 stroke-1.5 animate-dash"
                  strokeDasharray="4,4"
                />
              );
            })}

          {/* Predicted custom input point */}
          {predictedPoint && (
            <g>
              <circle
                cx={projectX(predictedPoint[xAxis])}
                cy={projectY(predictedPoint[yAxis])}
                r={12}
                className="fill-amber-400/30 stroke-amber-500 stroke-1 animate-ping"
              />
              {/* Gold Star */}
              <path
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                transform={`translate(${projectX(predictedPoint[xAxis]) - 12}, ${
                  projectY(predictedPoint[yAxis]) - 12
                }) scale(1.1)`}
                className="fill-amber-400 stroke-amber-600 stroke-1.5 shadow-md drop-shadow"
              >
                <title>
                  Your Input Feature Point
                  &#10;{features[xAxis].name}: {predictedPoint[xAxis]}
                  &#10;{features[yAxis].name}: {predictedPoint[yAxis]}
                </title>
              </path>
            </g>
          )}

          {/* X Axis Label */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 10}
            className="fill-slate-500 text-xs font-medium"
            textAnchor="middle"
          >
            {xFeature.name}
          </text>

          {/* Y Axis Label */}
          <text
            transform={`rotate(-90 ${15} ${svgHeight / 2})`}
            x={15}
            y={svgHeight / 2}
            className="fill-slate-500 text-xs font-medium"
            textAnchor="middle"
          >
            {yFeature.name}
          </text>
        </svg>

        {/* Dynamic Legend floating */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-2 bg-white/95 backdrop-blur border border-slate-100 p-2 rounded-md shadow-sm">
          {classes.map((c, idx) => (
            <div key={`legend-${idx}`} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${bgColors[idx]}`}></span>
              <span className="text-[10px] font-semibold text-slate-600">{c.split(" (")[0]}</span>
            </div>
          ))}
          {predictedPoint && (
            <div className="flex items-center gap-1 border-l pl-2 border-slate-200">
              <span className="text-amber-500 text-[10px] font-bold">★ Custom Input</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

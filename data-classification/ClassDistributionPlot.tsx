import { Sample } from "../types";

interface ClassDistributionPlotProps {
  samples: Sample[];
  classes: string[];
}

export default function ClassDistributionPlot({ samples, classes }: ClassDistributionPlotProps) {
  const total = samples.length;

  // Calculate distributions
  const distributions = classes.map((cName, idx) => {
    const count = samples.filter(s => s.target === idx).length;
    const percentage = (count / total) * 100;
    return { name: cName.split(" (")[0], count, percentage };
  });

  const colors = ["bg-indigo-500", "bg-cyan-500", "bg-emerald-500"];
  const textColors = ["text-indigo-600", "text-cyan-600", "text-emerald-600"];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col h-full" id="class-distribution-container">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
          Target Class Balance
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Check class distribution to verify balance.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-4 mt-4">
        {distributions.map((dist, idx) => (
          <div key={`dist-bar-${idx}`} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">{dist.name}</span>
              <span className="font-mono text-slate-500">
                <strong className={textColors[idx]}>{dist.count}</strong> / {total} samples ({dist.percentage.toFixed(1)}%)
              </span>
            </div>
            
            {/* Custom Progress Bar */}
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 flex">
              <div
                style={{ width: `${dist.percentage}%` }}
                className={`h-full ${colors[idx]} rounded-full transition-all duration-500`}
              ></div>
            </div>
          </div>
        ))}

        <div className="text-[10px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2">
          <span className="font-semibold text-slate-700">💡 Educational Note:</span> Balanced classes (e.g. equal distribution) ensure the classifier is trained equally. Imbalanced classes lead to bias, where the model gets high accuracy simply by guessing the majority class!
        </div>
      </div>
    </div>
  );
}

import { Check } from "lucide-react";

export default function ChipSelect({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const isActive = selected.includes(opt.id);
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(opt.id)}
            className={`group relative inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
              isActive
                ? "border-signal-400 bg-signal-400/15 text-signal-400 shadow-sm shadow-signal-400/20"
                : "border-charcoal-700/80 bg-charcoal-900/70 text-bone-300 hover:border-charcoal-600 hover:text-bone-100 hover:bg-charcoal-800/80"
            }`}
          >
            <Icon
              size={16}
              className={`transition-colors ${
                isActive ? "text-signal-400" : "text-bone-500 group-hover:text-bone-300"
              }`}
            />
            <span>{opt.label}</span>
            {isActive && <Check size={14} className="text-signal-400 shrink-0 ml-0.5" />}
          </button>
        );
      })}
    </div>
  );
}

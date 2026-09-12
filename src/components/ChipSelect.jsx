import { Check } from "lucide-react";

export default function ChipSelect({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt.id);
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(opt.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
              isActive
                ? "bg-signal-400 text-charcoal-950 shadow-[0_0_15px_rgba(255,207,37,0.4)] border border-signal-300 font-bold"
                : "ios-glass-pill text-bone-300 hover:text-bone-100 hover:border-white/20"
            }`}
          >
            <Icon
              size={13}
              className={`shrink-0 ${
                isActive ? "text-charcoal-950" : "text-signal-400"
              }`}
            />
            <span>{opt.label}</span>
            {isActive && <Check size={13} className="text-charcoal-950 shrink-0 stroke-[3]" />}
          </button>
        );
      })}
    </div>
  );
}

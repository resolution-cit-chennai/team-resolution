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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold transition-all duration-100 cursor-pointer ${
              isActive
                ? "bg-signal-400 text-charcoal-950 border-t border-l border-white border-b-2 border-r-2 border-yellow-700 shadow-sm translate-y-[1px]"
                : "bg-[#22201d] text-bone-300 border-t border-l border-white/20 border-b-2 border-r-2 border-black hover:bg-[#2b2824] hover:text-bone-100"
            }`}
          >
            <Icon
              size={13}
              className={`shrink-0 ${
                isActive ? "text-charcoal-950" : "text-bone-500"
              }`}
            />
            <span>{opt.label}</span>
            {isActive && <Check size={12} className="text-charcoal-950 shrink-0 stroke-[3]" />}
          </button>
        );
      })}
    </div>
  );
}

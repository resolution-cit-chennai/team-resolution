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
            className={`group inline-flex items-center gap-2 rounded-sm border px-3.5 py-2.5 text-sm transition-all duration-150 ${
              isActive
                ? "border-signal-400 bg-signal-400/10 text-signal-400"
                : "border-charcoal-700 bg-charcoal-900/60 text-bone-300 hover:border-charcoal-600 hover:text-bone-100"
            }`}
          >
            <Icon size={16} className={isActive ? "text-signal-400" : "text-bone-500 group-hover:text-bone-300"} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

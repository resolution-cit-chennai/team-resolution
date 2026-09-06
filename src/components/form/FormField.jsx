export default function FormField({ index, label, children, hint }) {
  return (
    <div className="border-t border-charcoal-700/60 py-6 sm:py-7 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        <div className="sm:w-56 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center font-display text-xs font-bold text-signal-400 bg-signal-400/10 border border-signal-400/20 rounded-md px-2 py-0.5">
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-bone-100 font-medium text-sm sm:text-base">{label}</span>
          </div>
          {hint && <p className="mt-1 text-xs text-bone-500 leading-relaxed sm:pr-4">{hint}</p>}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

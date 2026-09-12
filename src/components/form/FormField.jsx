export default function FormField({ index, label, children, hint, required = false }) {
  return (
    <div className="border-t border-charcoal-700/80 py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        <div className="sm:w-52 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center font-tech text-xs font-bold text-signal-400 bg-signal-400/10 border border-signal-400/30 px-1.5 py-0.5">
              [{String(index).padStart(2, "0")}]
            </span>
            <span className="text-bone-100 font-tech font-bold text-sm">
              {label}
              {required && <span className="text-signal-400 ml-1 font-bold" title="Required">*</span>}
            </span>
          </div>
          {hint && <p className="mt-0.5 text-[11px] font-tech text-bone-500 leading-normal sm:pr-2">{hint}</p>}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

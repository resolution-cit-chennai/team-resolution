export default function FormField({ index, label, children, hint, required = false }) {
  return (
    <div className="border-t border-white/10 py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        <div className="sm:w-52 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center font-mono text-[11px] font-bold text-signal-400 bg-signal-400/10 border border-signal-400/30 px-2 py-0.5 rounded-full">
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-bone-100 font-sans font-semibold text-sm">
              {label}
              {required && <span className="text-signal-400 ml-1 font-bold" title="Required">*</span>}
            </span>
          </div>
          {hint && <p className="mt-1 text-[11px] font-sans text-bone-400 leading-normal sm:pr-2">{hint}</p>}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

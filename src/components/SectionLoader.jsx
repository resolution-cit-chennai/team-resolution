import { Loader2 } from "lucide-react";

export default function SectionLoader({ label = "Loading section..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] w-full px-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-signal-400/10 border border-signal-400/30 text-signal-400 mb-4 animate-pulse">
        <Loader2 size={24} className="animate-spin text-signal-400" />
      </div>
      <p className="text-xs sm:text-sm font-medium tracking-wider text-bone-300 uppercase">
        {label}
      </p>
    </div>
  );
}

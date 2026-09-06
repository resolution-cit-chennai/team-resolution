import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link2, AlertCircle, Loader2, Send } from "lucide-react";
import ChipSelect from "./ChipSelect";
import FormField from "./form/FormField";
import ApplicationSuccess from "./form/ApplicationSuccess";
import { DEPARTMENTS, SOFTWARE_OPTIONS, EQUIPMENT_OPTIONS } from "../data/options";
import { submitApplication } from "../lib/submitApplication";
import { validateEmail } from "../lib/validateEmail";

const initialState = {
  name: "",
  department: "",
  email: "",
  registerNumber: "",
  mobile: "",
  reason: "",
  workLink: "",
  software: [],
  equipment: [],
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleIn = (key) => (id) =>
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.department || !form.mobile.trim() || !form.workLink.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your Full Name, Department, Mobile Number, and Portfolio Link before submitting.");
      return;
    }

    // Validate email against test, xxx, dummy, and disposable patterns
    if (form.email && form.email.trim()) {
      const emailCheck = validateEmail(form.email);
      if (!emailCheck.valid) {
        setStatus("error");
        setErrorMsg(emailCheck.error);
        return;
      }
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      await submitApplication(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      const rawMsg = err?.message || "";
      // Strip any status codes (e.g., 404, 500, Status: 404) so raw HTTP codes never show in the UI
      const cleanMsg = rawMsg
        .replace(/\s*\(?status(?:\s*code)?:\s*\d+[^)]*\)?/gi, "")
        .replace(/\s*\(?http\s*\d+[^)]*\)?/gi, "")
        .replace(/\b[45]\d{2}\b/g, "")
        .trim();
      setErrorMsg(cleanMsg || "Something went wrong while submitting your application. Please try again.");
    }
  };

  const handleRedirectHome = useCallback(() => {
    setForm(initialState);
    setStatus("idle");
    const topEl = document.getElementById("top");
    if (topEl) {
      topEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (status === "success") {
    return <ApplicationSuccess onRedirectHome={handleRedirectHome} />;
  }

  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-8 py-12 sm:py-20">
      {/* Glow highlight behind form */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[550px] h-[550px] ambient-glow-1 blur-3xl opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-3.5 py-1 text-xs font-semibold text-signal-400 mb-3">
          RECRUITMENT 2026
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-bone-100 tracking-tight">
          Application Form
        </h2>
        <p className="mt-4 text-bone-300 text-base leading-relaxed max-w-lg">
          We’re looking for creative minds who think differently, bring fresh ideas, and can turn vision into reality. Fill in your details below.
        </p>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className="relative mt-8 rounded-2xl glass-card p-6 sm:p-10 shadow-2xl border border-bone-100/10"
      >
        <FormField index={1} label="Full Name" required>
          <input
            className="form-input"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. James Bond"
            required
          />
        </FormField>

        <FormField index={2} label="Department" required>
          <select
            className="form-input cursor-pointer"
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            required
          >
            <option value="" disabled>
              Select your department
            </option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d} className="bg-charcoal-900 text-bone-100">
                {d}
              </option>
            ))}
          </select>
        </FormField>

        <FormField index={3} label="Email Address" hint="College Mail ID preferred">
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Enter your mail id"
          />
        </FormField>

        <FormField index={4} label="Register Number">
          <input
            className="form-input"
            value={form.registerNumber}
            onChange={(e) => update("registerNumber", e.target.value)}
            placeholder="e.g. 210101001"
          />
        </FormField>

        <FormField index={5} label="Mobile Number" required>
          <input
            type="tel"
            className="form-input"
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            placeholder="10-digit mobile number"
            required
          />
        </FormField>

        <FormField index={6} label="Why join Team Resolution?" hint="A few honest lines on what draws you to the crew.">
          <textarea
            className="form-input min-h-32 resize-y"
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
            placeholder="Tell us what drives your passion and what skills you want to build or share..."
          />
        </FormField>

        <FormField
          index={7}
          label="Showcase Your Work"
          hint="Paste a link to your Instagram, Behance, or Google Drive folder."
          required
        >
          <div className="relative flex items-center">
            <Link2
              size={18}
              className={`absolute left-3.5 pointer-events-none transition-colors ${
                form.workLink ? "text-signal-400" : "text-bone-500"
              }`}
            />
            <input
              type="text"
              className="form-input form-input-has-icon"
              value={form.workLink}
              onChange={(e) => update("workLink", e.target.value)}
              placeholder="Instagram, Behance, or Google Drive link"
              required
            />
          </div>
        </FormField>

        <FormField index={8} label="Softwares You Know" hint="Select all tools you have experience with.">
          <ChipSelect options={SOFTWARE_OPTIONS} selected={form.software} onToggle={toggleIn("software")} />
        </FormField>

        <FormField index={9} label="Equipment You Own" hint="Select any gear you bring to the team.">
          <ChipSelect options={EQUIPMENT_OPTIONS} selected={form.equipment} onToggle={toggleIn("equipment")} />
        </FormField>

        {status === "error" && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 shadow-sm">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary mt-8 w-full sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin text-charcoal-950" />
              <span>Submitting Application…</span>
            </>
          ) : (
            <>
              <span>Submit Application</span>
              <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, AlertCircle, Loader2, Send, Zap, FileText } from "lucide-react";
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
      const cleanMsg = rawMsg
        .replace(/\s*\(?status(?:\s*code)?:\s*\d+[^)]*\)?/gi, "")
        .replace(/\s*\(?http\s*\d+[^)]*\)?/gi, "")
        .replace(/\b[45]\d{2}\b/g, "")
        .trim();
      setErrorMsg(cleanMsg || "Something went wrong while submitting your application. Please try again.");
    }
  };

  if (status === "success") {
    return <ApplicationSuccess />;
  }

  return (
    <section className="relative mx-auto max-w-4xl px-3 sm:px-6 py-10 sm:py-16">
      
      {/* iOS Glass Application Card */}
      <div className="ios-glass-card rounded-[2.5rem] p-5 sm:p-10 relative overflow-hidden">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal-400/15 border border-signal-400/30 text-signal-400 text-xs font-tech font-bold mb-2">
              <FileText size={13} />
              <span>RECRUITMENT ACTIVE // CIT MEDIA CREW</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-bone-100 uppercase tracking-tight">
              Application Form
            </h2>
            <p className="text-xs sm:text-sm font-sans text-bone-300 mt-1 max-w-xl">
              Fill in your candidate details, experience level, and showcase portfolio link.
            </p>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="font-mono text-xs font-bold text-signal-400 block bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              * Required Fields
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-1">
          
          <FormField index={1} label="Full Name" required>
            <input
              className="form-input"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Alex Mercer"
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
              <option value="" disabled className="bg-[#0b0a09] text-bone-500">
                -- Select your department --
              </option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d} className="bg-[#171614] text-bone-100">
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
              placeholder="e.g. yourname.cit@chennaiinstituteoftechnology.net"
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
              className="form-input min-h-28 resize-y rounded-2xl"
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
                size={16}
                className={`absolute left-3.5 pointer-events-none ${
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
            <div className="mt-5 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 backdrop-blur-md flex items-start gap-2.5 text-xs font-sans text-red-200">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Bottom Control Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-bone-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Encryption Active // Ready to Submit</span>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full sm:w-auto py-3.5 px-8 rounded-full text-xs font-bold tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin text-charcoal-950" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>SUBMIT APPLICATION</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Link2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import ChipSelect from "./ChipSelect";
import { DEPARTMENTS, SOFTWARE_OPTIONS, EQUIPMENT_OPTIONS } from "../data/options";
import { submitApplication } from "../lib/submitApplication";

const initialState = {
  name: "",
  department: "",
  email: "",
  registerNumber: "",
  mobile: "",
  reason: "",
  workLink: "",
  file: null,
  software: [],
  equipment: [],
};

function Field({ index, label, children, hint }) {
  return (
    <div className="border-t border-charcoal-700 py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <div className="sm:w-56 shrink-0">
          <span className="font-display text-signal-400 text-sm mr-2 align-top">
            {String(index).padStart(2, "0")}
          </span>
          <span className="text-bone-100 font-medium">{label}</span>
          {hint && <p className="mt-1 text-xs text-bone-500 sm:pr-4">{hint}</p>}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

const inputClasses =
  "w-full rounded-sm border border-charcoal-700 bg-charcoal-900/60 px-3.5 py-2.5 text-sm text-bone-100 placeholder:text-bone-500 outline-none focus:border-signal-400 transition-colors";

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
    if (!form.name || !form.department || !form.email || !form.registerNumber || !form.mobile || !form.reason) {
      setStatus("error");
      setErrorMsg("Fill in every required field before submitting.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitApplication(form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Try again.");
    }
  };

  if (status === "success") {
    return (
      <section id="apply" className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-signal-400" size={40} />
        <h2 className="font-display text-3xl text-bone-100">Application received</h2>
        <p className="mt-3 text-bone-300">
          Thanks for your interest in joining Team Resolution. Our Team will reach out to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm text-signal-400 hover:underline underline-offset-4"
        >
          Submit another application
        </button>
      </section>
    );
  }

  return (
    <section id="apply" className="relative mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-signal-400 mb-2">Apply now</p>
        <h2 className="font-display text-4xl sm:text-5xl text-bone-100">Application form</h2>
        <p className="mt-4 text-bone-300 max-w-lg">
          We’re looking for creative people who think differently, bring fresh ideas, and can turn those ideas into something real. Just be yourself and show us what you can do.

        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-12 rounded-sm border border-charcoal-700 bg-charcoal-800/40 p-5 sm:p-8">
        <Field index={1} label="Name">
          <input
            className={inputClasses}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            required
          />
        </Field>

        <Field index={2} label="Department">
          <select
            className={inputClasses}
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            required
          >
            <option value="" disabled>
              Select your department
            </option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <Field index={3} label="Email (College Mail Id if given)">
          <input
            className={inputClasses}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Your college mail id"
            required
          />
        </Field>

        <Field index={4} label="Register number">
          <input
            className={inputClasses}
            value={form.registerNumber}
            onChange={(e) => update("registerNumber", e.target.value)}
            placeholder="Your register / roll number"
            required
          />
        </Field>

        <Field index={5} label="Mobile number">
          <input
            type="tel"
            className={inputClasses}
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            placeholder="10-digit mobile number"
            required
          />
        </Field>

        <Field index={6} label="Why join Team Resolution?" hint="A few honest lines is enough.">
          <textarea
            className={`${inputClasses} min-h-28 resize-y`}
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
            placeholder="What draws you to the crew, and what do you want to work on?"
            required
          />
        </Field>

        <Field
          index={7}
          label="Upload your work (Max 100MB)"
          hint="Link to Drive / YouTube / Behance / Instagram — either works."
        >
          <div className="space-y-3">
            <label className="flex items-center gap-2.5 rounded-sm border border-dashed border-charcoal-700 px-3.5 py-3 text-sm text-bone-300 cursor-pointer hover:border-signal-400 transition-colors">
              <Paperclip size={16} className="text-bone-500 shrink-0" />
              <span className="truncate">{form.file ? form.file.name : "Attach a file (optional)"}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => update("file", e.target.files?.[0] ?? null)}
              />
            </label>
            <div className="relative">
              <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-500" />
              <input
                className={`${inputClasses} pl-10`}
                value={form.workLink}
                onChange={(e) => update("workLink", e.target.value)}
                placeholder="https://... (optional)"
              />
            </div>
          </div>
        </Field>

        <Field index={8} label="Softwares you know" hint="Select all that apply.">
          <ChipSelect options={SOFTWARE_OPTIONS} selected={form.software} onToggle={toggleIn("software")} />
        </Field>

        <Field index={9} label="What equipment do you have?" hint="Select all that apply.">
          <ChipSelect options={EQUIPMENT_OPTIONS} selected={form.equipment} onToggle={toggleIn("equipment")} />
        </Field>

        {status === "error" && (
          <div className="mt-6 flex items-start gap-2 rounded-sm border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-sm text-red-300">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-signal-400 px-6 py-3 text-sm font-semibold text-charcoal-950 hover:bg-signal-500 transition-colors disabled:opacity-60"
        >
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          {status === "loading" ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </section>
  );
}

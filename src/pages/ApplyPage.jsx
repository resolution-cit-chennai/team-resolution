import ApplicationForm from "../components/ApplicationForm";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyPage({ onNavigateHome }) {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Top Navigation Bar Link */}
      <div className="mx-auto max-w-4xl px-4 sm:px-8 mb-4">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onNavigateHome}
          className="btn-secondary text-xs sm:text-sm py-2 px-4"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </motion.button>
      </div>

      <ApplicationForm onNavigateHome={onNavigateHome} />
    </div>
  );
}

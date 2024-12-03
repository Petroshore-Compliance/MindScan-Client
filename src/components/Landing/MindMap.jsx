import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MindMap = () => {
  const { t } = useTranslation();

  const steps = t("landing.mind_map.steps", { returnObjects: true });
  const header = t("landing.mind_map.header", { returnObjects: true });
  const finalSection = t("landing.mind_map.final_section", { returnObjects: true });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 text-zinc-800 dark:text-zinc-200">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
          {header.title}
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
          {header.subtitle}
        </p>
      </motion.div>

      {/* Desktop View */}
      <div className="hidden sm:block relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-indigo-200 dark:bg-indigo-800 -translate-x-1/2 -z-10" />

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={[index]}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-1/2">
                <div className="p-6 bg-zinc-100 dark:bg-zinc-800 border-2 border-indigo-300 dark:border-indigo-900 rounded-3xl shadow-sm">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                    {step.title}
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {step.description}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-indigo-600 rounded-full relative z-10" />
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="relative flex flex-col items-center">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-indigo-200 dark:bg-indigo-800 -translate-x-1/2 -z-10" />

          {/* Steps */}
          <div className="space-y-8 w-full max-w-sm">
            {steps.map((step, index) => (
              <motion.div
                key={[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-4 h-4 bg-indigo-600 rounded-full mb-4 z-10" />
                <div className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 border-2 border-indigo-300 dark:border-indigo-900 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mt-8 sm:mt-16"
      >
        <div className="p-4 sm:p-6 bg-zinc-100 dark:bg-zinc-800 border-2 border-indigo-300 dark:border-indigo-900 rounded-3xl shadow-sm relative z-10">
          <p className="text-base sm:text-xl text-zinc-700 dark:text-zinc-300">
            {finalSection.text}
          </p>
          <a
            href="/register"
            className="inline-block mt-4 bg-indigo-600 bg-opacity-70 hover:bg-opacity-100 text-white py-2 px-6 text-lg sm:text-xl font-semibold rounded-full transition-colors duration-500"
          >
            {finalSection.cta}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default MindMap;
import React from "react";

const steps = ["Postcode", "Waste Type", "Skip Size", "Permit", "Date", "Payment"];

export default function ProgressBar({ currentStep = 2 }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 text-sm mb-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            index < currentStep
              ? "bg-green-100 text-green-700"
              : index === currentStep
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
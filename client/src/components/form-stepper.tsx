import { Check } from "lucide-react";

interface FormStepperProps {
  currentStep: number;
}

export default function FormStepper({ currentStep }: FormStepperProps) {
  const steps = [
    { number: 1, title: "Personal Information", subtitle: "Basic details" },
    { number: 2, title: "Insurance Details", subtitle: "Current coverage" },
    { number: 3, title: "Medical Information", subtitle: "Health details" },
    { number: 4, title: "Summary", subtitle: "Review & submit" },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-8 w-full">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.number === currentStep
                      ? "bg-medical-blue text-white"
                      : step.number < currentStep
                      ? "bg-medical-success text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      step.number === currentStep
                        ? "text-medical-blue"
                        : step.number < currentStep
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`text-xs ${
                      step.number <= currentStep ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
                    <div
                      className={`h-full absolute left-0 ${
                        step.number < currentStep ? "bg-medical-success" : "bg-gray-300"
                      }`}
                      style={{ width: step.number < currentStep ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

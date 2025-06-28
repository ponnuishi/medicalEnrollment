import { useState } from "react";
import { Shield } from "lucide-react";
import FormStepper from "@/components/form-stepper";
import PersonalInfoForm from "@/components/personal-info-form";
import InsuranceDetailsForm from "@/components/insurance-details-form";
import MedicalInfoForm from "@/components/medical-info-form";
import SummaryPage from "@/components/summary-page";
import { FormData } from "@/lib/form-utils";

export default function InsuranceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {},
    insuranceInfo: {},
    medicalInfo: {},
  });

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData('personalInfo', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <InsuranceDetailsForm
            data={formData.insuranceInfo}
            onUpdate={(data) => updateFormData('insuranceInfo', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <MedicalInfoForm
            data={formData.medicalInfo}
            onUpdate={(data) => updateFormData('medicalInfo', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <SummaryPage
            formData={formData}
            onEdit={goToStep}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                <Shield className="text-white text-lg" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">HealthCare Plus</h1>
                <p className="text-sm text-gray-600">Insurance Application</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Application ID: <span className="font-medium">INS-2024-001</span>
              </p>
              <p className="text-xs text-gray-500">
                Started: <span>{new Date().toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <FormStepper currentStep={currentStep} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderCurrentStep()}
      </main>
    </div>
  );
}

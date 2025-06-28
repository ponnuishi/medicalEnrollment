import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Edit, Send, FileText, CheckCircle } from "lucide-react";
import { FormData } from "@/lib/form-utils";
import { LocalStorage } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";

interface SummaryPageProps {
  formData: FormData;
  onEdit: (step: number) => void;
  onPrev: () => void;
}

export default function SummaryPage({ formData, onEdit, onPrev }: SummaryPageProps) {
  const [consent, setConsent] = useState(false);
  const [hipaaConsent, setHipaaConsent] = useState(false);
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitToStorage = async () => {
    setIsSubmitting(true);
    
    try {
      const applicationData = {
        applicationId: `INS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        
        // Personal Information
        firstName: formData.personalInfo.firstName || "",
        lastName: formData.personalInfo.lastName || "",
        dateOfBirth: formData.personalInfo.dateOfBirth || "",
        gender: formData.personalInfo.gender || "male",
        email: formData.personalInfo.email || "",
        phone: formData.personalInfo.phone || "",
        address: formData.personalInfo.address || "",
        city: formData.personalInfo.city || "",
        state: formData.personalInfo.state || "",
        zipCode: formData.personalInfo.zipCode || "",
        ssn: formData.personalInfo.ssn || "",
        
        // Insurance Details
        insuranceProvider: formData.insuranceInfo.insuranceProvider || "",
        policyNumber: formData.insuranceInfo.policyNumber || "",
        coverageType: formData.insuranceInfo.coverageType || "individual",
        effectiveDate: formData.insuranceInfo.effectiveDate || "",
        expirationDate: formData.insuranceInfo.expirationDate,
        monthlyPremium: formData.insuranceInfo.monthlyPremium,
        deductible: formData.insuranceInfo.deductible,
        benefits: formData.insuranceInfo.benefits || [],
        
        // Medical Information
        physicianName: formData.medicalInfo.physicianName,
        physicianPhone: formData.medicalInfo.physicianPhone,
        clinicName: formData.medicalInfo.clinicName,
        hasChronicConditions: formData.medicalInfo.hasChronicConditions === "yes",
        chronicConditionsList: formData.medicalInfo.chronicConditionsList,
        takingMedications: formData.medicalInfo.takingMedications === "yes",
        medications: formData.medicalInfo.medications || [],
        hasAllergies: formData.medicalInfo.hasAllergies === "yes",
        allergiesList: formData.medicalInfo.allergiesList,
        emergencyContactName: formData.medicalInfo.emergencyContactName || "",
        emergencyContactPhone: formData.medicalInfo.emergencyContactPhone || "",
        emergencyContactRelationship: formData.medicalInfo.emergencyContactRelationship || "spouse",
        
        status: "submitted",
        submittedAt: new Date().toISOString(),
      };

      const savedId = LocalStorage.saveApplication(applicationData);
      
      toast({
        title: "Application Submitted",
        description: `Your insurance application has been saved successfully. Reference ID: ${savedId}`,
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error saving your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!consent || !hipaaConsent) {
      toast({
        title: "Consent Required",
        description: "Please check both consent boxes before submitting.",
        variant: "destructive",
      });
      return;
    }
    handleSubmitToStorage();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Application Summary</h2>
          <p className="text-gray-600">Please review all information before submitting your application.</p>
        </div>

        {/* Personal Information Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-medical-blue hover:text-medical-dark text-sm font-medium flex items-center print-hidden"
            >
              <Edit className="mr-1" size={16} />
              Edit
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Name</h4>
                <p className="text-gray-900">
                  {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Date of Birth</h4>
                <p className="text-gray-900">
                  {formData.personalInfo.dateOfBirth ? new Date(formData.personalInfo.dateOfBirth).toLocaleDateString() : "Not provided"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email</h4>
                <p className="text-gray-900">{formData.personalInfo.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Phone</h4>
                <p className="text-gray-900">{formData.personalInfo.phone}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Address</h4>
                <p className="text-gray-900">
                  {formData.personalInfo.address}, {formData.personalInfo.city}, {formData.personalInfo.state} {formData.personalInfo.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Information Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Current Insurance Details</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-medical-blue hover:text-medical-dark text-sm font-medium flex items-center print-hidden"
            >
              <Edit className="mr-1" size={16} />
              Edit
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Insurance Provider</h4>
                <p className="text-gray-900">{formData.insuranceInfo.insuranceProvider}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Policy Number</h4>
                <p className="text-gray-900">{formData.insuranceInfo.policyNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Coverage Type</h4>
                <p className="text-gray-900 capitalize">{formData.insuranceInfo.coverageType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Effective Date</h4>
                <p className="text-gray-900">
                  {formData.insuranceInfo.effectiveDate ? new Date(formData.insuranceInfo.effectiveDate).toLocaleDateString() : "Not provided"}
                </p>
              </div>
              {formData.insuranceInfo.monthlyPremium && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Monthly Premium</h4>
                  <p className="text-gray-900">${formData.insuranceInfo.monthlyPremium}</p>
                </div>
              )}
              {formData.insuranceInfo.deductible && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Annual Deductible</h4>
                  <p className="text-gray-900">${formData.insuranceInfo.deductible}</p>
                </div>
              )}
            </div>
            {formData.insuranceInfo.benefits && formData.insuranceInfo.benefits.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Coverage Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.insuranceInfo.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {benefit.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Medical Information Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Medical Information</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              className="text-medical-blue hover:text-medical-dark text-sm font-medium flex items-center print-hidden"
            >
              <Edit className="mr-1" size={16} />
              Edit
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.medicalInfo.physicianName && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Care Physician</h4>
                  <p className="text-gray-900">{formData.medicalInfo.physicianName}</p>
                </div>
              )}
              {formData.medicalInfo.clinicName && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Clinic</h4>
                  <p className="text-gray-900">{formData.medicalInfo.clinicName}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Chronic Conditions</h4>
                <p className="text-gray-900 capitalize">{formData.medicalInfo.hasChronicConditions}</p>
                {formData.medicalInfo.hasChronicConditions === "yes" && formData.medicalInfo.chronicConditionsList && (
                  <p className="text-sm text-gray-600 mt-1">{formData.medicalInfo.chronicConditionsList}</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Medications</h4>
                <p className="text-gray-900 capitalize">{formData.medicalInfo.takingMedications}</p>
                {formData.medicalInfo.takingMedications === "yes" && formData.medicalInfo.medications && formData.medicalInfo.medications.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.medicalInfo.medications.map((med, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {med.name} - {med.dosage} ({med.frequency})
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Known Allergies</h4>
                <p className="text-gray-900 capitalize">{formData.medicalInfo.hasAllergies}</p>
                {formData.medicalInfo.hasAllergies === "yes" && formData.medicalInfo.allergiesList && (
                  <p className="text-sm text-gray-600 mt-1">{formData.medicalInfo.allergiesList}</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Emergency Contact</h4>
                <p className="text-gray-900">
                  {formData.medicalInfo.emergencyContactName} ({formData.medicalInfo.emergencyContactRelationship})
                </p>
                <p className="text-sm text-gray-600">{formData.medicalInfo.emergencyContactPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Consent and Submission */}
        <div className="border-t border-gray-200 pt-8 print-hidden">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
              />
              <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
                I certify that the information provided in this application is true and complete to the best of my knowledge.
                I understand that any false statements may result in denial of coverage or cancellation of my policy.
              </label>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="hipaaConsent"
                checked={hipaaConsent}
                onCheckedChange={(checked) => setHipaaConsent(checked === true)}
              />
              <label htmlFor="hipaaConsent" className="text-sm text-gray-700 leading-relaxed">
                I authorize the use and disclosure of my protected health information as described in the 
                <span className="text-medical-blue hover:underline cursor-pointer ml-1">HIPAA Notice of Privacy Practices</span>.
              </label>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium print-hidden"
          >
            <ChevronLeft className="mr-2" size={16} />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              type="button"
              onClick={handlePrint}
              variant="outline"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium print-hidden"
            >
              <FileText className="mr-2" size={16} />
              Print Summary
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!consent || !hipaaConsent || isSubmitting}
              className="inline-flex items-center px-8 py-3 bg-medical-success text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed print-hidden"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="mr-2" size={16} />
                  Application Submitted
                </>
              ) : (
                <>
                  <Send className="mr-2" size={16} />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

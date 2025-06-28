export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer-not-to-say";
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  ssn?: string;
}

export interface InsuranceInfo {
  insuranceProvider?: string;
  policyNumber?: string;
  coverageType?: "individual" | "family";
  effectiveDate?: string;
  expirationDate?: string;
  monthlyPremium?: string;
  deductible?: string;
  benefits?: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface MedicalInfo {
  physicianName?: string;
  physicianPhone?: string;
  clinicName?: string;
  hasChronicConditions?: "yes" | "no";
  chronicConditionsList?: string;
  takingMedications?: "yes" | "no";
  medications?: Medication[];
  hasAllergies?: "yes" | "no";
  allergiesList?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: "spouse" | "parent" | "child" | "sibling" | "friend" | "other";
}

export interface FormData {
  personalInfo: PersonalInfo;
  insuranceInfo: InsuranceInfo;
  medicalInfo: MedicalInfo;
}

export const validateStep = (step: number, formData: FormData): boolean => {
  switch (step) {
    case 1:
      return !!(
        formData.personalInfo.firstName &&
        formData.personalInfo.lastName &&
        formData.personalInfo.dateOfBirth &&
        formData.personalInfo.gender &&
        formData.personalInfo.email &&
        formData.personalInfo.phone &&
        formData.personalInfo.address &&
        formData.personalInfo.city &&
        formData.personalInfo.state &&
        formData.personalInfo.zipCode &&
        formData.personalInfo.ssn
      );
    case 2:
      return !!(
        formData.insuranceInfo.insuranceProvider &&
        formData.insuranceInfo.policyNumber &&
        formData.insuranceInfo.coverageType &&
        formData.insuranceInfo.effectiveDate
      );
    case 3:
      return !!(
        formData.medicalInfo.hasChronicConditions &&
        formData.medicalInfo.takingMedications &&
        formData.medicalInfo.hasAllergies &&
        formData.medicalInfo.emergencyContactName &&
        formData.medicalInfo.emergencyContactPhone &&
        formData.medicalInfo.emergencyContactRelationship
      );
    default:
      return false;
  }
};

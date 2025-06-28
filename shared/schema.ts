import { pgTable, text, serial, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const insuranceApplications = pgTable("insurance_applications", {
  id: serial("id").primaryKey(),
  applicationId: text("application_id").notNull().unique(),
  
  // Personal Information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  ssn: text("ssn").notNull(),
  
  // Insurance Details
  insuranceProvider: text("insurance_provider").notNull(),
  policyNumber: text("policy_number").notNull(),
  coverageType: text("coverage_type").notNull(),
  effectiveDate: text("effective_date").notNull(),
  expirationDate: text("expiration_date"),
  monthlyPremium: decimal("monthly_premium", { precision: 10, scale: 2 }),
  deductible: decimal("deductible", { precision: 10, scale: 2 }),
  benefits: jsonb("benefits").$type<string[]>(),
  
  // Medical Information
  physicianName: text("physician_name"),
  physicianPhone: text("physician_phone"),
  clinicName: text("clinic_name"),
  hasChronicConditions: boolean("has_chronic_conditions").notNull(),
  chronicConditionsList: text("chronic_conditions_list"),
  takingMedications: boolean("taking_medications").notNull(),
  medications: jsonb("medications").$type<Array<{name: string, dosage: string, frequency: string}>>(),
  hasAllergies: boolean("has_allergies").notNull(),
  allergiesList: text("allergies_list"),
  emergencyContactName: text("emergency_contact_name").notNull(),
  emergencyContactPhone: text("emergency_contact_phone").notNull(),
  emergencyContactRelationship: text("emergency_contact_relationship").notNull(),
  
  // Application Status
  status: text("status").notNull().default("draft"),
  submittedAt: text("submitted_at"),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const insertInsuranceApplicationSchema = createInsertSchema(insuranceApplications).omit({
  id: true,
  createdAt: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select your gender"
  }),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Please enter SSN in XXX-XX-XXXX format"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  coverageType: z.enum(["individual", "family"], {
    required_error: "Please select coverage type"
  }),
  effectiveDate: z.string().min(1, "Effective date is required"),
  hasChronicConditions: z.boolean(),
  takingMedications: z.boolean(),
  hasAllergies: z.boolean(),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  emergencyContactRelationship: z.enum(["spouse", "parent", "child", "sibling", "friend", "other"], {
    required_error: "Please select relationship"
  }),
});

export type InsertInsuranceApplication = z.infer<typeof insertInsuranceApplicationSchema>;
export type InsuranceApplication = typeof insuranceApplications.$inferSelect;

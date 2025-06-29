import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
});

const medicalInfoSchema = z.object({
  physicianName: z.string().optional(),
  physicianPhone: z.string().optional(),
  clinicName: z.string().optional(),
  hasChronicConditions: z.enum(["yes", "no"], {
    required_error: "Please select an option"
  }),
  chronicConditionsList: z.string().optional(),
  takingMedications: z.enum(["yes", "no"], {
    required_error: "Please select an option"
  }),
  medications: z.array(medicationSchema).optional(),
  hasAllergies: z.enum(["yes", "no"], {
    required_error: "Please select an option"
  }),
  allergiesList: z.string().optional(),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  emergencyContactRelationship: z.enum(["spouse", "parent", "child", "sibling", "friend", "other"], {
    required_error: "Please select relationship"
  }),
});

type MedicalInfoData = z.infer<typeof medicalInfoSchema>;

interface MedicalInfoFormProps {
  data: Partial<MedicalInfoData>;
  onUpdate: (data: Partial<MedicalInfoData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function MedicalInfoForm({ data, onUpdate, onNext, onPrev }: MedicalInfoFormProps) {
  const form = useForm<MedicalInfoData>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      ...data,
      medications: data.medications || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medications",
  });

  const watchTakingMedications = form.watch("takingMedications");
  const watchHasChronicConditions = form.watch("hasChronicConditions");
  const watchHasAllergies = form.watch("hasAllergies");

  const onSubmit = (formData: MedicalInfoData) => {
    onUpdate(formData);
    onNext();
  };

  const addMedication = () => {
    append({ name: "", dosage: "", frequency: "" });
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Medical Information</h2>
          <p className="text-gray-600">Please provide your medical history and current healthcare information.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Primary Care Physician */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Care Physician</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="physicianName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Physician Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dr. John Smith"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physicianPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Physician Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="clinicName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Clinic/Hospital Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Medical Center Name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Medical History */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
              
              <FormField
                control={form.control}
                name="hasChronicConditions"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Do you have any chronic conditions? <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="chronic-yes" />
                          <label htmlFor="chronic-yes" className="text-sm text-gray-700">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="chronic-no" />
                          <label htmlFor="chronic-no" className="text-sm text-gray-700">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />

              {watchHasChronicConditions === "yes" && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="chronicConditionsList"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Please list your chronic conditions
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe your chronic conditions..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-medical-error" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Current Medications */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Medications</h3>
              
              <FormField
                control={form.control}
                name="takingMedications"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Are you currently taking any medications? <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="meds-yes" />
                          <label htmlFor="meds-yes" className="text-sm text-gray-700">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="meds-no" />
                          <label htmlFor="meds-no" className="text-sm text-gray-700">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />

              {watchTakingMedications === "yes" && (
                <div className="mt-4 space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`medications.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Medication Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Lisinopril"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-medical-error" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`medications.${index}.dosage`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Dosage
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 10mg"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-medical-error" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`medications.${index}.frequency`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Frequency
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors">
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="once-daily">Once daily</SelectItem>
                                  <SelectItem value="twice-daily">Twice daily</SelectItem>
                                  <SelectItem value="three-times-daily">Three times daily</SelectItem>
                                  <SelectItem value="as-needed">As needed</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-medical-error" />
                            </FormItem>
                          )}
                        />
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="mt-2 text-red-600 hover:text-red-800"
                        >
                          <X size={16} className="mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMedication}
                    className="inline-flex items-center px-4 py-2 border border-medical-blue text-medical-blue bg-white rounded-lg hover:bg-medical-blue hover:text-white transition-colors text-sm font-medium"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Another Medication
                  </Button>
                </div>
              )}
            </div>

            {/* Allergies */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Allergies</h3>
              
              <FormField
                control={form.control}
                name="hasAllergies"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Do you have any known allergies? <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="allergies-yes" />
                          <label htmlFor="allergies-yes" className="text-sm text-gray-700">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="allergies-no" />
                          <label htmlFor="allergies-no" className="text-sm text-gray-700">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />

              {watchHasAllergies === "yes" && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="allergiesList"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Please list your allergies and reactions
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe your allergies and any reactions..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-medical-error" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Emergency Contact Name <span className="text-medical-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Emergency Contact Phone <span className="text-medical-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="emergencyContactRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Relationship <span className="text-medical-error">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors">
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <ChevronLeft className="mr-2" size={16} />
                Previous
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Step 3 of 4</p>
              </div>

              <Button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-medical-blue text-white rounded-lg hover:bg-medical-dark transition-colors font-medium"
              >
                Next
                <ChevronRight className="ml-2" size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

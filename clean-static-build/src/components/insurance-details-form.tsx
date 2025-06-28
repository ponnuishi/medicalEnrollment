import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";

const insuranceDetailsSchema = z.object({
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  coverageType: z.enum(["individual", "family"], {
    required_error: "Please select coverage type"
  }),
  effectiveDate: z.string().min(1, "Effective date is required"),
  expirationDate: z.string().optional(),
  monthlyPremium: z.string().optional(),
  deductible: z.string().optional(),
  benefits: z.array(z.string()).optional(),
});

type InsuranceDetailsData = z.infer<typeof insuranceDetailsSchema>;

interface InsuranceDetailsFormProps {
  data: Partial<InsuranceDetailsData>;
  onUpdate: (data: Partial<InsuranceDetailsData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function InsuranceDetailsForm({ data, onUpdate, onNext, onPrev }: InsuranceDetailsFormProps) {
  const form = useForm<InsuranceDetailsData>({
    resolver: zodResolver(insuranceDetailsSchema),
    defaultValues: {
      ...data,
      benefits: data.benefits || [],
    },
  });

  const onSubmit = (formData: InsuranceDetailsData) => {
    onUpdate(formData);
    onNext();
  };

  const benefitOptions = [
    { id: "preventive-care", label: "Preventive Care" },
    { id: "prescription-drugs", label: "Prescription Drug Coverage" },
    { id: "mental-health", label: "Mental Health Services" },
    { id: "emergency-care", label: "Emergency Care" },
    { id: "maternity", label: "Maternity & Newborn Care" },
  ];

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Current Insurance Details</h2>
          <p className="text-gray-600">Please provide information about your existing insurance coverage.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Insurance Provider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="insuranceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Insurance Provider <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Blue Cross Blue Shield"
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
                name="policyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Policy Number <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter policy number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />
            </div>

            {/* Coverage Type */}
            <FormField
              control={form.control}
              name="coverageType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Coverage Type <span className="text-medical-error">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="individual" id="individual" />
                        <div className="flex-1">
                          <label htmlFor="individual" className="font-medium text-gray-900 cursor-pointer">
                            Individual
                          </label>
                          <div className="text-sm text-gray-600">Coverage for yourself only</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="family" id="family" />
                        <div className="flex-1">
                          <label htmlFor="family" className="font-medium text-gray-900 cursor-pointer">
                            Family
                          </label>
                          <div className="text-sm text-gray-600">Coverage for you and family members</div>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-medical-error" />
                </FormItem>
              )}
            />

            {/* Effective Dates */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Coverage Dates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="effectiveDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Coverage Start Date <span className="text-medical-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
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
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Coverage End Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <p className="mt-2 text-sm text-gray-600">Leave blank if coverage is ongoing</p>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Premium Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Premium Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="monthlyPremium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Monthly Premium Amount
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 text-sm">$</span>
                          </div>
                          <Input
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deductible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Annual Deductible
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 text-sm">$</span>
                          </div>
                          <Input
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Coverage Benefits</h3>
              
              <FormField
                control={form.control}
                name="benefits"
                render={() => (
                  <FormItem>
                    <div className="space-y-3">
                      {benefitOptions.map((benefit) => (
                        <FormField
                          key={benefit.id}
                          control={form.control}
                          name="benefits"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={benefit.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(benefit.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value || [], benefit.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== benefit.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm text-gray-700 font-normal">
                                  {benefit.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
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
                <p className="text-sm text-gray-600">Step 2 of 4</p>
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

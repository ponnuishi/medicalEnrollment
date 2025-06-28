import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Lock } from "lucide-react";

const personalInfoSchema = z.object({
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
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  data: Partial<PersonalInfoData>;
  onUpdate: (data: Partial<PersonalInfoData>) => void;
  onNext: () => void;
}

export default function PersonalInfoForm({ data, onUpdate, onNext }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: PersonalInfoData) => {
    onUpdate(formData);
    onNext();
  };

  const states = [
    { value: "CA", label: "California" },
    { value: "NY", label: "New York" },
    { value: "TX", label: "Texas" },
    { value: "FL", label: "Florida" },
    { value: "IL", label: "Illinois" },
    { value: "PA", label: "Pennsylvania" },
    { value: "OH", label: "Ohio" },
    { value: "GA", label: "Georgia" },
    { value: "NC", label: "North Carolina" },
    { value: "MI", label: "Michigan" },
  ];

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600">Please provide your basic personal details to begin your insurance application.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      First Name <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Last Name <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />
            </div>

            {/* Date of Birth and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Date of Birth <span className="text-medical-error">*</span>
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Gender <span className="text-medical-error">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email Address <span className="text-medical-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Phone Number <span className="text-medical-error">*</span>
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
            </div>

            {/* Address */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Street Address <span className="text-medical-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your street address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-medical-error" />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          City <span className="text-medical-error">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          State <span className="text-medical-error">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-medical-error" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          ZIP Code <span className="text-medical-error">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12345"
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
            </div>

            {/* SSN */}
            <div className="border-t border-gray-200 pt-6">
              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Social Security Number <span className="text-medical-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="XXX-XX-XXXX"
                        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <p className="mt-2 text-sm text-gray-600 flex items-center">
                      <Lock className="mr-1" size={16} />
                      Your SSN is encrypted and securely stored
                    </p>
                    <FormMessage className="text-medical-error" />
                  </FormItem>
                )}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
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

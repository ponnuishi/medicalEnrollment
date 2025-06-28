import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService, DUMMY_USERS } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Please enter a valid email address"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    const success = AuthService.login(data.username, data.email);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to the Insurance Application System",
      });
      setLocation("/insurance-form");
    } else {
      setError("Invalid username or email. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Insurance Portal
            </CardTitle>
            <CardDescription>
              Sign in to access your insurance application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your username" 
                          {...field} 
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email" 
                          {...field} 
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3 font-medium">Demo Users:</p>
              <div className="space-y-2 text-xs">
                {DUMMY_USERS.map((user, index) => (
                  <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="font-mono">{user.username}</span>
                    <span className="text-gray-500">{user.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
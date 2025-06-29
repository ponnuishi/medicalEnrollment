import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthService } from "@/lib/auth";
import { CaptchaService } from "@/lib/captcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  captcha: z.string().min(1, "Please solve the captcha"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string>("");
  const [captcha, setCaptcha] = useState<{ question: string; answer: string }>({ question: "", answer: "" });
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      captcha: "",
    },
  });

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const generateNewCaptcha = () => {
    const newCaptcha = CaptchaService.generateCaptcha();
    setCaptcha(newCaptcha);
    form.setValue("captcha", "");
  };

  const onSubmit = (data: LoginForm) => {
    // Verify captcha first
    if (!CaptchaService.verifyCaptcha(data.captcha, captcha.answer)) {
      setError("Incorrect captcha answer. Please try again.");
      generateNewCaptcha();
      return;
    }

    const success = AuthService.login(data.username, data.email, data.password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to the Insurance Application System",
      });
      setLocation("/insurance-form");
    } else {
      setError("Invalid credentials. Please check your username, email, and password.");
      generateNewCaptcha();
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
                    <AlertDescription className="bg-red-700">{error}</AlertDescription>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Security Check</FormLabel>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-lg">{captcha.question}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={generateNewCaptcha}
                      className="ml-auto"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="text" 
                            placeholder="Enter the answer" 
                            {...field} 
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
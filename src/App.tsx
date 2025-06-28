import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthService } from "@/lib/auth";
import ProtectedRoute from "@/components/protected-route";
import Header from "@/components/header";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import InsuranceForm from "@/pages/insurance-form";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        {AuthService.isAuthenticated() ? (
          <ProtectedRoute>
            <Header />
            <InsuranceForm />
          </ProtectedRoute>
        ) : (
          <Login />
        )}
      </Route>
      <Route path="/insurance-form">
        <ProtectedRoute>
          <Header />
          <InsuranceForm />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;

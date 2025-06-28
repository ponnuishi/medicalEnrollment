import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import InsuranceForm from "@/pages/insurance-form";

function Router() {
  return (
    <Switch>
      <Route path="/" component={InsuranceForm} />
      <Route path="/insurance-form" component={InsuranceForm} />
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

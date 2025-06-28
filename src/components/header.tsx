import { AuthService } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    setLocation("/login");
  };

  if (!currentUser) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Insurance Portal</h1>
            <p className="text-sm text-gray-500">Welcome, {currentUser.username}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}
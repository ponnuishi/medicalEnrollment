// Dummy users for static authentication
export const DUMMY_USERS = [
  { username: "john_doe", email: "john.doe@example.com" },
  { username: "jane_smith", email: "jane.smith@example.com" },
  { username: "mike_johnson", email: "mike.johnson@example.com" },
  { username: "sarah_wilson", email: "sarah.wilson@example.com" },
  { username: "david_brown", email: "david.brown@example.com" }
];

export interface User {
  username: string;
  email: string;
}

export class AuthService {
  private static readonly AUTH_KEY = "insurance_app_auth";

  static login(username: string, email: string): boolean {
    const user = DUMMY_USERS.find(
      u => u.username === username && u.email === email
    );
    
    if (user) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  static getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.AUTH_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
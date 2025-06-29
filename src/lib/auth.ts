// Dummy users for static authentication
export const DUMMY_USERS = [
  { username: "john_doe", email: "john.doe@example.com", password: "pass123" },
  { username: "jane_smith", email: "jane.smith@example.com", password: "secure456" },
  { username: "mike_johnson", email: "mike.johnson@example.com", password: "admin789" },
  { username: "sarah_wilson", email: "sarah.wilson@example.com", password: "wilson321" },
  { username: "david_brown", email: "david.brown@example.com", password: "brown654" }
];

export interface User {
  username: string;
  email: string;
  password: string;
}

export class AuthService {
  private static readonly AUTH_KEY = "insurance_app_auth";

  static login(username: string, email: string, password: string): boolean {
    const user = DUMMY_USERS.find(
      u => u.username === username && u.email === email && u.password === password
    );
    
    if (user) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify({ username: user.username, email: user.email }));
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
// Local storage utility for static deployment
export class LocalStorage {
  private static generateId(): string {
    return `INS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  }

  static saveApplication(data: any): string {
    const id = this.generateId();
    const application = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    const applications = this.getApplications();
    applications.push(application);
    localStorage.setItem('insurance_applications', JSON.stringify(applications));
    
    return id;
  }

  static getApplications(): any[] {
    const stored = localStorage.getItem('insurance_applications');
    return stored ? JSON.parse(stored) : [];
  }

  static getApplication(id: string): any | null {
    const applications = this.getApplications();
    return applications.find(app => app.id === id) || null;
  }
}
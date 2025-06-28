import { 
  insuranceApplications, 
  type InsuranceApplication, 
  type InsertInsuranceApplication 
} from "@shared/schema";

export interface IStorage {
  getInsuranceApplication(id: string): Promise<InsuranceApplication | undefined>;
  createInsuranceApplication(application: InsertInsuranceApplication): Promise<InsuranceApplication>;
  updateInsuranceApplication(id: string, application: Partial<InsertInsuranceApplication>): Promise<InsuranceApplication | undefined>;
  deleteInsuranceApplication(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private applications: Map<string, InsuranceApplication>;
  private currentId: number;

  constructor() {
    this.applications = new Map();
    this.currentId = 1;
  }

  async getInsuranceApplication(applicationId: string): Promise<InsuranceApplication | undefined> {
    return Array.from(this.applications.values()).find(
      (app) => app.applicationId === applicationId
    );
  }

  async createInsuranceApplication(
    insertApplication: InsertInsuranceApplication
  ): Promise<InsuranceApplication> {
    const id = this.currentId++;
    const applicationId = insertApplication.applicationId || `INS-${new Date().getFullYear()}-${String(id).padStart(3, '0')}`;
    
    const application: InsuranceApplication = {
      ...insertApplication,
      id,
      applicationId,
      createdAt: new Date().toISOString(),
    };
    
    this.applications.set(applicationId, application);
    return application;
  }

  async updateInsuranceApplication(
    applicationId: string,
    updates: Partial<InsertInsuranceApplication>
  ): Promise<InsuranceApplication | undefined> {
    const existing = await this.getInsuranceApplication(applicationId);
    if (!existing) {
      return undefined;
    }

    const updated: InsuranceApplication = {
      ...existing,
      ...updates,
    };

    this.applications.set(applicationId, updated);
    return updated;
  }

  async deleteInsuranceApplication(applicationId: string): Promise<boolean> {
    return this.applications.delete(applicationId);
  }
}

export const storage = new MemStorage();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInsuranceApplicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get insurance application by ID
  app.get("/api/insurance-applications/:id", async (req, res) => {
    try {
      const application = await storage.getInsuranceApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new insurance application
  app.post("/api/insurance-applications", async (req, res) => {
    try {
      const validatedData = insertInsuranceApplicationSchema.parse(req.body);
      const application = await storage.createInsuranceApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Validation error", errors: error });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update insurance application
  app.patch("/api/insurance-applications/:id", async (req, res) => {
    try {
      const partialData = insertInsuranceApplicationSchema.partial().parse(req.body);
      const application = await storage.updateInsuranceApplication(req.params.id, partialData);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Validation error", errors: error });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete insurance application
  app.delete("/api/insurance-applications/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteInsuranceApplication(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

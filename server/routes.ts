import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSubscriberSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/team', async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch team members' });
    }
  });

  app.get('/api/team/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        // Try to find by name (converted to slug)
        const nameSlug = req.params.id.toLowerCase().replace(/\s+/g, '-');
        const allMembers = await storage.getTeamMembers();
        const member = allMembers.find(m => 
          m.name.toLowerCase().replace(/\s+/g, '-') === nameSlug
        );
        
        if (!member) {
          return res.status(404).json({ message: 'Team member not found' });
        }
        
        return res.json(member);
      }
      
      const member = await storage.getTeamMember(id);
      if (!member) {
        return res.status(404).json({ message: 'Team member not found' });
      }
      
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch team member' });
    }
  });

  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch services' });
    }
  });

  app.get('/api/services/:slug', async (req, res) => {
    try {
      const slug = req.params.slug;
      const service = await storage.getServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch service' });
    }
  });

  app.get('/api/clients', async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch clients' });
    }
  });

  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
  });

  app.get('/api/hero-slides', async (req, res) => {
    try {
      const slides = await storage.getHeroSlides();
      res.json(slides);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hero slides' });
    }
  });

  app.post('/api/subscribe', async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      
      if (existingSubscriber) {
        return res.status(400).json({ 
          message: 'This email is already subscribed to our newsletter' 
        });
      }
      
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({
        message: 'Thank you for subscribing to our newsletter!',
        subscriber
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid subscription data', 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: 'Failed to process subscription' });
    }
  });

  app.get('/api/search', async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim().length < 2) {
        return res.status(400).json({
          message: 'Search query must be at least 2 characters'
        });
      }
      
      const results = await storage.search(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Failed to perform search' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Test data
const testProject = {
  title: "Test Portfolio Website",
  description: "A test portfolio website built with Next.js",
  imageUrl: "/test-project.jpg",
  projectUrl: "https://test-portfolio.vercel.app",
  githubUrl: "https://github.com/testuser/portfolio",
  technologies: ["Next.js", "Tailwind CSS", "React"]
};

describe('API Routes - Projects Data Handling', () => {
  // Clean up test data before and after each test
  beforeEach(async () => {
    // Clean up any existing test data
    await prisma.project.deleteMany({
      where: {
        title: { contains: "Test" }
      }
    });
  });

  afterEach(async () => {
    // Clean up test data after each test
    await prisma.project.deleteMany({
      where: {
        title: { contains: "Test" }
      }
    });
  });

  describe('Project Creation (POST)', () => {
    it('should create a new project with valid data', async () => {
      const project = await prisma.project.create({
        data: testProject
      });

      expect(project.id).toBeDefined();
      expect(project.title).toBe(testProject.title);
      expect(project.description).toBe(testProject.description);
      expect(project.imageUrl).toBe(testProject.imageUrl);
      expect(project.projectUrl).toBe(testProject.projectUrl);
      expect(project.githubUrl).toBe(testProject.githubUrl);
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(project.technologies).toEqual(testProject.technologies);
      expect(project.createdAt).toBeDefined();
      expect(project.updatedAt).toBeDefined();
    });

    it('should handle missing optional fields', async () => {
      const minimalProject = {
        title: "Test Minimal Project",
        description: "A minimal test project",
        technologies: ["JavaScript"]
      };

      const project = await prisma.project.create({
        data: minimalProject
      });

      expect(project.title).toBe(minimalProject.title);
      expect(project.description).toBe(minimalProject.description);
      expect(project.imageUrl).toBeNull();
      expect(project.projectUrl).toBeNull();
      expect(project.githubUrl).toBeNull();
    });

    it('should require title and description', async () => {
      await expect(
        prisma.project.create({
          data: {
            description: "Missing title",
            technologies: ["JavaScript"]
          }
        })
      ).rejects.toThrow();
    });
  });

  describe('Project Retrieval (GET)', () => {
    it('should retrieve all projects', async () => {
      const project1 = await prisma.project.create({
        data: { ...testProject, title: "Test Project 1" }
      });
      
      const project2 = await prisma.project.create({
        data: { ...testProject, title: "Test Project 2" }
      });

      const projects = await prisma.project.findMany({
        where: {
          title: { contains: "Test Project" }
        }
      });

      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThanOrEqual(2);
      expect(projects.some(p => p.id === project1.id)).toBe(true);
      expect(projects.some(p => p.id === project2.id)).toBe(true);
    });

    it('should return projects in descending order by creation date', async () => {
      const project1 = await prisma.project.create({
        data: { ...testProject, title: "Test Project 1" }
      });
      
      // Wait a bit to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const project2 = await prisma.project.create({
        data: { ...testProject, title: "Test Project 2" }
      });

      const projects = await prisma.project.findMany({
        where: {
          title: { contains: "Test Project" }
        },
        orderBy: { createdAt: 'desc' }
      });

      const testProjects = projects.filter(p => p.title.includes("Test Project"));
      expect(testProjects.length).toBe(2);
      
      // Should be in descending order (newest first)
      expect(new Date(testProjects[0].createdAt).getTime()).toBeGreaterThanOrEqual(
        new Date(testProjects[1].createdAt).getTime()
      );
    });

    it('should retrieve a specific project by ID', async () => {
      const createdProject = await prisma.project.create({
        data: testProject
      });

      const foundProject = await prisma.project.findUnique({
        where: { id: createdProject.id }
      });

      expect(foundProject).toBeDefined();
      expect(foundProject.id).toBe(createdProject.id);
      expect(foundProject.title).toBe(testProject.title);
      expect(foundProject.description).toBe(testProject.description);
    });

    it('should return null for non-existent project ID', async () => {
      const project = await prisma.project.findUnique({
        where: { id: 99999 }
      });

      expect(project).toBeNull();
    });
  });

  describe('Project Updates (PUT)', () => {
    it('should update an existing project', async () => {
      const createdProject = await prisma.project.create({
        data: testProject
      });

      const updatedData = {
        title: "Updated Test Project",
        description: "Updated description",
        technologies: ["Next.js", "TypeScript"]
      };

      const updated = await prisma.project.update({
        where: { id: createdProject.id },
        data: updatedData
      });

      expect(updated.id).toBe(createdProject.id);
      expect(updated.title).toBe(updatedData.title);
      expect(updated.description).toBe(updatedData.description);
      expect(updated.technologies).toEqual(updatedData.technologies);
    });

    it('should not update non-existent project', async () => {
      const updatedData = { title: "Updated Title" };

      await expect(
        prisma.project.update({
          where: { id: 99999 },
          data: updatedData
        })
      ).rejects.toThrow();
    });
  });

  describe('Project Deletion (DELETE)', () => {
    it('should delete an existing project', async () => {
      const createdProject = await prisma.project.create({
        data: testProject
      });

      const deleted = await prisma.project.delete({
        where: { id: createdProject.id }
      });

      expect(deleted.id).toBe(createdProject.id);

      // Verify project is actually deleted
      const verifyDeleted = await prisma.project.findUnique({
        where: { id: createdProject.id }
      });
      expect(verifyDeleted).toBeNull();
    });

    it('should not delete non-existent project', async () => {
      await expect(
        prisma.project.delete({
          where: { id: 99999 }
        })
      ).rejects.toThrow();
    });
  });
});
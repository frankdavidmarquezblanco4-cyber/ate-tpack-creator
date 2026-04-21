import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { saveATE, getATEByAccessCode, getUserATEs } from "./db";

describe("ATE Database Functions", () => {
  const testUserId = 1;
  const testAccessCode = "TEST123";
  const testData = {
    projectName: "Test Project",
    secretCode: "TEST123",
    disciplinaryArea: "Mathematics",
    grade: "10",
    members: ["Student 1", "Student 2"],
    learningObjective: "Learn calculus",
    pedagogicalStrategy: "Interactive learning",
    strategyJustification: "Effective for engagement",
    technology: "Python",
    technologyType: "Programming Language",
    technologyCost: "Free",
    contentRepresentation: "Visual",
    strategyPotentiation: "High",
    totalDuration: "60",
    openingDuration: "10",
    openingTeacherRole: "Facilitator",
    openingStudentRole: "Listener",
    developmentDuration: "40",
    developmentTeacherRole: "Guide",
    developmentStudentRole: "Participant",
    closingDuration: "10",
    closingTeacherRole: "Evaluator",
    closingStudentRole: "Reflector",
    technicalResources: [],
    referenceFiles: [],
  };

  describe("saveATE", () => {
    it("should save ATE data to database", async () => {
      const result = await saveATE(testUserId, testAccessCode, testData);
      expect(result).toBeDefined();
      expect(result.accessCode).toBe(testAccessCode);
    });

    it("should update existing ATE with same access code", async () => {
      const updatedData = { ...testData, projectName: "Updated Project" };
      const result = await saveATE(testUserId, testAccessCode, updatedData);
      expect(result).toBeDefined();
      expect(result.accessCode).toBe(testAccessCode);
    });
  });

  describe("getATEByAccessCode", () => {
    it("should retrieve ATE by access code", async () => {
      const result = await getATEByAccessCode(testAccessCode);
      expect(result).toBeDefined();
      if (result) {
        expect(result.accessCode).toBe(testAccessCode);
        const data = JSON.parse(result.data as string);
        expect(data.projectName).toBe("Updated Project");
      }
    });

    it("should return undefined for non-existent access code", async () => {
      const result = await getATEByAccessCode("NON-EXISTENT-CODE");
      expect(result).toBeUndefined();
    });
  });

  describe("getUserATEs", () => {
    it("should retrieve all ATEs for a user", async () => {
      const results = await getUserATEs(testUserId);
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(ate => ate.accessCode === testAccessCode)).toBe(true);
    });

    it("should return empty array for user with no ATEs", async () => {
      const results = await getUserATEs(9999);
      expect(Array.isArray(results)).toBe(true);
    });
  });
});

import { describe, expect, it } from "vitest";
import uploadedCards from "@/data/flashcards.json";
import { categories, flashcards } from "@/data/flashcards";

describe("Uploaded Azure Recall deck", () => {
  it("uses all 30 uploaded cards without replacing content or IDs", () => {
    expect(flashcards).toHaveLength(30);
    expect(flashcards).toEqual(uploadedCards);
    expect(new Set(flashcards.map((card) => card.id)).size).toBe(30);
  });

  it("preserves the six uploaded category IDs with five cards each", () => {
    const ids = ["cloud-concepts", "azure-architecture-services", "compute", "networking", "storage", "security-governance-cost-management"];
    expect(categories.map((category) => category.id)).toEqual(ids);
    expect([...new Set(flashcards.map((card) => card.category))]).toEqual(ids);
    for (const id of ids) {
      expect(flashcards.filter((card) => card.category === id)).toHaveLength(5);
    }
  });
});
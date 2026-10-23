import cardData from "./flashcards.json";

export type CategoryId =
  | "cloud-concepts"
  | "azure-architecture-services"
  | "compute"
  | "networking"
  | "storage"
  | "security-governance-cost-management";

export interface Flashcard {
  id: string;
  category: CategoryId;
  question: string;
  answer: string;
  explanation: string;
  sourceUrl?: string;
}

export const categories: { id: CategoryId; name: string; description: string }[] = [
  { id: "cloud-concepts", name: "Cloud Concepts", description: "Cloud models, benefits and service types (IaaS, PaaS, SaaS)." },
  { id: "azure-architecture-services", name: "Azure Architecture and Services", description: "Regions, availability zones, resource groups and subscriptions." },
  { id: "compute", name: "Compute", description: "Virtual machines, containers, App Service and Functions." },
  { id: "networking", name: "Networking", description: "Virtual networks, VPN Gateway, ExpressRoute and DNS." },
  { id: "storage", name: "Storage", description: "Storage accounts, blob tiers, redundancy and migration tools." },
  { id: "security-governance-cost-management", name: "Security, Governance and Cost Management", description: "Entra ID, RBAC, Azure Policy, locks and cost tools." },
];

// The uploaded JSON is the single source of study content.
export const flashcards: Flashcard[] = cardData.map((card) => {
  const category = categories.find((entry) => entry.id === card.category);
  if (!category) throw new Error(`Unknown flashcard category: ${card.category}`);
  return { ...card, category: category.id };
});

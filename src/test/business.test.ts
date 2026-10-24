import { describe, expect, it } from "vitest";
import { business, services, whatsappLink, filterProjects } from "@/lib/business";
import { enquirySchema } from "@/lib/enquiry-schema";

describe("Client business rules", () => {
  it("uses the client's WhatsApp number", () => expect(new URL(whatsappLink()).pathname).toBe("/919741325159"));
  it("uses the confirmed business email", () => expect(business.email).toBe("zenmarkoffice@gmail.com"));
  it("offers all five required services", () => expect(services.map(s => s.id)).toEqual(["brand-identity", "wedding-design", "posters-banners", "social-creatives", "motion-design"]));
  it("filters only projects in the requested category", () => expect(filterProjects([{ category: "motion-design" as const }, { category: null }], "motion-design")).toEqual([{ category: "motion-design" }]));
  it("does not assign unverified examples to a genuine service category", () => expect(filterProjects([{ category: null }], "wedding-design")).toEqual([]));
  it("rejects invalid enquiry contact details", () => expect(enquirySchema.safeParse({ submissionId: "48b99ca0-bb5f-4aa6-b3ba-9b5e1af7e9ee", name: "Test", email: "invalid", phone: "", company: "", service: "brand-identity", budget: "", message: "A logo", website: "" }).success).toBe(false));
  it("rejects services outside the five requested categories", () => expect(enquirySchema.safeParse({ submissionId: "48b99ca0-bb5f-4aa6-b3ba-9b5e1af7e9ee", name: "Test", email: "test@example.com", phone: "", company: "", service: "unverified", budget: "", message: "A logo", website: "" }).success).toBe(false));
});
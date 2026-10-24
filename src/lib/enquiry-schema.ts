import { z } from "zod";

export const enquirySchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().max(30).refine((value) => !value || /^[+\d\s().-]{7,30}$/.test(value), "Please enter a valid phone number."),
  company: z.string().trim().max(200),
  service: z.enum(["brand-identity", "wedding-design", "posters-banners", "social-creatives", "motion-design"], { errorMap: () => ({ message: "Please select a service." }) }),
  budget: z.string().trim().max(100),
  message: z.string().trim().min(1, "Please describe your project.").max(3000),
  website: z.string().max(0, "Unable to submit this enquiry."),
});
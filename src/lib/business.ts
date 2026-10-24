export const business = {
  name: "Zenmark",
  email: "zenmarkoffice@gmail.com",
  phone: "+91 97413 25159",
  whatsappDigits: "919741325159",
  instagram: "https://www.instagram.com/zen_mark_kadaba?rpxt=MW00NmEzNHpzazhtdw==",
};

export const services = [
  { id: "brand-identity", name: "Logo & brand identity", description: "Distinctive logos, visual identities and brand assets shaped around your business.", accent: "sticker-lime", symbol: "Aa" },
  { id: "wedding-design", name: "Wedding invitations", description: "Wedding invitations and card designs that bring your celebration’s story to life.", accent: "sticker-pink", symbol: "♡" },
  { id: "posters-banners", name: "Posters & banners", description: "Promotional posters and banners with clear messages and eye-catching composition.", accent: "sticker-orange", symbol: "↗" },
  { id: "social-creatives", name: "Social media creatives", description: "Social graphics and advertising creatives designed for your brand and campaign.", accent: "sticker-sun", symbol: "#" },
  { id: "motion-design", name: "Animated & motion graphics", description: "Animated graphics and motion design that give your ideas rhythm and movement.", accent: "sticker-lime", symbol: "▶" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export function whatsappLink(service?: string) {
  const text = service ? `Hi Zenmark, I’d like to enquire about ${service}.` : "Hi Zenmark, I’d like to discuss a design project.";
  return `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(text)}`;
}

export function filterProjects<T extends { category: ServiceId | null }>(items: T[], category: ServiceId | "all") {
  return category === "all" ? items : items.filter((item) => item.category === category);
}
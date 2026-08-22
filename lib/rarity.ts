export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export const RARITY_LABEL: Record<Rarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

// Written as full literal class name strings (not concatenated at runtime)
// so Tailwind's static build-time scanner picks them up correctly.
export const RARITY_BORDER_TEXT: Record<Rarity, string> = {
  common: "text-common border-common/40",
  uncommon: "text-uncommon border-uncommon/40",
  rare: "text-rare border-rare/40",
  epic: "text-epic border-epic/40",
  legendary: "text-brass border-brass/40",
};

export const RARITY_TEXT: Record<Rarity, string> = {
  common: "text-common",
  uncommon: "text-uncommon",
  rare: "text-rare",
  epic: "text-epic",
  legendary: "text-brass",
};

export const RARITY_DOT: Record<Rarity, string> = {
  common: "bg-common",
  uncommon: "bg-uncommon",
  rare: "bg-rare",
  epic: "bg-epic",
  legendary: "bg-brass",
};

export const RARITY_GLOW: Record<Rarity, string> = {
  common: "hover:shadow-[0_0_0_1px_rgba(154,160,168,0.15)]",
  uncommon: "hover:shadow-[0_0_24px_-8px_rgba(79,180,119,0.35)]",
  rare: "hover:shadow-[0_0_24px_-8px_rgba(76,141,255,0.35)]",
  epic: "hover:shadow-[0_0_24px_-8px_rgba(166,76,255,0.35)]",
  legendary: "hover:shadow-[0_0_24px_-8px_rgba(201,162,39,0.45)]",
};

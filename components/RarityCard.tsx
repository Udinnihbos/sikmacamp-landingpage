type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

const RARITY_LABEL: Record<Rarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const RARITY_COLOR: Record<Rarity, string> = {
  common: "text-common border-common/40",
  uncommon: "text-uncommon border-uncommon/40",
  rare: "text-rare border-rare/40",
  epic: "text-epic border-epic/40",
  legendary: "text-brass border-brass/40",
};

const RARITY_GLOW: Record<Rarity, string> = {
  common: "hover:shadow-[0_0_0_1px_rgba(154,160,168,0.15)]",
  uncommon: "hover:shadow-[0_0_24px_-8px_rgba(79,180,119,0.35)]",
  rare: "hover:shadow-[0_0_24px_-8px_rgba(76,141,255,0.35)]",
  epic: "hover:shadow-[0_0_24px_-8px_rgba(166,76,255,0.35)]",
  legendary: "hover:shadow-[0_0_24px_-8px_rgba(201,162,39,0.45)]",
};

// Written as full literal class names so Tailwind's static analysis can pick them up
// (dynamically concatenating "text-" + rarity into "bg-" strings would get purged at build time).
const RARITY_DOT: Record<Rarity, string> = {
  common: "bg-common",
  uncommon: "bg-uncommon",
  rare: "bg-rare",
  epic: "bg-epic",
  legendary: "bg-brass",
};

const RARITY_LABEL_COLOR: Record<Rarity, string> = {
  common: "text-common",
  uncommon: "text-uncommon",
  rare: "text-rare",
  epic: "text-epic",
  legendary: "text-brass",
};

export default function RarityCard({
  rarity,
  title,
  tag,
  description,
  stats,
}: {
  rarity: Rarity;
  title: string;
  tag: string;
  description: string;
  stats: string[];
}) {
  return (
    <div
      className={`group relative rounded-lg border bg-surface p-5 transition-shadow duration-300 ${RARITY_COLOR[rarity]} ${RARITY_GLOW[rarity]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {tag}
        </span>
        <span
          className={`font-mono text-[11px] font-medium uppercase tracking-widest ${RARITY_LABEL_COLOR[rarity]}`}
        >
          {RARITY_LABEL[rarity]}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
        {stats.map((stat) => (
          <li
            key={stat}
            className="flex items-center gap-2 font-mono text-xs text-muted"
          >
            <span className={`h-1 w-1 rounded-full ${RARITY_DOT[rarity]}`} />
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

import {
  Rarity,
  RARITY_LABEL,
  RARITY_BORDER_TEXT,
  RARITY_TEXT,
  RARITY_DOT,
  RARITY_GLOW,
} from "@/lib/rarity";

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
      className={`group relative rounded-lg border bg-surface p-5 transition-shadow duration-300 ${RARITY_BORDER_TEXT[rarity]} ${RARITY_GLOW[rarity]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {tag}
        </span>
        <span
          className={`font-mono text-[11px] font-medium uppercase tracking-widest ${RARITY_TEXT[rarity]}`}
        >
          {RARITY_LABEL[rarity]}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

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

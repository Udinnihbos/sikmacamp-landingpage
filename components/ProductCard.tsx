import { SITE } from "@/lib/site-config";
import {
  RARITY_LABEL,
  RARITY_BORDER_TEXT,
  RARITY_TEXT,
  RARITY_DOT,
  RARITY_GLOW,
} from "@/lib/rarity";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { name, rarity, price, description, perks } = product;

  return (
    <div
      className={`group relative flex flex-col rounded-lg border bg-surface p-5 transition-shadow duration-300 ${RARITY_BORDER_TEXT[rarity]} ${RARITY_GLOW[rarity]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`font-mono text-[11px] font-medium uppercase tracking-widest ${RARITY_TEXT[rarity]}`}
        >
          {RARITY_LABEL[rarity]}
        </span>
        <span className="font-mono text-sm font-medium text-ink">
          {price}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold text-ink">
        {name}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

      <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 font-mono text-xs text-muted"
          >
            <span className={`h-1 w-1 rounded-full ${RARITY_DOT[rarity]}`} />
            {perk}
          </li>
        ))}
      </ul>

      <a
        href={SITE.discordUrl}
        className="mt-5 inline-flex items-center justify-center rounded-md border border-line py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-brass/40 hover:text-brass"
      >
        Beli via Discord
      </a>
    </div>
  );
}

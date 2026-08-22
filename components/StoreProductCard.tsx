interface StoreProduct {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
}

export default function StoreProductCard({
  product,
}: {
  product: StoreProduct;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-brass/40">
      <div className="aspect-square w-full bg-base">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-muted">
            Tanpa gambar
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold text-ink">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        )}
        <p className="mt-3 font-mono text-sm text-brass">{product.price}</p>
      </div>
    </div>
  );
}

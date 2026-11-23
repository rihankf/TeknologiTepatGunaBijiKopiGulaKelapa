import Image from "next/image";
import Link from "next/link";
import { Tool } from "@/types";

interface CatalogCardProps {
  tool: Tool;
}

export default function CatalogCard({ tool }: CatalogCardProps) {
  return (
    <Link
      href={`/product/${tool.slug}`}
      className="catalog-card-v2"
      aria-label={`Detail spesifikasi untuk ${tool.name}`}
    >
      <div className="catalog-card-media">
        <div className="catalog-card-image-wrap">
          <Image
            src={tool.image}
            alt={tool.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="catalog-card-img"
          />
        </div>
        <span className="catalog-card-badge">{tool.category}</span>
      </div>

      <div className="catalog-card-content">
        <h3 className="catalog-card-title">{tool.name}</h3>

        <div className="catalog-card-divider" />

        <div className="catalog-card-footer">
          <div className="catalog-card-price-wrap">
            <span className="catalog-card-price-label">Estimasi Harga</span>
            <span className="catalog-card-price-value">{tool.priceRange}</span>
          </div>
          <span className="catalog-card-action" aria-hidden="true">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}

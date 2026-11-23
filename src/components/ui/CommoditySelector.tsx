"use client";

import { KeyboardEvent } from "react";

export type Commodity = "kopi" | "gula-kelapa";

interface CommoditySelectorProps {
  active: Commodity;
  onChange: (commodity: Commodity) => void;
}

interface CommodityMeta {
  id: Commodity;
  code: string;
  icon: string;
  label: string;
  focusArea: string;
  description: string;
}

const commodities: CommodityMeta[] = [
  {
    id: "kopi",
    code: "01",
    icon: "☕",
    label: "Biji Kopi",
    focusArea: "Pasca Panen",
    description: "Solusi mekanisasi pengeringan terkontrol, instrumen kadar air presisi, dan mesin pemilah sortasi biji kopi.",
  },
  {
    id: "gula-kelapa",
    code: "02",
    icon: "🥥",
    label: "Gula Kelapa",
    focusArea: "Pengolahan Nira",
    description: "Teknologi filtrasi nira bersih, wajan pengaduk mekanis, dan oven pengering kristalisasi gula semut higienis.",
  },
];

export default function CommoditySelector({
  active,
  onChange,
}: CommoditySelectorProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentId: Commodity) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextId = currentId === "kopi" ? "gula-kelapa" : "kopi";
      onChange(nextId);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevId = currentId === "kopi" ? "gula-kelapa" : "kopi";
      onChange(prevId);
    }
  };

  return (
    <div
      className="commodity-selector-container"
      role="tablist"
      aria-label="Pilihan Komoditas Unggulan"
    >
      <div className="commodity-selector-grid">
        {commodities.map((item) => {
          const isSelected = active === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              className={`commodity-tab-card commodity-tab-${item.id} ${
                isSelected ? "is-selected" : ""
              }`}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
            >
              <div className="commodity-tab-header">
                <span className="commodity-tab-number">
                  KOMODITAS {item.code}
                </span>
                <span
                  className="commodity-tab-focus"
                  aria-label={`Fokus: ${item.focusArea}`}
                >
                  {item.focusArea}
                </span>
              </div>

              <div className="commodity-tab-body">
                <span
                  className="commodity-tab-icon"
                  role="img"
                  aria-label={`Ikon ${item.label}`}
                >
                  {item.icon}
                </span>
                <div className="commodity-tab-content">
                  <h3 className="commodity-tab-title">{item.label}</h3>
                  <p className="commodity-tab-desc">{item.description}</p>
                </div>
              </div>

              <div className="commodity-tab-footer">
                <span className="commodity-tab-status">
                  {isSelected ? "Sedang Ditampilkan" : "Pilih Komoditas Ini"}
                </span>
                <span className="commodity-tab-indicator" aria-hidden="true">
                  {isSelected ? "●" : "→"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

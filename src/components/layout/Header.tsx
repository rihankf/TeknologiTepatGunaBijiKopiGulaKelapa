/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang",
    href: "/tentang",
    dropdown: [
      { label: "Komoditas Unggulan", href: "/tentang#komoditas", description: "Biji Kopi & Gula Kelapa" },
      { label: "Identifikasi Masalah", href: "/tentang#identifikasi", description: "Kendala teknis di lapangan" },
      { label: "Latar Belakang", href: "/tentang#latar-belakang", description: "Kajian urgensi mekanisasi" },
      { label: "Tujuan Proyek", href: "/tentang#tujuan", description: "Target efisiensi mutu & hasil" },
    ],
  },
  { label: "Mitra", href: "/mitra" },
  {
    label: "Teknologi",
    href: "/teknologi",
    dropdown: [
      { label: "Semua Teknologi", href: "/teknologi?filter=semua", description: "Seluruh katalog alat rekomendasi" },
      { label: "Alat Biji Kopi", href: "/teknologi?filter=kopi", description: "Pengering, pengukur & sortasi" },
      { label: "Alat Gula Kelapa", href: "/teknologi?filter=gulakelapa", description: "Penyaring & pemasak nira" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHome = pathname === "/";

  const closeAllMenus = useCallback(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileDropdown(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHome ? window.innerHeight - 80 : 15;
      setScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close menus on route change
  useEffect(() => {
    closeAllMenus();
  }, [pathname, closeAllMenus]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllMenus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeAllMenus]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const handleFocus = (label: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(label);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className={`site-header-v2 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner-v2">
        <Link
          href="/"
          className="header-brand-link"
          aria-label="Kembali ke Beranda Petrolab Teknologi Tepat Guna"
        >
          <Image
            src="/images/logo.png"
            alt="Petrolab"
            width={240}
            height={70}
            className="header-logo-img"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav-v2" aria-label="Navigasi Utama">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className={`nav-dropdown-group ${
                  activeDropdown === item.label ? "is-open" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="nav-link-v2 nav-dropdown-link"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === item.label}
                  onFocus={() => handleFocus(item.label)}
                >
                  <span>{item.label}</span>
                  <svg
                    className="nav-chevron-icon"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <div
                  className="nav-dropdown-flyout"
                  role="menu"
                  aria-label={`Submenu ${item.label}`}
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      role="menuitem"
                      className="nav-dropdown-flyout-item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="nav-dropdown-item-title">{sub.label}</span>
                      {sub.description && (
                        <span className="nav-dropdown-item-desc">
                          {sub.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link-v2 ${pathname === item.href ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileOpen ? "is-active" : ""}`}
          aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-panel"
        className={`mobile-drawer-v2 ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileOpen(false)}
        />
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-title">Menu Navigasi</span>
            <button
              type="button"
              className="mobile-drawer-close"
              aria-label="Tutup menu"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="mobile-drawer-links" aria-label="Menu Mobile">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="mobile-nav-group">
                  <div className="mobile-nav-group-header">
                    <Link
                      href={item.href}
                      className="mobile-nav-main-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="mobile-nav-expand-btn"
                      aria-label={`Buka submenu ${item.label}`}
                      aria-expanded={mobileDropdown === item.label}
                      onClick={() => toggleMobileDropdown(item.label)}
                    >
                      <span
                        className={`expand-chevron ${
                          mobileDropdown === item.label ? "is-rotated" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                  </div>

                  {mobileDropdown === item.label && (
                    <div className="mobile-nav-sublist">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="mobile-nav-sublink"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="sublink-dot" aria-hidden="true">
                            ›
                          </span>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-main-link single-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

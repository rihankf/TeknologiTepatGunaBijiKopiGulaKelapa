import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-v2">
      <div className="container footer-v2-main">
        <div className="footer-v2-grid">
          {/* Kolom 1: Profil Proyek & Mitra */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="footer-v2-logo" aria-label="Beranda Petrolab">
              <Image
                src="/images/logo.webp"
                alt="Petrolab"
                width={200}
                height={55}
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-v2-about">
              Platform studi dan katalog teknologi tepat guna untuk komoditas unggulan Indonesia.
              Berfokus pada penyelesaian kendala pascapanen biji kopi dan pengolahan gula kelapa
              melalui rekomendasi alat yang terjangkau, efisien, dan siap pakai.
            </p>
          </div>

          {/* Kolom 2: Peta */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Lokasi Layanan</h4>
            <div className="footer-map-container">
              <iframe
                title="Peta Lokasi Layanan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4979359814547!2d106.78542107499354!3d-6.584855093408716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c539b20fd24f%3A0x77904b38edf6652e!2sPETROLAB%20Bogor!5e0!3m2!1sid!2sid!4v1787738113509!5m2!1sid!2sid"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: "6px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-v2-bottom">
        <div className="container footer-v2-bottom-inner">
          <p className="footer-copyright-text">
            © 2026 Platform Teknologi Tepat Guna Komoditas Unggulan Indonesia. Hak Cipta Dilindungi.
          </p>
          <p className="footer-subtext">
            Kajian pascapanen & rancang bangun teknologi.
          </p>
        </div>
      </div>
    </footer>
  );
}

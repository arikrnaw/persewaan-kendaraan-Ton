"use client";

import { Container, Button } from "react-bootstrap";

// Komponen Promotional Banner
export default function PromoBanner() {
  return (
    <section
      className="py-5 flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/assets/banner-tengah.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "300px",
      }}
    >
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          {/* Left side - Text Content */}
          <div className="col-md-7 mb-4 mb-md-0">
            <h2
              className="text-white fw-bold mb-3"
              style={{
                fontSize: "32px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
              }}
            >
              Diskon Nggak Pake Tanggung.
            </h2>
            <p
              className="text-white mb-0"
              style={{
                fontSize: "18px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Plus bonus ongkir ke seluruh Indonesia.
            </p>
          </div>

          {/* Right side - Button */}
          <div className="col-md-5 text-end">
            <Button
              size="lg"
              className="px-4 py-2 text-white rounded-pill"
              style={{
                backgroundColor: "#364F6B",
                border: "none",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.5px",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2a3d55";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#364F6B";
              }}
            >
              INFO SELENGKAPNYA
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

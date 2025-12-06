"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel, Container } from "react-bootstrap";

// Komponen Hero Section dengan carousel banner
export default function HeroSection() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <section
      className="position-relative"
      style={{
        minHeight: "656.04px",
        background: "linear-gradient(135deg, #364F6B 0%, #2a3d55 100%)",
      }}
    >
      <Container fluid className="px-0">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={true}
          indicators={true}
          className="hero-carousel"
        >
          {/* Slide 1 */}
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-between position-relative"
              style={{ minHeight: "656.04px" }}
            >
              {/* Background image dengan overlay */}
              <div
                className="position-absolute w-100 h-100"
                style={{
                  backgroundImage: "url('/assets/header.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 1,
                }}
              />
            </div>
          </Carousel.Item>

          {/* Slide 2 - Placeholder untuk slide lainnya */}
          <Carousel.Item>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "500px" }}
            >
              <div
                className="text-white text-center position-relative"
                style={{ zIndex: 2 }}
              >
                <h2
                  className="fw-bold mb-4"
                  style={{
                    fontSize: "48px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  New Collection
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "20px",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Discover the latest trends
                </p>
                <button
                  className="btn px-4 py-2 fw-bold text-white"
                  style={{
                    backgroundColor: "#3FC1C9",
                    border: "none",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Scroll to top button */}
      <button
        className="position-fixed bottom-0 end-0 m-4 btn rounded-circle text-white"
        style={{
          width: "50px",
          height: "50px",
          zIndex: 1000,
          backgroundColor: "#364F6B",
          border: "none",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#3FC1C9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#364F6B";
        }}
      >
        ↑
      </button>
    </section>
  );
}

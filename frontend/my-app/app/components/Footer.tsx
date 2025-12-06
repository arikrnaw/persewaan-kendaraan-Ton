"use client";

import { Container, Row, Col } from "react-bootstrap";

// Komponen Footer
export default function Footer() {
  return (
    <footer
      className="pt-20 text-white"
      style={{
        backgroundColor: "#364F6B",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <Container>
        <Row className="g-4">
          {/* Column 1 - Mino Store Locations */}
          <Col xs={12} sm={6} md={3}>
            <h6
              className="fw-bold mb-3 text-white"
              style={{
                fontSize: "18px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
              }}
            >
              Mino Store
            </h6>
            <ul className="list-unstyled small">
              <li
                className="mb-2"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Yogyakarta
              </li>
              <li
                className="mb-2"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Kebumen
              </li>
              <li
                className="mb-2"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Purwokerto
              </li>
              <li
                className="mb-2"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Kudus
              </li>
              <li
                className="mb-2"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Surakarta
              </li>
            </ul>
          </Col>

          {/* Column 2 - Belanja */}
          <Col xs={12} sm={6} md={3}>
            <h6
              className="fw-bold mb-3 text-white"
              style={{
                fontSize: "18px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
              }}
            >
              Belanja
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Sepatu Pria
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Sepatu Wanita
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Sepatu Uniseks
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Pernak-pernik
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Aksesoris
                </a>
              </li>
            </ul>
          </Col>

          {/* Column 3 - Layanan */}
          <Col xs={12} sm={6} md={3}>
            <h6
              className="fw-bold mb-3 text-white"
              style={{
                fontSize: "18px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
              }}
            >
              Layanan
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Bantuan
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Cara Pengembalian
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Indeks Produk
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Promo & Diskon
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Konfirmasi Transfer
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Status Pesanan
                </a>
              </li>
            </ul>
          </Col>

          {/* Column 4 - Tentang Kami */}
          <Col xs={12} sm={6} md={3}>
            <h6
              className="fw-bold mb-3 text-white"
              style={{
                fontSize: "18px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
              }}
            >
              Tentang Kami
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Tentang Kami
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Pers/Media
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Karir
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Persyaratan & Ketentuan
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3FC1C9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  }}
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Copyright Section - Terpisah dengan background hitam */}
      <div
        className="py-3 mt-20 text-center"
        style={{
          backgroundColor: "#181616",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Container>
          <p
            className="small mb-0"
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.8)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            (c) 2020 CV. MinoStore Minomartani
          </p>
        </Container>
      </div>
    </footer>
  );
}

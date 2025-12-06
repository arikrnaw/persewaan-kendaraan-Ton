"use client";

import { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

// Komponen Header dengan navigasi dan dropdown menu
export default function Header() {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#364F6B" }}>
      {/* Top Bar - Search, Logo, Cart & User */}
      <Container fluid className="px-4">
        <div className="d-flex align-items-center justify-content-between py-3">
          {/* Search Icon - Left */}
          <div>
            <svg
              width="20"
              height="20"
              fill="#3FC1C9"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>

          {/* Logo - Center */}
          <div className="text-center">
            <span
              className="fw-bold text-white"
              style={{
                fontSize: "24px",
                letterSpacing: "0.5px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              mino.
            </span>
          </div>

          {/* Cart & User Icons - Right */}
          <div className="d-flex align-items-center gap-3">
            <Nav.Link href="#" className="text-white position-relative p-0">
              <svg
                width="24"
                height="24"
                fill="#3FC1C9"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm7-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
              {/* Notification badge */}
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{
                  fontSize: "10px",
                  padding: "2px 5px",
                  minWidth: "18px",
                }}
              >
                0
              </span>
            </Nav.Link>
            <Nav.Link href="#" className="text-white p-0">
              <svg
                width="24"
                height="24"
                fill="#3FC1C9"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </Nav.Link>
          </div>
        </div>
      </Container>

      {/* Navigation Bar */}
      <Navbar
        expand="lg"
        className="text-white"
        style={{ backgroundColor: "#364F6B" }}
      >
        <Container fluid className="px-4">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-white"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-3">
              {/* Menu Beranda */}
              <Nav.Link
                href="#"
                className="text-white fw-semibold"
                style={{ fontSize: "14px", letterSpacing: "0.5px" }}
              >
                BERANDA
              </Nav.Link>

              {/* Menu Belanja dengan Dropdown */}
              <Dropdown
                onMouseEnter={() => setShowDropdown("belanja")}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Dropdown.Toggle
                  variant="link"
                  className="text-white text-decoration-none d-flex align-items-center gap-1 fw-semibold"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  BELANJA
                </Dropdown.Toggle>
                {showDropdown === "belanja" && (
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Sepatu Pria</Dropdown.Item>
                    <Dropdown.Item href="#">Sepatu Wanita</Dropdown.Item>
                    <Dropdown.Item href="#">Sepatu Anak</Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>

              {/* Menu Bundel 1 dengan Dropdown */}
              <Dropdown
                onMouseEnter={() => setShowDropdown("bundel1")}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Dropdown.Toggle
                  variant="link"
                  className="text-white text-decoration-none d-flex align-items-center gap-1 fw-semibold"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  BUNDEL 1
                </Dropdown.Toggle>
                {showDropdown === "bundel1" && (
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Bundle Sepatu Pria</Dropdown.Item>
                    <Dropdown.Item href="#">Bundle Sepatu Wanita</Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>

              {/* Menu Bundel 2 dengan Dropdown */}
              <Dropdown
                onMouseEnter={() => setShowDropdown("bundel2")}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Dropdown.Toggle
                  variant="link"
                  className="text-white text-decoration-none d-flex align-items-center gap-1 fw-semibold"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  BUNDEL 2
                </Dropdown.Toggle>
                {showDropdown === "bundel2" && (
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Bundle Sepatu Anak</Dropdown.Item>
                    <Dropdown.Item href="#">Bundle Aksesoris</Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>

              {/* Menu Promo dan Blog */}
              <Nav.Link
                href="#"
                className="text-white fw-semibold"
                style={{ fontSize: "14px", letterSpacing: "0.5px" }}
              >
                PROMO
              </Nav.Link>
              <Nav.Link
                href="#"
                className="text-white fw-semibold"
                style={{ fontSize: "14px", letterSpacing: "0.5px" }}
              >
                BLOG
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

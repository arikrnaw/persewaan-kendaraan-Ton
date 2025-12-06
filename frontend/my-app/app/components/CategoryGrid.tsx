"use client";

import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

// Data kategori dengan assets yang ada
const categories = [
  {
    id: 1,
    image: "/assets/kategori-sepatu-anak.jpg",
    title: "Sepatu Anak",
    position: "top-left",
  },
  {
    id: 2,
    image: "/assets/kategori-sandal.jpg",
    title: "Sandal",
    position: "top-right",
  },
  {
    id: 3,
    image: "/assets/kategori-sepatu-wanita.jpg",
    title: "Sepatu Wanita",
    position: "bottom-left",
  },
  {
    id: 4,
    image: "/assets/kategori-sepatu-pria.jpg",
    title: "Sepatu Pria",
    position: "bottom-right",
  },
];

// Komponen Category Grid
export default function CategoryGrid() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="g-3">
          {categories.map((category) => (
            <Col key={category.id} xs={12} sm={6}>
              <div
                className="position-relative overflow-hidden rounded"
                style={{ height: "300px", cursor: "pointer" }}
              >
                {/* Category Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  style={{
                    transition: "transform 0.3s ease",
                    objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = "scale(1)";
                  }}
                />

                {/* Overlay dengan title */}
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(54, 79, 107, 0.8), transparent)",
                  }}
                >
                  <h4
                    className="text-white fw-bold mb-0"
                    style={{
                      fontSize: "20px",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {category.title}
                  </h4>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

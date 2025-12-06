"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";

// Data produk dengan assets yang ada
const products = [
  {
    id: 1,
    image: "/assets/kartu-produk-1.png",
    category: "SEPATU PRIA, OLAHRAGA",
    name: "Playoon - Kelimutu Run Model A",
    rating: 3.5,
    originalPrice: 387000,
    price: 325000,
    hasDiscount: true,
  },
  {
    id: 2,
    image: "/assets/kartu-produk-2.png",
    category: "SEPATU WANITA, KASUAL",
    name: "Le Modiste - Sepatu Kasual Wanita",
    rating: 3.5,
    price: 319000,
    hasDiscount: false,
  },
  {
    id: 3,
    image: "/assets/kartu-produk-3.png",
    category: "SEPATU PRIA, KASUAL",
    name: "X-Voyager Vintage Forrester",
    rating: 2.5,
    price: 402000,
    hasDiscount: false,
  },
  {
    id: 4,
    image: "/assets/kartu-produk-4.png",
    category: "SANDAL, JEPIT PRIA",
    name: "Cadillac Insigma 91",
    rating: 2.5,
    price: 387000,
    hasDiscount: false,
  },
];

// Komponen untuk render star rating dengan warna merah
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="d-flex align-items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < fullStars ? "#FC5185" : "#ddd",
            fontSize: "14px",
          }}
        >
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span style={{ color: "#FC5185", fontSize: "14px" }}>☆</span>
      )}
    </div>
  );
};

// Komponen Product Carousel
export default function ProductCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  // Format harga ke Rupiah sesuai desain
  const formatPrice = (price: number) => {
    return `Rp. ${price.toLocaleString("id-ID")},-`;
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#F8F8F8" }}>
      <Container>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            className="fw-bold"
            style={{
              fontSize: "28px",
              fontFamily: "'Montserrat', sans-serif",
              color: "#181616",
            }}
          >
            Pilihan Minggu Ini
          </h2>
          <Button
            variant="outline-secondary"
            className="d-none d-md-block rounded-pill"
            style={{
              borderColor: "#727272",
              color: "#727272",
              fontSize: "14px",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#364F6B";
              e.currentTarget.style.borderColor = "#364F6B";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#727272";
              e.currentTarget.style.color = "#727272";
            }}
          >
            PRODUK LAINNYA
          </Button>
        </div>

        {/* Product Carousel */}
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={true}
          indicators={false}
          interval={null}
        >
          {/* Slide dengan 4 produk */}
          <Carousel.Item>
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={3}>
                  <div className="card h-100 shadow-sm">
                    {/* Product Image */}
                    <div
                      className="position-relative"
                      style={{
                        height: "250px",
                        overflow: "hidden",
                        backgroundColor: "#FAFAFA",
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="card-img-top h-100 w-100"
                        style={{ objectFit: "contain", padding: "10px" }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      {/* Category */}
                      <small
                        className="mb-1"
                        style={{
                          color: "#898989",
                          fontSize: "12px",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {product.category}
                      </small>

                      {/* Product Name */}
                      <h6
                        className="card-title fw-bold mb-2"
                        style={{
                          fontSize: "14px",
                          minHeight: "40px",
                          fontFamily: "'Montserrat', sans-serif",
                          color: "#181616",
                        }}
                      >
                        {product.name}
                      </h6>

                      {/* Rating */}
                      <div className="mb-2">
                        <StarRating rating={product.rating} />
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        {product.hasDiscount && product.originalPrice && (
                          <div
                            className="text-decoration-line-through small mb-1"
                            style={{
                              color: "#898989",
                              fontSize: "12px",
                              fontFamily: "'Montserrat', sans-serif",
                            }}
                          >
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                        <div
                          className="fw-bold"
                          style={{
                            color: "#364F6B",
                            fontSize: "16px",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        className="mt-auto w-100 text-white rounded-pill px-4 py-2"
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#364F6B",
                          border: "none",
                          fontFamily: "'Montserrat', sans-serif",
                          letterSpacing: "0.5px",
                          fontWeight: 600,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#3FC1C9";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#364F6B";
                        }}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </section>
  );
}

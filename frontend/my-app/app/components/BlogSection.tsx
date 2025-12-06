"use client";

import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";

// Data blog posts dengan assets yang ada
const blogPosts = [
  {
    id: 1,
    image: "/assets/blog-1.png",
    category: "PROMO",
    title: "Sepatu Kotor? Untung Udah Ada Mino Clean dari Mino Store",
    date: "30 NOV 2020",
    author: "OLEH ADMIN",
    comments: 3,
    excerpt:
      "Laiknya diri sendiri, sepatu juga butuh dirawat. Setidaknya setiap sebulan sekali, sepatu perlu dibersihkan. Namun pembersihan tergantung jenis bahan se...",
  },
  {
    id: 2,
    image: "/assets/blog-2.png",
    category: "PROMO",
    title: "Mino Shoe Store Siap Semarakkan Harbolnas 11.11!",
    date: "28 NOV 2020",
    author: "OLEH ADMIN",
    comments: 3,
    excerpt:
      "Akan ada banyak sekali promo dari diskon ongkir, potongan harga, hingga cashback sehingga kamu bisa mendapat barang yang kamu suka.",
  },
  {
    id: 3,
    image: "/assets/blog-3.png",
    category: "TIPS & TRIK",
    title: "Tips Agar Kaki Tidak Keseleo Sewaktu Berlari",
    date: "26 NOV 2020",
    author: "OLEH ADMIN",
    comments: 3,
    excerpt:
      "Jogging atau lari-lari pendek menjadi salah satu tren olahraga di tengah pandemi. Namun, sayangnya tren ini diikuti oleh pelari pemula.",
  },
];

// Komponen Blog Section
export default function BlogSection() {
  return (
    <section className="py-5 bg-white">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            className="fw-bold"
            style={{
              fontSize: "28px",
              fontFamily: "'Montserrat', sans-serif",
              color: "#181616",
            }}
          >
            Blog
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
            LIHAT SEMUA
          </Button>
        </div>

        {/* Blog Posts Grid */}
        <Row className="g-4">
          {blogPosts.map((post) => (
            <Col key={post.id} xs={12} md={4}>
              <div className="card h-100 shadow-sm">
                {/* Blog Image */}
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="card-img-top"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  {/* Category Badge */}
                  <span
                    className="mb-2 align-self-start d-inline-block"
                    style={{
                      fontSize: "12px",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      color: "#333333",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h5
                    className="card-title fw-bold mb-2"
                    style={{
                      fontSize: "18px",
                      minHeight: "56px",
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#181616",
                      lineHeight: "1.4",
                    }}
                  >
                    {post.title}
                  </h5>

                  {/* Meta Info */}
                  <div className="mb-2">
                    <small
                      className="d-block"
                      style={{
                        color: "#333333",
                        fontSize: "12px",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {post.date} <span style={{ color: "#FC5185" }}>•</span>{" "}
                      {post.author} <span style={{ color: "#FC5185" }}>•</span>{" "}
                      {post.comments} KOMENTAR
                    </small>
                  </div>

                  {/* Excerpt */}
                  <p
                    className="card-text small mb-3"
                    style={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "'Montserrat', sans-serif",
                      lineHeight: "1.6",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Button
                    size="sm"
                    className="mt-auto align-self-start text-white rounded-pill px-4 py-2"
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
                    BACA SELENGKAPNYA
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

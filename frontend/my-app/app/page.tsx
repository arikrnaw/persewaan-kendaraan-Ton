import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import ProductCarousel from "./components/ProductCarousel";
import CategoryGrid from "./components/CategoryGrid";
import PromoBanner from "./components/PromoBanner";
import BlogSection from "./components/BlogSection";
import PaymentPartners from "./components/PaymentPartners";
import Footer from "./components/Footer";

// Halaman utama Mino Store dengan semua komponen
export default function Home() {
  return (
    <div className="min-vh-100">
      {/* Header dengan navigasi */}
      <Header />

      {/* Hero Section dengan carousel */}
      <HeroSection />

      {/* Feature Section - 4 cards */}
      <FeatureSection />

      {/* Product Carousel - Pilihan Minggu Ini */}
      <ProductCarousel />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Promotional Banner */}
      <PromoBanner />

      {/* Blog Section */}
      <BlogSection />

      {/* Payment Partners */}
      <PaymentPartners />

      {/* Footer */}
      <Footer />
    </div>
  );
}

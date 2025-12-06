import Image from "next/image";
import { Container } from "react-bootstrap";

// Komponen Payment Partners dengan image daftar-bank.jpg
export default function PaymentPartners() {
  return (
    <section className="py-4 bg-light">
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <Image
            src="/assets/daftar-bank.jpg"
            alt="Daftar Bank Payment Partners"
            width={465}
            height={100}
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </Container>
    </section>
  );
}

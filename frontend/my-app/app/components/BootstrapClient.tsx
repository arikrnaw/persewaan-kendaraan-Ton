"use client";

import { useEffect } from "react";

// Komponen untuk memuat Bootstrap JS di client side
export default function BootstrapClient() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}

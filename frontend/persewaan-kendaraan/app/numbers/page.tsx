"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { numbersApi } from "@/lib/api";
import { Calculator } from "lucide-react";

type FibonacciResult = {
  n1?: number;
  fibonacci_n1?: number;
  n2?: number;
  fibonacci_n2?: number;
  result: number;
};

export default function NumbersPage() {
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FibonacciResult | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    if (!n1 || !n2) {
      setError("Mohon isi kedua bilangan (n1 dan n2)");
      return;
    }

    const num1 = parseInt(n1, 10);
    const num2 = parseInt(n2, 10);

    if (isNaN(num1) || num1 < 0 || isNaN(num2) || num2 < 0) {
      setError("Bilangan harus berupa angka non-negatif");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await numbersApi.getFibonacciSum({ n1: num1, n2: num2 });
      setResult(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Terjadi kesalahan saat menghitung fibonacci"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setN1("");
    setN2("");
    setResult(null);
    setError("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Penjumlahan Bilangan Fibonacci</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Bilangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="n1">Bilangan ke-1 (n1)</Label>
                <Input
                  id="n1"
                  type="number"
                  min="0"
                  value={n1}
                  onChange={(e) => setN1(e.target.value)}
                  placeholder="Contoh: 1"
                />
                <p className="text-sm text-gray-500">
                  Masukkan posisi bilangan fibonacci pertama
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="n2">Bilangan ke-2 (n2)</Label>
                <Input
                  id="n2"
                  type="number"
                  min="0"
                  value={n2}
                  onChange={(e) => setN2(e.target.value)}
                  placeholder="Contoh: 4"
                />
                <p className="text-sm text-gray-500">
                  Masukkan posisi bilangan fibonacci kedua
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCalculate} disabled={loading}>
                {loading ? "Menghitung..." : "Hitung"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Hasil Perhitungan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">
                    Fibonacci ke-{result.n1}
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    Fb({result.n1}) = {result.fibonacci_n1}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">
                    Fibonacci ke-{result.n2}
                  </div>
                  <div className="text-2xl font-bold text-green-700">
                    Fb({result.n2}) = {result.fibonacci_n2}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                <div className="text-sm text-gray-600 mb-2">
                  Hasil Penjumlahan
                </div>
                <div className="text-3xl font-bold text-primary">
                  Fb({result.n1}) + Fb({result.n2}) = {result.fibonacci_n1} +{" "}
                  {result.fibonacci_n2} = {result.result}
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold mb-2">Penjelasan:</div>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>
                    Bilangan fibonacci ke-{result.n1} adalah{" "}
                    {result.fibonacci_n1}
                  </li>
                  <li>
                    Bilangan fibonacci ke-{result.n2} adalah{" "}
                    {result.fibonacci_n2}
                  </li>
                  <li>
                    Jumlah dari kedua bilangan tersebut adalah {result.result}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Contoh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Contoh 1:</strong> n1 = 1, n2 = 4
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              <li>Fb(1) = 1</li>
              <li>Fb(4) = 3</li>
              <li>Fb(1) + Fb(4) = 1 + 3 = 4</li>
            </ul>
            <p className="mt-4">
              <strong>Contoh 2:</strong> n1 = 5, n2 = 7
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              <li>Fb(5) = 5</li>
              <li>Fb(7) = 13</li>
              <li>Fb(5) + Fb(7) = 5 + 13 = 18</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

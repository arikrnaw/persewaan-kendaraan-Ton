import { Request, Response } from "express";

/**
 * Fungsi untuk mengambil bilangan fibonacci ke n
 * Contoh: n = 4, Fb(4) = 3
 */
const getFibonacci = (n: number): number => {
  if (n < 0) return 0;
  if (n === 0) return 0;
  if (n === 1) return 1;

  const fibos: number[] = [0, 1];

  for (let i = 2; i <= n; i++) {
    fibos[i] = fibos[i - 1] + fibos[i - 2];
  }

  return fibos[n];
};

/**
 * GET /api/numbers/fibonacci/:n
 * Ambil bilangan fibonacci ke n
 */
export const getFibonacciNumber = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const n = parseInt(req.params.n, 10);

    if (isNaN(n) || n < 0) {
      res.status(400).json({
        success: false,
        message: "Parameter n harus berupa bilangan bulat non-negatif",
      });
      return;
    }

    const result = getFibonacci(n);

    res.status(200).json({
      success: true,
      data: {
        n,
        result,
      },
      message: `Fibonacci ke-${n} adalah ${result}`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error calculating fibonacci",
      error: error.message,
    });
  }
};

/**
 * POST /api/numbers/fibonacci-sum
 * Penjumlahan 2 bilangan dari deret fibonacci
 * Body: { n1: number, n2: number }
 * Contoh: n1 = 1, Fb(1) = 1; n2 = 4, Fb(4) = 3; Fb(1) + Fb(4) = 4
 */
export const getFibonacciSum = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { n1, n2 } = req.body;

    if (n1 === undefined || n2 === undefined) {
      res.status(400).json({
        success: false,
        message: "Parameter n1 dan n2 harus diisi",
      });
      return;
    }

    const num1 = parseInt(String(n1), 10);
    const num2 = parseInt(String(n2), 10);

    if (isNaN(num1) || num1 < 0 || isNaN(num2) || num2 < 0) {
      res.status(400).json({
        success: false,
        message: "Parameter n1 dan n2 harus berupa bilangan bulat non-negatif",
      });
      return;
    }

    const fib1 = getFibonacci(num1);
    const fib2 = getFibonacci(num2);
    const sum = fib1 + fib2;

    res.status(200).json({
      success: true,
      data: {
        n1: num1,
        fibonacci_n1: fib1,
        n2: num2,
        fibonacci_n2: fib2,
        result: sum,
      },
      message: `Fb(${num1}) + Fb(${num2}) = ${fib1} + ${fib2} = ${sum}`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error calculating fibonacci sum",
      error: error.message,
    });
  }
};

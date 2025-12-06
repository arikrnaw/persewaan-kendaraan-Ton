import { Router } from "express";
import {
  getFibonacciNumber,
  getFibonacciSum,
} from "../controllers/numbersController";

const router = Router();

// Routes untuk Fibonacci
router.get("/fibonacci/:n", getFibonacciNumber);
router.post("/fibonacci-sum", getFibonacciSum);

export default router;

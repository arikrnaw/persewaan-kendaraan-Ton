import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export type TransactionDetailInput = {
  category_name: string;
  name: string;
  value_idr: number;
};

export type CreateTransactionInput = {
  description: string;
  code: string;
  rate_euro: number;
  date_paid: string;
  transaction_details: TransactionDetailInput[];
};

export type Category = {
  id: number;
  name: string;
};

export type TransactionDetail = {
  id: number;
  transaction_id: number;
  transaction_category_id: number;
  name: string;
  value_idr: number;
  category?: Category;
};

export type TransactionHeader = {
  id: number;
  description: string;
  code: string;
  rate_euro: number;
  date_paid: string;
  created_at: string;
  updated_at: string;
  transaction_details?: TransactionDetail[];
};

export type TransactionListParams = {
  search?: string;
  date_from?: string;
  date_to?: string;
  category?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
};

// API functions
export const transactionApi = {
  getAll: (params?: TransactionListParams) =>
    api.get("/transactions", { params }),
  getById: (id: number) => api.get(`/transactions/${id}`),
  create: (data: CreateTransactionInput) => api.post("/transactions", data),
  update: (id: number, data: Partial<CreateTransactionInput>) =>
    api.put(`/transactions/${id}`, data),
  delete: (id: number) => api.delete(`/transactions/${id}`),
};

export const categoryApi = {
  getAll: () => api.get("/categories"),
  getById: (id: number) => api.get(`/categories/${id}`),
  create: (data: { name: string }) => api.post("/categories", data),
};

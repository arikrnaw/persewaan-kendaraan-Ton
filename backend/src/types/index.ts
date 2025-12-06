// Type untuk Transaction Detail (sesuai ERD)
export type TransactionDetailInput = {
  category_name: string; // Nama category, akan auto-create jika belum ada
  name: string; // Nama transaksi detail
  value_idr: number; // Nilai dalam IDR
};

// Type untuk create Transaction Header
export type CreateTransactionInput = {
  description: string;
  code: string;
  rate_euro: number;
  date_paid: string; // ISO date string atau datetime string
  transaction_details: Array<TransactionDetailInput>;
};

// Type untuk update Transaction Header
export type UpdateTransactionInput = {
  description?: string;
  code?: string;
  rate_euro?: number;
  date_paid?: string;
  transaction_details?: Array<TransactionDetailInput>;
};

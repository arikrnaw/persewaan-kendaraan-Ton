// Helper functions untuk validasi server-side

// Validasi description
export const validateDescription = (description: any): string | null => {
  if (!description) {
    return "Description is required";
  }
  if (typeof description !== "string") {
    return "Description must be a string";
  }
  if (description.trim().length === 0) {
    return "Description cannot be empty";
  }
  if (description.length > 65535) {
    return "Description is too long (max 65535 characters)";
  }
  return null;
};

// Validasi code
export const validateCode = (code: any): string | null => {
  if (!code) {
    return "Code is required";
  }
  if (typeof code !== "string") {
    return "Code must be a string";
  }
  if (code.trim().length === 0) {
    return "Code cannot be empty";
  }
  if (code.length > 100) {
    return "Code is too long (max 100 characters)";
  }
  // Validasi format code (alphanumeric, dash, underscore)
  if (!/^[A-Za-z0-9_-]+$/.test(code)) {
    return "Code can only contain letters, numbers, dashes, and underscores";
  }
  return null;
};

// Validasi rate_euro
export const validateRateEuro = (rate_euro: any): string | null => {
  if (rate_euro === undefined || rate_euro === null) {
    return "Rate Euro is required";
  }
  const rate = Number(rate_euro);
  if (isNaN(rate)) {
    return "Rate Euro must be a number";
  }
  if (rate < 0) {
    return "Rate Euro cannot be negative";
  }
  if (rate > 9999999999999.99) {
    return "Rate Euro is too large (max 9999999999999.99)";
  }
  return null;
};

// Validasi date_paid
export const validateDatePaid = (date_paid: any): string | null => {
  if (!date_paid) {
    return "Date Paid is required";
  }
  if (typeof date_paid !== "string") {
    return "Date Paid must be a string";
  }
  // Validasi format tanggal YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date_paid)) {
    return "Date Paid must be in format YYYY-MM-DD";
  }
  const date = new Date(date_paid);
  if (isNaN(date.getTime())) {
    return "Date Paid is not a valid date";
  }
  // Cek apakah tanggal valid (misalnya tidak 2024-13-45)
  const [year, month, day] = date_paid.split("-").map(Number);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return "Date Paid is not a valid date";
  }
  return null;
};

// Validasi transaction detail (sesuai ERD)
export const validateTransactionDetail = (
  detail: any,
  index: number
): string | null => {
  if (!detail || typeof detail !== "object") {
    return `Transaction detail at index ${index} must be an object`;
  }

  // Validasi category_name
  if (!detail.category_name) {
    return `Transaction detail at index ${index}: category_name is required`;
  }
  if (typeof detail.category_name !== "string") {
    return `Transaction detail at index ${index}: category_name must be a string`;
  }
  if (detail.category_name.trim().length === 0) {
    return `Transaction detail at index ${index}: category_name cannot be empty`;
  }
  if (detail.category_name.length > 255) {
    return `Transaction detail at index ${index}: category_name is too long (max 255 characters)`;
  }

  // Validasi name
  if (!detail.name) {
    return `Transaction detail at index ${index}: name is required`;
  }
  if (typeof detail.name !== "string") {
    return `Transaction detail at index ${index}: name must be a string`;
  }
  if (detail.name.trim().length === 0) {
    return `Transaction detail at index ${index}: name cannot be empty`;
  }
  if (detail.name.length > 255) {
    return `Transaction detail at index ${index}: name is too long (max 255 characters)`;
  }

  // Validasi value_idr
  if (detail.value_idr === undefined || detail.value_idr === null) {
    return `Transaction detail at index ${index}: value_idr is required`;
  }
  const valueIdr = Number(detail.value_idr);
  if (isNaN(valueIdr)) {
    return `Transaction detail at index ${index}: value_idr must be a number`;
  }
  if (valueIdr < 0) {
    return `Transaction detail at index ${index}: value_idr cannot be negative`;
  }

  return null;
};

// Validasi array transaction_details
export const validateTransactionDetails = (
  transaction_details: any
): string | null => {
  if (!transaction_details) {
    return "Transaction details are required";
  }
  if (!Array.isArray(transaction_details)) {
    return "Transaction details must be an array";
  }
  if (transaction_details.length === 0) {
    return "At least one transaction detail is required";
  }
  if (transaction_details.length > 100) {
    return "Too many transaction details (max 100)";
  }

  // Validasi setiap detail
  for (let i = 0; i < transaction_details.length; i++) {
    const error = validateTransactionDetail(transaction_details[i], i);
    if (error) {
      return error;
    }
  }

  return null;
};

// Validasi create transaction input
export const validateCreateTransaction = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validasi description
  const descError = validateDescription(data.description);
  if (descError) errors.push(descError);

  // Validasi code
  const codeError = validateCode(data.code);
  if (codeError) errors.push(codeError);

  // Validasi rate_euro
  const rateError = validateRateEuro(data.rate_euro);
  if (rateError) errors.push(rateError);

  // Validasi date_paid
  const dateError = validateDatePaid(data.date_paid);
  if (dateError) errors.push(dateError);

  // Validasi transaction_details
  const detailsError = validateTransactionDetails(data.transaction_details);
  if (detailsError) errors.push(detailsError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validasi update transaction input (semua field optional)
export const validateUpdateTransaction = (
  data: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validasi description (jika ada)
  if (data.description !== undefined) {
    const descError = validateDescription(data.description);
    if (descError) errors.push(descError);
  }

  // Validasi code (jika ada)
  if (data.code !== undefined) {
    const codeError = validateCode(data.code);
    if (codeError) errors.push(codeError);
  }

  // Validasi rate_euro (jika ada)
  if (data.rate_euro !== undefined) {
    const rateError = validateRateEuro(data.rate_euro);
    if (rateError) errors.push(rateError);
  }

  // Validasi date_paid (jika ada)
  if (data.date_paid !== undefined) {
    const dateError = validateDatePaid(data.date_paid);
    if (dateError) errors.push(dateError);
  }

  // Validasi transaction_details (jika ada)
  if (data.transaction_details !== undefined) {
    const detailsError = validateTransactionDetails(data.transaction_details);
    if (detailsError) errors.push(detailsError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

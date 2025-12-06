-- Database schema untuk Vehicle Rental Transaction System sesuai ERD

-- Buat database (jika belum ada)
CREATE DATABASE IF NOT EXISTS vehicle_rental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE vehicle_rental;

-- Tabel ms_category (Master Category)
CREATE TABLE IF NOT EXISTS ms_category (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default categories (income dan expense)
INSERT INTO ms_category (name) VALUES ('income'), ('expense') 
ON DUPLICATE KEY UPDATE name=name;

-- Tabel transaction_header (Master Transaction)
CREATE TABLE IF NOT EXISTS transaction_header (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL,
  code VARCHAR(100) NOT NULL UNIQUE,
  rate_euro DOUBLE NOT NULL,
  date_paid DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_date_paid (date_paid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel transaction_detail (Detail Transaction)
CREATE TABLE IF NOT EXISTS transaction_detail (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transaction_id INT UNSIGNED NOT NULL,
  transaction_category_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  value_idr DOUBLE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transaction_header(id) ON DELETE CASCADE,
  FOREIGN KEY (transaction_category_id) REFERENCES ms_category(id) ON DELETE RESTRICT,
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_transaction_category_id (transaction_category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

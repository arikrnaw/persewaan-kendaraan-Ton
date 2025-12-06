# Vehicle Rental Transaction API

Backend API untuk sistem transaksi persewaan kendaraan menggunakan Express.js, TypeScript, dan MySQL.

## Fitur

- ✅ CRUD Master Transaction
- ✅ **One-to-Many Relationship** - Satu transaksi memiliki banyak income dan banyak expense
- ✅ Multiple Transaction Details dalam satu input
- ✅ Kategori Income dan Expense (hardcoded)
- ✅ **Validasi Server-Side Lengkap** - Validasi semua field dengan error messages yang jelas
- ✅ Database transaction untuk data integrity
- ✅ **Search** - Pencarian berdasarkan description dan code
- ✅ **Filter Range Tanggal** - Filter berdasarkan tanggal pembayaran
- ✅ **Filter Kategori** - Filter berdasarkan kategori transaksi (income/expense)
- ✅ **Sorting** - Sorting per kolom (ascending/descending)
- ✅ **Reset Filter Info** - Informasi filter aktif untuk reset

## Teknologi

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MySQL** - Database
- **Sequelize** - ORM
- **mysql2** - MySQL driver

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Buat database MySQL dan jalankan schema:

```bash
mysql -u root -p < database/schema.sql
```

Atau buat database manual dan import file `database/schema.sql`.

### 3. Konfigurasi Environment

Copy file `.env.example` menjadi `.env` dan sesuaikan konfigurasi:

```bash
cp .env.example .env
```

Edit file `.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=vehicle_rental
DB_USER=root
DB_PASSWORD=your_password
PORT=3001
NODE_ENV=development
```

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3001`

## API Endpoints

### Base URL

```
http://localhost:3001/api/transactions
```

### 1. GET All Transactions (dengan Filtering, Search, dan Sorting)

```
GET /api/transactions
```

**Query Parameters:**

- `search` (optional) - Pencarian di description dan code
- `date_from` (optional) - Filter tanggal mulai (format: YYYY-MM-DD)
- `date_to` (optional) - Filter tanggal akhir (format: YYYY-MM-DD)
- `category` (optional) - Filter kategori: `income` atau `expense`
- `sort_by` (optional) - Kolom untuk sorting: `id`, `description`, `code`, `rate_euro`, `date_paid`, `created_at`, `updated_at` (default: `created_at`)
- `sort_order` (optional) - Urutan sorting: `ASC` atau `DESC` (default: `DESC`)

**Contoh Request:**

```
GET /api/transactions?search=sewa&date_from=2024-01-01&date_to=2024-01-31&category=income&sort_by=date_paid&sort_order=ASC
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "description": "Penyewaan mobil bulan Januari",
      "code": "TRX-001",
      "rate_euro": 1.2,
      "date_paid": "2024-01-15",
      "transaction_details": [
        {
          "id": 1,
          "transaction_id": 1,
          "category": "income",
          "transaction_name": "Pembayaran sewa",
          "amount": 5000000
        }
      ]
    }
  ],
  "message": "Transactions retrieved successfully",
  "meta": {
    "total": 1,
    "filters": {
      "search": "sewa",
      "date_from": "2024-01-01",
      "date_to": "2024-01-31",
      "category": "income",
      "sort_by": "date_paid",
      "sort_order": "ASC"
    },
    "has_active_filters": true
  }
}
```

**Catatan:**

- `has_active_filters: true` menandakan ada filter aktif, bisa digunakan untuk menampilkan tombol reset filter
- Jika tidak ada filter, `has_active_filters: false` dan semua nilai di `filters` akan `null`

### 2. GET Transaction by ID

```
GET /api/transactions/:id
```

### 3. CREATE Transaction

```
POST /api/transactions
```

**Request Body:**

```json
{
  "description": "Penyewaan mobil bulan Januari",
  "code": "TRX-001",
  "rate_euro": 1.2,
  "date_paid": "2024-01-15",
  "transaction_details": [
    {
      "category": "income",
      "transaction_name": "Pembayaran sewa",
      "amount": 5000000
    },
    {
      "category": "expense",
      "transaction_name": "Biaya maintenance",
      "amount": 500000
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "description": "Penyewaan mobil bulan Januari",
    "code": "TRX-001",
    "rate_euro": 1.2,
    "date_paid": "2024-01-15",
    "transaction_details": [...]
  },
  "message": "Transaction created successfully"
}
```

### 4. UPDATE Transaction

```
PUT /api/transactions/:id
```

**Request Body:** (semua field optional)

```json
{
  "description": "Updated description",
  "code": "TRX-001-UPDATED",
  "rate_euro": 1.3,
  "date_paid": "2024-01-20",
  "transaction_details": [
    {
      "category": "income",
      "transaction_name": "Updated payment",
      "amount": 6000000
    }
  ]
}
```

### 5. DELETE Transaction

```
DELETE /api/transactions/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

## Struktur Database

### Table: transactions

- `id` - Primary key
- `description` - Deskripsi transaksi
- `code` - Kode transaksi (unique)
- `rate_euro` - Rate Euro
- `date_paid` - Tanggal pembayaran
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Table: transaction_details

- `id` - Primary key
- `transaction_id` - Foreign key ke transactions
- `category` - ENUM('income', 'expense')
- `transaction_name` - Nama transaksi
- `amount` - Nominal
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Scripts

- `npm run dev` - Run development server dengan hot reload
- `npm run build` - Build TypeScript ke JavaScript
- `npm start` - Run production server

## Validasi Server-Side

API melakukan validasi lengkap pada semua input:

### Validasi Master Transaction:

- **description**: Required, string, tidak boleh kosong, max 65535 karakter
- **code**: Required, string, tidak boleh kosong, max 100 karakter, format alphanumeric/dash/underscore, unique
- **rate_euro**: Required, number, tidak boleh negatif, max 9999999999999.99
- **date_paid**: Required, string format YYYY-MM-DD, harus tanggal valid

### Validasi Transaction Details:

- **category**: Required, harus `income` atau `expense` (hardcoded)
- **transaction_name**: Required, string, tidak boleh kosong, max 255 karakter
- **amount**: Required, number, tidak boleh negatif, max 9999999999999.99
- Minimal 1 transaction detail, maksimal 100 transaction details

### Contoh Response Error Validasi:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Description is required",
    "Code cannot be empty",
    "Rate Euro must be a number",
    "Transaction detail at index 0: category must be either 'income' or 'expense'"
  ]
}
```

## Catatan

- **One-to-Many**: Satu transaksi dapat memiliki banyak income dan banyak expense
- Kategori transaction_details hanya bisa `income` atau `expense` (hardcoded)
- Code transaction harus unique
- Saat update transaction_details, semua detail lama akan dihapus dan diganti dengan yang baru
- Saat delete transaction, semua transaction_details akan terhapus otomatis (CASCADE)
- Semua validasi dilakukan di server-side untuk keamanan

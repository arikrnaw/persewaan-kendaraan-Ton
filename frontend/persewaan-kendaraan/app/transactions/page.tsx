"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  transactionApi,
  categoryApi,
  type TransactionHeader,
  type Category,
  type TransactionListParams,
} from "@/lib/api";
import {
  Search,
  Trash2,
  Pencil,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TransactionRow = {
  id: number;
  no: number;
  description: string;
  code: string;
  rate_euro: number;
  date_paid: string;
  category: string;
  name: string;
  value_idr: number;
  transaction_id: number;
};

export default function TransactionsListPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionHeader[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableRows, setTableRows] = useState<TransactionRow[]>([]);

  // Filter states
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [currentPage, itemsPerPage, sortBy, sortOrder]);

  const loadCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadTransactions = async (
    overrideParams?: Partial<TransactionListParams>
  ) => {
    setLoading(true);
    try {
      const params: TransactionListParams = {
        search:
          (overrideParams?.search !== undefined
            ? overrideParams.search
            : search) || undefined,
        date_from:
          (overrideParams?.date_from !== undefined
            ? overrideParams.date_from
            : dateFrom) || undefined,
        date_to:
          (overrideParams?.date_to !== undefined
            ? overrideParams.date_to
            : dateTo) || undefined,
        category:
          overrideParams && "category" in overrideParams
            ? overrideParams.category === null
              ? undefined
              : overrideParams.category
            : categoryFilter !== "all"
            ? categoryFilter
            : undefined,
        sort_by: overrideParams?.sort_by || sortBy,
        sort_order: overrideParams?.sort_order || sortOrder,
      };

      const res = await transactionApi.getAll(params);
      const data: TransactionHeader[] = res.data.data;

      setTransactions(data);
      setHasActiveFilters(res.data.meta?.has_active_filters || false);

      // Flatten transactions to rows (one row per transaction detail)
      const rows: TransactionRow[] = [];
      let rowNo = (currentPage - 1) * itemsPerPage + 1;

      data.forEach((transaction) => {
        if (
          transaction.transaction_details &&
          transaction.transaction_details.length > 0
        ) {
          transaction.transaction_details.forEach((detail) => {
            rows.push({
              id: detail.id,
              no: rowNo++,
              description: transaction.description,
              code: transaction.code,
              rate_euro: transaction.rate_euro,
              date_paid: formatDate(transaction.date_paid),
              category: detail.category?.name || "",
              name: detail.name,
              value_idr: detail.value_idr,
              transaction_id: transaction.id,
            });
          });
        } else {
          // Jika tidak ada detail, tetap tampilkan header
          rows.push({
            id: transaction.id,
            no: rowNo++,
            description: transaction.description,
            code: transaction.code,
            rate_euro: transaction.rate_euro,
            date_paid: formatDate(transaction.date_paid),
            category: "-",
            name: "-",
            value_idr: 0,
            transaction_id: transaction.id,
          });
        }
      });

      setTotalData(rows.length);

      // Apply pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setTableRows(rows.slice(startIndex, endIndex));
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const day = date.getDate();
      const month = date.toLocaleString("id-ID", { month: "long" });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadTransactions();
  };

  const handleResetFilters = () => {
    // Update state terlebih dahulu
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setCategoryFilter("all");
    setSortBy("created_at");
    setSortOrder("DESC");
    setCurrentPage(1);

    // Load dengan parameter yang sudah di-reset (langsung, tidak bergantung pada state)
    // Gunakan null sebagai penanda untuk reset category filter
    loadTransactions({
      search: "",
      date_from: "",
      date_to: "",
      category: null as any, // Explicitly set to null untuk menghapus category filter
      sort_by: "created_at",
      sort_order: "DESC",
    });
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setSortOrder("ASC");
    }
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      return;
    }

    try {
      await transactionApi.delete(id);
      alert("Transaksi berhasil dihapus!");
      loadTransactions();
    } catch (error: any) {
      console.error("Error deleting transaction:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menghapus transaksi"
      );
    }
  };

  const handleEdit = (transactionId: number) => {
    router.push(`/transactions/edit/${transactionId}`);
  };

  const totalPages = Math.ceil(totalData / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalData);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">LIST DATA TRANSAKSI</h1>
        <Button onClick={() => router.push("/transactions/add")}>
          Tambah Transaksi
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            placeholder="From"
            className="w-40"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">to</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            placeholder="To"
            className="w-40"
          />
        </div>
        <NativeSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-40"
        >
          <NativeSelectOption value="all">All</NativeSelectOption>
          {categories.map((cat) => (
            <NativeSelectOption key={cat.id} value={cat.name}>
              {cat.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Q search"
            className="flex-1"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filter
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("id")}
              >
                No {sortBy === "id" && (sortOrder === "ASC" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("description")}
              >
                Deskripsi{" "}
                {sortBy === "description" && (sortOrder === "ASC" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("code")}
              >
                Code {sortBy === "code" && (sortOrder === "ASC" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("rate_euro")}
              >
                Rate Euro{" "}
                {sortBy === "rate_euro" && (sortOrder === "ASC" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("date_paid")}
              >
                Date Paid{" "}
                {sortBy === "date_paid" && (sortOrder === "ASC" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Nama Transaksi</TableHead>
              <TableHead>Nominal (IDR)</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tableRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              tableRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{formatCurrency(row.rate_euro)}</TableCell>
                  <TableCell>{row.date_paid}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{formatCurrency(row.value_idr)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(row.transaction_id)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(row.transaction_id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <NativeSelect
            value={itemsPerPage.toString()}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-20"
          >
            <NativeSelectOption value="10">10</NativeSelectOption>
            <NativeSelectOption value="25">25</NativeSelectOption>
            <NativeSelectOption value="50">50</NativeSelectOption>
            <NativeSelectOption value="100">100</NativeSelectOption>
          </NativeSelect>
          <span className="text-sm text-gray-600">
            Menampilkan {startIndex + 1} - {endIndex} dari {totalData} data
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 3) {
              pageNum = i + 1;
            } else if (currentPage === 1) {
              pageNum = i + 1;
            } else if (currentPage === totalPages) {
              pageNum = totalPages - 2 + i;
            } else {
              pageNum = currentPage - 1 + i;
            }
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNum)}
                className="w-10"
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
